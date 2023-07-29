import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const { Configuration, OpenAIApi } = require("openai");

export const configuration = new Configuration({
    apiKey: "SECRET_KEY",
});
delete configuration.baseOptions.headers['User-Agent'];
export const openai = new OpenAIApi(configuration);
export const GPTFunction = async (text) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.6,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    });
    return response.data.choices[0].text;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
