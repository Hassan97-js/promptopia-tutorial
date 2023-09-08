import type { ChangeEvent, FormEvent } from "react";

export interface Prompt {
  text: string;
  tag: string;
}

export interface ApiPrompt extends Prompt {
  _id: string;
  creator: {
    _id: string;
    email: string;
    image: string;
    username: string;
  };
}

export interface PromptFormProps {
  actionType: string;
  prompt: Prompt;
  submitting: boolean;
  onPromptChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    update: "tag" | "text"
  ) => void;
  onPromptCreate: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}
