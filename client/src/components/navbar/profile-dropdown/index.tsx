import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Avatar from "../../../common/avatar";
import { useAuthContext } from "../../../client/firebase";
import { classNames } from "../../../helpers";
import { SignOut } from "../../auth/sign-out";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const ProfileDropdown = () => {
  const { user } = useAuthContext();

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">Open user menu</span>
              <Avatar size="8" round src={user?.photoURL} />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
            >
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block py-2 px-4 text-sm text-gray-700"
                      )}
                    >
                      {item.name === "Sign out" ? <SignOut /> : item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default ProfileDropdown;
