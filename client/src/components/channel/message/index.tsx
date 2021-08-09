import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../common/avatar";
import { MessageProps } from "../../../types";
import MessageMenu from "./MessageMenu";

function Message({ message }: MessageProps) {
  return (
    <div className="hover:bg-gray-200 cursor-pointer px-4 py-5 sm:px-5">
      <div className="flex flex-row gap-3">
        <Avatar size="10" />
        <div className="w-full">
          <div className="flex items-center">
            <div className="flex flex-row gap-1 items-center w-full">
              <p className="text-md font-bold text-gray-900">
                <Link to="#" className="hover:underline">
                  {message.user.name}
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                <Link to="#" className="hover:underline">
                  {message.date}
                </Link>
              </p>
            </div>
            <div className="flex-shrink-0 self-center flex">
              <MessageMenu />
            </div>
          </div>
          <div>{message.text}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
