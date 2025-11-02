import { useState } from "react";

export interface AIResponse {
  response: string;
}

export const llmOutputSchema = {
  type: "object",
  properties: {
    heading: { type: "string" },
    paragraphs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          subheading: { type: "string" },
          content: { type: "string" },
        },
        required: ["subheading", "content"],
      },
      maxItems: 3,
      minItems: 1,
    },
  },
  required: ["heading", "paragraphs"],
};

export function useAI() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitPrompt = async (prompt: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await callAI(prompt, true);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit prompt";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, error, submitPrompt };
}

async function callAI(
  prompt: string,
  fake: boolean,
): Promise<AIResponse | null> {
  if (fake) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return {
      response: JSON.stringify({
        heading: "About Me",
        paragraphs: [
          {
            subheading: "Passionate Developer",
            content:
              "I am a software developer with a passion for creating innovative solutions. I enjoy working on challenging projects that push the boundaries of technology.",
          },
          {
            subheading: "Lifelong Learner",
            content:
              "I believe in continuous learning and self-improvement. I regularly explore new technologies and methodologies to enhance my skills.",
          },
        ],
      }),
    } satisfies AIResponse;
  }
  return null;
}
