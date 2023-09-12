import { ApiPrompt } from "./prompt.types";

export type UserProfile = {
  name: string | null | undefined;
  desc: string;
  data: ApiPrompt[];
  onPromptEdit: (prompt: ApiPrompt) => void;
  onPromptDelete: (prompt: ApiPrompt) => Promise<void>;
};
