
return {
    {
        Math = function (elem)
            if elem.text:find("^%s*\\begin{") ~= nil then
                return pandoc.RawInline('tex', elem.text)
            else
                return elem
            end
        end,
    }
}
