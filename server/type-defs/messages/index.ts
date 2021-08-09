import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    messages: [Message!]
    message(_id: ID!): Message!
    messageFeed(cursor: String): MessageFeed
  }

  type Message {
    _id: ID!
    text: String!
    channel: Channel!
    user: User!
    bookmarkedBy: [User]
    createdAt: String!
  }

  type MessageFeed {
    messages: [Message]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Mutation {
    addMessage(text: String!, channel: ID!): Message!
    removeMessage(_id: ID!): Boolean!
    updateMessage(_id: ID!, update: String!): Message!
    toggleBookmark(_id: ID!): Message!
  }

  type Subscription {
    messageCreated: Message!
  }
`;
