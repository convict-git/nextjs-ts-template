import { gql } from 'graphql-tag';

export const itemTypeDefs = gql`
  type Item {
    id: ID!
    title: String!
    description: String
    createdAt: String!
    updatedAt: String!
  }

  input CreateItemInput {
    title: String!
    description: String
  }

  input UpdateItemInput {
    title: String
    description: String
  }

  extend type Query {
    items: [Item!]!
    item(id: ID!): Item
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item!
    updateItem(id: ID!, input: UpdateItemInput!): Item!
    deleteItem(id: ID!): Boolean!
  }
`;
