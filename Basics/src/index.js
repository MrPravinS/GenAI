import {GoogleGenAI} from '@google/genai';
import dotenv from 'dotenv'

const GEMINI_API_KEY = "AIzaSyAU2b_2VLEb97fciGfETLN6epW54w2h-js";

dotenv.config()



import { GoogleAuth } from 'google-auth-library';

async function testAuth() {
  const auth = new GoogleAuth();
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
  console.log('Authenticated to project:', projectId);
}

testAuth();


const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);
}

main();

