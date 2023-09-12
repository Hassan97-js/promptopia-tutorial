"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import UserProfile from "@/components/user-profile";
import type { ApiPrompt } from "@/types/create-prompt";

const Profile = () => {
  const [userPrompts, setUserPrompts] = useState<ApiPrompt[]>([]);

  userPrompts.length && console.log(userPrompts);

  const { data: session } = useSession();

  const handlePromptEdit = (prompt: ApiPrompt) => {};
  const handlePromptDelete = async (prompt: ApiPrompt) => {};

  useEffect(() => {
    const fetchPrompts = async () => {
      const fetchPromptsHeaders = new Headers();
      fetchPromptsHeaders.append("Content-Type", "application/json");

      const fetchPromptsRequest = new Request(
        `/api/users/${session?.user.id}/prompts`,
        {
          headers: fetchPromptsHeaders
        }
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
      desc="Welcome to your profile"
      data={userPrompts}
      onPromptEdit={handlePromptEdit}
      onPromptDelete={handlePromptDelete}
    />
  );
};

export default Profile;
