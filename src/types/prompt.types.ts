import type { ChangeEvent, FormEvent, MouseEvent } from "react";

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
  onPromptChange?: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    update: "tag" | "text"
  ) => void;
  onPromptCreate?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onPromptUpdate?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}


export interface PromptCardProps {
  prompt: ApiPrompt;
  onTagClick?: (e: MouseEvent<HTMLButtonElement>, tag: string) => void;
  onPromptEdit?: (prompt: ApiPrompt) => void;
  onPromptDelete?: (prompt: ApiPrompt) => Promise<void>;
}

export interface PromptCardListProps {
  prompts: ApiPrompt[];
  onPromptEdit?: (prompt: ApiPrompt) => void;
  onPromptDelete?: (prompt: ApiPrompt) => Promise<void>;
  onTagClick?: (e: MouseEvent<HTMLButtonElement>, tag: string) => void;
}

export interface ProfileCardListProps {
  prompts: ApiPrompt[];
  onPromptEdit: (prompt: ApiPrompt) => void;
  onPromptDelete: (prompt: ApiPrompt) => Promise<void>;
  onTagClick?: (e: MouseEvent<HTMLButtonElement>, tag: string) => void;
}
