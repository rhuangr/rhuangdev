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
      if (!response.ok) {
        throw new Error(`ERROR: HTTP ${response.status}, try again later..`);
      }
      const data = await response.json();
      const output = JSON.parse(data);
      validateOutput(output);
      console.log(output.confidenceScore)
      return output;

    } finally {
      setLoading(false);
    }
  };

  return { isLoading, submitPrompt };
}

function validateOutput(result: AIResponseType) {
  if (!result) {
    console.error("No result to handle in RhuangrContextProvider");
    throw new Error("Missing AI output");
  }

  if (!result.heading) {
    console.error("Result is missing heading:", result);
    throw new Error("Result is missing heading");
  }

  if (!Array.isArray(result.paragraphs)) {
    console.error("Result paragraphs is faulty:", result);
    throw new Error("Result paragraphs is faulty");
  }
}
