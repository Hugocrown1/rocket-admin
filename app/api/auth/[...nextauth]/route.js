import NextAuth, { getServerSession } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import clientPromise from "@/lib/mongodb";

import GoogleProvider from "next-auth/providers/google";

const adminEmails = ["hugo.corona.r@gmail.com"];

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (adminEmails.includes(user?.email)) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
};

const handler = NextAuth(authOptions);

export const isAdminRequest = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw "not admin";
  }
};

export { handler as GET, handler as POST };
