import { useState } from "react";

export type AIResponseType = {
  heading: string;
  paragraphs: {
    subheading: string;
    content: string;
  }[];
  confidenceScore: number;
};

export function useAI() {
  const [isLoading, setLoading] = useState(false);

  const submitPrompt = async (prompt: string) => {
    setLoading(true);

    try {
      const response = await fetch("/api/getAIOutput", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const output = await validateResponse(response);
      return output;
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, submitPrompt };
}

async function validateResponse(response: Response) {
  if (!response.ok) {
    if (response.status == 429 && response.status < 500) {
      throw new Error('Too many people are using the ai... try again later :(');
    }
    throw new Error(`ERROR: HTTP ${response.status}`);
  }
  const data = await response.json();
  const output = JSON.parse(data);
  if (!output) {
    throw new Error("Missing AI output");
  }

  if (!output.heading) {
    throw new Error("Result is missing heading");
  }

  if (!Array.isArray(output.paragraphs)) {
    throw new Error("Result paragraphs is faulty");
  }
  return output as AIResponseType;
}
