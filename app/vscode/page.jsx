'use client';

import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DropDown from '../../components/DropDown';
import Footer from '../../components/Footer';
import Header from '../../components/VSHeader';
import Webcam from "react-webcam";
import axios from "axios";
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const [img, setImg] = useState(null);
  const webcamRef = useRef();
  const [generating, isGenerating] = useState(false);
  const [response, setResponse] = useState(null);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const vibe = searchParams.get('type');
  const folderPath = searchParams.get('path');
  const OAI_APIKEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const BASE_API_URL = process.env.BASE_API_URL;
  const CLOUDINARY_APISECRET = process.env.NEXT_PUBLIC_CLOUDINARY_APISECRET;
  const CLOUDINARY_APIKEY = process.env.NEXT_PUBLIC_CLOUDINARY_APIKEY;
  const CLOUDINARY_UPLOAD_URL = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;

  const uploadToCloudinary = async (imageBase64) => {
    const formData = new FormData();
    formData.append('file', imageBase64);
    formData.append('api_key', CLOUDINARY_APIKEY);
    formData.append('api_secret', CLOUDINARY_APISECRET);
    formData.append('timestamp', (Date.now() / 1000) | 0);
    formData.append('upload_preset', 'ml_default');
  
    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.secure_url; // Returns the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null; // Handle upload errors gracefully
    }
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef?.current.getScreenshot();
    if (imageSrc) {
      const cloudinaryUrl = await uploadToCloudinary(imageSrc);
      if (cloudinaryUrl) {
        console.log("Sketch URL:", cloudinaryUrl); // Logging the Cloudinary URL
        setImg(cloudinaryUrl);
        // Proceed with your API call using cloudinaryUrl instead of imageSrc
      } else { // Handle the case where the image upload failed
        console.error("Failed to upload image to Cloudinary");
      } 
    } else {
      // Handle the case where the screenshot couldn't be captured
      console.error("Failed to capture screenshot from webcam");
    }
  }, [webcamRef]);

  const sketch2codeAPI = async (string) => {
    let data = JSON.stringify({
      "image": img,
      "openai_key": OAI_APIKEY,
      "uuid": sessionId
    });

    try {
      const res = await axios.post(
        // `https://sketch2code-api.onrender.com/${string}`,
        `http://localhost:5000/${string}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      toast.success("Success!");
      toast("Feel free to close this page now & return back to VSCode editor.",
        {
          duration: 25000,
          icon: '🙌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            fontSize: '16px'
          },

        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error in sketch2codeAPI:", error);
      return null;  // Handle errors gracefully
    }
  }

  const generateCode = async () => {
    isGenerating(true);  // Indicate loading state
    let res = "";
    try {
      switch (vibe) {
        case 'React':
          res = await sketch2codeAPI('react');
          setResponse(res.data);
          break;
        case'Python':
          res = await sketch2codeAPI('python');
          setResponse(res.data);
          break;
        case 'Flutter':
          res = await sketch2codeAPI('flutter');
          setResponse(res.data);
          break;
        case 'React-Native':
          res = await sketch2codeAPI('react-native');
          setResponse(res.data);
          break;
    }
  } catch (error) {
    console.error("Error in generateCode:", error);
  }
    isGenerating(false);  // Reset loading state
    return res.data;
    // Close tab (if needed, implement tab closing logic here)
  }

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <div>
      <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{ duration: 10000 }}
        />
      </div>
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-12">
      <h2 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
         {response ? `Voila! Try your ${vibe} code` : 'Capture your sketch to generate code'}
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
            <br/>
            <div className="block">
              <button> Retake sketch </button>
            </div>
            <div className="flex mb-5 items-center space-x-3">
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
              onClick={() => generateCode()}
              // onClick={() => console.log(vibe)}
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
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        </>
        }
      </main>
      <br/>
      <Footer />
    </div>
  );
}
