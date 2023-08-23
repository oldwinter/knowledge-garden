traverse = 'topdown'

math_block_text = nil
function process(el)

   -- MathBlock start or end
   if el.t == 'Str' and el.text == '$$' then
     if math_block_text == nil then            -- start
       math_block_text = ''
     else                                      -- end
       local math_block = pandoc.Math('DisplayMath', '\n' .. math_block_text .. '\n')
       math_block_text = nil
       return math_block
     end
     return {}
   end

  if math_block_text then
    if (el.t == 'RawInline' or el.t == 'RawBlock') and el.format == 'tex' then
      math_block_text = math_block_text .. el.text
      return {}
    elseif el.t == 'Str' then
      math_block_text = math_block_text .. el.text
      return {}
    elseif el.t == 'SoftBreak' or el.t == 'BulletList' then
      return {}
    end
  end
  return el
end

function RawInline(el) 
  return process(el)
end

function RawBlock(el) 
  return process(el)
end

function Str(el)
  return process(el)
end

function SoftBreak(el)
  return process(el)
end

function Header(el)
  return process(el)
end

function Para(el)
  return process(el)
end

function Plain(el)
  return process(el)
end

function BulletList(el)
  return process(el)
end






