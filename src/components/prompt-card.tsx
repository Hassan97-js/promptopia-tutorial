"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import type { PromptCardProps } from "@/types/prompt-feed";

const PromptCard = ({
  prompt,
  onTagClick,
  onPromptDelete,
  onPromptEdit
}: PromptCardProps) => {
  const [copiedText, setCopiedText] = useState("");

  const { data: session } = useSession();

  const pathName = usePathname();
  const router = useRouter();

  const handlePromptCopy = async () => {
    try {
      setCopiedText(prompt.text);
      await navigator.clipboard.writeText(prompt.text);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setCopiedText("");
      }, 3000);
    }
  };

  return (
    <div className="prompt-card | relative">
      <button className="flex flex-1 justify-between items-center gap-5 px-6">
        <div className="flex gap-4">
          <Image
            className="rounded-full object-contain w-auto h-auto"
            src={prompt.creator.image}
            alt="User image"
            width={40}
            height={40}
          />

          <div className="flex flex-col">
            <h3 className="font-semibold text-slate-900 text-left">
              {prompt.creator.username}
            </h3>
            <p className="text-sm text-slate-500">{prompt.creator.email}</p>
          </div>
        </div>
      </button>

      <p className="px-6 pb-4 text-sm text-slate-700 truncate max-w-prose">
        {prompt.text}
      </p>
      <button
        className="blue-gradient | text-left px-6 pb-4 text-sm text-slate-500 truncate"
        onClick={(e) => onTagClick && onTagClick(e, prompt.tag)}>
        {prompt.tag.toLowerCase()}
      </button>

      {session?.user.id === prompt.creator._id && pathName === "/profile" ? (
        <div className="flex justify-center items-center gap-6 pb-4 pt-4 border-t border-slate-200">
          <button
            className="text-sm green-gradient"
            onClick={() => onPromptEdit && onPromptEdit(prompt)}>
            Edit
          </button>
          <button
            className="text-sm orange-gradient"
            onClick={() => onPromptDelete && onPromptDelete(prompt)}>
            Delete
          </button>
        </div>
      ) : null}

      <button
        className="copy-btn absolute right-0 mt-3 mr-3"
        onClick={handlePromptCopy}>
        <Image
          className="w-auto h-auto"
          src={
            copiedText && copiedText === prompt.text
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"
          }
          width={12}
          height={12}
          alt="Copy Button"
        />
      </button>
    </div>
  );
};

export default PromptCard;
