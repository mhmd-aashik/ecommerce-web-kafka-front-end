import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";

interface KeycloakAccessTokenPayload {
  exp?: number;
  realm_access?: {
    roles?: string[];
  };
}

interface RefreshedTokens {
  accessToken: string;
  refreshToken?: string;
  accessTokenExpires?: number;
}

// Keycloak only adds realm_access.roles to the access token, so the OIDC profile
// (built from the ID token) cannot be used as the source of roles.
function readJwtPayload(accessToken: string): KeycloakAccessTokenPayload | null {
  const payload = accessToken.split(".")[1];

  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as KeycloakAccessTokenPayload;
  } catch {
    return null;
  }
}

function readRealmRoles(accessToken: string): string[] {
  return (readJwtPayload(accessToken)?.realm_access?.roles ?? []).filter(
    (role): role is string => typeof role === "string",
  );
}

function readAccessTokenExpiresAtMs(accessToken: string): number | undefined {
  const exp = readJwtPayload(accessToken)?.exp;

  return typeof exp === "number" ? exp * 1000 : undefined;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  const issuer = process.env.AUTH_KEYCLOAK_ISSUER;
  const clientId = process.env.AUTH_KEYCLOAK_ID;
  const clientSecret = process.env.AUTH_KEYCLOAK_SECRET;

  if (!issuer || !clientId || !clientSecret || !token.refreshToken) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }

  const response = await fetch(
    `${issuer.replace(/\/$/, "")}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: token.refreshToken,
      }),
      cache: "no-store",
    },
  );

  const refreshed = (await response.json()) as {
    access_token?: string;
    refresh_token?: string;
    id_token?: string;
    expires_in?: number;
    error?: string;
  };

  if (!response.ok || !refreshed.access_token) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }

  const nextTokens: RefreshedTokens = {
    accessToken: refreshed.access_token,
    refreshToken: refreshed.refresh_token ?? token.refreshToken,
    accessTokenExpires:
      typeof refreshed.expires_in === "number"
        ? Date.now() + refreshed.expires_in * 1000
        : readAccessTokenExpiresAtMs(refreshed.access_token),
  };

  return {
    ...token,
    accessToken: nextTokens.accessToken,
    refreshToken: nextTokens.refreshToken,
    accessTokenExpires: nextTokens.accessTokenExpires,
    idToken: refreshed.id_token ?? token.idToken,
    roles: readRealmRoles(nextTokens.accessToken),
    error: undefined,
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID!,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.access_token
          ? readAccessTokenExpiresAtMs(account.access_token)
          : undefined;
        token.roles = account.access_token
          ? readRealmRoles(account.access_token)
          : [];
        token.error = undefined;

        return token;
      }

      const expiresAt = token.accessTokenExpires;
      const isStillValid =
        typeof expiresAt === "number" && Date.now() < expiresAt - 30_000;

      if (isStillValid) {
        return token;
      }

      return refreshAccessToken(token);
    },

    session({ session, token }) {
      session.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : undefined;

      session.roles = Array.isArray(token.roles)
        ? token.roles.filter((role): role is string => typeof role === "string")
        : [];

      session.error =
        typeof token.error === "string" ? token.error : undefined;

      return session;
    },
  },
});
