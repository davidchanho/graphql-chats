import { Menu } from "@headlessui/react";
import React from "react";
import { classNames } from "../../../helpers";

interface Props {
  item: {
    label: string;
    icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  };
}

function MessageMenuItem({ item }: Props) {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href="#"
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "flex px-4 py-2 text-sm"
          )}
        >
          <item.icon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <span>{item.label}</span>
        </a>
      )}
    </Menu.Item>
  );
}
export default MessageMenuItem;
