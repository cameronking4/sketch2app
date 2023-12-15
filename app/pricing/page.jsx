'use client';

import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import { CheckIcon } from '@heroicons/react/20/solid'

const includedFeatures = [
  'Support more frameworks (Flutter, Python + Streamlit)',
  'Multiple sketches + notes',
  'Auth and save sketches to account / teams',
  'Capture sketch on virtual whiteboard',
  'Real-time Collaboration',
]

// UI
export default function Page() {

    return (
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen overflow-hidden">
      <Header/> 
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
      <div className="bg-white mt-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Free & Open Source</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Use our OpenAI keys as we search for product market fit
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-2xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">Potential PRO features:</h3>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Below are features in our roadmap. Let us know if you'd find any of the following valuable:
                </p>
                <div className="mt-6 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
                  <div className="h-px flex-auto bg-gray-100" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                >
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        </main>
        <Footer />
      </div>
    );
}
