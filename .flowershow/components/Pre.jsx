import { Mermaid } from "mdx-mermaid/Mermaid";
import { useRef, useState } from "react";

export function Pre({ children, ...props }) {
  const textInput = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onEnter = () => {
    setHovered(true);
  };
  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };
  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput.current.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (props.className && props.className === "code-mermaid") {
    return (
      <div className="my-10">
        <Mermaid chart={children} />
      </div>
    );
  }

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="relative">
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className={`absolute right-2 top-2 h-6 w-6 rounded border bg-gray-700 p-1 ease-in-out duration-100 ${
            copied
              ? "border-green-400 focus:border-green-400 focus:outline-none"
              : "border-slate-300"
          }`}
          onClick={onCopy}>
          <svg
            aria-hidden="true"
            viewBox="-2 -2 20 20"
            fill="currentColor"
            className={copied ? "text-green-400" : "text-slate-300"}>
            {copied ? (
              <path
                fillRule="evenodd"
                d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
              />
            ) : (
              <>
                <path
                  fillRule="evenodd"
                  d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"
                />
              </>
            )}
          </svg>
        </button>
      )}
      <pre>{children}</pre>
    </div>
  );
}
