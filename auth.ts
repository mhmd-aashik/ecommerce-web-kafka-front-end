import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

interface KeycloakProfile {
  realm_access?: {
    roles?: string[];
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
    jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }

      const keycloakProfile = profile as KeycloakProfile | undefined;

      if (keycloakProfile?.realm_access?.roles) {
        token.roles = keycloakProfile.realm_access.roles;
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
