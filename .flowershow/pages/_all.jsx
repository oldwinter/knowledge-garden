/* eslint import/no-default-export: off */
import { allPages } from "contentlayer/generated";
import { NextSeo } from "next-seo";

export default function All({ pages }) {
  const labels = new Set(pages.map((p) => p.wikiPage.charAt(0)));
  return (
    <>
      <NextSeo title="All pages" />
      <div className="prose dark:prose-invert p-6 mx-auto">
        <h1>A-Z Index</h1>
        {Array.from(labels).map((pageTitle) => (
          <div key={pageTitle} className="ml-2 pt-2">
            <h3>{pageTitle}</h3>
            <hr className="m-0 w-full border-black dark:border-gray-700" />
            <ul className="list-disc flex flex-wrap">
              {pages.map(
                ({ wikiPage, wikiPath }) =>
                  pageTitle === wikiPage.charAt(0) && (
                    <li key={wikiPath} className="pr-8 w-fit">
                      <a href={wikiPath}>{wikiPage}</a>
                    </li>
                  )
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const pages = allPages
    .map((page) => {
      /* eslint no-underscore-dangle: off */
      const wikiPath = page._raw.flattenedPath;
      const wikiPage = wikiPath
        .split("/")
        .pop()
        .replace(/-/g, " ")
        .replace(
          /^(\w)(.+)/,
          (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase()
        );

      return { wikiPage, wikiPath };
    })
    .filter((page) => page.wikiPath !== "") // exclude homepage
    .sort((a, b) => a.wikiPage.localeCompare(b.wikiPage));

  return {
    props: { pages },
  };
}
