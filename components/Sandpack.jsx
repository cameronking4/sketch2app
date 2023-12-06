import { SandpackProvider, SandpackLayout, SandpackConsole, SandpackConsumer, SandpackPreview} from "@codesandbox/sandpack-react";

export default function Sandbox({ mainFile, framework }) {

      const reactFiles = {
        "/App.js": mainFile,
        "/README.md": {
          code: `# [Sketch-2-App](https://www.sketch2app.io/)

          ## Use GPT4v to generate web app code (CRA + Tailwind)
          Use React to generate a web app with Tailwind CSS. It will generate code and a sandbox to preview the app within seconds of capturing your wireframe/sketch
          
          [![Sketch2Code](https://markdown-videos-api.jorgenkh.no/url?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1VC_a0JP7TM)](https://www.youtube.com/watch?v=1VC_a0JP7TM)
        
          ## Running Locally
          
          After cloning the repo, go to [OpenAI](https://beta.openai.com/account/api-keys) to make an account and put your API key in a file called \`.env\`.
          
          Then, run the application in the command line and it will be available at \`http://localhost:3000\`.
          
          \`\`\`bash
          npm install && npm start
          \`\`\`
        `          
        },
        "/index.js": {
          code: `import React from "react";
      import ReactDOM from "react-dom";
      import "./index.css";
      import App from "./App";
      
      ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        document.getElementById("root")
      );`,
        },
        "/index.css": {
          code: `@tailwind base;
      @tailwind components;
      @tailwind utilities;`
        },
        "/tailwind.config.js": {
          code: `module.exports = {
        content: ["./src/**/*.{js,jsx,ts,tsx}"],
        theme: {
          extend: {},
        },
        plugins: [],
      };`
        },
        "/public/index.html": {
          code: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css" rel="stylesheet">
        <title>Document</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
      </html>`
        }
      };
      
      const reactSetup = {
        env: {
          NODE_ENV: 'development'
        },      
        dependencies: {
          "react": "latest",
          "react-dom": "latest",
          "react-scripts": "latest",
          "tailwindcss": "latest",
          "postcss": "latest",
          "autoprefixer": "latest",
          "axios": "latest", // For making HTTP requests
          "react-router-dom": "latest", // For routing
          "redux": "latest", // For state management
          "react-redux": "latest", // React bindings for Redux
          "redux-thunk": "latest", // Middleware for Redux asynchronous actions
          "styled-components": "latest", // For CSS in JS
          "react-icons": "latest", // A set of free MIT-licensed high-quality SVG icons
          "lodash": "latest", // A modern JavaScript utility library delivering modularity, performance, & extras
          "moment": "latest", // Parse, validate, manipulate, and display dates and times in JavaScript
          "react-query": "latest", // Hooks for fetching, caching and updating asynchronous data in React
          "react-toastify": "latest", // For adding notifications to your app
          "react-helmet": "latest" // A document head manager for React
        }
      };

      const options = {
        externalResources: [
          'https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css',
        ]
      };

      const rnSetup = {
        env: {
          NODE_ENV: 'development' 
        },
        dependencies: {
          "expo": "latest", // An open-source platform for making universal native apps
          "react": "latest", // React is a dependency of React Native
          "react-native": "latest", // The React Native framework
          "@react-navigation/native": "latest", // Navigation library for React Native
          "@react-navigation/stack": "latest", // Stack navigator for React Navigation
          "redux": "latest", // For state management
          "react-redux": "latest", // React bindings for Redux
          "redux-thunk": "latest", // Middleware for Redux asynchronous actions
          "axios": "latest", // For making HTTP requests
          "lodash": "latest", // A modern JavaScript utility library delivering modularity, performance, & extras
          "moment": "latest", // Parse, validate, manipulate, and display dates and times in JavaScript
          "@expo/vector-icons": "latest", // Icon library for Expo
          "react-native-gesture-handler": "latest", // Declarative API exposing platform native touch and gesture system to React Native
          "react-native-reanimated": "latest", // React Native's Animated library reimplemented
          "react-native-screens": "latest", // Native navigation components for improved performance
          "react-query": "latest", // Hooks for fetching, caching and updating asynchronous data in React
          "react-native-safe-area-context": "latest", // A flexible way to handle safe area, also works on Android and Web!
          "react-native-svg": "latest", // SVG library for React Native
          "react-native-paper": "latest" // Material Design for React Native (Android & iOS)
        }
      };

      const rnFiles = {
        "/App.js": mainFile,
        "/README.md": {
          code: `# [Sketch-2-App](https://www.sketch2app.io/)

          ## Use GPT4v to generate web app code (CRA + Tailwind)
          Use React Native to generate a web mobile app. It will generate code and a sandbox to preview the app within seconds of capturing your wireframe/sketch
          
          [![Sketch2Code](https://markdown-videos-api.jorgenkh.no/url?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1VC_a0JP7TM)](https://www.youtube.com/watch?v=1VC_a0JP7TM)
        
          ## Running Locally
          
          After cloning the repo, go to [OpenAI](https://beta.openai.com/account/api-keys) to make an account and put your API key in a file called \`.env\`.
          
          Then, run the application in the command line and it will be available at \`http://localhost:3000\`.
          
          \`\`\`bash
          npm install && npm start
          \`\`\`
        `          
        },
        "/package.json": {
          code: `{
            "name": "react-native-expo",
            "version": "1.0.0",
            "main": "node_modules/expo/AppEntry.js",
            "scripts": {
              "start": "npm start",
              "android": "expo start --android",
              "ios": "expo start --ios",
              "web": "expo start --web"
            },
            "dependencies": {
              "@expo/cli": "^0.10.14",
              "expo": "~49.0.16",
              "expo-status-bar": "~1.7.1",
              "react": "18.2.0",
              "react-native": "0.72.6",
              "react-native-web": "~0.19.9",
              "react-dom": "18.2.0"
            },
            "devDependencies": {
              "@babel/core": "^7.23.2",
              "body-parser": "^1.18.3",
              "express": "^4.16.3",
              "http-proxy-middleware": "^2.0.6",
              "qs": "^6.11.2",
              "xdl": "^60.0.12"
            },
            "private": true
          }
          `,
        },
        "/app.json": {
          code:`
        {
          "expo": {
            "name": "Sketch2App Demo App",
            "slug": "react-native-sketch2app",
            "version": "1.0.0",
            "orientation": "portrait",
            "icon": "./assets/icon.png",
            "userInterfaceStyle": "light",
            "splash": {
              "image": "./assets/splash.png",
              "resizeMode": "contain",
              "backgroundColor": "#ffffff"
            },
            "assetBundlePatterns": ["**/*"],
            "ios": {
              "supportsTablet": true
            },
            "android": {
              "adaptiveIcon": {
                "foregroundImage": "./assets/adaptive-icon.png",
                "backgroundColor": "#ffffff"
              }
            },
            "web": {
              "bundler": "metro",
              "favicon": "./assets/favicon.png"
            }
          }
        }        
        `},
        "/babel.config.js": {code: 
        `module.exports = function(api) {
          api.cache(true);
          return {
            presets: ['babel-preset-expo'],
          };
        };`
        }
      }
      // Determine the correct settings based on the framework
      let files, template, customSetup;
      if (framework === "React") {
          files = reactFiles;
          template = "react";
          customSetup = reactSetup;
      } else if (framework === "React Native") {
          files = rnFiles;
          template = "react"; 
          customSetup = rnSetup;
      } else {
          // Default or fallback settings, if any, can be specified here
          files = null;
          template = null;
          customSetup = null;
      }
      return (
        <SandpackProvider template={template} files={files} customSetup={customSetup} options={options}>
          <SandpackLayout style={{ flexDirection: 'column', height: '69vh' }} options={options}>
            <SandpackPreview style={{ flexGrow: 9 }} />
            <SandpackConsole style={{ flexGrow: 1 }} />
          </SandpackLayout>
        </SandpackProvider>
      );
}