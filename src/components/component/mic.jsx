'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import MicRecorder from 'mic-recorder-to-mp3'

const recorder = new MicRecorder({
  bitRate: 128
});






export function Mic() {
  
  const [isRecording, setIsRecording] = useState(0) //0 means not recording 1 means loading 2 means recording
  const [transcript, setTranscript] = useState('')
  const [chat, setChat] = useState(["HI","SUP!!"])
  
  
  

  const handleRecording = () => {


    const returnChat = (history,lastMsg) =>
{
  const URL = "https://speech-to-text.istiaqueahmedarik.workers.dev/chat";
  let formData = new FormData();
  //array to string
  let History = "";
  for(let i=0;i<history.length;i++){
    History += history[i];
    History += ",";
  }
  let ret;
  //last message object to string
  let LastMsg = JSON.stringify(lastMsg);
  formData.append('history', History);
  formData.append('msg', LastMsg);
  axios.post(URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(function (response) {
    console.log(response.data);
    if (window.responsiveVoice) {
      window.responsiveVoice.init();
      window.responsiveVoice.speak(response.data, "UK English Male")
   } else {
       console.error('ResponsiveVoice not loaded');
   }
   setChat([...chat,LastMsg,response.data]);
   setIsRecording(0)
   console.log(chat);
    
  })
  .catch(function (error) {
    console.log(error);
  });
  return ret;

}


    if (isRecording) {
      recorder.stop().getMp3().then(([buffer, blob]) => {
        console.log(buffer, blob);
        const file = new File(buffer, 'music.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });
  
        let formData = new FormData();
  
        formData.append('audio', file);
  
        axios.post('https://speech-to-text.istiaqueahmedarik.workers.dev/speech', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function (response) {
          let singleChat = response.data;
              

          let ret = returnChat(chat,singleChat);
          console.log(chat)
          setTranscript(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      });
      setIsRecording(1)
    } else {
      recorder.start().then(() => {
        console.log('Start recording');
      }).catch((e) => {
        console.error(e);
      });
      setIsRecording(2)
    }
  }

 

  return (
    <div className='grid place-content-center'>
        <h1 className='text-center text-4xl text-white'>STS AI</h1>
      
          <main className="flex items-center justify-center h-[90vh]  rounded-md border-gray-800 border-2 w-full m-2 bg-[#171717]">
            <div className="flex flex-col items-center justify-center space-y-6 w-[20%] ">
                    
              <div className="relative w-64 h-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-gradient-x" onClick={handleRecording}>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {isRecording === 0 && <MicIcon className="w-32 h-32 text-white" />}
                  {isRecording === 1 && <LoadingIcon className="w-32 h-32 text-white" />}
                  {isRecording === 2 && <StopIcon className="w-32 h-32 text-white" />}
                </div>

              </div>
                <p className='text-center text-white'>{transcript}</p>
            </div>
          </main>
    </div>
  )
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}

function StopIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M6 6h12v12H6z" />
    </svg>
  )
}

function LoadingIcon(props) {
  return (
    <svg
      {...props}
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 38 38"
      stroke="currentColor"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  )
}