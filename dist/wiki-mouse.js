// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"constants/symbols.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._streamHandler = exports._eventHandler = exports._paused = exports._running = void 0;

var _running = Symbol();

exports._running = _running;

var _paused = Symbol();

exports._paused = _paused;

var _eventHandler = Symbol();

exports._eventHandler = _eventHandler;

var _streamHandler = Symbol();

exports._streamHandler = _streamHandler;
},{}],"constants/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ['dblclick', 'mousemove', 'mousedown', 'mouseup', 'scroll'];
exports.default = _default;
},{}],"constants/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = _interopRequireDefault(require("./events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  stream: null,
  trackEvents: _events.default,
  defer: false,
  dimensions: {}
};
exports.default = _default;
},{"./events":"constants/events.js"}],"store/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  events: [],
  since: null,
  document: null
};
exports.default = _default;
},{}],"utils/event-handler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _symbols = require("../constants/symbols");

var _store = _interopRequireDefault(require("../store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(ev) {
  if (!this[_symbols._paused]) {
    _store.default.events.push({
      type: 'event',
      eventType: ev.type,
      x: ev.clientX,
      y: ev.clientY
    });
  }
}
},{"../constants/symbols":"constants/symbols.js","../store":"store/index.js"}],"utils/assert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertFunction = assertFunction;

function assertFunction(v, name) {
  if (typeof v !== 'function') {
    throw new Error("".concat(name || '', " must be a function").trimLeft());
  }
}
},{}],"utils/stream-handler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _assert = require("./assert");

var _symbols = require("../constants/symbols");

function _default(ev) {
  if (!this[_symbols._paused]) {
    (0, _assert.assertFunction)(this.config.stream);
    this.config.stream({
      type: 'event',
      eventType: ev.type,
      x: ev.clientX,
      y: ev.clientY
    });
  }
}
},{"./assert":"utils/assert.js","../constants/symbols":"constants/symbols.js"}],"services/player/cursor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var cursor = document.createElement('div');
cursor.id = 'wiki-events-cursor';
var _default = cursor;
exports.default = _default;
},{}],"services/player/frame.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var frame = document.createElement('iframe');
frame.id = 'wiki-events-player';
frame.style.display = 'block';
frame.style.width = '400px';
frame.style.height = '400px';
var _default = frame;
exports.default = _default;
},{}],"services/player/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var style = "\n  #wiki-events-cursor {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 16px;\n    height: 16px;\n    border-radius: 50%;\n    background-color: rgb(0, 200, 255);\n    opacity: 0.3;\n  }\n  body {\n    pointer-events: none;\n  }\n";
var stylesheet = document.createElement('style');
stylesheet.type = 'text/css';
stylesheet.innerHTML = style;
var _default = stylesheet;
exports.default = _default;
},{}],"services/player/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cursor = _interopRequireDefault(require("./cursor"));

var _frame = _interopRequireDefault(require("./frame"));

var _style = _interopRequireDefault(require("./style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Player = /*#__PURE__*/function () {
  function Player(store) {
    var _this = this;

    _classCallCheck(this, Player);

    this.events = store.events;
    this.document = store.document;

    _frame.default.onload = function () {
      _frame.default.contentDocument.write(_this.document.innerHTML);

      _frame.default.contentDocument.head.appendChild(_style.default);

      _frame.default.contentDocument.body.appendChild(_cursor.default);
    };

    var draw = function draw() {
      if (_this.events.length) {
        var currentEvent = _this.events.shift();

        _cursor.default.style.top = parseInt(400 * currentEvent.y / store.dimensions.height) + 'px';
        _cursor.default.style.left = parseInt(400 * currentEvent.x / store.dimensions.width) + 'px';
        requestAnimationFrame(draw);
      }
    };

    draw();
    return this;
  }

  _createClass(Player, [{
    key: "getPlayer",
    value: function getPlayer() {
      return _frame.default;
    }
  }]);

  return Player;
}();

exports.default = Player;
},{"./cursor":"services/player/cursor.js","./frame":"services/player/frame.js","./style":"services/player/style.js"}],"wiki-mouse.js":[function(require,module,exports) {
"use strict";

var _symbols = require("./constants/symbols");

var _config = _interopRequireDefault(require("./constants/config"));

var _eventHandler2 = _interopRequireDefault(require("./utils/event-handler"));

var _store = _interopRequireDefault(require("./store"));

var _streamHandler2 = _interopRequireDefault(require("./utils/stream-handler"));

var _player = _interopRequireDefault(require("./services/player"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WikiMouse = /*#__PURE__*/function () {
  function WikiMouse() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WikiMouse);

    this.config = _objectSpread(_objectSpread({}, _config.default), config);
    this[_symbols._eventHandler] = _eventHandler2.default.bind(this);
    this[_symbols._streamHandler] = _streamHandler2.default.bind(this);
    this[_symbols._paused] = false;
    this[_symbols._running] = false;
    _store.default.document = document.documentElement.cloneNode(true);
    _store.default.dimensions = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    _store.default.since = Date.now();

    if (!this.config.defer) {
      this.start();
    }

    return this;
  }

  _createClass(WikiMouse, [{
    key: "start",
    value: function start() {
      var _this = this;

      if (!this[_symbols._running]) {
        var isStream = typeof this.config.stream === 'function';

        if (isStream) {
          this.config.stream(_objectSpread({
            type: 'config'
          }, _store.default));
        }

        this.config.trackEvents.forEach(function (ev) {
          return document.addEventListener(ev, isStream ? _this[_symbols._streamHandler] : _this[_symbols._eventHandler]);
        });
        return this;
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      this[_symbols._paused] = true;
      return this;
    }
  }, {
    key: "resume",
    value: function resume() {
      this[_symbols._paused] = false;
      return this;
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this2 = this;

      this.config.trackEvents.forEach(function (ev) {
        document.removeEventListener(ev, _this2[_symbols._streamHandler]);
        document.removeEventListener(ev, _this2[_symbols._eventHandler]);
      });
      return this;
    }
  }, {
    key: "peekEvents",
    value: function peekEvents() {
      return _store.default.events;
    }
  }, {
    key: "dump",
    value: function dump() {
      return _store.default;
    }
  }, {
    key: "play",
    value: function play() {
      document.body.appendChild(new _player.default(_store.default).getPlayer());
      return this;
    }
  }]);

  return WikiMouse;
}();

module.exports = WikiMouse;
},{"./constants/symbols":"constants/symbols.js","./constants/config":"constants/config.js","./utils/event-handler":"utils/event-handler.js","./store":"store/index.js","./utils/stream-handler":"utils/stream-handler.js","./services/player":"services/player/index.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50179" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","wiki-mouse.js"], "$w")
//# sourceMappingURL=/wiki-mouse.js.map