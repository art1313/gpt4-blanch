import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState, setStateFunction } from 'react';
import Link from 'next/link';
import NavigationMenu from '../components/navigationMenu';

// add 5 parameters 
// Gender
// Age
// Height
// Weight
// Desired Weight
// What are you trying to achieve by working out?

const Home = () => {

  const [userInput, setUserInput] = useState('');
  const [userInput2, setUserInput2] = useState('');
  const [userInput3, setUserInput3] = useState('');
  const [userInput4, setUserInput4] = useState('');
  const [userInput5, setUserInput5] = useState('');
  const [userInput6, setUserInput6] = useState('');
  const [userInput7, setUserInput7] = useState('');
  const [userInput8, setUserInput8] = useState('');
  const [userInput9, setUserInput9] = useState('');
  const [userInput10, setUserInput10] = useState('');
  
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput,
        userInput2,
        userInput3,
        userInput4,
        userInput5,
        userInput6,
        userInput7,
        userInput8,
        userInput9,
        userInput10
      }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event, setStateFunction) => {
    console.log(event.target.value);
    setStateFunction(event.target.value);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Fitness AI</h1>
          </div>
          <div className="header-subtitle">
            <h2>Please answer the questions below to help us create a workout tailored specifically to you
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="What is your level? (Beginner, Intermidiate, Pro)"
            value={userInput}
            onChange={(event) => onUserChangedText(event, setUserInput)}
           />
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="What is your gender?"
            value={userInput2}
            onChange={(event) => onUserChangedText(event, setUserInput2)}
           />
          </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="How old are you?"
            value={userInput3}
            onChange={(event) => onUserChangedText(event, setUserInput3)}
           />
          </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="What is your height?"
            value={userInput4}
            onChange={(event) => onUserChangedText(event, setUserInput4)}
           />
          </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="What is your current weight?"
            value={userInput5}
            onChange={(event) => onUserChangedText(event, setUserInput5)}
           />
          </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="What is your desired weight?"
            value={userInput6}
            onChange={(event) => onUserChangedText(event, setUserInput6)}
           />
          </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="What are you trying to achive by working out?"
            value={userInput7}
            onChange={(event) => onUserChangedText(event, setUserInput7)}
           />
          </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="What type of equipment do you have available? (full gym, dumbells, jump rope)"
            value={userInput8}
            onChange={(event) => onUserChangedText(event, setUserInput8)}
           />
          </div>
        {/* <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="Pick two rest days"
            value={userInput9}
            onChange={(event) => onUserChangedText(event, setUserInput9)}
           />
          </div> */}
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="Please add any additional information about your overall health or injuries"
            value={userInput10}
            onChange={(event) => onUserChangedText(event, setUserInput10)}
           />
          </div>
        {/* Add this code here*/}
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {/* New code I added here */}
          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Workout Plan</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href=""
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>Fitness AI</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;

