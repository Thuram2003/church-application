import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    country?: string;
    emailVerified: boolean;
    image?: string;
    role?: string;
    churchId?: string;
    branchId?: string;
    memberId?: string;
    accessToken: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      firstName: string;
      lastName: string;
      country?: string;
      emailVerified: boolean;
      image?: string;
      role?: string;
      churchId?: string;
      branchId?: string;
      memberId?: string;
      accessToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    country?: string;
    emailVerified: boolean;
    image?: string;
    role?: string;
    churchId?: string;
    branchId?: string;
    memberId?: string;
    accessToken: string;
  }
}
