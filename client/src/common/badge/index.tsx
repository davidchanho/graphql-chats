import React from "react";

interface Props {
  label: string;
  color: string;
}

function Badge({ label, color }: Props) {
  if (label === "0") return null;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
    >
      {label}
    </span>
  );
}

export default Badge;
