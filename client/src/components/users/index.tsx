import { useQuery } from "@apollo/client";
import { Disclosure } from "@headlessui/react";
import React from "react";
import { classNames } from "../../helpers";
import { FETCH_USERS } from "../../queries";
import { navigation } from "./Users.data";

function Users() {
  const { loading, error, data } = useQuery(FETCH_USERS);

  if (loading) return null;
  if (error) return null;

  return (
    <div className="hidden md:flex md:flex-shrink-0 border-l border-gray-200 h-full">
      <div className="flex-grow flex flex-col">
        <nav className="flex-1 space-y-1 overflow-y-scroll">
          <List />
        </nav>
      </div>
    </div>
  );
}

export default Users;

function List() {
  return (
    <ul className="-my-5divide-y divide-gray-200">
      {navigation.map((item) => (
        <Disclosure as="div" key={item.name} className="space-y-1">
          {({ open }) => (
            <>
              <Disclosure.Button
                className={classNames(
                  item.current
                    ? "bg-gray-100 text-gray-900"
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group w-full flex items-center justify-between px-2 py-2 text-left text-sm font-medium focus:bg-gray-100 focus:outline-none focus:ring-0 border-b border-t"
                )}
              >
                <span className="font-bold text-lg">{item.name}</span>
                <div className="flex flex-row items-center">
                  {item.children.length}
                  <svg
                    className={classNames(
                      open ? "text-gray-400 rotate-90" : "text-gray-300",
                      "ml-1 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                    )}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                  </svg>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="space-y-1 overflow-y-scroll">
                {item.children.map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-row space-x-2 py-2 pl-7 items-center "
                  >
                    <div className="flex-shrink-0">
                      {/* <Avatar round src={item.avatar} size="8" /> */}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {"@" + item.name.toLowerCase().replace(" ", "")}
                      </p>
                    </div>
                  </li>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </ul>
  );
}
