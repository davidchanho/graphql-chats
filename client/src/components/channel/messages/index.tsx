import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { IMessage } from "../../../../../shared/types";
import { FETCH_CHANNEL } from "../../../queries";
import Message from "../message";

function Messages() {
  const params = useParams();

  const { loading, error, data } = useQuery(FETCH_CHANNEL, {
    variables: {
      _id: params._id,
    },
  });

  if (loading) return null;
  if (error) return null;

  return (
    <div className="overflow-y-scroll h-4/6">
      {data.channel.messages.map((message: IMessage) => {
        return <Message key={message._id} message={message} />;
      })}
    </div>
  );
}

export default Messages;
