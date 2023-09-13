"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import UserProfile from "@/components/user-profile";

import type { ApiPrompt } from "@/types/prompt.types";

const Profile = () => {
  const [userPrompts, setUserPrompts] = useState<ApiPrompt[]>([]);

  const { data: session } = useSession();

  console.log(session?.user.id);

  const router = useRouter();

  const handlePromptEdit = (prompt: ApiPrompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handlePromptDelete = async (prompt: ApiPrompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (!hasConfirmed) {
      return;
    }

    try {
      const deletPromptHeaders = new Headers();
      deletPromptHeaders.append("Content-Type", "application/json");

      const deletePromptInit = {
        method: "DELETE",
        headers: deletPromptHeaders,
        mode: "cors",
        cache: "default",
        body: JSON.stringify({
          text: prompt.text,
          tag: prompt.tag
        })
      } satisfies RequestInit;

      const deletePromptRequest = new Request(
        `/api/prompt/${prompt._id}`,
        deletePromptInit
      );

      const response = await fetch(deletePromptRequest);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newPrompts = userPrompts.filter((p) => p._id !== prompt._id);

      setUserPrompts(newPrompts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      const fetchPromptsHeaders = new Headers();
      fetchPromptsHeaders.append("Content-Type", "application/json");

      const fetchPromptsInit = {
        method: "GET",
        headers: fetchPromptsHeaders,
        mode: "cors",
        cache: "default"
      } satisfies RequestInit;

      const fetchPromptsRequest = new Request(
        `/api/users/${session?.user.id}/prompts`,
        fetchPromptsInit
      );

      const response = await fetch(fetchPromptsRequest);
      const data = await response.json();

      setUserPrompts(data);
    };

    if (session?.user.id) {
      fetchPrompts();
    }
  }, [session?.user.id]);

  return (
    <UserProfile
      name={session?.user.name}
      desc="Welcome"
      data={userPrompts}
      onPromptEdit={handlePromptEdit}
      onPromptDelete={handlePromptDelete}
    />
  );
};

export default Profile;
