import Link from "next/link";

function Header() {
  return (
    <header className="relative p-10 text-center">
      <Link href="/" prefetch>
        <h1 className="text-6xl font-black">PJ Joke Generator</h1>
        <div className="flex justify-center whitespace-nowrap space-x-5 text-3xl lg:text-5xl">
          <h2>sharing happiness</h2>
          <div className="relative">
            <div className="absolute bg-purple-500 -left-2 -top-1 -bottom-1 -right-1 md:-left-3 md:top-0 md:bottom-0 md:-right-3 -rotate-1 h-" />
            <p className="relative text-white">To Life</p>
          </div>
        </div>
      </Link>
      
    </header>
  );
}

export default Header;
