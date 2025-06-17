# LangChain.js Chatbot with DeepSeek

A simple command-line chatbot built using LangChain.js and DeepSeek's AI model.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your DeepSeek API key:
```
DEEPSEEK_API_KEY=your-api-key-here
```

3. Run the chatbot:
```bash
npm start
```

## Usage

- Type your messages and press Enter to chat with the bot
- Type 'exit' to quit the chatbot

## Features

- Uses DeepSeek's AI model for natural language understanding
- Maintains conversation context
- Simple command-line interface
- Error handling for API issues

## Requirements

- Node.js (v14 or higher)
- DeepSeek API key (get it from https://platform.deepseek.com/)

## Getting a DeepSeek API Key

1. Go to https://platform.deepseek.com/
2. Sign up for an account
3. Navigate to the API section
4. Generate a new API key
5. Copy the key and add it to your `.env` file 