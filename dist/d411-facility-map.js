"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/leaflet/dist/leaflet-src.js
  var require_leaflet_src = __commonJS({
    "node_modules/leaflet/dist/leaflet-src.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.leaflet = {}));
      })(exports, function(exports2) {
        "use strict";
        var version = "1.9.4";
        function extend(dest) {
          var i, j, len, src;
          for (j = 1, len = arguments.length; j < len; j++) {
            src = arguments[j];
            for (i in src) {
              dest[i] = src[i];
            }
          }
          return dest;
        }
        var create$2 = Object.create || /* @__PURE__ */ function() {
          function F() {
          }
          return function(proto) {
            F.prototype = proto;
            return new F();
          };
        }();
        function bind2(fn, obj) {
          var slice = Array.prototype.slice;
          if (fn.bind) {
            return fn.bind.apply(fn, slice.call(arguments, 1));
          }
          var args = slice.call(arguments, 2);
          return function() {
            return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
          };
        }
        var lastId = 0;
        function stamp(obj) {
          if (!("_leaflet_id" in obj)) {
            obj["_leaflet_id"] = ++lastId;
          }
          return obj._leaflet_id;
        }
        function throttle(fn, time, context) {
          var lock, args, wrapperFn, later;
          later = function() {
            lock = false;
            if (args) {
              wrapperFn.apply(context, args);
              args = false;
            }
          };
          wrapperFn = function() {
            if (lock) {
              args = arguments;
            } else {
              fn.apply(context, arguments);
              setTimeout(later, time);
              lock = true;
            }
          };
          return wrapperFn;
        }
        function wrapNum(x2, range, includeMax) {
          var max = range[1], min = range[0], d = max - min;
          return x2 === max && includeMax ? x2 : ((x2 - min) % d + d) % d + min;
        }
        function falseFn() {
          return false;
        }
        function formatNum(num, precision) {
          if (precision === false) {
            return num;
          }
          var pow = Math.pow(10, precision === void 0 ? 6 : precision);
          return Math.round(num * pow) / pow;
        }
        function trim(str) {
          return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
        }
        function splitWords(str) {
          return trim(str).split(/\s+/);
        }
        function setOptions(obj, options) {
          if (!Object.prototype.hasOwnProperty.call(obj, "options")) {
            obj.options = obj.options ? create$2(obj.options) : {};
          }
          for (var i in options) {
            obj.options[i] = options[i];
          }
          return obj.options;
        }
        function getParamString(obj, existingUrl, uppercase) {
          var params = [];
          for (var i in obj) {
            params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + "=" + encodeURIComponent(obj[i]));
          }
          return (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
        }
        var templateRe = /\{ *([\w_ -]+) *\}/g;
        function template(str, data) {
          return str.replace(templateRe, function(str2, key) {
            var value = data[key];
            if (value === void 0) {
              throw new Error("No value provided for variable " + str2);
            } else if (typeof value === "function") {
              value = value(data);
            }
            return value;
          });
        }
        var isArray = Array.isArray || function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
        function indexOf(array, el) {
          for (var i = 0; i < array.length; i++) {
            if (array[i] === el) {
              return i;
            }
          }
          return -1;
        }
        var emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
        function getPrefixed(name) {
          return window["webkit" + name] || window["moz" + name] || window["ms" + name];
        }
        var lastTime = 0;
        function timeoutDefer(fn) {
          var time = +/* @__PURE__ */ new Date(), timeToCall = Math.max(0, 16 - (time - lastTime));
          lastTime = time + timeToCall;
          return window.setTimeout(fn, timeToCall);
        }
        var requestFn = window.requestAnimationFrame || getPrefixed("RequestAnimationFrame") || timeoutDefer;
        var cancelFn = window.cancelAnimationFrame || getPrefixed("CancelAnimationFrame") || getPrefixed("CancelRequestAnimationFrame") || function(id) {
          window.clearTimeout(id);
        };
        function requestAnimFrame(fn, context, immediate) {
          if (immediate && requestFn === timeoutDefer) {
            fn.call(context);
          } else {
            return requestFn.call(window, bind2(fn, context));
          }
        }
        function cancelAnimFrame(id) {
          if (id) {
            cancelFn.call(window, id);
          }
        }
        var Util = {
          __proto__: null,
          extend,
          create: create$2,
          bind: bind2,
          get lastId() {
            return lastId;
          },
          stamp,
          throttle,
          wrapNum,
          falseFn,
          formatNum,
          trim,
          splitWords,
          setOptions,
          getParamString,
          template,
          isArray,
          indexOf,
          emptyImageUrl,
          requestFn,
          cancelFn,
          requestAnimFrame,
          cancelAnimFrame
        };
        function Class() {
        }
        Class.extend = function(props) {
          var NewClass = function() {
            setOptions(this);
            if (this.initialize) {
              this.initialize.apply(this, arguments);
            }
            this.callInitHooks();
          };
          var parentProto = NewClass.__super__ = this.prototype;
          var proto = create$2(parentProto);
          proto.constructor = NewClass;
          NewClass.prototype = proto;
          for (var i in this) {
            if (Object.prototype.hasOwnProperty.call(this, i) && i !== "prototype" && i !== "__super__") {
              NewClass[i] = this[i];
            }
          }
          if (props.statics) {
            extend(NewClass, props.statics);
          }
          if (props.includes) {
            checkDeprecatedMixinEvents(props.includes);
            extend.apply(null, [proto].concat(props.includes));
          }
          extend(proto, props);
          delete proto.statics;
          delete proto.includes;
          if (proto.options) {
            proto.options = parentProto.options ? create$2(parentProto.options) : {};
            extend(proto.options, props.options);
          }
          proto._initHooks = [];
          proto.callInitHooks = function() {
            if (this._initHooksCalled) {
              return;
            }
            if (parentProto.callInitHooks) {
              parentProto.callInitHooks.call(this);
            }
            this._initHooksCalled = true;
            for (var i2 = 0, len = proto._initHooks.length; i2 < len; i2++) {
              proto._initHooks[i2].call(this);
            }
          };
          return NewClass;
        };
        Class.include = function(props) {
          var parentOptions = this.prototype.options;
          extend(this.prototype, props);
          if (props.options) {
            this.prototype.options = parentOptions;
            this.mergeOptions(props.options);
          }
          return this;
        };
        Class.mergeOptions = function(options) {
          extend(this.prototype.options, options);
          return this;
        };
        Class.addInitHook = function(fn) {
          var args = Array.prototype.slice.call(arguments, 1);
          var init2 = typeof fn === "function" ? fn : function() {
            this[fn].apply(this, args);
          };
          this.prototype._initHooks = this.prototype._initHooks || [];
          this.prototype._initHooks.push(init2);
          return this;
        };
        function checkDeprecatedMixinEvents(includes) {
          if (typeof L === "undefined" || !L || !L.Mixin) {
            return;
          }
          includes = isArray(includes) ? includes : [includes];
          for (var i = 0; i < includes.length; i++) {
            if (includes[i] === L.Mixin.Events) {
              console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
            }
          }
        }
        var Events = {
          /* @method on(type: String, fn: Function, context?: Object): this
           * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
           *
           * @alternative
           * @method on(eventMap: Object): this
           * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
           */
          on: function(types, fn, context) {
            if (typeof types === "object") {
              for (var type2 in types) {
                this._on(type2, types[type2], fn);
              }
            } else {
              types = splitWords(types);
              for (var i = 0, len = types.length; i < len; i++) {
                this._on(types[i], fn, context);
              }
            }
            return this;
          },
          /* @method off(type: String, fn?: Function, context?: Object): this
           * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
           *
           * @alternative
           * @method off(eventMap: Object): this
           * Removes a set of type/listener pairs.
           *
           * @alternative
           * @method off: this
           * Removes all listeners to all events on the object. This includes implicitly attached events.
           */
          off: function(types, fn, context) {
            if (!arguments.length) {
              delete this._events;
            } else if (typeof types === "object") {
              for (var type2 in types) {
                this._off(type2, types[type2], fn);
              }
            } else {
              types = splitWords(types);
              var removeAll = arguments.length === 1;
              for (var i = 0, len = types.length; i < len; i++) {
                if (removeAll) {
                  this._off(types[i]);
                } else {
                  this._off(types[i], fn, context);
                }
              }
            }
            return this;
          },
          // attach listener (without syntactic sugar now)
          _on: function(type2, fn, context, _once) {
            if (typeof fn !== "function") {
              console.warn("wrong listener type: " + typeof fn);
              return;
            }
            if (this._listens(type2, fn, context) !== false) {
              return;
            }
            if (context === this) {
              context = void 0;
            }
            var newListener = { fn, ctx: context };
            if (_once) {
              newListener.once = true;
            }
            this._events = this._events || {};
            this._events[type2] = this._events[type2] || [];
            this._events[type2].push(newListener);
          },
          _off: function(type2, fn, context) {
            var listeners, i, len;
            if (!this._events) {
              return;
            }
            listeners = this._events[type2];
            if (!listeners) {
              return;
            }
            if (arguments.length === 1) {
              if (this._firingCount) {
                for (i = 0, len = listeners.length; i < len; i++) {
                  listeners[i].fn = falseFn;
                }
              }
              delete this._events[type2];
              return;
            }
            if (typeof fn !== "function") {
              console.warn("wrong listener type: " + typeof fn);
              return;
            }
            var index2 = this._listens(type2, fn, context);
            if (index2 !== false) {
              var listener = listeners[index2];
              if (this._firingCount) {
                listener.fn = falseFn;
                this._events[type2] = listeners = listeners.slice();
              }
              listeners.splice(index2, 1);
            }
          },
          // @method fire(type: String, data?: Object, propagate?: Boolean): this
          // Fires an event of the specified type. You can optionally provide a data
          // object — the first argument of the listener function will contain its
          // properties. The event can optionally be propagated to event parents.
          fire: function(type2, data, propagate) {
            if (!this.listens(type2, propagate)) {
              return this;
            }
            var event = extend({}, data, {
              type: type2,
              target: this,
              sourceTarget: data && data.sourceTarget || this
            });
            if (this._events) {
              var listeners = this._events[type2];
              if (listeners) {
                this._firingCount = this._firingCount + 1 || 1;
                for (var i = 0, len = listeners.length; i < len; i++) {
                  var l2 = listeners[i];
                  var fn = l2.fn;
                  if (l2.once) {
                    this.off(type2, fn, l2.ctx);
                  }
                  fn.call(l2.ctx || this, event);
                }
                this._firingCount--;
              }
            }
            if (propagate) {
              this._propagateEvent(event);
            }
            return this;
          },
          // @method listens(type: String, propagate?: Boolean): Boolean
          // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
          // Returns `true` if a particular event type has any listeners attached to it.
          // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
          listens: function(type2, fn, context, propagate) {
            if (typeof type2 !== "string") {
              console.warn('"string" type argument expected');
            }
            var _fn = fn;
            if (typeof fn !== "function") {
              propagate = !!fn;
              _fn = void 0;
              context = void 0;
            }
            var listeners = this._events && this._events[type2];
            if (listeners && listeners.length) {
              if (this._listens(type2, _fn, context) !== false) {
                return true;
              }
            }
            if (propagate) {
              for (var id in this._eventParents) {
                if (this._eventParents[id].listens(type2, fn, context, propagate)) {
                  return true;
                }
              }
            }
            return false;
          },
          // returns the index (number) or false
          _listens: function(type2, fn, context) {
            if (!this._events) {
              return false;
            }
            var listeners = this._events[type2] || [];
            if (!fn) {
              return !!listeners.length;
            }
            if (context === this) {
              context = void 0;
            }
            for (var i = 0, len = listeners.length; i < len; i++) {
              if (listeners[i].fn === fn && listeners[i].ctx === context) {
                return i;
              }
            }
            return false;
          },
          // @method once(…): this
          // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
          once: function(types, fn, context) {
            if (typeof types === "object") {
              for (var type2 in types) {
                this._on(type2, types[type2], fn, true);
              }
            } else {
              types = splitWords(types);
              for (var i = 0, len = types.length; i < len; i++) {
                this._on(types[i], fn, context, true);
              }
            }
            return this;
          },
          // @method addEventParent(obj: Evented): this
          // Adds an event parent - an `Evented` that will receive propagated events
          addEventParent: function(obj) {
            this._eventParents = this._eventParents || {};
            this._eventParents[stamp(obj)] = obj;
            return this;
          },
          // @method removeEventParent(obj: Evented): this
          // Removes an event parent, so it will stop receiving propagated events
          removeEventParent: function(obj) {
            if (this._eventParents) {
              delete this._eventParents[stamp(obj)];
            }
            return this;
          },
          _propagateEvent: function(e) {
            for (var id in this._eventParents) {
              this._eventParents[id].fire(e.type, extend({
                layer: e.target,
                propagatedFrom: e.target
              }, e), true);
            }
          }
        };
        Events.addEventListener = Events.on;
        Events.removeEventListener = Events.clearAllEventListeners = Events.off;
        Events.addOneTimeEventListener = Events.once;
        Events.fireEvent = Events.fire;
        Events.hasEventListeners = Events.listens;
        var Evented = Class.extend(Events);
        function Point(x2, y, round) {
          this.x = round ? Math.round(x2) : x2;
          this.y = round ? Math.round(y) : y;
        }
        var trunc = Math.trunc || function(v) {
          return v > 0 ? Math.floor(v) : Math.ceil(v);
        };
        Point.prototype = {
          // @method clone(): Point
          // Returns a copy of the current point.
          clone: function() {
            return new Point(this.x, this.y);
          },
          // @method add(otherPoint: Point): Point
          // Returns the result of addition of the current and the given points.
          add: function(point) {
            return this.clone()._add(toPoint(point));
          },
          _add: function(point) {
            this.x += point.x;
            this.y += point.y;
            return this;
          },
          // @method subtract(otherPoint: Point): Point
          // Returns the result of subtraction of the given point from the current.
          subtract: function(point) {
            return this.clone()._subtract(toPoint(point));
          },
          _subtract: function(point) {
            this.x -= point.x;
            this.y -= point.y;
            return this;
          },
          // @method divideBy(num: Number): Point
          // Returns the result of division of the current point by the given number.
          divideBy: function(num) {
            return this.clone()._divideBy(num);
          },
          _divideBy: function(num) {
            this.x /= num;
            this.y /= num;
            return this;
          },
          // @method multiplyBy(num: Number): Point
          // Returns the result of multiplication of the current point by the given number.
          multiplyBy: function(num) {
            return this.clone()._multiplyBy(num);
          },
          _multiplyBy: function(num) {
            this.x *= num;
            this.y *= num;
            return this;
          },
          // @method scaleBy(scale: Point): Point
          // Multiply each coordinate of the current point by each coordinate of
          // `scale`. In linear algebra terms, multiply the point by the
          // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
          // defined by `scale`.
          scaleBy: function(point) {
            return new Point(this.x * point.x, this.y * point.y);
          },
          // @method unscaleBy(scale: Point): Point
          // Inverse of `scaleBy`. Divide each coordinate of the current point by
          // each coordinate of `scale`.
          unscaleBy: function(point) {
            return new Point(this.x / point.x, this.y / point.y);
          },
          // @method round(): Point
          // Returns a copy of the current point with rounded coordinates.
          round: function() {
            return this.clone()._round();
          },
          _round: function() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            return this;
          },
          // @method floor(): Point
          // Returns a copy of the current point with floored coordinates (rounded down).
          floor: function() {
            return this.clone()._floor();
          },
          _floor: function() {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this;
          },
          // @method ceil(): Point
          // Returns a copy of the current point with ceiled coordinates (rounded up).
          ceil: function() {
            return this.clone()._ceil();
          },
          _ceil: function() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this;
          },
          // @method trunc(): Point
          // Returns a copy of the current point with truncated coordinates (rounded towards zero).
          trunc: function() {
            return this.clone()._trunc();
          },
          _trunc: function() {
            this.x = trunc(this.x);
            this.y = trunc(this.y);
            return this;
          },
          // @method distanceTo(otherPoint: Point): Number
          // Returns the cartesian distance between the current and the given points.
          distanceTo: function(point) {
            point = toPoint(point);
            var x2 = point.x - this.x, y = point.y - this.y;
            return Math.sqrt(x2 * x2 + y * y);
          },
          // @method equals(otherPoint: Point): Boolean
          // Returns `true` if the given point has the same coordinates.
          equals: function(point) {
            point = toPoint(point);
            return point.x === this.x && point.y === this.y;
          },
          // @method contains(otherPoint: Point): Boolean
          // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
          contains: function(point) {
            point = toPoint(point);
            return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
          },
          // @method toString(): String
          // Returns a string representation of the point for debugging purposes.
          toString: function() {
            return "Point(" + formatNum(this.x) + ", " + formatNum(this.y) + ")";
          }
        };
        function toPoint(x2, y, round) {
          if (x2 instanceof Point) {
            return x2;
          }
          if (isArray(x2)) {
            return new Point(x2[0], x2[1]);
          }
          if (x2 === void 0 || x2 === null) {
            return x2;
          }
          if (typeof x2 === "object" && "x" in x2 && "y" in x2) {
            return new Point(x2.x, x2.y);
          }
          return new Point(x2, y, round);
        }
        function Bounds(a, b) {
          if (!a) {
            return;
          }
          var points = b ? [a, b] : a;
          for (var i = 0, len = points.length; i < len; i++) {
            this.extend(points[i]);
          }
        }
        Bounds.prototype = {
          // @method extend(point: Point): this
          // Extends the bounds to contain the given point.
          // @alternative
          // @method extend(otherBounds: Bounds): this
          // Extend the bounds to contain the given bounds
          extend: function(obj) {
            var min2, max2;
            if (!obj) {
              return this;
            }
            if (obj instanceof Point || typeof obj[0] === "number" || "x" in obj) {
              min2 = max2 = toPoint(obj);
            } else {
              obj = toBounds(obj);
              min2 = obj.min;
              max2 = obj.max;
              if (!min2 || !max2) {
                return this;
              }
            }
            if (!this.min && !this.max) {
              this.min = min2.clone();
              this.max = max2.clone();
            } else {
              this.min.x = Math.min(min2.x, this.min.x);
              this.max.x = Math.max(max2.x, this.max.x);
              this.min.y = Math.min(min2.y, this.min.y);
              this.max.y = Math.max(max2.y, this.max.y);
            }
            return this;
          },
          // @method getCenter(round?: Boolean): Point
          // Returns the center point of the bounds.
          getCenter: function(round) {
            return toPoint(
              (this.min.x + this.max.x) / 2,
              (this.min.y + this.max.y) / 2,
              round
            );
          },
          // @method getBottomLeft(): Point
          // Returns the bottom-left point of the bounds.
          getBottomLeft: function() {
            return toPoint(this.min.x, this.max.y);
          },
          // @method getTopRight(): Point
          // Returns the top-right point of the bounds.
          getTopRight: function() {
            return toPoint(this.max.x, this.min.y);
          },
          // @method getTopLeft(): Point
          // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
          getTopLeft: function() {
            return this.min;
          },
          // @method getBottomRight(): Point
          // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
          getBottomRight: function() {
            return this.max;
          },
          // @method getSize(): Point
          // Returns the size of the given bounds
          getSize: function() {
            return this.max.subtract(this.min);
          },
          // @method contains(otherBounds: Bounds): Boolean
          // Returns `true` if the rectangle contains the given one.
          // @alternative
          // @method contains(point: Point): Boolean
          // Returns `true` if the rectangle contains the given point.
          contains: function(obj) {
            var min, max;
            if (typeof obj[0] === "number" || obj instanceof Point) {
              obj = toPoint(obj);
            } else {
              obj = toBounds(obj);
            }
            if (obj instanceof Bounds) {
              min = obj.min;
              max = obj.max;
            } else {
              min = max = obj;
            }
            return min.x >= this.min.x && max.x <= this.max.x && min.y >= this.min.y && max.y <= this.max.y;
          },
          // @method intersects(otherBounds: Bounds): Boolean
          // Returns `true` if the rectangle intersects the given bounds. Two bounds
          // intersect if they have at least one point in common.
          intersects: function(bounds) {
            bounds = toBounds(bounds);
            var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xIntersects = max2.x >= min.x && min2.x <= max.x, yIntersects = max2.y >= min.y && min2.y <= max.y;
            return xIntersects && yIntersects;
          },
          // @method overlaps(otherBounds: Bounds): Boolean
          // Returns `true` if the rectangle overlaps the given bounds. Two bounds
          // overlap if their intersection is an area.
          overlaps: function(bounds) {
            bounds = toBounds(bounds);
            var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xOverlaps = max2.x > min.x && min2.x < max.x, yOverlaps = max2.y > min.y && min2.y < max.y;
            return xOverlaps && yOverlaps;
          },
          // @method isValid(): Boolean
          // Returns `true` if the bounds are properly initialized.
          isValid: function() {
            return !!(this.min && this.max);
          },
          // @method pad(bufferRatio: Number): Bounds
          // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
          // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
          // Negative values will retract the bounds.
          pad: function(bufferRatio) {
            var min = this.min, max = this.max, heightBuffer = Math.abs(min.x - max.x) * bufferRatio, widthBuffer = Math.abs(min.y - max.y) * bufferRatio;
            return toBounds(
              toPoint(min.x - heightBuffer, min.y - widthBuffer),
              toPoint(max.x + heightBuffer, max.y + widthBuffer)
            );
          },
          // @method equals(otherBounds: Bounds): Boolean
          // Returns `true` if the rectangle is equivalent to the given bounds.
          equals: function(bounds) {
            if (!bounds) {
              return false;
            }
            bounds = toBounds(bounds);
            return this.min.equals(bounds.getTopLeft()) && this.max.equals(bounds.getBottomRight());
          }
        };
        function toBounds(a, b) {
          if (!a || a instanceof Bounds) {
            return a;
          }
          return new Bounds(a, b);
        }
        function LatLngBounds(corner1, corner2) {
          if (!corner1) {
            return;
          }
          var latlngs = corner2 ? [corner1, corner2] : corner1;
          for (var i = 0, len = latlngs.length; i < len; i++) {
            this.extend(latlngs[i]);
          }
        }
        LatLngBounds.prototype = {
          // @method extend(latlng: LatLng): this
          // Extend the bounds to contain the given point
          // @alternative
          // @method extend(otherBounds: LatLngBounds): this
          // Extend the bounds to contain the given bounds
          extend: function(obj) {
            var sw = this._southWest, ne = this._northEast, sw2, ne2;
            if (obj instanceof LatLng) {
              sw2 = obj;
              ne2 = obj;
            } else if (obj instanceof LatLngBounds) {
              sw2 = obj._southWest;
              ne2 = obj._northEast;
              if (!sw2 || !ne2) {
                return this;
              }
            } else {
              return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
            }
            if (!sw && !ne) {
              this._southWest = new LatLng(sw2.lat, sw2.lng);
              this._northEast = new LatLng(ne2.lat, ne2.lng);
            } else {
              sw.lat = Math.min(sw2.lat, sw.lat);
              sw.lng = Math.min(sw2.lng, sw.lng);
              ne.lat = Math.max(ne2.lat, ne.lat);
              ne.lng = Math.max(ne2.lng, ne.lng);
            }
            return this;
          },
          // @method pad(bufferRatio: Number): LatLngBounds
          // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
          // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
          // Negative values will retract the bounds.
          pad: function(bufferRatio) {
            var sw = this._southWest, ne = this._northEast, heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio, widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
            return new LatLngBounds(
              new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
              new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer)
            );
          },
          // @method getCenter(): LatLng
          // Returns the center point of the bounds.
          getCenter: function() {
            return new LatLng(
              (this._southWest.lat + this._northEast.lat) / 2,
              (this._southWest.lng + this._northEast.lng) / 2
            );
          },
          // @method getSouthWest(): LatLng
          // Returns the south-west point of the bounds.
          getSouthWest: function() {
            return this._southWest;
          },
          // @method getNorthEast(): LatLng
          // Returns the north-east point of the bounds.
          getNorthEast: function() {
            return this._northEast;
          },
          // @method getNorthWest(): LatLng
          // Returns the north-west point of the bounds.
          getNorthWest: function() {
            return new LatLng(this.getNorth(), this.getWest());
          },
          // @method getSouthEast(): LatLng
          // Returns the south-east point of the bounds.
          getSouthEast: function() {
            return new LatLng(this.getSouth(), this.getEast());
          },
          // @method getWest(): Number
          // Returns the west longitude of the bounds
          getWest: function() {
            return this._southWest.lng;
          },
          // @method getSouth(): Number
          // Returns the south latitude of the bounds
          getSouth: function() {
            return this._southWest.lat;
          },
          // @method getEast(): Number
          // Returns the east longitude of the bounds
          getEast: function() {
            return this._northEast.lng;
          },
          // @method getNorth(): Number
          // Returns the north latitude of the bounds
          getNorth: function() {
            return this._northEast.lat;
          },
          // @method contains(otherBounds: LatLngBounds): Boolean
          // Returns `true` if the rectangle contains the given one.
          // @alternative
          // @method contains (latlng: LatLng): Boolean
          // Returns `true` if the rectangle contains the given point.
          contains: function(obj) {
            if (typeof obj[0] === "number" || obj instanceof LatLng || "lat" in obj) {
              obj = toLatLng(obj);
            } else {
              obj = toLatLngBounds(obj);
            }
            var sw = this._southWest, ne = this._northEast, sw2, ne2;
            if (obj instanceof LatLngBounds) {
              sw2 = obj.getSouthWest();
              ne2 = obj.getNorthEast();
            } else {
              sw2 = ne2 = obj;
            }
            return sw2.lat >= sw.lat && ne2.lat <= ne.lat && sw2.lng >= sw.lng && ne2.lng <= ne.lng;
          },
          // @method intersects(otherBounds: LatLngBounds): Boolean
          // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
          intersects: function(bounds) {
            bounds = toLatLngBounds(bounds);
            var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latIntersects = ne2.lat >= sw.lat && sw2.lat <= ne.lat, lngIntersects = ne2.lng >= sw.lng && sw2.lng <= ne.lng;
            return latIntersects && lngIntersects;
          },
          // @method overlaps(otherBounds: LatLngBounds): Boolean
          // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
          overlaps: function(bounds) {
            bounds = toLatLngBounds(bounds);
            var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latOverlaps = ne2.lat > sw.lat && sw2.lat < ne.lat, lngOverlaps = ne2.lng > sw.lng && sw2.lng < ne.lng;
            return latOverlaps && lngOverlaps;
          },
          // @method toBBoxString(): String
          // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
          toBBoxString: function() {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
          },
          // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
          // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
          equals: function(bounds, maxMargin) {
            if (!bounds) {
              return false;
            }
            bounds = toLatLngBounds(bounds);
            return this._southWest.equals(bounds.getSouthWest(), maxMargin) && this._northEast.equals(bounds.getNorthEast(), maxMargin);
          },
          // @method isValid(): Boolean
          // Returns `true` if the bounds are properly initialized.
          isValid: function() {
            return !!(this._southWest && this._northEast);
          }
        };
        function toLatLngBounds(a, b) {
          if (a instanceof LatLngBounds) {
            return a;
          }
          return new LatLngBounds(a, b);
        }
        function LatLng(lat, lng, alt) {
          if (isNaN(lat) || isNaN(lng)) {
            throw new Error("Invalid LatLng object: (" + lat + ", " + lng + ")");
          }
          this.lat = +lat;
          this.lng = +lng;
          if (alt !== void 0) {
            this.alt = +alt;
          }
        }
        LatLng.prototype = {
          // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
          // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
          equals: function(obj, maxMargin) {
            if (!obj) {
              return false;
            }
            obj = toLatLng(obj);
            var margin = Math.max(
              Math.abs(this.lat - obj.lat),
              Math.abs(this.lng - obj.lng)
            );
            return margin <= (maxMargin === void 0 ? 1e-9 : maxMargin);
          },
          // @method toString(): String
          // Returns a string representation of the point (for debugging purposes).
          toString: function(precision) {
            return "LatLng(" + formatNum(this.lat, precision) + ", " + formatNum(this.lng, precision) + ")";
          },
          // @method distanceTo(otherLatLng: LatLng): Number
          // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
          distanceTo: function(other) {
            return Earth.distance(this, toLatLng(other));
          },
          // @method wrap(): LatLng
          // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
          wrap: function() {
            return Earth.wrapLatLng(this);
          },
          // @method toBounds(sizeInMeters: Number): LatLngBounds
          // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
          toBounds: function(sizeInMeters) {
            var latAccuracy = 180 * sizeInMeters / 40075017, lngAccuracy = latAccuracy / Math.cos(Math.PI / 180 * this.lat);
            return toLatLngBounds(
              [this.lat - latAccuracy, this.lng - lngAccuracy],
              [this.lat + latAccuracy, this.lng + lngAccuracy]
            );
          },
          clone: function() {
            return new LatLng(this.lat, this.lng, this.alt);
          }
        };
        function toLatLng(a, b, c) {
          if (a instanceof LatLng) {
            return a;
          }
          if (isArray(a) && typeof a[0] !== "object") {
            if (a.length === 3) {
              return new LatLng(a[0], a[1], a[2]);
            }
            if (a.length === 2) {
              return new LatLng(a[0], a[1]);
            }
            return null;
          }
          if (a === void 0 || a === null) {
            return a;
          }
          if (typeof a === "object" && "lat" in a) {
            return new LatLng(a.lat, "lng" in a ? a.lng : a.lon, a.alt);
          }
          if (b === void 0) {
            return null;
          }
          return new LatLng(a, b, c);
        }
        var CRS = {
          // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
          // Projects geographical coordinates into pixel coordinates for a given zoom.
          latLngToPoint: function(latlng, zoom2) {
            var projectedPoint = this.projection.project(latlng), scale2 = this.scale(zoom2);
            return this.transformation._transform(projectedPoint, scale2);
          },
          // @method pointToLatLng(point: Point, zoom: Number): LatLng
          // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
          // zoom into geographical coordinates.
          pointToLatLng: function(point, zoom2) {
            var scale2 = this.scale(zoom2), untransformedPoint = this.transformation.untransform(point, scale2);
            return this.projection.unproject(untransformedPoint);
          },
          // @method project(latlng: LatLng): Point
          // Projects geographical coordinates into coordinates in units accepted for
          // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
          project: function(latlng) {
            return this.projection.project(latlng);
          },
          // @method unproject(point: Point): LatLng
          // Given a projected coordinate returns the corresponding LatLng.
          // The inverse of `project`.
          unproject: function(point) {
            return this.projection.unproject(point);
          },
          // @method scale(zoom: Number): Number
          // Returns the scale used when transforming projected coordinates into
          // pixel coordinates for a particular zoom. For example, it returns
          // `256 * 2^zoom` for Mercator-based CRS.
          scale: function(zoom2) {
            return 256 * Math.pow(2, zoom2);
          },
          // @method zoom(scale: Number): Number
          // Inverse of `scale()`, returns the zoom level corresponding to a scale
          // factor of `scale`.
          zoom: function(scale2) {
            return Math.log(scale2 / 256) / Math.LN2;
          },
          // @method getProjectedBounds(zoom: Number): Bounds
          // Returns the projection's bounds scaled and transformed for the provided `zoom`.
          getProjectedBounds: function(zoom2) {
            if (this.infinite) {
              return null;
            }
            var b = this.projection.bounds, s = this.scale(zoom2), min = this.transformation.transform(b.min, s), max = this.transformation.transform(b.max, s);
            return new Bounds(min, max);
          },
          // @method distance(latlng1: LatLng, latlng2: LatLng): Number
          // Returns the distance between two geographical coordinates.
          // @property code: String
          // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
          //
          // @property wrapLng: Number[]
          // An array of two numbers defining whether the longitude (horizontal) coordinate
          // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
          // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
          //
          // @property wrapLat: Number[]
          // Like `wrapLng`, but for the latitude (vertical) axis.
          // wrapLng: [min, max],
          // wrapLat: [min, max],
          // @property infinite: Boolean
          // If true, the coordinate space will be unbounded (infinite in both axes)
          infinite: false,
          // @method wrapLatLng(latlng: LatLng): LatLng
          // Returns a `LatLng` where lat and lng has been wrapped according to the
          // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
          wrapLatLng: function(latlng) {
            var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng, lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat, alt = latlng.alt;
            return new LatLng(lat, lng, alt);
          },
          // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
          // Returns a `LatLngBounds` with the same size as the given one, ensuring
          // that its center is within the CRS's bounds.
          // Only accepts actual `L.LatLngBounds` instances, not arrays.
          wrapLatLngBounds: function(bounds) {
            var center = bounds.getCenter(), newCenter = this.wrapLatLng(center), latShift = center.lat - newCenter.lat, lngShift = center.lng - newCenter.lng;
            if (latShift === 0 && lngShift === 0) {
              return bounds;
            }
            var sw = bounds.getSouthWest(), ne = bounds.getNorthEast(), newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift), newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);
            return new LatLngBounds(newSw, newNe);
          }
        };
        var Earth = extend({}, CRS, {
          wrapLng: [-180, 180],
          // Mean Earth Radius, as recommended for use by
          // the International Union of Geodesy and Geophysics,
          // see https://rosettacode.org/wiki/Haversine_formula
          R: 6371e3,
          // distance between two geographical points using spherical law of cosines approximation
          distance: function(latlng1, latlng2) {
            var rad = Math.PI / 180, lat1 = latlng1.lat * rad, lat2 = latlng2.lat * rad, sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2), sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2), a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon, c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return this.R * c;
          }
        });
        var earthRadius = 6378137;
        var SphericalMercator = {
          R: earthRadius,
          MAX_LATITUDE: 85.0511287798,
          project: function(latlng) {
            var d = Math.PI / 180, max = this.MAX_LATITUDE, lat = Math.max(Math.min(max, latlng.lat), -max), sin = Math.sin(lat * d);
            return new Point(
              this.R * latlng.lng * d,
              this.R * Math.log((1 + sin) / (1 - sin)) / 2
            );
          },
          unproject: function(point) {
            var d = 180 / Math.PI;
            return new LatLng(
              (2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d,
              point.x * d / this.R
            );
          },
          bounds: function() {
            var d = earthRadius * Math.PI;
            return new Bounds([-d, -d], [d, d]);
          }()
        };
        function Transformation(a, b, c, d) {
          if (isArray(a)) {
            this._a = a[0];
            this._b = a[1];
            this._c = a[2];
            this._d = a[3];
            return;
          }
          this._a = a;
          this._b = b;
          this._c = c;
          this._d = d;
        }
        Transformation.prototype = {
          // @method transform(point: Point, scale?: Number): Point
          // Returns a transformed point, optionally multiplied by the given scale.
          // Only accepts actual `L.Point` instances, not arrays.
          transform: function(point, scale2) {
            return this._transform(point.clone(), scale2);
          },
          // destructive transform (faster)
          _transform: function(point, scale2) {
            scale2 = scale2 || 1;
            point.x = scale2 * (this._a * point.x + this._b);
            point.y = scale2 * (this._c * point.y + this._d);
            return point;
          },
          // @method untransform(point: Point, scale?: Number): Point
          // Returns the reverse transformation of the given point, optionally divided
          // by the given scale. Only accepts actual `L.Point` instances, not arrays.
          untransform: function(point, scale2) {
            scale2 = scale2 || 1;
            return new Point(
              (point.x / scale2 - this._b) / this._a,
              (point.y / scale2 - this._d) / this._c
            );
          }
        };
        function toTransformation(a, b, c, d) {
          return new Transformation(a, b, c, d);
        }
        var EPSG3857 = extend({}, Earth, {
          code: "EPSG:3857",
          projection: SphericalMercator,
          transformation: function() {
            var scale2 = 0.5 / (Math.PI * SphericalMercator.R);
            return toTransformation(scale2, 0.5, -scale2, 0.5);
          }()
        });
        var EPSG900913 = extend({}, EPSG3857, {
          code: "EPSG:900913"
        });
        function svgCreate(name) {
          return document.createElementNS("http://www.w3.org/2000/svg", name);
        }
        function pointsToPath(rings, closed) {
          var str = "", i, j, len, len2, points, p;
          for (i = 0, len = rings.length; i < len; i++) {
            points = rings[i];
            for (j = 0, len2 = points.length; j < len2; j++) {
              p = points[j];
              str += (j ? "L" : "M") + p.x + " " + p.y;
            }
            str += closed ? Browser.svg ? "z" : "x" : "";
          }
          return str || "M0 0";
        }
        var style = document.documentElement.style;
        var ie = "ActiveXObject" in window;
        var ielt9 = ie && !document.addEventListener;
        var edge = "msLaunchUri" in navigator && !("documentMode" in document);
        var webkit = userAgentContains("webkit");
        var android = userAgentContains("android");
        var android23 = userAgentContains("android 2") || userAgentContains("android 3");
        var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
        var androidStock = android && userAgentContains("Google") && webkitVer < 537 && !("AudioNode" in window);
        var opera = !!window.opera;
        var chrome = !edge && userAgentContains("chrome");
        var gecko = userAgentContains("gecko") && !webkit && !opera && !ie;
        var safari = !chrome && userAgentContains("safari");
        var phantom = userAgentContains("phantom");
        var opera12 = "OTransition" in style;
        var win = navigator.platform.indexOf("Win") === 0;
        var ie3d = ie && "transition" in style;
        var webkit3d = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !android23;
        var gecko3d = "MozPerspective" in style;
        var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;
        var mobile = typeof orientation !== "undefined" || userAgentContains("mobile");
        var mobileWebkit = mobile && webkit;
        var mobileWebkit3d = mobile && webkit3d;
        var msPointer = !window.PointerEvent && window.MSPointerEvent;
        var pointer = !!(window.PointerEvent || msPointer);
        var touchNative = "ontouchstart" in window || !!window.TouchEvent;
        var touch = !window.L_NO_TOUCH && (touchNative || pointer);
        var mobileOpera = mobile && opera;
        var mobileGecko = mobile && gecko;
        var retina = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
        var passiveEvents = function() {
          var supportsPassiveOption = false;
          try {
            var opts = Object.defineProperty({}, "passive", {
              get: function() {
                supportsPassiveOption = true;
              }
            });
            window.addEventListener("testPassiveEventSupport", falseFn, opts);
            window.removeEventListener("testPassiveEventSupport", falseFn, opts);
          } catch (e) {
          }
          return supportsPassiveOption;
        }();
        var canvas$1 = function() {
          return !!document.createElement("canvas").getContext;
        }();
        var svg$1 = !!(document.createElementNS && svgCreate("svg").createSVGRect);
        var inlineSvg = !!svg$1 && function() {
          var div = document.createElement("div");
          div.innerHTML = "<svg/>";
          return (div.firstChild && div.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
        }();
        var vml = !svg$1 && function() {
          try {
            var div = document.createElement("div");
            div.innerHTML = '<v:shape adj="1"/>';
            var shape = div.firstChild;
            shape.style.behavior = "url(#default#VML)";
            return shape && typeof shape.adj === "object";
          } catch (e) {
            return false;
          }
        }();
        var mac = navigator.platform.indexOf("Mac") === 0;
        var linux = navigator.platform.indexOf("Linux") === 0;
        function userAgentContains(str) {
          return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
        }
        var Browser = {
          ie,
          ielt9,
          edge,
          webkit,
          android,
          android23,
          androidStock,
          opera,
          chrome,
          gecko,
          safari,
          phantom,
          opera12,
          win,
          ie3d,
          webkit3d,
          gecko3d,
          any3d,
          mobile,
          mobileWebkit,
          mobileWebkit3d,
          msPointer,
          pointer,
          touch,
          touchNative,
          mobileOpera,
          mobileGecko,
          retina,
          passiveEvents,
          canvas: canvas$1,
          svg: svg$1,
          vml,
          inlineSvg,
          mac,
          linux
        };
        var POINTER_DOWN = Browser.msPointer ? "MSPointerDown" : "pointerdown";
        var POINTER_MOVE = Browser.msPointer ? "MSPointerMove" : "pointermove";
        var POINTER_UP = Browser.msPointer ? "MSPointerUp" : "pointerup";
        var POINTER_CANCEL = Browser.msPointer ? "MSPointerCancel" : "pointercancel";
        var pEvent = {
          touchstart: POINTER_DOWN,
          touchmove: POINTER_MOVE,
          touchend: POINTER_UP,
          touchcancel: POINTER_CANCEL
        };
        var handle = {
          touchstart: _onPointerStart,
          touchmove: _handlePointer,
          touchend: _handlePointer,
          touchcancel: _handlePointer
        };
        var _pointers = {};
        var _pointerDocListener = false;
        function addPointerListener(obj, type2, handler) {
          if (type2 === "touchstart") {
            _addPointerDocListener();
          }
          if (!handle[type2]) {
            console.warn("wrong event specified:", type2);
            return falseFn;
          }
          handler = handle[type2].bind(this, handler);
          obj.addEventListener(pEvent[type2], handler, false);
          return handler;
        }
        function removePointerListener(obj, type2, handler) {
          if (!pEvent[type2]) {
            console.warn("wrong event specified:", type2);
            return;
          }
          obj.removeEventListener(pEvent[type2], handler, false);
        }
        function _globalPointerDown(e) {
          _pointers[e.pointerId] = e;
        }
        function _globalPointerMove(e) {
          if (_pointers[e.pointerId]) {
            _pointers[e.pointerId] = e;
          }
        }
        function _globalPointerUp(e) {
          delete _pointers[e.pointerId];
        }
        function _addPointerDocListener() {
          if (!_pointerDocListener) {
            document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
            document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
            document.addEventListener(POINTER_UP, _globalPointerUp, true);
            document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);
            _pointerDocListener = true;
          }
        }
        function _handlePointer(handler, e) {
          if (e.pointerType === (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
            return;
          }
          e.touches = [];
          for (var i in _pointers) {
            e.touches.push(_pointers[i]);
          }
          e.changedTouches = [e];
          handler(e);
        }
        function _onPointerStart(handler, e) {
          if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
            preventDefault(e);
          }
          _handlePointer(handler, e);
        }
        function makeDblclick(event) {
          var newEvent = {}, prop, i;
          for (i in event) {
            prop = event[i];
            newEvent[i] = prop && prop.bind ? prop.bind(event) : prop;
          }
          event = newEvent;
          newEvent.type = "dblclick";
          newEvent.detail = 2;
          newEvent.isTrusted = false;
          newEvent._simulated = true;
          return newEvent;
        }
        var delay = 200;
        function addDoubleTapListener(obj, handler) {
          obj.addEventListener("dblclick", handler);
          var last = 0, detail;
          function simDblclick(e) {
            if (e.detail !== 1) {
              detail = e.detail;
              return;
            }
            if (e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents) {
              return;
            }
            var path = getPropagationPath(e);
            if (path.some(function(el) {
              return el instanceof HTMLLabelElement && el.attributes.for;
            }) && !path.some(function(el) {
              return el instanceof HTMLInputElement || el instanceof HTMLSelectElement;
            })) {
              return;
            }
            var now2 = Date.now();
            if (now2 - last <= delay) {
              detail++;
              if (detail === 2) {
                handler(makeDblclick(e));
              }
            } else {
              detail = 1;
            }
            last = now2;
          }
          obj.addEventListener("click", simDblclick);
          return {
            dblclick: handler,
            simDblclick
          };
        }
        function removeDoubleTapListener(obj, handlers) {
          obj.removeEventListener("dblclick", handlers.dblclick);
          obj.removeEventListener("click", handlers.simDblclick);
        }
        var TRANSFORM = testProp(
          ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
        );
        var TRANSITION = testProp(
          ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
        );
        var TRANSITION_END = TRANSITION === "webkitTransition" || TRANSITION === "OTransition" ? TRANSITION + "End" : "transitionend";
        function get(id) {
          return typeof id === "string" ? document.getElementById(id) : id;
        }
        function getStyle(el, style2) {
          var value = el.style[style2] || el.currentStyle && el.currentStyle[style2];
          if ((!value || value === "auto") && document.defaultView) {
            var css = document.defaultView.getComputedStyle(el, null);
            value = css ? css[style2] : null;
          }
          return value === "auto" ? null : value;
        }
        function create$1(tagName, className, container) {
          var el = document.createElement(tagName);
          el.className = className || "";
          if (container) {
            container.appendChild(el);
          }
          return el;
        }
        function remove(el) {
          var parent = el.parentNode;
          if (parent) {
            parent.removeChild(el);
          }
        }
        function empty2(el) {
          while (el.firstChild) {
            el.removeChild(el.firstChild);
          }
        }
        function toFront(el) {
          var parent = el.parentNode;
          if (parent && parent.lastChild !== el) {
            parent.appendChild(el);
          }
        }
        function toBack(el) {
          var parent = el.parentNode;
          if (parent && parent.firstChild !== el) {
            parent.insertBefore(el, parent.firstChild);
          }
        }
        function hasClass(el, name) {
          if (el.classList !== void 0) {
            return el.classList.contains(name);
          }
          var className = getClass(el);
          return className.length > 0 && new RegExp("(^|\\s)" + name + "(\\s|$)").test(className);
        }
        function addClass(el, name) {
          if (el.classList !== void 0) {
            var classes = splitWords(name);
            for (var i = 0, len = classes.length; i < len; i++) {
              el.classList.add(classes[i]);
            }
          } else if (!hasClass(el, name)) {
            var className = getClass(el);
            setClass(el, (className ? className + " " : "") + name);
          }
        }
        function removeClass(el, name) {
          if (el.classList !== void 0) {
            el.classList.remove(name);
          } else {
            setClass(el, trim((" " + getClass(el) + " ").replace(" " + name + " ", " ")));
          }
        }
        function setClass(el, name) {
          if (el.className.baseVal === void 0) {
            el.className = name;
          } else {
            el.className.baseVal = name;
          }
        }
        function getClass(el) {
          if (el.correspondingElement) {
            el = el.correspondingElement;
          }
          return el.className.baseVal === void 0 ? el.className : el.className.baseVal;
        }
        function setOpacity(el, value) {
          if ("opacity" in el.style) {
            el.style.opacity = value;
          } else if ("filter" in el.style) {
            _setOpacityIE(el, value);
          }
        }
        function _setOpacityIE(el, value) {
          var filter = false, filterName = "DXImageTransform.Microsoft.Alpha";
          try {
            filter = el.filters.item(filterName);
          } catch (e) {
            if (value === 1) {
              return;
            }
          }
          value = Math.round(value * 100);
          if (filter) {
            filter.Enabled = value !== 100;
            filter.Opacity = value;
          } else {
            el.style.filter += " progid:" + filterName + "(opacity=" + value + ")";
          }
        }
        function testProp(props) {
          var style2 = document.documentElement.style;
          for (var i = 0; i < props.length; i++) {
            if (props[i] in style2) {
              return props[i];
            }
          }
          return false;
        }
        function setTransform(el, offset, scale2) {
          var pos = offset || new Point(0, 0);
          el.style[TRANSFORM] = (Browser.ie3d ? "translate(" + pos.x + "px," + pos.y + "px)" : "translate3d(" + pos.x + "px," + pos.y + "px,0)") + (scale2 ? " scale(" + scale2 + ")" : "");
        }
        function setPosition(el, point) {
          el._leaflet_pos = point;
          if (Browser.any3d) {
            setTransform(el, point);
          } else {
            el.style.left = point.x + "px";
            el.style.top = point.y + "px";
          }
        }
        function getPosition(el) {
          return el._leaflet_pos || new Point(0, 0);
        }
        var disableTextSelection;
        var enableTextSelection;
        var _userSelect;
        if ("onselectstart" in document) {
          disableTextSelection = function() {
            on(window, "selectstart", preventDefault);
          };
          enableTextSelection = function() {
            off(window, "selectstart", preventDefault);
          };
        } else {
          var userSelectProperty = testProp(
            ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
          );
          disableTextSelection = function() {
            if (userSelectProperty) {
              var style2 = document.documentElement.style;
              _userSelect = style2[userSelectProperty];
              style2[userSelectProperty] = "none";
            }
          };
          enableTextSelection = function() {
            if (userSelectProperty) {
              document.documentElement.style[userSelectProperty] = _userSelect;
              _userSelect = void 0;
            }
          };
        }
        function disableImageDrag() {
          on(window, "dragstart", preventDefault);
        }
        function enableImageDrag() {
          off(window, "dragstart", preventDefault);
        }
        var _outlineElement, _outlineStyle;
        function preventOutline(element2) {
          while (element2.tabIndex === -1) {
            element2 = element2.parentNode;
          }
          if (!element2.style) {
            return;
          }
          restoreOutline();
          _outlineElement = element2;
          _outlineStyle = element2.style.outlineStyle;
          element2.style.outlineStyle = "none";
          on(window, "keydown", restoreOutline);
        }
        function restoreOutline() {
          if (!_outlineElement) {
            return;
          }
          _outlineElement.style.outlineStyle = _outlineStyle;
          _outlineElement = void 0;
          _outlineStyle = void 0;
          off(window, "keydown", restoreOutline);
        }
        function getSizedParentNode(element2) {
          do {
            element2 = element2.parentNode;
          } while ((!element2.offsetWidth || !element2.offsetHeight) && element2 !== document.body);
          return element2;
        }
        function getScale(element2) {
          var rect = element2.getBoundingClientRect();
          return {
            x: rect.width / element2.offsetWidth || 1,
            y: rect.height / element2.offsetHeight || 1,
            boundingClientRect: rect
          };
        }
        var DomUtil = {
          __proto__: null,
          TRANSFORM,
          TRANSITION,
          TRANSITION_END,
          get,
          getStyle,
          create: create$1,
          remove,
          empty: empty2,
          toFront,
          toBack,
          hasClass,
          addClass,
          removeClass,
          setClass,
          getClass,
          setOpacity,
          testProp,
          setTransform,
          setPosition,
          getPosition,
          get disableTextSelection() {
            return disableTextSelection;
          },
          get enableTextSelection() {
            return enableTextSelection;
          },
          disableImageDrag,
          enableImageDrag,
          preventOutline,
          restoreOutline,
          getSizedParentNode,
          getScale
        };
        function on(obj, types, fn, context) {
          if (types && typeof types === "object") {
            for (var type2 in types) {
              addOne(obj, type2, types[type2], fn);
            }
          } else {
            types = splitWords(types);
            for (var i = 0, len = types.length; i < len; i++) {
              addOne(obj, types[i], fn, context);
            }
          }
          return this;
        }
        var eventsKey = "_leaflet_events";
        function off(obj, types, fn, context) {
          if (arguments.length === 1) {
            batchRemove(obj);
            delete obj[eventsKey];
          } else if (types && typeof types === "object") {
            for (var type2 in types) {
              removeOne(obj, type2, types[type2], fn);
            }
          } else {
            types = splitWords(types);
            if (arguments.length === 2) {
              batchRemove(obj, function(type3) {
                return indexOf(types, type3) !== -1;
              });
            } else {
              for (var i = 0, len = types.length; i < len; i++) {
                removeOne(obj, types[i], fn, context);
              }
            }
          }
          return this;
        }
        function batchRemove(obj, filterFn) {
          for (var id in obj[eventsKey]) {
            var type2 = id.split(/\d/)[0];
            if (!filterFn || filterFn(type2)) {
              removeOne(obj, type2, null, null, id);
            }
          }
        }
        var mouseSubst = {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          wheel: !("onwheel" in window) && "mousewheel"
        };
        function addOne(obj, type2, fn, context) {
          var id = type2 + stamp(fn) + (context ? "_" + stamp(context) : "");
          if (obj[eventsKey] && obj[eventsKey][id]) {
            return this;
          }
          var handler = function(e) {
            return fn.call(context || obj, e || window.event);
          };
          var originalHandler = handler;
          if (!Browser.touchNative && Browser.pointer && type2.indexOf("touch") === 0) {
            handler = addPointerListener(obj, type2, handler);
          } else if (Browser.touch && type2 === "dblclick") {
            handler = addDoubleTapListener(obj, handler);
          } else if ("addEventListener" in obj) {
            if (type2 === "touchstart" || type2 === "touchmove" || type2 === "wheel" || type2 === "mousewheel") {
              obj.addEventListener(mouseSubst[type2] || type2, handler, Browser.passiveEvents ? { passive: false } : false);
            } else if (type2 === "mouseenter" || type2 === "mouseleave") {
              handler = function(e) {
                e = e || window.event;
                if (isExternalTarget(obj, e)) {
                  originalHandler(e);
                }
              };
              obj.addEventListener(mouseSubst[type2], handler, false);
            } else {
              obj.addEventListener(type2, originalHandler, false);
            }
          } else {
            obj.attachEvent("on" + type2, handler);
          }
          obj[eventsKey] = obj[eventsKey] || {};
          obj[eventsKey][id] = handler;
        }
        function removeOne(obj, type2, fn, context, id) {
          id = id || type2 + stamp(fn) + (context ? "_" + stamp(context) : "");
          var handler = obj[eventsKey] && obj[eventsKey][id];
          if (!handler) {
            return this;
          }
          if (!Browser.touchNative && Browser.pointer && type2.indexOf("touch") === 0) {
            removePointerListener(obj, type2, handler);
          } else if (Browser.touch && type2 === "dblclick") {
            removeDoubleTapListener(obj, handler);
          } else if ("removeEventListener" in obj) {
            obj.removeEventListener(mouseSubst[type2] || type2, handler, false);
          } else {
            obj.detachEvent("on" + type2, handler);
          }
          obj[eventsKey][id] = null;
        }
        function stopPropagation(e) {
          if (e.stopPropagation) {
            e.stopPropagation();
          } else if (e.originalEvent) {
            e.originalEvent._stopped = true;
          } else {
            e.cancelBubble = true;
          }
          return this;
        }
        function disableScrollPropagation(el) {
          addOne(el, "wheel", stopPropagation);
          return this;
        }
        function disableClickPropagation(el) {
          on(el, "mousedown touchstart dblclick contextmenu", stopPropagation);
          el["_leaflet_disable_click"] = true;
          return this;
        }
        function preventDefault(e) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
          return this;
        }
        function stop(e) {
          preventDefault(e);
          stopPropagation(e);
          return this;
        }
        function getPropagationPath(ev) {
          if (ev.composedPath) {
            return ev.composedPath();
          }
          var path = [];
          var el = ev.target;
          while (el) {
            path.push(el);
            el = el.parentNode;
          }
          return path;
        }
        function getMousePosition(e, container) {
          if (!container) {
            return new Point(e.clientX, e.clientY);
          }
          var scale2 = getScale(container), offset = scale2.boundingClientRect;
          return new Point(
            // offset.left/top values are in page scale (like clientX/Y),
            // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
            (e.clientX - offset.left) / scale2.x - container.clientLeft,
            (e.clientY - offset.top) / scale2.y - container.clientTop
          );
        }
        var wheelPxFactor = Browser.linux && Browser.chrome ? window.devicePixelRatio : Browser.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
        function getWheelDelta(e) {
          return Browser.edge ? e.wheelDeltaY / 2 : (
            // Don't trust window-geometry-based delta
            e.deltaY && e.deltaMode === 0 ? -e.deltaY / wheelPxFactor : (
              // Pixels
              e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : (
                // Lines
                e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : (
                  // Pages
                  e.deltaX || e.deltaZ ? 0 : (
                    // Skip horizontal/depth wheel events
                    e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : (
                      // Legacy IE pixels
                      e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : (
                        // Legacy Moz lines
                        e.detail ? e.detail / -32765 * 60 : (
                          // Legacy Moz pages
                          0
                        )
                      )
                    )
                  )
                )
              )
            )
          );
        }
        function isExternalTarget(el, e) {
          var related = e.relatedTarget;
          if (!related) {
            return true;
          }
          try {
            while (related && related !== el) {
              related = related.parentNode;
            }
          } catch (err) {
            return false;
          }
          return related !== el;
        }
        var DomEvent = {
          __proto__: null,
          on,
          off,
          stopPropagation,
          disableScrollPropagation,
          disableClickPropagation,
          preventDefault,
          stop,
          getPropagationPath,
          getMousePosition,
          getWheelDelta,
          isExternalTarget,
          addListener: on,
          removeListener: off
        };
        var PosAnimation = Evented.extend({
          // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
          // Run an animation of a given element to a new position, optionally setting
          // duration in seconds (`0.25` by default) and easing linearity factor (3rd
          // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
          // `0.5` by default).
          run: function(el, newPos, duration, easeLinearity) {
            this.stop();
            this._el = el;
            this._inProgress = true;
            this._duration = duration || 0.25;
            this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);
            this._startPos = getPosition(el);
            this._offset = newPos.subtract(this._startPos);
            this._startTime = +/* @__PURE__ */ new Date();
            this.fire("start");
            this._animate();
          },
          // @method stop()
          // Stops the animation (if currently running).
          stop: function() {
            if (!this._inProgress) {
              return;
            }
            this._step(true);
            this._complete();
          },
          _animate: function() {
            this._animId = requestAnimFrame(this._animate, this);
            this._step();
          },
          _step: function(round) {
            var elapsed = +/* @__PURE__ */ new Date() - this._startTime, duration = this._duration * 1e3;
            if (elapsed < duration) {
              this._runFrame(this._easeOut(elapsed / duration), round);
            } else {
              this._runFrame(1);
              this._complete();
            }
          },
          _runFrame: function(progress, round) {
            var pos = this._startPos.add(this._offset.multiplyBy(progress));
            if (round) {
              pos._round();
            }
            setPosition(this._el, pos);
            this.fire("step");
          },
          _complete: function() {
            cancelAnimFrame(this._animId);
            this._inProgress = false;
            this.fire("end");
          },
          _easeOut: function(t) {
            return 1 - Math.pow(1 - t, this._easeOutPower);
          }
        });
        var Map2 = Evented.extend({
          options: {
            // @section Map State Options
            // @option crs: CRS = L.CRS.EPSG3857
            // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
            // sure what it means.
            crs: EPSG3857,
            // @option center: LatLng = undefined
            // Initial geographic center of the map
            center: void 0,
            // @option zoom: Number = undefined
            // Initial map zoom level
            zoom: void 0,
            // @option minZoom: Number = *
            // Minimum zoom level of the map.
            // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
            // the lowest of their `minZoom` options will be used instead.
            minZoom: void 0,
            // @option maxZoom: Number = *
            // Maximum zoom level of the map.
            // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
            // the highest of their `maxZoom` options will be used instead.
            maxZoom: void 0,
            // @option layers: Layer[] = []
            // Array of layers that will be added to the map initially
            layers: [],
            // @option maxBounds: LatLngBounds = null
            // When this option is set, the map restricts the view to the given
            // geographical bounds, bouncing the user back if the user tries to pan
            // outside the view. To set the restriction dynamically, use
            // [`setMaxBounds`](#map-setmaxbounds) method.
            maxBounds: void 0,
            // @option renderer: Renderer = *
            // The default method for drawing vector layers on the map. `L.SVG`
            // or `L.Canvas` by default depending on browser support.
            renderer: void 0,
            // @section Animation Options
            // @option zoomAnimation: Boolean = true
            // Whether the map zoom animation is enabled. By default it's enabled
            // in all browsers that support CSS3 Transitions except Android.
            zoomAnimation: true,
            // @option zoomAnimationThreshold: Number = 4
            // Won't animate zoom if the zoom difference exceeds this value.
            zoomAnimationThreshold: 4,
            // @option fadeAnimation: Boolean = true
            // Whether the tile fade animation is enabled. By default it's enabled
            // in all browsers that support CSS3 Transitions except Android.
            fadeAnimation: true,
            // @option markerZoomAnimation: Boolean = true
            // Whether markers animate their zoom with the zoom animation, if disabled
            // they will disappear for the length of the animation. By default it's
            // enabled in all browsers that support CSS3 Transitions except Android.
            markerZoomAnimation: true,
            // @option transform3DLimit: Number = 2^23
            // Defines the maximum size of a CSS translation transform. The default
            // value should not be changed unless a web browser positions layers in
            // the wrong place after doing a large `panBy`.
            transform3DLimit: 8388608,
            // Precision limit of a 32-bit float
            // @section Interaction Options
            // @option zoomSnap: Number = 1
            // Forces the map's zoom level to always be a multiple of this, particularly
            // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
            // By default, the zoom level snaps to the nearest integer; lower values
            // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
            // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
            zoomSnap: 1,
            // @option zoomDelta: Number = 1
            // Controls how much the map's zoom level will change after a
            // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
            // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
            // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
            zoomDelta: 1,
            // @option trackResize: Boolean = true
            // Whether the map automatically handles browser window resize to update itself.
            trackResize: true
          },
          initialize: function(id, options) {
            options = setOptions(this, options);
            this._handlers = [];
            this._layers = {};
            this._zoomBoundLayers = {};
            this._sizeChanged = true;
            this._initContainer(id);
            this._initLayout();
            this._onResize = bind2(this._onResize, this);
            this._initEvents();
            if (options.maxBounds) {
              this.setMaxBounds(options.maxBounds);
            }
            if (options.zoom !== void 0) {
              this._zoom = this._limitZoom(options.zoom);
            }
            if (options.center && options.zoom !== void 0) {
              this.setView(toLatLng(options.center), options.zoom, { reset: true });
            }
            this.callInitHooks();
            this._zoomAnimated = TRANSITION && Browser.any3d && !Browser.mobileOpera && this.options.zoomAnimation;
            if (this._zoomAnimated) {
              this._createAnimProxy();
              on(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
            }
            this._addLayers(this.options.layers);
          },
          // @section Methods for modifying map state
          // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
          // Sets the view of the map (geographical center and zoom) with the given
          // animation options.
          setView: function(center, zoom2, options) {
            zoom2 = zoom2 === void 0 ? this._zoom : this._limitZoom(zoom2);
            center = this._limitCenter(toLatLng(center), zoom2, this.options.maxBounds);
            options = options || {};
            this._stop();
            if (this._loaded && !options.reset && options !== true) {
              if (options.animate !== void 0) {
                options.zoom = extend({ animate: options.animate }, options.zoom);
                options.pan = extend({ animate: options.animate, duration: options.duration }, options.pan);
              }
              var moved = this._zoom !== zoom2 ? this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom2, options.zoom) : this._tryAnimatedPan(center, options.pan);
              if (moved) {
                clearTimeout(this._sizeTimer);
                return this;
              }
            }
            this._resetView(center, zoom2, options.pan && options.pan.noMoveStart);
            return this;
          },
          // @method setZoom(zoom: Number, options?: Zoom/pan options): this
          // Sets the zoom of the map.
          setZoom: function(zoom2, options) {
            if (!this._loaded) {
              this._zoom = zoom2;
              return this;
            }
            return this.setView(this.getCenter(), zoom2, { zoom: options });
          },
          // @method zoomIn(delta?: Number, options?: Zoom options): this
          // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
          zoomIn: function(delta, options) {
            delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
            return this.setZoom(this._zoom + delta, options);
          },
          // @method zoomOut(delta?: Number, options?: Zoom options): this
          // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
          zoomOut: function(delta, options) {
            delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
            return this.setZoom(this._zoom - delta, options);
          },
          // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
          // Zooms the map while keeping a specified geographical point on the map
          // stationary (e.g. used internally for scroll zoom and double-click zoom).
          // @alternative
          // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
          // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
          setZoomAround: function(latlng, zoom2, options) {
            var scale2 = this.getZoomScale(zoom2), viewHalf = this.getSize().divideBy(2), containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng), centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale2), newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));
            return this.setView(newCenter, zoom2, { zoom: options });
          },
          _getBoundsCenterZoom: function(bounds, options) {
            options = options || {};
            bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);
            var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), zoom2 = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));
            zoom2 = typeof options.maxZoom === "number" ? Math.min(options.maxZoom, zoom2) : zoom2;
            if (zoom2 === Infinity) {
              return {
                center: bounds.getCenter(),
                zoom: zoom2
              };
            }
            var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2), swPoint = this.project(bounds.getSouthWest(), zoom2), nePoint = this.project(bounds.getNorthEast(), zoom2), center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom2);
            return {
              center,
              zoom: zoom2
            };
          },
          // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
          // Sets a map view that contains the given geographical bounds with the
          // maximum zoom level possible.
          fitBounds: function(bounds, options) {
            bounds = toLatLngBounds(bounds);
            if (!bounds.isValid()) {
              throw new Error("Bounds are not valid.");
            }
            var target = this._getBoundsCenterZoom(bounds, options);
            return this.setView(target.center, target.zoom, options);
          },
          // @method fitWorld(options?: fitBounds options): this
          // Sets a map view that mostly contains the whole world with the maximum
          // zoom level possible.
          fitWorld: function(options) {
            return this.fitBounds([[-90, -180], [90, 180]], options);
          },
          // @method panTo(latlng: LatLng, options?: Pan options): this
          // Pans the map to a given center.
          panTo: function(center, options) {
            return this.setView(center, this._zoom, { pan: options });
          },
          // @method panBy(offset: Point, options?: Pan options): this
          // Pans the map by a given number of pixels (animated).
          panBy: function(offset, options) {
            offset = toPoint(offset).round();
            options = options || {};
            if (!offset.x && !offset.y) {
              return this.fire("moveend");
            }
            if (options.animate !== true && !this.getSize().contains(offset)) {
              this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
              return this;
            }
            if (!this._panAnim) {
              this._panAnim = new PosAnimation();
              this._panAnim.on({
                "step": this._onPanTransitionStep,
                "end": this._onPanTransitionEnd
              }, this);
            }
            if (!options.noMoveStart) {
              this.fire("movestart");
            }
            if (options.animate !== false) {
              addClass(this._mapPane, "leaflet-pan-anim");
              var newPos = this._getMapPanePos().subtract(offset).round();
              this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
            } else {
              this._rawPanBy(offset);
              this.fire("move").fire("moveend");
            }
            return this;
          },
          // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
          // Sets the view of the map (geographical center and zoom) performing a smooth
          // pan-zoom animation.
          flyTo: function(targetCenter, targetZoom, options) {
            options = options || {};
            if (options.animate === false || !Browser.any3d) {
              return this.setView(targetCenter, targetZoom, options);
            }
            this._stop();
            var from = this.project(this.getCenter()), to = this.project(targetCenter), size = this.getSize(), startZoom = this._zoom;
            targetCenter = toLatLng(targetCenter);
            targetZoom = targetZoom === void 0 ? startZoom : targetZoom;
            var w0 = Math.max(size.x, size.y), w1 = w0 * this.getZoomScale(startZoom, targetZoom), u1 = to.distanceTo(from) || 1, rho = 1.42, rho2 = rho * rho;
            function r(i) {
              var s1 = i ? -1 : 1, s2 = i ? w1 : w0, t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1, b1 = 2 * s2 * rho2 * u1, b = t1 / b1, sq = Math.sqrt(b * b + 1) - b;
              var log = sq < 1e-9 ? -18 : Math.log(sq);
              return log;
            }
            function sinh(n) {
              return (Math.exp(n) - Math.exp(-n)) / 2;
            }
            function cosh(n) {
              return (Math.exp(n) + Math.exp(-n)) / 2;
            }
            function tanh(n) {
              return sinh(n) / cosh(n);
            }
            var r0 = r(0);
            function w(s) {
              return w0 * (cosh(r0) / cosh(r0 + rho * s));
            }
            function u(s) {
              return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2;
            }
            function easeOut(t) {
              return 1 - Math.pow(1 - t, 1.5);
            }
            var start = Date.now(), S2 = (r(1) - r0) / rho, duration = options.duration ? 1e3 * options.duration : 1e3 * S2 * 0.8;
            function frame() {
              var t = (Date.now() - start) / duration, s = easeOut(t) * S2;
              if (t <= 1) {
                this._flyToFrame = requestAnimFrame(frame, this);
                this._move(
                  this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
                  this.getScaleZoom(w0 / w(s), startZoom),
                  { flyTo: true }
                );
              } else {
                this._move(targetCenter, targetZoom)._moveEnd(true);
              }
            }
            this._moveStart(true, options.noMoveStart);
            frame.call(this);
            return this;
          },
          // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
          // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
          // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
          flyToBounds: function(bounds, options) {
            var target = this._getBoundsCenterZoom(bounds, options);
            return this.flyTo(target.center, target.zoom, options);
          },
          // @method setMaxBounds(bounds: LatLngBounds): this
          // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
          setMaxBounds: function(bounds) {
            bounds = toLatLngBounds(bounds);
            if (this.listens("moveend", this._panInsideMaxBounds)) {
              this.off("moveend", this._panInsideMaxBounds);
            }
            if (!bounds.isValid()) {
              this.options.maxBounds = null;
              return this;
            }
            this.options.maxBounds = bounds;
            if (this._loaded) {
              this._panInsideMaxBounds();
            }
            return this.on("moveend", this._panInsideMaxBounds);
          },
          // @method setMinZoom(zoom: Number): this
          // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
          setMinZoom: function(zoom2) {
            var oldZoom = this.options.minZoom;
            this.options.minZoom = zoom2;
            if (this._loaded && oldZoom !== zoom2) {
              this.fire("zoomlevelschange");
              if (this.getZoom() < this.options.minZoom) {
                return this.setZoom(zoom2);
              }
            }
            return this;
          },
          // @method setMaxZoom(zoom: Number): this
          // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
          setMaxZoom: function(zoom2) {
            var oldZoom = this.options.maxZoom;
            this.options.maxZoom = zoom2;
            if (this._loaded && oldZoom !== zoom2) {
              this.fire("zoomlevelschange");
              if (this.getZoom() > this.options.maxZoom) {
                return this.setZoom(zoom2);
              }
            }
            return this;
          },
          // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
          // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
          panInsideBounds: function(bounds, options) {
            this._enforcingBounds = true;
            var center = this.getCenter(), newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));
            if (!center.equals(newCenter)) {
              this.panTo(newCenter, options);
            }
            this._enforcingBounds = false;
            return this;
          },
          // @method panInside(latlng: LatLng, options?: padding options): this
          // Pans the map the minimum amount to make the `latlng` visible. Use
          // padding options to fit the display to more restricted bounds.
          // If `latlng` is already within the (optionally padded) display bounds,
          // the map will not be panned.
          panInside: function(latlng, options) {
            options = options || {};
            var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), pixelCenter = this.project(this.getCenter()), pixelPoint = this.project(latlng), pixelBounds = this.getPixelBounds(), paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]), paddedSize = paddedBounds.getSize();
            if (!paddedBounds.contains(pixelPoint)) {
              this._enforcingBounds = true;
              var centerOffset = pixelPoint.subtract(paddedBounds.getCenter());
              var offset = paddedBounds.extend(pixelPoint).getSize().subtract(paddedSize);
              pixelCenter.x += centerOffset.x < 0 ? -offset.x : offset.x;
              pixelCenter.y += centerOffset.y < 0 ? -offset.y : offset.y;
              this.panTo(this.unproject(pixelCenter), options);
              this._enforcingBounds = false;
            }
            return this;
          },
          // @method invalidateSize(options: Zoom/pan options): this
          // Checks if the map container size changed and updates the map if so —
          // call it after you've changed the map size dynamically, also animating
          // pan by default. If `options.pan` is `false`, panning will not occur.
          // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
          // that it doesn't happen often even if the method is called many
          // times in a row.
          // @alternative
          // @method invalidateSize(animate: Boolean): this
          // Checks if the map container size changed and updates the map if so —
          // call it after you've changed the map size dynamically, also animating
          // pan by default.
          invalidateSize: function(options) {
            if (!this._loaded) {
              return this;
            }
            options = extend({
              animate: false,
              pan: true
            }, options === true ? { animate: true } : options);
            var oldSize = this.getSize();
            this._sizeChanged = true;
            this._lastCenter = null;
            var newSize = this.getSize(), oldCenter = oldSize.divideBy(2).round(), newCenter = newSize.divideBy(2).round(), offset = oldCenter.subtract(newCenter);
            if (!offset.x && !offset.y) {
              return this;
            }
            if (options.animate && options.pan) {
              this.panBy(offset);
            } else {
              if (options.pan) {
                this._rawPanBy(offset);
              }
              this.fire("move");
              if (options.debounceMoveend) {
                clearTimeout(this._sizeTimer);
                this._sizeTimer = setTimeout(bind2(this.fire, this, "moveend"), 200);
              } else {
                this.fire("moveend");
              }
            }
            return this.fire("resize", {
              oldSize,
              newSize
            });
          },
          // @section Methods for modifying map state
          // @method stop(): this
          // Stops the currently running `panTo` or `flyTo` animation, if any.
          stop: function() {
            this.setZoom(this._limitZoom(this._zoom));
            if (!this.options.zoomSnap) {
              this.fire("viewreset");
            }
            return this._stop();
          },
          // @section Geolocation methods
          // @method locate(options?: Locate options): this
          // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
          // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
          // and optionally sets the map view to the user's location with respect to
          // detection accuracy (or to the world view if geolocation failed).
          // Note that, if your page doesn't use HTTPS, this method will fail in
          // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
          // See `Locate options` for more details.
          locate: function(options) {
            options = this._locateOptions = extend({
              timeout: 1e4,
              watch: false
              // setView: false
              // maxZoom: <Number>
              // maximumAge: 0
              // enableHighAccuracy: false
            }, options);
            if (!("geolocation" in navigator)) {
              this._handleGeolocationError({
                code: 0,
                message: "Geolocation not supported."
              });
              return this;
            }
            var onResponse = bind2(this._handleGeolocationResponse, this), onError = bind2(this._handleGeolocationError, this);
            if (options.watch) {
              this._locationWatchId = navigator.geolocation.watchPosition(onResponse, onError, options);
            } else {
              navigator.geolocation.getCurrentPosition(onResponse, onError, options);
            }
            return this;
          },
          // @method stopLocate(): this
          // Stops watching location previously initiated by `map.locate({watch: true})`
          // and aborts resetting the map view if map.locate was called with
          // `{setView: true}`.
          stopLocate: function() {
            if (navigator.geolocation && navigator.geolocation.clearWatch) {
              navigator.geolocation.clearWatch(this._locationWatchId);
            }
            if (this._locateOptions) {
              this._locateOptions.setView = false;
            }
            return this;
          },
          _handleGeolocationError: function(error) {
            if (!this._container._leaflet_id) {
              return;
            }
            var c = error.code, message = error.message || (c === 1 ? "permission denied" : c === 2 ? "position unavailable" : "timeout");
            if (this._locateOptions.setView && !this._loaded) {
              this.fitWorld();
            }
            this.fire("locationerror", {
              code: c,
              message: "Geolocation error: " + message + "."
            });
          },
          _handleGeolocationResponse: function(pos) {
            if (!this._container._leaflet_id) {
              return;
            }
            var lat = pos.coords.latitude, lng = pos.coords.longitude, latlng = new LatLng(lat, lng), bounds = latlng.toBounds(pos.coords.accuracy * 2), options = this._locateOptions;
            if (options.setView) {
              var zoom2 = this.getBoundsZoom(bounds);
              this.setView(latlng, options.maxZoom ? Math.min(zoom2, options.maxZoom) : zoom2);
            }
            var data = {
              latlng,
              bounds,
              timestamp: pos.timestamp
            };
            for (var i in pos.coords) {
              if (typeof pos.coords[i] === "number") {
                data[i] = pos.coords[i];
              }
            }
            this.fire("locationfound", data);
          },
          // TODO Appropriate docs section?
          // @section Other Methods
          // @method addHandler(name: String, HandlerClass: Function): this
          // Adds a new `Handler` to the map, given its name and constructor function.
          addHandler: function(name, HandlerClass) {
            if (!HandlerClass) {
              return this;
            }
            var handler = this[name] = new HandlerClass(this);
            this._handlers.push(handler);
            if (this.options[name]) {
              handler.enable();
            }
            return this;
          },
          // @method remove(): this
          // Destroys the map and clears all related event listeners.
          remove: function() {
            this._initEvents(true);
            if (this.options.maxBounds) {
              this.off("moveend", this._panInsideMaxBounds);
            }
            if (this._containerId !== this._container._leaflet_id) {
              throw new Error("Map container is being reused by another instance");
            }
            try {
              delete this._container._leaflet_id;
              delete this._containerId;
            } catch (e) {
              this._container._leaflet_id = void 0;
              this._containerId = void 0;
            }
            if (this._locationWatchId !== void 0) {
              this.stopLocate();
            }
            this._stop();
            remove(this._mapPane);
            if (this._clearControlPos) {
              this._clearControlPos();
            }
            if (this._resizeRequest) {
              cancelAnimFrame(this._resizeRequest);
              this._resizeRequest = null;
            }
            this._clearHandlers();
            if (this._loaded) {
              this.fire("unload");
            }
            var i;
            for (i in this._layers) {
              this._layers[i].remove();
            }
            for (i in this._panes) {
              remove(this._panes[i]);
            }
            this._layers = [];
            this._panes = [];
            delete this._mapPane;
            delete this._renderer;
            return this;
          },
          // @section Other Methods
          // @method createPane(name: String, container?: HTMLElement): HTMLElement
          // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
          // then returns it. The pane is created as a child of `container`, or
          // as a child of the main map pane if not set.
          createPane: function(name, container) {
            var className = "leaflet-pane" + (name ? " leaflet-" + name.replace("Pane", "") + "-pane" : ""), pane = create$1("div", className, container || this._mapPane);
            if (name) {
              this._panes[name] = pane;
            }
            return pane;
          },
          // @section Methods for Getting Map State
          // @method getCenter(): LatLng
          // Returns the geographical center of the map view
          getCenter: function() {
            this._checkIfLoaded();
            if (this._lastCenter && !this._moved()) {
              return this._lastCenter.clone();
            }
            return this.layerPointToLatLng(this._getCenterLayerPoint());
          },
          // @method getZoom(): Number
          // Returns the current zoom level of the map view
          getZoom: function() {
            return this._zoom;
          },
          // @method getBounds(): LatLngBounds
          // Returns the geographical bounds visible in the current map view
          getBounds: function() {
            var bounds = this.getPixelBounds(), sw = this.unproject(bounds.getBottomLeft()), ne = this.unproject(bounds.getTopRight());
            return new LatLngBounds(sw, ne);
          },
          // @method getMinZoom(): Number
          // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
          getMinZoom: function() {
            return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
          },
          // @method getMaxZoom(): Number
          // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
          getMaxZoom: function() {
            return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
          },
          // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
          // Returns the maximum zoom level on which the given bounds fit to the map
          // view in its entirety. If `inside` (optional) is set to `true`, the method
          // instead returns the minimum zoom level on which the map view fits into
          // the given bounds in its entirety.
          getBoundsZoom: function(bounds, inside, padding) {
            bounds = toLatLngBounds(bounds);
            padding = toPoint(padding || [0, 0]);
            var zoom2 = this.getZoom() || 0, min = this.getMinZoom(), max = this.getMaxZoom(), nw = bounds.getNorthWest(), se = bounds.getSouthEast(), size = this.getSize().subtract(padding), boundsSize = toBounds(this.project(se, zoom2), this.project(nw, zoom2)).getSize(), snap = Browser.any3d ? this.options.zoomSnap : 1, scalex = size.x / boundsSize.x, scaley = size.y / boundsSize.y, scale2 = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);
            zoom2 = this.getScaleZoom(scale2, zoom2);
            if (snap) {
              zoom2 = Math.round(zoom2 / (snap / 100)) * (snap / 100);
              zoom2 = inside ? Math.ceil(zoom2 / snap) * snap : Math.floor(zoom2 / snap) * snap;
            }
            return Math.max(min, Math.min(max, zoom2));
          },
          // @method getSize(): Point
          // Returns the current size of the map container (in pixels).
          getSize: function() {
            if (!this._size || this._sizeChanged) {
              this._size = new Point(
                this._container.clientWidth || 0,
                this._container.clientHeight || 0
              );
              this._sizeChanged = false;
            }
            return this._size.clone();
          },
          // @method getPixelBounds(): Bounds
          // Returns the bounds of the current map view in projected pixel
          // coordinates (sometimes useful in layer and overlay implementations).
          getPixelBounds: function(center, zoom2) {
            var topLeftPoint = this._getTopLeftPoint(center, zoom2);
            return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
          },
          // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
          // the map pane? "left point of the map layer" can be confusing, specially
          // since there can be negative offsets.
          // @method getPixelOrigin(): Point
          // Returns the projected pixel coordinates of the top left point of
          // the map layer (useful in custom layer and overlay implementations).
          getPixelOrigin: function() {
            this._checkIfLoaded();
            return this._pixelOrigin;
          },
          // @method getPixelWorldBounds(zoom?: Number): Bounds
          // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
          // If `zoom` is omitted, the map's current zoom level is used.
          getPixelWorldBounds: function(zoom2) {
            return this.options.crs.getProjectedBounds(zoom2 === void 0 ? this.getZoom() : zoom2);
          },
          // @section Other Methods
          // @method getPane(pane: String|HTMLElement): HTMLElement
          // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
          getPane: function(pane) {
            return typeof pane === "string" ? this._panes[pane] : pane;
          },
          // @method getPanes(): Object
          // Returns a plain object containing the names of all [panes](#map-pane) as keys and
          // the panes as values.
          getPanes: function() {
            return this._panes;
          },
          // @method getContainer: HTMLElement
          // Returns the HTML element that contains the map.
          getContainer: function() {
            return this._container;
          },
          // @section Conversion Methods
          // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
          // Returns the scale factor to be applied to a map transition from zoom level
          // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
          getZoomScale: function(toZoom, fromZoom) {
            var crs = this.options.crs;
            fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
            return crs.scale(toZoom) / crs.scale(fromZoom);
          },
          // @method getScaleZoom(scale: Number, fromZoom: Number): Number
          // Returns the zoom level that the map would end up at, if it is at `fromZoom`
          // level and everything is scaled by a factor of `scale`. Inverse of
          // [`getZoomScale`](#map-getZoomScale).
          getScaleZoom: function(scale2, fromZoom) {
            var crs = this.options.crs;
            fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
            var zoom2 = crs.zoom(scale2 * crs.scale(fromZoom));
            return isNaN(zoom2) ? Infinity : zoom2;
          },
          // @method project(latlng: LatLng, zoom: Number): Point
          // Projects a geographical coordinate `LatLng` according to the projection
          // of the map's CRS, then scales it according to `zoom` and the CRS's
          // `Transformation`. The result is pixel coordinate relative to
          // the CRS origin.
          project: function(latlng, zoom2) {
            zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
            return this.options.crs.latLngToPoint(toLatLng(latlng), zoom2);
          },
          // @method unproject(point: Point, zoom: Number): LatLng
          // Inverse of [`project`](#map-project).
          unproject: function(point, zoom2) {
            zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
            return this.options.crs.pointToLatLng(toPoint(point), zoom2);
          },
          // @method layerPointToLatLng(point: Point): LatLng
          // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
          // returns the corresponding geographical coordinate (for the current zoom level).
          layerPointToLatLng: function(point) {
            var projectedPoint = toPoint(point).add(this.getPixelOrigin());
            return this.unproject(projectedPoint);
          },
          // @method latLngToLayerPoint(latlng: LatLng): Point
          // Given a geographical coordinate, returns the corresponding pixel coordinate
          // relative to the [origin pixel](#map-getpixelorigin).
          latLngToLayerPoint: function(latlng) {
            var projectedPoint = this.project(toLatLng(latlng))._round();
            return projectedPoint._subtract(this.getPixelOrigin());
          },
          // @method wrapLatLng(latlng: LatLng): LatLng
          // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
          // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
          // CRS's bounds.
          // By default this means longitude is wrapped around the dateline so its
          // value is between -180 and +180 degrees.
          wrapLatLng: function(latlng) {
            return this.options.crs.wrapLatLng(toLatLng(latlng));
          },
          // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
          // Returns a `LatLngBounds` with the same size as the given one, ensuring that
          // its center is within the CRS's bounds.
          // By default this means the center longitude is wrapped around the dateline so its
          // value is between -180 and +180 degrees, and the majority of the bounds
          // overlaps the CRS's bounds.
          wrapLatLngBounds: function(latlng) {
            return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
          },
          // @method distance(latlng1: LatLng, latlng2: LatLng): Number
          // Returns the distance between two geographical coordinates according to
          // the map's CRS. By default this measures distance in meters.
          distance: function(latlng1, latlng2) {
            return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
          },
          // @method containerPointToLayerPoint(point: Point): Point
          // Given a pixel coordinate relative to the map container, returns the corresponding
          // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
          containerPointToLayerPoint: function(point) {
            return toPoint(point).subtract(this._getMapPanePos());
          },
          // @method layerPointToContainerPoint(point: Point): Point
          // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
          // returns the corresponding pixel coordinate relative to the map container.
          layerPointToContainerPoint: function(point) {
            return toPoint(point).add(this._getMapPanePos());
          },
          // @method containerPointToLatLng(point: Point): LatLng
          // Given a pixel coordinate relative to the map container, returns
          // the corresponding geographical coordinate (for the current zoom level).
          containerPointToLatLng: function(point) {
            var layerPoint = this.containerPointToLayerPoint(toPoint(point));
            return this.layerPointToLatLng(layerPoint);
          },
          // @method latLngToContainerPoint(latlng: LatLng): Point
          // Given a geographical coordinate, returns the corresponding pixel coordinate
          // relative to the map container.
          latLngToContainerPoint: function(latlng) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
          },
          // @method mouseEventToContainerPoint(ev: MouseEvent): Point
          // Given a MouseEvent object, returns the pixel coordinate relative to the
          // map container where the event took place.
          mouseEventToContainerPoint: function(e) {
            return getMousePosition(e, this._container);
          },
          // @method mouseEventToLayerPoint(ev: MouseEvent): Point
          // Given a MouseEvent object, returns the pixel coordinate relative to
          // the [origin pixel](#map-getpixelorigin) where the event took place.
          mouseEventToLayerPoint: function(e) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
          },
          // @method mouseEventToLatLng(ev: MouseEvent): LatLng
          // Given a MouseEvent object, returns geographical coordinate where the
          // event took place.
          mouseEventToLatLng: function(e) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
          },
          // map initialization methods
          _initContainer: function(id) {
            var container = this._container = get(id);
            if (!container) {
              throw new Error("Map container not found.");
            } else if (container._leaflet_id) {
              throw new Error("Map container is already initialized.");
            }
            on(container, "scroll", this._onScroll, this);
            this._containerId = stamp(container);
          },
          _initLayout: function() {
            var container = this._container;
            this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;
            addClass(container, "leaflet-container" + (Browser.touch ? " leaflet-touch" : "") + (Browser.retina ? " leaflet-retina" : "") + (Browser.ielt9 ? " leaflet-oldie" : "") + (Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
            var position = getStyle(container, "position");
            if (position !== "absolute" && position !== "relative" && position !== "fixed" && position !== "sticky") {
              container.style.position = "relative";
            }
            this._initPanes();
            if (this._initControlPos) {
              this._initControlPos();
            }
          },
          _initPanes: function() {
            var panes = this._panes = {};
            this._paneRenderers = {};
            this._mapPane = this.createPane("mapPane", this._container);
            setPosition(this._mapPane, new Point(0, 0));
            this.createPane("tilePane");
            this.createPane("overlayPane");
            this.createPane("shadowPane");
            this.createPane("markerPane");
            this.createPane("tooltipPane");
            this.createPane("popupPane");
            if (!this.options.markerZoomAnimation) {
              addClass(panes.markerPane, "leaflet-zoom-hide");
              addClass(panes.shadowPane, "leaflet-zoom-hide");
            }
          },
          // private methods that modify map state
          // @section Map state change events
          _resetView: function(center, zoom2, noMoveStart) {
            setPosition(this._mapPane, new Point(0, 0));
            var loading = !this._loaded;
            this._loaded = true;
            zoom2 = this._limitZoom(zoom2);
            this.fire("viewprereset");
            var zoomChanged = this._zoom !== zoom2;
            this._moveStart(zoomChanged, noMoveStart)._move(center, zoom2)._moveEnd(zoomChanged);
            this.fire("viewreset");
            if (loading) {
              this.fire("load");
            }
          },
          _moveStart: function(zoomChanged, noMoveStart) {
            if (zoomChanged) {
              this.fire("zoomstart");
            }
            if (!noMoveStart) {
              this.fire("movestart");
            }
            return this;
          },
          _move: function(center, zoom2, data, supressEvent) {
            if (zoom2 === void 0) {
              zoom2 = this._zoom;
            }
            var zoomChanged = this._zoom !== zoom2;
            this._zoom = zoom2;
            this._lastCenter = center;
            this._pixelOrigin = this._getNewPixelOrigin(center);
            if (!supressEvent) {
              if (zoomChanged || data && data.pinch) {
                this.fire("zoom", data);
              }
              this.fire("move", data);
            } else if (data && data.pinch) {
              this.fire("zoom", data);
            }
            return this;
          },
          _moveEnd: function(zoomChanged) {
            if (zoomChanged) {
              this.fire("zoomend");
            }
            return this.fire("moveend");
          },
          _stop: function() {
            cancelAnimFrame(this._flyToFrame);
            if (this._panAnim) {
              this._panAnim.stop();
            }
            return this;
          },
          _rawPanBy: function(offset) {
            setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
          },
          _getZoomSpan: function() {
            return this.getMaxZoom() - this.getMinZoom();
          },
          _panInsideMaxBounds: function() {
            if (!this._enforcingBounds) {
              this.panInsideBounds(this.options.maxBounds);
            }
          },
          _checkIfLoaded: function() {
            if (!this._loaded) {
              throw new Error("Set map center and zoom first.");
            }
          },
          // DOM event handling
          // @section Interaction events
          _initEvents: function(remove2) {
            this._targets = {};
            this._targets[stamp(this._container)] = this;
            var onOff = remove2 ? off : on;
            onOff(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this);
            if (this.options.trackResize) {
              onOff(window, "resize", this._onResize, this);
            }
            if (Browser.any3d && this.options.transform3DLimit) {
              (remove2 ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
            }
          },
          _onResize: function() {
            cancelAnimFrame(this._resizeRequest);
            this._resizeRequest = requestAnimFrame(
              function() {
                this.invalidateSize({ debounceMoveend: true });
              },
              this
            );
          },
          _onScroll: function() {
            this._container.scrollTop = 0;
            this._container.scrollLeft = 0;
          },
          _onMoveEnd: function() {
            var pos = this._getMapPanePos();
            if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
              this._resetView(this.getCenter(), this.getZoom());
            }
          },
          _findEventTargets: function(e, type2) {
            var targets = [], target, isHover = type2 === "mouseout" || type2 === "mouseover", src = e.target || e.srcElement, dragging = false;
            while (src) {
              target = this._targets[stamp(src)];
              if (target && (type2 === "click" || type2 === "preclick") && this._draggableMoved(target)) {
                dragging = true;
                break;
              }
              if (target && target.listens(type2, true)) {
                if (isHover && !isExternalTarget(src, e)) {
                  break;
                }
                targets.push(target);
                if (isHover) {
                  break;
                }
              }
              if (src === this._container) {
                break;
              }
              src = src.parentNode;
            }
            if (!targets.length && !dragging && !isHover && this.listens(type2, true)) {
              targets = [this];
            }
            return targets;
          },
          _isClickDisabled: function(el) {
            while (el && el !== this._container) {
              if (el["_leaflet_disable_click"]) {
                return true;
              }
              el = el.parentNode;
            }
          },
          _handleDOMEvent: function(e) {
            var el = e.target || e.srcElement;
            if (!this._loaded || el["_leaflet_disable_events"] || e.type === "click" && this._isClickDisabled(el)) {
              return;
            }
            var type2 = e.type;
            if (type2 === "mousedown") {
              preventOutline(el);
            }
            this._fireDOMEvent(e, type2);
          },
          _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
          _fireDOMEvent: function(e, type2, canvasTargets) {
            if (e.type === "click") {
              var synth = extend({}, e);
              synth.type = "preclick";
              this._fireDOMEvent(synth, synth.type, canvasTargets);
            }
            var targets = this._findEventTargets(e, type2);
            if (canvasTargets) {
              var filtered = [];
              for (var i = 0; i < canvasTargets.length; i++) {
                if (canvasTargets[i].listens(type2, true)) {
                  filtered.push(canvasTargets[i]);
                }
              }
              targets = filtered.concat(targets);
            }
            if (!targets.length) {
              return;
            }
            if (type2 === "contextmenu") {
              preventDefault(e);
            }
            var target = targets[0];
            var data = {
              originalEvent: e
            };
            if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
              var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
              data.containerPoint = isMarker ? this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
              data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
              data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
            }
            for (i = 0; i < targets.length; i++) {
              targets[i].fire(type2, data, true);
              if (data.originalEvent._stopped || targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type2) !== -1) {
                return;
              }
            }
          },
          _draggableMoved: function(obj) {
            obj = obj.dragging && obj.dragging.enabled() ? obj : this;
            return obj.dragging && obj.dragging.moved() || this.boxZoom && this.boxZoom.moved();
          },
          _clearHandlers: function() {
            for (var i = 0, len = this._handlers.length; i < len; i++) {
              this._handlers[i].disable();
            }
          },
          // @section Other Methods
          // @method whenReady(fn: Function, context?: Object): this
          // Runs the given function `fn` when the map gets initialized with
          // a view (center and zoom) and at least one layer, or immediately
          // if it's already initialized, optionally passing a function context.
          whenReady: function(callback, context) {
            if (this._loaded) {
              callback.call(context || this, { target: this });
            } else {
              this.on("load", callback, context);
            }
            return this;
          },
          // private methods for getting map state
          _getMapPanePos: function() {
            return getPosition(this._mapPane) || new Point(0, 0);
          },
          _moved: function() {
            var pos = this._getMapPanePos();
            return pos && !pos.equals([0, 0]);
          },
          _getTopLeftPoint: function(center, zoom2) {
            var pixelOrigin = center && zoom2 !== void 0 ? this._getNewPixelOrigin(center, zoom2) : this.getPixelOrigin();
            return pixelOrigin.subtract(this._getMapPanePos());
          },
          _getNewPixelOrigin: function(center, zoom2) {
            var viewHalf = this.getSize()._divideBy(2);
            return this.project(center, zoom2)._subtract(viewHalf)._add(this._getMapPanePos())._round();
          },
          _latLngToNewLayerPoint: function(latlng, zoom2, center) {
            var topLeft = this._getNewPixelOrigin(center, zoom2);
            return this.project(latlng, zoom2)._subtract(topLeft);
          },
          _latLngBoundsToNewLayerBounds: function(latLngBounds, zoom2, center) {
            var topLeft = this._getNewPixelOrigin(center, zoom2);
            return toBounds([
              this.project(latLngBounds.getSouthWest(), zoom2)._subtract(topLeft),
              this.project(latLngBounds.getNorthWest(), zoom2)._subtract(topLeft),
              this.project(latLngBounds.getSouthEast(), zoom2)._subtract(topLeft),
              this.project(latLngBounds.getNorthEast(), zoom2)._subtract(topLeft)
            ]);
          },
          // layer point of the current center
          _getCenterLayerPoint: function() {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
          },
          // offset of the specified place to the current center in pixels
          _getCenterOffset: function(latlng) {
            return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
          },
          // adjust center for view to get inside bounds
          _limitCenter: function(center, zoom2, bounds) {
            if (!bounds) {
              return center;
            }
            var centerPoint = this.project(center, zoom2), viewHalf = this.getSize().divideBy(2), viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)), offset = this._getBoundsOffset(viewBounds, bounds, zoom2);
            if (Math.abs(offset.x) <= 1 && Math.abs(offset.y) <= 1) {
              return center;
            }
            return this.unproject(centerPoint.add(offset), zoom2);
          },
          // adjust offset for view to get inside bounds
          _limitOffset: function(offset, bounds) {
            if (!bounds) {
              return offset;
            }
            var viewBounds = this.getPixelBounds(), newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
            return offset.add(this._getBoundsOffset(newBounds, bounds));
          },
          // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
          _getBoundsOffset: function(pxBounds, maxBounds, zoom2) {
            var projectedMaxBounds = toBounds(
              this.project(maxBounds.getNorthEast(), zoom2),
              this.project(maxBounds.getSouthWest(), zoom2)
            ), minOffset = projectedMaxBounds.min.subtract(pxBounds.min), maxOffset = projectedMaxBounds.max.subtract(pxBounds.max), dx = this._rebound(minOffset.x, -maxOffset.x), dy = this._rebound(minOffset.y, -maxOffset.y);
            return new Point(dx, dy);
          },
          _rebound: function(left, right) {
            return left + right > 0 ? Math.round(left - right) / 2 : Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
          },
          _limitZoom: function(zoom2) {
            var min = this.getMinZoom(), max = this.getMaxZoom(), snap = Browser.any3d ? this.options.zoomSnap : 1;
            if (snap) {
              zoom2 = Math.round(zoom2 / snap) * snap;
            }
            return Math.max(min, Math.min(max, zoom2));
          },
          _onPanTransitionStep: function() {
            this.fire("move");
          },
          _onPanTransitionEnd: function() {
            removeClass(this._mapPane, "leaflet-pan-anim");
            this.fire("moveend");
          },
          _tryAnimatedPan: function(center, options) {
            var offset = this._getCenterOffset(center)._trunc();
            if ((options && options.animate) !== true && !this.getSize().contains(offset)) {
              return false;
            }
            this.panBy(offset, options);
            return true;
          },
          _createAnimProxy: function() {
            var proxy = this._proxy = create$1("div", "leaflet-proxy leaflet-zoom-animated");
            this._panes.mapPane.appendChild(proxy);
            this.on("zoomanim", function(e) {
              var prop = TRANSFORM, transform = this._proxy.style[prop];
              setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));
              if (transform === this._proxy.style[prop] && this._animatingZoom) {
                this._onZoomTransitionEnd();
              }
            }, this);
            this.on("load moveend", this._animMoveEnd, this);
            this._on("unload", this._destroyAnimProxy, this);
          },
          _destroyAnimProxy: function() {
            remove(this._proxy);
            this.off("load moveend", this._animMoveEnd, this);
            delete this._proxy;
          },
          _animMoveEnd: function() {
            var c = this.getCenter(), z = this.getZoom();
            setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
          },
          _catchTransitionEnd: function(e) {
            if (this._animatingZoom && e.propertyName.indexOf("transform") >= 0) {
              this._onZoomTransitionEnd();
            }
          },
          _nothingToAnimate: function() {
            return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
          },
          _tryAnimatedZoom: function(center, zoom2, options) {
            if (this._animatingZoom) {
              return true;
            }
            options = options || {};
            if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() || Math.abs(zoom2 - this._zoom) > this.options.zoomAnimationThreshold) {
              return false;
            }
            var scale2 = this.getZoomScale(zoom2), offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale2);
            if (options.animate !== true && !this.getSize().contains(offset)) {
              return false;
            }
            requestAnimFrame(function() {
              this._moveStart(true, options.noMoveStart || false)._animateZoom(center, zoom2, true);
            }, this);
            return true;
          },
          _animateZoom: function(center, zoom2, startAnim, noUpdate) {
            if (!this._mapPane) {
              return;
            }
            if (startAnim) {
              this._animatingZoom = true;
              this._animateToCenter = center;
              this._animateToZoom = zoom2;
              addClass(this._mapPane, "leaflet-zoom-anim");
            }
            this.fire("zoomanim", {
              center,
              zoom: zoom2,
              noUpdate
            });
            if (!this._tempFireZoomEvent) {
              this._tempFireZoomEvent = this._zoom !== this._animateToZoom;
            }
            this._move(this._animateToCenter, this._animateToZoom, void 0, true);
            setTimeout(bind2(this._onZoomTransitionEnd, this), 250);
          },
          _onZoomTransitionEnd: function() {
            if (!this._animatingZoom) {
              return;
            }
            if (this._mapPane) {
              removeClass(this._mapPane, "leaflet-zoom-anim");
            }
            this._animatingZoom = false;
            this._move(this._animateToCenter, this._animateToZoom, void 0, true);
            if (this._tempFireZoomEvent) {
              this.fire("zoom");
            }
            delete this._tempFireZoomEvent;
            this.fire("move");
            this._moveEnd(true);
          }
        });
        function createMap(id, options) {
          return new Map2(id, options);
        }
        var Control = Class.extend({
          // @section
          // @aka Control Options
          options: {
            // @option position: String = 'topright'
            // The position of the control (one of the map corners). Possible values are `'topleft'`,
            // `'topright'`, `'bottomleft'` or `'bottomright'`
            position: "topright"
          },
          initialize: function(options) {
            setOptions(this, options);
          },
          /* @section
           * Classes extending L.Control will inherit the following methods:
           *
           * @method getPosition: string
           * Returns the position of the control.
           */
          getPosition: function() {
            return this.options.position;
          },
          // @method setPosition(position: string): this
          // Sets the position of the control.
          setPosition: function(position) {
            var map = this._map;
            if (map) {
              map.removeControl(this);
            }
            this.options.position = position;
            if (map) {
              map.addControl(this);
            }
            return this;
          },
          // @method getContainer: HTMLElement
          // Returns the HTMLElement that contains the control.
          getContainer: function() {
            return this._container;
          },
          // @method addTo(map: Map): this
          // Adds the control to the given map.
          addTo: function(map) {
            this.remove();
            this._map = map;
            var container = this._container = this.onAdd(map), pos = this.getPosition(), corner = map._controlCorners[pos];
            addClass(container, "leaflet-control");
            if (pos.indexOf("bottom") !== -1) {
              corner.insertBefore(container, corner.firstChild);
            } else {
              corner.appendChild(container);
            }
            this._map.on("unload", this.remove, this);
            return this;
          },
          // @method remove: this
          // Removes the control from the map it is currently active on.
          remove: function() {
            if (!this._map) {
              return this;
            }
            remove(this._container);
            if (this.onRemove) {
              this.onRemove(this._map);
            }
            this._map.off("unload", this.remove, this);
            this._map = null;
            return this;
          },
          _refocusOnMap: function(e) {
            if (this._map && e && e.screenX > 0 && e.screenY > 0) {
              this._map.getContainer().focus();
            }
          }
        });
        var control = function(options) {
          return new Control(options);
        };
        Map2.include({
          // @method addControl(control: Control): this
          // Adds the given control to the map
          addControl: function(control2) {
            control2.addTo(this);
            return this;
          },
          // @method removeControl(control: Control): this
          // Removes the given control from the map
          removeControl: function(control2) {
            control2.remove();
            return this;
          },
          _initControlPos: function() {
            var corners = this._controlCorners = {}, l2 = "leaflet-", container = this._controlContainer = create$1("div", l2 + "control-container", this._container);
            function createCorner(vSide, hSide) {
              var className = l2 + vSide + " " + l2 + hSide;
              corners[vSide + hSide] = create$1("div", className, container);
            }
            createCorner("top", "left");
            createCorner("top", "right");
            createCorner("bottom", "left");
            createCorner("bottom", "right");
          },
          _clearControlPos: function() {
            for (var i in this._controlCorners) {
              remove(this._controlCorners[i]);
            }
            remove(this._controlContainer);
            delete this._controlCorners;
            delete this._controlContainer;
          }
        });
        var Layers = Control.extend({
          // @section
          // @aka Control.Layers options
          options: {
            // @option collapsed: Boolean = true
            // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
            collapsed: true,
            position: "topright",
            // @option autoZIndex: Boolean = true
            // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
            autoZIndex: true,
            // @option hideSingleBase: Boolean = false
            // If `true`, the base layers in the control will be hidden when there is only one.
            hideSingleBase: false,
            // @option sortLayers: Boolean = false
            // Whether to sort the layers. When `false`, layers will keep the order
            // in which they were added to the control.
            sortLayers: false,
            // @option sortFunction: Function = *
            // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
            // that will be used for sorting the layers, when `sortLayers` is `true`.
            // The function receives both the `L.Layer` instances and their names, as in
            // `sortFunction(layerA, layerB, nameA, nameB)`.
            // By default, it sorts layers alphabetically by their name.
            sortFunction: function(layerA, layerB, nameA, nameB) {
              return nameA < nameB ? -1 : nameB < nameA ? 1 : 0;
            }
          },
          initialize: function(baseLayers, overlays, options) {
            setOptions(this, options);
            this._layerControlInputs = [];
            this._layers = [];
            this._lastZIndex = 0;
            this._handlingClick = false;
            this._preventClick = false;
            for (var i in baseLayers) {
              this._addLayer(baseLayers[i], i);
            }
            for (i in overlays) {
              this._addLayer(overlays[i], i, true);
            }
          },
          onAdd: function(map) {
            this._initLayout();
            this._update();
            this._map = map;
            map.on("zoomend", this._checkDisabledLayers, this);
            for (var i = 0; i < this._layers.length; i++) {
              this._layers[i].layer.on("add remove", this._onLayerChange, this);
            }
            return this._container;
          },
          addTo: function(map) {
            Control.prototype.addTo.call(this, map);
            return this._expandIfNotCollapsed();
          },
          onRemove: function() {
            this._map.off("zoomend", this._checkDisabledLayers, this);
            for (var i = 0; i < this._layers.length; i++) {
              this._layers[i].layer.off("add remove", this._onLayerChange, this);
            }
          },
          // @method addBaseLayer(layer: Layer, name: String): this
          // Adds a base layer (radio button entry) with the given name to the control.
          addBaseLayer: function(layer, name) {
            this._addLayer(layer, name);
            return this._map ? this._update() : this;
          },
          // @method addOverlay(layer: Layer, name: String): this
          // Adds an overlay (checkbox entry) with the given name to the control.
          addOverlay: function(layer, name) {
            this._addLayer(layer, name, true);
            return this._map ? this._update() : this;
          },
          // @method removeLayer(layer: Layer): this
          // Remove the given layer from the control.
          removeLayer: function(layer) {
            layer.off("add remove", this._onLayerChange, this);
            var obj = this._getLayer(stamp(layer));
            if (obj) {
              this._layers.splice(this._layers.indexOf(obj), 1);
            }
            return this._map ? this._update() : this;
          },
          // @method expand(): this
          // Expand the control container if collapsed.
          expand: function() {
            addClass(this._container, "leaflet-control-layers-expanded");
            this._section.style.height = null;
            var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
            if (acceptableHeight < this._section.clientHeight) {
              addClass(this._section, "leaflet-control-layers-scrollbar");
              this._section.style.height = acceptableHeight + "px";
            } else {
              removeClass(this._section, "leaflet-control-layers-scrollbar");
            }
            this._checkDisabledLayers();
            return this;
          },
          // @method collapse(): this
          // Collapse the control container if expanded.
          collapse: function() {
            removeClass(this._container, "leaflet-control-layers-expanded");
            return this;
          },
          _initLayout: function() {
            var className = "leaflet-control-layers", container = this._container = create$1("div", className), collapsed = this.options.collapsed;
            container.setAttribute("aria-haspopup", true);
            disableClickPropagation(container);
            disableScrollPropagation(container);
            var section = this._section = create$1("section", className + "-list");
            if (collapsed) {
              this._map.on("click", this.collapse, this);
              on(container, {
                mouseenter: this._expandSafely,
                mouseleave: this.collapse
              }, this);
            }
            var link = this._layersLink = create$1("a", className + "-toggle", container);
            link.href = "#";
            link.title = "Layers";
            link.setAttribute("role", "button");
            on(link, {
              keydown: function(e) {
                if (e.keyCode === 13) {
                  this._expandSafely();
                }
              },
              // Certain screen readers intercept the key event and instead send a click event
              click: function(e) {
                preventDefault(e);
                this._expandSafely();
              }
            }, this);
            if (!collapsed) {
              this.expand();
            }
            this._baseLayersList = create$1("div", className + "-base", section);
            this._separator = create$1("div", className + "-separator", section);
            this._overlaysList = create$1("div", className + "-overlays", section);
            container.appendChild(section);
          },
          _getLayer: function(id) {
            for (var i = 0; i < this._layers.length; i++) {
              if (this._layers[i] && stamp(this._layers[i].layer) === id) {
                return this._layers[i];
              }
            }
          },
          _addLayer: function(layer, name, overlay) {
            if (this._map) {
              layer.on("add remove", this._onLayerChange, this);
            }
            this._layers.push({
              layer,
              name,
              overlay
            });
            if (this.options.sortLayers) {
              this._layers.sort(bind2(function(a, b) {
                return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
              }, this));
            }
            if (this.options.autoZIndex && layer.setZIndex) {
              this._lastZIndex++;
              layer.setZIndex(this._lastZIndex);
            }
            this._expandIfNotCollapsed();
          },
          _update: function() {
            if (!this._container) {
              return this;
            }
            empty2(this._baseLayersList);
            empty2(this._overlaysList);
            this._layerControlInputs = [];
            var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;
            for (i = 0; i < this._layers.length; i++) {
              obj = this._layers[i];
              this._addItem(obj);
              overlaysPresent = overlaysPresent || obj.overlay;
              baseLayersPresent = baseLayersPresent || !obj.overlay;
              baseLayersCount += !obj.overlay ? 1 : 0;
            }
            if (this.options.hideSingleBase) {
              baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
              this._baseLayersList.style.display = baseLayersPresent ? "" : "none";
            }
            this._separator.style.display = overlaysPresent && baseLayersPresent ? "" : "none";
            return this;
          },
          _onLayerChange: function(e) {
            if (!this._handlingClick) {
              this._update();
            }
            var obj = this._getLayer(stamp(e.target));
            var type2 = obj.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
            if (type2) {
              this._map.fire(type2, obj);
            }
          },
          // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
          _createRadioElement: function(name, checked) {
            var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"' + (checked ? ' checked="checked"' : "") + "/>";
            var radioFragment = document.createElement("div");
            radioFragment.innerHTML = radioHtml;
            return radioFragment.firstChild;
          },
          _addItem: function(obj) {
            var label = document.createElement("label"), checked = this._map.hasLayer(obj.layer), input;
            if (obj.overlay) {
              input = document.createElement("input");
              input.type = "checkbox";
              input.className = "leaflet-control-layers-selector";
              input.defaultChecked = checked;
            } else {
              input = this._createRadioElement("leaflet-base-layers_" + stamp(this), checked);
            }
            this._layerControlInputs.push(input);
            input.layerId = stamp(obj.layer);
            on(input, "click", this._onInputClick, this);
            var name = document.createElement("span");
            name.innerHTML = " " + obj.name;
            var holder = document.createElement("span");
            label.appendChild(holder);
            holder.appendChild(input);
            holder.appendChild(name);
            var container = obj.overlay ? this._overlaysList : this._baseLayersList;
            container.appendChild(label);
            this._checkDisabledLayers();
            return label;
          },
          _onInputClick: function() {
            if (this._preventClick) {
              return;
            }
            var inputs = this._layerControlInputs, input, layer;
            var addedLayers = [], removedLayers = [];
            this._handlingClick = true;
            for (var i = inputs.length - 1; i >= 0; i--) {
              input = inputs[i];
              layer = this._getLayer(input.layerId).layer;
              if (input.checked) {
                addedLayers.push(layer);
              } else if (!input.checked) {
                removedLayers.push(layer);
              }
            }
            for (i = 0; i < removedLayers.length; i++) {
              if (this._map.hasLayer(removedLayers[i])) {
                this._map.removeLayer(removedLayers[i]);
              }
            }
            for (i = 0; i < addedLayers.length; i++) {
              if (!this._map.hasLayer(addedLayers[i])) {
                this._map.addLayer(addedLayers[i]);
              }
            }
            this._handlingClick = false;
            this._refocusOnMap();
          },
          _checkDisabledLayers: function() {
            var inputs = this._layerControlInputs, input, layer, zoom2 = this._map.getZoom();
            for (var i = inputs.length - 1; i >= 0; i--) {
              input = inputs[i];
              layer = this._getLayer(input.layerId).layer;
              input.disabled = layer.options.minZoom !== void 0 && zoom2 < layer.options.minZoom || layer.options.maxZoom !== void 0 && zoom2 > layer.options.maxZoom;
            }
          },
          _expandIfNotCollapsed: function() {
            if (this._map && !this.options.collapsed) {
              this.expand();
            }
            return this;
          },
          _expandSafely: function() {
            var section = this._section;
            this._preventClick = true;
            on(section, "click", preventDefault);
            this.expand();
            var that = this;
            setTimeout(function() {
              off(section, "click", preventDefault);
              that._preventClick = false;
            });
          }
        });
        var layers = function(baseLayers, overlays, options) {
          return new Layers(baseLayers, overlays, options);
        };
        var Zoom = Control.extend({
          // @section
          // @aka Control.Zoom options
          options: {
            position: "topleft",
            // @option zoomInText: String = '<span aria-hidden="true">+</span>'
            // The text set on the 'zoom in' button.
            zoomInText: '<span aria-hidden="true">+</span>',
            // @option zoomInTitle: String = 'Zoom in'
            // The title set on the 'zoom in' button.
            zoomInTitle: "Zoom in",
            // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
            // The text set on the 'zoom out' button.
            zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
            // @option zoomOutTitle: String = 'Zoom out'
            // The title set on the 'zoom out' button.
            zoomOutTitle: "Zoom out"
          },
          onAdd: function(map) {
            var zoomName = "leaflet-control-zoom", container = create$1("div", zoomName + " leaflet-bar"), options = this.options;
            this._zoomInButton = this._createButton(
              options.zoomInText,
              options.zoomInTitle,
              zoomName + "-in",
              container,
              this._zoomIn
            );
            this._zoomOutButton = this._createButton(
              options.zoomOutText,
              options.zoomOutTitle,
              zoomName + "-out",
              container,
              this._zoomOut
            );
            this._updateDisabled();
            map.on("zoomend zoomlevelschange", this._updateDisabled, this);
            return container;
          },
          onRemove: function(map) {
            map.off("zoomend zoomlevelschange", this._updateDisabled, this);
          },
          disable: function() {
            this._disabled = true;
            this._updateDisabled();
            return this;
          },
          enable: function() {
            this._disabled = false;
            this._updateDisabled();
            return this;
          },
          _zoomIn: function(e) {
            if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
              this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
            }
          },
          _zoomOut: function(e) {
            if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
              this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
            }
          },
          _createButton: function(html, title, className, container, fn) {
            var link = create$1("a", className, container);
            link.innerHTML = html;
            link.href = "#";
            link.title = title;
            link.setAttribute("role", "button");
            link.setAttribute("aria-label", title);
            disableClickPropagation(link);
            on(link, "click", stop);
            on(link, "click", fn, this);
            on(link, "click", this._refocusOnMap, this);
            return link;
          },
          _updateDisabled: function() {
            var map = this._map, className = "leaflet-disabled";
            removeClass(this._zoomInButton, className);
            removeClass(this._zoomOutButton, className);
            this._zoomInButton.setAttribute("aria-disabled", "false");
            this._zoomOutButton.setAttribute("aria-disabled", "false");
            if (this._disabled || map._zoom === map.getMinZoom()) {
              addClass(this._zoomOutButton, className);
              this._zoomOutButton.setAttribute("aria-disabled", "true");
            }
            if (this._disabled || map._zoom === map.getMaxZoom()) {
              addClass(this._zoomInButton, className);
              this._zoomInButton.setAttribute("aria-disabled", "true");
            }
          }
        });
        Map2.mergeOptions({
          zoomControl: true
        });
        Map2.addInitHook(function() {
          if (this.options.zoomControl) {
            this.zoomControl = new Zoom();
            this.addControl(this.zoomControl);
          }
        });
        var zoom = function(options) {
          return new Zoom(options);
        };
        var Scale = Control.extend({
          // @section
          // @aka Control.Scale options
          options: {
            position: "bottomleft",
            // @option maxWidth: Number = 100
            // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
            maxWidth: 100,
            // @option metric: Boolean = True
            // Whether to show the metric scale line (m/km).
            metric: true,
            // @option imperial: Boolean = True
            // Whether to show the imperial scale line (mi/ft).
            imperial: true
            // @option updateWhenIdle: Boolean = false
            // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
          },
          onAdd: function(map) {
            var className = "leaflet-control-scale", container = create$1("div", className), options = this.options;
            this._addScales(options, className + "-line", container);
            map.on(options.updateWhenIdle ? "moveend" : "move", this._update, this);
            map.whenReady(this._update, this);
            return container;
          },
          onRemove: function(map) {
            map.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
          },
          _addScales: function(options, className, container) {
            if (options.metric) {
              this._mScale = create$1("div", className, container);
            }
            if (options.imperial) {
              this._iScale = create$1("div", className, container);
            }
          },
          _update: function() {
            var map = this._map, y = map.getSize().y / 2;
            var maxMeters = map.distance(
              map.containerPointToLatLng([0, y]),
              map.containerPointToLatLng([this.options.maxWidth, y])
            );
            this._updateScales(maxMeters);
          },
          _updateScales: function(maxMeters) {
            if (this.options.metric && maxMeters) {
              this._updateMetric(maxMeters);
            }
            if (this.options.imperial && maxMeters) {
              this._updateImperial(maxMeters);
            }
          },
          _updateMetric: function(maxMeters) {
            var meters = this._getRoundNum(maxMeters), label = meters < 1e3 ? meters + " m" : meters / 1e3 + " km";
            this._updateScale(this._mScale, label, meters / maxMeters);
          },
          _updateImperial: function(maxMeters) {
            var maxFeet = maxMeters * 3.2808399, maxMiles, miles, feet;
            if (maxFeet > 5280) {
              maxMiles = maxFeet / 5280;
              miles = this._getRoundNum(maxMiles);
              this._updateScale(this._iScale, miles + " mi", miles / maxMiles);
            } else {
              feet = this._getRoundNum(maxFeet);
              this._updateScale(this._iScale, feet + " ft", feet / maxFeet);
            }
          },
          _updateScale: function(scale2, text2, ratio) {
            scale2.style.width = Math.round(this.options.maxWidth * ratio) + "px";
            scale2.innerHTML = text2;
          },
          _getRoundNum: function(num) {
            var pow10 = Math.pow(10, (Math.floor(num) + "").length - 1), d = num / pow10;
            d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;
            return pow10 * d;
          }
        });
        var scale = function(options) {
          return new Scale(options);
        };
        var ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';
        var Attribution = Control.extend({
          // @section
          // @aka Control.Attribution options
          options: {
            position: "bottomright",
            // @option prefix: String|false = 'Leaflet'
            // The HTML text shown before the attributions. Pass `false` to disable.
            prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Browser.inlineSvg ? ukrainianFlag + " " : "") + "Leaflet</a>"
          },
          initialize: function(options) {
            setOptions(this, options);
            this._attributions = {};
          },
          onAdd: function(map) {
            map.attributionControl = this;
            this._container = create$1("div", "leaflet-control-attribution");
            disableClickPropagation(this._container);
            for (var i in map._layers) {
              if (map._layers[i].getAttribution) {
                this.addAttribution(map._layers[i].getAttribution());
              }
            }
            this._update();
            map.on("layeradd", this._addAttribution, this);
            return this._container;
          },
          onRemove: function(map) {
            map.off("layeradd", this._addAttribution, this);
          },
          _addAttribution: function(ev) {
            if (ev.layer.getAttribution) {
              this.addAttribution(ev.layer.getAttribution());
              ev.layer.once("remove", function() {
                this.removeAttribution(ev.layer.getAttribution());
              }, this);
            }
          },
          // @method setPrefix(prefix: String|false): this
          // The HTML text shown before the attributions. Pass `false` to disable.
          setPrefix: function(prefix) {
            this.options.prefix = prefix;
            this._update();
            return this;
          },
          // @method addAttribution(text: String): this
          // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
          addAttribution: function(text2) {
            if (!text2) {
              return this;
            }
            if (!this._attributions[text2]) {
              this._attributions[text2] = 0;
            }
            this._attributions[text2]++;
            this._update();
            return this;
          },
          // @method removeAttribution(text: String): this
          // Removes an attribution text.
          removeAttribution: function(text2) {
            if (!text2) {
              return this;
            }
            if (this._attributions[text2]) {
              this._attributions[text2]--;
              this._update();
            }
            return this;
          },
          _update: function() {
            if (!this._map) {
              return;
            }
            var attribs = [];
            for (var i in this._attributions) {
              if (this._attributions[i]) {
                attribs.push(i);
              }
            }
            var prefixAndAttribs = [];
            if (this.options.prefix) {
              prefixAndAttribs.push(this.options.prefix);
            }
            if (attribs.length) {
              prefixAndAttribs.push(attribs.join(", "));
            }
            this._container.innerHTML = prefixAndAttribs.join(' <span aria-hidden="true">|</span> ');
          }
        });
        Map2.mergeOptions({
          attributionControl: true
        });
        Map2.addInitHook(function() {
          if (this.options.attributionControl) {
            new Attribution().addTo(this);
          }
        });
        var attribution = function(options) {
          return new Attribution(options);
        };
        Control.Layers = Layers;
        Control.Zoom = Zoom;
        Control.Scale = Scale;
        Control.Attribution = Attribution;
        control.layers = layers;
        control.zoom = zoom;
        control.scale = scale;
        control.attribution = attribution;
        var Handler = Class.extend({
          initialize: function(map) {
            this._map = map;
          },
          // @method enable(): this
          // Enables the handler
          enable: function() {
            if (this._enabled) {
              return this;
            }
            this._enabled = true;
            this.addHooks();
            return this;
          },
          // @method disable(): this
          // Disables the handler
          disable: function() {
            if (!this._enabled) {
              return this;
            }
            this._enabled = false;
            this.removeHooks();
            return this;
          },
          // @method enabled(): Boolean
          // Returns `true` if the handler is enabled
          enabled: function() {
            return !!this._enabled;
          }
          // @section Extension methods
          // Classes inheriting from `Handler` must implement the two following methods:
          // @method addHooks()
          // Called when the handler is enabled, should add event hooks.
          // @method removeHooks()
          // Called when the handler is disabled, should remove the event hooks added previously.
        });
        Handler.addTo = function(map, name) {
          map.addHandler(name, this);
          return this;
        };
        var Mixin = { Events };
        var START = Browser.touch ? "touchstart mousedown" : "mousedown";
        var Draggable = Evented.extend({
          options: {
            // @section
            // @aka Draggable options
            // @option clickTolerance: Number = 3
            // The max number of pixels a user can shift the mouse pointer during a click
            // for it to be considered a valid click (as opposed to a mouse drag).
            clickTolerance: 3
          },
          // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
          // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
          initialize: function(element2, dragStartTarget, preventOutline2, options) {
            setOptions(this, options);
            this._element = element2;
            this._dragStartTarget = dragStartTarget || element2;
            this._preventOutline = preventOutline2;
          },
          // @method enable()
          // Enables the dragging ability
          enable: function() {
            if (this._enabled) {
              return;
            }
            on(this._dragStartTarget, START, this._onDown, this);
            this._enabled = true;
          },
          // @method disable()
          // Disables the dragging ability
          disable: function() {
            if (!this._enabled) {
              return;
            }
            if (Draggable._dragging === this) {
              this.finishDrag(true);
            }
            off(this._dragStartTarget, START, this._onDown, this);
            this._enabled = false;
            this._moved = false;
          },
          _onDown: function(e) {
            if (!this._enabled) {
              return;
            }
            this._moved = false;
            if (hasClass(this._element, "leaflet-zoom-anim")) {
              return;
            }
            if (e.touches && e.touches.length !== 1) {
              if (Draggable._dragging === this) {
                this.finishDrag();
              }
              return;
            }
            if (Draggable._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) {
              return;
            }
            Draggable._dragging = this;
            if (this._preventOutline) {
              preventOutline(this._element);
            }
            disableImageDrag();
            disableTextSelection();
            if (this._moving) {
              return;
            }
            this.fire("down");
            var first = e.touches ? e.touches[0] : e, sizedParent = getSizedParentNode(this._element);
            this._startPoint = new Point(first.clientX, first.clientY);
            this._startPos = getPosition(this._element);
            this._parentScale = getScale(sizedParent);
            var mouseevent = e.type === "mousedown";
            on(document, mouseevent ? "mousemove" : "touchmove", this._onMove, this);
            on(document, mouseevent ? "mouseup" : "touchend touchcancel", this._onUp, this);
          },
          _onMove: function(e) {
            if (!this._enabled) {
              return;
            }
            if (e.touches && e.touches.length > 1) {
              this._moved = true;
              return;
            }
            var first = e.touches && e.touches.length === 1 ? e.touches[0] : e, offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);
            if (!offset.x && !offset.y) {
              return;
            }
            if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) {
              return;
            }
            offset.x /= this._parentScale.x;
            offset.y /= this._parentScale.y;
            preventDefault(e);
            if (!this._moved) {
              this.fire("dragstart");
              this._moved = true;
              addClass(document.body, "leaflet-dragging");
              this._lastTarget = e.target || e.srcElement;
              if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
                this._lastTarget = this._lastTarget.correspondingUseElement;
              }
              addClass(this._lastTarget, "leaflet-drag-target");
            }
            this._newPos = this._startPos.add(offset);
            this._moving = true;
            this._lastEvent = e;
            this._updatePosition();
          },
          _updatePosition: function() {
            var e = { originalEvent: this._lastEvent };
            this.fire("predrag", e);
            setPosition(this._element, this._newPos);
            this.fire("drag", e);
          },
          _onUp: function() {
            if (!this._enabled) {
              return;
            }
            this.finishDrag();
          },
          finishDrag: function(noInertia) {
            removeClass(document.body, "leaflet-dragging");
            if (this._lastTarget) {
              removeClass(this._lastTarget, "leaflet-drag-target");
              this._lastTarget = null;
            }
            off(document, "mousemove touchmove", this._onMove, this);
            off(document, "mouseup touchend touchcancel", this._onUp, this);
            enableImageDrag();
            enableTextSelection();
            var fireDragend = this._moved && this._moving;
            this._moving = false;
            Draggable._dragging = false;
            if (fireDragend) {
              this.fire("dragend", {
                noInertia,
                distance: this._newPos.distanceTo(this._startPos)
              });
            }
          }
        });
        function clipPolygon(points, bounds, round) {
          var clippedPoints, edges = [1, 4, 2, 8], i, j, k2, a, b, len, edge2, p;
          for (i = 0, len = points.length; i < len; i++) {
            points[i]._code = _getBitCode(points[i], bounds);
          }
          for (k2 = 0; k2 < 4; k2++) {
            edge2 = edges[k2];
            clippedPoints = [];
            for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
              a = points[i];
              b = points[j];
              if (!(a._code & edge2)) {
                if (b._code & edge2) {
                  p = _getEdgeIntersection(b, a, edge2, bounds, round);
                  p._code = _getBitCode(p, bounds);
                  clippedPoints.push(p);
                }
                clippedPoints.push(a);
              } else if (!(b._code & edge2)) {
                p = _getEdgeIntersection(b, a, edge2, bounds, round);
                p._code = _getBitCode(p, bounds);
                clippedPoints.push(p);
              }
            }
            points = clippedPoints;
          }
          return points;
        }
        function polygonCenter(latlngs, crs) {
          var i, j, p1, p2, f2, area, x2, y, center;
          if (!latlngs || latlngs.length === 0) {
            throw new Error("latlngs not passed");
          }
          if (!isFlat(latlngs)) {
            console.warn("latlngs are not flat! Only the first ring will be used");
            latlngs = latlngs[0];
          }
          var centroidLatLng = toLatLng([0, 0]);
          var bounds = toLatLngBounds(latlngs);
          var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
          if (areaBounds < 1700) {
            centroidLatLng = centroid(latlngs);
          }
          var len = latlngs.length;
          var points = [];
          for (i = 0; i < len; i++) {
            var latlng = toLatLng(latlngs[i]);
            points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
          }
          area = x2 = y = 0;
          for (i = 0, j = len - 1; i < len; j = i++) {
            p1 = points[i];
            p2 = points[j];
            f2 = p1.y * p2.x - p2.y * p1.x;
            x2 += (p1.x + p2.x) * f2;
            y += (p1.y + p2.y) * f2;
            area += f2 * 3;
          }
          if (area === 0) {
            center = points[0];
          } else {
            center = [x2 / area, y / area];
          }
          var latlngCenter = crs.unproject(toPoint(center));
          return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
        }
        function centroid(coords) {
          var latSum = 0;
          var lngSum = 0;
          var len = 0;
          for (var i = 0; i < coords.length; i++) {
            var latlng = toLatLng(coords[i]);
            latSum += latlng.lat;
            lngSum += latlng.lng;
            len++;
          }
          return toLatLng([latSum / len, lngSum / len]);
        }
        var PolyUtil = {
          __proto__: null,
          clipPolygon,
          polygonCenter,
          centroid
        };
        function simplify(points, tolerance) {
          if (!tolerance || !points.length) {
            return points.slice();
          }
          var sqTolerance = tolerance * tolerance;
          points = _reducePoints(points, sqTolerance);
          points = _simplifyDP(points, sqTolerance);
          return points;
        }
        function pointToSegmentDistance(p, p1, p2) {
          return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
        }
        function closestPointOnSegment(p, p1, p2) {
          return _sqClosestPointOnSegment(p, p1, p2);
        }
        function _simplifyDP(points, sqTolerance) {
          var len = points.length, ArrayConstructor = typeof Uint8Array !== "undefined" ? Uint8Array : Array, markers = new ArrayConstructor(len);
          markers[0] = markers[len - 1] = 1;
          _simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
          var i, newPoints = [];
          for (i = 0; i < len; i++) {
            if (markers[i]) {
              newPoints.push(points[i]);
            }
          }
          return newPoints;
        }
        function _simplifyDPStep(points, markers, sqTolerance, first, last) {
          var maxSqDist = 0, index2, i, sqDist;
          for (i = first + 1; i <= last - 1; i++) {
            sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);
            if (sqDist > maxSqDist) {
              index2 = i;
              maxSqDist = sqDist;
            }
          }
          if (maxSqDist > sqTolerance) {
            markers[index2] = 1;
            _simplifyDPStep(points, markers, sqTolerance, first, index2);
            _simplifyDPStep(points, markers, sqTolerance, index2, last);
          }
        }
        function _reducePoints(points, sqTolerance) {
          var reducedPoints = [points[0]];
          for (var i = 1, prev = 0, len = points.length; i < len; i++) {
            if (_sqDist(points[i], points[prev]) > sqTolerance) {
              reducedPoints.push(points[i]);
              prev = i;
            }
          }
          if (prev < len - 1) {
            reducedPoints.push(points[len - 1]);
          }
          return reducedPoints;
        }
        var _lastCode;
        function clipSegment(a, b, bounds, useLastCode, round) {
          var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds), codeB = _getBitCode(b, bounds), codeOut, p, newCode;
          _lastCode = codeB;
          while (true) {
            if (!(codeA | codeB)) {
              return [a, b];
            }
            if (codeA & codeB) {
              return false;
            }
            codeOut = codeA || codeB;
            p = _getEdgeIntersection(a, b, codeOut, bounds, round);
            newCode = _getBitCode(p, bounds);
            if (codeOut === codeA) {
              a = p;
              codeA = newCode;
            } else {
              b = p;
              codeB = newCode;
            }
          }
        }
        function _getEdgeIntersection(a, b, code, bounds, round) {
          var dx = b.x - a.x, dy = b.y - a.y, min = bounds.min, max = bounds.max, x2, y;
          if (code & 8) {
            x2 = a.x + dx * (max.y - a.y) / dy;
            y = max.y;
          } else if (code & 4) {
            x2 = a.x + dx * (min.y - a.y) / dy;
            y = min.y;
          } else if (code & 2) {
            x2 = max.x;
            y = a.y + dy * (max.x - a.x) / dx;
          } else if (code & 1) {
            x2 = min.x;
            y = a.y + dy * (min.x - a.x) / dx;
          }
          return new Point(x2, y, round);
        }
        function _getBitCode(p, bounds) {
          var code = 0;
          if (p.x < bounds.min.x) {
            code |= 1;
          } else if (p.x > bounds.max.x) {
            code |= 2;
          }
          if (p.y < bounds.min.y) {
            code |= 4;
          } else if (p.y > bounds.max.y) {
            code |= 8;
          }
          return code;
        }
        function _sqDist(p1, p2) {
          var dx = p2.x - p1.x, dy = p2.y - p1.y;
          return dx * dx + dy * dy;
        }
        function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
          var x2 = p1.x, y = p1.y, dx = p2.x - x2, dy = p2.y - y, dot = dx * dx + dy * dy, t;
          if (dot > 0) {
            t = ((p.x - x2) * dx + (p.y - y) * dy) / dot;
            if (t > 1) {
              x2 = p2.x;
              y = p2.y;
            } else if (t > 0) {
              x2 += dx * t;
              y += dy * t;
            }
          }
          dx = p.x - x2;
          dy = p.y - y;
          return sqDist ? dx * dx + dy * dy : new Point(x2, y);
        }
        function isFlat(latlngs) {
          return !isArray(latlngs[0]) || typeof latlngs[0][0] !== "object" && typeof latlngs[0][0] !== "undefined";
        }
        function _flat(latlngs) {
          console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead.");
          return isFlat(latlngs);
        }
        function polylineCenter(latlngs, crs) {
          var i, halfDist, segDist, dist, p1, p2, ratio, center;
          if (!latlngs || latlngs.length === 0) {
            throw new Error("latlngs not passed");
          }
          if (!isFlat(latlngs)) {
            console.warn("latlngs are not flat! Only the first ring will be used");
            latlngs = latlngs[0];
          }
          var centroidLatLng = toLatLng([0, 0]);
          var bounds = toLatLngBounds(latlngs);
          var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
          if (areaBounds < 1700) {
            centroidLatLng = centroid(latlngs);
          }
          var len = latlngs.length;
          var points = [];
          for (i = 0; i < len; i++) {
            var latlng = toLatLng(latlngs[i]);
            points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
          }
          for (i = 0, halfDist = 0; i < len - 1; i++) {
            halfDist += points[i].distanceTo(points[i + 1]) / 2;
          }
          if (halfDist === 0) {
            center = points[0];
          } else {
            for (i = 0, dist = 0; i < len - 1; i++) {
              p1 = points[i];
              p2 = points[i + 1];
              segDist = p1.distanceTo(p2);
              dist += segDist;
              if (dist > halfDist) {
                ratio = (dist - halfDist) / segDist;
                center = [
                  p2.x - ratio * (p2.x - p1.x),
                  p2.y - ratio * (p2.y - p1.y)
                ];
                break;
              }
            }
          }
          var latlngCenter = crs.unproject(toPoint(center));
          return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
        }
        var LineUtil = {
          __proto__: null,
          simplify,
          pointToSegmentDistance,
          closestPointOnSegment,
          clipSegment,
          _getEdgeIntersection,
          _getBitCode,
          _sqClosestPointOnSegment,
          isFlat,
          _flat,
          polylineCenter
        };
        var LonLat = {
          project: function(latlng) {
            return new Point(latlng.lng, latlng.lat);
          },
          unproject: function(point) {
            return new LatLng(point.y, point.x);
          },
          bounds: new Bounds([-180, -90], [180, 90])
        };
        var Mercator = {
          R: 6378137,
          R_MINOR: 6356752314245179e-9,
          bounds: new Bounds([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
          project: function(latlng) {
            var d = Math.PI / 180, r = this.R, y = latlng.lat * d, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), con = e * Math.sin(y);
            var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
            y = -r * Math.log(Math.max(ts, 1e-10));
            return new Point(latlng.lng * d * r, y);
          },
          unproject: function(point) {
            var d = 180 / Math.PI, r = this.R, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), ts = Math.exp(-point.y / r), phi = Math.PI / 2 - 2 * Math.atan(ts);
            for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
              con = e * Math.sin(phi);
              con = Math.pow((1 - con) / (1 + con), e / 2);
              dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
              phi += dphi;
            }
            return new LatLng(phi * d, point.x * d / r);
          }
        };
        var index = {
          __proto__: null,
          LonLat,
          Mercator,
          SphericalMercator
        };
        var EPSG3395 = extend({}, Earth, {
          code: "EPSG:3395",
          projection: Mercator,
          transformation: function() {
            var scale2 = 0.5 / (Math.PI * Mercator.R);
            return toTransformation(scale2, 0.5, -scale2, 0.5);
          }()
        });
        var EPSG4326 = extend({}, Earth, {
          code: "EPSG:4326",
          projection: LonLat,
          transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
        });
        var Simple = extend({}, CRS, {
          projection: LonLat,
          transformation: toTransformation(1, 0, -1, 0),
          scale: function(zoom2) {
            return Math.pow(2, zoom2);
          },
          zoom: function(scale2) {
            return Math.log(scale2) / Math.LN2;
          },
          distance: function(latlng1, latlng2) {
            var dx = latlng2.lng - latlng1.lng, dy = latlng2.lat - latlng1.lat;
            return Math.sqrt(dx * dx + dy * dy);
          },
          infinite: true
        });
        CRS.Earth = Earth;
        CRS.EPSG3395 = EPSG3395;
        CRS.EPSG3857 = EPSG3857;
        CRS.EPSG900913 = EPSG900913;
        CRS.EPSG4326 = EPSG4326;
        CRS.Simple = Simple;
        var Layer = Evented.extend({
          // Classes extending `L.Layer` will inherit the following options:
          options: {
            // @option pane: String = 'overlayPane'
            // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
            pane: "overlayPane",
            // @option attribution: String = null
            // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
            attribution: null,
            bubblingMouseEvents: true
          },
          /* @section
           * Classes extending `L.Layer` will inherit the following methods:
           *
           * @method addTo(map: Map|LayerGroup): this
           * Adds the layer to the given map or layer group.
           */
          addTo: function(map) {
            map.addLayer(this);
            return this;
          },
          // @method remove: this
          // Removes the layer from the map it is currently active on.
          remove: function() {
            return this.removeFrom(this._map || this._mapToAdd);
          },
          // @method removeFrom(map: Map): this
          // Removes the layer from the given map
          //
          // @alternative
          // @method removeFrom(group: LayerGroup): this
          // Removes the layer from the given `LayerGroup`
          removeFrom: function(obj) {
            if (obj) {
              obj.removeLayer(this);
            }
            return this;
          },
          // @method getPane(name? : String): HTMLElement
          // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
          getPane: function(name) {
            return this._map.getPane(name ? this.options[name] || name : this.options.pane);
          },
          addInteractiveTarget: function(targetEl) {
            this._map._targets[stamp(targetEl)] = this;
            return this;
          },
          removeInteractiveTarget: function(targetEl) {
            delete this._map._targets[stamp(targetEl)];
            return this;
          },
          // @method getAttribution: String
          // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
          getAttribution: function() {
            return this.options.attribution;
          },
          _layerAdd: function(e) {
            var map = e.target;
            if (!map.hasLayer(this)) {
              return;
            }
            this._map = map;
            this._zoomAnimated = map._zoomAnimated;
            if (this.getEvents) {
              var events = this.getEvents();
              map.on(events, this);
              this.once("remove", function() {
                map.off(events, this);
              }, this);
            }
            this.onAdd(map);
            this.fire("add");
            map.fire("layeradd", { layer: this });
          }
        });
        Map2.include({
          // @method addLayer(layer: Layer): this
          // Adds the given layer to the map
          addLayer: function(layer) {
            if (!layer._layerAdd) {
              throw new Error("The provided object is not a Layer.");
            }
            var id = stamp(layer);
            if (this._layers[id]) {
              return this;
            }
            this._layers[id] = layer;
            layer._mapToAdd = this;
            if (layer.beforeAdd) {
              layer.beforeAdd(this);
            }
            this.whenReady(layer._layerAdd, layer);
            return this;
          },
          // @method removeLayer(layer: Layer): this
          // Removes the given layer from the map.
          removeLayer: function(layer) {
            var id = stamp(layer);
            if (!this._layers[id]) {
              return this;
            }
            if (this._loaded) {
              layer.onRemove(this);
            }
            delete this._layers[id];
            if (this._loaded) {
              this.fire("layerremove", { layer });
              layer.fire("remove");
            }
            layer._map = layer._mapToAdd = null;
            return this;
          },
          // @method hasLayer(layer: Layer): Boolean
          // Returns `true` if the given layer is currently added to the map
          hasLayer: function(layer) {
            return stamp(layer) in this._layers;
          },
          /* @method eachLayer(fn: Function, context?: Object): this
           * Iterates over the layers of the map, optionally specifying context of the iterator function.
           * ```
           * map.eachLayer(function(layer){
           *     layer.bindPopup('Hello');
           * });
           * ```
           */
          eachLayer: function(method, context) {
            for (var i in this._layers) {
              method.call(context, this._layers[i]);
            }
            return this;
          },
          _addLayers: function(layers2) {
            layers2 = layers2 ? isArray(layers2) ? layers2 : [layers2] : [];
            for (var i = 0, len = layers2.length; i < len; i++) {
              this.addLayer(layers2[i]);
            }
          },
          _addZoomLimit: function(layer) {
            if (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
              this._zoomBoundLayers[stamp(layer)] = layer;
              this._updateZoomLevels();
            }
          },
          _removeZoomLimit: function(layer) {
            var id = stamp(layer);
            if (this._zoomBoundLayers[id]) {
              delete this._zoomBoundLayers[id];
              this._updateZoomLevels();
            }
          },
          _updateZoomLevels: function() {
            var minZoom = Infinity, maxZoom = -Infinity, oldZoomSpan = this._getZoomSpan();
            for (var i in this._zoomBoundLayers) {
              var options = this._zoomBoundLayers[i].options;
              minZoom = options.minZoom === void 0 ? minZoom : Math.min(minZoom, options.minZoom);
              maxZoom = options.maxZoom === void 0 ? maxZoom : Math.max(maxZoom, options.maxZoom);
            }
            this._layersMaxZoom = maxZoom === -Infinity ? void 0 : maxZoom;
            this._layersMinZoom = minZoom === Infinity ? void 0 : minZoom;
            if (oldZoomSpan !== this._getZoomSpan()) {
              this.fire("zoomlevelschange");
            }
            if (this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
              this.setZoom(this._layersMaxZoom);
            }
            if (this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
              this.setZoom(this._layersMinZoom);
            }
          }
        });
        var LayerGroup = Layer.extend({
          initialize: function(layers2, options) {
            setOptions(this, options);
            this._layers = {};
            var i, len;
            if (layers2) {
              for (i = 0, len = layers2.length; i < len; i++) {
                this.addLayer(layers2[i]);
              }
            }
          },
          // @method addLayer(layer: Layer): this
          // Adds the given layer to the group.
          addLayer: function(layer) {
            var id = this.getLayerId(layer);
            this._layers[id] = layer;
            if (this._map) {
              this._map.addLayer(layer);
            }
            return this;
          },
          // @method removeLayer(layer: Layer): this
          // Removes the given layer from the group.
          // @alternative
          // @method removeLayer(id: Number): this
          // Removes the layer with the given internal ID from the group.
          removeLayer: function(layer) {
            var id = layer in this._layers ? layer : this.getLayerId(layer);
            if (this._map && this._layers[id]) {
              this._map.removeLayer(this._layers[id]);
            }
            delete this._layers[id];
            return this;
          },
          // @method hasLayer(layer: Layer): Boolean
          // Returns `true` if the given layer is currently added to the group.
          // @alternative
          // @method hasLayer(id: Number): Boolean
          // Returns `true` if the given internal ID is currently added to the group.
          hasLayer: function(layer) {
            var layerId = typeof layer === "number" ? layer : this.getLayerId(layer);
            return layerId in this._layers;
          },
          // @method clearLayers(): this
          // Removes all the layers from the group.
          clearLayers: function() {
            return this.eachLayer(this.removeLayer, this);
          },
          // @method invoke(methodName: String, …): this
          // Calls `methodName` on every layer contained in this group, passing any
          // additional parameters. Has no effect if the layers contained do not
          // implement `methodName`.
          invoke: function(methodName) {
            var args = Array.prototype.slice.call(arguments, 1), i, layer;
            for (i in this._layers) {
              layer = this._layers[i];
              if (layer[methodName]) {
                layer[methodName].apply(layer, args);
              }
            }
            return this;
          },
          onAdd: function(map) {
            this.eachLayer(map.addLayer, map);
          },
          onRemove: function(map) {
            this.eachLayer(map.removeLayer, map);
          },
          // @method eachLayer(fn: Function, context?: Object): this
          // Iterates over the layers of the group, optionally specifying context of the iterator function.
          // ```js
          // group.eachLayer(function (layer) {
          // 	layer.bindPopup('Hello');
          // });
          // ```
          eachLayer: function(method, context) {
            for (var i in this._layers) {
              method.call(context, this._layers[i]);
            }
            return this;
          },
          // @method getLayer(id: Number): Layer
          // Returns the layer with the given internal ID.
          getLayer: function(id) {
            return this._layers[id];
          },
          // @method getLayers(): Layer[]
          // Returns an array of all the layers added to the group.
          getLayers: function() {
            var layers2 = [];
            this.eachLayer(layers2.push, layers2);
            return layers2;
          },
          // @method setZIndex(zIndex: Number): this
          // Calls `setZIndex` on every layer contained in this group, passing the z-index.
          setZIndex: function(zIndex) {
            return this.invoke("setZIndex", zIndex);
          },
          // @method getLayerId(layer: Layer): Number
          // Returns the internal ID for a layer
          getLayerId: function(layer) {
            return stamp(layer);
          }
        });
        var layerGroup = function(layers2, options) {
          return new LayerGroup(layers2, options);
        };
        var FeatureGroup = LayerGroup.extend({
          addLayer: function(layer) {
            if (this.hasLayer(layer)) {
              return this;
            }
            layer.addEventParent(this);
            LayerGroup.prototype.addLayer.call(this, layer);
            return this.fire("layeradd", { layer });
          },
          removeLayer: function(layer) {
            if (!this.hasLayer(layer)) {
              return this;
            }
            if (layer in this._layers) {
              layer = this._layers[layer];
            }
            layer.removeEventParent(this);
            LayerGroup.prototype.removeLayer.call(this, layer);
            return this.fire("layerremove", { layer });
          },
          // @method setStyle(style: Path options): this
          // Sets the given path options to each layer of the group that has a `setStyle` method.
          setStyle: function(style2) {
            return this.invoke("setStyle", style2);
          },
          // @method bringToFront(): this
          // Brings the layer group to the top of all other layers
          bringToFront: function() {
            return this.invoke("bringToFront");
          },
          // @method bringToBack(): this
          // Brings the layer group to the back of all other layers
          bringToBack: function() {
            return this.invoke("bringToBack");
          },
          // @method getBounds(): LatLngBounds
          // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
          getBounds: function() {
            var bounds = new LatLngBounds();
            for (var id in this._layers) {
              var layer = this._layers[id];
              bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
            }
            return bounds;
          }
        });
        var featureGroup = function(layers2, options) {
          return new FeatureGroup(layers2, options);
        };
        var Icon = Class.extend({
          /* @section
           * @aka Icon options
           *
           * @option iconUrl: String = null
           * **(required)** The URL to the icon image (absolute or relative to your script path).
           *
           * @option iconRetinaUrl: String = null
           * The URL to a retina sized version of the icon image (absolute or relative to your
           * script path). Used for Retina screen devices.
           *
           * @option iconSize: Point = null
           * Size of the icon image in pixels.
           *
           * @option iconAnchor: Point = null
           * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
           * will be aligned so that this point is at the marker's geographical location. Centered
           * by default if size is specified, also can be set in CSS with negative margins.
           *
           * @option popupAnchor: Point = [0, 0]
           * The coordinates of the point from which popups will "open", relative to the icon anchor.
           *
           * @option tooltipAnchor: Point = [0, 0]
           * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
           *
           * @option shadowUrl: String = null
           * The URL to the icon shadow image. If not specified, no shadow image will be created.
           *
           * @option shadowRetinaUrl: String = null
           *
           * @option shadowSize: Point = null
           * Size of the shadow image in pixels.
           *
           * @option shadowAnchor: Point = null
           * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
           * as iconAnchor if not specified).
           *
           * @option className: String = ''
           * A custom class name to assign to both icon and shadow images. Empty by default.
           */
          options: {
            popupAnchor: [0, 0],
            tooltipAnchor: [0, 0],
            // @option crossOrigin: Boolean|String = false
            // Whether the crossOrigin attribute will be added to the tiles.
            // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
            // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
            crossOrigin: false
          },
          initialize: function(options) {
            setOptions(this, options);
          },
          // @method createIcon(oldIcon?: HTMLElement): HTMLElement
          // Called internally when the icon has to be shown, returns a `<img>` HTML element
          // styled according to the options.
          createIcon: function(oldIcon) {
            return this._createIcon("icon", oldIcon);
          },
          // @method createShadow(oldIcon?: HTMLElement): HTMLElement
          // As `createIcon`, but for the shadow beneath it.
          createShadow: function(oldIcon) {
            return this._createIcon("shadow", oldIcon);
          },
          _createIcon: function(name, oldIcon) {
            var src = this._getIconUrl(name);
            if (!src) {
              if (name === "icon") {
                throw new Error("iconUrl not set in Icon options (see the docs).");
              }
              return null;
            }
            var img = this._createImg(src, oldIcon && oldIcon.tagName === "IMG" ? oldIcon : null);
            this._setIconStyles(img, name);
            if (this.options.crossOrigin || this.options.crossOrigin === "") {
              img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
            }
            return img;
          },
          _setIconStyles: function(img, name) {
            var options = this.options;
            var sizeOption = options[name + "Size"];
            if (typeof sizeOption === "number") {
              sizeOption = [sizeOption, sizeOption];
            }
            var size = toPoint(sizeOption), anchor = toPoint(name === "shadow" && options.shadowAnchor || options.iconAnchor || size && size.divideBy(2, true));
            img.className = "leaflet-marker-" + name + " " + (options.className || "");
            if (anchor) {
              img.style.marginLeft = -anchor.x + "px";
              img.style.marginTop = -anchor.y + "px";
            }
            if (size) {
              img.style.width = size.x + "px";
              img.style.height = size.y + "px";
            }
          },
          _createImg: function(src, el) {
            el = el || document.createElement("img");
            el.src = src;
            return el;
          },
          _getIconUrl: function(name) {
            return Browser.retina && this.options[name + "RetinaUrl"] || this.options[name + "Url"];
          }
        });
        function icon2(options) {
          return new Icon(options);
        }
        var IconDefault = Icon.extend({
          options: {
            iconUrl: "marker-icon.png",
            iconRetinaUrl: "marker-icon-2x.png",
            shadowUrl: "marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
          },
          _getIconUrl: function(name) {
            if (typeof IconDefault.imagePath !== "string") {
              IconDefault.imagePath = this._detectIconPath();
            }
            return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
          },
          _stripUrl: function(path) {
            var strip = function(str, re, idx) {
              var match = re.exec(str);
              return match && match[idx];
            };
            path = strip(path, /^url\((['"])?(.+)\1\)$/, 2);
            return path && strip(path, /^(.*)marker-icon\.png$/, 1);
          },
          _detectIconPath: function() {
            var el = create$1("div", "leaflet-default-icon-path", document.body);
            var path = getStyle(el, "background-image") || getStyle(el, "backgroundImage");
            document.body.removeChild(el);
            path = this._stripUrl(path);
            if (path) {
              return path;
            }
            var link = document.querySelector('link[href$="leaflet.css"]');
            if (!link) {
              return "";
            }
            return link.href.substring(0, link.href.length - "leaflet.css".length - 1);
          }
        });
        var MarkerDrag = Handler.extend({
          initialize: function(marker2) {
            this._marker = marker2;
          },
          addHooks: function() {
            var icon3 = this._marker._icon;
            if (!this._draggable) {
              this._draggable = new Draggable(icon3, icon3, true);
            }
            this._draggable.on({
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this).enable();
            addClass(icon3, "leaflet-marker-draggable");
          },
          removeHooks: function() {
            this._draggable.off({
              dragstart: this._onDragStart,
              predrag: this._onPreDrag,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this).disable();
            if (this._marker._icon) {
              removeClass(this._marker._icon, "leaflet-marker-draggable");
            }
          },
          moved: function() {
            return this._draggable && this._draggable._moved;
          },
          _adjustPan: function(e) {
            var marker2 = this._marker, map = marker2._map, speed = this._marker.options.autoPanSpeed, padding = this._marker.options.autoPanPadding, iconPos = getPosition(marker2._icon), bounds = map.getPixelBounds(), origin = map.getPixelOrigin();
            var panBounds = toBounds(
              bounds.min._subtract(origin).add(padding),
              bounds.max._subtract(origin).subtract(padding)
            );
            if (!panBounds.contains(iconPos)) {
              var movement = toPoint(
                (Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) - (Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),
                (Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) - (Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
              ).multiplyBy(speed);
              map.panBy(movement, { animate: false });
              this._draggable._newPos._add(movement);
              this._draggable._startPos._add(movement);
              setPosition(marker2._icon, this._draggable._newPos);
              this._onDrag(e);
              this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
            }
          },
          _onDragStart: function() {
            this._oldLatLng = this._marker.getLatLng();
            this._marker.closePopup && this._marker.closePopup();
            this._marker.fire("movestart").fire("dragstart");
          },
          _onPreDrag: function(e) {
            if (this._marker.options.autoPan) {
              cancelAnimFrame(this._panRequest);
              this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
            }
          },
          _onDrag: function(e) {
            var marker2 = this._marker, shadow = marker2._shadow, iconPos = getPosition(marker2._icon), latlng = marker2._map.layerPointToLatLng(iconPos);
            if (shadow) {
              setPosition(shadow, iconPos);
            }
            marker2._latlng = latlng;
            e.latlng = latlng;
            e.oldLatLng = this._oldLatLng;
            marker2.fire("move", e).fire("drag", e);
          },
          _onDragEnd: function(e) {
            cancelAnimFrame(this._panRequest);
            delete this._oldLatLng;
            this._marker.fire("moveend").fire("dragend", e);
          }
        });
        var Marker = Layer.extend({
          // @section
          // @aka Marker options
          options: {
            // @option icon: Icon = *
            // Icon instance to use for rendering the marker.
            // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
            // If not specified, a common instance of `L.Icon.Default` is used.
            icon: new IconDefault(),
            // Option inherited from "Interactive layer" abstract class
            interactive: true,
            // @option keyboard: Boolean = true
            // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
            keyboard: true,
            // @option title: String = ''
            // Text for the browser tooltip that appear on marker hover (no tooltip by default).
            // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
            title: "",
            // @option alt: String = 'Marker'
            // Text for the `alt` attribute of the icon image.
            // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
            alt: "Marker",
            // @option zIndexOffset: Number = 0
            // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
            zIndexOffset: 0,
            // @option opacity: Number = 1.0
            // The opacity of the marker.
            opacity: 1,
            // @option riseOnHover: Boolean = false
            // If `true`, the marker will get on top of others when you hover the mouse over it.
            riseOnHover: false,
            // @option riseOffset: Number = 250
            // The z-index offset used for the `riseOnHover` feature.
            riseOffset: 250,
            // @option pane: String = 'markerPane'
            // `Map pane` where the markers icon will be added.
            pane: "markerPane",
            // @option shadowPane: String = 'shadowPane'
            // `Map pane` where the markers shadow will be added.
            shadowPane: "shadowPane",
            // @option bubblingMouseEvents: Boolean = false
            // When `true`, a mouse event on this marker will trigger the same event on the map
            // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
            bubblingMouseEvents: false,
            // @option autoPanOnFocus: Boolean = true
            // When `true`, the map will pan whenever the marker is focused (via
            // e.g. pressing `tab` on the keyboard) to ensure the marker is
            // visible within the map's bounds
            autoPanOnFocus: true,
            // @section Draggable marker options
            // @option draggable: Boolean = false
            // Whether the marker is draggable with mouse/touch or not.
            draggable: false,
            // @option autoPan: Boolean = false
            // Whether to pan the map when dragging this marker near its edge or not.
            autoPan: false,
            // @option autoPanPadding: Point = Point(50, 50)
            // Distance (in pixels to the left/right and to the top/bottom) of the
            // map edge to start panning the map.
            autoPanPadding: [50, 50],
            // @option autoPanSpeed: Number = 10
            // Number of pixels the map should pan by.
            autoPanSpeed: 10
          },
          /* @section
           *
           * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
           */
          initialize: function(latlng, options) {
            setOptions(this, options);
            this._latlng = toLatLng(latlng);
          },
          onAdd: function(map) {
            this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;
            if (this._zoomAnimated) {
              map.on("zoomanim", this._animateZoom, this);
            }
            this._initIcon();
            this.update();
          },
          onRemove: function(map) {
            if (this.dragging && this.dragging.enabled()) {
              this.options.draggable = true;
              this.dragging.removeHooks();
            }
            delete this.dragging;
            if (this._zoomAnimated) {
              map.off("zoomanim", this._animateZoom, this);
            }
            this._removeIcon();
            this._removeShadow();
          },
          getEvents: function() {
            return {
              zoom: this.update,
              viewreset: this.update
            };
          },
          // @method getLatLng: LatLng
          // Returns the current geographical position of the marker.
          getLatLng: function() {
            return this._latlng;
          },
          // @method setLatLng(latlng: LatLng): this
          // Changes the marker position to the given point.
          setLatLng: function(latlng) {
            var oldLatLng = this._latlng;
            this._latlng = toLatLng(latlng);
            this.update();
            return this.fire("move", { oldLatLng, latlng: this._latlng });
          },
          // @method setZIndexOffset(offset: Number): this
          // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
          setZIndexOffset: function(offset) {
            this.options.zIndexOffset = offset;
            return this.update();
          },
          // @method getIcon: Icon
          // Returns the current icon used by the marker
          getIcon: function() {
            return this.options.icon;
          },
          // @method setIcon(icon: Icon): this
          // Changes the marker icon.
          setIcon: function(icon3) {
            this.options.icon = icon3;
            if (this._map) {
              this._initIcon();
              this.update();
            }
            if (this._popup) {
              this.bindPopup(this._popup, this._popup.options);
            }
            return this;
          },
          getElement: function() {
            return this._icon;
          },
          update: function() {
            if (this._icon && this._map) {
              var pos = this._map.latLngToLayerPoint(this._latlng).round();
              this._setPos(pos);
            }
            return this;
          },
          _initIcon: function() {
            var options = this.options, classToAdd = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            var icon3 = options.icon.createIcon(this._icon), addIcon = false;
            if (icon3 !== this._icon) {
              if (this._icon) {
                this._removeIcon();
              }
              addIcon = true;
              if (options.title) {
                icon3.title = options.title;
              }
              if (icon3.tagName === "IMG") {
                icon3.alt = options.alt || "";
              }
            }
            addClass(icon3, classToAdd);
            if (options.keyboard) {
              icon3.tabIndex = "0";
              icon3.setAttribute("role", "button");
            }
            this._icon = icon3;
            if (options.riseOnHover) {
              this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
              });
            }
            if (this.options.autoPanOnFocus) {
              on(icon3, "focus", this._panOnFocus, this);
            }
            var newShadow = options.icon.createShadow(this._shadow), addShadow = false;
            if (newShadow !== this._shadow) {
              this._removeShadow();
              addShadow = true;
            }
            if (newShadow) {
              addClass(newShadow, classToAdd);
              newShadow.alt = "";
            }
            this._shadow = newShadow;
            if (options.opacity < 1) {
              this._updateOpacity();
            }
            if (addIcon) {
              this.getPane().appendChild(this._icon);
            }
            this._initInteraction();
            if (newShadow && addShadow) {
              this.getPane(options.shadowPane).appendChild(this._shadow);
            }
          },
          _removeIcon: function() {
            if (this.options.riseOnHover) {
              this.off({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
              });
            }
            if (this.options.autoPanOnFocus) {
              off(this._icon, "focus", this._panOnFocus, this);
            }
            remove(this._icon);
            this.removeInteractiveTarget(this._icon);
            this._icon = null;
          },
          _removeShadow: function() {
            if (this._shadow) {
              remove(this._shadow);
            }
            this._shadow = null;
          },
          _setPos: function(pos) {
            if (this._icon) {
              setPosition(this._icon, pos);
            }
            if (this._shadow) {
              setPosition(this._shadow, pos);
            }
            this._zIndex = pos.y + this.options.zIndexOffset;
            this._resetZIndex();
          },
          _updateZIndex: function(offset) {
            if (this._icon) {
              this._icon.style.zIndex = this._zIndex + offset;
            }
          },
          _animateZoom: function(opt) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
            this._setPos(pos);
          },
          _initInteraction: function() {
            if (!this.options.interactive) {
              return;
            }
            addClass(this._icon, "leaflet-interactive");
            this.addInteractiveTarget(this._icon);
            if (MarkerDrag) {
              var draggable = this.options.draggable;
              if (this.dragging) {
                draggable = this.dragging.enabled();
                this.dragging.disable();
              }
              this.dragging = new MarkerDrag(this);
              if (draggable) {
                this.dragging.enable();
              }
            }
          },
          // @method setOpacity(opacity: Number): this
          // Changes the opacity of the marker.
          setOpacity: function(opacity) {
            this.options.opacity = opacity;
            if (this._map) {
              this._updateOpacity();
            }
            return this;
          },
          _updateOpacity: function() {
            var opacity = this.options.opacity;
            if (this._icon) {
              setOpacity(this._icon, opacity);
            }
            if (this._shadow) {
              setOpacity(this._shadow, opacity);
            }
          },
          _bringToFront: function() {
            this._updateZIndex(this.options.riseOffset);
          },
          _resetZIndex: function() {
            this._updateZIndex(0);
          },
          _panOnFocus: function() {
            var map = this._map;
            if (!map) {
              return;
            }
            var iconOpts = this.options.icon.options;
            var size = iconOpts.iconSize ? toPoint(iconOpts.iconSize) : toPoint(0, 0);
            var anchor = iconOpts.iconAnchor ? toPoint(iconOpts.iconAnchor) : toPoint(0, 0);
            map.panInside(this._latlng, {
              paddingTopLeft: anchor,
              paddingBottomRight: size.subtract(anchor)
            });
          },
          _getPopupAnchor: function() {
            return this.options.icon.options.popupAnchor;
          },
          _getTooltipAnchor: function() {
            return this.options.icon.options.tooltipAnchor;
          }
        });
        function marker(latlng, options) {
          return new Marker(latlng, options);
        }
        var Path = Layer.extend({
          // @section
          // @aka Path options
          options: {
            // @option stroke: Boolean = true
            // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
            stroke: true,
            // @option color: String = '#3388ff'
            // Stroke color
            color: "#3388ff",
            // @option weight: Number = 3
            // Stroke width in pixels
            weight: 3,
            // @option opacity: Number = 1.0
            // Stroke opacity
            opacity: 1,
            // @option lineCap: String= 'round'
            // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
            lineCap: "round",
            // @option lineJoin: String = 'round'
            // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
            lineJoin: "round",
            // @option dashArray: String = null
            // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
            dashArray: null,
            // @option dashOffset: String = null
            // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
            dashOffset: null,
            // @option fill: Boolean = depends
            // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
            fill: false,
            // @option fillColor: String = *
            // Fill color. Defaults to the value of the [`color`](#path-color) option
            fillColor: null,
            // @option fillOpacity: Number = 0.2
            // Fill opacity.
            fillOpacity: 0.2,
            // @option fillRule: String = 'evenodd'
            // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
            fillRule: "evenodd",
            // className: '',
            // Option inherited from "Interactive layer" abstract class
            interactive: true,
            // @option bubblingMouseEvents: Boolean = true
            // When `true`, a mouse event on this path will trigger the same event on the map
            // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
            bubblingMouseEvents: true
          },
          beforeAdd: function(map) {
            this._renderer = map.getRenderer(this);
          },
          onAdd: function() {
            this._renderer._initPath(this);
            this._reset();
            this._renderer._addPath(this);
          },
          onRemove: function() {
            this._renderer._removePath(this);
          },
          // @method redraw(): this
          // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
          redraw: function() {
            if (this._map) {
              this._renderer._updatePath(this);
            }
            return this;
          },
          // @method setStyle(style: Path options): this
          // Changes the appearance of a Path based on the options in the `Path options` object.
          setStyle: function(style2) {
            setOptions(this, style2);
            if (this._renderer) {
              this._renderer._updateStyle(this);
              if (this.options.stroke && style2 && Object.prototype.hasOwnProperty.call(style2, "weight")) {
                this._updateBounds();
              }
            }
            return this;
          },
          // @method bringToFront(): this
          // Brings the layer to the top of all path layers.
          bringToFront: function() {
            if (this._renderer) {
              this._renderer._bringToFront(this);
            }
            return this;
          },
          // @method bringToBack(): this
          // Brings the layer to the bottom of all path layers.
          bringToBack: function() {
            if (this._renderer) {
              this._renderer._bringToBack(this);
            }
            return this;
          },
          getElement: function() {
            return this._path;
          },
          _reset: function() {
            this._project();
            this._update();
          },
          _clickTolerance: function() {
            return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
          }
        });
        var CircleMarker = Path.extend({
          // @section
          // @aka CircleMarker options
          options: {
            fill: true,
            // @option radius: Number = 10
            // Radius of the circle marker, in pixels
            radius: 10
          },
          initialize: function(latlng, options) {
            setOptions(this, options);
            this._latlng = toLatLng(latlng);
            this._radius = this.options.radius;
          },
          // @method setLatLng(latLng: LatLng): this
          // Sets the position of a circle marker to a new location.
          setLatLng: function(latlng) {
            var oldLatLng = this._latlng;
            this._latlng = toLatLng(latlng);
            this.redraw();
            return this.fire("move", { oldLatLng, latlng: this._latlng });
          },
          // @method getLatLng(): LatLng
          // Returns the current geographical position of the circle marker
          getLatLng: function() {
            return this._latlng;
          },
          // @method setRadius(radius: Number): this
          // Sets the radius of a circle marker. Units are in pixels.
          setRadius: function(radius2) {
            this.options.radius = this._radius = radius2;
            return this.redraw();
          },
          // @method getRadius(): Number
          // Returns the current radius of the circle
          getRadius: function() {
            return this._radius;
          },
          setStyle: function(options) {
            var radius2 = options && options.radius || this._radius;
            Path.prototype.setStyle.call(this, options);
            this.setRadius(radius2);
            return this;
          },
          _project: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng);
            this._updateBounds();
          },
          _updateBounds: function() {
            var r = this._radius, r2 = this._radiusY || r, w = this._clickTolerance(), p = [r + w, r2 + w];
            this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
          },
          _update: function() {
            if (this._map) {
              this._updatePath();
            }
          },
          _updatePath: function() {
            this._renderer._updateCircle(this);
          },
          _empty: function() {
            return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
          },
          // Needed by the `Canvas` renderer for interactivity
          _containsPoint: function(p) {
            return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
          }
        });
        function circleMarker(latlng, options) {
          return new CircleMarker(latlng, options);
        }
        var Circle = CircleMarker.extend({
          initialize: function(latlng, options, legacyOptions) {
            if (typeof options === "number") {
              options = extend({}, legacyOptions, { radius: options });
            }
            setOptions(this, options);
            this._latlng = toLatLng(latlng);
            if (isNaN(this.options.radius)) {
              throw new Error("Circle radius cannot be NaN");
            }
            this._mRadius = this.options.radius;
          },
          // @method setRadius(radius: Number): this
          // Sets the radius of a circle. Units are in meters.
          setRadius: function(radius2) {
            this._mRadius = radius2;
            return this.redraw();
          },
          // @method getRadius(): Number
          // Returns the current radius of a circle. Units are in meters.
          getRadius: function() {
            return this._mRadius;
          },
          // @method getBounds(): LatLngBounds
          // Returns the `LatLngBounds` of the path.
          getBounds: function() {
            var half = [this._radius, this._radiusY || this._radius];
            return new LatLngBounds(
              this._map.layerPointToLatLng(this._point.subtract(half)),
              this._map.layerPointToLatLng(this._point.add(half))
            );
          },
          setStyle: Path.prototype.setStyle,
          _project: function() {
            var lng = this._latlng.lng, lat = this._latlng.lat, map = this._map, crs = map.options.crs;
            if (crs.distance === Earth.distance) {
              var d = Math.PI / 180, latR = this._mRadius / Earth.R / d, top = map.project([lat + latR, lng]), bottom = map.project([lat - latR, lng]), p = top.add(bottom).divideBy(2), lat2 = map.unproject(p).lat, lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) / (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;
              if (isNaN(lngR) || lngR === 0) {
                lngR = latR / Math.cos(Math.PI / 180 * lat);
              }
              this._point = p.subtract(map.getPixelOrigin());
              this._radius = isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x;
              this._radiusY = p.y - top.y;
            } else {
              var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));
              this._point = map.latLngToLayerPoint(this._latlng);
              this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
            }
            this._updateBounds();
          }
        });
        function circle(latlng, options, legacyOptions) {
          return new Circle(latlng, options, legacyOptions);
        }
        var Polyline = Path.extend({
          // @section
          // @aka Polyline options
          options: {
            // @option smoothFactor: Number = 1.0
            // How much to simplify the polyline on each zoom level. More means
            // better performance and smoother look, and less means more accurate representation.
            smoothFactor: 1,
            // @option noClip: Boolean = false
            // Disable polyline clipping.
            noClip: false
          },
          initialize: function(latlngs, options) {
            setOptions(this, options);
            this._setLatLngs(latlngs);
          },
          // @method getLatLngs(): LatLng[]
          // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
          getLatLngs: function() {
            return this._latlngs;
          },
          // @method setLatLngs(latlngs: LatLng[]): this
          // Replaces all the points in the polyline with the given array of geographical points.
          setLatLngs: function(latlngs) {
            this._setLatLngs(latlngs);
            return this.redraw();
          },
          // @method isEmpty(): Boolean
          // Returns `true` if the Polyline has no LatLngs.
          isEmpty: function() {
            return !this._latlngs.length;
          },
          // @method closestLayerPoint(p: Point): Point
          // Returns the point closest to `p` on the Polyline.
          closestLayerPoint: function(p) {
            var minDistance = Infinity, minPoint = null, closest = _sqClosestPointOnSegment, p1, p2;
            for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
              var points = this._parts[j];
              for (var i = 1, len = points.length; i < len; i++) {
                p1 = points[i - 1];
                p2 = points[i];
                var sqDist = closest(p, p1, p2, true);
                if (sqDist < minDistance) {
                  minDistance = sqDist;
                  minPoint = closest(p, p1, p2);
                }
              }
            }
            if (minPoint) {
              minPoint.distance = Math.sqrt(minDistance);
            }
            return minPoint;
          },
          // @method getCenter(): LatLng
          // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
          getCenter: function() {
            if (!this._map) {
              throw new Error("Must add layer to map before using getCenter()");
            }
            return polylineCenter(this._defaultShape(), this._map.options.crs);
          },
          // @method getBounds(): LatLngBounds
          // Returns the `LatLngBounds` of the path.
          getBounds: function() {
            return this._bounds;
          },
          // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
          // Adds a given point to the polyline. By default, adds to the first ring of
          // the polyline in case of a multi-polyline, but can be overridden by passing
          // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
          addLatLng: function(latlng, latlngs) {
            latlngs = latlngs || this._defaultShape();
            latlng = toLatLng(latlng);
            latlngs.push(latlng);
            this._bounds.extend(latlng);
            return this.redraw();
          },
          _setLatLngs: function(latlngs) {
            this._bounds = new LatLngBounds();
            this._latlngs = this._convertLatLngs(latlngs);
          },
          _defaultShape: function() {
            return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
          },
          // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
          _convertLatLngs: function(latlngs) {
            var result = [], flat = isFlat(latlngs);
            for (var i = 0, len = latlngs.length; i < len; i++) {
              if (flat) {
                result[i] = toLatLng(latlngs[i]);
                this._bounds.extend(result[i]);
              } else {
                result[i] = this._convertLatLngs(latlngs[i]);
              }
            }
            return result;
          },
          _project: function() {
            var pxBounds = new Bounds();
            this._rings = [];
            this._projectLatlngs(this._latlngs, this._rings, pxBounds);
            if (this._bounds.isValid() && pxBounds.isValid()) {
              this._rawPxBounds = pxBounds;
              this._updateBounds();
            }
          },
          _updateBounds: function() {
            var w = this._clickTolerance(), p = new Point(w, w);
            if (!this._rawPxBounds) {
              return;
            }
            this._pxBounds = new Bounds([
              this._rawPxBounds.min.subtract(p),
              this._rawPxBounds.max.add(p)
            ]);
          },
          // recursively turns latlngs into a set of rings with projected coordinates
          _projectLatlngs: function(latlngs, result, projectedBounds) {
            var flat = latlngs[0] instanceof LatLng, len = latlngs.length, i, ring;
            if (flat) {
              ring = [];
              for (i = 0; i < len; i++) {
                ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
                projectedBounds.extend(ring[i]);
              }
              result.push(ring);
            } else {
              for (i = 0; i < len; i++) {
                this._projectLatlngs(latlngs[i], result, projectedBounds);
              }
            }
          },
          // clip polyline by renderer bounds so that we have less to render for performance
          _clipPoints: function() {
            var bounds = this._renderer._bounds;
            this._parts = [];
            if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
              return;
            }
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            var parts = this._parts, i, j, k2, len, len2, segment, points;
            for (i = 0, k2 = 0, len = this._rings.length; i < len; i++) {
              points = this._rings[i];
              for (j = 0, len2 = points.length; j < len2 - 1; j++) {
                segment = clipSegment(points[j], points[j + 1], bounds, j, true);
                if (!segment) {
                  continue;
                }
                parts[k2] = parts[k2] || [];
                parts[k2].push(segment[0]);
                if (segment[1] !== points[j + 1] || j === len2 - 2) {
                  parts[k2].push(segment[1]);
                  k2++;
                }
              }
            }
          },
          // simplify each clipped part of the polyline for performance
          _simplifyPoints: function() {
            var parts = this._parts, tolerance = this.options.smoothFactor;
            for (var i = 0, len = parts.length; i < len; i++) {
              parts[i] = simplify(parts[i], tolerance);
            }
          },
          _update: function() {
            if (!this._map) {
              return;
            }
            this._clipPoints();
            this._simplifyPoints();
            this._updatePath();
          },
          _updatePath: function() {
            this._renderer._updatePoly(this);
          },
          // Needed by the `Canvas` renderer for interactivity
          _containsPoint: function(p, closed) {
            var i, j, k2, len, len2, part, w = this._clickTolerance();
            if (!this._pxBounds || !this._pxBounds.contains(p)) {
              return false;
            }
            for (i = 0, len = this._parts.length; i < len; i++) {
              part = this._parts[i];
              for (j = 0, len2 = part.length, k2 = len2 - 1; j < len2; k2 = j++) {
                if (!closed && j === 0) {
                  continue;
                }
                if (pointToSegmentDistance(p, part[k2], part[j]) <= w) {
                  return true;
                }
              }
            }
            return false;
          }
        });
        function polyline(latlngs, options) {
          return new Polyline(latlngs, options);
        }
        Polyline._flat = _flat;
        var Polygon = Polyline.extend({
          options: {
            fill: true
          },
          isEmpty: function() {
            return !this._latlngs.length || !this._latlngs[0].length;
          },
          // @method getCenter(): LatLng
          // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
          getCenter: function() {
            if (!this._map) {
              throw new Error("Must add layer to map before using getCenter()");
            }
            return polygonCenter(this._defaultShape(), this._map.options.crs);
          },
          _convertLatLngs: function(latlngs) {
            var result = Polyline.prototype._convertLatLngs.call(this, latlngs), len = result.length;
            if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
              result.pop();
            }
            return result;
          },
          _setLatLngs: function(latlngs) {
            Polyline.prototype._setLatLngs.call(this, latlngs);
            if (isFlat(this._latlngs)) {
              this._latlngs = [this._latlngs];
            }
          },
          _defaultShape: function() {
            return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
          },
          _clipPoints: function() {
            var bounds = this._renderer._bounds, w = this.options.weight, p = new Point(w, w);
            bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));
            this._parts = [];
            if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
              return;
            }
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
              clipped = clipPolygon(this._rings[i], bounds, true);
              if (clipped.length) {
                this._parts.push(clipped);
              }
            }
          },
          _updatePath: function() {
            this._renderer._updatePoly(this, true);
          },
          // Needed by the `Canvas` renderer for interactivity
          _containsPoint: function(p) {
            var inside = false, part, p1, p2, i, j, k2, len, len2;
            if (!this._pxBounds || !this._pxBounds.contains(p)) {
              return false;
            }
            for (i = 0, len = this._parts.length; i < len; i++) {
              part = this._parts[i];
              for (j = 0, len2 = part.length, k2 = len2 - 1; j < len2; k2 = j++) {
                p1 = part[j];
                p2 = part[k2];
                if (p1.y > p.y !== p2.y > p.y && p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x) {
                  inside = !inside;
                }
              }
            }
            return inside || Polyline.prototype._containsPoint.call(this, p, true);
          }
        });
        function polygon2(latlngs, options) {
          return new Polygon(latlngs, options);
        }
        var GeoJSON = FeatureGroup.extend({
          /* @section
           * @aka GeoJSON options
           *
           * @option pointToLayer: Function = *
           * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
           * called when data is added, passing the GeoJSON point feature and its `LatLng`.
           * The default is to spawn a default `Marker`:
           * ```js
           * function(geoJsonPoint, latlng) {
           * 	return L.marker(latlng);
           * }
           * ```
           *
           * @option style: Function = *
           * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
           * called internally when data is added.
           * The default value is to not override any defaults:
           * ```js
           * function (geoJsonFeature) {
           * 	return {}
           * }
           * ```
           *
           * @option onEachFeature: Function = *
           * A `Function` that will be called once for each created `Feature`, after it has
           * been created and styled. Useful for attaching events and popups to features.
           * The default is to do nothing with the newly created layers:
           * ```js
           * function (feature, layer) {}
           * ```
           *
           * @option filter: Function = *
           * A `Function` that will be used to decide whether to include a feature or not.
           * The default is to include all features:
           * ```js
           * function (geoJsonFeature) {
           * 	return true;
           * }
           * ```
           * Note: dynamically changing the `filter` option will have effect only on newly
           * added data. It will _not_ re-evaluate already included features.
           *
           * @option coordsToLatLng: Function = *
           * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
           * The default is the `coordsToLatLng` static method.
           *
           * @option markersInheritOptions: Boolean = false
           * Whether default Markers for "Point" type Features inherit from group options.
           */
          initialize: function(geojson, options) {
            setOptions(this, options);
            this._layers = {};
            if (geojson) {
              this.addData(geojson);
            }
          },
          // @method addData( <GeoJSON> data ): this
          // Adds a GeoJSON object to the layer.
          addData: function(geojson) {
            var features = isArray(geojson) ? geojson : geojson.features, i, len, feature;
            if (features) {
              for (i = 0, len = features.length; i < len; i++) {
                feature = features[i];
                if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
                  this.addData(feature);
                }
              }
              return this;
            }
            var options = this.options;
            if (options.filter && !options.filter(geojson)) {
              return this;
            }
            var layer = geometryToLayer(geojson, options);
            if (!layer) {
              return this;
            }
            layer.feature = asFeature(geojson);
            layer.defaultOptions = layer.options;
            this.resetStyle(layer);
            if (options.onEachFeature) {
              options.onEachFeature(geojson, layer);
            }
            return this.addLayer(layer);
          },
          // @method resetStyle( <Path> layer? ): this
          // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
          // If `layer` is omitted, the style of all features in the current layer is reset.
          resetStyle: function(layer) {
            if (layer === void 0) {
              return this.eachLayer(this.resetStyle, this);
            }
            layer.options = extend({}, layer.defaultOptions);
            this._setLayerStyle(layer, this.options.style);
            return this;
          },
          // @method setStyle( <Function> style ): this
          // Changes styles of GeoJSON vector layers with the given style function.
          setStyle: function(style2) {
            return this.eachLayer(function(layer) {
              this._setLayerStyle(layer, style2);
            }, this);
          },
          _setLayerStyle: function(layer, style2) {
            if (layer.setStyle) {
              if (typeof style2 === "function") {
                style2 = style2(layer.feature);
              }
              layer.setStyle(style2);
            }
          }
        });
        function geometryToLayer(geojson, options) {
          var geometry = geojson.type === "Feature" ? geojson.geometry : geojson, coords = geometry ? geometry.coordinates : null, layers2 = [], pointToLayer = options && options.pointToLayer, _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng, latlng, latlngs, i, len;
          if (!coords && !geometry) {
            return null;
          }
          switch (geometry.type) {
            case "Point":
              latlng = _coordsToLatLng(coords);
              return _pointToLayer(pointToLayer, geojson, latlng, options);
            case "MultiPoint":
              for (i = 0, len = coords.length; i < len; i++) {
                latlng = _coordsToLatLng(coords[i]);
                layers2.push(_pointToLayer(pointToLayer, geojson, latlng, options));
              }
              return new FeatureGroup(layers2);
            case "LineString":
            case "MultiLineString":
              latlngs = coordsToLatLngs(coords, geometry.type === "LineString" ? 0 : 1, _coordsToLatLng);
              return new Polyline(latlngs, options);
            case "Polygon":
            case "MultiPolygon":
              latlngs = coordsToLatLngs(coords, geometry.type === "Polygon" ? 1 : 2, _coordsToLatLng);
              return new Polygon(latlngs, options);
            case "GeometryCollection":
              for (i = 0, len = geometry.geometries.length; i < len; i++) {
                var geoLayer = geometryToLayer({
                  geometry: geometry.geometries[i],
                  type: "Feature",
                  properties: geojson.properties
                }, options);
                if (geoLayer) {
                  layers2.push(geoLayer);
                }
              }
              return new FeatureGroup(layers2);
            case "FeatureCollection":
              for (i = 0, len = geometry.features.length; i < len; i++) {
                var featureLayer = geometryToLayer(geometry.features[i], options);
                if (featureLayer) {
                  layers2.push(featureLayer);
                }
              }
              return new FeatureGroup(layers2);
            default:
              throw new Error("Invalid GeoJSON object.");
          }
        }
        function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
          return pointToLayerFn ? pointToLayerFn(geojson, latlng) : new Marker(latlng, options && options.markersInheritOptions && options);
        }
        function coordsToLatLng(coords) {
          return new LatLng(coords[1], coords[0], coords[2]);
        }
        function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
          var latlngs = [];
          for (var i = 0, len = coords.length, latlng; i < len; i++) {
            latlng = levelsDeep ? coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) : (_coordsToLatLng || coordsToLatLng)(coords[i]);
            latlngs.push(latlng);
          }
          return latlngs;
        }
        function latLngToCoords(latlng, precision) {
          latlng = toLatLng(latlng);
          return latlng.alt !== void 0 ? [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] : [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
        }
        function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
          var coords = [];
          for (var i = 0, len = latlngs.length; i < len; i++) {
            coords.push(levelsDeep ? latLngsToCoords(latlngs[i], isFlat(latlngs[i]) ? 0 : levelsDeep - 1, closed, precision) : latLngToCoords(latlngs[i], precision));
          }
          if (!levelsDeep && closed && coords.length > 0) {
            coords.push(coords[0].slice());
          }
          return coords;
        }
        function getFeature(layer, newGeometry) {
          return layer.feature ? extend({}, layer.feature, { geometry: newGeometry }) : asFeature(newGeometry);
        }
        function asFeature(geojson) {
          if (geojson.type === "Feature" || geojson.type === "FeatureCollection") {
            return geojson;
          }
          return {
            type: "Feature",
            properties: {},
            geometry: geojson
          };
        }
        var PointToGeoJSON = {
          toGeoJSON: function(precision) {
            return getFeature(this, {
              type: "Point",
              coordinates: latLngToCoords(this.getLatLng(), precision)
            });
          }
        };
        Marker.include(PointToGeoJSON);
        Circle.include(PointToGeoJSON);
        CircleMarker.include(PointToGeoJSON);
        Polyline.include({
          toGeoJSON: function(precision) {
            var multi = !isFlat(this._latlngs);
            var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);
            return getFeature(this, {
              type: (multi ? "Multi" : "") + "LineString",
              coordinates: coords
            });
          }
        });
        Polygon.include({
          toGeoJSON: function(precision) {
            var holes = !isFlat(this._latlngs), multi = holes && !isFlat(this._latlngs[0]);
            var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);
            if (!holes) {
              coords = [coords];
            }
            return getFeature(this, {
              type: (multi ? "Multi" : "") + "Polygon",
              coordinates: coords
            });
          }
        });
        LayerGroup.include({
          toMultiPoint: function(precision) {
            var coords = [];
            this.eachLayer(function(layer) {
              coords.push(layer.toGeoJSON(precision).geometry.coordinates);
            });
            return getFeature(this, {
              type: "MultiPoint",
              coordinates: coords
            });
          },
          // @method toGeoJSON(precision?: Number|false): Object
          // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
          // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
          toGeoJSON: function(precision) {
            var type2 = this.feature && this.feature.geometry && this.feature.geometry.type;
            if (type2 === "MultiPoint") {
              return this.toMultiPoint(precision);
            }
            var isGeometryCollection = type2 === "GeometryCollection", jsons = [];
            this.eachLayer(function(layer) {
              if (layer.toGeoJSON) {
                var json = layer.toGeoJSON(precision);
                if (isGeometryCollection) {
                  jsons.push(json.geometry);
                } else {
                  var feature = asFeature(json);
                  if (feature.type === "FeatureCollection") {
                    jsons.push.apply(jsons, feature.features);
                  } else {
                    jsons.push(feature);
                  }
                }
              }
            });
            if (isGeometryCollection) {
              return getFeature(this, {
                geometries: jsons,
                type: "GeometryCollection"
              });
            }
            return {
              type: "FeatureCollection",
              features: jsons
            };
          }
        });
        function geoJSON(geojson, options) {
          return new GeoJSON(geojson, options);
        }
        var geoJson = geoJSON;
        var ImageOverlay = Layer.extend({
          // @section
          // @aka ImageOverlay options
          options: {
            // @option opacity: Number = 1.0
            // The opacity of the image overlay.
            opacity: 1,
            // @option alt: String = ''
            // Text for the `alt` attribute of the image (useful for accessibility).
            alt: "",
            // @option interactive: Boolean = false
            // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
            interactive: false,
            // @option crossOrigin: Boolean|String = false
            // Whether the crossOrigin attribute will be added to the image.
            // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
            // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
            crossOrigin: false,
            // @option errorOverlayUrl: String = ''
            // URL to the overlay image to show in place of the overlay that failed to load.
            errorOverlayUrl: "",
            // @option zIndex: Number = 1
            // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
            zIndex: 1,
            // @option className: String = ''
            // A custom class name to assign to the image. Empty by default.
            className: ""
          },
          initialize: function(url, bounds, options) {
            this._url = url;
            this._bounds = toLatLngBounds(bounds);
            setOptions(this, options);
          },
          onAdd: function() {
            if (!this._image) {
              this._initImage();
              if (this.options.opacity < 1) {
                this._updateOpacity();
              }
            }
            if (this.options.interactive) {
              addClass(this._image, "leaflet-interactive");
              this.addInteractiveTarget(this._image);
            }
            this.getPane().appendChild(this._image);
            this._reset();
          },
          onRemove: function() {
            remove(this._image);
            if (this.options.interactive) {
              this.removeInteractiveTarget(this._image);
            }
          },
          // @method setOpacity(opacity: Number): this
          // Sets the opacity of the overlay.
          setOpacity: function(opacity) {
            this.options.opacity = opacity;
            if (this._image) {
              this._updateOpacity();
            }
            return this;
          },
          setStyle: function(styleOpts) {
            if (styleOpts.opacity) {
              this.setOpacity(styleOpts.opacity);
            }
            return this;
          },
          // @method bringToFront(): this
          // Brings the layer to the top of all overlays.
          bringToFront: function() {
            if (this._map) {
              toFront(this._image);
            }
            return this;
          },
          // @method bringToBack(): this
          // Brings the layer to the bottom of all overlays.
          bringToBack: function() {
            if (this._map) {
              toBack(this._image);
            }
            return this;
          },
          // @method setUrl(url: String): this
          // Changes the URL of the image.
          setUrl: function(url) {
            this._url = url;
            if (this._image) {
              this._image.src = url;
            }
            return this;
          },
          // @method setBounds(bounds: LatLngBounds): this
          // Update the bounds that this ImageOverlay covers
          setBounds: function(bounds) {
            this._bounds = toLatLngBounds(bounds);
            if (this._map) {
              this._reset();
            }
            return this;
          },
          getEvents: function() {
            var events = {
              zoom: this._reset,
              viewreset: this._reset
            };
            if (this._zoomAnimated) {
              events.zoomanim = this._animateZoom;
            }
            return events;
          },
          // @method setZIndex(value: Number): this
          // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
          setZIndex: function(value) {
            this.options.zIndex = value;
            this._updateZIndex();
            return this;
          },
          // @method getBounds(): LatLngBounds
          // Get the bounds that this ImageOverlay covers
          getBounds: function() {
            return this._bounds;
          },
          // @method getElement(): HTMLElement
          // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
          // used by this overlay.
          getElement: function() {
            return this._image;
          },
          _initImage: function() {
            var wasElementSupplied = this._url.tagName === "IMG";
            var img = this._image = wasElementSupplied ? this._url : create$1("img");
            addClass(img, "leaflet-image-layer");
            if (this._zoomAnimated) {
              addClass(img, "leaflet-zoom-animated");
            }
            if (this.options.className) {
              addClass(img, this.options.className);
            }
            img.onselectstart = falseFn;
            img.onmousemove = falseFn;
            img.onload = bind2(this.fire, this, "load");
            img.onerror = bind2(this._overlayOnError, this, "error");
            if (this.options.crossOrigin || this.options.crossOrigin === "") {
              img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
            }
            if (this.options.zIndex) {
              this._updateZIndex();
            }
            if (wasElementSupplied) {
              this._url = img.src;
              return;
            }
            img.src = this._url;
            img.alt = this.options.alt;
          },
          _animateZoom: function(e) {
            var scale2 = this._map.getZoomScale(e.zoom), offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
            setTransform(this._image, offset, scale2);
          },
          _reset: function() {
            var image = this._image, bounds = new Bounds(
              this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
              this._map.latLngToLayerPoint(this._bounds.getSouthEast())
            ), size = bounds.getSize();
            setPosition(image, bounds.min);
            image.style.width = size.x + "px";
            image.style.height = size.y + "px";
          },
          _updateOpacity: function() {
            setOpacity(this._image, this.options.opacity);
          },
          _updateZIndex: function() {
            if (this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
              this._image.style.zIndex = this.options.zIndex;
            }
          },
          _overlayOnError: function() {
            this.fire("error");
            var errorUrl = this.options.errorOverlayUrl;
            if (errorUrl && this._url !== errorUrl) {
              this._url = errorUrl;
              this._image.src = errorUrl;
            }
          },
          // @method getCenter(): LatLng
          // Returns the center of the ImageOverlay.
          getCenter: function() {
            return this._bounds.getCenter();
          }
        });
        var imageOverlay = function(url, bounds, options) {
          return new ImageOverlay(url, bounds, options);
        };
        var VideoOverlay = ImageOverlay.extend({
          // @section
          // @aka VideoOverlay options
          options: {
            // @option autoplay: Boolean = true
            // Whether the video starts playing automatically when loaded.
            // On some browsers autoplay will only work with `muted: true`
            autoplay: true,
            // @option loop: Boolean = true
            // Whether the video will loop back to the beginning when played.
            loop: true,
            // @option keepAspectRatio: Boolean = true
            // Whether the video will save aspect ratio after the projection.
            // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
            keepAspectRatio: true,
            // @option muted: Boolean = false
            // Whether the video starts on mute when loaded.
            muted: false,
            // @option playsInline: Boolean = true
            // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
            playsInline: true
          },
          _initImage: function() {
            var wasElementSupplied = this._url.tagName === "VIDEO";
            var vid = this._image = wasElementSupplied ? this._url : create$1("video");
            addClass(vid, "leaflet-image-layer");
            if (this._zoomAnimated) {
              addClass(vid, "leaflet-zoom-animated");
            }
            if (this.options.className) {
              addClass(vid, this.options.className);
            }
            vid.onselectstart = falseFn;
            vid.onmousemove = falseFn;
            vid.onloadeddata = bind2(this.fire, this, "load");
            if (wasElementSupplied) {
              var sourceElements = vid.getElementsByTagName("source");
              var sources = [];
              for (var j = 0; j < sourceElements.length; j++) {
                sources.push(sourceElements[j].src);
              }
              this._url = sourceElements.length > 0 ? sources : [vid.src];
              return;
            }
            if (!isArray(this._url)) {
              this._url = [this._url];
            }
            if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, "objectFit")) {
              vid.style["objectFit"] = "fill";
            }
            vid.autoplay = !!this.options.autoplay;
            vid.loop = !!this.options.loop;
            vid.muted = !!this.options.muted;
            vid.playsInline = !!this.options.playsInline;
            for (var i = 0; i < this._url.length; i++) {
              var source = create$1("source");
              source.src = this._url[i];
              vid.appendChild(source);
            }
          }
          // @method getElement(): HTMLVideoElement
          // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
          // used by this overlay.
        });
        function videoOverlay(video, bounds, options) {
          return new VideoOverlay(video, bounds, options);
        }
        var SVGOverlay = ImageOverlay.extend({
          _initImage: function() {
            var el = this._image = this._url;
            addClass(el, "leaflet-image-layer");
            if (this._zoomAnimated) {
              addClass(el, "leaflet-zoom-animated");
            }
            if (this.options.className) {
              addClass(el, this.options.className);
            }
            el.onselectstart = falseFn;
            el.onmousemove = falseFn;
          }
          // @method getElement(): SVGElement
          // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
          // used by this overlay.
        });
        function svgOverlay(el, bounds, options) {
          return new SVGOverlay(el, bounds, options);
        }
        var DivOverlay = Layer.extend({
          // @section
          // @aka DivOverlay options
          options: {
            // @option interactive: Boolean = false
            // If true, the popup/tooltip will listen to the mouse events.
            interactive: false,
            // @option offset: Point = Point(0, 0)
            // The offset of the overlay position.
            offset: [0, 0],
            // @option className: String = ''
            // A custom CSS class name to assign to the overlay.
            className: "",
            // @option pane: String = undefined
            // `Map pane` where the overlay will be added.
            pane: void 0,
            // @option content: String|HTMLElement|Function = ''
            // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
            // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
            content: ""
          },
          initialize: function(options, source) {
            if (options && (options instanceof LatLng || isArray(options))) {
              this._latlng = toLatLng(options);
              setOptions(this, source);
            } else {
              setOptions(this, options);
              this._source = source;
            }
            if (this.options.content) {
              this._content = this.options.content;
            }
          },
          // @method openOn(map: Map): this
          // Adds the overlay to the map.
          // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
          openOn: function(map) {
            map = arguments.length ? map : this._source._map;
            if (!map.hasLayer(this)) {
              map.addLayer(this);
            }
            return this;
          },
          // @method close(): this
          // Closes the overlay.
          // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
          // and `layer.closePopup()`/`.closeTooltip()`.
          close: function() {
            if (this._map) {
              this._map.removeLayer(this);
            }
            return this;
          },
          // @method toggle(layer?: Layer): this
          // Opens or closes the overlay bound to layer depending on its current state.
          // Argument may be omitted only for overlay bound to layer.
          // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
          toggle: function(layer) {
            if (this._map) {
              this.close();
            } else {
              if (arguments.length) {
                this._source = layer;
              } else {
                layer = this._source;
              }
              this._prepareOpen();
              this.openOn(layer._map);
            }
            return this;
          },
          onAdd: function(map) {
            this._zoomAnimated = map._zoomAnimated;
            if (!this._container) {
              this._initLayout();
            }
            if (map._fadeAnimated) {
              setOpacity(this._container, 0);
            }
            clearTimeout(this._removeTimeout);
            this.getPane().appendChild(this._container);
            this.update();
            if (map._fadeAnimated) {
              setOpacity(this._container, 1);
            }
            this.bringToFront();
            if (this.options.interactive) {
              addClass(this._container, "leaflet-interactive");
              this.addInteractiveTarget(this._container);
            }
          },
          onRemove: function(map) {
            if (map._fadeAnimated) {
              setOpacity(this._container, 0);
              this._removeTimeout = setTimeout(bind2(remove, void 0, this._container), 200);
            } else {
              remove(this._container);
            }
            if (this.options.interactive) {
              removeClass(this._container, "leaflet-interactive");
              this.removeInteractiveTarget(this._container);
            }
          },
          // @namespace DivOverlay
          // @method getLatLng: LatLng
          // Returns the geographical point of the overlay.
          getLatLng: function() {
            return this._latlng;
          },
          // @method setLatLng(latlng: LatLng): this
          // Sets the geographical point where the overlay will open.
          setLatLng: function(latlng) {
            this._latlng = toLatLng(latlng);
            if (this._map) {
              this._updatePosition();
              this._adjustPan();
            }
            return this;
          },
          // @method getContent: String|HTMLElement
          // Returns the content of the overlay.
          getContent: function() {
            return this._content;
          },
          // @method setContent(htmlContent: String|HTMLElement|Function): this
          // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
          // The function should return a `String` or `HTMLElement` to be used in the overlay.
          setContent: function(content) {
            this._content = content;
            this.update();
            return this;
          },
          // @method getElement: String|HTMLElement
          // Returns the HTML container of the overlay.
          getElement: function() {
            return this._container;
          },
          // @method update: null
          // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
          update: function() {
            if (!this._map) {
              return;
            }
            this._container.style.visibility = "hidden";
            this._updateContent();
            this._updateLayout();
            this._updatePosition();
            this._container.style.visibility = "";
            this._adjustPan();
          },
          getEvents: function() {
            var events = {
              zoom: this._updatePosition,
              viewreset: this._updatePosition
            };
            if (this._zoomAnimated) {
              events.zoomanim = this._animateZoom;
            }
            return events;
          },
          // @method isOpen: Boolean
          // Returns `true` when the overlay is visible on the map.
          isOpen: function() {
            return !!this._map && this._map.hasLayer(this);
          },
          // @method bringToFront: this
          // Brings this overlay in front of other overlays (in the same map pane).
          bringToFront: function() {
            if (this._map) {
              toFront(this._container);
            }
            return this;
          },
          // @method bringToBack: this
          // Brings this overlay to the back of other overlays (in the same map pane).
          bringToBack: function() {
            if (this._map) {
              toBack(this._container);
            }
            return this;
          },
          // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
          _prepareOpen: function(latlng) {
            var source = this._source;
            if (!source._map) {
              return false;
            }
            if (source instanceof FeatureGroup) {
              source = null;
              var layers2 = this._source._layers;
              for (var id in layers2) {
                if (layers2[id]._map) {
                  source = layers2[id];
                  break;
                }
              }
              if (!source) {
                return false;
              }
              this._source = source;
            }
            if (!latlng) {
              if (source.getCenter) {
                latlng = source.getCenter();
              } else if (source.getLatLng) {
                latlng = source.getLatLng();
              } else if (source.getBounds) {
                latlng = source.getBounds().getCenter();
              } else {
                throw new Error("Unable to get source layer LatLng.");
              }
            }
            this.setLatLng(latlng);
            if (this._map) {
              this.update();
            }
            return true;
          },
          _updateContent: function() {
            if (!this._content) {
              return;
            }
            var node = this._contentNode;
            var content = typeof this._content === "function" ? this._content(this._source || this) : this._content;
            if (typeof content === "string") {
              node.innerHTML = content;
            } else {
              while (node.hasChildNodes()) {
                node.removeChild(node.firstChild);
              }
              node.appendChild(content);
            }
            this.fire("contentupdate");
          },
          _updatePosition: function() {
            if (!this._map) {
              return;
            }
            var pos = this._map.latLngToLayerPoint(this._latlng), offset = toPoint(this.options.offset), anchor = this._getAnchor();
            if (this._zoomAnimated) {
              setPosition(this._container, pos.add(anchor));
            } else {
              offset = offset.add(pos).add(anchor);
            }
            var bottom = this._containerBottom = -offset.y, left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;
            this._container.style.bottom = bottom + "px";
            this._container.style.left = left + "px";
          },
          _getAnchor: function() {
            return [0, 0];
          }
        });
        Map2.include({
          _initOverlay: function(OverlayClass, content, latlng, options) {
            var overlay = content;
            if (!(overlay instanceof OverlayClass)) {
              overlay = new OverlayClass(options).setContent(content);
            }
            if (latlng) {
              overlay.setLatLng(latlng);
            }
            return overlay;
          }
        });
        Layer.include({
          _initOverlay: function(OverlayClass, old, content, options) {
            var overlay = content;
            if (overlay instanceof OverlayClass) {
              setOptions(overlay, options);
              overlay._source = this;
            } else {
              overlay = old && !options ? old : new OverlayClass(options, this);
              overlay.setContent(content);
            }
            return overlay;
          }
        });
        var Popup = DivOverlay.extend({
          // @section
          // @aka Popup options
          options: {
            // @option pane: String = 'popupPane'
            // `Map pane` where the popup will be added.
            pane: "popupPane",
            // @option offset: Point = Point(0, 7)
            // The offset of the popup position.
            offset: [0, 7],
            // @option maxWidth: Number = 300
            // Max width of the popup, in pixels.
            maxWidth: 300,
            // @option minWidth: Number = 50
            // Min width of the popup, in pixels.
            minWidth: 50,
            // @option maxHeight: Number = null
            // If set, creates a scrollable container of the given height
            // inside a popup if its content exceeds it.
            // The scrollable container can be styled using the
            // `leaflet-popup-scrolled` CSS class selector.
            maxHeight: null,
            // @option autoPan: Boolean = true
            // Set it to `false` if you don't want the map to do panning animation
            // to fit the opened popup.
            autoPan: true,
            // @option autoPanPaddingTopLeft: Point = null
            // The margin between the popup and the top left corner of the map
            // view after autopanning was performed.
            autoPanPaddingTopLeft: null,
            // @option autoPanPaddingBottomRight: Point = null
            // The margin between the popup and the bottom right corner of the map
            // view after autopanning was performed.
            autoPanPaddingBottomRight: null,
            // @option autoPanPadding: Point = Point(5, 5)
            // Equivalent of setting both top left and bottom right autopan padding to the same value.
            autoPanPadding: [5, 5],
            // @option keepInView: Boolean = false
            // Set it to `true` if you want to prevent users from panning the popup
            // off of the screen while it is open.
            keepInView: false,
            // @option closeButton: Boolean = true
            // Controls the presence of a close button in the popup.
            closeButton: true,
            // @option autoClose: Boolean = true
            // Set it to `false` if you want to override the default behavior of
            // the popup closing when another popup is opened.
            autoClose: true,
            // @option closeOnEscapeKey: Boolean = true
            // Set it to `false` if you want to override the default behavior of
            // the ESC key for closing of the popup.
            closeOnEscapeKey: true,
            // @option closeOnClick: Boolean = *
            // Set it if you want to override the default behavior of the popup closing when user clicks
            // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
            // @option className: String = ''
            // A custom CSS class name to assign to the popup.
            className: ""
          },
          // @namespace Popup
          // @method openOn(map: Map): this
          // Alternative to `map.openPopup(popup)`.
          // Adds the popup to the map and closes the previous one.
          openOn: function(map) {
            map = arguments.length ? map : this._source._map;
            if (!map.hasLayer(this) && map._popup && map._popup.options.autoClose) {
              map.removeLayer(map._popup);
            }
            map._popup = this;
            return DivOverlay.prototype.openOn.call(this, map);
          },
          onAdd: function(map) {
            DivOverlay.prototype.onAdd.call(this, map);
            map.fire("popupopen", { popup: this });
            if (this._source) {
              this._source.fire("popupopen", { popup: this }, true);
              if (!(this._source instanceof Path)) {
                this._source.on("preclick", stopPropagation);
              }
            }
          },
          onRemove: function(map) {
            DivOverlay.prototype.onRemove.call(this, map);
            map.fire("popupclose", { popup: this });
            if (this._source) {
              this._source.fire("popupclose", { popup: this }, true);
              if (!(this._source instanceof Path)) {
                this._source.off("preclick", stopPropagation);
              }
            }
          },
          getEvents: function() {
            var events = DivOverlay.prototype.getEvents.call(this);
            if (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
              events.preclick = this.close;
            }
            if (this.options.keepInView) {
              events.moveend = this._adjustPan;
            }
            return events;
          },
          _initLayout: function() {
            var prefix = "leaflet-popup", container = this._container = create$1(
              "div",
              prefix + " " + (this.options.className || "") + " leaflet-zoom-animated"
            );
            var wrapper = this._wrapper = create$1("div", prefix + "-content-wrapper", container);
            this._contentNode = create$1("div", prefix + "-content", wrapper);
            disableClickPropagation(container);
            disableScrollPropagation(this._contentNode);
            on(container, "contextmenu", stopPropagation);
            this._tipContainer = create$1("div", prefix + "-tip-container", container);
            this._tip = create$1("div", prefix + "-tip", this._tipContainer);
            if (this.options.closeButton) {
              var closeButton = this._closeButton = create$1("a", prefix + "-close-button", container);
              closeButton.setAttribute("role", "button");
              closeButton.setAttribute("aria-label", "Close popup");
              closeButton.href = "#close";
              closeButton.innerHTML = '<span aria-hidden="true">&#215;</span>';
              on(closeButton, "click", function(ev) {
                preventDefault(ev);
                this.close();
              }, this);
            }
          },
          _updateLayout: function() {
            var container = this._contentNode, style2 = container.style;
            style2.width = "";
            style2.whiteSpace = "nowrap";
            var width = container.offsetWidth;
            width = Math.min(width, this.options.maxWidth);
            width = Math.max(width, this.options.minWidth);
            style2.width = width + 1 + "px";
            style2.whiteSpace = "";
            style2.height = "";
            var height = container.offsetHeight, maxHeight = this.options.maxHeight, scrolledClass = "leaflet-popup-scrolled";
            if (maxHeight && height > maxHeight) {
              style2.height = maxHeight + "px";
              addClass(container, scrolledClass);
            } else {
              removeClass(container, scrolledClass);
            }
            this._containerWidth = this._container.offsetWidth;
          },
          _animateZoom: function(e) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), anchor = this._getAnchor();
            setPosition(this._container, pos.add(anchor));
          },
          _adjustPan: function() {
            if (!this.options.autoPan) {
              return;
            }
            if (this._map._panAnim) {
              this._map._panAnim.stop();
            }
            if (this._autopanning) {
              this._autopanning = false;
              return;
            }
            var map = this._map, marginBottom = parseInt(getStyle(this._container, "marginBottom"), 10) || 0, containerHeight = this._container.offsetHeight + marginBottom, containerWidth = this._containerWidth, layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);
            layerPos._add(getPosition(this._container));
            var containerPos = map.layerPointToContainerPoint(layerPos), padding = toPoint(this.options.autoPanPadding), paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding), paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding), size = map.getSize(), dx = 0, dy = 0;
            if (containerPos.x + containerWidth + paddingBR.x > size.x) {
              dx = containerPos.x + containerWidth - size.x + paddingBR.x;
            }
            if (containerPos.x - dx - paddingTL.x < 0) {
              dx = containerPos.x - paddingTL.x;
            }
            if (containerPos.y + containerHeight + paddingBR.y > size.y) {
              dy = containerPos.y + containerHeight - size.y + paddingBR.y;
            }
            if (containerPos.y - dy - paddingTL.y < 0) {
              dy = containerPos.y - paddingTL.y;
            }
            if (dx || dy) {
              if (this.options.keepInView) {
                this._autopanning = true;
              }
              map.fire("autopanstart").panBy([dx, dy]);
            }
          },
          _getAnchor: function() {
            return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
          }
        });
        var popup = function(options, source) {
          return new Popup(options, source);
        };
        Map2.mergeOptions({
          closePopupOnClick: true
        });
        Map2.include({
          // @method openPopup(popup: Popup): this
          // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
          // @alternative
          // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
          // Creates a popup with the specified content and options and opens it in the given point on a map.
          openPopup: function(popup2, latlng, options) {
            this._initOverlay(Popup, popup2, latlng, options).openOn(this);
            return this;
          },
          // @method closePopup(popup?: Popup): this
          // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
          closePopup: function(popup2) {
            popup2 = arguments.length ? popup2 : this._popup;
            if (popup2) {
              popup2.close();
            }
            return this;
          }
        });
        Layer.include({
          // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
          // Binds a popup to the layer with the passed `content` and sets up the
          // necessary event listeners. If a `Function` is passed it will receive
          // the layer as the first argument and should return a `String` or `HTMLElement`.
          bindPopup: function(content, options) {
            this._popup = this._initOverlay(Popup, this._popup, content, options);
            if (!this._popupHandlersAdded) {
              this.on({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
              });
              this._popupHandlersAdded = true;
            }
            return this;
          },
          // @method unbindPopup(): this
          // Removes the popup previously bound with `bindPopup`.
          unbindPopup: function() {
            if (this._popup) {
              this.off({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
              });
              this._popupHandlersAdded = false;
              this._popup = null;
            }
            return this;
          },
          // @method openPopup(latlng?: LatLng): this
          // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
          openPopup: function(latlng) {
            if (this._popup) {
              if (!(this instanceof FeatureGroup)) {
                this._popup._source = this;
              }
              if (this._popup._prepareOpen(latlng || this._latlng)) {
                this._popup.openOn(this._map);
              }
            }
            return this;
          },
          // @method closePopup(): this
          // Closes the popup bound to this layer if it is open.
          closePopup: function() {
            if (this._popup) {
              this._popup.close();
            }
            return this;
          },
          // @method togglePopup(): this
          // Opens or closes the popup bound to this layer depending on its current state.
          togglePopup: function() {
            if (this._popup) {
              this._popup.toggle(this);
            }
            return this;
          },
          // @method isPopupOpen(): boolean
          // Returns `true` if the popup bound to this layer is currently open.
          isPopupOpen: function() {
            return this._popup ? this._popup.isOpen() : false;
          },
          // @method setPopupContent(content: String|HTMLElement|Popup): this
          // Sets the content of the popup bound to this layer.
          setPopupContent: function(content) {
            if (this._popup) {
              this._popup.setContent(content);
            }
            return this;
          },
          // @method getPopup(): Popup
          // Returns the popup bound to this layer.
          getPopup: function() {
            return this._popup;
          },
          _openPopup: function(e) {
            if (!this._popup || !this._map) {
              return;
            }
            stop(e);
            var target = e.layer || e.target;
            if (this._popup._source === target && !(target instanceof Path)) {
              if (this._map.hasLayer(this._popup)) {
                this.closePopup();
              } else {
                this.openPopup(e.latlng);
              }
              return;
            }
            this._popup._source = target;
            this.openPopup(e.latlng);
          },
          _movePopup: function(e) {
            this._popup.setLatLng(e.latlng);
          },
          _onKeyPress: function(e) {
            if (e.originalEvent.keyCode === 13) {
              this._openPopup(e);
            }
          }
        });
        var Tooltip = DivOverlay.extend({
          // @section
          // @aka Tooltip options
          options: {
            // @option pane: String = 'tooltipPane'
            // `Map pane` where the tooltip will be added.
            pane: "tooltipPane",
            // @option offset: Point = Point(0, 0)
            // Optional offset of the tooltip position.
            offset: [0, 0],
            // @option direction: String = 'auto'
            // Direction where to open the tooltip. Possible values are: `right`, `left`,
            // `top`, `bottom`, `center`, `auto`.
            // `auto` will dynamically switch between `right` and `left` according to the tooltip
            // position on the map.
            direction: "auto",
            // @option permanent: Boolean = false
            // Whether to open the tooltip permanently or only on mouseover.
            permanent: false,
            // @option sticky: Boolean = false
            // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
            sticky: false,
            // @option opacity: Number = 0.9
            // Tooltip container opacity.
            opacity: 0.9
          },
          onAdd: function(map) {
            DivOverlay.prototype.onAdd.call(this, map);
            this.setOpacity(this.options.opacity);
            map.fire("tooltipopen", { tooltip: this });
            if (this._source) {
              this.addEventParent(this._source);
              this._source.fire("tooltipopen", { tooltip: this }, true);
            }
          },
          onRemove: function(map) {
            DivOverlay.prototype.onRemove.call(this, map);
            map.fire("tooltipclose", { tooltip: this });
            if (this._source) {
              this.removeEventParent(this._source);
              this._source.fire("tooltipclose", { tooltip: this }, true);
            }
          },
          getEvents: function() {
            var events = DivOverlay.prototype.getEvents.call(this);
            if (!this.options.permanent) {
              events.preclick = this.close;
            }
            return events;
          },
          _initLayout: function() {
            var prefix = "leaflet-tooltip", className = prefix + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            this._contentNode = this._container = create$1("div", className);
            this._container.setAttribute("role", "tooltip");
            this._container.setAttribute("id", "leaflet-tooltip-" + stamp(this));
          },
          _updateLayout: function() {
          },
          _adjustPan: function() {
          },
          _setPosition: function(pos) {
            var subX, subY, map = this._map, container = this._container, centerPoint = map.latLngToContainerPoint(map.getCenter()), tooltipPoint = map.layerPointToContainerPoint(pos), direction = this.options.direction, tooltipWidth = container.offsetWidth, tooltipHeight = container.offsetHeight, offset = toPoint(this.options.offset), anchor = this._getAnchor();
            if (direction === "top") {
              subX = tooltipWidth / 2;
              subY = tooltipHeight;
            } else if (direction === "bottom") {
              subX = tooltipWidth / 2;
              subY = 0;
            } else if (direction === "center") {
              subX = tooltipWidth / 2;
              subY = tooltipHeight / 2;
            } else if (direction === "right") {
              subX = 0;
              subY = tooltipHeight / 2;
            } else if (direction === "left") {
              subX = tooltipWidth;
              subY = tooltipHeight / 2;
            } else if (tooltipPoint.x < centerPoint.x) {
              direction = "right";
              subX = 0;
              subY = tooltipHeight / 2;
            } else {
              direction = "left";
              subX = tooltipWidth + (offset.x + anchor.x) * 2;
              subY = tooltipHeight / 2;
            }
            pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);
            removeClass(container, "leaflet-tooltip-right");
            removeClass(container, "leaflet-tooltip-left");
            removeClass(container, "leaflet-tooltip-top");
            removeClass(container, "leaflet-tooltip-bottom");
            addClass(container, "leaflet-tooltip-" + direction);
            setPosition(container, pos);
          },
          _updatePosition: function() {
            var pos = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(pos);
          },
          setOpacity: function(opacity) {
            this.options.opacity = opacity;
            if (this._container) {
              setOpacity(this._container, opacity);
            }
          },
          _animateZoom: function(e) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
            this._setPosition(pos);
          },
          _getAnchor: function() {
            return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
          }
        });
        var tooltip = function(options, source) {
          return new Tooltip(options, source);
        };
        Map2.include({
          // @method openTooltip(tooltip: Tooltip): this
          // Opens the specified tooltip.
          // @alternative
          // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
          // Creates a tooltip with the specified content and options and open it.
          openTooltip: function(tooltip2, latlng, options) {
            this._initOverlay(Tooltip, tooltip2, latlng, options).openOn(this);
            return this;
          },
          // @method closeTooltip(tooltip: Tooltip): this
          // Closes the tooltip given as parameter.
          closeTooltip: function(tooltip2) {
            tooltip2.close();
            return this;
          }
        });
        Layer.include({
          // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
          // Binds a tooltip to the layer with the passed `content` and sets up the
          // necessary event listeners. If a `Function` is passed it will receive
          // the layer as the first argument and should return a `String` or `HTMLElement`.
          bindTooltip: function(content, options) {
            if (this._tooltip && this.isTooltipOpen()) {
              this.unbindTooltip();
            }
            this._tooltip = this._initOverlay(Tooltip, this._tooltip, content, options);
            this._initTooltipInteractions();
            if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
              this.openTooltip();
            }
            return this;
          },
          // @method unbindTooltip(): this
          // Removes the tooltip previously bound with `bindTooltip`.
          unbindTooltip: function() {
            if (this._tooltip) {
              this._initTooltipInteractions(true);
              this.closeTooltip();
              this._tooltip = null;
            }
            return this;
          },
          _initTooltipInteractions: function(remove2) {
            if (!remove2 && this._tooltipHandlersAdded) {
              return;
            }
            var onOff = remove2 ? "off" : "on", events = {
              remove: this.closeTooltip,
              move: this._moveTooltip
            };
            if (!this._tooltip.options.permanent) {
              events.mouseover = this._openTooltip;
              events.mouseout = this.closeTooltip;
              events.click = this._openTooltip;
              if (this._map) {
                this._addFocusListeners();
              } else {
                events.add = this._addFocusListeners;
              }
            } else {
              events.add = this._openTooltip;
            }
            if (this._tooltip.options.sticky) {
              events.mousemove = this._moveTooltip;
            }
            this[onOff](events);
            this._tooltipHandlersAdded = !remove2;
          },
          // @method openTooltip(latlng?: LatLng): this
          // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
          openTooltip: function(latlng) {
            if (this._tooltip) {
              if (!(this instanceof FeatureGroup)) {
                this._tooltip._source = this;
              }
              if (this._tooltip._prepareOpen(latlng)) {
                this._tooltip.openOn(this._map);
                if (this.getElement) {
                  this._setAriaDescribedByOnLayer(this);
                } else if (this.eachLayer) {
                  this.eachLayer(this._setAriaDescribedByOnLayer, this);
                }
              }
            }
            return this;
          },
          // @method closeTooltip(): this
          // Closes the tooltip bound to this layer if it is open.
          closeTooltip: function() {
            if (this._tooltip) {
              return this._tooltip.close();
            }
          },
          // @method toggleTooltip(): this
          // Opens or closes the tooltip bound to this layer depending on its current state.
          toggleTooltip: function() {
            if (this._tooltip) {
              this._tooltip.toggle(this);
            }
            return this;
          },
          // @method isTooltipOpen(): boolean
          // Returns `true` if the tooltip bound to this layer is currently open.
          isTooltipOpen: function() {
            return this._tooltip.isOpen();
          },
          // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
          // Sets the content of the tooltip bound to this layer.
          setTooltipContent: function(content) {
            if (this._tooltip) {
              this._tooltip.setContent(content);
            }
            return this;
          },
          // @method getTooltip(): Tooltip
          // Returns the tooltip bound to this layer.
          getTooltip: function() {
            return this._tooltip;
          },
          _addFocusListeners: function() {
            if (this.getElement) {
              this._addFocusListenersOnLayer(this);
            } else if (this.eachLayer) {
              this.eachLayer(this._addFocusListenersOnLayer, this);
            }
          },
          _addFocusListenersOnLayer: function(layer) {
            var el = typeof layer.getElement === "function" && layer.getElement();
            if (el) {
              on(el, "focus", function() {
                this._tooltip._source = layer;
                this.openTooltip();
              }, this);
              on(el, "blur", this.closeTooltip, this);
            }
          },
          _setAriaDescribedByOnLayer: function(layer) {
            var el = typeof layer.getElement === "function" && layer.getElement();
            if (el) {
              el.setAttribute("aria-describedby", this._tooltip._container.id);
            }
          },
          _openTooltip: function(e) {
            if (!this._tooltip || !this._map) {
              return;
            }
            if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
              this._openOnceFlag = true;
              var that = this;
              this._map.once("moveend", function() {
                that._openOnceFlag = false;
                that._openTooltip(e);
              });
              return;
            }
            this._tooltip._source = e.layer || e.target;
            this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0);
          },
          _moveTooltip: function(e) {
            var latlng = e.latlng, containerPoint, layerPoint;
            if (this._tooltip.options.sticky && e.originalEvent) {
              containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
              layerPoint = this._map.containerPointToLayerPoint(containerPoint);
              latlng = this._map.layerPointToLatLng(layerPoint);
            }
            this._tooltip.setLatLng(latlng);
          }
        });
        var DivIcon = Icon.extend({
          options: {
            // @section
            // @aka DivIcon options
            iconSize: [12, 12],
            // also can be set through CSS
            // iconAnchor: (Point),
            // popupAnchor: (Point),
            // @option html: String|HTMLElement = ''
            // Custom HTML code to put inside the div element, empty by default. Alternatively,
            // an instance of `HTMLElement`.
            html: false,
            // @option bgPos: Point = [0, 0]
            // Optional relative position of the background, in pixels
            bgPos: null,
            className: "leaflet-div-icon"
          },
          createIcon: function(oldIcon) {
            var div = oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"), options = this.options;
            if (options.html instanceof Element) {
              empty2(div);
              div.appendChild(options.html);
            } else {
              div.innerHTML = options.html !== false ? options.html : "";
            }
            if (options.bgPos) {
              var bgPos = toPoint(options.bgPos);
              div.style.backgroundPosition = -bgPos.x + "px " + -bgPos.y + "px";
            }
            this._setIconStyles(div, "icon");
            return div;
          },
          createShadow: function() {
            return null;
          }
        });
        function divIcon(options) {
          return new DivIcon(options);
        }
        Icon.Default = IconDefault;
        var GridLayer = Layer.extend({
          // @section
          // @aka GridLayer options
          options: {
            // @option tileSize: Number|Point = 256
            // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
            tileSize: 256,
            // @option opacity: Number = 1.0
            // Opacity of the tiles. Can be used in the `createTile()` function.
            opacity: 1,
            // @option updateWhenIdle: Boolean = (depends)
            // Load new tiles only when panning ends.
            // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
            // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
            // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
            updateWhenIdle: Browser.mobile,
            // @option updateWhenZooming: Boolean = true
            // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
            updateWhenZooming: true,
            // @option updateInterval: Number = 200
            // Tiles will not update more than once every `updateInterval` milliseconds when panning.
            updateInterval: 200,
            // @option zIndex: Number = 1
            // The explicit zIndex of the tile layer.
            zIndex: 1,
            // @option bounds: LatLngBounds = undefined
            // If set, tiles will only be loaded inside the set `LatLngBounds`.
            bounds: null,
            // @option minZoom: Number = 0
            // The minimum zoom level down to which this layer will be displayed (inclusive).
            minZoom: 0,
            // @option maxZoom: Number = undefined
            // The maximum zoom level up to which this layer will be displayed (inclusive).
            maxZoom: void 0,
            // @option maxNativeZoom: Number = undefined
            // Maximum zoom number the tile source has available. If it is specified,
            // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
            // from `maxNativeZoom` level and auto-scaled.
            maxNativeZoom: void 0,
            // @option minNativeZoom: Number = undefined
            // Minimum zoom number the tile source has available. If it is specified,
            // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
            // from `minNativeZoom` level and auto-scaled.
            minNativeZoom: void 0,
            // @option noWrap: Boolean = false
            // Whether the layer is wrapped around the antimeridian. If `true`, the
            // GridLayer will only be displayed once at low zoom levels. Has no
            // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
            // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
            // tiles outside the CRS limits.
            noWrap: false,
            // @option pane: String = 'tilePane'
            // `Map pane` where the grid layer will be added.
            pane: "tilePane",
            // @option className: String = ''
            // A custom class name to assign to the tile layer. Empty by default.
            className: "",
            // @option keepBuffer: Number = 2
            // When panning the map, keep this many rows and columns of tiles before unloading them.
            keepBuffer: 2
          },
          initialize: function(options) {
            setOptions(this, options);
          },
          onAdd: function() {
            this._initContainer();
            this._levels = {};
            this._tiles = {};
            this._resetView();
          },
          beforeAdd: function(map) {
            map._addZoomLimit(this);
          },
          onRemove: function(map) {
            this._removeAllTiles();
            remove(this._container);
            map._removeZoomLimit(this);
            this._container = null;
            this._tileZoom = void 0;
          },
          // @method bringToFront: this
          // Brings the tile layer to the top of all tile layers.
          bringToFront: function() {
            if (this._map) {
              toFront(this._container);
              this._setAutoZIndex(Math.max);
            }
            return this;
          },
          // @method bringToBack: this
          // Brings the tile layer to the bottom of all tile layers.
          bringToBack: function() {
            if (this._map) {
              toBack(this._container);
              this._setAutoZIndex(Math.min);
            }
            return this;
          },
          // @method getContainer: HTMLElement
          // Returns the HTML element that contains the tiles for this layer.
          getContainer: function() {
            return this._container;
          },
          // @method setOpacity(opacity: Number): this
          // Changes the [opacity](#gridlayer-opacity) of the grid layer.
          setOpacity: function(opacity) {
            this.options.opacity = opacity;
            this._updateOpacity();
            return this;
          },
          // @method setZIndex(zIndex: Number): this
          // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
          setZIndex: function(zIndex) {
            this.options.zIndex = zIndex;
            this._updateZIndex();
            return this;
          },
          // @method isLoading: Boolean
          // Returns `true` if any tile in the grid layer has not finished loading.
          isLoading: function() {
            return this._loading;
          },
          // @method redraw: this
          // Causes the layer to clear all the tiles and request them again.
          redraw: function() {
            if (this._map) {
              this._removeAllTiles();
              var tileZoom = this._clampZoom(this._map.getZoom());
              if (tileZoom !== this._tileZoom) {
                this._tileZoom = tileZoom;
                this._updateLevels();
              }
              this._update();
            }
            return this;
          },
          getEvents: function() {
            var events = {
              viewprereset: this._invalidateAll,
              viewreset: this._resetView,
              zoom: this._resetView,
              moveend: this._onMoveEnd
            };
            if (!this.options.updateWhenIdle) {
              if (!this._onMove) {
                this._onMove = throttle(this._onMoveEnd, this.options.updateInterval, this);
              }
              events.move = this._onMove;
            }
            if (this._zoomAnimated) {
              events.zoomanim = this._animateZoom;
            }
            return events;
          },
          // @section Extension methods
          // Layers extending `GridLayer` shall reimplement the following method.
          // @method createTile(coords: Object, done?: Function): HTMLElement
          // Called only internally, must be overridden by classes extending `GridLayer`.
          // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
          // is specified, it must be called when the tile has finished loading and drawing.
          createTile: function() {
            return document.createElement("div");
          },
          // @section
          // @method getTileSize: Point
          // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
          getTileSize: function() {
            var s = this.options.tileSize;
            return s instanceof Point ? s : new Point(s, s);
          },
          _updateZIndex: function() {
            if (this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
              this._container.style.zIndex = this.options.zIndex;
            }
          },
          _setAutoZIndex: function(compare) {
            var layers2 = this.getPane().children, edgeZIndex = -compare(-Infinity, Infinity);
            for (var i = 0, len = layers2.length, zIndex; i < len; i++) {
              zIndex = layers2[i].style.zIndex;
              if (layers2[i] !== this._container && zIndex) {
                edgeZIndex = compare(edgeZIndex, +zIndex);
              }
            }
            if (isFinite(edgeZIndex)) {
              this.options.zIndex = edgeZIndex + compare(-1, 1);
              this._updateZIndex();
            }
          },
          _updateOpacity: function() {
            if (!this._map) {
              return;
            }
            if (Browser.ielt9) {
              return;
            }
            setOpacity(this._container, this.options.opacity);
            var now2 = +/* @__PURE__ */ new Date(), nextFrame = false, willPrune = false;
            for (var key in this._tiles) {
              var tile = this._tiles[key];
              if (!tile.current || !tile.loaded) {
                continue;
              }
              var fade = Math.min(1, (now2 - tile.loaded) / 200);
              setOpacity(tile.el, fade);
              if (fade < 1) {
                nextFrame = true;
              } else {
                if (tile.active) {
                  willPrune = true;
                } else {
                  this._onOpaqueTile(tile);
                }
                tile.active = true;
              }
            }
            if (willPrune && !this._noPrune) {
              this._pruneTiles();
            }
            if (nextFrame) {
              cancelAnimFrame(this._fadeFrame);
              this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
            }
          },
          _onOpaqueTile: falseFn,
          _initContainer: function() {
            if (this._container) {
              return;
            }
            this._container = create$1("div", "leaflet-layer " + (this.options.className || ""));
            this._updateZIndex();
            if (this.options.opacity < 1) {
              this._updateOpacity();
            }
            this.getPane().appendChild(this._container);
          },
          _updateLevels: function() {
            var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom;
            if (zoom2 === void 0) {
              return void 0;
            }
            for (var z in this._levels) {
              z = Number(z);
              if (this._levels[z].el.children.length || z === zoom2) {
                this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom2 - z);
                this._onUpdateLevel(z);
              } else {
                remove(this._levels[z].el);
                this._removeTilesAtZoom(z);
                this._onRemoveLevel(z);
                delete this._levels[z];
              }
            }
            var level = this._levels[zoom2], map = this._map;
            if (!level) {
              level = this._levels[zoom2] = {};
              level.el = create$1("div", "leaflet-tile-container leaflet-zoom-animated", this._container);
              level.el.style.zIndex = maxZoom;
              level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom2).round();
              level.zoom = zoom2;
              this._setZoomTransform(level, map.getCenter(), map.getZoom());
              falseFn(level.el.offsetWidth);
              this._onCreateLevel(level);
            }
            this._level = level;
            return level;
          },
          _onUpdateLevel: falseFn,
          _onRemoveLevel: falseFn,
          _onCreateLevel: falseFn,
          _pruneTiles: function() {
            if (!this._map) {
              return;
            }
            var key, tile;
            var zoom2 = this._map.getZoom();
            if (zoom2 > this.options.maxZoom || zoom2 < this.options.minZoom) {
              this._removeAllTiles();
              return;
            }
            for (key in this._tiles) {
              tile = this._tiles[key];
              tile.retain = tile.current;
            }
            for (key in this._tiles) {
              tile = this._tiles[key];
              if (tile.current && !tile.active) {
                var coords = tile.coords;
                if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
                  this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
                }
              }
            }
            for (key in this._tiles) {
              if (!this._tiles[key].retain) {
                this._removeTile(key);
              }
            }
          },
          _removeTilesAtZoom: function(zoom2) {
            for (var key in this._tiles) {
              if (this._tiles[key].coords.z !== zoom2) {
                continue;
              }
              this._removeTile(key);
            }
          },
          _removeAllTiles: function() {
            for (var key in this._tiles) {
              this._removeTile(key);
            }
          },
          _invalidateAll: function() {
            for (var z in this._levels) {
              remove(this._levels[z].el);
              this._onRemoveLevel(Number(z));
              delete this._levels[z];
            }
            this._removeAllTiles();
            this._tileZoom = void 0;
          },
          _retainParent: function(x2, y, z, minZoom) {
            var x22 = Math.floor(x2 / 2), y2 = Math.floor(y / 2), z2 = z - 1, coords2 = new Point(+x22, +y2);
            coords2.z = +z2;
            var key = this._tileCoordsToKey(coords2), tile = this._tiles[key];
            if (tile && tile.active) {
              tile.retain = true;
              return true;
            } else if (tile && tile.loaded) {
              tile.retain = true;
            }
            if (z2 > minZoom) {
              return this._retainParent(x22, y2, z2, minZoom);
            }
            return false;
          },
          _retainChildren: function(x2, y, z, maxZoom) {
            for (var i = 2 * x2; i < 2 * x2 + 2; i++) {
              for (var j = 2 * y; j < 2 * y + 2; j++) {
                var coords = new Point(i, j);
                coords.z = z + 1;
                var key = this._tileCoordsToKey(coords), tile = this._tiles[key];
                if (tile && tile.active) {
                  tile.retain = true;
                  continue;
                } else if (tile && tile.loaded) {
                  tile.retain = true;
                }
                if (z + 1 < maxZoom) {
                  this._retainChildren(i, j, z + 1, maxZoom);
                }
              }
            }
          },
          _resetView: function(e) {
            var animating = e && (e.pinch || e.flyTo);
            this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
          },
          _animateZoom: function(e) {
            this._setView(e.center, e.zoom, true, e.noUpdate);
          },
          _clampZoom: function(zoom2) {
            var options = this.options;
            if (void 0 !== options.minNativeZoom && zoom2 < options.minNativeZoom) {
              return options.minNativeZoom;
            }
            if (void 0 !== options.maxNativeZoom && options.maxNativeZoom < zoom2) {
              return options.maxNativeZoom;
            }
            return zoom2;
          },
          _setView: function(center, zoom2, noPrune, noUpdate) {
            var tileZoom = Math.round(zoom2);
            if (this.options.maxZoom !== void 0 && tileZoom > this.options.maxZoom || this.options.minZoom !== void 0 && tileZoom < this.options.minZoom) {
              tileZoom = void 0;
            } else {
              tileZoom = this._clampZoom(tileZoom);
            }
            var tileZoomChanged = this.options.updateWhenZooming && tileZoom !== this._tileZoom;
            if (!noUpdate || tileZoomChanged) {
              this._tileZoom = tileZoom;
              if (this._abortLoading) {
                this._abortLoading();
              }
              this._updateLevels();
              this._resetGrid();
              if (tileZoom !== void 0) {
                this._update(center);
              }
              if (!noPrune) {
                this._pruneTiles();
              }
              this._noPrune = !!noPrune;
            }
            this._setZoomTransforms(center, zoom2);
          },
          _setZoomTransforms: function(center, zoom2) {
            for (var i in this._levels) {
              this._setZoomTransform(this._levels[i], center, zoom2);
            }
          },
          _setZoomTransform: function(level, center, zoom2) {
            var scale2 = this._map.getZoomScale(zoom2, level.zoom), translate = level.origin.multiplyBy(scale2).subtract(this._map._getNewPixelOrigin(center, zoom2)).round();
            if (Browser.any3d) {
              setTransform(level.el, translate, scale2);
            } else {
              setPosition(level.el, translate);
            }
          },
          _resetGrid: function() {
            var map = this._map, crs = map.options.crs, tileSize = this._tileSize = this.getTileSize(), tileZoom = this._tileZoom;
            var bounds = this._map.getPixelWorldBounds(this._tileZoom);
            if (bounds) {
              this._globalTileRange = this._pxBoundsToTileRange(bounds);
            }
            this._wrapX = crs.wrapLng && !this.options.noWrap && [
              Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
              Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
            ];
            this._wrapY = crs.wrapLat && !this.options.noWrap && [
              Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
              Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
            ];
          },
          _onMoveEnd: function() {
            if (!this._map || this._map._animatingZoom) {
              return;
            }
            this._update();
          },
          _getTiledPixelBounds: function(center) {
            var map = this._map, mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(), scale2 = map.getZoomScale(mapZoom, this._tileZoom), pixelCenter = map.project(center, this._tileZoom).floor(), halfSize = map.getSize().divideBy(scale2 * 2);
            return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
          },
          // Private method to load tiles in the grid's active zoom level according to map bounds
          _update: function(center) {
            var map = this._map;
            if (!map) {
              return;
            }
            var zoom2 = this._clampZoom(map.getZoom());
            if (center === void 0) {
              center = map.getCenter();
            }
            if (this._tileZoom === void 0) {
              return;
            }
            var pixelBounds = this._getTiledPixelBounds(center), tileRange = this._pxBoundsToTileRange(pixelBounds), tileCenter = tileRange.getCenter(), queue = [], margin = this.options.keepBuffer, noPruneRange = new Bounds(
              tileRange.getBottomLeft().subtract([margin, -margin]),
              tileRange.getTopRight().add([margin, -margin])
            );
            if (!(isFinite(tileRange.min.x) && isFinite(tileRange.min.y) && isFinite(tileRange.max.x) && isFinite(tileRange.max.y))) {
              throw new Error("Attempted to load an infinite number of tiles");
            }
            for (var key in this._tiles) {
              var c = this._tiles[key].coords;
              if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
                this._tiles[key].current = false;
              }
            }
            if (Math.abs(zoom2 - this._tileZoom) > 1) {
              this._setView(center, zoom2);
              return;
            }
            for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
              for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
                var coords = new Point(i, j);
                coords.z = this._tileZoom;
                if (!this._isValidTile(coords)) {
                  continue;
                }
                var tile = this._tiles[this._tileCoordsToKey(coords)];
                if (tile) {
                  tile.current = true;
                } else {
                  queue.push(coords);
                }
              }
            }
            queue.sort(function(a, b) {
              return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
            });
            if (queue.length !== 0) {
              if (!this._loading) {
                this._loading = true;
                this.fire("loading");
              }
              var fragment = document.createDocumentFragment();
              for (i = 0; i < queue.length; i++) {
                this._addTile(queue[i], fragment);
              }
              this._level.el.appendChild(fragment);
            }
          },
          _isValidTile: function(coords) {
            var crs = this._map.options.crs;
            if (!crs.infinite) {
              var bounds = this._globalTileRange;
              if (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x) || !crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y)) {
                return false;
              }
            }
            if (!this.options.bounds) {
              return true;
            }
            var tileBounds = this._tileCoordsToBounds(coords);
            return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
          },
          _keyToBounds: function(key) {
            return this._tileCoordsToBounds(this._keyToTileCoords(key));
          },
          _tileCoordsToNwSe: function(coords) {
            var map = this._map, tileSize = this.getTileSize(), nwPoint = coords.scaleBy(tileSize), sePoint = nwPoint.add(tileSize), nw = map.unproject(nwPoint, coords.z), se = map.unproject(sePoint, coords.z);
            return [nw, se];
          },
          // converts tile coordinates to its geographical bounds
          _tileCoordsToBounds: function(coords) {
            var bp = this._tileCoordsToNwSe(coords), bounds = new LatLngBounds(bp[0], bp[1]);
            if (!this.options.noWrap) {
              bounds = this._map.wrapLatLngBounds(bounds);
            }
            return bounds;
          },
          // converts tile coordinates to key for the tile cache
          _tileCoordsToKey: function(coords) {
            return coords.x + ":" + coords.y + ":" + coords.z;
          },
          // converts tile cache key to coordinates
          _keyToTileCoords: function(key) {
            var k2 = key.split(":"), coords = new Point(+k2[0], +k2[1]);
            coords.z = +k2[2];
            return coords;
          },
          _removeTile: function(key) {
            var tile = this._tiles[key];
            if (!tile) {
              return;
            }
            remove(tile.el);
            delete this._tiles[key];
            this.fire("tileunload", {
              tile: tile.el,
              coords: this._keyToTileCoords(key)
            });
          },
          _initTile: function(tile) {
            addClass(tile, "leaflet-tile");
            var tileSize = this.getTileSize();
            tile.style.width = tileSize.x + "px";
            tile.style.height = tileSize.y + "px";
            tile.onselectstart = falseFn;
            tile.onmousemove = falseFn;
            if (Browser.ielt9 && this.options.opacity < 1) {
              setOpacity(tile, this.options.opacity);
            }
          },
          _addTile: function(coords, container) {
            var tilePos = this._getTilePos(coords), key = this._tileCoordsToKey(coords);
            var tile = this.createTile(this._wrapCoords(coords), bind2(this._tileReady, this, coords));
            this._initTile(tile);
            if (this.createTile.length < 2) {
              requestAnimFrame(bind2(this._tileReady, this, coords, null, tile));
            }
            setPosition(tile, tilePos);
            this._tiles[key] = {
              el: tile,
              coords,
              current: true
            };
            container.appendChild(tile);
            this.fire("tileloadstart", {
              tile,
              coords
            });
          },
          _tileReady: function(coords, err, tile) {
            if (err) {
              this.fire("tileerror", {
                error: err,
                tile,
                coords
              });
            }
            var key = this._tileCoordsToKey(coords);
            tile = this._tiles[key];
            if (!tile) {
              return;
            }
            tile.loaded = +/* @__PURE__ */ new Date();
            if (this._map._fadeAnimated) {
              setOpacity(tile.el, 0);
              cancelAnimFrame(this._fadeFrame);
              this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
            } else {
              tile.active = true;
              this._pruneTiles();
            }
            if (!err) {
              addClass(tile.el, "leaflet-tile-loaded");
              this.fire("tileload", {
                tile: tile.el,
                coords
              });
            }
            if (this._noTilesToLoad()) {
              this._loading = false;
              this.fire("load");
              if (Browser.ielt9 || !this._map._fadeAnimated) {
                requestAnimFrame(this._pruneTiles, this);
              } else {
                setTimeout(bind2(this._pruneTiles, this), 250);
              }
            }
          },
          _getTilePos: function(coords) {
            return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
          },
          _wrapCoords: function(coords) {
            var newCoords = new Point(
              this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
              this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y
            );
            newCoords.z = coords.z;
            return newCoords;
          },
          _pxBoundsToTileRange: function(bounds) {
            var tileSize = this.getTileSize();
            return new Bounds(
              bounds.min.unscaleBy(tileSize).floor(),
              bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1])
            );
          },
          _noTilesToLoad: function() {
            for (var key in this._tiles) {
              if (!this._tiles[key].loaded) {
                return false;
              }
            }
            return true;
          }
        });
        function gridLayer(options) {
          return new GridLayer(options);
        }
        var TileLayer = GridLayer.extend({
          // @section
          // @aka TileLayer options
          options: {
            // @option minZoom: Number = 0
            // The minimum zoom level down to which this layer will be displayed (inclusive).
            minZoom: 0,
            // @option maxZoom: Number = 18
            // The maximum zoom level up to which this layer will be displayed (inclusive).
            maxZoom: 18,
            // @option subdomains: String|String[] = 'abc'
            // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
            subdomains: "abc",
            // @option errorTileUrl: String = ''
            // URL to the tile image to show in place of the tile that failed to load.
            errorTileUrl: "",
            // @option zoomOffset: Number = 0
            // The zoom number used in tile URLs will be offset with this value.
            zoomOffset: 0,
            // @option tms: Boolean = false
            // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
            tms: false,
            // @option zoomReverse: Boolean = false
            // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
            zoomReverse: false,
            // @option detectRetina: Boolean = false
            // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
            detectRetina: false,
            // @option crossOrigin: Boolean|String = false
            // Whether the crossOrigin attribute will be added to the tiles.
            // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
            // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
            crossOrigin: false,
            // @option referrerPolicy: Boolean|String = false
            // Whether the referrerPolicy attribute will be added to the tiles.
            // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
            // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
            // (e.g. to validate an API token).
            // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
            referrerPolicy: false
          },
          initialize: function(url, options) {
            this._url = url;
            options = setOptions(this, options);
            if (options.detectRetina && Browser.retina && options.maxZoom > 0) {
              options.tileSize = Math.floor(options.tileSize / 2);
              if (!options.zoomReverse) {
                options.zoomOffset++;
                options.maxZoom = Math.max(options.minZoom, options.maxZoom - 1);
              } else {
                options.zoomOffset--;
                options.minZoom = Math.min(options.maxZoom, options.minZoom + 1);
              }
              options.minZoom = Math.max(0, options.minZoom);
            } else if (!options.zoomReverse) {
              options.maxZoom = Math.max(options.minZoom, options.maxZoom);
            } else {
              options.minZoom = Math.min(options.maxZoom, options.minZoom);
            }
            if (typeof options.subdomains === "string") {
              options.subdomains = options.subdomains.split("");
            }
            this.on("tileunload", this._onTileRemove);
          },
          // @method setUrl(url: String, noRedraw?: Boolean): this
          // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
          // If the URL does not change, the layer will not be redrawn unless
          // the noRedraw parameter is set to false.
          setUrl: function(url, noRedraw) {
            if (this._url === url && noRedraw === void 0) {
              noRedraw = true;
            }
            this._url = url;
            if (!noRedraw) {
              this.redraw();
            }
            return this;
          },
          // @method createTile(coords: Object, done?: Function): HTMLElement
          // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
          // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
          // callback is called when the tile has been loaded.
          createTile: function(coords, done) {
            var tile = document.createElement("img");
            on(tile, "load", bind2(this._tileOnLoad, this, done, tile));
            on(tile, "error", bind2(this._tileOnError, this, done, tile));
            if (this.options.crossOrigin || this.options.crossOrigin === "") {
              tile.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
            }
            if (typeof this.options.referrerPolicy === "string") {
              tile.referrerPolicy = this.options.referrerPolicy;
            }
            tile.alt = "";
            tile.src = this.getTileUrl(coords);
            return tile;
          },
          // @section Extension methods
          // @uninheritable
          // Layers extending `TileLayer` might reimplement the following method.
          // @method getTileUrl(coords: Object): String
          // Called only internally, returns the URL for a tile given its coordinates.
          // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
          getTileUrl: function(coords) {
            var data = {
              r: Browser.retina ? "@2x" : "",
              s: this._getSubdomain(coords),
              x: coords.x,
              y: coords.y,
              z: this._getZoomForUrl()
            };
            if (this._map && !this._map.options.crs.infinite) {
              var invertedY = this._globalTileRange.max.y - coords.y;
              if (this.options.tms) {
                data["y"] = invertedY;
              }
              data["-y"] = invertedY;
            }
            return template(this._url, extend(data, this.options));
          },
          _tileOnLoad: function(done, tile) {
            if (Browser.ielt9) {
              setTimeout(bind2(done, this, null, tile), 0);
            } else {
              done(null, tile);
            }
          },
          _tileOnError: function(done, tile, e) {
            var errorUrl = this.options.errorTileUrl;
            if (errorUrl && tile.getAttribute("src") !== errorUrl) {
              tile.src = errorUrl;
            }
            done(e, tile);
          },
          _onTileRemove: function(e) {
            e.tile.onload = null;
          },
          _getZoomForUrl: function() {
            var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom, zoomReverse = this.options.zoomReverse, zoomOffset = this.options.zoomOffset;
            if (zoomReverse) {
              zoom2 = maxZoom - zoom2;
            }
            return zoom2 + zoomOffset;
          },
          _getSubdomain: function(tilePoint) {
            var index2 = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
            return this.options.subdomains[index2];
          },
          // stops loading all tiles in the background layer
          _abortLoading: function() {
            var i, tile;
            for (i in this._tiles) {
              if (this._tiles[i].coords.z !== this._tileZoom) {
                tile = this._tiles[i].el;
                tile.onload = falseFn;
                tile.onerror = falseFn;
                if (!tile.complete) {
                  tile.src = emptyImageUrl;
                  var coords = this._tiles[i].coords;
                  remove(tile);
                  delete this._tiles[i];
                  this.fire("tileabort", {
                    tile,
                    coords
                  });
                }
              }
            }
          },
          _removeTile: function(key) {
            var tile = this._tiles[key];
            if (!tile) {
              return;
            }
            tile.el.setAttribute("src", emptyImageUrl);
            return GridLayer.prototype._removeTile.call(this, key);
          },
          _tileReady: function(coords, err, tile) {
            if (!this._map || tile && tile.getAttribute("src") === emptyImageUrl) {
              return;
            }
            return GridLayer.prototype._tileReady.call(this, coords, err, tile);
          }
        });
        function tileLayer(url, options) {
          return new TileLayer(url, options);
        }
        var TileLayerWMS = TileLayer.extend({
          // @section
          // @aka TileLayer.WMS options
          // If any custom options not documented here are used, they will be sent to the
          // WMS server as extra parameters in each request URL. This can be useful for
          // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
          defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            // @option layers: String = ''
            // **(required)** Comma-separated list of WMS layers to show.
            layers: "",
            // @option styles: String = ''
            // Comma-separated list of WMS styles.
            styles: "",
            // @option format: String = 'image/jpeg'
            // WMS image format (use `'image/png'` for layers with transparency).
            format: "image/jpeg",
            // @option transparent: Boolean = false
            // If `true`, the WMS service will return images with transparency.
            transparent: false,
            // @option version: String = '1.1.1'
            // Version of the WMS service to use
            version: "1.1.1"
          },
          options: {
            // @option crs: CRS = null
            // Coordinate Reference System to use for the WMS requests, defaults to
            // map CRS. Don't change this if you're not sure what it means.
            crs: null,
            // @option uppercase: Boolean = false
            // If `true`, WMS request parameter keys will be uppercase.
            uppercase: false
          },
          initialize: function(url, options) {
            this._url = url;
            var wmsParams = extend({}, this.defaultWmsParams);
            for (var i in options) {
              if (!(i in this.options)) {
                wmsParams[i] = options[i];
              }
            }
            options = setOptions(this, options);
            var realRetina = options.detectRetina && Browser.retina ? 2 : 1;
            var tileSize = this.getTileSize();
            wmsParams.width = tileSize.x * realRetina;
            wmsParams.height = tileSize.y * realRetina;
            this.wmsParams = wmsParams;
          },
          onAdd: function(map) {
            this._crs = this.options.crs || map.options.crs;
            this._wmsVersion = parseFloat(this.wmsParams.version);
            var projectionKey = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[projectionKey] = this._crs.code;
            TileLayer.prototype.onAdd.call(this, map);
          },
          getTileUrl: function(coords) {
            var tileBounds = this._tileCoordsToNwSe(coords), crs = this._crs, bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])), min = bounds.min, max = bounds.max, bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ? [min.y, min.x, max.y, max.x] : [min.x, min.y, max.x, max.y]).join(","), url = TileLayer.prototype.getTileUrl.call(this, coords);
            return url + getParamString(this.wmsParams, url, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + bbox;
          },
          // @method setParams(params: Object, noRedraw?: Boolean): this
          // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
          setParams: function(params, noRedraw) {
            extend(this.wmsParams, params);
            if (!noRedraw) {
              this.redraw();
            }
            return this;
          }
        });
        function tileLayerWMS(url, options) {
          return new TileLayerWMS(url, options);
        }
        TileLayer.WMS = TileLayerWMS;
        tileLayer.wms = tileLayerWMS;
        var Renderer = Layer.extend({
          // @section
          // @aka Renderer options
          options: {
            // @option padding: Number = 0.1
            // How much to extend the clip area around the map view (relative to its size)
            // e.g. 0.1 would be 10% of map view in each direction
            padding: 0.1
          },
          initialize: function(options) {
            setOptions(this, options);
            stamp(this);
            this._layers = this._layers || {};
          },
          onAdd: function() {
            if (!this._container) {
              this._initContainer();
              addClass(this._container, "leaflet-zoom-animated");
            }
            this.getPane().appendChild(this._container);
            this._update();
            this.on("update", this._updatePaths, this);
          },
          onRemove: function() {
            this.off("update", this._updatePaths, this);
            this._destroyContainer();
          },
          getEvents: function() {
            var events = {
              viewreset: this._reset,
              zoom: this._onZoom,
              moveend: this._update,
              zoomend: this._onZoomEnd
            };
            if (this._zoomAnimated) {
              events.zoomanim = this._onAnimZoom;
            }
            return events;
          },
          _onAnimZoom: function(ev) {
            this._updateTransform(ev.center, ev.zoom);
          },
          _onZoom: function() {
            this._updateTransform(this._map.getCenter(), this._map.getZoom());
          },
          _updateTransform: function(center, zoom2) {
            var scale2 = this._map.getZoomScale(zoom2, this._zoom), viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding), currentCenterPoint = this._map.project(this._center, zoom2), topLeftOffset = viewHalf.multiplyBy(-scale2).add(currentCenterPoint).subtract(this._map._getNewPixelOrigin(center, zoom2));
            if (Browser.any3d) {
              setTransform(this._container, topLeftOffset, scale2);
            } else {
              setPosition(this._container, topLeftOffset);
            }
          },
          _reset: function() {
            this._update();
            this._updateTransform(this._center, this._zoom);
            for (var id in this._layers) {
              this._layers[id]._reset();
            }
          },
          _onZoomEnd: function() {
            for (var id in this._layers) {
              this._layers[id]._project();
            }
          },
          _updatePaths: function() {
            for (var id in this._layers) {
              this._layers[id]._update();
            }
          },
          _update: function() {
            var p = this.options.padding, size = this._map.getSize(), min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();
            this._bounds = new Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());
            this._center = this._map.getCenter();
            this._zoom = this._map.getZoom();
          }
        });
        var Canvas = Renderer.extend({
          // @section
          // @aka Canvas options
          options: {
            // @option tolerance: Number = 0
            // How much to extend the click tolerance around a path/object on the map.
            tolerance: 0
          },
          getEvents: function() {
            var events = Renderer.prototype.getEvents.call(this);
            events.viewprereset = this._onViewPreReset;
            return events;
          },
          _onViewPreReset: function() {
            this._postponeUpdatePaths = true;
          },
          onAdd: function() {
            Renderer.prototype.onAdd.call(this);
            this._draw();
          },
          _initContainer: function() {
            var container = this._container = document.createElement("canvas");
            on(container, "mousemove", this._onMouseMove, this);
            on(container, "click dblclick mousedown mouseup contextmenu", this._onClick, this);
            on(container, "mouseout", this._handleMouseOut, this);
            container["_leaflet_disable_events"] = true;
            this._ctx = container.getContext("2d");
          },
          _destroyContainer: function() {
            cancelAnimFrame(this._redrawRequest);
            delete this._ctx;
            remove(this._container);
            off(this._container);
            delete this._container;
          },
          _updatePaths: function() {
            if (this._postponeUpdatePaths) {
              return;
            }
            var layer;
            this._redrawBounds = null;
            for (var id in this._layers) {
              layer = this._layers[id];
              layer._update();
            }
            this._redraw();
          },
          _update: function() {
            if (this._map._animatingZoom && this._bounds) {
              return;
            }
            Renderer.prototype._update.call(this);
            var b = this._bounds, container = this._container, size = b.getSize(), m2 = Browser.retina ? 2 : 1;
            setPosition(container, b.min);
            container.width = m2 * size.x;
            container.height = m2 * size.y;
            container.style.width = size.x + "px";
            container.style.height = size.y + "px";
            if (Browser.retina) {
              this._ctx.scale(2, 2);
            }
            this._ctx.translate(-b.min.x, -b.min.y);
            this.fire("update");
          },
          _reset: function() {
            Renderer.prototype._reset.call(this);
            if (this._postponeUpdatePaths) {
              this._postponeUpdatePaths = false;
              this._updatePaths();
            }
          },
          _initPath: function(layer) {
            this._updateDashArray(layer);
            this._layers[stamp(layer)] = layer;
            var order = layer._order = {
              layer,
              prev: this._drawLast,
              next: null
            };
            if (this._drawLast) {
              this._drawLast.next = order;
            }
            this._drawLast = order;
            this._drawFirst = this._drawFirst || this._drawLast;
          },
          _addPath: function(layer) {
            this._requestRedraw(layer);
          },
          _removePath: function(layer) {
            var order = layer._order;
            var next = order.next;
            var prev = order.prev;
            if (next) {
              next.prev = prev;
            } else {
              this._drawLast = prev;
            }
            if (prev) {
              prev.next = next;
            } else {
              this._drawFirst = next;
            }
            delete layer._order;
            delete this._layers[stamp(layer)];
            this._requestRedraw(layer);
          },
          _updatePath: function(layer) {
            this._extendRedrawBounds(layer);
            layer._project();
            layer._update();
            this._requestRedraw(layer);
          },
          _updateStyle: function(layer) {
            this._updateDashArray(layer);
            this._requestRedraw(layer);
          },
          _updateDashArray: function(layer) {
            if (typeof layer.options.dashArray === "string") {
              var parts = layer.options.dashArray.split(/[, ]+/), dashArray = [], dashValue, i;
              for (i = 0; i < parts.length; i++) {
                dashValue = Number(parts[i]);
                if (isNaN(dashValue)) {
                  return;
                }
                dashArray.push(dashValue);
              }
              layer.options._dashArray = dashArray;
            } else {
              layer.options._dashArray = layer.options.dashArray;
            }
          },
          _requestRedraw: function(layer) {
            if (!this._map) {
              return;
            }
            this._extendRedrawBounds(layer);
            this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
          },
          _extendRedrawBounds: function(layer) {
            if (layer._pxBounds) {
              var padding = (layer.options.weight || 0) + 1;
              this._redrawBounds = this._redrawBounds || new Bounds();
              this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
              this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
            }
          },
          _redraw: function() {
            this._redrawRequest = null;
            if (this._redrawBounds) {
              this._redrawBounds.min._floor();
              this._redrawBounds.max._ceil();
            }
            this._clear();
            this._draw();
            this._redrawBounds = null;
          },
          _clear: function() {
            var bounds = this._redrawBounds;
            if (bounds) {
              var size = bounds.getSize();
              this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
            } else {
              this._ctx.save();
              this._ctx.setTransform(1, 0, 0, 1, 0, 0);
              this._ctx.clearRect(0, 0, this._container.width, this._container.height);
              this._ctx.restore();
            }
          },
          _draw: function() {
            var layer, bounds = this._redrawBounds;
            this._ctx.save();
            if (bounds) {
              var size = bounds.getSize();
              this._ctx.beginPath();
              this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
              this._ctx.clip();
            }
            this._drawing = true;
            for (var order = this._drawFirst; order; order = order.next) {
              layer = order.layer;
              if (!bounds || layer._pxBounds && layer._pxBounds.intersects(bounds)) {
                layer._updatePath();
              }
            }
            this._drawing = false;
            this._ctx.restore();
          },
          _updatePoly: function(layer, closed) {
            if (!this._drawing) {
              return;
            }
            var i, j, len2, p, parts = layer._parts, len = parts.length, ctx = this._ctx;
            if (!len) {
              return;
            }
            ctx.beginPath();
            for (i = 0; i < len; i++) {
              for (j = 0, len2 = parts[i].length; j < len2; j++) {
                p = parts[i][j];
                ctx[j ? "lineTo" : "moveTo"](p.x, p.y);
              }
              if (closed) {
                ctx.closePath();
              }
            }
            this._fillStroke(ctx, layer);
          },
          _updateCircle: function(layer) {
            if (!this._drawing || layer._empty()) {
              return;
            }
            var p = layer._point, ctx = this._ctx, r = Math.max(Math.round(layer._radius), 1), s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
            if (s !== 1) {
              ctx.save();
              ctx.scale(1, s);
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);
            if (s !== 1) {
              ctx.restore();
            }
            this._fillStroke(ctx, layer);
          },
          _fillStroke: function(ctx, layer) {
            var options = layer.options;
            if (options.fill) {
              ctx.globalAlpha = options.fillOpacity;
              ctx.fillStyle = options.fillColor || options.color;
              ctx.fill(options.fillRule || "evenodd");
            }
            if (options.stroke && options.weight !== 0) {
              if (ctx.setLineDash) {
                ctx.setLineDash(layer.options && layer.options._dashArray || []);
              }
              ctx.globalAlpha = options.opacity;
              ctx.lineWidth = options.weight;
              ctx.strokeStyle = options.color;
              ctx.lineCap = options.lineCap;
              ctx.lineJoin = options.lineJoin;
              ctx.stroke();
            }
          },
          // Canvas obviously doesn't have mouse events for individual drawn objects,
          // so we emulate that by calculating what's under the mouse on mousemove/click manually
          _onClick: function(e) {
            var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;
            for (var order = this._drawFirst; order; order = order.next) {
              layer = order.layer;
              if (layer.options.interactive && layer._containsPoint(point)) {
                if (!(e.type === "click" || e.type === "preclick") || !this._map._draggableMoved(layer)) {
                  clickedLayer = layer;
                }
              }
            }
            this._fireEvent(clickedLayer ? [clickedLayer] : false, e);
          },
          _onMouseMove: function(e) {
            if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) {
              return;
            }
            var point = this._map.mouseEventToLayerPoint(e);
            this._handleMouseHover(e, point);
          },
          _handleMouseOut: function(e) {
            var layer = this._hoveredLayer;
            if (layer) {
              removeClass(this._container, "leaflet-interactive");
              this._fireEvent([layer], e, "mouseout");
              this._hoveredLayer = null;
              this._mouseHoverThrottled = false;
            }
          },
          _handleMouseHover: function(e, point) {
            if (this._mouseHoverThrottled) {
              return;
            }
            var layer, candidateHoveredLayer;
            for (var order = this._drawFirst; order; order = order.next) {
              layer = order.layer;
              if (layer.options.interactive && layer._containsPoint(point)) {
                candidateHoveredLayer = layer;
              }
            }
            if (candidateHoveredLayer !== this._hoveredLayer) {
              this._handleMouseOut(e);
              if (candidateHoveredLayer) {
                addClass(this._container, "leaflet-interactive");
                this._fireEvent([candidateHoveredLayer], e, "mouseover");
                this._hoveredLayer = candidateHoveredLayer;
              }
            }
            this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : false, e);
            this._mouseHoverThrottled = true;
            setTimeout(bind2(function() {
              this._mouseHoverThrottled = false;
            }, this), 32);
          },
          _fireEvent: function(layers2, e, type2) {
            this._map._fireDOMEvent(e, type2 || e.type, layers2);
          },
          _bringToFront: function(layer) {
            var order = layer._order;
            if (!order) {
              return;
            }
            var next = order.next;
            var prev = order.prev;
            if (next) {
              next.prev = prev;
            } else {
              return;
            }
            if (prev) {
              prev.next = next;
            } else if (next) {
              this._drawFirst = next;
            }
            order.prev = this._drawLast;
            this._drawLast.next = order;
            order.next = null;
            this._drawLast = order;
            this._requestRedraw(layer);
          },
          _bringToBack: function(layer) {
            var order = layer._order;
            if (!order) {
              return;
            }
            var next = order.next;
            var prev = order.prev;
            if (prev) {
              prev.next = next;
            } else {
              return;
            }
            if (next) {
              next.prev = prev;
            } else if (prev) {
              this._drawLast = prev;
            }
            order.prev = null;
            order.next = this._drawFirst;
            this._drawFirst.prev = order;
            this._drawFirst = order;
            this._requestRedraw(layer);
          }
        });
        function canvas(options) {
          return Browser.canvas ? new Canvas(options) : null;
        }
        var vmlCreate = function() {
          try {
            document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml");
            return function(name) {
              return document.createElement("<lvml:" + name + ' class="lvml">');
            };
          } catch (e) {
          }
          return function(name) {
            return document.createElement("<" + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
          };
        }();
        var vmlMixin = {
          _initContainer: function() {
            this._container = create$1("div", "leaflet-vml-container");
          },
          _update: function() {
            if (this._map._animatingZoom) {
              return;
            }
            Renderer.prototype._update.call(this);
            this.fire("update");
          },
          _initPath: function(layer) {
            var container = layer._container = vmlCreate("shape");
            addClass(container, "leaflet-vml-shape " + (this.options.className || ""));
            container.coordsize = "1 1";
            layer._path = vmlCreate("path");
            container.appendChild(layer._path);
            this._updateStyle(layer);
            this._layers[stamp(layer)] = layer;
          },
          _addPath: function(layer) {
            var container = layer._container;
            this._container.appendChild(container);
            if (layer.options.interactive) {
              layer.addInteractiveTarget(container);
            }
          },
          _removePath: function(layer) {
            var container = layer._container;
            remove(container);
            layer.removeInteractiveTarget(container);
            delete this._layers[stamp(layer)];
          },
          _updateStyle: function(layer) {
            var stroke = layer._stroke, fill = layer._fill, options = layer.options, container = layer._container;
            container.stroked = !!options.stroke;
            container.filled = !!options.fill;
            if (options.stroke) {
              if (!stroke) {
                stroke = layer._stroke = vmlCreate("stroke");
              }
              container.appendChild(stroke);
              stroke.weight = options.weight + "px";
              stroke.color = options.color;
              stroke.opacity = options.opacity;
              if (options.dashArray) {
                stroke.dashStyle = isArray(options.dashArray) ? options.dashArray.join(" ") : options.dashArray.replace(/( *, *)/g, " ");
              } else {
                stroke.dashStyle = "";
              }
              stroke.endcap = options.lineCap.replace("butt", "flat");
              stroke.joinstyle = options.lineJoin;
            } else if (stroke) {
              container.removeChild(stroke);
              layer._stroke = null;
            }
            if (options.fill) {
              if (!fill) {
                fill = layer._fill = vmlCreate("fill");
              }
              container.appendChild(fill);
              fill.color = options.fillColor || options.color;
              fill.opacity = options.fillOpacity;
            } else if (fill) {
              container.removeChild(fill);
              layer._fill = null;
            }
          },
          _updateCircle: function(layer) {
            var p = layer._point.round(), r = Math.round(layer._radius), r2 = Math.round(layer._radiusY || r);
            this._setPath(layer, layer._empty() ? "M0 0" : "AL " + p.x + "," + p.y + " " + r + "," + r2 + " 0," + 65535 * 360);
          },
          _setPath: function(layer, path) {
            layer._path.v = path;
          },
          _bringToFront: function(layer) {
            toFront(layer._container);
          },
          _bringToBack: function(layer) {
            toBack(layer._container);
          }
        };
        var create = Browser.vml ? vmlCreate : svgCreate;
        var SVG = Renderer.extend({
          _initContainer: function() {
            this._container = create("svg");
            this._container.setAttribute("pointer-events", "none");
            this._rootGroup = create("g");
            this._container.appendChild(this._rootGroup);
          },
          _destroyContainer: function() {
            remove(this._container);
            off(this._container);
            delete this._container;
            delete this._rootGroup;
            delete this._svgSize;
          },
          _update: function() {
            if (this._map._animatingZoom && this._bounds) {
              return;
            }
            Renderer.prototype._update.call(this);
            var b = this._bounds, size = b.getSize(), container = this._container;
            if (!this._svgSize || !this._svgSize.equals(size)) {
              this._svgSize = size;
              container.setAttribute("width", size.x);
              container.setAttribute("height", size.y);
            }
            setPosition(container, b.min);
            container.setAttribute("viewBox", [b.min.x, b.min.y, size.x, size.y].join(" "));
            this.fire("update");
          },
          // methods below are called by vector layers implementations
          _initPath: function(layer) {
            var path = layer._path = create("path");
            if (layer.options.className) {
              addClass(path, layer.options.className);
            }
            if (layer.options.interactive) {
              addClass(path, "leaflet-interactive");
            }
            this._updateStyle(layer);
            this._layers[stamp(layer)] = layer;
          },
          _addPath: function(layer) {
            if (!this._rootGroup) {
              this._initContainer();
            }
            this._rootGroup.appendChild(layer._path);
            layer.addInteractiveTarget(layer._path);
          },
          _removePath: function(layer) {
            remove(layer._path);
            layer.removeInteractiveTarget(layer._path);
            delete this._layers[stamp(layer)];
          },
          _updatePath: function(layer) {
            layer._project();
            layer._update();
          },
          _updateStyle: function(layer) {
            var path = layer._path, options = layer.options;
            if (!path) {
              return;
            }
            if (options.stroke) {
              path.setAttribute("stroke", options.color);
              path.setAttribute("stroke-opacity", options.opacity);
              path.setAttribute("stroke-width", options.weight);
              path.setAttribute("stroke-linecap", options.lineCap);
              path.setAttribute("stroke-linejoin", options.lineJoin);
              if (options.dashArray) {
                path.setAttribute("stroke-dasharray", options.dashArray);
              } else {
                path.removeAttribute("stroke-dasharray");
              }
              if (options.dashOffset) {
                path.setAttribute("stroke-dashoffset", options.dashOffset);
              } else {
                path.removeAttribute("stroke-dashoffset");
              }
            } else {
              path.setAttribute("stroke", "none");
            }
            if (options.fill) {
              path.setAttribute("fill", options.fillColor || options.color);
              path.setAttribute("fill-opacity", options.fillOpacity);
              path.setAttribute("fill-rule", options.fillRule || "evenodd");
            } else {
              path.setAttribute("fill", "none");
            }
          },
          _updatePoly: function(layer, closed) {
            this._setPath(layer, pointsToPath(layer._parts, closed));
          },
          _updateCircle: function(layer) {
            var p = layer._point, r = Math.max(Math.round(layer._radius), 1), r2 = Math.max(Math.round(layer._radiusY), 1) || r, arc = "a" + r + "," + r2 + " 0 1,0 ";
            var d = layer._empty() ? "M0 0" : "M" + (p.x - r) + "," + p.y + arc + r * 2 + ",0 " + arc + -r * 2 + ",0 ";
            this._setPath(layer, d);
          },
          _setPath: function(layer, path) {
            layer._path.setAttribute("d", path);
          },
          // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
          _bringToFront: function(layer) {
            toFront(layer._path);
          },
          _bringToBack: function(layer) {
            toBack(layer._path);
          }
        });
        if (Browser.vml) {
          SVG.include(vmlMixin);
        }
        function svg(options) {
          return Browser.svg || Browser.vml ? new SVG(options) : null;
        }
        Map2.include({
          // @namespace Map; @method getRenderer(layer: Path): Renderer
          // Returns the instance of `Renderer` that should be used to render the given
          // `Path`. It will ensure that the `renderer` options of the map and paths
          // are respected, and that the renderers do exist on the map.
          getRenderer: function(layer) {
            var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;
            if (!renderer) {
              renderer = this._renderer = this._createRenderer();
            }
            if (!this.hasLayer(renderer)) {
              this.addLayer(renderer);
            }
            return renderer;
          },
          _getPaneRenderer: function(name) {
            if (name === "overlayPane" || name === void 0) {
              return false;
            }
            var renderer = this._paneRenderers[name];
            if (renderer === void 0) {
              renderer = this._createRenderer({ pane: name });
              this._paneRenderers[name] = renderer;
            }
            return renderer;
          },
          _createRenderer: function(options) {
            return this.options.preferCanvas && canvas(options) || svg(options);
          }
        });
        var Rectangle = Polygon.extend({
          initialize: function(latLngBounds, options) {
            Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
          },
          // @method setBounds(latLngBounds: LatLngBounds): this
          // Redraws the rectangle with the passed bounds.
          setBounds: function(latLngBounds) {
            return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
          },
          _boundsToLatLngs: function(latLngBounds) {
            latLngBounds = toLatLngBounds(latLngBounds);
            return [
              latLngBounds.getSouthWest(),
              latLngBounds.getNorthWest(),
              latLngBounds.getNorthEast(),
              latLngBounds.getSouthEast()
            ];
          }
        });
        function rectangle(latLngBounds, options) {
          return new Rectangle(latLngBounds, options);
        }
        SVG.create = create;
        SVG.pointsToPath = pointsToPath;
        GeoJSON.geometryToLayer = geometryToLayer;
        GeoJSON.coordsToLatLng = coordsToLatLng;
        GeoJSON.coordsToLatLngs = coordsToLatLngs;
        GeoJSON.latLngToCoords = latLngToCoords;
        GeoJSON.latLngsToCoords = latLngsToCoords;
        GeoJSON.getFeature = getFeature;
        GeoJSON.asFeature = asFeature;
        Map2.mergeOptions({
          // @option boxZoom: Boolean = true
          // Whether the map can be zoomed to a rectangular area specified by
          // dragging the mouse while pressing the shift key.
          boxZoom: true
        });
        var BoxZoom = Handler.extend({
          initialize: function(map) {
            this._map = map;
            this._container = map._container;
            this._pane = map._panes.overlayPane;
            this._resetStateTimeout = 0;
            map.on("unload", this._destroy, this);
          },
          addHooks: function() {
            on(this._container, "mousedown", this._onMouseDown, this);
          },
          removeHooks: function() {
            off(this._container, "mousedown", this._onMouseDown, this);
          },
          moved: function() {
            return this._moved;
          },
          _destroy: function() {
            remove(this._pane);
            delete this._pane;
          },
          _resetState: function() {
            this._resetStateTimeout = 0;
            this._moved = false;
          },
          _clearDeferredResetState: function() {
            if (this._resetStateTimeout !== 0) {
              clearTimeout(this._resetStateTimeout);
              this._resetStateTimeout = 0;
            }
          },
          _onMouseDown: function(e) {
            if (!e.shiftKey || e.which !== 1 && e.button !== 1) {
              return false;
            }
            this._clearDeferredResetState();
            this._resetState();
            disableTextSelection();
            disableImageDrag();
            this._startPoint = this._map.mouseEventToContainerPoint(e);
            on(document, {
              contextmenu: stop,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown
            }, this);
          },
          _onMouseMove: function(e) {
            if (!this._moved) {
              this._moved = true;
              this._box = create$1("div", "leaflet-zoom-box", this._container);
              addClass(this._container, "leaflet-crosshair");
              this._map.fire("boxzoomstart");
            }
            this._point = this._map.mouseEventToContainerPoint(e);
            var bounds = new Bounds(this._point, this._startPoint), size = bounds.getSize();
            setPosition(this._box, bounds.min);
            this._box.style.width = size.x + "px";
            this._box.style.height = size.y + "px";
          },
          _finish: function() {
            if (this._moved) {
              remove(this._box);
              removeClass(this._container, "leaflet-crosshair");
            }
            enableTextSelection();
            enableImageDrag();
            off(document, {
              contextmenu: stop,
              mousemove: this._onMouseMove,
              mouseup: this._onMouseUp,
              keydown: this._onKeyDown
            }, this);
          },
          _onMouseUp: function(e) {
            if (e.which !== 1 && e.button !== 1) {
              return;
            }
            this._finish();
            if (!this._moved) {
              return;
            }
            this._clearDeferredResetState();
            this._resetStateTimeout = setTimeout(bind2(this._resetState, this), 0);
            var bounds = new LatLngBounds(
              this._map.containerPointToLatLng(this._startPoint),
              this._map.containerPointToLatLng(this._point)
            );
            this._map.fitBounds(bounds).fire("boxzoomend", { boxZoomBounds: bounds });
          },
          _onKeyDown: function(e) {
            if (e.keyCode === 27) {
              this._finish();
              this._clearDeferredResetState();
              this._resetState();
            }
          }
        });
        Map2.addInitHook("addHandler", "boxZoom", BoxZoom);
        Map2.mergeOptions({
          // @option doubleClickZoom: Boolean|String = true
          // Whether the map can be zoomed in by double clicking on it and
          // zoomed out by double clicking while holding shift. If passed
          // `'center'`, double-click zoom will zoom to the center of the
          //  view regardless of where the mouse was.
          doubleClickZoom: true
        });
        var DoubleClickZoom = Handler.extend({
          addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this);
          },
          removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this);
          },
          _onDoubleClick: function(e) {
            var map = this._map, oldZoom = map.getZoom(), delta = map.options.zoomDelta, zoom2 = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;
            if (map.options.doubleClickZoom === "center") {
              map.setZoom(zoom2);
            } else {
              map.setZoomAround(e.containerPoint, zoom2);
            }
          }
        });
        Map2.addInitHook("addHandler", "doubleClickZoom", DoubleClickZoom);
        Map2.mergeOptions({
          // @option dragging: Boolean = true
          // Whether the map is draggable with mouse/touch or not.
          dragging: true,
          // @section Panning Inertia Options
          // @option inertia: Boolean = *
          // If enabled, panning of the map will have an inertia effect where
          // the map builds momentum while dragging and continues moving in
          // the same direction for some time. Feels especially nice on touch
          // devices. Enabled by default.
          inertia: true,
          // @option inertiaDeceleration: Number = 3000
          // The rate with which the inertial movement slows down, in pixels/second².
          inertiaDeceleration: 3400,
          // px/s^2
          // @option inertiaMaxSpeed: Number = Infinity
          // Max speed of the inertial movement, in pixels/second.
          inertiaMaxSpeed: Infinity,
          // px/s
          // @option easeLinearity: Number = 0.2
          easeLinearity: 0.2,
          // TODO refactor, move to CRS
          // @option worldCopyJump: Boolean = false
          // With this option enabled, the map tracks when you pan to another "copy"
          // of the world and seamlessly jumps to the original one so that all overlays
          // like markers and vector layers are still visible.
          worldCopyJump: false,
          // @option maxBoundsViscosity: Number = 0.0
          // If `maxBounds` is set, this option will control how solid the bounds
          // are when dragging the map around. The default value of `0.0` allows the
          // user to drag outside the bounds at normal speed, higher values will
          // slow down map dragging outside bounds, and `1.0` makes the bounds fully
          // solid, preventing the user from dragging outside the bounds.
          maxBoundsViscosity: 0
        });
        var Drag = Handler.extend({
          addHooks: function() {
            if (!this._draggable) {
              var map = this._map;
              this._draggable = new Draggable(map._mapPane, map._container);
              this._draggable.on({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
              }, this);
              this._draggable.on("predrag", this._onPreDragLimit, this);
              if (map.options.worldCopyJump) {
                this._draggable.on("predrag", this._onPreDragWrap, this);
                map.on("zoomend", this._onZoomEnd, this);
                map.whenReady(this._onZoomEnd, this);
              }
            }
            addClass(this._map._container, "leaflet-grab leaflet-touch-drag");
            this._draggable.enable();
            this._positions = [];
            this._times = [];
          },
          removeHooks: function() {
            removeClass(this._map._container, "leaflet-grab");
            removeClass(this._map._container, "leaflet-touch-drag");
            this._draggable.disable();
          },
          moved: function() {
            return this._draggable && this._draggable._moved;
          },
          moving: function() {
            return this._draggable && this._draggable._moving;
          },
          _onDragStart: function() {
            var map = this._map;
            map._stop();
            if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
              var bounds = toLatLngBounds(this._map.options.maxBounds);
              this._offsetLimit = toBounds(
                this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
                this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
              );
              this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
            } else {
              this._offsetLimit = null;
            }
            map.fire("movestart").fire("dragstart");
            if (map.options.inertia) {
              this._positions = [];
              this._times = [];
            }
          },
          _onDrag: function(e) {
            if (this._map.options.inertia) {
              var time = this._lastTime = +/* @__PURE__ */ new Date(), pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;
              this._positions.push(pos);
              this._times.push(time);
              this._prunePositions(time);
            }
            this._map.fire("move", e).fire("drag", e);
          },
          _prunePositions: function(time) {
            while (this._positions.length > 1 && time - this._times[0] > 50) {
              this._positions.shift();
              this._times.shift();
            }
          },
          _onZoomEnd: function() {
            var pxCenter = this._map.getSize().divideBy(2), pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);
            this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
            this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
          },
          _viscousLimit: function(value, threshold) {
            return value - (value - threshold) * this._viscosity;
          },
          _onPreDragLimit: function() {
            if (!this._viscosity || !this._offsetLimit) {
              return;
            }
            var offset = this._draggable._newPos.subtract(this._draggable._startPos);
            var limit = this._offsetLimit;
            if (offset.x < limit.min.x) {
              offset.x = this._viscousLimit(offset.x, limit.min.x);
            }
            if (offset.y < limit.min.y) {
              offset.y = this._viscousLimit(offset.y, limit.min.y);
            }
            if (offset.x > limit.max.x) {
              offset.x = this._viscousLimit(offset.x, limit.max.x);
            }
            if (offset.y > limit.max.y) {
              offset.y = this._viscousLimit(offset.y, limit.max.y);
            }
            this._draggable._newPos = this._draggable._startPos.add(offset);
          },
          _onPreDragWrap: function() {
            var worldWidth = this._worldWidth, halfWidth = Math.round(worldWidth / 2), dx = this._initialWorldOffset, x2 = this._draggable._newPos.x, newX1 = (x2 - halfWidth + dx) % worldWidth + halfWidth - dx, newX2 = (x2 + halfWidth + dx) % worldWidth - halfWidth - dx, newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
            this._draggable._absPos = this._draggable._newPos.clone();
            this._draggable._newPos.x = newX;
          },
          _onDragEnd: function(e) {
            var map = this._map, options = map.options, noInertia = !options.inertia || e.noInertia || this._times.length < 2;
            map.fire("dragend", e);
            if (noInertia) {
              map.fire("moveend");
            } else {
              this._prunePositions(+/* @__PURE__ */ new Date());
              var direction = this._lastPos.subtract(this._positions[0]), duration = (this._lastTime - this._times[0]) / 1e3, ease = options.easeLinearity, speedVector = direction.multiplyBy(ease / duration), speed = speedVector.distanceTo([0, 0]), limitedSpeed = Math.min(options.inertiaMaxSpeed, speed), limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed), decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease), offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
              if (!offset.x && !offset.y) {
                map.fire("moveend");
              } else {
                offset = map._limitOffset(offset, map.options.maxBounds);
                requestAnimFrame(function() {
                  map.panBy(offset, {
                    duration: decelerationDuration,
                    easeLinearity: ease,
                    noMoveStart: true,
                    animate: true
                  });
                });
              }
            }
          }
        });
        Map2.addInitHook("addHandler", "dragging", Drag);
        Map2.mergeOptions({
          // @option keyboard: Boolean = true
          // Makes the map focusable and allows users to navigate the map with keyboard
          // arrows and `+`/`-` keys.
          keyboard: true,
          // @option keyboardPanDelta: Number = 80
          // Amount of pixels to pan when pressing an arrow key.
          keyboardPanDelta: 80
        });
        var Keyboard = Handler.extend({
          keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 54, 173]
          },
          initialize: function(map) {
            this._map = map;
            this._setPanDelta(map.options.keyboardPanDelta);
            this._setZoomDelta(map.options.zoomDelta);
          },
          addHooks: function() {
            var container = this._map._container;
            if (container.tabIndex <= 0) {
              container.tabIndex = "0";
            }
            on(container, {
              focus: this._onFocus,
              blur: this._onBlur,
              mousedown: this._onMouseDown
            }, this);
            this._map.on({
              focus: this._addHooks,
              blur: this._removeHooks
            }, this);
          },
          removeHooks: function() {
            this._removeHooks();
            off(this._map._container, {
              focus: this._onFocus,
              blur: this._onBlur,
              mousedown: this._onMouseDown
            }, this);
            this._map.off({
              focus: this._addHooks,
              blur: this._removeHooks
            }, this);
          },
          _onMouseDown: function() {
            if (this._focused) {
              return;
            }
            var body = document.body, docEl = document.documentElement, top = body.scrollTop || docEl.scrollTop, left = body.scrollLeft || docEl.scrollLeft;
            this._map._container.focus();
            window.scrollTo(left, top);
          },
          _onFocus: function() {
            this._focused = true;
            this._map.fire("focus");
          },
          _onBlur: function() {
            this._focused = false;
            this._map.fire("blur");
          },
          _setPanDelta: function(panDelta) {
            var keys = this._panKeys = {}, codes = this.keyCodes, i, len;
            for (i = 0, len = codes.left.length; i < len; i++) {
              keys[codes.left[i]] = [-1 * panDelta, 0];
            }
            for (i = 0, len = codes.right.length; i < len; i++) {
              keys[codes.right[i]] = [panDelta, 0];
            }
            for (i = 0, len = codes.down.length; i < len; i++) {
              keys[codes.down[i]] = [0, panDelta];
            }
            for (i = 0, len = codes.up.length; i < len; i++) {
              keys[codes.up[i]] = [0, -1 * panDelta];
            }
          },
          _setZoomDelta: function(zoomDelta) {
            var keys = this._zoomKeys = {}, codes = this.keyCodes, i, len;
            for (i = 0, len = codes.zoomIn.length; i < len; i++) {
              keys[codes.zoomIn[i]] = zoomDelta;
            }
            for (i = 0, len = codes.zoomOut.length; i < len; i++) {
              keys[codes.zoomOut[i]] = -zoomDelta;
            }
          },
          _addHooks: function() {
            on(document, "keydown", this._onKeyDown, this);
          },
          _removeHooks: function() {
            off(document, "keydown", this._onKeyDown, this);
          },
          _onKeyDown: function(e) {
            if (e.altKey || e.ctrlKey || e.metaKey) {
              return;
            }
            var key = e.keyCode, map = this._map, offset;
            if (key in this._panKeys) {
              if (!map._panAnim || !map._panAnim._inProgress) {
                offset = this._panKeys[key];
                if (e.shiftKey) {
                  offset = toPoint(offset).multiplyBy(3);
                }
                if (map.options.maxBounds) {
                  offset = map._limitOffset(toPoint(offset), map.options.maxBounds);
                }
                if (map.options.worldCopyJump) {
                  var newLatLng = map.wrapLatLng(map.unproject(map.project(map.getCenter()).add(offset)));
                  map.panTo(newLatLng);
                } else {
                  map.panBy(offset);
                }
              }
            } else if (key in this._zoomKeys) {
              map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);
            } else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) {
              map.closePopup();
            } else {
              return;
            }
            stop(e);
          }
        });
        Map2.addInitHook("addHandler", "keyboard", Keyboard);
        Map2.mergeOptions({
          // @section Mouse wheel options
          // @option scrollWheelZoom: Boolean|String = true
          // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
          // it will zoom to the center of the view regardless of where the mouse was.
          scrollWheelZoom: true,
          // @option wheelDebounceTime: Number = 40
          // Limits the rate at which a wheel can fire (in milliseconds). By default
          // user can't zoom via wheel more often than once per 40 ms.
          wheelDebounceTime: 40,
          // @option wheelPxPerZoomLevel: Number = 60
          // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
          // mean a change of one full zoom level. Smaller values will make wheel-zooming
          // faster (and vice versa).
          wheelPxPerZoomLevel: 60
        });
        var ScrollWheelZoom = Handler.extend({
          addHooks: function() {
            on(this._map._container, "wheel", this._onWheelScroll, this);
            this._delta = 0;
          },
          removeHooks: function() {
            off(this._map._container, "wheel", this._onWheelScroll, this);
          },
          _onWheelScroll: function(e) {
            var delta = getWheelDelta(e);
            var debounce = this._map.options.wheelDebounceTime;
            this._delta += delta;
            this._lastMousePos = this._map.mouseEventToContainerPoint(e);
            if (!this._startTime) {
              this._startTime = +/* @__PURE__ */ new Date();
            }
            var left = Math.max(debounce - (+/* @__PURE__ */ new Date() - this._startTime), 0);
            clearTimeout(this._timer);
            this._timer = setTimeout(bind2(this._performZoom, this), left);
            stop(e);
          },
          _performZoom: function() {
            var map = this._map, zoom2 = map.getZoom(), snap = this._map.options.zoomSnap || 0;
            map._stop();
            var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2, d4 = snap ? Math.ceil(d3 / snap) * snap : d3, delta = map._limitZoom(zoom2 + (this._delta > 0 ? d4 : -d4)) - zoom2;
            this._delta = 0;
            this._startTime = null;
            if (!delta) {
              return;
            }
            if (map.options.scrollWheelZoom === "center") {
              map.setZoom(zoom2 + delta);
            } else {
              map.setZoomAround(this._lastMousePos, zoom2 + delta);
            }
          }
        });
        Map2.addInitHook("addHandler", "scrollWheelZoom", ScrollWheelZoom);
        var tapHoldDelay = 600;
        Map2.mergeOptions({
          // @section Touch interaction options
          // @option tapHold: Boolean
          // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
          tapHold: Browser.touchNative && Browser.safari && Browser.mobile,
          // @option tapTolerance: Number = 15
          // The max number of pixels a user can shift his finger during touch
          // for it to be considered a valid tap.
          tapTolerance: 15
        });
        var TapHold = Handler.extend({
          addHooks: function() {
            on(this._map._container, "touchstart", this._onDown, this);
          },
          removeHooks: function() {
            off(this._map._container, "touchstart", this._onDown, this);
          },
          _onDown: function(e) {
            clearTimeout(this._holdTimeout);
            if (e.touches.length !== 1) {
              return;
            }
            var first = e.touches[0];
            this._startPos = this._newPos = new Point(first.clientX, first.clientY);
            this._holdTimeout = setTimeout(bind2(function() {
              this._cancel();
              if (!this._isTapValid()) {
                return;
              }
              on(document, "touchend", preventDefault);
              on(document, "touchend touchcancel", this._cancelClickPrevent);
              this._simulateEvent("contextmenu", first);
            }, this), tapHoldDelay);
            on(document, "touchend touchcancel contextmenu", this._cancel, this);
            on(document, "touchmove", this._onMove, this);
          },
          _cancelClickPrevent: function cancelClickPrevent() {
            off(document, "touchend", preventDefault);
            off(document, "touchend touchcancel", cancelClickPrevent);
          },
          _cancel: function() {
            clearTimeout(this._holdTimeout);
            off(document, "touchend touchcancel contextmenu", this._cancel, this);
            off(document, "touchmove", this._onMove, this);
          },
          _onMove: function(e) {
            var first = e.touches[0];
            this._newPos = new Point(first.clientX, first.clientY);
          },
          _isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
          },
          _simulateEvent: function(type2, e) {
            var simulatedEvent = new MouseEvent(type2, {
              bubbles: true,
              cancelable: true,
              view: window,
              // detail: 1,
              screenX: e.screenX,
              screenY: e.screenY,
              clientX: e.clientX,
              clientY: e.clientY
              // button: 2,
              // buttons: 2
            });
            simulatedEvent._simulated = true;
            e.target.dispatchEvent(simulatedEvent);
          }
        });
        Map2.addInitHook("addHandler", "tapHold", TapHold);
        Map2.mergeOptions({
          // @section Touch interaction options
          // @option touchZoom: Boolean|String = *
          // Whether the map can be zoomed by touch-dragging with two fingers. If
          // passed `'center'`, it will zoom to the center of the view regardless of
          // where the touch events (fingers) were. Enabled for touch-capable web
          // browsers.
          touchZoom: Browser.touch,
          // @option bounceAtZoomLimits: Boolean = true
          // Set it to false if you don't want the map to zoom beyond min/max zoom
          // and then bounce back when pinch-zooming.
          bounceAtZoomLimits: true
        });
        var TouchZoom = Handler.extend({
          addHooks: function() {
            addClass(this._map._container, "leaflet-touch-zoom");
            on(this._map._container, "touchstart", this._onTouchStart, this);
          },
          removeHooks: function() {
            removeClass(this._map._container, "leaflet-touch-zoom");
            off(this._map._container, "touchstart", this._onTouchStart, this);
          },
          _onTouchStart: function(e) {
            var map = this._map;
            if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) {
              return;
            }
            var p1 = map.mouseEventToContainerPoint(e.touches[0]), p2 = map.mouseEventToContainerPoint(e.touches[1]);
            this._centerPoint = map.getSize()._divideBy(2);
            this._startLatLng = map.containerPointToLatLng(this._centerPoint);
            if (map.options.touchZoom !== "center") {
              this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
            }
            this._startDist = p1.distanceTo(p2);
            this._startZoom = map.getZoom();
            this._moved = false;
            this._zooming = true;
            map._stop();
            on(document, "touchmove", this._onTouchMove, this);
            on(document, "touchend touchcancel", this._onTouchEnd, this);
            preventDefault(e);
          },
          _onTouchMove: function(e) {
            if (!e.touches || e.touches.length !== 2 || !this._zooming) {
              return;
            }
            var map = this._map, p1 = map.mouseEventToContainerPoint(e.touches[0]), p2 = map.mouseEventToContainerPoint(e.touches[1]), scale2 = p1.distanceTo(p2) / this._startDist;
            this._zoom = map.getScaleZoom(scale2, this._startZoom);
            if (!map.options.bounceAtZoomLimits && (this._zoom < map.getMinZoom() && scale2 < 1 || this._zoom > map.getMaxZoom() && scale2 > 1)) {
              this._zoom = map._limitZoom(this._zoom);
            }
            if (map.options.touchZoom === "center") {
              this._center = this._startLatLng;
              if (scale2 === 1) {
                return;
              }
            } else {
              var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
              if (scale2 === 1 && delta.x === 0 && delta.y === 0) {
                return;
              }
              this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
            }
            if (!this._moved) {
              map._moveStart(true, false);
              this._moved = true;
            }
            cancelAnimFrame(this._animRequest);
            var moveFn = bind2(map._move, map, this._center, this._zoom, { pinch: true, round: false }, void 0);
            this._animRequest = requestAnimFrame(moveFn, this, true);
            preventDefault(e);
          },
          _onTouchEnd: function() {
            if (!this._moved || !this._zooming) {
              this._zooming = false;
              return;
            }
            this._zooming = false;
            cancelAnimFrame(this._animRequest);
            off(document, "touchmove", this._onTouchMove, this);
            off(document, "touchend touchcancel", this._onTouchEnd, this);
            if (this._map.options.zoomAnimation) {
              this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
            } else {
              this._map._resetView(this._center, this._map._limitZoom(this._zoom));
            }
          }
        });
        Map2.addInitHook("addHandler", "touchZoom", TouchZoom);
        Map2.BoxZoom = BoxZoom;
        Map2.DoubleClickZoom = DoubleClickZoom;
        Map2.Drag = Drag;
        Map2.Keyboard = Keyboard;
        Map2.ScrollWheelZoom = ScrollWheelZoom;
        Map2.TapHold = TapHold;
        Map2.TouchZoom = TouchZoom;
        exports2.Bounds = Bounds;
        exports2.Browser = Browser;
        exports2.CRS = CRS;
        exports2.Canvas = Canvas;
        exports2.Circle = Circle;
        exports2.CircleMarker = CircleMarker;
        exports2.Class = Class;
        exports2.Control = Control;
        exports2.DivIcon = DivIcon;
        exports2.DivOverlay = DivOverlay;
        exports2.DomEvent = DomEvent;
        exports2.DomUtil = DomUtil;
        exports2.Draggable = Draggable;
        exports2.Evented = Evented;
        exports2.FeatureGroup = FeatureGroup;
        exports2.GeoJSON = GeoJSON;
        exports2.GridLayer = GridLayer;
        exports2.Handler = Handler;
        exports2.Icon = Icon;
        exports2.ImageOverlay = ImageOverlay;
        exports2.LatLng = LatLng;
        exports2.LatLngBounds = LatLngBounds;
        exports2.Layer = Layer;
        exports2.LayerGroup = LayerGroup;
        exports2.LineUtil = LineUtil;
        exports2.Map = Map2;
        exports2.Marker = Marker;
        exports2.Mixin = Mixin;
        exports2.Path = Path;
        exports2.Point = Point;
        exports2.PolyUtil = PolyUtil;
        exports2.Polygon = Polygon;
        exports2.Polyline = Polyline;
        exports2.Popup = Popup;
        exports2.PosAnimation = PosAnimation;
        exports2.Projection = index;
        exports2.Rectangle = Rectangle;
        exports2.Renderer = Renderer;
        exports2.SVG = SVG;
        exports2.SVGOverlay = SVGOverlay;
        exports2.TileLayer = TileLayer;
        exports2.Tooltip = Tooltip;
        exports2.Transformation = Transformation;
        exports2.Util = Util;
        exports2.VideoOverlay = VideoOverlay;
        exports2.bind = bind2;
        exports2.bounds = toBounds;
        exports2.canvas = canvas;
        exports2.circle = circle;
        exports2.circleMarker = circleMarker;
        exports2.control = control;
        exports2.divIcon = divIcon;
        exports2.extend = extend;
        exports2.featureGroup = featureGroup;
        exports2.geoJSON = geoJSON;
        exports2.geoJson = geoJson;
        exports2.gridLayer = gridLayer;
        exports2.icon = icon2;
        exports2.imageOverlay = imageOverlay;
        exports2.latLng = toLatLng;
        exports2.latLngBounds = toLatLngBounds;
        exports2.layerGroup = layerGroup;
        exports2.map = createMap;
        exports2.marker = marker;
        exports2.point = toPoint;
        exports2.polygon = polygon2;
        exports2.polyline = polyline;
        exports2.popup = popup;
        exports2.rectangle = rectangle;
        exports2.setOptions = setOptions;
        exports2.stamp = stamp;
        exports2.svg = svg;
        exports2.svgOverlay = svgOverlay;
        exports2.tileLayer = tileLayer;
        exports2.tooltip = tooltip;
        exports2.transformation = toTransformation;
        exports2.version = version;
        exports2.videoOverlay = videoOverlay;
        var oldL = window.L;
        exports2.noConflict = function() {
          window.L = oldL;
          return this;
        };
        window.L = exports2;
      });
    }
  });

  // node_modules/leaflet-geometryutil/src/leaflet.geometryutil.js
  var require_leaflet_geometryutil = __commonJS({
    "node_modules/leaflet-geometryutil/src/leaflet.geometryutil.js"(exports, module) {
      (function(factory) {
        var L4;
        if (typeof define === "function" && define.amd) {
          define(["leaflet"], factory);
        } else if (typeof module !== "undefined") {
          L4 = require_leaflet_src();
          module.exports = factory(L4);
        } else {
          if (typeof window.L === "undefined")
            throw "Leaflet must be loaded first";
          factory(window.L);
        }
      })(function(L4) {
        "use strict";
        L4.Polyline._flat = L4.LineUtil.isFlat || L4.Polyline._flat || function(latlngs) {
          return !L4.Util.isArray(latlngs[0]) || typeof latlngs[0][0] !== "object" && typeof latlngs[0][0] !== "undefined";
        };
        L4.GeometryUtil = L4.extend(L4.GeometryUtil || {}, {
          /**
                  Shortcut function for planar distance between two {L.LatLng} at current zoom.
          
                  @tutorial distance-length
          
                  @param {L.Map} map Leaflet map to be used for this method
                  @param {L.LatLng} latlngA geographical point A
                  @param {L.LatLng} latlngB geographical point B
                  @returns {Number} planar distance
               */
          distance: function(map, latlngA, latlngB) {
            return map.latLngToLayerPoint(latlngA).distanceTo(map.latLngToLayerPoint(latlngB));
          },
          /**
              Shortcut function for planar distance between a {L.LatLng} and a segment (A-B).
              @param {L.Map} map Leaflet map to be used for this method
              @param {L.LatLng} latlng - The position to search
              @param {L.LatLng} latlngA geographical point A of the segment
              @param {L.LatLng} latlngB geographical point B of the segment
              @returns {Number} planar distance
          */
          distanceSegment: function(map, latlng, latlngA, latlngB) {
            var p = map.latLngToLayerPoint(latlng), p1 = map.latLngToLayerPoint(latlngA), p2 = map.latLngToLayerPoint(latlngB);
            return L4.LineUtil.pointToSegmentDistance(p, p1, p2);
          },
          /**
              Shortcut function for converting distance to readable distance.
              @param {Number} distance distance to be converted
              @param {String} unit 'metric' or 'imperial'
              @returns {String} in yard or miles
          */
          readableDistance: function(distance, unit) {
            var isMetric = unit !== "imperial", distanceStr;
            if (isMetric) {
              if (distance > 1e3) {
                distanceStr = (distance / 1e3).toFixed(2) + " km";
              } else {
                distanceStr = distance.toFixed(1) + " m";
              }
            } else {
              distance *= 1.09361;
              if (distance > 1760) {
                distanceStr = (distance / 1760).toFixed(2) + " miles";
              } else {
                distanceStr = distance.toFixed(1) + " yd";
              }
            }
            return distanceStr;
          },
          /**
              Returns true if the latlng belongs to segment A-B
              @param {L.LatLng} latlng - The position to search
              @param {L.LatLng} latlngA geographical point A of the segment
              @param {L.LatLng} latlngB geographical point B of the segment
              @param {?Number} [tolerance=0.2] tolerance to accept if latlng belongs really
              @returns {boolean}
           */
          belongsSegment: function(latlng, latlngA, latlngB, tolerance) {
            tolerance = tolerance === void 0 ? 0.2 : tolerance;
            var hypotenuse = latlngA.distanceTo(latlngB), delta = latlngA.distanceTo(latlng) + latlng.distanceTo(latlngB) - hypotenuse;
            return delta / hypotenuse < tolerance;
          },
          /**
           * Returns total length of line
           * @tutorial distance-length
           *
           * @param {L.Polyline|Array<L.Point>|Array<L.LatLng>} coords Set of coordinates
           * @returns {Number} Total length (pixels for Point, meters for LatLng)
           */
          length: function(coords) {
            var accumulated = L4.GeometryUtil.accumulatedLengths(coords);
            return accumulated.length > 0 ? accumulated[accumulated.length - 1] : 0;
          },
          /**
           * Returns a list of accumulated length along a line.
           * @param {L.Polyline|Array<L.Point>|Array<L.LatLng>} coords Set of coordinates
           * @returns {Array<Number>} Array of accumulated lengths (pixels for Point, meters for LatLng)
           */
          accumulatedLengths: function(coords) {
            if (typeof coords.getLatLngs == "function") {
              coords = coords.getLatLngs();
            }
            if (coords.length === 0)
              return [];
            var total = 0, lengths = [0];
            for (var i = 0, n = coords.length - 1; i < n; i++) {
              total += coords[i].distanceTo(coords[i + 1]);
              lengths.push(total);
            }
            return lengths;
          },
          /**
                  Returns the closest point of a {L.LatLng} on the segment (A-B)
          
                  @tutorial closest
          
                  @param {L.Map} map Leaflet map to be used for this method
                  @param {L.LatLng} latlng - The position to search
                  @param {L.LatLng} latlngA geographical point A of the segment
                  @param {L.LatLng} latlngB geographical point B of the segment
                  @returns {L.LatLng} Closest geographical point
              */
          closestOnSegment: function(map, latlng, latlngA, latlngB) {
            var maxzoom = map.getMaxZoom();
            if (maxzoom === Infinity)
              maxzoom = map.getZoom();
            var p = map.project(latlng, maxzoom), p1 = map.project(latlngA, maxzoom), p2 = map.project(latlngB, maxzoom), closest = L4.LineUtil.closestPointOnSegment(p, p1, p2);
            return map.unproject(closest, maxzoom);
          },
          /**
              Returns the closest point of a {L.LatLng} on a {L.Circle}
          
              @tutorial closest
          
              @param {L.LatLng} latlng - The position to search
              @param {L.Circle} circle - A Circle defined by a center and a radius
              @returns {L.LatLng} Closest geographical point on the circle circumference
              */
          closestOnCircle: function(circle, latLng) {
            const center = circle.getLatLng();
            const circleRadius = circle.getRadius();
            const radius2 = typeof circleRadius === "number" ? circleRadius : circleRadius.radius;
            const x2 = latLng.lng;
            const y = latLng.lat;
            const cx = center.lng;
            const cy = center.lat;
            const dx = x2 - cx;
            const dy = y - cy;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const tx = cx + dx / distance * radius2;
            const ty = cy + dy / distance * radius2;
            return new L4.LatLng(ty, tx);
          },
          /**
                  Returns the closest latlng on layer.
          
                  Accept nested arrays
          
                  @tutorial closest
          
                  @param {L.Map} map Leaflet map to be used for this method
                  @param {Array<L.LatLng>|Array<Array<L.LatLng>>|L.PolyLine|L.Polygon} layer - Layer that contains the result
                  @param {L.LatLng} latlng - The position to search
                  @param {?boolean} [vertices=false] - Whether to restrict to path vertices.
                  @returns {L.LatLng} Closest geographical point or null if layer param is incorrect
              */
          closest: function(map, layer, latlng, vertices) {
            var latlngs, mindist = Infinity, result = null, i, n, distance, subResult;
            if (layer instanceof Array) {
              if (layer[0] instanceof Array && typeof layer[0][0] !== "number") {
                for (i = 0; i < layer.length; i++) {
                  subResult = L4.GeometryUtil.closest(map, layer[i], latlng, vertices);
                  if (subResult && subResult.distance < mindist) {
                    mindist = subResult.distance;
                    result = subResult;
                  }
                }
                return result;
              } else if (layer[0] instanceof L4.LatLng || typeof layer[0][0] === "number" || typeof layer[0].lat === "number") {
                layer = L4.polyline(layer);
              } else {
                return result;
              }
            }
            if (!(layer instanceof L4.Polyline))
              return result;
            latlngs = JSON.parse(JSON.stringify(layer.getLatLngs().slice(0)));
            if (layer instanceof L4.Polygon) {
              var addLastSegment = function(latlngs2) {
                if (L4.Polyline._flat(latlngs2)) {
                  latlngs2.push(latlngs2[0]);
                } else {
                  for (var i2 = 0; i2 < latlngs2.length; i2++) {
                    addLastSegment(latlngs2[i2]);
                  }
                }
              };
              addLastSegment(latlngs);
            }
            if (!L4.Polyline._flat(latlngs)) {
              for (i = 0; i < latlngs.length; i++) {
                subResult = L4.GeometryUtil.closest(map, latlngs[i], latlng, vertices);
                if (subResult.distance < mindist) {
                  mindist = subResult.distance;
                  result = subResult;
                }
              }
              return result;
            } else {
              if (vertices) {
                for (i = 0, n = latlngs.length; i < n; i++) {
                  var ll = latlngs[i];
                  distance = L4.GeometryUtil.distance(map, latlng, ll);
                  if (distance < mindist) {
                    mindist = distance;
                    result = ll;
                    result.distance = distance;
                  }
                }
                return result;
              }
              for (i = 0, n = latlngs.length; i < n - 1; i++) {
                var latlngA = latlngs[i], latlngB = latlngs[i + 1];
                distance = L4.GeometryUtil.distanceSegment(map, latlng, latlngA, latlngB);
                if (distance <= mindist) {
                  mindist = distance;
                  result = L4.GeometryUtil.closestOnSegment(map, latlng, latlngA, latlngB);
                  result.distance = distance;
                }
              }
              return result;
            }
          },
          /**
                  Returns the closest layer to latlng among a list of layers.
          
                  @tutorial closest
          
                  @param {L.Map} map Leaflet map to be used for this method
                  @param {Array<L.ILayer>} layers Set of layers
                  @param {L.LatLng} latlng - The position to search
                  @returns {object} ``{layer, latlng, distance}`` or ``null`` if list is empty;
              */
          closestLayer: function(map, layers, latlng) {
            var mindist = Infinity, result = null, ll = null, distance = Infinity;
            for (var i = 0, n = layers.length; i < n; i++) {
              var layer = layers[i];
              if (layer instanceof L4.LayerGroup) {
                var subResult = L4.GeometryUtil.closestLayer(map, layer.getLayers(), latlng);
                if (subResult.distance < mindist) {
                  mindist = subResult.distance;
                  result = subResult;
                }
              } else {
                if (layer instanceof L4.Circle) {
                  ll = this.closestOnCircle(layer, latlng);
                  distance = L4.GeometryUtil.distance(map, latlng, ll);
                } else if (typeof layer.getLatLng == "function") {
                  ll = layer.getLatLng();
                  distance = L4.GeometryUtil.distance(map, latlng, ll);
                } else {
                  ll = L4.GeometryUtil.closest(map, layer, latlng);
                  if (ll)
                    distance = ll.distance;
                }
                if (distance < mindist) {
                  mindist = distance;
                  result = { layer, latlng: ll, distance };
                }
              }
            }
            return result;
          },
          /**
                  Returns the n closest layers to latlng among a list of input layers.
          
                  @param {L.Map} map - Leaflet map to be used for this method
                  @param {Array<L.ILayer>} layers - Set of layers
                  @param {L.LatLng} latlng - The position to search
                  @param {?Number} [n=layers.length] - the expected number of output layers.
                  @returns {Array<object>} an array of objects ``{layer, latlng, distance}`` or ``null`` if the input is invalid (empty list or negative n)
              */
          nClosestLayers: function(map, layers, latlng, n) {
            n = typeof n === "number" ? n : layers.length;
            if (n < 1 || layers.length < 1) {
              return null;
            }
            var results = [];
            var distance, ll;
            for (var i = 0, m2 = layers.length; i < m2; i++) {
              var layer = layers[i];
              if (layer instanceof L4.LayerGroup) {
                var subResult = L4.GeometryUtil.closestLayer(map, layer.getLayers(), latlng);
                results.push(subResult);
              } else {
                if (layer instanceof L4.Circle) {
                  ll = this.closestOnCircle(layer, latlng);
                  distance = L4.GeometryUtil.distance(map, latlng, ll);
                } else if (typeof layer.getLatLng == "function") {
                  ll = layer.getLatLng();
                  distance = L4.GeometryUtil.distance(map, latlng, ll);
                } else {
                  ll = L4.GeometryUtil.closest(map, layer, latlng);
                  if (ll)
                    distance = ll.distance;
                }
                results.push({ layer, latlng: ll, distance });
              }
            }
            results.sort(function(a, b) {
              return a.distance - b.distance;
            });
            if (results.length > n) {
              return results.slice(0, n);
            } else {
              return results;
            }
          },
          /**
           * Returns all layers within a radius of the given position, in an ascending order of distance.
             @param {L.Map} map Leaflet map to be used for this method
             @param {Array<ILayer>} layers - A list of layers.
             @param {L.LatLng} latlng - The position to search
             @param {?Number} [radius=Infinity] - Search radius in pixels
             @return {object[]} an array of objects including layer within the radius, closest latlng, and distance
           */
          layersWithin: function(map, layers, latlng, radius2) {
            radius2 = typeof radius2 == "number" ? radius2 : Infinity;
            var results = [];
            var ll = null;
            var distance = 0;
            for (var i = 0, n = layers.length; i < n; i++) {
              var layer = layers[i];
              if (typeof layer.getLatLng == "function") {
                ll = layer.getLatLng();
                distance = L4.GeometryUtil.distance(map, latlng, ll);
              } else {
                ll = L4.GeometryUtil.closest(map, layer, latlng);
                if (ll)
                  distance = ll.distance;
              }
              if (ll && distance < radius2) {
                results.push({ layer, latlng: ll, distance });
              }
            }
            var sortedResults = results.sort(function(a, b) {
              return a.distance - b.distance;
            });
            return sortedResults;
          },
          /**
                  Returns the closest position from specified {LatLng} among specified layers,
                  with a maximum tolerance in pixels, providing snapping behaviour.
          
                  @tutorial closest
          
                  @param {L.Map} map Leaflet map to be used for this method
                  @param {Array<ILayer>} layers - A list of layers to snap on.
                  @param {L.LatLng} latlng - The position to snap
                  @param {?Number} [tolerance=Infinity] - Maximum number of pixels.
                  @param {?boolean} [withVertices=true] - Snap to layers vertices or segment points (not only vertex)
                  @returns {object} with snapped {LatLng} and snapped {Layer} or null if tolerance exceeded.
              */
          closestLayerSnap: function(map, layers, latlng, tolerance, withVertices) {
            tolerance = typeof tolerance == "number" ? tolerance : Infinity;
            withVertices = typeof withVertices == "boolean" ? withVertices : true;
            var result = L4.GeometryUtil.closestLayer(map, layers, latlng);
            if (!result || result.distance > tolerance)
              return null;
            if (withVertices && typeof result.layer.getLatLngs == "function") {
              var closest = L4.GeometryUtil.closest(map, result.layer, result.latlng, true);
              if (closest.distance < tolerance) {
                result.latlng = closest;
                result.distance = L4.GeometryUtil.distance(map, closest, latlng);
              }
            }
            return result;
          },
          /**
              Returns the Point located on a segment at the specified ratio of the segment length.
              @param {L.Point} pA coordinates of point A
              @param {L.Point} pB coordinates of point B
              @param {Number} the length ratio, expressed as a decimal between 0 and 1, inclusive.
              @returns {L.Point} the interpolated point.
          */
          interpolateOnPointSegment: function(pA, pB, ratio) {
            return L4.point(
              pA.x * (1 - ratio) + ratio * pB.x,
              pA.y * (1 - ratio) + ratio * pB.y
            );
          },
          /**
              Returns the coordinate of the point located on a line at the specified ratio of the line length.
              @param {L.Map} map Leaflet map to be used for this method
              @param {Array<L.LatLng>|L.PolyLine} latlngs Set of geographical points
              @param {Number} ratio the length ratio, expressed as a decimal between 0 and 1, inclusive
              @returns {Object} an object with latLng ({LatLng}) and predecessor ({Number}), the index of the preceding vertex in the Polyline
              (-1 if the interpolated point is the first vertex)
          */
          interpolateOnLine: function(map, latLngs, ratio) {
            latLngs = latLngs instanceof L4.Polyline ? latLngs.getLatLngs() : latLngs;
            var n = latLngs.length;
            if (n < 2) {
              return null;
            }
            ratio = Math.max(Math.min(ratio, 1), 0);
            if (ratio === 0) {
              return {
                latLng: latLngs[0] instanceof L4.LatLng ? latLngs[0] : L4.latLng(latLngs[0]),
                predecessor: -1
              };
            }
            if (ratio == 1) {
              return {
                latLng: latLngs[latLngs.length - 1] instanceof L4.LatLng ? latLngs[latLngs.length - 1] : L4.latLng(latLngs[latLngs.length - 1]),
                predecessor: latLngs.length - 2
              };
            }
            var maxzoom = map.getMaxZoom();
            if (maxzoom === Infinity)
              maxzoom = map.getZoom();
            var pts = [];
            var lineLength = 0;
            for (var i = 0; i < n; i++) {
              pts[i] = map.project(latLngs[i], maxzoom);
              if (i > 0)
                lineLength += pts[i - 1].distanceTo(pts[i]);
            }
            var ratioDist = lineLength * ratio;
            var cumulativeDistanceToA = 0, cumulativeDistanceToB = 0;
            for (var i = 0; cumulativeDistanceToB < ratioDist; i++) {
              var pointA = pts[i], pointB = pts[i + 1];
              cumulativeDistanceToA = cumulativeDistanceToB;
              cumulativeDistanceToB += pointA.distanceTo(pointB);
            }
            if (pointA == void 0 && pointB == void 0) {
              var pointA = pts[0], pointB = pts[1], i = 1;
            }
            var segmentRatio = cumulativeDistanceToB - cumulativeDistanceToA !== 0 ? (ratioDist - cumulativeDistanceToA) / (cumulativeDistanceToB - cumulativeDistanceToA) : 0;
            var interpolatedPoint = L4.GeometryUtil.interpolateOnPointSegment(pointA, pointB, segmentRatio);
            return {
              latLng: map.unproject(interpolatedPoint, maxzoom),
              predecessor: i - 1
            };
          },
          /**
              Returns a float between 0 and 1 representing the location of the
              closest point on polyline to the given latlng, as a fraction of total line length.
              (opposite of L.GeometryUtil.interpolateOnLine())
              @param {L.Map} map Leaflet map to be used for this method
              @param {L.PolyLine} polyline Polyline on which the latlng will be search
              @param {L.LatLng} latlng The position to search
              @returns {Number} Float between 0 and 1
          */
          locateOnLine: function(map, polyline, latlng) {
            var latlngs = polyline.getLatLngs();
            if (latlng.equals(latlngs[0]))
              return 0;
            if (latlng.equals(latlngs[latlngs.length - 1]))
              return 1;
            var point = L4.GeometryUtil.closest(map, polyline, latlng, false), lengths = L4.GeometryUtil.accumulatedLengths(latlngs), total_length = lengths[lengths.length - 1], portion = 0, found = false;
            for (var i = 0, n = latlngs.length - 1; i < n; i++) {
              var l1 = latlngs[i], l2 = latlngs[i + 1];
              portion = lengths[i];
              if (L4.GeometryUtil.belongsSegment(point, l1, l2, 1e-3)) {
                portion += l1.distanceTo(point);
                found = true;
                break;
              }
            }
            if (!found) {
              throw "Could not interpolate " + latlng.toString() + " within " + polyline.toString();
            }
            return portion / total_length;
          },
          /**
              Returns a clone with reversed coordinates.
              @param {L.PolyLine} polyline polyline to reverse
              @returns {L.PolyLine} polyline reversed
          */
          reverse: function(polyline) {
            return L4.polyline(polyline.getLatLngs().slice(0).reverse());
          },
          /**
              Returns a sub-part of the polyline, from start to end.
              If start is superior to end, returns extraction from inverted line.
              @param {L.Map} map Leaflet map to be used for this method
              @param {L.PolyLine} polyline Polyline on which will be extracted the sub-part
              @param {Number} start ratio, expressed as a decimal between 0 and 1, inclusive
              @param {Number} end ratio, expressed as a decimal between 0 and 1, inclusive
              @returns {Array<L.LatLng>} new polyline
           */
          extract: function(map, polyline, start, end) {
            if (start > end) {
              return L4.GeometryUtil.extract(map, L4.GeometryUtil.reverse(polyline), 1 - start, 1 - end);
            }
            start = Math.max(Math.min(start, 1), 0);
            end = Math.max(Math.min(end, 1), 0);
            var latlngs = polyline.getLatLngs(), startpoint = L4.GeometryUtil.interpolateOnLine(map, polyline, start), endpoint = L4.GeometryUtil.interpolateOnLine(map, polyline, end);
            if (start == end) {
              var point = L4.GeometryUtil.interpolateOnLine(map, polyline, end);
              return [point.latLng];
            }
            if (startpoint.predecessor == -1)
              startpoint.predecessor = 0;
            if (endpoint.predecessor == -1)
              endpoint.predecessor = 0;
            var result = latlngs.slice(startpoint.predecessor + 1, endpoint.predecessor + 1);
            result.unshift(startpoint.latLng);
            result.push(endpoint.latLng);
            return result;
          },
          /**
              Returns true if first polyline ends where other second starts.
              @param {L.PolyLine} polyline First polyline
              @param {L.PolyLine} other Second polyline
              @returns {bool}
          */
          isBefore: function(polyline, other) {
            if (!other)
              return false;
            var lla = polyline.getLatLngs(), llb = other.getLatLngs();
            return lla[lla.length - 1].equals(llb[0]);
          },
          /**
              Returns true if first polyline starts where second ends.
              @param {L.PolyLine} polyline First polyline
              @param {L.PolyLine} other Second polyline
              @returns {bool}
          */
          isAfter: function(polyline, other) {
            if (!other)
              return false;
            var lla = polyline.getLatLngs(), llb = other.getLatLngs();
            return lla[0].equals(llb[llb.length - 1]);
          },
          /**
              Returns true if first polyline starts where second ends or start.
              @param {L.PolyLine} polyline First polyline
              @param {L.PolyLine} other Second polyline
              @returns {bool}
          */
          startsAtExtremity: function(polyline, other) {
            if (!other)
              return false;
            var lla = polyline.getLatLngs(), llb = other.getLatLngs(), start = lla[0];
            return start.equals(llb[0]) || start.equals(llb[llb.length - 1]);
          },
          /**
              Returns horizontal angle in degres between two points.
              @param {L.Point} a Coordinates of point A
              @param {L.Point} b Coordinates of point B
              @returns {Number} horizontal angle
           */
          computeAngle: function(a, b) {
            return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
          },
          /**
             Returns slope (Ax+B) between two points.
              @param {L.Point} a Coordinates of point A
              @param {L.Point} b Coordinates of point B
              @returns {Object} with ``a`` and ``b`` properties.
           */
          computeSlope: function(a, b) {
            var s = (b.y - a.y) / (b.x - a.x), o = a.y - s * a.x;
            return { "a": s, "b": o };
          },
          /**
             Returns LatLng of rotated point around specified LatLng center.
              @param {L.LatLng} latlngPoint: point to rotate
              @param {double} angleDeg: angle to rotate in degrees
              @param {L.LatLng} latlngCenter: center of rotation
              @returns {L.LatLng} rotated point
           */
          rotatePoint: function(map, latlngPoint, angleDeg, latlngCenter) {
            var maxzoom = map.getMaxZoom();
            if (maxzoom === Infinity)
              maxzoom = map.getZoom();
            var angleRad = angleDeg * Math.PI / 180, pPoint = map.project(latlngPoint, maxzoom), pCenter = map.project(latlngCenter, maxzoom), x2 = Math.cos(angleRad) * (pPoint.x - pCenter.x) - Math.sin(angleRad) * (pPoint.y - pCenter.y) + pCenter.x, y2 = Math.sin(angleRad) * (pPoint.x - pCenter.x) + Math.cos(angleRad) * (pPoint.y - pCenter.y) + pCenter.y;
            return map.unproject(new L4.Point(x2, y2), maxzoom);
          },
          /**
             Returns the bearing in degrees clockwise from north (0 degrees)
             from the first L.LatLng to the second, at the first LatLng
             @param {L.LatLng} latlng1: origin point of the bearing
             @param {L.LatLng} latlng2: destination point of the bearing
             @returns {float} degrees clockwise from north.
          */
          bearing: function(latlng1, latlng2) {
            var rad = Math.PI / 180, lat1 = latlng1.lat * rad, lat2 = latlng2.lat * rad, lon1 = latlng1.lng * rad, lon2 = latlng2.lng * rad, y = Math.sin(lon2 - lon1) * Math.cos(lat2), x2 = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
            var bearing = (Math.atan2(y, x2) * 180 / Math.PI + 360) % 360;
            return bearing >= 180 ? bearing - 360 : bearing;
          },
          /**
             Returns the point that is a distance and heading away from
             the given origin point.
             @param {L.LatLng} latlng: origin point
             @param {float} heading: heading in degrees, clockwise from 0 degrees north.
             @param {float} distance: distance in meters
             @returns {L.latLng} the destination point.
             Many thanks to Chris Veness at http://www.movable-type.co.uk/scripts/latlong.html
             for a great reference and examples.
          */
          destination: function(latlng, heading, distance) {
            heading = (heading + 360) % 360;
            var rad = Math.PI / 180, radInv = 180 / Math.PI, R = L4.CRS.Earth.R, lon1 = latlng.lng * rad, lat1 = latlng.lat * rad, rheading = heading * rad, sinLat1 = Math.sin(lat1), cosLat1 = Math.cos(lat1), cosDistR = Math.cos(distance / R), sinDistR = Math.sin(distance / R), lat2 = Math.asin(sinLat1 * cosDistR + cosLat1 * sinDistR * Math.cos(rheading)), lon2 = lon1 + Math.atan2(Math.sin(rheading) * sinDistR * cosLat1, cosDistR - sinLat1 * Math.sin(lat2));
            lon2 = lon2 * radInv;
            lon2 = lon2 > 180 ? lon2 - 360 : lon2 < -180 ? lon2 + 360 : lon2;
            return L4.latLng([lat2 * radInv, lon2]);
          },
          /**
             Returns the the angle of the given segment and the Equator in degrees,
             clockwise from 0 degrees north.
             @param {L.Map} map: Leaflet map to be used for this method
             @param {L.LatLng} latlngA: geographical point A of the segment
             @param {L.LatLng} latlngB: geographical point B of the segment
             @returns {Float} the angle in degrees.
          */
          angle: function(map, latlngA, latlngB) {
            var pointA = map.latLngToContainerPoint(latlngA), pointB = map.latLngToContainerPoint(latlngB), angleDeg = Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180 / Math.PI + 90;
            angleDeg += angleDeg < 0 ? 360 : 0;
            return angleDeg;
          },
          /**
             Returns a point snaps on the segment and heading away from the given origin point a distance.
             @param {L.Map} map: Leaflet map to be used for this method
             @param {L.LatLng} latlngA: geographical point A of the segment
             @param {L.LatLng} latlngB: geographical point B of the segment
             @param {float} distance: distance in meters
             @returns {L.latLng} the destination point.
          */
          destinationOnSegment: function(map, latlngA, latlngB, distance) {
            var angleDeg = L4.GeometryUtil.angle(map, latlngA, latlngB), latlng = L4.GeometryUtil.destination(latlngA, angleDeg, distance);
            return L4.GeometryUtil.closestOnSegment(map, latlng, latlngA, latlngB);
          }
        });
        return L4.GeometryUtil;
      });
    }
  });

  // node_modules/svelte/src/runtime/internal/utils.js
  function noop() {
  }
  function assign(tar, src) {
    for (const k2 in src)
      tar[k2] = src[k2];
    return (
      /** @type {T & S} */
      tar
    );
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
  }
  var src_url_equal_anchor;
  function src_url_equal(element_src, url) {
    if (element_src === url)
      return true;
    if (!src_url_equal_anchor) {
      src_url_equal_anchor = document.createElement("a");
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
      const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
      return definition[0](slot_ctx);
    }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      const lets = definition[2](fn(dirty));
      if ($$scope.dirty === void 0) {
        return lets;
      }
      if (typeof lets === "object") {
        const merged = [];
        const len = Math.max($$scope.dirty.length, lets.length);
        for (let i = 0; i < len; i += 1) {
          merged[i] = $$scope.dirty[i] | lets[i];
        }
        return merged;
      }
      return $$scope.dirty | lets;
    }
    return $$scope.dirty;
  }
  function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
      const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
      slot.p(slot_context, slot_changes);
    }
  }
  function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
      const dirty = [];
      const length = $$scope.ctx.length / 32;
      for (let i = 0; i < length; i++) {
        dirty[i] = -1;
      }
      return dirty;
    }
    return -1;
  }
  function exclude_internal_props(props) {
    const result = {};
    for (const k2 in props)
      if (k2[0] !== "$")
        result[k2] = props[k2];
    return result;
  }
  function compute_rest_props(props, keys) {
    const rest = {};
    keys = new Set(keys);
    for (const k2 in props)
      if (!keys.has(k2) && k2[0] !== "$")
        rest[k2] = props[k2];
    return rest;
  }

  // node_modules/svelte/src/runtime/internal/globals.js
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
    // @ts-ignore Node typings have this
    global
  );

  // node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js
  var ResizeObserverSingleton = class _ResizeObserverSingleton {
    /**
     * @private
     * @readonly
     * @type {WeakMap<Element, import('./private.js').Listener>}
     */
    _listeners = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
    /**
     * @private
     * @type {ResizeObserver}
     */
    _observer = void 0;
    /** @type {ResizeObserverOptions} */
    options;
    /** @param {ResizeObserverOptions} options */
    constructor(options) {
      this.options = options;
    }
    /**
     * @param {Element} element
     * @param {import('./private.js').Listener} listener
     * @returns {() => void}
     */
    observe(element2, listener) {
      this._listeners.set(element2, listener);
      this._getObserver().observe(element2, this.options);
      return () => {
        this._listeners.delete(element2);
        this._observer.unobserve(element2);
      };
    }
    /**
     * @private
     */
    _getObserver() {
      return this._observer ?? (this._observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          _ResizeObserverSingleton.entries.set(entry.target, entry);
          this._listeners.get(entry.target)?.(entry);
        }
      }));
    }
  };
  ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;

  // node_modules/svelte/src/runtime/internal/dom.js
  var is_hydrating = false;
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
      const style = element("style");
      style.id = style_sheet_id;
      style.textContent = styles;
      append_stylesheet(append_styles_to, style);
    }
  }
  function get_root_for_style(node) {
    if (!node)
      return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && /** @type {ShadowRoot} */
    root.host) {
      return (
        /** @type {ShadowRoot} */
        root
      );
    }
    return node.ownerDocument;
  }
  function append_stylesheet(node, style) {
    append(
      /** @type {Document} */
      node.head || node,
      style
    );
    return style.sheet;
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i])
        iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function stop_propagation(fn) {
    return function(event) {
      event.stopPropagation();
      return fn.call(this, event);
    };
  }
  function self2(fn) {
    return function(event) {
      if (event.target === this)
        fn.call(this, event);
    };
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  var always_set_through_set_attribute = ["width", "height"];
  function set_attributes(node, attributes) {
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
      if (attributes[key] == null) {
        node.removeAttribute(key);
      } else if (key === "style") {
        node.style.cssText = attributes[key];
      } else if (key === "__value") {
        node.value = node[key] = attributes[key];
      } else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
        node[key] = attributes[key];
      } else {
        attr(node, key, attributes[key]);
      }
    }
  }
  function init_binding_group(group) {
    let _inputs;
    return {
      /* push */
      p(...inputs) {
        _inputs = inputs;
        _inputs.forEach((input) => group.push(input));
      },
      /* remove */
      r() {
        _inputs.forEach((input) => group.splice(group.indexOf(input), 1));
      }
    };
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data) {
    data = "" + data;
    if (text2.data === data)
      return;
    text2.data = /** @type {string} */
    data;
  }
  function set_input_value(input, value) {
    input.value = value == null ? "" : value;
  }
  function set_style(node, key, value, important) {
    if (value == null) {
      node.style.removeProperty(key);
    } else {
      node.style.setProperty(key, value, important ? "important" : "");
    }
  }
  function custom_event(type2, detail, { bubbles = false, cancelable = false } = {}) {
    return new CustomEvent(type2, { detail, bubbles, cancelable });
  }
  function get_custom_elements_slots(element2) {
    const result = {};
    element2.childNodes.forEach(
      /** @param {Element} node */
      (node) => {
        result[node.slot || "default"] = true;
      }
    );
    return result;
  }

  // node_modules/svelte/src/runtime/internal/lifecycle.js
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  function createEventDispatcher() {
    const component = get_current_component();
    return (type2, detail, { cancelable = false } = {}) => {
      const callbacks = component.$$.callbacks[type2];
      if (callbacks) {
        const event = custom_event(
          /** @type {string} */
          type2,
          detail,
          { cancelable }
        );
        callbacks.slice().forEach((fn) => {
          fn.call(component, event);
        });
        return !event.defaultPrevented;
      }
      return true;
    };
  }
  function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
      callbacks.slice().forEach((fn) => fn.call(this, event));
    }
  }

  // node_modules/svelte/src/runtime/internal/scheduler.js
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = /* @__PURE__ */ Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  function add_flush_callback(fn) {
    flush_callbacks.push(fn);
  }
  var seen_callbacks = /* @__PURE__ */ new Set();
  var flushidx = 0;
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }

  // node_modules/svelte/src/runtime/internal/transitions.js
  var outroing = /* @__PURE__ */ new Set();
  var outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
      // parent group
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }

  // node_modules/svelte/src/runtime/internal/each.js
  function ensure_array_like(array_like_or_iterator) {
    return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }

  // node_modules/svelte/src/runtime/internal/spread.js
  function get_spread_update(levels, updates) {
    const update2 = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
      const o = levels[i];
      const n = updates[i];
      if (n) {
        for (const key in o) {
          if (!(key in n))
            to_null_out[key] = 1;
        }
        for (const key in n) {
          if (!accounted_for[key]) {
            update2[key] = n[key];
            accounted_for[key] = 1;
          }
        }
        levels[i] = n;
      } else {
        for (const key in o) {
          accounted_for[key] = 1;
        }
      }
    }
    for (const key in to_null_out) {
      if (!(key in update2))
        update2[key] = void 0;
    }
    return update2;
  }

  // node_modules/svelte/src/shared/boolean_attributes.js
  var _boolean_attributes = (
    /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]
  );
  var boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);

  // node_modules/svelte/src/runtime/internal/Component.js
  function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== void 0) {
      component.$$.bound[index] = callback;
      callback(component.$$.ctx[index]);
    }
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance11, create_fragment11, not_equal, props, append_styles2 = null, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles2 && append_styles2($$.root);
    let ready = false;
    $$.ctx = instance11 ? instance11(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment11 ? create_fragment11($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      /** The Svelte component constructor */
      $$ctor;
      /** Slots */
      $$s;
      /** The Svelte component instance */
      $$c;
      /** Whether or not the custom element is connected */
      $$cn = false;
      /** Component props data */
      $$d = {};
      /** `true` if currently in the process of reflecting component props back to attributes */
      $$r = false;
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      $$p_d = {};
      /** @type {Record<string, Function[]>} Event listeners */
      $$l = {};
      /** @type {Map<Function, Function>} Event listener unsubscribe functions */
      $$l_u = /* @__PURE__ */ new Map();
      constructor($$componentCtor, $$slots, use_shadow_dom) {
        super();
        this.$$ctor = $$componentCtor;
        this.$$s = $$slots;
        if (use_shadow_dom) {
          this.attachShadow({ mode: "open" });
        }
      }
      addEventListener(type2, listener, options) {
        this.$$l[type2] = this.$$l[type2] || [];
        this.$$l[type2].push(listener);
        if (this.$$c) {
          const unsub = this.$$c.$on(type2, listener);
          this.$$l_u.set(listener, unsub);
        }
        super.addEventListener(type2, listener, options);
      }
      removeEventListener(type2, listener, options) {
        super.removeEventListener(type2, listener, options);
        if (this.$$c) {
          const unsub = this.$$l_u.get(listener);
          if (unsub) {
            unsub();
            this.$$l_u.delete(listener);
          }
        }
      }
      async connectedCallback() {
        this.$$cn = true;
        if (!this.$$c) {
          let create_slot2 = function(name) {
            return () => {
              let node;
              const obj = {
                c: function create() {
                  node = element("slot");
                  if (name !== "default") {
                    attr(node, "name", name);
                  }
                },
                /**
                 * @param {HTMLElement} target
                 * @param {HTMLElement} [anchor]
                 */
                m: function mount(target, anchor) {
                  insert(target, node, anchor);
                },
                d: function destroy(detaching) {
                  if (detaching) {
                    detach(node);
                  }
                }
              };
              return obj;
            };
          };
          await Promise.resolve();
          if (!this.$$cn || this.$$c) {
            return;
          }
          const $$slots = {};
          const existing_slots = get_custom_elements_slots(this);
          for (const name of this.$$s) {
            if (name in existing_slots) {
              $$slots[name] = [create_slot2(name)];
            }
          }
          for (const attribute of this.attributes) {
            const name = this.$$g_p(attribute.name);
            if (!(name in this.$$d)) {
              this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
            }
          }
          for (const key in this.$$p_d) {
            if (!(key in this.$$d) && this[key] !== void 0) {
              this.$$d[key] = this[key];
              delete this[key];
            }
          }
          this.$$c = new this.$$ctor({
            target: this.shadowRoot || this,
            props: {
              ...this.$$d,
              $$slots,
              $$scope: {
                ctx: []
              }
            }
          });
          const reflect_attributes = () => {
            this.$$r = true;
            for (const key in this.$$p_d) {
              this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
              if (this.$$p_d[key].reflect) {
                const attribute_value = get_custom_element_value(
                  key,
                  this.$$d[key],
                  this.$$p_d,
                  "toAttribute"
                );
                if (attribute_value == null) {
                  this.removeAttribute(this.$$p_d[key].attribute || key);
                } else {
                  this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                }
              }
            }
            this.$$r = false;
          };
          this.$$c.$$.after_update.push(reflect_attributes);
          reflect_attributes();
          for (const type2 in this.$$l) {
            for (const listener of this.$$l[type2]) {
              const unsub = this.$$c.$on(type2, listener);
              this.$$l_u.set(listener, unsub);
            }
          }
          this.$$l = {};
        }
      }
      // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
      // and setting attributes through setAttribute etc, this is helpful
      attributeChangedCallback(attr2, _oldValue, newValue) {
        if (this.$$r)
          return;
        attr2 = this.$$g_p(attr2);
        this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
        this.$$c?.$set({ [attr2]: this.$$d[attr2] });
      }
      disconnectedCallback() {
        this.$$cn = false;
        Promise.resolve().then(() => {
          if (!this.$$cn) {
            this.$$c.$destroy();
            this.$$c = void 0;
          }
        });
      }
      $$g_p(attribute_name) {
        return Object.keys(this.$$p_d).find(
          (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
        ) || attribute_name;
      }
    };
  }
  function get_custom_element_value(prop, value, props_definition, transform) {
    const type2 = props_definition[prop]?.type;
    value = type2 === "Boolean" && typeof value !== "boolean" ? value != null : value;
    if (!transform || !props_definition[prop]) {
      return value;
    } else if (transform === "toAttribute") {
      switch (type2) {
        case "Object":
        case "Array":
          return value == null ? null : JSON.stringify(value);
        case "Boolean":
          return value ? "" : null;
        case "Number":
          return value == null ? null : value;
        default:
          return value;
      }
    } else {
      switch (type2) {
        case "Object":
        case "Array":
          return value && JSON.parse(value);
        case "Boolean":
          return value;
        case "Number":
          return value != null ? +value : value;
        default:
          return value;
      }
    }
  }
  function create_custom_element(Component, props_definition, slots, accessors, use_shadow_dom, extend) {
    let Class = class extends SvelteElement {
      constructor() {
        super(Component, slots, use_shadow_dom);
        this.$$p_d = props_definition;
      }
      static get observedAttributes() {
        return Object.keys(props_definition).map(
          (key) => (props_definition[key].attribute || key).toLowerCase()
        );
      }
    };
    Object.keys(props_definition).forEach((prop) => {
      Object.defineProperty(Class.prototype, prop, {
        get() {
          return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
        },
        set(value) {
          value = get_custom_element_value(prop, value, props_definition);
          this.$$d[prop] = value;
          this.$$c?.$set({ [prop]: value });
        }
      });
    });
    accessors.forEach((accessor) => {
      Object.defineProperty(Class.prototype, accessor, {
        get() {
          return this.$$c?.[accessor];
        }
      });
    });
    if (extend) {
      Class = extend(Class);
    }
    Component.element = /** @type {any} */
    Class;
    return Class;
  }
  var SvelteComponent = class {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$ = void 0;
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$set = void 0;
    /** @returns {void} */
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    /**
     * @template {Extract<keyof Events, string>} K
     * @param {K} type
     * @param {((e: Events[K]) => void) | null | undefined} callback
     * @returns {() => void}
     */
    $on(type2, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type2] || (this.$$.callbacks[type2] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    /**
     * @param {Partial<Props>} props
     * @returns {void}
     */
    $set(props) {
      if (this.$$set && !is_empty(props)) {
        this.$$.skip_bound = true;
        this.$$set(props);
        this.$$.skip_bound = false;
      }
    }
  };

  // node_modules/svelte/src/shared/version.js
  var PUBLIC_VERSION = "4";

  // node_modules/svelte/src/runtime/internal/disclose-version/index.js
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);

  // src/components/D411FacilityMap.svelte
  var import_leaflet3 = __toESM(require_leaflet_src());

  // node_modules/leaflet-draw/dist/leaflet.draw.js
  !function(t, e, i) {
    function o(t2, e2) {
      for (; (t2 = t2.parentElement) && !t2.classList.contains(e2); )
        ;
      return t2;
    }
    L.drawVersion = "1.0.4", L.Draw = {}, L.drawLocal = { draw: { toolbar: { actions: { title: "Cancel drawing", text: "Cancel" }, finish: { title: "Finish drawing", text: "Finish" }, undo: { title: "Delete last point drawn", text: "Delete last point" }, buttons: { polyline: "Draw a polyline", polygon: "Draw a polygon", rectangle: "Draw a rectangle", circle: "Draw a circle", marker: "Draw a marker", circlemarker: "Draw a circlemarker" } }, handlers: { circle: { tooltip: { start: "Click and drag to draw circle." }, radius: "Radius" }, circlemarker: { tooltip: { start: "Click map to place circle marker." } }, marker: { tooltip: { start: "Click map to place marker." } }, polygon: { tooltip: { start: "Click to start drawing shape.", cont: "Click to continue drawing shape.", end: "Click first point to close this shape." } }, polyline: { error: "<strong>Error:</strong> shape edges cannot cross!", tooltip: { start: "Click to start drawing line.", cont: "Click to continue drawing line.", end: "Click last point to finish line." } }, rectangle: { tooltip: { start: "Click and drag to draw rectangle." } }, simpleshape: { tooltip: { end: "Release mouse to finish drawing." } } } }, edit: { toolbar: { actions: { save: { title: "Save changes", text: "Save" }, cancel: { title: "Cancel editing, discards all changes", text: "Cancel" }, clearAll: { title: "Clear all layers", text: "Clear All" } }, buttons: { edit: "Edit layers", editDisabled: "No layers to edit", remove: "Delete layers", removeDisabled: "No layers to delete" } }, handlers: { edit: { tooltip: { text: "Drag handles or markers to edit features.", subtext: "Click cancel to undo changes." } }, remove: { tooltip: { text: "Click on a feature to remove." } } } } }, L.Draw.Event = {}, L.Draw.Event.CREATED = "draw:created", L.Draw.Event.EDITED = "draw:edited", L.Draw.Event.DELETED = "draw:deleted", L.Draw.Event.DRAWSTART = "draw:drawstart", L.Draw.Event.DRAWSTOP = "draw:drawstop", L.Draw.Event.DRAWVERTEX = "draw:drawvertex", L.Draw.Event.EDITSTART = "draw:editstart", L.Draw.Event.EDITMOVE = "draw:editmove", L.Draw.Event.EDITRESIZE = "draw:editresize", L.Draw.Event.EDITVERTEX = "draw:editvertex", L.Draw.Event.EDITSTOP = "draw:editstop", L.Draw.Event.DELETESTART = "draw:deletestart", L.Draw.Event.DELETESTOP = "draw:deletestop", L.Draw.Event.TOOLBAROPENED = "draw:toolbaropened", L.Draw.Event.TOOLBARCLOSED = "draw:toolbarclosed", L.Draw.Event.MARKERCONTEXT = "draw:markercontext", L.Draw = L.Draw || {}, L.Draw.Feature = L.Handler.extend({ initialize: function(t2, e2) {
      this._map = t2, this._container = t2._container, this._overlayPane = t2._panes.overlayPane, this._popupPane = t2._panes.popupPane, e2 && e2.shapeOptions && (e2.shapeOptions = L.Util.extend({}, this.options.shapeOptions, e2.shapeOptions)), L.setOptions(this, e2);
      var i2 = L.version.split(".");
      1 === parseInt(i2[0], 10) && parseInt(i2[1], 10) >= 2 ? L.Draw.Feature.include(L.Evented.prototype) : L.Draw.Feature.include(L.Mixin.Events);
    }, enable: function() {
      this._enabled || (L.Handler.prototype.enable.call(this), this.fire("enabled", { handler: this.type }), this._map.fire(L.Draw.Event.DRAWSTART, { layerType: this.type }));
    }, disable: function() {
      this._enabled && (L.Handler.prototype.disable.call(this), this._map.fire(L.Draw.Event.DRAWSTOP, { layerType: this.type }), this.fire("disabled", { handler: this.type }));
    }, addHooks: function() {
      var t2 = this._map;
      t2 && (L.DomUtil.disableTextSelection(), t2.getContainer().focus(), this._tooltip = new L.Draw.Tooltip(this._map), L.DomEvent.on(this._container, "keyup", this._cancelDrawing, this));
    }, removeHooks: function() {
      this._map && (L.DomUtil.enableTextSelection(), this._tooltip.dispose(), this._tooltip = null, L.DomEvent.off(this._container, "keyup", this._cancelDrawing, this));
    }, setOptions: function(t2) {
      L.setOptions(this, t2);
    }, _fireCreatedEvent: function(t2) {
      this._map.fire(L.Draw.Event.CREATED, { layer: t2, layerType: this.type });
    }, _cancelDrawing: function(t2) {
      27 === t2.keyCode && (this._map.fire("draw:canceled", { layerType: this.type }), this.disable());
    } }), L.Draw.Polyline = L.Draw.Feature.extend({ statics: { TYPE: "polyline" }, Poly: L.Polyline, options: { allowIntersection: true, repeatMode: false, drawError: { color: "#b00b00", timeout: 2500 }, icon: new L.DivIcon({ iconSize: new L.Point(8, 8), className: "leaflet-div-icon leaflet-editing-icon" }), touchIcon: new L.DivIcon({ iconSize: new L.Point(20, 20), className: "leaflet-div-icon leaflet-editing-icon leaflet-touch-icon" }), guidelineDistance: 20, maxGuideLineLength: 4e3, shapeOptions: { stroke: true, color: "#3388ff", weight: 4, opacity: 0.5, fill: false, clickable: true }, metric: true, feet: true, nautic: false, showLength: true, zIndexOffset: 2e3, factor: 1, maxPoints: 0 }, initialize: function(t2, e2) {
      L.Browser.touch && (this.options.icon = this.options.touchIcon), this.options.drawError.message = L.drawLocal.draw.handlers.polyline.error, e2 && e2.drawError && (e2.drawError = L.Util.extend({}, this.options.drawError, e2.drawError)), this.type = L.Draw.Polyline.TYPE, L.Draw.Feature.prototype.initialize.call(this, t2, e2);
    }, addHooks: function() {
      L.Draw.Feature.prototype.addHooks.call(this), this._map && (this._markers = [], this._markerGroup = new L.LayerGroup(), this._map.addLayer(this._markerGroup), this._poly = new L.Polyline([], this.options.shapeOptions), this._tooltip.updateContent(this._getTooltipText()), this._mouseMarker || (this._mouseMarker = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "leaflet-mouse-marker", iconAnchor: [20, 20], iconSize: [40, 40] }), opacity: 0, zIndexOffset: this.options.zIndexOffset })), this._mouseMarker.on("mouseout", this._onMouseOut, this).on("mousemove", this._onMouseMove, this).on("mousedown", this._onMouseDown, this).on("mouseup", this._onMouseUp, this).addTo(this._map), this._map.on("mouseup", this._onMouseUp, this).on("mousemove", this._onMouseMove, this).on("zoomlevelschange", this._onZoomEnd, this).on("touchstart", this._onTouch, this).on("zoomend", this._onZoomEnd, this));
    }, removeHooks: function() {
      L.Draw.Feature.prototype.removeHooks.call(this), this._clearHideErrorTimeout(), this._cleanUpShape(), this._map.removeLayer(this._markerGroup), delete this._markerGroup, delete this._markers, this._map.removeLayer(this._poly), delete this._poly, this._mouseMarker.off("mousedown", this._onMouseDown, this).off("mouseout", this._onMouseOut, this).off("mouseup", this._onMouseUp, this).off("mousemove", this._onMouseMove, this), this._map.removeLayer(this._mouseMarker), delete this._mouseMarker, this._clearGuides(), this._map.off("mouseup", this._onMouseUp, this).off("mousemove", this._onMouseMove, this).off("zoomlevelschange", this._onZoomEnd, this).off("zoomend", this._onZoomEnd, this).off("touchstart", this._onTouch, this).off("click", this._onTouch, this);
    }, deleteLastVertex: function() {
      if (!(this._markers.length <= 1)) {
        var t2 = this._markers.pop(), e2 = this._poly, i2 = e2.getLatLngs(), o2 = i2.splice(-1, 1)[0];
        this._poly.setLatLngs(i2), this._markerGroup.removeLayer(t2), e2.getLatLngs().length < 2 && this._map.removeLayer(e2), this._vertexChanged(o2, false);
      }
    }, addVertex: function(t2) {
      if (this._markers.length >= 2 && !this.options.allowIntersection && this._poly.newLatLngIntersects(t2))
        return void this._showErrorTooltip();
      this._errorShown && this._hideErrorTooltip(), this._markers.push(this._createMarker(t2)), this._poly.addLatLng(t2), 2 === this._poly.getLatLngs().length && this._map.addLayer(this._poly), this._vertexChanged(t2, true);
    }, completeShape: function() {
      this._markers.length <= 1 || !this._shapeIsValid() || (this._fireCreatedEvent(), this.disable(), this.options.repeatMode && this.enable());
    }, _finishShape: function() {
      var t2 = this._poly._defaultShape ? this._poly._defaultShape() : this._poly.getLatLngs(), e2 = this._poly.newLatLngIntersects(t2[t2.length - 1]);
      if (!this.options.allowIntersection && e2 || !this._shapeIsValid())
        return void this._showErrorTooltip();
      this._fireCreatedEvent(), this.disable(), this.options.repeatMode && this.enable();
    }, _shapeIsValid: function() {
      return true;
    }, _onZoomEnd: function() {
      null !== this._markers && this._updateGuide();
    }, _onMouseMove: function(t2) {
      var e2 = this._map.mouseEventToLayerPoint(t2.originalEvent), i2 = this._map.layerPointToLatLng(e2);
      this._currentLatLng = i2, this._updateTooltip(i2), this._updateGuide(e2), this._mouseMarker.setLatLng(i2), L.DomEvent.preventDefault(t2.originalEvent);
    }, _vertexChanged: function(t2, e2) {
      this._map.fire(L.Draw.Event.DRAWVERTEX, { layers: this._markerGroup }), this._updateFinishHandler(), this._updateRunningMeasure(t2, e2), this._clearGuides(), this._updateTooltip();
    }, _onMouseDown: function(t2) {
      if (!this._clickHandled && !this._touchHandled && !this._disableMarkers) {
        this._onMouseMove(t2), this._clickHandled = true, this._disableNewMarkers();
        var e2 = t2.originalEvent, i2 = e2.clientX, o2 = e2.clientY;
        this._startPoint.call(this, i2, o2);
      }
    }, _startPoint: function(t2, e2) {
      this._mouseDownOrigin = L.point(t2, e2);
    }, _onMouseUp: function(t2) {
      var e2 = t2.originalEvent, i2 = e2.clientX, o2 = e2.clientY;
      this._endPoint.call(this, i2, o2, t2), this._clickHandled = null;
    }, _endPoint: function(e2, i2, o2) {
      if (this._mouseDownOrigin) {
        var a = L.point(e2, i2).distanceTo(this._mouseDownOrigin), n = this._calculateFinishDistance(o2.latlng);
        this.options.maxPoints > 1 && this.options.maxPoints == this._markers.length + 1 ? (this.addVertex(o2.latlng), this._finishShape()) : n < 10 && L.Browser.touch ? this._finishShape() : Math.abs(a) < 9 * (t.devicePixelRatio || 1) && this.addVertex(o2.latlng), this._enableNewMarkers();
      }
      this._mouseDownOrigin = null;
    }, _onTouch: function(t2) {
      var e2, i2, o2 = t2.originalEvent;
      !o2.touches || !o2.touches[0] || this._clickHandled || this._touchHandled || this._disableMarkers || (e2 = o2.touches[0].clientX, i2 = o2.touches[0].clientY, this._disableNewMarkers(), this._touchHandled = true, this._startPoint.call(this, e2, i2), this._endPoint.call(this, e2, i2, t2), this._touchHandled = null), this._clickHandled = null;
    }, _onMouseOut: function() {
      this._tooltip && this._tooltip._onMouseOut.call(this._tooltip);
    }, _calculateFinishDistance: function(t2) {
      var e2;
      if (this._markers.length > 0) {
        var i2;
        if (this.type === L.Draw.Polyline.TYPE)
          i2 = this._markers[this._markers.length - 1];
        else {
          if (this.type !== L.Draw.Polygon.TYPE)
            return 1 / 0;
          i2 = this._markers[0];
        }
        var o2 = this._map.latLngToContainerPoint(i2.getLatLng()), a = new L.Marker(t2, { icon: this.options.icon, zIndexOffset: 2 * this.options.zIndexOffset }), n = this._map.latLngToContainerPoint(a.getLatLng());
        e2 = o2.distanceTo(n);
      } else
        e2 = 1 / 0;
      return e2;
    }, _updateFinishHandler: function() {
      var t2 = this._markers.length;
      t2 > 1 && this._markers[t2 - 1].on("click", this._finishShape, this), t2 > 2 && this._markers[t2 - 2].off("click", this._finishShape, this);
    }, _createMarker: function(t2) {
      var e2 = new L.Marker(t2, { icon: this.options.icon, zIndexOffset: 2 * this.options.zIndexOffset });
      return this._markerGroup.addLayer(e2), e2;
    }, _updateGuide: function(t2) {
      var e2 = this._markers ? this._markers.length : 0;
      e2 > 0 && (t2 = t2 || this._map.latLngToLayerPoint(this._currentLatLng), this._clearGuides(), this._drawGuide(this._map.latLngToLayerPoint(this._markers[e2 - 1].getLatLng()), t2));
    }, _updateTooltip: function(t2) {
      var e2 = this._getTooltipText();
      t2 && this._tooltip.updatePosition(t2), this._errorShown || this._tooltip.updateContent(e2);
    }, _drawGuide: function(t2, e2) {
      var i2, o2, a, n = Math.floor(Math.sqrt(Math.pow(e2.x - t2.x, 2) + Math.pow(e2.y - t2.y, 2))), s = this.options.guidelineDistance, r = this.options.maxGuideLineLength, l2 = n > r ? n - r : s;
      for (this._guidesContainer || (this._guidesContainer = L.DomUtil.create("div", "leaflet-draw-guides", this._overlayPane)); l2 < n; l2 += this.options.guidelineDistance)
        i2 = l2 / n, o2 = { x: Math.floor(t2.x * (1 - i2) + i2 * e2.x), y: Math.floor(t2.y * (1 - i2) + i2 * e2.y) }, a = L.DomUtil.create("div", "leaflet-draw-guide-dash", this._guidesContainer), a.style.backgroundColor = this._errorShown ? this.options.drawError.color : this.options.shapeOptions.color, L.DomUtil.setPosition(a, o2);
    }, _updateGuideColor: function(t2) {
      if (this._guidesContainer)
        for (var e2 = 0, i2 = this._guidesContainer.childNodes.length; e2 < i2; e2++)
          this._guidesContainer.childNodes[e2].style.backgroundColor = t2;
    }, _clearGuides: function() {
      if (this._guidesContainer)
        for (; this._guidesContainer.firstChild; )
          this._guidesContainer.removeChild(this._guidesContainer.firstChild);
    }, _getTooltipText: function() {
      var t2, e2, i2 = this.options.showLength;
      return 0 === this._markers.length ? t2 = { text: L.drawLocal.draw.handlers.polyline.tooltip.start } : (e2 = i2 ? this._getMeasurementString() : "", t2 = 1 === this._markers.length ? { text: L.drawLocal.draw.handlers.polyline.tooltip.cont, subtext: e2 } : { text: L.drawLocal.draw.handlers.polyline.tooltip.end, subtext: e2 }), t2;
    }, _updateRunningMeasure: function(t2, e2) {
      var i2, o2, a = this._markers.length;
      1 === this._markers.length ? this._measurementRunningTotal = 0 : (i2 = a - (e2 ? 2 : 1), o2 = L.GeometryUtil.isVersion07x() ? t2.distanceTo(this._markers[i2].getLatLng()) * (this.options.factor || 1) : this._map.distance(t2, this._markers[i2].getLatLng()) * (this.options.factor || 1), this._measurementRunningTotal += o2 * (e2 ? 1 : -1));
    }, _getMeasurementString: function() {
      var t2, e2 = this._currentLatLng, i2 = this._markers[this._markers.length - 1].getLatLng();
      return t2 = L.GeometryUtil.isVersion07x() ? i2 && e2 && e2.distanceTo ? this._measurementRunningTotal + e2.distanceTo(i2) * (this.options.factor || 1) : this._measurementRunningTotal || 0 : i2 && e2 ? this._measurementRunningTotal + this._map.distance(e2, i2) * (this.options.factor || 1) : this._measurementRunningTotal || 0, L.GeometryUtil.readableDistance(t2, this.options.metric, this.options.feet, this.options.nautic, this.options.precision);
    }, _showErrorTooltip: function() {
      this._errorShown = true, this._tooltip.showAsError().updateContent({ text: this.options.drawError.message }), this._updateGuideColor(this.options.drawError.color), this._poly.setStyle({ color: this.options.drawError.color }), this._clearHideErrorTimeout(), this._hideErrorTimeout = setTimeout(L.Util.bind(this._hideErrorTooltip, this), this.options.drawError.timeout);
    }, _hideErrorTooltip: function() {
      this._errorShown = false, this._clearHideErrorTimeout(), this._tooltip.removeError().updateContent(this._getTooltipText()), this._updateGuideColor(this.options.shapeOptions.color), this._poly.setStyle({ color: this.options.shapeOptions.color });
    }, _clearHideErrorTimeout: function() {
      this._hideErrorTimeout && (clearTimeout(this._hideErrorTimeout), this._hideErrorTimeout = null);
    }, _disableNewMarkers: function() {
      this._disableMarkers = true;
    }, _enableNewMarkers: function() {
      setTimeout(function() {
        this._disableMarkers = false;
      }.bind(this), 50);
    }, _cleanUpShape: function() {
      this._markers.length > 1 && this._markers[this._markers.length - 1].off("click", this._finishShape, this);
    }, _fireCreatedEvent: function() {
      var t2 = new this.Poly(this._poly.getLatLngs(), this.options.shapeOptions);
      L.Draw.Feature.prototype._fireCreatedEvent.call(this, t2);
    } }), L.Draw.Polygon = L.Draw.Polyline.extend({ statics: { TYPE: "polygon" }, Poly: L.Polygon, options: { showArea: false, showLength: false, shapeOptions: { stroke: true, color: "#3388ff", weight: 4, opacity: 0.5, fill: true, fillColor: null, fillOpacity: 0.2, clickable: true }, metric: true, feet: true, nautic: false, precision: {} }, initialize: function(t2, e2) {
      L.Draw.Polyline.prototype.initialize.call(this, t2, e2), this.type = L.Draw.Polygon.TYPE;
    }, _updateFinishHandler: function() {
      var t2 = this._markers.length;
      1 === t2 && this._markers[0].on("click", this._finishShape, this), t2 > 2 && (this._markers[t2 - 1].on("dblclick", this._finishShape, this), t2 > 3 && this._markers[t2 - 2].off("dblclick", this._finishShape, this));
    }, _getTooltipText: function() {
      var t2, e2;
      return 0 === this._markers.length ? t2 = L.drawLocal.draw.handlers.polygon.tooltip.start : this._markers.length < 3 ? (t2 = L.drawLocal.draw.handlers.polygon.tooltip.cont, e2 = this._getMeasurementString()) : (t2 = L.drawLocal.draw.handlers.polygon.tooltip.end, e2 = this._getMeasurementString()), { text: t2, subtext: e2 };
    }, _getMeasurementString: function() {
      var t2 = this._area, e2 = "";
      return t2 || this.options.showLength ? (this.options.showLength && (e2 = L.Draw.Polyline.prototype._getMeasurementString.call(this)), t2 && (e2 += "<br>" + L.GeometryUtil.readableArea(t2, this.options.metric, this.options.precision)), e2) : null;
    }, _shapeIsValid: function() {
      return this._markers.length >= 3;
    }, _vertexChanged: function(t2, e2) {
      var i2;
      !this.options.allowIntersection && this.options.showArea && (i2 = this._poly.getLatLngs(), this._area = L.GeometryUtil.geodesicArea(i2)), L.Draw.Polyline.prototype._vertexChanged.call(this, t2, e2);
    }, _cleanUpShape: function() {
      var t2 = this._markers.length;
      t2 > 0 && (this._markers[0].off("click", this._finishShape, this), t2 > 2 && this._markers[t2 - 1].off("dblclick", this._finishShape, this));
    } }), L.SimpleShape = {}, L.Draw.SimpleShape = L.Draw.Feature.extend({ options: { repeatMode: false }, initialize: function(t2, e2) {
      this._endLabelText = L.drawLocal.draw.handlers.simpleshape.tooltip.end, L.Draw.Feature.prototype.initialize.call(this, t2, e2);
    }, addHooks: function() {
      L.Draw.Feature.prototype.addHooks.call(this), this._map && (this._mapDraggable = this._map.dragging.enabled(), this._mapDraggable && this._map.dragging.disable(), this._container.style.cursor = "crosshair", this._tooltip.updateContent({ text: this._initialLabelText }), this._map.on("mousedown", this._onMouseDown, this).on("mousemove", this._onMouseMove, this).on("touchstart", this._onMouseDown, this).on("touchmove", this._onMouseMove, this), e.addEventListener("touchstart", L.DomEvent.preventDefault, { passive: false }));
    }, removeHooks: function() {
      L.Draw.Feature.prototype.removeHooks.call(this), this._map && (this._mapDraggable && this._map.dragging.enable(), this._container.style.cursor = "", this._map.off("mousedown", this._onMouseDown, this).off("mousemove", this._onMouseMove, this).off("touchstart", this._onMouseDown, this).off("touchmove", this._onMouseMove, this), L.DomEvent.off(e, "mouseup", this._onMouseUp, this), L.DomEvent.off(e, "touchend", this._onMouseUp, this), e.removeEventListener("touchstart", L.DomEvent.preventDefault), this._shape && (this._map.removeLayer(this._shape), delete this._shape)), this._isDrawing = false;
    }, _getTooltipText: function() {
      return { text: this._endLabelText };
    }, _onMouseDown: function(t2) {
      this._isDrawing = true, this._startLatLng = t2.latlng, L.DomEvent.on(e, "mouseup", this._onMouseUp, this).on(e, "touchend", this._onMouseUp, this).preventDefault(t2.originalEvent);
    }, _onMouseMove: function(t2) {
      var e2 = t2.latlng;
      this._tooltip.updatePosition(e2), this._isDrawing && (this._tooltip.updateContent(this._getTooltipText()), this._drawShape(e2));
    }, _onMouseUp: function() {
      this._shape && this._fireCreatedEvent(), this.disable(), this.options.repeatMode && this.enable();
    } }), L.Draw.Rectangle = L.Draw.SimpleShape.extend({ statics: { TYPE: "rectangle" }, options: { shapeOptions: { stroke: true, color: "#3388ff", weight: 4, opacity: 0.5, fill: true, fillColor: null, fillOpacity: 0.2, clickable: true }, showArea: true, metric: true }, initialize: function(t2, e2) {
      this.type = L.Draw.Rectangle.TYPE, this._initialLabelText = L.drawLocal.draw.handlers.rectangle.tooltip.start, L.Draw.SimpleShape.prototype.initialize.call(this, t2, e2);
    }, disable: function() {
      this._enabled && (this._isCurrentlyTwoClickDrawing = false, L.Draw.SimpleShape.prototype.disable.call(this));
    }, _onMouseUp: function(t2) {
      if (!this._shape && !this._isCurrentlyTwoClickDrawing)
        return void (this._isCurrentlyTwoClickDrawing = true);
      this._isCurrentlyTwoClickDrawing && !o(t2.target, "leaflet-pane") || L.Draw.SimpleShape.prototype._onMouseUp.call(this);
    }, _drawShape: function(t2) {
      this._shape ? this._shape.setBounds(new L.LatLngBounds(this._startLatLng, t2)) : (this._shape = new L.Rectangle(new L.LatLngBounds(this._startLatLng, t2), this.options.shapeOptions), this._map.addLayer(this._shape));
    }, _fireCreatedEvent: function() {
      var t2 = new L.Rectangle(this._shape.getBounds(), this.options.shapeOptions);
      L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, t2);
    }, _getTooltipText: function() {
      var t2, e2, i2, o2 = L.Draw.SimpleShape.prototype._getTooltipText.call(this), a = this._shape, n = this.options.showArea;
      return a && (t2 = this._shape._defaultShape ? this._shape._defaultShape() : this._shape.getLatLngs(), e2 = L.GeometryUtil.geodesicArea(t2), i2 = n ? L.GeometryUtil.readableArea(e2, this.options.metric) : ""), { text: o2.text, subtext: i2 };
    } }), L.Draw.Marker = L.Draw.Feature.extend({ statics: { TYPE: "marker" }, options: { icon: new L.Icon.Default(), repeatMode: false, zIndexOffset: 2e3 }, initialize: function(t2, e2) {
      this.type = L.Draw.Marker.TYPE, this._initialLabelText = L.drawLocal.draw.handlers.marker.tooltip.start, L.Draw.Feature.prototype.initialize.call(this, t2, e2);
    }, addHooks: function() {
      L.Draw.Feature.prototype.addHooks.call(this), this._map && (this._tooltip.updateContent({ text: this._initialLabelText }), this._mouseMarker || (this._mouseMarker = L.marker(this._map.getCenter(), { icon: L.divIcon({ className: "leaflet-mouse-marker", iconAnchor: [20, 20], iconSize: [40, 40] }), opacity: 0, zIndexOffset: this.options.zIndexOffset })), this._mouseMarker.on("click", this._onClick, this).addTo(this._map), this._map.on("mousemove", this._onMouseMove, this), this._map.on("click", this._onTouch, this));
    }, removeHooks: function() {
      L.Draw.Feature.prototype.removeHooks.call(this), this._map && (this._map.off("click", this._onClick, this).off("click", this._onTouch, this), this._marker && (this._marker.off("click", this._onClick, this), this._map.removeLayer(this._marker), delete this._marker), this._mouseMarker.off("click", this._onClick, this), this._map.removeLayer(this._mouseMarker), delete this._mouseMarker, this._map.off("mousemove", this._onMouseMove, this));
    }, _onMouseMove: function(t2) {
      var e2 = t2.latlng;
      this._tooltip.updatePosition(e2), this._mouseMarker.setLatLng(e2), this._marker ? (e2 = this._mouseMarker.getLatLng(), this._marker.setLatLng(e2)) : (this._marker = this._createMarker(e2), this._marker.on("click", this._onClick, this), this._map.on("click", this._onClick, this).addLayer(this._marker));
    }, _createMarker: function(t2) {
      return new L.Marker(t2, { icon: this.options.icon, zIndexOffset: this.options.zIndexOffset });
    }, _onClick: function() {
      this._fireCreatedEvent(), this.disable(), this.options.repeatMode && this.enable();
    }, _onTouch: function(t2) {
      this._onMouseMove(t2), this._onClick();
    }, _fireCreatedEvent: function() {
      var t2 = new L.Marker.Touch(this._marker.getLatLng(), { icon: this.options.icon });
      L.Draw.Feature.prototype._fireCreatedEvent.call(this, t2);
    } }), L.Draw.CircleMarker = L.Draw.Marker.extend({ statics: { TYPE: "circlemarker" }, options: { stroke: true, color: "#3388ff", weight: 4, opacity: 0.5, fill: true, fillColor: null, fillOpacity: 0.2, clickable: true, zIndexOffset: 2e3 }, initialize: function(t2, e2) {
      this.type = L.Draw.CircleMarker.TYPE, this._initialLabelText = L.drawLocal.draw.handlers.circlemarker.tooltip.start, L.Draw.Feature.prototype.initialize.call(this, t2, e2);
    }, _fireCreatedEvent: function() {
      var t2 = new L.CircleMarker(this._marker.getLatLng(), this.options);
      L.Draw.Feature.prototype._fireCreatedEvent.call(this, t2);
    }, _createMarker: function(t2) {
      return new L.CircleMarker(t2, this.options);
    } }), L.Draw.Circle = L.Draw.SimpleShape.extend({ statics: { TYPE: "circle" }, options: { shapeOptions: { stroke: true, color: "#3388ff", weight: 4, opacity: 0.5, fill: true, fillColor: null, fillOpacity: 0.2, clickable: true }, showRadius: true, metric: true, feet: true, nautic: false }, initialize: function(t2, e2) {
      this.type = L.Draw.Circle.TYPE, this._initialLabelText = L.drawLocal.draw.handlers.circle.tooltip.start, L.Draw.SimpleShape.prototype.initialize.call(this, t2, e2);
    }, _drawShape: function(t2) {
      if (L.GeometryUtil.isVersion07x())
        var e2 = this._startLatLng.distanceTo(t2);
      else
        var e2 = this._map.distance(this._startLatLng, t2);
      this._shape ? this._shape.setRadius(e2) : (this._shape = new L.Circle(this._startLatLng, e2, this.options.shapeOptions), this._map.addLayer(this._shape));
    }, _fireCreatedEvent: function() {
      var t2 = new L.Circle(this._startLatLng, this._shape.getRadius(), this.options.shapeOptions);
      L.Draw.SimpleShape.prototype._fireCreatedEvent.call(this, t2);
    }, _onMouseMove: function(t2) {
      var e2, i2 = t2.latlng, o2 = this.options.showRadius, a = this.options.metric;
      if (this._tooltip.updatePosition(i2), this._isDrawing) {
        this._drawShape(i2), e2 = this._shape.getRadius().toFixed(1);
        var n = "";
        o2 && (n = L.drawLocal.draw.handlers.circle.radius + ": " + L.GeometryUtil.readableDistance(e2, a, this.options.feet, this.options.nautic)), this._tooltip.updateContent({ text: this._endLabelText, subtext: n });
      }
    } }), L.Edit = L.Edit || {}, L.Edit.Marker = L.Handler.extend({ initialize: function(t2, e2) {
      this._marker = t2, L.setOptions(this, e2);
    }, addHooks: function() {
      var t2 = this._marker;
      t2.dragging.enable(), t2.on("dragend", this._onDragEnd, t2), this._toggleMarkerHighlight();
    }, removeHooks: function() {
      var t2 = this._marker;
      t2.dragging.disable(), t2.off("dragend", this._onDragEnd, t2), this._toggleMarkerHighlight();
    }, _onDragEnd: function(t2) {
      var e2 = t2.target;
      e2.edited = true, this._map.fire(L.Draw.Event.EDITMOVE, { layer: e2 });
    }, _toggleMarkerHighlight: function() {
      var t2 = this._marker._icon;
      t2 && (t2.style.display = "none", L.DomUtil.hasClass(t2, "leaflet-edit-marker-selected") ? (L.DomUtil.removeClass(t2, "leaflet-edit-marker-selected"), this._offsetMarker(t2, -4)) : (L.DomUtil.addClass(t2, "leaflet-edit-marker-selected"), this._offsetMarker(t2, 4)), t2.style.display = "");
    }, _offsetMarker: function(t2, e2) {
      var i2 = parseInt(t2.style.marginTop, 10) - e2, o2 = parseInt(t2.style.marginLeft, 10) - e2;
      t2.style.marginTop = i2 + "px", t2.style.marginLeft = o2 + "px";
    } }), L.Marker.addInitHook(function() {
      L.Edit.Marker && (this.editing = new L.Edit.Marker(this), this.options.editable && this.editing.enable());
    }), L.Edit = L.Edit || {}, L.Edit.Poly = L.Handler.extend({ initialize: function(t2) {
      this.latlngs = [t2._latlngs], t2._holes && (this.latlngs = this.latlngs.concat(t2._holes)), this._poly = t2, this._poly.on("revert-edited", this._updateLatLngs, this);
    }, _defaultShape: function() {
      return L.Polyline._flat ? L.Polyline._flat(this._poly._latlngs) ? this._poly._latlngs : this._poly._latlngs[0] : this._poly._latlngs;
    }, _eachVertexHandler: function(t2) {
      for (var e2 = 0; e2 < this._verticesHandlers.length; e2++)
        t2(this._verticesHandlers[e2]);
    }, addHooks: function() {
      this._initHandlers(), this._eachVertexHandler(function(t2) {
        t2.addHooks();
      });
    }, removeHooks: function() {
      this._eachVertexHandler(function(t2) {
        t2.removeHooks();
      });
    }, updateMarkers: function() {
      this._eachVertexHandler(function(t2) {
        t2.updateMarkers();
      });
    }, _initHandlers: function() {
      this._verticesHandlers = [];
      for (var t2 = 0; t2 < this.latlngs.length; t2++)
        this._verticesHandlers.push(new L.Edit.PolyVerticesEdit(this._poly, this.latlngs[t2], this._poly.options.poly));
    }, _updateLatLngs: function(t2) {
      this.latlngs = [t2.layer._latlngs], t2.layer._holes && (this.latlngs = this.latlngs.concat(t2.layer._holes));
    } }), L.Edit.PolyVerticesEdit = L.Handler.extend({ options: { icon: new L.DivIcon({ iconSize: new L.Point(8, 8), className: "leaflet-div-icon leaflet-editing-icon" }), touchIcon: new L.DivIcon({ iconSize: new L.Point(20, 20), className: "leaflet-div-icon leaflet-editing-icon leaflet-touch-icon" }), drawError: { color: "#b00b00", timeout: 1e3 } }, initialize: function(t2, e2, i2) {
      L.Browser.touch && (this.options.icon = this.options.touchIcon), this._poly = t2, i2 && i2.drawError && (i2.drawError = L.Util.extend({}, this.options.drawError, i2.drawError)), this._latlngs = e2, L.setOptions(this, i2);
    }, _defaultShape: function() {
      return L.Polyline._flat ? L.Polyline._flat(this._latlngs) ? this._latlngs : this._latlngs[0] : this._latlngs;
    }, addHooks: function() {
      var t2 = this._poly, e2 = t2._path;
      t2 instanceof L.Polygon || (t2.options.fill = false, t2.options.editing && (t2.options.editing.fill = false)), e2 && t2.options.editing && t2.options.editing.className && (t2.options.original.className && t2.options.original.className.split(" ").forEach(function(t3) {
        L.DomUtil.removeClass(e2, t3);
      }), t2.options.editing.className.split(" ").forEach(function(t3) {
        L.DomUtil.addClass(e2, t3);
      })), t2.setStyle(t2.options.editing), this._poly._map && (this._map = this._poly._map, this._markerGroup || this._initMarkers(), this._poly._map.addLayer(this._markerGroup));
    }, removeHooks: function() {
      var t2 = this._poly, e2 = t2._path;
      e2 && t2.options.editing && t2.options.editing.className && (t2.options.editing.className.split(" ").forEach(function(t3) {
        L.DomUtil.removeClass(e2, t3);
      }), t2.options.original.className && t2.options.original.className.split(" ").forEach(function(t3) {
        L.DomUtil.addClass(e2, t3);
      })), t2.setStyle(t2.options.original), t2._map && (t2._map.removeLayer(this._markerGroup), delete this._markerGroup, delete this._markers);
    }, updateMarkers: function() {
      this._markerGroup.clearLayers(), this._initMarkers();
    }, _initMarkers: function() {
      this._markerGroup || (this._markerGroup = new L.LayerGroup()), this._markers = [];
      var t2, e2, i2, o2, a = this._defaultShape();
      for (t2 = 0, i2 = a.length; t2 < i2; t2++)
        o2 = this._createMarker(a[t2], t2), o2.on("click", this._onMarkerClick, this), o2.on("contextmenu", this._onContextMenu, this), this._markers.push(o2);
      var n, s;
      for (t2 = 0, e2 = i2 - 1; t2 < i2; e2 = t2++)
        (0 !== t2 || L.Polygon && this._poly instanceof L.Polygon) && (n = this._markers[e2], s = this._markers[t2], this._createMiddleMarker(n, s), this._updatePrevNext(n, s));
    }, _createMarker: function(t2, e2) {
      var i2 = new L.Marker.Touch(t2, { draggable: true, icon: this.options.icon });
      return i2._origLatLng = t2, i2._index = e2, i2.on("dragstart", this._onMarkerDragStart, this).on("drag", this._onMarkerDrag, this).on("dragend", this._fireEdit, this).on("touchmove", this._onTouchMove, this).on("touchend", this._fireEdit, this).on("MSPointerMove", this._onTouchMove, this).on("MSPointerUp", this._fireEdit, this), this._markerGroup.addLayer(i2), i2;
    }, _onMarkerDragStart: function() {
      this._poly.fire("editstart");
    }, _spliceLatLngs: function() {
      var t2 = this._defaultShape(), e2 = [].splice.apply(t2, arguments);
      return this._poly._convertLatLngs(t2, true), this._poly.redraw(), e2;
    }, _removeMarker: function(t2) {
      var e2 = t2._index;
      this._markerGroup.removeLayer(t2), this._markers.splice(e2, 1), this._spliceLatLngs(e2, 1), this._updateIndexes(e2, -1), t2.off("dragstart", this._onMarkerDragStart, this).off("drag", this._onMarkerDrag, this).off("dragend", this._fireEdit, this).off("touchmove", this._onMarkerDrag, this).off("touchend", this._fireEdit, this).off("click", this._onMarkerClick, this).off("MSPointerMove", this._onTouchMove, this).off("MSPointerUp", this._fireEdit, this);
    }, _fireEdit: function() {
      this._poly.edited = true, this._poly.fire("edit"), this._poly._map.fire(L.Draw.Event.EDITVERTEX, { layers: this._markerGroup, poly: this._poly });
    }, _onMarkerDrag: function(t2) {
      var e2 = t2.target, i2 = this._poly, o2 = L.LatLngUtil.cloneLatLng(e2._origLatLng);
      if (L.extend(e2._origLatLng, e2._latlng), i2.options.poly) {
        var a = i2._map._editTooltip;
        if (!i2.options.poly.allowIntersection && i2.intersects()) {
          L.extend(e2._origLatLng, o2), e2.setLatLng(o2);
          var n = i2.options.color;
          i2.setStyle({ color: this.options.drawError.color }), a && a.updateContent({ text: L.drawLocal.draw.handlers.polyline.error }), setTimeout(function() {
            i2.setStyle({ color: n }), a && a.updateContent({ text: L.drawLocal.edit.handlers.edit.tooltip.text, subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext });
          }, 1e3);
        }
      }
      e2._middleLeft && e2._middleLeft.setLatLng(this._getMiddleLatLng(e2._prev, e2)), e2._middleRight && e2._middleRight.setLatLng(this._getMiddleLatLng(e2, e2._next)), this._poly._bounds._southWest = L.latLng(1 / 0, 1 / 0), this._poly._bounds._northEast = L.latLng(-1 / 0, -1 / 0);
      var s = this._poly.getLatLngs();
      this._poly._convertLatLngs(s, true), this._poly.redraw(), this._poly.fire("editdrag");
    }, _onMarkerClick: function(t2) {
      var e2 = L.Polygon && this._poly instanceof L.Polygon ? 4 : 3, i2 = t2.target;
      this._defaultShape().length < e2 || (this._removeMarker(i2), this._updatePrevNext(i2._prev, i2._next), i2._middleLeft && this._markerGroup.removeLayer(i2._middleLeft), i2._middleRight && this._markerGroup.removeLayer(i2._middleRight), i2._prev && i2._next ? this._createMiddleMarker(i2._prev, i2._next) : i2._prev ? i2._next || (i2._prev._middleRight = null) : i2._next._middleLeft = null, this._fireEdit());
    }, _onContextMenu: function(t2) {
      var e2 = t2.target;
      this._poly;
      this._poly._map.fire(L.Draw.Event.MARKERCONTEXT, { marker: e2, layers: this._markerGroup, poly: this._poly }), L.DomEvent.stopPropagation;
    }, _onTouchMove: function(t2) {
      var e2 = this._map.mouseEventToLayerPoint(t2.originalEvent.touches[0]), i2 = this._map.layerPointToLatLng(e2), o2 = t2.target;
      L.extend(o2._origLatLng, i2), o2._middleLeft && o2._middleLeft.setLatLng(this._getMiddleLatLng(o2._prev, o2)), o2._middleRight && o2._middleRight.setLatLng(this._getMiddleLatLng(o2, o2._next)), this._poly.redraw(), this.updateMarkers();
    }, _updateIndexes: function(t2, e2) {
      this._markerGroup.eachLayer(function(i2) {
        i2._index > t2 && (i2._index += e2);
      });
    }, _createMiddleMarker: function(t2, e2) {
      var i2, o2, a, n = this._getMiddleLatLng(t2, e2), s = this._createMarker(n);
      s.setOpacity(0.6), t2._middleRight = e2._middleLeft = s, o2 = function() {
        s.off("touchmove", o2, this);
        var a2 = e2._index;
        s._index = a2, s.off("click", i2, this).on("click", this._onMarkerClick, this), n.lat = s.getLatLng().lat, n.lng = s.getLatLng().lng, this._spliceLatLngs(a2, 0, n), this._markers.splice(a2, 0, s), s.setOpacity(1), this._updateIndexes(a2, 1), e2._index++, this._updatePrevNext(t2, s), this._updatePrevNext(s, e2), this._poly.fire("editstart");
      }, a = function() {
        s.off("dragstart", o2, this), s.off("dragend", a, this), s.off("touchmove", o2, this), this._createMiddleMarker(t2, s), this._createMiddleMarker(s, e2);
      }, i2 = function() {
        o2.call(this), a.call(this), this._fireEdit();
      }, s.on("click", i2, this).on("dragstart", o2, this).on("dragend", a, this).on("touchmove", o2, this), this._markerGroup.addLayer(s);
    }, _updatePrevNext: function(t2, e2) {
      t2 && (t2._next = e2), e2 && (e2._prev = t2);
    }, _getMiddleLatLng: function(t2, e2) {
      var i2 = this._poly._map, o2 = i2.project(t2.getLatLng()), a = i2.project(e2.getLatLng());
      return i2.unproject(o2._add(a)._divideBy(2));
    } }), L.Polyline.addInitHook(function() {
      this.editing || (L.Edit.Poly && (this.editing = new L.Edit.Poly(this), this.options.editable && this.editing.enable()), this.on("add", function() {
        this.editing && this.editing.enabled() && this.editing.addHooks();
      }), this.on("remove", function() {
        this.editing && this.editing.enabled() && this.editing.removeHooks();
      }));
    }), L.Edit = L.Edit || {}, L.Edit.SimpleShape = L.Handler.extend({ options: { moveIcon: new L.DivIcon({ iconSize: new L.Point(8, 8), className: "leaflet-div-icon leaflet-editing-icon leaflet-edit-move" }), resizeIcon: new L.DivIcon({
      iconSize: new L.Point(8, 8),
      className: "leaflet-div-icon leaflet-editing-icon leaflet-edit-resize"
    }), touchMoveIcon: new L.DivIcon({ iconSize: new L.Point(20, 20), className: "leaflet-div-icon leaflet-editing-icon leaflet-edit-move leaflet-touch-icon" }), touchResizeIcon: new L.DivIcon({ iconSize: new L.Point(20, 20), className: "leaflet-div-icon leaflet-editing-icon leaflet-edit-resize leaflet-touch-icon" }) }, initialize: function(t2, e2) {
      L.Browser.touch && (this.options.moveIcon = this.options.touchMoveIcon, this.options.resizeIcon = this.options.touchResizeIcon), this._shape = t2, L.Util.setOptions(this, e2);
    }, addHooks: function() {
      var t2 = this._shape;
      this._shape._map && (this._map = this._shape._map, t2.setStyle(t2.options.editing), t2._map && (this._map = t2._map, this._markerGroup || this._initMarkers(), this._map.addLayer(this._markerGroup)));
    }, removeHooks: function() {
      var t2 = this._shape;
      if (t2.setStyle(t2.options.original), t2._map) {
        this._unbindMarker(this._moveMarker);
        for (var e2 = 0, i2 = this._resizeMarkers.length; e2 < i2; e2++)
          this._unbindMarker(this._resizeMarkers[e2]);
        this._resizeMarkers = null, this._map.removeLayer(this._markerGroup), delete this._markerGroup;
      }
      this._map = null;
    }, updateMarkers: function() {
      this._markerGroup.clearLayers(), this._initMarkers();
    }, _initMarkers: function() {
      this._markerGroup || (this._markerGroup = new L.LayerGroup()), this._createMoveMarker(), this._createResizeMarker();
    }, _createMoveMarker: function() {
    }, _createResizeMarker: function() {
    }, _createMarker: function(t2, e2) {
      var i2 = new L.Marker.Touch(t2, { draggable: true, icon: e2, zIndexOffset: 10 });
      return this._bindMarker(i2), this._markerGroup.addLayer(i2), i2;
    }, _bindMarker: function(t2) {
      t2.on("dragstart", this._onMarkerDragStart, this).on("drag", this._onMarkerDrag, this).on("dragend", this._onMarkerDragEnd, this).on("touchstart", this._onTouchStart, this).on("touchmove", this._onTouchMove, this).on("MSPointerMove", this._onTouchMove, this).on("touchend", this._onTouchEnd, this).on("MSPointerUp", this._onTouchEnd, this);
    }, _unbindMarker: function(t2) {
      t2.off("dragstart", this._onMarkerDragStart, this).off("drag", this._onMarkerDrag, this).off("dragend", this._onMarkerDragEnd, this).off("touchstart", this._onTouchStart, this).off("touchmove", this._onTouchMove, this).off("MSPointerMove", this._onTouchMove, this).off("touchend", this._onTouchEnd, this).off("MSPointerUp", this._onTouchEnd, this);
    }, _onMarkerDragStart: function(t2) {
      t2.target.setOpacity(0), this._shape.fire("editstart");
    }, _fireEdit: function() {
      this._shape.edited = true, this._shape.fire("edit");
    }, _onMarkerDrag: function(t2) {
      var e2 = t2.target, i2 = e2.getLatLng();
      e2 === this._moveMarker ? this._move(i2) : this._resize(i2), this._shape.redraw(), this._shape.fire("editdrag");
    }, _onMarkerDragEnd: function(t2) {
      t2.target.setOpacity(1), this._fireEdit();
    }, _onTouchStart: function(t2) {
      if (L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, t2), "function" == typeof this._getCorners) {
        var e2 = this._getCorners(), i2 = t2.target, o2 = i2._cornerIndex;
        i2.setOpacity(0), this._oppositeCorner = e2[(o2 + 2) % 4], this._toggleCornerMarkers(0, o2);
      }
      this._shape.fire("editstart");
    }, _onTouchMove: function(t2) {
      var e2 = this._map.mouseEventToLayerPoint(t2.originalEvent.touches[0]), i2 = this._map.layerPointToLatLng(e2);
      return t2.target === this._moveMarker ? this._move(i2) : this._resize(i2), this._shape.redraw(), false;
    }, _onTouchEnd: function(t2) {
      t2.target.setOpacity(1), this.updateMarkers(), this._fireEdit();
    }, _move: function() {
    }, _resize: function() {
    } }), L.Edit = L.Edit || {}, L.Edit.Rectangle = L.Edit.SimpleShape.extend({ _createMoveMarker: function() {
      var t2 = this._shape.getBounds(), e2 = t2.getCenter();
      this._moveMarker = this._createMarker(e2, this.options.moveIcon);
    }, _createResizeMarker: function() {
      var t2 = this._getCorners();
      this._resizeMarkers = [];
      for (var e2 = 0, i2 = t2.length; e2 < i2; e2++)
        this._resizeMarkers.push(this._createMarker(t2[e2], this.options.resizeIcon)), this._resizeMarkers[e2]._cornerIndex = e2;
    }, _onMarkerDragStart: function(t2) {
      L.Edit.SimpleShape.prototype._onMarkerDragStart.call(this, t2);
      var e2 = this._getCorners(), i2 = t2.target, o2 = i2._cornerIndex;
      this._oppositeCorner = e2[(o2 + 2) % 4], this._toggleCornerMarkers(0, o2);
    }, _onMarkerDragEnd: function(t2) {
      var e2, i2, o2 = t2.target;
      o2 === this._moveMarker && (e2 = this._shape.getBounds(), i2 = e2.getCenter(), o2.setLatLng(i2)), this._toggleCornerMarkers(1), this._repositionCornerMarkers(), L.Edit.SimpleShape.prototype._onMarkerDragEnd.call(this, t2);
    }, _move: function(t2) {
      for (var e2, i2 = this._shape._defaultShape ? this._shape._defaultShape() : this._shape.getLatLngs(), o2 = this._shape.getBounds(), a = o2.getCenter(), n = [], s = 0, r = i2.length; s < r; s++)
        e2 = [i2[s].lat - a.lat, i2[s].lng - a.lng], n.push([t2.lat + e2[0], t2.lng + e2[1]]);
      this._shape.setLatLngs(n), this._repositionCornerMarkers(), this._map.fire(L.Draw.Event.EDITMOVE, { layer: this._shape });
    }, _resize: function(t2) {
      var e2;
      this._shape.setBounds(L.latLngBounds(t2, this._oppositeCorner)), e2 = this._shape.getBounds(), this._moveMarker.setLatLng(e2.getCenter()), this._map.fire(L.Draw.Event.EDITRESIZE, { layer: this._shape });
    }, _getCorners: function() {
      var t2 = this._shape.getBounds();
      return [t2.getNorthWest(), t2.getNorthEast(), t2.getSouthEast(), t2.getSouthWest()];
    }, _toggleCornerMarkers: function(t2) {
      for (var e2 = 0, i2 = this._resizeMarkers.length; e2 < i2; e2++)
        this._resizeMarkers[e2].setOpacity(t2);
    }, _repositionCornerMarkers: function() {
      for (var t2 = this._getCorners(), e2 = 0, i2 = this._resizeMarkers.length; e2 < i2; e2++)
        this._resizeMarkers[e2].setLatLng(t2[e2]);
    } }), L.Rectangle.addInitHook(function() {
      L.Edit.Rectangle && (this.editing = new L.Edit.Rectangle(this), this.options.editable && this.editing.enable());
    }), L.Edit = L.Edit || {}, L.Edit.CircleMarker = L.Edit.SimpleShape.extend({ _createMoveMarker: function() {
      var t2 = this._shape.getLatLng();
      this._moveMarker = this._createMarker(t2, this.options.moveIcon);
    }, _createResizeMarker: function() {
      this._resizeMarkers = [];
    }, _move: function(t2) {
      if (this._resizeMarkers.length) {
        var e2 = this._getResizeMarkerPoint(t2);
        this._resizeMarkers[0].setLatLng(e2);
      }
      this._shape.setLatLng(t2), this._map.fire(L.Draw.Event.EDITMOVE, { layer: this._shape });
    } }), L.CircleMarker.addInitHook(function() {
      L.Edit.CircleMarker && (this.editing = new L.Edit.CircleMarker(this), this.options.editable && this.editing.enable()), this.on("add", function() {
        this.editing && this.editing.enabled() && this.editing.addHooks();
      }), this.on("remove", function() {
        this.editing && this.editing.enabled() && this.editing.removeHooks();
      });
    }), L.Edit = L.Edit || {}, L.Edit.Circle = L.Edit.CircleMarker.extend({ _createResizeMarker: function() {
      var t2 = this._shape.getLatLng(), e2 = this._getResizeMarkerPoint(t2);
      this._resizeMarkers = [], this._resizeMarkers.push(this._createMarker(e2, this.options.resizeIcon));
    }, _getResizeMarkerPoint: function(t2) {
      var e2 = this._shape._radius * Math.cos(Math.PI / 4), i2 = this._map.project(t2);
      return this._map.unproject([i2.x + e2, i2.y - e2]);
    }, _resize: function(t2) {
      var e2 = this._moveMarker.getLatLng();
      L.GeometryUtil.isVersion07x() ? radius = e2.distanceTo(t2) : radius = this._map.distance(e2, t2), this._shape.setRadius(radius), this._map.editTooltip && this._map._editTooltip.updateContent({ text: L.drawLocal.edit.handlers.edit.tooltip.subtext + "<br />" + L.drawLocal.edit.handlers.edit.tooltip.text, subtext: L.drawLocal.draw.handlers.circle.radius + ": " + L.GeometryUtil.readableDistance(radius, true, this.options.feet, this.options.nautic) }), this._shape.setRadius(radius), this._map.fire(L.Draw.Event.EDITRESIZE, { layer: this._shape });
    } }), L.Circle.addInitHook(function() {
      L.Edit.Circle && (this.editing = new L.Edit.Circle(this), this.options.editable && this.editing.enable());
    }), L.Map.mergeOptions({ touchExtend: true }), L.Map.TouchExtend = L.Handler.extend({ initialize: function(t2) {
      this._map = t2, this._container = t2._container, this._pane = t2._panes.overlayPane;
    }, addHooks: function() {
      L.DomEvent.on(this._container, "touchstart", this._onTouchStart, this), L.DomEvent.on(this._container, "touchend", this._onTouchEnd, this), L.DomEvent.on(this._container, "touchmove", this._onTouchMove, this), this._detectIE() ? (L.DomEvent.on(this._container, "MSPointerDown", this._onTouchStart, this), L.DomEvent.on(this._container, "MSPointerUp", this._onTouchEnd, this), L.DomEvent.on(this._container, "MSPointerMove", this._onTouchMove, this), L.DomEvent.on(this._container, "MSPointerCancel", this._onTouchCancel, this)) : (L.DomEvent.on(this._container, "touchcancel", this._onTouchCancel, this), L.DomEvent.on(this._container, "touchleave", this._onTouchLeave, this));
    }, removeHooks: function() {
      L.DomEvent.off(this._container, "touchstart", this._onTouchStart, this), L.DomEvent.off(this._container, "touchend", this._onTouchEnd, this), L.DomEvent.off(this._container, "touchmove", this._onTouchMove, this), this._detectIE() ? (L.DomEvent.off(this._container, "MSPointerDown", this._onTouchStart, this), L.DomEvent.off(this._container, "MSPointerUp", this._onTouchEnd, this), L.DomEvent.off(this._container, "MSPointerMove", this._onTouchMove, this), L.DomEvent.off(this._container, "MSPointerCancel", this._onTouchCancel, this)) : (L.DomEvent.off(this._container, "touchcancel", this._onTouchCancel, this), L.DomEvent.off(this._container, "touchleave", this._onTouchLeave, this));
    }, _touchEvent: function(t2, e2) {
      var i2 = {};
      if (void 0 !== t2.touches) {
        if (!t2.touches.length)
          return;
        i2 = t2.touches[0];
      } else {
        if ("touch" !== t2.pointerType)
          return;
        if (i2 = t2, !this._filterClick(t2))
          return;
      }
      var o2 = this._map.mouseEventToContainerPoint(i2), a = this._map.mouseEventToLayerPoint(i2), n = this._map.layerPointToLatLng(a);
      this._map.fire(e2, { latlng: n, layerPoint: a, containerPoint: o2, pageX: i2.pageX, pageY: i2.pageY, originalEvent: t2 });
    }, _filterClick: function(t2) {
      var e2 = t2.timeStamp || t2.originalEvent.timeStamp, i2 = L.DomEvent._lastClick && e2 - L.DomEvent._lastClick;
      return i2 && i2 > 100 && i2 < 500 || t2.target._simulatedClick && !t2._simulated ? (L.DomEvent.stop(t2), false) : (L.DomEvent._lastClick = e2, true);
    }, _onTouchStart: function(t2) {
      if (this._map._loaded) {
        this._touchEvent(t2, "touchstart");
      }
    }, _onTouchEnd: function(t2) {
      if (this._map._loaded) {
        this._touchEvent(t2, "touchend");
      }
    }, _onTouchCancel: function(t2) {
      if (this._map._loaded) {
        var e2 = "touchcancel";
        this._detectIE() && (e2 = "pointercancel"), this._touchEvent(t2, e2);
      }
    }, _onTouchLeave: function(t2) {
      if (this._map._loaded) {
        this._touchEvent(t2, "touchleave");
      }
    }, _onTouchMove: function(t2) {
      if (this._map._loaded) {
        this._touchEvent(t2, "touchmove");
      }
    }, _detectIE: function() {
      var e2 = t.navigator.userAgent, i2 = e2.indexOf("MSIE ");
      if (i2 > 0)
        return parseInt(e2.substring(i2 + 5, e2.indexOf(".", i2)), 10);
      if (e2.indexOf("Trident/") > 0) {
        var o2 = e2.indexOf("rv:");
        return parseInt(e2.substring(o2 + 3, e2.indexOf(".", o2)), 10);
      }
      var a = e2.indexOf("Edge/");
      return a > 0 && parseInt(e2.substring(a + 5, e2.indexOf(".", a)), 10);
    } }), L.Map.addInitHook("addHandler", "touchExtend", L.Map.TouchExtend), L.Marker.Touch = L.Marker.extend({ _initInteraction: function() {
      return this.addInteractiveTarget ? L.Marker.prototype._initInteraction.apply(this) : this._initInteractionLegacy();
    }, _initInteractionLegacy: function() {
      if (this.options.clickable) {
        var t2 = this._icon, e2 = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu", "touchstart", "touchend", "touchmove"];
        this._detectIE ? e2.concat(["MSPointerDown", "MSPointerUp", "MSPointerMove", "MSPointerCancel"]) : e2.concat(["touchcancel"]), L.DomUtil.addClass(t2, "leaflet-clickable"), L.DomEvent.on(t2, "click", this._onMouseClick, this), L.DomEvent.on(t2, "keypress", this._onKeyPress, this);
        for (var i2 = 0; i2 < e2.length; i2++)
          L.DomEvent.on(t2, e2[i2], this._fireMouseEvent, this);
        L.Handler.MarkerDrag && (this.dragging = new L.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable());
      }
    }, _detectIE: function() {
      var e2 = t.navigator.userAgent, i2 = e2.indexOf("MSIE ");
      if (i2 > 0)
        return parseInt(e2.substring(i2 + 5, e2.indexOf(".", i2)), 10);
      if (e2.indexOf("Trident/") > 0) {
        var o2 = e2.indexOf("rv:");
        return parseInt(e2.substring(o2 + 3, e2.indexOf(".", o2)), 10);
      }
      var a = e2.indexOf("Edge/");
      return a > 0 && parseInt(e2.substring(a + 5, e2.indexOf(".", a)), 10);
    } }), L.LatLngUtil = { cloneLatLngs: function(t2) {
      for (var e2 = [], i2 = 0, o2 = t2.length; i2 < o2; i2++)
        Array.isArray(t2[i2]) ? e2.push(L.LatLngUtil.cloneLatLngs(t2[i2])) : e2.push(this.cloneLatLng(t2[i2]));
      return e2;
    }, cloneLatLng: function(t2) {
      return L.latLng(t2.lat, t2.lng);
    } }, function() {
      var t2 = { km: 2, ha: 2, m: 0, mi: 2, ac: 2, yd: 0, ft: 0, nm: 2 };
      L.GeometryUtil = L.extend(L.GeometryUtil || {}, { geodesicArea: function(t3) {
        var e2, i2, o2 = t3.length, a = 0, n = Math.PI / 180;
        if (o2 > 2) {
          for (var s = 0; s < o2; s++)
            e2 = t3[s], i2 = t3[(s + 1) % o2], a += (i2.lng - e2.lng) * n * (2 + Math.sin(e2.lat * n) + Math.sin(i2.lat * n));
          a = 6378137 * a * 6378137 / 2;
        }
        return Math.abs(a);
      }, formattedNumber: function(t3, e2) {
        var i2 = parseFloat(t3).toFixed(e2), o2 = L.drawLocal.format && L.drawLocal.format.numeric, a = o2 && o2.delimiters, n = a && a.thousands, s = a && a.decimal;
        if (n || s) {
          var r = i2.split(".");
          i2 = n ? r[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + n) : r[0], s = s || ".", r.length > 1 && (i2 = i2 + s + r[1]);
        }
        return i2;
      }, readableArea: function(e2, i2, o2) {
        var a, n, o2 = L.Util.extend({}, t2, o2);
        return i2 ? (n = ["ha", "m"], type = typeof i2, "string" === type ? n = [i2] : "boolean" !== type && (n = i2), a = e2 >= 1e6 && -1 !== n.indexOf("km") ? L.GeometryUtil.formattedNumber(1e-6 * e2, o2.km) + " km\xB2" : e2 >= 1e4 && -1 !== n.indexOf("ha") ? L.GeometryUtil.formattedNumber(1e-4 * e2, o2.ha) + " ha" : L.GeometryUtil.formattedNumber(e2, o2.m) + " m\xB2") : (e2 /= 0.836127, a = e2 >= 3097600 ? L.GeometryUtil.formattedNumber(e2 / 3097600, o2.mi) + " mi\xB2" : e2 >= 4840 ? L.GeometryUtil.formattedNumber(e2 / 4840, o2.ac) + " acres" : L.GeometryUtil.formattedNumber(e2, o2.yd) + " yd\xB2"), a;
      }, readableDistance: function(e2, i2, o2, a, n) {
        var s, n = L.Util.extend({}, t2, n);
        switch (i2 ? "string" == typeof i2 ? i2 : "metric" : o2 ? "feet" : a ? "nauticalMile" : "yards") {
          case "metric":
            s = e2 > 1e3 ? L.GeometryUtil.formattedNumber(e2 / 1e3, n.km) + " km" : L.GeometryUtil.formattedNumber(e2, n.m) + " m";
            break;
          case "feet":
            e2 *= 3.28083, s = L.GeometryUtil.formattedNumber(e2, n.ft) + " ft";
            break;
          case "nauticalMile":
            e2 *= 0.53996, s = L.GeometryUtil.formattedNumber(e2 / 1e3, n.nm) + " nm";
            break;
          case "yards":
          default:
            e2 *= 1.09361, s = e2 > 1760 ? L.GeometryUtil.formattedNumber(e2 / 1760, n.mi) + " miles" : L.GeometryUtil.formattedNumber(e2, n.yd) + " yd";
        }
        return s;
      }, isVersion07x: function() {
        var t3 = L.version.split(".");
        return 0 === parseInt(t3[0], 10) && 7 === parseInt(t3[1], 10);
      } });
    }(), L.Util.extend(L.LineUtil, { segmentsIntersect: function(t2, e2, i2, o2) {
      return this._checkCounterclockwise(t2, i2, o2) !== this._checkCounterclockwise(e2, i2, o2) && this._checkCounterclockwise(t2, e2, i2) !== this._checkCounterclockwise(t2, e2, o2);
    }, _checkCounterclockwise: function(t2, e2, i2) {
      return (i2.y - t2.y) * (e2.x - t2.x) > (e2.y - t2.y) * (i2.x - t2.x);
    } }), L.Polyline.include({ intersects: function() {
      var t2, e2, i2, o2 = this._getProjectedPoints(), a = o2 ? o2.length : 0;
      if (this._tooFewPointsForIntersection())
        return false;
      for (t2 = a - 1; t2 >= 3; t2--)
        if (e2 = o2[t2 - 1], i2 = o2[t2], this._lineSegmentsIntersectsRange(e2, i2, t2 - 2))
          return true;
      return false;
    }, newLatLngIntersects: function(t2, e2) {
      return !!this._map && this.newPointIntersects(this._map.latLngToLayerPoint(t2), e2);
    }, newPointIntersects: function(t2, e2) {
      var i2 = this._getProjectedPoints(), o2 = i2 ? i2.length : 0, a = i2 ? i2[o2 - 1] : null, n = o2 - 2;
      return !this._tooFewPointsForIntersection(1) && this._lineSegmentsIntersectsRange(a, t2, n, e2 ? 1 : 0);
    }, _tooFewPointsForIntersection: function(t2) {
      var e2 = this._getProjectedPoints(), i2 = e2 ? e2.length : 0;
      return i2 += t2 || 0, !e2 || i2 <= 3;
    }, _lineSegmentsIntersectsRange: function(t2, e2, i2, o2) {
      var a, n, s = this._getProjectedPoints();
      o2 = o2 || 0;
      for (var r = i2; r > o2; r--)
        if (a = s[r - 1], n = s[r], L.LineUtil.segmentsIntersect(t2, e2, a, n))
          return true;
      return false;
    }, _getProjectedPoints: function() {
      if (!this._defaultShape)
        return this._originalPoints;
      for (var t2 = [], e2 = this._defaultShape(), i2 = 0; i2 < e2.length; i2++)
        t2.push(this._map.latLngToLayerPoint(e2[i2]));
      return t2;
    } }), L.Polygon.include({ intersects: function() {
      var t2, e2, i2, o2, a = this._getProjectedPoints();
      return !this._tooFewPointsForIntersection() && (!!L.Polyline.prototype.intersects.call(this) || (t2 = a.length, e2 = a[0], i2 = a[t2 - 1], o2 = t2 - 2, this._lineSegmentsIntersectsRange(i2, e2, o2, 1)));
    } }), L.Control.Draw = L.Control.extend({ options: { position: "topleft", draw: {}, edit: false }, initialize: function(t2) {
      if (L.version < "0.7")
        throw new Error("Leaflet.draw 0.2.3+ requires Leaflet 0.7.0+. Download latest from https://github.com/Leaflet/Leaflet/");
      L.Control.prototype.initialize.call(this, t2);
      var e2;
      this._toolbars = {}, L.DrawToolbar && this.options.draw && (e2 = new L.DrawToolbar(this.options.draw), this._toolbars[L.DrawToolbar.TYPE] = e2, this._toolbars[L.DrawToolbar.TYPE].on("enable", this._toolbarEnabled, this)), L.EditToolbar && this.options.edit && (e2 = new L.EditToolbar(this.options.edit), this._toolbars[L.EditToolbar.TYPE] = e2, this._toolbars[L.EditToolbar.TYPE].on("enable", this._toolbarEnabled, this)), L.toolbar = this;
    }, onAdd: function(t2) {
      var e2, i2 = L.DomUtil.create("div", "leaflet-draw"), o2 = false;
      for (var a in this._toolbars)
        this._toolbars.hasOwnProperty(a) && (e2 = this._toolbars[a].addToolbar(t2)) && (o2 || (L.DomUtil.hasClass(e2, "leaflet-draw-toolbar-top") || L.DomUtil.addClass(e2.childNodes[0], "leaflet-draw-toolbar-top"), o2 = true), i2.appendChild(e2));
      return i2;
    }, onRemove: function() {
      for (var t2 in this._toolbars)
        this._toolbars.hasOwnProperty(t2) && this._toolbars[t2].removeToolbar();
    }, setDrawingOptions: function(t2) {
      for (var e2 in this._toolbars)
        this._toolbars[e2] instanceof L.DrawToolbar && this._toolbars[e2].setOptions(t2);
    }, _toolbarEnabled: function(t2) {
      var e2 = t2.target;
      for (var i2 in this._toolbars)
        this._toolbars[i2] !== e2 && this._toolbars[i2].disable();
    } }), L.Map.mergeOptions({ drawControlTooltips: true, drawControl: false }), L.Map.addInitHook(function() {
      this.options.drawControl && (this.drawControl = new L.Control.Draw(), this.addControl(this.drawControl));
    }), L.Toolbar = L.Class.extend({ initialize: function(t2) {
      L.setOptions(this, t2), this._modes = {}, this._actionButtons = [], this._activeMode = null;
      var e2 = L.version.split(".");
      1 === parseInt(e2[0], 10) && parseInt(e2[1], 10) >= 2 ? L.Toolbar.include(L.Evented.prototype) : L.Toolbar.include(L.Mixin.Events);
    }, enabled: function() {
      return null !== this._activeMode;
    }, disable: function() {
      this.enabled() && this._activeMode.handler.disable();
    }, addToolbar: function(t2) {
      var e2, i2 = L.DomUtil.create("div", "leaflet-draw-section"), o2 = 0, a = this._toolbarClass || "", n = this.getModeHandlers(t2);
      for (this._toolbarContainer = L.DomUtil.create("div", "leaflet-draw-toolbar leaflet-bar"), this._map = t2, e2 = 0; e2 < n.length; e2++)
        n[e2].enabled && this._initModeHandler(n[e2].handler, this._toolbarContainer, o2++, a, n[e2].title);
      if (o2)
        return this._lastButtonIndex = --o2, this._actionsContainer = L.DomUtil.create("ul", "leaflet-draw-actions"), i2.appendChild(this._toolbarContainer), i2.appendChild(this._actionsContainer), i2;
    }, removeToolbar: function() {
      for (var t2 in this._modes)
        this._modes.hasOwnProperty(t2) && (this._disposeButton(this._modes[t2].button, this._modes[t2].handler.enable, this._modes[t2].handler), this._modes[t2].handler.disable(), this._modes[t2].handler.off("enabled", this._handlerActivated, this).off("disabled", this._handlerDeactivated, this));
      this._modes = {};
      for (var e2 = 0, i2 = this._actionButtons.length; e2 < i2; e2++)
        this._disposeButton(this._actionButtons[e2].button, this._actionButtons[e2].callback, this);
      this._actionButtons = [], this._actionsContainer = null;
    }, _initModeHandler: function(t2, e2, i2, o2, a) {
      var n = t2.type;
      this._modes[n] = {}, this._modes[n].handler = t2, this._modes[n].button = this._createButton({ type: n, title: a, className: o2 + "-" + n, container: e2, callback: this._modes[n].handler.enable, context: this._modes[n].handler }), this._modes[n].buttonIndex = i2, this._modes[n].handler.on("enabled", this._handlerActivated, this).on("disabled", this._handlerDeactivated, this);
    }, _detectIOS: function() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !t.MSStream;
    }, _createButton: function(t2) {
      var e2 = L.DomUtil.create("a", t2.className || "", t2.container), i2 = L.DomUtil.create("span", "sr-only", t2.container);
      e2.href = "#", e2.appendChild(i2), t2.title && (e2.title = t2.title, i2.innerHTML = t2.title), t2.text && (e2.innerHTML = t2.text, i2.innerHTML = t2.text);
      var o2 = this._detectIOS() ? "touchstart" : "click";
      return L.DomEvent.on(e2, "click", L.DomEvent.stopPropagation).on(e2, "mousedown", L.DomEvent.stopPropagation).on(e2, "dblclick", L.DomEvent.stopPropagation).on(e2, "touchstart", L.DomEvent.stopPropagation).on(e2, "click", L.DomEvent.preventDefault).on(e2, o2, t2.callback, t2.context), e2;
    }, _disposeButton: function(t2, e2) {
      var i2 = this._detectIOS() ? "touchstart" : "click";
      L.DomEvent.off(t2, "click", L.DomEvent.stopPropagation).off(t2, "mousedown", L.DomEvent.stopPropagation).off(t2, "dblclick", L.DomEvent.stopPropagation).off(t2, "touchstart", L.DomEvent.stopPropagation).off(t2, "click", L.DomEvent.preventDefault).off(t2, i2, e2);
    }, _handlerActivated: function(t2) {
      this.disable(), this._activeMode = this._modes[t2.handler], L.DomUtil.addClass(this._activeMode.button, "leaflet-draw-toolbar-button-enabled"), this._showActionsToolbar(), this.fire("enable");
    }, _handlerDeactivated: function() {
      this._hideActionsToolbar(), L.DomUtil.removeClass(this._activeMode.button, "leaflet-draw-toolbar-button-enabled"), this._activeMode = null, this.fire("disable");
    }, _createActions: function(t2) {
      var e2, i2, o2, a, n = this._actionsContainer, s = this.getActions(t2), r = s.length;
      for (i2 = 0, o2 = this._actionButtons.length; i2 < o2; i2++)
        this._disposeButton(this._actionButtons[i2].button, this._actionButtons[i2].callback);
      for (this._actionButtons = []; n.firstChild; )
        n.removeChild(n.firstChild);
      for (var l2 = 0; l2 < r; l2++)
        "enabled" in s[l2] && !s[l2].enabled || (e2 = L.DomUtil.create("li", "", n), a = this._createButton({ title: s[l2].title, text: s[l2].text, container: e2, callback: s[l2].callback, context: s[l2].context }), this._actionButtons.push({ button: a, callback: s[l2].callback }));
    }, _showActionsToolbar: function() {
      var t2 = this._activeMode.buttonIndex, e2 = this._lastButtonIndex, i2 = this._activeMode.button.offsetTop - 1;
      this._createActions(this._activeMode.handler), this._actionsContainer.style.top = i2 + "px", 0 === t2 && (L.DomUtil.addClass(this._toolbarContainer, "leaflet-draw-toolbar-notop"), L.DomUtil.addClass(this._actionsContainer, "leaflet-draw-actions-top")), t2 === e2 && (L.DomUtil.addClass(this._toolbarContainer, "leaflet-draw-toolbar-nobottom"), L.DomUtil.addClass(this._actionsContainer, "leaflet-draw-actions-bottom")), this._actionsContainer.style.display = "block", this._map.fire(L.Draw.Event.TOOLBAROPENED);
    }, _hideActionsToolbar: function() {
      this._actionsContainer.style.display = "none", L.DomUtil.removeClass(this._toolbarContainer, "leaflet-draw-toolbar-notop"), L.DomUtil.removeClass(this._toolbarContainer, "leaflet-draw-toolbar-nobottom"), L.DomUtil.removeClass(this._actionsContainer, "leaflet-draw-actions-top"), L.DomUtil.removeClass(this._actionsContainer, "leaflet-draw-actions-bottom"), this._map.fire(L.Draw.Event.TOOLBARCLOSED);
    } }), L.Draw = L.Draw || {}, L.Draw.Tooltip = L.Class.extend({ initialize: function(t2) {
      this._map = t2, this._popupPane = t2._panes.popupPane, this._visible = false, this._container = t2.options.drawControlTooltips ? L.DomUtil.create("div", "leaflet-draw-tooltip", this._popupPane) : null, this._singleLineLabel = false, this._map.on("mouseout", this._onMouseOut, this);
    }, dispose: function() {
      this._map.off("mouseout", this._onMouseOut, this), this._container && (this._popupPane.removeChild(this._container), this._container = null);
    }, updateContent: function(t2) {
      return this._container ? (t2.subtext = t2.subtext || "", 0 !== t2.subtext.length || this._singleLineLabel ? t2.subtext.length > 0 && this._singleLineLabel && (L.DomUtil.removeClass(this._container, "leaflet-draw-tooltip-single"), this._singleLineLabel = false) : (L.DomUtil.addClass(this._container, "leaflet-draw-tooltip-single"), this._singleLineLabel = true), this._container.innerHTML = (t2.subtext.length > 0 ? '<span class="leaflet-draw-tooltip-subtext">' + t2.subtext + "</span><br />" : "") + "<span>" + t2.text + "</span>", t2.text || t2.subtext ? (this._visible = true, this._container.style.visibility = "inherit") : (this._visible = false, this._container.style.visibility = "hidden"), this) : this;
    }, updatePosition: function(t2) {
      var e2 = this._map.latLngToLayerPoint(t2), i2 = this._container;
      return this._container && (this._visible && (i2.style.visibility = "inherit"), L.DomUtil.setPosition(i2, e2)), this;
    }, showAsError: function() {
      return this._container && L.DomUtil.addClass(this._container, "leaflet-error-draw-tooltip"), this;
    }, removeError: function() {
      return this._container && L.DomUtil.removeClass(this._container, "leaflet-error-draw-tooltip"), this;
    }, _onMouseOut: function() {
      this._container && (this._container.style.visibility = "hidden");
    } }), L.DrawToolbar = L.Toolbar.extend({ statics: { TYPE: "draw" }, options: { polyline: {}, polygon: {}, rectangle: {}, circle: {}, marker: {}, circlemarker: {} }, initialize: function(t2) {
      for (var e2 in this.options)
        this.options.hasOwnProperty(e2) && t2[e2] && (t2[e2] = L.extend({}, this.options[e2], t2[e2]));
      this._toolbarClass = "leaflet-draw-draw", L.Toolbar.prototype.initialize.call(this, t2);
    }, getModeHandlers: function(t2) {
      return [{ enabled: this.options.polyline, handler: new L.Draw.Polyline(t2, this.options.polyline), title: L.drawLocal.draw.toolbar.buttons.polyline }, { enabled: this.options.polygon, handler: new L.Draw.Polygon(t2, this.options.polygon), title: L.drawLocal.draw.toolbar.buttons.polygon }, { enabled: this.options.rectangle, handler: new L.Draw.Rectangle(t2, this.options.rectangle), title: L.drawLocal.draw.toolbar.buttons.rectangle }, { enabled: this.options.circle, handler: new L.Draw.Circle(t2, this.options.circle), title: L.drawLocal.draw.toolbar.buttons.circle }, { enabled: this.options.marker, handler: new L.Draw.Marker(t2, this.options.marker), title: L.drawLocal.draw.toolbar.buttons.marker }, { enabled: this.options.circlemarker, handler: new L.Draw.CircleMarker(t2, this.options.circlemarker), title: L.drawLocal.draw.toolbar.buttons.circlemarker }];
    }, getActions: function(t2) {
      return [{ enabled: t2.completeShape, title: L.drawLocal.draw.toolbar.finish.title, text: L.drawLocal.draw.toolbar.finish.text, callback: t2.completeShape, context: t2 }, { enabled: t2.deleteLastVertex, title: L.drawLocal.draw.toolbar.undo.title, text: L.drawLocal.draw.toolbar.undo.text, callback: t2.deleteLastVertex, context: t2 }, { title: L.drawLocal.draw.toolbar.actions.title, text: L.drawLocal.draw.toolbar.actions.text, callback: this.disable, context: this }];
    }, setOptions: function(t2) {
      L.setOptions(this, t2);
      for (var e2 in this._modes)
        this._modes.hasOwnProperty(e2) && t2.hasOwnProperty(e2) && this._modes[e2].handler.setOptions(t2[e2]);
    } }), L.EditToolbar = L.Toolbar.extend({ statics: { TYPE: "edit" }, options: { edit: { selectedPathOptions: { dashArray: "10, 10", fill: true, fillColor: "#fe57a1", fillOpacity: 0.1, maintainColor: false } }, remove: {}, poly: null, featureGroup: null }, initialize: function(t2) {
      t2.edit && (void 0 === t2.edit.selectedPathOptions && (t2.edit.selectedPathOptions = this.options.edit.selectedPathOptions), t2.edit.selectedPathOptions = L.extend({}, this.options.edit.selectedPathOptions, t2.edit.selectedPathOptions)), t2.remove && (t2.remove = L.extend({}, this.options.remove, t2.remove)), t2.poly && (t2.poly = L.extend({}, this.options.poly, t2.poly)), this._toolbarClass = "leaflet-draw-edit", L.Toolbar.prototype.initialize.call(this, t2), this._selectedFeatureCount = 0;
    }, getModeHandlers: function(t2) {
      var e2 = this.options.featureGroup;
      return [{ enabled: this.options.edit, handler: new L.EditToolbar.Edit(t2, { featureGroup: e2, selectedPathOptions: this.options.edit.selectedPathOptions, poly: this.options.poly }), title: L.drawLocal.edit.toolbar.buttons.edit }, { enabled: this.options.remove, handler: new L.EditToolbar.Delete(t2, { featureGroup: e2 }), title: L.drawLocal.edit.toolbar.buttons.remove }];
    }, getActions: function(t2) {
      var e2 = [{ title: L.drawLocal.edit.toolbar.actions.save.title, text: L.drawLocal.edit.toolbar.actions.save.text, callback: this._save, context: this }, { title: L.drawLocal.edit.toolbar.actions.cancel.title, text: L.drawLocal.edit.toolbar.actions.cancel.text, callback: this.disable, context: this }];
      return t2.removeAllLayers && e2.push({ title: L.drawLocal.edit.toolbar.actions.clearAll.title, text: L.drawLocal.edit.toolbar.actions.clearAll.text, callback: this._clearAllLayers, context: this }), e2;
    }, addToolbar: function(t2) {
      var e2 = L.Toolbar.prototype.addToolbar.call(this, t2);
      return this._checkDisabled(), this.options.featureGroup.on("layeradd layerremove", this._checkDisabled, this), e2;
    }, removeToolbar: function() {
      this.options.featureGroup.off("layeradd layerremove", this._checkDisabled, this), L.Toolbar.prototype.removeToolbar.call(this);
    }, disable: function() {
      this.enabled() && (this._activeMode.handler.revertLayers(), L.Toolbar.prototype.disable.call(this));
    }, _save: function() {
      this._activeMode.handler.save(), this._activeMode && this._activeMode.handler.disable();
    }, _clearAllLayers: function() {
      this._activeMode.handler.removeAllLayers(), this._activeMode && this._activeMode.handler.disable();
    }, _checkDisabled: function() {
      var t2, e2 = this.options.featureGroup, i2 = 0 !== e2.getLayers().length;
      this.options.edit && (t2 = this._modes[L.EditToolbar.Edit.TYPE].button, i2 ? L.DomUtil.removeClass(t2, "leaflet-disabled") : L.DomUtil.addClass(t2, "leaflet-disabled"), t2.setAttribute("title", i2 ? L.drawLocal.edit.toolbar.buttons.edit : L.drawLocal.edit.toolbar.buttons.editDisabled)), this.options.remove && (t2 = this._modes[L.EditToolbar.Delete.TYPE].button, i2 ? L.DomUtil.removeClass(t2, "leaflet-disabled") : L.DomUtil.addClass(t2, "leaflet-disabled"), t2.setAttribute("title", i2 ? L.drawLocal.edit.toolbar.buttons.remove : L.drawLocal.edit.toolbar.buttons.removeDisabled));
    } }), L.EditToolbar.Edit = L.Handler.extend({ statics: { TYPE: "edit" }, initialize: function(t2, e2) {
      if (L.Handler.prototype.initialize.call(this, t2), L.setOptions(this, e2), this._featureGroup = e2.featureGroup, !(this._featureGroup instanceof L.FeatureGroup))
        throw new Error("options.featureGroup must be a L.FeatureGroup");
      this._uneditedLayerProps = {}, this.type = L.EditToolbar.Edit.TYPE;
      var i2 = L.version.split(".");
      1 === parseInt(i2[0], 10) && parseInt(i2[1], 10) >= 2 ? L.EditToolbar.Edit.include(L.Evented.prototype) : L.EditToolbar.Edit.include(L.Mixin.Events);
    }, enable: function() {
      !this._enabled && this._hasAvailableLayers() && (this.fire("enabled", { handler: this.type }), this._map.fire(L.Draw.Event.EDITSTART, { handler: this.type }), L.Handler.prototype.enable.call(this), this._featureGroup.on("layeradd", this._enableLayerEdit, this).on("layerremove", this._disableLayerEdit, this));
    }, disable: function() {
      this._enabled && (this._featureGroup.off("layeradd", this._enableLayerEdit, this).off("layerremove", this._disableLayerEdit, this), L.Handler.prototype.disable.call(this), this._map.fire(L.Draw.Event.EDITSTOP, { handler: this.type }), this.fire("disabled", { handler: this.type }));
    }, addHooks: function() {
      var t2 = this._map;
      t2 && (t2.getContainer().focus(), this._featureGroup.eachLayer(this._enableLayerEdit, this), this._tooltip = new L.Draw.Tooltip(this._map), this._tooltip.updateContent({ text: L.drawLocal.edit.handlers.edit.tooltip.text, subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext }), t2._editTooltip = this._tooltip, this._updateTooltip(), this._map.on("mousemove", this._onMouseMove, this).on("touchmove", this._onMouseMove, this).on("MSPointerMove", this._onMouseMove, this).on(L.Draw.Event.EDITVERTEX, this._updateTooltip, this));
    }, removeHooks: function() {
      this._map && (this._featureGroup.eachLayer(this._disableLayerEdit, this), this._uneditedLayerProps = {}, this._tooltip.dispose(), this._tooltip = null, this._map.off("mousemove", this._onMouseMove, this).off("touchmove", this._onMouseMove, this).off("MSPointerMove", this._onMouseMove, this).off(L.Draw.Event.EDITVERTEX, this._updateTooltip, this));
    }, revertLayers: function() {
      this._featureGroup.eachLayer(function(t2) {
        this._revertLayer(t2);
      }, this);
    }, save: function() {
      var t2 = new L.LayerGroup();
      this._featureGroup.eachLayer(function(e2) {
        e2.edited && (t2.addLayer(e2), e2.edited = false);
      }), this._map.fire(L.Draw.Event.EDITED, { layers: t2 });
    }, _backupLayer: function(t2) {
      var e2 = L.Util.stamp(t2);
      this._uneditedLayerProps[e2] || (t2 instanceof L.Polyline || t2 instanceof L.Polygon || t2 instanceof L.Rectangle ? this._uneditedLayerProps[e2] = { latlngs: L.LatLngUtil.cloneLatLngs(t2.getLatLngs()) } : t2 instanceof L.Circle ? this._uneditedLayerProps[e2] = { latlng: L.LatLngUtil.cloneLatLng(t2.getLatLng()), radius: t2.getRadius() } : (t2 instanceof L.Marker || t2 instanceof L.CircleMarker) && (this._uneditedLayerProps[e2] = { latlng: L.LatLngUtil.cloneLatLng(t2.getLatLng()) }));
    }, _getTooltipText: function() {
      return { text: L.drawLocal.edit.handlers.edit.tooltip.text, subtext: L.drawLocal.edit.handlers.edit.tooltip.subtext };
    }, _updateTooltip: function() {
      this._tooltip.updateContent(this._getTooltipText());
    }, _revertLayer: function(t2) {
      var e2 = L.Util.stamp(t2);
      t2.edited = false, this._uneditedLayerProps.hasOwnProperty(e2) && (t2 instanceof L.Polyline || t2 instanceof L.Polygon || t2 instanceof L.Rectangle ? t2.setLatLngs(this._uneditedLayerProps[e2].latlngs) : t2 instanceof L.Circle ? (t2.setLatLng(this._uneditedLayerProps[e2].latlng), t2.setRadius(this._uneditedLayerProps[e2].radius)) : (t2 instanceof L.Marker || t2 instanceof L.CircleMarker) && t2.setLatLng(this._uneditedLayerProps[e2].latlng), t2.fire("revert-edited", { layer: t2 }));
    }, _enableLayerEdit: function(t2) {
      var e2, i2, o2 = t2.layer || t2.target || t2;
      this._backupLayer(o2), this.options.poly && (i2 = L.Util.extend({}, this.options.poly), o2.options.poly = i2), this.options.selectedPathOptions && (e2 = L.Util.extend({}, this.options.selectedPathOptions), e2.maintainColor && (e2.color = o2.options.color, e2.fillColor = o2.options.fillColor), o2.options.original = L.extend({}, o2.options), o2.options.editing = e2), o2 instanceof L.Marker ? (o2.editing && o2.editing.enable(), o2.dragging.enable(), o2.on("dragend", this._onMarkerDragEnd).on("touchmove", this._onTouchMove, this).on("MSPointerMove", this._onTouchMove, this).on("touchend", this._onMarkerDragEnd, this).on("MSPointerUp", this._onMarkerDragEnd, this)) : o2.editing.enable();
    }, _disableLayerEdit: function(t2) {
      var e2 = t2.layer || t2.target || t2;
      e2.edited = false, e2.editing && e2.editing.disable(), delete e2.options.editing, delete e2.options.original, this._selectedPathOptions && (e2 instanceof L.Marker ? this._toggleMarkerHighlight(e2) : (e2.setStyle(e2.options.previousOptions), delete e2.options.previousOptions)), e2 instanceof L.Marker ? (e2.dragging.disable(), e2.off("dragend", this._onMarkerDragEnd, this).off("touchmove", this._onTouchMove, this).off("MSPointerMove", this._onTouchMove, this).off("touchend", this._onMarkerDragEnd, this).off("MSPointerUp", this._onMarkerDragEnd, this)) : e2.editing.disable();
    }, _onMouseMove: function(t2) {
      this._tooltip.updatePosition(t2.latlng);
    }, _onMarkerDragEnd: function(t2) {
      var e2 = t2.target;
      e2.edited = true, this._map.fire(L.Draw.Event.EDITMOVE, { layer: e2 });
    }, _onTouchMove: function(t2) {
      var e2 = t2.originalEvent.changedTouches[0], i2 = this._map.mouseEventToLayerPoint(e2), o2 = this._map.layerPointToLatLng(i2);
      t2.target.setLatLng(o2);
    }, _hasAvailableLayers: function() {
      return 0 !== this._featureGroup.getLayers().length;
    } }), L.EditToolbar.Delete = L.Handler.extend({ statics: { TYPE: "remove" }, initialize: function(t2, e2) {
      if (L.Handler.prototype.initialize.call(this, t2), L.Util.setOptions(this, e2), this._deletableLayers = this.options.featureGroup, !(this._deletableLayers instanceof L.FeatureGroup))
        throw new Error("options.featureGroup must be a L.FeatureGroup");
      this.type = L.EditToolbar.Delete.TYPE;
      var i2 = L.version.split(".");
      1 === parseInt(i2[0], 10) && parseInt(i2[1], 10) >= 2 ? L.EditToolbar.Delete.include(L.Evented.prototype) : L.EditToolbar.Delete.include(L.Mixin.Events);
    }, enable: function() {
      !this._enabled && this._hasAvailableLayers() && (this.fire("enabled", { handler: this.type }), this._map.fire(L.Draw.Event.DELETESTART, { handler: this.type }), L.Handler.prototype.enable.call(this), this._deletableLayers.on("layeradd", this._enableLayerDelete, this).on("layerremove", this._disableLayerDelete, this));
    }, disable: function() {
      this._enabled && (this._deletableLayers.off("layeradd", this._enableLayerDelete, this).off("layerremove", this._disableLayerDelete, this), L.Handler.prototype.disable.call(this), this._map.fire(L.Draw.Event.DELETESTOP, { handler: this.type }), this.fire("disabled", { handler: this.type }));
    }, addHooks: function() {
      var t2 = this._map;
      t2 && (t2.getContainer().focus(), this._deletableLayers.eachLayer(this._enableLayerDelete, this), this._deletedLayers = new L.LayerGroup(), this._tooltip = new L.Draw.Tooltip(this._map), this._tooltip.updateContent({ text: L.drawLocal.edit.handlers.remove.tooltip.text }), this._map.on("mousemove", this._onMouseMove, this));
    }, removeHooks: function() {
      this._map && (this._deletableLayers.eachLayer(this._disableLayerDelete, this), this._deletedLayers = null, this._tooltip.dispose(), this._tooltip = null, this._map.off("mousemove", this._onMouseMove, this));
    }, revertLayers: function() {
      this._deletedLayers.eachLayer(function(t2) {
        this._deletableLayers.addLayer(t2), t2.fire("revert-deleted", { layer: t2 });
      }, this);
    }, save: function() {
      this._map.fire(L.Draw.Event.DELETED, { layers: this._deletedLayers });
    }, removeAllLayers: function() {
      this._deletableLayers.eachLayer(function(t2) {
        this._removeLayer({ layer: t2 });
      }, this), this.save();
    }, _enableLayerDelete: function(t2) {
      (t2.layer || t2.target || t2).on("click", this._removeLayer, this);
    }, _disableLayerDelete: function(t2) {
      var e2 = t2.layer || t2.target || t2;
      e2.off("click", this._removeLayer, this), this._deletedLayers.removeLayer(e2);
    }, _removeLayer: function(t2) {
      var e2 = t2.layer || t2.target || t2;
      this._deletableLayers.removeLayer(e2), this._deletedLayers.addLayer(e2), e2.fire("deleted");
    }, _onMouseMove: function(t2) {
      this._tooltip.updatePosition(t2.latlng);
    }, _hasAvailableLayers: function() {
      return 0 !== this._deletableLayers.getLayers().length;
    } });
  }(window, document);

  // node_modules/leaflet-arrowheads/src/index.js
  var import_leaflet_geometryutil = __toESM(require_leaflet_geometryutil());

  // node_modules/leaflet-arrowheads/src/leaflet-arrowheads.js
  function modulus(i, n) {
    return (i % n + n) % n;
  }
  function definedProps(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([k2, v]) => v !== void 0)
    );
  }
  function isInMeters(value) {
    return value.toString().trim().slice(value.toString().length - 1, value.toString().length) === "m";
  }
  function isInPercent(value) {
    return value.toString().trim().slice(value.toString().length - 1, value.toString().length) === "%";
  }
  function isInPixels(value) {
    return value.toString().trim().slice(value.toString().length - 2, value.toString().length) === "px";
  }
  function pixelsToMeters(pixels, map) {
    let refPoint1 = map.getCenter();
    let xy1 = map.latLngToLayerPoint(refPoint1);
    let xy2 = {
      x: xy1.x + Number(pixels),
      y: xy1.y
    };
    let refPoint2 = map.layerPointToLatLng(xy2);
    let derivedMeters = map.distance(refPoint1, refPoint2);
    return derivedMeters;
  }
  L.Polyline.include({
    /**
     * Adds arrowheads to an L.polyline
     * @param {object} options The options for the arrowhead.  See documentation for details
     * @returns The L.polyline instance that they arrowheads are attached to
     */
    arrowheads: function(options = {}) {
      const defaults = {
        yawn: 60,
        size: "15%",
        frequency: "allvertices",
        proportionalToTotal: false
      };
      this.options.noClip = true;
      let actualOptions = Object.assign({}, defaults, options);
      this._arrowheadOptions = actualOptions;
      this._hatsApplied = true;
      return this;
    },
    buildVectorHats: function(options) {
      if (this._arrowheads) {
        this._arrowheads.remove();
      }
      if (this._ghosts) {
        this._ghosts.remove();
      }
      let defaultOptionsOfParent = Object.getPrototypeOf(
        Object.getPrototypeOf(this.options)
      );
      let parentOptions = Object.assign({}, defaultOptionsOfParent, this.options);
      let hatOptions = Object.assign({}, parentOptions, options);
      hatOptions.smoothFactor = 1;
      hatOptions.fillOpacity = 1;
      hatOptions.fill = options.fill ? true : false;
      hatOptions.interactive = false;
      let size = options.size.toString();
      let allhats = [];
      const { frequency, offsets } = options;
      if (offsets?.start || offsets?.end) {
        this._buildGhosts({ start: offsets.start, end: offsets.end });
      }
      const lineToTrace = this._ghosts || this;
      lineToTrace._parts.forEach((peice, index) => {
        const latlngs = peice.map((point) => this._map.layerPointToLatLng(point));
        const totalLength = (() => {
          let total = 0;
          for (var i2 = 0; i2 < peice.length - 1; i2++) {
            total += this._map.distance(latlngs[i2], latlngs[i2 + 1]);
          }
          return total;
        })();
        let derivedLatLngs;
        let derivedBearings;
        let spacing;
        let noOfPoints;
        if (!isNaN(frequency)) {
          spacing = 1 / frequency;
          noOfPoints = frequency;
        } else if (isInPercent(frequency)) {
          console.error(
            "Error: arrowhead frequency option cannot be given in percent.  Try another unit."
          );
        } else if (isInMeters(frequency)) {
          spacing = frequency.slice(0, frequency.length - 1) / totalLength;
          noOfPoints = 1 / spacing;
          noOfPoints = Math.floor(noOfPoints);
          spacing = 1 / noOfPoints;
        } else if (isInPixels(frequency)) {
          spacing = (() => {
            let chosenFrequency = frequency.slice(0, frequency.length - 2);
            let derivedMeters = pixelsToMeters(chosenFrequency, this._map);
            return derivedMeters / totalLength;
          })();
          noOfPoints = 1 / spacing;
          noOfPoints = Math.floor(noOfPoints);
          spacing = 1 / noOfPoints;
        }
        if (options.frequency === "allvertices") {
          derivedBearings = (() => {
            let bearings = [];
            for (var i2 = 1; i2 < latlngs.length; i2++) {
              let bearing = L.GeometryUtil.angle(
                this._map,
                latlngs[modulus(i2 - 1, latlngs.length)],
                latlngs[i2]
              ) + 180;
              bearings.push(bearing);
            }
            return bearings;
          })();
          derivedLatLngs = latlngs;
          derivedLatLngs.shift();
        } else if (options.frequency === "endonly" && latlngs.length >= 2) {
          derivedLatLngs = [latlngs[latlngs.length - 1]];
          derivedBearings = [
            L.GeometryUtil.angle(
              this._map,
              latlngs[latlngs.length - 2],
              latlngs[latlngs.length - 1]
            ) + 180
          ];
        } else {
          derivedLatLngs = [];
          let interpolatedPoints = [];
          for (var i = 0; i < noOfPoints; i++) {
            let interpolatedPoint = L.GeometryUtil.interpolateOnLine(
              this._map,
              latlngs,
              spacing * (i + 1)
            );
            if (interpolatedPoint) {
              interpolatedPoints.push(interpolatedPoint);
              derivedLatLngs.push(interpolatedPoint.latLng);
            }
          }
          derivedBearings = (() => {
            let bearings = [];
            for (var i2 = 0; i2 < interpolatedPoints.length; i2++) {
              let bearing = L.GeometryUtil.angle(
                this._map,
                latlngs[interpolatedPoints[i2].predecessor + 1],
                latlngs[interpolatedPoints[i2].predecessor]
              );
              bearings.push(bearing);
            }
            return bearings;
          })();
        }
        let hats = [];
        const pushHats = (size2, localHatOptions = {}) => {
          let yawn = localHatOptions.yawn ?? options.yawn;
          let leftWingPoint = L.GeometryUtil.destination(
            derivedLatLngs[i],
            derivedBearings[i] - yawn / 2,
            size2
          );
          let rightWingPoint = L.GeometryUtil.destination(
            derivedLatLngs[i],
            derivedBearings[i] + yawn / 2,
            size2
          );
          let hatPoints = [
            [leftWingPoint.lat, leftWingPoint.lng],
            [derivedLatLngs[i].lat, derivedLatLngs[i].lng],
            [rightWingPoint.lat, rightWingPoint.lng]
          ];
          let hat = options.fill ? L.polygon(hatPoints, { ...hatOptions, ...localHatOptions }) : L.polyline(hatPoints, { ...hatOptions, ...localHatOptions });
          hats.push(hat);
        };
        const pushHatsFromPixels = (size2, localHatOptions = {}) => {
          let sizePixels = size2.slice(0, size2.length - 2);
          let yawn = localHatOptions.yawn ?? options.yawn;
          let derivedXY = this._map.latLngToLayerPoint(derivedLatLngs[i]);
          let bearing = derivedBearings[i];
          let thetaLeft = (180 - bearing - yawn / 2) * (Math.PI / 180), thetaRight = (180 - bearing + yawn / 2) * (Math.PI / 180);
          let dxLeft = sizePixels * Math.sin(thetaLeft), dyLeft = sizePixels * Math.cos(thetaLeft), dxRight = sizePixels * Math.sin(thetaRight), dyRight = sizePixels * Math.cos(thetaRight);
          let leftWingXY = {
            x: derivedXY.x + dxLeft,
            y: derivedXY.y + dyLeft
          };
          let rightWingXY = {
            x: derivedXY.x + dxRight,
            y: derivedXY.y + dyRight
          };
          let leftWingPoint = this._map.layerPointToLatLng(leftWingXY), rightWingPoint = this._map.layerPointToLatLng(rightWingXY);
          let hatPoints = [
            [leftWingPoint.lat, leftWingPoint.lng],
            [derivedLatLngs[i].lat, derivedLatLngs[i].lng],
            [rightWingPoint.lat, rightWingPoint.lng]
          ];
          let hat = options.fill ? L.polygon(hatPoints, { ...hatOptions, ...localHatOptions }) : L.polyline(hatPoints, { ...hatOptions, ...localHatOptions });
          hats.push(hat);
        };
        for (var i = 0; i < derivedLatLngs.length; i++) {
          let { perArrowheadOptions, ...globalOptions } = options;
          perArrowheadOptions = perArrowheadOptions ? perArrowheadOptions(i) : {};
          perArrowheadOptions = Object.assign(
            globalOptions,
            definedProps(perArrowheadOptions)
          );
          size = perArrowheadOptions.size ?? size;
          if (isInMeters(size)) {
            let hatSize = size.slice(0, size.length - 1);
            pushHats(hatSize, perArrowheadOptions);
          } else if (isInPercent(size)) {
            let sizePercent = size.slice(0, size.length - 1);
            let hatSize = (() => {
              if (options.frequency === "endonly" && options.proportionalToTotal) {
                return totalLength * sizePercent / 100;
              } else {
                let averageDistance = totalLength / (peice.length - 1);
                return averageDistance * sizePercent / 100;
              }
            })();
            pushHats(hatSize, perArrowheadOptions);
          } else if (isInPixels(size)) {
            pushHatsFromPixels(options.size, perArrowheadOptions);
          } else {
            console.error(
              "Error: Arrowhead size unit not defined.  Check your arrowhead options."
            );
          }
        }
        allhats.push(...hats);
      });
      let arrowheads = L.layerGroup(allhats);
      this._arrowheads = arrowheads;
      return this;
    },
    getArrowheads: function() {
      if (this._arrowheads) {
        return this._arrowheads;
      } else {
        return console.error(
          `Error: You tried to call '.getArrowheads() on a shape that does not have a arrowhead.  Use '.arrowheads()' to add a arrowheads before trying to call '.getArrowheads()'`
        );
      }
    },
    /**
     * Builds ghost polylines that are clipped versions of the polylines based on the offsets
     * If offsets are used, arrowheads are drawn from 'this._ghosts' rather than 'this'
     */
    _buildGhosts: function({ start, end }) {
      if (start || end) {
        let latlngs = this.getLatLngs();
        latlngs = Array.isArray(latlngs[0]) ? latlngs : [latlngs];
        const newLatLngs = latlngs.map((segment) => {
          const totalLength = (() => {
            let total = 0;
            for (var i = 0; i < segment.length - 1; i++) {
              total += this._map.distance(segment[i], segment[i + 1]);
            }
            return total;
          })();
          if (start) {
            let endOffsetInMeters = (() => {
              if (isInMeters(start)) {
                return Number(start.slice(0, start.length - 1));
              } else if (isInPixels(start)) {
                let pixels = Number(start.slice(0, start.length - 2));
                return pixelsToMeters(pixels, this._map);
              }
            })();
            let newStart = L.GeometryUtil.interpolateOnLine(
              this._map,
              segment,
              endOffsetInMeters / totalLength
            );
            segment = segment.slice(
              newStart.predecessor === -1 ? 1 : newStart.predecessor + 1,
              segment.length
            );
            segment.unshift(newStart.latLng);
          }
          if (end) {
            let endOffsetInMeters = (() => {
              if (isInMeters(end)) {
                return Number(end.slice(0, end.length - 1));
              } else if (isInPixels(end)) {
                let pixels = Number(end.slice(0, end.length - 2));
                return pixelsToMeters(pixels, this._map);
              }
            })();
            let newEnd = L.GeometryUtil.interpolateOnLine(
              this._map,
              segment,
              (totalLength - endOffsetInMeters) / totalLength
            );
            segment = segment.slice(0, newEnd.predecessor + 1);
            segment.push(newEnd.latLng);
          }
          return segment;
        });
        this._ghosts = L.polyline(newLatLngs, {
          ...this.options,
          color: "rgba(0,0,0,0)",
          stroke: 0,
          smoothFactor: 0,
          interactive: false
        });
        this._ghosts.addTo(this._map);
      }
    },
    deleteArrowheads: function() {
      if (this._arrowheads) {
        this._arrowheads.remove();
        delete this._arrowheads;
        delete this._arrowheadOptions;
        this._hatsApplied = false;
      }
      if (this._ghosts) {
        this._ghosts.remove();
      }
    },
    _update: function() {
      if (!this._map) {
        return;
      }
      this._clipPoints();
      this._simplifyPoints();
      this._updatePath();
      if (this._hatsApplied) {
        this.buildVectorHats(this._arrowheadOptions);
        this._map.addLayer(this._arrowheads);
      }
    },
    remove: function() {
      if (this._arrowheads) {
        this._arrowheads.remove();
      }
      if (this._ghosts) {
        this._ghosts.remove();
      }
      return this.removeFrom(this._map || this._mapToAdd);
    }
  });
  L.LayerGroup.include({
    removeLayer: function(layer) {
      var id = layer in this._layers ? layer : this.getLayerId(layer);
      if (this._map && this._layers[id]) {
        if (this._layers[id]._arrowheads) {
          this._layers[id]._arrowheads.remove();
        }
        this._map.removeLayer(this._layers[id]);
      }
      delete this._layers[id];
      return this;
    },
    onRemove: function(map, layer) {
      for (var layer in this._layers) {
        if (this._layers[layer]) {
          this._layers[layer].remove();
        }
      }
      this.eachLayer(map.removeLayer, map);
    }
  });
  L.Map.include({
    removeLayer: function(layer) {
      var id = L.Util.stamp(layer);
      if (layer._arrowheads) {
        layer._arrowheads.remove();
      }
      if (layer._ghosts) {
        layer._ghosts.remove();
      }
      if (!this._layers[id]) {
        return this;
      }
      if (this._loaded) {
        layer.onRemove(this);
      }
      if (layer.getAttribution && this.attributionControl) {
        this.attributionControl.removeAttribution(layer.getAttribution());
      }
      delete this._layers[id];
      if (this._loaded) {
        this.fire("layerremove", { layer });
        layer.fire("remove");
      }
      layer._map = layer._mapToAdd = null;
      return this;
    }
  });
  L.GeoJSON.include({
    geometryToLayer: function(geojson, options) {
      var geometry = geojson.type === "Feature" ? geojson.geometry : geojson, coords = geometry ? geometry.coordinates : null, layers = [], pointToLayer = options && options.pointToLayer, _coordsToLatLng = options && options.coordsToLatLng || L.GeoJSON.coordsToLatLng, latlng, latlngs, i, len;
      if (!coords && !geometry) {
        return null;
      }
      switch (geometry.type) {
        case "Point":
          latlng = _coordsToLatLng(coords);
          return this._pointToLayer(pointToLayer, geojson, latlng, options);
        case "MultiPoint":
          for (i = 0, len = coords.length; i < len; i++) {
            latlng = _coordsToLatLng(coords[i]);
            layers.push(
              this._pointToLayer(pointToLayer, geojson, latlng, options)
            );
          }
          return new L.FeatureGroup(layers);
        case "LineString":
        case "MultiLineString":
          latlngs = L.GeoJSON.coordsToLatLngs(
            coords,
            geometry.type === "LineString" ? 0 : 1,
            _coordsToLatLng
          );
          var polyline = new L.Polyline(latlngs, options);
          if (options.arrowheads) {
            polyline.arrowheads(options.arrowheads);
          }
          return polyline;
        case "Polygon":
        case "MultiPolygon":
          latlngs = L.GeoJSON.coordsToLatLngs(
            coords,
            geometry.type === "Polygon" ? 1 : 2,
            _coordsToLatLng
          );
          return new L.Polygon(latlngs, options);
        case "GeometryCollection":
          for (i = 0, len = geometry.geometries.length; i < len; i++) {
            var layer = this.geometryToLayer(
              {
                geometry: geometry.geometries[i],
                type: "Feature",
                properties: geojson.properties
              },
              options
            );
            if (layer) {
              layers.push(layer);
            }
          }
          return new L.FeatureGroup(layers);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    },
    addData: function(geojson) {
      var features = L.Util.isArray(geojson) ? geojson : geojson.features, i, len, feature;
      if (features) {
        for (i = 0, len = features.length; i < len; i++) {
          feature = features[i];
          if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
            this.addData(feature);
          }
        }
        return this;
      }
      var options = this.options;
      if (options.filter && !options.filter(geojson)) {
        return this;
      }
      var layer = this.geometryToLayer(geojson, options);
      if (!layer) {
        return this;
      }
      layer.feature = L.GeoJSON.asFeature(geojson);
      layer.defaultOptions = layer.options;
      this.resetStyle(layer);
      if (options.onEachFeature) {
        options.onEachFeature(geojson, layer);
      }
      return this.addLayer(layer);
    },
    _pointToLayer: function(pointToLayerFn, geojson, latlng, options) {
      return pointToLayerFn ? pointToLayerFn(geojson, latlng) : new L.Marker(
        latlng,
        options && options.markersInheritOptions && options
      );
    }
  });

  // node_modules/leaflet-path-drag/dist/index.mjs
  var import_leaflet = __toESM(require_leaflet_src(), 1);
  import_leaflet.SVG.include({
    /**
     * Reset transform matrix
     */
    _resetTransformPath: function(t) {
      t._path.setAttributeNS(null, "transform", "");
    },
    /**
     * Applies matrix transformation to SVG
     * @param {L.Path}         layer
     * @param {Array.<Number>} matrix
     */
    transformPath: function(t, i) {
      t._path.setAttributeNS(
        null,
        "transform",
        "matrix(" + i.join(" ") + ")"
      );
    }
  });
  import_leaflet.SVG.include(
    import_leaflet.Browser.vml ? {
      /**
       * Reset transform matrix
       */
      _resetTransformPath: function(t) {
        t._skew && (t._skew.on = false, t._path.removeChild(t._skew), t._skew = null);
      },
      /**
       * Applies matrix transformation to VML
       * @param {L.Path}         layer
       * @param {Array.<Number>} matrix
       */
      transformPath: function(t, i) {
        let n = t._skew;
        n || (n = import_leaflet.SVG.create("skew"), t._path.appendChild(n), n.style.behavior = "url(#default#VML)", t._skew = n);
        const a = i[0].toFixed(8) + " " + i[1].toFixed(8) + " " + i[2].toFixed(8) + " " + i[3].toFixed(8) + " 0 0", r = Math.floor(i[4]).toFixed() + ", " + Math.floor(i[5]).toFixed(), s = this._path.style;
        let e = parseFloat(s.left), o = parseFloat(s.top), _ = parseFloat(s.width), p = parseFloat(s.height);
        isNaN(e) && (e = 0), isNaN(o) && (o = 0), (isNaN(_) || !_) && (_ = 1), (isNaN(p) || !p) && (p = 1);
        const u = (-e / _ - 0.5).toFixed(8) + " " + (-o / p - 0.5).toFixed(8);
        n.on = "f", n.matrix = a, n.origin = u, n.offset = r, n.on = true;
      }
    } : {}
  );
  function E() {
    return true;
  }
  import_leaflet.Canvas.include({
    /**
     * Do nothing
     * @param  {L.Path} layer
     */
    _resetTransformPath: function(t) {
      this._containerCopy && (delete this._containerCopy, t._containsPoint_ && (t._containsPoint = t._containsPoint_, delete t._containsPoint_, this._requestRedraw(t)));
    },
    /**
     * Algorithm outline:
     *
     * 1. pre-transform - clear the path out of the canvas, copy canvas state
     * 2. at every frame:
     *    2.1. save
     *    2.2. redraw the canvas from saved one
     *    2.3. transform
     *    2.4. draw path
     *    2.5. restore
     * 3. Repeat
     *
     * @param  {L.Path}         layer
     * @param  {Array.<Number>} matrix
     */
    transformPath: function(t, i) {
      let n = this._containerCopy;
      const a = this._ctx;
      let r;
      const s = import_leaflet.Browser.retina ? 2 : 1, e = this._bounds, o = e.getSize(), _ = e.min;
      n || (n = this._containerCopy = document.createElement("canvas"), r = n.getContext("2d"), n.width = s * o.x, n.height = s * o.y, this._removePath(t), this._redraw(), r.translate(s * e.min.x, s * e.min.y), r.drawImage(this._container, 0, 0), this._initPath(t), t._containsPoint_ = t._containsPoint, t._containsPoint = E), a.save(), a.clearRect(_.x, _.y, o.x * s, o.y * s), a.setTransform(1, 0, 0, 1, 0, 0), a.restore(), a.save(), a.drawImage(this._containerCopy, 0, 0, o.x, o.y), a.transform.apply(a, i), this._drawing = true, t._updatePath(), this._drawing = false, a.restore();
    }
  });
  import_leaflet.Path.include({
    /**
     * Applies matrix transformation to SVG
     * @param {Array.<Number>?} matrix
     */
    _transform: function(t) {
      return this._renderer && (t ? this._renderer.transformPath(this, t) : (this._renderer._resetTransformPath(this), this._update())), this;
    },
    /**
     * Check if the feature was dragged, that'll supress the click event
     * on mouseup. That fixes popups for example
     *
     * @param  {MouseEvent} e
     */
    _onMouseClick: function(t) {
      this.dragging && this.dragging.moved() || this._map.dragging && this._map.dragging.moved() || this._fireMouseEvent(t);
    }
  });
  var S = {
    mousedown: "mouseup",
    touchstart: "touchend",
    pointerdown: "touchend",
    MSPointerDown: "touchend"
  };
  var M = {
    mousedown: "mousemove",
    touchstart: "touchmove",
    pointerdown: "touchmove",
    MSPointerDown: "touchmove"
  };
  function k(t, i) {
    const n = t.x - i.x, a = t.y - i.y;
    return Math.sqrt(n * n + a * a);
  }
  import_leaflet.Handler.PathDrag = import_leaflet.Handler.extend(
    /** @lends  L.Path.Drag.prototype */
    {
      statics: {
        DRAGGING_CLS: "leaflet-path-draggable"
      },
      /**
       * @param  {L.Path} path
       * @constructor
       */
      initialize: function(t) {
        this._path = t, this._matrix = null, this._startPoint = null, this._dragStartPoint = null, this._mapDraggingWasEnabled = false, this._path._dragMoved = false;
      },
      /**
       * Enable dragging
       */
      addHooks: function() {
        this._path.on("mousedown", this._onDragStart, this), this._path.options.className = this._path.options.className ? this._path.options.className + " " + import_leaflet.Handler.PathDrag.DRAGGING_CLS : import_leaflet.Handler.PathDrag.DRAGGING_CLS, this._path._path && import_leaflet.DomUtil.addClass(this._path._path, import_leaflet.Handler.PathDrag.DRAGGING_CLS);
      },
      /**
       * Disable dragging
       */
      removeHooks: function() {
        this._path.off("mousedown", this._onDragStart, this), this._path.options.className = this._path.options.className.replace(
          new RegExp("\\s+" + import_leaflet.Handler.PathDrag.DRAGGING_CLS),
          ""
        ), this._path._path && import_leaflet.DomUtil.removeClass(this._path._path, import_leaflet.Handler.PathDrag.DRAGGING_CLS);
      },
      /**
       * @return {Boolean}
       */
      moved: function() {
        return this._path._dragMoved;
      },
      /**
       * Start drag
       * @param  {L.MouseEvent} evt
       */
      _onDragStart: function(t) {
        const i = t.originalEvent._simulated ? "touchstart" : t.originalEvent.type;
        this._mapDraggingWasEnabled = false, this._startPoint = t.containerPoint.clone(), this._dragStartPoint = t.containerPoint.clone(), this._matrix = [1, 0, 0, 1, 0, 0], import_leaflet.DomEvent.stop(t.originalEvent), import_leaflet.DomUtil.addClass(this._path._renderer._container, "leaflet-interactive"), import_leaflet.DomEvent.on(document, M[i], this._onDrag, this).on(
          document,
          S[i],
          this._onDragEnd,
          this
        ), this._path._map.dragging.enabled() && (this._path._map.dragging.disable(), this._mapDraggingWasEnabled = true), this._path._dragMoved = false, this._path._popup && this._path._popup.close(), this._replaceCoordGetters(t);
      },
      /**
       * Dragging
       * @param  {L.MouseEvent} evt
       */
      _onDrag: function(t) {
        import_leaflet.DomEvent.stop(t);
        const i = t.touches && t.touches.length >= 1 ? t.touches[0] : t, n = this._path._map.mouseEventToContainerPoint(i);
        if (t.type === "touchmove" && !this._path._dragMoved && this._dragStartPoint.distanceTo(n) <= this._path._map.options.tapTolerance)
          return;
        const a = n.x, r = n.y, s = a - this._startPoint.x, e = r - this._startPoint.y;
        (s || e) && (this._path._dragMoved || (this._path._dragMoved = true, this._path.options.interactive = false, this._path._map.dragging._draggable._moved = true, this._path.fire("dragstart", t), this._path.bringToFront()), this._matrix[4] += s, this._matrix[5] += e, this._startPoint.x = a, this._startPoint.y = r, this._path.fire("predrag", t), this._path._transform(this._matrix), this._path.fire("drag", t));
      },
      /**
       * Dragging stopped, apply
       * @param  {L.MouseEvent} evt
       */
      _onDragEnd: function(t) {
        const i = this._path._map.mouseEventToContainerPoint(t), n = this.moved();
        if (n && (this._transformPoints(this._matrix), this._path._updatePath(), this._path._project(), this._path._transform(null), import_leaflet.DomEvent.stop(t)), import_leaflet.DomEvent.off(document, "mousemove touchmove", this._onDrag, this), import_leaflet.DomEvent.off(document, "mouseup touchend", this._onDragEnd, this), this._restoreCoordGetters(), n) {
          this._path.fire("dragend", {
            distance: k(this._dragStartPoint, i)
          });
          const a = this._path._containsPoint;
          this._path._containsPoint = import_leaflet.Util.falseFn, import_leaflet.Util.requestAnimFrame(function() {
            this._path._dragMoved = false, this._path.options.interactive = true, this._path._containsPoint = a;
          }, this);
        }
        this._mapDraggingWasEnabled && this._path._map.dragging.enable();
      },
      /**
       * Applies transformation, does it in one sweep for performance,
       * so don't be surprised about the code repetition.
       *
       * [ x ]   [ a  b  tx ] [ x ]   [ a * x + b * y + tx ]
       * [ y ] = [ c  d  ty ] [ y ] = [ c * x + d * y + ty ]
       *
       * @param {Array.<Number>} matrix
       */
      _transformPoints: function(t, i) {
        const n = this._path, a = L.point(t[4], t[5]), r = n._map.options.crs, s = r.transformation, e = r.scale(n._map.getZoom()), o = r.projection, _ = s.untransform(a, e).subtract(s.untransform((0, import_leaflet.point)(0, 0), e)), p = !i;
        if (n._bounds = new import_leaflet.LatLngBounds(), n._point)
          i = o.unproject(
            o.project(n._latlng)._add(_)
          ), p && (n._latlng = i, n._point._add(a));
        else if (n._rings || n._parts) {
          const u = n._rings || n._parts;
          let c = n._latlngs;
          i = i || c, import_leaflet.Util.isArray(c[0]) || (c = [c], i = [i]);
          for (let g = 0, w = u.length; g < w; g++) {
            i[g] = i[g] || [];
            for (let d = 0, v = u[g].length; d < v; d++) {
              const b = c[g][d];
              i[g][d] = o.unproject(
                o.project(b)._add(_)
              ), p && (n._bounds.extend(c[g][d]), u[g][d]._add(a));
            }
          }
        }
        return i;
      },
      /**
       * If you want to read the latlngs during the drag - your right,
       * but they have to be transformed
       */
      _replaceCoordGetters: function() {
        this._path.getLatLng ? (this._path.getLatLng_ = this._path.getLatLng, this._path.getLatLng = import_leaflet.Util.bind(function() {
          return this.dragging._transformPoints(this.dragging._matrix, {});
        }, this._path)) : this._path.getLatLngs && (this._path.getLatLngs_ = this._path.getLatLngs, this._path.getLatLngs = import_leaflet.Util.bind(function() {
          return this.dragging._transformPoints(this.dragging._matrix, []);
        }, this._path));
      },
      /**
       * Put back the getters
       */
      _restoreCoordGetters: function() {
        this._path.getLatLng_ ? (this._path.getLatLng = this._path.getLatLng_, delete this._path.getLatLng_) : this._path.getLatLngs_ && (this._path.getLatLngs = this._path.getLatLngs_, delete this._path.getLatLngs_);
      }
    }
  );
  import_leaflet.Handler.PathDrag.makeDraggable = function(t) {
    return t.dragging = new import_leaflet.Handler.PathDrag(t), t;
  };
  import_leaflet.Path.prototype.makeDraggable = function() {
    return import_leaflet.Handler.PathDrag.makeDraggable(this);
  };
  import_leaflet.Path.addInitHook(function() {
    this.options.draggable ? (this.options.interactive = true, this.dragging ? this.dragging.enable() : (import_leaflet.Handler.PathDrag.makeDraggable(this), this.dragging.enable())) : this.dragging && this.dragging.disable();
  });
  var T = import_leaflet.Handler.PathDrag;

  // src/lib/Toogle.svelte
  function create_else_block(ctx) {
    let i;
    return {
      c() {
        i = element("i");
        attr(i, "class", "bi bi-chevron-down");
      },
      m(target, anchor) {
        insert(target, i, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(i);
        }
      }
    };
  }
  function create_if_block(ctx) {
    let i;
    return {
      c() {
        i = element("i");
        attr(i, "class", "bi bi-chevron-right");
      },
      m(target, anchor) {
        insert(target, i, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(i);
        }
      }
    };
  }
  function create_fragment(ctx) {
    let button;
    let mounted;
    let dispose;
    function select_block_type(ctx2, dirty) {
      if (
        /*hidde*/
        ctx2[0]
      )
        return create_if_block;
      return create_else_block;
    }
    let current_block_type = select_block_type(ctx, -1);
    let if_block = current_block_type(ctx);
    return {
      c() {
        button = element("button");
        if_block.c();
        attr(button, "class", "chevron-buttons font-bold");
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if_block.m(button, null);
        if (!mounted) {
          dispose = listen(button, "click", function() {
            if (is_function(
              /*toggleHidde*/
              ctx[1]
            ))
              ctx[1].apply(this, arguments);
          });
          mounted = true;
        }
      },
      p(new_ctx, [dirty]) {
        ctx = new_ctx;
        if (current_block_type !== (current_block_type = select_block_type(ctx, dirty))) {
          if_block.d(1);
          if_block = current_block_type(ctx);
          if (if_block) {
            if_block.c();
            if_block.m(button, null);
          }
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(button);
        }
        if_block.d();
        mounted = false;
        dispose();
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    let { hidde = false } = $$props;
    let { toggleHidde = () => {
    } } = $$props;
    $$self.$$set = ($$props2) => {
      if ("hidde" in $$props2)
        $$invalidate(0, hidde = $$props2.hidde);
      if ("toggleHidde" in $$props2)
        $$invalidate(1, toggleHidde = $$props2.toggleHidde);
    };
    return [hidde, toggleHidde];
  }
  var Toogle = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment, safe_not_equal, { hidde: 0, toggleHidde: 1 });
    }
    get hidde() {
      return this.$$.ctx[0];
    }
    set hidde(hidde) {
      this.$$set({ hidde });
      flush();
    }
    get toggleHidde() {
      return this.$$.ctx[1];
    }
    set toggleHidde(toggleHidde) {
      this.$$set({ toggleHidde });
      flush();
    }
  };
  create_custom_element(Toogle, { "hidde": { "type": "Boolean" }, "toggleHidde": {} }, [], [], true);
  var Toogle_default = Toogle;

  // src/lib/Subtitle.svelte
  function create_fragment2(ctx) {
    let div;
    let img_1;
    let img_1_src_value;
    let t0;
    let p;
    let t1;
    let t2;
    let toogle;
    let current;
    toogle = new Toogle_default({
      props: {
        toggleHidde: (
          /*toggleHidde*/
          ctx[2]
        ),
        hidde: (
          /*hidde*/
          ctx[3]
        )
      }
    });
    return {
      c() {
        div = element("div");
        img_1 = element("img");
        t0 = space();
        p = element("p");
        t1 = text(
          /*subTitle*/
          ctx[0]
        );
        t2 = space();
        create_component(toogle.$$.fragment);
        attr(img_1, "class", "w-10 h-10 cursor-pointer ml-[-1px]");
        if (!src_url_equal(img_1.src, img_1_src_value = /*img*/
        ctx[1]))
          attr(img_1, "src", img_1_src_value);
        attr(img_1, "alt", "");
        attr(p, "class", "text-xl font-medium mr-auto ml-[-12px] mt-1");
        attr(div, "class", "flex gap-x-5 mb-3.5 mt-[-4px]");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, img_1);
        append(div, t0);
        append(div, p);
        append(p, t1);
        append(div, t2);
        mount_component(toogle, div, null);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (!current || dirty & /*img*/
        2 && !src_url_equal(img_1.src, img_1_src_value = /*img*/
        ctx2[1])) {
          attr(img_1, "src", img_1_src_value);
        }
        if (!current || dirty & /*subTitle*/
        1)
          set_data(
            t1,
            /*subTitle*/
            ctx2[0]
          );
        const toogle_changes = {};
        if (dirty & /*toggleHidde*/
        4)
          toogle_changes.toggleHidde = /*toggleHidde*/
          ctx2[2];
        if (dirty & /*hidde*/
        8)
          toogle_changes.hidde = /*hidde*/
          ctx2[3];
        toogle.$set(toogle_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(toogle.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(toogle.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        destroy_component(toogle);
      }
    };
  }
  function instance2($$self, $$props, $$invalidate) {
    let { subTitle = "" } = $$props;
    let { img = "" } = $$props;
    let { toggleHidde } = $$props;
    let { hidde } = $$props;
    $$self.$$set = ($$props2) => {
      if ("subTitle" in $$props2)
        $$invalidate(0, subTitle = $$props2.subTitle);
      if ("img" in $$props2)
        $$invalidate(1, img = $$props2.img);
      if ("toggleHidde" in $$props2)
        $$invalidate(2, toggleHidde = $$props2.toggleHidde);
      if ("hidde" in $$props2)
        $$invalidate(3, hidde = $$props2.hidde);
    };
    return [subTitle, img, toggleHidde, hidde];
  }
  var Subtitle = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment2, safe_not_equal, {
        subTitle: 0,
        img: 1,
        toggleHidde: 2,
        hidde: 3
      });
    }
    get subTitle() {
      return this.$$.ctx[0];
    }
    set subTitle(subTitle) {
      this.$$set({ subTitle });
      flush();
    }
    get img() {
      return this.$$.ctx[1];
    }
    set img(img) {
      this.$$set({ img });
      flush();
    }
    get toggleHidde() {
      return this.$$.ctx[2];
    }
    set toggleHidde(toggleHidde) {
      this.$$set({ toggleHidde });
      flush();
    }
    get hidde() {
      return this.$$.ctx[3];
    }
    set hidde(hidde) {
      this.$$set({ hidde });
      flush();
    }
  };
  create_custom_element(Subtitle, { "subTitle": {}, "img": {}, "toggleHidde": {}, "hidde": {} }, [], [], true);
  var Subtitle_default = Subtitle;

  // src/lib/MapWrapper.svelte
  function create_fragment3(ctx) {
    let div;
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[1].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[0],
      null
    );
    return {
      c() {
        div = element("div");
        if (default_slot)
          default_slot.c();
        attr(div, "class", "flex min-h-svh w-full");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if (default_slot) {
          default_slot.m(div, null);
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          1)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[0],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[0]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[0],
                dirty,
                null
              ),
              null
            );
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function instance3($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    $$self.$$set = ($$props2) => {
      if ("$$scope" in $$props2)
        $$invalidate(0, $$scope = $$props2.$$scope);
    };
    return [$$scope, slots];
  }
  var MapWrapper = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance3, create_fragment3, safe_not_equal, {});
    }
  };
  create_custom_element(MapWrapper, {}, ["default"], [], true);
  var MapWrapper_default = MapWrapper;

  // src/lib/OptionWrapper.svelte
  var get_default_slot_changes = (dirty) => ({ hidde: dirty & /*hidde*/
  2 });
  var get_default_slot_context = (ctx) => ({
    toggleHidde: (
      /*toggleHidde*/
      ctx[2]
    ),
    hidde: (
      /*hidde*/
      ctx[1]
    )
  });
  function create_fragment4(ctx) {
    let div;
    let div_class_value;
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[4].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[3],
      get_default_slot_context
    );
    return {
      c() {
        div = element("div");
        if (default_slot)
          default_slot.c();
        attr(div, "class", div_class_value = "flex items-center w-full bg-[#D9D9D9] p-5 border-b-[2px] border-b-[#8E9193] " + /*styles*/
        ctx[0]);
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if (default_slot) {
          default_slot.m(div, null);
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope, hidde*/
          10)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[3],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[3]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[3],
                dirty,
                get_default_slot_changes
              ),
              get_default_slot_context
            );
          }
        }
        if (!current || dirty & /*styles*/
        1 && div_class_value !== (div_class_value = "flex items-center w-full bg-[#D9D9D9] p-5 border-b-[2px] border-b-[#8E9193] " + /*styles*/
        ctx2[0])) {
          attr(div, "class", div_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function instance4($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    let { styles = "" } = $$props;
    let hidde = false;
    let toggleHidde = () => $$invalidate(1, hidde = !hidde);
    $$self.$$set = ($$props2) => {
      if ("styles" in $$props2)
        $$invalidate(0, styles = $$props2.styles);
      if ("$$scope" in $$props2)
        $$invalidate(3, $$scope = $$props2.$$scope);
    };
    return [styles, hidde, toggleHidde, $$scope, slots];
  }
  var OptionWrapper = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance4, create_fragment4, safe_not_equal, { styles: 0 });
    }
    get styles() {
      return this.$$.ctx[0];
    }
    set styles(styles) {
      this.$$set({ styles });
      flush();
    }
  };
  create_custom_element(OptionWrapper, { "styles": {} }, ["default"], [], true);
  var OptionWrapper_default = OptionWrapper;

  // src/lib/Switch.svelte
  function create_if_block2(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Points of Interest";
        attr(span, "class", "ms-3 text-sm font-medium text-black select-none");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_fragment5(ctx) {
    let label;
    let input;
    let t0;
    let div;
    let t1;
    let if_block = (
      /*withTitle*/
      ctx[0] && create_if_block2(ctx)
    );
    return {
      c() {
        label = element("label");
        input = element("input");
        t0 = space();
        div = element("div");
        t1 = space();
        if (if_block)
          if_block.c();
        attr(input, "type", "checkbox");
        input.value = "";
        attr(input, "class", "sr-only peer");
        attr(div, "class", "relative w-11 h-6 rounded-full peer bg-[#C9C9C9] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600");
        attr(label, "class", "inline-flex items-center cursor-pointer");
      },
      m(target, anchor) {
        insert(target, label, anchor);
        append(label, input);
        append(label, t0);
        append(label, div);
        append(label, t1);
        if (if_block)
          if_block.m(label, null);
      },
      p(ctx2, [dirty]) {
        if (
          /*withTitle*/
          ctx2[0]
        ) {
          if (if_block) {
          } else {
            if_block = create_if_block2(ctx2);
            if_block.c();
            if_block.m(label, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(label);
        }
        if (if_block)
          if_block.d();
      }
    };
  }
  function instance5($$self, $$props, $$invalidate) {
    let { withTitle = true } = $$props;
    $$self.$$set = ($$props2) => {
      if ("withTitle" in $$props2)
        $$invalidate(0, withTitle = $$props2.withTitle);
    };
    return [withTitle];
  }
  var Switch = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance5, create_fragment5, safe_not_equal, { withTitle: 0 });
    }
    get withTitle() {
      return this.$$.ctx[0];
    }
    set withTitle(withTitle) {
      this.$$set({ withTitle });
      flush();
    }
  };
  create_custom_element(Switch, { "withTitle": { "type": "Boolean" } }, [], [], true);
  var Switch_default = Switch;

  // src/lib/Modal.svelte
  function add_css(target) {
    append_styles(target, "svelte-63lg8b", "dialog.svelte-63lg8b.svelte-63lg8b{width:461px;border-radius:1em;border:none;padding:0;z-index:999}dialog.svelte-63lg8b.svelte-63lg8b::backdrop{background:rgba(0, 0, 0, 0.3)}dialog.svelte-63lg8b>div.svelte-63lg8b{padding:2em}dialog[open].svelte-63lg8b.svelte-63lg8b{animation:svelte-63lg8b-zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)}@keyframes svelte-63lg8b-zoom{from{transform:scale(0.95)}to{transform:scale(1)}}dialog[open].svelte-63lg8b.svelte-63lg8b::backdrop{animation:svelte-63lg8b-fade 0.2s ease-out}@keyframes svelte-63lg8b-fade{from{opacity:0}to{opacity:1}}");
  }
  var get_footer_slot_changes = (dirty) => ({});
  var get_footer_slot_context = (ctx) => ({});
  var get_header_slot_changes = (dirty) => ({});
  var get_header_slot_context = (ctx) => ({});
  function create_fragment6(ctx) {
    let dialog_1;
    let div0;
    let t0;
    let t1;
    let div1;
    let current;
    let mounted;
    let dispose;
    const header_slot_template = (
      /*#slots*/
      ctx[3].header
    );
    const header_slot = create_slot(
      header_slot_template,
      ctx,
      /*$$scope*/
      ctx[2],
      get_header_slot_context
    );
    const default_slot_template = (
      /*#slots*/
      ctx[3].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[2],
      null
    );
    const footer_slot_template = (
      /*#slots*/
      ctx[3].footer
    );
    const footer_slot = create_slot(
      footer_slot_template,
      ctx,
      /*$$scope*/
      ctx[2],
      get_footer_slot_context
    );
    return {
      c() {
        dialog_1 = element("dialog");
        div0 = element("div");
        if (header_slot)
          header_slot.c();
        t0 = space();
        if (default_slot)
          default_slot.c();
        t1 = space();
        div1 = element("div");
        if (footer_slot)
          footer_slot.c();
        attr(div0, "class", "svelte-63lg8b");
        attr(div1, "class", "svelte-63lg8b");
        attr(dialog_1, "class", "svelte-63lg8b");
      },
      m(target, anchor) {
        insert(target, dialog_1, anchor);
        append(dialog_1, div0);
        if (header_slot) {
          header_slot.m(div0, null);
        }
        append(div0, t0);
        if (default_slot) {
          default_slot.m(div0, null);
        }
        append(dialog_1, t1);
        append(dialog_1, div1);
        if (footer_slot) {
          footer_slot.m(div1, null);
        }
        ctx[5](dialog_1);
        current = true;
        if (!mounted) {
          dispose = [
            listen(div0, "click", stop_propagation(
              /*click_handler*/
              ctx[4]
            )),
            listen(
              dialog_1,
              "close",
              /*close_handler*/
              ctx[6]
            ),
            listen(dialog_1, "click", self2(
              /*click_handler_1*/
              ctx[7]
            ))
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (header_slot) {
          if (header_slot.p && (!current || dirty & /*$$scope*/
          4)) {
            update_slot_base(
              header_slot,
              header_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[2],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[2]
              ) : get_slot_changes(
                header_slot_template,
                /*$$scope*/
                ctx2[2],
                dirty,
                get_header_slot_changes
              ),
              get_header_slot_context
            );
          }
        }
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          4)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[2],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[2]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[2],
                dirty,
                null
              ),
              null
            );
          }
        }
        if (footer_slot) {
          if (footer_slot.p && (!current || dirty & /*$$scope*/
          4)) {
            update_slot_base(
              footer_slot,
              footer_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[2],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[2]
              ) : get_slot_changes(
                footer_slot_template,
                /*$$scope*/
                ctx2[2],
                dirty,
                get_footer_slot_changes
              ),
              get_footer_slot_context
            );
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(header_slot, local);
        transition_in(default_slot, local);
        transition_in(footer_slot, local);
        current = true;
      },
      o(local) {
        transition_out(header_slot, local);
        transition_out(default_slot, local);
        transition_out(footer_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(dialog_1);
        }
        if (header_slot)
          header_slot.d(detaching);
        if (default_slot)
          default_slot.d(detaching);
        if (footer_slot)
          footer_slot.d(detaching);
        ctx[5](null);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance6($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    let { showModal } = $$props;
    let { dialog } = $$props;
    function click_handler(event) {
      bubble.call(this, $$self, event);
    }
    function dialog_1_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        dialog = $$value;
        $$invalidate(1, dialog);
      });
    }
    const close_handler = () => $$invalidate(0, showModal = false);
    const click_handler_1 = () => {
      dialog.close();
    };
    $$self.$$set = ($$props2) => {
      if ("showModal" in $$props2)
        $$invalidate(0, showModal = $$props2.showModal);
      if ("dialog" in $$props2)
        $$invalidate(1, dialog = $$props2.dialog);
      if ("$$scope" in $$props2)
        $$invalidate(2, $$scope = $$props2.$$scope);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*dialog, showModal*/
      3) {
        $:
          if (dialog && showModal)
            dialog.showModal();
      }
    };
    return [
      showModal,
      dialog,
      $$scope,
      slots,
      click_handler,
      dialog_1_binding,
      close_handler,
      click_handler_1
    ];
  }
  var Modal = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance6, create_fragment6, safe_not_equal, { showModal: 0, dialog: 1 }, add_css);
    }
    get showModal() {
      return this.$$.ctx[0];
    }
    set showModal(showModal) {
      this.$$set({ showModal });
      flush();
    }
    get dialog() {
      return this.$$.ctx[1];
    }
    set dialog(dialog) {
      this.$$set({ dialog });
      flush();
    }
  };
  create_custom_element(Modal, { "showModal": {}, "dialog": {} }, ["header", "default", "footer"], [], true);
  var Modal_default = Modal;

  // src/constants.ts
  var L2 = __toESM(require_leaflet_src(), 1);
  var PARKING = "Parking";
  var DO_NOT_ENTER = "Do Not Enter";
  var STAGING = "Staging";
  var YARD = "Yard";
  var SECURE = "Secure";
  var OTHER = "Other";
  var UNKNOWN = "Unknown";
  var BUILDING_STRUCTURE = "Building/Structure";
  var CODE_PARKING = "parking";
  var CODE_DO_NOT_ENTER = "do_not_enter";
  var CODE_STAGING = "staging";
  var CODE_YARD = "yard";
  var CODE_SECURE = "secure";
  var CODE_OTHER = "other";
  var CODE_UNKNOWN = "unknown";
  var CODE_BUILDING_STRUCTURE = "building_structure";
  var AREA_COLORS = [
    {
      name: BUILDING_STRUCTURE,
      type: CODE_BUILDING_STRUCTURE,
      border: "#232731",
      fill: "rgba(35,39,49,0.76)"
    },
    {
      name: DO_NOT_ENTER,
      type: CODE_DO_NOT_ENTER,
      border: "#e71d25",
      fill: "rgb(231,29,37,0.35)"
    },
    {
      name: PARKING,
      type: CODE_PARKING,
      border: "#2bb6e9",
      fill: "rgb(43,182,233,0.35)"
    },
    {
      name: SECURE,
      type: CODE_SECURE,
      border: "#73c054",
      fill: "rgb(115,192,84,0.35)"
    },
    {
      name: STAGING,
      type: CODE_STAGING,
      border: "#ead94c",
      fill: "rgb(234,217,76,0.35)"
    },
    {
      name: YARD,
      type: CODE_YARD,
      border: "#ff8300",
      fill: "rgb(255,131,0,0.35)"
    },
    {
      name: OTHER,
      type: CODE_OTHER,
      border: "#7d53de",
      fill: "rgb(125,83,222,0.35)"
    },
    {
      name: UNKNOWN,
      type: CODE_UNKNOWN,
      border: "#7d53de",
      fill: "rgb(125,83,222,0.35)"
    }
  ];
  var AREA_ICONS = {
    building_structure: {
      name: BUILDING_STRUCTURE,
      type: CODE_BUILDING_STRUCTURE,
      border: "#232731",
      fill: "rgba(35,39,49,0.76)"
    },
    do_not_enter: {
      name: DO_NOT_ENTER,
      type: CODE_DO_NOT_ENTER,
      border: "#e71d25",
      fill: "rgb(231,29,37,0.35)"
    },
    parking: {
      name: PARKING,
      type: CODE_PARKING,
      border: "#2bb6e9",
      fill: "rgb(43,182,233,0.35)"
    },
    secure: {
      name: SECURE,
      type: CODE_SECURE,
      border: "#73c054",
      fill: "rgb(115,192,84,0.35)"
    },
    staging: {
      name: STAGING,
      type: CODE_STAGING,
      border: "#ead94c",
      fill: "rgb(234,217,76,0.35)"
    },
    yard: {
      name: YARD,
      type: CODE_YARD,
      border: "#ff8300",
      fill: "rgb(255,131,0,0.35)"
    },
    other: {
      name: OTHER,
      type: CODE_OTHER,
      border: "#7d53de",
      fill: "rgb(125,83,222,0.35)"
    }
  };
  var AREA_STYLES = {
    yard: AREA_COLORS[5],
    parking: AREA_COLORS[2],
    other: AREA_COLORS[6],
    staging: AREA_COLORS[4],
    secure: AREA_COLORS[3],
    do_no_enter: AREA_COLORS[1],
    building_structure: AREA_COLORS[0]
  };
  var icons = {
    marker_types: {
      accident: {
        name: "Accident",
        code: "accident",
        marker_url: "https://cdn.dock411.com/0000/brands/accident/marker-accident.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: true
      },
      big_box: {
        name: "Big Box",
        code: "big_box",
        marker_url: "https://cdn.dock411.com/0000/brands/big_box/marker-big_box.svg",
        type: "point",
        multiple: true,
        is_facility_property: false,
        is_hazard: false
      },
      dealer: {
        name: "Dealer",
        code: "dealer",
        marker_url: "https://cdn.dock411.com/0000/brands/dealer/marker-dealer.svg",
        type: "point",
        multiple: true,
        is_facility_property: false,
        is_hazard: false
      },
      debris: {
        name: "Debris",
        code: "debris",
        marker_url: "https://cdn.dock411.com/0000/brands/debris/marker-debris.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: true
      },
      dock: {
        name: "Dock",
        code: "dock",
        marker_url: "https://cdn.dock411.com/0000/brands/dock/marker-dock.svg",
        type: "point",
        multiple: false,
        is_facility_property: true,
        is_hazard: false
      },
      security_hut: {
        name: "Driver Welcome Center",
        code: "security_hut",
        marker_url: "https://cdn.dock411.com/0000/brands/security_control/marker-security_control.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: false
      },
      fuel: {
        name: "Fuel",
        code: "fuel",
        marker_url: "https://cdn.dock411.com/0000/brands/fuel/marker-fuel.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: false
      },
      low_clearance: {
        name: "Low Clearance",
        code: "low_clearance",
        marker_url: "https://cdn.dock411.com/0000/brands/low_clearance/marker-low_clearance.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: true
      },
      low_wires: {
        name: "Low Wires",
        code: "low_wires",
        marker_url: "https://cdn.dock411.com/0000/brands/low_wires/marker-low_wires.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: true
      },
      maintenance: {
        name: "Maintenance",
        code: "maintenance",
        marker_url: "https://cdn.dock411.com/0000/brands/maintenance/marker-maintenance.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: false
      },
      man_door: {
        name: "Man Door",
        code: "man_door",
        marker_url: "https://cdn.dock411.com/0000/brands/man_door/marker-man_door.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: false
      },
      other: {
        name: "Other Hazard",
        code: "other",
        marker_url: "https://cdn.dock411.com/0000/brands/hazard/marker-hazard.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: true
      },
      parking: {
        name: "Parking",
        code: "parking",
        marker_url: "https://cdn.dock411.com/0000/brands/parking/marker-parking.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: false
      },
      parking_location: {
        name: "Parking Location",
        code: "parking_location",
        marker_url: "https://cdn.dock411.com/0000/brands/parking_location/marker-parking_location.svg",
        type: "point",
        multiple: true,
        is_facility_property: false,
        is_hazard: false
      },
      pothole: {
        name: "Pothole",
        code: "pothole",
        marker_url: "https://cdn.dock411.com/0000/brands/pothole/marker-pothole.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: true
      },
      rest_area: {
        name: "Rest Area",
        code: "rest_area",
        marker_url: "https://cdn.dock411.com/0000/brands/rest_area/marker-rest_area.svg",
        type: "point",
        multiple: true,
        is_facility_property: false,
        is_hazard: false
      },
      restaurant: {
        name: "Restaurant",
        code: "restaurant",
        marker_url: "https://cdn.dock411.com/0000/brands/restaurant/marker-restaurant.svg",
        type: "point",
        multiple: true,
        is_facility_property: false,
        is_hazard: false
      },
      restrooms: {
        name: "Restrooms",
        code: "restrooms",
        marker_url: "https://cdn.dock411.com/0000/brands/restrooms/marker-restrooms.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: false
      },
      scale: {
        name: "Scale",
        code: "scale",
        marker_url: "https://cdn.dock411.com/0000/brands/scale/marker-scale.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: false
      },
      staging_area: {
        name: "Staging Area",
        code: "staging_area",
        marker_url: "https://cdn.dock411.com/0000/brands/staging_area/marker-staging_area.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: false
      },
      sweepout: {
        name: "Sweepout",
        code: "sweepout",
        marker_url: "https://cdn.dock411.com/0000/brands/sweepout/marker-sweepout.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: false
      },
      tight_turn: {
        name: "Tight Turn",
        code: "tight_turn",
        marker_url: "https://cdn.dock411.com/0000/brands/tight_turn/marker-tight_turn.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: true
      },
      truck_stop: {
        name: "Truck Stop",
        code: "truck_stop",
        marker_url: "https://cdn.dock411.com/0000/brands/truck_stop/marker-truck_stop.svg",
        type: "point",
        multiple: true,
        is_facility_property: false,
        is_hazard: false
      },
      unknown: {
        name: "Unknown",
        code: "unknown",
        marker_url: "https://cdn.dock411.com/0000/brands/unknown/marker-unknown.svg",
        type: "point",
        multiple: true,
        is_facility_property: false,
        is_hazard: false
      },
      wash: {
        name: "Wash",
        code: "wash",
        marker_url: "https://cdn.dock411.com/0000/brands/wash/marker-wash.svg",
        type: "point",
        multiple: true,
        is_facility_property: false,
        is_hazard: false
      },
      washout: {
        name: "Washout",
        code: "washout",
        marker_url: "https://cdn.dock411.com/0000/brands/washout/marker-washout.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: false
      },
      weigh_station: {
        name: "Weigh Station",
        code: "weigh_station",
        marker_url: "https://cdn.dock411.com/0000/brands/weigh_station/marker-weigh_station.svg",
        type: "point",
        multiple: true,
        is_facility_property: false,
        is_hazard: false
      },
      work_zone: {
        name: "Work Zone",
        code: "work_zone",
        marker_url: "https://cdn.dock411.com/0000/brands/work_zone/marker-work_zone.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: true
      },
      yard_entrance: {
        name: "Yard Entrance",
        code: "yard_entrance",
        marker_url: "https://cdn.dock411.com/0000/brands/yard_entrance/marker-yard_entrance.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: false
      },
      do_not_enter: {
        name: "Do Not Enter",
        code: "do_not_enter",
        marker_url: "https://cdn.dock411.com/0000/brands/do_not_enter/marker-do_not_enter.svg",
        type: "point",
        multiple: true,
        is_facility_property: true,
        is_hazard: false
      }
    }
  };
  var formatIconHover = (text2) => text2.split("_").map((el) => el[0].toUpperCase() + el.slice(1)).join(" ");
  var setMarkerIconProperties = (icon2) => {
    return L2.icon({
      iconUrl: icon2.marker_url,
      iconAnchor: [0, 60],
      iconSize: [38, 95]
      // size of the icon
      /*shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor*/
    });
  };

  // src/lib/TrayMarkerWrapper.svelte
  function create_fragment7(ctx) {
    let div;
    let current;
    let mounted;
    let dispose;
    const default_slot_template = (
      /*#slots*/
      ctx[1].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[0],
      null
    );
    return {
      c() {
        div = element("div");
        if (default_slot)
          default_slot.c();
        attr(div, "class", "flex items-center justify-start flex-column rounded m-1 w-[180px] cursor-pointer");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if (default_slot) {
          default_slot.m(div, null);
        }
        current = true;
        if (!mounted) {
          dispose = listen(
            div,
            "click",
            /*click_handler*/
            ctx[2]
          );
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          1)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[0],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[0]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[0],
                dirty,
                null
              ),
              null
            );
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (default_slot)
          default_slot.d(detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function instance7($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    function click_handler(event) {
      bubble.call(this, $$self, event);
    }
    $$self.$$set = ($$props2) => {
      if ("$$scope" in $$props2)
        $$invalidate(0, $$scope = $$props2.$$scope);
    };
    return [$$scope, slots, click_handler];
  }
  var TrayMarkerWrapper = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance7, create_fragment7, safe_not_equal, {});
    }
  };
  create_custom_element(TrayMarkerWrapper, {}, ["default"], [], true);
  var TrayMarkerWrapper_default = TrayMarkerWrapper;

  // src/lib/D411MarkersTray.svelte
  var import_leaflet2 = __toESM(require_leaflet_src());
  function add_css2(target) {
    append_styles(target, "svelte-12cpqzg", ".drawer-img-icon.svelte-12cpqzg{font-size:1.75em;vertical-align:middle;width:35px;height:27px;cursor:pointer;margin:4px}.drawer-container.svelte-12cpqzg{position:absolute;top:250px;left:220px;color:white;z-index:900;width:250px}.d411-marker-drawer-container.svelte-12cpqzg{position:relative;background:white;padding-top:10px;padding-bottom:10px;box-shadow:0 19px 38px rgba(0, 0, 0, 0.60), 0 15px 12px rgba(0, 0, 0, 0.55);margin-left:35px;border-radius:3px;border:1px solid #686868;margin-top:-100px}");
  }
  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[15] = list[i];
    return child_ctx;
  }
  function get_each_context_1(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[18] = list[i];
    return child_ctx;
  }
  function get_each_context_2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[15] = list[i];
    return child_ctx;
  }
  function create_if_block_6(ctx) {
    let div;
    let current;
    let if_block = (
      /*type*/
      ctx[4] === "on-site-features" && create_if_block_7(ctx)
    );
    return {
      c() {
        div = element("div");
        if (if_block)
          if_block.c();
        attr(div, "class", "d411-marker-drawer-container p-1 svelte-12cpqzg");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if (if_block)
          if_block.m(div, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*type*/
          ctx2[4] === "on-site-features"
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*type*/
            16) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_7(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(div, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (if_block)
          if_block.d();
      }
    };
  }
  function create_if_block_7(ctx) {
    let div0;
    let t1;
    let div1;
    let current;
    let each_value_2 = ensure_array_like(Object.entries(icons.marker_types));
    let each_blocks = [];
    for (let i = 0; i < each_value_2.length; i += 1) {
      each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        div0 = element("div");
        div0.innerHTML = `<p class="pl-1 pb-1 text-sm text-black font-semibold">On Site Features and Places</p>`;
        t1 = space();
        div1 = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
      },
      m(target, anchor) {
        insert(target, div0, anchor);
        insert(target, t1, anchor);
        insert(target, div1, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(div1, null);
          }
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*updateClickedLayerInformation, Object, toggleVisible_markers, onMarkerClick*/
        896) {
          each_value_2 = ensure_array_like(Object.entries(icons.marker_types));
          let i;
          for (i = 0; i < each_value_2.length; i += 1) {
            const child_ctx = get_each_context_2(ctx2, each_value_2, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_2(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(div1, null);
            }
          }
          group_outros();
          for (i = each_value_2.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_2.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div0);
          detach(t1);
          detach(div1);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_if_block_8(ctx) {
    let traymarkerwrapper;
    let current;
    function click_handler(...args) {
      return (
        /*click_handler*/
        ctx[12](
          /*marker*/
          ctx[15],
          ...args
        )
      );
    }
    traymarkerwrapper = new TrayMarkerWrapper_default({
      props: {
        $$slots: { default: [create_default_slot_2] },
        $$scope: { ctx }
      }
    });
    traymarkerwrapper.$on("click", click_handler);
    return {
      c() {
        create_component(traymarkerwrapper.$$.fragment);
      },
      m(target, anchor) {
        mount_component(traymarkerwrapper, target, anchor);
        current = true;
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        const traymarkerwrapper_changes = {};
        if (dirty & /*$$scope*/
        8388608) {
          traymarkerwrapper_changes.$$scope = { dirty, ctx };
        }
        traymarkerwrapper.$set(traymarkerwrapper_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(traymarkerwrapper.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(traymarkerwrapper.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(traymarkerwrapper, detaching);
      }
    };
  }
  function create_default_slot_2(ctx) {
    let img;
    let img_src_value;
    let img_title_value;
    let t0;
    let span;
    let t2;
    return {
      c() {
        img = element("img");
        t0 = space();
        span = element("span");
        span.textContent = `${/*marker*/
        ctx[15][1].name}`;
        t2 = space();
        attr(img, "alt", "Dock411 Map Icon");
        attr(img, "class", "drawer-img-icon mt-[16px] pr-2 w-[25px] h-[20px] ml-[13px] svelte-12cpqzg");
        if (!src_url_equal(img.src, img_src_value = /*marker*/
        ctx[15][1].marker_url))
          attr(img, "src", img_src_value);
        attr(img, "title", img_title_value = formatIconHover(
          /*marker*/
          ctx[15][1].code
        ));
        attr(span, "class", "text-[14px] text-gray-900 pr-3");
      },
      m(target, anchor) {
        insert(target, img, anchor);
        insert(target, t0, anchor);
        insert(target, span, anchor);
        insert(target, t2, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(img);
          detach(t0);
          detach(span);
          detach(t2);
        }
      }
    };
  }
  function create_each_block_2(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*marker*/
      ctx[15][1].is_facility_property && !/*marker*/
      ctx[15][1].is_hazard && create_if_block_8(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*marker*/
          ctx2[15][1].is_facility_property && !/*marker*/
          ctx2[15][1].is_hazard
        )
          if_block.p(ctx2, dirty);
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_3(ctx) {
    let div;
    let current;
    let if_block = (
      /*type*/
      ctx[4] === "areas" && create_if_block_4(ctx)
    );
    return {
      c() {
        div = element("div");
        if (if_block)
          if_block.c();
        attr(div, "class", "d411-marker-drawer-container p-1 svelte-12cpqzg");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if (if_block)
          if_block.m(div, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*type*/
          ctx2[4] === "areas"
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*type*/
            16) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_4(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(div, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (if_block)
          if_block.d();
      }
    };
  }
  function create_if_block_4(ctx) {
    let div0;
    let t1;
    let div1;
    let current;
    let each_value_1 = ensure_array_like(AREA_COLORS);
    let each_blocks = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        div0 = element("div");
        div0.innerHTML = `<p class="pl-1 pb-0 pt-2 text-sm text-black font-semibold">Areas</p>`;
        t1 = space();
        div1 = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
      },
      m(target, anchor) {
        insert(target, div0, anchor);
        insert(target, t1, anchor);
        insert(target, div1, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(div1, null);
          }
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*updateClickedLayerInformation, toggleVisible_areas, initiateAreaDraw*/
        552) {
          each_value_1 = ensure_array_like(AREA_COLORS);
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_1(ctx2, each_value_1, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block_1(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(div1, null);
            }
          }
          group_outros();
          for (i = each_value_1.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value_1.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div0);
          detach(t1);
          detach(div1);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_if_block_5(ctx) {
    let traymarkerwrapper;
    let current;
    function click_handler_1(...args) {
      return (
        /*click_handler_1*/
        ctx[13](
          /*area_color*/
          ctx[18],
          ...args
        )
      );
    }
    traymarkerwrapper = new TrayMarkerWrapper_default({
      props: {
        $$slots: { default: [create_default_slot_1] },
        $$scope: { ctx }
      }
    });
    traymarkerwrapper.$on("click", click_handler_1);
    return {
      c() {
        create_component(traymarkerwrapper.$$.fragment);
      },
      m(target, anchor) {
        mount_component(traymarkerwrapper, target, anchor);
        current = true;
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        const traymarkerwrapper_changes = {};
        if (dirty & /*$$scope*/
        8388608) {
          traymarkerwrapper_changes.$$scope = { dirty, ctx };
        }
        traymarkerwrapper.$set(traymarkerwrapper_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(traymarkerwrapper.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(traymarkerwrapper.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(traymarkerwrapper, detaching);
      }
    };
  }
  function create_default_slot_1(ctx) {
    let img;
    let img_src_value;
    let t0;
    let span;
    let t2;
    return {
      c() {
        img = element("img");
        t0 = space();
        span = element("span");
        span.textContent = `${/*area_color*/
        ctx[18].name}`;
        t2 = space();
        attr(img, "alt", "area color");
        attr(img, "class", "mt-[10px] pr-2 w-[25px] h-[20px] ml-[10px]");
        if (!src_url_equal(img.src, img_src_value = `https://cdn-test.dock411.com/0000/brands/area/icon-area-${/*area_color*/
        ctx[18].type}.png`))
          attr(img, "src", img_src_value);
        set_style(
          img,
          "color",
          /*area_color*/
          ctx[18].fill
        );
        set_style(
          img,
          "border",
          /*area_color*/
          ctx[18].border
        );
        attr(span, "class", "mt-[10px] ml-[2px] text-[14px] text-gray-900 pr-3 ");
      },
      m(target, anchor) {
        insert(target, img, anchor);
        insert(target, t0, anchor);
        insert(target, span, anchor);
        insert(target, t2, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(img);
          detach(t0);
          detach(span);
          detach(t2);
        }
      }
    };
  }
  function create_each_block_1(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*area_color*/
      ctx[18].name != "Unknown" && create_if_block_5(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*area_color*/
          ctx2[18].name != "Unknown"
        )
          if_block.p(ctx2, dirty);
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block3(ctx) {
    let div;
    let current;
    let if_block = (
      /*type*/
      ctx[4] === "hazards" && create_if_block_1(ctx)
    );
    return {
      c() {
        div = element("div");
        if (if_block)
          if_block.c();
        attr(div, "class", "d411-marker-drawer-container p-1 svelte-12cpqzg");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if (if_block)
          if_block.m(div, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*type*/
          ctx2[4] === "hazards"
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*type*/
            16) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_1(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(div, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (if_block)
          if_block.d();
      }
    };
  }
  function create_if_block_1(ctx) {
    let div0;
    let t1;
    let div1;
    let current;
    let each_value = ensure_array_like(Object.entries(icons.marker_types));
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        div0 = element("div");
        div0.innerHTML = `<p class="pl-1 pb-1 pt-2 text-sm text-black font-semibold">Hazards</p>`;
        t1 = space();
        div1 = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
      },
      m(target, anchor) {
        insert(target, div0, anchor);
        insert(target, t1, anchor);
        insert(target, div1, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(div1, null);
          }
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*updateClickedLayerInformation, Object, toggleVisible_hazards, onMarkerClick*/
        832) {
          each_value = ensure_array_like(Object.entries(icons.marker_types));
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(div1, null);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div0);
          detach(t1);
          detach(div1);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_if_block_2(ctx) {
    let traymarkerwrapper;
    let current;
    function click_handler_2(...args) {
      return (
        /*click_handler_2*/
        ctx[14](
          /*marker*/
          ctx[15],
          ...args
        )
      );
    }
    traymarkerwrapper = new TrayMarkerWrapper_default({
      props: {
        $$slots: { default: [create_default_slot] },
        $$scope: { ctx }
      }
    });
    traymarkerwrapper.$on("click", click_handler_2);
    return {
      c() {
        create_component(traymarkerwrapper.$$.fragment);
      },
      m(target, anchor) {
        mount_component(traymarkerwrapper, target, anchor);
        current = true;
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        const traymarkerwrapper_changes = {};
        if (dirty & /*$$scope*/
        8388608) {
          traymarkerwrapper_changes.$$scope = { dirty, ctx };
        }
        traymarkerwrapper.$set(traymarkerwrapper_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(traymarkerwrapper.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(traymarkerwrapper.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(traymarkerwrapper, detaching);
      }
    };
  }
  function create_default_slot(ctx) {
    let img;
    let img_src_value;
    let img_title_value;
    let t0;
    let span;
    let t2;
    return {
      c() {
        img = element("img");
        t0 = space();
        span = element("span");
        span.textContent = `${/*marker*/
        ctx[15][1].name}`;
        t2 = space();
        attr(img, "alt", "Dock411 Map Icon");
        attr(img, "class", "drawer-img-icon mt-[16px] pr-2 w-[25px] h-[20px] ml-[13px] svelte-12cpqzg");
        if (!src_url_equal(img.src, img_src_value = /*marker*/
        ctx[15][1].marker_url))
          attr(img, "src", img_src_value);
        attr(img, "title", img_title_value = formatIconHover(
          /*marker*/
          ctx[15][1].code
        ));
        attr(span, "class", "text-[14px] text-gray-900 pr-3");
      },
      m(target, anchor) {
        insert(target, img, anchor);
        insert(target, t0, anchor);
        insert(target, span, anchor);
        insert(target, t2, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(img);
          detach(t0);
          detach(span);
          detach(t2);
        }
      }
    };
  }
  function create_each_block(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*marker*/
      ctx[15][1].is_hazard && create_if_block_2(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*marker*/
          ctx2[15][1].is_hazard
        )
          if_block.p(ctx2, dirty);
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_fragment8(ctx) {
    let div;
    let t0;
    let t1;
    let current;
    let if_block0 = (
      /*visible_markers*/
      ctx[2] === true && create_if_block_6(ctx)
    );
    let if_block1 = (
      /*visible_areas*/
      ctx[0] === true && create_if_block_3(ctx)
    );
    let if_block2 = (
      /*visible_hazards*/
      ctx[1] === true && create_if_block3(ctx)
    );
    return {
      c() {
        div = element("div");
        if (if_block0)
          if_block0.c();
        t0 = space();
        if (if_block1)
          if_block1.c();
        t1 = space();
        if (if_block2)
          if_block2.c();
        attr(div, "class", "drawer-container svelte-12cpqzg");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if (if_block0)
          if_block0.m(div, null);
        append(div, t0);
        if (if_block1)
          if_block1.m(div, null);
        append(div, t1);
        if (if_block2)
          if_block2.m(div, null);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*visible_markers*/
          ctx2[2] === true
        ) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
            if (dirty & /*visible_markers*/
            4) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_6(ctx2);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(div, t0);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, () => {
            if_block0 = null;
          });
          check_outros();
        }
        if (
          /*visible_areas*/
          ctx2[0] === true
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
            if (dirty & /*visible_areas*/
            1) {
              transition_in(if_block1, 1);
            }
          } else {
            if_block1 = create_if_block_3(ctx2);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(div, t1);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, () => {
            if_block1 = null;
          });
          check_outros();
        }
        if (
          /*visible_hazards*/
          ctx2[1] === true
        ) {
          if (if_block2) {
            if_block2.p(ctx2, dirty);
            if (dirty & /*visible_hazards*/
            2) {
              transition_in(if_block2, 1);
            }
          } else {
            if_block2 = create_if_block3(ctx2);
            if_block2.c();
            transition_in(if_block2, 1);
            if_block2.m(div, null);
          }
        } else if (if_block2) {
          group_outros();
          transition_out(if_block2, 1, 1, () => {
            if_block2 = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block0);
        transition_in(if_block1);
        transition_in(if_block2);
        current = true;
      },
      o(local) {
        transition_out(if_block0);
        transition_out(if_block1);
        transition_out(if_block2);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (if_block0)
          if_block0.d();
        if (if_block1)
          if_block1.d();
        if (if_block2)
          if_block2.d();
      }
    };
  }
  function instance8($$self, $$props, $$invalidate) {
    let { clicked_layer_information } = $$props;
    let { icon: icon2 } = $$props;
    let { visible_areas } = $$props;
    let { visible_hazards } = $$props;
    let { visible_markers } = $$props;
    let { initiateAreaDraw } = $$props;
    let { type: type2 = "on-site-features" } = $$props;
    let { toggleVisible_areas = () => {
      $$invalidate(0, visible_areas = !visible_areas);
    } } = $$props;
    let { toggleVisible_hazards = () => {
      $$invalidate(1, visible_hazards = !visible_hazards);
    } } = $$props;
    let { toggleVisible_markers = () => {
      $$invalidate(2, visible_markers = !visible_markers);
    } } = $$props;
    let onMarkerClick = (icon_in) => {
      $$invalidate(11, icon2 = icon_in);
    };
    let updateClickedLayerInformation = (e) => {
      if (e.type === "point") {
        $$invalidate(10, clicked_layer_information.name = e.name, clicked_layer_information);
        $$invalidate(10, clicked_layer_information.type = e.code, clicked_layer_information);
        $$invalidate(10, clicked_layer_information.code = e.code, clicked_layer_information);
        $$invalidate(10, clicked_layer_information.is_hazard = e.is_hazard, clicked_layer_information);
        $$invalidate(10, clicked_layer_information.marker_url = e.marker_url, clicked_layer_information);
        $$invalidate(10, clicked_layer_information.layer_type = "marker", clicked_layer_information);
        $$invalidate(10, clicked_layer_information.is_facility_property = e.is_facility_property, clicked_layer_information);
      } else {
        $$invalidate(10, clicked_layer_information.border = e.border, clicked_layer_information);
        $$invalidate(10, clicked_layer_information.fill = e.fill, clicked_layer_information);
        $$invalidate(10, clicked_layer_information.name = e.name, clicked_layer_information);
        $$invalidate(10, clicked_layer_information.type = e.type, clicked_layer_information);
        $$invalidate(10, clicked_layer_information.layer_type = "polygon", clicked_layer_information);
        $$invalidate(10, clicked_layer_information.code = e.code, clicked_layer_information);
      }
    };
    const click_handler = (marker, e) => {
      updateClickedLayerInformation(marker[1]);
      toggleVisible_markers();
      onMarkerClick(marker[1]);
    };
    const click_handler_1 = (area_color, e) => {
      updateClickedLayerInformation(area_color);
      e.stopPropagation();
      toggleVisible_areas();
      initiateAreaDraw();
    };
    const click_handler_2 = (marker, e) => {
      updateClickedLayerInformation(marker[1]);
      e.stopPropagation();
      toggleVisible_hazards();
      onMarkerClick(marker[1]);
    };
    $$self.$$set = ($$props2) => {
      if ("clicked_layer_information" in $$props2)
        $$invalidate(10, clicked_layer_information = $$props2.clicked_layer_information);
      if ("icon" in $$props2)
        $$invalidate(11, icon2 = $$props2.icon);
      if ("visible_areas" in $$props2)
        $$invalidate(0, visible_areas = $$props2.visible_areas);
      if ("visible_hazards" in $$props2)
        $$invalidate(1, visible_hazards = $$props2.visible_hazards);
      if ("visible_markers" in $$props2)
        $$invalidate(2, visible_markers = $$props2.visible_markers);
      if ("initiateAreaDraw" in $$props2)
        $$invalidate(3, initiateAreaDraw = $$props2.initiateAreaDraw);
      if ("type" in $$props2)
        $$invalidate(4, type2 = $$props2.type);
      if ("toggleVisible_areas" in $$props2)
        $$invalidate(5, toggleVisible_areas = $$props2.toggleVisible_areas);
      if ("toggleVisible_hazards" in $$props2)
        $$invalidate(6, toggleVisible_hazards = $$props2.toggleVisible_hazards);
      if ("toggleVisible_markers" in $$props2)
        $$invalidate(7, toggleVisible_markers = $$props2.toggleVisible_markers);
    };
    return [
      visible_areas,
      visible_hazards,
      visible_markers,
      initiateAreaDraw,
      type2,
      toggleVisible_areas,
      toggleVisible_hazards,
      toggleVisible_markers,
      onMarkerClick,
      updateClickedLayerInformation,
      clicked_layer_information,
      icon2,
      click_handler,
      click_handler_1,
      click_handler_2
    ];
  }
  var D411MarkersTray = class extends SvelteComponent {
    constructor(options) {
      super();
      init(
        this,
        options,
        instance8,
        create_fragment8,
        safe_not_equal,
        {
          clicked_layer_information: 10,
          icon: 11,
          visible_areas: 0,
          visible_hazards: 1,
          visible_markers: 2,
          initiateAreaDraw: 3,
          type: 4,
          toggleVisible_areas: 5,
          toggleVisible_hazards: 6,
          toggleVisible_markers: 7
        },
        add_css2
      );
    }
    get clicked_layer_information() {
      return this.$$.ctx[10];
    }
    set clicked_layer_information(clicked_layer_information) {
      this.$$set({ clicked_layer_information });
      flush();
    }
    get icon() {
      return this.$$.ctx[11];
    }
    set icon(icon2) {
      this.$$set({ icon: icon2 });
      flush();
    }
    get visible_areas() {
      return this.$$.ctx[0];
    }
    set visible_areas(visible_areas) {
      this.$$set({ visible_areas });
      flush();
    }
    get visible_hazards() {
      return this.$$.ctx[1];
    }
    set visible_hazards(visible_hazards) {
      this.$$set({ visible_hazards });
      flush();
    }
    get visible_markers() {
      return this.$$.ctx[2];
    }
    set visible_markers(visible_markers) {
      this.$$set({ visible_markers });
      flush();
    }
    get initiateAreaDraw() {
      return this.$$.ctx[3];
    }
    set initiateAreaDraw(initiateAreaDraw) {
      this.$$set({ initiateAreaDraw });
      flush();
    }
    get type() {
      return this.$$.ctx[4];
    }
    set type(type2) {
      this.$$set({ type: type2 });
      flush();
    }
    get toggleVisible_areas() {
      return this.$$.ctx[5];
    }
    set toggleVisible_areas(toggleVisible_areas) {
      this.$$set({ toggleVisible_areas });
      flush();
    }
    get toggleVisible_hazards() {
      return this.$$.ctx[6];
    }
    set toggleVisible_hazards(toggleVisible_hazards) {
      this.$$set({ toggleVisible_hazards });
      flush();
    }
    get toggleVisible_markers() {
      return this.$$.ctx[7];
    }
    set toggleVisible_markers(toggleVisible_markers) {
      this.$$set({ toggleVisible_markers });
      flush();
    }
  };
  create_custom_element(D411MarkersTray, { "clicked_layer_information": {}, "icon": {}, "visible_areas": {}, "visible_hazards": {}, "visible_markers": {}, "initiateAreaDraw": {}, "type": {}, "toggleVisible_areas": {}, "toggleVisible_hazards": {}, "toggleVisible_markers": {} }, [], [], true);
  var D411MarkersTray_default = D411MarkersTray;

  // src/lib/buttons/ModalButton.svelte
  function create_fragment9(ctx) {
    let button;
    let button_class_value;
    let current;
    let mounted;
    let dispose;
    const default_slot_template = (
      /*#slots*/
      ctx[4].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[3],
      null
    );
    let button_levels = [
      { disabled: (
        /*disabled*/
        ctx[0]
      ) },
      {
        class: button_class_value = `h-[58px] w-[198px] text-[20px] flex items-center
appearance-none leading-[22px]
flex items-center justify-center
rounded-[12px] cursor-pointer m-0
hover:shadow-[0_4px_8px_-3px_rgba(0,0,0,0.3)] decoration-[#fff] visited:text-[white] w-fit ${/*styles*/
        ctx[1]}`
      },
      /*buttonProps*/
      ctx[2]
    ];
    let button_data = {};
    for (let i = 0; i < button_levels.length; i += 1) {
      button_data = assign(button_data, button_levels[i]);
    }
    return {
      c() {
        button = element("button");
        if (default_slot)
          default_slot.c();
        set_attributes(button, button_data);
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (default_slot) {
          default_slot.m(button, null);
        }
        if (button.autofocus)
          button.focus();
        current = true;
        if (!mounted) {
          dispose = [
            listen(
              button,
              "click",
              /*click_handler*/
              ctx[5]
            ),
            listen(
              button,
              "mouseover",
              /*mouseover_handler*/
              ctx[6]
            ),
            listen(
              button,
              "mouseenter",
              /*mouseenter_handler*/
              ctx[7]
            ),
            listen(
              button,
              "mouseleave",
              /*mouseleave_handler*/
              ctx[8]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          8)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[3],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[3]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[3],
                dirty,
                null
              ),
              null
            );
          }
        }
        set_attributes(button, button_data = get_spread_update(button_levels, [
          (!current || dirty & /*disabled*/
          1) && { disabled: (
            /*disabled*/
            ctx2[0]
          ) },
          (!current || dirty & /*styles*/
          2 && button_class_value !== (button_class_value = `h-[58px] w-[198px] text-[20px] flex items-center
appearance-none leading-[22px]
flex items-center justify-center
rounded-[12px] cursor-pointer m-0
hover:shadow-[0_4px_8px_-3px_rgba(0,0,0,0.3)] decoration-[#fff] visited:text-[white] w-fit ${/*styles*/
          ctx2[1]}`)) && { class: button_class_value },
          /*buttonProps*/
          ctx2[2]
        ]));
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(button);
        }
        if (default_slot)
          default_slot.d(detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance9($$self, $$props, $$invalidate) {
    const omit_props_names = ["disabled", "styles"];
    let $$restProps = compute_rest_props($$props, omit_props_names);
    let { $$slots: slots = {}, $$scope } = $$props;
    let buttonProps = {};
    let anchorProps = { target: [$$restProps.target] };
    let { disabled = false } = $$props;
    let { styles } = $$props;
    function click_handler(event) {
      bubble.call(this, $$self, event);
    }
    function mouseover_handler(event) {
      bubble.call(this, $$self, event);
    }
    function mouseenter_handler(event) {
      bubble.call(this, $$self, event);
    }
    function mouseleave_handler(event) {
      bubble.call(this, $$self, event);
    }
    $$self.$$set = ($$new_props) => {
      $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
      $$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
      if ("disabled" in $$new_props)
        $$invalidate(0, disabled = $$new_props.disabled);
      if ("styles" in $$new_props)
        $$invalidate(1, styles = $$new_props.styles);
      if ("$$scope" in $$new_props)
        $$invalidate(3, $$scope = $$new_props.$$scope);
    };
    return [
      disabled,
      styles,
      buttonProps,
      $$scope,
      slots,
      click_handler,
      mouseover_handler,
      mouseenter_handler,
      mouseleave_handler
    ];
  }
  var ModalButton = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance9, create_fragment9, safe_not_equal, { disabled: 0, styles: 1 });
    }
    get disabled() {
      return this.$$.ctx[0];
    }
    set disabled(disabled) {
      this.$$set({ disabled });
      flush();
    }
    get styles() {
      return this.$$.ctx[1];
    }
    set styles(styles) {
      this.$$set({ styles });
      flush();
    }
  };
  create_custom_element(ModalButton, { "disabled": { "type": "Boolean" }, "styles": {} }, ["default"], [], true);
  var ModalButton_default = ModalButton;

  // src/lib/utilities/utilities.ts
  var copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  var isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  // src/components/D411FacilityMap.svelte
  function add_css3(target) {
    append_styles(target, "svelte-1gn7q08", "#map.svelte-1gn7q08{height:100vh;width:100vw;background-color:gray\n  }.text-input.svelte-1gn7q08{font-size:20px;border-radius:0.375rem;padding-left:3px;width:260px;margin-left:-8.5rem;&:focus {\n      border-width: 1px;\n      border-color: #ff8300;\n      outline: none;\n      padding-left: 5px;\n      margin-left: -8.9rem;\n      outline-style: solid;\n      outline-width: 1px;\n      box-shadow: none;\n    };&:disabled {\n      background-color: transparent;\n    }}.hazard_input.svelte-1gn7q08,.area_input.svelte-1gn7q08,.marker_input.svelte-1gn7q08{position:fixed;opacity:0;pointer-events:none}.label-toolbar.svelte-1gn7q08:has(.hazard_input:checked){background-color:lightgray;border-radius:25px;border:2px solid deepskyblue;width:200px;margin-left:-3.5px;padding-top:2px;padding-left:1.5px}.label-toolbar.svelte-1gn7q08:has(.area_input:checked){background-color:lightgray;border-radius:25px;border:2px solid deepskyblue;padding:7px;width:200px;margin:-8.5px}.label-toolbar.svelte-1gn7q08:has(.marker_input:checked){background-color:lightgray;border-radius:25px;border:2px solid deepskyblue;padding-left:2px;width:240px;//margin:-3.5px;margin-left:-3.5px;padding-top:1px}.area-container.svelte-1gn7q08{display:flex;justify-content:space-around;margin-top:2px;padding-top:-1px;margin-bottom:10px}.side-bar-name.svelte-1gn7q08{display:flex;font-size:15px;justify-content:flex-start;margin-right:auto;margin-top:2px;max-width:130px;word-break:normal;word-wrap:break-word;margin-left:1px;text-align:left}.side-bar-icon.svelte-1gn7q08{display:flex;margin-left:11px}.side-menu.svelte-1gn7q08{overflow-y:auto;max-height:990px}.background-add-new-button.svelte-1gn7q08{background-color:#686868;width:16px;height:19px;margin-top:-23px;margin-left:3.5px}.add-new-button.svelte-1gn7q08{margin-left:-1px;margin-top:4px}.facility-header.svelte-1gn7q08{width:100%;top:0px;position:sticky\n  }.close-button.svelte-1gn7q08{width:17px;height:22px;margin-top:-25px}");
  }
  function get_each_context2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[107] = list[i];
    return child_ctx;
  }
  function get_each_context_12(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[110] = list[i];
    return child_ctx;
  }
  function get_each_context_22(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[110] = list[i];
    return child_ctx;
  }
  function get_each_context_3(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[117] = list[i];
    return child_ctx;
  }
  function get_each_context_4(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[110] = list[i];
    return child_ctx;
  }
  function get_each_context_5(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[110] = list[i];
    return child_ctx;
  }
  function get_each_context_6(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[124] = list[i];
    return child_ctx;
  }
  function create_else_block2(ctx) {
    let div;
    let button;
    let t0;
    let optionwrapper0;
    let t1;
    let optionwrapper1;
    let t2;
    let optionwrapper2;
    let t3;
    let optionwrapper3;
    let t4;
    let optionwrapper4;
    let current;
    let mounted;
    let dispose;
    optionwrapper0 = new OptionWrapper_default({
      props: {
        styles: "justify-center",
        style: "padding: 16px;",
        $$slots: { default: [create_default_slot_13] },
        $$scope: { ctx }
      }
    });
    optionwrapper1 = new OptionWrapper_default({
      props: {
        styles: "justify-center",
        style: "padding: 16px;",
        $$slots: { default: [create_default_slot_12] },
        $$scope: { ctx }
      }
    });
    optionwrapper2 = new OptionWrapper_default({
      props: {
        styles: "justify-center",
        style: "padding: 16px;",
        $$slots: { default: [create_default_slot_11] },
        $$scope: { ctx }
      }
    });
    optionwrapper3 = new OptionWrapper_default({
      props: {
        styles: "justify-center",
        style: "padding: 16px;",
        $$slots: { default: [create_default_slot_10] },
        $$scope: { ctx }
      }
    });
    optionwrapper4 = new OptionWrapper_default({
      props: {
        styles: "border-b-[0px]",
        style: "padding: 16px 8px;",
        $$slots: { default: [create_default_slot_9] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        div = element("div");
        button = element("button");
        button.innerHTML = `<img class="w-5 h-7" src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/chevron-right-double.svg" alt="chevron"/>`;
        t0 = space();
        create_component(optionwrapper0.$$.fragment);
        t1 = space();
        create_component(optionwrapper1.$$.fragment);
        t2 = space();
        create_component(optionwrapper2.$$.fragment);
        t3 = space();
        create_component(optionwrapper3.$$.fragment);
        t4 = space();
        create_component(optionwrapper4.$$.fragment);
        attr(button, "class", "flex justify-center w-full p-3 gap-5 bg-white");
        attr(div, "class", "w-[100px] bg-[#D9D9D9] border-r-[2px] border-r-[#C9C9C9]");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, button);
        append(div, t0);
        mount_component(optionwrapper0, div, null);
        append(div, t1);
        mount_component(optionwrapper1, div, null);
        append(div, t2);
        mount_component(optionwrapper2, div, null);
        append(div, t3);
        mount_component(optionwrapper3, div, null);
        append(div, t4);
        mount_component(optionwrapper4, div, null);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*toogleMinimize*/
            ctx[18]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const optionwrapper0_changes = {};
        if (dirty[4] & /*$$scope*/
        8) {
          optionwrapper0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        optionwrapper0.$set(optionwrapper0_changes);
        const optionwrapper1_changes = {};
        if (dirty[4] & /*$$scope*/
        8) {
          optionwrapper1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        optionwrapper1.$set(optionwrapper1_changes);
        const optionwrapper2_changes = {};
        if (dirty[4] & /*$$scope*/
        8) {
          optionwrapper2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        optionwrapper2.$set(optionwrapper2_changes);
        const optionwrapper3_changes = {};
        if (dirty[4] & /*$$scope*/
        8) {
          optionwrapper3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        optionwrapper3.$set(optionwrapper3_changes);
        const optionwrapper4_changes = {};
        if (dirty[4] & /*$$scope*/
        8) {
          optionwrapper4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        optionwrapper4.$set(optionwrapper4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(optionwrapper0.$$.fragment, local);
        transition_in(optionwrapper1.$$.fragment, local);
        transition_in(optionwrapper2.$$.fragment, local);
        transition_in(optionwrapper3.$$.fragment, local);
        transition_in(optionwrapper4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(optionwrapper0.$$.fragment, local);
        transition_out(optionwrapper1.$$.fragment, local);
        transition_out(optionwrapper2.$$.fragment, local);
        transition_out(optionwrapper3.$$.fragment, local);
        transition_out(optionwrapper4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        destroy_component(optionwrapper0);
        destroy_component(optionwrapper1);
        destroy_component(optionwrapper2);
        destroy_component(optionwrapper3);
        destroy_component(optionwrapper4);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_9(ctx) {
    let div;
    let button;
    let t2;
    let optionwrapper0;
    let t3;
    let optionwrapper1;
    let t4;
    let optionwrapper2;
    let t5;
    let optionwrapper3;
    let t6;
    let optionwrapper4;
    let current;
    let mounted;
    let dispose;
    optionwrapper0 = new OptionWrapper_default({
      props: {
        $$slots: {
          default: [
            create_default_slot_8,
            ({ toggleHidde, hidde }) => ({ 115: toggleHidde, 116: hidde }),
            ({ toggleHidde, hidde }) => [0, 0, 0, (toggleHidde ? 4194304 : 0) | (hidde ? 8388608 : 0)]
          ]
        },
        $$scope: { ctx }
      }
    });
    optionwrapper1 = new OptionWrapper_default({
      props: {
        styles: "justify-between",
        $$slots: {
          default: [
            create_default_slot_7,
            ({ toggleHidde, hidde }) => ({ 115: toggleHidde, 116: hidde }),
            ({ toggleHidde, hidde }) => [0, 0, 0, (toggleHidde ? 4194304 : 0) | (hidde ? 8388608 : 0)]
          ]
        },
        $$scope: { ctx }
      }
    });
    optionwrapper2 = new OptionWrapper_default({
      props: {
        $$slots: {
          default: [
            create_default_slot_6,
            ({ toggleHidde, hidde }) => ({ 115: toggleHidde, 116: hidde }),
            ({ toggleHidde, hidde }) => [0, 0, 0, (toggleHidde ? 4194304 : 0) | (hidde ? 8388608 : 0)]
          ]
        },
        $$scope: { ctx }
      }
    });
    optionwrapper3 = new OptionWrapper_default({
      props: {
        $$slots: {
          default: [
            create_default_slot_5,
            ({ toggleHidde, hidde }) => ({ 115: toggleHidde, 116: hidde }),
            ({ toggleHidde, hidde }) => [0, 0, 0, (toggleHidde ? 4194304 : 0) | (hidde ? 8388608 : 0)]
          ]
        },
        $$scope: { ctx }
      }
    });
    optionwrapper4 = new OptionWrapper_default({
      props: {
        styles: "border-b-[0px]",
        $$slots: { default: [create_default_slot_4] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        div = element("div");
        button = element("button");
        button.innerHTML = `<img class="w-5 h-7 mt-[-13px]" src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/chevron-right-double.svg" alt="chevron"/> <p class="text-xl font-medium mt-[-13px]">Facility Map</p>`;
        t2 = space();
        create_component(optionwrapper0.$$.fragment);
        t3 = space();
        create_component(optionwrapper1.$$.fragment);
        t4 = space();
        create_component(optionwrapper2.$$.fragment);
        t5 = space();
        create_component(optionwrapper3.$$.fragment);
        t6 = space();
        create_component(optionwrapper4.$$.fragment);
        attr(button, "class", "facility-header flex p-5 gap-5 bg-white w-full h-[10px] svelte-1gn7q08");
        attr(div, "class", "side-menu w-[250px] bg-[#D9D9D9] border-r-[2px] border-r-[#C9C9C9] svelte-1gn7q08");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, button);
        append(div, t2);
        mount_component(optionwrapper0, div, null);
        append(div, t3);
        mount_component(optionwrapper1, div, null);
        append(div, t4);
        mount_component(optionwrapper2, div, null);
        append(div, t5);
        mount_component(optionwrapper3, div, null);
        append(div, t6);
        mount_component(optionwrapper4, div, null);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*toogleMinimize*/
            ctx[18]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        const optionwrapper0_changes = {};
        if (dirty[0] & /*editMode, markersTypeToDisplay, d411FacilityMapData*/
        35 | dirty[3] & /*hidde, toggleHidde*/
        12582912 | dirty[4] & /*$$scope*/
        8) {
          optionwrapper0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        optionwrapper0.$set(optionwrapper0_changes);
        const optionwrapper1_changes = {};
        if (dirty[0] & /*editMode, markersTypeToDisplay, d411FacilityMapData*/
        35 | dirty[3] & /*hidde, toggleHidde*/
        12582912 | dirty[4] & /*$$scope*/
        8) {
          optionwrapper1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        optionwrapper1.$set(optionwrapper1_changes);
        const optionwrapper2_changes = {};
        if (dirty[0] & /*editMode, markersTypeToDisplay, d411FacilityMapData*/
        35 | dirty[3] & /*hidde, toggleHidde*/
        12582912 | dirty[4] & /*$$scope*/
        8) {
          optionwrapper2_changes.$$scope = { dirty, ctx: ctx2 };
        }
        optionwrapper2.$set(optionwrapper2_changes);
        const optionwrapper3_changes = {};
        if (dirty[0] & /*editMode, d411FacilityMapData*/
        3 | dirty[3] & /*hidde, toggleHidde*/
        12582912 | dirty[4] & /*$$scope*/
        8) {
          optionwrapper3_changes.$$scope = { dirty, ctx: ctx2 };
        }
        optionwrapper3.$set(optionwrapper3_changes);
        const optionwrapper4_changes = {};
        if (dirty[4] & /*$$scope*/
        8) {
          optionwrapper4_changes.$$scope = { dirty, ctx: ctx2 };
        }
        optionwrapper4.$set(optionwrapper4_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(optionwrapper0.$$.fragment, local);
        transition_in(optionwrapper1.$$.fragment, local);
        transition_in(optionwrapper2.$$.fragment, local);
        transition_in(optionwrapper3.$$.fragment, local);
        transition_in(optionwrapper4.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(optionwrapper0.$$.fragment, local);
        transition_out(optionwrapper1.$$.fragment, local);
        transition_out(optionwrapper2.$$.fragment, local);
        transition_out(optionwrapper3.$$.fragment, local);
        transition_out(optionwrapper4.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        destroy_component(optionwrapper0);
        destroy_component(optionwrapper1);
        destroy_component(optionwrapper2);
        destroy_component(optionwrapper3);
        destroy_component(optionwrapper4);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_13(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        div.innerHTML = `<img class="w-7 h-7 cursor-pointer" src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/area-icon.svg" alt="area"/>`;
        attr(div, "class", "flex gap-x-5");
      },
      m(target, anchor) {
        insert(target, div, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_default_slot_12(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        div.innerHTML = `<img class="w-7 h-7 cursor-pointer" src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/hazard-icon.svg" alt="hazard"/>`;
        attr(div, "class", "flex gap-x-5");
      },
      m(target, anchor) {
        insert(target, div, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_default_slot_11(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        div.innerHTML = `<img class="w-7 h-7 cursor-pointer" src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/marker-icon.svg" alt="hazard"/>`;
        attr(div, "class", "flex gap-x-5");
      },
      m(target, anchor) {
        insert(target, div, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_default_slot_10(ctx) {
    let div;
    return {
      c() {
        div = element("div");
        div.innerHTML = `<img class="w-7 h-7 cursor-pointer" src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/route-icon.svg" alt="route"/>`;
        attr(div, "class", "flex gap-x-5");
      },
      m(target, anchor) {
        insert(target, div, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }
  function create_default_slot_9(ctx) {
    let switch_1;
    let current;
    switch_1 = new Switch_default({ props: { withTitle: false } });
    return {
      c() {
        create_component(switch_1.$$.fragment);
      },
      m(target, anchor) {
        mount_component(switch_1, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(switch_1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(switch_1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(switch_1, detaching);
      }
    };
  }
  function create_if_block_15(ctx) {
    let div0;
    let t0;
    let div2;
    let button;
    let img;
    let img_src_value;
    let t1;
    let div1;
    let button_hidden_value;
    let button_disabled_value;
    let mounted;
    let dispose;
    let each_value_6 = ensure_array_like(
      /*d411FacilityMapData*/
      ctx[0].areas
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_6.length; i += 1) {
      each_blocks[i] = create_each_block_6(get_each_context_6(ctx, each_value_6, i));
    }
    return {
      c() {
        div0 = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t0 = space();
        div2 = element("div");
        button = element("button");
        img = element("img");
        t1 = space();
        div1 = element("div");
        attr(div0, "class", "");
        attr(img, "class", "w-6 h-6");
        if (!src_url_equal(img.src, img_src_value = "https://cdn-test.dock411.com/0000/d411-facility-map/editor/add-icon.svg"))
          attr(img, "src", img_src_value);
        attr(img, "alt", "");
        attr(div1, "class", "background-add-new-button svelte-1gn7q08");
        attr(button, "class", "add-new-button items-center svelte-1gn7q08");
        button.hidden = button_hidden_value = !/*editMode*/
        ctx[1];
        button.disabled = button_disabled_value = !/*editMode*/
        ctx[1];
        attr(div2, "class", "flex");
        set_style(div2, "width", "30px");
      },
      m(target, anchor) {
        insert(target, div0, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(div0, null);
          }
        }
        insert(target, t0, anchor);
        insert(target, div2, anchor);
        append(div2, button);
        append(button, img);
        append(button, t1);
        append(button, div1);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*click_handler_2*/
            ctx[44]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*handleSideMenuClick, d411FacilityMapData*/
        8193) {
          each_value_6 = ensure_array_like(
            /*d411FacilityMapData*/
            ctx2[0].areas
          );
          let i;
          for (i = 0; i < each_value_6.length; i += 1) {
            const child_ctx = get_each_context_6(ctx2, each_value_6, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_6(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div0, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value_6.length;
        }
        if (dirty[0] & /*editMode*/
        2 && button_hidden_value !== (button_hidden_value = !/*editMode*/
        ctx2[1])) {
          button.hidden = button_hidden_value;
        }
        if (dirty[0] & /*editMode*/
        2 && button_disabled_value !== (button_disabled_value = !/*editMode*/
        ctx2[1])) {
          button.disabled = button_disabled_value;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div0);
          detach(t0);
          detach(div2);
        }
        destroy_each(each_blocks, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_each_block_6(ctx) {
    let div1;
    let div0;
    let button0;
    let img;
    let img_src_value;
    let t0;
    let button1;
    let span;
    let t1_value = (
      /*area*/
      ctx[124].name + ""
    );
    let t1;
    let t2;
    let mounted;
    let dispose;
    function click_handler(...args) {
      return (
        /*click_handler*/
        ctx[42](
          /*area*/
          ctx[124],
          ...args
        )
      );
    }
    function click_handler_1() {
      return (
        /*click_handler_1*/
        ctx[43](
          /*area*/
          ctx[124]
        )
      );
    }
    return {
      c() {
        div1 = element("div");
        div0 = element("div");
        button0 = element("button");
        img = element("img");
        t0 = space();
        button1 = element("button");
        span = element("span");
        t1 = text(t1_value);
        t2 = space();
        attr(img, "class", "pr-2 w-[35px] h-[30px] ");
        if (!src_url_equal(img.src, img_src_value = `https://cdn-test.dock411.com/0000/brands/area/icon-area-${/*area*/
        ctx[124].type}.png`))
          attr(img, "src", img_src_value);
        attr(img, "alt", "area");
        attr(div0, "class", "side-bar-icon  svelte-1gn7q08");
        attr(span, "class", "name-span");
        attr(button1, "class", "side-bar-name  svelte-1gn7q08");
        attr(div1, "class", "area-container pt-0.5 pb-0.5 svelte-1gn7q08");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, div0);
        append(div0, button0);
        append(button0, img);
        append(div1, t0);
        append(div1, button1);
        append(button1, span);
        append(span, t1);
        append(div1, t2);
        if (!mounted) {
          dispose = [
            listen(button0, "click", click_handler),
            listen(button1, "click", click_handler_1)
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty[0] & /*d411FacilityMapData*/
        1 && !src_url_equal(img.src, img_src_value = `https://cdn-test.dock411.com/0000/brands/area/icon-area-${/*area*/
        ctx[124].type}.png`)) {
          attr(img, "src", img_src_value);
        }
        if (dirty[0] & /*d411FacilityMapData*/
        1 && t1_value !== (t1_value = /*area*/
        ctx[124].name + ""))
          set_data(t1, t1_value);
      },
      d(detaching) {
        if (detaching) {
          detach(div1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot_8(ctx) {
    let div;
    let subtitle;
    let t;
    let current;
    subtitle = new Subtitle_default({
      props: {
        subTitle: "Areas",
        img: "https://cdn-test.dock411.com/0000/d411-facility-map/editor/area-icon.svg",
        toggleHidde: (
          /*toggleHidde*/
          ctx[115]
        ),
        hidde: (
          /*hidde*/
          ctx[116]
        )
      }
    });
    let if_block = !/*hidde*/
    ctx[116] && create_if_block_15(ctx);
    return {
      c() {
        div = element("div");
        create_component(subtitle.$$.fragment);
        t = space();
        if (if_block)
          if_block.c();
        attr(div, "class", "flex flex-col w-full ");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        mount_component(subtitle, div, null);
        append(div, t);
        if (if_block)
          if_block.m(div, null);
        current = true;
      },
      p(ctx2, dirty) {
        const subtitle_changes = {};
        if (dirty[3] & /*toggleHidde*/
        4194304)
          subtitle_changes.toggleHidde = /*toggleHidde*/
          ctx2[115];
        if (dirty[3] & /*hidde*/
        8388608)
          subtitle_changes.hidde = /*hidde*/
          ctx2[116];
        subtitle.$set(subtitle_changes);
        if (!/*hidde*/
        ctx2[116]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_15(ctx2);
            if_block.c();
            if_block.m(div, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(subtitle.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(subtitle.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        destroy_component(subtitle);
        if (if_block)
          if_block.d();
      }
    };
  }
  function create_if_block_13(ctx) {
    let div3;
    let t0;
    let div2;
    let button;
    let img;
    let img_src_value;
    let t1;
    let div1;
    let button_hidden_value;
    let button_disabled_value;
    let mounted;
    let dispose;
    let each_value_5 = ensure_array_like(
      /*d411FacilityMapData*/
      ctx[0].markers
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_5.length; i += 1) {
      each_blocks[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
    }
    return {
      c() {
        div3 = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t0 = space();
        div2 = element("div");
        button = element("button");
        img = element("img");
        t1 = space();
        div1 = element("div");
        div1.innerHTML = `<div></div>`;
        attr(img, "class", "w-6 h-6");
        if (!src_url_equal(img.src, img_src_value = "https://cdn-test.dock411.com/0000/d411-facility-map/editor/add-icon.svg"))
          attr(img, "src", img_src_value);
        attr(img, "alt", "");
        attr(div1, "class", "background-add-new-button svelte-1gn7q08");
        attr(button, "class", "add-new-button items-center svelte-1gn7q08");
        button.hidden = button_hidden_value = !/*editMode*/
        ctx[1];
        button.disabled = button_disabled_value = !/*editMode*/
        ctx[1];
        attr(div2, "class", "flex");
        set_style(div2, "width", "30px");
        attr(div3, "class", "");
      },
      m(target, anchor) {
        insert(target, div3, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(div3, null);
          }
        }
        append(div3, t0);
        append(div3, div2);
        append(div2, button);
        append(button, img);
        append(button, t1);
        append(button, div1);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*click_handler_5*/
            ctx[47]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*handleSideMenuClick, d411FacilityMapData, map_of_hazard_codes*/
        268443649) {
          each_value_5 = ensure_array_like(
            /*d411FacilityMapData*/
            ctx2[0].markers
          );
          let i;
          for (i = 0; i < each_value_5.length; i += 1) {
            const child_ctx = get_each_context_5(ctx2, each_value_5, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_5(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div3, t0);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value_5.length;
        }
        if (dirty[0] & /*editMode*/
        2 && button_hidden_value !== (button_hidden_value = !/*editMode*/
        ctx2[1])) {
          button.hidden = button_hidden_value;
        }
        if (dirty[0] & /*editMode*/
        2 && button_disabled_value !== (button_disabled_value = !/*editMode*/
        ctx2[1])) {
          button.disabled = button_disabled_value;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div3);
        }
        destroy_each(each_blocks, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_14(ctx) {
    let div1;
    let div0;
    let button0;
    let img;
    let img_src_value;
    let t0;
    let button1;
    let span;
    let t1_value = (
      /*marker*/
      ctx[110].name + ""
    );
    let t1;
    let mounted;
    let dispose;
    function click_handler_3(...args) {
      return (
        /*click_handler_3*/
        ctx[45](
          /*marker*/
          ctx[110],
          ...args
        )
      );
    }
    function click_handler_4() {
      return (
        /*click_handler_4*/
        ctx[46](
          /*marker*/
          ctx[110]
        )
      );
    }
    return {
      c() {
        div1 = element("div");
        div0 = element("div");
        button0 = element("button");
        img = element("img");
        t0 = space();
        button1 = element("button");
        span = element("span");
        t1 = text(t1_value);
        attr(img, "class", "w-9 h-9 ml-[-4px] mr-1 mt-[-1px]");
        if (!src_url_equal(img.src, img_src_value = icons.marker_types[
          /*marker*/
          ctx[110].code
        ] ? icons.marker_types[
          /*marker*/
          ctx[110].code
        ].marker_url : icons.marker_types.other.marker_url))
          attr(img, "src", img_src_value);
        attr(img, "alt", "");
        attr(div0, "class", "side-bar-icon svelte-1gn7q08");
        attr(button1, "class", "side-bar-name  svelte-1gn7q08");
        attr(div1, "class", "area-container svelte-1gn7q08");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, div0);
        append(div0, button0);
        append(button0, img);
        append(div1, t0);
        append(div1, button1);
        append(button1, span);
        append(span, t1);
        if (!mounted) {
          dispose = [
            listen(button0, "click", click_handler_3),
            listen(button1, "click", click_handler_4)
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty[0] & /*d411FacilityMapData*/
        1 && !src_url_equal(img.src, img_src_value = icons.marker_types[
          /*marker*/
          ctx[110].code
        ] ? icons.marker_types[
          /*marker*/
          ctx[110].code
        ].marker_url : icons.marker_types.other.marker_url)) {
          attr(img, "src", img_src_value);
        }
        if (dirty[0] & /*d411FacilityMapData*/
        1 && t1_value !== (t1_value = /*marker*/
        ctx[110].name + ""))
          set_data(t1, t1_value);
      },
      d(detaching) {
        if (detaching) {
          detach(div1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_each_block_5(ctx) {
    let show_if = (
      /*map_of_hazard_codes*/
      ctx[28].includes(
        /*marker*/
        ctx[110].code
      )
    );
    let if_block_anchor;
    let if_block = show_if && create_if_block_14(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*d411FacilityMapData*/
        1)
          show_if = /*map_of_hazard_codes*/
          ctx2[28].includes(
            /*marker*/
            ctx2[110].code
          );
        if (show_if) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_14(ctx2);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_default_slot_7(ctx) {
    let div1;
    let div0;
    let subtitle;
    let t;
    let current;
    subtitle = new Subtitle_default({
      props: {
        subTitle: "Hazards",
        img: "https://cdn-test.dock411.com/0000/d411-facility-map/editor/hazard-icon.svg",
        toggleHidde: (
          /*toggleHidde*/
          ctx[115]
        ),
        hidde: (
          /*hidde*/
          ctx[116]
        )
      }
    });
    let if_block = !/*hidde*/
    ctx[116] && create_if_block_13(ctx);
    return {
      c() {
        div1 = element("div");
        div0 = element("div");
        create_component(subtitle.$$.fragment);
        t = space();
        if (if_block)
          if_block.c();
        attr(div0, "class", "flex-col");
        attr(div1, "class", "flex flex-col w-full");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, div0);
        mount_component(subtitle, div0, null);
        append(div1, t);
        if (if_block)
          if_block.m(div1, null);
        current = true;
      },
      p(ctx2, dirty) {
        const subtitle_changes = {};
        if (dirty[3] & /*toggleHidde*/
        4194304)
          subtitle_changes.toggleHidde = /*toggleHidde*/
          ctx2[115];
        if (dirty[3] & /*hidde*/
        8388608)
          subtitle_changes.hidde = /*hidde*/
          ctx2[116];
        subtitle.$set(subtitle_changes);
        if (!/*hidde*/
        ctx2[116]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_13(ctx2);
            if_block.c();
            if_block.m(div1, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(subtitle.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(subtitle.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div1);
        }
        destroy_component(subtitle);
        if (if_block)
          if_block.d();
      }
    };
  }
  function create_if_block_11(ctx) {
    let div3;
    let t0;
    let div2;
    let button1;
    let img;
    let img_src_value;
    let t1;
    let div1;
    let button1_hidden_value;
    let button1_disabled_value;
    let mounted;
    let dispose;
    let each_value_4 = ensure_array_like(
      /*d411FacilityMapData*/
      ctx[0].markers
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_4.length; i += 1) {
      each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
    }
    return {
      c() {
        div3 = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t0 = space();
        div2 = element("div");
        button1 = element("button");
        img = element("img");
        t1 = space();
        div1 = element("div");
        div1.innerHTML = `<button></button> <div></div>`;
        attr(img, "class", "w-6 h-6");
        if (!src_url_equal(img.src, img_src_value = "https://cdn-test.dock411.com/0000/d411-facility-map/editor/add-icon.svg"))
          attr(img, "src", img_src_value);
        attr(img, "alt", "");
        attr(div1, "class", "background-add-new-button svelte-1gn7q08");
        attr(button1, "class", "add-new-button items-center svelte-1gn7q08");
        button1.hidden = button1_hidden_value = !/*editMode*/
        ctx[1];
        button1.disabled = button1_disabled_value = !/*editMode*/
        ctx[1];
        attr(div2, "class", "flex");
        set_style(div2, "width", "30px");
        attr(div3, "class", "");
      },
      m(target, anchor) {
        insert(target, div3, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(div3, null);
          }
        }
        append(div3, t0);
        append(div3, div2);
        append(div2, button1);
        append(button1, img);
        append(button1, t1);
        append(button1, div1);
        if (!mounted) {
          dispose = listen(
            button1,
            "click",
            /*click_handler_8*/
            ctx[50]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*handleSideMenuClick, d411FacilityMapData, map_of_hazard_codes*/
        268443649) {
          each_value_4 = ensure_array_like(
            /*d411FacilityMapData*/
            ctx2[0].markers
          );
          let i;
          for (i = 0; i < each_value_4.length; i += 1) {
            const child_ctx = get_each_context_4(ctx2, each_value_4, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_4(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div3, t0);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value_4.length;
        }
        if (dirty[0] & /*editMode*/
        2 && button1_hidden_value !== (button1_hidden_value = !/*editMode*/
        ctx2[1])) {
          button1.hidden = button1_hidden_value;
        }
        if (dirty[0] & /*editMode*/
        2 && button1_disabled_value !== (button1_disabled_value = !/*editMode*/
        ctx2[1])) {
          button1.disabled = button1_disabled_value;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div3);
        }
        destroy_each(each_blocks, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_12(ctx) {
    let div1;
    let div0;
    let button0;
    let img;
    let img_src_value;
    let t0;
    let button1;
    let span;
    let t1_value = (
      /*marker*/
      ctx[110].name + ""
    );
    let t1;
    let mounted;
    let dispose;
    function click_handler_6(...args) {
      return (
        /*click_handler_6*/
        ctx[48](
          /*marker*/
          ctx[110],
          ...args
        )
      );
    }
    function click_handler_7(...args) {
      return (
        /*click_handler_7*/
        ctx[49](
          /*marker*/
          ctx[110],
          ...args
        )
      );
    }
    return {
      c() {
        div1 = element("div");
        div0 = element("div");
        button0 = element("button");
        img = element("img");
        t0 = space();
        button1 = element("button");
        span = element("span");
        t1 = text(t1_value);
        attr(img, "class", "w-9 h-9 ml-[-4px] mr-1 mt-[-1px]");
        if (!src_url_equal(img.src, img_src_value = icons.marker_types[
          /*marker*/
          ctx[110].code
        ] ? icons.marker_types[
          /*marker*/
          ctx[110].code
        ].marker_url : icons.marker_types.other.marker_url))
          attr(img, "src", img_src_value);
        attr(img, "alt", "");
        attr(div0, "class", "side-bar-icon svelte-1gn7q08");
        attr(button1, "class", "side-bar-name mt-[3px] svelte-1gn7q08");
        attr(div1, "class", "area-container svelte-1gn7q08");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, div0);
        append(div0, button0);
        append(button0, img);
        append(div1, t0);
        append(div1, button1);
        append(button1, span);
        append(span, t1);
        if (!mounted) {
          dispose = [
            listen(button0, "click", click_handler_6),
            listen(button1, "click", click_handler_7)
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty[0] & /*d411FacilityMapData*/
        1 && !src_url_equal(img.src, img_src_value = icons.marker_types[
          /*marker*/
          ctx[110].code
        ] ? icons.marker_types[
          /*marker*/
          ctx[110].code
        ].marker_url : icons.marker_types.other.marker_url)) {
          attr(img, "src", img_src_value);
        }
        if (dirty[0] & /*d411FacilityMapData*/
        1 && t1_value !== (t1_value = /*marker*/
        ctx[110].name + ""))
          set_data(t1, t1_value);
      },
      d(detaching) {
        if (detaching) {
          detach(div1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_each_block_4(ctx) {
    let show_if = !/*map_of_hazard_codes*/
    ctx[28].includes(
      /*marker*/
      ctx[110].code
    );
    let if_block_anchor;
    let if_block = show_if && create_if_block_12(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*d411FacilityMapData*/
        1)
          show_if = !/*map_of_hazard_codes*/
          ctx2[28].includes(
            /*marker*/
            ctx2[110].code
          );
        if (show_if) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_12(ctx2);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_default_slot_6(ctx) {
    let div;
    let subtitle;
    let t;
    let current;
    subtitle = new Subtitle_default({
      props: {
        subTitle: "Markers",
        img: "https://cdn-test.dock411.com/0000/d411-facility-map/editor/marker-icon.svg",
        toggleHidde: (
          /*toggleHidde*/
          ctx[115]
        ),
        hidde: (
          /*hidde*/
          ctx[116]
        )
      }
    });
    let if_block = !/*hidde*/
    ctx[116] && create_if_block_11(ctx);
    return {
      c() {
        div = element("div");
        create_component(subtitle.$$.fragment);
        t = space();
        if (if_block)
          if_block.c();
        attr(div, "class", "flex flex-col w-full");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        mount_component(subtitle, div, null);
        append(div, t);
        if (if_block)
          if_block.m(div, null);
        current = true;
      },
      p(ctx2, dirty) {
        const subtitle_changes = {};
        if (dirty[3] & /*toggleHidde*/
        4194304)
          subtitle_changes.toggleHidde = /*toggleHidde*/
          ctx2[115];
        if (dirty[3] & /*hidde*/
        8388608)
          subtitle_changes.hidde = /*hidde*/
          ctx2[116];
        subtitle.$set(subtitle_changes);
        if (!/*hidde*/
        ctx2[116]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_11(ctx2);
            if_block.c();
            if_block.m(div, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(subtitle.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(subtitle.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        destroy_component(subtitle);
        if (if_block)
          if_block.d();
      }
    };
  }
  function create_if_block_10(ctx) {
    let div0;
    let t0;
    let div3;
    let button1;
    let img;
    let img_src_value;
    let t1;
    let div2;
    let button1_hidden_value;
    let button1_disabled_value;
    let mounted;
    let dispose;
    let each_value_3 = ensure_array_like(
      /*d411FacilityMapData*/
      ctx[0].routes
    );
    let each_blocks = [];
    for (let i = 0; i < each_value_3.length; i += 1) {
      each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    }
    return {
      c() {
        div0 = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t0 = space();
        div3 = element("div");
        button1 = element("button");
        img = element("img");
        t1 = space();
        div2 = element("div");
        div2.innerHTML = `<button></button> <div></div>`;
        attr(div0, "class", "");
        attr(img, "class", "w-6 h-6");
        if (!src_url_equal(img.src, img_src_value = "https://cdn-test.dock411.com/0000/d411-facility-map/editor/add-icon.svg"))
          attr(img, "src", img_src_value);
        attr(img, "alt", "");
        attr(div2, "class", "background-add-new-button svelte-1gn7q08");
        attr(button1, "class", "add-new-button items-center svelte-1gn7q08");
        button1.hidden = button1_hidden_value = !/*editMode*/
        ctx[1];
        button1.disabled = button1_disabled_value = !/*editMode*/
        ctx[1];
        attr(div3, "class", "flex");
        set_style(div3, "width", "30px");
      },
      m(target, anchor) {
        insert(target, div0, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(div0, null);
          }
        }
        insert(target, t0, anchor);
        insert(target, div3, anchor);
        append(div3, button1);
        append(button1, img);
        append(button1, t1);
        append(button1, div2);
        if (!mounted) {
          dispose = listen(button1, "click", stop_propagation(
            /*click_handler_10*/
            ctx[52]
          ));
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*handleSideMenuClick, d411FacilityMapData*/
        8193) {
          each_value_3 = ensure_array_like(
            /*d411FacilityMapData*/
            ctx2[0].routes
          );
          let i;
          for (i = 0; i < each_value_3.length; i += 1) {
            const child_ctx = get_each_context_3(ctx2, each_value_3, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_3(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div0, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value_3.length;
        }
        if (dirty[0] & /*editMode*/
        2 && button1_hidden_value !== (button1_hidden_value = !/*editMode*/
        ctx2[1])) {
          button1.hidden = button1_hidden_value;
        }
        if (dirty[0] & /*editMode*/
        2 && button1_disabled_value !== (button1_disabled_value = !/*editMode*/
        ctx2[1])) {
          button1.disabled = button1_disabled_value;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div0);
          detach(t0);
          detach(div3);
        }
        destroy_each(each_blocks, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_each_block_3(ctx) {
    let div1;
    let div0;
    let button0;
    let t0;
    let button1;
    let span;
    let t1_value = (
      /*route*/
      ctx[117].name + ""
    );
    let t1;
    let t2;
    let mounted;
    let dispose;
    function click_handler_9(...args) {
      return (
        /*click_handler_9*/
        ctx[51](
          /*route*/
          ctx[117],
          ...args
        )
      );
    }
    return {
      c() {
        div1 = element("div");
        div0 = element("div");
        button0 = element("button");
        button0.innerHTML = `<img class="w-6 h-6 ml-[1px] mr-1 mt-[3px]" src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/route-icon.svg" alt=""/>`;
        t0 = space();
        button1 = element("button");
        span = element("span");
        t1 = text(t1_value);
        t2 = space();
        attr(div0, "class", "side-bar-icon svelte-1gn7q08");
        attr(button1, "class", "side-bar-name pl-1.5 svelte-1gn7q08");
        attr(div1, "class", "area-container svelte-1gn7q08");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, div0);
        append(div0, button0);
        append(div1, t0);
        append(div1, button1);
        append(button1, span);
        append(span, t1);
        append(div1, t2);
        if (!mounted) {
          dispose = [
            listen(button0, "click", click_handler_9),
            listen(button1, "click", function() {
              if (is_function(
                /*handleSideMenuClick*/
                ctx[13](
                  "polyline",
                  /*route*/
                  ctx[117].id
                )
              ))
                ctx[13](
                  "polyline",
                  /*route*/
                  ctx[117].id
                ).apply(this, arguments);
            })
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty[0] & /*d411FacilityMapData*/
        1 && t1_value !== (t1_value = /*route*/
        ctx[117].name + ""))
          set_data(t1, t1_value);
      },
      d(detaching) {
        if (detaching) {
          detach(div1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot_5(ctx) {
    let div;
    let subtitle;
    let t;
    let current;
    subtitle = new Subtitle_default({
      props: {
        subTitle: "Routes",
        img: "https://cdn-test.dock411.com/0000/d411-facility-map/editor/route-icon.svg",
        toggleHidde: (
          /*toggleHidde*/
          ctx[115]
        ),
        hidde: (
          /*hidde*/
          ctx[116]
        )
      }
    });
    let if_block = !/*hidde*/
    ctx[116] && create_if_block_10(ctx);
    return {
      c() {
        div = element("div");
        create_component(subtitle.$$.fragment);
        t = space();
        if (if_block)
          if_block.c();
        attr(div, "class", "flex flex-col w-full");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        mount_component(subtitle, div, null);
        append(div, t);
        if (if_block)
          if_block.m(div, null);
        current = true;
      },
      p(ctx2, dirty) {
        const subtitle_changes = {};
        if (dirty[3] & /*toggleHidde*/
        4194304)
          subtitle_changes.toggleHidde = /*toggleHidde*/
          ctx2[115];
        if (dirty[3] & /*hidde*/
        8388608)
          subtitle_changes.hidde = /*hidde*/
          ctx2[116];
        subtitle.$set(subtitle_changes);
        if (!/*hidde*/
        ctx2[116]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_10(ctx2);
            if_block.c();
            if_block.m(div, null);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(subtitle.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(subtitle.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        destroy_component(subtitle);
        if (if_block)
          if_block.d();
      }
    };
  }
  function create_default_slot_4(ctx) {
    let div;
    let switch_1;
    let current;
    switch_1 = new Switch_default({});
    return {
      c() {
        div = element("div");
        create_component(switch_1.$$.fragment);
        attr(div, "class", "flex flex-col");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        mount_component(switch_1, div, null);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(switch_1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(switch_1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        destroy_component(switch_1);
      }
    };
  }
  function create_if_block_42(ctx) {
    let t;
    let if_block1_anchor;
    let if_block0 = !/*clicked_layer_information*/
    ctx[11].is_hazard && create_if_block_72(ctx);
    let if_block1 = (
      /*clicked_layer_information*/
      ctx[11].is_hazard && create_if_block_52(ctx)
    );
    return {
      c() {
        if (if_block0)
          if_block0.c();
        t = space();
        if (if_block1)
          if_block1.c();
        if_block1_anchor = empty();
      },
      m(target, anchor) {
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, if_block1_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (!/*clicked_layer_information*/
        ctx2[11].is_hazard) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
          } else {
            if_block0 = create_if_block_72(ctx2);
            if_block0.c();
            if_block0.m(t.parentNode, t);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        if (
          /*clicked_layer_information*/
          ctx2[11].is_hazard
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block_52(ctx2);
            if_block1.c();
            if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(t);
          detach(if_block1_anchor);
        }
        if (if_block0)
          if_block0.d(detaching);
        if (if_block1)
          if_block1.d(detaching);
      }
    };
  }
  function create_if_block_72(ctx) {
    let div2;
    let div1;
    let img0;
    let img0_src_value;
    let t0;
    let button0;
    let t1;
    let input;
    let input_readonly_value;
    let input_disabled_value;
    let t2;
    let div0;
    let button1;
    let t3;
    let mounted;
    let dispose;
    let each_value_2 = ensure_array_like(Object.entries(icons.marker_types));
    let each_blocks = [];
    for (let i = 0; i < each_value_2.length; i += 1) {
      each_blocks[i] = create_each_block_22(get_each_context_22(ctx, each_value_2, i));
    }
    return {
      c() {
        div2 = element("div");
        div1 = element("div");
        img0 = element("img");
        t0 = space();
        button0 = element("button");
        t1 = space();
        input = element("input");
        t2 = space();
        div0 = element("div");
        button1 = element("button");
        button1.innerHTML = `<img src="https://d411-facility-map-wc-images.s3.amazonaws.com/close.svg" alt=""/>`;
        t3 = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(img0, "class", "pr-2 w-[50px] h-[50px]");
        if (!src_url_equal(img0.src, img0_src_value = icons.marker_types[
          /*clicked_layer_information*/
          ctx[11].type
        ] ? icons.marker_types[
          /*clicked_layer_information*/
          ctx[11].type
        ].marker_url : (
          /*clicked_layer_information*/
          ctx[11].marker_url
        )))
          attr(img0, "src", img0_src_value);
        attr(img0, "alt", "Marker");
        attr(input, "type", "text");
        input.readOnly = input_readonly_value = !/*editMode*/
        ctx[1];
        input.disabled = input_disabled_value = !/*editMode*/
        ctx[1];
        attr(input, "class", "text-input mt-[-2px] svelte-1gn7q08");
        attr(input, "aria-describedby", "nameHelp");
        attr(input, "placeholder", "Name");
        attr(input, "maxlength", "50");
        attr(button1, "class", "close-button svelte-1gn7q08");
        attr(div0, "id", "conditional_buttons");
        attr(div0, "class", "mt-[-20px] ml-5");
        attr(div1, "class", "flex items-center justify-between pb-1");
        attr(div2, "class", "pb-1");
      },
      m(target, anchor) {
        insert(target, div2, anchor);
        append(div2, div1);
        append(div1, img0);
        append(div1, t0);
        append(div1, button0);
        append(div1, t1);
        append(div1, input);
        set_input_value(
          input,
          /*clicked_layer_information*/
          ctx[11].name
        );
        append(div1, t2);
        append(div1, div0);
        append(div0, button1);
        append(div2, t3);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(div2, null);
          }
        }
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_handler*/
              ctx[55]
            ),
            listen(
              input,
              "input",
              /*input_input_handler*/
              ctx[56]
            ),
            listen(
              button1,
              "click",
              /*click_handler_13*/
              ctx[57]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*clicked_layer_information*/
        2048 && !src_url_equal(img0.src, img0_src_value = icons.marker_types[
          /*clicked_layer_information*/
          ctx2[11].type
        ] ? icons.marker_types[
          /*clicked_layer_information*/
          ctx2[11].type
        ].marker_url : (
          /*clicked_layer_information*/
          ctx2[11].marker_url
        ))) {
          attr(img0, "src", img0_src_value);
        }
        if (dirty[0] & /*editMode*/
        2 && input_readonly_value !== (input_readonly_value = !/*editMode*/
        ctx2[1])) {
          input.readOnly = input_readonly_value;
        }
        if (dirty[0] & /*editMode*/
        2 && input_disabled_value !== (input_disabled_value = !/*editMode*/
        ctx2[1])) {
          input.disabled = input_disabled_value;
        }
        if (dirty[0] & /*clicked_layer_information*/
        2048 && input.value !== /*clicked_layer_information*/
        ctx2[11].name) {
          set_input_value(
            input,
            /*clicked_layer_information*/
            ctx2[11].name
          );
        }
        if (dirty[0] & /*editMode, clicked_layer_information, name_default_changer*/
        2099202) {
          each_value_2 = ensure_array_like(Object.entries(icons.marker_types));
          let i;
          for (i = 0; i < each_value_2.length; i += 1) {
            const child_ctx = get_each_context_22(ctx2, each_value_2, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_22(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div2, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value_2.length;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div2);
        }
        destroy_each(each_blocks, detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_82(ctx) {
    let div3;
    let label;
    let div0;
    let input;
    let input_disabled_value;
    let input_readonly_value;
    let input_checked_value;
    let input_value_value;
    let t0;
    let div1;
    let img;
    let img_src_value;
    let img_title_value;
    let t1;
    let div2;
    let t3;
    let binding_group;
    let mounted;
    let dispose;
    binding_group = init_binding_group(
      /*$$binding_groups*/
      ctx[59][0]
    );
    return {
      c() {
        div3 = element("div");
        label = element("label");
        div0 = element("div");
        input = element("input");
        t0 = space();
        div1 = element("div");
        img = element("img");
        t1 = space();
        div2 = element("div");
        div2.textContent = `${/*marker*/
        ctx[110][1].name}`;
        t3 = space();
        attr(input, "type", "radio");
        attr(input, "name", "marker_type");
        attr(input, "class", "marker_input svelte-1gn7q08");
        input.disabled = input_disabled_value = !/*editMode*/
        ctx[1];
        input.readOnly = input_readonly_value = !/*editMode*/
        ctx[1];
        input.checked = input_checked_value = /*marker*/
        ctx[110][1].code === /*clicked_layer_information*/
        ctx[11].type;
        input.__value = input_value_value = /*marker*/
        ctx[110][1].code;
        set_input_value(input, input.__value);
        attr(div0, "class", "radio-toolbar");
        attr(img, "alt", "Dock411 Map Icon");
        attr(img, "class", "mt-[3px] mb-1 pr-2 w-[40px] h-[30px] ml-[7px]");
        if (!src_url_equal(img.src, img_src_value = /*marker*/
        ctx[110][1].marker_url))
          attr(img, "src", img_src_value);
        attr(img, "title", img_title_value = formatIconHover(
          /*marker*/
          ctx[110][1].code
        ));
        attr(div2, "class", "mt-[5px] ml-[1px] text-[16px] text-[#667085]");
        attr(label, "class", "label-toolbar flex flex-row gap-0.5 svelte-1gn7q08");
        attr(div3, "class", "mt-0.5 mb-0.5");
        binding_group.p(input);
      },
      m(target, anchor) {
        insert(target, div3, anchor);
        append(div3, label);
        append(label, div0);
        append(div0, input);
        input.checked = input.__value === /*clicked_layer_information*/
        ctx[11].type;
        append(label, t0);
        append(label, div1);
        append(div1, img);
        append(label, t1);
        append(label, div2);
        append(div3, t3);
        if (!mounted) {
          dispose = [
            listen(
              input,
              "change",
              /*input_change_handler*/
              ctx[58]
            ),
            listen(input, "change", function() {
              if (is_function(
                /*name_default_changer*/
                ctx[21](
                  /*clicked_layer_information*/
                  ctx[11].layer_type
                )
              ))
                ctx[21](
                  /*clicked_layer_information*/
                  ctx[11].layer_type
                ).apply(this, arguments);
            })
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty[0] & /*editMode*/
        2 && input_disabled_value !== (input_disabled_value = !/*editMode*/
        ctx[1])) {
          input.disabled = input_disabled_value;
        }
        if (dirty[0] & /*editMode*/
        2 && input_readonly_value !== (input_readonly_value = !/*editMode*/
        ctx[1])) {
          input.readOnly = input_readonly_value;
        }
        if (dirty[0] & /*clicked_layer_information*/
        2048 && input_checked_value !== (input_checked_value = /*marker*/
        ctx[110][1].code === /*clicked_layer_information*/
        ctx[11].type)) {
          input.checked = input_checked_value;
        }
        if (dirty[0] & /*clicked_layer_information*/
        2048) {
          input.checked = input.__value === /*clicked_layer_information*/
          ctx[11].type;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div3);
        }
        binding_group.r();
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_each_block_22(ctx) {
    let if_block_anchor;
    let if_block = (
      /*marker*/
      ctx[110][1].is_facility_property && !/*marker*/
      ctx[110][1].is_hazard && create_if_block_82(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (
          /*marker*/
          ctx2[110][1].is_facility_property && !/*marker*/
          ctx2[110][1].is_hazard
        )
          if_block.p(ctx2, dirty);
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_52(ctx) {
    let div2;
    let div1;
    let img0;
    let img0_src_value;
    let t0;
    let button0;
    let t1;
    let input;
    let input_readonly_value;
    let input_disabled_value;
    let t2;
    let div0;
    let button1;
    let t3;
    let mounted;
    let dispose;
    let each_value_1 = ensure_array_like(Object.entries(icons.marker_types));
    let each_blocks = [];
    for (let i = 0; i < each_value_1.length; i += 1) {
      each_blocks[i] = create_each_block_12(get_each_context_12(ctx, each_value_1, i));
    }
    return {
      c() {
        div2 = element("div");
        div1 = element("div");
        img0 = element("img");
        t0 = space();
        button0 = element("button");
        t1 = space();
        input = element("input");
        t2 = space();
        div0 = element("div");
        button1 = element("button");
        button1.innerHTML = `<img src="https://d411-facility-map-wc-images.s3.amazonaws.com/close.svg" alt=""/>`;
        t3 = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(img0, "class", "pr-2 w-[50px] h-[50px]");
        if (!src_url_equal(img0.src, img0_src_value = icons.marker_types[
          /*clicked_layer_information*/
          ctx[11].type
        ] ? icons.marker_types[
          /*clicked_layer_information*/
          ctx[11].type
        ].marker_url : (
          /*clicked_layer_information*/
          ctx[11].marker_url
        )))
          attr(img0, "src", img0_src_value);
        attr(img0, "alt", "Marker");
        attr(input, "type", "text");
        input.readOnly = input_readonly_value = !/*editMode*/
        ctx[1];
        input.disabled = input_disabled_value = !/*editMode*/
        ctx[1];
        attr(input, "class", "text-input mt-[-2px] svelte-1gn7q08");
        attr(input, "aria-describedby", "nameHelp");
        attr(input, "placeholder", "Name");
        attr(input, "maxlength", "50");
        attr(button1, "class", "close-button  svelte-1gn7q08");
        attr(div0, "id", "conditional_buttons");
        attr(div0, "class", "mt-[-20px] ml-5");
        attr(div1, "class", "flex items-center justify-between pb-1");
        attr(div2, "class", "block pb-1");
      },
      m(target, anchor) {
        insert(target, div2, anchor);
        append(div2, div1);
        append(div1, img0);
        append(div1, t0);
        append(div1, button0);
        append(div1, t1);
        append(div1, input);
        set_input_value(
          input,
          /*clicked_layer_information*/
          ctx[11].name
        );
        append(div1, t2);
        append(div1, div0);
        append(div0, button1);
        append(div2, t3);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(div2, null);
          }
        }
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_handler_1*/
              ctx[60]
            ),
            listen(
              input,
              "input",
              /*input_input_handler_1*/
              ctx[61]
            ),
            listen(
              button1,
              "click",
              /*click_handler_14*/
              ctx[62]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*clicked_layer_information*/
        2048 && !src_url_equal(img0.src, img0_src_value = icons.marker_types[
          /*clicked_layer_information*/
          ctx2[11].type
        ] ? icons.marker_types[
          /*clicked_layer_information*/
          ctx2[11].type
        ].marker_url : (
          /*clicked_layer_information*/
          ctx2[11].marker_url
        ))) {
          attr(img0, "src", img0_src_value);
        }
        if (dirty[0] & /*editMode*/
        2 && input_readonly_value !== (input_readonly_value = !/*editMode*/
        ctx2[1])) {
          input.readOnly = input_readonly_value;
        }
        if (dirty[0] & /*editMode*/
        2 && input_disabled_value !== (input_disabled_value = !/*editMode*/
        ctx2[1])) {
          input.disabled = input_disabled_value;
        }
        if (dirty[0] & /*clicked_layer_information*/
        2048 && input.value !== /*clicked_layer_information*/
        ctx2[11].name) {
          set_input_value(
            input,
            /*clicked_layer_information*/
            ctx2[11].name
          );
        }
        if (dirty[0] & /*editMode, clicked_layer_information, name_default_changer*/
        2099202) {
          each_value_1 = ensure_array_like(Object.entries(icons.marker_types));
          let i;
          for (i = 0; i < each_value_1.length; i += 1) {
            const child_ctx = get_each_context_12(ctx2, each_value_1, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block_12(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div2, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value_1.length;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div2);
        }
        destroy_each(each_blocks, detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_62(ctx) {
    let div3;
    let label;
    let div0;
    let input;
    let input_disabled_value;
    let input_readonly_value;
    let input_checked_value;
    let input_value_value;
    let t0;
    let div1;
    let img;
    let img_src_value;
    let img_title_value;
    let t1;
    let div2;
    let t3;
    let binding_group;
    let mounted;
    let dispose;
    binding_group = init_binding_group(
      /*$$binding_groups*/
      ctx[59][0]
    );
    return {
      c() {
        div3 = element("div");
        label = element("label");
        div0 = element("div");
        input = element("input");
        t0 = space();
        div1 = element("div");
        img = element("img");
        t1 = space();
        div2 = element("div");
        div2.textContent = `${/*marker*/
        ctx[110][1].name}`;
        t3 = space();
        attr(input, "type", "radio");
        attr(input, "name", "marker_type");
        attr(input, "class", "hazard_input svelte-1gn7q08");
        input.disabled = input_disabled_value = !/*editMode*/
        ctx[1];
        input.readOnly = input_readonly_value = !/*editMode*/
        ctx[1];
        input.checked = input_checked_value = /*marker*/
        ctx[110][1].code === /*clicked_layer_information*/
        ctx[11].type;
        input.__value = input_value_value = /*marker*/
        ctx[110][1].code;
        set_input_value(input, input.__value);
        attr(div0, "class", "radio-toolbar");
        attr(img, "alt", "Dock411 Map Icon");
        attr(img, "class", "mt-[-2px] pr-2 w-[40px] h-[40px] ml-[1px]");
        if (!src_url_equal(img.src, img_src_value = /*marker*/
        ctx[110][1].marker_url))
          attr(img, "src", img_src_value);
        attr(img, "title", img_title_value = formatIconHover(
          /*marker*/
          ctx[110][1].code
        ));
        attr(div2, "class", "mt-[5px] ml-[-5px] text-[16px] text-[#667085]");
        attr(label, "class", "label-toolbar flex flex-row gap-2 svelte-1gn7q08");
        attr(div3, "class", "mt-1 mb-1");
        binding_group.p(input);
      },
      m(target, anchor) {
        insert(target, div3, anchor);
        append(div3, label);
        append(label, div0);
        append(div0, input);
        input.checked = input.__value === /*clicked_layer_information*/
        ctx[11].type;
        append(label, t0);
        append(label, div1);
        append(div1, img);
        append(label, t1);
        append(label, div2);
        append(div3, t3);
        if (!mounted) {
          dispose = [
            listen(
              input,
              "change",
              /*input_change_handler_1*/
              ctx[63]
            ),
            listen(input, "change", function() {
              if (is_function(
                /*name_default_changer*/
                ctx[21](
                  /*clicked_layer_information*/
                  ctx[11].layer_type
                )
              ))
                ctx[21](
                  /*clicked_layer_information*/
                  ctx[11].layer_type
                ).apply(this, arguments);
            })
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty[0] & /*editMode*/
        2 && input_disabled_value !== (input_disabled_value = !/*editMode*/
        ctx[1])) {
          input.disabled = input_disabled_value;
        }
        if (dirty[0] & /*editMode*/
        2 && input_readonly_value !== (input_readonly_value = !/*editMode*/
        ctx[1])) {
          input.readOnly = input_readonly_value;
        }
        if (dirty[0] & /*clicked_layer_information*/
        2048 && input_checked_value !== (input_checked_value = /*marker*/
        ctx[110][1].code === /*clicked_layer_information*/
        ctx[11].type)) {
          input.checked = input_checked_value;
        }
        if (dirty[0] & /*clicked_layer_information*/
        2048) {
          input.checked = input.__value === /*clicked_layer_information*/
          ctx[11].type;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div3);
        }
        binding_group.r();
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_each_block_12(ctx) {
    let if_block_anchor;
    let if_block = (
      /*marker*/
      ctx[110][1].is_hazard && create_if_block_62(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (
          /*marker*/
          ctx2[110][1].is_hazard
        )
          if_block.p(ctx2, dirty);
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_22(ctx) {
    let div2;
    let div1;
    let img0;
    let img0_src_value;
    let t0;
    let button0;
    let t1;
    let input;
    let input_readonly_value;
    let input_disabled_value;
    let t2;
    let div0;
    let button1;
    let t3;
    let div5;
    let t4;
    let form1;
    let mounted;
    let dispose;
    let each_value = ensure_array_like(AREA_COLORS);
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
    }
    return {
      c() {
        div2 = element("div");
        div1 = element("div");
        img0 = element("img");
        t0 = space();
        button0 = element("button");
        t1 = space();
        input = element("input");
        t2 = space();
        div0 = element("div");
        button1 = element("button");
        button1.innerHTML = `<img src="https://d411-facility-map-wc-images.s3.amazonaws.com/close.svg"/>`;
        t3 = space();
        div5 = element("div");
        div5.innerHTML = `<form><div class="form-group"><div><span class="text-[#F79120] text-[20px]"></span></div></div></form>`;
        t4 = space();
        form1 = element("form");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(img0, "class", "w-[36px] h-[36px]");
        if (!src_url_equal(img0.src, img0_src_value = `https://cdn-test.dock411.com/0000/brands/area/icon-area-${AREA_ICONS[
          /*clicked_layer_information*/
          ctx[11].type
        ] ? AREA_ICONS[
          /*clicked_layer_information*/
          ctx[11].type
        ].type : AREA_ICONS["parking"].type}.png`))
          attr(img0, "src", img0_src_value);
        attr(img0, "alt", "Marker");
        attr(input, "type", "text");
        input.readOnly = input_readonly_value = !/*editMode*/
        ctx[1];
        input.disabled = input_disabled_value = !/*editMode*/
        ctx[1];
        attr(input, "class", "text-input svelte-1gn7q08");
        attr(input, "aria-describedby", "nameHelp");
        attr(input, "placeholder", "Name");
        attr(input, "maxlength", "50");
        attr(button1, "class", "close-button  svelte-1gn7q08");
        attr(div0, "id", "conditional_buttons");
        attr(div0, "class", "mt-[-20px] ml-5");
        attr(div1, "class", "flex flex-row items-center justify-between");
        attr(div2, "class", "block pb-2");
        attr(div5, "class", "pb-4");
        attr(form1, "class", "mb-4");
      },
      m(target, anchor) {
        insert(target, div2, anchor);
        append(div2, div1);
        append(div1, img0);
        append(div1, t0);
        append(div1, button0);
        append(div1, t1);
        append(div1, input);
        set_input_value(
          input,
          /*clicked_layer_information*/
          ctx[11].name
        );
        append(div1, t2);
        append(div1, div0);
        append(div0, button1);
        insert(target, t3, anchor);
        insert(target, div5, anchor);
        insert(target, t4, anchor);
        insert(target, form1, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(form1, null);
          }
        }
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_handler_2*/
              ctx[64]
            ),
            listen(
              input,
              "input",
              /*input_input_handler_2*/
              ctx[65]
            ),
            listen(
              button1,
              "click",
              /*click_handler_15*/
              ctx[66]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*clicked_layer_information*/
        2048 && !src_url_equal(img0.src, img0_src_value = `https://cdn-test.dock411.com/0000/brands/area/icon-area-${AREA_ICONS[
          /*clicked_layer_information*/
          ctx2[11].type
        ] ? AREA_ICONS[
          /*clicked_layer_information*/
          ctx2[11].type
        ].type : AREA_ICONS["parking"].type}.png`)) {
          attr(img0, "src", img0_src_value);
        }
        if (dirty[0] & /*editMode*/
        2 && input_readonly_value !== (input_readonly_value = !/*editMode*/
        ctx2[1])) {
          input.readOnly = input_readonly_value;
        }
        if (dirty[0] & /*editMode*/
        2 && input_disabled_value !== (input_disabled_value = !/*editMode*/
        ctx2[1])) {
          input.disabled = input_disabled_value;
        }
        if (dirty[0] & /*clicked_layer_information*/
        2048 && input.value !== /*clicked_layer_information*/
        ctx2[11].name) {
          set_input_value(
            input,
            /*clicked_layer_information*/
            ctx2[11].name
          );
        }
        if (dirty[0] & /*editMode, clicked_layer_information, name_default_changer*/
        2099202) {
          each_value = ensure_array_like(AREA_COLORS);
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context2(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block2(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(form1, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div2);
          detach(t3);
          detach(div5);
          detach(t4);
          detach(form1);
        }
        destroy_each(each_blocks, detaching);
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_32(ctx) {
    let div3;
    let label;
    let div0;
    let input;
    let input_disabled_value;
    let input_readonly_value;
    let input_checked_value;
    let input_value_value;
    let t0;
    let div1;
    let t1;
    let div2;
    let t3;
    let binding_group;
    let mounted;
    let dispose;
    binding_group = init_binding_group(
      /*$$binding_groups*/
      ctx[59][0]
    );
    return {
      c() {
        div3 = element("div");
        label = element("label");
        div0 = element("div");
        input = element("input");
        t0 = space();
        div1 = element("div");
        div1.innerHTML = `<img class="mt-[1px] pr-2 w-[35px] h-[30px] ml-[5px]" src="${`https://cdn-test.dock411.com/0000/brands/area/icon-area-${/*area_color*/
        ctx[107].type}.png`}" style="color:${/*area_color*/
        ctx[107].fill};border:${/*area_color*/
        ctx[107].border}" alt="Marker"/>`;
        t1 = space();
        div2 = element("div");
        div2.textContent = `${/*area_color*/
        ctx[107].name}`;
        t3 = text("\xA0 \xA0\n                                ");
        attr(input, "type", "radio");
        attr(input, "name", "area_type");
        attr(input, "class", "area_input svelte-1gn7q08");
        input.disabled = input_disabled_value = !/*editMode*/
        ctx[1];
        input.readOnly = input_readonly_value = !/*editMode*/
        ctx[1];
        input.checked = input_checked_value = /*area_color*/
        ctx[107].type === /*clicked_layer_information*/
        ctx[11].type;
        input.__value = input_value_value = /*area_color*/
        ctx[107].type;
        set_input_value(input, input.__value);
        attr(div0, "class", "radio-toolbar");
        attr(div2, "class", "mt-[1px] ml-[1px] text-[16px] text-[#667085]");
        attr(label, "class", "label-toolbar flex flex-row gap-1 svelte-1gn7q08");
        attr(div3, "class", "mt-0.3 mb-0.3 ");
        binding_group.p(input);
      },
      m(target, anchor) {
        insert(target, div3, anchor);
        append(div3, label);
        append(label, div0);
        append(div0, input);
        input.checked = input.__value === /*clicked_layer_information*/
        ctx[11].type;
        append(label, t0);
        append(label, div1);
        append(label, t1);
        append(label, div2);
        append(div3, t3);
        if (!mounted) {
          dispose = [
            listen(
              input,
              "change",
              /*input_change_handler_2*/
              ctx[67]
            ),
            listen(input, "change", function() {
              if (is_function(
                /*name_default_changer*/
                ctx[21](
                  /*clicked_layer_information*/
                  ctx[11].layer_type
                )
              ))
                ctx[21](
                  /*clicked_layer_information*/
                  ctx[11].layer_type
                ).apply(this, arguments);
            })
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty[0] & /*editMode*/
        2 && input_disabled_value !== (input_disabled_value = !/*editMode*/
        ctx[1])) {
          input.disabled = input_disabled_value;
        }
        if (dirty[0] & /*editMode*/
        2 && input_readonly_value !== (input_readonly_value = !/*editMode*/
        ctx[1])) {
          input.readOnly = input_readonly_value;
        }
        if (dirty[0] & /*clicked_layer_information*/
        2048 && input_checked_value !== (input_checked_value = /*area_color*/
        ctx[107].type === /*clicked_layer_information*/
        ctx[11].type)) {
          input.checked = input_checked_value;
        }
        if (dirty[0] & /*clicked_layer_information*/
        2048) {
          input.checked = input.__value === /*clicked_layer_information*/
          ctx[11].type;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div3);
        }
        binding_group.r();
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_each_block2(ctx) {
    let if_block_anchor;
    let if_block = (
      /*area_color*/
      ctx[107].type !== "unknown" && create_if_block_32(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (
          /*area_color*/
          ctx2[107].type !== "unknown"
        )
          if_block.p(ctx2, dirty);
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_16(ctx) {
    let div2;
    let div1;
    let img0;
    let img0_src_value;
    let t0;
    let button0;
    let t1;
    let input;
    let input_readonly_value;
    let input_disabled_value;
    let t2;
    let div0;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        div2 = element("div");
        div1 = element("div");
        img0 = element("img");
        t0 = space();
        button0 = element("button");
        t1 = space();
        input = element("input");
        t2 = space();
        div0 = element("div");
        button1 = element("button");
        button1.innerHTML = `<img src="https://d411-facility-map-wc-images.s3.amazonaws.com/close.svg"/>`;
        attr(img0, "class", "");
        if (!src_url_equal(img0.src, img0_src_value = "https://cdn-test.dock411.com/0000/d411-facility-map/editor/route-icon.svg"))
          attr(img0, "src", img0_src_value);
        attr(input, "type", "text");
        input.readOnly = input_readonly_value = !/*editMode*/
        ctx[1];
        input.disabled = input_disabled_value = !/*editMode*/
        ctx[1];
        attr(input, "class", "text-input svelte-1gn7q08");
        attr(input, "aria-describedby", "nameHelp");
        attr(input, "placeholder", "Name");
        attr(input, "maxlength", "50");
        attr(button1, "class", "close-button  svelte-1gn7q08");
        attr(div0, "id", "conditional_buttons");
        attr(div0, "class", "mt-[-20px] ml-5");
        attr(div1, "class", "flex items-center justify-between");
        attr(div2, "class", "block pb-2");
      },
      m(target, anchor) {
        insert(target, div2, anchor);
        append(div2, div1);
        append(div1, img0);
        append(div1, t0);
        append(div1, button0);
        append(div1, t1);
        append(div1, input);
        set_input_value(
          input,
          /*clicked_layer_information*/
          ctx[11].name
        );
        append(div1, t2);
        append(div1, div0);
        append(div0, button1);
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_handler_3*/
              ctx[68]
            ),
            listen(
              input,
              "input",
              /*input_input_handler_3*/
              ctx[69]
            ),
            listen(
              button1,
              "click",
              /*click_handler_16*/
              ctx[70]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*editMode*/
        2 && input_readonly_value !== (input_readonly_value = !/*editMode*/
        ctx2[1])) {
          input.readOnly = input_readonly_value;
        }
        if (dirty[0] & /*editMode*/
        2 && input_disabled_value !== (input_disabled_value = !/*editMode*/
        ctx2[1])) {
          input.disabled = input_disabled_value;
        }
        if (dirty[0] & /*clicked_layer_information*/
        2048 && input.value !== /*clicked_layer_information*/
        ctx2[11].name) {
          set_input_value(
            input,
            /*clicked_layer_information*/
            ctx2[11].name
          );
        }
      },
      d(detaching) {
        if (detaching) {
          detach(div2);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot_3(ctx) {
    let t0;
    let t1;
    let if_block2_anchor;
    let if_block0 = (
      /*clicked_layer_information*/
      ctx[11].layer_type === "marker" && create_if_block_42(ctx)
    );
    let if_block1 = (
      /*clicked_layer_information*/
      ctx[11].layer_type === "polygon" && create_if_block_22(ctx)
    );
    let if_block2 = (
      /*clicked_layer_information*/
      ctx[11].layer_type === "polyline" && create_if_block_16(ctx)
    );
    return {
      c() {
        if (if_block0)
          if_block0.c();
        t0 = space();
        if (if_block1)
          if_block1.c();
        t1 = space();
        if (if_block2)
          if_block2.c();
        if_block2_anchor = empty();
      },
      m(target, anchor) {
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t0, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, t1, anchor);
        if (if_block2)
          if_block2.m(target, anchor);
        insert(target, if_block2_anchor, anchor);
      },
      p(ctx2, dirty) {
        if (
          /*clicked_layer_information*/
          ctx2[11].layer_type === "marker"
        ) {
          if (if_block0) {
            if_block0.p(ctx2, dirty);
          } else {
            if_block0 = create_if_block_42(ctx2);
            if_block0.c();
            if_block0.m(t0.parentNode, t0);
          }
        } else if (if_block0) {
          if_block0.d(1);
          if_block0 = null;
        }
        if (
          /*clicked_layer_information*/
          ctx2[11].layer_type === "polygon"
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
          } else {
            if_block1 = create_if_block_22(ctx2);
            if_block1.c();
            if_block1.m(t1.parentNode, t1);
          }
        } else if (if_block1) {
          if_block1.d(1);
          if_block1 = null;
        }
        if (
          /*clicked_layer_information*/
          ctx2[11].layer_type === "polyline"
        ) {
          if (if_block2) {
            if_block2.p(ctx2, dirty);
          } else {
            if_block2 = create_if_block_16(ctx2);
            if_block2.c();
            if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
          }
        } else if (if_block2) {
          if_block2.d(1);
          if_block2 = null;
        }
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(if_block2_anchor);
        }
        if (if_block0)
          if_block0.d(detaching);
        if (if_block1)
          if_block1.d(detaching);
        if (if_block2)
          if_block2.d(detaching);
      }
    };
  }
  function create_if_block4(ctx) {
    let modalbutton0;
    let t;
    let modalbutton1;
    let current;
    modalbutton0 = new ModalButton_default({
      props: {
        styles: "min-w-[195px] bg-[#FF8300] border border-solid border-[#ff8300] border-[1px] text-white",
        $$slots: { default: [create_default_slot_22] },
        $$scope: { ctx }
      }
    });
    modalbutton0.$on(
      "click",
      /*click_handler_11*/
      ctx[53]
    );
    modalbutton1 = new ModalButton_default({
      props: {
        styles: "min-w-[195px] bg-[white] border border-solid border-[#ff8300] text-[red]",
        $$slots: { default: [create_default_slot_14] },
        $$scope: { ctx }
      }
    });
    modalbutton1.$on(
      "click",
      /*click_handler_12*/
      ctx[54]
    );
    return {
      c() {
        create_component(modalbutton0.$$.fragment);
        t = space();
        create_component(modalbutton1.$$.fragment);
      },
      m(target, anchor) {
        mount_component(modalbutton0, target, anchor);
        insert(target, t, anchor);
        mount_component(modalbutton1, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const modalbutton0_changes = {};
        if (dirty[4] & /*$$scope*/
        8) {
          modalbutton0_changes.$$scope = { dirty, ctx: ctx2 };
        }
        modalbutton0.$set(modalbutton0_changes);
        const modalbutton1_changes = {};
        if (dirty[4] & /*$$scope*/
        8) {
          modalbutton1_changes.$$scope = { dirty, ctx: ctx2 };
        }
        modalbutton1.$set(modalbutton1_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(modalbutton0.$$.fragment, local);
        transition_in(modalbutton1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(modalbutton0.$$.fragment, local);
        transition_out(modalbutton1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
        destroy_component(modalbutton0, detaching);
        destroy_component(modalbutton1, detaching);
      }
    };
  }
  function create_default_slot_22(ctx) {
    let t;
    return {
      c() {
        t = text("Save");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_default_slot_14(ctx) {
    let t;
    return {
      c() {
        t = text("Delete");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_footer_slot(ctx) {
    let div;
    let current;
    let if_block = (
      /*editMode*/
      ctx[1] && create_if_block4(ctx)
    );
    return {
      c() {
        div = element("div");
        if (if_block)
          if_block.c();
        attr(div, "id", "conditional_buttons");
        attr(div, "slot", "footer");
        attr(div, "class", "flex justify-between");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        if (if_block)
          if_block.m(div, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*editMode*/
          ctx2[1]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[0] & /*editMode*/
            2) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block4(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(div, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if (if_block)
          if_block.d();
      }
    };
  }
  function create_default_slot2(ctx) {
    let div0;
    let current_block_type_index;
    let if_block;
    let t;
    let div1;
    let modal;
    let updating_showModal;
    let updating_dialog;
    let current;
    const if_block_creators = [create_if_block_9, create_else_block2];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (!/*minimize*/
      ctx2[7])
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, [-1, -1, -1, -1, -1]);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    function modal_showModal_binding(value) {
      ctx[71](value);
    }
    function modal_dialog_binding(value) {
      ctx[72](value);
    }
    let modal_props = {
      $$slots: {
        footer: [create_footer_slot],
        default: [create_default_slot_3]
      },
      $$scope: { ctx }
    };
    if (
      /*showPopup*/
      ctx[6] !== void 0
    ) {
      modal_props.showModal = /*showPopup*/
      ctx[6];
    }
    if (
      /*dialog*/
      ctx[4] !== void 0
    ) {
      modal_props.dialog = /*dialog*/
      ctx[4];
    }
    modal = new Modal_default({ props: modal_props });
    binding_callbacks.push(() => bind(modal, "showModal", modal_showModal_binding));
    binding_callbacks.push(() => bind(modal, "dialog", modal_dialog_binding));
    return {
      c() {
        div0 = element("div");
        if_block.c();
        t = space();
        div1 = element("div");
        create_component(modal.$$.fragment);
        attr(div1, "id", "map");
        attr(div1, "class", "w-[900px] h-full svelte-1gn7q08");
      },
      m(target, anchor) {
        insert(target, div0, anchor);
        if_blocks[current_block_type_index].m(div0, null);
        insert(target, t, anchor);
        insert(target, div1, anchor);
        mount_component(modal, div1, null);
        current = true;
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(div0, null);
        }
        const modal_changes = {};
        if (dirty[0] & /*selectedItemLayer, dialog, clicked_layer_information, editMode*/
        2074 | dirty[4] & /*$$scope*/
        8) {
          modal_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_showModal && dirty[0] & /*showPopup*/
        64) {
          updating_showModal = true;
          modal_changes.showModal = /*showPopup*/
          ctx2[6];
          add_flush_callback(() => updating_showModal = false);
        }
        if (!updating_dialog && dirty[0] & /*dialog*/
        16) {
          updating_dialog = true;
          modal_changes.dialog = /*dialog*/
          ctx2[4];
          add_flush_callback(() => updating_dialog = false);
        }
        modal.$set(modal_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        transition_in(modal.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        transition_out(modal.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div0);
          detach(t);
          detach(div1);
        }
        if_blocks[current_block_type_index].d();
        destroy_component(modal);
      }
    };
  }
  function create_fragment10(ctx) {
    let link0;
    let t0;
    let link1;
    let t1;
    let link2;
    let t2;
    let div;
    let d411markerstray;
    let updating_icon;
    let updating_clicked_layer_information;
    let t3;
    let mapwrapper;
    let current;
    function d411markerstray_icon_binding(value) {
      ctx[40](value);
    }
    function d411markerstray_clicked_layer_information_binding(value) {
      ctx[41](value);
    }
    let d411markerstray_props = {
      type: (
        /*markersTypeToDisplay*/
        ctx[5]
      ),
      initiateAreaDraw: (
        /*initiateAreaDraw*/
        ctx[14]
      ),
      visible_areas: (
        /*visible_areas*/
        ctx[8]
      ),
      visible_hazards: (
        /*visible_hazards*/
        ctx[9]
      ),
      visible_markers: (
        /*visible_markers*/
        ctx[10]
      )
    };
    if (
      /*icon*/
      ctx[2] !== void 0
    ) {
      d411markerstray_props.icon = /*icon*/
      ctx[2];
    }
    if (
      /*clicked_layer_information*/
      ctx[11] !== void 0
    ) {
      d411markerstray_props.clicked_layer_information = /*clicked_layer_information*/
      ctx[11];
    }
    d411markerstray = new D411MarkersTray_default({ props: d411markerstray_props });
    binding_callbacks.push(() => bind(d411markerstray, "icon", d411markerstray_icon_binding));
    binding_callbacks.push(() => bind(d411markerstray, "clicked_layer_information", d411markerstray_clicked_layer_information_binding));
    mapwrapper = new MapWrapper_default({
      props: {
        $$slots: { default: [create_default_slot2] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        link0 = element("link");
        t0 = space();
        link1 = element("link");
        t1 = space();
        link2 = element("link");
        t2 = space();
        div = element("div");
        create_component(d411markerstray.$$.fragment);
        t3 = space();
        create_component(mapwrapper.$$.fragment);
        attr(link0, "rel", "stylesheet");
        attr(link0, "href", "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
        attr(link0, "integrity", "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=");
        attr(link0, "crossorigin", "");
        attr(link1, "rel", "stylesheet");
        attr(link1, "href", "https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css");
        attr(link1, "integrity", "sha512-gc3xjCmIy673V6MyOAZhIW93xhM9ei1I+gLbmFjUHIjocENRsLX/QUE1htk5q1XV2D/iie/VQ8DXI6Vu8bexvQ==");
        attr(link1, "crossorigin", "anonymous");
        attr(link1, "referrerpolicy", "no-referrer");
        attr(link2, "rel", "stylesheet");
        attr(link2, "href", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
        attr(div, "class", "relative overflow-y-hidden");
      },
      m(target, anchor) {
        insert(target, link0, anchor);
        insert(target, t0, anchor);
        insert(target, link1, anchor);
        insert(target, t1, anchor);
        insert(target, link2, anchor);
        insert(target, t2, anchor);
        insert(target, div, anchor);
        mount_component(d411markerstray, div, null);
        append(div, t3);
        mount_component(mapwrapper, div, null);
        current = true;
      },
      p(ctx2, dirty) {
        const d411markerstray_changes = {};
        if (dirty[0] & /*markersTypeToDisplay*/
        32)
          d411markerstray_changes.type = /*markersTypeToDisplay*/
          ctx2[5];
        if (dirty[0] & /*visible_areas*/
        256)
          d411markerstray_changes.visible_areas = /*visible_areas*/
          ctx2[8];
        if (dirty[0] & /*visible_hazards*/
        512)
          d411markerstray_changes.visible_hazards = /*visible_hazards*/
          ctx2[9];
        if (dirty[0] & /*visible_markers*/
        1024)
          d411markerstray_changes.visible_markers = /*visible_markers*/
          ctx2[10];
        if (!updating_icon && dirty[0] & /*icon*/
        4) {
          updating_icon = true;
          d411markerstray_changes.icon = /*icon*/
          ctx2[2];
          add_flush_callback(() => updating_icon = false);
        }
        if (!updating_clicked_layer_information && dirty[0] & /*clicked_layer_information*/
        2048) {
          updating_clicked_layer_information = true;
          d411markerstray_changes.clicked_layer_information = /*clicked_layer_information*/
          ctx2[11];
          add_flush_callback(() => updating_clicked_layer_information = false);
        }
        d411markerstray.$set(d411markerstray_changes);
        const mapwrapper_changes = {};
        if (dirty[0] & /*showPopup, dialog, selectedItemLayer, clicked_layer_information, editMode, d411FacilityMapData, markersTypeToDisplay, minimize*/
        2299 | dirty[4] & /*$$scope*/
        8) {
          mapwrapper_changes.$$scope = { dirty, ctx: ctx2 };
        }
        mapwrapper.$set(mapwrapper_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(d411markerstray.$$.fragment, local);
        transition_in(mapwrapper.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(d411markerstray.$$.fragment, local);
        transition_out(mapwrapper.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(link0);
          detach(t0);
          detach(link1);
          detach(t1);
          detach(link2);
          detach(t2);
          detach(div);
        }
        destroy_component(d411markerstray);
        destroy_component(mapwrapper);
      }
    };
  }
  function instance10($$self, $$props, $$invalidate) {
    let clicked_layer_information;
    let previous_radio_value_type;
    let previous_radio_value_name;
    const dispatch = createEventDispatcher();
    let { editMode = false } = $$props;
    let { lat = null } = $$props;
    let { lng = null } = $$props;
    let { getD411FacilityMapDataCallback = void 0 } = $$props;
    let { d411FacilityMapData = {
      version: 4,
      copyright: `Copyright &copy; ${(/* @__PURE__ */ new Date()).getFullYear()}, Dock411 LLC. All Rights Reserved.`,
      markers: [],
      routes: [],
      areas: []
    } } = $$props;
    let { initialMapTiles = null } = $$props;
    let { initialZoom = 19 } = $$props;
    let { scrollingLocked = false } = $$props;
    let { poisAndHazards = null } = $$props;
    let { width = null } = $$props;
    let { height = null } = $$props;
    let map;
    let open_street_maps_tile_layer;
    let google_tile_layer;
    let draw_control;
    let editable_layer = new import_leaflet3.default.FeatureGroup();
    let isEditing = false;
    let icon2;
    let visible = false;
    let draw_marker;
    let selectedItemLayer = { id: null, type: "" };
    let dialog;
    let markersTypeToDisplay = "on-site-features";
    let showPopup = false;
    const onShowPopup = () => {
      $$invalidate(6, showPopup = true);
    };
    const closePopup = () => {
      $$invalidate(6, showPopup = false);
    };
    let toggleVisible = () => {
      visible = !visible;
    };
    const validateD411FacilityMapData = (d411FacilityMapDataIn) => {
      if (typeof d411FacilityMapDataIn === "object" && !Array.isArray(d411FacilityMapDataIn) && d411FacilityMapDataIn !== null) {
        d411FacilityMapDataIn = JSON.stringify(d411FacilityMapDataIn);
      }
      if (d411FacilityMapDataIn && isJsonString(d411FacilityMapDataIn) && d411FacilityMapDataIn?.includes("version")) {
        d411FacilityMapDataIn = JSON.parse(d411FacilityMapDataIn);
      } else if (lat && lng) {
        let _tmp = copyObject(d411FacilityMapData);
        _tmp.center.lat = lat;
        _tmp.center.lng = lng;
        d411FacilityMapDataIn = copyObject(d411FacilityMapData);
      } else {
        d411FacilityMapDataIn = copyObject(d411FacilityMapData);
      }
      return d411FacilityMapDataIn;
    };
    let fitMapToBounds = (mapInstance, mapData) => {
      let bounds = [];
      mapData.areas.map((area) => {
        area.vertices.forEach((ver) => {
          bounds.push([ver.lat, ver.lng]);
        });
      });
      if (bounds.length) {
        mapInstance.fitBounds(bounds, { maxZoom: 18 });
      }
    };
    let init2 = () => {
      $$invalidate(0, d411FacilityMapData = validateD411FacilityMapData(d411FacilityMapData));
      if (typeof window !== "undefined") {
        open_street_maps_tile_layer = import_leaflet3.default.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          maxNativeZoom: 19,
          maxZoom: 25
        });
        google_tile_layer = import_leaflet3.default.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
          maxNativeZoom: 19,
          maxZoom: 25
        });
        let editable_layer2 = new import_leaflet3.default.FeatureGroup();
        let base_maps = {
          "OpenStreetMap": open_street_maps_tile_layer,
          "GoogleSatellite": google_tile_layer
        };
        if (map) {
          map.remove();
        }
        if (lat && lng) {
          $$invalidate(38, map = import_leaflet3.default.map("map", { scrollWheelZoom: scrollingLocked }).setView([lat, lng], initialZoom));
          if (!d411FacilityMapData) {
            let marker = import_leaflet3.default.marker([lat, lng]);
            marker.addTo(map);
          }
        } else {
          $$invalidate(38, map = import_leaflet3.default.map("map", { scrollWheelZoom: scrollingLocked }).setView([41.9363511, -87.6642444], initialZoom));
          fitMapToBounds(map, d411FacilityMapData);
        }
        import_leaflet3.default.control.layers(base_maps).addTo(map);
        if (initialMapTiles === "google") {
          map.addLayer(google_tile_layer);
        } else {
          map.addLayer(open_street_maps_tile_layer);
        }
        map.addLayer(editable_layer2);
        console.log(editable_layer2);
        console.log(map);
        draw_control = new import_leaflet3.default.Control.Draw({
          position: "topleft",
          draw: {
            polyline: {
              shapeOptions: { color: "#38f", weight: 4, opacity: 1 }
            },
            polygon: {
              allowIntersection: true,
              // Restricts areas to simple polygons
              drawError: {
                color: "#7d53de",
                // Color the shape will turn when intersects
                message: "<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)"
                // Message that will show when intersect
              },
              draggable: true,
              shapeOptions: { color: "#7d53de", opacity: 1 }
            },
            circle: false,
            // Turns off this drawing tool
            circlemarker: false,
            rectangle: false,
            marker: { icon: "", draggable: true },
            draw: { circle: false }
          },
          edit: {
            featureGroup: editable_layer2,
            //REQUIRED!!
            remove: true
          }
        });
        map.addControl(draw_control);
        map.on("draw:created", (e) => _leafletDrawCreated(e, editable_layer2));
        map.on("draw:edited", (e) => _leafletDrawEdited(e));
        map.on("click", function(e) {
          closeAddNewModal();
          closeEditMode();
        });
        drawItemsOnMapFromDock411Json(d411FacilityMapData);
        if (!editMode) {
          for (const [key, value] of Object.entries(editable_layer2._layers)) {
            value.dragging.disable();
          }
        }
      }
    };
    let drawItemsOnMapFromDock411Json = (map_data_in) => {
      let markers = [];
      let routes = [];
      let areas = [];
      map_data_in.markers.forEach((value, index) => {
        let Icon = import_leaflet3.default.icon({
          iconUrl: icons["marker_types"]["unknown"]["marker_url"],
          iconAnchor: [0, 60],
          iconSize: [38, 95]
        });
        if (icons["marker_types"][value.code]) {
          Icon = import_leaflet3.default.icon({
            iconUrl: icons["marker_types"][value.code]["marker_url"],
            iconAnchor: [0, 60],
            iconSize: [38, 95]
          });
        }
        let marker = import_leaflet3.default.marker([value.lat, value.lng], { icon: Icon, draggable: true }).on("click", (e) => _layerOnClick(e, "marker"));
        marker.d411_id = value.id;
        marker.on("dragend", function(e) {
          let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
          map_data_to_edit.markers.forEach((value2, index2) => {
            if (value2.id === marker.d411_id) {
              value2.lat = e.target.getLatLng().lat;
              value2.lng = e.target.getLatLng().lng;
            }
          });
          $$invalidate(0, d411FacilityMapData = { ...map_data_to_edit });
        });
        marker.addTo(editable_layer);
        markers.push(value);
      });
      map_data_in.routes.forEach((value, index) => {
        if (value.isDirectional) {
          let route = import_leaflet3.default.polyline(value.vertices, { draggable: true }).arrowheads({ size: "20px", frequency: "allvertices" });
          route.d411_id = value.id;
          enableNodeTransformation(route, "polyline");
          route.addTo(editable_layer);
          routes.push(value);
        } else {
          let route = import_leaflet3.default.polyline(value.vertices);
          route.d411_id = value.id;
          enableNodeTransformation(route, "polyline");
          route.addTo(editable_layer);
          routes.push(value);
        }
      });
      map_data_in.areas.forEach((value, index) => {
        let lat_lng = [];
        value.vertices.map((v) => {
          lat_lng.push([v.lat, v.lng]);
        });
        let styles_to_set = AREA_COLORS.filter((v) => {
          return v.type === value.type;
        });
        let area = import_leaflet3.default.polygon(value.vertices, { draggable: true }).setStyle({
          color: styles_to_set.length ? styles_to_set[0].border : AREA_COLORS[7].border,
          fillColor: styles_to_set.length ? styles_to_set[0].fill : AREA_COLORS[7].fill,
          fillOpacity: 0.35
        });
        enableNodeTransformation(area, "polygon");
        area.d411_id = value.id;
        area.addTo(editable_layer);
        areas.push(value);
      });
    };
    let _leafletDrawCreated = (e, draw_items_feature_group) => {
      let type2 = e.layerType, layer = e.layer;
      draw_items_feature_group.addLayer(layer);
      layer.d411_id = layer._leaflet_id;
      if (type2 === "marker") {
        draw_items_feature_group.removeLayer(layer.d411_id);
        let iconOptions = {
          iconUrl: clicked_layer_information.marker_url,
          iconAnchor: [0, 60],
          iconSize: [38, 95]
        };
        let customIcon = import_leaflet3.default.icon(iconOptions);
        let markerOptions = {
          clickable: true,
          draggable: true,
          icon: customIcon
        };
        let newMarker = import_leaflet3.default.marker([layer.getLatLng().lat, layer.getLatLng().lng], { icon: customIcon, draggable: true }).on("click", (e2) => _layerOnClick(e2, "marker"));
        let marker_object = {
          id: layer._leaflet_id,
          lat: layer.getLatLng().lat,
          lng: layer.getLatLng().lng,
          name: clicked_layer_information.name,
          code: clicked_layer_information.code
        };
        d411FacilityMapData.markers.push(marker_object);
        $$invalidate(0, d411FacilityMapData = JSON.parse(JSON.stringify(d411FacilityMapData)));
        newMarker.d411_id = layer._leaflet_id;
        newMarker.addTo(draw_items_feature_group);
        newMarker.on("dragend", function(e2) {
          let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
          map_data_to_edit.areas.forEach((value, index) => {
            if (value.id === layer.d411_id) {
              value.lng = e2.target.getLatLngs().lng;
              value.lat = e2.target.getLatLng().lat;
            }
          });
          $$invalidate(0, d411FacilityMapData = { ...map_data_to_edit });
        });
        if (icon2.is_hazard === true) {
          toggleVisible_hazards();
        }
        if (icon2.is_hazard === false) {
          toggleVisible_markers();
        }
        $$invalidate(3, selectedItemLayer.id = layer.d411_id, selectedItemLayer);
      }
      if (type2 === "polygon") {
        draw_items_feature_group.removeLayer(layer.d411_id);
        let styles_to_set = AREA_COLORS.filter((v) => {
          return v.type === clicked_layer_information.type;
        });
        let area = import_leaflet3.default.polygon(layer.getLatLngs(), { draggable: true }).setStyle({
          color: styles_to_set.length ? styles_to_set[0].border : AREA_COLORS[7].border,
          fillColor: styles_to_set.length ? styles_to_set[0].fill : AREA_COLORS[7].fill,
          fillOpacity: 0.35
        });
        let area_object = {
          id: layer._leaflet_id,
          name: clicked_layer_information.name,
          vertices: layer.getLatLngs()[0],
          type: clicked_layer_information.type
        };
        d411FacilityMapData.areas.push(area_object);
        $$invalidate(0, d411FacilityMapData = JSON.parse(JSON.stringify(d411FacilityMapData)));
        area.d411_id = layer._leaflet_id;
        area.addTo(draw_items_feature_group);
        enableNodeTransformation(area, type2);
        $$invalidate(3, selectedItemLayer.id = layer.d411_id, selectedItemLayer);
      }
      if (type2 === "polyline") {
        draw_items_feature_group.removeLayer(layer._leaflet_id);
        let arrow_line = import_leaflet3.default.polyline(layer.getLatLngs(), { draggable: true }).arrowheads({ size: "20px", frequency: "allvertices" });
        arrow_line.layerType = "polyline";
        arrow_line.isDirectional = true;
        arrow_line.addTo(draw_items_feature_group);
        arrow_line.d411_id = arrow_line._leaflet_id;
        let route_object = {
          id: arrow_line._leaflet_id,
          name: `Route`,
          type: "",
          vertices: arrow_line.getLatLngs(),
          isDirectional: true
        };
        d411FacilityMapData.routes.push(route_object);
        $$invalidate(0, d411FacilityMapData = JSON.parse(JSON.stringify(d411FacilityMapData)));
        enableNodeTransformation(arrow_line, "polyline");
      }
    };
    let _leafletDrawEdited = (e) => {
      let layers = e.layers;
      layers.eachLayer(function(layer) {
        if (layer instanceof import_leaflet3.default.Marker) {
          let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
          let index_of_marker_being_edited = map_data_to_edit.markers.findIndex((marker) => marker.id === layer.d411_id);
          if (map_data_to_edit.markers[index_of_marker_being_edited]) {
            map_data_to_edit.markers[index_of_marker_being_edited].lat = layer.getLatLng().lat;
            map_data_to_edit.markers[index_of_marker_being_edited].lng = layer.getLatLng().lng;
            $$invalidate(0, d411FacilityMapData = map_data_to_edit);
          }
        }
        if (layer instanceof import_leaflet3.default.Polygon) {
          let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
          let index_of_area_being_edited = map_data_to_edit.areas.findIndex((area) => area.id === layer.d411_id);
          map_data_to_edit.areas[index_of_area_being_edited].vertices = layer.getLatLngs()[0];
          $$invalidate(0, d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit)));
        }
        if (layer instanceof import_leaflet3.default.Polyline && !(layer instanceof import_leaflet3.default.Polygon)) {
          let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
          let index_of_route_being_edited = map_data_to_edit.routes.findIndex((route) => route.id === layer.d411_id);
          map_data_to_edit.routes[index_of_route_being_edited].vertices = layer.getLatLngs();
          $$invalidate(0, d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit)));
        }
      });
    };
    let _leafletDrawDelete = (e) => {
      let layers = e.layers;
      layers.eachLayer(function(layer) {
        if (layer instanceof import_leaflet3.default.Marker) {
          let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
          map_data_to_edit.markers = map_data_to_edit.markers.filter((marker) => marker.id !== layer.d411_id);
          $$invalidate(0, d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit)));
        }
        if (layer instanceof import_leaflet3.default.Polygon) {
          let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
          map_data_to_edit.areas = map_data_to_edit.areas.filter((area) => area.id !== layer.d411_id);
          $$invalidate(0, d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit)));
        }
        if (layer instanceof import_leaflet3.default.Polyline && !(layer instanceof import_leaflet3.default.Polygon)) {
          let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
          map_data_to_edit.routes = map_data_to_edit.routes.filter((route) => route.id !== layer.d411_id);
          $$invalidate(0, d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit)));
        }
      });
    };
    const handleSideMenuClick = (type2, id) => {
      map_disable();
      if (type2 === "polygon") {
        let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
        let index_of_area_being_edited = map_data_to_edit.areas.findIndex((area) => area.id === id);
        let clicked_layer_temp = JSON.parse(JSON.stringify(clicked_layer_information));
        clicked_layer_temp.layer_type = "polygon";
        clicked_layer_temp.id = map_data_to_edit.areas[index_of_area_being_edited].id;
        clicked_layer_temp.code = "";
        clicked_layer_temp.name = map_data_to_edit.areas[index_of_area_being_edited].name;
        clicked_layer_temp.type = map_data_to_edit.areas[index_of_area_being_edited].type;
        clicked_layer_temp.code = map_data_to_edit.areas[index_of_area_being_edited].type;
        if (AREA_ICONS[map_data_to_edit.areas[index_of_area_being_edited].type]) {
          clicked_layer_temp.border = AREA_ICONS[map_data_to_edit.areas[index_of_area_being_edited].type].border;
        } else {
          clicked_layer_temp.border = AREA_ICONS.other.border;
        }
        $$invalidate(11, clicked_layer_information = clicked_layer_temp);
        onShowPopup();
        $$invalidate(6, showPopup = true);
        previous_value_of_map_data = map_data_to_edit.areas[index_of_area_being_edited];
        current_edit_value_of_name = clicked_layer_temp.name;
        previous_radio_value_type = previous_value_of_map_data.type;
        previous_radio_value_name = area_names[previous_value_of_map_data.type];
        $$invalidate(3, selectedItemLayer.id = clicked_layer_temp.id, selectedItemLayer);
        $$invalidate(3, selectedItemLayer.type = "area", selectedItemLayer);
      }
      if (type2 === "marker") {
        let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
        let index_of_marker_being_edited = map_data_to_edit.markers.findIndex((marker) => marker.id === id);
        let clicked_layer_temp = JSON.parse(JSON.stringify(clicked_layer_information));
        if (map_of_hazard_codes.includes(clicked_layer_information.code)) {
          $$invalidate(11, clicked_layer_information.is_hazard = true, clicked_layer_information);
        } else {
          $$invalidate(11, clicked_layer_information.is_hazard = false, clicked_layer_information);
        }
        clicked_layer_temp.layer_type = "marker";
        clicked_layer_temp.id = map_data_to_edit.markers[index_of_marker_being_edited].id;
        clicked_layer_temp.code = map_data_to_edit.markers[index_of_marker_being_edited].code;
        clicked_layer_temp.name = map_data_to_edit.markers[index_of_marker_being_edited].name;
        clicked_layer_temp.type = map_data_to_edit.markers[index_of_marker_being_edited].code;
        clicked_layer_temp.is_hazard = map_of_hazard_codes.includes(map_data_to_edit.markers[index_of_marker_being_edited].code);
        if (icons.marker_types[map_data_to_edit.markers[index_of_marker_being_edited].code]) {
          clicked_layer_temp.marker_url = icons.marker_types[map_data_to_edit.markers[index_of_marker_being_edited].code].marker_url;
        } else {
          clicked_layer_temp.marker_url = icons.marker_types.other.marker_url;
        }
        $$invalidate(11, clicked_layer_information = clicked_layer_temp);
        previous_value_of_map_data = map_data_to_edit.markers[index_of_marker_being_edited];
        current_edit_value_of_name = clicked_layer_temp.name;
        previous_radio_value_type = previous_value_of_map_data.type;
        previous_radio_value_name = icons.marker_types[previous_value_of_map_data.code].name;
        onShowPopup();
        $$invalidate(6, showPopup = true);
        $$invalidate(3, selectedItemLayer.id = clicked_layer_temp.id, selectedItemLayer);
        $$invalidate(3, selectedItemLayer.type = "marker", selectedItemLayer);
      }
      if (type2 === "polyline") {
        let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
        let index_of_route_being_edited = map_data_to_edit.routes.findIndex((area) => area.id === id);
        let clicked_layer_temp = JSON.parse(JSON.stringify(clicked_layer_information));
        clicked_layer_temp.layer_type = "polyline";
        clicked_layer_temp.id = map_data_to_edit.routes[index_of_route_being_edited].id;
        clicked_layer_temp.code = "";
        clicked_layer_temp.name = map_data_to_edit.routes[index_of_route_being_edited].name;
        $$invalidate(11, clicked_layer_information = clicked_layer_temp);
        onShowPopup();
        $$invalidate(6, showPopup = true);
        previous_value_of_map_data = map_data_to_edit.routes[index_of_route_being_edited];
        current_edit_value_of_name = clicked_layer_temp.name;
        $$invalidate(3, selectedItemLayer.id = clicked_layer_temp.id, selectedItemLayer);
        $$invalidate(3, selectedItemLayer.type = "route", selectedItemLayer);
      }
    };
    let _layerOnClick = (e, type2) => {
      current_edit_value_of_name = "";
      let layer = e.target;
      map_disable();
      if (type2 === "marker") {
        handleSideMenuClick(type2, layer.d411_id);
      }
      if (type2 === "polygon") {
        handleSideMenuClick(type2, layer.d411_id);
      }
      if (type2 === "polyline") {
        handleSideMenuClick(type2, layer.d411_id);
      }
    };
    onMount(() => {
      if (window && typeof window != "undefined") {
        init2();
        if (document.getElementsByClassName("leaflet-draw-section").length) {
          document.getElementsByClassName("leaflet-draw-section")[0].style.visibility = "hidden";
        }
        if (document.querySelectorAll(".leaflet-draw-toolbar").length) {
          document.querySelectorAll(".leaflet-draw-toolbar").forEach((item) => {
            item.style.visibility = "hidden";
          });
        }
      }
    });
    function dispatchMapData() {
      dispatch("getD411FacilityMapDataCallback", { data: d411FacilityMapData });
    }
    const initiateAreaDraw = () => {
      draw_control.options.draw.polygon.shapeOptions.color = clicked_layer_information.border;
      document.getElementById("map").focus();
      if (document.querySelector(".leaflet-draw-draw-polygon")) {
        document.querySelector(".leaflet-draw-draw-polygon").click();
      }
    };
    const initiateRouteDraw = () => {
      document.getElementById("map").focus();
      if (document.querySelector(".leaflet-draw-draw-polyline")) {
        document.querySelector(".leaflet-draw-draw-polyline").click();
      }
    };
    const deleteItem = (id, type2) => {
      editable_layer.removeLayer(id);
      let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
      switch (type2) {
        case "route":
          map_data_to_edit.routes = map_data_to_edit.routes.filter((route) => route.id !== id);
          $$invalidate(0, d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit)));
          map.eachLayer((layer) => {
            if (layer.d411_id === clicked_layer_information.id) {
              layer.remove(id);
            }
          });
          break;
        case "area":
          map_data_to_edit.areas = map_data_to_edit.areas.filter((area) => area.id !== id);
          $$invalidate(0, d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit)));
          map.eachLayer((layer) => {
            if (layer.d411_id === clicked_layer_information.id) {
              layer.remove(id);
            }
          });
          break;
        case "marker":
          map_data_to_edit.markers = map_data_to_edit.markers.filter((marker) => marker.id !== id);
          $$invalidate(0, d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit)));
          map.eachLayer((layer) => {
            if (layer.d411_id === clicked_layer_information.id) {
              layer.remove(id);
            }
          });
          break;
      }
    };
    const saveEdit = () => {
      document.querySelector(".leaflet-draw-edit-edit").click();
      document.querySelector('[title="Save changes"]').click();
      isEditing = false;
    };
    const initiateEdit = (id) => {
      editable_layer.getLayer(id).editing.enable();
      isEditing = true;
    };
    const onNameInputChange = (e) => {
      current_edit_value_of_name = e.target.value;
    };
    const onTypeInputChange = (selected_area_type, clicked_layer_type) => {
      if (selected_area_type === "area") {
        let layer_to_edit = null;
        editable_layer.eachLayer((layer) => {
          if (layer.d411_id === clicked_layer_information.id) {
            layer_to_edit = layer;
            let styles_to_set = AREA_COLORS.filter((v) => {
              return v.type === clicked_layer_type;
            });
            layer_to_edit.setStyle({
              color: styles_to_set[0].border,
              fillColor: styles_to_set[0].fill,
              fillOpacity: 0.35
            });
          }
        });
      }
      if (selected_area_type === "marker") {
        let layer_to_remove = null;
        editable_layer.eachLayer((layer) => {
          if (layer.d411_id == clicked_layer_information.id) {
            layer_to_remove = layer;
          }
        });
        let iconToChange = import_leaflet3.default.icon({
          iconUrl: icons.marker_types[clicked_layer_information.type] ? icons.marker_types[clicked_layer_information.type].marker_url : icons.marker_types.other.marker_url,
          iconAnchor: [0, 60],
          iconSize: [38, 95]
        });
        let lat2 = layer_to_remove.getLatLng().lat;
        let lng2 = layer_to_remove.getLatLng().lng;
        editable_layer.removeLayer(layer_to_remove._leaflet_id);
        let marker = import_leaflet3.default.marker([lat2, lng2], { icon: iconToChange, draggable: true }).on("click", (e) => _layerOnClick(e, "marker"));
        marker.d411_id = clicked_layer_information.id;
        marker.addTo(editable_layer);
      }
    };
    let minimize = false;
    const toogleMinimize = () => {
      $$invalidate(7, minimize = !minimize);
    };
    let previous_value_of_map_data = null;
    let current_edit_value_of_name = "";
    const cancelItem = (id, type2) => {
      if (type2 === "marker") {
        let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
        let index_of_marker_being_edited = map_data_to_edit.markers.findIndex((previous_value_of_map_data2) => previous_value_of_map_data2.id === id);
        map_data_to_edit.markers[index_of_marker_being_edited].name = previous_value_of_map_data.name;
        map_data_to_edit.markers[index_of_marker_being_edited].type = previous_value_of_map_data.type;
        $$invalidate(0, d411FacilityMapData = map_data_to_edit);
      }
      if (type2 === "area") {
        let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
        let index_of_area_being_edited = map_data_to_edit.areas.findIndex((previous_value_of_map_data2) => previous_value_of_map_data2.id === id);
        map_data_to_edit.areas[index_of_area_being_edited].name = previous_value_of_map_data.name;
        map_data_to_edit.areas[index_of_area_being_edited].type = previous_value_of_map_data.type;
        map_data_to_edit.areas[index_of_area_being_edited];
        $$invalidate(0, d411FacilityMapData = map_data_to_edit);
      }
      if (type2 === "route") {
        let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
        let index_of_route_being_edited = map_data_to_edit.routes.findIndex((previous_value_of_map_data2) => previous_value_of_map_data2.id === id);
        map_data_to_edit.routes[index_of_route_being_edited].name = previous_value_of_map_data.name;
        $$invalidate(0, d411FacilityMapData = map_data_to_edit);
      }
      current_edit_value_of_name = previous_value_of_map_data.name;
    };
    const saveItem = (id, selected_item_type) => {
      map_enable();
      if (current_edit_value_of_name === "") {
        if (selected_item_type === "area") {
          current_edit_value_of_name = area_names[clicked_layer_information.type];
        }
        if (selected_item_type === "marker") {
          current_edit_value_of_name = icons.marker_types[clicked_layer_information.type].name;
        }
        if (selected_item_type === "route") {
          current_edit_value_of_name = "Route";
        }
      }
      if (selected_item_type === "marker") {
        let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
        let index_of_marker_being_edited = map_data_to_edit.markers.findIndex((current_edit_value_of_name2) => current_edit_value_of_name2.id === clicked_layer_information.id);
        map_data_to_edit.markers[index_of_marker_being_edited].name = current_edit_value_of_name;
        map_data_to_edit.markers[index_of_marker_being_edited].code = clicked_layer_information.type;
        onTypeInputChange(selected_item_type, clicked_layer_information.type);
        $$invalidate(0, d411FacilityMapData = map_data_to_edit);
      }
      if (selected_item_type === "area") {
        let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
        let index_of_area_being_edited = map_data_to_edit.areas.findIndex((current_edit_value_of_name2) => current_edit_value_of_name2.id === clicked_layer_information.id);
        map_data_to_edit.areas[index_of_area_being_edited].name = current_edit_value_of_name;
        map_data_to_edit.areas[index_of_area_being_edited].type = clicked_layer_information.type;
        map_data_to_edit.areas[index_of_area_being_edited].code = clicked_layer_information.code;
        onTypeInputChange(selected_item_type, clicked_layer_information.type);
        $$invalidate(0, d411FacilityMapData = map_data_to_edit);
      }
      if (selected_item_type === "route") {
        let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
        let index_of_route_being_edited = map_data_to_edit.routes.findIndex((current_edit_value_of_name2) => current_edit_value_of_name2.id === clicked_layer_information.id);
        map_data_to_edit.routes[index_of_route_being_edited].name = current_edit_value_of_name;
        $$invalidate(0, d411FacilityMapData = map_data_to_edit);
      }
    };
    const area_names = {
      building_structure: "Building/Structure",
      parking: "Parking",
      do_not_enter: "Do Not Enter",
      staging: "Staging",
      yard: "Yard",
      secure: "Secure",
      other: "Other",
      unknown: "Unknown"
    };
    const name_default_changer = (type2) => {
      if (type2 === "polygon") {
        if (clicked_layer_information.type != previous_radio_value_type) {
          if (previous_radio_value_name === current_edit_value_of_name) {
            $$invalidate(11, clicked_layer_information.name = area_names[clicked_layer_information.type], clicked_layer_information);
            previous_radio_value_type = clicked_layer_information.type;
            previous_radio_value_name = clicked_layer_information.name;
            current_edit_value_of_name = clicked_layer_information.name;
          }
        }
      }
      if (type2 === "marker") {
        if (clicked_layer_information.type != previous_radio_value_type) {
          if (previous_radio_value_name === current_edit_value_of_name) {
            $$invalidate(11, clicked_layer_information.name = icons.marker_types[clicked_layer_information.type].name, clicked_layer_information);
            previous_radio_value_type = clicked_layer_information.type;
            previous_radio_value_name = clicked_layer_information.name;
            current_edit_value_of_name = clicked_layer_information.name;
            $$invalidate(11, clicked_layer_information.marker_url = icons.marker_types[clicked_layer_information.type].marker_url, clicked_layer_information);
          }
        }
      }
    };
    const closeAddNewModal = () => {
      $$invalidate(8, visible_areas = false);
      $$invalidate(9, visible_hazards = false);
      $$invalidate(10, visible_markers = false);
    };
    const closeEditMode = () => {
      nodeEditMode = false;
      for (const [key, value] of Object.entries(editable_layer._layers)) {
        if (value.editing && value.editing.enabled()) {
          value.editing.disable();
          let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
          if (value instanceof import_leaflet3.default.Polygon) {
            map_data_to_edit.areas.forEach((area, index) => {
              if (value.d411_id === area.id) {
                let _latlngs = value.getLatLngs();
                let latlngs = [];
                _latlngs.forEach((lln) => {
                  lln.forEach((l2) => {
                    latlngs.push({ lat: l2.lat, lng: l2.lng });
                  });
                });
                area.vertices = latlngs;
                $$invalidate(0, d411FacilityMapData = { ...map_data_to_edit });
              }
            });
          } else if (value instanceof import_leaflet3.default.Polyline) {
            map_data_to_edit.routes.forEach((route, index) => {
              if (value.d411_id === route.id) {
                let _latlngs = value.getLatLngs();
                let latlngs = [];
                _latlngs.forEach((l2) => {
                  latlngs.push({ lat: l2.lat, lng: l2.lng });
                });
                route.vertices = latlngs;
                $$invalidate(0, d411FacilityMapData = { ...map_data_to_edit });
              }
            });
          }
        }
      }
    };
    let visible_areas = false;
    let visible_hazards = false;
    let visible_markers = false;
    let toggleVisible_areas = () => {
      $$invalidate(8, visible_areas = !visible_areas);
    };
    let toggleVisible_hazards = () => {
      $$invalidate(9, visible_hazards = !visible_hazards);
    };
    let toggleVisible_markers = () => {
      $$invalidate(10, visible_markers = !visible_markers);
    };
    const check_other_add_new_modals = (type2) => {
      if (type2 === "areas") {
        if (visible_hazards === true) {
          toggleVisible_hazards();
        }
        if (visible_markers === true) {
          toggleVisible_markers();
        }
      }
      if (type2 === "markers") {
        if (visible_areas === true) {
          toggleVisible_areas();
        }
        if (visible_hazards === true) {
          toggleVisible_hazards();
        }
      }
      if (type2 === "hazards") {
        if (visible_areas === true) {
          toggleVisible_areas();
        }
        if (visible_markers === true) {
          toggleVisible_markers();
        }
      }
    };
    const map_of_hazard_codes = [
      "accident",
      "debris",
      "low_clearance",
      "low_wires",
      "other",
      "pothole",
      "tight_turn",
      "work_zone"
    ];
    let pressTimer;
    let holdClick = false;
    const map_disable = () => {
      if (map) {
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
      }
    };
    const map_enable = () => {
      if (map) {
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
      }
    };
    let nodeEditMode = false;
    const enableEditingMode = (polygon_or_polyline) => {
      nodeEditMode = true;
      polygon_or_polyline.editing.enable();
    };
    const disableEditingMode = (polygon_or_polyline) => {
      nodeEditMode = false;
      polygon_or_polyline.editing.disable();
    };
    setInterval(
      () => {
        if (showPopup) {
          map_disable();
        } else {
          map_enable();
        }
      },
      500
    );
    const enableNodeTransformation = (polygon_or_polyline, type2) => {
      let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
      const mouseUpCheck = () => {
        clearTimeout(pressTimer);
        window.removeEventListener("mouseup", mouseUpCheck);
      };
      polygon_or_polyline.on("dragend", function(e) {
        map_data_to_edit.areas.forEach((value, index) => {
          if (value.id === polygon_or_polyline.d411_id) {
            let _latlngs = e.target.getLatLngs();
            let latlngs = [];
            _latlngs.forEach((lln) => {
              lln.forEach((l2) => {
                latlngs.push({ lat: l2.lat, lng: l2.lng });
              });
            });
            value.vertices = latlngs;
            $$invalidate(0, d411FacilityMapData = { ...map_data_to_edit });
          }
        });
      });
      polygon_or_polyline.addEventListener("mousedown", function(e) {
        import_leaflet3.default.DomEvent.stopPropagation(e);
        polygon_or_polyline.addEventListener("mouseup", mouseUpCheck);
        pressTimer = window.setTimeout(
          function() {
            holdClick = true;
            closeEditMode();
            if (holdClick === true) {
              nodeEditMode = true;
              if (editMode) {
                editable_layer.eachLayer(function(layer) {
                  if (layer.d411_id == polygon_or_polyline.d411_id) {
                    layer.editing.enable();
                  }
                });
              }
            }
          },
          500
        );
      });
      polygon_or_polyline?.addEventListener("drag", () => {
        disableEditingMode(polygon_or_polyline);
      });
      polygon_or_polyline?.addEventListener("click", function(event) {
        import_leaflet3.default.DomEvent.stopPropagation(event);
        if (holdClick) {
          holdClick = false;
          return;
        }
        _layerOnClick(event, type2);
      });
    };
    const $$binding_groups = [[]];
    function d411markerstray_icon_binding(value) {
      icon2 = value;
      $$invalidate(2, icon2);
    }
    function d411markerstray_clicked_layer_information_binding(value) {
      clicked_layer_information = value;
      $$invalidate(11, clicked_layer_information);
    }
    const click_handler = (area, e) => {
      handleSideMenuClick("polygon", area.id);
    };
    const click_handler_1 = (area) => {
      handleSideMenuClick("polygon", area.id);
    };
    const click_handler_2 = () => {
      check_other_add_new_modals("areas");
      toggleVisible_areas();
      closeEditMode();
      $$invalidate(5, markersTypeToDisplay = "areas");
    };
    const click_handler_3 = (marker, e) => {
      handleSideMenuClick("marker", marker.id);
    };
    const click_handler_4 = (marker) => {
      handleSideMenuClick("marker", marker.id);
    };
    const click_handler_5 = () => {
      check_other_add_new_modals("hazards");
      toggleVisible_hazards();
      $$invalidate(5, markersTypeToDisplay = "hazards");
      closeEditMode();
    };
    const click_handler_6 = (marker, e) => {
      handleSideMenuClick("marker", marker.id);
    };
    const click_handler_7 = (marker, e) => {
      handleSideMenuClick("marker", marker.id);
    };
    const click_handler_8 = () => {
      check_other_add_new_modals("markers");
      toggleVisible_markers();
      $$invalidate(5, markersTypeToDisplay = "on-site-features");
      closeEditMode();
    };
    const click_handler_9 = (route, e) => {
      handleSideMenuClick("polyline", route.id);
    };
    const click_handler_10 = () => {
      closeAddNewModal();
      initiateRouteDraw();
      closeEditMode();
    };
    const click_handler_11 = () => {
      dialog.close();
      saveItem(selectedItemLayer.id, selectedItemLayer.type, clicked_layer_information.type);
      closePopup();
    };
    const click_handler_12 = () => {
      let result = confirm("Are you sure you want to delete?");
      if (result) {
        deleteItem(selectedItemLayer.id, selectedItemLayer.type);
        dialog.close();
        closePopup();
      }
    };
    const input_handler = (e) => onNameInputChange(e);
    function input_input_handler() {
      clicked_layer_information.name = this.value;
      $$invalidate(11, clicked_layer_information);
    }
    const click_handler_13 = () => {
      cancelItem(selectedItemLayer.id, selectedItemLayer.type);
      dialog.close();
      closePopup();
    };
    function input_change_handler() {
      clicked_layer_information.type = this.__value;
      $$invalidate(11, clicked_layer_information);
    }
    const input_handler_1 = (e) => onNameInputChange(e);
    function input_input_handler_1() {
      clicked_layer_information.name = this.value;
      $$invalidate(11, clicked_layer_information);
    }
    const click_handler_14 = () => {
      cancelItem(selectedItemLayer.id, selectedItemLayer.type);
      dialog.close();
      closePopup();
    };
    function input_change_handler_1() {
      clicked_layer_information.type = this.__value;
      $$invalidate(11, clicked_layer_information);
    }
    const input_handler_2 = (e) => onNameInputChange(e);
    function input_input_handler_2() {
      clicked_layer_information.name = this.value;
      $$invalidate(11, clicked_layer_information);
    }
    const click_handler_15 = () => {
      cancelItem(selectedItemLayer.id, selectedItemLayer.type);
      dialog.close();
      closePopup();
    };
    function input_change_handler_2() {
      clicked_layer_information.type = this.__value;
      $$invalidate(11, clicked_layer_information);
    }
    const input_handler_3 = (e) => onNameInputChange(e);
    function input_input_handler_3() {
      clicked_layer_information.name = this.value;
      $$invalidate(11, clicked_layer_information);
    }
    const click_handler_16 = () => {
      cancelItem(selectedItemLayer.id, selectedItemLayer.type);
      dialog.close();
      closePopup();
    };
    function modal_showModal_binding(value) {
      showPopup = value;
      $$invalidate(6, showPopup);
    }
    function modal_dialog_binding(value) {
      dialog = value;
      $$invalidate(4, dialog);
    }
    $$self.$$set = ($$props2) => {
      if ("editMode" in $$props2)
        $$invalidate(1, editMode = $$props2.editMode);
      if ("lat" in $$props2)
        $$invalidate(29, lat = $$props2.lat);
      if ("lng" in $$props2)
        $$invalidate(30, lng = $$props2.lng);
      if ("getD411FacilityMapDataCallback" in $$props2)
        $$invalidate(31, getD411FacilityMapDataCallback = $$props2.getD411FacilityMapDataCallback);
      if ("d411FacilityMapData" in $$props2)
        $$invalidate(0, d411FacilityMapData = $$props2.d411FacilityMapData);
      if ("initialMapTiles" in $$props2)
        $$invalidate(32, initialMapTiles = $$props2.initialMapTiles);
      if ("initialZoom" in $$props2)
        $$invalidate(33, initialZoom = $$props2.initialZoom);
      if ("scrollingLocked" in $$props2)
        $$invalidate(34, scrollingLocked = $$props2.scrollingLocked);
      if ("poisAndHazards" in $$props2)
        $$invalidate(35, poisAndHazards = $$props2.poisAndHazards);
      if ("width" in $$props2)
        $$invalidate(36, width = $$props2.width);
      if ("height" in $$props2)
        $$invalidate(37, height = $$props2.height);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty[0] & /*d411FacilityMapData*/
      1) {
        $:
          if (d411FacilityMapData) {
            dispatchMapData();
          }
      }
      if ($$self.$$.dirty[0] & /*icon*/
      4 | $$self.$$.dirty[1] & /*draw_marker, map*/
      384) {
        $:
          if (icon2) {
            if (draw_marker) {
              draw_marker.disable();
              $$invalidate(39, draw_marker = null);
            }
            $$invalidate(39, draw_marker = new import_leaflet3.default.Draw.Marker(
              map,
              {
                icon: setMarkerIconProperties(icon2),
                "draggable": true
              }
            ));
            draw_marker.enable();
          }
      }
      if ($$self.$$.dirty[0] & /*d411FacilityMapData*/
      1) {
        $:
          if (d411FacilityMapData) {
          }
      }
      if ($$self.$$.dirty[0] & /*editMode*/
      2) {
        $:
          if (!editMode && editable_layer) {
            for (const [key, value] of Object.entries(editable_layer._layers)) {
              value.dragging.disable();
            }
          } else {
            for (const [key, value] of Object.entries(editable_layer._layers)) {
              value.dragging.enable();
            }
          }
      }
    };
    $:
      $$invalidate(11, clicked_layer_information = {
        layer_type: "",
        id: 0,
        name: "",
        code: "",
        type: "",
        border: "",
        fill: "",
        is_hazard: false,
        marker_url: "",
        is_facility_property: "",
        vertices: []
      });
    $:
      previous_radio_value_type = "";
    $:
      previous_radio_value_name = "";
    return [
      d411FacilityMapData,
      editMode,
      icon2,
      selectedItemLayer,
      dialog,
      markersTypeToDisplay,
      showPopup,
      minimize,
      visible_areas,
      visible_hazards,
      visible_markers,
      clicked_layer_information,
      closePopup,
      handleSideMenuClick,
      initiateAreaDraw,
      initiateRouteDraw,
      deleteItem,
      onNameInputChange,
      toogleMinimize,
      cancelItem,
      saveItem,
      name_default_changer,
      closeAddNewModal,
      closeEditMode,
      toggleVisible_areas,
      toggleVisible_hazards,
      toggleVisible_markers,
      check_other_add_new_modals,
      map_of_hazard_codes,
      lat,
      lng,
      getD411FacilityMapDataCallback,
      initialMapTiles,
      initialZoom,
      scrollingLocked,
      poisAndHazards,
      width,
      height,
      map,
      draw_marker,
      d411markerstray_icon_binding,
      d411markerstray_clicked_layer_information_binding,
      click_handler,
      click_handler_1,
      click_handler_2,
      click_handler_3,
      click_handler_4,
      click_handler_5,
      click_handler_6,
      click_handler_7,
      click_handler_8,
      click_handler_9,
      click_handler_10,
      click_handler_11,
      click_handler_12,
      input_handler,
      input_input_handler,
      click_handler_13,
      input_change_handler,
      $$binding_groups,
      input_handler_1,
      input_input_handler_1,
      click_handler_14,
      input_change_handler_1,
      input_handler_2,
      input_input_handler_2,
      click_handler_15,
      input_change_handler_2,
      input_handler_3,
      input_input_handler_3,
      click_handler_16,
      modal_showModal_binding,
      modal_dialog_binding
    ];
  }
  var D411FacilityMap = class extends SvelteComponent {
    constructor(options) {
      super();
      init(
        this,
        options,
        instance10,
        create_fragment10,
        safe_not_equal,
        {
          editMode: 1,
          lat: 29,
          lng: 30,
          getD411FacilityMapDataCallback: 31,
          d411FacilityMapData: 0,
          initialMapTiles: 32,
          initialZoom: 33,
          scrollingLocked: 34,
          poisAndHazards: 35,
          width: 36,
          height: 37
        },
        add_css3,
        [-1, -1, -1, -1, -1]
      );
    }
    get editMode() {
      return this.$$.ctx[1];
    }
    set editMode(editMode) {
      this.$$set({ editMode });
      flush();
    }
    get lat() {
      return this.$$.ctx[29];
    }
    set lat(lat) {
      this.$$set({ lat });
      flush();
    }
    get lng() {
      return this.$$.ctx[30];
    }
    set lng(lng) {
      this.$$set({ lng });
      flush();
    }
    get getD411FacilityMapDataCallback() {
      return this.$$.ctx[31];
    }
    set getD411FacilityMapDataCallback(getD411FacilityMapDataCallback) {
      this.$$set({ getD411FacilityMapDataCallback });
      flush();
    }
    get d411FacilityMapData() {
      return this.$$.ctx[0];
    }
    set d411FacilityMapData(d411FacilityMapData) {
      this.$$set({ d411FacilityMapData });
      flush();
    }
    get initialMapTiles() {
      return this.$$.ctx[32];
    }
    set initialMapTiles(initialMapTiles) {
      this.$$set({ initialMapTiles });
      flush();
    }
    get initialZoom() {
      return this.$$.ctx[33];
    }
    set initialZoom(initialZoom) {
      this.$$set({ initialZoom });
      flush();
    }
    get scrollingLocked() {
      return this.$$.ctx[34];
    }
    set scrollingLocked(scrollingLocked) {
      this.$$set({ scrollingLocked });
      flush();
    }
    get poisAndHazards() {
      return this.$$.ctx[35];
    }
    set poisAndHazards(poisAndHazards) {
      this.$$set({ poisAndHazards });
      flush();
    }
    get width() {
      return this.$$.ctx[36];
    }
    set width(width) {
      this.$$set({ width });
      flush();
    }
    get height() {
      return this.$$.ctx[37];
    }
    set height(height) {
      this.$$set({ height });
      flush();
    }
  };
  customElements.define("d411-facility-map", create_custom_element(D411FacilityMap, { "editMode": { "type": "Boolean" }, "lat": {}, "lng": {}, "getD411FacilityMapDataCallback": {}, "d411FacilityMapData": {}, "initialMapTiles": {}, "initialZoom": {}, "scrollingLocked": { "type": "Boolean" }, "poisAndHazards": {}, "width": {}, "height": {} }, [], [], false));
  var D411FacilityMap_default = D411FacilityMap;
})();
/*! Bundled license information:

leaflet/dist/leaflet-src.js:
  (* @preserve
   * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
   * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
   *)

leaflet-path-drag/dist/index.mjs:
  (**
   * Leaflet vector features drag functionality
   * @author Alexander Milevski <info@w8r.name>
   * @preserve
   *)
*/
