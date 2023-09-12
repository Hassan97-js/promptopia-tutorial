"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import PromptForm from "@/components/prompt-form";
import { Prompt } from "@/types/prompt.types";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState<Prompt>({
    text: "",
    tag: ""
  });

  const router = useRouter();

  const { data: session } = useSession({
    required: true
  });

  const handlePromptChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    update: "tag" | "text"
  ) => {
    setPrompt((prevState) => {
      return { ...prevState, [update]: e.target.value };
    });
  };

  const handlePromptCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);

    const createPromptHeaders = new Headers();
    createPromptHeaders.append("Content-Type", "application/json");

    const createPromptInit = {
      method: "POST",
      headers: createPromptHeaders,
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        text: prompt.text,
        userId: session?.user.id,
        tag: prompt.tag
      })
    } satisfies RequestInit;

    const createPromptRequest = new Request("/api/prompt/new", createPromptInit);

    try {
      const response = await fetch(createPromptRequest);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PromptForm
      actionType="Create"
      prompt={prompt}
      submitting={submitting}
      onPromptChange={handlePromptChange}
      onPromptCreate={handlePromptCreate}
    />
  );
};

export default CreatePrompt;
