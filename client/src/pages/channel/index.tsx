import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { currentChannelVar } from "../../client";
import ChannelHeader from "../../components/channel/channel-header";
import MessageForm from "../../components/channel/message-form";
import Messages from "../../components/channel/messages";
import { FETCH_CHANNELS } from "../../queries";

export default function Channel() {
  const { loading, error, data } = useQuery(FETCH_CHANNELS);

  useEffect(() => {
    currentChannelVar(data.channels[0]._id);
  }, []);

  if (loading) return null;
  if (error) return null;

  return (
    <>
      <ChannelHeader />
      <Messages />
      <MessageForm />
    </>
  );
}
