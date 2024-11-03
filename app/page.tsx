'use client';

import GenerateJoke from "@/components/Form-joke";
import ViewJoke from "@/components/View-joke";
import { JokeContext } from "@/context/joke-context";
import { Snackbar } from "@mui/material";
import { useContext } from "react";

export default function Home() {
  const { isToastOpen, handleToatsClose } = useContext(JokeContext);
  return (
    <main className="flex-1 flex flex-col s">
      <section className="flex-1 grid grid-cols-2">
        <div className="flex flex-col  justify-center items-center order-1 lg:order-1 space-x-3 rounded-md ">
          <GenerateJoke />
        </div>
        <div className="flex flex-col  justify-center items-center order-1 lg:order-1 space-x-3 rounded-md">
          <ViewJoke />
          <Snackbar
            open={isToastOpen}
            onClose={handleToatsClose}
            message="Joke saved Successfully"
          />
        </div>
      </section>
    </main>
  );
}
