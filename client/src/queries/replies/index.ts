import { gql } from "@apollo/client";

export const REPLY_FEED = gql`
  query replyFeed($cursor: String) {
    replyFeed(cursor: $cursor) {
      cursor
      hasNextPage
      replies {
        _id
      }
    }
  }
`;

export const FETCH_REPLY = gql`
  query FetchReply($_id: ID!) {
    reply(_id: $_id) {
      _id
      text
      createdAt
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_REPLY = gql`
  mutation AddReply($text: String!, $user: ID!, $message: ID!) {
    addReply(text: $text, user: $user, message: $message) {
      _id
    }
  }
`;

export const REMOVE_REPLY = gql`
  mutation RemoveReply($_id: ID!) {
    removeReply(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_REPLY = gql`
  mutation UpdateReply($_id: ID!, $update: String) {
    updateReply(_id: $_id, update: $update) {
      _id
    }
  }
`;
