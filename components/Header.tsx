import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full border-b-2 pb-4 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/writingIcon.png"
          width={30}
          height={30}
        />
        <h1 className="sm:text-2xl text-xl font-bold tracking-tight">
          sketch-to-code
        </h1>
      </Link>
      {/* <a
        href="https://vercel.com/templates/next.js/twitter-bio"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="Vercel Icon"
          src="/vercelLogo.png"
          className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
          width={32}
          height={28}
        />
      </a> */}
    </header>
  );
}
