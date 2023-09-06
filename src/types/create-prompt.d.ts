type PromptPost = {
  prompt: string;
  tag: string;
};

type PromptFormProps = {
  formAction: string;
  post: PromptPost;
  submitting: boolean;
  onPromptPostChange: () => void;
  onCreatePromptPost: () => Promise<void>;
};
