


function Para(el)
  local content = {}
  local in_display_math = false
  for _, item in pairs(el.content) do
    if item.t == 'Str'and item.text == "$$" then
      in_display_math = not in_display_math
    else
      if in_display_math then
        if item.t == 'RawInline' and item.format == 'tex' then
          local n = pandoc.Math('DisplayMath', '\n' .. item.text .. '\n')
          table.insert(content, n)
        elseif (item.t ~= 'SoftBreak') then
          table.insert(content, item)
        end
      else
        table.insert(content, item)
      end
    end
  end
  el.content = content
  return el
end