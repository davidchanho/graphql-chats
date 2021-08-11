import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IMessage } from "../../../../../shared/types";
import { useScrollToBottom } from "../../../hooks";
import { FETCH_CHANNEL } from "../../../queries";
import Message from "../message";

function Messages() {
  const params = useParams();
  const { ref, handleScrollToBottom } = useScrollToBottom();

  const { loading, error, data } = useQuery(FETCH_CHANNEL, {
    variables: {
      _id: params._id,
    },
  });

  useEffect(() => {
    handleScrollToBottom();
  }, []);

  if (loading) return null;
  if (error) return null;

  return (
    <div className="overflow-hidden overflow-y-scroll h-96">
      {data.channel.messages.map((message: IMessage) => {
        return <Message key={message._id} message={message} />;
      })}
      <div ref={ref}></div>
    </div>
  );
}

export default Messages;
