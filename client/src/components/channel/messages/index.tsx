import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { IMessage } from "../../../../../shared/types";
import Message from "../message";

const FETCH_CHANNEL_MESSAGES = gql`
  query FetchChannelMessages($_id: ID!) {
    channel(_id: $_id) {
      _id
      messages {
        _id
      }
    }
  }
`;

function Messages() {
  const params = useParams();

  const { loading, error, data } = useQuery(FETCH_CHANNEL_MESSAGES, {
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
