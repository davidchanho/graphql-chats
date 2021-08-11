import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar DateTime

  extend type Query {
    replies: [Reply!]
    reply(_id: ID!): Reply!
    replyFeed(cursor: String): ReplyFeed
  }

  type Reply {
    _id: ID!
    text: String!
    message: Message!
    user: User!
    bookmarkedBy: [User]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ReplyFeed {
    replies: [Reply]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Mutation {
    addReply(text: String!, message: ID!): Reply!
    removeReply(_id: ID!): Boolean!
    updateReply(_id: ID!, update: String!): Reply!
    bookmarkReply(_id: ID!): Reply!
  }

  type Subscription {
    replyCreated: Reply!
  }
`;
