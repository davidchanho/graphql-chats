import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    users: [User]
    user(_id: ID!): User
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    avatar: String!
    date: String!
    channels: [Channel]
    messages: [Message]
    bookmarks: [Message]
  }

  input UserInput {
    email: String
    password: String
    name: String
  }

  type Mutation {
    login(email: String!, password: String!): String
    addUser(item: UserInput): User
    removeUser(_id: ID!): User
    updateUser(_id: ID!, item: UserInput): User
  }
`;
