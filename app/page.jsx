'use client';

import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DropDown from '../components/DropDown';
import Footer from '../components/Footer';
import Sandbox from '../components/Sandpack';
import Header from '../components/Header';
import ConfettiExplosion from 'confetti-explosion-react';
import Webcam from "react-webcam";
import axios from "axios";

const OAI_APIKEY = process.env.OPENAI_API_KEY;

// Prompts for GPT4 Vision Preview API 
const reactPrompt = 
`It is your job to generate an App.js page and use inline tailwind styling to replicate the exact image as fully functional as possible.
- Make use of useState / useEffect or even axios to create a realistic React application. 
- You may leverage the imports, these are already in the package.json file:
  "react": "latest",
  "react-dom": "latest",
  "axios": "latest", // For making HTTP requests
  "react-router-dom": "latest", // For routing
  "redux": "latest", // For state management
  "react-redux": "latest", // React bindings for Redux
  "redux-thunk": "latest", // Middleware for Redux asynchronous actions
  "react-icons": "latest", // A set of free MIT-licensed high-quality SVG icons
- Remember to add them as imports at the top of App.js file. 
- Be helpful by going beyond UI and layout and implement all inferrable functions. 
- Make multiple components within file and reference them in App() if you need to.
DO NOT GIVE AN EXPLANATION, HELP TEXT OR ANYTHING. JUST THE LINES OF CODE. NO BACKTICKS OR SYNTAX FORMATTING.`

const reactNativePrompt = 
`It is your job to generate an App.js page using React Native to replicate the exact image as a fully functional app.
- Make use of useState / useEffect or even axios to make this app functional. 
- Do not put divs in <Text> tags, use <View> tags instead.
- Be helpful by going beyond UI and layout and implement all inferrable functions and use icons. 
- Make multiple components within file and reference them in App() if you need to.
- include styling in App.js, for example:
import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 8,
    fontSize: 16,
    textAlign: "center",
  },
  h1: {
    margin: 28,
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  h2: {
    margin: 16,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
});

You may leverage the imports, these are already in the package.json file:
"expo": "latest", // An open-source platform for making universal native apps
"react": "latest", // React is a dependency of React Native
"react-native": "latest", // The React Native framework
"redux": "latest", // For state management
"axios": "latest", // For making HTTP requests
"@expo/vector-icons": "latest", // Icon library for Expo
"react-native-gesture-handler": "latest", // Declarative API exposing platform native touch and gesture system to React Native
"react-native-reanimated": "latest", // React Native's Animated library reimplemented
"react-native-screens": "latest", // Native navigation components for improved performance
"react-query": "latest", // Hooks for fetching, caching and updating asynchronous data in React
"react-native-safe-area-context": "latest", // A flexible way to handle safe area, also works on Android and Web!
"react-native-svg": "latest", // SVG library for React Native
"react-native-paper": "latest" // Material Design for React Native (Android & iOS)
"react-native-vector-icons": "latest"
But remember to add them as imports at the top of App.js file.
DO NOT GIVE AN EXPLANATION, HELP TEXT OR ANYTHING. JUST THE LINES OF CODE. NO BACKTICKS OR SYNTAX FORMATTING.
`

const setPrompt = (prompt) => {
  return `You are the world renowned Sketch2App tool. Given a sketch, you can generate a full fledged app.
  ASSIGNMENT:
  ${prompt}
  RULES:
  For your response, only return the lines of code as a string. Do not include any explanation or help text in your response. The response should start with code, no backticks.`
  ;
}

//GPT4 Vision Preview API Request
export const upload = async (vibe, base64_img) => {
  let prompt = '';
  if(vibe === 'React') {
     prompt = setPrompt(reactPrompt);
  } else if(vibe === 'React Native') {
     prompt = setPrompt(reactNativePrompt);
  }

  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: prompt,
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
          content: `Use little comments, and make sure imports are declared. Do not include backticks or explainer text in the response.`,
        },
      
      ],
      max_tokens: 4000,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OAI_APIKEY}`,
      },
    }
  );
  let msg = res.data.choices[0].message.content;
  console.log(res.data);
  return msg;
};

// GPT4 request to adjust the generated code with user edits
export const reDo = async (response, textEdits, base64_img) => {
  console.log("base64", base64_img);
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: `You are an expert developer. Create a full fledged protoype for the sketch provided. You generated the code submitted and our user has revisions. Try to go beyond UI by implementing functions, adding modals alerts, navigation and icons. 
          Adjust the following code:
          ${response}
          Your response must always be a string with the lines of code, no explanation or helper text. Do not include backticks or explainer text in the response.
          DO NOT GIVE AN EXPLANATION, HELP TEXT OR ANYTHING. JUST THE LINES OF CODE. NO BACKTICKS OR SYNTAX FORMATTING.`,
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
          content: `Edit the following file. I want to: ${textEdits}. Your response should not include backticks or synax formatting. Ensure you import all dependencies and add them to the top of the file.`,
        },
      
      ],
      max_tokens: 3500,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OAI_APIKEY}`,
      },
    }
  );
  let msg = res.data.choices[0].message.content;
  console.log(res.data);
  return msg;
};

// UI
export default function Page() {
    const [img, setImg] = useState(null);
    const webcamRef = useRef();
    const [vibe, setVibe] = useState('React');
    const [generating, isGenerating] = useState(false);
    const [regenerating, isRegenerating] = useState(false);
    const [response, setResponse] = useState(null);
    const [responseText, setResponseText] = useState('');

    const capture = useCallback(async () => {
      const imageSrc = webcamRef?.current.getScreenshot();
      if (imageSrc) {
        setImg(imageSrc);
      } else {
        // Handle the case where the screenshot couldn't be captured
        console.error("Failed to capture screenshot from webcam");
      }
  }, [webcamRef]);

    const sendUpload = async () => {
        isGenerating(true);
        const response = await upload(vibe, img);
        toast.success("Success!")
        setResponse(response);
        console.log(response);
    }

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

    const confetti = {
        force: 0.65,
        duration: 4500,
        particleCount: 250,
        height: 1600,
        width: 1600
      }


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
