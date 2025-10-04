
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchChapterContent = async (chapterTitle: string, languageName: string, languageCode: string): Promise<string> => {
  const prompt = `
    As an expert Java Swing programming tutor, create a detailed tutorial chapter on the topic: "${chapterTitle}".
    The tutorial should be easy for a beginner to understand and follow.
    Structure the content logically with clear headings, explanations of concepts, and at least one complete, runnable Java Swing code example.
    Format the entire response in Markdown. Use triple backticks with "java" for Java code blocks (e.g., \`\`\`java ... \`\`\`).
    Finally, translate the entire Markdown response into ${languageName} (${languageCode}). Ensure the code itself remains in Java.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching chapter content from Gemini:", error);
    throw new Error("Failed to generate tutorial content. Please check your API key and network connection.");
  }
};
