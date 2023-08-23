-- credits to tarleb — StackExchange: https://tex.stackexchange.com/questions/392070/pandoc-markdown-create-self-contained-bib-file-from-cited-references
function Pandoc(d)
  d.meta.references = pandoc.utils.references(d)
  d.meta.bibliography = nil
  return d
end
