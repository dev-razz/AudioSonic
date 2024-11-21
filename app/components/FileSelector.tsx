"use client";
import { useState, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import styles from "./FileSelector.module.css";
const fileTypes = ["MP3"];

export default function File({
  audio,
  setAudio,
  setDGTranscript,
}: {
  audio : any;
  setAudio: any;
  setDGTranscript: any;
}) {
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(false);
  const file = useRef(null);

  const handleChange = (file: File) => {
    setLoading(true);
    setAudio(file);
    setLoading(false)
  };

  const handleUpload = (e:any) => {
    setIsUploading(true)

    console.log("Sending upload request")
    async function audioToBase64(audioFile: File) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => resolve(e.target!.result);
        reader.readAsDataURL(audioFile);
      });
    } 

    async function fetchCall() {
      const audio64 = await audioToBase64(audio);

      await fetch("api/deepgram", {
        method: "POST",
        body: audio64 as string,
      })
        .then((response) => response.json())
        .then((result) => {
          setDGTranscript(JSON.parse(result.body).results.channels[0].alternatives[0].transcript);
          // console.log(JSON.parse(result.body).results.channels[0].alternatives[0]);
          setIsUploading(false);
        })
        .catch((error) => {
          console.log("Error:", error);
          setError(true);
          setIsUploading(false);
        });
    }
    fetchCall();
  }

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <h2>{!error ? "LOADING FILE..." : "ERROR LOADING, TRY ANOTHER FILE!"}</h2>
      ) : (
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          label="Upload or drop a file (up to 5MB)"
          maxSize={5}
        />
      )}
      <button className="btn btn-neutral ml-3 m-2" onClick={handleUpload} disabled={!audio}>
        {isUploading ? 'Generating...' : 'Generate'}
      </button>
    </div>
  );
}
