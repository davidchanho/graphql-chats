import { useMutation, useReactiveVar } from "@apollo/client";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { currentChannelVar, userVar } from "../../../client";
import { useScrollToBottom } from "../../../hooks";
import { ADD_MESSAGE } from "../../../queries";

function MessageForm() {
  const currentChannel = useReactiveVar(currentChannelVar);
  const user = useReactiveVar(userVar);
  const [text, setText] = useState("");
  const { handleScrollToBottom } = useScrollToBottom();

  const [addMessage, { client }] = useMutation(ADD_MESSAGE, {
    variables: {
      item: { text, channel: currentChannel, user },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage();
    setText("");
    handleScrollToBottom();
    client.resetStore();
  };

  return (
    <form className="flex shadow-sm" onSubmit={handleSubmit}>
      <textarea
        className="w-full"
        value={text}
        onChange={handleChange}
        placeholder="Message"
      />

      <button
        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        type="submit"
      >
        <PaperAirplaneIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <span>Send</span>
      </button>
    </form>
  );
}

export default MessageForm;
