import { BellIcon } from '@heroicons/react/solid';
import React from 'react'

function NotificationMenu() {
    return (
      <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-8 w-auto" aria-hidden="true" />
      </button>
    );
}

export default NotificationMenu;
