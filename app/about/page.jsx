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

  const opts = {
    height: '430',
    width: '550',
    playerVars: {
      
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const features = [
    {
      name: 'Step 1',
      description:
        'Draw a sketch a sketch / wireframe of your app layout or component',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Step 2',
      description:
        'Capture the sketch using the web app or in VS Code & wait for the magic',
      icon: LockClosedIcon,
    },
    {
      name: 'Step 3',
      description:
        'Regenerate, tweak with exact text edits or export to CodeSandbox',
      icon: ArrowPathIcon,
    },
  ]
    
    return (
      <>
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen overflow-hidden">
        <Header/> 
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <div className="bg-white mt-10">
          <div className="w-full">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Made for rapid prototypers
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              We're a PRO-Dev tool, not another low code tool. Bring a vision to reality in less than 30 seconds, using the frameworks you already know! Spend less time looking for templates or boilerplate code.
              </p>
            </div>
            <div className="w-full mt-6 rounded-3xl ring-1 ring-gray-200 sm:mt-6 lg:mx-0 lg:flex ">
              <div className="pt-6 pl-6 lg:flex-auto">
                <div className='w-full'>
                  <YouTube videoId="1pWKNbSsI3o" opts={opts}/>
                </div>   
              </div>
              <div className="-mt-2 p-6 flex-shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-10">
                  <div className="mx-auto max-w-xs px-2">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">How it works</h3>
                  <br/>
                  <dl className="grid max-w-xl grid-cols-1 gap-x-3 gap-y-3 lg:max-w-none mt-2 lg:grid-cols-1 lg:gap-y-3">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt className="text-base font-semibold leading-7 text-slate-600">
                      {/* <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div> */}
                      {feature.name}
                    </dt>
                    <dd className="mt-2 px-2 text-base leading-7">{feature.description}</dd>
                  </div>
                ))}
              </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </main>
        <Footer />
      </div>
   </>
    );
}
