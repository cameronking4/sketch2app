'use client';

import React from 'react';
import YouTube from 'react-youtube';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';

// UI
export default function Page() {

  const [showBanner, setShowBanner] = useState(true);

  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const features = [
    {
      name: 'Step 1',
      description:
        'Draw a sketch on paper. It should be a wireframe of an app or component',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Step 2',
      description:
        'Capture your sketch using the web app & wait for generation',
      icon: LockClosedIcon,
    },
    {
      name: 'Step 3',
      description:
        'Regenerate, tweak with exact text edits or Export to CodeSandbox',
      icon: ArrowPathIcon,
    },
  ]
    
    return (
      <>
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen overflow-hidden">
        <Header/>
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-slate-50 px-6 py-2.5 sm:before:flex-1">
       { showBanner && <>
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
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
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-slate-900">
          <strong className="font-semibold">Install the VS Code extension</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          Work directly in Visual Studio Code and automatically inject code from the web app!
        </p>
        <a
          href="https://marketplace.visualstudio.com/items?itemName=Sketch2App.sketch2app"
          className="flex-none rounded-full bg-slate-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Install now <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button type="button"  onClick={() => {setShowBanner(false)}} className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-slate-900" aria-hidden="true" />
        </button>
      </div> 
      </> }
    </div>   
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <div className="bg-white sm:py-12">
        <div className="mx-auto max-w-8xl px-6 lg:px-2">
        <div className="w-full lg:text-center">
          {/* <h2 className="text-base font-semibold leading-7 text-slate-600">How it works</h2> */}
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Made for rapid prototypers
          </p>
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <center>
        <p className="m-4 mx-16 text-lg text-slate-600">
          We're a PRO-Dev tool, not another low code tool. Generate code to your exact UI requirements in less than 30 seconds, using the frameworks you already know. Less time searching for templates or codepens!
        </p>
        </center>
        </div>
        </div>
        <br></br>
        <div className='w-full'>
          <YouTube videoId="1pWKNbSsI3o" opts={opts}/>
        </div>
      
          <dl className="grid max-w-xl grid-cols-1 gap-x-3 gap-y-3 lg:max-w-none mt-8 lg:grid-cols-3 lg:gap-y-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt className="text-base font-semibold leading-7 text-slate-600">
                  {/* <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div> */}
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 ">{feature.description}</dd>
              </div>
            ))}
          </dl>
      </div>
    </div>
   </main>
   <Footer />
   </div>
   </>
    );
}
