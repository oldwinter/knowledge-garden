/* eslint import/no-default-export: off */
import { allDocuments } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

import { MdxPage } from "../components/MDX";

export default function Page({ body, ...rest }) {
  const mdxComponent = useMDXComponent(body.code);
  const frontMatter = { ...rest };
  return <MdxPage mdxComponent={mdxComponent} frontMatter={frontMatter} />;
}

export async function getStaticProps({ params }) {
  // params.slug is undefined for root index page
  const urlPath = params.slug ? params.slug.join("/") : "";
  const page = allDocuments.find((p) => p.url_path === urlPath);
  return { props: page };
}

export async function getStaticPaths() {
  const paths = allDocuments
    .filter((page) => !page?.isDraft)
    .map((page) => {
      const parts = page.url_path.split("/");
      return { params: { slug: parts } };
    });

  return {
    paths,
    fallback: false,
  };
}
