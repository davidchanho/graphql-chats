import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    messages(offset: Int, limit: Int, channel: ID): [Message]
    message(_id: ID!): Message
  }

  type Message {
    _id: ID!
    text: String!
    date: String!
    channel: Channel!
    user: User!
  }

  input MessageInput {
    text: String
    user: String
    channel: String
  }

  type Mutation {
    addMessage(item: MessageInput): Message
    removeMessage(_id: ID!): Message
    updateMessage(_id: ID!, update: String): Message
  }

  type Subscription {
    messageCreated: Message
  }
`;
