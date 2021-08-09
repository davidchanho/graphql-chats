import { gql } from "@apollo/client";

export const ADD_CHANNEL = gql`
  mutation AddChannel($item: ChannelInput) {
    addChannel(item: $item) {
      _id
    }
  }
`;

export const REMOVE_CHANNEL = gql`
  mutation RemoveChannel($_id: ID!) {
    removeChannel(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_CHANNEL = gql`
  mutation UpdateChannel($_id: ID!, $update: String) {
    updateChannel(_id: $_id, update: $update) {
      _id
    }
  }
`;
