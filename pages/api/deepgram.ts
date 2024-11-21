import { NextApiRequest, NextApiResponse } from 'next';
const { createClient } = require("@deepgram/sdk");
import fs from 'fs'; // Import the 'fs' module


export default async function handler(req : any, res:any) {

  try {
    console.log("deepgram api running")
    const file = req.body
    const buffer = Buffer.from(file, "base64")
    const deepgram = createClient(process.env.Deepgram_API_Key);
    //const url = 'https://static.deepgram.com/examples/Bueller-Life-moves-pretty-fast.wav'
    const { result,error } = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      {
        model: 'nova-2',
        language: 'en',
        summarize: 'v2',
        smart_format: true,
      },
    );
    if (error) {
      console.error(error);
    } else {
      console.log("Transcript",result.results.channels[0]);
    }
    res.status(200).json({ body: JSON.stringify(result) });
  } catch (err) {
    console.log("Error",err);
    res.status(500).json({ body: String(err) });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
