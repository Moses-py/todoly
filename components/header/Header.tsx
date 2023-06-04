"use client";

import fetchSuggestion from "@/libs/fetchSuggestion";
import { useBoardStore } from "@/store/BoardStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
const Header = () => {
  const [searchString, setSearchString, board] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
    state.board,
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };

    fetchSuggestionFunc();
  }, [board]);

  return (
    <>
      <header className="w-full">
        <div className="bg-gray-500/10 flex flex-col md:flex-row items-center p-5  rounded-b-2xl justify-between py-6 container mx-auto px-5">
          <div
            className="
          absolute
          w-full
          h-96 
          top-0 
          left-0 
          right-0 
          bg-gradient-to-br
          from-pink-500
          to-[#0055D1]
          filter
          blur-3xl
          -z-50
          rounded-md
          opacity-50
          "
          />
          <Image
            src="/todoly.webp"
            alt="task.ai logo"
            width={100}
            height={100}
            className="w-auto h-auto pb-10 md:pb-0 object-contain"
          />
          <div className="flex items-center space-x-5">
            {/* Search box */}

            <form className="flex items-center space-x-5 bg-white rounded p-2 shadow-md flex-1 md:flex-initial justify-end w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                type="text"
                className="outline-none"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <button hidden type="submit">
                Search
              </button>
            </form>
            <Avatar
              name="Moses Chukwunekwu"
              round="100%"
              color="#0055D1"
              size="40"
            />
          </div>
        </div>
        <div className="flex items-center justify-center px-5 md:py-5 py-4">
          <p className="p-5 flex items-center text-sm pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-10 h-10 inline-block text-[#0055D1] mr-1 ${
                loading && "animate-spin"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {suggestion && !loading
              ? suggestion
              : "GPT is summarizing your tasks for the day"}
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
