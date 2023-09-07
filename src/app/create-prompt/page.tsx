"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import PromptForm from "@/components/prompt-form";
import { PromptPost } from "@/types/create-prompt";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [promptPost, setPromptPost] = useState<PromptPost>({
    prompt: "",
    tag: ""
  });

  const handlePromptPostChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    update: "tag" | "prompt"
  ) => {
    setPromptPost((prevState) => {
      return { ...prevState, [update]: e.target.value };
    });
  };

  const handlePostPromptCreate = async (e: FormEvent<HTMLFormElement>) => {

    setSubmitting(true);

    try {
      const response = await fetch("")
    } catch (error) {
      
    }
  };

  return (
    <PromptForm
      actionType="Create"
      post={promptPost}
      submitting={submitting}
      onPromptPostChange={handlePromptPostChange}
      onPromptPostCreate={handlePostPromptCreate}
    />
  );
};

export default CreatePrompt;
