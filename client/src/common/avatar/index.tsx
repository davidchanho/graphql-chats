import React from "react";

interface Props {
  size?: string;
  src?: string | null | undefined;
  round?: boolean;
}

function Avatar({
  size = "8",
  src = "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  round = false,
}: Props) {
  if (!src) {
    return (
      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
        <span className="text-sm font-medium leading-none text-white">TW</span>
      </span>
    );
  }

  return (
    <img
      className={`h-${size} w-auto ${round ? "rounded-full" : "rounded"}`}
      src={src}
      alt=""
    />
  );
}

export default Avatar;
