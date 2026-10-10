import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const defaultUri =
  "mongodb://bazar-dor-ashraf-07:96COOdltO3FZvk7N@ac-m0gvdxt-shard-00-00.i3lu0gl.mongodb.net:27017,ac-m0gvdxt-shard-00-01.i3lu0gl.mongodb.net:27017,ac-m0gvdxt-shard-00-02.i3lu0gl.mongodb.net:27017/bazar_dor?ssl=true&authSource=admin&replicaSet=atlas-ccvxfd-shard-0&retryWrites=true&w=majority";

const client = new MongoClient(process.env.MONGODB_URI || defaultUri);
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
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-google-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-google-secret",
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID),
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
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
});
