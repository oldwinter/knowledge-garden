package.path=package.path..";" ..debug.getinfo(1).source:match("(.*[/\\])"):sub(2) .. "?.lua"

Mode='hugo'

require('markdown')