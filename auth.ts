import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

interface KeycloakAccessToken {
  sub?: string;
  preferred_username?: string;
  realm_access?: {
    roles?: string[];
  };
}

function decodeJwtPayload(token: string): KeycloakAccessToken {
  try {
    const payload = token.split(".")[1];

    if (!payload) {
      return {};
    }

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");

    const decodedPayload = Buffer.from(normalizedPayload, "base64").toString(
      "utf8",
    );

    return JSON.parse(decodedPayload) as KeycloakAccessToken;
  } catch {
    return {};
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
    async jwt({ token, account, profile }) {
      if (account?.access_token) {
        const decodedToken = decodeJwtPayload(account.access_token);

        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.userId = decodedToken.sub ?? profile?.sub;
        token.username = decodedToken.preferred_username;
        token.roles = decodedToken.realm_access?.roles ?? [];
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.username = token.username as string;
        session.user.roles = token.roles as string[];
      }

      session.accessToken = token.accessToken as string;

      return session;
    },
  },

  pages: {
    error: "/auth/error",
  },
});
