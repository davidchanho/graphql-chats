import { gql } from "@apollo/client";

export const FETCH_CHANNELS = gql`
  query fetchChannels {
    channels {
      _id
      name
      messages {
        _id
      }
    }
  }
`;

export const FETCH_CHANNEL = gql`
  query fetchChannel($_id: ID!) {
    channel(_id: $_id) {
      _id
      name
      messages {
        _id
        text
        date
        user {
          _id
          name
        }
      }
      users {
        _id
        name
      }
    }
  }
`;

export const ADD_CHANNEL = gql`
  mutation Mutation($item: ChannelInput) {
    addChannel(item: $item) {
      _id
    }
  }
`;

export const REMOVE_CHANNEL = gql`
  mutation Mutation($_id: ID!) {
    removeChannel(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_CHANNEL = gql`
  mutation Mutation($_id: ID!, $update: String) {
    updateChannel(_id: $_id, update: $update) {
      _id
    }
  }
`;
