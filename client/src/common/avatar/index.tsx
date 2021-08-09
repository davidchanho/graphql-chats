import React from "react";
import { users } from "../../data";

interface Props {
  name?: string;
  size?: string;
  src?: string | null | undefined;
  round?: boolean;
}

function Avatar({
  name,
  size = "8",
  src = users[0].avatar,
  round = false,
}: Props) {
  if (!src) {
    return (
      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
        <span className="text-sm font-medium leading-none text-white">
          {name}
        </span>
      </span>
    );
  }

  return (
    <img
      className={`h-${size} w-auto ${
        round ? "rounded-full" : "rounded"
      } ring-2 ring-white`}
      src={src}
      alt=""
    />
  );
}

export default Avatar;
