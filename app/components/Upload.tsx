'use client';
import { read } from 'fs';
import React from 'react'
import { useState } from 'react'


export default function Upload({audio,setDGTranscript}:{audio:any,setDGTranscript:any}){
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(false);


  const handleUpload = (e:any) => {
    setIsUploading(true)
    //setFile(e.target.files[0])
    console.log("Sending upload request")

    // async function audioToBase64(audioFile: File) {
    //   return new Promise((resolve, reject) => {
    //     let reader = new FileReader();
    //     reader.onerror = reject;
    //     reader.onload = (e) => resolve(e.target!.result);
    //     reader.readAsDataURL(audioFile);
    //   });
    // } 

    // async function fetchCall() {
    //   const audio64 = await audioToBase64(audio);

    //   await fetch("api/deepgram", {
    //     method: "POST",
    //     body: audio64 as string,
    //   })
    //     .then((response) => response.json())
    //     .then((result) => {
    //       setDGTranscript(JSON.parse(result.body).results.channels[0].alternatives[0].transcript);
    //       // console.log(JSON.parse(result.body).results.channels[0].alternatives[0]);
    //       setIsUploading(false);
    //     })
    //     .catch((error) => {
    //       console.log("Error:", error);
    //       setError(true);
    //       setIsUploading(false);
    //     });
    // }

    // fetchCall();
  };
  
  return (
    <div>
      <button className="btn btn-neutral ml-3" onClick={handleUpload} disabled={false}>
        {isUploading ? 'Generating...' : 'Generate'}
      </button>
    </div>
  )
}
