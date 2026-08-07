import { gql } from 'graphql-tag';

import { itemTypeDefs } from '@/graphql/schema/item';

export const typeDefs = [
  gql`
    type Query {
      health: String!
    }
  `,
  itemTypeDefs,
];
