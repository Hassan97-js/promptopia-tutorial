import Link from "next/link";
import { PromptFormProps } from "@/types/create-prompt";

const PromptForm = ({
  actionType,
  prompt,
  submitting,
  onPromptCreate,
  onPromptChange,
  onPromptUpdate
}: PromptFormProps) => {
  return (
    <section className="flex-start | w-full max-w-full flex-col">
      <h1 className="head-text | text-left">
        <span className="blue-gradient tracking-tight">{actionType} Prompt</span>
      </h1>
      <p className="desc | text-left max-w-md tracking-tight">
        {actionType} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        className="glassmorphism | mt-10 w-full max-w-2xl flex flex-col gap-7"
        onSubmit={(e) => {
          onPromptCreate && onPromptCreate(e);
          onPromptUpdate && onPromptUpdate(e);
        }}>
        <label htmlFor="">
          <span className="font-semibold text-base text-slate-700">
            Your AI Prompt
          </span>

          <textarea
            className="form-textarea"
            value={prompt.text}
            onChange={(e) => onPromptChange && onPromptChange(e, "text")}
            placeholder="Write your prompt here..."
            required
          />
        </label>
        <label htmlFor="">
          <p className="font-semibold text-base text-slate-700">
            Tag
            <span className="font-normal"> (#product, #webdevelopment, #idea)</span>
          </p>

          <input
            className="form-input"
            value={prompt.tag}
            onChange={(e) => onPromptChange && onPromptChange(e, "tag")}
            placeholder="#tag"
            required
          />
        </label>

        <div className="flex-end | mx-3 mb-5 gap-4">
          <Link className="text-slate-500 text-sm" href="/">
            Cancel
          </Link>
          <button
            className="px-[2em] py-[0.75em] text-sm font-medium bg-blue-800 hover:bg-blue-700 transition-colors rounded-full text-white leading-none tracking-wider"
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
