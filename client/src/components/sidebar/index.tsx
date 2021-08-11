import { useQuery } from "@apollo/client";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { IChannel } from "../../../../shared/types";
import Badge from "../../common/badge";
import { classNames } from "../../helpers";
import { FETCH_CHANNELS } from "../../queries";
import { ListProps, Props } from "./Sidebar.types";

function Sidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const { loading, error, data } = useQuery(FETCH_CHANNELS);

  if (loading) return null;
  if (error) return null;

  return (
    <>
      <Transition.Root  show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-40 flex md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 px-4 flex items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                  alt="Workflow"
                />
              </div>
              <div className="flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {data.channels.map((channel: IChannel, index: number) => (
                    <Link key={channel._id} to={`/channels/${channel._id}`}>
                      <li
                        className={classNames(
                          index === 0
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group rounded-md p-2 flex items-center justify-between text-sm font-medium cursor-pointer capitalize"
                        )}
                      >
                        {channel.name}
                        <Badge
                          label={`${channel?.messages?.length}`}
                          color="gray"
                        />
                      </li>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden md:flex md:flex-shrink-0 border-r">
        <div className="border-gray-200 pb-4 flex flex-col flex-grow overflow-y-auto">
          <List
            channels={[
              { name: "Channels", children: data.channels, current: true },
            ]}
          />
        </div>
      </div>
    </>
  );
}

function List({ channels }: ListProps) {
  return (
    <ul className="divide-y divide-gray-200">
      {channels.map((item) => (
        <Disclosure defaultOpen={true} as="div" key={item.name} className="space-y-1">
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
                <div className="flex flex-row items-center">
                  <svg
                    className={classNames(
                      open ? "text-gray-400 rotate-90" : "text-gray-300",
                      "mr-1 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                    )}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                  </svg>
                  <span className="font-bold text-lg">{item.name}</span>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="space-y-1 overflow-y-scroll">
                {item.children.map((item) => (
                  <Link key={item._id} to={`/channels/${item._id}`}>
                    <li className="flex flex-row space-x-2 py-2 px-3 items-center justify-between hover:bg-gray-100 cursor-pointer">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        #{item.name}
                      </p>
                      <Badge label={`${item.messages?.length}`} color="gray" />
                    </li>
                  </Link>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </ul>
  );
}

export default Sidebar;
