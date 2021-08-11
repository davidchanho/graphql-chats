import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar DateTime

  extend type Query {
    channels: [Channel!]
    channel(_id: ID!): Channel!
  }

  type Channel {
    _id: ID!
    name: String!
    messages: [Message!]
    users: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Mutation {
    addChannel(name: String!): Channel!
    removeChannel(_id: ID!): Channel!
    updateChannel(_id: ID!, update: String): Channel!
  }
`;
