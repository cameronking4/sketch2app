import { SandpackProvider, SandpackLayout, SandpackConsole, SandpackConsumer, SandpackPreview} from "@codesandbox/sandpack-react";

export default function Sandbox({ mainFile, framework }) {

      const reactFiles = {
        "/App.js": mainFile,
        "/README.md": {
          code: `# [Sketch-2-App](https://www.sketch2app.io/)
## Use GPT4v to generate web app code (CRA + Tailwind)
Use React to generate a web app with Tailwind CSS. It will generate code and a sandbox to preview the app within seconds of capturing your wireframe/sketch

[![Sketch2Code](https://markdown-videos-api.jorgenkh.no/url?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1VC_a0JP7TM)](https://www.youtube.com/watch?v=1VC_a0JP7TM)

Run the application in the command line and it will be available at \`http://localhost:3000\`. 
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
          "babel-plugin-react-native-web": "0.19.8",
          "react-native-vector-icons": "latest",
          "react-native-svg" : "latest",
          "react": "latest", // React is a dependency of React Native
          "react-native": "latest", 
          "react-scripts": "latest", // React scripts
          "react-native-safe-area-context": "latest", // For handling safe area insets
          "react-dom": "latest",// The React Native framework
          "@react-navigation/native": "latest", // Navigation library for React Native
          "@react-navigation/stack": "latest", // Stack navigator for React Navigation
          "axios": "latest", // For making HTTP requests
          "tailwind-rn": "latest",
          "lodash": "latest", // A modern JavaScript utility library delivering modularity, performance, & extras
          "firebase": "latest",
          "react-native-web": "latest",
          "react-native-cli": "latest",
          "react-native-elements": "latest",
          "react-native-gesture-handler": "latest",
          "react-native-reanimated": "latest",
          "react-native-screens": "latest",
          "react-native-safe-area-context": "latest",
          "react-native-paper": "latest", // Material Design for React Native (Android & iOS)
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

Run the application in the command line and it will be available at \`http://localhost:3000\`.

\`\`\`bash
npm install && npm start
\`\`\`
        `          
        },
        "/package.json": {
          code: `{
"name": "sketch2app-rn",
"version": "1.0.0",
"main": "node_modules/expo/AppEntry.js",
"scripts": {
  "start": "npm start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web"
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
    "slug": "sketch2app-rn",
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
            <SandpackPreview/>
            {/* <SandpackPreview style={{ flexGrow: 9 }} /> */}
            {/* <SandpackConsole style={{ flexGrow: 1 }} /> */}
          </SandpackLayout>
        </SandpackProvider>
      );
}