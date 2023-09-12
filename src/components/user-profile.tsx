import PromptCard from "./prompt-card";

import type { ProfileCardListProps } from "@/types/prompt.types";
import type { UserProfile } from "@/types/profile.types";

const ProfileCardList = ({
  prompts,
  onPromptDelete,
  onPromptEdit,
  onTagClick
}: ProfileCardListProps) => {
  return (
    <div className="prompt-layout | mt-16">
      {prompts.map((prompt) => {
        const id = prompt._id;

        return (
          <PromptCard
            key={id}
            prompt={prompt}
            onTagClick={onTagClick}
            onPromptDelete={onPromptDelete}
            onPromptEdit={onPromptEdit}
          />
        );
      })}
    </div>
  );
};

const UserProfile = ({
  data,
  desc,
  name,
  onPromptDelete,
  onPromptEdit
}: UserProfile) => {
  return (
    <section className="text-center">
      {name ? (
        <h1 className="head-text | text-center">
          <span className="blue-gradient tracking-tight">Profile</span>
        </h1>
      ) : null}
      <p className="desc mx-auto tracking-tight">{desc}</p>

      <ProfileCardList
        prompts={data}
        onPromptDelete={onPromptDelete}
        onPromptEdit={onPromptEdit}
      />
    </section>
  );
};

export default UserProfile;
