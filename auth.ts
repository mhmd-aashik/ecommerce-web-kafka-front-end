import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

interface KeycloakAccessTokenPayload {
  realm_access?: {
    roles?: string[];
  };
}

// Keycloak only adds realm_access.roles to the access token, so the OIDC profile
// (built from the ID token) cannot be used as the source of roles.
function readRealmRoles(accessToken: string): string[] {
  const payload = accessToken.split(".")[1];

  if (!payload) {
    return [];
  }

  try {
    const claims = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as KeycloakAccessTokenPayload;

    return (claims.realm_access?.roles ?? []).filter(
      (role): role is string => typeof role === "string",
    );
  } catch {
    return [];
  }
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
    jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;

        token.roles = account.access_token
          ? readRealmRoles(account.access_token)
          : [];
      }

      return token;
    },

    session({ session, token }) {
      session.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : undefined;

      session.roles = Array.isArray(token.roles)
        ? token.roles.filter((role): role is string => typeof role === "string")
        : [];

      return session;
    },
  },
});
