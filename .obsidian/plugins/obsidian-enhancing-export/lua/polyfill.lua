os.platform = nil
if os.platform == nil then
  local libExt = package.cpath:match("%p[\\|/]?\\.%p(%a+)")
  if libExt == 'dll' then
    os.platform = "Windows"
    require"utf8_filenames"
  elseif libExt == 'so' then
    os.platform = "Linux"
  elseif libExt == 'dylib' then
    os.platform = "MacOS"
  end
end


os.copy = function(src, dest)
  if os.platform == "Windows" then
    src = string.gsub(src, "/", "\\")
    os.execute('copy "' .. src .. '" "' .. dest .. '"')
  else
    os.execute('cp "' .. src .. '" "' .. dest .. '"')
  end
end

os.mkdir = function(dir)
  if os.exists(dir) then
    return
  end
  if os.platform == "Windows" then
    os.execute('mkdir "' .. dir .. '"')
  else
    os.execute('mkdir -p "' .. dir .. '"')
  end
end

os.exists = function(path)
  if os.platform == "Windows" then
    path = string.gsub(path, "/", "\\")
    local _, _, code = os.execute('if exist "' .. path .. '" (exit 0) else (exit 1)')
    return code == 0
  else
    local _, _, code = os.execute('test -e "' .. path .. '"')
    return code == 0
  end
end

string.starts_with = function(str, start)
   return str:sub(1, #start) == start
end

string.ends_with = function(str, ending)
   return ending == "" or str:sub(-#ending) == ending
end


return {
  os = os,
  string = string
}