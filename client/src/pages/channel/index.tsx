import React from "react";
import ChannelHeader from "../../components/channel/channel-header";
import MessageForm from "../../components/channel/message-form";
import Messages from "../../components/channel/messages";

export default function Channel() {
  return (
    <main className="flex-1 flex flex-col">
      <ChannelHeader />
      <Messages />
      <MessageForm />
    </main>
  );
}
