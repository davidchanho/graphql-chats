import { gql } from "@apollo/client";

export const FETCH_USERS = gql`
  query FetchUsers {
    users {
      _id
      name
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      _id
      name
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String, $password: String) {
    registerUser(email: $email, password: $password) {
      _id
    }
  }
`;

export const REMOVE_USER = gql`
  mutation RemoveUser($_id: ID!) {
    removeUser(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($_id: ID!, $update: String) {
    updateUser(_id: $_id, update: $update) {
      _id
    }
  }
`;
