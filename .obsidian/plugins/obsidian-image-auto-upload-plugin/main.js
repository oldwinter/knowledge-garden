'use strict';

var obsidian = require('obsidian');
var path = require('path');
var fs = require('fs');
var process$1 = require('node:process');
var childProcess = require('child_process');
var _os = require('os');
var require$$0 = require('assert');
var require$$2 = require('events');
var require$$0$2 = require('buffer');
var require$$0$1 = require('stream');
var require$$1 = require('util');
var node_os = require('node:os');
require('electron');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var process__default = /*#__PURE__*/_interopDefaultLegacy(process$1);
var childProcess__default = /*#__PURE__*/_interopDefaultLegacy(childProcess);
var _os__default = /*#__PURE__*/_interopDefaultLegacy(_os);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var windows = isexe$2;
isexe$2.sync = sync$4;



function checkPathExt (path, options) {
  var pathext = options.pathExt !== undefined ?
    options.pathExt : process.env.PATHEXT;

  if (!pathext) {
    return true
  }

  pathext = pathext.split(';');
  if (pathext.indexOf('') !== -1) {
    return true
  }
  for (var i = 0; i < pathext.length; i++) {
    var p = pathext[i].toLowerCase();
    if (p && path.substr(-p.length).toLowerCase() === p) {
      return true
    }
  }
  return false
}

function checkStat$1 (stat, path, options) {
  if (!stat.isSymbolicLink() && !stat.isFile()) {
    return false
  }
  return checkPathExt(path, options)
}

function isexe$2 (path, options, cb) {
  fs__default['default'].stat(path, function (er, stat) {
    cb(er, er ? false : checkStat$1(stat, path, options));
  });
}

function sync$4 (path, options) {
  return checkStat$1(fs__default['default'].statSync(path), path, options)
}

var mode = isexe$1;
isexe$1.sync = sync$3;



function isexe$1 (path, options, cb) {
  fs__default['default'].stat(path, function (er, stat) {
    cb(er, er ? false : checkStat(stat, options));
  });
}

function sync$3 (path, options) {
  return checkStat(fs__default['default'].statSync(path), options)
}

function checkStat (stat, options) {
  return stat.isFile() && checkMode(stat, options)
}

function checkMode (stat, options) {
  var mod = stat.mode;
  var uid = stat.uid;
  var gid = stat.gid;

  var myUid = options.uid !== undefined ?
    options.uid : process.getuid && process.getuid();
  var myGid = options.gid !== undefined ?
    options.gid : process.getgid && process.getgid();

  var u = parseInt('100', 8);
  var g = parseInt('010', 8);
  var o = parseInt('001', 8);
  var ug = u | g;

  var ret = (mod & o) ||
    (mod & g) && gid === myGid ||
    (mod & u) && uid === myUid ||
    (mod & ug) && myUid === 0;

  return ret
}

var core$1;
if (process.platform === 'win32' || commonjsGlobal.TESTING_WINDOWS) {
  core$1 = windows;
} else {
  core$1 = mode;
}

var isexe_1 = isexe;
isexe.sync = sync$2;

function isexe (path, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (!cb) {
    if (typeof Promise !== 'function') {
      throw new TypeError('callback not provided')
    }

    return new Promise(function (resolve, reject) {
      isexe(path, options || {}, function (er, is) {
        if (er) {
          reject(er);
        } else {
          resolve(is);
        }
      });
    })
  }

  core$1(path, options || {}, function (er, is) {
    // ignore EACCES because that just means we aren't allowed to run it
    if (er) {
      if (er.code === 'EACCES' || options && options.ignoreErrors) {
        er = null;
        is = false;
      }
    }
    cb(er, is);
  });
}

function sync$2 (path, options) {
  // my kingdom for a filtered catch
  try {
    return core$1.sync(path, options || {})
  } catch (er) {
    if (options && options.ignoreErrors || er.code === 'EACCES') {
      return false
    } else {
      throw er
    }
  }
}

const isWindows = process.platform === 'win32' ||
    process.env.OSTYPE === 'cygwin' ||
    process.env.OSTYPE === 'msys';


const COLON = isWindows ? ';' : ':';


const getNotFoundError = (cmd) =>
  Object.assign(new Error(`not found: ${cmd}`), { code: 'ENOENT' });

const getPathInfo = (cmd, opt) => {
  const colon = opt.colon || COLON;

  // If it has a slash, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.
  const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? ['']
    : (
      [
        // windows always checks the cwd first
        ...(isWindows ? [process.cwd()] : []),
        ...(opt.path || process.env.PATH ||
          /* istanbul ignore next: very unusual */ '').split(colon),
      ]
    );
  const pathExtExe = isWindows
    ? opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
    : '';
  const pathExt = isWindows ? pathExtExe.split(colon) : [''];

  if (isWindows) {
    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '')
      pathExt.unshift('');
  }

  return {
    pathEnv,
    pathExt,
    pathExtExe,
  }
};

const which = (cmd, opt, cb) => {
  if (typeof opt === 'function') {
    cb = opt;
    opt = {};
  }
  if (!opt)
    opt = {};

  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];

  const step = i => new Promise((resolve, reject) => {
    if (i === pathEnv.length)
      return opt.all && found.length ? resolve(found)
        : reject(getNotFoundError(cmd))

    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;

    const pCmd = path__default['default'].join(pathPart, cmd);
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd
      : pCmd;

    resolve(subStep(p, i, 0));
  });

  const subStep = (p, i, ii) => new Promise((resolve, reject) => {
    if (ii === pathExt.length)
      return resolve(step(i + 1))
    const ext = pathExt[ii];
    isexe_1(p + ext, { pathExt: pathExtExe }, (er, is) => {
      if (!er && is) {
        if (opt.all)
          found.push(p + ext);
        else
          return resolve(p + ext)
      }
      return resolve(subStep(p, i, ii + 1))
    });
  });

  return cb ? step(0).then(res => cb(null, res), cb) : step(0)
};

const whichSync = (cmd, opt) => {
  opt = opt || {};

  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];

  for (let i = 0; i < pathEnv.length; i ++) {
    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;

    const pCmd = path__default['default'].join(pathPart, cmd);
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd
      : pCmd;

    for (let j = 0; j < pathExt.length; j ++) {
      const cur = p + pathExt[j];
      try {
        const is = isexe_1.sync(cur, { pathExt: pathExtExe });
        if (is) {
          if (opt.all)
            found.push(cur);
          else
            return cur
        }
      } catch (ex) {}
    }
  }

  if (opt.all && found.length)
    return found

  if (opt.nothrow)
    return null

  throw getNotFoundError(cmd)
};

var which_1 = which;
which.sync = whichSync;

const pathKey = (options = {}) => {
	const environment = options.env || process.env;
	const platform = options.platform || process.platform;

	if (platform !== 'win32') {
		return 'PATH';
	}

	return Object.keys(environment).reverse().find(key => key.toUpperCase() === 'PATH') || 'Path';
};

var pathKey_1 = pathKey;
// TODO: Remove this for the next major release
var _default$2 = pathKey;
pathKey_1.default = _default$2;

function resolveCommandAttempt(parsed, withoutPathExt) {
    const env = parsed.options.env || process.env;
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;
    // Worker threads do not have process.chdir()
    const shouldSwitchCwd = hasCustomCwd && process.chdir !== undefined && !process.chdir.disabled;

    // If a custom `cwd` was specified, we need to change the process cwd
    // because `which` will do stat calls but does not support a custom cwd
    if (shouldSwitchCwd) {
        try {
            process.chdir(parsed.options.cwd);
        } catch (err) {
            /* Empty */
        }
    }

    let resolved;

    try {
        resolved = which_1.sync(parsed.command, {
            path: env[pathKey_1({ env })],
            pathExt: withoutPathExt ? path__default['default'].delimiter : undefined,
        });
    } catch (e) {
        /* Empty */
    } finally {
        if (shouldSwitchCwd) {
            process.chdir(cwd);
        }
    }

    // If we successfully resolved, ensure that an absolute path is returned
    // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
    if (resolved) {
        resolved = path__default['default'].resolve(hasCustomCwd ? parsed.options.cwd : '', resolved);
    }

    return resolved;
}

function resolveCommand(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}

var resolveCommand_1 = resolveCommand;

// See http://www.robvanderwoude.com/escapechars.php
const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;

function escapeCommand(arg) {
    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');

    return arg;
}

function escapeArgument(arg, doubleEscapeMetaChars) {
    // Convert to string
    arg = `${arg}`;

    // Algorithm below is based on https://qntm.org/cmd

    // Sequence of backslashes followed by a double quote:
    // double up all the backslashes and escape the double quote
    arg = arg.replace(/(\\*)"/g, '$1$1\\"');

    // Sequence of backslashes followed by the end of the string
    // (which will become a double quote later):
    // double up all the backslashes
    arg = arg.replace(/(\\*)$/, '$1$1');

    // All other backslashes occur literally

    // Quote the whole thing:
    arg = `"${arg}"`;

    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');

    // Double escape meta chars if necessary
    if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, '^$1');
    }

    return arg;
}

var command$2 = escapeCommand;
var argument = escapeArgument;

var _escape = {
	command: command$2,
	argument: argument
};

var shebangRegex = /^#!(.*)/;

var shebangCommand = (string = '') => {
	const match = string.match(shebangRegex);

	if (!match) {
		return null;
	}

	const [path, argument] = match[0].replace(/#! ?/, '').split(' ');
	const binary = path.split('/').pop();

	if (binary === 'env') {
		return argument;
	}

	return argument ? `${binary} ${argument}` : binary;
};

function readShebang(command) {
    // Read the first 150 bytes from the file
    const size = 150;
    const buffer = Buffer.alloc(size);

    let fd;

    try {
        fd = fs__default['default'].openSync(command, 'r');
        fs__default['default'].readSync(fd, buffer, 0, size, 0);
        fs__default['default'].closeSync(fd);
    } catch (e) { /* Empty */ }

    // Attempt to extract shebang (null is returned if not a shebang)
    return shebangCommand(buffer.toString());
}

var readShebang_1 = readShebang;

const isWin$1 = process.platform === 'win32';
const isExecutableRegExp = /\.(?:com|exe)$/i;
const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;

function detectShebang(parsed) {
    parsed.file = resolveCommand_1(parsed);

    const shebang = parsed.file && readShebang_1(parsed.file);

    if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;

        return resolveCommand_1(parsed);
    }

    return parsed.file;
}

function parseNonShell(parsed) {
    if (!isWin$1) {
        return parsed;
    }

    // Detect & add support for shebangs
    const commandFile = detectShebang(parsed);

    // We don't need a shell if the command filename is an executable
    const needsShell = !isExecutableRegExp.test(commandFile);

    // If a shell is required, use cmd.exe and take care of escaping everything correctly
    // Note that `forceShell` is an hidden option used only in tests
    if (parsed.options.forceShell || needsShell) {
        // Need to double escape meta chars if the command is a cmd-shim located in `node_modules/.bin/`
        // The cmd-shim simply calls execute the package bin file with NodeJS, proxying any argument
        // Because the escape of metachars with ^ gets interpreted when the cmd.exe is first called,
        // we need to double escape them
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);

        // Normalize posix paths into OS compatible paths (e.g.: foo/bar -> foo\bar)
        // This is necessary otherwise it will always fail with ENOENT in those cases
        parsed.command = path__default['default'].normalize(parsed.command);

        // Escape command & arguments
        parsed.command = _escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => _escape.argument(arg, needsDoubleEscapeMetaChars));

        const shellCommand = [parsed.command].concat(parsed.args).join(' ');

        parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`];
        parsed.command = process.env.comspec || 'cmd.exe';
        parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
    }

    return parsed;
}

function parse(command, args, options) {
    // Normalize arguments, similar to nodejs
    if (args && !Array.isArray(args)) {
        options = args;
        args = null;
    }

    args = args ? args.slice(0) : []; // Clone array to avoid changing the original
    options = Object.assign({}, options); // Clone object to avoid changing the original

    // Build our parsed object
    const parsed = {
        command,
        args,
        options,
        file: undefined,
        original: {
            command,
            args,
        },
    };

    // Delegate further parsing to shell or non-shell
    return options.shell ? parsed : parseNonShell(parsed);
}

var parse_1 = parse;

const isWin = process.platform === 'win32';

function notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: 'ENOENT',
        errno: 'ENOENT',
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args,
    });
}

function hookChildProcess(cp, parsed) {
    if (!isWin) {
        return;
    }

    const originalEmit = cp.emit;

    cp.emit = function (name, arg1) {
        // If emitting "exit" event and exit code is 1, we need to check if
        // the command exists and emit an "error" instead
        // See https://github.com/IndigoUnited/node-cross-spawn/issues/16
        if (name === 'exit') {
            const err = verifyENOENT(arg1, parsed);

            if (err) {
                return originalEmit.call(cp, 'error', err);
            }
        }

        return originalEmit.apply(cp, arguments); // eslint-disable-line prefer-rest-params
    };
}

function verifyENOENT(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawn');
    }

    return null;
}

function verifyENOENTSync(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawnSync');
    }

    return null;
}

var enoent = {
    hookChildProcess,
    verifyENOENT,
    verifyENOENTSync,
    notFoundError,
};

function spawn(command, args, options) {
    // Parse the arguments
    const parsed = parse_1(command, args, options);

    // Spawn the child process
    const spawned = childProcess__default['default'].spawn(parsed.command, parsed.args, parsed.options);

    // Hook into child process "exit" event to emit an error if the command
    // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    enoent.hookChildProcess(spawned, parsed);

    return spawned;
}

function spawnSync(command, args, options) {
    // Parse the arguments
    const parsed = parse_1(command, args, options);

    // Spawn the child process
    const result = childProcess__default['default'].spawnSync(parsed.command, parsed.args, parsed.options);

    // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);

    return result;
}

var crossSpawn = spawn;
var spawn_1 = spawn;
var sync$1 = spawnSync;

var _parse = parse_1;
var _enoent = enoent;
crossSpawn.spawn = spawn_1;
crossSpawn.sync = sync$1;
crossSpawn._parse = _parse;
crossSpawn._enoent = _enoent;

var stripFinalNewline = input => {
	const LF = typeof input === 'string' ? '\n' : '\n'.charCodeAt();
	const CR = typeof input === 'string' ? '\r' : '\r'.charCodeAt();

	if (input[input.length - 1] === LF) {
		input = input.slice(0, input.length - 1);
	}

	if (input[input.length - 1] === CR) {
		input = input.slice(0, input.length - 1);
	}

	return input;
};

var npmRunPath_1 = createCommonjsModule(function (module) {



const npmRunPath = options => {
	options = {
		cwd: process.cwd(),
		path: process.env[pathKey_1()],
		execPath: process.execPath,
		...options
	};

	let previous;
	let cwdPath = path__default['default'].resolve(options.cwd);
	const result = [];

	while (previous !== cwdPath) {
		result.push(path__default['default'].join(cwdPath, 'node_modules/.bin'));
		previous = cwdPath;
		cwdPath = path__default['default'].resolve(cwdPath, '..');
	}

	// Ensure the running `node` binary is used
	const execPathDir = path__default['default'].resolve(options.cwd, options.execPath, '..');
	result.push(execPathDir);

	return result.concat(options.path).join(path__default['default'].delimiter);
};

module.exports = npmRunPath;
// TODO: Remove this for the next major release
module.exports.default = npmRunPath;

module.exports.env = options => {
	options = {
		env: process.env,
		...options
	};

	const env = {...options.env};
	const path = pathKey_1({env});

	options.path = env[path];
	env[path] = module.exports(options);

	return env;
};
});

const mimicFn = (to, from) => {
	for (const prop of Reflect.ownKeys(from)) {
		Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
	}

	return to;
};

var mimicFn_1 = mimicFn;
// TODO: Remove this for the next major release
var _default$1 = mimicFn;
mimicFn_1.default = _default$1;

const calledFunctions = new WeakMap();

const onetime = (function_, options = {}) => {
	if (typeof function_ !== 'function') {
		throw new TypeError('Expected a function');
	}

	let returnValue;
	let callCount = 0;
	const functionName = function_.displayName || function_.name || '<anonymous>';

	const onetime = function (...arguments_) {
		calledFunctions.set(onetime, ++callCount);

		if (callCount === 1) {
			returnValue = function_.apply(this, arguments_);
			function_ = null;
		} else if (options.throw === true) {
			throw new Error(`Function \`${functionName}\` can only be called once`);
		}

		return returnValue;
	};

	mimicFn_1(onetime, function_);
	calledFunctions.set(onetime, callCount);

	return onetime;
};

var onetime_1 = onetime;
// TODO: Remove this for the next major release
var _default = onetime;

var callCount = function_ => {
	if (!calledFunctions.has(function_)) {
		throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
	}

	return calledFunctions.get(function_);
};
onetime_1.default = _default;
onetime_1.callCount = callCount;

var core = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.SIGNALS=void 0;

const SIGNALS=[
{
name:"SIGHUP",
number:1,
action:"terminate",
description:"Terminal closed",
standard:"posix"},

{
name:"SIGINT",
number:2,
action:"terminate",
description:"User interruption with CTRL-C",
standard:"ansi"},

{
name:"SIGQUIT",
number:3,
action:"core",
description:"User interruption with CTRL-\\",
standard:"posix"},

{
name:"SIGILL",
number:4,
action:"core",
description:"Invalid machine instruction",
standard:"ansi"},

{
name:"SIGTRAP",
number:5,
action:"core",
description:"Debugger breakpoint",
standard:"posix"},

{
name:"SIGABRT",
number:6,
action:"core",
description:"Aborted",
standard:"ansi"},

{
name:"SIGIOT",
number:6,
action:"core",
description:"Aborted",
standard:"bsd"},

{
name:"SIGBUS",
number:7,
action:"core",
description:
"Bus error due to misaligned, non-existing address or paging error",
standard:"bsd"},

{
name:"SIGEMT",
number:7,
action:"terminate",
description:"Command should be emulated but is not implemented",
standard:"other"},

{
name:"SIGFPE",
number:8,
action:"core",
description:"Floating point arithmetic error",
standard:"ansi"},

{
name:"SIGKILL",
number:9,
action:"terminate",
description:"Forced termination",
standard:"posix",
forced:true},

{
name:"SIGUSR1",
number:10,
action:"terminate",
description:"Application-specific signal",
standard:"posix"},

{
name:"SIGSEGV",
number:11,
action:"core",
description:"Segmentation fault",
standard:"ansi"},

{
name:"SIGUSR2",
number:12,
action:"terminate",
description:"Application-specific signal",
standard:"posix"},

{
name:"SIGPIPE",
number:13,
action:"terminate",
description:"Broken pipe or socket",
standard:"posix"},

{
name:"SIGALRM",
number:14,
action:"terminate",
description:"Timeout or timer",
standard:"posix"},

{
name:"SIGTERM",
number:15,
action:"terminate",
description:"Termination",
standard:"ansi"},

{
name:"SIGSTKFLT",
number:16,
action:"terminate",
description:"Stack is empty or overflowed",
standard:"other"},

{
name:"SIGCHLD",
number:17,
action:"ignore",
description:"Child process terminated, paused or unpaused",
standard:"posix"},

{
name:"SIGCLD",
number:17,
action:"ignore",
description:"Child process terminated, paused or unpaused",
standard:"other"},

{
name:"SIGCONT",
number:18,
action:"unpause",
description:"Unpaused",
standard:"posix",
forced:true},

{
name:"SIGSTOP",
number:19,
action:"pause",
description:"Paused",
standard:"posix",
forced:true},

{
name:"SIGTSTP",
number:20,
action:"pause",
description:"Paused using CTRL-Z or \"suspend\"",
standard:"posix"},

{
name:"SIGTTIN",
number:21,
action:"pause",
description:"Background process cannot read terminal input",
standard:"posix"},

{
name:"SIGBREAK",
number:21,
action:"terminate",
description:"User interruption with CTRL-BREAK",
standard:"other"},

{
name:"SIGTTOU",
number:22,
action:"pause",
description:"Background process cannot write to terminal output",
standard:"posix"},

{
name:"SIGURG",
number:23,
action:"ignore",
description:"Socket received out-of-band data",
standard:"bsd"},

{
name:"SIGXCPU",
number:24,
action:"core",
description:"Process timed out",
standard:"bsd"},

{
name:"SIGXFSZ",
number:25,
action:"core",
description:"File too big",
standard:"bsd"},

{
name:"SIGVTALRM",
number:26,
action:"terminate",
description:"Timeout or timer",
standard:"bsd"},

{
name:"SIGPROF",
number:27,
action:"terminate",
description:"Timeout or timer",
standard:"bsd"},

{
name:"SIGWINCH",
number:28,
action:"ignore",
description:"Terminal window size changed",
standard:"bsd"},

{
name:"SIGIO",
number:29,
action:"terminate",
description:"I/O is available",
standard:"other"},

{
name:"SIGPOLL",
number:29,
action:"terminate",
description:"Watched event",
standard:"other"},

{
name:"SIGINFO",
number:29,
action:"ignore",
description:"Request for process information",
standard:"other"},

{
name:"SIGPWR",
number:30,
action:"terminate",
description:"Device running out of power",
standard:"systemv"},

{
name:"SIGSYS",
number:31,
action:"core",
description:"Invalid system call",
standard:"other"},

{
name:"SIGUNUSED",
number:31,
action:"terminate",
description:"Invalid system call",
standard:"other"}];exports.SIGNALS=SIGNALS;
//# sourceMappingURL=core.js.map
});

var realtime = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.SIGRTMAX=exports.getRealtimeSignals=void 0;
const getRealtimeSignals=function(){
const length=SIGRTMAX-SIGRTMIN+1;
return Array.from({length},getRealtimeSignal);
};exports.getRealtimeSignals=getRealtimeSignals;

const getRealtimeSignal=function(value,index){
return {
name:`SIGRT${index+1}`,
number:SIGRTMIN+index,
action:"terminate",
description:"Application-specific signal (realtime)",
standard:"posix"};

};

const SIGRTMIN=34;
const SIGRTMAX=64;exports.SIGRTMAX=SIGRTMAX;
//# sourceMappingURL=realtime.js.map
});

var signals$1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.getSignals=void 0;






const getSignals=function(){
const realtimeSignals=(0, realtime.getRealtimeSignals)();
const signals=[...core.SIGNALS,...realtimeSignals].map(normalizeSignal);
return signals;
};exports.getSignals=getSignals;







const normalizeSignal=function({
name,
number:defaultNumber,
description,
action,
forced=false,
standard})
{
const{
signals:{[name]:constantSignal}}=
_os__default['default'].constants;
const supported=constantSignal!==undefined;
const number=supported?constantSignal:defaultNumber;
return {name,number,description,supported,action,forced,standard};
};
//# sourceMappingURL=signals.js.map
});

var main = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports,"__esModule",{value:true});exports.signalsByNumber=exports.signalsByName=void 0;






const getSignalsByName=function(){
const signals=(0, signals$1.getSignals)();
return signals.reduce(getSignalByName,{});
};

const getSignalByName=function(
signalByNameMemo,
{name,number,description,supported,action,forced,standard})
{
return {
...signalByNameMemo,
[name]:{name,number,description,supported,action,forced,standard}};

};

const signalsByName=getSignalsByName();exports.signalsByName=signalsByName;




const getSignalsByNumber=function(){
const signals=(0, signals$1.getSignals)();
const length=realtime.SIGRTMAX+1;
const signalsA=Array.from({length},(value,number)=>
getSignalByNumber(number,signals));

return Object.assign({},...signalsA);
};

const getSignalByNumber=function(number,signals){
const signal=findSignalByNumber(number,signals);

if(signal===undefined){
return {};
}

const{name,description,supported,action,forced,standard}=signal;
return {
[number]:{
name,
number,
description,
supported,
action,
forced,
standard}};


};



const findSignalByNumber=function(number,signals){
const signal=signals.find(({name})=>_os__default['default'].constants.signals[name]===number);

if(signal!==undefined){
return signal;
}

return signals.find(signalA=>signalA.number===number);
};

const signalsByNumber=getSignalsByNumber();exports.signalsByNumber=signalsByNumber;
//# sourceMappingURL=main.js.map
});

const {signalsByName} = main;

const getErrorPrefix = ({timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled}) => {
	if (timedOut) {
		return `timed out after ${timeout} milliseconds`;
	}

	if (isCanceled) {
		return 'was canceled';
	}

	if (errorCode !== undefined) {
		return `failed with ${errorCode}`;
	}

	if (signal !== undefined) {
		return `was killed with ${signal} (${signalDescription})`;
	}

	if (exitCode !== undefined) {
		return `failed with exit code ${exitCode}`;
	}

	return 'failed';
};

const makeError = ({
	stdout,
	stderr,
	all,
	error,
	signal,
	exitCode,
	command,
	escapedCommand,
	timedOut,
	isCanceled,
	killed,
	parsed: {options: {timeout}}
}) => {
	// `signal` and `exitCode` emitted on `spawned.on('exit')` event can be `null`.
	// We normalize them to `undefined`
	exitCode = exitCode === null ? undefined : exitCode;
	signal = signal === null ? undefined : signal;
	const signalDescription = signal === undefined ? undefined : signalsByName[signal].description;

	const errorCode = error && error.code;

	const prefix = getErrorPrefix({timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled});
	const execaMessage = `Command ${prefix}: ${command}`;
	const isError = Object.prototype.toString.call(error) === '[object Error]';
	const shortMessage = isError ? `${execaMessage}\n${error.message}` : execaMessage;
	const message = [shortMessage, stderr, stdout].filter(Boolean).join('\n');

	if (isError) {
		error.originalMessage = error.message;
		error.message = message;
	} else {
		error = new Error(message);
	}

	error.shortMessage = shortMessage;
	error.command = command;
	error.escapedCommand = escapedCommand;
	error.exitCode = exitCode;
	error.signal = signal;
	error.signalDescription = signalDescription;
	error.stdout = stdout;
	error.stderr = stderr;

	if (all !== undefined) {
		error.all = all;
	}

	if ('bufferedData' in error) {
		delete error.bufferedData;
	}

	error.failed = true;
	error.timedOut = Boolean(timedOut);
	error.isCanceled = isCanceled;
	error.killed = killed && !timedOut;

	return error;
};

var error = makeError;

const aliases = ['stdin', 'stdout', 'stderr'];

const hasAlias = options => aliases.some(alias => options[alias] !== undefined);

const normalizeStdio = options => {
	if (!options) {
		return;
	}

	const {stdio} = options;

	if (stdio === undefined) {
		return aliases.map(alias => options[alias]);
	}

	if (hasAlias(options)) {
		throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map(alias => `\`${alias}\``).join(', ')}`);
	}

	if (typeof stdio === 'string') {
		return stdio;
	}

	if (!Array.isArray(stdio)) {
		throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
	}

	const length = Math.max(stdio.length, aliases.length);
	return Array.from({length}, (value, index) => stdio[index]);
};

var stdio = normalizeStdio;

// `ipc` is pushed unless it is already present
var node$1 = options => {
	const stdio = normalizeStdio(options);

	if (stdio === 'ipc') {
		return 'ipc';
	}

	if (stdio === undefined || typeof stdio === 'string') {
		return [stdio, stdio, stdio, 'ipc'];
	}

	if (stdio.includes('ipc')) {
		return stdio;
	}

	return [...stdio, 'ipc'];
};
stdio.node = node$1;

var signals = createCommonjsModule(function (module) {
// This is not the set of all possible signals.
//
// It IS, however, the set of all signals that trigger
// an exit on either Linux or BSD systems.  Linux is a
// superset of the signal names supported on BSD, and
// the unknown signals just fail to register, so we can
// catch that easily enough.
//
// Don't bother with SIGKILL.  It's uncatchable, which
// means that we can't fire any callbacks anyway.
//
// If a user does happen to register a handler on a non-
// fatal signal like SIGWINCH or something, and then
// exit, it'll end up firing `process.emit('exit')`, so
// the handler will be fired anyway.
//
// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
// artificially, inherently leave the process in a
// state from which it is not safe to try and enter JS
// listeners.
module.exports = [
  'SIGABRT',
  'SIGALRM',
  'SIGHUP',
  'SIGINT',
  'SIGTERM'
];

if (process.platform !== 'win32') {
  module.exports.push(
    'SIGVTALRM',
    'SIGXCPU',
    'SIGXFSZ',
    'SIGUSR2',
    'SIGTRAP',
    'SIGSYS',
    'SIGQUIT',
    'SIGIOT'
    // should detect profiler and enable/disable accordingly.
    // see #21
    // 'SIGPROF'
  );
}

if (process.platform === 'linux') {
  module.exports.push(
    'SIGIO',
    'SIGPOLL',
    'SIGPWR',
    'SIGSTKFLT',
    'SIGUNUSED'
  );
}
});

var signalExit = createCommonjsModule(function (module) {
// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.
// grab a reference to node's real process object right away
var process = commonjsGlobal.process;

const processOk = function (process) {
  return process &&
    typeof process === 'object' &&
    typeof process.removeListener === 'function' &&
    typeof process.emit === 'function' &&
    typeof process.reallyExit === 'function' &&
    typeof process.listeners === 'function' &&
    typeof process.kill === 'function' &&
    typeof process.pid === 'number' &&
    typeof process.on === 'function'
};

// some kind of non-node environment, just no-op
/* istanbul ignore if */
if (!processOk(process)) {
  module.exports = function () {
    return function () {}
  };
} else {
  var assert = require$$0__default['default'];
  var signals$1 = signals;
  var isWin = /^win/i.test(process.platform);

  var EE = require$$2__default['default'];
  /* istanbul ignore if */
  if (typeof EE !== 'function') {
    EE = EE.EventEmitter;
  }

  var emitter;
  if (process.__signal_exit_emitter__) {
    emitter = process.__signal_exit_emitter__;
  } else {
    emitter = process.__signal_exit_emitter__ = new EE();
    emitter.count = 0;
    emitter.emitted = {};
  }

  // Because this emitter is a global, we have to check to see if a
  // previous version of this library failed to enable infinite listeners.
  // I know what you're about to say.  But literally everything about
  // signal-exit is a compromise with evil.  Get used to it.
  if (!emitter.infinite) {
    emitter.setMaxListeners(Infinity);
    emitter.infinite = true;
  }

  module.exports = function (cb, opts) {
    /* istanbul ignore if */
    if (!processOk(commonjsGlobal.process)) {
      return function () {}
    }
    assert.equal(typeof cb, 'function', 'a callback must be provided for exit handler');

    if (loaded === false) {
      load();
    }

    var ev = 'exit';
    if (opts && opts.alwaysLast) {
      ev = 'afterexit';
    }

    var remove = function () {
      emitter.removeListener(ev, cb);
      if (emitter.listeners('exit').length === 0 &&
          emitter.listeners('afterexit').length === 0) {
        unload();
      }
    };
    emitter.on(ev, cb);

    return remove
  };

  var unload = function unload () {
    if (!loaded || !processOk(commonjsGlobal.process)) {
      return
    }
    loaded = false;

    signals$1.forEach(function (sig) {
      try {
        process.removeListener(sig, sigListeners[sig]);
      } catch (er) {}
    });
    process.emit = originalProcessEmit;
    process.reallyExit = originalProcessReallyExit;
    emitter.count -= 1;
  };
  module.exports.unload = unload;

  var emit = function emit (event, code, signal) {
    /* istanbul ignore if */
    if (emitter.emitted[event]) {
      return
    }
    emitter.emitted[event] = true;
    emitter.emit(event, code, signal);
  };

  // { <signal>: <listener fn>, ... }
  var sigListeners = {};
  signals$1.forEach(function (sig) {
    sigListeners[sig] = function listener () {
      /* istanbul ignore if */
      if (!processOk(commonjsGlobal.process)) {
        return
      }
      // If there are no other listeners, an exit is coming!
      // Simplest way: remove us and then re-send the signal.
      // We know that this will kill the process, so we can
      // safely emit now.
      var listeners = process.listeners(sig);
      if (listeners.length === emitter.count) {
        unload();
        emit('exit', null, sig);
        /* istanbul ignore next */
        emit('afterexit', null, sig);
        /* istanbul ignore next */
        if (isWin && sig === 'SIGHUP') {
          // "SIGHUP" throws an `ENOSYS` error on Windows,
          // so use a supported signal instead
          sig = 'SIGINT';
        }
        /* istanbul ignore next */
        process.kill(process.pid, sig);
      }
    };
  });

  module.exports.signals = function () {
    return signals$1
  };

  var loaded = false;

  var load = function load () {
    if (loaded || !processOk(commonjsGlobal.process)) {
      return
    }
    loaded = true;

    // This is the number of onSignalExit's that are in play.
    // It's important so that we can count the correct number of
    // listeners on signals, and don't wait for the other one to
    // handle it instead of us.
    emitter.count += 1;

    signals$1 = signals$1.filter(function (sig) {
      try {
        process.on(sig, sigListeners[sig]);
        return true
      } catch (er) {
        return false
      }
    });

    process.emit = processEmit;
    process.reallyExit = processReallyExit;
  };
  module.exports.load = load;

  var originalProcessReallyExit = process.reallyExit;
  var processReallyExit = function processReallyExit (code) {
    /* istanbul ignore if */
    if (!processOk(commonjsGlobal.process)) {
      return
    }
    process.exitCode = code || /* istanbul ignore next */ 0;
    emit('exit', process.exitCode, null);
    /* istanbul ignore next */
    emit('afterexit', process.exitCode, null);
    /* istanbul ignore next */
    originalProcessReallyExit.call(process, process.exitCode);
  };

  var originalProcessEmit = process.emit;
  var processEmit = function processEmit (ev, arg) {
    if (ev === 'exit' && processOk(commonjsGlobal.process)) {
      /* istanbul ignore else */
      if (arg !== undefined) {
        process.exitCode = arg;
      }
      var ret = originalProcessEmit.apply(this, arguments);
      /* istanbul ignore next */
      emit('exit', process.exitCode, null);
      /* istanbul ignore next */
      emit('afterexit', process.exitCode, null);
      /* istanbul ignore next */
      return ret
    } else {
      return originalProcessEmit.apply(this, arguments)
    }
  };
}
});

const DEFAULT_FORCE_KILL_TIMEOUT = 1000 * 5;

// Monkey-patches `childProcess.kill()` to add `forceKillAfterTimeout` behavior
const spawnedKill$1 = (kill, signal = 'SIGTERM', options = {}) => {
	const killResult = kill(signal);
	setKillTimeout(kill, signal, options, killResult);
	return killResult;
};

const setKillTimeout = (kill, signal, options, killResult) => {
	if (!shouldForceKill(signal, options, killResult)) {
		return;
	}

	const timeout = getForceKillAfterTimeout(options);
	const t = setTimeout(() => {
		kill('SIGKILL');
	}, timeout);

	// Guarded because there's no `.unref()` when `execa` is used in the renderer
	// process in Electron. This cannot be tested since we don't run tests in
	// Electron.
	// istanbul ignore else
	if (t.unref) {
		t.unref();
	}
};

const shouldForceKill = (signal, {forceKillAfterTimeout}, killResult) => {
	return isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
};

const isSigterm = signal => {
	return signal === _os__default['default'].constants.signals.SIGTERM ||
		(typeof signal === 'string' && signal.toUpperCase() === 'SIGTERM');
};

const getForceKillAfterTimeout = ({forceKillAfterTimeout = true}) => {
	if (forceKillAfterTimeout === true) {
		return DEFAULT_FORCE_KILL_TIMEOUT;
	}

	if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
		throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
	}

	return forceKillAfterTimeout;
};

// `childProcess.cancel()`
const spawnedCancel$1 = (spawned, context) => {
	const killResult = spawned.kill();

	if (killResult) {
		context.isCanceled = true;
	}
};

const timeoutKill = (spawned, signal, reject) => {
	spawned.kill(signal);
	reject(Object.assign(new Error('Timed out'), {timedOut: true, signal}));
};

// `timeout` option handling
const setupTimeout$1 = (spawned, {timeout, killSignal = 'SIGTERM'}, spawnedPromise) => {
	if (timeout === 0 || timeout === undefined) {
		return spawnedPromise;
	}

	let timeoutId;
	const timeoutPromise = new Promise((resolve, reject) => {
		timeoutId = setTimeout(() => {
			timeoutKill(spawned, killSignal, reject);
		}, timeout);
	});

	const safeSpawnedPromise = spawnedPromise.finally(() => {
		clearTimeout(timeoutId);
	});

	return Promise.race([timeoutPromise, safeSpawnedPromise]);
};

const validateTimeout$1 = ({timeout}) => {
	if (timeout !== undefined && (!Number.isFinite(timeout) || timeout < 0)) {
		throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
	}
};

// `cleanup` option handling
const setExitHandler$1 = async (spawned, {cleanup, detached}, timedPromise) => {
	if (!cleanup || detached) {
		return timedPromise;
	}

	const removeExitHandler = signalExit(() => {
		spawned.kill();
	});

	return timedPromise.finally(() => {
		removeExitHandler();
	});
};

var kill = {
	spawnedKill: spawnedKill$1,
	spawnedCancel: spawnedCancel$1,
	setupTimeout: setupTimeout$1,
	validateTimeout: validateTimeout$1,
	setExitHandler: setExitHandler$1
};

const isStream = stream =>
	stream !== null &&
	typeof stream === 'object' &&
	typeof stream.pipe === 'function';

isStream.writable = stream =>
	isStream(stream) &&
	stream.writable !== false &&
	typeof stream._write === 'function' &&
	typeof stream._writableState === 'object';

isStream.readable = stream =>
	isStream(stream) &&
	stream.readable !== false &&
	typeof stream._read === 'function' &&
	typeof stream._readableState === 'object';

isStream.duplex = stream =>
	isStream.writable(stream) &&
	isStream.readable(stream);

isStream.transform = stream =>
	isStream.duplex(stream) &&
	typeof stream._transform === 'function';

var isStream_1 = isStream;

const {PassThrough: PassThroughStream} = require$$0__default$1['default'];

var bufferStream = options => {
	options = {...options};

	const {array} = options;
	let {encoding} = options;
	const isBuffer = encoding === 'buffer';
	let objectMode = false;

	if (array) {
		objectMode = !(encoding || isBuffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (isBuffer) {
		encoding = null;
	}

	const stream = new PassThroughStream({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	let length = 0;
	const chunks = [];

	stream.on('data', chunk => {
		chunks.push(chunk);

		if (objectMode) {
			length = chunks.length;
		} else {
			length += chunk.length;
		}
	});

	stream.getBufferedValue = () => {
		if (array) {
			return chunks;
		}

		return isBuffer ? Buffer.concat(chunks, length) : chunks.join('');
	};

	stream.getBufferedLength = () => length;

	return stream;
};

const {constants: BufferConstants} = require$$0__default$2['default'];

const {promisify} = require$$1__default['default'];


const streamPipelinePromisified = promisify(require$$0__default$1['default'].pipeline);

class MaxBufferError extends Error {
	constructor() {
		super('maxBuffer exceeded');
		this.name = 'MaxBufferError';
	}
}

async function getStream(inputStream, options) {
	if (!inputStream) {
		throw new Error('Expected a stream');
	}

	options = {
		maxBuffer: Infinity,
		...options
	};

	const {maxBuffer} = options;
	const stream = bufferStream(options);

	await new Promise((resolve, reject) => {
		const rejectPromise = error => {
			// Don't retrieve an oversized buffer.
			if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
				error.bufferedData = stream.getBufferedValue();
			}

			reject(error);
		};

		(async () => {
			try {
				await streamPipelinePromisified(inputStream, stream);
				resolve();
			} catch (error) {
				rejectPromise(error);
			}
		})();

		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				rejectPromise(new MaxBufferError());
			}
		});
	});

	return stream.getBufferedValue();
}

var getStream_1 = getStream;
var buffer = (stream, options) => getStream(stream, {...options, encoding: 'buffer'});
var array = (stream, options) => getStream(stream, {...options, array: true});
var MaxBufferError_1 = MaxBufferError;
getStream_1.buffer = buffer;
getStream_1.array = array;
getStream_1.MaxBufferError = MaxBufferError_1;

const { PassThrough } = require$$0__default$1['default'];

var mergeStream = function (/*streams...*/) {
  var sources = [];
  var output  = new PassThrough({objectMode: true});

  output.setMaxListeners(0);

  output.add = add;
  output.isEmpty = isEmpty;

  output.on('unpipe', remove);

  Array.prototype.slice.call(arguments).forEach(add);

  return output

  function add (source) {
    if (Array.isArray(source)) {
      source.forEach(add);
      return this
    }

    sources.push(source);
    source.once('end', remove.bind(null, source));
    source.once('error', output.emit.bind(output, 'error'));
    source.pipe(output, {end: false});
    return this
  }

  function isEmpty () {
    return sources.length == 0;
  }

  function remove (source) {
    sources = sources.filter(function (it) { return it !== source });
    if (!sources.length && output.readable) { output.end(); }
  }
};

// `input` option
const handleInput$1 = (spawned, input) => {
	// Checking for stdin is workaround for https://github.com/nodejs/node/issues/26852
	// @todo remove `|| spawned.stdin === undefined` once we drop support for Node.js <=12.2.0
	if (input === undefined || spawned.stdin === undefined) {
		return;
	}

	if (isStream_1(input)) {
		input.pipe(spawned.stdin);
	} else {
		spawned.stdin.end(input);
	}
};

// `all` interleaves `stdout` and `stderr`
const makeAllStream$1 = (spawned, {all}) => {
	if (!all || (!spawned.stdout && !spawned.stderr)) {
		return;
	}

	const mixed = mergeStream();

	if (spawned.stdout) {
		mixed.add(spawned.stdout);
	}

	if (spawned.stderr) {
		mixed.add(spawned.stderr);
	}

	return mixed;
};

// On failure, `result.stdout|stderr|all` should contain the currently buffered stream
const getBufferedData = async (stream, streamPromise) => {
	if (!stream) {
		return;
	}

	stream.destroy();

	try {
		return await streamPromise;
	} catch (error) {
		return error.bufferedData;
	}
};

const getStreamPromise = (stream, {encoding, buffer, maxBuffer}) => {
	if (!stream || !buffer) {
		return;
	}

	if (encoding) {
		return getStream_1(stream, {encoding, maxBuffer});
	}

	return getStream_1.buffer(stream, {maxBuffer});
};

// Retrieve result of child process: exit code, signal, error, streams (stdout/stderr/all)
const getSpawnedResult$1 = async ({stdout, stderr, all}, {encoding, buffer, maxBuffer}, processDone) => {
	const stdoutPromise = getStreamPromise(stdout, {encoding, buffer, maxBuffer});
	const stderrPromise = getStreamPromise(stderr, {encoding, buffer, maxBuffer});
	const allPromise = getStreamPromise(all, {encoding, buffer, maxBuffer: maxBuffer * 2});

	try {
		return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
	} catch (error) {
		return Promise.all([
			{error, signal: error.signal, timedOut: error.timedOut},
			getBufferedData(stdout, stdoutPromise),
			getBufferedData(stderr, stderrPromise),
			getBufferedData(all, allPromise)
		]);
	}
};

const validateInputSync$1 = ({input}) => {
	if (isStream_1(input)) {
		throw new TypeError('The `input` option cannot be a stream in sync mode');
	}
};

var stream = {
	handleInput: handleInput$1,
	makeAllStream: makeAllStream$1,
	getSpawnedResult: getSpawnedResult$1,
	validateInputSync: validateInputSync$1
};

const nativePromisePrototype = (async () => {})().constructor.prototype;
const descriptors = ['then', 'catch', 'finally'].map(property => [
	property,
	Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
]);

// The return value is a mixin of `childProcess` and `Promise`
const mergePromise$1 = (spawned, promise) => {
	for (const [property, descriptor] of descriptors) {
		// Starting the main `promise` is deferred to avoid consuming streams
		const value = typeof promise === 'function' ?
			(...args) => Reflect.apply(descriptor.value, promise(), args) :
			descriptor.value.bind(promise);

		Reflect.defineProperty(spawned, property, {...descriptor, value});
	}

	return spawned;
};

// Use promises instead of `child_process` events
const getSpawnedPromise$1 = spawned => {
	return new Promise((resolve, reject) => {
		spawned.on('exit', (exitCode, signal) => {
			resolve({exitCode, signal});
		});

		spawned.on('error', error => {
			reject(error);
		});

		if (spawned.stdin) {
			spawned.stdin.on('error', error => {
				reject(error);
			});
		}
	});
};

var promise = {
	mergePromise: mergePromise$1,
	getSpawnedPromise: getSpawnedPromise$1
};

const normalizeArgs = (file, args = []) => {
	if (!Array.isArray(args)) {
		return [file];
	}

	return [file, ...args];
};

const NO_ESCAPE_REGEXP = /^[\w.-]+$/;
const DOUBLE_QUOTES_REGEXP = /"/g;

const escapeArg = arg => {
	if (typeof arg !== 'string' || NO_ESCAPE_REGEXP.test(arg)) {
		return arg;
	}

	return `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`;
};

const joinCommand$1 = (file, args) => {
	return normalizeArgs(file, args).join(' ');
};

const getEscapedCommand$1 = (file, args) => {
	return normalizeArgs(file, args).map(arg => escapeArg(arg)).join(' ');
};

const SPACES_REGEXP = / +/g;

// Handle `execa.command()`
const parseCommand$1 = command => {
	const tokens = [];
	for (const token of command.trim().split(SPACES_REGEXP)) {
		// Allow spaces to be escaped by a backslash if not meant as a delimiter
		const previousToken = tokens[tokens.length - 1];
		if (previousToken && previousToken.endsWith('\\')) {
			// Merge previous token with current one
			tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
		} else {
			tokens.push(token);
		}
	}

	return tokens;
};

var command$1 = {
	joinCommand: joinCommand$1,
	getEscapedCommand: getEscapedCommand$1,
	parseCommand: parseCommand$1
};

const {spawnedKill, spawnedCancel, setupTimeout, validateTimeout, setExitHandler} = kill;
const {handleInput, getSpawnedResult, makeAllStream, validateInputSync} = stream;
const {mergePromise, getSpawnedPromise} = promise;
const {joinCommand, parseCommand, getEscapedCommand} = command$1;

const DEFAULT_MAX_BUFFER = 1000 * 1000 * 100;

const getEnv = ({env: envOption, extendEnv, preferLocal, localDir, execPath}) => {
	const env = extendEnv ? {...process.env, ...envOption} : envOption;

	if (preferLocal) {
		return npmRunPath_1.env({env, cwd: localDir, execPath});
	}

	return env;
};

const handleArguments = (file, args, options = {}) => {
	const parsed = crossSpawn._parse(file, args, options);
	file = parsed.command;
	args = parsed.args;
	options = parsed.options;

	options = {
		maxBuffer: DEFAULT_MAX_BUFFER,
		buffer: true,
		stripFinalNewline: true,
		extendEnv: true,
		preferLocal: false,
		localDir: options.cwd || process.cwd(),
		execPath: process.execPath,
		encoding: 'utf8',
		reject: true,
		cleanup: true,
		all: false,
		windowsHide: true,
		...options
	};

	options.env = getEnv(options);

	options.stdio = stdio(options);

	if (process.platform === 'win32' && path__default['default'].basename(file, '.exe') === 'cmd') {
		// #116
		args.unshift('/q');
	}

	return {file, args, options, parsed};
};

const handleOutput = (options, value, error) => {
	if (typeof value !== 'string' && !Buffer.isBuffer(value)) {
		// When `execa.sync()` errors, we normalize it to '' to mimic `execa()`
		return error === undefined ? undefined : '';
	}

	if (options.stripFinalNewline) {
		return stripFinalNewline(value);
	}

	return value;
};

const execa = (file, args, options) => {
	const parsed = handleArguments(file, args, options);
	const command = joinCommand(file, args);
	const escapedCommand = getEscapedCommand(file, args);

	validateTimeout(parsed.options);

	let spawned;
	try {
		spawned = childProcess__default['default'].spawn(parsed.file, parsed.args, parsed.options);
	} catch (error$1) {
		// Ensure the returned error is always both a promise and a child process
		const dummySpawned = new childProcess__default['default'].ChildProcess();
		const errorPromise = Promise.reject(error({
			error: error$1,
			stdout: '',
			stderr: '',
			all: '',
			command,
			escapedCommand,
			parsed,
			timedOut: false,
			isCanceled: false,
			killed: false
		}));
		return mergePromise(dummySpawned, errorPromise);
	}

	const spawnedPromise = getSpawnedPromise(spawned);
	const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
	const processDone = setExitHandler(spawned, parsed.options, timedPromise);

	const context = {isCanceled: false};

	spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
	spawned.cancel = spawnedCancel.bind(null, spawned, context);

	const handlePromise = async () => {
		const [{error: error$1, exitCode, signal, timedOut}, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
		const stdout = handleOutput(parsed.options, stdoutResult);
		const stderr = handleOutput(parsed.options, stderrResult);
		const all = handleOutput(parsed.options, allResult);

		if (error$1 || exitCode !== 0 || signal !== null) {
			const returnedError = error({
				error: error$1,
				exitCode,
				signal,
				stdout,
				stderr,
				all,
				command,
				escapedCommand,
				parsed,
				timedOut,
				isCanceled: context.isCanceled,
				killed: spawned.killed
			});

			if (!parsed.options.reject) {
				return returnedError;
			}

			throw returnedError;
		}

		return {
			command,
			escapedCommand,
			exitCode: 0,
			stdout,
			stderr,
			all,
			failed: false,
			timedOut: false,
			isCanceled: false,
			killed: false
		};
	};

	const handlePromiseOnce = onetime_1(handlePromise);

	handleInput(spawned, parsed.options.input);

	spawned.all = makeAllStream(spawned, parsed.options);

	return mergePromise(spawned, handlePromiseOnce);
};

var execa_1 = execa;

var sync = (file, args, options) => {
	const parsed = handleArguments(file, args, options);
	const command = joinCommand(file, args);
	const escapedCommand = getEscapedCommand(file, args);

	validateInputSync(parsed.options);

	let result;
	try {
		result = childProcess__default['default'].spawnSync(parsed.file, parsed.args, parsed.options);
	} catch (error$1) {
		throw error({
			error: error$1,
			stdout: '',
			stderr: '',
			all: '',
			command,
			escapedCommand,
			parsed,
			timedOut: false,
			isCanceled: false,
			killed: false
		});
	}

	const stdout = handleOutput(parsed.options, result.stdout, result.error);
	const stderr = handleOutput(parsed.options, result.stderr, result.error);

	if (result.error || result.status !== 0 || result.signal !== null) {
		const error$1 = error({
			stdout,
			stderr,
			error: result.error,
			signal: result.signal,
			exitCode: result.status,
			command,
			escapedCommand,
			parsed,
			timedOut: result.error && result.error.code === 'ETIMEDOUT',
			isCanceled: false,
			killed: result.signal !== null
		});

		if (!parsed.options.reject) {
			return error$1;
		}

		throw error$1;
	}

	return {
		command,
		escapedCommand,
		exitCode: 0,
		stdout,
		stderr,
		failed: false,
		timedOut: false,
		isCanceled: false,
		killed: false
	};
};

var command = (command, options) => {
	const [file, ...args] = parseCommand(command);
	return execa(file, args, options);
};

var commandSync = (command, options) => {
	const [file, ...args] = parseCommand(command);
	return execa.sync(file, args, options);
};

var node = (scriptPath, args, options = {}) => {
	if (args && !Array.isArray(args) && typeof args === 'object') {
		options = args;
		args = [];
	}

	const stdio$1 = stdio.node(options);
	const defaultExecArgv = process.execArgv.filter(arg => !arg.startsWith('--inspect'));

	const {
		nodePath = process.execPath,
		nodeOptions = defaultExecArgv
	} = options;

	return execa(
		nodePath,
		[
			...nodeOptions,
			scriptPath,
			...(Array.isArray(args) ? args : [])
		],
		{
			...options,
			stdin: undefined,
			stdout: undefined,
			stderr: undefined,
			stdio: stdio$1,
			shell: false
		}
	);
};
execa_1.sync = sync;
execa_1.command = command;
execa_1.commandSync = commandSync;
execa_1.node = node;

function ansiRegex({onlyFirst = false} = {}) {
	const pattern = [
	    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
	].join('|');

	return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

function stripAnsi(string) {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
	}

	return string.replace(ansiRegex(), '');
}

const detectDefaultShell = () => {
	const {env} = process__default['default'];

	if (process__default['default'].platform === 'win32') {
		return env.COMSPEC || 'cmd.exe';
	}

	try {
		const {shell} = node_os.userInfo();
		if (shell) {
			return shell;
		}
	} catch {}

	if (process__default['default'].platform === 'darwin') {
		return env.SHELL || '/bin/zsh';
	}

	return env.SHELL || '/bin/sh';
};

// Stores default shell when imported.
const defaultShell = detectDefaultShell();

const args = [
	'-ilc',
	'echo -n "_SHELL_ENV_DELIMITER_"; env; echo -n "_SHELL_ENV_DELIMITER_"; exit',
];

const env = {
	// Disables Oh My Zsh auto-update thing that can block the process.
	DISABLE_AUTO_UPDATE: 'true',
};

const parseEnv = env => {
	env = env.split('_SHELL_ENV_DELIMITER_')[1];
	const returnValue = {};

	for (const line of stripAnsi(env).split('\n').filter(line => Boolean(line))) {
		const [key, ...values] = line.split('=');
		returnValue[key] = values.join('=');
	}

	return returnValue;
};

function shellEnvSync(shell) {
	if (process__default['default'].platform === 'win32') {
		return process__default['default'].env;
	}

	try {
		const {stdout} = execa_1.sync(shell || defaultShell, args, {env});
		return parseEnv(stdout);
	} catch (error) {
		if (shell) {
			throw error;
		} else {
			return process__default['default'].env;
		}
	}
}

function shellPathSync() {
	const {PATH} = shellEnvSync();
	return PATH;
}

function fixPath() {
	if (process__default['default'].platform === 'win32') {
		return;
	}

	process__default['default'].env.PATH = shellPathSync() || [
		'./node_modules/.bin',
		'/.nodebrew/current/bin',
		'/usr/local/bin',
		process__default['default'].env.PATH,
	].join(':');
}

var IMAGE_EXT_LIST = [
    ".png",
    ".jpg",
    ".jpeg",
    ".bmp",
    ".gif",
    ".svg",
    ".tiff",
    ".webp",
    ".avif",
];
function isAnImage(ext) {
    return IMAGE_EXT_LIST.includes(ext.toLowerCase());
}
function isAssetTypeAnImage(path$1) {
    return isAnImage(path.extname(path$1));
}
function getOS() {
    var appVersion = navigator.appVersion;
    if (appVersion.indexOf("Win") !== -1) {
        return "Windows";
    }
    else if (appVersion.indexOf("Mac") !== -1) {
        return "MacOS";
    }
    else if (appVersion.indexOf("X11") !== -1) {
        return "Linux";
    }
    else {
        return "Unknown OS";
    }
}
function streamToString(stream) {
    var stream_1, stream_1_1;
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var chunks, chunk, e_1_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    chunks = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    stream_1 = __asyncValues(stream);
                    _b.label = 2;
                case 2: return [4 /*yield*/, stream_1.next()];
                case 3:
                    if (!(stream_1_1 = _b.sent(), !stream_1_1.done)) return [3 /*break*/, 5];
                    chunk = stream_1_1.value;
                    chunks.push(Buffer.from(chunk));
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(stream_1_1 && !stream_1_1.done && (_a = stream_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(stream_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, Buffer.concat(chunks).toString("utf-8")];
            }
        });
    });
}
function getUrlAsset(url) {
    return (url = url.substr(1 + url.lastIndexOf("/")).split("?")[0]).split("#")[0];
}
function getLastImage(list) {
    var reversedList = list.reverse();
    var lastImage;
    reversedList.forEach(function (item) {
        if (item && item.startsWith("http")) {
            lastImage = item;
            return item;
        }
    });
    return lastImage;
}
function arrayToObject(arr, key) {
    var obj = {};
    arr.forEach(function (element) {
        obj[element[key]] = element;
    });
    return obj;
}

var PicGoUploader = /** @class */ (function () {
    function PicGoUploader(settings) {
        this.settings = settings;
    }
    PicGoUploader.prototype.uploadFiles = function (fileList) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, obsidian.requestUrl({
                            url: this.settings.uploadServer,
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ list: fileList }),
                        })];
                    case 1:
                        response = _a.sent();
                        data = response.json;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    PicGoUploader.prototype.uploadFileByClipboard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, obsidian.requestUrl({
                            url: this.settings.uploadServer,
                            method: "POST",
                        })];
                    case 1:
                        res = _a.sent();
                        data = res.json;
                        if (res.status !== 200) {
                            ({ response: data, body: data.msg });
                            return [2 /*return*/, {
                                    code: -1,
                                    msg: data.msg,
                                    data: "",
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    code: 0,
                                    msg: "success",
                                    data: typeof data.result == "string" ? data.result : data.result[0],
                                    fullResult: data.fullResult || [],
                                }];
                        }
                }
            });
        });
    };
    return PicGoUploader;
}());
var PicGoCoreUploader = /** @class */ (function () {
    function PicGoCoreUploader(settings) {
        this.settings = settings;
    }
    PicGoCoreUploader.prototype.uploadFiles = function (fileList) {
        return __awaiter(this, void 0, void 0, function () {
            var length, cli, command, res, splitList, splitListLength, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        length = fileList.length;
                        cli = this.settings.picgoCorePath || "picgo";
                        command = cli + " upload " + fileList
                            .map(function (item) { return "\"" + item + "\""; })
                            .join(" ");
                        return [4 /*yield*/, this.exec(command)];
                    case 1:
                        res = _a.sent();
                        splitList = res.split("\n");
                        splitListLength = splitList.length;
                        console.log(splitListLength);
                        data = splitList.splice(splitListLength - 1 - length, length);
                        if (res.includes("PicGo ERROR")) {
                            return [2 /*return*/, {
                                    success: false,
                                    msg: "失败",
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: true,
                                    result: data,
                                }];
                        }
                }
            });
        });
    };
    // PicGo-Core 上传处理
    PicGoCoreUploader.prototype.uploadFileByClipboard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, splitList, lastImage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uploadByClip()];
                    case 1:
                        res = _a.sent();
                        splitList = res.split("\n");
                        lastImage = getLastImage(splitList);
                        if (lastImage) {
                            return [2 /*return*/, {
                                    code: 0,
                                    msg: "success",
                                    data: lastImage,
                                }];
                        }
                        else {
                            new obsidian.Notice("\"Please check PicGo-Core config\"\n" + res);
                            return [2 /*return*/, {
                                    code: -1,
                                    msg: "\"Please check PicGo-Core config\"\n" + res,
                                    data: "",
                                }];
                        }
                }
            });
        });
    };
    // PicGo-Core的剪切上传反馈
    PicGoCoreUploader.prototype.uploadByClip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var command, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.settings.picgoCorePath) {
                            command = this.settings.picgoCorePath + " upload";
                        }
                        else {
                            command = "picgo upload";
                        }
                        return [4 /*yield*/, this.exec(command)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    PicGoCoreUploader.prototype.exec = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var stdout, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, childProcess.exec(command)];
                    case 1:
                        stdout = (_a.sent()).stdout;
                        return [4 /*yield*/, streamToString(stdout)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return PicGoCoreUploader;
}());

var PicGoDeleter = /** @class */ (function () {
    function PicGoDeleter(plugin) {
        this.plugin = plugin;
    }
    PicGoDeleter.prototype.deleteImage = function (configMap) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, obsidian.requestUrl({
                            url: this.plugin.settings.deleteServer,
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                list: configMap,
                            }),
                        })];
                    case 1:
                        response = _a.sent();
                        data = response.json;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return PicGoDeleter;
}());

var REGEX_FILE = /\!\[(.*?)\]\((.*?)\)/g;
var REGEX_WIKI_FILE = /\!\[\[(.*?)(\s\|.*?)?\]\]/g;
var Helper = /** @class */ (function () {
    function Helper(app) {
        this.app = app;
    }
    Helper.prototype.getFrontmatterValue = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = undefined; }
        var file = this.app.workspace.getActiveFile();
        if (!file) {
            return undefined;
        }
        var path = file.path;
        var cache = this.app.metadataCache.getCache(path);
        var value = defaultValue;
        if ((cache === null || cache === void 0 ? void 0 : cache.frontmatter) && cache.frontmatter.hasOwnProperty(key)) {
            value = cache.frontmatter[key];
        }
        return value;
    };
    Helper.prototype.getEditor = function () {
        var mdView = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (mdView) {
            return mdView.editor;
        }
        else {
            return null;
        }
    };
    Helper.prototype.getValue = function () {
        var editor = this.getEditor();
        return editor.getValue();
    };
    Helper.prototype.setValue = function (value) {
        var editor = this.getEditor();
        var _a = editor.getScrollInfo(), left = _a.left, top = _a.top;
        var position = editor.getCursor();
        editor.setValue(value);
        editor.scrollTo(left, top);
        editor.setCursor(position);
    };
    // get all file urls, include local and internet
    Helper.prototype.getAllFiles = function () {
        var editor = this.getEditor();
        var value = editor.getValue();
        return this.getImageLink(value);
    };
    Helper.prototype.getImageLink = function (value) {
        var e_1, _a, e_2, _b;
        var matches = value.matchAll(REGEX_FILE);
        var WikiMatches = value.matchAll(REGEX_WIKI_FILE);
        var fileArray = [];
        try {
            for (var matches_1 = __values(matches), matches_1_1 = matches_1.next(); !matches_1_1.done; matches_1_1 = matches_1.next()) {
                var match = matches_1_1.value;
                var name_1 = match[1];
                var path$1 = match[2];
                var source = match[0];
                fileArray.push({
                    path: path$1,
                    name: name_1,
                    source: source,
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (matches_1_1 && !matches_1_1.done && (_a = matches_1.return)) _a.call(matches_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var WikiMatches_1 = __values(WikiMatches), WikiMatches_1_1 = WikiMatches_1.next(); !WikiMatches_1_1.done; WikiMatches_1_1 = WikiMatches_1.next()) {
                var match = WikiMatches_1_1.value;
                var name_2 = path.parse(match[1]).name;
                var path$1 = match[1];
                var source = match[0];
                fileArray.push({
                    path: path$1,
                    name: name_2,
                    source: source,
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (WikiMatches_1_1 && !WikiMatches_1_1.done && (_b = WikiMatches_1.return)) _b.call(WikiMatches_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return fileArray;
    };
    Helper.prototype.hasBlackDomain = function (src, blackDomains) {
        if (blackDomains.trim() === "") {
            return false;
        }
        var blackDomainList = blackDomains.split(",");
        var url = new URL(src);
        var domain = url.hostname;
        return blackDomainList.some(function (blackDomain) { return domain.includes(blackDomain); });
    };
    return Helper;
}());

// العربية
var ar = {};

// čeština
var cz = {};

// Dansk
var da = {};

// Deutsch
var de = {};

// English
var en = {
    // setting.ts
    "Plugin Settings": "Plugin Settings",
    "Auto pasted upload": "Auto pasted upload",
    "If you set this value true, when you paste image, it will be auto uploaded(you should set the picGo server rightly)": "If you set this value true, when you paste image, it will be auto uploaded(you should set the picGo server rightly)",
    "Default uploader": "Default uploader",
    "PicGo server": "PicGo server",
    "Please input PicGo server": "Please input PicGo server",
    "PicGo delete server": "PicGo server delete route(you need to use PicList app)",
    "PicList desc": "Search PicList on Github to download and install",
    "Please input PicGo delete server": "Please input PicGo delete server",
    "Delete image using PicList": "Delete image using PicList",
    "PicGo-Core path": "PicGo-Core path",
    "Delete successfully": "Delete successfully",
    "Delete failed": "Delete failed",
    "Image size suffix": "Image size suffix",
    "Image size suffix Description": "like |300 for resize image in ob.",
    "Please input image size suffix": "Please input image size suffix",
    "Error, could not delete": "Error, could not delete",
    "Please input PicGo-Core path, default using environment variables": "Please input PicGo-Core path, default using environment variables",
    "Work on network": "Work on network",
    "Work on network Description": "Allow upload network image by 'Upload all' command.\n Or when you paste, md standard image link in your clipboard will be auto upload.",
    fixPath: "fixPath",
    fixPathWarning: "This option is used to fix PicGo-core upload failures on Linux and Mac. It modifies the PATH variable within Obsidian. If Obsidian encounters any bugs, turn off the option, try again! ",
    "Upload when clipboard has image and text together": "Upload when clipboard has image and text together",
    "When you copy, some application like Excel will image and text to clipboard, you can upload or not.": "When you copy, some application like Excel will image and text to clipboard, you can upload or not.",
    "Network Domain Black List": "Network Domain Black List",
    "Network Domain Black List Description": "Image in the domain list will not be upload,use comma separated",
    "Delete source file after you upload file": "Delete source file after you upload file",
    "Delete source file in ob assets after you upload file.": "Delete source file in ob assets after you upload file.",
};

// British English
var enGB = {};

// Español
var es = {};

// français
var fr = {};

// हिन्दी
var hi = {};

// Bahasa Indonesia
var id = {};

// Italiano
var it = {};

// 日本語
var ja = {};

// 한국어
var ko = {};

// Nederlands
var nl = {};

// Norsk
var no = {};

// język polski
var pl = {};

// Português
var pt = {};

// Português do Brasil
// Brazilian Portuguese
var ptBR = {};

// Română
var ro = {};

// русский
var ru = {};

// Türkçe
var tr = {};

// 简体中文
var zhCN = {
    // setting.ts
    "Plugin Settings": "插件设置",
    "Auto pasted upload": "剪切板自动上传",
    "If you set this value true, when you paste image, it will be auto uploaded(you should set the picGo server rightly)": "启用该选项后，黏贴图片时会自动上传（你需要正确配置picgo）",
    "Default uploader": "默认上传器",
    "PicGo server": "PicGo server",
    "Please input PicGo server": "请输入 PicGo server",
    "PicGo delete server": "PicGo server 删除接口(请使用PicList来启用此功能)",
    "PicList desc": "PicList是PicGo二次开发版，请Github搜索PicList下载",
    "Please input PicGo delete server": "请输入 PicGo server 删除接口",
    "Delete image using PicList": "使用 PicList 删除图片",
    "PicGo-Core path": "PicGo-Core 路径",
    "Delete successfully": "删除成功",
    "Delete failed": "删除失败",
    "Error, could not delete": "错误，无法删除",
    "Image size suffix": "图片大小后缀",
    "Image size suffix Description": "比如：|300 用于调整图片大小",
    "Please input image size suffix": "请输入图片大小后缀",
    "Please input PicGo-Core path, default using environment variables": "请输入 PicGo-Core path，默认使用环境变量",
    "Work on network": "应用网络图片",
    "Work on network Description": "当你上传所有图片时，也会上传网络图片。以及当你进行黏贴时，剪切板中的标准 md 图片会被上传",
    fixPath: "修正PATH变量",
    fixPathWarning: "此选项用于修复Linux和Mac上 PicGo-Core 上传失败的问题。它会修改 Obsidian 内的 PATH 变量，如果 Obsidian 遇到任何BUG，先关闭这个选项试试！",
    "Upload when clipboard has image and text together": "当剪切板同时拥有文本和图片剪切板数据时是否上传图片",
    "When you copy, some application like Excel will image and text to clipboard, you can upload or not.": "当你复制时，某些应用例如 Excel 会在剪切板同时文本和图像数据，确认是否上传。",
    "Network Domain Black List": "网络图片域名黑名单",
    "Network Domain Black List Description": "黑名单域名中的图片将不会被上传，用英文逗号分割",
    "Delete source file after you upload file": "上传文件后移除源文件",
    "Delete source file in ob assets after you upload file.": "上传文件后移除在ob附件文件夹中的文件",
};

// 繁體中文
var zhTW = {};

var localeMap = {
    ar: ar,
    cs: cz,
    da: da,
    de: de,
    en: en,
    'en-gb': enGB,
    es: es,
    fr: fr,
    hi: hi,
    id: id,
    it: it,
    ja: ja,
    ko: ko,
    nl: nl,
    nn: no,
    pl: pl,
    pt: pt,
    'pt-br': ptBR,
    ro: ro,
    ru: ru,
    tr: tr,
    'zh-cn': zhCN,
    'zh-tw': zhTW,
};
var locale = localeMap[obsidian.moment.locale()];
function t(str) {
    return (locale && locale[str]) || en[str];
}

var DEFAULT_SETTINGS = {
    uploadByClipSwitch: true,
    uploader: "PicGo",
    uploadServer: "http://127.0.0.1:36677/upload",
    deleteServer: "http://127.0.0.1:36677/delete",
    imageSizeSuffix: "",
    picgoCorePath: "",
    workOnNetWork: false,
    fixPath: false,
    applyImage: true,
    newWorkBlackDomains: "",
    deleteSource: false,
};
var SettingTab = /** @class */ (function (_super) {
    __extends(SettingTab, _super);
    function SettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        var os = getOS();
        containerEl.empty();
        containerEl.createEl("h2", { text: t("Plugin Settings") });
        new obsidian.Setting(containerEl)
            .setName(t("Auto pasted upload"))
            .setDesc(t("If you set this value true, when you paste image, it will be auto uploaded(you should set the picGo server rightly)"))
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.uploadByClipSwitch)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.uploadByClipSwitch = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Default uploader"))
            .setDesc(t("Default uploader"))
            .addDropdown(function (cb) {
            return cb
                .addOption("PicGo", "PicGo(app)")
                .addOption("PicGo-Core", "PicGo-Core")
                .setValue(_this.plugin.settings.uploader)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.uploader = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        if (this.plugin.settings.uploader === "PicGo") {
            new obsidian.Setting(containerEl)
                .setName(t("PicGo server"))
                .setDesc(t("PicGo server"))
                .addText(function (text) {
                return text
                    .setPlaceholder(t("Please input PicGo server"))
                    .setValue(_this.plugin.settings.uploadServer)
                    .onChange(function (key) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.plugin.settings.uploadServer = key;
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        }
        new obsidian.Setting(containerEl)
            .setName(t("PicGo delete server"))
            .setDesc(t("PicList desc"))
            .addText(function (text) {
            return text
                .setPlaceholder(t("Please input PicGo delete server"))
                .setValue(_this.plugin.settings.deleteServer)
                .onChange(function (key) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.deleteServer = key;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Image size suffix"))
            .setDesc(t("Image size suffix Description"))
            .addText(function (text) {
            return text
                .setPlaceholder(t("Please input image size suffix"))
                .setValue(_this.plugin.settings.imageSizeSuffix)
                .onChange(function (key) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.imageSizeSuffix = key;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        if (this.plugin.settings.uploader === "PicGo-Core") {
            new obsidian.Setting(containerEl)
                .setName(t("PicGo-Core path"))
                .setDesc(t("Please input PicGo-Core path, default using environment variables"))
                .addText(function (text) {
                return text
                    .setPlaceholder("")
                    .setValue(_this.plugin.settings.picgoCorePath)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.plugin.settings.picgoCorePath = value;
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            if (os !== "Windows") {
                new obsidian.Setting(containerEl)
                    .setName(t("fixPath"))
                    .setDesc(t("fixPathWarning"))
                    .addToggle(function (toggle) {
                    return toggle
                        .setValue(_this.plugin.settings.fixPath)
                        .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.plugin.settings.fixPath = value;
                                    return [4 /*yield*/, this.plugin.saveSettings()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                });
            }
        }
        new obsidian.Setting(containerEl)
            .setName(t("Work on network"))
            .setDesc(t("Work on network Description"))
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.workOnNetWork)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.workOnNetWork = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Network Domain Black List"))
            .setDesc(t("Network Domain Black List Description"))
            .addTextArea(function (textArea) {
            return textArea
                .setValue(_this.plugin.settings.newWorkBlackDomains)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.newWorkBlackDomains = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Upload when clipboard has image and text together"))
            .setDesc(t("When you copy, some application like Excel will image and text to clipboard, you can upload or not."))
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.applyImage)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.applyImage = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName(t("Delete source file after you upload file"))
            .setDesc(t("Delete source file in ob assets after you upload file."))
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.deleteSource)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.deleteSource = value;
                            this.display();
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    return SettingTab;
}(obsidian.PluginSettingTab));

var imageAutoUploadPlugin = /** @class */ (function (_super) {
    __extends(imageAutoUploadPlugin, _super);
    function imageAutoUploadPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addMenu = function (menu, imgPath, editor) {
            menu.addItem(function (item) {
                return item
                    .setIcon("trash-2")
                    .setTitle(t("Delete image using PicList"))
                    .onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                    var selectedItem, res, selection;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 3, , 4]);
                                selectedItem = this.settings.uploadedImages.find(function (item) { return item.imgUrl === imgPath; });
                                if (!selectedItem) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.picGoDeleter.deleteImage([selectedItem])];
                            case 1:
                                res = _b.sent();
                                if (res.success) {
                                    new obsidian.Notice(t("Delete successfully"));
                                    selection = editor.getSelection();
                                    if (selection) {
                                        editor.replaceSelection("");
                                    }
                                    this.settings.uploadedImages =
                                        this.settings.uploadedImages.filter(function (item) { return item.imgUrl !== imgPath; });
                                    this.saveSettings();
                                }
                                else {
                                    new obsidian.Notice(t("Delete failed"));
                                }
                                _b.label = 2;
                            case 2: return [3 /*break*/, 4];
                            case 3:
                                _b.sent();
                                new obsidian.Notice(t("Error, could not delete"));
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
            });
        };
        return _this;
    }
    imageAutoUploadPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.onunload = function () { };
    imageAutoUploadPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.helper = new Helper(this.app);
                        this.picGoUploader = new PicGoUploader(this.settings);
                        this.picGoDeleter = new PicGoDeleter(this);
                        this.picGoCoreUploader = new PicGoCoreUploader(this.settings);
                        if (this.settings.uploader === "PicGo") {
                            this.uploader = this.picGoUploader;
                        }
                        else if (this.settings.uploader === "PicGo-Core") {
                            this.uploader = this.picGoCoreUploader;
                            if (this.settings.fixPath) {
                                fixPath();
                            }
                        }
                        else {
                            new obsidian.Notice("unknown uploader");
                        }
                        obsidian.addIcon("upload", "<svg t=\"1636630783429\" class=\"icon\" viewBox=\"0 0 100 100\" version=\"1.1\" p-id=\"4649\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M 71.638 35.336 L 79.408 35.336 C 83.7 35.336 87.178 38.662 87.178 42.765 L 87.178 84.864 C 87.178 88.969 83.7 92.295 79.408 92.295 L 17.249 92.295 C 12.957 92.295 9.479 88.969 9.479 84.864 L 9.479 42.765 C 9.479 38.662 12.957 35.336 17.249 35.336 L 25.019 35.336 L 25.019 42.765 L 17.249 42.765 L 17.249 84.864 L 79.408 84.864 L 79.408 42.765 L 71.638 42.765 L 71.638 35.336 Z M 49.014 10.179 L 67.326 27.688 L 61.835 32.942 L 52.849 24.352 L 52.849 59.731 L 45.078 59.731 L 45.078 24.455 L 36.194 32.947 L 30.702 27.692 L 49.012 10.181 Z\" p-id=\"4650\" fill=\"#8a8a8a\"></path>\n    </svg>");
                        this.addSettingTab(new SettingTab(this.app, this));
                        this.addCommand({
                            id: "Upload all images",
                            name: "Upload all images",
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.uploadAllFile();
                                    }
                                    return true;
                                }
                                return false;
                            },
                        });
                        this.addCommand({
                            id: "Download all images",
                            name: "Download all images",
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.downloadAllImageFiles();
                                    }
                                    return true;
                                }
                                return false;
                            },
                        });
                        this.setupPasteHandler();
                        this.registerFileMenu();
                        this.registerSelection();
                        return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.registerSelection = function () {
        var _this = this;
        this.registerEvent(this.app.workspace.on("editor-menu", function (menu, editor, info) {
            if (_this.app.workspace.getLeavesOfType("markdown").length === 0) {
                return;
            }
            var selection = editor.getSelection();
            if (selection) {
                var markdownRegex = /!\[.*\]\((.*)\)/g;
                var markdownMatch = markdownRegex.exec(selection);
                if (markdownMatch && markdownMatch.length > 1) {
                    var markdownUrl_1 = markdownMatch[1];
                    if (_this.settings.uploadedImages.find(function (item) { return item.imgUrl === markdownUrl_1; })) {
                        _this.addMenu(menu, markdownUrl_1, editor);
                    }
                }
            }
        }));
    };
    imageAutoUploadPlugin.prototype.downloadAllImageFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var folderPath, fileArray, imageArray, fileArray_1, fileArray_1_1, file, url, asset, _a, name_1, ext, response, activeFolder, basePath, abstractActiveFolder, e_1_1, value;
            var e_1, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        folderPath = this.getFileAssetPath();
                        fileArray = this.helper.getAllFiles();
                        if (!fs.existsSync(folderPath)) {
                            fs.mkdirSync(folderPath);
                        }
                        imageArray = [];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, 7, 8]);
                        fileArray_1 = __values(fileArray), fileArray_1_1 = fileArray_1.next();
                        _c.label = 2;
                    case 2:
                        if (!!fileArray_1_1.done) return [3 /*break*/, 5];
                        file = fileArray_1_1.value;
                        if (!file.path.startsWith("http")) {
                            return [3 /*break*/, 4];
                        }
                        url = file.path;
                        asset = getUrlAsset(url);
                        if (!isAnImage(asset.substr(asset.lastIndexOf(".")))) {
                            return [3 /*break*/, 4];
                        }
                        _a = __read([
                            decodeURI(path.parse(asset).name).replaceAll(/[\\\\/:*?\"<>|]/g, "-"),
                            path.parse(asset).ext,
                        ], 2), name_1 = _a[0], ext = _a[1];
                        // 如果文件名已存在，则用随机值替换
                        if (fs.existsSync(path.join(folderPath, encodeURI(asset)))) {
                            name_1 = (Math.random() + 1).toString(36).substr(2, 5);
                        }
                        name_1 = "image-" + name_1;
                        return [4 /*yield*/, this.download(url, path.join(folderPath, "" + name_1 + ext))];
                    case 3:
                        response = _c.sent();
                        if (response.ok) {
                            activeFolder = this.app.vault.getAbstractFileByPath(this.app.workspace.getActiveFile().path).parent.path;
                            basePath = this.app.vault.adapter.getBasePath();
                            abstractActiveFolder = path.resolve(basePath, activeFolder);
                            imageArray.push({
                                source: file.source,
                                name: name_1,
                                path: obsidian.normalizePath(path.relative(abstractActiveFolder, response.path)),
                            });
                        }
                        _c.label = 4;
                    case 4:
                        fileArray_1_1 = fileArray_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (fileArray_1_1 && !fileArray_1_1.done && (_b = fileArray_1.return)) _b.call(fileArray_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        value = this.helper.getValue();
                        imageArray.map(function (image) {
                            value = value.replace(image.source, "![" + image.name + (_this.settings.imageSizeSuffix || "") + "](" + encodeURI(image.path) + ")");
                        });
                        this.helper.setValue(value);
                        new obsidian.Notice("all: " + fileArray.length + "\nsuccess: " + imageArray.length + "\nfailed: " + (fileArray.length - imageArray.length));
                        return [2 /*return*/];
                }
            });
        });
    };
    // 获取当前文件所属的附件文件夹
    imageAutoUploadPlugin.prototype.getFileAssetPath = function () {
        var basePath = this.app.vault.adapter.getBasePath();
        // @ts-ignore
        var assetFolder = this.app.vault.config.attachmentFolderPath;
        var activeFile = this.app.vault.getAbstractFileByPath(this.app.workspace.getActiveFile().path);
        // 当前文件夹下的子文件夹
        if (assetFolder.startsWith("./")) {
            var activeFolder = decodeURI(path.resolve(basePath, activeFile.parent.path));
            return path.join(activeFolder, assetFolder);
        }
        else {
            // 根文件夹
            return path.join(basePath, assetFolder);
        }
    };
    imageAutoUploadPlugin.prototype.download = function (url, path) {
        return __awaiter(this, void 0, void 0, function () {
            var response, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, obsidian.requestUrl({ url: url })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2 /*return*/, {
                                    ok: false,
                                    msg: "error",
                                }];
                        }
                        buffer = Buffer.from(response.arrayBuffer);
                        try {
                            fs.writeFileSync(path, buffer);
                            return [2 /*return*/, {
                                    ok: true,
                                    msg: "ok",
                                    path: path,
                                }];
                        }
                        catch (err) {
                            console.error(err);
                            return [2 /*return*/, {
                                    ok: false,
                                    msg: err,
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.registerFileMenu = function () {
        var _this = this;
        this.registerEvent(this.app.workspace.on("file-menu", function (menu, file, source) {
            if (!isAssetTypeAnImage(file.path)) {
                return false;
            }
            menu.addItem(function (item) {
                item
                    .setTitle("Upload")
                    .setIcon("upload")
                    .onClick(function () {
                    if (!(file instanceof obsidian.TFile)) {
                        return false;
                    }
                    _this.fileMenuUpload(file);
                });
            });
        }));
    };
    imageAutoUploadPlugin.prototype.fileMenuUpload = function (file) {
        var e_2, _a;
        var _this = this;
        var content = this.helper.getValue();
        var basePath = this.app.vault.adapter.getBasePath();
        var imageList = [];
        var fileArray = this.helper.getAllFiles();
        try {
            for (var fileArray_2 = __values(fileArray), fileArray_2_1 = fileArray_2.next(); !fileArray_2_1.done; fileArray_2_1 = fileArray_2.next()) {
                var match = fileArray_2_1.value;
                var imageName = match.name;
                var encodedUri = match.path;
                var fileName = path.basename(decodeURI(encodedUri));
                if (file && file.name === fileName) {
                    var abstractImageFile = path.join(basePath, file.path);
                    if (isAssetTypeAnImage(abstractImageFile)) {
                        imageList.push({
                            path: abstractImageFile,
                            name: imageName,
                            source: match.source,
                        });
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (fileArray_2_1 && !fileArray_2_1.done && (_a = fileArray_2.return)) _a.call(fileArray_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (imageList.length === 0) {
            new obsidian.Notice("没有解析到图像文件");
            return;
        }
        this.uploader.uploadFiles(imageList.map(function (item) { return item.path; })).then(function (res) {
            if (res.success) {
                var uploadUrlList_1 = res.result;
                var uploadUrlFullResultList = res.resultFull || [];
                _this.settings.uploadedImages = __spreadArray(__spreadArray([], __read((_this.settings.uploadedImages || []))), __read(uploadUrlFullResultList));
                _this.saveSettings();
                imageList.map(function (item) {
                    var uploadImage = uploadUrlList_1.shift();
                    content = content.replaceAll(item.source, "![" + item.name + (_this.settings.imageSizeSuffix || "") + "](" + uploadImage + ")");
                });
                _this.helper.setValue(content);
                if (_this.settings.deleteSource) {
                    imageList.map(function (image) {
                        if (!image.path.startsWith("http")) {
                            fs.unlink(image.path, function () { });
                        }
                    });
                }
            }
            else {
                new obsidian.Notice("Upload error");
            }
        });
    };
    imageAutoUploadPlugin.prototype.filterFile = function (fileArray) {
        var e_3, _a;
        var imageList = [];
        try {
            for (var fileArray_3 = __values(fileArray), fileArray_3_1 = fileArray_3.next(); !fileArray_3_1.done; fileArray_3_1 = fileArray_3.next()) {
                var match = fileArray_3_1.value;
                if (this.settings.workOnNetWork && match.path.startsWith("http")) {
                    if (!this.helper.hasBlackDomain(match.path, this.settings.newWorkBlackDomains)) {
                        imageList.push({
                            path: match.path,
                            name: match.name,
                            source: match.source,
                        });
                    }
                }
                else {
                    imageList.push({
                        path: match.path,
                        name: match.name,
                        source: match.source,
                    });
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (fileArray_3_1 && !fileArray_3_1.done && (_a = fileArray_3.return)) _a.call(fileArray_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return imageList;
    };
    imageAutoUploadPlugin.prototype.getFile = function (fileName, fileMap) {
        if (!fileMap) {
            fileMap = arrayToObject(this.app.vault.getFiles(), "name");
        }
        return fileMap[fileName];
    };
    // uploda all file
    imageAutoUploadPlugin.prototype.uploadAllFile = function () {
        var e_4, _a;
        var _this = this;
        var content = this.helper.getValue();
        var basePath = this.app.vault.adapter.getBasePath();
        var activeFile = this.app.workspace.getActiveFile();
        var fileMap = arrayToObject(this.app.vault.getFiles(), "name");
        var filePathMap = arrayToObject(this.app.vault.getFiles(), "path");
        var imageList = [];
        var fileArray = this.filterFile(this.helper.getAllFiles());
        try {
            for (var fileArray_4 = __values(fileArray), fileArray_4_1 = fileArray_4.next(); !fileArray_4_1.done; fileArray_4_1 = fileArray_4.next()) {
                var match = fileArray_4_1.value;
                var imageName = match.name;
                var encodedUri = match.path;
                if (encodedUri.startsWith("http")) {
                    imageList.push({
                        path: match.path,
                        name: imageName,
                        source: match.source,
                    });
                }
                else {
                    var fileName = path.basename(decodeURI(encodedUri));
                    var file = void 0;
                    // 绝对路径
                    if (filePathMap[decodeURI(encodedUri)]) {
                        file = filePathMap[decodeURI(encodedUri)];
                    }
                    // 相对路径
                    if ((!file && decodeURI(encodedUri).startsWith("./")) ||
                        decodeURI(encodedUri).startsWith("../")) {
                        var filePath = path.resolve(path.join(basePath, path.dirname(activeFile.path)), decodeURI(encodedUri));
                        if (fs.existsSync(filePath)) {
                            var path$1 = obsidian.normalizePath(path.relative(basePath, path.resolve(path.join(basePath, path.dirname(activeFile.path)), decodeURI(encodedUri))));
                            file = filePathMap[path$1];
                        }
                    }
                    // 尽可能短路径
                    if (!file) {
                        file = this.getFile(fileName, fileMap);
                    }
                    if (file) {
                        var abstractImageFile = path.join(basePath, file.path);
                        if (isAssetTypeAnImage(abstractImageFile)) {
                            imageList.push({
                                path: abstractImageFile,
                                name: imageName,
                                source: match.source,
                            });
                        }
                    }
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (fileArray_4_1 && !fileArray_4_1.done && (_a = fileArray_4.return)) _a.call(fileArray_4);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (imageList.length === 0) {
            new obsidian.Notice("没有解析到图像文件");
            return;
        }
        else {
            new obsidian.Notice("\u5171\u627E\u5230" + imageList.length + "\u4E2A\u56FE\u50CF\u6587\u4EF6\uFF0C\u5F00\u59CB\u4E0A\u4F20");
        }
        this.uploader.uploadFiles(imageList.map(function (item) { return item.path; })).then(function (res) {
            if (res.success) {
                var uploadUrlList_2 = res.result;
                var uploadUrlFullResultList = res.resultFull || [];
                _this.settings.uploadedImages = __spreadArray(__spreadArray([], __read((_this.settings.uploadedImages || []))), __read(uploadUrlFullResultList));
                _this.saveSettings();
                imageList.map(function (item) {
                    var uploadImage = uploadUrlList_2.shift();
                    content = content.replaceAll(item.source, "![" + item.name + (_this.settings.imageSizeSuffix || "") + "](" + uploadImage + ")");
                });
                _this.helper.setValue(content);
                if (_this.settings.deleteSource) {
                    imageList.map(function (image) {
                        if (!image.path.startsWith("http")) {
                            fs.unlink(image.path, function () { });
                        }
                    });
                }
            }
            else {
                new obsidian.Notice("Upload error");
            }
        });
    };
    imageAutoUploadPlugin.prototype.setupPasteHandler = function () {
        var _this = this;
        this.registerEvent(this.app.workspace.on("editor-paste", function (evt, editor, markdownView) {
            var allowUpload = _this.helper.getFrontmatterValue("image-auto-upload", _this.settings.uploadByClipSwitch);
            evt.clipboardData.files;
            if (!allowUpload) {
                return;
            }
            // 剪贴板内容有md格式的图片时
            if (_this.settings.workOnNetWork) {
                var clipboardValue = evt.clipboardData.getData("text/plain");
                var imageList_1 = _this.helper
                    .getImageLink(clipboardValue)
                    .filter(function (image) { return image.path.startsWith("http"); })
                    .filter(function (image) {
                    return !_this.helper.hasBlackDomain(image.path, _this.settings.newWorkBlackDomains);
                });
                if (imageList_1.length !== 0) {
                    _this.uploader
                        .uploadFiles(imageList_1.map(function (item) { return item.path; }))
                        .then(function (res) {
                        var value = _this.helper.getValue();
                        if (res.success) {
                            var uploadUrlList_3 = res.result;
                            imageList_1.map(function (item) {
                                var uploadImage = uploadUrlList_3.shift();
                                value = value.replaceAll(item.source, "![" + item.name + (_this.settings.imageSizeSuffix || "") + "](" + uploadImage + ")");
                            });
                            _this.helper.setValue(value);
                            var uploadUrlFullResultList = res.fullResult || [];
                            _this.settings.uploadedImages = __spreadArray(__spreadArray([], __read((_this.settings.uploadedImages || []))), __read(uploadUrlFullResultList));
                            _this.saveSettings();
                        }
                        else {
                            new obsidian.Notice("Upload error");
                        }
                    });
                }
            }
            // 剪贴板中是图片时进行上传
            if (_this.canUpload(evt.clipboardData)) {
                _this.uploadFileAndEmbedImgurImage(editor, function (editor, pasteId) { return __awaiter(_this, void 0, void 0, function () {
                    var res, url, uploadUrlFullResultList;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.uploader.uploadFileByClipboard()];
                            case 1:
                                res = _a.sent();
                                if (res.code !== 0) {
                                    this.handleFailedUpload(editor, pasteId, res.msg);
                                    return [2 /*return*/];
                                }
                                url = res.data;
                                uploadUrlFullResultList = res.fullResult || [];
                                this.settings.uploadedImages = __spreadArray(__spreadArray([], __read((this.settings.uploadedImages || []))), __read(uploadUrlFullResultList));
                                return [4 /*yield*/, this.saveSettings()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/, url];
                        }
                    });
                }); }, evt.clipboardData).catch();
                evt.preventDefault();
            }
        }));
        this.registerEvent(this.app.workspace.on("editor-drop", function (evt, editor, markdownView) { return __awaiter(_this, void 0, void 0, function () {
            var allowUpload, files, sendFiles_1, files_1, data, uploadUrlFullResultList;
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        allowUpload = this.helper.getFrontmatterValue("image-auto-upload", this.settings.uploadByClipSwitch);
                        files = evt.dataTransfer.files;
                        if (!allowUpload) {
                            return [2 /*return*/];
                        }
                        if (!(files.length !== 0 && files[0].type.startsWith("image"))) return [3 /*break*/, 2];
                        sendFiles_1 = [];
                        files_1 = evt.dataTransfer.files;
                        Array.from(files_1).forEach(function (item, index) {
                            sendFiles_1.push(item.path);
                        });
                        evt.preventDefault();
                        return [4 /*yield*/, this.uploader.uploadFiles(sendFiles_1)];
                    case 1:
                        data = _c.sent();
                        if (data.success) {
                            uploadUrlFullResultList = (_a = data.fullResult) !== null && _a !== void 0 ? _a : [];
                            this.settings.uploadedImages = __spreadArray(__spreadArray([], __read(((_b = this.settings.uploadedImages) !== null && _b !== void 0 ? _b : []))), __read(uploadUrlFullResultList));
                            this.saveSettings();
                            data.result.map(function (value) {
                                var pasteId = (Math.random() + 1).toString(36).substr(2, 5);
                                _this.insertTemporaryText(editor, pasteId);
                                _this.embedMarkDownImage(editor, pasteId, value, files_1[0].name);
                            });
                        }
                        else {
                            new obsidian.Notice("Upload error");
                        }
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); }));
    };
    imageAutoUploadPlugin.prototype.canUpload = function (clipboardData) {
        this.settings.applyImage;
        var files = clipboardData.files;
        var text = clipboardData.getData("text");
        var hasImageFile = files.length !== 0 && files[0].type.startsWith("image");
        if (hasImageFile) {
            if (!!text) {
                return this.settings.applyImage;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    imageAutoUploadPlugin.prototype.uploadFileAndEmbedImgurImage = function (editor, callback, clipboardData) {
        return __awaiter(this, void 0, void 0, function () {
            var pasteId, name, url, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pasteId = (Math.random() + 1).toString(36).substr(2, 5);
                        this.insertTemporaryText(editor, pasteId);
                        name = clipboardData.files[0].name;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, callback(editor, pasteId)];
                    case 2:
                        url = _a.sent();
                        this.embedMarkDownImage(editor, pasteId, url, name);
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        this.handleFailedUpload(editor, pasteId, e_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    imageAutoUploadPlugin.prototype.insertTemporaryText = function (editor, pasteId) {
        var progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
        editor.replaceSelection(progressText + "\n");
    };
    imageAutoUploadPlugin.progressTextFor = function (id) {
        return "![Uploading file..." + id + "]()";
    };
    imageAutoUploadPlugin.prototype.embedMarkDownImage = function (editor, pasteId, imageUrl, name) {
        if (name === void 0) { name = ""; }
        var progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
        var imageSizeSuffix = this.settings.imageSizeSuffix || "";
        var markDownImage = "![" + name + imageSizeSuffix + "](" + imageUrl + ")";
        imageAutoUploadPlugin.replaceFirstOccurrence(editor, progressText, markDownImage);
    };
    imageAutoUploadPlugin.prototype.handleFailedUpload = function (editor, pasteId, reason) {
        console.error("Failed request: ", reason);
        var progressText = imageAutoUploadPlugin.progressTextFor(pasteId);
        imageAutoUploadPlugin.replaceFirstOccurrence(editor, progressText, "⚠️upload failed, check dev console");
    };
    imageAutoUploadPlugin.replaceFirstOccurrence = function (editor, target, replacement) {
        var lines = editor.getValue().split("\n");
        for (var i = 0; i < lines.length; i++) {
            var ch = lines[i].indexOf(target);
            if (ch != -1) {
                var from = { line: i, ch: ch };
                var to = { line: i, ch: ch + target.length };
                editor.replaceRange(replacement, from, to);
                break;
            }
        }
    };
    return imageAutoUploadPlugin;
}(obsidian.Plugin));

module.exports = imageAutoUploadPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5vZGVfbW9kdWxlcy9pc2V4ZS93aW5kb3dzLmpzIiwibm9kZV9tb2R1bGVzL2lzZXhlL21vZGUuanMiLCJub2RlX21vZHVsZXMvaXNleGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2hpY2gvd2hpY2guanMiLCJub2RlX21vZHVsZXMvcGF0aC1rZXkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY3Jvc3Mtc3Bhd24vbGliL3V0aWwvcmVzb2x2ZUNvbW1hbmQuanMiLCJub2RlX21vZHVsZXMvY3Jvc3Mtc3Bhd24vbGliL3V0aWwvZXNjYXBlLmpzIiwibm9kZV9tb2R1bGVzL3NoZWJhbmctcmVnZXgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc2hlYmFuZy1jb21tYW5kL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzLXNwYXduL2xpYi91dGlsL3JlYWRTaGViYW5nLmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzLXNwYXduL2xpYi9wYXJzZS5qcyIsIm5vZGVfbW9kdWxlcy9jcm9zcy1zcGF3bi9saWIvZW5vZW50LmpzIiwibm9kZV9tb2R1bGVzL2Nyb3NzLXNwYXduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3N0cmlwLWZpbmFsLW5ld2xpbmUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbnBtLXJ1bi1wYXRoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21pbWljLWZuL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29uZXRpbWUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaHVtYW4tc2lnbmFscy9idWlsZC9zcmMvY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9odW1hbi1zaWduYWxzL2J1aWxkL3NyYy9yZWFsdGltZS5qcyIsIm5vZGVfbW9kdWxlcy9odW1hbi1zaWduYWxzL2J1aWxkL3NyYy9zaWduYWxzLmpzIiwibm9kZV9tb2R1bGVzL2h1bWFuLXNpZ25hbHMvYnVpbGQvc3JjL21haW4uanMiLCJub2RlX21vZHVsZXMvZXhlY2EvbGliL2Vycm9yLmpzIiwibm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9zdGRpby5qcyIsIm5vZGVfbW9kdWxlcy9zaWduYWwtZXhpdC9zaWduYWxzLmpzIiwibm9kZV9tb2R1bGVzL3NpZ25hbC1leGl0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9raWxsLmpzIiwibm9kZV9tb2R1bGVzL2lzLXN0cmVhbS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9leGVjYS9ub2RlX21vZHVsZXMvZ2V0LXN0cmVhbS9idWZmZXItc3RyZWFtLmpzIiwibm9kZV9tb2R1bGVzL2V4ZWNhL25vZGVfbW9kdWxlcy9nZXQtc3RyZWFtL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL21lcmdlLXN0cmVhbS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9leGVjYS9saWIvc3RyZWFtLmpzIiwibm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2V4ZWNhL2xpYi9jb21tYW5kLmpzIiwibm9kZV9tb2R1bGVzL2V4ZWNhL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Fuc2ktcmVnZXgvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3RyaXAtYW5zaS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWZhdWx0LXNoZWxsL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NoZWxsLWVudi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaGVsbC1wYXRoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2ZpeC1wYXRoL2luZGV4LmpzIiwic3JjL3V0aWxzLnRzIiwic3JjL3VwbG9hZGVyLnRzIiwic3JjL2RlbGV0ZXIudHMiLCJzcmMvaGVscGVyLnRzIiwic3JjL2xhbmcvbG9jYWxlL2FyLnRzIiwic3JjL2xhbmcvbG9jYWxlL2N6LnRzIiwic3JjL2xhbmcvbG9jYWxlL2RhLnRzIiwic3JjL2xhbmcvbG9jYWxlL2RlLnRzIiwic3JjL2xhbmcvbG9jYWxlL2VuLnRzIiwic3JjL2xhbmcvbG9jYWxlL2VuLWdiLnRzIiwic3JjL2xhbmcvbG9jYWxlL2VzLnRzIiwic3JjL2xhbmcvbG9jYWxlL2ZyLnRzIiwic3JjL2xhbmcvbG9jYWxlL2hpLnRzIiwic3JjL2xhbmcvbG9jYWxlL2lkLnRzIiwic3JjL2xhbmcvbG9jYWxlL2l0LnRzIiwic3JjL2xhbmcvbG9jYWxlL2phLnRzIiwic3JjL2xhbmcvbG9jYWxlL2tvLnRzIiwic3JjL2xhbmcvbG9jYWxlL25sLnRzIiwic3JjL2xhbmcvbG9jYWxlL25vLnRzIiwic3JjL2xhbmcvbG9jYWxlL3BsLnRzIiwic3JjL2xhbmcvbG9jYWxlL3B0LnRzIiwic3JjL2xhbmcvbG9jYWxlL3B0LWJyLnRzIiwic3JjL2xhbmcvbG9jYWxlL3JvLnRzIiwic3JjL2xhbmcvbG9jYWxlL3J1LnRzIiwic3JjL2xhbmcvbG9jYWxlL3RyLnRzIiwic3JjL2xhbmcvbG9jYWxlL3poLWNuLnRzIiwic3JjL2xhbmcvbG9jYWxlL3poLXR3LnRzIiwic3JjL2xhbmcvaGVscGVycy50cyIsInNyYy9zZXR0aW5nLnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20pIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxyXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcclxuICAgIHJldHVybiB0bztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gaXNleGVcbmlzZXhlLnN5bmMgPSBzeW5jXG5cbnZhciBmcyA9IHJlcXVpcmUoJ2ZzJylcblxuZnVuY3Rpb24gY2hlY2tQYXRoRXh0IChwYXRoLCBvcHRpb25zKSB7XG4gIHZhciBwYXRoZXh0ID0gb3B0aW9ucy5wYXRoRXh0ICE9PSB1bmRlZmluZWQgP1xuICAgIG9wdGlvbnMucGF0aEV4dCA6IHByb2Nlc3MuZW52LlBBVEhFWFRcblxuICBpZiAoIXBhdGhleHQpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcGF0aGV4dCA9IHBhdGhleHQuc3BsaXQoJzsnKVxuICBpZiAocGF0aGV4dC5pbmRleE9mKCcnKSAhPT0gLTEpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aGV4dC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwID0gcGF0aGV4dFtpXS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKHAgJiYgcGF0aC5zdWJzdHIoLXAubGVuZ3RoKS50b0xvd2VyQ2FzZSgpID09PSBwKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gY2hlY2tTdGF0IChzdGF0LCBwYXRoLCBvcHRpb25zKSB7XG4gIGlmICghc3RhdC5pc1N5bWJvbGljTGluaygpICYmICFzdGF0LmlzRmlsZSgpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIGNoZWNrUGF0aEV4dChwYXRoLCBvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBpc2V4ZSAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgZnMuc3RhdChwYXRoLCBmdW5jdGlvbiAoZXIsIHN0YXQpIHtcbiAgICBjYihlciwgZXIgPyBmYWxzZSA6IGNoZWNrU3RhdChzdGF0LCBwYXRoLCBvcHRpb25zKSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gc3luYyAocGF0aCwgb3B0aW9ucykge1xuICByZXR1cm4gY2hlY2tTdGF0KGZzLnN0YXRTeW5jKHBhdGgpLCBwYXRoLCBvcHRpb25zKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpc2V4ZVxuaXNleGUuc3luYyA9IHN5bmNcblxudmFyIGZzID0gcmVxdWlyZSgnZnMnKVxuXG5mdW5jdGlvbiBpc2V4ZSAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgZnMuc3RhdChwYXRoLCBmdW5jdGlvbiAoZXIsIHN0YXQpIHtcbiAgICBjYihlciwgZXIgPyBmYWxzZSA6IGNoZWNrU3RhdChzdGF0LCBvcHRpb25zKSlcbiAgfSlcbn1cblxuZnVuY3Rpb24gc3luYyAocGF0aCwgb3B0aW9ucykge1xuICByZXR1cm4gY2hlY2tTdGF0KGZzLnN0YXRTeW5jKHBhdGgpLCBvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBjaGVja1N0YXQgKHN0YXQsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHN0YXQuaXNGaWxlKCkgJiYgY2hlY2tNb2RlKHN0YXQsIG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIGNoZWNrTW9kZSAoc3RhdCwgb3B0aW9ucykge1xuICB2YXIgbW9kID0gc3RhdC5tb2RlXG4gIHZhciB1aWQgPSBzdGF0LnVpZFxuICB2YXIgZ2lkID0gc3RhdC5naWRcblxuICB2YXIgbXlVaWQgPSBvcHRpb25zLnVpZCAhPT0gdW5kZWZpbmVkID9cbiAgICBvcHRpb25zLnVpZCA6IHByb2Nlc3MuZ2V0dWlkICYmIHByb2Nlc3MuZ2V0dWlkKClcbiAgdmFyIG15R2lkID0gb3B0aW9ucy5naWQgIT09IHVuZGVmaW5lZCA/XG4gICAgb3B0aW9ucy5naWQgOiBwcm9jZXNzLmdldGdpZCAmJiBwcm9jZXNzLmdldGdpZCgpXG5cbiAgdmFyIHUgPSBwYXJzZUludCgnMTAwJywgOClcbiAgdmFyIGcgPSBwYXJzZUludCgnMDEwJywgOClcbiAgdmFyIG8gPSBwYXJzZUludCgnMDAxJywgOClcbiAgdmFyIHVnID0gdSB8IGdcblxuICB2YXIgcmV0ID0gKG1vZCAmIG8pIHx8XG4gICAgKG1vZCAmIGcpICYmIGdpZCA9PT0gbXlHaWQgfHxcbiAgICAobW9kICYgdSkgJiYgdWlkID09PSBteVVpZCB8fFxuICAgIChtb2QgJiB1ZykgJiYgbXlVaWQgPT09IDBcblxuICByZXR1cm4gcmV0XG59XG4iLCJ2YXIgZnMgPSByZXF1aXJlKCdmcycpXG52YXIgY29yZVxuaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicgfHwgZ2xvYmFsLlRFU1RJTkdfV0lORE9XUykge1xuICBjb3JlID0gcmVxdWlyZSgnLi93aW5kb3dzLmpzJylcbn0gZWxzZSB7XG4gIGNvcmUgPSByZXF1aXJlKCcuL21vZGUuanMnKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzZXhlXG5pc2V4ZS5zeW5jID0gc3luY1xuXG5mdW5jdGlvbiBpc2V4ZSAocGF0aCwgb3B0aW9ucywgY2IpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2IgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICBpZiAoIWNiKSB7XG4gICAgaWYgKHR5cGVvZiBQcm9taXNlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdjYWxsYmFjayBub3QgcHJvdmlkZWQnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBpc2V4ZShwYXRoLCBvcHRpb25zIHx8IHt9LCBmdW5jdGlvbiAoZXIsIGlzKSB7XG4gICAgICAgIGlmIChlcikge1xuICAgICAgICAgIHJlamVjdChlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKGlzKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBjb3JlKHBhdGgsIG9wdGlvbnMgfHwge30sIGZ1bmN0aW9uIChlciwgaXMpIHtcbiAgICAvLyBpZ25vcmUgRUFDQ0VTIGJlY2F1c2UgdGhhdCBqdXN0IG1lYW5zIHdlIGFyZW4ndCBhbGxvd2VkIHRvIHJ1biBpdFxuICAgIGlmIChlcikge1xuICAgICAgaWYgKGVyLmNvZGUgPT09ICdFQUNDRVMnIHx8IG9wdGlvbnMgJiYgb3B0aW9ucy5pZ25vcmVFcnJvcnMpIHtcbiAgICAgICAgZXIgPSBudWxsXG4gICAgICAgIGlzID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgY2IoZXIsIGlzKVxuICB9KVxufVxuXG5mdW5jdGlvbiBzeW5jIChwYXRoLCBvcHRpb25zKSB7XG4gIC8vIG15IGtpbmdkb20gZm9yIGEgZmlsdGVyZWQgY2F0Y2hcbiAgdHJ5IHtcbiAgICByZXR1cm4gY29yZS5zeW5jKHBhdGgsIG9wdGlvbnMgfHwge30pXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5pZ25vcmVFcnJvcnMgfHwgZXIuY29kZSA9PT0gJ0VBQ0NFUycpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlclxuICAgIH1cbiAgfVxufVxuIiwiY29uc3QgaXNXaW5kb3dzID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJyB8fFxuICAgIHByb2Nlc3MuZW52Lk9TVFlQRSA9PT0gJ2N5Z3dpbicgfHxcbiAgICBwcm9jZXNzLmVudi5PU1RZUEUgPT09ICdtc3lzJ1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5jb25zdCBDT0xPTiA9IGlzV2luZG93cyA/ICc7JyA6ICc6J1xuY29uc3QgaXNleGUgPSByZXF1aXJlKCdpc2V4ZScpXG5cbmNvbnN0IGdldE5vdEZvdW5kRXJyb3IgPSAoY21kKSA9PlxuICBPYmplY3QuYXNzaWduKG5ldyBFcnJvcihgbm90IGZvdW5kOiAke2NtZH1gKSwgeyBjb2RlOiAnRU5PRU5UJyB9KVxuXG5jb25zdCBnZXRQYXRoSW5mbyA9IChjbWQsIG9wdCkgPT4ge1xuICBjb25zdCBjb2xvbiA9IG9wdC5jb2xvbiB8fCBDT0xPTlxuXG4gIC8vIElmIGl0IGhhcyBhIHNsYXNoLCB0aGVuIHdlIGRvbid0IGJvdGhlciBzZWFyY2hpbmcgdGhlIHBhdGhlbnYuXG4gIC8vIGp1c3QgY2hlY2sgdGhlIGZpbGUgaXRzZWxmLCBhbmQgdGhhdCdzIGl0LlxuICBjb25zdCBwYXRoRW52ID0gY21kLm1hdGNoKC9cXC8vKSB8fCBpc1dpbmRvd3MgJiYgY21kLm1hdGNoKC9cXFxcLykgPyBbJyddXG4gICAgOiAoXG4gICAgICBbXG4gICAgICAgIC8vIHdpbmRvd3MgYWx3YXlzIGNoZWNrcyB0aGUgY3dkIGZpcnN0XG4gICAgICAgIC4uLihpc1dpbmRvd3MgPyBbcHJvY2Vzcy5jd2QoKV0gOiBbXSksXG4gICAgICAgIC4uLihvcHQucGF0aCB8fCBwcm9jZXNzLmVudi5QQVRIIHx8XG4gICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHZlcnkgdW51c3VhbCAqLyAnJykuc3BsaXQoY29sb24pLFxuICAgICAgXVxuICAgIClcbiAgY29uc3QgcGF0aEV4dEV4ZSA9IGlzV2luZG93c1xuICAgID8gb3B0LnBhdGhFeHQgfHwgcHJvY2Vzcy5lbnYuUEFUSEVYVCB8fCAnLkVYRTsuQ01EOy5CQVQ7LkNPTSdcbiAgICA6ICcnXG4gIGNvbnN0IHBhdGhFeHQgPSBpc1dpbmRvd3MgPyBwYXRoRXh0RXhlLnNwbGl0KGNvbG9uKSA6IFsnJ11cblxuICBpZiAoaXNXaW5kb3dzKSB7XG4gICAgaWYgKGNtZC5pbmRleE9mKCcuJykgIT09IC0xICYmIHBhdGhFeHRbMF0gIT09ICcnKVxuICAgICAgcGF0aEV4dC51bnNoaWZ0KCcnKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRoRW52LFxuICAgIHBhdGhFeHQsXG4gICAgcGF0aEV4dEV4ZSxcbiAgfVxufVxuXG5jb25zdCB3aGljaCA9IChjbWQsIG9wdCwgY2IpID0+IHtcbiAgaWYgKHR5cGVvZiBvcHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYiA9IG9wdFxuICAgIG9wdCA9IHt9XG4gIH1cbiAgaWYgKCFvcHQpXG4gICAgb3B0ID0ge31cblxuICBjb25zdCB7IHBhdGhFbnYsIHBhdGhFeHQsIHBhdGhFeHRFeGUgfSA9IGdldFBhdGhJbmZvKGNtZCwgb3B0KVxuICBjb25zdCBmb3VuZCA9IFtdXG5cbiAgY29uc3Qgc3RlcCA9IGkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChpID09PSBwYXRoRW52Lmxlbmd0aClcbiAgICAgIHJldHVybiBvcHQuYWxsICYmIGZvdW5kLmxlbmd0aCA/IHJlc29sdmUoZm91bmQpXG4gICAgICAgIDogcmVqZWN0KGdldE5vdEZvdW5kRXJyb3IoY21kKSlcblxuICAgIGNvbnN0IHBwUmF3ID0gcGF0aEVudltpXVxuICAgIGNvbnN0IHBhdGhQYXJ0ID0gL15cIi4qXCIkLy50ZXN0KHBwUmF3KSA/IHBwUmF3LnNsaWNlKDEsIC0xKSA6IHBwUmF3XG5cbiAgICBjb25zdCBwQ21kID0gcGF0aC5qb2luKHBhdGhQYXJ0LCBjbWQpXG4gICAgY29uc3QgcCA9ICFwYXRoUGFydCAmJiAvXlxcLltcXFxcXFwvXS8udGVzdChjbWQpID8gY21kLnNsaWNlKDAsIDIpICsgcENtZFxuICAgICAgOiBwQ21kXG5cbiAgICByZXNvbHZlKHN1YlN0ZXAocCwgaSwgMCkpXG4gIH0pXG5cbiAgY29uc3Qgc3ViU3RlcCA9IChwLCBpLCBpaSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmIChpaSA9PT0gcGF0aEV4dC5sZW5ndGgpXG4gICAgICByZXR1cm4gcmVzb2x2ZShzdGVwKGkgKyAxKSlcbiAgICBjb25zdCBleHQgPSBwYXRoRXh0W2lpXVxuICAgIGlzZXhlKHAgKyBleHQsIHsgcGF0aEV4dDogcGF0aEV4dEV4ZSB9LCAoZXIsIGlzKSA9PiB7XG4gICAgICBpZiAoIWVyICYmIGlzKSB7XG4gICAgICAgIGlmIChvcHQuYWxsKVxuICAgICAgICAgIGZvdW5kLnB1c2gocCArIGV4dClcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJldHVybiByZXNvbHZlKHAgKyBleHQpXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzb2x2ZShzdWJTdGVwKHAsIGksIGlpICsgMSkpXG4gICAgfSlcbiAgfSlcblxuICByZXR1cm4gY2IgPyBzdGVwKDApLnRoZW4ocmVzID0+IGNiKG51bGwsIHJlcyksIGNiKSA6IHN0ZXAoMClcbn1cblxuY29uc3Qgd2hpY2hTeW5jID0gKGNtZCwgb3B0KSA9PiB7XG4gIG9wdCA9IG9wdCB8fCB7fVxuXG4gIGNvbnN0IHsgcGF0aEVudiwgcGF0aEV4dCwgcGF0aEV4dEV4ZSB9ID0gZ2V0UGF0aEluZm8oY21kLCBvcHQpXG4gIGNvbnN0IGZvdW5kID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhFbnYubGVuZ3RoOyBpICsrKSB7XG4gICAgY29uc3QgcHBSYXcgPSBwYXRoRW52W2ldXG4gICAgY29uc3QgcGF0aFBhcnQgPSAvXlwiLipcIiQvLnRlc3QocHBSYXcpID8gcHBSYXcuc2xpY2UoMSwgLTEpIDogcHBSYXdcblxuICAgIGNvbnN0IHBDbWQgPSBwYXRoLmpvaW4ocGF0aFBhcnQsIGNtZClcbiAgICBjb25zdCBwID0gIXBhdGhQYXJ0ICYmIC9eXFwuW1xcXFxcXC9dLy50ZXN0KGNtZCkgPyBjbWQuc2xpY2UoMCwgMikgKyBwQ21kXG4gICAgICA6IHBDbWRcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGF0aEV4dC5sZW5ndGg7IGogKyspIHtcbiAgICAgIGNvbnN0IGN1ciA9IHAgKyBwYXRoRXh0W2pdXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpcyA9IGlzZXhlLnN5bmMoY3VyLCB7IHBhdGhFeHQ6IHBhdGhFeHRFeGUgfSlcbiAgICAgICAgaWYgKGlzKSB7XG4gICAgICAgICAgaWYgKG9wdC5hbGwpXG4gICAgICAgICAgICBmb3VuZC5wdXNoKGN1cilcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gY3VyXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGV4KSB7fVxuICAgIH1cbiAgfVxuXG4gIGlmIChvcHQuYWxsICYmIGZvdW5kLmxlbmd0aClcbiAgICByZXR1cm4gZm91bmRcblxuICBpZiAob3B0Lm5vdGhyb3cpXG4gICAgcmV0dXJuIG51bGxcblxuICB0aHJvdyBnZXROb3RGb3VuZEVycm9yKGNtZClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3aGljaFxud2hpY2guc3luYyA9IHdoaWNoU3luY1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBwYXRoS2V5ID0gKG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRjb25zdCBlbnZpcm9ubWVudCA9IG9wdGlvbnMuZW52IHx8IHByb2Nlc3MuZW52O1xuXHRjb25zdCBwbGF0Zm9ybSA9IG9wdGlvbnMucGxhdGZvcm0gfHwgcHJvY2Vzcy5wbGF0Zm9ybTtcblxuXHRpZiAocGxhdGZvcm0gIT09ICd3aW4zMicpIHtcblx0XHRyZXR1cm4gJ1BBVEgnO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdC5rZXlzKGVudmlyb25tZW50KS5yZXZlcnNlKCkuZmluZChrZXkgPT4ga2V5LnRvVXBwZXJDYXNlKCkgPT09ICdQQVRIJykgfHwgJ1BhdGgnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoS2V5O1xuLy8gVE9ETzogUmVtb3ZlIHRoaXMgZm9yIHRoZSBuZXh0IG1ham9yIHJlbGVhc2Vcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBwYXRoS2V5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3Qgd2hpY2ggPSByZXF1aXJlKCd3aGljaCcpO1xuY29uc3QgZ2V0UGF0aEtleSA9IHJlcXVpcmUoJ3BhdGgta2V5Jyk7XG5cbmZ1bmN0aW9uIHJlc29sdmVDb21tYW5kQXR0ZW1wdChwYXJzZWQsIHdpdGhvdXRQYXRoRXh0KSB7XG4gICAgY29uc3QgZW52ID0gcGFyc2VkLm9wdGlvbnMuZW52IHx8IHByb2Nlc3MuZW52O1xuICAgIGNvbnN0IGN3ZCA9IHByb2Nlc3MuY3dkKCk7XG4gICAgY29uc3QgaGFzQ3VzdG9tQ3dkID0gcGFyc2VkLm9wdGlvbnMuY3dkICE9IG51bGw7XG4gICAgLy8gV29ya2VyIHRocmVhZHMgZG8gbm90IGhhdmUgcHJvY2Vzcy5jaGRpcigpXG4gICAgY29uc3Qgc2hvdWxkU3dpdGNoQ3dkID0gaGFzQ3VzdG9tQ3dkICYmIHByb2Nlc3MuY2hkaXIgIT09IHVuZGVmaW5lZCAmJiAhcHJvY2Vzcy5jaGRpci5kaXNhYmxlZDtcblxuICAgIC8vIElmIGEgY3VzdG9tIGBjd2RgIHdhcyBzcGVjaWZpZWQsIHdlIG5lZWQgdG8gY2hhbmdlIHRoZSBwcm9jZXNzIGN3ZFxuICAgIC8vIGJlY2F1c2UgYHdoaWNoYCB3aWxsIGRvIHN0YXQgY2FsbHMgYnV0IGRvZXMgbm90IHN1cHBvcnQgYSBjdXN0b20gY3dkXG4gICAgaWYgKHNob3VsZFN3aXRjaEN3ZCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHJvY2Vzcy5jaGRpcihwYXJzZWQub3B0aW9ucy5jd2QpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8qIEVtcHR5ICovXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZWQ7XG5cbiAgICB0cnkge1xuICAgICAgICByZXNvbHZlZCA9IHdoaWNoLnN5bmMocGFyc2VkLmNvbW1hbmQsIHtcbiAgICAgICAgICAgIHBhdGg6IGVudltnZXRQYXRoS2V5KHsgZW52IH0pXSxcbiAgICAgICAgICAgIHBhdGhFeHQ6IHdpdGhvdXRQYXRoRXh0ID8gcGF0aC5kZWxpbWl0ZXIgOiB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLyogRW1wdHkgKi9cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoc2hvdWxkU3dpdGNoQ3dkKSB7XG4gICAgICAgICAgICBwcm9jZXNzLmNoZGlyKGN3ZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBzdWNjZXNzZnVsbHkgcmVzb2x2ZWQsIGVuc3VyZSB0aGF0IGFuIGFic29sdXRlIHBhdGggaXMgcmV0dXJuZWRcbiAgICAvLyBOb3RlIHRoYXQgd2hlbiBhIGN1c3RvbSBgY3dkYCB3YXMgdXNlZCwgd2UgbmVlZCB0byByZXNvbHZlIHRvIGFuIGFic29sdXRlIHBhdGggYmFzZWQgb24gaXRcbiAgICBpZiAocmVzb2x2ZWQpIHtcbiAgICAgICAgcmVzb2x2ZWQgPSBwYXRoLnJlc29sdmUoaGFzQ3VzdG9tQ3dkID8gcGFyc2VkLm9wdGlvbnMuY3dkIDogJycsIHJlc29sdmVkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzb2x2ZWQ7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVDb21tYW5kKHBhcnNlZCkge1xuICAgIHJldHVybiByZXNvbHZlQ29tbWFuZEF0dGVtcHQocGFyc2VkKSB8fCByZXNvbHZlQ29tbWFuZEF0dGVtcHQocGFyc2VkLCB0cnVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXNvbHZlQ29tbWFuZDtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gU2VlIGh0dHA6Ly93d3cucm9idmFuZGVyd291ZGUuY29tL2VzY2FwZWNoYXJzLnBocFxuY29uc3QgbWV0YUNoYXJzUmVnRXhwID0gLyhbKClcXF1bJSFeXCJgPD4mfDssICo/XSkvZztcblxuZnVuY3Rpb24gZXNjYXBlQ29tbWFuZChhcmcpIHtcbiAgICAvLyBFc2NhcGUgbWV0YSBjaGFyc1xuICAgIGFyZyA9IGFyZy5yZXBsYWNlKG1ldGFDaGFyc1JlZ0V4cCwgJ14kMScpO1xuXG4gICAgcmV0dXJuIGFyZztcbn1cblxuZnVuY3Rpb24gZXNjYXBlQXJndW1lbnQoYXJnLCBkb3VibGVFc2NhcGVNZXRhQ2hhcnMpIHtcbiAgICAvLyBDb252ZXJ0IHRvIHN0cmluZ1xuICAgIGFyZyA9IGAke2FyZ31gO1xuXG4gICAgLy8gQWxnb3JpdGhtIGJlbG93IGlzIGJhc2VkIG9uIGh0dHBzOi8vcW50bS5vcmcvY21kXG5cbiAgICAvLyBTZXF1ZW5jZSBvZiBiYWNrc2xhc2hlcyBmb2xsb3dlZCBieSBhIGRvdWJsZSBxdW90ZTpcbiAgICAvLyBkb3VibGUgdXAgYWxsIHRoZSBiYWNrc2xhc2hlcyBhbmQgZXNjYXBlIHRoZSBkb3VibGUgcXVvdGVcbiAgICBhcmcgPSBhcmcucmVwbGFjZSgvKFxcXFwqKVwiL2csICckMSQxXFxcXFwiJyk7XG5cbiAgICAvLyBTZXF1ZW5jZSBvZiBiYWNrc2xhc2hlcyBmb2xsb3dlZCBieSB0aGUgZW5kIG9mIHRoZSBzdHJpbmdcbiAgICAvLyAod2hpY2ggd2lsbCBiZWNvbWUgYSBkb3VibGUgcXVvdGUgbGF0ZXIpOlxuICAgIC8vIGRvdWJsZSB1cCBhbGwgdGhlIGJhY2tzbGFzaGVzXG4gICAgYXJnID0gYXJnLnJlcGxhY2UoLyhcXFxcKikkLywgJyQxJDEnKTtcblxuICAgIC8vIEFsbCBvdGhlciBiYWNrc2xhc2hlcyBvY2N1ciBsaXRlcmFsbHlcblxuICAgIC8vIFF1b3RlIHRoZSB3aG9sZSB0aGluZzpcbiAgICBhcmcgPSBgXCIke2FyZ31cImA7XG5cbiAgICAvLyBFc2NhcGUgbWV0YSBjaGFyc1xuICAgIGFyZyA9IGFyZy5yZXBsYWNlKG1ldGFDaGFyc1JlZ0V4cCwgJ14kMScpO1xuXG4gICAgLy8gRG91YmxlIGVzY2FwZSBtZXRhIGNoYXJzIGlmIG5lY2Vzc2FyeVxuICAgIGlmIChkb3VibGVFc2NhcGVNZXRhQ2hhcnMpIHtcbiAgICAgICAgYXJnID0gYXJnLnJlcGxhY2UobWV0YUNoYXJzUmVnRXhwLCAnXiQxJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZztcbn1cblxubW9kdWxlLmV4cG9ydHMuY29tbWFuZCA9IGVzY2FwZUNvbW1hbmQ7XG5tb2R1bGUuZXhwb3J0cy5hcmd1bWVudCA9IGVzY2FwZUFyZ3VtZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAvXiMhKC4qKS87XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBzaGViYW5nUmVnZXggPSByZXF1aXJlKCdzaGViYW5nLXJlZ2V4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHN0cmluZyA9ICcnKSA9PiB7XG5cdGNvbnN0IG1hdGNoID0gc3RyaW5nLm1hdGNoKHNoZWJhbmdSZWdleCk7XG5cblx0aWYgKCFtYXRjaCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Y29uc3QgW3BhdGgsIGFyZ3VtZW50XSA9IG1hdGNoWzBdLnJlcGxhY2UoLyMhID8vLCAnJykuc3BsaXQoJyAnKTtcblx0Y29uc3QgYmluYXJ5ID0gcGF0aC5zcGxpdCgnLycpLnBvcCgpO1xuXG5cdGlmIChiaW5hcnkgPT09ICdlbnYnKSB7XG5cdFx0cmV0dXJuIGFyZ3VtZW50O1xuXHR9XG5cblx0cmV0dXJuIGFyZ3VtZW50ID8gYCR7YmluYXJ5fSAke2FyZ3VtZW50fWAgOiBiaW5hcnk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBzaGViYW5nQ29tbWFuZCA9IHJlcXVpcmUoJ3NoZWJhbmctY29tbWFuZCcpO1xuXG5mdW5jdGlvbiByZWFkU2hlYmFuZyhjb21tYW5kKSB7XG4gICAgLy8gUmVhZCB0aGUgZmlyc3QgMTUwIGJ5dGVzIGZyb20gdGhlIGZpbGVcbiAgICBjb25zdCBzaXplID0gMTUwO1xuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5hbGxvYyhzaXplKTtcblxuICAgIGxldCBmZDtcblxuICAgIHRyeSB7XG4gICAgICAgIGZkID0gZnMub3BlblN5bmMoY29tbWFuZCwgJ3InKTtcbiAgICAgICAgZnMucmVhZFN5bmMoZmQsIGJ1ZmZlciwgMCwgc2l6ZSwgMCk7XG4gICAgICAgIGZzLmNsb3NlU3luYyhmZCk7XG4gICAgfSBjYXRjaCAoZSkgeyAvKiBFbXB0eSAqLyB9XG5cbiAgICAvLyBBdHRlbXB0IHRvIGV4dHJhY3Qgc2hlYmFuZyAobnVsbCBpcyByZXR1cm5lZCBpZiBub3QgYSBzaGViYW5nKVxuICAgIHJldHVybiBzaGViYW5nQ29tbWFuZChidWZmZXIudG9TdHJpbmcoKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVhZFNoZWJhbmc7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCByZXNvbHZlQ29tbWFuZCA9IHJlcXVpcmUoJy4vdXRpbC9yZXNvbHZlQ29tbWFuZCcpO1xuY29uc3QgZXNjYXBlID0gcmVxdWlyZSgnLi91dGlsL2VzY2FwZScpO1xuY29uc3QgcmVhZFNoZWJhbmcgPSByZXF1aXJlKCcuL3V0aWwvcmVhZFNoZWJhbmcnKTtcblxuY29uc3QgaXNXaW4gPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInO1xuY29uc3QgaXNFeGVjdXRhYmxlUmVnRXhwID0gL1xcLig/OmNvbXxleGUpJC9pO1xuY29uc3QgaXNDbWRTaGltUmVnRXhwID0gL25vZGVfbW9kdWxlc1tcXFxcL10uYmluW1xcXFwvXVteXFxcXC9dK1xcLmNtZCQvaTtcblxuZnVuY3Rpb24gZGV0ZWN0U2hlYmFuZyhwYXJzZWQpIHtcbiAgICBwYXJzZWQuZmlsZSA9IHJlc29sdmVDb21tYW5kKHBhcnNlZCk7XG5cbiAgICBjb25zdCBzaGViYW5nID0gcGFyc2VkLmZpbGUgJiYgcmVhZFNoZWJhbmcocGFyc2VkLmZpbGUpO1xuXG4gICAgaWYgKHNoZWJhbmcpIHtcbiAgICAgICAgcGFyc2VkLmFyZ3MudW5zaGlmdChwYXJzZWQuZmlsZSk7XG4gICAgICAgIHBhcnNlZC5jb21tYW5kID0gc2hlYmFuZztcblxuICAgICAgICByZXR1cm4gcmVzb2x2ZUNvbW1hbmQocGFyc2VkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VkLmZpbGU7XG59XG5cbmZ1bmN0aW9uIHBhcnNlTm9uU2hlbGwocGFyc2VkKSB7XG4gICAgaWYgKCFpc1dpbikge1xuICAgICAgICByZXR1cm4gcGFyc2VkO1xuICAgIH1cblxuICAgIC8vIERldGVjdCAmIGFkZCBzdXBwb3J0IGZvciBzaGViYW5nc1xuICAgIGNvbnN0IGNvbW1hbmRGaWxlID0gZGV0ZWN0U2hlYmFuZyhwYXJzZWQpO1xuXG4gICAgLy8gV2UgZG9uJ3QgbmVlZCBhIHNoZWxsIGlmIHRoZSBjb21tYW5kIGZpbGVuYW1lIGlzIGFuIGV4ZWN1dGFibGVcbiAgICBjb25zdCBuZWVkc1NoZWxsID0gIWlzRXhlY3V0YWJsZVJlZ0V4cC50ZXN0KGNvbW1hbmRGaWxlKTtcblxuICAgIC8vIElmIGEgc2hlbGwgaXMgcmVxdWlyZWQsIHVzZSBjbWQuZXhlIGFuZCB0YWtlIGNhcmUgb2YgZXNjYXBpbmcgZXZlcnl0aGluZyBjb3JyZWN0bHlcbiAgICAvLyBOb3RlIHRoYXQgYGZvcmNlU2hlbGxgIGlzIGFuIGhpZGRlbiBvcHRpb24gdXNlZCBvbmx5IGluIHRlc3RzXG4gICAgaWYgKHBhcnNlZC5vcHRpb25zLmZvcmNlU2hlbGwgfHwgbmVlZHNTaGVsbCkge1xuICAgICAgICAvLyBOZWVkIHRvIGRvdWJsZSBlc2NhcGUgbWV0YSBjaGFycyBpZiB0aGUgY29tbWFuZCBpcyBhIGNtZC1zaGltIGxvY2F0ZWQgaW4gYG5vZGVfbW9kdWxlcy8uYmluL2BcbiAgICAgICAgLy8gVGhlIGNtZC1zaGltIHNpbXBseSBjYWxscyBleGVjdXRlIHRoZSBwYWNrYWdlIGJpbiBmaWxlIHdpdGggTm9kZUpTLCBwcm94eWluZyBhbnkgYXJndW1lbnRcbiAgICAgICAgLy8gQmVjYXVzZSB0aGUgZXNjYXBlIG9mIG1ldGFjaGFycyB3aXRoIF4gZ2V0cyBpbnRlcnByZXRlZCB3aGVuIHRoZSBjbWQuZXhlIGlzIGZpcnN0IGNhbGxlZCxcbiAgICAgICAgLy8gd2UgbmVlZCB0byBkb3VibGUgZXNjYXBlIHRoZW1cbiAgICAgICAgY29uc3QgbmVlZHNEb3VibGVFc2NhcGVNZXRhQ2hhcnMgPSBpc0NtZFNoaW1SZWdFeHAudGVzdChjb21tYW5kRmlsZSk7XG5cbiAgICAgICAgLy8gTm9ybWFsaXplIHBvc2l4IHBhdGhzIGludG8gT1MgY29tcGF0aWJsZSBwYXRocyAoZS5nLjogZm9vL2JhciAtPiBmb29cXGJhcilcbiAgICAgICAgLy8gVGhpcyBpcyBuZWNlc3Nhcnkgb3RoZXJ3aXNlIGl0IHdpbGwgYWx3YXlzIGZhaWwgd2l0aCBFTk9FTlQgaW4gdGhvc2UgY2FzZXNcbiAgICAgICAgcGFyc2VkLmNvbW1hbmQgPSBwYXRoLm5vcm1hbGl6ZShwYXJzZWQuY29tbWFuZCk7XG5cbiAgICAgICAgLy8gRXNjYXBlIGNvbW1hbmQgJiBhcmd1bWVudHNcbiAgICAgICAgcGFyc2VkLmNvbW1hbmQgPSBlc2NhcGUuY29tbWFuZChwYXJzZWQuY29tbWFuZCk7XG4gICAgICAgIHBhcnNlZC5hcmdzID0gcGFyc2VkLmFyZ3MubWFwKChhcmcpID0+IGVzY2FwZS5hcmd1bWVudChhcmcsIG5lZWRzRG91YmxlRXNjYXBlTWV0YUNoYXJzKSk7XG5cbiAgICAgICAgY29uc3Qgc2hlbGxDb21tYW5kID0gW3BhcnNlZC5jb21tYW5kXS5jb25jYXQocGFyc2VkLmFyZ3MpLmpvaW4oJyAnKTtcblxuICAgICAgICBwYXJzZWQuYXJncyA9IFsnL2QnLCAnL3MnLCAnL2MnLCBgXCIke3NoZWxsQ29tbWFuZH1cImBdO1xuICAgICAgICBwYXJzZWQuY29tbWFuZCA9IHByb2Nlc3MuZW52LmNvbXNwZWMgfHwgJ2NtZC5leGUnO1xuICAgICAgICBwYXJzZWQub3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMgPSB0cnVlOyAvLyBUZWxsIG5vZGUncyBzcGF3biB0aGF0IHRoZSBhcmd1bWVudHMgYXJlIGFscmVhZHkgZXNjYXBlZFxuICAgIH1cblxuICAgIHJldHVybiBwYXJzZWQ7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICAvLyBOb3JtYWxpemUgYXJndW1lbnRzLCBzaW1pbGFyIHRvIG5vZGVqc1xuICAgIGlmIChhcmdzICYmICFBcnJheS5pc0FycmF5KGFyZ3MpKSB7XG4gICAgICAgIG9wdGlvbnMgPSBhcmdzO1xuICAgICAgICBhcmdzID0gbnVsbDtcbiAgICB9XG5cbiAgICBhcmdzID0gYXJncyA/IGFyZ3Muc2xpY2UoMCkgOiBbXTsgLy8gQ2xvbmUgYXJyYXkgdG8gYXZvaWQgY2hhbmdpbmcgdGhlIG9yaWdpbmFsXG4gICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpOyAvLyBDbG9uZSBvYmplY3QgdG8gYXZvaWQgY2hhbmdpbmcgdGhlIG9yaWdpbmFsXG5cbiAgICAvLyBCdWlsZCBvdXIgcGFyc2VkIG9iamVjdFxuICAgIGNvbnN0IHBhcnNlZCA9IHtcbiAgICAgICAgY29tbWFuZCxcbiAgICAgICAgYXJncyxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgZmlsZTogdW5kZWZpbmVkLFxuICAgICAgICBvcmlnaW5hbDoge1xuICAgICAgICAgICAgY29tbWFuZCxcbiAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIC8vIERlbGVnYXRlIGZ1cnRoZXIgcGFyc2luZyB0byBzaGVsbCBvciBub24tc2hlbGxcbiAgICByZXR1cm4gb3B0aW9ucy5zaGVsbCA/IHBhcnNlZCA6IHBhcnNlTm9uU2hlbGwocGFyc2VkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgaXNXaW4gPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInO1xuXG5mdW5jdGlvbiBub3RGb3VuZEVycm9yKG9yaWdpbmFsLCBzeXNjYWxsKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IEVycm9yKGAke3N5c2NhbGx9ICR7b3JpZ2luYWwuY29tbWFuZH0gRU5PRU5UYCksIHtcbiAgICAgICAgY29kZTogJ0VOT0VOVCcsXG4gICAgICAgIGVycm5vOiAnRU5PRU5UJyxcbiAgICAgICAgc3lzY2FsbDogYCR7c3lzY2FsbH0gJHtvcmlnaW5hbC5jb21tYW5kfWAsXG4gICAgICAgIHBhdGg6IG9yaWdpbmFsLmNvbW1hbmQsXG4gICAgICAgIHNwYXduYXJnczogb3JpZ2luYWwuYXJncyxcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaG9va0NoaWxkUHJvY2VzcyhjcCwgcGFyc2VkKSB7XG4gICAgaWYgKCFpc1dpbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb3JpZ2luYWxFbWl0ID0gY3AuZW1pdDtcblxuICAgIGNwLmVtaXQgPSBmdW5jdGlvbiAobmFtZSwgYXJnMSkge1xuICAgICAgICAvLyBJZiBlbWl0dGluZyBcImV4aXRcIiBldmVudCBhbmQgZXhpdCBjb2RlIGlzIDEsIHdlIG5lZWQgdG8gY2hlY2sgaWZcbiAgICAgICAgLy8gdGhlIGNvbW1hbmQgZXhpc3RzIGFuZCBlbWl0IGFuIFwiZXJyb3JcIiBpbnN0ZWFkXG4gICAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vSW5kaWdvVW5pdGVkL25vZGUtY3Jvc3Mtc3Bhd24vaXNzdWVzLzE2XG4gICAgICAgIGlmIChuYW1lID09PSAnZXhpdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IHZlcmlmeUVOT0VOVChhcmcxLCBwYXJzZWQsICdzcGF3bicpO1xuXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRW1pdC5jYWxsKGNwLCAnZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsRW1pdC5hcHBseShjcCwgYXJndW1lbnRzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcbiAgICB9O1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlFTk9FTlQoc3RhdHVzLCBwYXJzZWQpIHtcbiAgICBpZiAoaXNXaW4gJiYgc3RhdHVzID09PSAxICYmICFwYXJzZWQuZmlsZSkge1xuICAgICAgICByZXR1cm4gbm90Rm91bmRFcnJvcihwYXJzZWQub3JpZ2luYWwsICdzcGF3bicpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlFTk9FTlRTeW5jKHN0YXR1cywgcGFyc2VkKSB7XG4gICAgaWYgKGlzV2luICYmIHN0YXR1cyA9PT0gMSAmJiAhcGFyc2VkLmZpbGUpIHtcbiAgICAgICAgcmV0dXJuIG5vdEZvdW5kRXJyb3IocGFyc2VkLm9yaWdpbmFsLCAnc3Bhd25TeW5jJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGhvb2tDaGlsZFByb2Nlc3MsXG4gICAgdmVyaWZ5RU5PRU5ULFxuICAgIHZlcmlmeUVOT0VOVFN5bmMsXG4gICAgbm90Rm91bmRFcnJvcixcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNwID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpO1xuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL2xpYi9wYXJzZScpO1xuY29uc3QgZW5vZW50ID0gcmVxdWlyZSgnLi9saWIvZW5vZW50Jyk7XG5cbmZ1bmN0aW9uIHNwYXduKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICAvLyBQYXJzZSB0aGUgYXJndW1lbnRzXG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2UoY29tbWFuZCwgYXJncywgb3B0aW9ucyk7XG5cbiAgICAvLyBTcGF3biB0aGUgY2hpbGQgcHJvY2Vzc1xuICAgIGNvbnN0IHNwYXduZWQgPSBjcC5zcGF3bihwYXJzZWQuY29tbWFuZCwgcGFyc2VkLmFyZ3MsIHBhcnNlZC5vcHRpb25zKTtcblxuICAgIC8vIEhvb2sgaW50byBjaGlsZCBwcm9jZXNzIFwiZXhpdFwiIGV2ZW50IHRvIGVtaXQgYW4gZXJyb3IgaWYgdGhlIGNvbW1hbmRcbiAgICAvLyBkb2VzIG5vdCBleGlzdHMsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL0luZGlnb1VuaXRlZC9ub2RlLWNyb3NzLXNwYXduL2lzc3Vlcy8xNlxuICAgIGVub2VudC5ob29rQ2hpbGRQcm9jZXNzKHNwYXduZWQsIHBhcnNlZCk7XG5cbiAgICByZXR1cm4gc3Bhd25lZDtcbn1cblxuZnVuY3Rpb24gc3Bhd25TeW5jKGNvbW1hbmQsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICAvLyBQYXJzZSB0aGUgYXJndW1lbnRzXG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2UoY29tbWFuZCwgYXJncywgb3B0aW9ucyk7XG5cbiAgICAvLyBTcGF3biB0aGUgY2hpbGQgcHJvY2Vzc1xuICAgIGNvbnN0IHJlc3VsdCA9IGNwLnNwYXduU3luYyhwYXJzZWQuY29tbWFuZCwgcGFyc2VkLmFyZ3MsIHBhcnNlZC5vcHRpb25zKTtcblxuICAgIC8vIEFuYWx5emUgaWYgdGhlIGNvbW1hbmQgZG9lcyBub3QgZXhpc3QsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL0luZGlnb1VuaXRlZC9ub2RlLWNyb3NzLXNwYXduL2lzc3Vlcy8xNlxuICAgIHJlc3VsdC5lcnJvciA9IHJlc3VsdC5lcnJvciB8fCBlbm9lbnQudmVyaWZ5RU5PRU5UU3luYyhyZXN1bHQuc3RhdHVzLCBwYXJzZWQpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzcGF3bjtcbm1vZHVsZS5leHBvcnRzLnNwYXduID0gc3Bhd247XG5tb2R1bGUuZXhwb3J0cy5zeW5jID0gc3Bhd25TeW5jO1xuXG5tb2R1bGUuZXhwb3J0cy5fcGFyc2UgPSBwYXJzZTtcbm1vZHVsZS5leHBvcnRzLl9lbm9lbnQgPSBlbm9lbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaW5wdXQgPT4ge1xuXHRjb25zdCBMRiA9IHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgPyAnXFxuJyA6ICdcXG4nLmNoYXJDb2RlQXQoKTtcblx0Y29uc3QgQ1IgPSB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnID8gJ1xccicgOiAnXFxyJy5jaGFyQ29kZUF0KCk7XG5cblx0aWYgKGlucHV0W2lucHV0Lmxlbmd0aCAtIDFdID09PSBMRikge1xuXHRcdGlucHV0ID0gaW5wdXQuc2xpY2UoMCwgaW5wdXQubGVuZ3RoIC0gMSk7XG5cdH1cblxuXHRpZiAoaW5wdXRbaW5wdXQubGVuZ3RoIC0gMV0gPT09IENSKSB7XG5cdFx0aW5wdXQgPSBpbnB1dC5zbGljZSgwLCBpbnB1dC5sZW5ndGggLSAxKTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgcGF0aEtleSA9IHJlcXVpcmUoJ3BhdGgta2V5Jyk7XG5cbmNvbnN0IG5wbVJ1blBhdGggPSBvcHRpb25zID0+IHtcblx0b3B0aW9ucyA9IHtcblx0XHRjd2Q6IHByb2Nlc3MuY3dkKCksXG5cdFx0cGF0aDogcHJvY2Vzcy5lbnZbcGF0aEtleSgpXSxcblx0XHRleGVjUGF0aDogcHJvY2Vzcy5leGVjUGF0aCxcblx0XHQuLi5vcHRpb25zXG5cdH07XG5cblx0bGV0IHByZXZpb3VzO1xuXHRsZXQgY3dkUGF0aCA9IHBhdGgucmVzb2x2ZShvcHRpb25zLmN3ZCk7XG5cdGNvbnN0IHJlc3VsdCA9IFtdO1xuXG5cdHdoaWxlIChwcmV2aW91cyAhPT0gY3dkUGF0aCkge1xuXHRcdHJlc3VsdC5wdXNoKHBhdGguam9pbihjd2RQYXRoLCAnbm9kZV9tb2R1bGVzLy5iaW4nKSk7XG5cdFx0cHJldmlvdXMgPSBjd2RQYXRoO1xuXHRcdGN3ZFBhdGggPSBwYXRoLnJlc29sdmUoY3dkUGF0aCwgJy4uJyk7XG5cdH1cblxuXHQvLyBFbnN1cmUgdGhlIHJ1bm5pbmcgYG5vZGVgIGJpbmFyeSBpcyB1c2VkXG5cdGNvbnN0IGV4ZWNQYXRoRGlyID0gcGF0aC5yZXNvbHZlKG9wdGlvbnMuY3dkLCBvcHRpb25zLmV4ZWNQYXRoLCAnLi4nKTtcblx0cmVzdWx0LnB1c2goZXhlY1BhdGhEaXIpO1xuXG5cdHJldHVybiByZXN1bHQuY29uY2F0KG9wdGlvbnMucGF0aCkuam9pbihwYXRoLmRlbGltaXRlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5wbVJ1blBhdGg7XG4vLyBUT0RPOiBSZW1vdmUgdGhpcyBmb3IgdGhlIG5leHQgbWFqb3IgcmVsZWFzZVxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IG5wbVJ1blBhdGg7XG5cbm1vZHVsZS5leHBvcnRzLmVudiA9IG9wdGlvbnMgPT4ge1xuXHRvcHRpb25zID0ge1xuXHRcdGVudjogcHJvY2Vzcy5lbnYsXG5cdFx0Li4ub3B0aW9uc1xuXHR9O1xuXG5cdGNvbnN0IGVudiA9IHsuLi5vcHRpb25zLmVudn07XG5cdGNvbnN0IHBhdGggPSBwYXRoS2V5KHtlbnZ9KTtcblxuXHRvcHRpb25zLnBhdGggPSBlbnZbcGF0aF07XG5cdGVudltwYXRoXSA9IG1vZHVsZS5leHBvcnRzKG9wdGlvbnMpO1xuXG5cdHJldHVybiBlbnY7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBtaW1pY0ZuID0gKHRvLCBmcm9tKSA9PiB7XG5cdGZvciAoY29uc3QgcHJvcCBvZiBSZWZsZWN0Lm93bktleXMoZnJvbSkpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodG8sIHByb3AsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZnJvbSwgcHJvcCkpO1xuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtaW1pY0ZuO1xuLy8gVE9ETzogUmVtb3ZlIHRoaXMgZm9yIHRoZSBuZXh0IG1ham9yIHJlbGVhc2Vcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtaW1pY0ZuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgbWltaWNGbiA9IHJlcXVpcmUoJ21pbWljLWZuJyk7XG5cbmNvbnN0IGNhbGxlZEZ1bmN0aW9ucyA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IG9uZXRpbWUgPSAoZnVuY3Rpb25fLCBvcHRpb25zID0ge30pID0+IHtcblx0aWYgKHR5cGVvZiBmdW5jdGlvbl8gIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIGZ1bmN0aW9uJyk7XG5cdH1cblxuXHRsZXQgcmV0dXJuVmFsdWU7XG5cdGxldCBjYWxsQ291bnQgPSAwO1xuXHRjb25zdCBmdW5jdGlvbk5hbWUgPSBmdW5jdGlvbl8uZGlzcGxheU5hbWUgfHwgZnVuY3Rpb25fLm5hbWUgfHwgJzxhbm9ueW1vdXM+JztcblxuXHRjb25zdCBvbmV0aW1lID0gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRjYWxsZWRGdW5jdGlvbnMuc2V0KG9uZXRpbWUsICsrY2FsbENvdW50KTtcblxuXHRcdGlmIChjYWxsQ291bnQgPT09IDEpIHtcblx0XHRcdHJldHVyblZhbHVlID0gZnVuY3Rpb25fLmFwcGx5KHRoaXMsIGFyZ3VtZW50c18pO1xuXHRcdFx0ZnVuY3Rpb25fID0gbnVsbDtcblx0XHR9IGVsc2UgaWYgKG9wdGlvbnMudGhyb3cgPT09IHRydWUpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRnVuY3Rpb24gXFxgJHtmdW5jdGlvbk5hbWV9XFxgIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlYCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldHVyblZhbHVlO1xuXHR9O1xuXG5cdG1pbWljRm4ob25ldGltZSwgZnVuY3Rpb25fKTtcblx0Y2FsbGVkRnVuY3Rpb25zLnNldChvbmV0aW1lLCBjYWxsQ291bnQpO1xuXG5cdHJldHVybiBvbmV0aW1lO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBvbmV0aW1lO1xuLy8gVE9ETzogUmVtb3ZlIHRoaXMgZm9yIHRoZSBuZXh0IG1ham9yIHJlbGVhc2Vcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBvbmV0aW1lO1xuXG5tb2R1bGUuZXhwb3J0cy5jYWxsQ291bnQgPSBmdW5jdGlvbl8gPT4ge1xuXHRpZiAoIWNhbGxlZEZ1bmN0aW9ucy5oYXMoZnVuY3Rpb25fKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgVGhlIGdpdmVuIGZ1bmN0aW9uIFxcYCR7ZnVuY3Rpb25fLm5hbWV9XFxgIGlzIG5vdCB3cmFwcGVkIGJ5IHRoZSBcXGBvbmV0aW1lXFxgIHBhY2thZ2VgKTtcblx0fVxuXG5cdHJldHVybiBjYWxsZWRGdW5jdGlvbnMuZ2V0KGZ1bmN0aW9uXyk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLlNJR05BTFM9dm9pZCAwO1xuXG5jb25zdCBTSUdOQUxTPVtcbntcbm5hbWU6XCJTSUdIVVBcIixcbm51bWJlcjoxLFxuYWN0aW9uOlwidGVybWluYXRlXCIsXG5kZXNjcmlwdGlvbjpcIlRlcm1pbmFsIGNsb3NlZFwiLFxuc3RhbmRhcmQ6XCJwb3NpeFwifSxcblxue1xubmFtZTpcIlNJR0lOVFwiLFxubnVtYmVyOjIsXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiVXNlciBpbnRlcnJ1cHRpb24gd2l0aCBDVFJMLUNcIixcbnN0YW5kYXJkOlwiYW5zaVwifSxcblxue1xubmFtZTpcIlNJR1FVSVRcIixcbm51bWJlcjozLFxuYWN0aW9uOlwiY29yZVwiLFxuZGVzY3JpcHRpb246XCJVc2VyIGludGVycnVwdGlvbiB3aXRoIENUUkwtXFxcXFwiLFxuc3RhbmRhcmQ6XCJwb3NpeFwifSxcblxue1xubmFtZTpcIlNJR0lMTFwiLFxubnVtYmVyOjQsXG5hY3Rpb246XCJjb3JlXCIsXG5kZXNjcmlwdGlvbjpcIkludmFsaWQgbWFjaGluZSBpbnN0cnVjdGlvblwiLFxuc3RhbmRhcmQ6XCJhbnNpXCJ9LFxuXG57XG5uYW1lOlwiU0lHVFJBUFwiLFxubnVtYmVyOjUsXG5hY3Rpb246XCJjb3JlXCIsXG5kZXNjcmlwdGlvbjpcIkRlYnVnZ2VyIGJyZWFrcG9pbnRcIixcbnN0YW5kYXJkOlwicG9zaXhcIn0sXG5cbntcbm5hbWU6XCJTSUdBQlJUXCIsXG5udW1iZXI6NixcbmFjdGlvbjpcImNvcmVcIixcbmRlc2NyaXB0aW9uOlwiQWJvcnRlZFwiLFxuc3RhbmRhcmQ6XCJhbnNpXCJ9LFxuXG57XG5uYW1lOlwiU0lHSU9UXCIsXG5udW1iZXI6NixcbmFjdGlvbjpcImNvcmVcIixcbmRlc2NyaXB0aW9uOlwiQWJvcnRlZFwiLFxuc3RhbmRhcmQ6XCJic2RcIn0sXG5cbntcbm5hbWU6XCJTSUdCVVNcIixcbm51bWJlcjo3LFxuYWN0aW9uOlwiY29yZVwiLFxuZGVzY3JpcHRpb246XG5cIkJ1cyBlcnJvciBkdWUgdG8gbWlzYWxpZ25lZCwgbm9uLWV4aXN0aW5nIGFkZHJlc3Mgb3IgcGFnaW5nIGVycm9yXCIsXG5zdGFuZGFyZDpcImJzZFwifSxcblxue1xubmFtZTpcIlNJR0VNVFwiLFxubnVtYmVyOjcsXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiQ29tbWFuZCBzaG91bGQgYmUgZW11bGF0ZWQgYnV0IGlzIG5vdCBpbXBsZW1lbnRlZFwiLFxuc3RhbmRhcmQ6XCJvdGhlclwifSxcblxue1xubmFtZTpcIlNJR0ZQRVwiLFxubnVtYmVyOjgsXG5hY3Rpb246XCJjb3JlXCIsXG5kZXNjcmlwdGlvbjpcIkZsb2F0aW5nIHBvaW50IGFyaXRobWV0aWMgZXJyb3JcIixcbnN0YW5kYXJkOlwiYW5zaVwifSxcblxue1xubmFtZTpcIlNJR0tJTExcIixcbm51bWJlcjo5LFxuYWN0aW9uOlwidGVybWluYXRlXCIsXG5kZXNjcmlwdGlvbjpcIkZvcmNlZCB0ZXJtaW5hdGlvblwiLFxuc3RhbmRhcmQ6XCJwb3NpeFwiLFxuZm9yY2VkOnRydWV9LFxuXG57XG5uYW1lOlwiU0lHVVNSMVwiLFxubnVtYmVyOjEwLFxuYWN0aW9uOlwidGVybWluYXRlXCIsXG5kZXNjcmlwdGlvbjpcIkFwcGxpY2F0aW9uLXNwZWNpZmljIHNpZ25hbFwiLFxuc3RhbmRhcmQ6XCJwb3NpeFwifSxcblxue1xubmFtZTpcIlNJR1NFR1ZcIixcbm51bWJlcjoxMSxcbmFjdGlvbjpcImNvcmVcIixcbmRlc2NyaXB0aW9uOlwiU2VnbWVudGF0aW9uIGZhdWx0XCIsXG5zdGFuZGFyZDpcImFuc2lcIn0sXG5cbntcbm5hbWU6XCJTSUdVU1IyXCIsXG5udW1iZXI6MTIsXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiQXBwbGljYXRpb24tc3BlY2lmaWMgc2lnbmFsXCIsXG5zdGFuZGFyZDpcInBvc2l4XCJ9LFxuXG57XG5uYW1lOlwiU0lHUElQRVwiLFxubnVtYmVyOjEzLFxuYWN0aW9uOlwidGVybWluYXRlXCIsXG5kZXNjcmlwdGlvbjpcIkJyb2tlbiBwaXBlIG9yIHNvY2tldFwiLFxuc3RhbmRhcmQ6XCJwb3NpeFwifSxcblxue1xubmFtZTpcIlNJR0FMUk1cIixcbm51bWJlcjoxNCxcbmFjdGlvbjpcInRlcm1pbmF0ZVwiLFxuZGVzY3JpcHRpb246XCJUaW1lb3V0IG9yIHRpbWVyXCIsXG5zdGFuZGFyZDpcInBvc2l4XCJ9LFxuXG57XG5uYW1lOlwiU0lHVEVSTVwiLFxubnVtYmVyOjE1LFxuYWN0aW9uOlwidGVybWluYXRlXCIsXG5kZXNjcmlwdGlvbjpcIlRlcm1pbmF0aW9uXCIsXG5zdGFuZGFyZDpcImFuc2lcIn0sXG5cbntcbm5hbWU6XCJTSUdTVEtGTFRcIixcbm51bWJlcjoxNixcbmFjdGlvbjpcInRlcm1pbmF0ZVwiLFxuZGVzY3JpcHRpb246XCJTdGFjayBpcyBlbXB0eSBvciBvdmVyZmxvd2VkXCIsXG5zdGFuZGFyZDpcIm90aGVyXCJ9LFxuXG57XG5uYW1lOlwiU0lHQ0hMRFwiLFxubnVtYmVyOjE3LFxuYWN0aW9uOlwiaWdub3JlXCIsXG5kZXNjcmlwdGlvbjpcIkNoaWxkIHByb2Nlc3MgdGVybWluYXRlZCwgcGF1c2VkIG9yIHVucGF1c2VkXCIsXG5zdGFuZGFyZDpcInBvc2l4XCJ9LFxuXG57XG5uYW1lOlwiU0lHQ0xEXCIsXG5udW1iZXI6MTcsXG5hY3Rpb246XCJpZ25vcmVcIixcbmRlc2NyaXB0aW9uOlwiQ2hpbGQgcHJvY2VzcyB0ZXJtaW5hdGVkLCBwYXVzZWQgb3IgdW5wYXVzZWRcIixcbnN0YW5kYXJkOlwib3RoZXJcIn0sXG5cbntcbm5hbWU6XCJTSUdDT05UXCIsXG5udW1iZXI6MTgsXG5hY3Rpb246XCJ1bnBhdXNlXCIsXG5kZXNjcmlwdGlvbjpcIlVucGF1c2VkXCIsXG5zdGFuZGFyZDpcInBvc2l4XCIsXG5mb3JjZWQ6dHJ1ZX0sXG5cbntcbm5hbWU6XCJTSUdTVE9QXCIsXG5udW1iZXI6MTksXG5hY3Rpb246XCJwYXVzZVwiLFxuZGVzY3JpcHRpb246XCJQYXVzZWRcIixcbnN0YW5kYXJkOlwicG9zaXhcIixcbmZvcmNlZDp0cnVlfSxcblxue1xubmFtZTpcIlNJR1RTVFBcIixcbm51bWJlcjoyMCxcbmFjdGlvbjpcInBhdXNlXCIsXG5kZXNjcmlwdGlvbjpcIlBhdXNlZCB1c2luZyBDVFJMLVogb3IgXFxcInN1c3BlbmRcXFwiXCIsXG5zdGFuZGFyZDpcInBvc2l4XCJ9LFxuXG57XG5uYW1lOlwiU0lHVFRJTlwiLFxubnVtYmVyOjIxLFxuYWN0aW9uOlwicGF1c2VcIixcbmRlc2NyaXB0aW9uOlwiQmFja2dyb3VuZCBwcm9jZXNzIGNhbm5vdCByZWFkIHRlcm1pbmFsIGlucHV0XCIsXG5zdGFuZGFyZDpcInBvc2l4XCJ9LFxuXG57XG5uYW1lOlwiU0lHQlJFQUtcIixcbm51bWJlcjoyMSxcbmFjdGlvbjpcInRlcm1pbmF0ZVwiLFxuZGVzY3JpcHRpb246XCJVc2VyIGludGVycnVwdGlvbiB3aXRoIENUUkwtQlJFQUtcIixcbnN0YW5kYXJkOlwib3RoZXJcIn0sXG5cbntcbm5hbWU6XCJTSUdUVE9VXCIsXG5udW1iZXI6MjIsXG5hY3Rpb246XCJwYXVzZVwiLFxuZGVzY3JpcHRpb246XCJCYWNrZ3JvdW5kIHByb2Nlc3MgY2Fubm90IHdyaXRlIHRvIHRlcm1pbmFsIG91dHB1dFwiLFxuc3RhbmRhcmQ6XCJwb3NpeFwifSxcblxue1xubmFtZTpcIlNJR1VSR1wiLFxubnVtYmVyOjIzLFxuYWN0aW9uOlwiaWdub3JlXCIsXG5kZXNjcmlwdGlvbjpcIlNvY2tldCByZWNlaXZlZCBvdXQtb2YtYmFuZCBkYXRhXCIsXG5zdGFuZGFyZDpcImJzZFwifSxcblxue1xubmFtZTpcIlNJR1hDUFVcIixcbm51bWJlcjoyNCxcbmFjdGlvbjpcImNvcmVcIixcbmRlc2NyaXB0aW9uOlwiUHJvY2VzcyB0aW1lZCBvdXRcIixcbnN0YW5kYXJkOlwiYnNkXCJ9LFxuXG57XG5uYW1lOlwiU0lHWEZTWlwiLFxubnVtYmVyOjI1LFxuYWN0aW9uOlwiY29yZVwiLFxuZGVzY3JpcHRpb246XCJGaWxlIHRvbyBiaWdcIixcbnN0YW5kYXJkOlwiYnNkXCJ9LFxuXG57XG5uYW1lOlwiU0lHVlRBTFJNXCIsXG5udW1iZXI6MjYsXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiVGltZW91dCBvciB0aW1lclwiLFxuc3RhbmRhcmQ6XCJic2RcIn0sXG5cbntcbm5hbWU6XCJTSUdQUk9GXCIsXG5udW1iZXI6MjcsXG5hY3Rpb246XCJ0ZXJtaW5hdGVcIixcbmRlc2NyaXB0aW9uOlwiVGltZW91dCBvciB0aW1lclwiLFxuc3RhbmRhcmQ6XCJic2RcIn0sXG5cbntcbm5hbWU6XCJTSUdXSU5DSFwiLFxubnVtYmVyOjI4LFxuYWN0aW9uOlwiaWdub3JlXCIsXG5kZXNjcmlwdGlvbjpcIlRlcm1pbmFsIHdpbmRvdyBzaXplIGNoYW5nZWRcIixcbnN0YW5kYXJkOlwiYnNkXCJ9LFxuXG57XG5uYW1lOlwiU0lHSU9cIixcbm51bWJlcjoyOSxcbmFjdGlvbjpcInRlcm1pbmF0ZVwiLFxuZGVzY3JpcHRpb246XCJJL08gaXMgYXZhaWxhYmxlXCIsXG5zdGFuZGFyZDpcIm90aGVyXCJ9LFxuXG57XG5uYW1lOlwiU0lHUE9MTFwiLFxubnVtYmVyOjI5LFxuYWN0aW9uOlwidGVybWluYXRlXCIsXG5kZXNjcmlwdGlvbjpcIldhdGNoZWQgZXZlbnRcIixcbnN0YW5kYXJkOlwib3RoZXJcIn0sXG5cbntcbm5hbWU6XCJTSUdJTkZPXCIsXG5udW1iZXI6MjksXG5hY3Rpb246XCJpZ25vcmVcIixcbmRlc2NyaXB0aW9uOlwiUmVxdWVzdCBmb3IgcHJvY2VzcyBpbmZvcm1hdGlvblwiLFxuc3RhbmRhcmQ6XCJvdGhlclwifSxcblxue1xubmFtZTpcIlNJR1BXUlwiLFxubnVtYmVyOjMwLFxuYWN0aW9uOlwidGVybWluYXRlXCIsXG5kZXNjcmlwdGlvbjpcIkRldmljZSBydW5uaW5nIG91dCBvZiBwb3dlclwiLFxuc3RhbmRhcmQ6XCJzeXN0ZW12XCJ9LFxuXG57XG5uYW1lOlwiU0lHU1lTXCIsXG5udW1iZXI6MzEsXG5hY3Rpb246XCJjb3JlXCIsXG5kZXNjcmlwdGlvbjpcIkludmFsaWQgc3lzdGVtIGNhbGxcIixcbnN0YW5kYXJkOlwib3RoZXJcIn0sXG5cbntcbm5hbWU6XCJTSUdVTlVTRURcIixcbm51bWJlcjozMSxcbmFjdGlvbjpcInRlcm1pbmF0ZVwiLFxuZGVzY3JpcHRpb246XCJJbnZhbGlkIHN5c3RlbSBjYWxsXCIsXG5zdGFuZGFyZDpcIm90aGVyXCJ9XTtleHBvcnRzLlNJR05BTFM9U0lHTkFMUztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLlNJR1JUTUFYPWV4cG9ydHMuZ2V0UmVhbHRpbWVTaWduYWxzPXZvaWQgMDtcbmNvbnN0IGdldFJlYWx0aW1lU2lnbmFscz1mdW5jdGlvbigpe1xuY29uc3QgbGVuZ3RoPVNJR1JUTUFYLVNJR1JUTUlOKzE7XG5yZXR1cm4gQXJyYXkuZnJvbSh7bGVuZ3RofSxnZXRSZWFsdGltZVNpZ25hbCk7XG59O2V4cG9ydHMuZ2V0UmVhbHRpbWVTaWduYWxzPWdldFJlYWx0aW1lU2lnbmFscztcblxuY29uc3QgZ2V0UmVhbHRpbWVTaWduYWw9ZnVuY3Rpb24odmFsdWUsaW5kZXgpe1xucmV0dXJue1xubmFtZTpgU0lHUlQke2luZGV4KzF9YCxcbm51bWJlcjpTSUdSVE1JTitpbmRleCxcbmFjdGlvbjpcInRlcm1pbmF0ZVwiLFxuZGVzY3JpcHRpb246XCJBcHBsaWNhdGlvbi1zcGVjaWZpYyBzaWduYWwgKHJlYWx0aW1lKVwiLFxuc3RhbmRhcmQ6XCJwb3NpeFwifTtcblxufTtcblxuY29uc3QgU0lHUlRNSU49MzQ7XG5jb25zdCBTSUdSVE1BWD02NDtleHBvcnRzLlNJR1JUTUFYPVNJR1JUTUFYO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVhbHRpbWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLmdldFNpZ25hbHM9dm9pZCAwO3ZhciBfb3M9cmVxdWlyZShcIm9zXCIpO1xuXG52YXIgX2NvcmU9cmVxdWlyZShcIi4vY29yZS5qc1wiKTtcbnZhciBfcmVhbHRpbWU9cmVxdWlyZShcIi4vcmVhbHRpbWUuanNcIik7XG5cblxuXG5jb25zdCBnZXRTaWduYWxzPWZ1bmN0aW9uKCl7XG5jb25zdCByZWFsdGltZVNpZ25hbHM9KDAsX3JlYWx0aW1lLmdldFJlYWx0aW1lU2lnbmFscykoKTtcbmNvbnN0IHNpZ25hbHM9Wy4uLl9jb3JlLlNJR05BTFMsLi4ucmVhbHRpbWVTaWduYWxzXS5tYXAobm9ybWFsaXplU2lnbmFsKTtcbnJldHVybiBzaWduYWxzO1xufTtleHBvcnRzLmdldFNpZ25hbHM9Z2V0U2lnbmFscztcblxuXG5cblxuXG5cblxuY29uc3Qgbm9ybWFsaXplU2lnbmFsPWZ1bmN0aW9uKHtcbm5hbWUsXG5udW1iZXI6ZGVmYXVsdE51bWJlcixcbmRlc2NyaXB0aW9uLFxuYWN0aW9uLFxuZm9yY2VkPWZhbHNlLFxuc3RhbmRhcmR9KVxue1xuY29uc3R7XG5zaWduYWxzOntbbmFtZV06Y29uc3RhbnRTaWduYWx9fT1cbl9vcy5jb25zdGFudHM7XG5jb25zdCBzdXBwb3J0ZWQ9Y29uc3RhbnRTaWduYWwhPT11bmRlZmluZWQ7XG5jb25zdCBudW1iZXI9c3VwcG9ydGVkP2NvbnN0YW50U2lnbmFsOmRlZmF1bHROdW1iZXI7XG5yZXR1cm57bmFtZSxudW1iZXIsZGVzY3JpcHRpb24sc3VwcG9ydGVkLGFjdGlvbixmb3JjZWQsc3RhbmRhcmR9O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpZ25hbHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLnNpZ25hbHNCeU51bWJlcj1leHBvcnRzLnNpZ25hbHNCeU5hbWU9dm9pZCAwO3ZhciBfb3M9cmVxdWlyZShcIm9zXCIpO1xuXG52YXIgX3NpZ25hbHM9cmVxdWlyZShcIi4vc2lnbmFscy5qc1wiKTtcbnZhciBfcmVhbHRpbWU9cmVxdWlyZShcIi4vcmVhbHRpbWUuanNcIik7XG5cblxuXG5jb25zdCBnZXRTaWduYWxzQnlOYW1lPWZ1bmN0aW9uKCl7XG5jb25zdCBzaWduYWxzPSgwLF9zaWduYWxzLmdldFNpZ25hbHMpKCk7XG5yZXR1cm4gc2lnbmFscy5yZWR1Y2UoZ2V0U2lnbmFsQnlOYW1lLHt9KTtcbn07XG5cbmNvbnN0IGdldFNpZ25hbEJ5TmFtZT1mdW5jdGlvbihcbnNpZ25hbEJ5TmFtZU1lbW8sXG57bmFtZSxudW1iZXIsZGVzY3JpcHRpb24sc3VwcG9ydGVkLGFjdGlvbixmb3JjZWQsc3RhbmRhcmR9KVxue1xucmV0dXJue1xuLi4uc2lnbmFsQnlOYW1lTWVtbyxcbltuYW1lXTp7bmFtZSxudW1iZXIsZGVzY3JpcHRpb24sc3VwcG9ydGVkLGFjdGlvbixmb3JjZWQsc3RhbmRhcmR9fTtcblxufTtcblxuY29uc3Qgc2lnbmFsc0J5TmFtZT1nZXRTaWduYWxzQnlOYW1lKCk7ZXhwb3J0cy5zaWduYWxzQnlOYW1lPXNpZ25hbHNCeU5hbWU7XG5cblxuXG5cbmNvbnN0IGdldFNpZ25hbHNCeU51bWJlcj1mdW5jdGlvbigpe1xuY29uc3Qgc2lnbmFscz0oMCxfc2lnbmFscy5nZXRTaWduYWxzKSgpO1xuY29uc3QgbGVuZ3RoPV9yZWFsdGltZS5TSUdSVE1BWCsxO1xuY29uc3Qgc2lnbmFsc0E9QXJyYXkuZnJvbSh7bGVuZ3RofSwodmFsdWUsbnVtYmVyKT0+XG5nZXRTaWduYWxCeU51bWJlcihudW1iZXIsc2lnbmFscykpO1xuXG5yZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwuLi5zaWduYWxzQSk7XG59O1xuXG5jb25zdCBnZXRTaWduYWxCeU51bWJlcj1mdW5jdGlvbihudW1iZXIsc2lnbmFscyl7XG5jb25zdCBzaWduYWw9ZmluZFNpZ25hbEJ5TnVtYmVyKG51bWJlcixzaWduYWxzKTtcblxuaWYoc2lnbmFsPT09dW5kZWZpbmVkKXtcbnJldHVybnt9O1xufVxuXG5jb25zdHtuYW1lLGRlc2NyaXB0aW9uLHN1cHBvcnRlZCxhY3Rpb24sZm9yY2VkLHN0YW5kYXJkfT1zaWduYWw7XG5yZXR1cm57XG5bbnVtYmVyXTp7XG5uYW1lLFxubnVtYmVyLFxuZGVzY3JpcHRpb24sXG5zdXBwb3J0ZWQsXG5hY3Rpb24sXG5mb3JjZWQsXG5zdGFuZGFyZH19O1xuXG5cbn07XG5cblxuXG5jb25zdCBmaW5kU2lnbmFsQnlOdW1iZXI9ZnVuY3Rpb24obnVtYmVyLHNpZ25hbHMpe1xuY29uc3Qgc2lnbmFsPXNpZ25hbHMuZmluZCgoe25hbWV9KT0+X29zLmNvbnN0YW50cy5zaWduYWxzW25hbWVdPT09bnVtYmVyKTtcblxuaWYoc2lnbmFsIT09dW5kZWZpbmVkKXtcbnJldHVybiBzaWduYWw7XG59XG5cbnJldHVybiBzaWduYWxzLmZpbmQoc2lnbmFsQT0+c2lnbmFsQS5udW1iZXI9PT1udW1iZXIpO1xufTtcblxuY29uc3Qgc2lnbmFsc0J5TnVtYmVyPWdldFNpZ25hbHNCeU51bWJlcigpO2V4cG9ydHMuc2lnbmFsc0J5TnVtYmVyPXNpZ25hbHNCeU51bWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4uanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3Qge3NpZ25hbHNCeU5hbWV9ID0gcmVxdWlyZSgnaHVtYW4tc2lnbmFscycpO1xuXG5jb25zdCBnZXRFcnJvclByZWZpeCA9ICh7dGltZWRPdXQsIHRpbWVvdXQsIGVycm9yQ29kZSwgc2lnbmFsLCBzaWduYWxEZXNjcmlwdGlvbiwgZXhpdENvZGUsIGlzQ2FuY2VsZWR9KSA9PiB7XG5cdGlmICh0aW1lZE91dCkge1xuXHRcdHJldHVybiBgdGltZWQgb3V0IGFmdGVyICR7dGltZW91dH0gbWlsbGlzZWNvbmRzYDtcblx0fVxuXG5cdGlmIChpc0NhbmNlbGVkKSB7XG5cdFx0cmV0dXJuICd3YXMgY2FuY2VsZWQnO1xuXHR9XG5cblx0aWYgKGVycm9yQ29kZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGBmYWlsZWQgd2l0aCAke2Vycm9yQ29kZX1gO1xuXHR9XG5cblx0aWYgKHNpZ25hbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGB3YXMga2lsbGVkIHdpdGggJHtzaWduYWx9ICgke3NpZ25hbERlc2NyaXB0aW9ufSlgO1xuXHR9XG5cblx0aWYgKGV4aXRDb2RlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gYGZhaWxlZCB3aXRoIGV4aXQgY29kZSAke2V4aXRDb2RlfWA7XG5cdH1cblxuXHRyZXR1cm4gJ2ZhaWxlZCc7XG59O1xuXG5jb25zdCBtYWtlRXJyb3IgPSAoe1xuXHRzdGRvdXQsXG5cdHN0ZGVycixcblx0YWxsLFxuXHRlcnJvcixcblx0c2lnbmFsLFxuXHRleGl0Q29kZSxcblx0Y29tbWFuZCxcblx0ZXNjYXBlZENvbW1hbmQsXG5cdHRpbWVkT3V0LFxuXHRpc0NhbmNlbGVkLFxuXHRraWxsZWQsXG5cdHBhcnNlZDoge29wdGlvbnM6IHt0aW1lb3V0fX1cbn0pID0+IHtcblx0Ly8gYHNpZ25hbGAgYW5kIGBleGl0Q29kZWAgZW1pdHRlZCBvbiBgc3Bhd25lZC5vbignZXhpdCcpYCBldmVudCBjYW4gYmUgYG51bGxgLlxuXHQvLyBXZSBub3JtYWxpemUgdGhlbSB0byBgdW5kZWZpbmVkYFxuXHRleGl0Q29kZSA9IGV4aXRDb2RlID09PSBudWxsID8gdW5kZWZpbmVkIDogZXhpdENvZGU7XG5cdHNpZ25hbCA9IHNpZ25hbCA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHNpZ25hbDtcblx0Y29uc3Qgc2lnbmFsRGVzY3JpcHRpb24gPSBzaWduYWwgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHNpZ25hbHNCeU5hbWVbc2lnbmFsXS5kZXNjcmlwdGlvbjtcblxuXHRjb25zdCBlcnJvckNvZGUgPSBlcnJvciAmJiBlcnJvci5jb2RlO1xuXG5cdGNvbnN0IHByZWZpeCA9IGdldEVycm9yUHJlZml4KHt0aW1lZE91dCwgdGltZW91dCwgZXJyb3JDb2RlLCBzaWduYWwsIHNpZ25hbERlc2NyaXB0aW9uLCBleGl0Q29kZSwgaXNDYW5jZWxlZH0pO1xuXHRjb25zdCBleGVjYU1lc3NhZ2UgPSBgQ29tbWFuZCAke3ByZWZpeH06ICR7Y29tbWFuZH1gO1xuXHRjb25zdCBpc0Vycm9yID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGVycm9yKSA9PT0gJ1tvYmplY3QgRXJyb3JdJztcblx0Y29uc3Qgc2hvcnRNZXNzYWdlID0gaXNFcnJvciA/IGAke2V4ZWNhTWVzc2FnZX1cXG4ke2Vycm9yLm1lc3NhZ2V9YCA6IGV4ZWNhTWVzc2FnZTtcblx0Y29uc3QgbWVzc2FnZSA9IFtzaG9ydE1lc3NhZ2UsIHN0ZGVyciwgc3Rkb3V0XS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cblx0aWYgKGlzRXJyb3IpIHtcblx0XHRlcnJvci5vcmlnaW5hbE1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuXHRcdGVycm9yLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXHR9IGVsc2Uge1xuXHRcdGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuXHR9XG5cblx0ZXJyb3Iuc2hvcnRNZXNzYWdlID0gc2hvcnRNZXNzYWdlO1xuXHRlcnJvci5jb21tYW5kID0gY29tbWFuZDtcblx0ZXJyb3IuZXNjYXBlZENvbW1hbmQgPSBlc2NhcGVkQ29tbWFuZDtcblx0ZXJyb3IuZXhpdENvZGUgPSBleGl0Q29kZTtcblx0ZXJyb3Iuc2lnbmFsID0gc2lnbmFsO1xuXHRlcnJvci5zaWduYWxEZXNjcmlwdGlvbiA9IHNpZ25hbERlc2NyaXB0aW9uO1xuXHRlcnJvci5zdGRvdXQgPSBzdGRvdXQ7XG5cdGVycm9yLnN0ZGVyciA9IHN0ZGVycjtcblxuXHRpZiAoYWxsICE9PSB1bmRlZmluZWQpIHtcblx0XHRlcnJvci5hbGwgPSBhbGw7XG5cdH1cblxuXHRpZiAoJ2J1ZmZlcmVkRGF0YScgaW4gZXJyb3IpIHtcblx0XHRkZWxldGUgZXJyb3IuYnVmZmVyZWREYXRhO1xuXHR9XG5cblx0ZXJyb3IuZmFpbGVkID0gdHJ1ZTtcblx0ZXJyb3IudGltZWRPdXQgPSBCb29sZWFuKHRpbWVkT3V0KTtcblx0ZXJyb3IuaXNDYW5jZWxlZCA9IGlzQ2FuY2VsZWQ7XG5cdGVycm9yLmtpbGxlZCA9IGtpbGxlZCAmJiAhdGltZWRPdXQ7XG5cblx0cmV0dXJuIGVycm9yO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtYWtlRXJyb3I7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBhbGlhc2VzID0gWydzdGRpbicsICdzdGRvdXQnLCAnc3RkZXJyJ107XG5cbmNvbnN0IGhhc0FsaWFzID0gb3B0aW9ucyA9PiBhbGlhc2VzLnNvbWUoYWxpYXMgPT4gb3B0aW9uc1thbGlhc10gIT09IHVuZGVmaW5lZCk7XG5cbmNvbnN0IG5vcm1hbGl6ZVN0ZGlvID0gb3B0aW9ucyA9PiB7XG5cdGlmICghb3B0aW9ucykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IHtzdGRpb30gPSBvcHRpb25zO1xuXG5cdGlmIChzdGRpbyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGFsaWFzZXMubWFwKGFsaWFzID0+IG9wdGlvbnNbYWxpYXNdKTtcblx0fVxuXG5cdGlmIChoYXNBbGlhcyhvcHRpb25zKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihgSXQncyBub3QgcG9zc2libGUgdG8gcHJvdmlkZSBcXGBzdGRpb1xcYCBpbiBjb21iaW5hdGlvbiB3aXRoIG9uZSBvZiAke2FsaWFzZXMubWFwKGFsaWFzID0+IGBcXGAke2FsaWFzfVxcYGApLmpvaW4oJywgJyl9YCk7XG5cdH1cblxuXHRpZiAodHlwZW9mIHN0ZGlvID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBzdGRpbztcblx0fVxuXG5cdGlmICghQXJyYXkuaXNBcnJheShzdGRpbykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBzdGRpb1xcYCB0byBiZSBvZiB0eXBlIFxcYHN0cmluZ1xcYCBvciBcXGBBcnJheVxcYCwgZ290IFxcYCR7dHlwZW9mIHN0ZGlvfVxcYGApO1xuXHR9XG5cblx0Y29uc3QgbGVuZ3RoID0gTWF0aC5tYXgoc3RkaW8ubGVuZ3RoLCBhbGlhc2VzLmxlbmd0aCk7XG5cdHJldHVybiBBcnJheS5mcm9tKHtsZW5ndGh9LCAodmFsdWUsIGluZGV4KSA9PiBzdGRpb1tpbmRleF0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBub3JtYWxpemVTdGRpbztcblxuLy8gYGlwY2AgaXMgcHVzaGVkIHVubGVzcyBpdCBpcyBhbHJlYWR5IHByZXNlbnRcbm1vZHVsZS5leHBvcnRzLm5vZGUgPSBvcHRpb25zID0+IHtcblx0Y29uc3Qgc3RkaW8gPSBub3JtYWxpemVTdGRpbyhvcHRpb25zKTtcblxuXHRpZiAoc3RkaW8gPT09ICdpcGMnKSB7XG5cdFx0cmV0dXJuICdpcGMnO1xuXHR9XG5cblx0aWYgKHN0ZGlvID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0ZGlvID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBbc3RkaW8sIHN0ZGlvLCBzdGRpbywgJ2lwYyddO1xuXHR9XG5cblx0aWYgKHN0ZGlvLmluY2x1ZGVzKCdpcGMnKSkge1xuXHRcdHJldHVybiBzdGRpbztcblx0fVxuXG5cdHJldHVybiBbLi4uc3RkaW8sICdpcGMnXTtcbn07XG4iLCIvLyBUaGlzIGlzIG5vdCB0aGUgc2V0IG9mIGFsbCBwb3NzaWJsZSBzaWduYWxzLlxuLy9cbi8vIEl0IElTLCBob3dldmVyLCB0aGUgc2V0IG9mIGFsbCBzaWduYWxzIHRoYXQgdHJpZ2dlclxuLy8gYW4gZXhpdCBvbiBlaXRoZXIgTGludXggb3IgQlNEIHN5c3RlbXMuICBMaW51eCBpcyBhXG4vLyBzdXBlcnNldCBvZiB0aGUgc2lnbmFsIG5hbWVzIHN1cHBvcnRlZCBvbiBCU0QsIGFuZFxuLy8gdGhlIHVua25vd24gc2lnbmFscyBqdXN0IGZhaWwgdG8gcmVnaXN0ZXIsIHNvIHdlIGNhblxuLy8gY2F0Y2ggdGhhdCBlYXNpbHkgZW5vdWdoLlxuLy9cbi8vIERvbid0IGJvdGhlciB3aXRoIFNJR0tJTEwuICBJdCdzIHVuY2F0Y2hhYmxlLCB3aGljaFxuLy8gbWVhbnMgdGhhdCB3ZSBjYW4ndCBmaXJlIGFueSBjYWxsYmFja3MgYW55d2F5LlxuLy9cbi8vIElmIGEgdXNlciBkb2VzIGhhcHBlbiB0byByZWdpc3RlciBhIGhhbmRsZXIgb24gYSBub24tXG4vLyBmYXRhbCBzaWduYWwgbGlrZSBTSUdXSU5DSCBvciBzb21ldGhpbmcsIGFuZCB0aGVuXG4vLyBleGl0LCBpdCdsbCBlbmQgdXAgZmlyaW5nIGBwcm9jZXNzLmVtaXQoJ2V4aXQnKWAsIHNvXG4vLyB0aGUgaGFuZGxlciB3aWxsIGJlIGZpcmVkIGFueXdheS5cbi8vXG4vLyBTSUdCVVMsIFNJR0ZQRSwgU0lHU0VHViBhbmQgU0lHSUxMLCB3aGVuIG5vdCByYWlzZWRcbi8vIGFydGlmaWNpYWxseSwgaW5oZXJlbnRseSBsZWF2ZSB0aGUgcHJvY2VzcyBpbiBhXG4vLyBzdGF0ZSBmcm9tIHdoaWNoIGl0IGlzIG5vdCBzYWZlIHRvIHRyeSBhbmQgZW50ZXIgSlNcbi8vIGxpc3RlbmVycy5cbm1vZHVsZS5leHBvcnRzID0gW1xuICAnU0lHQUJSVCcsXG4gICdTSUdBTFJNJyxcbiAgJ1NJR0hVUCcsXG4gICdTSUdJTlQnLFxuICAnU0lHVEVSTSdcbl1cblxuaWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICd3aW4zMicpIHtcbiAgbW9kdWxlLmV4cG9ydHMucHVzaChcbiAgICAnU0lHVlRBTFJNJyxcbiAgICAnU0lHWENQVScsXG4gICAgJ1NJR1hGU1onLFxuICAgICdTSUdVU1IyJyxcbiAgICAnU0lHVFJBUCcsXG4gICAgJ1NJR1NZUycsXG4gICAgJ1NJR1FVSVQnLFxuICAgICdTSUdJT1QnXG4gICAgLy8gc2hvdWxkIGRldGVjdCBwcm9maWxlciBhbmQgZW5hYmxlL2Rpc2FibGUgYWNjb3JkaW5nbHkuXG4gICAgLy8gc2VlICMyMVxuICAgIC8vICdTSUdQUk9GJ1xuICApXG59XG5cbmlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnbGludXgnKSB7XG4gIG1vZHVsZS5leHBvcnRzLnB1c2goXG4gICAgJ1NJR0lPJyxcbiAgICAnU0lHUE9MTCcsXG4gICAgJ1NJR1BXUicsXG4gICAgJ1NJR1NUS0ZMVCcsXG4gICAgJ1NJR1VOVVNFRCdcbiAgKVxufVxuIiwiLy8gTm90ZTogc2luY2UgbnljIHVzZXMgdGhpcyBtb2R1bGUgdG8gb3V0cHV0IGNvdmVyYWdlLCBhbnkgbGluZXNcbi8vIHRoYXQgYXJlIGluIHRoZSBkaXJlY3Qgc3luYyBmbG93IG9mIG55YydzIG91dHB1dENvdmVyYWdlIGFyZVxuLy8gaWdub3JlZCwgc2luY2Ugd2UgY2FuIG5ldmVyIGdldCBjb3ZlcmFnZSBmb3IgdGhlbS5cbi8vIGdyYWIgYSByZWZlcmVuY2UgdG8gbm9kZSdzIHJlYWwgcHJvY2VzcyBvYmplY3QgcmlnaHQgYXdheVxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2Vzc1xuXG5jb25zdCBwcm9jZXNzT2sgPSBmdW5jdGlvbiAocHJvY2Vzcykge1xuICByZXR1cm4gcHJvY2VzcyAmJlxuICAgIHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBwcm9jZXNzLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIHByb2Nlc3MuZW1pdCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIHR5cGVvZiBwcm9jZXNzLnJlYWxseUV4aXQgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2YgcHJvY2Vzcy5saXN0ZW5lcnMgPT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2YgcHJvY2Vzcy5raWxsID09PSAnZnVuY3Rpb24nICYmXG4gICAgdHlwZW9mIHByb2Nlc3MucGlkID09PSAnbnVtYmVyJyAmJlxuICAgIHR5cGVvZiBwcm9jZXNzLm9uID09PSAnZnVuY3Rpb24nXG59XG5cbi8vIHNvbWUga2luZCBvZiBub24tbm9kZSBlbnZpcm9ubWVudCwganVzdCBuby1vcFxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAoIXByb2Nlc3NPayhwcm9jZXNzKSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge31cbiAgfVxufSBlbHNlIHtcbiAgdmFyIGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG4gIHZhciBzaWduYWxzID0gcmVxdWlyZSgnLi9zaWduYWxzLmpzJylcbiAgdmFyIGlzV2luID0gL153aW4vaS50ZXN0KHByb2Nlc3MucGxhdGZvcm0pXG5cbiAgdmFyIEVFID0gcmVxdWlyZSgnZXZlbnRzJylcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh0eXBlb2YgRUUgIT09ICdmdW5jdGlvbicpIHtcbiAgICBFRSA9IEVFLkV2ZW50RW1pdHRlclxuICB9XG5cbiAgdmFyIGVtaXR0ZXJcbiAgaWYgKHByb2Nlc3MuX19zaWduYWxfZXhpdF9lbWl0dGVyX18pIHtcbiAgICBlbWl0dGVyID0gcHJvY2Vzcy5fX3NpZ25hbF9leGl0X2VtaXR0ZXJfX1xuICB9IGVsc2Uge1xuICAgIGVtaXR0ZXIgPSBwcm9jZXNzLl9fc2lnbmFsX2V4aXRfZW1pdHRlcl9fID0gbmV3IEVFKClcbiAgICBlbWl0dGVyLmNvdW50ID0gMFxuICAgIGVtaXR0ZXIuZW1pdHRlZCA9IHt9XG4gIH1cblxuICAvLyBCZWNhdXNlIHRoaXMgZW1pdHRlciBpcyBhIGdsb2JhbCwgd2UgaGF2ZSB0byBjaGVjayB0byBzZWUgaWYgYVxuICAvLyBwcmV2aW91cyB2ZXJzaW9uIG9mIHRoaXMgbGlicmFyeSBmYWlsZWQgdG8gZW5hYmxlIGluZmluaXRlIGxpc3RlbmVycy5cbiAgLy8gSSBrbm93IHdoYXQgeW91J3JlIGFib3V0IHRvIHNheS4gIEJ1dCBsaXRlcmFsbHkgZXZlcnl0aGluZyBhYm91dFxuICAvLyBzaWduYWwtZXhpdCBpcyBhIGNvbXByb21pc2Ugd2l0aCBldmlsLiAgR2V0IHVzZWQgdG8gaXQuXG4gIGlmICghZW1pdHRlci5pbmZpbml0ZSkge1xuICAgIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKEluZmluaXR5KVxuICAgIGVtaXR0ZXIuaW5maW5pdGUgPSB0cnVlXG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjYiwgb3B0cykge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghcHJvY2Vzc09rKGdsb2JhbC5wcm9jZXNzKSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9XG4gICAgfVxuICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgY2IsICdmdW5jdGlvbicsICdhIGNhbGxiYWNrIG11c3QgYmUgcHJvdmlkZWQgZm9yIGV4aXQgaGFuZGxlcicpXG5cbiAgICBpZiAobG9hZGVkID09PSBmYWxzZSkge1xuICAgICAgbG9hZCgpXG4gICAgfVxuXG4gICAgdmFyIGV2ID0gJ2V4aXQnXG4gICAgaWYgKG9wdHMgJiYgb3B0cy5hbHdheXNMYXN0KSB7XG4gICAgICBldiA9ICdhZnRlcmV4aXQnXG4gICAgfVxuXG4gICAgdmFyIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoZXYsIGNiKVxuICAgICAgaWYgKGVtaXR0ZXIubGlzdGVuZXJzKCdleGl0JykubGVuZ3RoID09PSAwICYmXG4gICAgICAgICAgZW1pdHRlci5saXN0ZW5lcnMoJ2FmdGVyZXhpdCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB1bmxvYWQoKVxuICAgICAgfVxuICAgIH1cbiAgICBlbWl0dGVyLm9uKGV2LCBjYilcblxuICAgIHJldHVybiByZW1vdmVcbiAgfVxuXG4gIHZhciB1bmxvYWQgPSBmdW5jdGlvbiB1bmxvYWQgKCkge1xuICAgIGlmICghbG9hZGVkIHx8ICFwcm9jZXNzT2soZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbG9hZGVkID0gZmFsc2VcblxuICAgIHNpZ25hbHMuZm9yRWFjaChmdW5jdGlvbiAoc2lnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBwcm9jZXNzLnJlbW92ZUxpc3RlbmVyKHNpZywgc2lnTGlzdGVuZXJzW3NpZ10pXG4gICAgICB9IGNhdGNoIChlcikge31cbiAgICB9KVxuICAgIHByb2Nlc3MuZW1pdCA9IG9yaWdpbmFsUHJvY2Vzc0VtaXRcbiAgICBwcm9jZXNzLnJlYWxseUV4aXQgPSBvcmlnaW5hbFByb2Nlc3NSZWFsbHlFeGl0XG4gICAgZW1pdHRlci5jb3VudCAtPSAxXG4gIH1cbiAgbW9kdWxlLmV4cG9ydHMudW5sb2FkID0gdW5sb2FkXG5cbiAgdmFyIGVtaXQgPSBmdW5jdGlvbiBlbWl0IChldmVudCwgY29kZSwgc2lnbmFsKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKGVtaXR0ZXIuZW1pdHRlZFtldmVudF0pIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBlbWl0dGVyLmVtaXR0ZWRbZXZlbnRdID0gdHJ1ZVxuICAgIGVtaXR0ZXIuZW1pdChldmVudCwgY29kZSwgc2lnbmFsKVxuICB9XG5cbiAgLy8geyA8c2lnbmFsPjogPGxpc3RlbmVyIGZuPiwgLi4uIH1cbiAgdmFyIHNpZ0xpc3RlbmVycyA9IHt9XG4gIHNpZ25hbHMuZm9yRWFjaChmdW5jdGlvbiAoc2lnKSB7XG4gICAgc2lnTGlzdGVuZXJzW3NpZ10gPSBmdW5jdGlvbiBsaXN0ZW5lciAoKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghcHJvY2Vzc09rKGdsb2JhbC5wcm9jZXNzKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBvdGhlciBsaXN0ZW5lcnMsIGFuIGV4aXQgaXMgY29taW5nIVxuICAgICAgLy8gU2ltcGxlc3Qgd2F5OiByZW1vdmUgdXMgYW5kIHRoZW4gcmUtc2VuZCB0aGUgc2lnbmFsLlxuICAgICAgLy8gV2Uga25vdyB0aGF0IHRoaXMgd2lsbCBraWxsIHRoZSBwcm9jZXNzLCBzbyB3ZSBjYW5cbiAgICAgIC8vIHNhZmVseSBlbWl0IG5vdy5cbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBwcm9jZXNzLmxpc3RlbmVycyhzaWcpXG4gICAgICBpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gZW1pdHRlci5jb3VudCkge1xuICAgICAgICB1bmxvYWQoKVxuICAgICAgICBlbWl0KCdleGl0JywgbnVsbCwgc2lnKVxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBlbWl0KCdhZnRlcmV4aXQnLCBudWxsLCBzaWcpXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGlmIChpc1dpbiAmJiBzaWcgPT09ICdTSUdIVVAnKSB7XG4gICAgICAgICAgLy8gXCJTSUdIVVBcIiB0aHJvd3MgYW4gYEVOT1NZU2AgZXJyb3Igb24gV2luZG93cyxcbiAgICAgICAgICAvLyBzbyB1c2UgYSBzdXBwb3J0ZWQgc2lnbmFsIGluc3RlYWRcbiAgICAgICAgICBzaWcgPSAnU0lHSU5UJ1xuICAgICAgICB9XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHByb2Nlc3Mua2lsbChwcm9jZXNzLnBpZCwgc2lnKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBtb2R1bGUuZXhwb3J0cy5zaWduYWxzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzaWduYWxzXG4gIH1cblxuICB2YXIgbG9hZGVkID0gZmFsc2VcblxuICB2YXIgbG9hZCA9IGZ1bmN0aW9uIGxvYWQgKCkge1xuICAgIGlmIChsb2FkZWQgfHwgIXByb2Nlc3NPayhnbG9iYWwucHJvY2VzcykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsb2FkZWQgPSB0cnVlXG5cbiAgICAvLyBUaGlzIGlzIHRoZSBudW1iZXIgb2Ygb25TaWduYWxFeGl0J3MgdGhhdCBhcmUgaW4gcGxheS5cbiAgICAvLyBJdCdzIGltcG9ydGFudCBzbyB0aGF0IHdlIGNhbiBjb3VudCB0aGUgY29ycmVjdCBudW1iZXIgb2ZcbiAgICAvLyBsaXN0ZW5lcnMgb24gc2lnbmFscywgYW5kIGRvbid0IHdhaXQgZm9yIHRoZSBvdGhlciBvbmUgdG9cbiAgICAvLyBoYW5kbGUgaXQgaW5zdGVhZCBvZiB1cy5cbiAgICBlbWl0dGVyLmNvdW50ICs9IDFcblxuICAgIHNpZ25hbHMgPSBzaWduYWxzLmZpbHRlcihmdW5jdGlvbiAoc2lnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBwcm9jZXNzLm9uKHNpZywgc2lnTGlzdGVuZXJzW3NpZ10pXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcHJvY2Vzcy5lbWl0ID0gcHJvY2Vzc0VtaXRcbiAgICBwcm9jZXNzLnJlYWxseUV4aXQgPSBwcm9jZXNzUmVhbGx5RXhpdFxuICB9XG4gIG1vZHVsZS5leHBvcnRzLmxvYWQgPSBsb2FkXG5cbiAgdmFyIG9yaWdpbmFsUHJvY2Vzc1JlYWxseUV4aXQgPSBwcm9jZXNzLnJlYWxseUV4aXRcbiAgdmFyIHByb2Nlc3NSZWFsbHlFeGl0ID0gZnVuY3Rpb24gcHJvY2Vzc1JlYWxseUV4aXQgKGNvZGUpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoIXByb2Nlc3NPayhnbG9iYWwucHJvY2VzcykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBwcm9jZXNzLmV4aXRDb2RlID0gY29kZSB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyAwXG4gICAgZW1pdCgnZXhpdCcsIHByb2Nlc3MuZXhpdENvZGUsIG51bGwpXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBlbWl0KCdhZnRlcmV4aXQnLCBwcm9jZXNzLmV4aXRDb2RlLCBudWxsKVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgb3JpZ2luYWxQcm9jZXNzUmVhbGx5RXhpdC5jYWxsKHByb2Nlc3MsIHByb2Nlc3MuZXhpdENvZGUpXG4gIH1cblxuICB2YXIgb3JpZ2luYWxQcm9jZXNzRW1pdCA9IHByb2Nlc3MuZW1pdFxuICB2YXIgcHJvY2Vzc0VtaXQgPSBmdW5jdGlvbiBwcm9jZXNzRW1pdCAoZXYsIGFyZykge1xuICAgIGlmIChldiA9PT0gJ2V4aXQnICYmIHByb2Nlc3NPayhnbG9iYWwucHJvY2VzcykpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAoYXJnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvY2Vzcy5leGl0Q29kZSA9IGFyZ1xuICAgICAgfVxuICAgICAgdmFyIHJldCA9IG9yaWdpbmFsUHJvY2Vzc0VtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIGVtaXQoJ2V4aXQnLCBwcm9jZXNzLmV4aXRDb2RlLCBudWxsKVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIGVtaXQoJ2FmdGVyZXhpdCcsIHByb2Nlc3MuZXhpdENvZGUsIG51bGwpXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgcmV0dXJuIHJldFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3JpZ2luYWxQcm9jZXNzRW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfVxuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJyk7XG5jb25zdCBvbkV4aXQgPSByZXF1aXJlKCdzaWduYWwtZXhpdCcpO1xuXG5jb25zdCBERUZBVUxUX0ZPUkNFX0tJTExfVElNRU9VVCA9IDEwMDAgKiA1O1xuXG4vLyBNb25rZXktcGF0Y2hlcyBgY2hpbGRQcm9jZXNzLmtpbGwoKWAgdG8gYWRkIGBmb3JjZUtpbGxBZnRlclRpbWVvdXRgIGJlaGF2aW9yXG5jb25zdCBzcGF3bmVkS2lsbCA9IChraWxsLCBzaWduYWwgPSAnU0lHVEVSTScsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRjb25zdCBraWxsUmVzdWx0ID0ga2lsbChzaWduYWwpO1xuXHRzZXRLaWxsVGltZW91dChraWxsLCBzaWduYWwsIG9wdGlvbnMsIGtpbGxSZXN1bHQpO1xuXHRyZXR1cm4ga2lsbFJlc3VsdDtcbn07XG5cbmNvbnN0IHNldEtpbGxUaW1lb3V0ID0gKGtpbGwsIHNpZ25hbCwgb3B0aW9ucywga2lsbFJlc3VsdCkgPT4ge1xuXHRpZiAoIXNob3VsZEZvcmNlS2lsbChzaWduYWwsIG9wdGlvbnMsIGtpbGxSZXN1bHQpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgdGltZW91dCA9IGdldEZvcmNlS2lsbEFmdGVyVGltZW91dChvcHRpb25zKTtcblx0Y29uc3QgdCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdGtpbGwoJ1NJR0tJTEwnKTtcblx0fSwgdGltZW91dCk7XG5cblx0Ly8gR3VhcmRlZCBiZWNhdXNlIHRoZXJlJ3Mgbm8gYC51bnJlZigpYCB3aGVuIGBleGVjYWAgaXMgdXNlZCBpbiB0aGUgcmVuZGVyZXJcblx0Ly8gcHJvY2VzcyBpbiBFbGVjdHJvbi4gVGhpcyBjYW5ub3QgYmUgdGVzdGVkIHNpbmNlIHdlIGRvbid0IHJ1biB0ZXN0cyBpblxuXHQvLyBFbGVjdHJvbi5cblx0Ly8gaXN0YW5idWwgaWdub3JlIGVsc2Vcblx0aWYgKHQudW5yZWYpIHtcblx0XHR0LnVucmVmKCk7XG5cdH1cbn07XG5cbmNvbnN0IHNob3VsZEZvcmNlS2lsbCA9IChzaWduYWwsIHtmb3JjZUtpbGxBZnRlclRpbWVvdXR9LCBraWxsUmVzdWx0KSA9PiB7XG5cdHJldHVybiBpc1NpZ3Rlcm0oc2lnbmFsKSAmJiBmb3JjZUtpbGxBZnRlclRpbWVvdXQgIT09IGZhbHNlICYmIGtpbGxSZXN1bHQ7XG59O1xuXG5jb25zdCBpc1NpZ3Rlcm0gPSBzaWduYWwgPT4ge1xuXHRyZXR1cm4gc2lnbmFsID09PSBvcy5jb25zdGFudHMuc2lnbmFscy5TSUdURVJNIHx8XG5cdFx0KHR5cGVvZiBzaWduYWwgPT09ICdzdHJpbmcnICYmIHNpZ25hbC50b1VwcGVyQ2FzZSgpID09PSAnU0lHVEVSTScpO1xufTtcblxuY29uc3QgZ2V0Rm9yY2VLaWxsQWZ0ZXJUaW1lb3V0ID0gKHtmb3JjZUtpbGxBZnRlclRpbWVvdXQgPSB0cnVlfSkgPT4ge1xuXHRpZiAoZm9yY2VLaWxsQWZ0ZXJUaW1lb3V0ID09PSB0cnVlKSB7XG5cdFx0cmV0dXJuIERFRkFVTFRfRk9SQ0VfS0lMTF9USU1FT1VUO1xuXHR9XG5cblx0aWYgKCFOdW1iZXIuaXNGaW5pdGUoZm9yY2VLaWxsQWZ0ZXJUaW1lb3V0KSB8fCBmb3JjZUtpbGxBZnRlclRpbWVvdXQgPCAwKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgdGhlIFxcYGZvcmNlS2lsbEFmdGVyVGltZW91dFxcYCBvcHRpb24gdG8gYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290IFxcYCR7Zm9yY2VLaWxsQWZ0ZXJUaW1lb3V0fVxcYCAoJHt0eXBlb2YgZm9yY2VLaWxsQWZ0ZXJUaW1lb3V0fSlgKTtcblx0fVxuXG5cdHJldHVybiBmb3JjZUtpbGxBZnRlclRpbWVvdXQ7XG59O1xuXG4vLyBgY2hpbGRQcm9jZXNzLmNhbmNlbCgpYFxuY29uc3Qgc3Bhd25lZENhbmNlbCA9IChzcGF3bmVkLCBjb250ZXh0KSA9PiB7XG5cdGNvbnN0IGtpbGxSZXN1bHQgPSBzcGF3bmVkLmtpbGwoKTtcblxuXHRpZiAoa2lsbFJlc3VsdCkge1xuXHRcdGNvbnRleHQuaXNDYW5jZWxlZCA9IHRydWU7XG5cdH1cbn07XG5cbmNvbnN0IHRpbWVvdXRLaWxsID0gKHNwYXduZWQsIHNpZ25hbCwgcmVqZWN0KSA9PiB7XG5cdHNwYXduZWQua2lsbChzaWduYWwpO1xuXHRyZWplY3QoT2JqZWN0LmFzc2lnbihuZXcgRXJyb3IoJ1RpbWVkIG91dCcpLCB7dGltZWRPdXQ6IHRydWUsIHNpZ25hbH0pKTtcbn07XG5cbi8vIGB0aW1lb3V0YCBvcHRpb24gaGFuZGxpbmdcbmNvbnN0IHNldHVwVGltZW91dCA9IChzcGF3bmVkLCB7dGltZW91dCwga2lsbFNpZ25hbCA9ICdTSUdURVJNJ30sIHNwYXduZWRQcm9taXNlKSA9PiB7XG5cdGlmICh0aW1lb3V0ID09PSAwIHx8IHRpbWVvdXQgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBzcGF3bmVkUHJvbWlzZTtcblx0fVxuXG5cdGxldCB0aW1lb3V0SWQ7XG5cdGNvbnN0IHRpbWVvdXRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGltZW91dEtpbGwoc3Bhd25lZCwga2lsbFNpZ25hbCwgcmVqZWN0KTtcblx0XHR9LCB0aW1lb3V0KTtcblx0fSk7XG5cblx0Y29uc3Qgc2FmZVNwYXduZWRQcm9taXNlID0gc3Bhd25lZFByb21pc2UuZmluYWxseSgoKSA9PiB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG5cdH0pO1xuXG5cdHJldHVybiBQcm9taXNlLnJhY2UoW3RpbWVvdXRQcm9taXNlLCBzYWZlU3Bhd25lZFByb21pc2VdKTtcbn07XG5cbmNvbnN0IHZhbGlkYXRlVGltZW91dCA9ICh7dGltZW91dH0pID0+IHtcblx0aWYgKHRpbWVvdXQgIT09IHVuZGVmaW5lZCAmJiAoIU51bWJlci5pc0Zpbml0ZSh0aW1lb3V0KSB8fCB0aW1lb3V0IDwgMCkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCB0aGUgXFxgdGltZW91dFxcYCBvcHRpb24gdG8gYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciwgZ290IFxcYCR7dGltZW91dH1cXGAgKCR7dHlwZW9mIHRpbWVvdXR9KWApO1xuXHR9XG59O1xuXG4vLyBgY2xlYW51cGAgb3B0aW9uIGhhbmRsaW5nXG5jb25zdCBzZXRFeGl0SGFuZGxlciA9IGFzeW5jIChzcGF3bmVkLCB7Y2xlYW51cCwgZGV0YWNoZWR9LCB0aW1lZFByb21pc2UpID0+IHtcblx0aWYgKCFjbGVhbnVwIHx8IGRldGFjaGVkKSB7XG5cdFx0cmV0dXJuIHRpbWVkUHJvbWlzZTtcblx0fVxuXG5cdGNvbnN0IHJlbW92ZUV4aXRIYW5kbGVyID0gb25FeGl0KCgpID0+IHtcblx0XHRzcGF3bmVkLmtpbGwoKTtcblx0fSk7XG5cblx0cmV0dXJuIHRpbWVkUHJvbWlzZS5maW5hbGx5KCgpID0+IHtcblx0XHRyZW1vdmVFeGl0SGFuZGxlcigpO1xuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRzcGF3bmVkS2lsbCxcblx0c3Bhd25lZENhbmNlbCxcblx0c2V0dXBUaW1lb3V0LFxuXHR2YWxpZGF0ZVRpbWVvdXQsXG5cdHNldEV4aXRIYW5kbGVyXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBpc1N0cmVhbSA9IHN0cmVhbSA9PlxuXHRzdHJlYW0gIT09IG51bGwgJiZcblx0dHlwZW9mIHN0cmVhbSA9PT0gJ29iamVjdCcgJiZcblx0dHlwZW9mIHN0cmVhbS5waXBlID09PSAnZnVuY3Rpb24nO1xuXG5pc1N0cmVhbS53cml0YWJsZSA9IHN0cmVhbSA9PlxuXHRpc1N0cmVhbShzdHJlYW0pICYmXG5cdHN0cmVhbS53cml0YWJsZSAhPT0gZmFsc2UgJiZcblx0dHlwZW9mIHN0cmVhbS5fd3JpdGUgPT09ICdmdW5jdGlvbicgJiZcblx0dHlwZW9mIHN0cmVhbS5fd3JpdGFibGVTdGF0ZSA9PT0gJ29iamVjdCc7XG5cbmlzU3RyZWFtLnJlYWRhYmxlID0gc3RyZWFtID0+XG5cdGlzU3RyZWFtKHN0cmVhbSkgJiZcblx0c3RyZWFtLnJlYWRhYmxlICE9PSBmYWxzZSAmJlxuXHR0eXBlb2Ygc3RyZWFtLl9yZWFkID09PSAnZnVuY3Rpb24nICYmXG5cdHR5cGVvZiBzdHJlYW0uX3JlYWRhYmxlU3RhdGUgPT09ICdvYmplY3QnO1xuXG5pc1N0cmVhbS5kdXBsZXggPSBzdHJlYW0gPT5cblx0aXNTdHJlYW0ud3JpdGFibGUoc3RyZWFtKSAmJlxuXHRpc1N0cmVhbS5yZWFkYWJsZShzdHJlYW0pO1xuXG5pc1N0cmVhbS50cmFuc2Zvcm0gPSBzdHJlYW0gPT5cblx0aXNTdHJlYW0uZHVwbGV4KHN0cmVhbSkgJiZcblx0dHlwZW9mIHN0cmVhbS5fdHJhbnNmb3JtID09PSAnZnVuY3Rpb24nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3RyZWFtO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3Qge1Bhc3NUaHJvdWdoOiBQYXNzVGhyb3VnaFN0cmVhbX0gPSByZXF1aXJlKCdzdHJlYW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBvcHRpb25zID0+IHtcblx0b3B0aW9ucyA9IHsuLi5vcHRpb25zfTtcblxuXHRjb25zdCB7YXJyYXl9ID0gb3B0aW9ucztcblx0bGV0IHtlbmNvZGluZ30gPSBvcHRpb25zO1xuXHRjb25zdCBpc0J1ZmZlciA9IGVuY29kaW5nID09PSAnYnVmZmVyJztcblx0bGV0IG9iamVjdE1vZGUgPSBmYWxzZTtcblxuXHRpZiAoYXJyYXkpIHtcblx0XHRvYmplY3RNb2RlID0gIShlbmNvZGluZyB8fCBpc0J1ZmZlcik7XG5cdH0gZWxzZSB7XG5cdFx0ZW5jb2RpbmcgPSBlbmNvZGluZyB8fCAndXRmOCc7XG5cdH1cblxuXHRpZiAoaXNCdWZmZXIpIHtcblx0XHRlbmNvZGluZyA9IG51bGw7XG5cdH1cblxuXHRjb25zdCBzdHJlYW0gPSBuZXcgUGFzc1Rocm91Z2hTdHJlYW0oe29iamVjdE1vZGV9KTtcblxuXHRpZiAoZW5jb2RpbmcpIHtcblx0XHRzdHJlYW0uc2V0RW5jb2RpbmcoZW5jb2RpbmcpO1xuXHR9XG5cblx0bGV0IGxlbmd0aCA9IDA7XG5cdGNvbnN0IGNodW5rcyA9IFtdO1xuXG5cdHN0cmVhbS5vbignZGF0YScsIGNodW5rID0+IHtcblx0XHRjaHVua3MucHVzaChjaHVuayk7XG5cblx0XHRpZiAob2JqZWN0TW9kZSkge1xuXHRcdFx0bGVuZ3RoID0gY2h1bmtzLmxlbmd0aDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGVuZ3RoICs9IGNodW5rLmxlbmd0aDtcblx0XHR9XG5cdH0pO1xuXG5cdHN0cmVhbS5nZXRCdWZmZXJlZFZhbHVlID0gKCkgPT4ge1xuXHRcdGlmIChhcnJheSkge1xuXHRcdFx0cmV0dXJuIGNodW5rcztcblx0XHR9XG5cblx0XHRyZXR1cm4gaXNCdWZmZXIgPyBCdWZmZXIuY29uY2F0KGNodW5rcywgbGVuZ3RoKSA6IGNodW5rcy5qb2luKCcnKTtcblx0fTtcblxuXHRzdHJlYW0uZ2V0QnVmZmVyZWRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG5cblx0cmV0dXJuIHN0cmVhbTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCB7Y29uc3RhbnRzOiBCdWZmZXJDb25zdGFudHN9ID0gcmVxdWlyZSgnYnVmZmVyJyk7XG5jb25zdCBzdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKTtcbmNvbnN0IHtwcm9taXNpZnl9ID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgYnVmZmVyU3RyZWFtID0gcmVxdWlyZSgnLi9idWZmZXItc3RyZWFtJyk7XG5cbmNvbnN0IHN0cmVhbVBpcGVsaW5lUHJvbWlzaWZpZWQgPSBwcm9taXNpZnkoc3RyZWFtLnBpcGVsaW5lKTtcblxuY2xhc3MgTWF4QnVmZmVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCdtYXhCdWZmZXIgZXhjZWVkZWQnKTtcblx0XHR0aGlzLm5hbWUgPSAnTWF4QnVmZmVyRXJyb3InO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFN0cmVhbShpbnB1dFN0cmVhbSwgb3B0aW9ucykge1xuXHRpZiAoIWlucHV0U3RyZWFtKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhIHN0cmVhbScpO1xuXHR9XG5cblx0b3B0aW9ucyA9IHtcblx0XHRtYXhCdWZmZXI6IEluZmluaXR5LFxuXHRcdC4uLm9wdGlvbnNcblx0fTtcblxuXHRjb25zdCB7bWF4QnVmZmVyfSA9IG9wdGlvbnM7XG5cdGNvbnN0IHN0cmVhbSA9IGJ1ZmZlclN0cmVhbShvcHRpb25zKTtcblxuXHRhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0Y29uc3QgcmVqZWN0UHJvbWlzZSA9IGVycm9yID0+IHtcblx0XHRcdC8vIERvbid0IHJldHJpZXZlIGFuIG92ZXJzaXplZCBidWZmZXIuXG5cdFx0XHRpZiAoZXJyb3IgJiYgc3RyZWFtLmdldEJ1ZmZlcmVkTGVuZ3RoKCkgPD0gQnVmZmVyQ29uc3RhbnRzLk1BWF9MRU5HVEgpIHtcblx0XHRcdFx0ZXJyb3IuYnVmZmVyZWREYXRhID0gc3RyZWFtLmdldEJ1ZmZlcmVkVmFsdWUoKTtcblx0XHRcdH1cblxuXHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHR9O1xuXG5cdFx0KGFzeW5jICgpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGF3YWl0IHN0cmVhbVBpcGVsaW5lUHJvbWlzaWZpZWQoaW5wdXRTdHJlYW0sIHN0cmVhbSk7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdHJlamVjdFByb21pc2UoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH0pKCk7XG5cblx0XHRzdHJlYW0ub24oJ2RhdGEnLCAoKSA9PiB7XG5cdFx0XHRpZiAoc3RyZWFtLmdldEJ1ZmZlcmVkTGVuZ3RoKCkgPiBtYXhCdWZmZXIpIHtcblx0XHRcdFx0cmVqZWN0UHJvbWlzZShuZXcgTWF4QnVmZmVyRXJyb3IoKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdHJldHVybiBzdHJlYW0uZ2V0QnVmZmVyZWRWYWx1ZSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFN0cmVhbTtcbm1vZHVsZS5leHBvcnRzLmJ1ZmZlciA9IChzdHJlYW0sIG9wdGlvbnMpID0+IGdldFN0cmVhbShzdHJlYW0sIHsuLi5vcHRpb25zLCBlbmNvZGluZzogJ2J1ZmZlcid9KTtcbm1vZHVsZS5leHBvcnRzLmFycmF5ID0gKHN0cmVhbSwgb3B0aW9ucykgPT4gZ2V0U3RyZWFtKHN0cmVhbSwgey4uLm9wdGlvbnMsIGFycmF5OiB0cnVlfSk7XG5tb2R1bGUuZXhwb3J0cy5NYXhCdWZmZXJFcnJvciA9IE1heEJ1ZmZlckVycm9yO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7IFBhc3NUaHJvdWdoIH0gPSByZXF1aXJlKCdzdHJlYW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoLypzdHJlYW1zLi4uKi8pIHtcbiAgdmFyIHNvdXJjZXMgPSBbXVxuICB2YXIgb3V0cHV0ICA9IG5ldyBQYXNzVGhyb3VnaCh7b2JqZWN0TW9kZTogdHJ1ZX0pXG5cbiAgb3V0cHV0LnNldE1heExpc3RlbmVycygwKVxuXG4gIG91dHB1dC5hZGQgPSBhZGRcbiAgb3V0cHV0LmlzRW1wdHkgPSBpc0VtcHR5XG5cbiAgb3V0cHV0Lm9uKCd1bnBpcGUnLCByZW1vdmUpXG5cbiAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5mb3JFYWNoKGFkZClcblxuICByZXR1cm4gb3V0cHV0XG5cbiAgZnVuY3Rpb24gYWRkIChzb3VyY2UpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICBzb3VyY2UuZm9yRWFjaChhZGQpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHNvdXJjZXMucHVzaChzb3VyY2UpO1xuICAgIHNvdXJjZS5vbmNlKCdlbmQnLCByZW1vdmUuYmluZChudWxsLCBzb3VyY2UpKVxuICAgIHNvdXJjZS5vbmNlKCdlcnJvcicsIG91dHB1dC5lbWl0LmJpbmQob3V0cHV0LCAnZXJyb3InKSlcbiAgICBzb3VyY2UucGlwZShvdXRwdXQsIHtlbmQ6IGZhbHNlfSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZnVuY3Rpb24gaXNFbXB0eSAoKSB7XG4gICAgcmV0dXJuIHNvdXJjZXMubGVuZ3RoID09IDA7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmUgKHNvdXJjZSkge1xuICAgIHNvdXJjZXMgPSBzb3VyY2VzLmZpbHRlcihmdW5jdGlvbiAoaXQpIHsgcmV0dXJuIGl0ICE9PSBzb3VyY2UgfSlcbiAgICBpZiAoIXNvdXJjZXMubGVuZ3RoICYmIG91dHB1dC5yZWFkYWJsZSkgeyBvdXRwdXQuZW5kKCkgfVxuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBpc1N0cmVhbSA9IHJlcXVpcmUoJ2lzLXN0cmVhbScpO1xuY29uc3QgZ2V0U3RyZWFtID0gcmVxdWlyZSgnZ2V0LXN0cmVhbScpO1xuY29uc3QgbWVyZ2VTdHJlYW0gPSByZXF1aXJlKCdtZXJnZS1zdHJlYW0nKTtcblxuLy8gYGlucHV0YCBvcHRpb25cbmNvbnN0IGhhbmRsZUlucHV0ID0gKHNwYXduZWQsIGlucHV0KSA9PiB7XG5cdC8vIENoZWNraW5nIGZvciBzdGRpbiBpcyB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvaXNzdWVzLzI2ODUyXG5cdC8vIEB0b2RvIHJlbW92ZSBgfHwgc3Bhd25lZC5zdGRpbiA9PT0gdW5kZWZpbmVkYCBvbmNlIHdlIGRyb3Agc3VwcG9ydCBmb3IgTm9kZS5qcyA8PTEyLjIuMFxuXHRpZiAoaW5wdXQgPT09IHVuZGVmaW5lZCB8fCBzcGF3bmVkLnN0ZGluID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoaXNTdHJlYW0oaW5wdXQpKSB7XG5cdFx0aW5wdXQucGlwZShzcGF3bmVkLnN0ZGluKTtcblx0fSBlbHNlIHtcblx0XHRzcGF3bmVkLnN0ZGluLmVuZChpbnB1dCk7XG5cdH1cbn07XG5cbi8vIGBhbGxgIGludGVybGVhdmVzIGBzdGRvdXRgIGFuZCBgc3RkZXJyYFxuY29uc3QgbWFrZUFsbFN0cmVhbSA9IChzcGF3bmVkLCB7YWxsfSkgPT4ge1xuXHRpZiAoIWFsbCB8fCAoIXNwYXduZWQuc3Rkb3V0ICYmICFzcGF3bmVkLnN0ZGVycikpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBtaXhlZCA9IG1lcmdlU3RyZWFtKCk7XG5cblx0aWYgKHNwYXduZWQuc3Rkb3V0KSB7XG5cdFx0bWl4ZWQuYWRkKHNwYXduZWQuc3Rkb3V0KTtcblx0fVxuXG5cdGlmIChzcGF3bmVkLnN0ZGVycikge1xuXHRcdG1peGVkLmFkZChzcGF3bmVkLnN0ZGVycik7XG5cdH1cblxuXHRyZXR1cm4gbWl4ZWQ7XG59O1xuXG4vLyBPbiBmYWlsdXJlLCBgcmVzdWx0LnN0ZG91dHxzdGRlcnJ8YWxsYCBzaG91bGQgY29udGFpbiB0aGUgY3VycmVudGx5IGJ1ZmZlcmVkIHN0cmVhbVxuY29uc3QgZ2V0QnVmZmVyZWREYXRhID0gYXN5bmMgKHN0cmVhbSwgc3RyZWFtUHJvbWlzZSkgPT4ge1xuXHRpZiAoIXN0cmVhbSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHN0cmVhbS5kZXN0cm95KCk7XG5cblx0dHJ5IHtcblx0XHRyZXR1cm4gYXdhaXQgc3RyZWFtUHJvbWlzZTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gZXJyb3IuYnVmZmVyZWREYXRhO1xuXHR9XG59O1xuXG5jb25zdCBnZXRTdHJlYW1Qcm9taXNlID0gKHN0cmVhbSwge2VuY29kaW5nLCBidWZmZXIsIG1heEJ1ZmZlcn0pID0+IHtcblx0aWYgKCFzdHJlYW0gfHwgIWJ1ZmZlcikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmIChlbmNvZGluZykge1xuXHRcdHJldHVybiBnZXRTdHJlYW0oc3RyZWFtLCB7ZW5jb2RpbmcsIG1heEJ1ZmZlcn0pO1xuXHR9XG5cblx0cmV0dXJuIGdldFN0cmVhbS5idWZmZXIoc3RyZWFtLCB7bWF4QnVmZmVyfSk7XG59O1xuXG4vLyBSZXRyaWV2ZSByZXN1bHQgb2YgY2hpbGQgcHJvY2VzczogZXhpdCBjb2RlLCBzaWduYWwsIGVycm9yLCBzdHJlYW1zIChzdGRvdXQvc3RkZXJyL2FsbClcbmNvbnN0IGdldFNwYXduZWRSZXN1bHQgPSBhc3luYyAoe3N0ZG91dCwgc3RkZXJyLCBhbGx9LCB7ZW5jb2RpbmcsIGJ1ZmZlciwgbWF4QnVmZmVyfSwgcHJvY2Vzc0RvbmUpID0+IHtcblx0Y29uc3Qgc3Rkb3V0UHJvbWlzZSA9IGdldFN0cmVhbVByb21pc2Uoc3Rkb3V0LCB7ZW5jb2RpbmcsIGJ1ZmZlciwgbWF4QnVmZmVyfSk7XG5cdGNvbnN0IHN0ZGVyclByb21pc2UgPSBnZXRTdHJlYW1Qcm9taXNlKHN0ZGVyciwge2VuY29kaW5nLCBidWZmZXIsIG1heEJ1ZmZlcn0pO1xuXHRjb25zdCBhbGxQcm9taXNlID0gZ2V0U3RyZWFtUHJvbWlzZShhbGwsIHtlbmNvZGluZywgYnVmZmVyLCBtYXhCdWZmZXI6IG1heEJ1ZmZlciAqIDJ9KTtcblxuXHR0cnkge1xuXHRcdHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChbcHJvY2Vzc0RvbmUsIHN0ZG91dFByb21pc2UsIHN0ZGVyclByb21pc2UsIGFsbFByb21pc2VdKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoW1xuXHRcdFx0e2Vycm9yLCBzaWduYWw6IGVycm9yLnNpZ25hbCwgdGltZWRPdXQ6IGVycm9yLnRpbWVkT3V0fSxcblx0XHRcdGdldEJ1ZmZlcmVkRGF0YShzdGRvdXQsIHN0ZG91dFByb21pc2UpLFxuXHRcdFx0Z2V0QnVmZmVyZWREYXRhKHN0ZGVyciwgc3RkZXJyUHJvbWlzZSksXG5cdFx0XHRnZXRCdWZmZXJlZERhdGEoYWxsLCBhbGxQcm9taXNlKVxuXHRcdF0pO1xuXHR9XG59O1xuXG5jb25zdCB2YWxpZGF0ZUlucHV0U3luYyA9ICh7aW5wdXR9KSA9PiB7XG5cdGlmIChpc1N0cmVhbShpbnB1dCkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgYGlucHV0YCBvcHRpb24gY2Fubm90IGJlIGEgc3RyZWFtIGluIHN5bmMgbW9kZScpO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0aGFuZGxlSW5wdXQsXG5cdG1ha2VBbGxTdHJlYW0sXG5cdGdldFNwYXduZWRSZXN1bHQsXG5cdHZhbGlkYXRlSW5wdXRTeW5jXG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5hdGl2ZVByb21pc2VQcm90b3R5cGUgPSAoYXN5bmMgKCkgPT4ge30pKCkuY29uc3RydWN0b3IucHJvdG90eXBlO1xuY29uc3QgZGVzY3JpcHRvcnMgPSBbJ3RoZW4nLCAnY2F0Y2gnLCAnZmluYWxseSddLm1hcChwcm9wZXJ0eSA9PiBbXG5cdHByb3BlcnR5LFxuXHRSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuYXRpdmVQcm9taXNlUHJvdG90eXBlLCBwcm9wZXJ0eSlcbl0pO1xuXG4vLyBUaGUgcmV0dXJuIHZhbHVlIGlzIGEgbWl4aW4gb2YgYGNoaWxkUHJvY2Vzc2AgYW5kIGBQcm9taXNlYFxuY29uc3QgbWVyZ2VQcm9taXNlID0gKHNwYXduZWQsIHByb21pc2UpID0+IHtcblx0Zm9yIChjb25zdCBbcHJvcGVydHksIGRlc2NyaXB0b3JdIG9mIGRlc2NyaXB0b3JzKSB7XG5cdFx0Ly8gU3RhcnRpbmcgdGhlIG1haW4gYHByb21pc2VgIGlzIGRlZmVycmVkIHRvIGF2b2lkIGNvbnN1bWluZyBzdHJlYW1zXG5cdFx0Y29uc3QgdmFsdWUgPSB0eXBlb2YgcHJvbWlzZSA9PT0gJ2Z1bmN0aW9uJyA/XG5cdFx0XHQoLi4uYXJncykgPT4gUmVmbGVjdC5hcHBseShkZXNjcmlwdG9yLnZhbHVlLCBwcm9taXNlKCksIGFyZ3MpIDpcblx0XHRcdGRlc2NyaXB0b3IudmFsdWUuYmluZChwcm9taXNlKTtcblxuXHRcdFJlZmxlY3QuZGVmaW5lUHJvcGVydHkoc3Bhd25lZCwgcHJvcGVydHksIHsuLi5kZXNjcmlwdG9yLCB2YWx1ZX0pO1xuXHR9XG5cblx0cmV0dXJuIHNwYXduZWQ7XG59O1xuXG4vLyBVc2UgcHJvbWlzZXMgaW5zdGVhZCBvZiBgY2hpbGRfcHJvY2Vzc2AgZXZlbnRzXG5jb25zdCBnZXRTcGF3bmVkUHJvbWlzZSA9IHNwYXduZWQgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHNwYXduZWQub24oJ2V4aXQnLCAoZXhpdENvZGUsIHNpZ25hbCkgPT4ge1xuXHRcdFx0cmVzb2x2ZSh7ZXhpdENvZGUsIHNpZ25hbH0pO1xuXHRcdH0pO1xuXG5cdFx0c3Bhd25lZC5vbignZXJyb3InLCBlcnJvciA9PiB7XG5cdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHNwYXduZWQuc3RkaW4pIHtcblx0XHRcdHNwYXduZWQuc3RkaW4ub24oJ2Vycm9yJywgZXJyb3IgPT4ge1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRtZXJnZVByb21pc2UsXG5cdGdldFNwYXduZWRQcm9taXNlXG59O1xuXG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBub3JtYWxpemVBcmdzID0gKGZpbGUsIGFyZ3MgPSBbXSkgPT4ge1xuXHRpZiAoIUFycmF5LmlzQXJyYXkoYXJncykpIHtcblx0XHRyZXR1cm4gW2ZpbGVdO1xuXHR9XG5cblx0cmV0dXJuIFtmaWxlLCAuLi5hcmdzXTtcbn07XG5cbmNvbnN0IE5PX0VTQ0FQRV9SRUdFWFAgPSAvXltcXHcuLV0rJC87XG5jb25zdCBET1VCTEVfUVVPVEVTX1JFR0VYUCA9IC9cIi9nO1xuXG5jb25zdCBlc2NhcGVBcmcgPSBhcmcgPT4ge1xuXHRpZiAodHlwZW9mIGFyZyAhPT0gJ3N0cmluZycgfHwgTk9fRVNDQVBFX1JFR0VYUC50ZXN0KGFyZykpIHtcblx0XHRyZXR1cm4gYXJnO1xuXHR9XG5cblx0cmV0dXJuIGBcIiR7YXJnLnJlcGxhY2UoRE9VQkxFX1FVT1RFU19SRUdFWFAsICdcXFxcXCInKX1cImA7XG59O1xuXG5jb25zdCBqb2luQ29tbWFuZCA9IChmaWxlLCBhcmdzKSA9PiB7XG5cdHJldHVybiBub3JtYWxpemVBcmdzKGZpbGUsIGFyZ3MpLmpvaW4oJyAnKTtcbn07XG5cbmNvbnN0IGdldEVzY2FwZWRDb21tYW5kID0gKGZpbGUsIGFyZ3MpID0+IHtcblx0cmV0dXJuIG5vcm1hbGl6ZUFyZ3MoZmlsZSwgYXJncykubWFwKGFyZyA9PiBlc2NhcGVBcmcoYXJnKSkuam9pbignICcpO1xufTtcblxuY29uc3QgU1BBQ0VTX1JFR0VYUCA9IC8gKy9nO1xuXG4vLyBIYW5kbGUgYGV4ZWNhLmNvbW1hbmQoKWBcbmNvbnN0IHBhcnNlQ29tbWFuZCA9IGNvbW1hbmQgPT4ge1xuXHRjb25zdCB0b2tlbnMgPSBbXTtcblx0Zm9yIChjb25zdCB0b2tlbiBvZiBjb21tYW5kLnRyaW0oKS5zcGxpdChTUEFDRVNfUkVHRVhQKSkge1xuXHRcdC8vIEFsbG93IHNwYWNlcyB0byBiZSBlc2NhcGVkIGJ5IGEgYmFja3NsYXNoIGlmIG5vdCBtZWFudCBhcyBhIGRlbGltaXRlclxuXHRcdGNvbnN0IHByZXZpb3VzVG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuXHRcdGlmIChwcmV2aW91c1Rva2VuICYmIHByZXZpb3VzVG9rZW4uZW5kc1dpdGgoJ1xcXFwnKSkge1xuXHRcdFx0Ly8gTWVyZ2UgcHJldmlvdXMgdG9rZW4gd2l0aCBjdXJyZW50IG9uZVxuXHRcdFx0dG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXSA9IGAke3ByZXZpb3VzVG9rZW4uc2xpY2UoMCwgLTEpfSAke3Rva2VufWA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRva2Vucy5wdXNoKHRva2VuKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG9rZW5zO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGpvaW5Db21tYW5kLFxuXHRnZXRFc2NhcGVkQ29tbWFuZCxcblx0cGFyc2VDb21tYW5kXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGNoaWxkUHJvY2VzcyA9IHJlcXVpcmUoJ2NoaWxkX3Byb2Nlc3MnKTtcbmNvbnN0IGNyb3NzU3Bhd24gPSByZXF1aXJlKCdjcm9zcy1zcGF3bicpO1xuY29uc3Qgc3RyaXBGaW5hbE5ld2xpbmUgPSByZXF1aXJlKCdzdHJpcC1maW5hbC1uZXdsaW5lJyk7XG5jb25zdCBucG1SdW5QYXRoID0gcmVxdWlyZSgnbnBtLXJ1bi1wYXRoJyk7XG5jb25zdCBvbmV0aW1lID0gcmVxdWlyZSgnb25ldGltZScpO1xuY29uc3QgbWFrZUVycm9yID0gcmVxdWlyZSgnLi9saWIvZXJyb3InKTtcbmNvbnN0IG5vcm1hbGl6ZVN0ZGlvID0gcmVxdWlyZSgnLi9saWIvc3RkaW8nKTtcbmNvbnN0IHtzcGF3bmVkS2lsbCwgc3Bhd25lZENhbmNlbCwgc2V0dXBUaW1lb3V0LCB2YWxpZGF0ZVRpbWVvdXQsIHNldEV4aXRIYW5kbGVyfSA9IHJlcXVpcmUoJy4vbGliL2tpbGwnKTtcbmNvbnN0IHtoYW5kbGVJbnB1dCwgZ2V0U3Bhd25lZFJlc3VsdCwgbWFrZUFsbFN0cmVhbSwgdmFsaWRhdGVJbnB1dFN5bmN9ID0gcmVxdWlyZSgnLi9saWIvc3RyZWFtJyk7XG5jb25zdCB7bWVyZ2VQcm9taXNlLCBnZXRTcGF3bmVkUHJvbWlzZX0gPSByZXF1aXJlKCcuL2xpYi9wcm9taXNlJyk7XG5jb25zdCB7am9pbkNvbW1hbmQsIHBhcnNlQ29tbWFuZCwgZ2V0RXNjYXBlZENvbW1hbmR9ID0gcmVxdWlyZSgnLi9saWIvY29tbWFuZCcpO1xuXG5jb25zdCBERUZBVUxUX01BWF9CVUZGRVIgPSAxMDAwICogMTAwMCAqIDEwMDtcblxuY29uc3QgZ2V0RW52ID0gKHtlbnY6IGVudk9wdGlvbiwgZXh0ZW5kRW52LCBwcmVmZXJMb2NhbCwgbG9jYWxEaXIsIGV4ZWNQYXRofSkgPT4ge1xuXHRjb25zdCBlbnYgPSBleHRlbmRFbnYgPyB7Li4ucHJvY2Vzcy5lbnYsIC4uLmVudk9wdGlvbn0gOiBlbnZPcHRpb247XG5cblx0aWYgKHByZWZlckxvY2FsKSB7XG5cdFx0cmV0dXJuIG5wbVJ1blBhdGguZW52KHtlbnYsIGN3ZDogbG9jYWxEaXIsIGV4ZWNQYXRofSk7XG5cdH1cblxuXHRyZXR1cm4gZW52O1xufTtcblxuY29uc3QgaGFuZGxlQXJndW1lbnRzID0gKGZpbGUsIGFyZ3MsIG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRjb25zdCBwYXJzZWQgPSBjcm9zc1NwYXduLl9wYXJzZShmaWxlLCBhcmdzLCBvcHRpb25zKTtcblx0ZmlsZSA9IHBhcnNlZC5jb21tYW5kO1xuXHRhcmdzID0gcGFyc2VkLmFyZ3M7XG5cdG9wdGlvbnMgPSBwYXJzZWQub3B0aW9ucztcblxuXHRvcHRpb25zID0ge1xuXHRcdG1heEJ1ZmZlcjogREVGQVVMVF9NQVhfQlVGRkVSLFxuXHRcdGJ1ZmZlcjogdHJ1ZSxcblx0XHRzdHJpcEZpbmFsTmV3bGluZTogdHJ1ZSxcblx0XHRleHRlbmRFbnY6IHRydWUsXG5cdFx0cHJlZmVyTG9jYWw6IGZhbHNlLFxuXHRcdGxvY2FsRGlyOiBvcHRpb25zLmN3ZCB8fCBwcm9jZXNzLmN3ZCgpLFxuXHRcdGV4ZWNQYXRoOiBwcm9jZXNzLmV4ZWNQYXRoLFxuXHRcdGVuY29kaW5nOiAndXRmOCcsXG5cdFx0cmVqZWN0OiB0cnVlLFxuXHRcdGNsZWFudXA6IHRydWUsXG5cdFx0YWxsOiBmYWxzZSxcblx0XHR3aW5kb3dzSGlkZTogdHJ1ZSxcblx0XHQuLi5vcHRpb25zXG5cdH07XG5cblx0b3B0aW9ucy5lbnYgPSBnZXRFbnYob3B0aW9ucyk7XG5cblx0b3B0aW9ucy5zdGRpbyA9IG5vcm1hbGl6ZVN0ZGlvKG9wdGlvbnMpO1xuXG5cdGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInICYmIHBhdGguYmFzZW5hbWUoZmlsZSwgJy5leGUnKSA9PT0gJ2NtZCcpIHtcblx0XHQvLyAjMTE2XG5cdFx0YXJncy51bnNoaWZ0KCcvcScpO1xuXHR9XG5cblx0cmV0dXJuIHtmaWxlLCBhcmdzLCBvcHRpb25zLCBwYXJzZWR9O1xufTtcblxuY29uc3QgaGFuZGxlT3V0cHV0ID0gKG9wdGlvbnMsIHZhbHVlLCBlcnJvcikgPT4ge1xuXHRpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSkge1xuXHRcdC8vIFdoZW4gYGV4ZWNhLnN5bmMoKWAgZXJyb3JzLCB3ZSBub3JtYWxpemUgaXQgdG8gJycgdG8gbWltaWMgYGV4ZWNhKClgXG5cdFx0cmV0dXJuIGVycm9yID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiAnJztcblx0fVxuXG5cdGlmIChvcHRpb25zLnN0cmlwRmluYWxOZXdsaW5lKSB7XG5cdFx0cmV0dXJuIHN0cmlwRmluYWxOZXdsaW5lKHZhbHVlKTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn07XG5cbmNvbnN0IGV4ZWNhID0gKGZpbGUsIGFyZ3MsIG9wdGlvbnMpID0+IHtcblx0Y29uc3QgcGFyc2VkID0gaGFuZGxlQXJndW1lbnRzKGZpbGUsIGFyZ3MsIG9wdGlvbnMpO1xuXHRjb25zdCBjb21tYW5kID0gam9pbkNvbW1hbmQoZmlsZSwgYXJncyk7XG5cdGNvbnN0IGVzY2FwZWRDb21tYW5kID0gZ2V0RXNjYXBlZENvbW1hbmQoZmlsZSwgYXJncyk7XG5cblx0dmFsaWRhdGVUaW1lb3V0KHBhcnNlZC5vcHRpb25zKTtcblxuXHRsZXQgc3Bhd25lZDtcblx0dHJ5IHtcblx0XHRzcGF3bmVkID0gY2hpbGRQcm9jZXNzLnNwYXduKHBhcnNlZC5maWxlLCBwYXJzZWQuYXJncywgcGFyc2VkLm9wdGlvbnMpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIEVuc3VyZSB0aGUgcmV0dXJuZWQgZXJyb3IgaXMgYWx3YXlzIGJvdGggYSBwcm9taXNlIGFuZCBhIGNoaWxkIHByb2Nlc3Ncblx0XHRjb25zdCBkdW1teVNwYXduZWQgPSBuZXcgY2hpbGRQcm9jZXNzLkNoaWxkUHJvY2VzcygpO1xuXHRcdGNvbnN0IGVycm9yUHJvbWlzZSA9IFByb21pc2UucmVqZWN0KG1ha2VFcnJvcih7XG5cdFx0XHRlcnJvcixcblx0XHRcdHN0ZG91dDogJycsXG5cdFx0XHRzdGRlcnI6ICcnLFxuXHRcdFx0YWxsOiAnJyxcblx0XHRcdGNvbW1hbmQsXG5cdFx0XHRlc2NhcGVkQ29tbWFuZCxcblx0XHRcdHBhcnNlZCxcblx0XHRcdHRpbWVkT3V0OiBmYWxzZSxcblx0XHRcdGlzQ2FuY2VsZWQ6IGZhbHNlLFxuXHRcdFx0a2lsbGVkOiBmYWxzZVxuXHRcdH0pKTtcblx0XHRyZXR1cm4gbWVyZ2VQcm9taXNlKGR1bW15U3Bhd25lZCwgZXJyb3JQcm9taXNlKTtcblx0fVxuXG5cdGNvbnN0IHNwYXduZWRQcm9taXNlID0gZ2V0U3Bhd25lZFByb21pc2Uoc3Bhd25lZCk7XG5cdGNvbnN0IHRpbWVkUHJvbWlzZSA9IHNldHVwVGltZW91dChzcGF3bmVkLCBwYXJzZWQub3B0aW9ucywgc3Bhd25lZFByb21pc2UpO1xuXHRjb25zdCBwcm9jZXNzRG9uZSA9IHNldEV4aXRIYW5kbGVyKHNwYXduZWQsIHBhcnNlZC5vcHRpb25zLCB0aW1lZFByb21pc2UpO1xuXG5cdGNvbnN0IGNvbnRleHQgPSB7aXNDYW5jZWxlZDogZmFsc2V9O1xuXG5cdHNwYXduZWQua2lsbCA9IHNwYXduZWRLaWxsLmJpbmQobnVsbCwgc3Bhd25lZC5raWxsLmJpbmQoc3Bhd25lZCkpO1xuXHRzcGF3bmVkLmNhbmNlbCA9IHNwYXduZWRDYW5jZWwuYmluZChudWxsLCBzcGF3bmVkLCBjb250ZXh0KTtcblxuXHRjb25zdCBoYW5kbGVQcm9taXNlID0gYXN5bmMgKCkgPT4ge1xuXHRcdGNvbnN0IFt7ZXJyb3IsIGV4aXRDb2RlLCBzaWduYWwsIHRpbWVkT3V0fSwgc3Rkb3V0UmVzdWx0LCBzdGRlcnJSZXN1bHQsIGFsbFJlc3VsdF0gPSBhd2FpdCBnZXRTcGF3bmVkUmVzdWx0KHNwYXduZWQsIHBhcnNlZC5vcHRpb25zLCBwcm9jZXNzRG9uZSk7XG5cdFx0Y29uc3Qgc3Rkb3V0ID0gaGFuZGxlT3V0cHV0KHBhcnNlZC5vcHRpb25zLCBzdGRvdXRSZXN1bHQpO1xuXHRcdGNvbnN0IHN0ZGVyciA9IGhhbmRsZU91dHB1dChwYXJzZWQub3B0aW9ucywgc3RkZXJyUmVzdWx0KTtcblx0XHRjb25zdCBhbGwgPSBoYW5kbGVPdXRwdXQocGFyc2VkLm9wdGlvbnMsIGFsbFJlc3VsdCk7XG5cblx0XHRpZiAoZXJyb3IgfHwgZXhpdENvZGUgIT09IDAgfHwgc2lnbmFsICE9PSBudWxsKSB7XG5cdFx0XHRjb25zdCByZXR1cm5lZEVycm9yID0gbWFrZUVycm9yKHtcblx0XHRcdFx0ZXJyb3IsXG5cdFx0XHRcdGV4aXRDb2RlLFxuXHRcdFx0XHRzaWduYWwsXG5cdFx0XHRcdHN0ZG91dCxcblx0XHRcdFx0c3RkZXJyLFxuXHRcdFx0XHRhbGwsXG5cdFx0XHRcdGNvbW1hbmQsXG5cdFx0XHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdFx0XHRwYXJzZWQsXG5cdFx0XHRcdHRpbWVkT3V0LFxuXHRcdFx0XHRpc0NhbmNlbGVkOiBjb250ZXh0LmlzQ2FuY2VsZWQsXG5cdFx0XHRcdGtpbGxlZDogc3Bhd25lZC5raWxsZWRcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIXBhcnNlZC5vcHRpb25zLnJlamVjdCkge1xuXHRcdFx0XHRyZXR1cm4gcmV0dXJuZWRFcnJvcjtcblx0XHRcdH1cblxuXHRcdFx0dGhyb3cgcmV0dXJuZWRFcnJvcjtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29tbWFuZCxcblx0XHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdFx0ZXhpdENvZGU6IDAsXG5cdFx0XHRzdGRvdXQsXG5cdFx0XHRzdGRlcnIsXG5cdFx0XHRhbGwsXG5cdFx0XHRmYWlsZWQ6IGZhbHNlLFxuXHRcdFx0dGltZWRPdXQ6IGZhbHNlLFxuXHRcdFx0aXNDYW5jZWxlZDogZmFsc2UsXG5cdFx0XHRraWxsZWQ6IGZhbHNlXG5cdFx0fTtcblx0fTtcblxuXHRjb25zdCBoYW5kbGVQcm9taXNlT25jZSA9IG9uZXRpbWUoaGFuZGxlUHJvbWlzZSk7XG5cblx0aGFuZGxlSW5wdXQoc3Bhd25lZCwgcGFyc2VkLm9wdGlvbnMuaW5wdXQpO1xuXG5cdHNwYXduZWQuYWxsID0gbWFrZUFsbFN0cmVhbShzcGF3bmVkLCBwYXJzZWQub3B0aW9ucyk7XG5cblx0cmV0dXJuIG1lcmdlUHJvbWlzZShzcGF3bmVkLCBoYW5kbGVQcm9taXNlT25jZSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4ZWNhO1xuXG5tb2R1bGUuZXhwb3J0cy5zeW5jID0gKGZpbGUsIGFyZ3MsIG9wdGlvbnMpID0+IHtcblx0Y29uc3QgcGFyc2VkID0gaGFuZGxlQXJndW1lbnRzKGZpbGUsIGFyZ3MsIG9wdGlvbnMpO1xuXHRjb25zdCBjb21tYW5kID0gam9pbkNvbW1hbmQoZmlsZSwgYXJncyk7XG5cdGNvbnN0IGVzY2FwZWRDb21tYW5kID0gZ2V0RXNjYXBlZENvbW1hbmQoZmlsZSwgYXJncyk7XG5cblx0dmFsaWRhdGVJbnB1dFN5bmMocGFyc2VkLm9wdGlvbnMpO1xuXG5cdGxldCByZXN1bHQ7XG5cdHRyeSB7XG5cdFx0cmVzdWx0ID0gY2hpbGRQcm9jZXNzLnNwYXduU3luYyhwYXJzZWQuZmlsZSwgcGFyc2VkLmFyZ3MsIHBhcnNlZC5vcHRpb25zKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHR0aHJvdyBtYWtlRXJyb3Ioe1xuXHRcdFx0ZXJyb3IsXG5cdFx0XHRzdGRvdXQ6ICcnLFxuXHRcdFx0c3RkZXJyOiAnJyxcblx0XHRcdGFsbDogJycsXG5cdFx0XHRjb21tYW5kLFxuXHRcdFx0ZXNjYXBlZENvbW1hbmQsXG5cdFx0XHRwYXJzZWQsXG5cdFx0XHR0aW1lZE91dDogZmFsc2UsXG5cdFx0XHRpc0NhbmNlbGVkOiBmYWxzZSxcblx0XHRcdGtpbGxlZDogZmFsc2Vcblx0XHR9KTtcblx0fVxuXG5cdGNvbnN0IHN0ZG91dCA9IGhhbmRsZU91dHB1dChwYXJzZWQub3B0aW9ucywgcmVzdWx0LnN0ZG91dCwgcmVzdWx0LmVycm9yKTtcblx0Y29uc3Qgc3RkZXJyID0gaGFuZGxlT3V0cHV0KHBhcnNlZC5vcHRpb25zLCByZXN1bHQuc3RkZXJyLCByZXN1bHQuZXJyb3IpO1xuXG5cdGlmIChyZXN1bHQuZXJyb3IgfHwgcmVzdWx0LnN0YXR1cyAhPT0gMCB8fCByZXN1bHQuc2lnbmFsICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSBtYWtlRXJyb3Ioe1xuXHRcdFx0c3Rkb3V0LFxuXHRcdFx0c3RkZXJyLFxuXHRcdFx0ZXJyb3I6IHJlc3VsdC5lcnJvcixcblx0XHRcdHNpZ25hbDogcmVzdWx0LnNpZ25hbCxcblx0XHRcdGV4aXRDb2RlOiByZXN1bHQuc3RhdHVzLFxuXHRcdFx0Y29tbWFuZCxcblx0XHRcdGVzY2FwZWRDb21tYW5kLFxuXHRcdFx0cGFyc2VkLFxuXHRcdFx0dGltZWRPdXQ6IHJlc3VsdC5lcnJvciAmJiByZXN1bHQuZXJyb3IuY29kZSA9PT0gJ0VUSU1FRE9VVCcsXG5cdFx0XHRpc0NhbmNlbGVkOiBmYWxzZSxcblx0XHRcdGtpbGxlZDogcmVzdWx0LnNpZ25hbCAhPT0gbnVsbFxuXHRcdH0pO1xuXG5cdFx0aWYgKCFwYXJzZWQub3B0aW9ucy5yZWplY3QpIHtcblx0XHRcdHJldHVybiBlcnJvcjtcblx0XHR9XG5cblx0XHR0aHJvdyBlcnJvcjtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Y29tbWFuZCxcblx0XHRlc2NhcGVkQ29tbWFuZCxcblx0XHRleGl0Q29kZTogMCxcblx0XHRzdGRvdXQsXG5cdFx0c3RkZXJyLFxuXHRcdGZhaWxlZDogZmFsc2UsXG5cdFx0dGltZWRPdXQ6IGZhbHNlLFxuXHRcdGlzQ2FuY2VsZWQ6IGZhbHNlLFxuXHRcdGtpbGxlZDogZmFsc2Vcblx0fTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmNvbW1hbmQgPSAoY29tbWFuZCwgb3B0aW9ucykgPT4ge1xuXHRjb25zdCBbZmlsZSwgLi4uYXJnc10gPSBwYXJzZUNvbW1hbmQoY29tbWFuZCk7XG5cdHJldHVybiBleGVjYShmaWxlLCBhcmdzLCBvcHRpb25zKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmNvbW1hbmRTeW5jID0gKGNvbW1hbmQsIG9wdGlvbnMpID0+IHtcblx0Y29uc3QgW2ZpbGUsIC4uLmFyZ3NdID0gcGFyc2VDb21tYW5kKGNvbW1hbmQpO1xuXHRyZXR1cm4gZXhlY2Euc3luYyhmaWxlLCBhcmdzLCBvcHRpb25zKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLm5vZGUgPSAoc2NyaXB0UGF0aCwgYXJncywgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdGlmIChhcmdzICYmICFBcnJheS5pc0FycmF5KGFyZ3MpICYmIHR5cGVvZiBhcmdzID09PSAnb2JqZWN0Jykge1xuXHRcdG9wdGlvbnMgPSBhcmdzO1xuXHRcdGFyZ3MgPSBbXTtcblx0fVxuXG5cdGNvbnN0IHN0ZGlvID0gbm9ybWFsaXplU3RkaW8ubm9kZShvcHRpb25zKTtcblx0Y29uc3QgZGVmYXVsdEV4ZWNBcmd2ID0gcHJvY2Vzcy5leGVjQXJndi5maWx0ZXIoYXJnID0+ICFhcmcuc3RhcnRzV2l0aCgnLS1pbnNwZWN0JykpO1xuXG5cdGNvbnN0IHtcblx0XHRub2RlUGF0aCA9IHByb2Nlc3MuZXhlY1BhdGgsXG5cdFx0bm9kZU9wdGlvbnMgPSBkZWZhdWx0RXhlY0FyZ3Zcblx0fSA9IG9wdGlvbnM7XG5cblx0cmV0dXJuIGV4ZWNhKFxuXHRcdG5vZGVQYXRoLFxuXHRcdFtcblx0XHRcdC4uLm5vZGVPcHRpb25zLFxuXHRcdFx0c2NyaXB0UGF0aCxcblx0XHRcdC4uLihBcnJheS5pc0FycmF5KGFyZ3MpID8gYXJncyA6IFtdKVxuXHRcdF0sXG5cdFx0e1xuXHRcdFx0Li4ub3B0aW9ucyxcblx0XHRcdHN0ZGluOiB1bmRlZmluZWQsXG5cdFx0XHRzdGRvdXQ6IHVuZGVmaW5lZCxcblx0XHRcdHN0ZGVycjogdW5kZWZpbmVkLFxuXHRcdFx0c3RkaW8sXG5cdFx0XHRzaGVsbDogZmFsc2Vcblx0XHR9XG5cdCk7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYW5zaVJlZ2V4KHtvbmx5Rmlyc3QgPSBmYWxzZX0gPSB7fSkge1xuXHRjb25zdCBwYXR0ZXJuID0gW1xuXHQgICAgJ1tcXFxcdTAwMUJcXFxcdTAwOUJdW1tcXFxcXSgpIzs/XSooPzooPzooPzooPzo7Wy1hLXpBLVpcXFxcZFxcXFwvIyYuOj0/JUB+X10rKSp8W2EtekEtWlxcXFxkXSsoPzo7Wy1hLXpBLVpcXFxcZFxcXFwvIyYuOj0/JUB+X10qKSopP1xcXFx1MDAwNyknLFxuXHRcdCcoPzooPzpcXFxcZHsxLDR9KD86O1xcXFxkezAsNH0pKik/W1xcXFxkQS1QUi1UWmNmLW50cXJ5PT48fl0pKSdcblx0XS5qb2luKCd8Jyk7XG5cblx0cmV0dXJuIG5ldyBSZWdFeHAocGF0dGVybiwgb25seUZpcnN0ID8gdW5kZWZpbmVkIDogJ2cnKTtcbn1cbiIsImltcG9ydCBhbnNpUmVnZXggZnJvbSAnYW5zaS1yZWdleCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0cmlwQW5zaShzdHJpbmcpIHtcblx0aWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgYSBcXGBzdHJpbmdcXGAsIGdvdCBcXGAke3R5cGVvZiBzdHJpbmd9XFxgYCk7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoYW5zaVJlZ2V4KCksICcnKTtcbn1cbiIsImltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2Vzcyc7XG5pbXBvcnQge3VzZXJJbmZvfSBmcm9tICdub2RlOm9zJztcblxuZXhwb3J0IGNvbnN0IGRldGVjdERlZmF1bHRTaGVsbCA9ICgpID0+IHtcblx0Y29uc3Qge2Vudn0gPSBwcm9jZXNzO1xuXG5cdGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG5cdFx0cmV0dXJuIGVudi5DT01TUEVDIHx8ICdjbWQuZXhlJztcblx0fVxuXG5cdHRyeSB7XG5cdFx0Y29uc3Qge3NoZWxsfSA9IHVzZXJJbmZvKCk7XG5cdFx0aWYgKHNoZWxsKSB7XG5cdFx0XHRyZXR1cm4gc2hlbGw7XG5cdFx0fVxuXHR9IGNhdGNoIHt9XG5cblx0aWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICdkYXJ3aW4nKSB7XG5cdFx0cmV0dXJuIGVudi5TSEVMTCB8fCAnL2Jpbi96c2gnO1xuXHR9XG5cblx0cmV0dXJuIGVudi5TSEVMTCB8fCAnL2Jpbi9zaCc7XG59O1xuXG4vLyBTdG9yZXMgZGVmYXVsdCBzaGVsbCB3aGVuIGltcG9ydGVkLlxuY29uc3QgZGVmYXVsdFNoZWxsID0gZGV0ZWN0RGVmYXVsdFNoZWxsKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRTaGVsbDtcbiIsImltcG9ydCBwcm9jZXNzIGZyb20gJ25vZGU6cHJvY2Vzcyc7XG5pbXBvcnQgZXhlY2EgZnJvbSAnZXhlY2EnO1xuaW1wb3J0IHN0cmlwQW5zaSBmcm9tICdzdHJpcC1hbnNpJztcbmltcG9ydCBkZWZhdWx0U2hlbGwgZnJvbSAnZGVmYXVsdC1zaGVsbCc7XG5cbmNvbnN0IGFyZ3MgPSBbXG5cdCctaWxjJyxcblx0J2VjaG8gLW4gXCJfU0hFTExfRU5WX0RFTElNSVRFUl9cIjsgZW52OyBlY2hvIC1uIFwiX1NIRUxMX0VOVl9ERUxJTUlURVJfXCI7IGV4aXQnLFxuXTtcblxuY29uc3QgZW52ID0ge1xuXHQvLyBEaXNhYmxlcyBPaCBNeSBac2ggYXV0by11cGRhdGUgdGhpbmcgdGhhdCBjYW4gYmxvY2sgdGhlIHByb2Nlc3MuXG5cdERJU0FCTEVfQVVUT19VUERBVEU6ICd0cnVlJyxcbn07XG5cbmNvbnN0IHBhcnNlRW52ID0gZW52ID0+IHtcblx0ZW52ID0gZW52LnNwbGl0KCdfU0hFTExfRU5WX0RFTElNSVRFUl8nKVsxXTtcblx0Y29uc3QgcmV0dXJuVmFsdWUgPSB7fTtcblxuXHRmb3IgKGNvbnN0IGxpbmUgb2Ygc3RyaXBBbnNpKGVudikuc3BsaXQoJ1xcbicpLmZpbHRlcihsaW5lID0+IEJvb2xlYW4obGluZSkpKSB7XG5cdFx0Y29uc3QgW2tleSwgLi4udmFsdWVzXSA9IGxpbmUuc3BsaXQoJz0nKTtcblx0XHRyZXR1cm5WYWx1ZVtrZXldID0gdmFsdWVzLmpvaW4oJz0nKTtcblx0fVxuXG5cdHJldHVybiByZXR1cm5WYWx1ZTtcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaGVsbEVudihzaGVsbCkge1xuXHRpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuXHRcdHJldHVybiBwcm9jZXNzLmVudjtcblx0fVxuXG5cdHRyeSB7XG5cdFx0Y29uc3Qge3N0ZG91dH0gPSBhd2FpdCBleGVjYShzaGVsbCB8fCBkZWZhdWx0U2hlbGwsIGFyZ3MsIHtlbnZ9KTtcblx0XHRyZXR1cm4gcGFyc2VFbnYoc3Rkb3V0KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoc2hlbGwpIHtcblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gcHJvY2Vzcy5lbnY7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGVsbEVudlN5bmMoc2hlbGwpIHtcblx0aWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcblx0XHRyZXR1cm4gcHJvY2Vzcy5lbnY7XG5cdH1cblxuXHR0cnkge1xuXHRcdGNvbnN0IHtzdGRvdXR9ID0gZXhlY2Euc3luYyhzaGVsbCB8fCBkZWZhdWx0U2hlbGwsIGFyZ3MsIHtlbnZ9KTtcblx0XHRyZXR1cm4gcGFyc2VFbnYoc3Rkb3V0KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRpZiAoc2hlbGwpIHtcblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gcHJvY2Vzcy5lbnY7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQge3NoZWxsRW52LCBzaGVsbEVudlN5bmN9IGZyb20gJ3NoZWxsLWVudic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaGVsbFBhdGgoKSB7XG5cdGNvbnN0IHtQQVRIfSA9IGF3YWl0IHNoZWxsRW52KCk7XG5cdHJldHVybiBQQVRIO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hlbGxQYXRoU3luYygpIHtcblx0Y29uc3Qge1BBVEh9ID0gc2hlbGxFbnZTeW5jKCk7XG5cdHJldHVybiBQQVRIO1xufVxuIiwiaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJztcbmltcG9ydCB7c2hlbGxQYXRoU3luY30gZnJvbSAnc2hlbGwtcGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpeFBhdGgoKSB7XG5cdGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0cHJvY2Vzcy5lbnYuUEFUSCA9IHNoZWxsUGF0aFN5bmMoKSB8fCBbXG5cdFx0Jy4vbm9kZV9tb2R1bGVzLy5iaW4nLFxuXHRcdCcvLm5vZGVicmV3L2N1cnJlbnQvYmluJyxcblx0XHQnL3Vzci9sb2NhbC9iaW4nLFxuXHRcdHByb2Nlc3MuZW52LlBBVEgsXG5cdF0uam9pbignOicpO1xufVxuIiwiaW1wb3J0IHsgcmVzb2x2ZSwgZXh0bmFtZSwgcmVsYXRpdmUsIGpvaW4sIHBhcnNlLCBwb3NpeCB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gXCJzdHJlYW1cIjtcbmltcG9ydCB7IGNsaXBib2FyZCB9IGZyb20gXCJlbGVjdHJvblwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTdHJpbmdLZXlNYXA8VD4ge1xuICBba2V5OiBzdHJpbmddOiBUO1xufVxuXG5jb25zdCBJTUFHRV9FWFRfTElTVCA9IFtcbiAgXCIucG5nXCIsXG4gIFwiLmpwZ1wiLFxuICBcIi5qcGVnXCIsXG4gIFwiLmJtcFwiLFxuICBcIi5naWZcIixcbiAgXCIuc3ZnXCIsXG4gIFwiLnRpZmZcIixcbiAgXCIud2VicFwiLFxuICBcIi5hdmlmXCIsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNBbkltYWdlKGV4dDogc3RyaW5nKSB7XG4gIHJldHVybiBJTUFHRV9FWFRfTElTVC5pbmNsdWRlcyhleHQudG9Mb3dlckNhc2UoKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNBc3NldFR5cGVBbkltYWdlKHBhdGg6IHN0cmluZyk6IEJvb2xlYW4ge1xuICByZXR1cm4gaXNBbkltYWdlKGV4dG5hbWUocGF0aCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T1MoKSB7XG4gIGNvbnN0IHsgYXBwVmVyc2lvbiB9ID0gbmF2aWdhdG9yO1xuICBpZiAoYXBwVmVyc2lvbi5pbmRleE9mKFwiV2luXCIpICE9PSAtMSkge1xuICAgIHJldHVybiBcIldpbmRvd3NcIjtcbiAgfSBlbHNlIGlmIChhcHBWZXJzaW9uLmluZGV4T2YoXCJNYWNcIikgIT09IC0xKSB7XG4gICAgcmV0dXJuIFwiTWFjT1NcIjtcbiAgfSBlbHNlIGlmIChhcHBWZXJzaW9uLmluZGV4T2YoXCJYMTFcIikgIT09IC0xKSB7XG4gICAgcmV0dXJuIFwiTGludXhcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJVbmtub3duIE9TXCI7XG4gIH1cbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdHJlYW1Ub1N0cmluZyhzdHJlYW06IFJlYWRhYmxlKSB7XG4gIGNvbnN0IGNodW5rcyA9IFtdO1xuXG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2Ygc3RyZWFtKSB7XG4gICAgY2h1bmtzLnB1c2goQnVmZmVyLmZyb20oY2h1bmspKTtcbiAgfVxuXG4gIHJldHVybiBCdWZmZXIuY29uY2F0KGNodW5rcykudG9TdHJpbmcoXCJ1dGYtOFwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVybEFzc2V0KHVybDogc3RyaW5nKSB7XG4gIHJldHVybiAodXJsID0gdXJsLnN1YnN0cigxICsgdXJsLmxhc3RJbmRleE9mKFwiL1wiKSkuc3BsaXQoXCI/XCIpWzBdKS5zcGxpdChcbiAgICBcIiNcIlxuICApWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb3B5SW1hZ2VGaWxlKCkge1xuICBsZXQgZmlsZVBhdGggPSBcIlwiO1xuICBjb25zdCBvcyA9IGdldE9TKCk7XG5cbiAgaWYgKG9zID09PSBcIldpbmRvd3NcIikge1xuICAgIHZhciByYXdGaWxlUGF0aCA9IGNsaXBib2FyZC5yZWFkKFwiRmlsZU5hbWVXXCIpO1xuICAgIGZpbGVQYXRoID0gcmF3RmlsZVBhdGgucmVwbGFjZShuZXcgUmVnRXhwKFN0cmluZy5mcm9tQ2hhckNvZGUoMCksIFwiZ1wiKSwgXCJcIik7XG4gIH0gZWxzZSBpZiAob3MgPT09IFwiTWFjT1NcIikge1xuICAgIGZpbGVQYXRoID0gY2xpcGJvYXJkLnJlYWQoXCJwdWJsaWMuZmlsZS11cmxcIikucmVwbGFjZShcImZpbGU6Ly9cIiwgXCJcIik7XG4gIH0gZWxzZSB7XG4gICAgZmlsZVBhdGggPSBcIlwiO1xuICB9XG4gIHJldHVybiBpc0Fzc2V0VHlwZUFuSW1hZ2UoZmlsZVBhdGgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGFzdEltYWdlKGxpc3Q6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IHJldmVyc2VkTGlzdCA9IGxpc3QucmV2ZXJzZSgpO1xuICBsZXQgbGFzdEltYWdlO1xuICByZXZlcnNlZExpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpZiAoaXRlbSAmJiBpdGVtLnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XG4gICAgICBsYXN0SW1hZ2UgPSBpdGVtO1xuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGxhc3RJbWFnZTtcbn1cblxuaW50ZXJmYWNlIEFueU9iaiB7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Q8VCBleHRlbmRzIEFueU9iaj4oXG4gIGFycjogVFtdLFxuICBrZXk6IHN0cmluZ1xuKTogeyBba2V5OiBzdHJpbmddOiBUIH0ge1xuICBjb25zdCBvYmo6IHsgW2tleTogc3RyaW5nXTogVCB9ID0ge307XG4gIGFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIG9ialtlbGVtZW50W2tleV1dID0gZWxlbWVudDtcbiAgfSk7XG4gIHJldHVybiBvYmo7XG59XG4iLCJpbXBvcnQgeyBQbHVnaW5TZXR0aW5ncyB9IGZyb20gXCIuL3NldHRpbmdcIjtcbmltcG9ydCB7IHN0cmVhbVRvU3RyaW5nLCBnZXRMYXN0SW1hZ2UgfSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBOb3RpY2UsIHJlcXVlc3RVcmwgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IGludGVyZmFjZSBQaWNHb1Jlc3BvbnNlIHtcbiAgc3VjY2Vzczogc3RyaW5nO1xuICBtc2c6IHN0cmluZztcbiAgcmVzdWx0OiBzdHJpbmdbXTtcbiAgZnVsbFJlc3VsdDogUmVjb3JkPHN0cmluZywgYW55PltdO1xufVxuXG5leHBvcnQgY2xhc3MgUGljR29VcGxvYWRlciB7XG4gIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncztcblxuICBjb25zdHJ1Y3RvcihzZXR0aW5nczogUGx1Z2luU2V0dGluZ3MpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gIH1cblxuICBhc3luYyB1cGxvYWRGaWxlcyhmaWxlTGlzdDogQXJyYXk8U3RyaW5nPik6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHtcbiAgICAgIHVybDogdGhpcy5zZXR0aW5ncy51cGxvYWRTZXJ2ZXIsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBsaXN0OiBmaWxlTGlzdCB9KSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYXN5bmMgdXBsb2FkRmlsZUJ5Q2xpcGJvYXJkKCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdFVybCh7XG4gICAgICB1cmw6IHRoaXMuc2V0dGluZ3MudXBsb2FkU2VydmVyLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICB9KTtcblxuICAgIGxldCBkYXRhOiBQaWNHb1Jlc3BvbnNlID0gcmVzLmpzb247XG5cbiAgICBpZiAocmVzLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICBsZXQgZXJyID0geyByZXNwb25zZTogZGF0YSwgYm9keTogZGF0YS5tc2cgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IC0xLFxuICAgICAgICBtc2c6IGRhdGEubXNnLFxuICAgICAgICBkYXRhOiBcIlwiLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogMCxcbiAgICAgICAgbXNnOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgZGF0YTogdHlwZW9mIGRhdGEucmVzdWx0ID09IFwic3RyaW5nXCIgPyBkYXRhLnJlc3VsdCA6IGRhdGEucmVzdWx0WzBdLFxuICAgICAgICBmdWxsUmVzdWx0OiBkYXRhLmZ1bGxSZXN1bHQgfHwgW10sXG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGljR29Db3JlVXBsb2FkZXIge1xuICBzZXR0aW5nczogUGx1Z2luU2V0dGluZ3M7XG5cbiAgY29uc3RydWN0b3Ioc2V0dGluZ3M6IFBsdWdpblNldHRpbmdzKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICB9XG5cbiAgYXN5bmMgdXBsb2FkRmlsZXMoZmlsZUxpc3Q6IEFycmF5PFN0cmluZz4pOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGxlbmd0aCA9IGZpbGVMaXN0Lmxlbmd0aDtcbiAgICBsZXQgY2xpID0gdGhpcy5zZXR0aW5ncy5waWNnb0NvcmVQYXRoIHx8IFwicGljZ29cIjtcbiAgICBsZXQgY29tbWFuZCA9IGAke2NsaX0gdXBsb2FkICR7ZmlsZUxpc3RcbiAgICAgIC5tYXAoaXRlbSA9PiBgXCIke2l0ZW19XCJgKVxuICAgICAgLmpvaW4oXCIgXCIpfWA7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmV4ZWMoY29tbWFuZCk7XG4gICAgY29uc3Qgc3BsaXRMaXN0ID0gcmVzLnNwbGl0KFwiXFxuXCIpO1xuICAgIGNvbnN0IHNwbGl0TGlzdExlbmd0aCA9IHNwbGl0TGlzdC5sZW5ndGg7XG4gICAgY29uc29sZS5sb2coc3BsaXRMaXN0TGVuZ3RoKTtcblxuICAgIGNvbnN0IGRhdGEgPSBzcGxpdExpc3Quc3BsaWNlKHNwbGl0TGlzdExlbmd0aCAtIDEgLSBsZW5ndGgsIGxlbmd0aCk7XG5cbiAgICBpZiAocmVzLmluY2x1ZGVzKFwiUGljR28gRVJST1JcIikpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICBtc2c6IFwi5aSx6LSlXCIsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICByZXN1bHQ6IGRhdGEsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyB7c3VjY2Vzczp0cnVlLHJlc3VsdDpbXX1cbiAgfVxuXG4gIC8vIFBpY0dvLUNvcmUg5LiK5Lyg5aSE55CGXG4gIGFzeW5jIHVwbG9hZEZpbGVCeUNsaXBib2FyZCgpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLnVwbG9hZEJ5Q2xpcCgpO1xuICAgIGNvbnN0IHNwbGl0TGlzdCA9IHJlcy5zcGxpdChcIlxcblwiKTtcbiAgICBjb25zdCBsYXN0SW1hZ2UgPSBnZXRMYXN0SW1hZ2Uoc3BsaXRMaXN0KTtcblxuICAgIGlmIChsYXN0SW1hZ2UpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IDAsXG4gICAgICAgIG1zZzogXCJzdWNjZXNzXCIsXG4gICAgICAgIGRhdGE6IGxhc3RJbWFnZSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBOb3RpY2UoYFwiUGxlYXNlIGNoZWNrIFBpY0dvLUNvcmUgY29uZmlnXCJcXG4ke3Jlc31gKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IC0xLFxuICAgICAgICBtc2c6IGBcIlBsZWFzZSBjaGVjayBQaWNHby1Db3JlIGNvbmZpZ1wiXFxuJHtyZXN9YCxcbiAgICAgICAgZGF0YTogXCJcIixcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLy8gUGljR28tQ29yZeeahOWJquWIh+S4iuS8oOWPjemmiFxuICBhc3luYyB1cGxvYWRCeUNsaXAoKSB7XG4gICAgbGV0IGNvbW1hbmQ7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MucGljZ29Db3JlUGF0aCkge1xuICAgICAgY29tbWFuZCA9IGAke3RoaXMuc2V0dGluZ3MucGljZ29Db3JlUGF0aH0gdXBsb2FkYDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tbWFuZCA9IGBwaWNnbyB1cGxvYWRgO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLmV4ZWMoY29tbWFuZCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGFzeW5jIGV4ZWMoY29tbWFuZDogc3RyaW5nKSB7XG4gICAgbGV0IHsgc3Rkb3V0IH0gPSBhd2FpdCBleGVjKGNvbW1hbmQpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHN0cmVhbVRvU3RyaW5nKHN0ZG91dCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgSVN0cmluZ0tleU1hcCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBBcHAsIHJlcXVlc3RVcmwgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBpbWFnZUF1dG9VcGxvYWRQbHVnaW4gZnJvbSBcIi4vbWFpblwiO1xuXG5leHBvcnQgY2xhc3MgUGljR29EZWxldGVyIHtcbiAgcGx1Z2luOiBpbWFnZUF1dG9VcGxvYWRQbHVnaW47XG5cbiAgY29uc3RydWN0b3IocGx1Z2luOiBpbWFnZUF1dG9VcGxvYWRQbHVnaW4pIHtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZUltYWdlKGNvbmZpZ01hcDogSVN0cmluZ0tleU1hcDxhbnk+W10pIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoe1xuICAgICAgdXJsOiB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kZWxldGVTZXJ2ZXIsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBsaXN0OiBjb25maWdNYXAsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbjtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTWFya2Rvd25WaWV3LCBBcHAgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcInBhdGhcIjtcblxuaW50ZXJmYWNlIEltYWdlIHtcbiAgcGF0aDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHNvdXJjZTogc3RyaW5nO1xufVxuY29uc3QgUkVHRVhfRklMRSA9IC9cXCFcXFsoLio/KVxcXVxcKCguKj8pXFwpL2c7XG5jb25zdCBSRUdFWF9XSUtJX0ZJTEUgPSAvXFwhXFxbXFxbKC4qPykoXFxzXFx8Lio/KT9cXF1cXF0vZztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVscGVyIHtcbiAgYXBwOiBBcHA7XG5cbiAgY29uc3RydWN0b3IoYXBwOiBBcHApIHtcbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgfVxuICBnZXRGcm9udG1hdHRlclZhbHVlKGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IGFueSA9IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGZpbGUgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xuICAgIGlmICghZmlsZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgcGF0aCA9IGZpbGUucGF0aDtcbiAgICBjb25zdCBjYWNoZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Q2FjaGUocGF0aCk7XG5cbiAgICBsZXQgdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gICAgaWYgKGNhY2hlPy5mcm9udG1hdHRlciAmJiBjYWNoZS5mcm9udG1hdHRlci5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICB2YWx1ZSA9IGNhY2hlLmZyb250bWF0dGVyW2tleV07XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGdldEVkaXRvcigpIHtcbiAgICBjb25zdCBtZFZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgIGlmIChtZFZpZXcpIHtcbiAgICAgIHJldHVybiBtZFZpZXcuZWRpdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbiAgZ2V0VmFsdWUoKSB7XG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5nZXRFZGl0b3IoKTtcbiAgICByZXR1cm4gZWRpdG9yLmdldFZhbHVlKCk7XG4gIH1cblxuICBzZXRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5nZXRFZGl0b3IoKTtcbiAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gZWRpdG9yLmdldFNjcm9sbEluZm8oKTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IGVkaXRvci5nZXRDdXJzb3IoKTtcblxuICAgIGVkaXRvci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgZWRpdG9yLnNjcm9sbFRvKGxlZnQsIHRvcCk7XG4gICAgZWRpdG9yLnNldEN1cnNvcihwb3NpdGlvbik7XG4gIH1cblxuICAvLyBnZXQgYWxsIGZpbGUgdXJscywgaW5jbHVkZSBsb2NhbCBhbmQgaW50ZXJuZXRcbiAgZ2V0QWxsRmlsZXMoKTogSW1hZ2VbXSB7XG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5nZXRFZGl0b3IoKTtcbiAgICBsZXQgdmFsdWUgPSBlZGl0b3IuZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gdGhpcy5nZXRJbWFnZUxpbmsodmFsdWUpO1xuICB9XG4gIGdldEltYWdlTGluayh2YWx1ZTogc3RyaW5nKTogSW1hZ2VbXSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IHZhbHVlLm1hdGNoQWxsKFJFR0VYX0ZJTEUpO1xuICAgIGNvbnN0IFdpa2lNYXRjaGVzID0gdmFsdWUubWF0Y2hBbGwoUkVHRVhfV0lLSV9GSUxFKTtcblxuICAgIGxldCBmaWxlQXJyYXk6IEltYWdlW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xuICAgICAgY29uc3QgbmFtZSA9IG1hdGNoWzFdO1xuICAgICAgY29uc3QgcGF0aCA9IG1hdGNoWzJdO1xuICAgICAgY29uc3Qgc291cmNlID0gbWF0Y2hbMF07XG5cbiAgICAgIGZpbGVBcnJheS5wdXNoKHtcbiAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIFdpa2lNYXRjaGVzKSB7XG4gICAgICBjb25zdCBuYW1lID0gcGFyc2UobWF0Y2hbMV0pLm5hbWU7XG4gICAgICBjb25zdCBwYXRoID0gbWF0Y2hbMV07XG4gICAgICBjb25zdCBzb3VyY2UgPSBtYXRjaFswXTtcbiAgICAgIGZpbGVBcnJheS5wdXNoKHtcbiAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVBcnJheTtcbiAgfVxuXG4gIGhhc0JsYWNrRG9tYWluKHNyYzogc3RyaW5nLCBibGFja0RvbWFpbnM6IHN0cmluZykge1xuICAgIGlmIChibGFja0RvbWFpbnMudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGJsYWNrRG9tYWluTGlzdCA9IGJsYWNrRG9tYWlucy5zcGxpdChcIixcIik7XG4gICAgbGV0IHVybCA9IG5ldyBVUkwoc3JjKTtcbiAgICBjb25zdCBkb21haW4gPSB1cmwuaG9zdG5hbWU7XG5cbiAgICByZXR1cm4gYmxhY2tEb21haW5MaXN0LnNvbWUoYmxhY2tEb21haW4gPT4gZG9tYWluLmluY2x1ZGVzKGJsYWNrRG9tYWluKSk7XG4gIH1cbn1cbiIsIi8vINin2YTYudix2KjZitipXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwiLy8gxI1lxaF0aW5hXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwiLy8gRGFuc2tcblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCIvLyBEZXV0c2NoXG5cbmV4cG9ydCBkZWZhdWx0IHt9OyIsIi8vIEVuZ2xpc2hcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBzZXR0aW5nLnRzXG4gIFwiUGx1Z2luIFNldHRpbmdzXCI6IFwiUGx1Z2luIFNldHRpbmdzXCIsXG4gIFwiQXV0byBwYXN0ZWQgdXBsb2FkXCI6IFwiQXV0byBwYXN0ZWQgdXBsb2FkXCIsXG4gIFwiSWYgeW91IHNldCB0aGlzIHZhbHVlIHRydWUsIHdoZW4geW91IHBhc3RlIGltYWdlLCBpdCB3aWxsIGJlIGF1dG8gdXBsb2FkZWQoeW91IHNob3VsZCBzZXQgdGhlIHBpY0dvIHNlcnZlciByaWdodGx5KVwiOlxuICAgIFwiSWYgeW91IHNldCB0aGlzIHZhbHVlIHRydWUsIHdoZW4geW91IHBhc3RlIGltYWdlLCBpdCB3aWxsIGJlIGF1dG8gdXBsb2FkZWQoeW91IHNob3VsZCBzZXQgdGhlIHBpY0dvIHNlcnZlciByaWdodGx5KVwiLFxuICBcIkRlZmF1bHQgdXBsb2FkZXJcIjogXCJEZWZhdWx0IHVwbG9hZGVyXCIsXG4gIFwiUGljR28gc2VydmVyXCI6IFwiUGljR28gc2VydmVyXCIsXG4gIFwiUGxlYXNlIGlucHV0IFBpY0dvIHNlcnZlclwiOiBcIlBsZWFzZSBpbnB1dCBQaWNHbyBzZXJ2ZXJcIixcbiAgXCJQaWNHbyBkZWxldGUgc2VydmVyXCI6XG4gICAgXCJQaWNHbyBzZXJ2ZXIgZGVsZXRlIHJvdXRlKHlvdSBuZWVkIHRvIHVzZSBQaWNMaXN0IGFwcClcIixcbiAgXCJQaWNMaXN0IGRlc2NcIjogXCJTZWFyY2ggUGljTGlzdCBvbiBHaXRodWIgdG8gZG93bmxvYWQgYW5kIGluc3RhbGxcIixcbiAgXCJQbGVhc2UgaW5wdXQgUGljR28gZGVsZXRlIHNlcnZlclwiOiBcIlBsZWFzZSBpbnB1dCBQaWNHbyBkZWxldGUgc2VydmVyXCIsXG4gIFwiRGVsZXRlIGltYWdlIHVzaW5nIFBpY0xpc3RcIjogXCJEZWxldGUgaW1hZ2UgdXNpbmcgUGljTGlzdFwiLFxuICBcIlBpY0dvLUNvcmUgcGF0aFwiOiBcIlBpY0dvLUNvcmUgcGF0aFwiLFxuICBcIkRlbGV0ZSBzdWNjZXNzZnVsbHlcIjogXCJEZWxldGUgc3VjY2Vzc2Z1bGx5XCIsXG4gIFwiRGVsZXRlIGZhaWxlZFwiOiBcIkRlbGV0ZSBmYWlsZWRcIixcbiAgXCJJbWFnZSBzaXplIHN1ZmZpeFwiOiBcIkltYWdlIHNpemUgc3VmZml4XCIsXG4gIFwiSW1hZ2Ugc2l6ZSBzdWZmaXggRGVzY3JpcHRpb25cIjogXCJsaWtlIHwzMDAgZm9yIHJlc2l6ZSBpbWFnZSBpbiBvYi5cIixcbiAgXCJQbGVhc2UgaW5wdXQgaW1hZ2Ugc2l6ZSBzdWZmaXhcIjogXCJQbGVhc2UgaW5wdXQgaW1hZ2Ugc2l6ZSBzdWZmaXhcIixcbiAgXCJFcnJvciwgY291bGQgbm90IGRlbGV0ZVwiOiBcIkVycm9yLCBjb3VsZCBub3QgZGVsZXRlXCIsXG4gIFwiUGxlYXNlIGlucHV0IFBpY0dvLUNvcmUgcGF0aCwgZGVmYXVsdCB1c2luZyBlbnZpcm9ubWVudCB2YXJpYWJsZXNcIjpcbiAgICBcIlBsZWFzZSBpbnB1dCBQaWNHby1Db3JlIHBhdGgsIGRlZmF1bHQgdXNpbmcgZW52aXJvbm1lbnQgdmFyaWFibGVzXCIsXG4gIFwiV29yayBvbiBuZXR3b3JrXCI6IFwiV29yayBvbiBuZXR3b3JrXCIsXG4gIFwiV29yayBvbiBuZXR3b3JrIERlc2NyaXB0aW9uXCI6XG4gICAgXCJBbGxvdyB1cGxvYWQgbmV0d29yayBpbWFnZSBieSAnVXBsb2FkIGFsbCcgY29tbWFuZC5cXG4gT3Igd2hlbiB5b3UgcGFzdGUsIG1kIHN0YW5kYXJkIGltYWdlIGxpbmsgaW4geW91ciBjbGlwYm9hcmQgd2lsbCBiZSBhdXRvIHVwbG9hZC5cIixcbiAgZml4UGF0aDogXCJmaXhQYXRoXCIsXG4gIGZpeFBhdGhXYXJuaW5nOlxuICAgIFwiVGhpcyBvcHRpb24gaXMgdXNlZCB0byBmaXggUGljR28tY29yZSB1cGxvYWQgZmFpbHVyZXMgb24gTGludXggYW5kIE1hYy4gSXQgbW9kaWZpZXMgdGhlIFBBVEggdmFyaWFibGUgd2l0aGluIE9ic2lkaWFuLiBJZiBPYnNpZGlhbiBlbmNvdW50ZXJzIGFueSBidWdzLCB0dXJuIG9mZiB0aGUgb3B0aW9uLCB0cnkgYWdhaW4hIFwiLFxuICBcIlVwbG9hZCB3aGVuIGNsaXBib2FyZCBoYXMgaW1hZ2UgYW5kIHRleHQgdG9nZXRoZXJcIjpcbiAgICBcIlVwbG9hZCB3aGVuIGNsaXBib2FyZCBoYXMgaW1hZ2UgYW5kIHRleHQgdG9nZXRoZXJcIixcbiAgXCJXaGVuIHlvdSBjb3B5LCBzb21lIGFwcGxpY2F0aW9uIGxpa2UgRXhjZWwgd2lsbCBpbWFnZSBhbmQgdGV4dCB0byBjbGlwYm9hcmQsIHlvdSBjYW4gdXBsb2FkIG9yIG5vdC5cIjpcbiAgICBcIldoZW4geW91IGNvcHksIHNvbWUgYXBwbGljYXRpb24gbGlrZSBFeGNlbCB3aWxsIGltYWdlIGFuZCB0ZXh0IHRvIGNsaXBib2FyZCwgeW91IGNhbiB1cGxvYWQgb3Igbm90LlwiLFxuICBcIk5ldHdvcmsgRG9tYWluIEJsYWNrIExpc3RcIjogXCJOZXR3b3JrIERvbWFpbiBCbGFjayBMaXN0XCIsXG4gIFwiTmV0d29yayBEb21haW4gQmxhY2sgTGlzdCBEZXNjcmlwdGlvblwiOlxuICAgIFwiSW1hZ2UgaW4gdGhlIGRvbWFpbiBsaXN0IHdpbGwgbm90IGJlIHVwbG9hZCx1c2UgY29tbWEgc2VwYXJhdGVkXCIsXG4gIFwiRGVsZXRlIHNvdXJjZSBmaWxlIGFmdGVyIHlvdSB1cGxvYWQgZmlsZVwiOlxuICAgIFwiRGVsZXRlIHNvdXJjZSBmaWxlIGFmdGVyIHlvdSB1cGxvYWQgZmlsZVwiLFxuICBcIkRlbGV0ZSBzb3VyY2UgZmlsZSBpbiBvYiBhc3NldHMgYWZ0ZXIgeW91IHVwbG9hZCBmaWxlLlwiOlxuICAgIFwiRGVsZXRlIHNvdXJjZSBmaWxlIGluIG9iIGFzc2V0cyBhZnRlciB5b3UgdXBsb2FkIGZpbGUuXCIsXG59O1xuIiwiLy8gQnJpdGlzaCBFbmdsaXNoXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwiLy8gRXNwYcOxb2xcblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCIvLyBmcmFuw6dhaXNcblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCIvLyDgpLngpL/gpKjgpY3gpKbgpYBcblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCIvLyBCYWhhc2EgSW5kb25lc2lhXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwiLy8gSXRhbGlhbm9cblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCIvLyDml6XmnKzoqp5cblxuZXhwb3J0IGRlZmF1bHQge307IiwiLy8g7ZWc6rWt7Ja0XG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwiLy8gTmVkZXJsYW5kc1xuXG5leHBvcnQgZGVmYXVsdCB7fTtcbiIsIi8vIE5vcnNrXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwiLy8gasSZenlrIHBvbHNraVxuXG5leHBvcnQgZGVmYXVsdCB7fTtcbiIsIi8vIFBvcnR1Z3XDqnNcblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCIvLyBQb3J0dWd1w6pzIGRvIEJyYXNpbFxuLy8gQnJhemlsaWFuIFBvcnR1Z3Vlc2VcblxuZXhwb3J0IGRlZmF1bHQge307IiwiLy8gUm9tw6JuxINcblxuZXhwb3J0IGRlZmF1bHQge307XG4iLCIvLyDRgNGD0YHRgdC60LjQuVxuXG5leHBvcnQgZGVmYXVsdCB7fTtcbiIsIi8vIFTDvHJrw6dlXG5cbmV4cG9ydCBkZWZhdWx0IHt9O1xuIiwiLy8g566A5L2T5Lit5paHXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gc2V0dGluZy50c1xuICBcIlBsdWdpbiBTZXR0aW5nc1wiOiBcIuaPkuS7tuiuvue9rlwiLFxuICBcIkF1dG8gcGFzdGVkIHVwbG9hZFwiOiBcIuWJquWIh+adv+iHquWKqOS4iuS8oFwiLFxuICBcIklmIHlvdSBzZXQgdGhpcyB2YWx1ZSB0cnVlLCB3aGVuIHlvdSBwYXN0ZSBpbWFnZSwgaXQgd2lsbCBiZSBhdXRvIHVwbG9hZGVkKHlvdSBzaG91bGQgc2V0IHRoZSBwaWNHbyBzZXJ2ZXIgcmlnaHRseSlcIjpcbiAgICBcIuWQr+eUqOivpemAiemhueWQju+8jOm7j+i0tOWbvueJh+aXtuS8muiHquWKqOS4iuS8oO+8iOS9oOmcgOimgeato+ehrumFjee9rnBpY2dv77yJXCIsXG4gIFwiRGVmYXVsdCB1cGxvYWRlclwiOiBcIum7mOiupOS4iuS8oOWZqFwiLFxuICBcIlBpY0dvIHNlcnZlclwiOiBcIlBpY0dvIHNlcnZlclwiLFxuICBcIlBsZWFzZSBpbnB1dCBQaWNHbyBzZXJ2ZXJcIjogXCLor7fovpPlhaUgUGljR28gc2VydmVyXCIsXG4gIFwiUGljR28gZGVsZXRlIHNlcnZlclwiOiBcIlBpY0dvIHNlcnZlciDliKDpmaTmjqXlj6Mo6K+35L2/55SoUGljTGlzdOadpeWQr+eUqOatpOWKn+iDvSlcIixcbiAgXCJQaWNMaXN0IGRlc2NcIjogXCJQaWNMaXN05pivUGljR2/kuozmrKHlvIDlj5HniYjvvIzor7dHaXRodWLmkJzntKJQaWNMaXN05LiL6L29XCIsXG4gIFwiUGxlYXNlIGlucHV0IFBpY0dvIGRlbGV0ZSBzZXJ2ZXJcIjogXCLor7fovpPlhaUgUGljR28gc2VydmVyIOWIoOmZpOaOpeWPo1wiLFxuICBcIkRlbGV0ZSBpbWFnZSB1c2luZyBQaWNMaXN0XCI6IFwi5L2/55SoIFBpY0xpc3Qg5Yig6Zmk5Zu+54mHXCIsXG4gIFwiUGljR28tQ29yZSBwYXRoXCI6IFwiUGljR28tQ29yZSDot6/lvoRcIixcbiAgXCJEZWxldGUgc3VjY2Vzc2Z1bGx5XCI6IFwi5Yig6Zmk5oiQ5YqfXCIsXG4gIFwiRGVsZXRlIGZhaWxlZFwiOiBcIuWIoOmZpOWksei0pVwiLFxuICBcIkVycm9yLCBjb3VsZCBub3QgZGVsZXRlXCI6IFwi6ZSZ6K+v77yM5peg5rOV5Yig6ZmkXCIsXG4gIFwiSW1hZ2Ugc2l6ZSBzdWZmaXhcIjogXCLlm77niYflpKflsI/lkI7nvIBcIixcbiAgXCJJbWFnZSBzaXplIHN1ZmZpeCBEZXNjcmlwdGlvblwiOiBcIuavlOWmgu+8mnwzMDAg55So5LqO6LCD5pW05Zu+54mH5aSn5bCPXCIsXG4gIFwiUGxlYXNlIGlucHV0IGltYWdlIHNpemUgc3VmZml4XCI6IFwi6K+36L6T5YWl5Zu+54mH5aSn5bCP5ZCO57yAXCIsXG4gIFwiUGxlYXNlIGlucHV0IFBpY0dvLUNvcmUgcGF0aCwgZGVmYXVsdCB1c2luZyBlbnZpcm9ubWVudCB2YXJpYWJsZXNcIjpcbiAgICBcIuivt+i+k+WFpSBQaWNHby1Db3JlIHBhdGjvvIzpu5jorqTkvb/nlKjnjq/looPlj5jph49cIixcbiAgXCJXb3JrIG9uIG5ldHdvcmtcIjogXCLlupTnlKjnvZHnu5zlm77niYdcIixcbiAgXCJXb3JrIG9uIG5ldHdvcmsgRGVzY3JpcHRpb25cIjpcbiAgICBcIuW9k+S9oOS4iuS8oOaJgOacieWbvueJh+aXtu+8jOS5n+S8muS4iuS8oOe9kee7nOWbvueJh+OAguS7peWPiuW9k+S9oOi/m+ihjOm7j+i0tOaXtu+8jOWJquWIh+adv+S4reeahOagh+WHhiBtZCDlm77niYfkvJrooqvkuIrkvKBcIixcbiAgZml4UGF0aDogXCLkv67mraNQQVRI5Y+Y6YePXCIsXG4gIGZpeFBhdGhXYXJuaW5nOlxuICAgIFwi5q2k6YCJ6aG555So5LqO5L+u5aSNTGludXjlkoxNYWPkuIogUGljR28tQ29yZSDkuIrkvKDlpLHotKXnmoTpl67popjjgILlroPkvJrkv67mlLkgT2JzaWRpYW4g5YaF55qEIFBBVEgg5Y+Y6YeP77yM5aaC5p6cIE9ic2lkaWFuIOmBh+WIsOS7u+S9lUJVR++8jOWFiOWFs+mXrei/meS4qumAiemhueivleivle+8gVwiLFxuICBcIlVwbG9hZCB3aGVuIGNsaXBib2FyZCBoYXMgaW1hZ2UgYW5kIHRleHQgdG9nZXRoZXJcIjpcbiAgICBcIuW9k+WJquWIh+adv+WQjOaXtuaLpeacieaWh+acrOWSjOWbvueJh+WJquWIh+adv+aVsOaNruaXtuaYr+WQpuS4iuS8oOWbvueJh1wiLFxuICBcIldoZW4geW91IGNvcHksIHNvbWUgYXBwbGljYXRpb24gbGlrZSBFeGNlbCB3aWxsIGltYWdlIGFuZCB0ZXh0IHRvIGNsaXBib2FyZCwgeW91IGNhbiB1cGxvYWQgb3Igbm90LlwiOlxuICAgIFwi5b2T5L2g5aSN5Yi25pe277yM5p+Q5Lqb5bqU55So5L6L5aaCIEV4Y2VsIOS8muWcqOWJquWIh+adv+WQjOaXtuaWh+acrOWSjOWbvuWDj+aVsOaNru+8jOehruiupOaYr+WQpuS4iuS8oOOAglwiLFxuICBcIk5ldHdvcmsgRG9tYWluIEJsYWNrIExpc3RcIjogXCLnvZHnu5zlm77niYfln5/lkI3pu5HlkI3ljZVcIixcbiAgXCJOZXR3b3JrIERvbWFpbiBCbGFjayBMaXN0IERlc2NyaXB0aW9uXCI6XG4gICAgXCLpu5HlkI3ljZXln5/lkI3kuK3nmoTlm77niYflsIbkuI3kvJrooqvkuIrkvKDvvIznlKjoi7HmlofpgJflj7fliIblibJcIixcbiAgXCJEZWxldGUgc291cmNlIGZpbGUgYWZ0ZXIgeW91IHVwbG9hZCBmaWxlXCI6IFwi5LiK5Lyg5paH5Lu25ZCO56e76Zmk5rqQ5paH5Lu2XCIsXG4gIFwiRGVsZXRlIHNvdXJjZSBmaWxlIGluIG9iIGFzc2V0cyBhZnRlciB5b3UgdXBsb2FkIGZpbGUuXCI6XG4gICAgXCLkuIrkvKDmlofku7blkI7np7vpmaTlnKhvYumZhOS7tuaWh+S7tuWkueS4reeahOaWh+S7tlwiLFxufTtcbiIsIi8vIOe5gemrlOS4reaWh1xuXG5leHBvcnQgZGVmYXVsdCB7fTtcbiIsImltcG9ydCB7IG1vbWVudCB9IGZyb20gJ29ic2lkaWFuJztcblxuaW1wb3J0IGFyIGZyb20gJy4vbG9jYWxlL2FyJztcbmltcG9ydCBjeiBmcm9tICcuL2xvY2FsZS9jeic7XG5pbXBvcnQgZGEgZnJvbSAnLi9sb2NhbGUvZGEnO1xuaW1wb3J0IGRlIGZyb20gJy4vbG9jYWxlL2RlJztcbmltcG9ydCBlbiBmcm9tICcuL2xvY2FsZS9lbic7XG5pbXBvcnQgZW5HQiBmcm9tICcuL2xvY2FsZS9lbi1nYic7XG5pbXBvcnQgZXMgZnJvbSAnLi9sb2NhbGUvZXMnO1xuaW1wb3J0IGZyIGZyb20gJy4vbG9jYWxlL2ZyJztcbmltcG9ydCBoaSBmcm9tICcuL2xvY2FsZS9oaSc7XG5pbXBvcnQgaWQgZnJvbSAnLi9sb2NhbGUvaWQnO1xuaW1wb3J0IGl0IGZyb20gJy4vbG9jYWxlL2l0JztcbmltcG9ydCBqYSBmcm9tICcuL2xvY2FsZS9qYSc7XG5pbXBvcnQga28gZnJvbSAnLi9sb2NhbGUva28nO1xuaW1wb3J0IG5sIGZyb20gJy4vbG9jYWxlL25sJztcbmltcG9ydCBubyBmcm9tICcuL2xvY2FsZS9ubyc7XG5pbXBvcnQgcGwgZnJvbSAnLi9sb2NhbGUvcGwnO1xuaW1wb3J0IHB0IGZyb20gJy4vbG9jYWxlL3B0JztcbmltcG9ydCBwdEJSIGZyb20gJy4vbG9jYWxlL3B0LWJyJztcbmltcG9ydCBybyBmcm9tICcuL2xvY2FsZS9ybyc7XG5pbXBvcnQgcnUgZnJvbSAnLi9sb2NhbGUvcnUnO1xuaW1wb3J0IHRyIGZyb20gJy4vbG9jYWxlL3RyJztcbmltcG9ydCB6aENOIGZyb20gJy4vbG9jYWxlL3poLWNuJztcbmltcG9ydCB6aFRXIGZyb20gJy4vbG9jYWxlL3poLXR3JztcblxuY29uc3QgbG9jYWxlTWFwOiB7IFtrOiBzdHJpbmddOiBQYXJ0aWFsPHR5cGVvZiBlbj4gfSA9IHtcbiAgYXIsXG4gIGNzOiBjeixcbiAgZGEsXG4gIGRlLFxuICBlbixcbiAgJ2VuLWdiJzogZW5HQixcbiAgZXMsXG4gIGZyLFxuICBoaSxcbiAgaWQsXG4gIGl0LFxuICBqYSxcbiAga28sXG4gIG5sLFxuICBubjogbm8sXG4gIHBsLFxuICBwdCxcbiAgJ3B0LWJyJzogcHRCUixcbiAgcm8sXG4gIHJ1LFxuICB0cixcbiAgJ3poLWNuJzogemhDTixcbiAgJ3poLXR3JzogemhUVyxcbn07XG5cbmNvbnN0IGxvY2FsZSA9IGxvY2FsZU1hcFttb21lbnQubG9jYWxlKCldO1xuXG5leHBvcnQgZnVuY3Rpb24gdChzdHI6IGtleW9mIHR5cGVvZiBlbik6IHN0cmluZyB7XG4gIHJldHVybiAobG9jYWxlICYmIGxvY2FsZVtzdHJdKSB8fCBlbltzdHJdO1xufVxuIiwiaW1wb3J0IHsgQXBwLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgaW1hZ2VBdXRvVXBsb2FkUGx1Z2luIGZyb20gXCIuL21haW5cIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi9sYW5nL2hlbHBlcnNcIjtcbmltcG9ydCB7IGdldE9TIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQbHVnaW5TZXR0aW5ncyB7XG4gIHVwbG9hZEJ5Q2xpcFN3aXRjaDogYm9vbGVhbjtcbiAgdXBsb2FkU2VydmVyOiBzdHJpbmc7XG4gIGRlbGV0ZVNlcnZlcjogc3RyaW5nO1xuICBpbWFnZVNpemVTdWZmaXg6IHN0cmluZztcbiAgdXBsb2FkZXI6IHN0cmluZztcbiAgcGljZ29Db3JlUGF0aDogc3RyaW5nO1xuICB3b3JrT25OZXRXb3JrOiBib29sZWFuO1xuICBuZXdXb3JrQmxhY2tEb21haW5zOiBzdHJpbmc7XG4gIGZpeFBhdGg6IGJvb2xlYW47XG4gIGFwcGx5SW1hZ2U6IGJvb2xlYW47XG4gIGRlbGV0ZVNvdXJjZTogYm9vbGVhbjtcbiAgW3Byb3BOYW1lOiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NFVFRJTkdTOiBQbHVnaW5TZXR0aW5ncyA9IHtcbiAgdXBsb2FkQnlDbGlwU3dpdGNoOiB0cnVlLFxuICB1cGxvYWRlcjogXCJQaWNHb1wiLFxuICB1cGxvYWRTZXJ2ZXI6IFwiaHR0cDovLzEyNy4wLjAuMTozNjY3Ny91cGxvYWRcIixcbiAgZGVsZXRlU2VydmVyOiBcImh0dHA6Ly8xMjcuMC4wLjE6MzY2NzcvZGVsZXRlXCIsXG4gIGltYWdlU2l6ZVN1ZmZpeDogXCJcIixcbiAgcGljZ29Db3JlUGF0aDogXCJcIixcbiAgd29ya09uTmV0V29yazogZmFsc2UsXG4gIGZpeFBhdGg6IGZhbHNlLFxuICBhcHBseUltYWdlOiB0cnVlLFxuICBuZXdXb3JrQmxhY2tEb21haW5zOiBcIlwiLFxuICBkZWxldGVTb3VyY2U6IGZhbHNlLFxufTtcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgcGx1Z2luOiBpbWFnZUF1dG9VcGxvYWRQbHVnaW47XG5cbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogaW1hZ2VBdXRvVXBsb2FkUGx1Z2luKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcblxuICAgIGNvbnN0IG9zID0gZ2V0T1MoKTtcblxuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IHQoXCJQbHVnaW4gU2V0dGluZ3NcIikgfSk7XG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiQXV0byBwYXN0ZWQgdXBsb2FkXCIpKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgIHQoXG4gICAgICAgICAgXCJJZiB5b3Ugc2V0IHRoaXMgdmFsdWUgdHJ1ZSwgd2hlbiB5b3UgcGFzdGUgaW1hZ2UsIGl0IHdpbGwgYmUgYXV0byB1cGxvYWRlZCh5b3Ugc2hvdWxkIHNldCB0aGUgcGljR28gc2VydmVyIHJpZ2h0bHkpXCJcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT5cbiAgICAgICAgdG9nZ2xlXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVwbG9hZEJ5Q2xpcFN3aXRjaClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgdmFsdWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudXBsb2FkQnlDbGlwU3dpdGNoID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUodChcIkRlZmF1bHQgdXBsb2FkZXJcIikpXG4gICAgICAuc2V0RGVzYyh0KFwiRGVmYXVsdCB1cGxvYWRlclwiKSlcbiAgICAgIC5hZGREcm9wZG93bihjYiA9PlxuICAgICAgICBjYlxuICAgICAgICAgIC5hZGRPcHRpb24oXCJQaWNHb1wiLCBcIlBpY0dvKGFwcClcIilcbiAgICAgICAgICAuYWRkT3B0aW9uKFwiUGljR28tQ29yZVwiLCBcIlBpY0dvLUNvcmVcIilcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXBsb2FkZXIpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jIHZhbHVlID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVwbG9hZGVyID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLnVwbG9hZGVyID09PSBcIlBpY0dvXCIpIHtcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZSh0KFwiUGljR28gc2VydmVyXCIpKVxuICAgICAgICAuc2V0RGVzYyh0KFwiUGljR28gc2VydmVyXCIpKVxuICAgICAgICAuYWRkVGV4dCh0ZXh0ID0+XG4gICAgICAgICAgdGV4dFxuICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKHQoXCJQbGVhc2UgaW5wdXQgUGljR28gc2VydmVyXCIpKVxuICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVwbG9hZFNlcnZlcilcbiAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyBrZXkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51cGxvYWRTZXJ2ZXIgPSBrZXk7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKHQoXCJQaWNHbyBkZWxldGUgc2VydmVyXCIpKVxuICAgICAgLnNldERlc2ModChcIlBpY0xpc3QgZGVzY1wiKSlcbiAgICAgIC5hZGRUZXh0KHRleHQgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcih0KFwiUGxlYXNlIGlucHV0IFBpY0dvIGRlbGV0ZSBzZXJ2ZXJcIikpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRlbGV0ZVNlcnZlcilcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMga2V5ID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRlbGV0ZVNlcnZlciA9IGtleTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSh0KFwiSW1hZ2Ugc2l6ZSBzdWZmaXhcIikpXG4gICAgICAuc2V0RGVzYyh0KFwiSW1hZ2Ugc2l6ZSBzdWZmaXggRGVzY3JpcHRpb25cIikpXG4gICAgICAuYWRkVGV4dCh0ZXh0ID0+XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIodChcIlBsZWFzZSBpbnB1dCBpbWFnZSBzaXplIHN1ZmZpeFwiKSlcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaW1hZ2VTaXplU3VmZml4KVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyBrZXkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaW1hZ2VTaXplU3VmZml4ID0ga2V5O1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MudXBsb2FkZXIgPT09IFwiUGljR28tQ29yZVwiKSB7XG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUodChcIlBpY0dvLUNvcmUgcGF0aFwiKSlcbiAgICAgICAgLnNldERlc2MoXG4gICAgICAgICAgdChcIlBsZWFzZSBpbnB1dCBQaWNHby1Db3JlIHBhdGgsIGRlZmF1bHQgdXNpbmcgZW52aXJvbm1lbnQgdmFyaWFibGVzXCIpXG4gICAgICAgIClcbiAgICAgICAgLmFkZFRleHQodGV4dCA9PlxuICAgICAgICAgIHRleHRcbiAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIlwiKVxuICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnBpY2dvQ29yZVBhdGgpXG4gICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgdmFsdWUgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5waWNnb0NvcmVQYXRoID0gdmFsdWU7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgaWYgKG9zICE9PSBcIldpbmRvd3NcIikge1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAuc2V0TmFtZSh0KFwiZml4UGF0aFwiKSlcbiAgICAgICAgICAuc2V0RGVzYyh0KFwiZml4UGF0aFdhcm5pbmdcIikpXG4gICAgICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT5cbiAgICAgICAgICAgIHRvZ2dsZVxuICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZml4UGF0aClcbiAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jIHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5maXhQYXRoID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKHQoXCJXb3JrIG9uIG5ldHdvcmtcIikpXG4gICAgICAuc2V0RGVzYyh0KFwiV29yayBvbiBuZXR3b3JrIERlc2NyaXB0aW9uXCIpKVxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT5cbiAgICAgICAgdG9nZ2xlXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLndvcmtPbk5ldFdvcmspXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jIHZhbHVlID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLndvcmtPbk5ldFdvcmsgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKHQoXCJOZXR3b3JrIERvbWFpbiBCbGFjayBMaXN0XCIpKVxuICAgICAgLnNldERlc2ModChcIk5ldHdvcmsgRG9tYWluIEJsYWNrIExpc3QgRGVzY3JpcHRpb25cIikpXG4gICAgICAuYWRkVGV4dEFyZWEodGV4dEFyZWEgPT5cbiAgICAgICAgdGV4dEFyZWFcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubmV3V29ya0JsYWNrRG9tYWlucylcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgdmFsdWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubmV3V29ya0JsYWNrRG9tYWlucyA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKHQoXCJVcGxvYWQgd2hlbiBjbGlwYm9hcmQgaGFzIGltYWdlIGFuZCB0ZXh0IHRvZ2V0aGVyXCIpKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgIHQoXG4gICAgICAgICAgXCJXaGVuIHlvdSBjb3B5LCBzb21lIGFwcGxpY2F0aW9uIGxpa2UgRXhjZWwgd2lsbCBpbWFnZSBhbmQgdGV4dCB0byBjbGlwYm9hcmQsIHlvdSBjYW4gdXBsb2FkIG9yIG5vdC5cIlxuICAgICAgICApXG4gICAgICApXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PlxuICAgICAgICB0b2dnbGVcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBwbHlJbWFnZSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgdmFsdWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYXBwbHlJbWFnZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUodChcIkRlbGV0ZSBzb3VyY2UgZmlsZSBhZnRlciB5b3UgdXBsb2FkIGZpbGVcIikpXG4gICAgICAuc2V0RGVzYyh0KFwiRGVsZXRlIHNvdXJjZSBmaWxlIGluIG9iIGFzc2V0cyBhZnRlciB5b3UgdXBsb2FkIGZpbGUuXCIpKVxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT5cbiAgICAgICAgdG9nZ2xlXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRlbGV0ZVNvdXJjZSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgdmFsdWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGVsZXRlU291cmNlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBNYXJrZG93blZpZXcsXG4gIFBsdWdpbixcbiAgRmlsZVN5c3RlbUFkYXB0ZXIsXG4gIEVkaXRvcixcbiAgTWVudSxcbiAgTWVudUl0ZW0sXG4gIFRGaWxlLFxuICBub3JtYWxpemVQYXRoLFxuICBOb3RpY2UsXG4gIGFkZEljb24sXG4gIHJlcXVlc3RVcmwsXG4gIE1hcmtkb3duRmlsZUluZm8sXG59IGZyb20gXCJvYnNpZGlhblwiO1xuXG5pbXBvcnQgeyByZXNvbHZlLCByZWxhdGl2ZSwgam9pbiwgcGFyc2UsIHBvc2l4LCBiYXNlbmFtZSwgZGlybmFtZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBleGlzdHNTeW5jLCBta2RpclN5bmMsIHdyaXRlRmlsZVN5bmMsIHVubGluayB9IGZyb20gXCJmc1wiO1xuXG5pbXBvcnQgZml4UGF0aCBmcm9tIFwiZml4LXBhdGhcIjtcblxuaW1wb3J0IHtcbiAgaXNBc3NldFR5cGVBbkltYWdlLFxuICBpc0FuSW1hZ2UsXG4gIGdldFVybEFzc2V0LFxuICBhcnJheVRvT2JqZWN0LFxufSBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IHsgUGljR29VcGxvYWRlciwgUGljR29Db3JlVXBsb2FkZXIgfSBmcm9tIFwiLi91cGxvYWRlclwiO1xuaW1wb3J0IHsgUGljR29EZWxldGVyIH0gZnJvbSBcIi4vZGVsZXRlclwiO1xuaW1wb3J0IEhlbHBlciBmcm9tIFwiLi9oZWxwZXJcIjtcbmltcG9ydCB7IHQgfSBmcm9tIFwiLi9sYW5nL2hlbHBlcnNcIjtcblxuaW1wb3J0IHsgU2V0dGluZ1RhYiwgUGx1Z2luU2V0dGluZ3MsIERFRkFVTFRfU0VUVElOR1MgfSBmcm9tIFwiLi9zZXR0aW5nXCI7XG5cbmludGVyZmFjZSBJbWFnZSB7XG4gIHBhdGg6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBzb3VyY2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaW1hZ2VBdXRvVXBsb2FkUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgc2V0dGluZ3M6IFBsdWdpblNldHRpbmdzO1xuICBoZWxwZXI6IEhlbHBlcjtcbiAgZWRpdG9yOiBFZGl0b3I7XG4gIHBpY0dvVXBsb2FkZXI6IFBpY0dvVXBsb2FkZXI7XG4gIHBpY0dvRGVsZXRlcjogUGljR29EZWxldGVyO1xuICBwaWNHb0NvcmVVcGxvYWRlcjogUGljR29Db3JlVXBsb2FkZXI7XG4gIHVwbG9hZGVyOiBQaWNHb1VwbG9hZGVyIHwgUGljR29Db3JlVXBsb2FkZXI7XG5cbiAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG4gIH1cblxuICBhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG4gICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgfVxuXG4gIG9udW5sb2FkKCkge31cblxuICBhc3luYyBvbmxvYWQoKSB7XG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgIHRoaXMuaGVscGVyID0gbmV3IEhlbHBlcih0aGlzLmFwcCk7XG4gICAgdGhpcy5waWNHb1VwbG9hZGVyID0gbmV3IFBpY0dvVXBsb2FkZXIodGhpcy5zZXR0aW5ncyk7XG4gICAgdGhpcy5waWNHb0RlbGV0ZXIgPSBuZXcgUGljR29EZWxldGVyKHRoaXMpO1xuICAgIHRoaXMucGljR29Db3JlVXBsb2FkZXIgPSBuZXcgUGljR29Db3JlVXBsb2FkZXIodGhpcy5zZXR0aW5ncyk7XG5cbiAgICBpZiAodGhpcy5zZXR0aW5ncy51cGxvYWRlciA9PT0gXCJQaWNHb1wiKSB7XG4gICAgICB0aGlzLnVwbG9hZGVyID0gdGhpcy5waWNHb1VwbG9hZGVyO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy51cGxvYWRlciA9PT0gXCJQaWNHby1Db3JlXCIpIHtcbiAgICAgIHRoaXMudXBsb2FkZXIgPSB0aGlzLnBpY0dvQ29yZVVwbG9hZGVyO1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZml4UGF0aCkge1xuICAgICAgICBmaXhQYXRoKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ldyBOb3RpY2UoXCJ1bmtub3duIHVwbG9hZGVyXCIpO1xuICAgIH1cblxuICAgIGFkZEljb24oXG4gICAgICBcInVwbG9hZFwiLFxuICAgICAgYDxzdmcgdD1cIjE2MzY2MzA3ODM0MjlcIiBjbGFzcz1cImljb25cIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIiB2ZXJzaW9uPVwiMS4xXCIgcC1pZD1cIjQ2NDlcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICA8cGF0aCBkPVwiTSA3MS42MzggMzUuMzM2IEwgNzkuNDA4IDM1LjMzNiBDIDgzLjcgMzUuMzM2IDg3LjE3OCAzOC42NjIgODcuMTc4IDQyLjc2NSBMIDg3LjE3OCA4NC44NjQgQyA4Ny4xNzggODguOTY5IDgzLjcgOTIuMjk1IDc5LjQwOCA5Mi4yOTUgTCAxNy4yNDkgOTIuMjk1IEMgMTIuOTU3IDkyLjI5NSA5LjQ3OSA4OC45NjkgOS40NzkgODQuODY0IEwgOS40NzkgNDIuNzY1IEMgOS40NzkgMzguNjYyIDEyLjk1NyAzNS4zMzYgMTcuMjQ5IDM1LjMzNiBMIDI1LjAxOSAzNS4zMzYgTCAyNS4wMTkgNDIuNzY1IEwgMTcuMjQ5IDQyLjc2NSBMIDE3LjI0OSA4NC44NjQgTCA3OS40MDggODQuODY0IEwgNzkuNDA4IDQyLjc2NSBMIDcxLjYzOCA0Mi43NjUgTCA3MS42MzggMzUuMzM2IFogTSA0OS4wMTQgMTAuMTc5IEwgNjcuMzI2IDI3LjY4OCBMIDYxLjgzNSAzMi45NDIgTCA1Mi44NDkgMjQuMzUyIEwgNTIuODQ5IDU5LjczMSBMIDQ1LjA3OCA1OS43MzEgTCA0NS4wNzggMjQuNDU1IEwgMzYuMTk0IDMyLjk0NyBMIDMwLjcwMiAyNy42OTIgTCA0OS4wMTIgMTAuMTgxIFpcIiBwLWlkPVwiNDY1MFwiIGZpbGw9XCIjOGE4YThhXCI+PC9wYXRoPlxuICAgIDwvc3ZnPmBcbiAgICApO1xuXG4gICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwiVXBsb2FkIGFsbCBpbWFnZXNcIixcbiAgICAgIG5hbWU6IFwiVXBsb2FkIGFsbCBpbWFnZXNcIixcbiAgICAgIGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4ge1xuICAgICAgICBsZXQgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xuICAgICAgICBpZiAobGVhZikge1xuICAgICAgICAgIGlmICghY2hlY2tpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBsb2FkQWxsRmlsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJEb3dubG9hZCBhbGwgaW1hZ2VzXCIsXG4gICAgICBuYW1lOiBcIkRvd25sb2FkIGFsbCBpbWFnZXNcIixcbiAgICAgIGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4ge1xuICAgICAgICBsZXQgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xuICAgICAgICBpZiAobGVhZikge1xuICAgICAgICAgIGlmICghY2hlY2tpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRBbGxJbWFnZUZpbGVzKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnNldHVwUGFzdGVIYW5kbGVyKCk7XG4gICAgdGhpcy5yZWdpc3RlckZpbGVNZW51KCk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyU2VsZWN0aW9uKCk7XG4gIH1cblxuICByZWdpc3RlclNlbGVjdGlvbigpIHtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oXG4gICAgICAgIFwiZWRpdG9yLW1lbnVcIixcbiAgICAgICAgKG1lbnU6IE1lbnUsIGVkaXRvcjogRWRpdG9yLCBpbmZvOiBNYXJrZG93blZpZXcgfCBNYXJrZG93bkZpbGVJbmZvKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoXCJtYXJrZG93blwiKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZWRpdG9yLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcmtkb3duUmVnZXggPSAvIVxcWy4qXFxdXFwoKC4qKVxcKS9nO1xuICAgICAgICAgICAgY29uc3QgbWFya2Rvd25NYXRjaCA9IG1hcmtkb3duUmVnZXguZXhlYyhzZWxlY3Rpb24pO1xuICAgICAgICAgICAgaWYgKG1hcmtkb3duTWF0Y2ggJiYgbWFya2Rvd25NYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1hcmtkb3duVXJsID0gbWFya2Rvd25NYXRjaFsxXTtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudXBsb2FkZWRJbWFnZXMuZmluZChcbiAgICAgICAgICAgICAgICAgIChpdGVtOiB7IGltZ1VybDogc3RyaW5nIH0pID0+IGl0ZW0uaW1nVXJsID09PSBtYXJrZG93blVybFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRNZW51KG1lbnUsIG1hcmtkb3duVXJsLCBlZGl0b3IpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGFkZE1lbnUgPSAobWVudTogTWVudSwgaW1nUGF0aDogc3RyaW5nLCBlZGl0b3I6IEVkaXRvcikgPT4ge1xuICAgIG1lbnUuYWRkSXRlbSgoaXRlbTogTWVudUl0ZW0pID0+XG4gICAgICBpdGVtXG4gICAgICAgIC5zZXRJY29uKFwidHJhc2gtMlwiKVxuICAgICAgICAuc2V0VGl0bGUodChcIkRlbGV0ZSBpbWFnZSB1c2luZyBQaWNMaXN0XCIpKVxuICAgICAgICAub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHRoaXMuc2V0dGluZ3MudXBsb2FkZWRJbWFnZXMuZmluZChcbiAgICAgICAgICAgICAgKGl0ZW06IHsgaW1nVXJsOiBzdHJpbmcgfSkgPT4gaXRlbS5pbWdVcmwgPT09IGltZ1BhdGhcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMucGljR29EZWxldGVyLmRlbGV0ZUltYWdlKFtzZWxlY3RlZEl0ZW1dKTtcbiAgICAgICAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZSh0KFwiRGVsZXRlIHN1Y2Nlc3NmdWxseVwiKSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZWRpdG9yLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgIGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uKFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnVwbG9hZGVkSW1hZ2VzID1cbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudXBsb2FkZWRJbWFnZXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAoaXRlbTogeyBpbWdVcmw6IHN0cmluZyB9KSA9PiBpdGVtLmltZ1VybCAhPT0gaW1nUGF0aFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UodChcIkRlbGV0ZSBmYWlsZWRcIikpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICBuZXcgTm90aWNlKHQoXCJFcnJvciwgY291bGQgbm90IGRlbGV0ZVwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICk7XG4gIH07XG5cbiAgYXN5bmMgZG93bmxvYWRBbGxJbWFnZUZpbGVzKCkge1xuICAgIGNvbnN0IGZvbGRlclBhdGggPSB0aGlzLmdldEZpbGVBc3NldFBhdGgoKTtcbiAgICBjb25zdCBmaWxlQXJyYXkgPSB0aGlzLmhlbHBlci5nZXRBbGxGaWxlcygpO1xuICAgIGlmICghZXhpc3RzU3luYyhmb2xkZXJQYXRoKSkge1xuICAgICAgbWtkaXJTeW5jKGZvbGRlclBhdGgpO1xuICAgIH1cblxuICAgIGxldCBpbWFnZUFycmF5ID0gW107XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVBcnJheSkge1xuICAgICAgaWYgKCFmaWxlLnBhdGguc3RhcnRzV2l0aChcImh0dHBcIikpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVybCA9IGZpbGUucGF0aDtcbiAgICAgIGNvbnN0IGFzc2V0ID0gZ2V0VXJsQXNzZXQodXJsKTtcbiAgICAgIGlmICghaXNBbkltYWdlKGFzc2V0LnN1YnN0cihhc3NldC5sYXN0SW5kZXhPZihcIi5cIikpKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGxldCBbbmFtZSwgZXh0XSA9IFtcbiAgICAgICAgZGVjb2RlVVJJKHBhcnNlKGFzc2V0KS5uYW1lKS5yZXBsYWNlQWxsKC9bXFxcXFxcXFwvOio/XFxcIjw+fF0vZywgXCItXCIpLFxuICAgICAgICBwYXJzZShhc3NldCkuZXh0LFxuICAgICAgXTtcbiAgICAgIC8vIOWmguaenOaWh+S7tuWQjeW3suWtmOWcqO+8jOWImeeUqOmaj+acuuWAvOabv+aNolxuICAgICAgaWYgKGV4aXN0c1N5bmMoam9pbihmb2xkZXJQYXRoLCBlbmNvZGVVUkkoYXNzZXQpKSkpIHtcbiAgICAgICAgbmFtZSA9IChNYXRoLnJhbmRvbSgpICsgMSkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA1KTtcbiAgICAgIH1cbiAgICAgIG5hbWUgPSBgaW1hZ2UtJHtuYW1lfWA7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5kb3dubG9hZChcbiAgICAgICAgdXJsLFxuICAgICAgICBqb2luKGZvbGRlclBhdGgsIGAke25hbWV9JHtleHR9YClcbiAgICAgICk7XG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgYWN0aXZlRm9sZGVyID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKFxuICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCkucGF0aFxuICAgICAgICApLnBhcmVudC5wYXRoO1xuXG4gICAgICAgIGNvbnN0IGJhc2VQYXRoID0gKFxuICAgICAgICAgIHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIgYXMgRmlsZVN5c3RlbUFkYXB0ZXJcbiAgICAgICAgKS5nZXRCYXNlUGF0aCgpO1xuICAgICAgICBjb25zdCBhYnN0cmFjdEFjdGl2ZUZvbGRlciA9IHJlc29sdmUoYmFzZVBhdGgsIGFjdGl2ZUZvbGRlcik7XG5cbiAgICAgICAgaW1hZ2VBcnJheS5wdXNoKHtcbiAgICAgICAgICBzb3VyY2U6IGZpbGUuc291cmNlLFxuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgcGF0aDogbm9ybWFsaXplUGF0aChyZWxhdGl2ZShhYnN0cmFjdEFjdGl2ZUZvbGRlciwgcmVzcG9uc2UucGF0aCkpLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdmFsdWUgPSB0aGlzLmhlbHBlci5nZXRWYWx1ZSgpO1xuICAgIGltYWdlQXJyYXkubWFwKGltYWdlID0+IHtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShcbiAgICAgICAgaW1hZ2Uuc291cmNlLFxuICAgICAgICBgIVske2ltYWdlLm5hbWV9JHt0aGlzLnNldHRpbmdzLmltYWdlU2l6ZVN1ZmZpeCB8fCBcIlwifV0oJHtlbmNvZGVVUkkoXG4gICAgICAgICAgaW1hZ2UucGF0aFxuICAgICAgICApfSlgXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5oZWxwZXIuc2V0VmFsdWUodmFsdWUpO1xuXG4gICAgbmV3IE5vdGljZShcbiAgICAgIGBhbGw6ICR7ZmlsZUFycmF5Lmxlbmd0aH1cXG5zdWNjZXNzOiAke2ltYWdlQXJyYXkubGVuZ3RofVxcbmZhaWxlZDogJHtcbiAgICAgICAgZmlsZUFycmF5Lmxlbmd0aCAtIGltYWdlQXJyYXkubGVuZ3RoXG4gICAgICB9YFxuICAgICk7XG4gIH1cblxuICAvLyDojrflj5blvZPliY3mlofku7bmiYDlsZ7nmoTpmYTku7bmlofku7blpLlcbiAgZ2V0RmlsZUFzc2V0UGF0aCgpIHtcbiAgICBjb25zdCBiYXNlUGF0aCA9IChcbiAgICAgIHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIgYXMgRmlsZVN5c3RlbUFkYXB0ZXJcbiAgICApLmdldEJhc2VQYXRoKCk7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgYXNzZXRGb2xkZXI6IHN0cmluZyA9IHRoaXMuYXBwLnZhdWx0LmNvbmZpZy5hdHRhY2htZW50Rm9sZGVyUGF0aDtcbiAgICBjb25zdCBhY3RpdmVGaWxlID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKFxuICAgICAgdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKS5wYXRoXG4gICAgKTtcblxuICAgIC8vIOW9k+WJjeaWh+S7tuWkueS4i+eahOWtkOaWh+S7tuWkuVxuICAgIGlmIChhc3NldEZvbGRlci5zdGFydHNXaXRoKFwiLi9cIikpIHtcbiAgICAgIGNvbnN0IGFjdGl2ZUZvbGRlciA9IGRlY29kZVVSSShyZXNvbHZlKGJhc2VQYXRoLCBhY3RpdmVGaWxlLnBhcmVudC5wYXRoKSk7XG4gICAgICByZXR1cm4gam9pbihhY3RpdmVGb2xkZXIsIGFzc2V0Rm9sZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5qC55paH5Lu25aS5XG4gICAgICByZXR1cm4gam9pbihiYXNlUGF0aCwgYXNzZXRGb2xkZXIpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRvd25sb2FkKHVybDogc3RyaW5nLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoeyB1cmwgfSk7XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgbXNnOiBcImVycm9yXCIsXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShyZXNwb25zZS5hcnJheUJ1ZmZlcik7XG5cbiAgICB0cnkge1xuICAgICAgd3JpdGVGaWxlU3luYyhwYXRoLCBidWZmZXIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb2s6IHRydWUsXG4gICAgICAgIG1zZzogXCJva1wiLFxuICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBtc2c6IGVycixcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJGaWxlTWVudSgpIHtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oXG4gICAgICAgIFwiZmlsZS1tZW51XCIsXG4gICAgICAgIChtZW51OiBNZW51LCBmaWxlOiBURmlsZSwgc291cmNlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpZiAoIWlzQXNzZXRUeXBlQW5JbWFnZShmaWxlLnBhdGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1lbnUuYWRkSXRlbSgoaXRlbTogTWVudUl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW1cbiAgICAgICAgICAgICAgLnNldFRpdGxlKFwiVXBsb2FkXCIpXG4gICAgICAgICAgICAgIC5zZXRJY29uKFwidXBsb2FkXCIpXG4gICAgICAgICAgICAgIC5vbkNsaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIShmaWxlIGluc3RhbmNlb2YgVEZpbGUpKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZU1lbnVVcGxvYWQoZmlsZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGZpbGVNZW51VXBsb2FkKGZpbGU6IFRGaWxlKSB7XG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLmhlbHBlci5nZXRWYWx1ZSgpO1xuXG4gICAgY29uc3QgYmFzZVBhdGggPSAoXG4gICAgICB0aGlzLmFwcC52YXVsdC5hZGFwdGVyIGFzIEZpbGVTeXN0ZW1BZGFwdGVyXG4gICAgKS5nZXRCYXNlUGF0aCgpO1xuICAgIGxldCBpbWFnZUxpc3Q6IEltYWdlW10gPSBbXTtcbiAgICBjb25zdCBmaWxlQXJyYXkgPSB0aGlzLmhlbHBlci5nZXRBbGxGaWxlcygpO1xuXG4gICAgZm9yIChjb25zdCBtYXRjaCBvZiBmaWxlQXJyYXkpIHtcbiAgICAgIGNvbnN0IGltYWdlTmFtZSA9IG1hdGNoLm5hbWU7XG4gICAgICBjb25zdCBlbmNvZGVkVXJpID0gbWF0Y2gucGF0aDtcblxuICAgICAgY29uc3QgZmlsZU5hbWUgPSBiYXNlbmFtZShkZWNvZGVVUkkoZW5jb2RlZFVyaSkpO1xuXG4gICAgICBpZiAoZmlsZSAmJiBmaWxlLm5hbWUgPT09IGZpbGVOYW1lKSB7XG4gICAgICAgIGNvbnN0IGFic3RyYWN0SW1hZ2VGaWxlID0gam9pbihiYXNlUGF0aCwgZmlsZS5wYXRoKTtcblxuICAgICAgICBpZiAoaXNBc3NldFR5cGVBbkltYWdlKGFic3RyYWN0SW1hZ2VGaWxlKSkge1xuICAgICAgICAgIGltYWdlTGlzdC5wdXNoKHtcbiAgICAgICAgICAgIHBhdGg6IGFic3RyYWN0SW1hZ2VGaWxlLFxuICAgICAgICAgICAgbmFtZTogaW1hZ2VOYW1lLFxuICAgICAgICAgICAgc291cmNlOiBtYXRjaC5zb3VyY2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW1hZ2VMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgbmV3IE5vdGljZShcIuayoeacieino+aekOWIsOWbvuWDj+aWh+S7tlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnVwbG9hZGVyLnVwbG9hZEZpbGVzKGltYWdlTGlzdC5tYXAoaXRlbSA9PiBpdGVtLnBhdGgpKS50aGVuKHJlcyA9PiB7XG4gICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgbGV0IHVwbG9hZFVybExpc3QgPSByZXMucmVzdWx0O1xuICAgICAgICBjb25zdCB1cGxvYWRVcmxGdWxsUmVzdWx0TGlzdCA9IHJlcy5yZXN1bHRGdWxsIHx8IFtdO1xuICAgICAgICB0aGlzLnNldHRpbmdzLnVwbG9hZGVkSW1hZ2VzID0gW1xuICAgICAgICAgIC4uLih0aGlzLnNldHRpbmdzLnVwbG9hZGVkSW1hZ2VzIHx8IFtdKSxcbiAgICAgICAgICAuLi51cGxvYWRVcmxGdWxsUmVzdWx0TGlzdCxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgaW1hZ2VMaXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgICBjb25zdCB1cGxvYWRJbWFnZSA9IHVwbG9hZFVybExpc3Quc2hpZnQoKTtcbiAgICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlQWxsKFxuICAgICAgICAgICAgaXRlbS5zb3VyY2UsXG4gICAgICAgICAgICBgIVske2l0ZW0ubmFtZX0ke1xuICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmltYWdlU2l6ZVN1ZmZpeCB8fCBcIlwiXG4gICAgICAgICAgICB9XSgke3VwbG9hZEltYWdlfSlgXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaGVscGVyLnNldFZhbHVlKGNvbnRlbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRlbGV0ZVNvdXJjZSkge1xuICAgICAgICAgIGltYWdlTGlzdC5tYXAoaW1hZ2UgPT4ge1xuICAgICAgICAgICAgaWYgKCFpbWFnZS5wYXRoLnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XG4gICAgICAgICAgICAgIHVubGluayhpbWFnZS5wYXRoLCAoKSA9PiB7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ldyBOb3RpY2UoXCJVcGxvYWQgZXJyb3JcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmaWx0ZXJGaWxlKGZpbGVBcnJheTogSW1hZ2VbXSkge1xuICAgIGNvbnN0IGltYWdlTGlzdDogSW1hZ2VbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBtYXRjaCBvZiBmaWxlQXJyYXkpIHtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLndvcmtPbk5ldFdvcmsgJiYgbWF0Y2gucGF0aC5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIXRoaXMuaGVscGVyLmhhc0JsYWNrRG9tYWluKFxuICAgICAgICAgICAgbWF0Y2gucGF0aCxcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubmV3V29ya0JsYWNrRG9tYWluc1xuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW1hZ2VMaXN0LnB1c2goe1xuICAgICAgICAgICAgcGF0aDogbWF0Y2gucGF0aCxcbiAgICAgICAgICAgIG5hbWU6IG1hdGNoLm5hbWUsXG4gICAgICAgICAgICBzb3VyY2U6IG1hdGNoLnNvdXJjZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1hZ2VMaXN0LnB1c2goe1xuICAgICAgICAgIHBhdGg6IG1hdGNoLnBhdGgsXG4gICAgICAgICAgbmFtZTogbWF0Y2gubmFtZSxcbiAgICAgICAgICBzb3VyY2U6IG1hdGNoLnNvdXJjZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGltYWdlTGlzdDtcbiAgfVxuICBnZXRGaWxlKGZpbGVOYW1lOiBzdHJpbmcsIGZpbGVNYXA6IGFueSkge1xuICAgIGlmICghZmlsZU1hcCkge1xuICAgICAgZmlsZU1hcCA9IGFycmF5VG9PYmplY3QodGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKSwgXCJuYW1lXCIpO1xuICAgIH1cbiAgICByZXR1cm4gZmlsZU1hcFtmaWxlTmFtZV07XG4gIH1cbiAgLy8gdXBsb2RhIGFsbCBmaWxlXG4gIHVwbG9hZEFsbEZpbGUoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLmhlbHBlci5nZXRWYWx1ZSgpO1xuXG4gICAgY29uc3QgYmFzZVBhdGggPSAoXG4gICAgICB0aGlzLmFwcC52YXVsdC5hZGFwdGVyIGFzIEZpbGVTeXN0ZW1BZGFwdGVyXG4gICAgKS5nZXRCYXNlUGF0aCgpO1xuICAgIGNvbnN0IGFjdGl2ZUZpbGUgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xuICAgIGNvbnN0IGZpbGVNYXAgPSBhcnJheVRvT2JqZWN0KHRoaXMuYXBwLnZhdWx0LmdldEZpbGVzKCksIFwibmFtZVwiKTtcbiAgICBjb25zdCBmaWxlUGF0aE1hcCA9IGFycmF5VG9PYmplY3QodGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKSwgXCJwYXRoXCIpO1xuICAgIGxldCBpbWFnZUxpc3Q6IEltYWdlW10gPSBbXTtcbiAgICBjb25zdCBmaWxlQXJyYXkgPSB0aGlzLmZpbHRlckZpbGUodGhpcy5oZWxwZXIuZ2V0QWxsRmlsZXMoKSk7XG5cbiAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIGZpbGVBcnJheSkge1xuICAgICAgY29uc3QgaW1hZ2VOYW1lID0gbWF0Y2gubmFtZTtcbiAgICAgIGNvbnN0IGVuY29kZWRVcmkgPSBtYXRjaC5wYXRoO1xuXG4gICAgICBpZiAoZW5jb2RlZFVyaS5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xuICAgICAgICBpbWFnZUxpc3QucHVzaCh7XG4gICAgICAgICAgcGF0aDogbWF0Y2gucGF0aCxcbiAgICAgICAgICBuYW1lOiBpbWFnZU5hbWUsXG4gICAgICAgICAgc291cmNlOiBtYXRjaC5zb3VyY2UsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBiYXNlbmFtZShkZWNvZGVVUkkoZW5jb2RlZFVyaSkpO1xuICAgICAgICBsZXQgZmlsZTtcbiAgICAgICAgLy8g57ud5a+56Lev5b6EXG4gICAgICAgIGlmIChmaWxlUGF0aE1hcFtkZWNvZGVVUkkoZW5jb2RlZFVyaSldKSB7XG4gICAgICAgICAgZmlsZSA9IGZpbGVQYXRoTWFwW2RlY29kZVVSSShlbmNvZGVkVXJpKV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyDnm7jlr7not6/lvoRcbiAgICAgICAgaWYgKFxuICAgICAgICAgICghZmlsZSAmJiBkZWNvZGVVUkkoZW5jb2RlZFVyaSkuc3RhcnRzV2l0aChcIi4vXCIpKSB8fFxuICAgICAgICAgIGRlY29kZVVSSShlbmNvZGVkVXJpKS5zdGFydHNXaXRoKFwiLi4vXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gcmVzb2x2ZShcbiAgICAgICAgICAgIGpvaW4oYmFzZVBhdGgsIGRpcm5hbWUoYWN0aXZlRmlsZS5wYXRoKSksXG4gICAgICAgICAgICBkZWNvZGVVUkkoZW5jb2RlZFVyaSlcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gbm9ybWFsaXplUGF0aChcbiAgICAgICAgICAgICAgcmVsYXRpdmUoXG4gICAgICAgICAgICAgICAgYmFzZVBhdGgsXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICAgICAgICAgIGpvaW4oYmFzZVBhdGgsIGRpcm5hbWUoYWN0aXZlRmlsZS5wYXRoKSksXG4gICAgICAgICAgICAgICAgICBkZWNvZGVVUkkoZW5jb2RlZFVyaSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGZpbGUgPSBmaWxlUGF0aE1hcFtwYXRoXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8g5bC95Y+v6IO955+t6Lev5b6EXG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgIGZpbGUgPSB0aGlzLmdldEZpbGUoZmlsZU5hbWUsIGZpbGVNYXApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICBjb25zdCBhYnN0cmFjdEltYWdlRmlsZSA9IGpvaW4oYmFzZVBhdGgsIGZpbGUucGF0aCk7XG5cbiAgICAgICAgICBpZiAoaXNBc3NldFR5cGVBbkltYWdlKGFic3RyYWN0SW1hZ2VGaWxlKSkge1xuICAgICAgICAgICAgaW1hZ2VMaXN0LnB1c2goe1xuICAgICAgICAgICAgICBwYXRoOiBhYnN0cmFjdEltYWdlRmlsZSxcbiAgICAgICAgICAgICAgbmFtZTogaW1hZ2VOYW1lLFxuICAgICAgICAgICAgICBzb3VyY2U6IG1hdGNoLnNvdXJjZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbWFnZUxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICBuZXcgTm90aWNlKFwi5rKh5pyJ6Kej5p6Q5Yiw5Zu+5YOP5paH5Lu2XCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXcgTm90aWNlKGDlhbHmib7liLAke2ltYWdlTGlzdC5sZW5ndGh95Liq5Zu+5YOP5paH5Lu277yM5byA5aeL5LiK5LygYCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGxvYWRlci51cGxvYWRGaWxlcyhpbWFnZUxpc3QubWFwKGl0ZW0gPT4gaXRlbS5wYXRoKSkudGhlbihyZXMgPT4ge1xuICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XG4gICAgICAgIGxldCB1cGxvYWRVcmxMaXN0ID0gcmVzLnJlc3VsdDtcbiAgICAgICAgY29uc3QgdXBsb2FkVXJsRnVsbFJlc3VsdExpc3QgPSByZXMucmVzdWx0RnVsbCB8fCBbXTtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy51cGxvYWRlZEltYWdlcyA9IFtcbiAgICAgICAgICAuLi4odGhpcy5zZXR0aW5ncy51cGxvYWRlZEltYWdlcyB8fCBbXSksXG4gICAgICAgICAgLi4udXBsb2FkVXJsRnVsbFJlc3VsdExpc3QsXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgIGltYWdlTGlzdC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBsb2FkSW1hZ2UgPSB1cGxvYWRVcmxMaXN0LnNoaWZ0KCk7XG4gICAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZUFsbChcbiAgICAgICAgICAgIGl0ZW0uc291cmNlLFxuICAgICAgICAgICAgYCFbJHtpdGVtLm5hbWV9JHtcbiAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5pbWFnZVNpemVTdWZmaXggfHwgXCJcIlxuICAgICAgICAgICAgfV0oJHt1cGxvYWRJbWFnZX0pYFxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmhlbHBlci5zZXRWYWx1ZShjb250ZW50KTtcblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5kZWxldGVTb3VyY2UpIHtcbiAgICAgICAgICBpbWFnZUxpc3QubWFwKGltYWdlID0+IHtcbiAgICAgICAgICAgIGlmICghaW1hZ2UucGF0aC5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xuICAgICAgICAgICAgICB1bmxpbmsoaW1hZ2UucGF0aCwgKCkgPT4ge30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXcgTm90aWNlKFwiVXBsb2FkIGVycm9yXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0dXBQYXN0ZUhhbmRsZXIoKSB7XG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKFxuICAgICAgICBcImVkaXRvci1wYXN0ZVwiLFxuICAgICAgICAoZXZ0OiBDbGlwYm9hcmRFdmVudCwgZWRpdG9yOiBFZGl0b3IsIG1hcmtkb3duVmlldzogTWFya2Rvd25WaWV3KSA9PiB7XG4gICAgICAgICAgY29uc3QgYWxsb3dVcGxvYWQgPSB0aGlzLmhlbHBlci5nZXRGcm9udG1hdHRlclZhbHVlKFxuICAgICAgICAgICAgXCJpbWFnZS1hdXRvLXVwbG9hZFwiLFxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy51cGxvYWRCeUNsaXBTd2l0Y2hcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbGV0IGZpbGVzID0gZXZ0LmNsaXBib2FyZERhdGEuZmlsZXM7XG4gICAgICAgICAgaWYgKCFhbGxvd1VwbG9hZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDliarotLTmnb/lhoXlrrnmnIltZOagvOW8j+eahOWbvueJh+aXtlxuICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLndvcmtPbk5ldFdvcmspIHtcbiAgICAgICAgICAgIGNvbnN0IGNsaXBib2FyZFZhbHVlID0gZXZ0LmNsaXBib2FyZERhdGEuZ2V0RGF0YShcInRleHQvcGxhaW5cIik7XG4gICAgICAgICAgICBjb25zdCBpbWFnZUxpc3QgPSB0aGlzLmhlbHBlclxuICAgICAgICAgICAgICAuZ2V0SW1hZ2VMaW5rKGNsaXBib2FyZFZhbHVlKVxuICAgICAgICAgICAgICAuZmlsdGVyKGltYWdlID0+IGltYWdlLnBhdGguc3RhcnRzV2l0aChcImh0dHBcIikpXG4gICAgICAgICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgaW1hZ2UgPT5cbiAgICAgICAgICAgICAgICAgICF0aGlzLmhlbHBlci5oYXNCbGFja0RvbWFpbihcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5uZXdXb3JrQmxhY2tEb21haW5zXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChpbWFnZUxpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMudXBsb2FkZXJcbiAgICAgICAgICAgICAgICAudXBsb2FkRmlsZXMoaW1hZ2VMaXN0Lm1hcChpdGVtID0+IGl0ZW0ucGF0aCkpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuaGVscGVyLmdldFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVwbG9hZFVybExpc3QgPSByZXMucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpbWFnZUxpc3QubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwbG9hZEltYWdlID0gdXBsb2FkVXJsTGlzdC5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZUFsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYCFbJHtpdGVtLm5hbWV9JHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5pbWFnZVNpemVTdWZmaXggfHwgXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV0oJHt1cGxvYWRJbWFnZX0pYFxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlbHBlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVwbG9hZFVybEZ1bGxSZXN1bHRMaXN0ID0gcmVzLmZ1bGxSZXN1bHQgfHwgW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudXBsb2FkZWRJbWFnZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgLi4uKHRoaXMuc2V0dGluZ3MudXBsb2FkZWRJbWFnZXMgfHwgW10pLFxuICAgICAgICAgICAgICAgICAgICAgIC4uLnVwbG9hZFVybEZ1bGxSZXN1bHRMaXN0LFxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZShcIlVwbG9hZCBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyDliarotLTmnb/kuK3mmK/lm77niYfml7bov5vooYzkuIrkvKBcbiAgICAgICAgICBpZiAodGhpcy5jYW5VcGxvYWQoZXZ0LmNsaXBib2FyZERhdGEpKSB7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZEZpbGVBbmRFbWJlZEltZ3VySW1hZ2UoXG4gICAgICAgICAgICAgIGVkaXRvcixcbiAgICAgICAgICAgICAgYXN5bmMgKGVkaXRvcjogRWRpdG9yLCBwYXN0ZUlkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy51cGxvYWRlci51cGxvYWRGaWxlQnlDbGlwYm9hcmQoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRmFpbGVkVXBsb2FkKGVkaXRvciwgcGFzdGVJZCwgcmVzLm1zZyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVwbG9hZFVybEZ1bGxSZXN1bHRMaXN0ID0gcmVzLmZ1bGxSZXN1bHQgfHwgW107XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy51cGxvYWRlZEltYWdlcyA9IFtcbiAgICAgICAgICAgICAgICAgIC4uLih0aGlzLnNldHRpbmdzLnVwbG9hZGVkSW1hZ2VzIHx8IFtdKSxcbiAgICAgICAgICAgICAgICAgIC4uLnVwbG9hZFVybEZ1bGxSZXN1bHRMaXN0LFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBldnQuY2xpcGJvYXJkRGF0YVxuICAgICAgICAgICAgKS5jYXRjaCgpO1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oXG4gICAgICAgIFwiZWRpdG9yLWRyb3BcIixcbiAgICAgICAgYXN5bmMgKGV2dDogRHJhZ0V2ZW50LCBlZGl0b3I6IEVkaXRvciwgbWFya2Rvd25WaWV3OiBNYXJrZG93blZpZXcpID0+IHtcbiAgICAgICAgICBjb25zdCBhbGxvd1VwbG9hZCA9IHRoaXMuaGVscGVyLmdldEZyb250bWF0dGVyVmFsdWUoXG4gICAgICAgICAgICBcImltYWdlLWF1dG8tdXBsb2FkXCIsXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLnVwbG9hZEJ5Q2xpcFN3aXRjaFxuICAgICAgICAgICk7XG4gICAgICAgICAgbGV0IGZpbGVzID0gZXZ0LmRhdGFUcmFuc2Zlci5maWxlcztcblxuICAgICAgICAgIGlmICghYWxsb3dVcGxvYWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZmlsZXMubGVuZ3RoICE9PSAwICYmIGZpbGVzWzBdLnR5cGUuc3RhcnRzV2l0aChcImltYWdlXCIpKSB7XG4gICAgICAgICAgICBsZXQgc2VuZEZpbGVzOiBBcnJheTxTdHJpbmc+ID0gW107XG4gICAgICAgICAgICBsZXQgZmlsZXMgPSBldnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xuICAgICAgICAgICAgQXJyYXkuZnJvbShmaWxlcykuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgc2VuZEZpbGVzLnB1c2goaXRlbS5wYXRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnVwbG9hZGVyLnVwbG9hZEZpbGVzKHNlbmRGaWxlcyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgY29uc3QgdXBsb2FkVXJsRnVsbFJlc3VsdExpc3QgPSBkYXRhLmZ1bGxSZXN1bHQgPz8gW107XG4gICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudXBsb2FkZWRJbWFnZXMgPSBbXG4gICAgICAgICAgICAgICAgLi4uKHRoaXMuc2V0dGluZ3MudXBsb2FkZWRJbWFnZXMgPz8gW10pLFxuICAgICAgICAgICAgICAgIC4uLnVwbG9hZFVybEZ1bGxSZXN1bHRMaXN0LFxuICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICBkYXRhLnJlc3VsdC5tYXAoKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFzdGVJZCA9IChNYXRoLnJhbmRvbSgpICsgMSkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA1KTtcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydFRlbXBvcmFyeVRleHQoZWRpdG9yLCBwYXN0ZUlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtYmVkTWFya0Rvd25JbWFnZShlZGl0b3IsIHBhc3RlSWQsIHZhbHVlLCBmaWxlc1swXS5uYW1lKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXcgTm90aWNlKFwiVXBsb2FkIGVycm9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBjYW5VcGxvYWQoY2xpcGJvYXJkRGF0YTogRGF0YVRyYW5zZmVyKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5hcHBseUltYWdlO1xuICAgIGNvbnN0IGZpbGVzID0gY2xpcGJvYXJkRGF0YS5maWxlcztcbiAgICBjb25zdCB0ZXh0ID0gY2xpcGJvYXJkRGF0YS5nZXREYXRhKFwidGV4dFwiKTtcblxuICAgIGNvbnN0IGhhc0ltYWdlRmlsZSA9XG4gICAgICBmaWxlcy5sZW5ndGggIT09IDAgJiYgZmlsZXNbMF0udHlwZS5zdGFydHNXaXRoKFwiaW1hZ2VcIik7XG4gICAgaWYgKGhhc0ltYWdlRmlsZSkge1xuICAgICAgaWYgKCEhdGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5hcHBseUltYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyB1cGxvYWRGaWxlQW5kRW1iZWRJbWd1ckltYWdlKFxuICAgIGVkaXRvcjogRWRpdG9yLFxuICAgIGNhbGxiYWNrOiBGdW5jdGlvbixcbiAgICBjbGlwYm9hcmREYXRhOiBEYXRhVHJhbnNmZXJcbiAgKSB7XG4gICAgbGV0IHBhc3RlSWQgPSAoTWF0aC5yYW5kb20oKSArIDEpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgNSk7XG4gICAgdGhpcy5pbnNlcnRUZW1wb3JhcnlUZXh0KGVkaXRvciwgcGFzdGVJZCk7XG4gICAgY29uc3QgbmFtZSA9IGNsaXBib2FyZERhdGEuZmlsZXNbMF0ubmFtZTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdXJsID0gYXdhaXQgY2FsbGJhY2soZWRpdG9yLCBwYXN0ZUlkKTtcbiAgICAgIHRoaXMuZW1iZWRNYXJrRG93bkltYWdlKGVkaXRvciwgcGFzdGVJZCwgdXJsLCBuYW1lKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmhhbmRsZUZhaWxlZFVwbG9hZChlZGl0b3IsIHBhc3RlSWQsIGUpO1xuICAgIH1cbiAgfVxuXG4gIGluc2VydFRlbXBvcmFyeVRleHQoZWRpdG9yOiBFZGl0b3IsIHBhc3RlSWQ6IHN0cmluZykge1xuICAgIGxldCBwcm9ncmVzc1RleHQgPSBpbWFnZUF1dG9VcGxvYWRQbHVnaW4ucHJvZ3Jlc3NUZXh0Rm9yKHBhc3RlSWQpO1xuICAgIGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uKHByb2dyZXNzVGV4dCArIFwiXFxuXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcHJvZ3Jlc3NUZXh0Rm9yKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYCFbVXBsb2FkaW5nIGZpbGUuLi4ke2lkfV0oKWA7XG4gIH1cblxuICBlbWJlZE1hcmtEb3duSW1hZ2UoXG4gICAgZWRpdG9yOiBFZGl0b3IsXG4gICAgcGFzdGVJZDogc3RyaW5nLFxuICAgIGltYWdlVXJsOiBhbnksXG4gICAgbmFtZTogc3RyaW5nID0gXCJcIlxuICApIHtcbiAgICBsZXQgcHJvZ3Jlc3NUZXh0ID0gaW1hZ2VBdXRvVXBsb2FkUGx1Z2luLnByb2dyZXNzVGV4dEZvcihwYXN0ZUlkKTtcbiAgICBjb25zdCBpbWFnZVNpemVTdWZmaXggPSB0aGlzLnNldHRpbmdzLmltYWdlU2l6ZVN1ZmZpeCB8fCBcIlwiO1xuICAgIGxldCBtYXJrRG93bkltYWdlID0gYCFbJHtuYW1lfSR7aW1hZ2VTaXplU3VmZml4fV0oJHtpbWFnZVVybH0pYDtcblxuICAgIGltYWdlQXV0b1VwbG9hZFBsdWdpbi5yZXBsYWNlRmlyc3RPY2N1cnJlbmNlKFxuICAgICAgZWRpdG9yLFxuICAgICAgcHJvZ3Jlc3NUZXh0LFxuICAgICAgbWFya0Rvd25JbWFnZVxuICAgICk7XG4gIH1cblxuICBoYW5kbGVGYWlsZWRVcGxvYWQoZWRpdG9yOiBFZGl0b3IsIHBhc3RlSWQ6IHN0cmluZywgcmVhc29uOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHJlcXVlc3Q6IFwiLCByZWFzb24pO1xuICAgIGxldCBwcm9ncmVzc1RleHQgPSBpbWFnZUF1dG9VcGxvYWRQbHVnaW4ucHJvZ3Jlc3NUZXh0Rm9yKHBhc3RlSWQpO1xuICAgIGltYWdlQXV0b1VwbG9hZFBsdWdpbi5yZXBsYWNlRmlyc3RPY2N1cnJlbmNlKFxuICAgICAgZWRpdG9yLFxuICAgICAgcHJvZ3Jlc3NUZXh0LFxuICAgICAgXCLimqDvuI91cGxvYWQgZmFpbGVkLCBjaGVjayBkZXYgY29uc29sZVwiXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyByZXBsYWNlRmlyc3RPY2N1cnJlbmNlKFxuICAgIGVkaXRvcjogRWRpdG9yLFxuICAgIHRhcmdldDogc3RyaW5nLFxuICAgIHJlcGxhY2VtZW50OiBzdHJpbmdcbiAgKSB7XG4gICAgbGV0IGxpbmVzID0gZWRpdG9yLmdldFZhbHVlKCkuc3BsaXQoXCJcXG5cIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGNoID0gbGluZXNbaV0uaW5kZXhPZih0YXJnZXQpO1xuICAgICAgaWYgKGNoICE9IC0xKSB7XG4gICAgICAgIGxldCBmcm9tID0geyBsaW5lOiBpLCBjaDogY2ggfTtcbiAgICAgICAgbGV0IHRvID0geyBsaW5lOiBpLCBjaDogY2ggKyB0YXJnZXQubGVuZ3RoIH07XG4gICAgICAgIGVkaXRvci5yZXBsYWNlUmFuZ2UocmVwbGFjZW1lbnQsIGZyb20sIHRvKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiaXNleGUiLCJzeW5jIiwiY2hlY2tTdGF0IiwiZnMiLCJjb3JlIiwiZ2xvYmFsIiwicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJwYXRoIiwid2hpY2giLCJnZXRQYXRoS2V5IiwiaXNXaW4iLCJyZXNvbHZlQ29tbWFuZCIsInJlYWRTaGViYW5nIiwiZXNjYXBlIiwicGFyc2UiLCJjcCIsInBhdGhLZXkiLCJtaW1pY0ZuIiwiX3JlYWx0aW1lIiwiX2NvcmUiLCJfb3MiLCJfc2lnbmFscyIsInNpZ25hbHMiLCJyZXF1aXJlJCQyIiwic3Bhd25lZEtpbGwiLCJvcyIsInNwYXduZWRDYW5jZWwiLCJzZXR1cFRpbWVvdXQiLCJ2YWxpZGF0ZVRpbWVvdXQiLCJzZXRFeGl0SGFuZGxlciIsIm9uRXhpdCIsInN0cmVhbSIsImhhbmRsZUlucHV0IiwiaXNTdHJlYW0iLCJtYWtlQWxsU3RyZWFtIiwiZ2V0U3RyZWFtIiwiZ2V0U3Bhd25lZFJlc3VsdCIsInZhbGlkYXRlSW5wdXRTeW5jIiwibWVyZ2VQcm9taXNlIiwiZ2V0U3Bhd25lZFByb21pc2UiLCJqb2luQ29tbWFuZCIsImdldEVzY2FwZWRDb21tYW5kIiwicGFyc2VDb21tYW5kIiwicmVxdWlyZSQkMyIsIm5wbVJ1blBhdGgiLCJub3JtYWxpemVTdGRpbyIsImNoaWxkUHJvY2VzcyIsImVycm9yIiwibWFrZUVycm9yIiwib25ldGltZSIsInN0ZGlvIiwicHJvY2VzcyIsInVzZXJJbmZvIiwiZXhlY2EiLCJleHRuYW1lIiwicmVxdWVzdFVybCIsIk5vdGljZSIsImV4ZWMiLCJNYXJrZG93blZpZXciLCJtb21lbnQiLCJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiIsImFkZEljb24iLCJleGlzdHNTeW5jIiwibWtkaXJTeW5jIiwiam9pbiIsInJlc29sdmUiLCJub3JtYWxpemVQYXRoIiwicmVsYXRpdmUiLCJ3cml0ZUZpbGVTeW5jIiwiVEZpbGUiLCJiYXNlbmFtZSIsInVubGluayIsImRpcm5hbWUiLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJO0FBQzdDLFFBQVEsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztBQUNsRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pGLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDdkYsb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQzNDLGFBQWE7QUFDYixZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2QyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDbEUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ3pGLEtBQUs7QUFDTCxDQUFDO0FBYUQ7QUFDTyxTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDNUIsSUFBSSxJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xGLElBQUksSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVCLElBQUksSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRSxPQUFPO0FBQ2xELFFBQVEsSUFBSSxFQUFFLFlBQVk7QUFDMUIsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDL0MsWUFBWSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwRCxTQUFTO0FBQ1QsS0FBSyxDQUFDO0FBQ04sSUFBSSxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsR0FBRyx5QkFBeUIsR0FBRyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQzNGLENBQUM7QUFDRDtBQUNPLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDN0IsSUFBSSxJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvRCxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDckIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNyQyxJQUFJLElBQUk7QUFDUixRQUFRLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRixLQUFLO0FBQ0wsSUFBSSxPQUFPLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO0FBQzNDLFlBQVk7QUFDWixRQUFRLElBQUk7QUFDWixZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RCxTQUFTO0FBQ1QsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDekMsS0FBSztBQUNMLElBQUksT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBaUJEO0FBQ08sU0FBUyxhQUFhLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRTtBQUN4QyxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQ3JFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQztBQXVCRDtBQUNPLFNBQVMsYUFBYSxDQUFDLENBQUMsRUFBRTtBQUNqQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsc0NBQXNDLENBQUMsQ0FBQztBQUMzRixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxRQUFRLEtBQUssVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFlBQVksRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDck4sSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3BLLElBQUksU0FBUyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFO0FBQ2hJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0TUEsV0FBYyxHQUFHQSxRQUFLO0FBQ3RCQSxPQUFLLENBQUMsSUFBSSxHQUFHQyxPQUFJO0FBQ2pCO0FBQ3NCO0FBQ3RCO0FBQ0EsU0FBUyxZQUFZLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUN0QyxFQUFFLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEtBQUssU0FBUztBQUM3QyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFPO0FBQ3pDO0FBQ0EsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2hCLElBQUksT0FBTyxJQUFJO0FBQ2YsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUM7QUFDOUIsRUFBRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDbEMsSUFBSSxPQUFPLElBQUk7QUFDZixHQUFHO0FBQ0gsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUU7QUFDcEMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRTtBQUN6RCxNQUFNLE9BQU8sSUFBSTtBQUNqQixLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUUsT0FBTyxLQUFLO0FBQ2QsQ0FBQztBQUNEO0FBQ0EsU0FBU0MsV0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3pDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtBQUNoRCxJQUFJLE9BQU8sS0FBSztBQUNoQixHQUFHO0FBQ0gsRUFBRSxPQUFPLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO0FBQ3BDLENBQUM7QUFDRDtBQUNBLFNBQVNGLE9BQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtBQUNuQyxFQUFFRyxzQkFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFO0FBQ3BDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsS0FBSyxHQUFHRCxXQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsRUFBQztBQUN2RCxHQUFHLEVBQUM7QUFDSixDQUFDO0FBQ0Q7QUFDQSxTQUFTRCxNQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUM5QixFQUFFLE9BQU9DLFdBQVMsQ0FBQ0Msc0JBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQztBQUNwRDs7QUN6Q0EsUUFBYyxHQUFHSCxRQUFLO0FBQ3RCQSxPQUFLLENBQUMsSUFBSSxHQUFHQyxPQUFJO0FBQ2pCO0FBQ3NCO0FBQ3RCO0FBQ0EsU0FBU0QsT0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0FBQ25DLEVBQUVHLHNCQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUU7QUFDcEMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFBQztBQUNqRCxHQUFHLEVBQUM7QUFDSixDQUFDO0FBQ0Q7QUFDQSxTQUFTRixNQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUM5QixFQUFFLE9BQU8sU0FBUyxDQUFDRSxzQkFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUM7QUFDOUMsQ0FBQztBQUNEO0FBQ0EsU0FBUyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNuQyxFQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO0FBQ2xELENBQUM7QUFDRDtBQUNBLFNBQVMsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDbkMsRUFBRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSTtBQUNyQixFQUFFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFHO0FBQ3BCLEVBQUUsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUc7QUFDcEI7QUFDQSxFQUFFLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEtBQUssU0FBUztBQUN2QyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFFO0FBQ3BELEVBQUUsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTO0FBQ3ZDLElBQUksT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUU7QUFDcEQ7QUFDQSxFQUFFLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDO0FBQzVCLEVBQUUsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUM7QUFDNUIsRUFBRSxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBQztBQUM1QixFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFDO0FBQ2hCO0FBQ0EsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3BCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLO0FBQzlCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLO0FBQzlCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxLQUFLLEtBQUssS0FBSyxFQUFDO0FBQzdCO0FBQ0EsRUFBRSxPQUFPLEdBQUc7QUFDWjs7QUN2Q0EsSUFBSUMsT0FBSTtBQUNSLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUlDLGNBQU0sQ0FBQyxlQUFlLEVBQUU7QUFDNUQsRUFBRUQsTUFBSSxHQUFHRSxRQUF1QjtBQUNoQyxDQUFDLE1BQU07QUFDUCxFQUFFRixNQUFJLEdBQUdHLEtBQW9CO0FBQzdCLENBQUM7QUFDRDtBQUNBLFdBQWMsR0FBRyxNQUFLO0FBQ3RCLEtBQUssQ0FBQyxJQUFJLEdBQUdOLE9BQUk7QUFDakI7QUFDQSxTQUFTLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtBQUNuQyxFQUFFLElBQUksT0FBTyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQ3JDLElBQUksRUFBRSxHQUFHLFFBQU87QUFDaEIsSUFBSSxPQUFPLEdBQUcsR0FBRTtBQUNoQixHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDWCxJQUFJLElBQUksT0FBTyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQ3ZDLE1BQU0sTUFBTSxJQUFJLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQztBQUNsRCxLQUFLO0FBQ0w7QUFDQSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQ2xELE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUNuRCxRQUFRLElBQUksRUFBRSxFQUFFO0FBQ2hCLFVBQVUsTUFBTSxDQUFDLEVBQUUsRUFBQztBQUNwQixTQUFTLE1BQU07QUFDZixVQUFVLE9BQU8sQ0FBQyxFQUFFLEVBQUM7QUFDckIsU0FBUztBQUNULE9BQU8sRUFBQztBQUNSLEtBQUssQ0FBQztBQUNOLEdBQUc7QUFDSDtBQUNBLEVBQUVHLE1BQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUU7QUFDOUM7QUFDQSxJQUFJLElBQUksRUFBRSxFQUFFO0FBQ1osTUFBTSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO0FBQ25FLFFBQVEsRUFBRSxHQUFHLEtBQUk7QUFDakIsUUFBUSxFQUFFLEdBQUcsTUFBSztBQUNsQixPQUFPO0FBQ1AsS0FBSztBQUNMLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUM7QUFDZCxHQUFHLEVBQUM7QUFDSixDQUFDO0FBQ0Q7QUFDQSxTQUFTSCxNQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUM5QjtBQUNBLEVBQUUsSUFBSTtBQUNOLElBQUksT0FBT0csTUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUN6QyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7QUFDZixJQUFJLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDakUsTUFBTSxPQUFPLEtBQUs7QUFDbEIsS0FBSyxNQUFNO0FBQ1gsTUFBTSxNQUFNLEVBQUU7QUFDZCxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQ3hEQSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU87QUFDOUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxRQUFRO0FBQ25DLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssT0FBTTtBQUNqQztBQUM0QjtBQUM1QixNQUFNLEtBQUssR0FBRyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUc7QUFDTDtBQUM5QjtBQUNBLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHO0FBQzdCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUM7QUFDbkU7QUFDQSxNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUs7QUFDbEMsRUFBRSxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxJQUFJLE1BQUs7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsRUFBRSxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ3hFO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsUUFBUSxJQUFJLFNBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM3QyxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSTtBQUN4QyxtREFBbUQsRUFBRSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDbkUsT0FBTztBQUNQLE1BQUs7QUFDTCxFQUFFLE1BQU0sVUFBVSxHQUFHLFNBQVM7QUFDOUIsTUFBTSxHQUFHLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLHFCQUFxQjtBQUNqRSxNQUFNLEdBQUU7QUFDUixFQUFFLE1BQU0sT0FBTyxHQUFHLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFDO0FBQzVEO0FBQ0EsRUFBRSxJQUFJLFNBQVMsRUFBRTtBQUNqQixJQUFJLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtBQUNwRCxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFDO0FBQ3pCLEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTztBQUNULElBQUksT0FBTztBQUNYLElBQUksT0FBTztBQUNYLElBQUksVUFBVTtBQUNkLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLO0FBQ2hDLEVBQUUsSUFBSSxPQUFPLEdBQUcsS0FBSyxVQUFVLEVBQUU7QUFDakMsSUFBSSxFQUFFLEdBQUcsSUFBRztBQUNaLElBQUksR0FBRyxHQUFHLEdBQUU7QUFDWixHQUFHO0FBQ0gsRUFBRSxJQUFJLENBQUMsR0FBRztBQUNWLElBQUksR0FBRyxHQUFHLEdBQUU7QUFDWjtBQUNBLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUM7QUFDaEUsRUFBRSxNQUFNLEtBQUssR0FBRyxHQUFFO0FBQ2xCO0FBQ0EsRUFBRSxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxLQUFLO0FBQ3JELElBQUksSUFBSSxDQUFDLEtBQUssT0FBTyxDQUFDLE1BQU07QUFDNUIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQ3JELFVBQVUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDO0FBQ0EsSUFBSSxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxFQUFDO0FBQzVCLElBQUksTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQUs7QUFDdEU7QUFDQSxJQUFJLE1BQU0sSUFBSSxHQUFHSSx3QkFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFDO0FBQ3pDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJO0FBQ3pFLFFBQVEsS0FBSTtBQUNaO0FBQ0EsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUM7QUFDN0IsR0FBRyxFQUFDO0FBQ0o7QUFDQSxFQUFFLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxLQUFLO0FBQ2pFLElBQUksSUFBSSxFQUFFLEtBQUssT0FBTyxDQUFDLE1BQU07QUFDN0IsTUFBTSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLElBQUksTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsRUFBQztBQUMzQixJQUFJUixPQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUs7QUFDeEQsTUFBTSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRTtBQUNyQixRQUFRLElBQUksR0FBRyxDQUFDLEdBQUc7QUFDbkIsVUFBVSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUM7QUFDN0I7QUFDQSxVQUFVLE9BQU8sT0FBTyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDakMsT0FBTztBQUNQLE1BQU0sT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNDLEtBQUssRUFBQztBQUNOLEdBQUcsRUFBQztBQUNKO0FBQ0EsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDOUQsRUFBQztBQUNEO0FBQ0EsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLO0FBQ2hDLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFFO0FBQ2pCO0FBQ0EsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBQztBQUNoRSxFQUFFLE1BQU0sS0FBSyxHQUFHLEdBQUU7QUFDbEI7QUFDQSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO0FBQzVDLElBQUksTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBQztBQUM1QixJQUFJLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFLO0FBQ3RFO0FBQ0EsSUFBSSxNQUFNLElBQUksR0FBR1Esd0JBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBQztBQUN6QyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSTtBQUN6RSxRQUFRLEtBQUk7QUFDWjtBQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7QUFDOUMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBQztBQUNoQyxNQUFNLElBQUk7QUFDVixRQUFRLE1BQU0sRUFBRSxHQUFHUixPQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBQztBQUMzRCxRQUFRLElBQUksRUFBRSxFQUFFO0FBQ2hCLFVBQVUsSUFBSSxHQUFHLENBQUMsR0FBRztBQUNyQixZQUFZLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDO0FBQzNCO0FBQ0EsWUFBWSxPQUFPLEdBQUc7QUFDdEIsU0FBUztBQUNULE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFO0FBQ3JCLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTTtBQUM3QixJQUFJLE9BQU8sS0FBSztBQUNoQjtBQUNBLEVBQUUsSUFBSSxHQUFHLENBQUMsT0FBTztBQUNqQixJQUFJLE9BQU8sSUFBSTtBQUNmO0FBQ0EsRUFBRSxNQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQztBQUM3QixFQUFDO0FBQ0Q7QUFDQSxXQUFjLEdBQUcsTUFBSztBQUN0QixLQUFLLENBQUMsSUFBSSxHQUFHOztBQzFIYixNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFFLEtBQUs7QUFDbEMsQ0FBQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDaEQsQ0FBQyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDdkQ7QUFDQSxDQUFDLElBQUksUUFBUSxLQUFLLE9BQU8sRUFBRTtBQUMzQixFQUFFLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQztBQUMvRixDQUFDLENBQUM7QUFDRjtBQUNBLGFBQWMsR0FBRyxPQUFPLENBQUM7QUFDekI7QUFDQSxjQUFzQixHQUFHLE9BQU87OztBQ1RoQyxTQUFTLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUU7QUFDdkQsSUFBSSxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQ2xELElBQUksTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzlCLElBQUksTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO0FBQ3BEO0FBQ0EsSUFBSSxNQUFNLGVBQWUsR0FBRyxZQUFZLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztBQUNuRztBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksZUFBZSxFQUFFO0FBQ3pCLFFBQVEsSUFBSTtBQUNaLFlBQVksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUN0QjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksUUFBUSxDQUFDO0FBQ2pCO0FBQ0EsSUFBSSxJQUFJO0FBQ1IsUUFBUSxRQUFRLEdBQUdTLE9BQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUM5QyxZQUFZLElBQUksRUFBRSxHQUFHLENBQUNDLFNBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDMUMsWUFBWSxPQUFPLEVBQUUsY0FBYyxHQUFHRix3QkFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTO0FBQ2hFLFNBQVMsQ0FBQyxDQUFDO0FBQ1gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ2hCO0FBQ0EsS0FBSyxTQUFTO0FBQ2QsUUFBUSxJQUFJLGVBQWUsRUFBRTtBQUM3QixZQUFZLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksUUFBUSxFQUFFO0FBQ2xCLFFBQVEsUUFBUSxHQUFHQSx3QkFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xGLEtBQUs7QUFDTDtBQUNBLElBQUksT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQztBQUNEO0FBQ0EsU0FBUyxjQUFjLENBQUMsTUFBTSxFQUFFO0FBQ2hDLElBQUksT0FBTyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEYsQ0FBQztBQUNEO0FBQ0Esb0JBQWMsR0FBRyxjQUFjOztBQ2pEL0I7QUFDQSxNQUFNLGVBQWUsR0FBRywwQkFBMEIsQ0FBQztBQUNuRDtBQUNBLFNBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRTtBQUM1QjtBQUNBLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzlDO0FBQ0EsSUFBSSxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFDRDtBQUNBLFNBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRSxxQkFBcUIsRUFBRTtBQUNwRDtBQUNBLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JCO0FBQ0E7QUFDQSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QztBQUNBO0FBQ0EsSUFBSSxJQUFJLHFCQUFxQixFQUFFO0FBQy9CLFFBQVEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2xELEtBQUs7QUFDTDtBQUNBLElBQUksT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0Q7QUFDQSxhQUFzQixHQUFHLGFBQWEsQ0FBQztBQUN2QyxZQUF1QixHQUFHLGNBQWM7Ozs7Ozs7QUMzQ3hDLGdCQUFjLEdBQUcsU0FBUzs7QUNFMUIsa0JBQWMsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLEtBQUs7QUFDbEMsQ0FBQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFDO0FBQ0EsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2IsRUFBRSxPQUFPLElBQUksQ0FBQztBQUNkLEVBQUU7QUFDRjtBQUNBLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEUsQ0FBQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3RDO0FBQ0EsQ0FBQyxJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUU7QUFDdkIsRUFBRSxPQUFPLFFBQVEsQ0FBQztBQUNsQixFQUFFO0FBQ0Y7QUFDQSxDQUFDLE9BQU8sUUFBUSxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3BELENBQUM7O0FDYkQsU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQzlCO0FBQ0EsSUFBSSxNQUFNLElBQUksR0FBRyxHQUFHLENBQUM7QUFDckIsSUFBSSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDO0FBQ0EsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUNYO0FBQ0EsSUFBSSxJQUFJO0FBQ1IsUUFBUSxFQUFFLEdBQUdMLHNCQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN2QyxRQUFRQSxzQkFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUMsUUFBUUEsc0JBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLGVBQWU7QUFDL0I7QUFDQTtBQUNBLElBQUksT0FBTyxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUNEO0FBQ0EsaUJBQWMsR0FBRyxXQUFXOztBQ2Y1QixNQUFNUSxPQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUM7QUFDM0MsTUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztBQUM3QyxNQUFNLGVBQWUsR0FBRywwQ0FBMEMsQ0FBQztBQUNuRTtBQUNBLFNBQVMsYUFBYSxDQUFDLE1BQU0sRUFBRTtBQUMvQixJQUFJLE1BQU0sQ0FBQyxJQUFJLEdBQUdDLGdCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekM7QUFDQSxJQUFJLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUlDLGFBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUQ7QUFDQSxJQUFJLElBQUksT0FBTyxFQUFFO0FBQ2pCLFFBQVEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDLFFBQVEsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDakM7QUFDQSxRQUFRLE9BQU9ELGdCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsS0FBSztBQUNMO0FBQ0EsSUFBSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDdkIsQ0FBQztBQUNEO0FBQ0EsU0FBUyxhQUFhLENBQUMsTUFBTSxFQUFFO0FBQy9CLElBQUksSUFBSSxDQUFDRCxPQUFLLEVBQUU7QUFDaEIsUUFBUSxPQUFPLE1BQU0sQ0FBQztBQUN0QixLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUksTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlDO0FBQ0E7QUFDQSxJQUFJLE1BQU0sVUFBVSxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxVQUFVLEVBQUU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLE1BQU0sMEJBQTBCLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM3RTtBQUNBO0FBQ0E7QUFDQSxRQUFRLE1BQU0sQ0FBQyxPQUFPLEdBQUdILHdCQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4RDtBQUNBO0FBQ0EsUUFBUSxNQUFNLENBQUMsT0FBTyxHQUFHTSxPQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4RCxRQUFRLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUtBLE9BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLDBCQUEwQixDQUFDLENBQUMsQ0FBQztBQUNqRztBQUNBLFFBQVEsTUFBTSxZQUFZLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUU7QUFDQSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5RCxRQUFRLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO0FBQzFELFFBQVEsTUFBTSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7QUFDdkQsS0FBSztBQUNMO0FBQ0EsSUFBSSxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ0Q7QUFDQSxTQUFTLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUN2QztBQUNBLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3RDLFFBQVEsT0FBTyxHQUFHLElBQUksQ0FBQztBQUN2QixRQUFRLElBQUksR0FBRyxJQUFJLENBQUM7QUFDcEIsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3JDLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pDO0FBQ0E7QUFDQSxJQUFJLE1BQU0sTUFBTSxHQUFHO0FBQ25CLFFBQVEsT0FBTztBQUNmLFFBQVEsSUFBSTtBQUNaLFFBQVEsT0FBTztBQUNmLFFBQVEsSUFBSSxFQUFFLFNBQVM7QUFDdkIsUUFBUSxRQUFRLEVBQUU7QUFDbEIsWUFBWSxPQUFPO0FBQ25CLFlBQVksSUFBSTtBQUNoQixTQUFTO0FBQ1QsS0FBSyxDQUFDO0FBQ047QUFDQTtBQUNBLElBQUksT0FBTyxPQUFPLENBQUMsS0FBSyxHQUFHLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUNEO0FBQ0EsV0FBYyxHQUFHLEtBQUs7O0FDeEZ0QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztBQUMzQztBQUNBLFNBQVMsYUFBYSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDMUMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFO0FBQzdFLFFBQVEsSUFBSSxFQUFFLFFBQVE7QUFDdEIsUUFBUSxLQUFLLEVBQUUsUUFBUTtBQUN2QixRQUFRLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakQsUUFBUSxJQUFJLEVBQUUsUUFBUSxDQUFDLE9BQU87QUFDOUIsUUFBUSxTQUFTLEVBQUUsUUFBUSxDQUFDLElBQUk7QUFDaEMsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDQSxTQUFTLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUU7QUFDdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2hCLFFBQVEsT0FBTztBQUNmLEtBQUs7QUFDTDtBQUNBLElBQUksTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztBQUNqQztBQUNBLElBQUksRUFBRSxDQUFDLElBQUksR0FBRyxVQUFVLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsUUFBUSxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7QUFDN0IsWUFBWSxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQWUsQ0FBQyxDQUFDO0FBQzVEO0FBQ0EsWUFBWSxJQUFJLEdBQUcsRUFBRTtBQUNyQixnQkFBZ0IsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDM0QsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLFFBQVEsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNqRCxLQUFLLENBQUM7QUFDTixDQUFDO0FBQ0Q7QUFDQSxTQUFTLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ3RDLElBQUksSUFBSSxLQUFLLElBQUksTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDL0MsUUFBUSxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZELEtBQUs7QUFDTDtBQUNBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNEO0FBQ0EsU0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQzFDLElBQUksSUFBSSxLQUFLLElBQUksTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDL0MsUUFBUSxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzNELEtBQUs7QUFDTDtBQUNBLElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNEO0FBQ0EsVUFBYyxHQUFHO0FBQ2pCLElBQUksZ0JBQWdCO0FBQ3BCLElBQUksWUFBWTtBQUNoQixJQUFJLGdCQUFnQjtBQUNwQixJQUFJLGFBQWE7QUFDakIsQ0FBQzs7QUNwREQsU0FBUyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDdkM7QUFDQSxJQUFJLE1BQU0sTUFBTSxHQUFHQyxPQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRDtBQUNBO0FBQ0EsSUFBSSxNQUFNLE9BQU8sR0FBR0MsZ0NBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMxRTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDN0M7QUFDQSxJQUFJLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFDRDtBQUNBLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQzNDO0FBQ0EsSUFBSSxNQUFNLE1BQU0sR0FBR0QsT0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDakQ7QUFDQTtBQUNBLElBQUksTUFBTSxNQUFNLEdBQUdDLGdDQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0U7QUFDQTtBQUNBLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xGO0FBQ0EsSUFBSSxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ0Q7QUFDQSxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBQ3ZCLFdBQW9CLEdBQUcsS0FBSyxDQUFDO0FBQzdCLFVBQW1CLEdBQUcsU0FBUyxDQUFDO0FBQ2hDO0FBQ0EsVUFBcUIsR0FBR0QsT0FBSyxDQUFDO0FBQzlCLFdBQXNCLEdBQUcsTUFBTTs7Ozs7O0FDcEMvQixxQkFBYyxHQUFHLEtBQUssSUFBSTtBQUMxQixDQUFDLE1BQU0sRUFBRSxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ2pFLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDakU7QUFDQSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO0FBQ3JDLEVBQUUsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDM0MsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtBQUNyQyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNDLEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxLQUFLLENBQUM7QUFDZCxDQUFDOzs7QUNkNEI7QUFDTztBQUNwQztBQUNBLE1BQU0sVUFBVSxHQUFHLE9BQU8sSUFBSTtBQUM5QixDQUFDLE9BQU8sR0FBRztBQUNYLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDcEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQ0UsU0FBTyxFQUFFLENBQUM7QUFDOUIsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7QUFDNUIsRUFBRSxHQUFHLE9BQU87QUFDWixFQUFFLENBQUM7QUFDSDtBQUNBLENBQUMsSUFBSSxRQUFRLENBQUM7QUFDZCxDQUFDLElBQUksT0FBTyxHQUFHVCx3QkFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekMsQ0FBQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbkI7QUFDQSxDQUFDLE9BQU8sUUFBUSxLQUFLLE9BQU8sRUFBRTtBQUM5QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUNBLHdCQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7QUFDdkQsRUFBRSxRQUFRLEdBQUcsT0FBTyxDQUFDO0FBQ3JCLEVBQUUsT0FBTyxHQUFHQSx3QkFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEMsRUFBRTtBQUNGO0FBQ0E7QUFDQSxDQUFDLE1BQU0sV0FBVyxHQUFHQSx3QkFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFCO0FBQ0EsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQ0Esd0JBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6RCxDQUFDLENBQUM7QUFDRjtBQUNBLGNBQWMsR0FBRyxVQUFVLENBQUM7QUFDNUI7QUFDQSxzQkFBc0IsR0FBRyxVQUFVLENBQUM7QUFDcEM7QUFDQSxrQkFBa0IsR0FBRyxPQUFPLElBQUk7QUFDaEMsQ0FBQyxPQUFPLEdBQUc7QUFDWCxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztBQUNsQixFQUFFLEdBQUcsT0FBTztBQUNaLEVBQUUsQ0FBQztBQUNIO0FBQ0EsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLENBQUMsTUFBTSxJQUFJLEdBQUdTLFNBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0I7QUFDQSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckM7QUFDQSxDQUFDLE9BQU8sR0FBRyxDQUFDO0FBQ1osQ0FBQzs7O0FDNUNELE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksS0FBSztBQUM5QixDQUFDLEtBQUssTUFBTSxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUMzQyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDL0UsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNYLENBQUMsQ0FBQztBQUNGO0FBQ0EsYUFBYyxHQUFHLE9BQU8sQ0FBQztBQUN6QjtBQUNBLGNBQXNCLEdBQUcsT0FBTzs7O0FDVGhDLE1BQU0sZUFBZSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7QUFDdEM7QUFDQSxNQUFNLE9BQU8sR0FBRyxDQUFDLFNBQVMsRUFBRSxPQUFPLEdBQUcsRUFBRSxLQUFLO0FBQzdDLENBQUMsSUFBSSxPQUFPLFNBQVMsS0FBSyxVQUFVLEVBQUU7QUFDdEMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDN0MsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLFdBQVcsQ0FBQztBQUNqQixDQUFDLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNuQixDQUFDLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDLElBQUksSUFBSSxhQUFhLENBQUM7QUFDL0U7QUFDQSxDQUFDLE1BQU0sT0FBTyxHQUFHLFVBQVUsR0FBRyxVQUFVLEVBQUU7QUFDMUMsRUFBRSxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzVDO0FBQ0EsRUFBRSxJQUFJLFNBQVMsS0FBSyxDQUFDLEVBQUU7QUFDdkIsR0FBRyxXQUFXLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbkQsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO0FBQ3JDLEdBQUcsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO0FBQzNFLEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTyxXQUFXLENBQUM7QUFDckIsRUFBRSxDQUFDO0FBQ0g7QUFDQSxDQUFDQyxTQUFPLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzdCLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDekM7QUFDQSxDQUFDLE9BQU8sT0FBTyxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUNGO0FBQ0EsYUFBYyxHQUFHLE9BQU8sQ0FBQztBQUN6QjtBQUNBLFlBQXNCLEdBQUcsT0FBTyxDQUFDO0FBQ2pDO0FBQ0EsYUFBd0IsR0FBRyxTQUFTLElBQUk7QUFDeEMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtBQUN0QyxFQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDLENBQUMsQ0FBQztBQUN4RyxFQUFFO0FBQ0Y7QUFDQSxDQUFDLE9BQU8sZUFBZSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2QyxDQUFDOzs7OztBQzNDWSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0Y7QUFDQSxNQUFNLE9BQU8sQ0FBQztBQUNkO0FBQ0EsSUFBSSxDQUFDLFFBQVE7QUFDYixNQUFNLENBQUMsQ0FBQztBQUNSLE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQyxpQkFBaUI7QUFDN0IsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUNqQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFFBQVE7QUFDYixNQUFNLENBQUMsQ0FBQztBQUNSLE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQywrQkFBK0I7QUFDM0MsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUNoQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDZCxNQUFNLENBQUMsQ0FBQztBQUNSLE1BQU0sQ0FBQyxNQUFNO0FBQ2IsV0FBVyxDQUFDLGdDQUFnQztBQUM1QyxRQUFRLENBQUMsT0FBTyxDQUFDO0FBQ2pCO0FBQ0E7QUFDQSxJQUFJLENBQUMsUUFBUTtBQUNiLE1BQU0sQ0FBQyxDQUFDO0FBQ1IsTUFBTSxDQUFDLE1BQU07QUFDYixXQUFXLENBQUMsNkJBQTZCO0FBQ3pDLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDaEI7QUFDQTtBQUNBLElBQUksQ0FBQyxTQUFTO0FBQ2QsTUFBTSxDQUFDLENBQUM7QUFDUixNQUFNLENBQUMsTUFBTTtBQUNiLFdBQVcsQ0FBQyxxQkFBcUI7QUFDakMsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUNqQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDZCxNQUFNLENBQUMsQ0FBQztBQUNSLE1BQU0sQ0FBQyxNQUFNO0FBQ2IsV0FBVyxDQUFDLFNBQVM7QUFDckIsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUNoQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFFBQVE7QUFDYixNQUFNLENBQUMsQ0FBQztBQUNSLE1BQU0sQ0FBQyxNQUFNO0FBQ2IsV0FBVyxDQUFDLFNBQVM7QUFDckIsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUNmO0FBQ0E7QUFDQSxJQUFJLENBQUMsUUFBUTtBQUNiLE1BQU0sQ0FBQyxDQUFDO0FBQ1IsTUFBTSxDQUFDLE1BQU07QUFDYixXQUFXO0FBQ1gsbUVBQW1FO0FBQ25FLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDZjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFFBQVE7QUFDYixNQUFNLENBQUMsQ0FBQztBQUNSLE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQyxtREFBbUQ7QUFDL0QsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUNqQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFFBQVE7QUFDYixNQUFNLENBQUMsQ0FBQztBQUNSLE1BQU0sQ0FBQyxNQUFNO0FBQ2IsV0FBVyxDQUFDLGlDQUFpQztBQUM3QyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQ2hCO0FBQ0E7QUFDQSxJQUFJLENBQUMsU0FBUztBQUNkLE1BQU0sQ0FBQyxDQUFDO0FBQ1IsTUFBTSxDQUFDLFdBQVc7QUFDbEIsV0FBVyxDQUFDLG9CQUFvQjtBQUNoQyxRQUFRLENBQUMsT0FBTztBQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ1o7QUFDQTtBQUNBLElBQUksQ0FBQyxTQUFTO0FBQ2QsTUFBTSxDQUFDLEVBQUU7QUFDVCxNQUFNLENBQUMsV0FBVztBQUNsQixXQUFXLENBQUMsNkJBQTZCO0FBQ3pDLFFBQVEsQ0FBQyxPQUFPLENBQUM7QUFDakI7QUFDQTtBQUNBLElBQUksQ0FBQyxTQUFTO0FBQ2QsTUFBTSxDQUFDLEVBQUU7QUFDVCxNQUFNLENBQUMsTUFBTTtBQUNiLFdBQVcsQ0FBQyxvQkFBb0I7QUFDaEMsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUNoQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDZCxNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQyw2QkFBNkI7QUFDekMsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUNqQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDZCxNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQyx1QkFBdUI7QUFDbkMsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUNqQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDZCxNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQyxrQkFBa0I7QUFDOUIsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUNqQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDZCxNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQyxhQUFhO0FBQ3pCLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDaEI7QUFDQTtBQUNBLElBQUksQ0FBQyxXQUFXO0FBQ2hCLE1BQU0sQ0FBQyxFQUFFO0FBQ1QsTUFBTSxDQUFDLFdBQVc7QUFDbEIsV0FBVyxDQUFDLDhCQUE4QjtBQUMxQyxRQUFRLENBQUMsT0FBTyxDQUFDO0FBQ2pCO0FBQ0E7QUFDQSxJQUFJLENBQUMsU0FBUztBQUNkLE1BQU0sQ0FBQyxFQUFFO0FBQ1QsTUFBTSxDQUFDLFFBQVE7QUFDZixXQUFXLENBQUMsOENBQThDO0FBQzFELFFBQVEsQ0FBQyxPQUFPLENBQUM7QUFDakI7QUFDQTtBQUNBLElBQUksQ0FBQyxRQUFRO0FBQ2IsTUFBTSxDQUFDLEVBQUU7QUFDVCxNQUFNLENBQUMsUUFBUTtBQUNmLFdBQVcsQ0FBQyw4Q0FBOEM7QUFDMUQsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUNqQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDZCxNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxTQUFTO0FBQ2hCLFdBQVcsQ0FBQyxVQUFVO0FBQ3RCLFFBQVEsQ0FBQyxPQUFPO0FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDWjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDZCxNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxPQUFPO0FBQ2QsV0FBVyxDQUFDLFFBQVE7QUFDcEIsUUFBUSxDQUFDLE9BQU87QUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNaO0FBQ0E7QUFDQSxJQUFJLENBQUMsU0FBUztBQUNkLE1BQU0sQ0FBQyxFQUFFO0FBQ1QsTUFBTSxDQUFDLE9BQU87QUFDZCxXQUFXLENBQUMsb0NBQW9DO0FBQ2hELFFBQVEsQ0FBQyxPQUFPLENBQUM7QUFDakI7QUFDQTtBQUNBLElBQUksQ0FBQyxTQUFTO0FBQ2QsTUFBTSxDQUFDLEVBQUU7QUFDVCxNQUFNLENBQUMsT0FBTztBQUNkLFdBQVcsQ0FBQywrQ0FBK0M7QUFDM0QsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUNqQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFVBQVU7QUFDZixNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQyxtQ0FBbUM7QUFDL0MsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUNqQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDZCxNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxPQUFPO0FBQ2QsV0FBVyxDQUFDLG9EQUFvRDtBQUNoRSxRQUFRLENBQUMsT0FBTyxDQUFDO0FBQ2pCO0FBQ0E7QUFDQSxJQUFJLENBQUMsUUFBUTtBQUNiLE1BQU0sQ0FBQyxFQUFFO0FBQ1QsTUFBTSxDQUFDLFFBQVE7QUFDZixXQUFXLENBQUMsa0NBQWtDO0FBQzlDLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDZjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDZCxNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxNQUFNO0FBQ2IsV0FBVyxDQUFDLG1CQUFtQjtBQUMvQixRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ2Y7QUFDQTtBQUNBLElBQUksQ0FBQyxTQUFTO0FBQ2QsTUFBTSxDQUFDLEVBQUU7QUFDVCxNQUFNLENBQUMsTUFBTTtBQUNiLFdBQVcsQ0FBQyxjQUFjO0FBQzFCLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDZjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFdBQVc7QUFDaEIsTUFBTSxDQUFDLEVBQUU7QUFDVCxNQUFNLENBQUMsV0FBVztBQUNsQixXQUFXLENBQUMsa0JBQWtCO0FBQzlCLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDZjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDZCxNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQyxrQkFBa0I7QUFDOUIsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUNmO0FBQ0E7QUFDQSxJQUFJLENBQUMsVUFBVTtBQUNmLE1BQU0sQ0FBQyxFQUFFO0FBQ1QsTUFBTSxDQUFDLFFBQVE7QUFDZixXQUFXLENBQUMsOEJBQThCO0FBQzFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDZjtBQUNBO0FBQ0EsSUFBSSxDQUFDLE9BQU87QUFDWixNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQyxrQkFBa0I7QUFDOUIsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUNqQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDZCxNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQyxlQUFlO0FBQzNCLFFBQVEsQ0FBQyxPQUFPLENBQUM7QUFDakI7QUFDQTtBQUNBLElBQUksQ0FBQyxTQUFTO0FBQ2QsTUFBTSxDQUFDLEVBQUU7QUFDVCxNQUFNLENBQUMsUUFBUTtBQUNmLFdBQVcsQ0FBQyxpQ0FBaUM7QUFDN0MsUUFBUSxDQUFDLE9BQU8sQ0FBQztBQUNqQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFFBQVE7QUFDYixNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQyw2QkFBNkI7QUFDekMsUUFBUSxDQUFDLFNBQVMsQ0FBQztBQUNuQjtBQUNBO0FBQ0EsSUFBSSxDQUFDLFFBQVE7QUFDYixNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxNQUFNO0FBQ2IsV0FBVyxDQUFDLHFCQUFxQjtBQUNqQyxRQUFRLENBQUMsT0FBTyxDQUFDO0FBQ2pCO0FBQ0E7QUFDQSxJQUFJLENBQUMsV0FBVztBQUNoQixNQUFNLENBQUMsRUFBRTtBQUNULE1BQU0sQ0FBQyxXQUFXO0FBQ2xCLFdBQVcsQ0FBQyxxQkFBcUI7QUFDakMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztBQUMzQzs7OztBQ2hSYSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6SCxNQUFNLGtCQUFrQixDQUFDLFVBQVU7QUFDbkMsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDakMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM5QyxDQUFDLENBQUMsMEJBQTBCLENBQUMsa0JBQWtCLENBQUM7QUFDaEQ7QUFDQSxNQUFNLGlCQUFpQixDQUFDLFNBQVMsS0FBSyxDQUFDLEtBQUssQ0FBQztBQUM3QyxPQUFNO0FBQ04sSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUs7QUFDckIsTUFBTSxDQUFDLFdBQVc7QUFDbEIsV0FBVyxDQUFDLHdDQUF3QztBQUNwRCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEI7QUFDQSxDQUFDLENBQUM7QUFDRjtBQUNBLE1BQU0sUUFBUSxDQUFDLEVBQUUsQ0FBQztBQUNsQixNQUFNLFFBQVEsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDO0FBQzVDOzs7O0FDbEJhLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUF1QjtBQUN0SDtBQUMrQjtBQUNRO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLE1BQU0sVUFBVSxDQUFDLFVBQVU7QUFDM0IsTUFBTSxlQUFlLENBQUMsSUFBR0MsUUFBUyxDQUFDLGtCQUFrQixHQUFHLENBQUM7QUFDekQsTUFBTSxPQUFPLENBQUMsQ0FBQyxHQUFHQyxJQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pFLE9BQU8sT0FBTyxDQUFDO0FBQ2YsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sZUFBZSxDQUFDLFNBQVM7QUFDL0IsSUFBSTtBQUNKLE1BQU0sQ0FBQyxhQUFhO0FBQ3BCLFdBQVc7QUFDWCxNQUFNO0FBQ04sTUFBTSxDQUFDLEtBQUs7QUFDWixRQUFRLENBQUM7QUFDVDtBQUNBLEtBQUs7QUFDTCxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNoQ0MsdUJBQUcsQ0FBQyxTQUFTLENBQUM7QUFDZCxNQUFNLFNBQVMsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0FBQzNDLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO0FBQ3BELE9BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqRSxDQUFDLENBQUM7QUFDRjs7OztBQ2xDYSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBdUI7QUFDako7QUFDcUM7QUFDRTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxNQUFNLGdCQUFnQixDQUFDLFVBQVU7QUFDakMsTUFBTSxPQUFPLENBQUMsSUFBR0MsU0FBUSxDQUFDLFVBQVUsR0FBRyxDQUFDO0FBQ3hDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxNQUFNLGVBQWUsQ0FBQztBQUN0QixnQkFBZ0I7QUFDaEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDMUQ7QUFDQSxPQUFNO0FBQ04sR0FBRyxnQkFBZ0I7QUFDbkIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ25FO0FBQ0EsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxNQUFNLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sa0JBQWtCLENBQUMsVUFBVTtBQUNuQyxNQUFNLE9BQU8sQ0FBQyxJQUFHQSxTQUFRLENBQUMsVUFBVSxHQUFHLENBQUM7QUFDeEMsTUFBTSxNQUFNLENBQUNILFFBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNO0FBQ2hELGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ25DO0FBQ0EsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUNGO0FBQ0EsTUFBTSxpQkFBaUIsQ0FBQyxTQUFTLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDaEQsTUFBTSxNQUFNLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2hEO0FBQ0EsR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBQ3RCLE9BQU0sRUFBRSxDQUFDO0FBQ1QsQ0FBQztBQUNEO0FBQ0EsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ2hFLE9BQU07QUFDTixDQUFDLE1BQU0sRUFBRTtBQUNULElBQUk7QUFDSixNQUFNO0FBQ04sV0FBVztBQUNYLFNBQVM7QUFDVCxNQUFNO0FBQ04sTUFBTTtBQUNOLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDWDtBQUNBO0FBQ0EsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsTUFBTSxrQkFBa0IsQ0FBQyxTQUFTLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDakQsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUdFLHVCQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUMxRTtBQUNBLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQztBQUN0QixPQUFPLE1BQU0sQ0FBQztBQUNkLENBQUM7QUFDRDtBQUNBLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUM7QUFDRjtBQUNBLE1BQU0sZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDO0FBQ25GOzs7QUNyRUEsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHZixJQUF3QixDQUFDO0FBQ2pEO0FBQ0EsTUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLEtBQUs7QUFDNUcsQ0FBQyxJQUFJLFFBQVEsRUFBRTtBQUNmLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNuRCxFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksVUFBVSxFQUFFO0FBQ2pCLEVBQUUsT0FBTyxjQUFjLENBQUM7QUFDeEIsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7QUFDOUIsRUFBRSxPQUFPLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFDM0IsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1RCxFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUM3QixFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQzdDLEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxRQUFRLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxNQUFNLFNBQVMsR0FBRyxDQUFDO0FBQ25CLENBQUMsTUFBTTtBQUNQLENBQUMsTUFBTTtBQUNQLENBQUMsR0FBRztBQUNKLENBQUMsS0FBSztBQUNOLENBQUMsTUFBTTtBQUNQLENBQUMsUUFBUTtBQUNULENBQUMsT0FBTztBQUNSLENBQUMsY0FBYztBQUNmLENBQUMsUUFBUTtBQUNULENBQUMsVUFBVTtBQUNYLENBQUMsTUFBTTtBQUNQLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsQ0FBQyxLQUFLO0FBQ047QUFDQTtBQUNBLENBQUMsUUFBUSxHQUFHLFFBQVEsS0FBSyxJQUFJLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUNyRCxDQUFDLE1BQU0sR0FBRyxNQUFNLEtBQUssSUFBSSxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDL0MsQ0FBQyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sS0FBSyxTQUFTLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUM7QUFDaEc7QUFDQSxDQUFDLE1BQU0sU0FBUyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ3ZDO0FBQ0EsQ0FBQyxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDaEgsQ0FBQyxNQUFNLFlBQVksR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssZ0JBQWdCLENBQUM7QUFDNUUsQ0FBQyxNQUFNLFlBQVksR0FBRyxPQUFPLEdBQUcsQ0FBQyxFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDO0FBQ25GLENBQUMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0U7QUFDQSxDQUFDLElBQUksT0FBTyxFQUFFO0FBQ2QsRUFBRSxLQUFLLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDeEMsRUFBRSxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUMxQixFQUFFLE1BQU07QUFDUixFQUFFLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixFQUFFO0FBQ0Y7QUFDQSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0FBQ25DLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDekIsQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUN2QyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQzNCLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDdkIsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7QUFDN0MsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUN2QixDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCO0FBQ0EsQ0FBQyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDeEIsRUFBRSxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNsQixFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksY0FBYyxJQUFJLEtBQUssRUFBRTtBQUM5QixFQUFFLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQztBQUM1QixFQUFFO0FBQ0Y7QUFDQSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUMvQixDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ3BDO0FBQ0EsQ0FBQyxPQUFPLEtBQUssQ0FBQztBQUNkLENBQUMsQ0FBQztBQUNGO0FBQ0EsU0FBYyxHQUFHLFNBQVM7O0FDdEYxQixNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDOUM7QUFDQSxNQUFNLFFBQVEsR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQ2hGO0FBQ0EsTUFBTSxjQUFjLEdBQUcsT0FBTyxJQUFJO0FBQ2xDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNmLEVBQUUsT0FBTztBQUNULEVBQUU7QUFDRjtBQUNBLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQztBQUN6QjtBQUNBLENBQUMsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO0FBQzFCLEVBQUUsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUM5QyxFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ3hCLEVBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLGtFQUFrRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxSSxFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQ2hDLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDZixFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzVCLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDLGdFQUFnRSxFQUFFLE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDM0csRUFBRTtBQUNGO0FBQ0EsQ0FBQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZELENBQUMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUMsQ0FBQztBQUNGO0FBQ0EsU0FBYyxHQUFHLGNBQWMsQ0FBQztBQUNoQztBQUNBO0FBQ0EsVUFBbUIsR0FBRyxPQUFPLElBQUk7QUFDakMsQ0FBQyxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkM7QUFDQSxDQUFDLElBQUksS0FBSyxLQUFLLEtBQUssRUFBRTtBQUN0QixFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQ2YsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQ3ZELEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3RDLEVBQUU7QUFDRjtBQUNBLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzVCLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDZixFQUFFO0FBQ0Y7QUFDQSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDOzs7O0FDbkREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLEdBQUc7QUFDakIsRUFBRSxTQUFTO0FBQ1gsRUFBRSxTQUFTO0FBQ1gsRUFBRSxRQUFRO0FBQ1YsRUFBRSxRQUFRO0FBQ1YsRUFBRSxTQUFTO0FBQ1gsRUFBQztBQUNEO0FBQ0EsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtBQUNsQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSTtBQUNyQixJQUFJLFdBQVc7QUFDZixJQUFJLFNBQVM7QUFDYixJQUFJLFNBQVM7QUFDYixJQUFJLFNBQVM7QUFDYixJQUFJLFNBQVM7QUFDYixJQUFJLFFBQVE7QUFDWixJQUFJLFNBQVM7QUFDYixJQUFJLFFBQVE7QUFDWjtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0EsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtBQUNsQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSTtBQUNyQixJQUFJLE9BQU87QUFDWCxJQUFJLFNBQVM7QUFDYixJQUFJLFFBQVE7QUFDWixJQUFJLFdBQVc7QUFDZixJQUFJLFdBQVc7QUFDZixJQUFHO0FBQ0g7Ozs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sR0FBR0QsY0FBTSxDQUFDLFFBQU87QUFDNUI7QUFDQSxNQUFNLFNBQVMsR0FBRyxVQUFVLE9BQU8sRUFBRTtBQUNyQyxFQUFFLE9BQU8sT0FBTztBQUNoQixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7QUFDL0IsSUFBSSxPQUFPLE9BQU8sQ0FBQyxjQUFjLEtBQUssVUFBVTtBQUNoRCxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxVQUFVO0FBQ3RDLElBQUksT0FBTyxPQUFPLENBQUMsVUFBVSxLQUFLLFVBQVU7QUFDNUMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxTQUFTLEtBQUssVUFBVTtBQUMzQyxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxVQUFVO0FBQ3RDLElBQUksT0FBTyxPQUFPLENBQUMsR0FBRyxLQUFLLFFBQVE7QUFDbkMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxFQUFFLEtBQUssVUFBVTtBQUNwQyxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUN6QixFQUFFLGNBQWMsR0FBRyxZQUFZO0FBQy9CLElBQUksT0FBTyxZQUFZLEVBQUU7QUFDekIsSUFBRztBQUNILENBQUMsTUFBTTtBQUNQLEVBQUUsSUFBSSxNQUFNLEdBQUdDLCtCQUFpQjtBQUNoQyxFQUFFLElBQUlpQixTQUFPLEdBQUdoQixRQUF1QjtBQUN2QyxFQUFFLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBQztBQUM1QztBQUNBLEVBQUUsSUFBSSxFQUFFLEdBQUdpQiwrQkFBaUI7QUFDNUI7QUFDQSxFQUFFLElBQUksT0FBTyxFQUFFLEtBQUssVUFBVSxFQUFFO0FBQ2hDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFZO0FBQ3hCLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxRQUFPO0FBQ2IsRUFBRSxJQUFJLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRTtBQUN2QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsd0JBQXVCO0FBQzdDLEdBQUcsTUFBTTtBQUNULElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLEVBQUUsR0FBRTtBQUN4RCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBQztBQUNyQixJQUFJLE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRTtBQUN4QixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7QUFDekIsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBQztBQUNyQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSTtBQUMzQixHQUFHO0FBQ0g7QUFDQSxFQUFFLGNBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUU7QUFDdkM7QUFDQSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUNuQixjQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDcEMsTUFBTSxPQUFPLFlBQVksRUFBRTtBQUMzQixLQUFLO0FBQ0wsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSw4Q0FBOEMsRUFBQztBQUN2RjtBQUNBLElBQUksSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO0FBQzFCLE1BQU0sSUFBSSxHQUFFO0FBQ1osS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLEVBQUUsR0FBRyxPQUFNO0FBQ25CLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNqQyxNQUFNLEVBQUUsR0FBRyxZQUFXO0FBQ3RCLEtBQUs7QUFDTDtBQUNBLElBQUksSUFBSSxNQUFNLEdBQUcsWUFBWTtBQUM3QixNQUFNLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBQztBQUNwQyxNQUFNLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztBQUNoRCxVQUFVLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUN2RCxRQUFRLE1BQU0sR0FBRTtBQUNoQixPQUFPO0FBQ1AsTUFBSztBQUNMLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFDO0FBQ3RCO0FBQ0EsSUFBSSxPQUFPLE1BQU07QUFDakIsSUFBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLE1BQU0sR0FBRyxTQUFTLE1BQU0sSUFBSTtBQUNsQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUNBLGNBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUMvQyxNQUFNLE1BQU07QUFDWixLQUFLO0FBQ0wsSUFBSSxNQUFNLEdBQUcsTUFBSztBQUNsQjtBQUNBLElBQUlrQixTQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ25DLE1BQU0sSUFBSTtBQUNWLFFBQVEsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFDO0FBQ3RELE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFO0FBQ3JCLEtBQUssRUFBQztBQUNOLElBQUksT0FBTyxDQUFDLElBQUksR0FBRyxvQkFBbUI7QUFDdEMsSUFBSSxPQUFPLENBQUMsVUFBVSxHQUFHLDBCQUF5QjtBQUNsRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBQztBQUN0QixJQUFHO0FBQ0gsRUFBRSxxQkFBcUIsR0FBRyxPQUFNO0FBQ2hDO0FBQ0EsRUFBRSxJQUFJLElBQUksR0FBRyxTQUFTLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNqRDtBQUNBLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2hDLE1BQU0sTUFBTTtBQUNaLEtBQUs7QUFDTCxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSTtBQUNqQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUM7QUFDckMsSUFBRztBQUNIO0FBQ0E7QUFDQSxFQUFFLElBQUksWUFBWSxHQUFHLEdBQUU7QUFDdkIsRUFBRUEsU0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRTtBQUNqQyxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLFFBQVEsSUFBSTtBQUM3QztBQUNBLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQ2xCLGNBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUN0QyxRQUFRLE1BQU07QUFDZCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFDO0FBQzVDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDOUMsUUFBUSxNQUFNLEdBQUU7QUFDaEIsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUM7QUFDL0I7QUFDQSxRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQztBQUNwQztBQUNBLFFBQVEsSUFBSSxLQUFLLElBQUksR0FBRyxLQUFLLFFBQVEsRUFBRTtBQUN2QztBQUNBO0FBQ0EsVUFBVSxHQUFHLEdBQUcsU0FBUTtBQUN4QixTQUFTO0FBQ1Q7QUFDQSxRQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUM7QUFDdEMsT0FBTztBQUNQLE1BQUs7QUFDTCxHQUFHLEVBQUM7QUFDSjtBQUNBLEVBQUUsc0JBQXNCLEdBQUcsWUFBWTtBQUN2QyxJQUFJLE9BQU9rQixTQUFPO0FBQ2xCLElBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxNQUFNLEdBQUcsTUFBSztBQUNwQjtBQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUcsU0FBUyxJQUFJLElBQUk7QUFDOUIsSUFBSSxJQUFJLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQ2xCLGNBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUM5QyxNQUFNLE1BQU07QUFDWixLQUFLO0FBQ0wsSUFBSSxNQUFNLEdBQUcsS0FBSTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUM7QUFDdEI7QUFDQSxJQUFJa0IsU0FBTyxHQUFHQSxTQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQzVDLE1BQU0sSUFBSTtBQUNWLFFBQVEsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFDO0FBQzFDLFFBQVEsT0FBTyxJQUFJO0FBQ25CLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRTtBQUNuQixRQUFRLE9BQU8sS0FBSztBQUNwQixPQUFPO0FBQ1AsS0FBSyxFQUFDO0FBQ047QUFDQSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUcsWUFBVztBQUM5QixJQUFJLE9BQU8sQ0FBQyxVQUFVLEdBQUcsa0JBQWlCO0FBQzFDLElBQUc7QUFDSCxFQUFFLG1CQUFtQixHQUFHLEtBQUk7QUFDNUI7QUFDQSxFQUFFLElBQUkseUJBQXlCLEdBQUcsT0FBTyxDQUFDLFdBQVU7QUFDcEQsRUFBRSxJQUFJLGlCQUFpQixHQUFHLFNBQVMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFO0FBQzVEO0FBQ0EsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDbEIsY0FBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ3BDLE1BQU0sTUFBTTtBQUNaLEtBQUs7QUFDTCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSwrQkFBK0IsRUFBQztBQUMzRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7QUFDeEM7QUFDQSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7QUFDN0M7QUFDQSxJQUFJLHlCQUF5QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBQztBQUM3RCxJQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksbUJBQW1CLEdBQUcsT0FBTyxDQUFDLEtBQUk7QUFDeEMsRUFBRSxJQUFJLFdBQVcsR0FBRyxTQUFTLFdBQVcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO0FBQ25ELElBQUksSUFBSSxFQUFFLEtBQUssTUFBTSxJQUFJLFNBQVMsQ0FBQ0EsY0FBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ3BEO0FBQ0EsTUFBTSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDN0IsUUFBUSxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUc7QUFDOUIsT0FBTztBQUNQLE1BQU0sSUFBSSxHQUFHLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUM7QUFDMUQ7QUFDQSxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7QUFDMUM7QUFDQSxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7QUFDL0M7QUFDQSxNQUFNLE9BQU8sR0FBRztBQUNoQixLQUFLLE1BQU07QUFDWCxNQUFNLE9BQU8sbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUM7QUFDdkQsS0FBSztBQUNMLElBQUc7QUFDSDs7O0FDck1BLE1BQU0sMEJBQTBCLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUM1QztBQUNBO0FBQ0EsTUFBTW9CLGFBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEdBQUcsU0FBUyxFQUFFLE9BQU8sR0FBRyxFQUFFLEtBQUs7QUFDaEUsQ0FBQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDakMsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbkQsQ0FBQyxPQUFPLFVBQVUsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFDRjtBQUNBLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxLQUFLO0FBQzlELENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFO0FBQ3BELEVBQUUsT0FBTztBQUNULEVBQUU7QUFDRjtBQUNBLENBQUMsTUFBTSxPQUFPLEdBQUcsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkQsQ0FBQyxNQUFNLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTTtBQUM1QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsQixFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUU7QUFDZCxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNaLEVBQUU7QUFDRixDQUFDLENBQUM7QUFDRjtBQUNBLE1BQU0sZUFBZSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBRSxVQUFVLEtBQUs7QUFDekUsQ0FBQyxPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBcUIsS0FBSyxLQUFLLElBQUksVUFBVSxDQUFDO0FBQzNFLENBQUMsQ0FBQztBQUNGO0FBQ0EsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJO0FBQzVCLENBQUMsT0FBTyxNQUFNLEtBQUtDLHVCQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPO0FBQy9DLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxTQUFTLENBQUMsQ0FBQztBQUNyRSxDQUFDLENBQUM7QUFDRjtBQUNBLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxLQUFLO0FBQ3JFLENBQUMsSUFBSSxxQkFBcUIsS0FBSyxJQUFJLEVBQUU7QUFDckMsRUFBRSxPQUFPLDBCQUEwQixDQUFDO0FBQ3BDLEVBQUU7QUFDRjtBQUNBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsSUFBSSxxQkFBcUIsR0FBRyxDQUFDLEVBQUU7QUFDM0UsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsa0ZBQWtGLEVBQUUscUJBQXFCLENBQUMsSUFBSSxFQUFFLE9BQU8scUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4SyxFQUFFO0FBQ0Y7QUFDQSxDQUFDLE9BQU8scUJBQXFCLENBQUM7QUFDOUIsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBLE1BQU1DLGVBQWEsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEtBQUs7QUFDNUMsQ0FBQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbkM7QUFDQSxDQUFDLElBQUksVUFBVSxFQUFFO0FBQ2pCLEVBQUUsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDNUIsRUFBRTtBQUNGLENBQUMsQ0FBQztBQUNGO0FBQ0EsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sS0FBSztBQUNqRCxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUMsQ0FBQztBQUNGO0FBQ0E7QUFDQSxNQUFNQyxjQUFZLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFHLFNBQVMsQ0FBQyxFQUFFLGNBQWMsS0FBSztBQUNyRixDQUFDLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO0FBQzdDLEVBQUUsT0FBTyxjQUFjLENBQUM7QUFDeEIsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLFNBQVMsQ0FBQztBQUNmLENBQUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxLQUFLO0FBQ3pELEVBQUUsU0FBUyxHQUFHLFVBQVUsQ0FBQyxNQUFNO0FBQy9CLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2QsRUFBRSxDQUFDLENBQUM7QUFDSjtBQUNBLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU07QUFDekQsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDMUIsRUFBRSxDQUFDLENBQUM7QUFDSjtBQUNBLENBQUMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUM7QUFDRjtBQUNBLE1BQU1DLGlCQUFlLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLO0FBQ3ZDLENBQUMsSUFBSSxPQUFPLEtBQUssU0FBUyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDMUUsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsb0VBQW9FLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlILEVBQUU7QUFDRixDQUFDLENBQUM7QUFDRjtBQUNBO0FBQ0EsTUFBTUMsZ0JBQWMsR0FBRyxPQUFPLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBRSxZQUFZLEtBQUs7QUFDN0UsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLFFBQVEsRUFBRTtBQUMzQixFQUFFLE9BQU8sWUFBWSxDQUFDO0FBQ3RCLEVBQUU7QUFDRjtBQUNBLENBQUMsTUFBTSxpQkFBaUIsR0FBR0MsVUFBTSxDQUFDLE1BQU07QUFDeEMsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDakIsRUFBRSxDQUFDLENBQUM7QUFDSjtBQUNBLENBQUMsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU07QUFDbkMsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO0FBQ3RCLEVBQUUsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxRQUFjLEdBQUc7QUFDakIsY0FBQ04sYUFBVztBQUNaLGdCQUFDRSxlQUFhO0FBQ2QsZUFBQ0MsY0FBWTtBQUNiLGtCQUFDQyxpQkFBZTtBQUNoQixpQkFBQ0MsZ0JBQWM7QUFDZixDQUFDOztBQ2hIRCxNQUFNLFFBQVEsR0FBRyxNQUFNO0FBQ3ZCLENBQUMsTUFBTSxLQUFLLElBQUk7QUFDaEIsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRO0FBQzNCLENBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQztBQUNuQztBQUNBLFFBQVEsQ0FBQyxRQUFRLEdBQUcsTUFBTTtBQUMxQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDakIsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLEtBQUs7QUFDMUIsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssVUFBVTtBQUNwQyxDQUFDLE9BQU8sTUFBTSxDQUFDLGNBQWMsS0FBSyxRQUFRLENBQUM7QUFDM0M7QUFDQSxRQUFRLENBQUMsUUFBUSxHQUFHLE1BQU07QUFDMUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQ2pCLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxLQUFLO0FBQzFCLENBQUMsT0FBTyxNQUFNLENBQUMsS0FBSyxLQUFLLFVBQVU7QUFDbkMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxjQUFjLEtBQUssUUFBUSxDQUFDO0FBQzNDO0FBQ0EsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNO0FBQ3hCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDMUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCO0FBQ0EsUUFBUSxDQUFDLFNBQVMsR0FBRyxNQUFNO0FBQzNCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDeEIsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDO0FBQ3pDO0FBQ0EsY0FBYyxHQUFHLFFBQVE7O0FDMUJ6QixNQUFNLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLEdBQUd4QixnQ0FBaUIsQ0FBQztBQUMzRDtBQUNBLGdCQUFjLEdBQUcsT0FBTyxJQUFJO0FBQzVCLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztBQUN4QjtBQUNBLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQztBQUN6QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUM7QUFDMUIsQ0FBQyxNQUFNLFFBQVEsR0FBRyxRQUFRLEtBQUssUUFBUSxDQUFDO0FBQ3hDLENBQUMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ3hCO0FBQ0EsQ0FBQyxJQUFJLEtBQUssRUFBRTtBQUNaLEVBQUUsVUFBVSxHQUFHLEVBQUUsUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLEVBQUUsTUFBTTtBQUNSLEVBQUUsUUFBUSxHQUFHLFFBQVEsSUFBSSxNQUFNLENBQUM7QUFDaEMsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLFFBQVEsRUFBRTtBQUNmLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQztBQUNsQixFQUFFO0FBQ0Y7QUFDQSxDQUFDLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQWlCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ3BEO0FBQ0EsQ0FBQyxJQUFJLFFBQVEsRUFBRTtBQUNmLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQixFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNoQixDQUFDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNuQjtBQUNBLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxJQUFJO0FBQzVCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQjtBQUNBLEVBQUUsSUFBSSxVQUFVLEVBQUU7QUFDbEIsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUMxQixHQUFHLE1BQU07QUFDVCxHQUFHLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzFCLEdBQUc7QUFDSCxFQUFFLENBQUMsQ0FBQztBQUNKO0FBQ0EsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsTUFBTTtBQUNqQyxFQUFFLElBQUksS0FBSyxFQUFFO0FBQ2IsR0FBRyxPQUFPLE1BQU0sQ0FBQztBQUNqQixHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEUsRUFBRSxDQUFDO0FBQ0g7QUFDQSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLE1BQU0sQ0FBQztBQUN6QztBQUNBLENBQUMsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDOztBQ2xERCxNQUFNLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxHQUFHQSxnQ0FBaUIsQ0FBQztBQUN0QjtBQUNqQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUdDLDhCQUFlLENBQUM7QUFDWTtBQUNoRDtBQUNBLE1BQU0seUJBQXlCLEdBQUcsU0FBUyxDQUFDeUIsZ0NBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3RDtBQUNBLE1BQU0sY0FBYyxTQUFTLEtBQUssQ0FBQztBQUNuQyxDQUFDLFdBQVcsR0FBRztBQUNmLEVBQUUsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDOUIsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDO0FBQy9CLEVBQUU7QUFDRixDQUFDO0FBQ0Q7QUFDQSxlQUFlLFNBQVMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQy9DLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNuQixFQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUN2QyxFQUFFO0FBQ0Y7QUFDQSxDQUFDLE9BQU8sR0FBRztBQUNYLEVBQUUsU0FBUyxFQUFFLFFBQVE7QUFDckIsRUFBRSxHQUFHLE9BQU87QUFDWixFQUFFLENBQUM7QUFDSDtBQUNBLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztBQUM3QixDQUFDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0QztBQUNBLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEtBQUs7QUFDeEMsRUFBRSxNQUFNLGFBQWEsR0FBRyxLQUFLLElBQUk7QUFDakM7QUFDQSxHQUFHLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLGVBQWUsQ0FBQyxVQUFVLEVBQUU7QUFDMUUsSUFBSSxLQUFLLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBQ25ELElBQUk7QUFDSjtBQUNBLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pCLEdBQUcsQ0FBQztBQUNKO0FBQ0EsRUFBRSxDQUFDLFlBQVk7QUFDZixHQUFHLElBQUk7QUFDUCxJQUFJLE1BQU0seUJBQXlCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3pELElBQUksT0FBTyxFQUFFLENBQUM7QUFDZCxJQUFJLENBQUMsT0FBTyxLQUFLLEVBQUU7QUFDbkIsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsSUFBSTtBQUNKLEdBQUcsR0FBRyxDQUFDO0FBQ1A7QUFDQSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU07QUFDMUIsR0FBRyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLFNBQVMsRUFBRTtBQUMvQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDeEMsSUFBSTtBQUNKLEdBQUcsQ0FBQyxDQUFDO0FBQ0wsRUFBRSxDQUFDLENBQUM7QUFDSjtBQUNBLENBQUMsT0FBTyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUNsQyxDQUFDO0FBQ0Q7QUFDQSxlQUFjLEdBQUcsU0FBUyxDQUFDO0FBQzNCLFVBQXFCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxLQUFLLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNqRyxTQUFvQixHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sS0FBSyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDekYsb0JBQTZCLEdBQUcsY0FBYzs7Ozs7QUMxRDlDLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRzFCLGdDQUFpQixDQUFDO0FBQzFDO0FBQ0EsZUFBYyxHQUFHLDBCQUEwQjtBQUMzQyxFQUFFLElBQUksT0FBTyxHQUFHLEdBQUU7QUFDbEIsRUFBRSxJQUFJLE1BQU0sSUFBSSxJQUFJLFdBQVcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBQztBQUNuRDtBQUNBLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUM7QUFDM0I7QUFDQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBRztBQUNsQixFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBTztBQUMxQjtBQUNBLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFDO0FBQzdCO0FBQ0EsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQztBQUNwRDtBQUNBLEVBQUUsT0FBTyxNQUFNO0FBQ2Y7QUFDQSxFQUFFLFNBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUN4QixJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUMvQixNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDO0FBQ3pCLE1BQU0sT0FBTyxJQUFJO0FBQ2pCLEtBQUs7QUFDTDtBQUNBLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFDO0FBQ2pELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFDO0FBQzNELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUM7QUFDckMsSUFBSSxPQUFPLElBQUk7QUFDZixHQUFHO0FBQ0g7QUFDQSxFQUFFLFNBQVMsT0FBTyxJQUFJO0FBQ3RCLElBQUksT0FBTyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztBQUMvQixHQUFHO0FBQ0g7QUFDQSxFQUFFLFNBQVMsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUMzQixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssTUFBTSxFQUFFLEVBQUM7QUFDcEUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRSxFQUFFO0FBQzVELEdBQUc7QUFDSDs7QUNuQ0E7QUFDQSxNQUFNMkIsYUFBVyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssS0FBSztBQUN4QztBQUNBO0FBQ0EsQ0FBQyxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7QUFDekQsRUFBRSxPQUFPO0FBQ1QsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJQyxVQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDdEIsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QixFQUFFLE1BQU07QUFDUixFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNCLEVBQUU7QUFDRixDQUFDLENBQUM7QUFDRjtBQUNBO0FBQ0EsTUFBTUMsZUFBYSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUs7QUFDMUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNuRCxFQUFFLE9BQU87QUFDVCxFQUFFO0FBQ0Y7QUFDQSxDQUFDLE1BQU0sS0FBSyxHQUFHLFdBQVcsRUFBRSxDQUFDO0FBQzdCO0FBQ0EsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDckIsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QixFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUNyQixFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxLQUFLLENBQUM7QUFDZCxDQUFDLENBQUM7QUFDRjtBQUNBO0FBQ0EsTUFBTSxlQUFlLEdBQUcsT0FBTyxNQUFNLEVBQUUsYUFBYSxLQUFLO0FBQ3pELENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNkLEVBQUUsT0FBTztBQUNULEVBQUU7QUFDRjtBQUNBLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ2xCO0FBQ0EsQ0FBQyxJQUFJO0FBQ0wsRUFBRSxPQUFPLE1BQU0sYUFBYSxDQUFDO0FBQzdCLEVBQUUsQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUNqQixFQUFFLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQztBQUM1QixFQUFFO0FBQ0YsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxNQUFNLGdCQUFnQixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsS0FBSztBQUNwRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDekIsRUFBRSxPQUFPO0FBQ1QsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLFFBQVEsRUFBRTtBQUNmLEVBQUUsT0FBT0MsV0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ2xELEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBT0EsV0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQzlDLENBQUMsQ0FBQztBQUNGO0FBQ0E7QUFDQSxNQUFNQyxrQkFBZ0IsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUUsV0FBVyxLQUFLO0FBQ3RHLENBQUMsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQy9FLENBQUMsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQy9FLENBQUMsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEY7QUFDQSxDQUFDLElBQUk7QUFDTCxFQUFFLE9BQU8sTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNwRixFQUFFLENBQUMsT0FBTyxLQUFLLEVBQUU7QUFDakIsRUFBRSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDckIsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQztBQUMxRCxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDO0FBQ3pDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUM7QUFDekMsR0FBRyxlQUFlLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQztBQUNuQyxHQUFHLENBQUMsQ0FBQztBQUNMLEVBQUU7QUFDRixDQUFDLENBQUM7QUFDRjtBQUNBLE1BQU1DLG1CQUFpQixHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSztBQUN2QyxDQUFDLElBQUlKLFVBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN0QixFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsb0RBQW9ELENBQUMsQ0FBQztBQUM1RSxFQUFFO0FBQ0YsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxVQUFjLEdBQUc7QUFDakIsY0FBQ0QsYUFBVztBQUNaLGdCQUFDRSxlQUFhO0FBQ2QsbUJBQUNFLGtCQUFnQjtBQUNqQixvQkFBQ0MsbUJBQWlCO0FBQ2xCLENBQUM7O0FDN0ZELE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7QUFDeEUsTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUk7QUFDakUsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxDQUFDO0FBQ25FLENBQUMsQ0FBQyxDQUFDO0FBQ0g7QUFDQTtBQUNBLE1BQU1DLGNBQVksR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEtBQUs7QUFDM0MsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLElBQUksV0FBVyxFQUFFO0FBQ25EO0FBQ0EsRUFBRSxNQUFNLEtBQUssR0FBRyxPQUFPLE9BQU8sS0FBSyxVQUFVO0FBQzdDLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDO0FBQ2hFLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEM7QUFDQSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDcEUsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxPQUFPLE9BQU8sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFDRjtBQUNBO0FBQ0EsTUFBTUMsbUJBQWlCLEdBQUcsT0FBTyxJQUFJO0FBQ3JDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEtBQUs7QUFDekMsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEtBQUs7QUFDM0MsR0FBRyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUMvQixHQUFHLENBQUMsQ0FBQztBQUNMO0FBQ0EsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUk7QUFDL0IsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakIsR0FBRyxDQUFDLENBQUM7QUFDTDtBQUNBLEVBQUUsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQ3JCLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSTtBQUN0QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsQixJQUFJLENBQUMsQ0FBQztBQUNOLEdBQUc7QUFDSCxFQUFFLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUNGO0FBQ0EsV0FBYyxHQUFHO0FBQ2pCLGVBQUNELGNBQVk7QUFDYixvQkFBQ0MsbUJBQWlCO0FBQ2xCLENBQUM7O0FDM0NELE1BQU0sYUFBYSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFLEtBQUs7QUFDM0MsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUMzQixFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQixFQUFFO0FBQ0Y7QUFDQSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUM7QUFDRjtBQUNBLE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDO0FBQ3JDLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDO0FBQ2xDO0FBQ0EsTUFBTSxTQUFTLEdBQUcsR0FBRyxJQUFJO0FBQ3pCLENBQUMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzVELEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDYixFQUFFO0FBQ0Y7QUFDQSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxDQUFDLENBQUM7QUFDRjtBQUNBLE1BQU1DLGFBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEtBQUs7QUFDcEMsQ0FBQyxPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLENBQUMsQ0FBQztBQUNGO0FBQ0EsTUFBTUMsbUJBQWlCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxLQUFLO0FBQzFDLENBQUMsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZFLENBQUMsQ0FBQztBQUNGO0FBQ0EsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzVCO0FBQ0E7QUFDQSxNQUFNQyxjQUFZLEdBQUcsT0FBTyxJQUFJO0FBQ2hDLENBQUMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ25CLENBQUMsS0FBSyxNQUFNLEtBQUssSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFO0FBQzFEO0FBQ0EsRUFBRSxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNsRCxFQUFFLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDckQ7QUFDQSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLEdBQUcsTUFBTTtBQUNULEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0QixHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxPQUFPLE1BQU0sQ0FBQztBQUNmLENBQUMsQ0FBQztBQUNGO0FBQ0EsYUFBYyxHQUFHO0FBQ2pCLGNBQUNGLGFBQVc7QUFDWixvQkFBQ0MsbUJBQWlCO0FBQ2xCLGVBQUNDLGNBQVk7QUFDYixDQUFDOztBQzFDRCxNQUFNLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxHQUFHckMsSUFBcUIsQ0FBQztBQUMxRyxNQUFNLENBQUMsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxHQUFHQyxNQUF1QixDQUFDO0FBQ2xHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsR0FBR2lCLE9BQXdCLENBQUM7QUFDbkUsTUFBTSxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLENBQUMsR0FBR29CLFNBQXdCLENBQUM7QUFDaEY7QUFDQSxNQUFNLGtCQUFrQixHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQzdDO0FBQ0EsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEtBQUs7QUFDakYsQ0FBQyxNQUFNLEdBQUcsR0FBRyxTQUFTLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUM7QUFDcEU7QUFDQSxDQUFDLElBQUksV0FBVyxFQUFFO0FBQ2xCLEVBQUUsT0FBT0MsWUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDeEQsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxPQUFPLEdBQUcsQ0FBQztBQUNaLENBQUMsQ0FBQztBQUNGO0FBQ0EsTUFBTSxlQUFlLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sR0FBRyxFQUFFLEtBQUs7QUFDdEQsQ0FBQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdkQsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUN2QixDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDMUI7QUFDQSxDQUFDLE9BQU8sR0FBRztBQUNYLEVBQUUsU0FBUyxFQUFFLGtCQUFrQjtBQUMvQixFQUFFLE1BQU0sRUFBRSxJQUFJO0FBQ2QsRUFBRSxpQkFBaUIsRUFBRSxJQUFJO0FBQ3pCLEVBQUUsU0FBUyxFQUFFLElBQUk7QUFDakIsRUFBRSxXQUFXLEVBQUUsS0FBSztBQUNwQixFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDeEMsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7QUFDNUIsRUFBRSxRQUFRLEVBQUUsTUFBTTtBQUNsQixFQUFFLE1BQU0sRUFBRSxJQUFJO0FBQ2QsRUFBRSxPQUFPLEVBQUUsSUFBSTtBQUNmLEVBQUUsR0FBRyxFQUFFLEtBQUs7QUFDWixFQUFFLFdBQVcsRUFBRSxJQUFJO0FBQ25CLEVBQUUsR0FBRyxPQUFPO0FBQ1osRUFBRSxDQUFDO0FBQ0g7QUFDQSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CO0FBQ0EsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHQyxLQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekM7QUFDQSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUl0Qyx3QkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssS0FBSyxFQUFFO0FBQzVFO0FBQ0EsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQztBQUNGO0FBQ0EsTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssS0FBSztBQUNoRCxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUMzRDtBQUNBLEVBQUUsT0FBTyxLQUFLLEtBQUssU0FBUyxHQUFHLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDOUMsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtBQUNoQyxFQUFFLE9BQU8saUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEMsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxPQUFPLEtBQUssQ0FBQztBQUNkLENBQUMsQ0FBQztBQUNGO0FBQ0EsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sS0FBSztBQUN2QyxDQUFDLE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3JELENBQUMsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN6QyxDQUFDLE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0RDtBQUNBLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqQztBQUNBLENBQUMsSUFBSSxPQUFPLENBQUM7QUFDYixDQUFDLElBQUk7QUFDTCxFQUFFLE9BQU8sR0FBR3VDLGdDQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekUsRUFBRSxDQUFDLE9BQU9DLE9BQUssRUFBRTtBQUNqQjtBQUNBLEVBQUUsTUFBTSxZQUFZLEdBQUcsSUFBSUQsZ0NBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUN2RCxFQUFFLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUNFLEtBQVMsQ0FBQztBQUNoRCxVQUFHRCxPQUFLO0FBQ1IsR0FBRyxNQUFNLEVBQUUsRUFBRTtBQUNiLEdBQUcsTUFBTSxFQUFFLEVBQUU7QUFDYixHQUFHLEdBQUcsRUFBRSxFQUFFO0FBQ1YsR0FBRyxPQUFPO0FBQ1YsR0FBRyxjQUFjO0FBQ2pCLEdBQUcsTUFBTTtBQUNULEdBQUcsUUFBUSxFQUFFLEtBQUs7QUFDbEIsR0FBRyxVQUFVLEVBQUUsS0FBSztBQUNwQixHQUFHLE1BQU0sRUFBRSxLQUFLO0FBQ2hCLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDTixFQUFFLE9BQU8sWUFBWSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztBQUNsRCxFQUFFO0FBQ0Y7QUFDQSxDQUFDLE1BQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELENBQUMsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQzVFLENBQUMsTUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzNFO0FBQ0EsQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNyQztBQUNBLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ25FLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDN0Q7QUFDQSxDQUFDLE1BQU0sYUFBYSxHQUFHLFlBQVk7QUFDbkMsRUFBRSxNQUFNLENBQUMsUUFBQ0EsT0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsR0FBRyxNQUFNLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3BKLEVBQUUsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDNUQsRUFBRSxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM1RCxFQUFFLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3REO0FBQ0EsRUFBRSxJQUFJQSxPQUFLLElBQUksUUFBUSxLQUFLLENBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQ2xELEdBQUcsTUFBTSxhQUFhLEdBQUdDLEtBQVMsQ0FBQztBQUNuQyxXQUFJRCxPQUFLO0FBQ1QsSUFBSSxRQUFRO0FBQ1osSUFBSSxNQUFNO0FBQ1YsSUFBSSxNQUFNO0FBQ1YsSUFBSSxNQUFNO0FBQ1YsSUFBSSxHQUFHO0FBQ1AsSUFBSSxPQUFPO0FBQ1gsSUFBSSxjQUFjO0FBQ2xCLElBQUksTUFBTTtBQUNWLElBQUksUUFBUTtBQUNaLElBQUksVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO0FBQ2xDLElBQUksTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO0FBQzFCLElBQUksQ0FBQyxDQUFDO0FBQ047QUFDQSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUMvQixJQUFJLE9BQU8sYUFBYSxDQUFDO0FBQ3pCLElBQUk7QUFDSjtBQUNBLEdBQUcsTUFBTSxhQUFhLENBQUM7QUFDdkIsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPO0FBQ1QsR0FBRyxPQUFPO0FBQ1YsR0FBRyxjQUFjO0FBQ2pCLEdBQUcsUUFBUSxFQUFFLENBQUM7QUFDZCxHQUFHLE1BQU07QUFDVCxHQUFHLE1BQU07QUFDVCxHQUFHLEdBQUc7QUFDTixHQUFHLE1BQU0sRUFBRSxLQUFLO0FBQ2hCLEdBQUcsUUFBUSxFQUFFLEtBQUs7QUFDbEIsR0FBRyxVQUFVLEVBQUUsS0FBSztBQUNwQixHQUFHLE1BQU0sRUFBRSxLQUFLO0FBQ2hCLEdBQUcsQ0FBQztBQUNKLEVBQUUsQ0FBQztBQUNIO0FBQ0EsQ0FBQyxNQUFNLGlCQUFpQixHQUFHRSxTQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDbEQ7QUFDQSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QztBQUNBLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0RDtBQUNBLENBQUMsT0FBTyxZQUFZLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDakQsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxXQUFjLEdBQUcsS0FBSyxDQUFDO0FBQ3ZCO0FBQ0EsUUFBbUIsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxLQUFLO0FBQy9DLENBQUMsTUFBTSxNQUFNLEdBQUcsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDckQsQ0FBQyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3pDLENBQUMsTUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3REO0FBQ0EsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkM7QUFDQSxDQUFDLElBQUksTUFBTSxDQUFDO0FBQ1osQ0FBQyxJQUFJO0FBQ0wsRUFBRSxNQUFNLEdBQUdILGdDQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUUsRUFBRSxDQUFDLE9BQU9DLE9BQUssRUFBRTtBQUNqQixFQUFFLE1BQU1DLEtBQVMsQ0FBQztBQUNsQixVQUFHRCxPQUFLO0FBQ1IsR0FBRyxNQUFNLEVBQUUsRUFBRTtBQUNiLEdBQUcsTUFBTSxFQUFFLEVBQUU7QUFDYixHQUFHLEdBQUcsRUFBRSxFQUFFO0FBQ1YsR0FBRyxPQUFPO0FBQ1YsR0FBRyxjQUFjO0FBQ2pCLEdBQUcsTUFBTTtBQUNULEdBQUcsUUFBUSxFQUFFLEtBQUs7QUFDbEIsR0FBRyxVQUFVLEVBQUUsS0FBSztBQUNwQixHQUFHLE1BQU0sRUFBRSxLQUFLO0FBQ2hCLEdBQUcsQ0FBQyxDQUFDO0FBQ0wsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxRSxDQUFDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFFO0FBQ0EsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFDcEUsRUFBRSxNQUFNQSxPQUFLLEdBQUdDLEtBQVMsQ0FBQztBQUMxQixHQUFHLE1BQU07QUFDVCxHQUFHLE1BQU07QUFDVCxHQUFHLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztBQUN0QixHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtBQUN4QixHQUFHLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTTtBQUMxQixHQUFHLE9BQU87QUFDVixHQUFHLGNBQWM7QUFDakIsR0FBRyxNQUFNO0FBQ1QsR0FBRyxRQUFRLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXO0FBQzlELEdBQUcsVUFBVSxFQUFFLEtBQUs7QUFDcEIsR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sS0FBSyxJQUFJO0FBQ2pDLEdBQUcsQ0FBQyxDQUFDO0FBQ0w7QUFDQSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUM5QixHQUFHLE9BQU9ELE9BQUssQ0FBQztBQUNoQixHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU1BLE9BQUssQ0FBQztBQUNkLEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTztBQUNSLEVBQUUsT0FBTztBQUNULEVBQUUsY0FBYztBQUNoQixFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQ2IsRUFBRSxNQUFNO0FBQ1IsRUFBRSxNQUFNO0FBQ1IsRUFBRSxNQUFNLEVBQUUsS0FBSztBQUNmLEVBQUUsUUFBUSxFQUFFLEtBQUs7QUFDakIsRUFBRSxVQUFVLEVBQUUsS0FBSztBQUNuQixFQUFFLE1BQU0sRUFBRSxLQUFLO0FBQ2YsRUFBRSxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxXQUFzQixHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sS0FBSztBQUMvQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0MsQ0FBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQztBQUNGO0FBQ0EsZUFBMEIsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEtBQUs7QUFDbkQsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLENBQUMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxRQUFtQixHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUcsRUFBRSxLQUFLO0FBQzFELENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUMvRCxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDakIsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ1osRUFBRTtBQUNGO0FBQ0EsQ0FBQyxNQUFNRyxPQUFLLEdBQUdMLEtBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUMsQ0FBQyxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDdEY7QUFDQSxDQUFDLE1BQU07QUFDUCxFQUFFLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUTtBQUM3QixFQUFFLFdBQVcsR0FBRyxlQUFlO0FBQy9CLEVBQUUsR0FBRyxPQUFPLENBQUM7QUFDYjtBQUNBLENBQUMsT0FBTyxLQUFLO0FBQ2IsRUFBRSxRQUFRO0FBQ1YsRUFBRTtBQUNGLEdBQUcsR0FBRyxXQUFXO0FBQ2pCLEdBQUcsVUFBVTtBQUNiLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDdkMsR0FBRztBQUNILEVBQUU7QUFDRixHQUFHLEdBQUcsT0FBTztBQUNiLEdBQUcsS0FBSyxFQUFFLFNBQVM7QUFDbkIsR0FBRyxNQUFNLEVBQUUsU0FBUztBQUNwQixHQUFHLE1BQU0sRUFBRSxTQUFTO0FBQ3BCLFVBQUdLLE9BQUs7QUFDUixHQUFHLEtBQUssRUFBRSxLQUFLO0FBQ2YsR0FBRztBQUNILEVBQUUsQ0FBQztBQUNILENBQUM7Ozs7OztBQzNRYyxTQUFTLFNBQVMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUU7QUFDNUQsQ0FBQyxNQUFNLE9BQU8sR0FBRztBQUNqQixLQUFLLDhIQUE4SDtBQUNuSSxFQUFFLDBEQUEwRDtBQUM1RCxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2I7QUFDQSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDekQ7O0FDTGUsU0FBUyxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQzFDLENBQUMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7QUFDakMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsNkJBQTZCLEVBQUUsT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RSxFQUFFO0FBQ0Y7QUFDQSxDQUFDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4Qzs7QUNMTyxNQUFNLGtCQUFrQixHQUFHLE1BQU07QUFDeEMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUdDLDJCQUFPLENBQUM7QUFDdkI7QUFDQSxDQUFDLElBQUlBLDJCQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtBQUNuQyxFQUFFLE9BQU8sR0FBRyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUM7QUFDbEMsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJO0FBQ0wsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUdDLGdCQUFRLEVBQUUsQ0FBQztBQUM3QixFQUFFLElBQUksS0FBSyxFQUFFO0FBQ2IsR0FBRyxPQUFPLEtBQUssQ0FBQztBQUNoQixHQUFHO0FBQ0gsRUFBRSxDQUFDLE1BQU0sRUFBRTtBQUNYO0FBQ0EsQ0FBQyxJQUFJRCwyQkFBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7QUFDcEMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFDO0FBQ2pDLEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRjtBQUNBO0FBQ0EsTUFBTSxZQUFZLEdBQUcsa0JBQWtCLEVBQUU7O0FDcEJ6QyxNQUFNLElBQUksR0FBRztBQUNiLENBQUMsTUFBTTtBQUNQLENBQUMsNkVBQTZFO0FBQzlFLENBQUMsQ0FBQztBQUNGO0FBQ0EsTUFBTSxHQUFHLEdBQUc7QUFDWjtBQUNBLENBQUMsbUJBQW1CLEVBQUUsTUFBTTtBQUM1QixDQUFDLENBQUM7QUFDRjtBQUNBLE1BQU0sUUFBUSxHQUFHLEdBQUcsSUFBSTtBQUN4QixDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0MsQ0FBQyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDeEI7QUFDQSxDQUFDLEtBQUssTUFBTSxJQUFJLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQzlFLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0MsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QyxFQUFFO0FBQ0Y7QUFDQSxDQUFDLE9BQU8sV0FBVyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQWtCRjtBQUNPLFNBQVMsWUFBWSxDQUFDLEtBQUssRUFBRTtBQUNwQyxDQUFDLElBQUlBLDJCQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtBQUNuQyxFQUFFLE9BQU9BLDJCQUFPLENBQUMsR0FBRyxDQUFDO0FBQ3JCLEVBQUU7QUFDRjtBQUNBLENBQUMsSUFBSTtBQUNMLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHRSxPQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNsRSxFQUFFLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFCLEVBQUUsQ0FBQyxPQUFPLEtBQUssRUFBRTtBQUNqQixFQUFFLElBQUksS0FBSyxFQUFFO0FBQ2IsR0FBRyxNQUFNLEtBQUssQ0FBQztBQUNmLEdBQUcsTUFBTTtBQUNULEdBQUcsT0FBT0YsMkJBQU8sQ0FBQyxHQUFHLENBQUM7QUFDdEIsR0FBRztBQUNILEVBQUU7QUFDRjs7QUNwRE8sU0FBUyxhQUFhLEdBQUc7QUFDaEMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUM7QUFDL0IsQ0FBQyxPQUFPLElBQUksQ0FBQztBQUNiOztBQ1BlLFNBQVMsT0FBTyxHQUFHO0FBQ2xDLENBQUMsSUFBSUEsMkJBQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO0FBQ25DLEVBQUUsT0FBTztBQUNULEVBQUU7QUFDRjtBQUNBLENBQUNBLDJCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxhQUFhLEVBQUUsSUFBSTtBQUN2QyxFQUFFLHFCQUFxQjtBQUN2QixFQUFFLHdCQUF3QjtBQUMxQixFQUFFLGdCQUFnQjtBQUNsQixFQUFFQSwyQkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJO0FBQ2xCLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDYjs7QUNOQSxJQUFNLGNBQWMsR0FBRztJQUNyQixNQUFNO0lBQ04sTUFBTTtJQUNOLE9BQU87SUFDUCxNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87Q0FDUixDQUFDO1NBRWMsU0FBUyxDQUFDLEdBQVc7SUFDbkMsT0FBTyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ3BELENBQUM7U0FDZSxrQkFBa0IsQ0FBQzVDLE1BQVk7SUFDN0MsT0FBTyxTQUFTLENBQUMrQyxZQUFPLENBQUMvQyxNQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7U0FFZSxLQUFLO0lBQ1gsSUFBQSxVQUFVLEdBQUssU0FBUyxXQUFkLENBQWU7SUFDakMsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3BDLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO1NBQU0sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzNDLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO1NBQU0sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzNDLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO1NBQU07UUFDTCxPQUFPLFlBQVksQ0FBQztLQUNyQjtBQUNILENBQUM7U0FDcUIsY0FBYyxDQUFDLE1BQWdCOzs7Ozs7OztvQkFDN0MsTUFBTSxHQUFHLEVBQUUsQ0FBQzs7OztvQkFFUSxXQUFBLGNBQUEsTUFBTSxDQUFBOzs7OztvQkFBZixLQUFLLG1CQUFBLENBQUE7b0JBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFHbEMsc0JBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUM7Ozs7Q0FDaEQ7U0FFZSxXQUFXLENBQUMsR0FBVztJQUNyQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUNyRSxHQUFHLENBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7U0FpQmUsWUFBWSxDQUFDLElBQWM7SUFDekMsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3BDLElBQUksU0FBUyxDQUFDO0lBQ2QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7UUFDdkIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNuQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7S0FDRixDQUFDLENBQUM7SUFDSCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO1NBTWUsYUFBYSxDQUMzQixHQUFRLEVBQ1IsR0FBVztJQUVYLElBQU0sR0FBRyxHQUF5QixFQUFFLENBQUM7SUFDckMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87UUFDakIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztLQUM3QixDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNiOztBQ25GQTtJQUdFLHVCQUFZLFFBQXdCO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0tBQzFCO0lBRUssbUNBQVcsR0FBakIsVUFBa0IsUUFBdUI7Ozs7OzRCQUN0QixxQkFBTWdELG1CQUFVLENBQUM7NEJBQ2hDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVk7NEJBQy9CLE1BQU0sRUFBRSxNQUFNOzRCQUNkLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRTs0QkFDL0MsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7eUJBQ3pDLENBQUMsRUFBQTs7d0JBTEksUUFBUSxHQUFHLFNBS2Y7d0JBRUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7d0JBQzNCLHNCQUFPLElBQUksRUFBQzs7OztLQUNiO0lBRUssNkNBQXFCLEdBQTNCOzs7Ozs0QkFDYyxxQkFBTUEsbUJBQVUsQ0FBQzs0QkFDM0IsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWTs0QkFDL0IsTUFBTSxFQUFFLE1BQU07eUJBQ2YsQ0FBQyxFQUFBOzt3QkFISSxHQUFHLEdBQUcsU0FHVjt3QkFFRSxJQUFJLEdBQWtCLEdBQUcsQ0FBQyxJQUFJLENBQUM7d0JBRW5DLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7NkJBQ1osRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFFLENBQUM7NEJBQzdDLHNCQUFPO29DQUNMLElBQUksRUFBRSxDQUFDLENBQUM7b0NBQ1IsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO29DQUNiLElBQUksRUFBRSxFQUFFO2lDQUNULEVBQUM7eUJBQ0g7NkJBQU07NEJBQ0wsc0JBQU87b0NBQ0wsSUFBSSxFQUFFLENBQUM7b0NBQ1AsR0FBRyxFQUFFLFNBQVM7b0NBQ2QsSUFBSSxFQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQ0FDbkUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRTtpQ0FDbEMsRUFBQzt5QkFDSDs7OztLQUNGO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLElBQUE7QUFFRDtJQUdFLDJCQUFZLFFBQXdCO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0tBQzFCO0lBRUssdUNBQVcsR0FBakIsVUFBa0IsUUFBdUI7Ozs7Ozt3QkFDakMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7d0JBQzNCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsSUFBSSxPQUFPLENBQUM7d0JBQzdDLE9BQU8sR0FBTSxHQUFHLGdCQUFXLFFBQVE7NkJBQ3BDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLE9BQUksSUFBSSxPQUFHLEdBQUEsQ0FBQzs2QkFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDO3dCQUVILHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUE5QixHQUFHLEdBQUcsU0FBd0I7d0JBQzlCLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM1QixlQUFlLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQzt3QkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFFdkIsSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBRXBFLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTs0QkFDL0Isc0JBQU87b0NBQ0wsT0FBTyxFQUFFLEtBQUs7b0NBQ2QsR0FBRyxFQUFFLElBQUk7aUNBQ1YsRUFBQzt5QkFDSDs2QkFBTTs0QkFDTCxzQkFBTztvQ0FDTCxPQUFPLEVBQUUsSUFBSTtvQ0FDYixNQUFNLEVBQUUsSUFBSTtpQ0FDYixFQUFDO3lCQUNIOzs7O0tBRUY7O0lBR0ssaURBQXFCLEdBQTNCOzs7Ozs0QkFDYyxxQkFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUE7O3dCQUEvQixHQUFHLEdBQUcsU0FBeUI7d0JBQy9CLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUM1QixTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUUxQyxJQUFJLFNBQVMsRUFBRTs0QkFDYixzQkFBTztvQ0FDTCxJQUFJLEVBQUUsQ0FBQztvQ0FDUCxHQUFHLEVBQUUsU0FBUztvQ0FDZCxJQUFJLEVBQUUsU0FBUztpQ0FDaEIsRUFBQzt5QkFDSDs2QkFBTTs0QkFDTCxJQUFJQyxlQUFNLENBQUMseUNBQXFDLEdBQUssQ0FBQyxDQUFDOzRCQUN2RCxzQkFBTztvQ0FDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDO29DQUNSLEdBQUcsRUFBRSx5Q0FBcUMsR0FBSztvQ0FDL0MsSUFBSSxFQUFFLEVBQUU7aUNBQ1QsRUFBQzt5QkFDSDs7OztLQUNGOztJQUdLLHdDQUFZLEdBQWxCOzs7Ozs7d0JBRUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTs0QkFDL0IsT0FBTyxHQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxZQUFTLENBQUM7eUJBQ25EOzZCQUFNOzRCQUNMLE9BQU8sR0FBRyxjQUFjLENBQUM7eUJBQzFCO3dCQUNXLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUE5QixHQUFHLEdBQUcsU0FBd0I7d0JBQ3BDLHNCQUFPLEdBQUcsRUFBQzs7OztLQUNaO0lBRUssZ0NBQUksR0FBVixVQUFXLE9BQWU7Ozs7OzRCQUNQLHFCQUFNQyxpQkFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBOUIsTUFBTSxHQUFLLENBQUEsU0FBbUIsUUFBeEI7d0JBQ0EscUJBQU0sY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFBOzt3QkFBbEMsR0FBRyxHQUFHLFNBQTRCO3dCQUN4QyxzQkFBTyxHQUFHLEVBQUM7Ozs7S0FDWjtJQUNILHdCQUFDO0FBQUQsQ0FBQzs7QUMvSEQ7SUFHRSxzQkFBWSxNQUE2QjtRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN0QjtJQUVLLGtDQUFXLEdBQWpCLFVBQWtCLFNBQStCOzs7Ozs0QkFDOUIscUJBQU1GLG1CQUFVLENBQUM7NEJBQ2hDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZOzRCQUN0QyxNQUFNLEVBQUUsTUFBTTs0QkFDZCxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUU7NEJBQy9DLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dDQUNuQixJQUFJLEVBQUUsU0FBUzs2QkFDaEIsQ0FBQzt5QkFDSCxDQUFDLEVBQUE7O3dCQVBJLFFBQVEsR0FBRyxTQU9mO3dCQUNJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO3dCQUMzQixzQkFBTyxJQUFJLEVBQUM7Ozs7S0FDYjtJQUNILG1CQUFDO0FBQUQsQ0FBQzs7QUNmRCxJQUFNLFVBQVUsR0FBRyx1QkFBdUIsQ0FBQztBQUMzQyxJQUFNLGVBQWUsR0FBRyw0QkFBNEIsQ0FBQztBQUVyRDtJQUdFLGdCQUFZLEdBQVE7UUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7S0FDaEI7SUFDRCxvQ0FBbUIsR0FBbkIsVUFBb0IsR0FBVyxFQUFFLFlBQTZCO1FBQTdCLDZCQUFBLEVBQUEsd0JBQTZCO1FBQzVELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBELElBQUksS0FBSyxHQUFHLFlBQVksQ0FBQztRQUN6QixJQUFJLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFdBQVcsS0FBSSxLQUFLLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvRCxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoQztRQUNELE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCwwQkFBUyxHQUFUO1FBQ0UsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUNHLHFCQUFZLENBQUMsQ0FBQztRQUNwRSxJQUFJLE1BQU0sRUFBRTtZQUNWLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUN0QjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtLQUNGO0lBQ0QseUJBQVEsR0FBUjtRQUNFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQyxPQUFPLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMxQjtJQUVELHlCQUFRLEdBQVIsVUFBUyxLQUFhO1FBQ3BCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQixJQUFBLEtBQWdCLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBcEMsSUFBSSxVQUFBLEVBQUUsR0FBRyxTQUEyQixDQUFDO1FBQzdDLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVwQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDNUI7O0lBR0QsNEJBQVcsR0FBWDtRQUNFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsNkJBQVksR0FBWixVQUFhLEtBQWE7O1FBQ3hCLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVwRCxJQUFJLFNBQVMsR0FBWSxFQUFFLENBQUM7O1lBRTVCLEtBQW9CLElBQUEsWUFBQSxTQUFBLE9BQU8sQ0FBQSxnQ0FBQSxxREFBRTtnQkFBeEIsSUFBTSxLQUFLLG9CQUFBO2dCQUNkLElBQU0sTUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBTW5ELE1BQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFeEIsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDYixJQUFJLEVBQUVBLE1BQUk7b0JBQ1YsSUFBSSxFQUFFLE1BQUk7b0JBQ1YsTUFBTSxFQUFFLE1BQU07aUJBQ2YsQ0FBQyxDQUFDO2FBQ0o7Ozs7Ozs7Ozs7WUFFRCxLQUFvQixJQUFBLGdCQUFBLFNBQUEsV0FBVyxDQUFBLHdDQUFBLGlFQUFFO2dCQUE1QixJQUFNLEtBQUssd0JBQUE7Z0JBQ2QsSUFBTSxNQUFJLEdBQUdPLFVBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2xDLElBQU1QLE1BQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDYixJQUFJLEVBQUVBLE1BQUk7b0JBQ1YsSUFBSSxFQUFFLE1BQUk7b0JBQ1YsTUFBTSxFQUFFLE1BQU07aUJBQ2YsQ0FBQyxDQUFDO2FBQ0o7Ozs7Ozs7OztRQUNELE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0lBRUQsK0JBQWMsR0FBZCxVQUFlLEdBQVcsRUFBRSxZQUFvQjtRQUM5QyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDOUIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELElBQU0sZUFBZSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUU1QixPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBQSxXQUFXLElBQUksT0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFBLENBQUMsQ0FBQztLQUMxRTtJQUNILGFBQUM7QUFBRCxDQUFDOztBQ3RHRDtBQUVBLFNBQWUsRUFBRTs7QUNGakI7QUFFQSxTQUFlLEVBQUU7O0FDRmpCO0FBRUEsU0FBZSxFQUFFOztBQ0ZqQjtBQUVBLFNBQWUsRUFBRTs7QUNGakI7QUFFQSxTQUFlOztJQUViLGlCQUFpQixFQUFFLGlCQUFpQjtJQUNwQyxvQkFBb0IsRUFBRSxvQkFBb0I7SUFDMUMscUhBQXFILEVBQ25ILHFIQUFxSDtJQUN2SCxrQkFBa0IsRUFBRSxrQkFBa0I7SUFDdEMsY0FBYyxFQUFFLGNBQWM7SUFDOUIsMkJBQTJCLEVBQUUsMkJBQTJCO0lBQ3hELHFCQUFxQixFQUNuQix3REFBd0Q7SUFDMUQsY0FBYyxFQUFFLGtEQUFrRDtJQUNsRSxrQ0FBa0MsRUFBRSxrQ0FBa0M7SUFDdEUsNEJBQTRCLEVBQUUsNEJBQTRCO0lBQzFELGlCQUFpQixFQUFFLGlCQUFpQjtJQUNwQyxxQkFBcUIsRUFBRSxxQkFBcUI7SUFDNUMsZUFBZSxFQUFFLGVBQWU7SUFDaEMsbUJBQW1CLEVBQUUsbUJBQW1CO0lBQ3hDLCtCQUErQixFQUFFLG1DQUFtQztJQUNwRSxnQ0FBZ0MsRUFBRSxnQ0FBZ0M7SUFDbEUseUJBQXlCLEVBQUUseUJBQXlCO0lBQ3BELG1FQUFtRSxFQUNqRSxtRUFBbUU7SUFDckUsaUJBQWlCLEVBQUUsaUJBQWlCO0lBQ3BDLDZCQUE2QixFQUMzQix3SUFBd0k7SUFDMUksT0FBTyxFQUFFLFNBQVM7SUFDbEIsY0FBYyxFQUNaLDBMQUEwTDtJQUM1TCxtREFBbUQsRUFDakQsbURBQW1EO0lBQ3JELHFHQUFxRyxFQUNuRyxxR0FBcUc7SUFDdkcsMkJBQTJCLEVBQUUsMkJBQTJCO0lBQ3hELHVDQUF1QyxFQUNyQyxpRUFBaUU7SUFDbkUsMENBQTBDLEVBQ3hDLDBDQUEwQztJQUM1Qyx3REFBd0QsRUFDdEQsd0RBQXdEO0NBQzNEOztBQzFDRDtBQUVBLFdBQWUsRUFBRTs7QUNGakI7QUFFQSxTQUFlLEVBQUU7O0FDRmpCO0FBRUEsU0FBZSxFQUFFOztBQ0ZqQjtBQUVBLFNBQWUsRUFBRTs7QUNGakI7QUFFQSxTQUFlLEVBQUU7O0FDRmpCO0FBRUEsU0FBZSxFQUFFOztBQ0ZqQjtBQUVBLFNBQWUsRUFBRTs7QUNGakI7QUFFQSxTQUFlLEVBQUU7O0FDRmpCO0FBRUEsU0FBZSxFQUFFOztBQ0ZqQjtBQUVBLFNBQWUsRUFBRTs7QUNGakI7QUFFQSxTQUFlLEVBQUU7O0FDRmpCO0FBRUEsU0FBZSxFQUFFOztBQ0ZqQjtBQUNBO0FBRUEsV0FBZSxFQUFFOztBQ0hqQjtBQUVBLFNBQWUsRUFBRTs7QUNGakI7QUFFQSxTQUFlLEVBQUU7O0FDRmpCO0FBRUEsU0FBZSxFQUFFOztBQ0ZqQjtBQUVBLFdBQWU7O0lBRWIsaUJBQWlCLEVBQUUsTUFBTTtJQUN6QixvQkFBb0IsRUFBRSxTQUFTO0lBQy9CLHFIQUFxSCxFQUNuSCxpQ0FBaUM7SUFDbkMsa0JBQWtCLEVBQUUsT0FBTztJQUMzQixjQUFjLEVBQUUsY0FBYztJQUM5QiwyQkFBMkIsRUFBRSxrQkFBa0I7SUFDL0MscUJBQXFCLEVBQUUscUNBQXFDO0lBQzVELGNBQWMsRUFBRSx1Q0FBdUM7SUFDdkQsa0NBQWtDLEVBQUUsdUJBQXVCO0lBQzNELDRCQUE0QixFQUFFLGlCQUFpQjtJQUMvQyxpQkFBaUIsRUFBRSxlQUFlO0lBQ2xDLHFCQUFxQixFQUFFLE1BQU07SUFDN0IsZUFBZSxFQUFFLE1BQU07SUFDdkIseUJBQXlCLEVBQUUsU0FBUztJQUNwQyxtQkFBbUIsRUFBRSxRQUFRO0lBQzdCLCtCQUErQixFQUFFLGtCQUFrQjtJQUNuRCxnQ0FBZ0MsRUFBRSxXQUFXO0lBQzdDLG1FQUFtRSxFQUNqRSw4QkFBOEI7SUFDaEMsaUJBQWlCLEVBQUUsUUFBUTtJQUMzQiw2QkFBNkIsRUFDM0IsZ0RBQWdEO0lBQ2xELE9BQU8sRUFBRSxVQUFVO0lBQ25CLGNBQWMsRUFDWiw4RkFBOEY7SUFDaEcsbURBQW1ELEVBQ2pELDJCQUEyQjtJQUM3QixxR0FBcUcsRUFDbkcsMkNBQTJDO0lBQzdDLDJCQUEyQixFQUFFLFdBQVc7SUFDeEMsdUNBQXVDLEVBQ3JDLHlCQUF5QjtJQUMzQiwwQ0FBMEMsRUFBRSxZQUFZO0lBQ3hELHdEQUF3RCxFQUN0RCxxQkFBcUI7Q0FDeEI7O0FDeENEO0FBRUEsV0FBZSxFQUFFOztBQ3dCakIsSUFBTSxTQUFTLEdBQXdDO0lBQ3JELEVBQUUsSUFBQTtJQUNGLEVBQUUsRUFBRSxFQUFFO0lBQ04sRUFBRSxJQUFBO0lBQ0YsRUFBRSxJQUFBO0lBQ0YsRUFBRSxJQUFBO0lBQ0YsT0FBTyxFQUFFLElBQUk7SUFDYixFQUFFLElBQUE7SUFDRixFQUFFLElBQUE7SUFDRixFQUFFLElBQUE7SUFDRixFQUFFLElBQUE7SUFDRixFQUFFLElBQUE7SUFDRixFQUFFLElBQUE7SUFDRixFQUFFLElBQUE7SUFDRixFQUFFLElBQUE7SUFDRixFQUFFLEVBQUUsRUFBRTtJQUNOLEVBQUUsSUFBQTtJQUNGLEVBQUUsSUFBQTtJQUNGLE9BQU8sRUFBRSxJQUFJO0lBQ2IsRUFBRSxJQUFBO0lBQ0YsRUFBRSxJQUFBO0lBQ0YsRUFBRSxJQUFBO0lBQ0YsT0FBTyxFQUFFLElBQUk7SUFDYixPQUFPLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFFRixJQUFNLE1BQU0sR0FBRyxTQUFTLENBQUNvRCxlQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUUxQixDQUFDLENBQUMsR0FBb0I7SUFDcEMsT0FBTyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVDOztBQ3BDTyxJQUFNLGdCQUFnQixHQUFtQjtJQUM5QyxrQkFBa0IsRUFBRSxJQUFJO0lBQ3hCLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLFlBQVksRUFBRSwrQkFBK0I7SUFDN0MsWUFBWSxFQUFFLCtCQUErQjtJQUM3QyxlQUFlLEVBQUUsRUFBRTtJQUNuQixhQUFhLEVBQUUsRUFBRTtJQUNqQixhQUFhLEVBQUUsS0FBSztJQUNwQixPQUFPLEVBQUUsS0FBSztJQUNkLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLG1CQUFtQixFQUFFLEVBQUU7SUFDdkIsWUFBWSxFQUFFLEtBQUs7Q0FDcEIsQ0FBQztBQUVGO0lBQWdDLDhCQUFnQjtJQUc5QyxvQkFBWSxHQUFRLEVBQUUsTUFBNkI7UUFBbkQsWUFDRSxrQkFBTSxHQUFHLEVBQUUsTUFBTSxDQUFDLFNBRW5CO1FBREMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0tBQ3RCO0lBRUQsNEJBQU8sR0FBUDtRQUFBLGlCQW9LQztRQW5LTyxJQUFBLFdBQVcsR0FBSyxJQUFJLFlBQVQsQ0FBVTtRQUUzQixJQUFNLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQztRQUVuQixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNELElBQUlDLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUNoQyxPQUFPLENBQ04sQ0FBQyxDQUNDLHFIQUFxSCxDQUN0SCxDQUNGO2FBQ0EsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNmLE9BQUEsTUFBTTtpQkFDSCxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUM7aUJBQ2pELFFBQVEsQ0FBQyxVQUFNLEtBQUs7Ozs7NEJBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQzs0QkFDaEQscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBQTs7NEJBQWhDLFNBQWdDLENBQUM7Ozs7aUJBQ2xDLENBQUM7U0FBQSxDQUNMLENBQUM7UUFFSixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDOUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQzlCLFdBQVcsQ0FBQyxVQUFBLEVBQUU7WUFDYixPQUFBLEVBQUU7aUJBQ0MsU0FBUyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7aUJBQ2hDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO2lCQUNyQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2lCQUN2QyxRQUFRLENBQUMsVUFBTSxLQUFLOzs7OzRCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDOzRCQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQ2YscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBQTs7NEJBQWhDLFNBQWdDLENBQUM7Ozs7aUJBQ2xDLENBQUM7U0FBQSxDQUNMLENBQUM7UUFFSixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDN0MsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7aUJBQ3JCLE9BQU8sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQzFCLE9BQU8sQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQzFCLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ1gsT0FBQSxJQUFJO3FCQUNELGNBQWMsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQztxQkFDOUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztxQkFDM0MsUUFBUSxDQUFDLFVBQU0sR0FBRzs7OztnQ0FDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQ0FDeEMscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBQTs7Z0NBQWhDLFNBQWdDLENBQUM7Ozs7cUJBQ2xDLENBQUM7YUFBQSxDQUNMLENBQUM7U0FDTDtRQUVELElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUNqQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzFCLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDWCxPQUFBLElBQUk7aUJBQ0QsY0FBYyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2lCQUNyRCxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO2lCQUMzQyxRQUFRLENBQUMsVUFBTSxHQUFHOzs7OzRCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDOzRCQUN4QyxxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFBOzs0QkFBaEMsU0FBZ0MsQ0FBQzs7OztpQkFDbEMsQ0FBQztTQUFBLENBQ0wsQ0FBQztRQUVKLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUMvQixPQUFPLENBQUMsQ0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUM7YUFDM0MsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNYLE9BQUEsSUFBSTtpQkFDRCxjQUFjLENBQUMsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7aUJBQ25ELFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7aUJBQzlDLFFBQVEsQ0FBQyxVQUFNLEdBQUc7Ozs7NEJBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7NEJBQzNDLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUE7OzRCQUFoQyxTQUFnQyxDQUFDOzs7O2lCQUNsQyxDQUFDO1NBQUEsQ0FDTCxDQUFDO1FBRUosSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO1lBQ2xELElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2lCQUNyQixPQUFPLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7aUJBQzdCLE9BQU8sQ0FDTixDQUFDLENBQUMsbUVBQW1FLENBQUMsQ0FDdkU7aUJBQ0EsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDWCxPQUFBLElBQUk7cUJBQ0QsY0FBYyxDQUFDLEVBQUUsQ0FBQztxQkFDbEIsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztxQkFDNUMsUUFBUSxDQUFDLFVBQU0sS0FBSzs7OztnQ0FDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQ0FDM0MscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBQTs7Z0NBQWhDLFNBQWdDLENBQUM7Ozs7cUJBQ2xDLENBQUM7YUFBQSxDQUNMLENBQUM7WUFFSixJQUFJLEVBQUUsS0FBSyxTQUFTLEVBQUU7Z0JBQ3BCLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO3FCQUNyQixPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUNyQixPQUFPLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7cUJBQzVCLFNBQVMsQ0FBQyxVQUFBLE1BQU07b0JBQ2YsT0FBQSxNQUFNO3lCQUNILFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7eUJBQ3RDLFFBQVEsQ0FBQyxVQUFNLEtBQUs7Ozs7b0NBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7b0NBQ3JDLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUE7O29DQUFoQyxTQUFnQyxDQUFDOzs7O3lCQUNsQyxDQUFDO2lCQUFBLENBQ0wsQ0FBQzthQUNMO1NBQ0Y7UUFFRCxJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDN0IsT0FBTyxDQUFDLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBQ3pDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDZixPQUFBLE1BQU07aUJBQ0gsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztpQkFDNUMsUUFBUSxDQUFDLFVBQU0sS0FBSzs7Ozs0QkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzs0QkFDM0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNmLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUE7OzRCQUFoQyxTQUFnQyxDQUFDOzs7O2lCQUNsQyxDQUFDO1NBQUEsQ0FDTCxDQUFDO1FBRUosSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2FBQ3ZDLE9BQU8sQ0FBQyxDQUFDLENBQUMsdUNBQXVDLENBQUMsQ0FBQzthQUNuRCxXQUFXLENBQUMsVUFBQSxRQUFRO1lBQ25CLE9BQUEsUUFBUTtpQkFDTCxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUM7aUJBQ2xELFFBQVEsQ0FBQyxVQUFNLEtBQUs7Ozs7NEJBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQzs0QkFDakQscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBQTs7NEJBQWhDLFNBQWdDLENBQUM7Ozs7aUJBQ2xDLENBQUM7U0FBQSxDQUNMLENBQUM7UUFFSixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsQ0FBQyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7YUFDL0QsT0FBTyxDQUNOLENBQUMsQ0FDQyxxR0FBcUcsQ0FDdEcsQ0FDRjthQUNBLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDZixPQUFBLE1BQU07aUJBQ0gsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztpQkFDekMsUUFBUSxDQUFDLFVBQU0sS0FBSzs7Ozs0QkFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzs0QkFDeEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNmLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUE7OzRCQUFoQyxTQUFnQyxDQUFDOzs7O2lCQUNsQyxDQUFDO1NBQUEsQ0FDTCxDQUFDO1FBRUosSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLENBQUMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO2FBQ3RELE9BQU8sQ0FBQyxDQUFDLENBQUMsd0RBQXdELENBQUMsQ0FBQzthQUNwRSxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ2YsT0FBQSxNQUFNO2lCQUNILFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7aUJBQzNDLFFBQVEsQ0FBQyxVQUFNLEtBQUs7Ozs7NEJBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7NEJBQzFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDZixxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFBOzs0QkFBaEMsU0FBZ0MsQ0FBQzs7OztpQkFDbEMsQ0FBQztTQUFBLENBQ0wsQ0FBQztLQUNMO0lBQ0gsaUJBQUM7QUFBRCxDQTdLQSxDQUFnQ0MseUJBQWdCOzs7SUNLRyx5Q0FBTTtJQUF6RDtRQUFBLHFFQTRzQkM7UUE5bEJDLGFBQU8sR0FBRyxVQUFDLElBQVUsRUFBRSxPQUFlLEVBQUUsTUFBYztZQUNwRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBYztnQkFDMUIsT0FBQSxJQUFJO3FCQUNELE9BQU8sQ0FBQyxTQUFTLENBQUM7cUJBQ2xCLFFBQVEsQ0FBQyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQztxQkFDekMsT0FBTyxDQUFDOzs7Ozs7Z0NBRUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDcEQsVUFBQyxJQUF3QixJQUFLLE9BQUEsSUFBSSxDQUFDLE1BQU0sS0FBSyxPQUFPLEdBQUEsQ0FDdEQsQ0FBQztxQ0FDRSxZQUFZLEVBQVosd0JBQVk7Z0NBQ0YscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFBOztnQ0FBekQsR0FBRyxHQUFHLFNBQW1EO2dDQUMvRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7b0NBQ2YsSUFBSUwsZUFBTSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7b0NBQy9CLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7b0NBQ3hDLElBQUksU0FBUyxFQUFFO3dDQUNiLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQ0FDN0I7b0NBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjO3dDQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQ2pDLFVBQUMsSUFBd0IsSUFBSyxPQUFBLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxHQUFBLENBQ3RELENBQUM7b0NBQ0osSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lDQUNyQjtxQ0FBTTtvQ0FDTCxJQUFJQSxlQUFNLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7aUNBQ2hDOzs7OztnQ0FHSCxJQUFJQSxlQUFNLENBQUMsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQzs7Ozs7cUJBRTVDLENBQUM7YUFBQSxDQUNMLENBQUM7U0FDSCxDQUFDOztLQThqQkg7SUFuc0JPLDRDQUFZLEdBQWxCOzs7Ozs7d0JBQ0UsS0FBQSxJQUFJLENBQUE7d0JBQVksS0FBQSxDQUFBLEtBQUEsTUFBTSxFQUFDLE1BQU0sQ0FBQTs4QkFBQyxnQkFBZ0I7d0JBQUUscUJBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFBOzt3QkFBckUsR0FBSyxRQUFRLEdBQUcsd0JBQWdDLFNBQXFCLEdBQUMsQ0FBQzs7Ozs7S0FDeEU7SUFFSyw0Q0FBWSxHQUFsQjs7Ozs0QkFDRSxxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQTs7d0JBQWxDLFNBQWtDLENBQUM7Ozs7O0tBQ3BDO0lBRUQsd0NBQVEsR0FBUixlQUFhO0lBRVAsc0NBQU0sR0FBWjs7Ozs7NEJBQ0UscUJBQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFBOzt3QkFBekIsU0FBeUIsQ0FBQzt3QkFFMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMzQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBRTlELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFOzRCQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7eUJBQ3BDOzZCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFOzRCQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzs0QkFDdkMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtnQ0FDekIsT0FBTyxFQUFFLENBQUM7NkJBQ1g7eUJBQ0Y7NkJBQU07NEJBQ0wsSUFBSUEsZUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7eUJBQ2hDO3dCQUVETSxnQkFBTyxDQUNMLFFBQVEsRUFDUix1dUJBRUssQ0FDTixDQUFDO3dCQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUVuRCxJQUFJLENBQUMsVUFBVSxDQUFDOzRCQUNkLEVBQUUsRUFBRSxtQkFBbUI7NEJBQ3ZCLElBQUksRUFBRSxtQkFBbUI7NEJBQ3pCLGFBQWEsRUFBRSxVQUFDLFFBQWlCO2dDQUMvQixJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7Z0NBQ3pDLElBQUksSUFBSSxFQUFFO29DQUNSLElBQUksQ0FBQyxRQUFRLEVBQUU7d0NBQ2IsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3FDQUN0QjtvQ0FDRCxPQUFPLElBQUksQ0FBQztpQ0FDYjtnQ0FDRCxPQUFPLEtBQUssQ0FBQzs2QkFDZDt5QkFDRixDQUFDLENBQUM7d0JBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQzs0QkFDZCxFQUFFLEVBQUUscUJBQXFCOzRCQUN6QixJQUFJLEVBQUUscUJBQXFCOzRCQUMzQixhQUFhLEVBQUUsVUFBQyxRQUFpQjtnQ0FDL0IsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO2dDQUN6QyxJQUFJLElBQUksRUFBRTtvQ0FDUixJQUFJLENBQUMsUUFBUSxFQUFFO3dDQUNiLEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO3FDQUM5QjtvQ0FDRCxPQUFPLElBQUksQ0FBQztpQ0FDYjtnQ0FDRCxPQUFPLEtBQUssQ0FBQzs2QkFDZDt5QkFDRixDQUFDLENBQUM7d0JBRUgsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUV4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7Ozs7S0FDMUI7SUFFRCxpREFBaUIsR0FBakI7UUFBQSxpQkEwQkM7UUF6QkMsSUFBSSxDQUFDLGFBQWEsQ0FDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUNuQixhQUFhLEVBQ2IsVUFBQyxJQUFVLEVBQUUsTUFBYyxFQUFFLElBQXFDO1lBQ2hFLElBQUksS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQy9ELE9BQU87YUFDUjtZQUNELElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4QyxJQUFJLFNBQVMsRUFBRTtnQkFDYixJQUFNLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQztnQkFDekMsSUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzdDLElBQU0sYUFBVyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckMsSUFDRSxLQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQy9CLFVBQUMsSUFBd0IsSUFBSyxPQUFBLElBQUksQ0FBQyxNQUFNLEtBQUssYUFBVyxHQUFBLENBQzFELEVBQ0Q7d0JBQ0EsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3FCQUN6QztpQkFDRjthQUNGO1NBQ0YsQ0FDRixDQUNGLENBQUM7S0FDSDtJQW9DSyxxREFBcUIsR0FBM0I7Ozs7Ozs7O3dCQUNRLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDckMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQzVDLElBQUksQ0FBQ0MsYUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFOzRCQUMzQkMsWUFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3lCQUN2Qjt3QkFFRyxVQUFVLEdBQUcsRUFBRSxDQUFDOzs7O3dCQUNELGNBQUEsU0FBQSxTQUFTLENBQUE7Ozs7d0JBQWpCLElBQUk7d0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzRCQUNqQyx3QkFBUzt5QkFDVjt3QkFFSyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDaEIsS0FBSyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOzRCQUNwRCx3QkFBUzt5QkFDVjt3QkFDRyxLQUFBLE9BQWM7NEJBQ2hCLFNBQVMsQ0FBQ2xELFVBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDOzRCQUNoRUEsVUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUc7eUJBQ2pCLElBQUEsRUFISSxjQUFJLEVBQUUsR0FBRyxRQUFBLENBR1o7O3dCQUVGLElBQUlpRCxhQUFVLENBQUNFLFNBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDbEQsTUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDdEQ7d0JBQ0QsTUFBSSxHQUFHLFdBQVMsTUFBTSxDQUFDO3dCQUVOLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQ2xDLEdBQUcsRUFDSEEsU0FBSSxDQUFDLFVBQVUsRUFBRSxLQUFHLE1BQUksR0FBRyxHQUFLLENBQUMsQ0FDbEMsRUFBQTs7d0JBSEssUUFBUSxHQUFHLFNBR2hCO3dCQUNELElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRTs0QkFDVCxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQ3ZELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FDeEMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDOzRCQUVSLFFBQVEsR0FDWixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUNoQixDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUNWLG9CQUFvQixHQUFHQyxZQUFPLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDOzRCQUU3RCxVQUFVLENBQUMsSUFBSSxDQUFDO2dDQUNkLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQ0FDbkIsSUFBSSxFQUFFLE1BQUk7Z0NBQ1YsSUFBSSxFQUFFQyxzQkFBYSxDQUFDQyxhQUFRLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUNuRSxDQUFDLENBQUM7eUJBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQUdDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNuQyxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSzs0QkFDbEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQ25CLEtBQUssQ0FBQyxNQUFNLEVBQ1osT0FBSyxLQUFLLENBQUMsSUFBSSxJQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxJQUFJLEVBQUUsV0FBSyxTQUFTLENBQ2pFLEtBQUssQ0FBQyxJQUFJLENBQ1gsTUFBRyxDQUNMLENBQUM7eUJBQ0gsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUU1QixJQUFJWixlQUFNLENBQ1IsVUFBUSxTQUFTLENBQUMsTUFBTSxtQkFBYyxVQUFVLENBQUMsTUFBTSxtQkFDckQsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUNwQyxDQUNILENBQUM7Ozs7O0tBQ0g7O0lBR0QsZ0RBQWdCLEdBQWhCO1FBQ0UsSUFBTSxRQUFRLEdBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FDaEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7UUFHaEIsSUFBTSxXQUFXLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO1FBQ3ZFLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQ3hDLENBQUM7O1FBR0YsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLElBQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQ1UsWUFBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUUsT0FBT0QsU0FBSSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztTQUN4QzthQUFNOztZQUVMLE9BQU9BLFNBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDcEM7S0FDRjtJQUVLLHdDQUFRLEdBQWQsVUFBZSxHQUFXLEVBQUUsSUFBWTs7Ozs7NEJBQ3JCLHFCQUFNVixtQkFBVSxDQUFDLEVBQUUsR0FBRyxLQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBcEMsUUFBUSxHQUFHLFNBQXlCO3dCQUUxQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFOzRCQUMzQixzQkFBTztvQ0FDTCxFQUFFLEVBQUUsS0FBSztvQ0FDVCxHQUFHLEVBQUUsT0FBTztpQ0FDYixFQUFDO3lCQUNIO3dCQUNLLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFFakQsSUFBSTs0QkFDRmMsZ0JBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7NEJBQzVCLHNCQUFPO29DQUNMLEVBQUUsRUFBRSxJQUFJO29DQUNSLEdBQUcsRUFBRSxJQUFJO29DQUNULElBQUksRUFBRSxJQUFJO2lDQUNYLEVBQUM7eUJBQ0g7d0JBQUMsT0FBTyxHQUFHLEVBQUU7NEJBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFFbkIsc0JBQU87b0NBQ0wsRUFBRSxFQUFFLEtBQUs7b0NBQ1QsR0FBRyxFQUFFLEdBQUc7aUNBQ1QsRUFBQzt5QkFDSDs7Ozs7S0FDRjtJQUVELGdEQUFnQixHQUFoQjtRQUFBLGlCQXNCQztRQXJCQyxJQUFJLENBQUMsYUFBYSxDQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ25CLFdBQVcsRUFDWCxVQUFDLElBQVUsRUFBRSxJQUFXLEVBQUUsTUFBYztZQUN0QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsQyxPQUFPLEtBQUssQ0FBQzthQUNkO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQWM7Z0JBQzFCLElBQUk7cUJBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQztxQkFDbEIsT0FBTyxDQUFDLFFBQVEsQ0FBQztxQkFDakIsT0FBTyxDQUFDO29CQUNQLElBQUksRUFBRSxJQUFJLFlBQVlDLGNBQUssQ0FBQyxFQUFFO3dCQUM1QixPQUFPLEtBQUssQ0FBQztxQkFDZDtvQkFDRCxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzQixDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7U0FDSixDQUNGLENBQ0YsQ0FBQztLQUNIO0lBRUQsOENBQWMsR0FBZCxVQUFlLElBQVc7O1FBQTFCLGlCQWdFQztRQS9EQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXJDLElBQU0sUUFBUSxHQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQ2hCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEIsSUFBSSxTQUFTLEdBQVksRUFBRSxDQUFDO1FBQzVCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7O1lBRTVDLEtBQW9CLElBQUEsY0FBQSxTQUFBLFNBQVMsQ0FBQSxvQ0FBQSwyREFBRTtnQkFBMUIsSUFBTSxLQUFLLHNCQUFBO2dCQUNkLElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQzdCLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBRTlCLElBQU0sUUFBUSxHQUFHQyxhQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBRWpELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUNsQyxJQUFNLGlCQUFpQixHQUFHTixTQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFcEQsSUFBSSxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO3dCQUN6QyxTQUFTLENBQUMsSUFBSSxDQUFDOzRCQUNiLElBQUksRUFBRSxpQkFBaUI7NEJBQ3ZCLElBQUksRUFBRSxTQUFTOzRCQUNmLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTt5QkFDckIsQ0FBQyxDQUFDO3FCQUNKO2lCQUNGO2FBQ0Y7Ozs7Ozs7OztRQUVELElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDMUIsSUFBSVQsZUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxHQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDbEUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLElBQUksZUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQy9CLElBQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7Z0JBQ3JELEtBQUksQ0FBQyxRQUFRLENBQUMsY0FBYywyQ0FDdEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLElBQUksRUFBRSxZQUNuQyx1QkFBdUIsRUFDM0IsQ0FBQztnQkFDRixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BCLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO29CQUNoQixJQUFNLFdBQVcsR0FBRyxlQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzFDLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUMxQixJQUFJLENBQUMsTUFBTSxFQUNYLE9BQUssSUFBSSxDQUFDLElBQUksSUFDWixLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsSUFBSSxFQUFFLFdBQ2hDLFdBQVcsTUFBRyxDQUNwQixDQUFDO2lCQUNILENBQUMsQ0FBQztnQkFDSCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFOUIsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTtvQkFDOUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7d0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTs0QkFDbENnQixTQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxlQUFRLENBQUMsQ0FBQzt5QkFDOUI7cUJBQ0YsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSWhCLGVBQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUM1QjtTQUNGLENBQUMsQ0FBQztLQUNKO0lBRUQsMENBQVUsR0FBVixVQUFXLFNBQWtCOztRQUMzQixJQUFNLFNBQVMsR0FBWSxFQUFFLENBQUM7O1lBRTlCLEtBQW9CLElBQUEsY0FBQSxTQUFBLFNBQVMsQ0FBQSxvQ0FBQSwyREFBRTtnQkFBMUIsSUFBTSxLQUFLLHNCQUFBO2dCQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2hFLElBQ0UsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FDekIsS0FBSyxDQUFDLElBQUksRUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUNsQyxFQUNEO3dCQUNBLFNBQVMsQ0FBQyxJQUFJLENBQUM7NEJBQ2IsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJOzRCQUNoQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7NEJBQ2hCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTt5QkFDckIsQ0FBQyxDQUFDO3FCQUNKO2lCQUNGO3FCQUFNO29CQUNMLFNBQVMsQ0FBQyxJQUFJLENBQUM7d0JBQ2IsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO3dCQUNoQixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7d0JBQ2hCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtxQkFDckIsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7Ozs7Ozs7OztRQUVELE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0lBQ0QsdUNBQU8sR0FBUCxVQUFRLFFBQWdCLEVBQUUsT0FBWTtRQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUM1RDtRQUNELE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzFCOztJQUVELDZDQUFhLEdBQWI7O1FBQUEsaUJBK0dDO1FBOUdDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFckMsSUFBTSxRQUFRLEdBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FDaEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0RCxJQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakUsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLElBQUksU0FBUyxHQUFZLEVBQUUsQ0FBQztRQUM1QixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7WUFFN0QsS0FBb0IsSUFBQSxjQUFBLFNBQUEsU0FBUyxDQUFBLG9DQUFBLDJEQUFFO2dCQUExQixJQUFNLEtBQUssc0JBQUE7Z0JBQ2QsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDN0IsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFFOUIsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNqQyxTQUFTLENBQUMsSUFBSSxDQUFDO3dCQUNiLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTt3QkFDaEIsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO3FCQUNyQixDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsSUFBTSxRQUFRLEdBQUdlLGFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDakQsSUFBSSxJQUFJLFNBQUEsQ0FBQzs7b0JBRVQsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUU7d0JBQ3RDLElBQUksR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7cUJBQzNDOztvQkFHRCxJQUNFLENBQUMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7d0JBQ2hELFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQ3ZDO3dCQUNBLElBQU0sUUFBUSxHQUFHTCxZQUFPLENBQ3RCRCxTQUFJLENBQUMsUUFBUSxFQUFFUSxZQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3hDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FDdEIsQ0FBQzt3QkFFRixJQUFJVixhQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7NEJBQ3hCLElBQU14RCxNQUFJLEdBQUc0RCxzQkFBYSxDQUN4QkMsYUFBUSxDQUNOLFFBQVEsRUFDUkYsWUFBTyxDQUNMRCxTQUFJLENBQUMsUUFBUSxFQUFFUSxZQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3hDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FDdEIsQ0FDRixDQUNGLENBQUM7NEJBRUYsSUFBSSxHQUFHLFdBQVcsQ0FBQ2xFLE1BQUksQ0FBQyxDQUFDO3lCQUMxQjtxQkFDRjs7b0JBRUQsSUFBSSxDQUFDLElBQUksRUFBRTt3QkFDVCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7cUJBQ3hDO29CQUVELElBQUksSUFBSSxFQUFFO3dCQUNSLElBQU0saUJBQWlCLEdBQUcwRCxTQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFFcEQsSUFBSSxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFOzRCQUN6QyxTQUFTLENBQUMsSUFBSSxDQUFDO2dDQUNiLElBQUksRUFBRSxpQkFBaUI7Z0NBQ3ZCLElBQUksRUFBRSxTQUFTO2dDQUNmLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTs2QkFDckIsQ0FBQyxDQUFDO3lCQUNKO3FCQUNGO2lCQUNGO2FBQ0Y7Ozs7Ozs7OztRQUVELElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDMUIsSUFBSVQsZUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hCLE9BQU87U0FDUjthQUFNO1lBQ0wsSUFBSUEsZUFBTSxDQUFDLHVCQUFNLFNBQVMsQ0FBQyxNQUFNLGlFQUFZLENBQUMsQ0FBQztTQUNoRDtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxHQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDbEUsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNmLElBQUksZUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQy9CLElBQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7Z0JBQ3JELEtBQUksQ0FBQyxRQUFRLENBQUMsY0FBYywyQ0FDdEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLElBQUksRUFBRSxZQUNuQyx1QkFBdUIsRUFDM0IsQ0FBQztnQkFDRixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BCLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO29CQUNoQixJQUFNLFdBQVcsR0FBRyxlQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQzFDLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUMxQixJQUFJLENBQUMsTUFBTSxFQUNYLE9BQUssSUFBSSxDQUFDLElBQUksSUFDWixLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsSUFBSSxFQUFFLFdBQ2hDLFdBQVcsTUFBRyxDQUNwQixDQUFDO2lCQUNILENBQUMsQ0FBQztnQkFDSCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFOUIsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTtvQkFDOUIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7d0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTs0QkFDbENnQixTQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxlQUFRLENBQUMsQ0FBQzt5QkFDOUI7cUJBQ0YsQ0FBQyxDQUFDO2lCQUNKO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSWhCLGVBQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUM1QjtTQUNGLENBQUMsQ0FBQztLQUNKO0lBRUQsaURBQWlCLEdBQWpCO1FBQUEsaUJBK0hDO1FBOUhDLElBQUksQ0FBQyxhQUFhLENBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FDbkIsY0FBYyxFQUNkLFVBQUMsR0FBbUIsRUFBRSxNQUFjLEVBQUUsWUFBMEI7WUFDOUQsSUFBTSxXQUFXLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FDakQsbUJBQW1CLEVBQ25CLEtBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQ2pDLENBQUM7WUFFVSxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU07WUFDcEMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsT0FBTzthQUNSOztZQUVELElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7Z0JBQy9CLElBQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMvRCxJQUFNLFdBQVMsR0FBRyxLQUFJLENBQUMsTUFBTTtxQkFDMUIsWUFBWSxDQUFDLGNBQWMsQ0FBQztxQkFDNUIsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUEsQ0FBQztxQkFDOUMsTUFBTSxDQUNMLFVBQUEsS0FBSztvQkFDSCxPQUFBLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3pCLEtBQUssQ0FBQyxJQUFJLEVBQ1YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FDbEM7aUJBQUEsQ0FDSixDQUFDO2dCQUVKLElBQUksV0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQzFCLEtBQUksQ0FBQyxRQUFRO3lCQUNWLFdBQVcsQ0FBQyxXQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksR0FBQSxDQUFDLENBQUM7eUJBQzdDLElBQUksQ0FBQyxVQUFBLEdBQUc7d0JBQ1AsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDbkMsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFOzRCQUNmLElBQUksZUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7NEJBQy9CLFdBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJO2dDQUNoQixJQUFNLFdBQVcsR0FBRyxlQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7Z0NBQzFDLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUN0QixJQUFJLENBQUMsTUFBTSxFQUNYLE9BQUssSUFBSSxDQUFDLElBQUksSUFDWixLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsSUFBSSxFQUFFLFdBQ2hDLFdBQVcsTUFBRyxDQUNwQixDQUFDOzZCQUNILENBQUMsQ0FBQzs0QkFDSCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDNUIsSUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQzs0QkFDckQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLDJDQUN0QixLQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsSUFBSSxFQUFFLFlBQ25DLHVCQUF1QixFQUMzQixDQUFDOzRCQUNGLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzt5QkFDckI7NkJBQU07NEJBQ0wsSUFBSUEsZUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3lCQUM1QjtxQkFDRixDQUFDLENBQUM7aUJBQ047YUFDRjs7WUFHRCxJQUFJLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNyQyxLQUFJLENBQUMsNEJBQTRCLENBQy9CLE1BQU0sRUFDTixVQUFPLE1BQWMsRUFBRSxPQUFlOzs7O29DQUMxQixxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLEVBQUE7O2dDQUFqRCxHQUFHLEdBQUcsU0FBMkM7Z0NBQ3JELElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7b0NBQ2xCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQ0FDbEQsc0JBQU87aUNBQ1I7Z0NBQ0ssR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0NBQ2YsdUJBQXVCLEdBQUcsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7Z0NBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYywyQ0FDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLElBQUksRUFBRSxZQUNuQyx1QkFBdUIsRUFDM0IsQ0FBQztnQ0FDRixxQkFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUE7O2dDQUF6QixTQUF5QixDQUFDO2dDQUMxQixzQkFBTyxHQUFHLEVBQUM7OztxQkFDWixFQUNELEdBQUcsQ0FBQyxhQUFhLENBQ2xCLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ1YsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3RCO1NBQ0YsQ0FDRixDQUNGLENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQ25CLGFBQWEsRUFDYixVQUFPLEdBQWMsRUFBRSxNQUFjLEVBQUUsWUFBMEI7Ozs7Ozs7d0JBQ3pELFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUNqRCxtQkFBbUIsRUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FDakMsQ0FBQzt3QkFDRSxLQUFLLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7d0JBRW5DLElBQUksQ0FBQyxXQUFXLEVBQUU7NEJBQ2hCLHNCQUFPO3lCQUNSOzhCQUVHLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBLEVBQXZELHdCQUF1RDt3QkFDckQsY0FBMkIsRUFBRSxDQUFDO3dCQUM5QixVQUFRLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO3dCQUNuQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxLQUFLOzRCQUNwQyxXQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDM0IsQ0FBQyxDQUFDO3dCQUNILEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFFUixxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFTLENBQUMsRUFBQTs7d0JBQWpELElBQUksR0FBRyxTQUEwQzt3QkFFdkQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFOzRCQUNWLHVCQUF1QixHQUFHLE1BQUEsSUFBSSxDQUFDLFVBQVUsbUNBQUksRUFBRSxDQUFDOzRCQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsMkNBQ3RCLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLG1DQUFJLEVBQUUsWUFDbkMsdUJBQXVCLEVBQzNCLENBQUM7NEJBQ0YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQWE7Z0NBQzVCLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDNUQsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztnQ0FDMUMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDaEUsQ0FBQyxDQUFDO3lCQUNKOzZCQUFNOzRCQUNMLElBQUlBLGVBQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQzt5QkFDNUI7Ozs7O2FBRUosQ0FDRixDQUNGLENBQUM7S0FDSDtJQUVELHlDQUFTLEdBQVQsVUFBVSxhQUEyQjtRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUN6QixJQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ2xDLElBQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0MsSUFBTSxZQUFZLEdBQ2hCLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELElBQUksWUFBWSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtnQkFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtLQUNGO0lBRUssNERBQTRCLEdBQWxDLFVBQ0UsTUFBYyxFQUNkLFFBQWtCLEVBQ2xCLGFBQTJCOzs7Ozs7d0JBRXZCLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQzVELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQ3BDLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7Ozt3QkFFM0IscUJBQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBQTs7d0JBQXJDLEdBQUcsR0FBRyxTQUErQjt3QkFDM0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOzs7O3dCQUVwRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFDLENBQUMsQ0FBQzs7Ozs7O0tBRS9DO0lBRUQsbURBQW1CLEdBQW5CLFVBQW9CLE1BQWMsRUFBRSxPQUFlO1FBQ2pELElBQUksWUFBWSxHQUFHLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQzlDO0lBRWMscUNBQWUsR0FBOUIsVUFBK0IsRUFBVTtRQUN2QyxPQUFPLHdCQUFzQixFQUFFLFFBQUssQ0FBQztLQUN0QztJQUVELGtEQUFrQixHQUFsQixVQUNFLE1BQWMsRUFDZCxPQUFlLEVBQ2YsUUFBYSxFQUNiLElBQWlCO1FBQWpCLHFCQUFBLEVBQUEsU0FBaUI7UUFFakIsSUFBSSxZQUFZLEdBQUcscUJBQXFCLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xFLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztRQUM1RCxJQUFJLGFBQWEsR0FBRyxPQUFLLElBQUksR0FBRyxlQUFlLFVBQUssUUFBUSxNQUFHLENBQUM7UUFFaEUscUJBQXFCLENBQUMsc0JBQXNCLENBQzFDLE1BQU0sRUFDTixZQUFZLEVBQ1osYUFBYSxDQUNkLENBQUM7S0FDSDtJQUVELGtEQUFrQixHQUFsQixVQUFtQixNQUFjLEVBQUUsT0FBZSxFQUFFLE1BQVc7UUFDN0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxQyxJQUFJLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEUscUJBQXFCLENBQUMsc0JBQXNCLENBQzFDLE1BQU0sRUFDTixZQUFZLEVBQ1osb0NBQW9DLENBQ3JDLENBQUM7S0FDSDtJQUVNLDRDQUFzQixHQUE3QixVQUNFLE1BQWMsRUFDZCxNQUFjLEVBQ2QsV0FBbUI7UUFFbkIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUNaLElBQUksSUFBSSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQy9CLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDN0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNO2FBQ1A7U0FDRjtLQUNGO0lBQ0gsNEJBQUM7QUFBRCxDQTVzQkEsQ0FBbURrQixlQUFNOzs7OyJ9
