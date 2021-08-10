import { gql } from "@apollo/client";

export const FETCH_MESSAGE = gql`
  query FetchMessage($_id: ID!) {
    message(_id: $_id) {
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

export const ADD_MESSAGE = gql`
  mutation AddMessage($text: String!, $user: ID!, $channel: ID!) {
    addMessage(item: $item) {
      _id
    }
  }
`;

export const REMOVE_MESSAGE = gql`
  mutation RemoveMessage($_id: ID!) {
    removeMessage(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($_id: ID!, $update: String) {
    updateMessage(_id: $_id, update: $update) {
      _id
    }
  }
`;
