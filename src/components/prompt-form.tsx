import Link from "next/link";
import { PromptFormProps } from "@/types/create-prompt";

const PromptForm = ({
  actionType,
  post,
  submitting,
  onPromptPostCreate,
  onPromptPostChange
}: PromptFormProps) => {
  return (
    <section className="flex-start | w-full max-w-full flex-col">
      <h1 className="head-text | text-left">
        <span className="blue-gradient">{actionType} Post</span>
      </h1>
      <p className="desc | text-left max-w-md">
        {actionType} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      
      <form
        className="glassmorphism | mt-10 w-full max-w-2xl flex flex-col gap-7"
        onSubmit={onPromptPostCreate}>
        <label htmlFor="">
          <span className="font-satoshi | font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            className="form-textarea"
            value={post.prompt}
            onChange={(e) => onPromptPostChange(e, "prompt")}
            placeholder="Write your prompt here..."
            required
          />
        </label>
        <label htmlFor="">
          <p className="font-satoshi | font-semibold text-base text-gray-700">
            Tag
            <span className="font-normal"> (#product, #webdevelopment, #idea)</span>
          </p>

          <input
            className="form-input"
            value={post.tag}
            onChange={(e) => onPromptPostChange(e, "tag")}
            placeholder="#tag"
            required
          />
        </label>

        <div className="flex-end | mx-3 mb-5 gap-4">
          <Link className="text-gray-500 text-sm" href="/">
            Cancel
          </Link>
          <button
            className="px-5 py-1.5 text-sm font-semibold bg-primary-orange rounded-full text-white"
            type="submit"
            disabled={submitting}>
            {submitting ? `${actionType}...` : actionType}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PromptForm;
