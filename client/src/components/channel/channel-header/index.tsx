import { useQuery } from "@apollo/client";
import { UserIcon } from "@heroicons/react/outline";
import React from "react";
import { useParams } from "react-router-dom";
import AvatarGroup from "../../../common/avatar-group";
import { FETCH_CHANNEL_HEADER } from "../../../queries";

function ChannelHeader() {
  const params = useParams();

  const { loading, error, data } = useQuery(FETCH_CHANNEL_HEADER, {
    variables: {
      _id: params._id,
    },
  });

  if (loading) return null;
  if (error) return null;

  return (
    <header className="p-3 border-b border-gray-200 flex flex-row justify-between items-center">
      <div>
        <h2 className="text-lg font-bold">#{data.channel.name}</h2>
        <div className="inline-flex gap-1">
          <UserIcon className="w-6 h-auto" />
          <p>{data.channel?.users?.length}</p>
        </div>
      </div>

      <div>
        {data.channel.users && <AvatarGroup users={data.channel.users} />}
      </div>
    </header>
  );
}

export default ChannelHeader;
