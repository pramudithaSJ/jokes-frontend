"use client";

export const jokeTypes = [
  "Any",
  "Programming",
  "Dark",
  "Pun",
  "Spooky",
  "Christmas",
  "Miscellaneous",
  "Maths",
  "Science",
  "Technology",
];

import ClipLoader from "react-spinners/ClipLoader";

import { JokeContext } from "@/context/joke-context";
import { useContext } from "react";

export default function GenerateJoke() {
  const { isSavingLoading, getGeneratedJoke, setType, type, loading } =
    useContext(JokeContext);

  async function onSubmit() {
    await getGeneratedJoke(type);
  }

  return (
    <div className=" flex  flex-col w-full p-10 space-y-10">
      <div className="w-full px-10 flex flex-wrap">
        {jokeTypes.map((jokeType) => (
          <div key={jokeType} className=" space-x-7">
            <button
              className={`font-semibold py-2 px-4 border rounded m-2 ${
                type === jokeType
                  ? "bg-purple-700 text-white border-transparent" // Active state styles
                  : "bg-transparent text-purple-700 border-purple-500 hover:bg-purple-500 hover:text-white hover:border-transparent" // Default state styles
              }`}
              onClick={() => setType(jokeType)}
            >
              {jokeType}
            </button>
          </div>
        ))}
      </div>
      <div className="w-full px-10 flex justify-center">
        <button
          className="bg-purple-600 text-white w-full py-5 rounded-md flex justify-center space-x-5"
          onClick={onSubmit}
          disabled={type === ""}
        >
          <div>
            <ClipLoader
              color={"#ffffff"}
              loading={loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          <span> Generate</span>
        </button>
        <div />
      </div>
    </div>
  );
}
