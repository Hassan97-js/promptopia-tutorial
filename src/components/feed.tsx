"use client";

import { useState, useEffect } from "react";

import PromptCard from "@/components/prompt-card";

import type { ChangeEvent, MouseEvent } from "react";
import type { PromptCardListProps } from "@/types/prompt-feed";
import type { ApiPrompt } from "@/types/create-prompt";

const PromptCardList = ({ prompts, onTagClick }: PromptCardListProps) => {
  return (
    <div className="prompt-layout | mt-16">
      {prompts.map((prompt) => {
        return (
          <PromptCard key={prompt._id} prompt={prompt} onTagClick={onTagClick} />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [prompts, setPrompts] = useState<ApiPrompt[]>([]);
  const [searchText, setSearchText] = useState("");

  console.log(prompts);

  const handleTagClick = (e: MouseEvent<HTMLElement, MouseEvent>) => {};

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPrompts = async () => {
      const fetchPromptHeaders = new Headers();
      fetchPromptHeaders.append("Content-Type", "application/json");

      const fetchPromptRequest = new Request("/api/prompt/all");

      const response = await fetch(fetchPromptRequest);
      const data = await response.json();

      setPrompts(data);
    };

    fetchPrompts();
  }, []);

  return (
    <section className="feed | container">
      <form className="flex-center | relative w-full">
        <input
          className="search-input | peer"
          type="text"
          value={searchText}
          placeholder="Search for a tag or a username"
          onChange={handleSearchChange}
          required
        />
      </form>

      <PromptCardList prompts={prompts} onTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
