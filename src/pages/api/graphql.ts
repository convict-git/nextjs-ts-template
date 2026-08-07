import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { createContext } from '@/graphql/context';
import { resolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => createContext(req, res),
});
