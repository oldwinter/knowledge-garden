os.platform = nil
if os.platform == nil then
  local libExt = package.cpath:match("%p[\\|/]?%p(%a+)")
  if libExt == 'dll' then
    os.platform = "windows"
    require"utf8_filenames"
  elseif libExt == 'so' then
    os.platform = "Linux"
  elseif libExt == 'dylib' then
    os.platform = "MacOS"
  end
end


os.copy = function(src, dest)
  if os.platform == "windows" then
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
  if os.platform == "windows" then
    os.execute('mkdir "' .. dir .. '"')
  else
    os.execute('mkdir -p "' .. dir .. '"')
  end
end


os.exists = function(path)
  if os.platform == "windows" then
    path = string.gsub(path, "/", "\\")
    local _, _, code = os.execute('if exist "' .. path .. '" (exit 0) else (exit 1)')
    return code == 0
  else
    local _, _, code = os.execute('test -e "' .. path .. '"')
    return code == 0
  end
end
