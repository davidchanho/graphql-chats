import { gql } from "@apollo/client";

export const FETCH_MESSAGES = gql`
  mutation Mutation {
    fetchMessages {
      _id
      users {
        _id
        name
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation Mutation($item: MessageInput) {
    addMessage(item: $item) {
      _id
    }
  }
`;

export const REMOVE_MESSAGE = gql`
  mutation Mutation($_id: ID!) {
    removeMessage(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_MESSAGE = gql`
  mutation Mutation($_id: ID!, $update: String) {
    updateMessage(_id: $_id, update: $update) {
      _id
    }
  }
`;
