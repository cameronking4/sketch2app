'use client';

import { useSearchParams } from 'next/navigation'
import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DropDown from '../components/DropDown';
import Footer from '../components/Footer';
import Sandbox from '../components/Sandpack';
import Header from '../components/Header';
import ConfettiExplosion from 'confetti-explosion-react';
import Webcam from "react-webcam";
import { useEffect } from 'react';
import { reDo, upload } from './openai.js';

// Confetti config for result 
const confetti = {
  force: 0.65,
  duration: 4500,
  particleCount: 250,
  height: 1600,
  width: 1600
}

//Create store for examples. Simple array -> index maps to example image
const ExampleImages =["https://github.com/cameronking4/sketch2app/blob/main/public/example1.png?raw=true",
  "https://github.com/cameronking4/sketch2app/blob/main/public/example2.png?raw=true",
  "https://github.com/cameronking4/sketch2app/blob/main/public/example3.png?raw=true"];

// UI
export default function Page() {
    const [img, setImg] = useState(null);
    const webcamRef = useRef();
    const [vibe, setVibe] = useState('React');
    const [generating, isGenerating] = useState(false);
    const [regenerating, isRegenerating] = useState(false);
    const [response, setResponse] = useState(null);
    const [responseText, setResponseText] = useState('');

    //query params for example sketches
    const searchParams = useSearchParams();
    const example = searchParams.get('example');
    console.log("Query param detected! User wants to start with an example sketch: ", example);

    useEffect(() => {
      if(ExampleImages[example]){
        setImg(ExampleImages[example]);
      }
    }, [example]);
   
    // handle capture button
    const capture = useCallback(async () => {
      const imageSrc = webcamRef?.current.getScreenshot();
      if (imageSrc) {
        setImg(imageSrc);
      } else {
        // Handle the case where the screenshot couldn't be captured
        console.error("Failed to capture screenshot from webcam");
      }
    }, [webcamRef]);

    // handle Generate button
    const sendUpload = async () => {
        isGenerating(true);
        const response = await upload(vibe, img);
        toast.success("Success!")
        setResponse(response);
        console.log(response);
    }

    // handle Regenerate button
    const regenerate = async() => {
        isRegenerating(true);
        if(responseText.length > 7) {
          const newResponse = await reDo(response, responseText, img);
          setResponse(newResponse);
        } else {
          const newResponse = await upload(vibe, img);
          setResponse(newResponse);
        }
        toast.success("Regenerated!");
        isRegenerating(false);
        setResponseText('');
    }

    const regenerateContent = async () => {
        await regenerate();
    };

    // Finally, render the UI
    return (
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen overflow-hidden">
        { response && <ConfettiExplosion {...confetti} style={{overflow: 'hidden'}}/> }
          <div>
              <Toaster
                  position="top-center"
                  reverseOrder={true}
                  toastOptions={{ duration: 10000 }}
              />
          </div>
          <Header/>
          <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-12">
              <h2 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
                  {response ? `Voila! Try your ${vibe} code` : 'Generate code from a hand-drawn sketch'}
              </h2>
              {response ? (
                  <div className='w-full'>
                      <br/>
                      <Sandbox mainFile={response} framework={vibe}/>
                      {regenerating ?
                        <button
                            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-2 mt-2 hover:bg-black/80 w-full"
                            disabled
                        >
                            <span className="loading">
                                <span style={{ backgroundColor: 'white' }} />
                                <span style={{ backgroundColor: 'white' }} />
                                <span style={{ backgroundColor: 'white' }} />
                            </span>
                        </button>
                        :
                        <button
                            onClick={regenerateContent}
                            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                        >
                          {responseText.length > 10 ? "Regenerate with text edits" : "Regenerate"}
                        </button>
                      }
                      <div className="container mx-auto my-8 m-2 p-5 border-2 border-gray-200 rounded-lg shadow-md">
                          <h3>Tweak App</h3>
                          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                              <div className="w-full">
                                  <label htmlFor="responseTextArea" className="block text-sm font-medium text-gray-700">
                                      (Optional) Add an additional text prompt here to edit app: 
                                  </label>
                                  <div className='flex auto'>
                                      <textarea
                                          id="responseTextArea"
                                          rows="2"
                                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                                          value={responseText}
                                          onChange={(e) => setResponseText(e.target.value)}
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              ) : (
                  <>
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
                                  <div className='mt-2' />
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
                                      <DropDown generating={generating} vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
                                  </div>
                              </>
                          )}
                          {!generating ? (
                              <>
                                  {img === null ? (
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
                                  )}
                              </>
                          ) : (
                              <button
                                  className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-4 hover:bg-black/80 w-full"
                                  disabled
                              >
                                  <span className="loading">
                                      <span style={{ backgroundColor: 'white' }} />
                                      <span style={{ backgroundColor: 'white' }} />
                                      <span style={{ backgroundColor: 'white' }} />
                                  </span>
                              </button>
                          )}
                      </div>
                  </>
              )}
          </main>
          <br />
          <Footer />
      </div>
    );
}
