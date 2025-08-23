import { genkit } from 'genkit'; // Correto: Importa a função de configuração simplificada.
import { googleAI } from '@genkit-ai/googleai';
import 'dotenv/config';

// Correto: Usa a função simplificada sem opções extras.
const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY!,
    }),
  ],
});

export default ai;