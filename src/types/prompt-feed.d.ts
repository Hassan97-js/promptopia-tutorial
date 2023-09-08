import type { MouseEvent } from "react";
import type { Prompt, ApiPrompt } from "./create-prompt";

export interface PromptCardListProps {
  prompts: ApiPrompt[];
  onTagClick: (e: MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface PromptCardProps {
  prompt: ApiPrompt;
  onTagClick: (e: MouseEvent<HTMLElement, MouseEvent>) => void;
}
