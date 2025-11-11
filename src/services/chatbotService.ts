import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export const getChatbotResponse = async (userMessage: string): Promise<string> => {
  try {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const systemPrompt = `You are AskCounsel, a helpful AI legal assistant providing preliminary guidance based on Indian laws. Always emphasize that this is not a substitute for professional legal advice. Be accurate, concise, and helpful. If the query is outside your knowledge or requires specific legal counsel, recommend consulting a qualified lawyer from LegalSangam.`;

    const prompt = `${systemPrompt}\n\nQuestion: ${userMessage}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text().trim();

    if (!response) {
      throw new Error('No response from Gemini');
    }

    return response;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    return 'Sorry, there was an error. Please try again later.';
  }
};
