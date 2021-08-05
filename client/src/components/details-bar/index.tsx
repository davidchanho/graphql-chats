import { XIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function DetailsBar() {
  const [open, setOpen] = useState(true);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
        <div className="px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <div className="ml-3 h-7 flex items-center">
              <button
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 relative flex-1 px-4 sm:px-6">
          {/* Replace with your content */}
          <div className="absolute inset-0 px-4 sm:px-6">
            <div
              className="h-full border-2 border-dashed border-gray-200"
              aria-hidden="true"
            />
          </div>
          {/* /End replace */}
        </div>
      </div>
    </div>
  );
}
