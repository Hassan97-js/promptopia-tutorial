import { UserProfile } from "@/types/profile";
import { ProfileCardListProps } from "@/types/prompt-feed";
import PromptCard from "./prompt-card";

const ProfileCardList = ({ prompts, onTagClick }: ProfileCardListProps) => {
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

      <ProfileCardList prompts={data} onTagClick={() => {}} onPromptDelete={onPromptDelete} onPromptEdit={onPromptEdit}  />
    </section>
  );
};

export default UserProfile;
