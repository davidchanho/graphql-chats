import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { FETCH_USER_PORTFOLIO } from "../../queries";

function User() {
  const params = useParams();

  const { loading, error, data } = useQuery(FETCH_USER_PORTFOLIO, {
    variables: {
      _id: params._id,
    },
  });

  if (loading) return null;
  if (error) return null;

  return <div>{data.user.name}</div>;
}

export default User;
