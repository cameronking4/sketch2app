'use client';

import { useSearchParams } from 'next/navigation'
import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import DropDown from '../../../components/DropDown.jsx';
import Sandbox from '../../../components/Sandpack.jsx';
import ConfettiExplosion from 'confetti-explosion-react';
import Webcam from "react-webcam";
import { useEffect } from 'react';
import { reDo, upload } from '../../openai.js';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, LockClosedIcon, PlayCircleIcon, CameraIcon, StarIcon } from '@heroicons/react/20/solid'

const solutions = [
  { name: 'Scan QR code to capture sketch on mobile', href: '#', icon: LockClosedIcon },
  { name: 'Upload a sketch from files', href: '#', icon: LockClosedIcon },
  { name: 'Screenshot a tab in your browser', href: '#', icon: LockClosedIcon },
  { name: 'Draw sketch on a virtual canvas', href: '#', icon: LockClosedIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '/about', icon: PlayCircleIcon },
  { name: 'Try an example', href: '/examples', icon: StarIcon },
]

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
export default function Page({ apiKey }) {
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

	//webcam config
	const FACING_MODE_USER = "user";
	const FACING_MODE_ENVIRONMENT = "environment";

	const videoConstraints = {
	facingMode: FACING_MODE_USER
	};

	const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

	const handleSwitchCam = useCallback(() => {
		setFacingMode(
		prevState =>
				prevState === FACING_MODE_USER
				? FACING_MODE_ENVIRONMENT
				: FACING_MODE_USER
		);
	}, []);
	
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
		try {
			const response = await upload(apiKey, vibe, img);
			toast.success("Success!")
			setResponse(response);
			console.log(response);
		} catch (error) {
			console.error("Error uploading to OpenAI:", error);
			toast.error(error.message);
		}
		isGenerating(false); // Reset loading state
	}

	// handle Regenerate button
	const regenerate = async() => {
		if(responseText.length > 7) {
			const newResponse = await reDo(apiKey, response, responseText, img);
			setResponse(newResponse);
		} else {
			const newResponse = await upload(apiKey, vibe, img);
			setResponse(newResponse);
		}
		toast.success("Regenerated!");
		setResponseText('');
	}

	const regenerateContent = async () => {
		isRegenerating(true);
		try {
			await regenerate();
		} catch (error) {
			console.log("Regeneration failed:", error);
			toast.error(error.message);
		}
		isRegenerating(false); // Reset loading state
	};

	// Finally, render the UI
	return (
		<>
			{ response && <ConfettiExplosion {...confetti} style={{overflow: 'hidden'}}/> }
			<div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-12">
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
							{/* <div className="flex mt-10 items-center space-x-3">
									<Image
											src="/1-black.png"
											width={30}
											height={30}
											alt="1 icon"
											className="mb-5 sm:mb-0"
									/>
									Capture sketch using webcam
							</div> */}
							{img === null ? (
								<>
									<Popover className="relative">
										<Popover.Button className="inline-flex items-center gap-x-1 text-md mt-6 leading-6 text-gray-900">
											<span>Capture sketch using webcam</span>
											<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
										</Popover.Button>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-200"
											enterFrom="opacity-0 translate-y-1"
											enterTo="opacity-100 translate-y-0"
											leave="transition ease-in duration-150"
											leaveFrom="opacity-100 translate-y-0"
											leaveTo="opacity-0 translate-y-1"
										>
											<Popover.Panel className="absolute left-1/2 z-10 mt-5 left-align flex w-screen max-w-max -translate-x-1/2 px-4">
												<div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
														<div className="p-4">
														{solutions.map((item) => (
															<div key={item.name} className="group relative flex gap-x-6 items-center rounded-lg p-4 hover:bg-gray-50">
																<div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
																	<item.icon className="h-6 w-6 text-gray-600 group-hover:text-slate-600" aria-hidden="true" />
																</div>
																<div>
																		<a href={item.href} className="font-semibold text-gray-900">
																		{item.name}
																		</a>
																</div>
															</div>
														))}
														</div>
														<div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
															{callsToAction.map((item) => (
																<a
																	key={item.name}
																	href={item.href}
																	className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
																>
																	<item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
																	{item.name}
																</a>
															))}
														</div>
												</div>
											</Popover.Panel>
										</Transition>
									</Popover>
									<div className='mt-2 items-center' />
									<Webcam
										ref={webcamRef}
										screenshotFormat="image/jpeg"
										minScreenshotWidth={800}
										minScreenshotHeight={600}
										videoConstraints={{
											...videoConstraints,
											facingMode
										}}
									/>
									<center>
										<button onClick={handleSwitchCam}>
											<div className="mt-2 items-center justify-center flex">
												<CameraIcon className="h-6 w-6 items-center text-gray-600" aria-hidden="true" />
												<p className='ml-1'>flip camera</p>
											</div>
										</button>
									</center>
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
			</div>
		</>
	);
}
