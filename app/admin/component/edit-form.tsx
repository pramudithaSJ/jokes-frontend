import { JokeContext } from "@/context/joke-context";
import React, { useContext } from "react";

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

export default function UpdateJoke() {
  const {
    selectedJoke,
    selectedJokeType,
    setSelectedJoke,
    setSelectedJokeType,
    selectedJokeId,
    deleteJoke,
  } = useContext(JokeContext);

  const handleDelete = (e: any) => {
    e.preventDefault(); // Prevent form submission
    if (selectedJokeId) {
      deleteJoke(selectedJokeId);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} action="">
      <div className="flex flex-col space-y-2 justify-center my-10">
        <label htmlFor="joke" className="text-lg">
          Joke
        </label>
        <div className="bg-gray-600 text-gray-200 rounded-md p-10 overflow-y-auto font-mono ">
          <p className="text-lg text-center">{selectedJoke}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="type" className="text-lg">
          Type
        </label>
        <select
          name="type"
          id="type"
          value={selectedJokeType || ""} // Ensure a default empty string
          onChange={(e) => setSelectedJokeType(e.target.value)}
          className="border border-black rounded-md p-2"
        >
          {jokeTypes.map((jokeType) => (
            <option key={jokeType} value={jokeType}>
              {jokeType}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full space-x-1 flex">
        <button className="bg-purple-600 text-white rounded-md p-2 my-5 w-1/2 justify-center">
          Update
        </button>
        <button
          className="bg-red-600 text-white rounded-md p-2 my-5 w-1/2 justify-center"
          onClick={handleDelete}
        >
          Remove
        </button>
      </div>
    </form>
  );
}
