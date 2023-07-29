import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const { Configuration, OpenAIApi } = require("openai");

export const configuration = new Configuration({
    apiKey: "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",
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

// api secret key = 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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
