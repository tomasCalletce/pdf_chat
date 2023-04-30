import { MutableRefObject } from 'react';

export const PromptInput = ({
  promptRef,
  handleSubmit,
  loading,
}: {
  loading : boolean,
  promptRef: MutableRefObject<HTMLInputElement | null>;
  handleSubmit: () => void;
}) => {
  return (
    <div>
      <div className="form-control">
        <div className="input-group">
          <input
            ref={promptRef}
            type="text"
            placeholder="Search…"
            className="input input-bordered w-full"
          />
          <button onClick={handleSubmit} className="btn">
            {loading?"loading":
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>}
          </button>
        </div>
      </div>
    </div>
  );
};
