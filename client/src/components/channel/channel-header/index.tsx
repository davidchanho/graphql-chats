import { UserIcon } from "@heroicons/react/outline";
import React from "react";
import AvatarGroup from "../../../common/avatar-group";
import { ChannelProps } from "../../../types";

function ChannelHeader({ channel }: ChannelProps) {
  return (
    <header className="p-3 border-b border-gray-200 flex flex-row justify-between items-center">
      <div>
        <h2 className="text-lg font-bold">#{channel.name}</h2>
        <div className="inline-flex gap-1">
          <UserIcon className="w-6 h-auto" />
          <p>{channel?.users?.length}</p>
        </div>
      </div>

      <div>{channel.users && <AvatarGroup />}</div>
    </header>
  );
}

export default ChannelHeader;
