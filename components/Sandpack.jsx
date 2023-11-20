import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview } from "@codesandbox/sandpack-react";

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
          "autoprefixer": "latest"
        }
      };
      
      // Ensure that external resources are properly included in the Sandpack environment
      const options = {
        externalResources: [
          'https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css',
        ],
        editorHeight: 700,
        editorWidthPercentage: 35,
      };
      return (
        <SandpackProvider template="react" files={files} customSetup={customSetup} options={options}>
          <SandpackLayout options={options}>
            <SandpackCodeEditor options={options} />
            <SandpackPreview />
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