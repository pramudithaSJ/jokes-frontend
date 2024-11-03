import { BookOpen, FilePen, Home, User2Icon } from "lucide-react";
import Link from "next/link";

function Header() {
  return (
    <header className="relative p-10 text-center">
      <Link href="/" prefetch>
        <h1 className="text-6xl font-black">PJ Jokes</h1>
        <div className="flex justify-center whitespace-nowrap space-x-5 text-3xl lg:text-5xl">
          <h2>sharing happiness</h2>
          <div className="relative">
            <div className="absolute bg-purple-500 -left-2 -top-1 -bottom-1 -right-1 md:-left-3 md:top-0 md:bottom-0 md:-right-3 -rotate-1 h-" />
            <p className="relative text-white">To Life</p>
          </div>
        </div>
      </Link>

      <div className=" absolute -top-5 right-5 flex space-x-2">
        <Link href="/">
          <Home className="w-8 h-8 lg:w-10 lg:h-10 mx-auto p-2 mt-10 text-purple-500 border border-purple-500 rounded-md hover:opacity-50 cursor-pointer" />
        </Link>
        <Link href="/admin/login">
          <User2Icon className="w-8 h-8 lg:w-10 lg:h-10 mx-auto p-2 mt-10 text-purple-500 border border-purple-500 rounded-md hover:opacity-50 cursor-pointer" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
