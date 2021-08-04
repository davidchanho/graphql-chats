import { useQuery } from "@apollo/client";
import React from "react";
import { IUser } from "../../../../shared/types";
import { FETCH_USERS } from "../../queries";

function Users() {
  const { loading, error, data } = useQuery(FETCH_USERS);

  if (loading) return null;
  if (error) return null;

  return (
    <div>
      {data.users.map((user: IUser) => {
        return <li>{user.name}</li>;
      })}
    </div>
  );
}

export default Users;
