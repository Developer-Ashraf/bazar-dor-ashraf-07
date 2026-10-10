import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI || "");
const db = client.db("bazar_dor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: true,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "mock-github-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "mock-github-secret",
      enabled: Boolean(process.env.GITHUB_CLIENT_ID),
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || "bazardor_default_secret_key",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});
