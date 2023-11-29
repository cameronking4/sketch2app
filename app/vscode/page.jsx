'use client';

import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DropDown from '../../components/DropDown';
import Footer from '../../components/Footer';
import Sandbox from '../../components/Sandpack';
import Header from '../../components/VSHeader';
import { useChat } from 'ai/react';
import Webcam from "react-webcam";
import axios from "axios";
import { Sandpack } from "@codesandbox/sandpack-react";
import ReactMarkdown from 'react-markdown' 

export default function Page() {
  const [img, setImg] = useState(null);
  const webcamRef = useRef();
  const [vibe, setVibe] = useState('React');
  const [generating, isGenerating] = useState(false);
  const [regenerating, isRegenerating] = useState(false);
  const [response, setResponse] = useState(null);

  const capture = useCallback(async () => {
      const imageSrc = webcamRef?.current.getScreenshot();
      if (imageSrc) {
        setImg(imageSrc);
        // await upload(imageSrc);
      } else {
        // Handle the case where the screenshot couldn't be captured
        console.error("Failed to capture screenshot from webcam");
      }
  }, [webcamRef]);

  const [responseText, setResponseText] = useState('');

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-12">
      <h2 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
         {response ? `Voila! Try your ${vibe} code` : 'Generate code from a hand-drawn sketch'}
        </h2>
        { response ?
        <div className='w-full'>
          <button
            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
            disabled
          >
          <span className="loading">
            <span style={{ backgroundColor: 'white' }} />
            <span style={{ backgroundColor: 'white' }} />
            <span style={{ backgroundColor: 'white' }} />
          </span>
        </button>
        
        <br/>
        <br />
      </div>
      : 
        <>
        {/* <p className="text-slate-500 mt-2">47,118 bios generated so far.</p> */}
        <div className="max-w-xl w-full">
       
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Submit your sketch.{' '}
              <span className="text-slate-500">
                (doesn't need to be perfect)
              </span>
            </p>
          </div>
          {img === null ? (
          <> 
          <div className='mt-2'/>
          <Webcam 
           ref={webcamRef}
           screenshotFormat="image/jpeg"
           minScreenshotWidth={800}
           minScreenshotHeight={600}
           />
          </>
          ) : (
          <>
            <img className='mt-2' width="100%" height="100%" src={img} alt="screenshot" />
            <div className="flex mt-5 mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">What kind of project?</p>
            </div>
           <div className="block">
            <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
            </div>
          </>
        )}
        { !generating ? (<>
        {img === null ?  (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-4 hover:bg-black/80 w-full"
              onClick={() => capture()}
            >
              Capture sketch &rarr;
            </button>
          ) : (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-4 hover:bg-black/80 w-full"
              onClick={() => sendUpload()}
            >
              Submit & Exit to VS Code &rarr;
            </button>
          )
         } 
         </>
         ):
         (<button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          disabled
        >
          <span className="loading">
            <span style={{ backgroundColor: 'white' }} />
            <span style={{ backgroundColor: 'white' }} />
            <span style={{ backgroundColor: 'white' }} />
          </span>
        </button>)}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        </>
        }
      </main>
      <br/>
      <Footer />
    </div>
  );
}
