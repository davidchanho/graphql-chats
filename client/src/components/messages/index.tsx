import { useQuery, useReactiveVar } from "@apollo/client";
import React from "react";
import { IMessage } from "../../../../shared/types";
import { currentChannelVar } from "../../client";
import { FETCH_CHANNEL } from "../../queries";
import Message from "../message";

function Messages() {
  const currentChannel = useReactiveVar(currentChannelVar);

  const { loading, error, data } = useQuery(FETCH_CHANNEL, {
    variables: {
      _id: currentChannel,
    },
  });

  if (loading) return null;
  if (error) return null;

  return (
    <section
      aria-labelledby="primary-heading"
      className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"
    >
      <h1 id="primary-heading" className="sr-only">
        messages
      </h1>
      <h1>{data.channel.name}</h1>
      <div className="overflow-y-scroll">
        {data.channel.messages.map((message: IMessage) => {
          return <Message key={message._id} message={message} />;
        })}
      </div>
    </section>
  );
}

export default Messages;
