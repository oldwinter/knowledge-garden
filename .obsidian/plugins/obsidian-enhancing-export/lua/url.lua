local function encode (str)
  str = string.gsub (str, "([^0-9a-zA-Z !'()*._~-])", -- locale independent
    function (c) return string.format ("%%%02X", string.byte(c)) end)
  str = string.gsub (str, " ", "%%20")
  return str
 end


local function decode (str)
  str = string.gsub (str, "%%20", " ")
  str = string.gsub (str, "%%(%x%x)", function(h) return string.char(tonumber(h,16)) end)
  return str
end

return {
  encode = encode,
  decode = decode
}