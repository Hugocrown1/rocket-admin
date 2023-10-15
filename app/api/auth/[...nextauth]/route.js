import NextAuth, { getServerSession } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

import GoogleProvider from "next-auth/providers/google";

const adminEmails = ["hugo.corona.r@gmail.com"];

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
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

  if (!adminEmails.includes(session?.user?.email)) {
    throw "not admin";
  }
};

export { handler as GET, handler as POST };
