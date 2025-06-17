import * as dotenv from 'dotenv';
dotenv.config();

import readline from 'readline';
import { ChatOpenAI } from '@langchain/openai';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

// Set up readline interface for CLI input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialize Chat Model (OpenAI)
const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
  modelName: 'gpt-3.5-turbo' // or 'gpt-4' if you have access
});

// Add memory to store conversation history
const memory = new BufferMemory();

// Create a conversation chain using memory and the chat model
const chain = new ConversationChain({
  llm: chatModel,
  memory: memory,
});
console.log(await memory.chatHistory.getMessages());
// Function to run the chatbot
async function startChat() {
  console.log("🤖 Chatbot started! Type 'exit' to quit.");
  console.log(await memory.chatHistory.getMessages());
  while (true) {
    await new Promise((resolve) => {
      rl.question('You: ', async (userInput) => {
        if (userInput.toLowerCase() === 'exit') {
          rl.close();
          process.exit(0);
        }

        try {
          const res = await chain.call({ input: userInput });
          console.log('Bot:', res.response);
        } catch (err) {
          console.error("Error:", err.message);
        }

        resolve();
      });
    });
  }
}

startChat();
