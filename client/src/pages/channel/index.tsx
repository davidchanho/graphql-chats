import React from "react";
import ChannelHeader from "../../components/channel/channel-header";
import MessageForm from "../../components/channel/message-form";
import Messages from "../../components/channel/messages";

export default function Channel() {
  return (
    <>
      <ChannelHeader />
      <Messages />
      <MessageForm />
    </>
  );
}
