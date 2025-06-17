import * as dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import readline from 'readline';

import { OpenAIEmbeddings } from '@langchain/openai';
import { ChatOpenAI } from '@langchain/openai';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RetrievalQAChain } from 'langchain/chains';

// Setup LLM
const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  modelName: 'gpt-3.5-turbo'
});

// 1. Load your .txt file
const loader = new TextLoader("data.txt");
const docs = await loader.load();

// 2. Split into chunks (so embedding works better)
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50
});
const splitDocs = await splitter.splitDocuments(docs);

// 3. Embed and store in memory
const vectorStore = await MemoryVectorStore.fromDocuments(
  splitDocs,
  new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY })
);

// 4. Create a retriever-based Q&A chain
const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

// 5. Set up terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 6. Start asking questions
async function startQA() {
  console.log("🤖 Ask me anything about the document. Type 'exit' to quit.");
  while (true) {
    await new Promise((resolve) => {
      rl.question('You: ', async (input) => {
        if (input.toLowerCase() === 'exit') {
          rl.close();
          process.exit(0);
        }

        try {
          const response = await chain.call({ query: input });
          console.log("Bot:", response.text);
        } catch (err) {
          console.error("Error:", err.message);
        }

        resolve();
      });
    });
  }
}

startQA();
