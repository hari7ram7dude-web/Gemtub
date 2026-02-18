
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const summarizeVideo = async (title: string, description: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the video title "${title}" and description "${description}", provide a concise 3-bullet point summary of what the viewer can expect from this video.`,
  });
  return response.text;
};

export const generateAIComments = async (videoTitle: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 5 realistic YouTube comments for a video titled "${videoTitle}". Include different tones: one excited, one curious, one slightly critical, and two generally positive. Return as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            author: { type: Type.STRING },
            text: { type: Type.STRING },
            time: { type: Type.STRING }
          },
          required: ["author", "text", "time"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateVideoWithVeo = async (prompt: string, onStatusChange: (status: string) => void) => {
  const ai = getAIClient();
  onStatusChange("Initializing Veo generation...");
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    onStatusChange("Video is being processed... (This may take a few minutes)");

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
      onStatusChange(`Processing... ${operation.metadata?.progressPercentage || 0}% complete`);
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Failed to get video URI");

    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Veo Error:", error);
    throw error;
  }
};
