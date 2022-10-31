/* eslint import/no-unresolved: off */
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeMathjax from "rehype-mathjax";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import callouts from "remark-callouts";
import codeExtra from "remark-code-extra";
import remarkEmbed from "remark-embed-plus";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import smartypants from "remark-smartypants";
import remarkToc from "remark-toc";
import wikiLinkPlugin from "remark-wiki-link-plus";

import { siteConfig } from "./config/siteConfig";

const sharedFields = {
  title: { type: "string" },
  description: { type: "string" },
  image: { type: "string" },
  layout: { type: "string", default: "docs" },
  editLink: { type: "boolean" },
  isDraft: { type: "boolean" },
};

const computedFields = {
  url_path: {
    type: "string",
    /* eslint no-underscore-dangle: off */
    resolve: (post) => post._raw.flattenedPath,
  },
};

const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: "**/*.md*",
  contentType: "mdx",
  fields: {
    ...sharedFields,
  },
  computedFields,
}));

const blogFields = {
  date: { type: "date" },
  layout: { type: "string", default: "blog" },
  authors: {
    type: "list",
    of: { type: "string" },
  },
};

const Blog = defineDocumentType(() => ({
  name: "Blog",
  contentType: "mdx",
  fields: {
    ...sharedFields,
    ...blogFields,
  },
  computedFields,
}));

const contentLayerExcludeDefaults = [
  "node_modules",
  ".git",
  ".yarn",
  ".cache",
  ".next",
  ".contentlayer",
  "package.json",
  "tsconfig.json",
];

/* eslint import/no-default-export: off */
export default makeSource({
  contentDirPath: siteConfig.content,
  contentDirExclude: contentLayerExcludeDefaults.concat([
    ".flowershow",
    ".obsidian",
    ...siteConfig.contentExclude,
  ]),
  contentDirInclude: siteConfig.contentInclude,
  documentTypes: [Blog, Page],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkEmbed,
      remarkGfm,
      [smartypants, { quotes: false, dashes: "oldschool" }],
      remarkMath,
      callouts,
      [wikiLinkPlugin, { markdownFolder: siteConfig.content }],
      /** Using the code extra plugin from https://github.com/s0/remark-code-extra
       *  to create new mermaid pre tags to use with mdx-mermaid.
       *  rehypePrismPlus plugin modifies the pre tags and due to this mdx-mermaid
       *  component cannot receive the values in the required format.
       *  Refer issue https://github.com/flowershow/flowershow/issues/12 for more info.
       */
      [
        codeExtra,
        {
          transform: (node) => {
            if (node.type === "code" && node.lang === "mermaid") {
              // reset values else rehype-prism-plus throws error
              // node.type = "";
              // node.lang = "";
              return {
                // create new pre tag element here for mermaid
                after: [
                  {
                    type: "element",
                    tagName: "pre",
                    properties: {
                      className: "code-mermaid",
                    },
                    children: [
                      {
                        type: "text",
                        value: node.value,
                      },
                    ],
                  },
                ],
                // remove the pre tag element created by rehype-prism-plus
                // otherwise both will be displayed
                transform: (n) => {
                  const preElem = n.data.hChildren.find(
                    (el) => el.tagName === "pre"
                  );
                  const index = n.data.hChildren.indexOf(preElem);
                  n.data.hChildren.splice(index, 1);
                },
              };
            }
            return null;
          },
        },
      ],
      [
        remarkToc,
        {
          heading: "Table of contents",
          // maxDepth: "3",
          tight: true,
        },
      ],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          test(element) {
            return (
              ["h2", "h3", "h4", "h5", "h6"].includes(element.tagName) &&
              element.properties?.id !== "table-of-contents" &&
              element.properties?.className !== "blockquote-heading"
            );
          },
          content() {
            return [
              h(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "#ab2b65",
                  viewBox: "0 0 20 20",
                  className: "w-5 h-5",
                },
                [
                  h("path", {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M9.493 2.853a.75.75 0 00-1.486-.205L7.545 6H4.198a.75.75 0 000 1.5h3.14l-.69 5H3.302a.75.75 0 000 1.5h3.14l-.435 3.148a.75.75 0 001.486.205L7.955 14h2.986l-.434 3.148a.75.75 0 001.486.205L12.456 14h3.346a.75.75 0 000-1.5h-3.14l.69-5h3.346a.75.75 0 000-1.5h-3.14l.435-3.147a.75.75 0 00-1.486-.205L12.045 6H9.059l.434-3.147zM8.852 7.5l-.69 5h2.986l.69-5H8.852z",
                  }),
                ]
              ),
            ];
          },
        },
      ],
      rehypeMathjax,
      [rehypePrismPlus, { ignoreMissing: true }],
    ],
  },
});
