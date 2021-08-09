import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    users: [User!]!
    user(_id: ID!): User!
    me: User!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    avatar: String
    date: String!
    channels: [Channel!]
    messages: [Message!]
    bookmarks: [Message!]
  }

  type UserInput {
    email: String!
    password: String!
  }

  type Mutation {
    loginUser(email: String!, password: String!): User!
    registerUser(email: String!, password: String!): User!
    removeUser(_id: ID!): User!
    updateUser(_id: ID!, item: String!): User!
  }
`;
