import { gql } from "@apollo/client";

export const FETCH_USERS = gql`
  query fetchUsers {
    users {
      _id
      name
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($item: UserInput) {
    addUser(item: $item) {
      _id
    }
  }
`;

export const REMOVE_USER = gql`
  mutation Mutation($_id: ID!) {
    removeUser(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($_id: ID!, $update: String) {
    updateUser(_id: $_id, update: $update) {
      _id
    }
  }
`;
