# TODO: Integrate Gemini API into AskCounsel Chatbot

## Overview
Updated the AskCounsel chatbot to use Google Gemini API directly from the frontend (no Firebase functions used as per user request).

## Tasks

### 1. Install Gemini SDK
- [x] Install @google/generative-ai in package.json

### 2. Update chatbotService.ts
- [x] Replace Firebase function call with direct Gemini API call
- [x] Set API key via VITE_GEMINI_API_KEY environment variable

### 3. Configure API Key
- [x] Create .env file with VITE_GEMINI_API_KEY

### 4. Testing and Verification
- [ ] Test chatbot responses in the application
- [ ] Verify proper error handling
- [ ] Ensure responses are accurate and follow legal guidelines

## Notes
- API key is exposed in client-side code (not secure for production)
- System prompt emphasizes that responses are not legal advice
- Direct API call for simplicity as requested
