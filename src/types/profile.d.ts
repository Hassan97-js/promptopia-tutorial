import { ApiPrompt } from "./create-prompt";

export type UserProfile = {
  name: string | null | undefined;
  desc: string;
  data: ApiPrompt[];
  onPromptEdit: () => void;
  onPromptDelete: () => Promise<void>;
};
