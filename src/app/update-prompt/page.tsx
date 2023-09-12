"use client";

import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import PromptForm from "@/components/prompt-form";
import type { ApiPrompt, Prompt } from "@/types/prompt.types";

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState<Prompt>({
    text: "",
    tag: ""
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const promptId = searchParams.get("id");

  useEffect(() => {
    if (!promptId) {
      router.push("/profile");
    }

    const getPromptDetails = async () => {
      const promptsDetailsHeaders = new Headers();
      promptsDetailsHeaders.append("Content-Type", "application/json");

      const promptsDetailsRequest = new Request(`/api/prompt/${promptId}`);

      const response = await fetch(promptsDetailsRequest);
      const data: ApiPrompt = await response.json();

      // console.log(data);

      setPrompt({
        text: data.text,
        tag: data.tag
      });
    };

    promptId && getPromptDetails();
  }, [promptId, router]);

  const handlePromptChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    update: "tag" | "text"
  ) => {
    setPrompt((prevState) => {
      return { ...prevState, [update]: e.target.value };
    });
  };

  const handlePromptUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId || promptId === "") {
      router.push("/");
    }

    const updatePromptHeaders = new Headers();
    updatePromptHeaders.append("Content-Type", "application/json");

    const updatePromptInit = {
      method: "PATCH",
      headers: updatePromptHeaders,
      mode: "cors",
      cache: "default",
      body: JSON.stringify({
        text: prompt.text,
        tag: prompt.tag
      })
    } satisfies RequestInit;

    const updatePromptRequest = new Request(
      `/api/prompt/${promptId}`,
      updatePromptInit
    );

    try {
      const response = await fetch(updatePromptRequest);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      router.push("/profile");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PromptForm
      actionType="Edit"
      prompt={prompt}
      submitting={submitting}
      onPromptChange={handlePromptChange}
      // onPromptCreate={handlePromptCreate}
      onPromptUpdate={handlePromptUpdate}
    />
  );
};

export default UpdatePrompt;
