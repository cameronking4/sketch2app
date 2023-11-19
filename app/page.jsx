'use client';

import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DropDown from '../components/DropDown';
import Footer from '../components/Footer';
import Github from '../components/GitHub';
import Header from '../components/Header';
import { useChat } from 'ai/react';
import Webcam from "react-webcam";
import axios from "axios";
import { Sandpack } from "@codesandbox/sandpack-react";

const OAI_APIKEY = "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"

function removeBackticksAndJSX(inputString) {
  const result = inputString.replace(/```|jsx|\n/g, '');
  return result;
}

export const upload = async (persona, base64_img) => {
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: `You are an expert react developer. Create a react app.js page and use inline tailwind styling to replicate the exact image. No other strings as i will copy your response directly into a setup App.js file.`,
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: base64_img,
              },
            },
          ],
        },
        {
          role: "user",
          content: `Please return only the code for App.js`,
        },
      ],
      max_tokens: 2048,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OAI_APIKEY}`,
      },
    }
  );
  let msg = res.data.choices[0].message.content;
  console.log(msg);
  return removeBackticksAndJSX(msg);
};

export default function Page() {
  const [img, setImg] = useState(null);
  const webcamRef = useRef();

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

  const sendUpload = async() => {
    isGenerating(true);
    const response = await upload(vibe, img);
    setResponse(response);
  }

  const [vibe, setVibe] = useState('React');
  const [generating, isGenerating] = useState(false);
  const [response, setResponse] = useState(null);

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-12">
      <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
         {response ? 'Voila! Try your code' : 'Generate code from a hand-drawn sketch'}
        </h1>
        <br />
        { response ? <Sandpack
            template="react"
            customSetup={{
              dependencies: {
                "react-markdown": "latest",
                "tailwindcss": "latest",
                "postcss": "latest",
                "autoprefixer": "latest"
              },
              files: {
                "/App.js": `
                ${response}
                `,
                "/index.css": `
                  @tailwind base;
                  @tailwind components;
                  @tailwind utilities;
                `,
                "/postcss.config.js": `
                  module.exports = {
                    plugins: {
                      tailwindcss: {},
                      autoprefixer: {},
                    },
                  }
                `,
                "/tailwind.config.js": `
                  module.exports = {
                    content: [
                      "./src/**/*.{js,jsx,ts,tsx}",
                    ],
                    theme: {
                      extend: {},
                    },
                    plugins: [],
                  }
                `
              }
            }}
          />
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
          {/* <a
          className="mt-2 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-4 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/Nutlope/twitterbio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a> */}
          </>
          ) : (
          <>
            <img className='mt-2' width="800" height="600" src={img} alt="screenshot" />
            <div style={{ color: "#ffffff", padding: "15px 0" }}>
              GPT-4V is crunching numbers...
            </div>
            <div className="flex mb-5 items-center space-x-3">
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
              Generate code sandbox &rarr;
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
        {/* <output className="space-y-10 my-10">
          {response}
        </output> */}
        </>
        }
      </main>
      <br/>
      <Footer />
    </div>
  );
}
