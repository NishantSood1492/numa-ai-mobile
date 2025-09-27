import { PrismaClient } from "@/generated/prisma";
import { expo } from "@better-auth/expo";
import { betterAuth, BetterAuthPlugin } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [expo() as BetterAuthPlugin],
  emailAndPassword: {
    enabled: true, // Enable authentication using email and password.
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: process.env.REDIRECT_URI as string,
    },
  },
  trustedOrigins: ["numaai://", "numaai://*"],
});
