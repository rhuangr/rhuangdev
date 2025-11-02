import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { systemPrompt } from "./systemPrompt";
import { ApiError } from "@google/genai";

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
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json(
      { error: "Failed to generate content. Please try again later." },
      { status: 500 }
    );
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
  },
  required: ["heading", "paragraphs"],
};
