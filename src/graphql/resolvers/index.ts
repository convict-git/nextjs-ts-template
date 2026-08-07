import { itemResolvers } from '@/graphql/resolvers/item';

export const resolvers = {
  Query: {
    health: () => 'ok',
    ...itemResolvers.Query,
  },
  Mutation: {
    ...itemResolvers.Mutation,
  },
};
