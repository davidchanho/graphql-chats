import React from "react";
import { users } from "../../data";
import Avatar from "../avatar";

export default function AvatarGroup() {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex -space-x-1 overflow-hidden">
        {users.slice(0, 3).map((user: any) => {
          return (
            <Avatar
              size="8"
              key={`${user.name}-avatar`}
              src={user.avatar}
              round
            />
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
