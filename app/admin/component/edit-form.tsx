import { JokeContext } from "@/context/joke-context";
import React, { useContext } from "react";
import { ClipLoader } from "react-spinners";

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
    selectedJokeData,
    submitJoke,
    isDeletingLoading,
    isSubmittingLoading,
  } = useContext(JokeContext);

  const handleDelete = (e: any) => {
    e.preventDefault();

    // Ask for confirmation before deleting
    if (window.confirm("Are you sure you want to delete this joke?")) {
      if (selectedJokeId) {
        deleteJoke(selectedJokeId);
      }
    } else {
      return;
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Ask for confirmation
    if (window.confirm("Are you sure you want to submit?")) {
      if (selectedJokeData) {
        selectedJokeData.type = selectedJokeType || "";
        submitJoke(selectedJokeData);
      }
    } else {
      return;
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
          value={selectedJokeType || ""}
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
        <button
          className="bg-red-600 text-white rounded-md p-2 my-5 w-1/3 justify-center"
          onClick={handleDelete}
          disabled={isDeletingLoading || selectedJokeId === null}
        >
          <ClipLoader color="white" loading={isDeletingLoading} size={20} />
          Remove
        </button>
        <button
          className="bg-green-600 text-white rounded-md p-2 my-5 w-2/3 justify-center"
          onClick={handleSubmit}
          disabled={isSubmittingLoading || selectedJokeId === null}
        >
          <ClipLoader color="white" loading={isSubmittingLoading} size={20} />
          Submit
        </button>
      </div>
    </form>
  );
}
