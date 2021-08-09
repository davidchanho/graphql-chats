import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import ChannelHeader from "../../components/channel/channel-header";
import MessageForm from "../../components/channel/message-form";
import Messages from "../../components/channel/messages";
import { FETCH_CHANNEL } from "../../queries";

export default function Chatroom() {
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
