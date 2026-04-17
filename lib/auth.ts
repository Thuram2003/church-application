import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Use AUTH_URL which points directly to /api/auth (Better Auth endpoint)
const BACKEND_AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;

export const authOptions: NextAuthOptions = {
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
          // Call Better Auth backend sign-in endpoint
          const response = await axios.post(`${BACKEND_AUTH_URL}/sign-in/email`, {
            email: credentials.email,
            password: credentials.password,
            rememberMe: credentials.rememberMe === "true",
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = response.data;

          // Better Auth returns user and session data
          if (!data.user) {
            throw new Error("Invalid response from authentication server");
          }

          // Check if email is verified (Better Auth field)
          if (!data.user.emailVerified) {
            throw new Error("EMAIL_NOT_VERIFIED");
          }

          // Return user object with session token
          // Better Auth returns the session token in the response
          // Note: role and churchId are NOT in the user table, they come from the member table
          // These will be null initially and should be fetched/updated after login
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name || `${data.user.firstName} ${data.user.lastName}`,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            country: data.user.country,
            emailVerified: data.user.emailVerified,
            image: data.user.image,
            role: "member", // Default role - will be updated from member table
            churchId: undefined, // Will be set after onboarding or from member table
            accessToken: data.session?.token || data.token, // Better Auth session token
          };
        } catch (error: any) {
          console.error("[NextAuth] Authorization error:", error);
          
          // Check if it's an axios error with response
          if (axios.isAxiosError(error) && error.response?.data) {
            const errorData = error.response.data;
            
            // Check if email is not verified
            if (errorData.code === "EMAIL_NOT_VERIFIED" || errorData.message?.includes("verify") || errorData.message?.includes("not verified")) {
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
        token.emailVerified = user.emailVerified as boolean;
        token.image = user.image;
        token.role = user.role;
        token.churchId = user.churchId;
        token.accessToken = user.accessToken;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }) {
      // Add user data and token to session
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          country: token.country as string,
          emailVerified: token.emailVerified as boolean,
          image: token.image as string,
          role: token.role as string,
          churchId: token.churchId as string,
          accessToken: token.accessToken as string,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors to login page
    verifyRequest: "/verify-email-sent", // Email verification sent page
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
