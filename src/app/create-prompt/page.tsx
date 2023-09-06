"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import PromptForm from "@/components/prompt-form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [promptPost, setPromptPost] = useState<PromptPost>({
    prompt: "",
    tag: ""
  });

  const handlePromptPostChange = () => {
    // setPromptPost()
  };

  const handleCreatePostPrompt = async () => {};

  return (
    <PromptForm
      formAction="Create"
      post={promptPost}
      submitting={submitting}
      onPromptPostChange={handlePromptPostChange}
      onCreatePromptPost={handleCreatePostPrompt}
    />
  );
};

export default CreatePrompt;
