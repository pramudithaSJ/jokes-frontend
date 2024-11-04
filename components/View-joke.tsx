"use client";
import { JokeContext, Joke } from "@/context/joke-context";
import Snackbar from "@mui/material/Snackbar";

import React, { useContext } from "react";
import { ClipLoader, RiseLoader } from "react-spinners";

interface ViewJokeProps {
  isDisplay: boolean;
}

export default function ViewJoke({ isDisplay }: ViewJokeProps) {
  const {
    joke,
    loading,
    type,
    saveJoke,
    isSavingLoading,
    isToastOpen,
    handleToatsClose,
    jokeforDisplay,
  } = useContext(JokeContext);

  async function onSave() {
    const data: Joke = {
      _id: "",
      type: type,
      text: joke,
      date: new Date(),
      status: "pending",
    };

    await saveJoke(data);
  }
  return (
    <section className="flex-1  mt-5 mx-2 w-full px-5 py-10">
      <div className="flex flex-col bg-gray-100 text-gray-200 rounded-md p-10 overflow-y-auto font-mono  w-full h-full">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center">
              {/* <div className="w-10 h-10 border-t-2 border-b-2 border-purple-700 rounded-full animate-spin" /> */}
              <RiseLoader size={20} color="#4B5563" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            {joke ? (
              <div className="flex flex-col items-center space-y-10">
                <p className="text-lg text-center">{joke}</p>
                <button
                  className="w-1/2 bg-gray-800 text-white px-2 py-5 rounded-md hover:bg-gray-600"
                  onClick={onSave}
                >
                  <ClipLoader
                    color={"#ffffff"}
                    loading={isSavingLoading}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  Save
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-600 justify-center">
                {isDisplay ? (
                  <div>
                    {jokeforDisplay.length > 0 ? (
                      <div>
                        <h1 className="text-2xl font-bold">Joke</h1>
                        <p className="text-lg">{jokeforDisplay[0].text}</p>
                        <h1 className="text-2xl font-bold">Type</h1>
                        <p className="text-lg">{jokeforDisplay[0].type}</p>
                      </div>
                    ) : (
                      <div>
                        <h1 className="text-2xl font-bold">
                          No Joke to display
                        </h1>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <h1 className="text-2xl font-bold">Step 1</h1>
                    <p className="text-lg">Selecet a type</p>
                    <h1 className="text-2xl font-bold">Step 2</h1>
                    <p className="text-lg">Click on generate</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
