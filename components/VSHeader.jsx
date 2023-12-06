import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full border-b-2 pb-4 sm:px-4 px-2">
      <div className="flex space-x-3">
        <Image
          alt="header text"
          src="/writingIcon.png"
          width={30}
          height={30}
        />
        <h1 className="sm:text-2xl text-xl font-bold tracking-tight">
          sketch-2-app
        </h1>
      </div>
      <div>
        VS Code Extension
      </div>
    </header>
  );
}
