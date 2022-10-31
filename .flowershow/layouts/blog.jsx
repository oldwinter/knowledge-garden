/* eslint import/no-default-export: off */
export default function BlogLayout({ children, frontMatter }) {
  const { date, title, authors } = frontMatter;
  return (
    <article className="blog text-center font-serif prose prose-invert mx-auto p-6">
      <header>
        <div className="mb-6">
          {title && <h1>{title}</h1>}
          {authors && <p className="text-bold my-0">{authors}</p>}
          {date && (
            <p className="text-bold text-teal-500 my-0">
              {new Date(date).toLocaleDateString()}
            </p>
          )}
        </div>
      </header>
      <section>{children}</section>
    </article>
  );
}
