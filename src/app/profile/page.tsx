"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import UserProfile from "@/components/user-profile";
import type { ApiPrompt } from "@/types/create-prompt";

const Profile = () => {
  const [userPrompts, setUserPrompts] = useState<ApiPrompt[]>([]);

  console.log(userPrompts);

  const { data: session } = useSession();

  const handleProfileEdit = () => {};
  const handleProfileDelete = async () => {};

  useEffect(() => {
    const fetchPrompts = async () => {
      const fetchPromptsHeaders = new Headers();
      fetchPromptsHeaders.append("Content-Type", "application/json");

      const fetchPromptsRequest = new Request(
        `/api/users/${session?.user.id}/prompts`
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
      onPromptEdit={handleProfileEdit}
      onPromptDelete={handleProfileDelete}
    />
  );
};

export default Profile;
