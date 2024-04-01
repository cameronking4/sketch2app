import axios from "axios";
import { checkCount } from "./actions";

// Replace your OpenAI API key with ENV variable
export const OAI_APIKEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

// Prompts for GPT4 Vision Preview API 
export const reactPrompt = 
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

export const reactNativePrompt = 
`It is your job to generate an App.js page using React Native to replicate the exact image as a fully functional app.
- Make use of useState / useEffect or even axios to make this app functional. 
- Do not put divs in <Text> tags, use <View> tags instead.
- Be helpful by going beyond UI and layout and implement all inferrable functions and use icons. 
- Make multiple components within file and reference them in App() if you need to.
- Include styling in App.js 

IMPORTS AT THE TOP ARE CRUCIAL.
You may leverage the following imports, as they are already in your package.json file:
"react": "latest", // React is a dependency of React Native
"react-native": "latest", // The React Native framework
"redux": "latest", // For state management
"axios": "latest", // For making HTTP requests
"react-native-vector-icons": "latest", // For icons, do not use @expo/vector-icons.

When using the MaterialCommunityIcons and others import like this: react-native-vector-icons/MaterialCommunityIcons. 
In fact, you can just modify the contents of this perfect example below.

import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class App extends Component {
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Image
            accessibilityLabel="React logo"
            source={{ uri: logoUri }}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>React Native for Web</Text>
        </View>
        <Text style={styles.text}>
          To get started, edit{" "}
          <Link href="https://codesandbox.io/s/q4qymyp2l6/" style={styles.code}>
            src/App.js
          </Link>
          .
        </Text>
        <Button onPress={() => {}} title="Example button" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500,
  },
  logo: {
    height: 80,
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center",
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center",
  },
  link: {
    color: "#1B95E0",
  },
  code: {
    fontFamily: "monospace, monospace",
  },
});

export default App;

Also remember imports like SafeAreaView, Text, View, StyleSheet, etc.
DO NOT GIVE AN EXPLANATION, HELP TEXT OR ANYTHING. JUST THE LINES OF CODE. NO BACKTICKS OR SYNTAX FORMATTING.
`

export const setPrompt = (prompt) => {
  return `You are the world renowned Sketch2App tool. Given a sketch, you can generate a full fledged app.
  ASSIGNMENT:
  ${prompt}
  RULES:
  For your response, only return the lines of code as a string. Do not include any explanation or help text in your response. The response should start with code, no backticks.`
  ;
}
  
//GPT4 Vision Preview API request to generate code
export const upload = async (apikey, vibe, base64_img) => {
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
      temperature: 0.01,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey || OAI_APIKEY}`,
      },
    }
  );
  await checkCount();
  let msg = res.data.choices[0].message.content;
  console.log(res.data);
  return msg;
};

// GPT4 request to adjust the generated code with user edits
export const reDo = async (apikey, response, textEdits, base64_img) => {
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
        Authorization: `Bearer ${apikey || OAI_APIKEY}`,
      },
    }
  );
  await checkCount();
  let msg = res.data.choices[0].message.content;
  console.log(res.data);
  return msg;
};