import { useQuery } from "@apollo/client";
import { UserIcon } from "@heroicons/react/outline";
import React from "react";
import { useParams } from "react-router";
import { FETCH_CHANNEL } from "../../queries";
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
      <header className="p-3 border-b border-gray-200">
        <h2 className="text-lg font-bold">#{data.channel.name}</h2>
        <div className="inline-flex gap-1">
          <UserIcon className="w-6 h-auto" />
          <p>{data.channel.users.length}</p>
        </div>
      </header>
      <Messages messages={data.channel.messages} />
      <MessageForm />
    </main>
  );
}

export default Channel;
