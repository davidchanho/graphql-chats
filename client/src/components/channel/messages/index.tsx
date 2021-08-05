import React from "react";
import { IMessage } from "../../../../../shared/types";
import Message from "../message";

interface Props {
  messages: IMessage[];
}

function Messages({ messages }: Props) {
  return (
    <div className="overflow-y-scroll h-4/6">
      {messages.map((message: IMessage) => {
        return <Message key={message._id} message={message} />;
      })}
    </div>
  );
}

export default Messages;
