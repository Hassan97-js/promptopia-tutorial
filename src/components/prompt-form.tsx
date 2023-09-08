import Link from "next/link";
import { PromptFormProps } from "@/types/create-prompt";

const PromptForm = ({
  actionType,
  prompt,
  submitting,
  onPromptCreate,
  onPromptChange
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
        onSubmit={onPromptCreate}>
        <label htmlFor="">
          <span className="font-satoshi | font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            className="form-textarea"
            value={prompt.text}
            onChange={(e) => onPromptChange(e, "text")}
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
            value={prompt.tag}
            onChange={(e) => onPromptChange(e, "tag")}
            placeholder="#tag"
            required
          />
        </label>

        <div className="flex-end | mx-3 mb-5 gap-4">
          <Link className="text-gray-500 text-sm" href="/">
            Cancel
          </Link>
          <button
            className="px-[2em] py-[0.75em] text-sm font-semibold bg-blue-800 hover:bg-blue-700 transition-colors rounded-full text-white leading-none"
            type="submit"
            disabled={submitting}>
            {submitting ? `${actionType}ing...` : actionType}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PromptForm;
