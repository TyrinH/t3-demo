import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
//   protectedProcedure,
} from "~/server/api/trpc";

export const todosRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),

  createTodo: publicProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(({ input, ctx }) => {
        // mutation is optional
        console.log('MUTATION INPUT', input)
        return ctx.prisma.todo.create({
            data: {
                title: input.title,
                description: input.description,
            },
        });
    }),

    deleteTodo: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
        // mutation is optional
        console.log('MUTATION INPUT', input)
        return ctx.prisma.todo.delete({
            where: {
                id: input.id
            },
        });
    }),

});