"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import type { PromptCardProps } from "@/types/prompt-feed";

const PromptCard = ({ prompt, onTagClick }: PromptCardProps) => {
  return (
    <div className="prompt-card">
      <div className="flex justify-between items-start gap-5">
        <Image
          className="rounded-full object-contain"
          src={prompt.creator.image}
          alt="User image"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
};

export default PromptCard;
