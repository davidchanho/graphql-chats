import React, { InputHTMLAttributes } from "react";

function Input({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none sm:text-sm border-gray-300"
      {...props}
    />
  );
}

export default Input;
