import { useMutation, useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import { currentChannelVar, userVar } from "../../client";
import { ADD_MESSAGE } from "../../queries";

function MessageForm() {
  const currentChannel = useReactiveVar(currentChannelVar);
  const user = useReactiveVar(userVar);
  const [text, setText] = useState("");

  const [addMessage, { client }] = useMutation(ADD_MESSAGE, {
    variables: {
      item: { text, channel: currentChannel, user },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage();
    setText("");
    client.resetStore();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="message"
      />
      <button type="submit">+</button>
    </form>
  );
}

export default MessageForm;
