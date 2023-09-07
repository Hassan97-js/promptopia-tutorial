import type { ChangeEvent, FormEvent } from "react";

export interface PromptPost {
  prompt: string;
  tag: string;
}

export interface PromptFormProps {
  actionType: string;
  post: PromptPost;
  submitting: boolean;
  onPromptPostChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    update: "tag" | "prompt"
  ) => void;
  onPromptPostCreate: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}
