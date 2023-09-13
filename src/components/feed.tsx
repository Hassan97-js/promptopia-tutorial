"use client";

import { useState, useEffect } from "react";

import PromptCard from "@/components/prompt-card";

import { filterArray } from "@/utils/filter-array";

import type { ChangeEvent, MouseEvent } from "react";
import type { ApiPrompt, PromptCardListProps } from "@/types/prompt.types";
import type { TimeoutType } from "@/types/nodejs.types";

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
  const [searchTimeout, setSearchTimeout] = useState<TimeoutType>();
  const [searchResults, setSearchResults] = useState<ApiPrompt[]>([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const fetchPromptsHeaders = new Headers();
      fetchPromptsHeaders.append("Content-Type", "application/json");

      const fetchPromptsRequest = new Request("/api/prompt/all");

      const response = await fetch(fetchPromptsRequest);
      const data = await response.json();

      setPrompts(data);
    };

    fetchPrompts();
  }, []);

  const handleTagClick = (e: MouseEvent<HTMLButtonElement>, tag: string) => {
    setSearchText(tag);

    const newPrompts = filterArray<ApiPrompt>(prompts, (p) => {
      return p.tag.trim().toLowerCase().includes(tag.trim().toLowerCase());
    });

    setSearchResults(newPrompts);
  };

  const handleSearchClear = () => {
    setSearchText("");
    setSearchResults([]);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    // debounce
    setSearchTimeout(
      setTimeout(() => {
        const targetValue = e.target.value;

        const newPrompts = filterArray<ApiPrompt>(prompts, (p) => {
          return (
            p.text.trim().toLowerCase().includes(targetValue.trim().toLowerCase()) ||
            p.tag.trim().toLowerCase().includes(targetValue.trim().toLowerCase()) ||
            p.creator.username
              .trim()
              .toLowerCase()
              .includes(targetValue.trim().toLowerCase())
          );
        });

        setSearchResults(newPrompts);
      }, 500)
    );
  };

  const promptsToDisplay = searchResults.length > 0 ? searchResults : prompts;

  return (
    <section className="feed | container">
      <form onSubmit={(e) => e.preventDefault()} className="relative w-full">
        <div className="relative max-w-3xl mx-auto">
          <input
            className="search-input"
            type="search"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search for a tag or a username"
            required
          />
          <button
            type="button"
            className="absolute right-0 top-[14px] pr-3 text-xs font-bold text-slate-500"
            onClick={handleSearchClear}>
            X
          </button>
        </div>
      </form>

      <PromptCardList prompts={promptsToDisplay} onTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
