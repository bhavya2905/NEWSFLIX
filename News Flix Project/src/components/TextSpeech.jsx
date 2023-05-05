import React ,{ useState }from 'react';
import {  IoVolumeHighSharp, IoStopSharp } from "react-icons/io5";

const TextToSpeech = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    // Create a new speech synthesis object
    const synth = window.speechSynthesis;

    // Create a new speech utterance with the text from the div
    const utterance = new SpeechSynthesisUtterance(text);

    // Set the language to English
    utterance.lang = 'en-IN';

    // Speak the utterance
    synth.speak(utterance);

    // Update the state to indicate that speech is in progress
    setIsSpeaking(true);
  };

  const stop = () => {
    // Stop the speech synthesis
    window.speechSynthesis.cancel();

    // Update the state to indicate that speech is no longer in progress
    setIsSpeaking(false);
  };

  return (
    <div>
      
      <div>
        Press here to listen the news : 
        <IoVolumeHighSharp
        style={{ marginLeft: '8px', cursor: 'pointer' }}
        onClick={speak}
      />
      {isSpeaking && (
        <IoStopSharp
          style={{ marginLeft: '8px', cursor: 'pointer' }}
          onClick={stop}
        />
      )}
      </div>
      <hr></hr>
      {text}
    </div>
  );
};

export default TextToSpeech;

