import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { prisma } from '../../../server/prisma';

export const authOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }: any) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: '',
      clientSecret: '',
    }),
  ],
};

export default NextAuth(authOptions);
