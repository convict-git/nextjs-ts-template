import { GraphQLError } from 'graphql';

import { itemStore } from '@/graphql/data/items';
import type { CreateItemInput, UpdateItemInput } from '@/graphql/types/item';

export const itemResolvers = {
  Query: {
    items: () => itemStore.findAll(),
    item: (_parent: unknown, args: { id: string }) => itemStore.findById(args.id) ?? null,
  },
  Mutation: {
    createItem: (_parent: unknown, args: { input: CreateItemInput }) => {
      const title = args.input.title.trim();
      if (!title) {
        throw new GraphQLError('Title is required.', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      return itemStore.create({ ...args.input, title });
    },
    updateItem: (_parent: unknown, args: { id: string; input: UpdateItemInput }) => {
      if (args.input.title !== undefined && !args.input.title.trim()) {
        throw new GraphQLError('Title cannot be empty.', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const updated = itemStore.update(args.id, args.input);
      if (!updated) {
        throw new GraphQLError(`Item with id "${args.id}" was not found.`, {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return updated;
    },
    deleteItem: (_parent: unknown, args: { id: string }) => {
      const deleted = itemStore.delete(args.id);
      if (!deleted) {
        throw new GraphQLError(`Item with id "${args.id}" was not found.`, {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return true;
    },
  },
};
