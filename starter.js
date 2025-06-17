import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import 'dotenv/config';

// Check if API key exists
if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY is not set in your .env file');
    process.exit(1);
}

// Initialize the chat model
const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
});

// Create readline interface
const readline = (await import('readline')).default.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Chatbot initialized! Type 'exit' to quit.");

async function chat() {
    readline.question('You: ', async (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            readline.close();
            return;
        }

        try {
            const response = await model.invoke([
                new HumanMessage(input)
            ]);
            console.log('Bot:', response.content);
        } catch (error) {
            console.error('Error:', error.message);
            console.log('Bot: Sorry, I encountered an error. Please try again.');
        }

        chat();
    });
}

// Start the conversation
chat().catch(console.error);