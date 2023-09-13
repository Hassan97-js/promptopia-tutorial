"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

import UserProfile from "@/components/user-profile";

import { capitalize } from "@/utils/capitalize";

import type { ApiPrompt } from "@/types/prompt.types";

const Profile = () => {
  const [userPrompts, setUserPrompts] = useState<ApiPrompt[]>([]);

  const params = useParams();
  const searchParams = useSearchParams();

  const creatorUsername = capitalize(searchParams.get("name"));

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
        `/api/users/${params.id}/prompts`,
        fetchPromptsInit
      );

      const response = await fetch(fetchPromptsRequest);
      const data = await response.json();

      console.log(data);

      setUserPrompts(data);
    };

    if (params.id) {
      fetchPrompts();
    }
  }, [params.id]);

  return <UserProfile name={creatorUsername} desc="Welcome" data={userPrompts} />;
};

export default Profile;
