import React from "react";
import { IUser } from "../../../../shared/types";
import { UsersProps } from "../../types";
import Avatar from "../avatar";

export default function AvatarGroup({ users }: UsersProps) {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex -space-x-1 overflow-hidden">
        {users.slice(0, 3).map((user: IUser) => {
          return (
            <Avatar size="8" key={`${user._id}-avatar`} user={user} round />
          );
        })}
      </div>
      {users.length > 3 ? (
        <span className="flex-shrink-0 text-xs leading-5 font-medium">
          +{users.length - 3}
        </span>
      ) : null}
    </div>
  );
}
