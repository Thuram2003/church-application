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

          const accessToken = data.session?.token || data.token;

          // Return user object with session token
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name || `${data.user.firstName} ${data.user.lastName}`,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            country: data.user.country,
            emailVerified: data.user.emailVerified,
            image: data.user.image,
            accessToken: accessToken,
            // Workspace context - will be set after workspace selection
            role: undefined,
            churchId: undefined,
            branchId: undefined,
            memberId: undefined,
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
        token.accessToken = user.accessToken;
        // Workspace context
        token.role = user.role;
        token.churchId = user.churchId;
        token.branchId = user.branchId;
        token.memberId = user.memberId;
        // Set token expiry based on Better Auth defaults
        // 7 days for normal login, 30 days if "remember me" was checked
        // We'll default to 7 days here; Better Auth handles the actual expiration
        token.accessTokenExpires = Date.now() + 7 * 24 * 60 * 60 * 1000;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      // Check if token is expired and needs refresh
      if (token.accessTokenExpires && Date.now() > (token.accessTokenExpires as number)) {
        console.log('[NextAuth] Access token expired, attempting refresh...');
        try {
          // Call Better Auth refresh endpoint
          const response = await axios.post(`${BACKEND_AUTH_URL}/refresh`, {}, {
            headers: {
              'Authorization': `Bearer ${token.accessToken}`,
            },
          });

          if (response.data?.token) {
            token.accessToken = response.data.token;
            token.accessTokenExpires = Date.now() + 7 * 24 * 60 * 60 * 1000;
            console.log('[NextAuth] Token refreshed successfully');
          }
        } catch (error) {
          console.error('[NextAuth] Token refresh failed:', error);
          // Return token as-is, let the API call fail and trigger logout
        }
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
          accessToken: token.accessToken as string,
          // Workspace context
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
