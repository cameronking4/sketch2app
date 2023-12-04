import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview} from "@codesandbox/sandpack-react";

export default function Sandbox({ Appjs }) {

      function extractAppJsCode(fullString) {
        const appJsStart = fullString.indexOf("import React");
        const appJsEnd = fullString.indexOf("export default App;") + "export default App;".length;
      
        if (appJsStart === -1 || appJsEnd === -1) {
          return "App.js code not found in the provided string.";
        }
      
        return fullString.substring(appJsStart, appJsEnd);
      }

      const response = extractAppJsCode(Appjs);

      const files = {
        "/App.js": response,
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
        // Assuming you have a basic HTML file
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
      
      const customSetup = {
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
      
      // Ensure that external resources are properly included in the Sandpack environment
      const options = {
        externalResources: [
          'https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css',
        ]
      };
      return (
        <SandpackProvider template="react" files={files} customSetup={customSetup} options={options}>
          <SandpackLayout options={options}>
          <SandpackPreview style={{ height: '60vh' }} />
          </SandpackLayout>
        </SandpackProvider>
        
      );
}


          {/* <Sandpack
          height="700"
          className="px-10"
          customSetup={{ 
            dependencies: { 
              "react-markdown": "latest",
              "tailwindcss": "latest",
            }
          }}
          files={{
            '/App.js': `${extractCodeFromString(response)}`,
          }}
          options={{
            externalResources: [
              'https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css',
            ],
            showNavigator: true,
            showTabs: true,
            editorHeight:750,
              layout: "preview", // preview | tests | console
          }}
          template="react"
        /> */}