import { gql } from "@apollo/client";

export const FETCH_CHANNELS = gql`
  query FetchChannels {
    channels {
      _id
      name
      messages {
        _id
      }
    }
  }
`;

export const FETCH_CHANNEL_HEADER = gql`
  query FetchChannelHeader($_id: ID!) {
    channel(_id: $_id) {
      _id
      name
      users {
        _id
      }
    }
  }
`;

export const FETCH_CHANNEL = gql`
  query FetchChannel($_id: ID!) {
    channel(_id: $_id) {
      _id
      messages {
        _id
      }
    }
  }
`;

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
