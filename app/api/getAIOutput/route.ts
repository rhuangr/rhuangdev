import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { systemPrompt } from "./systemPrompt";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  const callGemini = async (modelName: string) => {
    const { prompt } = await request.json();
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        seed: 5234,
        responseMimeType: "application/json",
        responseSchema: llmOutputSchema,
      },
    });
    console.log(response.usageMetadata);
    return response;
  };

  try {
    const response = await callGemini("gemini-2.5-flash-lite");

    return NextResponse.json(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again later." },
      { status: 500 }
    )
  }
}

const llmOutputSchema = {
  type: Type.OBJECT,
  properties: {
    heading: {
      type: Type.STRING,
    },
    paragraphs: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          subheading: {
            type: Type.STRING,
          },
          content: {
            type: Type.STRING,
          },
        },
        required: ["subheading", "content"],
      },
      maxItems: 3,
      minItems: 1,
    },
    confidenceScore: {
      type: Type.INTEGER,
      minimum: 0,
      maximum: 100,
    },
  },
  required: ["heading", "paragraphs", "confidenceScore"],
};
