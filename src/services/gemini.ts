import { GoogleGenAI } from '@google/genai';
import { env } from '../env.ts';

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash';

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcribe given audio to US English text. Be precise and natural in transcription. Keep proper punctuation and break the text into paragraphs when necessary.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });

  if (!response.text) {
    throw new Error('It was not possible to convert the audio');
  }

  return response.text;
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  });

  if (!response.embeddings?.[0].values) {
    throw new Error('It was not possible to generate the embeddings.');
  }

  return response.embeddings[0].values;
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join('\n\n');

  const prompt = `
    
    Based on the text provided below as context, answer the question clearly and accurately in US English.

    CONTEXT:
    ${context}

    QUESTION:
    ${question}

    INSTRUCTIONS:
      - Use only information contained in the provided context;
      - If the answer is not found in the context, simply respond that there is not enough information to answer;
      - Be concise;
      - Maintain an educational and professional tone;
      - Quote relevant excerpts from the context when appropriate;
      - When quoting the context, refer to it as "lesson content".

  `.trim();

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  });

  if (!response.text) {
    throw new Error('It was not possible to generate the answer.');
  }

  return response.text;
}
