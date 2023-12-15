import Image from "next/image";
import Link from "next/link";
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from "react";


export default function Header() {
  const [showBanner, setShowBanner] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
    <header className="flex justify-between items-center w-full border-b-2 pb-4 sm:px-4 px-2">
      <Link href="https://sketch2app.io/" className="flex space-x-3">
        <Image
          alt="header text"
          src="/writingIcon.png"
          width={30}
          height={30}
        />
        <h1 className="sm:text-2xl text-xl font-bold tracking-tight">
          sketch-2-app
        </h1>
      </Link>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/about">
            <h1 className="sm:text-base text-sm">How it works</h1>
          </Link>
          <Link href="/examples">
            <h1 className="sm:text-base text-sm ml-5">
              Examples
            </h1>
          </Link>
          <Link href="/pricing">
            <h1 className="sm:text-base text-sm ml-5 mr-3">
              Pricing
            </h1>
          </Link>
          </div>
      </div>
    </header>
    <div className="px-10 relative isolate flex items-center gap-x-6 overflow-hidden bg-slate-50 px-6 py-2.5 sm:before:flex-1">
    { showBanner && windowWidth > 800 &&
    <div>
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl flex"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div className="flex items-center gap-x-4 gap-y-2">
      <img width={20} src='https://media4.giphy.com/media/SS8CV2rQdlYNLtBCiF/giphy.gif?cid=ecf05e47kvjh7dofa849yjvx9gowa0088yl0ilulog8aw3yv&ep=v1_gifs_search&rid=giphy.gif&ct=g'/>
       
        <p className="text-sm leading-6 text-slate-900">
          <strong className="font-semibold">Extension available</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
         Use Visual Studio Code commands to create new apps or components directly in the editor!
        </p>
        <a
          href="https://marketplace.visualstudio.com/items?itemName=Sketch2App.sketch2app"
          target="_blank"
          className="flex-none rounded-full bg-slate-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Install now <span aria-hidden="true">&rarr;</span>
        </a>
      </div>  
      </div> }
      </div>  
      </>
  );
}
