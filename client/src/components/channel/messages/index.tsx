import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { IMessage } from "../../../../../shared/types";
import Message from "../message";

const FETCH_MESSAGES = gql`
  query Query($channel: ID!) {
    messages(channel: $channel) {
      _id
      text
      date
      user {
        _id
        name
      }
    }
  }
`;

function Messages() {
  const params = useParams();

  const { loading, error, data } = useQuery(FETCH_MESSAGES, {
    variables: {
      channel: params._id,
    },
  });

  if (loading) return null;
  if (error) return null;

  return (
    <div className="overflow-y-scroll h-4/6">
      {data.messages.map((message: IMessage) => {
        return <Message key={message._id} message={message} />;
      })}
    </div>
  );
}

export default Messages;
