import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_CHANNEL } from "../../queries";

function CreateChannel() {
  const [name, setName] = useState("");

  const [addChannel, { client }] = useMutation(ADD_CHANNEL, {
    variables: {
      item: { name },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addChannel();
    setName("");
    client.resetStore();
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="channel"
      />
      <button type="submit">+</button>
    </form>
  );
}

export default CreateChannel;
