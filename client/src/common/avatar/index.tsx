import { gql, useQuery } from "@apollo/client";
import React from "react";
import { IUser } from "../../../../shared/types";

interface Props {
  user: IUser;
  size?: string;
  round?: boolean;
}

const FETCH_USER_AVATAR = gql`
  query FetchUser($_id: ID!) {
    user(_id: $_id) {
      _id
      avatar
    }
  }
`;

function Avatar({ user, size = "8", round = false }: Props) {
  const { loading, error, data } = useQuery(FETCH_USER_AVATAR, {
    variables: {
      _id: user._id,
    },
  });

  if (loading) return null;
  if (error) return null;

  return (
    <img
      className={`h-${size} w-auto ${
        round ? "rounded-full" : "rounded"
      } ring-2 ring-white`}
      src={data.user.avatar}
      alt=""
    />
  );
}

export default Avatar;
