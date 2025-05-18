const { gql } = require('apollo-server');

const typeDefs = gql`
  type Item {
    id: ID!
    title: String!
    description: String
    createdAt: String!
  }

  input ItemInput {
    title: String!
    description: String
  }

  type Query {
    items: [Item!]!
    item(id: ID!): Item
  }

  type Mutation {
    createItem(input: ItemInput!): Item!
    updateItem(id: ID!, input: ItemInput!): Item!
    deleteItem(id: ID!): Boolean!
  }
`;

module.exports = typeDefs; 