import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../common/avatar";
import { FETCH_MESSAGE } from "../../../queries";
import { MessageProps } from "../../../types";
import MessageMenu from "./MessageMenu";

function Message({ message }: MessageProps) {
  const { loading, error, data } = useQuery(FETCH_MESSAGE, {
    variables: {
      _id: message._id,
    },
  });

  if (loading) return null;
  if (error) return null;

  return (
    <div className="hover:bg-gray-200 cursor-pointer px-4 py-5 sm:px-5">
      <div className="flex flex-row gap-3">
        <Avatar size="10" user={data.message.user} />
        <div className="w-full">
          <div className="flex items-center">
            <div className="flex flex-row gap-1 items-end w-full">
              <p className="text-md font-bold text-gray-900">
                <Link
                  to={`/users/${data.message.user._id}`}
                  className="hover:underline"
                >
                  {data.message.user.name}
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                <Link to="#" className="hover:underline">
                  {data.message.createdAt}
                </Link>
              </p>
            </div>
            <div className="flex-shrink-0 self-center flex">
              <MessageMenu />
            </div>
          </div>
          <div className="pr-5">{data.message.text}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
