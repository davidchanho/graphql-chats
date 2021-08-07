import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { FETCH_CHANNEL } from "../../queries";
import ChannelHeader from "./channel-header";
import MessageForm from "./message-form";
import Messages from "./messages";

function Channel() {
  const params = useParams();

  const { loading, error, data } = useQuery(FETCH_CHANNEL, {
    variables: {
      _id: params._id,
    },
  });

  if (loading) return null;
  if (error) return null;

  return (
    <main className="flex-1 flex flex-col">
      <ChannelHeader channel={data.channel} />
      <Messages />
      <MessageForm />
    </main>
  );
}

export default Channel;
