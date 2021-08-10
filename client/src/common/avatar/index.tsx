import { useQuery } from "@apollo/client";
import React from "react";
import { FETCH_USER_AVATAR } from "../../queries";
import { Props } from "./Avatar.types";

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
