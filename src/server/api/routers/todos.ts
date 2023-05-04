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

  getAllUnCompleted: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
        where: {
            completed: false
        }
    });
  }),
  getAllCompleted: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
        where: {
            completed: true
        }
    });
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

    completeTodo: publicProcedure
    .input(z.object({ completed: z.boolean(), id: z.string() }))
    .mutation(({ input, ctx }) => {
        // mutation is optional
        console.log('MUTATION INPUT', input)
        return ctx.prisma.todo.update({
            where: {
                id: input.id
            },
            data: {
                completed: input.completed
            }
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