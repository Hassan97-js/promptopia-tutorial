import type { MouseEvent } from "react";
import type { Prompt, ApiPrompt } from "./create-prompt";

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
