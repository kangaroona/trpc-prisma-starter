import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import type { User } from '~/types/users';
// Imaginary database
const users: User[] = [];
const db = {
  user: {
    findMany: async () => users,
    findById: async (id: string) => users.find((user) => user.id === id),
    create: async (data: { name: string }) => {
      const user = { id: String(users.length + 1), ...data };
      users.push(user);
      return user;
    },
  },
};
export const userRouter = router({
  userList: publicProcedure.query(() => {
    // Retrieve users from a datasource, this is an imaginary database
    const users = db.user.findMany();
    return users;
  }),
  userById: publicProcedure.input(z.string()).query((opts) => {
    const { input } = opts;
    //      ^?
    // Retrieve the user with the given ID
    const user = db.user.findById(input);
    return user;
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      //      ^?
      // Create a new user in the database
      const user = await db.user.create(input);
      //    ^?
      return user;
    }),
});
