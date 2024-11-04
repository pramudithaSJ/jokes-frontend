"use client";

import { JokeContext } from "@/context/joke-context";
import React, { useContext, useEffect } from "react";
import UpdateJoke from "./component/edit-form";
import { useRouter } from "next/navigation";

export default function Admin() {
  const {
    getJokeList,
    jokeList,
    selectedJokeId,
    setSelectedJokeId,
    getJokeById,
  } = useContext(JokeContext);

  const route = useRouter();

  useEffect(() => {
    getJokeList();
    // if (jokeList.length === 0) {
    //   route.push(`/admin/login`);
    // }
  }, []);

  return (
    <section className="flex-1 grid grid-cols-2 gap-2 max-h-96">
      {jokeList.length != 0 && (
        <div className="justify-center items-center space-y-2 rounded-md mx-10 overflow-y-scroll max-h-96">
          {jokeList.map((joke) => (
            <div
              key={joke._id}
              className={`flex flex-col items-center border border-black p-5 w-full my-10 rounded-md ${
                joke.status === "approved"
                  ? "bg-gray-300 text-black cursor-default" // No hover effect and different styling for approved jokes
                  : `hover:cursor-pointer ${
                      selectedJokeId === joke._id
                        ? "bg-gray-500 text-white"
                        : "hover:bg-gray-200"
                    }`
              }`}
              onClick={() => {
                if (joke.status !== "approved") { // Only allow click if not approved
                  setSelectedJokeId(joke._id);
                  getJokeById(joke._id);
                }
              }}
            >
              <p className="text-lg text-center mb-2">{joke.text}</p>
              <div className="flex space-x-3">
                <p className="text-sm text-center bg-gray-200 text-black py-2 px-2 rounded-lg">
                  {joke.type}
                </p>
                {joke.status === "pending" && (
                  <p className="text-sm text-center bg-yellow-200 text-black py-2 px-2 rounded-lg">
                    {joke.status}
                  </p>
                )}
                {joke.status === "approved" && (
                  <p className="text-sm text-center bg-green-200 text-black py-2 px-2 rounded-lg">
                    {joke.status}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {jokeList.length != 0 && (
        <div className="flex flex-col space-y-3 rounded-md mx-10">
          <UpdateJoke />
        </div>
      )}
    </section>
  );
}
