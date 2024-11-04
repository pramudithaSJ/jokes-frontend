import GenerateJoke from "@/components/Form-joke";
import ViewJoke from "@/components/View-joke";
import React from "react";

export default function Display() {
  return (
    <main className="flex-1 flex flex-col s">
      <section className="flex-1 grid grid-cols-2">
        <div className="flex flex-col  justify-center items-center order-1 lg:order-1 space-x-3 rounded-md ">
          <GenerateJoke isDisplay={true} />
        </div>
        <div className="flex flex-col  justify-center items-center order-1 lg:order-1 space-x-3 rounded-md">
          <ViewJoke isDisplay={true} />
        </div>
      </section>
    </main>
  );
}
