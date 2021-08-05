import { useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { IChannel } from "../../../../shared/types";
import Badge from "../../common/badge";
import { classNames } from "../../helpers";
import { FETCH_CHANNELS } from "../../queries";
import CreateChannel from "./create-channel";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const { loading, error, data } = useQuery(FETCH_CHANNELS);

  if (loading) return null;
  if (error) return null;

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
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
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
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

      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 flex flex-col">
          <div className="border-r border-gray-200 pt-3 pb-4 flex flex-col flex-grow overflow-y-auto">
            <div className="flex-grow flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <h2 className="px-3 mb-2 text-md font-bold capitalize">
                  Channels
                </h2>
                <PlusIcon className="w-6 h-auto m-1" />
              </div>

              <nav className="px-2 space-y-1 h-2/6 overflow-y-scroll">
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
              <CreateChannel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
