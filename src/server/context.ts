/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';
export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getServerSession(opts.req, opts.res, authOptions);

  return {
    session,
  };
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  // session: Session | null
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

//export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;
export type Context = Awaited<ReturnType<typeof createContext>>;
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
// export async function createContext(
//   opts: trpcNext.CreateNextContextOptions,
// ): Promise<Context> {
//   // for API-response caching see https://trpc.io/docs/caching

//   return await createContextInner({});
// }
