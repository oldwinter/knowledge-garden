/* eslint import/no-default-export: off */
export default function DocsLayout({ children, frontMatter }) {
  const { title } = frontMatter;
  return (
    <article className="docs prose dark:prose-invert prose-a:break-words mx-auto p-6">
      <header>
        <div className="mb-6">{title && <h1>{title}</h1>}</div>
      </header>
      <section>{children}</section>
    </article>
  );
}
