import Head from "next/head";
import Link from "next/link";

import { siteConfig } from "../config/siteConfig";
import { Nav } from "./Nav";

export function Layout({ children }) {
  const { editLink, _raw } = children.props;
  /* if editLink is not set in page frontmatter, link bool value will depend on siteConfig.editLinkShow */
  const editUrl = `${siteConfig.repoRoot}${siteConfig.repoEditPath}${_raw?.sourceFilePath}`;
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💐</text></svg>"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative min-h-screen pb-60 dark:bg-slate-900">
        <Nav />
        <main>
          {children}
          {(editLink ?? siteConfig.editLinkShow) && (
            <div className="mb-10 prose dark:prose-invert p-6 mx-auto">
              <a
                className="flex no-underline font-semibold justify-center"
                href={editUrl}
                target="_blank"
                rel="noopener noreferrer">
                Edit this page
                <span className="mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </a>
            </div>
          )}
        </main>
        <footer className="absolute bottom-0 dark:bg-slate-900 prose dark:prose-invert max-w-none flex flex-col items-center justify-center w-full h-auto pt-10 pb-20">
          <div className="flex w-full flex-wrap justify-center">
            {siteConfig.navLinks.map(
              (item) =>
                !Object.prototype.hasOwnProperty.call(item, "subItems") && (
                  <Link key={item.href} href={item.href}>
                    <a
                      key={item.name}
                      href={item.href}
                      className="inline-flex items-center mx-4 px-1 pt-1 font-regular hover:text-slate-300 no-underline"
                      aria-current={item.current ? "page" : undefined}>
                      {item.name}
                    </a>
                  </Link>
                )
            )}
          </div>
          <p className="flex items-center justify-center">
            Created by
            <a
              href={siteConfig.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center no-underline">
              {siteConfig.authorLogo && (
                <img
                  src={siteConfig.authorLogo}
                  alt={siteConfig.author}
                  className="my-0 h-6 block"
                />
              )}
              {siteConfig.author}
            </a>
          </p>
          <p className="flex items-center justify-center">
            Made with
            <a
              href="https://flowershow.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center no-underline">
              <img
                src="https://flowershow.app/assets/images/logo.svg"
                alt="Flowershow"
                className="my-0 h-6 block"
              />
              Flowershow
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
