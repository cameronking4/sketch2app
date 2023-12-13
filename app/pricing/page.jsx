'use client';

import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

// UI
export default function Page() {

    return (
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen overflow-hidden">
          <Header/>
          <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-12">
              <h2 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
                 Free & Open Source
              </h2>
              <br></br>
              <p>Use our OpenAI keys as we search for product market fit</p>
              <br></br>
              <strong><p>Potential PRO features:</p></strong>
              <br></br>
              <ul>
                <li>Support more frameworks (Flutter, Python + Streamlit, Swift)</li>
                <li>Multiple sketches + notes</li>
                <li>Auth and save sketches to account / teams</li>
                <li>Capture sketch on virtual whiteboard</li>
                <li>Real-time Collaboration</li>
              </ul>
          </main>
          <br />
          <Footer />
      </div>
    );
}
