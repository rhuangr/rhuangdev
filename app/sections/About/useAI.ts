import { useState } from "react";
// import ollama, { type any } from "ollama";

export const llmOutputSchema = {
  type: "object",
  properties: {
    heading: {
      type: "string",
    },
    paragraphs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          subheading: {
            type: "string",
          },
          content: {
            type: "string",
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

export const useAI = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // output does not get set to null on every new request
  const [output, setOutput] = useState<any | null>(null);

  const submitPrompt = async (prompt: string) => {
    setLoading(true);
    setError(null);

    try {
      await callAI(prompt, true, setOutput);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to submit prompt";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, error, output, submitPrompt };
};

async function callAI(
  prompt: string,
  fake: boolean,
  setOutput: (output: any) => void
) {
  if (fake) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setOutput({
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
    } as unknown as any);
    return;
  }
  // const response = await ollama.generate({
  //   model: "deepseek-r1:latest",
  //   think: false,
  //   prompt: prompt,
  //   system: `You are a helpful assistant that provides CONCISE answers.
  //      Each paragraph of your response MUST contain 2 or 3 sentences for content and MUST a descriptive subheading for its content,
  //     and each sentence should contain no more than 15 words.`,
  //   format: llmOutputSchema,
  // });

  // setOutput(response);
}
