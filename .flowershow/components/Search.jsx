import { DocSearchModal, useDocSearchKeyboardEvents } from "@docsearch/react";
import Link from "next/link";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const docSearchConfig = {
  appId: process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_DOCSEARCH_API_KEY,
  indexName: process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME,
};

function Hit({ hit, children }) {
  return <Link href={hit.url}>{children}</Link>;
}

function SearchIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" {...props}>
      <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z" />
    </svg>
  );
}

export function Search(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modifierKey, setModifierKey] = useState();
  const { nav } = props;

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useDocSearchKeyboardEvents({ isOpen, onOpen, onClose });

  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "⌘" : "Ctrl "
    );
  }, []);

  if (
    !docSearchConfig.appId &&
    !docSearchConfig.apiKey &&
    !docSearchConfig.indexName
  )
    return null;

  return (
    <>
      <button
        type="button"
        className={`
          group flex h-6 w-6 items-center justify-center 
          ${
            nav
              ? "sm:hidden justify-start min-w-full flex-none rounded-lg px-4 py-5 my-6 text-sm ring-1 ring-slate-200 dark:bg-slate-800/75 dark:ring-inset dark:ring-white/5"
              : "hidden sm:flex sm:justify-start md:h-auto md:w-auto xl:w-full max-w-[380px] shrink xl:rounded-lg xl:py-2.5 xl:pl-4 xl:pr-3.5 md:text-sm xl:ring-1 xl:ring-slate-200 xl:hover:ring-slate-300 dark:xl:bg-slate-800/75 dark:xl:ring-inset dark:xl:ring-white/5 dark:xl:hover:bg-slate-700/40 dark:xl:hover:ring-slate-500"
          }
        `}
        onClick={onOpen}>
        <SearchIcon className="h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 md:group-hover:fill-slate-400" />
        <span
          className={`
            text-slate-500 dark:text-slate-400
            ${
              nav
                ? "w-full not-sr-only text-left ml-2"
                : "hidden xl:block sr-only md:not-sr-only md:ml-2"
            }
          `}>
          Search docs
        </span>
        {modifierKey && (
          <kbd
            className={`
              ${
                nav
                  ? "hidden"
                  : "ml-auto font-medium text-slate-400 dark:text-slate-500 hidden xl:block"
              }
            `}>
            <kbd className="font-sans">{modifierKey}</kbd>
            <kbd className="font-sans">K</kbd>
          </kbd>
        )}
      </button>
      {isOpen &&
        createPortal(
          <DocSearchModal
            {...docSearchConfig}
            initialScrollY={window.scrollY}
            onClose={onClose}
            hitComponent={Hit}
            navigator={{
              navigate({ itemUrl }) {
                Router.push(itemUrl);
              },
            }}
          />,
          document.body
        )}
    </>
  );
}
