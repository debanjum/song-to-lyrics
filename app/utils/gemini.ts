import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

export async function processAudio(file: File): Promise<string> {
  try {
    // Convert audio file to base64
    const base64Audio = await fileToBase64(file);

    const prompt = `
      Please analyze this audio file and generate timestamped lyrics in LRC format.
      Your generated lyrics should ALWAYS be in english script.
      The lyrics should follow standard LRC format with [mm:ss.xx] timestamps.
      Only return the LRC content, no additional text.
    `;

    const result = await genAI.models.generateContent({
        model: 'gemini-2.5-flash-preview-05-20',
        contents: [ prompt, { inlineData: { data: base64Audio, mimeType: file.type } } ]
    });
    const text = result.text;

    return text;
  } catch (error) {
    console.error('Error processing audio:', error);
    throw new Error('Failed to process audio file');
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
}
