import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const BACKEND_AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const response = await axios.post(
            `${BACKEND_AUTH_URL}/sign-in/email`,
            {
              email: credentials.email,
              password: credentials.password,
              rememberMe: credentials.rememberMe === "true",
            },
            { headers: { "Content-Type": "application/json" } }
          );

          const data = response.data;

          if (!data.user) {
            throw new Error("Invalid response from authentication server");
          }

          if (!data.user.emailVerified) {
            throw new Error("EMAIL_NOT_VERIFIED");
          }

          const accessToken = data.session?.token || data.token;

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name || `${data.user.firstName} ${data.user.lastName}`,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            country: data.user.country,
            emailVerified: data.user.emailVerified,
            image: data.user.image,
            accessToken,
            role: undefined,
            churchId: undefined,
            branchId: undefined,
            memberId: undefined,
          };
        } catch (error: any) {
          if (axios.isAxiosError(error) && error.response?.data) {
            const errorData = error.response.data;
            if (
              errorData.code === "EMAIL_NOT_VERIFIED" ||
              errorData.message?.includes("verify") ||
              errorData.message?.includes("not verified")
            ) {
              throw new Error("EMAIL_NOT_VERIFIED");
            }
            throw new Error(errorData.message || "Authentication failed");
          }
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.country = user.country;
        token.emailVerified = user.emailVerified as unknown as boolean;
        token.image = user.image;
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.churchId = user.churchId;
        token.branchId = user.branchId;
        token.memberId = user.memberId;
        token.accessTokenExpires = Date.now() + 7 * 24 * 60 * 60 * 1000;
      }

      // Handle session updates (e.g. workspace selection)
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      // Refresh expired token
      if (
        token.accessTokenExpires &&
        Date.now() > (token.accessTokenExpires as number)
      ) {
        try {
          const response = await axios.post(
            `${BACKEND_AUTH_URL}/refresh`,
            {},
            { headers: { Authorization: `Bearer ${token.accessToken}` } }
          );
          if (response.data?.token) {
            token.accessToken = response.data.token;
            token.accessTokenExpires = Date.now() + 7 * 24 * 60 * 60 * 1000;
          }
        } catch {
          // Let the next API call fail and trigger logout
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Use spread to bypass the emailVerified Date|null base type conflict
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          country: token.country as string,
          emailVerified: token.emailVerified as any,
          image: token.image as string,
          accessToken: token.accessToken as string,
          role: token.role as string,
          churchId: token.churchId as string,
          branchId: token.branchId as string,
          memberId: token.memberId as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    verifyRequest: "/verify-email-sent",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
