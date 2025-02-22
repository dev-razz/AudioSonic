"use client";

import FileSelector from "./FileSelector";
import Imagegen from "./Imagegen";
import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./Home.module.css";
const WaveForm = dynamic(() => import("./WaveForm"), {
  ssr: false,
});
import Player from "./Player";
import Overview from './Overview'

export default function AudioToImage() {
  const [audio, setAudio] = useState(false);
  const [transcript, setTranscript] = useState<string>();
  const [audioWaveForm, setAudioWaveForm] = useState();

  return (
    <div className="flex flex-col items-center">
      <h1 className="m-3 mt-10">Upload Your File Here</h1>
      <div className={styles.container}>
        <FileSelector
          audio = {audio}
          setAudio={setAudio}
          setDGTranscript={setTranscript}
        ></FileSelector>
        {audio && (
          <div className="grid items-center">
            <Player
              audio={audio}
              audioWaveForm={audioWaveForm}
              dGTranscript={transcript}
            />
            <WaveForm
              url={audio ? audio : "./Rev.mp3"}
              setAudioWaveForm={setAudioWaveForm}
            />
          </div>
        )}
        <Overview dGTranscript={transcript}></Overview>
      </div>
      <Imagegen dGTranscript={transcript}></Imagegen>
    </div>
  );
}
