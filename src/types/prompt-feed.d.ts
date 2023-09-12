import type { MouseEvent } from "react";
import type { Prompt, ApiPrompt } from "./create-prompt";

export interface PromptCardListProps {
  prompts: ApiPrompt[];
  onTagClick: (e: MouseEvent<HTMLButtonElement>, tag: string) => void;
}

export interface ProfileCardListProps {
  prompts: ApiPrompt[];
  onTagClick: (e: MouseEvent<HTMLButtonElement>, tag: string) => void;
}

export interface PromptCardProps {
  prompt: ApiPrompt;
  onTagClick: (e: MouseEvent<HTMLButtonElement>, tag: string) => void;
}
