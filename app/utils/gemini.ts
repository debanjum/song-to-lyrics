import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function processAudio(file: File): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Convert audio file to base64
    const base64Audio = await fileToBase64(file);

    const prompt = `
      Please analyze this audio file and generate timestamped lyrics in LRC format.
      The output lyrics should always be in the latin script.
      The output should follow standard LRC format with [mm:ss.xx] timestamps.
      Only return the LRC content, no additional text.
    `;

    const result = await model.generateContent([prompt, { inlineData: { data: base64Audio, mimeType: file.type } }]);
    const response = result.response;
    const text = response.text();

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
