import * as dotenv from "dotenv";
import axios from "axios";


dotenv.config();

const API_KEY = process.env.TOGETHER_API_KEY;
const API_URL = "https://api.together.xyz/v1/chat/completions";  // This may need to be updated depending on their API

async function chatWithAI(message) {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "deepseek-chat",  // Use the deepseek-chat model
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("AI Response:", response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error making API request:", error);
  }
}

chatWithAI("Tell me a fun fact about space!");
