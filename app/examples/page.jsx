'use client';

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const exampleCards = [
  {
    title: "Instagram layout",
    imageUrl: "https://github.com/cameronking4/sketch2app/public/example1.png"
  },
  {
    title: "Custom list view",
    imageUrl: "https://github.com/cameronking4/sketch2app/public/example2.png"
  },
  {
    title: "Upload file web app",
    imageUrl: "https://github.com/cameronking4/sketch2app/public/example3.png"
  },
  // Add more example sketches here
];

const options = ["React", "React Native"];

// Card Component
const Card = ({ title, imageUrl }) => (
  <div className="bg-white rounded-lg shadow-md p-10">
    <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-md" />
    <h3 className="text-xl font-semibold mt-3">{title}</h3>
    <div className="mt-2">
      <select className="border rounded-md p-2 w-full">
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
    <button 
    className="bg-black text-white rounded-md px-4 py-2 mt-4 w-full hover:bg-slate-600">
      Generate
    </button>
  </div>
);

// UI

export default function Page() {
    return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen overflow-hidden">
        <Header/>
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-12">
            <h2 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
                Example sketches
            </h2>
            <br></br>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 w-full gap-8 mt-6">
              {exampleCards.map(card => (
                <Card key={card.title} {...card} />
              ))}
            </div>
        </main>
        <br />
        <Footer />
    </div>
  );
}
