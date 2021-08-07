import { SearchIcon } from "@heroicons/react/solid";
import React from "react";

function NavSearch() {
  return (
    <div className="flex w-6/12 mx-auto">
      <form className="w-full flex md:ml-0">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative w-full text-gray-400 focus-within:text-gray-600 flex items-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 ">
            <SearchIcon className="h-5 w-auto" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            className="block w-full border-0 border-b-2 border-gray-300 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-indigo-400 sm:text-sm"
            placeholder="Search"
            type="search"
            name="search"
          />
        </div>
      </form>
    </div>
  );
}

export default NavSearch;
