/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/display/display-container.ts":
/*!******************************************!*\
  !*** ./src/display/display-container.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var display_1 = __importDefault(__webpack_require__(/*! ./display */ "./src/display/display.ts"));
var stage_1 = __importDefault(__webpack_require__(/*! ./stage */ "./src/display/stage.ts"));
var DisplayContainer = /** @class */ (function (_super) {
    __extends(DisplayContainer, _super);
    function DisplayContainer() {
        var _this = _super.call(this) || this;
        _this._children = [];
        return _this;
    }
    Object.defineProperty(DisplayContainer.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    DisplayContainer.prototype.addChild = function (child) {
        var index = this.children.indexOf(child);
        if (index !== -1) {
            this._children.splice(index, 1);
        }
        this._children.push(child);
        child.stage = this.stage;
        child.parent = this;
        this.stage.changed = true;
        child.trigger(stage_1.default.ADD_TO_STAGE);
    };
    DisplayContainer.prototype.removeChildAll = function () {
        while (this._children.length) {
            this.removeChild(this._children[this._children.length - 1]);
        }
    };
    DisplayContainer.prototype.removeChild = function (child) {
        var index = this._children.indexOf(child);
        if (index === -1) {
            return;
        }
        child.trigger(stage_1.default.REMOVE_TO_STAGE);
        this._children.splice(index, 1);
        child.stage = null;
        child.parent = null;
        if (child instanceof DisplayContainer) {
            child.removeChildAll();
        }
    };
    DisplayContainer.prototype.removeChildAt = function (index) {
        this.removeChild(this.getChildAt(index));
        this._children.splice(index, 1);
        this.stage.changed = true;
    };
    DisplayContainer.prototype.getChildAt = function (index) {
        return this._children[index];
    };
    DisplayContainer.prototype.updateDisplay = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this._children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child.visible) {
                    child.update();
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return DisplayContainer;
}(display_1.default));
exports.default = DisplayContainer;


/***/ }),

/***/ "./src/display/display.ts":
/*!********************************!*\
  !*** ./src/display/display.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var event_dispatcher_1 = __importDefault(__webpack_require__(/*! ../event/event-dispatcher */ "./src/event/event-dispatcher.ts"));
var matrix_1 = __importDefault(__webpack_require__(/*! ../geom/matrix */ "./src/geom/matrix.ts"));
var rectangle_1 = __importDefault(__webpack_require__(/*! ../geom/rectangle */ "./src/geom/rectangle.ts"));
var stage_1 = __importDefault(__webpack_require__(/*! ./stage */ "./src/display/stage.ts"));
// TODO: 파괴자 구현
var Display = /** @class */ (function (_super) {
    __extends(Display, _super);
    function Display() {
        var _this = _super.call(this) || this;
        _this._stage = null;
        _this._parent = null;
        _this._bounds = new rectangle_1.default();
        _this._computedBounds = new rectangle_1.default();
        _this._matrix = new matrix_1.default();
        _this._centerX = 0;
        _this._centerY = 0;
        _this._rotate = 0;
        _this._width = 0;
        _this._height = 0;
        _this._scaleX = 1;
        _this._scaleY = 1;
        _this._skewX = 0;
        _this._skewY = 0;
        _this._visible = true;
        _this.on(stage_1.default.ADD_TO_STAGE, function () { return _this.stage.registerEventMap(_this); });
        _this.on(stage_1.default.REMOVE_TO_STAGE, function () { return _this.stage.unregisterEventMap(_this); });
        return _this;
    }
    Object.defineProperty(Display.prototype, "stage", {
        get: function () { return this._stage; },
        set: function (stage) {
            this._stage = stage;
            if (this._stage) {
                this._stage.changed = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "parent", {
        get: function () { return this._parent; },
        set: function (parent) { this._parent = parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "x", {
        get: function () { return this._bounds.left; },
        set: function (value) {
            if (this._bounds.left === value) {
                return;
            }
            this._bounds.left = value;
            this._changedDisplay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "y", {
        get: function () { return this._bounds.top; },
        set: function (value) {
            if (this._bounds.top === value) {
                return;
            }
            this._bounds.top = value;
            this._changedDisplay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "centerX", {
        get: function () { return this._centerX; },
        set: function (value) {
            this._centerX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "centerY", {
        get: function () { return this._centerY; },
        set: function (value) {
            this._centerY = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "width", {
        get: function () { return this._bounds.width; },
        set: function (value) {
            if (this._width === value) {
                return;
            }
            this._width = value;
            this._bounds.width = value * this._scaleX;
            this._changedDisplay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "height", {
        get: function () { return this._bounds.height; },
        set: function (value) {
            if (this.height === value) {
                return;
            }
            this._height = value;
            this._bounds.height = value * this._scaleY;
            this._changedDisplay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "rotate", {
        get: function () { return this._rotate; },
        set: function (value) {
            if (this._rotate === value) {
                return;
            }
            this._rotate = value;
            this._changedDisplay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "scaleX", {
        get: function () { return this._scaleX; },
        set: function (value) {
            if (this._scaleX === value) {
                return;
            }
            this._scaleX = value;
            this._bounds.width = this._width * value;
            this._changedDisplay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "scaleY", {
        get: function () { return this._scaleY; },
        set: function (value) {
            if (this._scaleY === value) {
                return;
            }
            this._scaleY = value;
            this._bounds.height = this._height * value;
            this._changedDisplay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "skewX", {
        get: function () { return this._skewX; },
        set: function (value) {
            if (this._skewX === value) {
                return;
            }
            this._skewX = value;
            this._changedDisplay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "skewY", {
        get: function () { return this._skewY; },
        set: function (value) {
            if (this._skewY === value) {
                return;
            }
            this._skewY = value;
            this._changedDisplay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "visible", {
        get: function () { return this._visible; },
        set: function (value) {
            if (this._visible === value) {
                return;
            }
            this._visible = value;
            this._changedDisplay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "bounds", {
        get: function () { return this._bounds; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "matrix", {
        get: function () { return this._matrix; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "computedBounds", {
        get: function () {
            var e_1, _a;
            var bounds = this.bounds;
            var points = [bounds.leftTop, bounds.rightTop, bounds.leftBottom, bounds.rightBottom];
            try {
                for (var points_1 = __values(points), points_1_1 = points_1.next(); !points_1_1.done; points_1_1 = points_1.next()) {
                    var item = points_1_1.value;
                    item.rotate(this._rotate);
                    item.skew(this._skewX, this._skewY);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (points_1_1 && !points_1_1.done && (_a = points_1.return)) _a.call(points_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._computedBounds.left = Math.min(bounds.leftTop.x, bounds.rightTop.x, bounds.leftBottom.x, bounds.rightBottom.x);
            this._computedBounds.right = Math.max(bounds.leftTop.x, bounds.rightTop.x, bounds.leftBottom.x, bounds.rightBottom.x);
            this._computedBounds.top = Math.min(bounds.leftTop.y, bounds.rightTop.y, bounds.leftBottom.y, bounds.rightBottom.y);
            this._computedBounds.bottom = Math.max(bounds.leftTop.y, bounds.rightTop.y, bounds.leftBottom.y, bounds.rightBottom.y);
            return this._computedBounds;
        },
        enumerable: true,
        configurable: true
    });
    Display.prototype.updateTransformation = function () {
        this._matrix.reset();
        var offsetX = this.x + (this._centerX * this._scaleX);
        var offsetY = this.y + (this._centerY * this._scaleY);
        this._transformTranslate(offsetX, offsetY);
        this._transformRotate(this._rotate);
        this._transformTranslate(-offsetX, -offsetY);
        this._transformTranslate(this.x, this.y);
        this._transformScale(this._scaleX, this._scaleY);
        this._transformSkew(this._skewX, this._skewY);
        this.stage.context.transform(this._matrix.a, this._matrix.b, this._matrix.c, this._matrix.d, this._matrix.tx, this._matrix.ty);
    };
    Display.prototype.update = function () {
        this.stage.context.save();
        this.updateTransformation();
        this.updateDisplay(this.stage.context);
        this.stage.context.restore();
        // TODO: eventcontext 수정
        // this.stage.eventContext.drawImage(this.stage.tempCanvas, 0, 0);
    };
    Display.prototype._transformTranslate = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._matrix.translate(x, y);
    };
    Display.prototype._transformRotate = function (value) {
        this._matrix.rotate(value);
    };
    Display.prototype._transformScale = function (x, y) {
        if (x === void 0) { x = 1; }
        if (y === void 0) { y = 1; }
        this._matrix.scale(x, y);
    };
    Display.prototype._transformSkew = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._matrix.skew(x, y);
    };
    Display.prototype._changedDisplay = function () {
        if (!this.stage) {
            return;
        }
        if (!this.stage.changed) {
            this.stage.changed = true;
        }
    };
    return Display;
}(event_dispatcher_1.default));
exports.default = Display;


/***/ }),

/***/ "./src/display/graphics.ts":
/*!*********************************!*\
  !*** ./src/display/graphics.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rectangle_1 = __importDefault(__webpack_require__(/*! ../geom/rectangle */ "./src/geom/rectangle.ts"));
var LineCap;
(function (LineCap) {
    LineCap["BUTT"] = "butt";
    LineCap["ROUND"] = "round";
    LineCap["SQUARE"] = "square";
})(LineCap = exports.LineCap || (exports.LineCap = {}));
var LineJoin;
(function (LineJoin) {
    LineJoin["ROUNT"] = "round";
    LineJoin["BEVEL"] = "bevel";
    LineJoin["MITER"] = "miter";
})(LineJoin = exports.LineJoin || (exports.LineJoin = {}));
var DrawCommandName;
(function (DrawCommandName) {
    DrawCommandName["RECT"] = "rect";
    DrawCommandName["FILL_RECT"] = "fillRect";
    DrawCommandName["STROKE_RECT"] = "strokeRect";
    DrawCommandName["CLEAR_RECT"] = "clearRect";
    DrawCommandName["BEGIN_PATH"] = "beginPath";
    DrawCommandName["CLOSE_PATH"] = "closePath";
    DrawCommandName["MOVE_TO"] = "moveTo";
    DrawCommandName["LINE_TO"] = "lineTo";
    DrawCommandName["ARC"] = "arc";
    DrawCommandName["ARC_TO"] = "arcTo";
    DrawCommandName["QUADRATIC_CURVE_TO"] = "quadraticCurveTo";
    DrawCommandName["BEZIER_CURVE_TO"] = "bezierCurveTo";
    DrawCommandName["FILL"] = "fill";
    DrawCommandName["STROKE"] = "stroke";
})(DrawCommandName || (DrawCommandName = {}));
var Graphics = /** @class */ (function () {
    function Graphics() {
        this.fillStyle = null;
        this.strokeStyle = null;
        this.lineWidth = 0;
        this.lineCap = LineCap.BUTT;
        this.lineJoin = LineJoin.MITER;
        this.miterLimit = 0;
        this._commands = new Set();
        this._x = 0;
        this._y = 0;
        this._bounds = new rectangle_1.default();
    }
    Object.defineProperty(Graphics.prototype, "commands", {
        get: function () { return this._commands; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Graphics.prototype, "commandList", {
        get: function () { return this._commands.values(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Graphics.prototype, "bounds", {
        get: function () { return this._bounds; },
        enumerable: true,
        configurable: true
    });
    Graphics.prototype.rect = function (x, y, width, height) {
        this._bounds.extends(new rectangle_1.default(x, y, width, height));
        this._addCommand(DrawCommandName.RECT, arguments);
    };
    Graphics.prototype.fillRect = function (x, y, width, height) {
        this._bounds.extends(new rectangle_1.default(x, y, width, height));
        this._addCommand(DrawCommandName.FILL_RECT, arguments);
    };
    Graphics.prototype.strokeRect = function (x, y, width, height) {
        var lineWidth = this.lineWidth * 2;
        this._bounds.extends(new rectangle_1.default(x, y, width + lineWidth, height + lineWidth));
        this._addCommand(DrawCommandName.STROKE_RECT, arguments);
    };
    Graphics.prototype.clearRect = function (x, y, width, height) {
        this._addCommand(DrawCommandName.CLEAR_RECT, arguments);
    };
    Graphics.prototype.beginPath = function () {
        this._addCommand(DrawCommandName.BEGIN_PATH);
    };
    Graphics.prototype.closePath = function () {
        this._addCommand(DrawCommandName.CLOSE_PATH);
    };
    Graphics.prototype.moveTo = function (x, y) {
        this._x = x;
        this._y = y;
        this._addCommand(DrawCommandName.MOVE_TO, arguments);
    };
    Graphics.prototype.lineTo = function (x, y) {
        this._bounds.extendsPosition(this._x, this._y);
        this._bounds.extendsPosition(x, y);
        this._x = x;
        this._y = y;
        this._addCommand(DrawCommandName.LINE_TO, arguments);
    };
    Graphics.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
        if (anticlockwise === void 0) { anticlockwise = false; }
        this._addCommand(DrawCommandName.ARC, arguments);
    };
    Graphics.prototype.arcTo = function (x1, y1, x2, y2, radius) {
        this._addCommand(DrawCommandName.ARC_TO, arguments);
    };
    Graphics.prototype.quadraticCurveTo = function (cp1x, cp1y, x, y) {
        this._addCommand(DrawCommandName.QUADRATIC_CURVE_TO, arguments);
    };
    Graphics.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
        this._addCommand(DrawCommandName.BEZIER_CURVE_TO, arguments);
    };
    Graphics.prototype.fill = function () {
        this._addCommand(DrawCommandName.FILL);
    };
    Graphics.prototype.stroke = function () {
        this._addCommand(DrawCommandName.STROKE);
    };
    Graphics.prototype.clear = function () {
        this._commands.clear();
    };
    Graphics.prototype._addCommand = function (name, args) {
        this._commands.add({
            name: name,
            arguments: args,
            fillStyle: this.fillStyle,
            strokeStyle: this.strokeStyle,
            lineWidth: this.lineWidth,
            lineCap: this.lineCap,
            lineJoin: this.lineJoin,
            miterLimit: this.miterLimit,
        });
    };
    return Graphics;
}());
exports.default = Graphics;


/***/ }),

/***/ "./src/display/shape.ts":
/*!******************************!*\
  !*** ./src/display/shape.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
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
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var display_1 = __importDefault(__webpack_require__(/*! ./display */ "./src/display/display.ts"));
var graphics_1 = __importDefault(__webpack_require__(/*! ./graphics */ "./src/display/graphics.ts"));
var Shape = /** @class */ (function (_super) {
    __extends(Shape, _super);
    function Shape(graphics) {
        var _this = _super.call(this) || this;
        _this.graphics = null;
        _this.graphics = graphics || new graphics_1.default();
        return _this;
    }
    Shape.prototype.updateDisplay = function (context) {
        var e_1, _a, _b;
        try {
            for (var _c = __values(this.graphics.commandList), _d = _c.next(); !_d.done; _d = _c.next()) {
                var command = _d.value;
                context.fillStyle = command.fillStyle;
                context.strokeStyle = command.strokeStyle;
                context.lineWidth = command.lineWidth;
                context.lineCap = command.lineCap;
                context.lineJoin = command.lineJoin;
                context.miterLimit = command.miterLimit;
                if (command.arguments) {
                    (_b = context)[command.name].apply(_b, __spread(command.arguments));
                }
                else {
                    context[command.name]();
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return Shape;
}(display_1.default));
exports.default = Shape;


/***/ }),

/***/ "./src/display/sprite-sheet.ts":
/*!*************************************!*\
  !*** ./src/display/sprite-sheet.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var event_dispatcher_1 = __importDefault(__webpack_require__(/*! ../event/event-dispatcher */ "./src/event/event-dispatcher.ts"));
var rectangle_1 = __importDefault(__webpack_require__(/*! ../geom/rectangle */ "./src/geom/rectangle.ts"));
var SpriteSheetEvent;
(function (SpriteSheetEvent) {
    SpriteSheetEvent["LOAD"] = "load";
    SpriteSheetEvent["END"] = "end";
})(SpriteSheetEvent = exports.SpriteSheetEvent || (exports.SpriteSheetEvent = {}));
var SpriteSheet = /** @class */ (function (_super) {
    __extends(SpriteSheet, _super);
    function SpriteSheet(img, cellWidth, cellHeight, frames, loop) {
        if (loop === void 0) { loop = false; }
        var _this = _super.call(this) || this;
        _this._image = null;
        _this._cellWidth = 0;
        _this._cellHeight = 0;
        _this._frames = null;
        _this._frameIndex = -1;
        _this._currentBounds = null;
        _this._loop = false;
        if (img instanceof HTMLImageElement) {
            _this._image = img;
            _this.trigger(SpriteSheet.LOAD);
        }
        else if (typeof img === 'string') {
            _this._image = new Image();
            _this._image.src = img;
            _this._image.addEventListener('load', function () { return _this.trigger(SpriteSheet.LOAD); });
        }
        _this._cellWidth = cellWidth;
        _this._cellHeight = cellHeight;
        _this._frames = frames;
        _this._frameIndex = -1;
        _this._currentBounds = new rectangle_1.default(0, 0, cellWidth, cellHeight);
        _this._loop = loop;
        return _this;
    }
    Object.defineProperty(SpriteSheet.prototype, "image", {
        get: function () { return this._image; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteSheet.prototype, "cellWidth", {
        get: function () { return this._cellWidth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteSheet.prototype, "cellHeight", {
        get: function () { return this._cellHeight; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpriteSheet.prototype, "currentBounds", {
        get: function () { return this._currentBounds; },
        enumerable: true,
        configurable: true
    });
    SpriteSheet.prototype.next = function () {
        if (this._frameIndex + 1 <= this._frames.length - 1) {
            this._frameIndex++;
        }
        else {
            if (this._loop) {
                this._frameIndex = 0;
            }
            else {
                this.trigger(SpriteSheetEvent.END);
            }
        }
        this._updateBounds();
    };
    SpriteSheet.prototype.prev = function () {
        if (this._frameIndex - 1 > 0) {
            this._frameIndex--;
        }
        else {
            if (this._loop) {
                this._frameIndex = this._frames.length - 1;
            }
            else {
                this.trigger(SpriteSheetEvent.END);
            }
        }
        this._updateBounds();
    };
    SpriteSheet.prototype.reset = function () {
        this._frameIndex = -1;
    };
    SpriteSheet.prototype._updateBounds = function () {
        var currentFrame = this._frames[this._frameIndex];
        this._currentBounds.x = currentFrame[0] * this._cellWidth;
        this._currentBounds.y = currentFrame[1] * this._cellHeight;
    };
    SpriteSheet.LOAD = SpriteSheetEvent.LOAD;
    return SpriteSheet;
}(event_dispatcher_1.default));
exports.default = SpriteSheet;


/***/ }),

/***/ "./src/display/sprite.ts":
/*!*******************************!*\
  !*** ./src/display/sprite.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var display_1 = __importDefault(__webpack_require__(/*! ./display */ "./src/display/display.ts"));
var sprite_sheet_1 = __webpack_require__(/*! ./sprite-sheet */ "./src/display/sprite-sheet.ts");
var ticker_1 = __importDefault(__webpack_require__(/*! ../util/ticker */ "./src/util/ticker.ts"));
var Sprite = /** @class */ (function (_super) {
    __extends(Sprite, _super);
    function Sprite(spriteSheet, fps) {
        if (fps === void 0) { fps = 10; }
        var _this = _super.call(this) || this;
        _this._spriteSheet = null;
        _this._fps = 10;
        _this._ticker = null;
        _this._spriteSheet = spriteSheet;
        _this._fps = fps;
        _this._ticker = new ticker_1.default(fps);
        _this._ticker.on(ticker_1.default.TICK, function () { return _this._tickerHandler(); });
        _this._spriteSheet.on(sprite_sheet_1.SpriteSheetEvent.END, function () { return _this.stop(); });
        return _this;
    }
    Object.defineProperty(Sprite.prototype, "spriteSheet", {
        get: function () { return this._spriteSheet; },
        set: function (spriteSheet) {
            this._spriteSheet = spriteSheet;
            this._bounds.width = spriteSheet.cellWidth;
            this._bounds.height = spriteSheet.cellHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sprite.prototype, "fps", {
        get: function () { return this._fps; },
        set: function (value) {
            this._fps = value;
            this._ticker.fps = value;
        },
        enumerable: true,
        configurable: true
    });
    Sprite.prototype.play = function () {
        this._tickerHandler();
        this._ticker.run();
    };
    Sprite.prototype.reset = function () {
        this._spriteSheet.reset();
    };
    Sprite.prototype.stop = function () {
        this._ticker.stop();
    };
    Sprite.prototype.updateDisplay = function (context) {
        var bounds = this._spriteSheet.currentBounds;
        context.drawImage(this._spriteSheet.image, bounds.left, bounds.top, bounds.width, bounds.height, 0, 0, bounds.width, bounds.height);
    };
    Sprite.prototype._tickerHandler = function () {
        this._spriteSheet.next();
        this.stage.changed = true;
        this.stage.update();
    };
    return Sprite;
}(display_1.default));
exports.default = Sprite;


/***/ }),

/***/ "./src/display/stage.ts":
/*!******************************!*\
  !*** ./src/display/stage.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var display_container_1 = __importDefault(__webpack_require__(/*! ./display-container */ "./src/display/display-container.ts"));
var rectangle_1 = __importDefault(__webpack_require__(/*! ../geom/rectangle */ "./src/geom/rectangle.ts"));
var ticker_1 = __importDefault(__webpack_require__(/*! ../util/ticker */ "./src/util/ticker.ts"));
var StageEventType;
(function (StageEventType) {
    StageEventType["ADD_TO_STAGE"] = "addToStage";
    StageEventType["REMOVE_TO_STAGE"] = "removeToStage";
    StageEventType["ENTER_FRAME"] = "enterFrame";
})(StageEventType || (StageEventType = {}));
var Stage = /** @class */ (function (_super) {
    __extends(Stage, _super);
    function Stage(canvasId, fps) {
        var _this = _super.call(this) || this;
        _this.changed = false;
        _this._canvas = null;
        _this._eventCanvas = null;
        _this._context = null;
        _this._eventContext = null;
        _this._ticker = null;
        _this._eventTargetMap = {};
        _this._canvas = document.getElementById(canvasId);
        _this._context = _this._canvas.getContext('2d');
        _this._stage = _this;
        _this._bounds = new rectangle_1.default(0, 0, _this._canvas.width, _this._canvas.height);
        _this._initFPS(fps);
        _this._initEventCanvas();
        _this._initEvent();
        return _this;
    }
    Object.defineProperty(Stage.prototype, "canvas", {
        get: function () { return this._canvas; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "eventCanvas", {
        get: function () { return this._eventCanvas; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "context", {
        get: function () { return this._context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stage.prototype, "eventContext", {
        get: function () { return this._eventContext; },
        enumerable: true,
        configurable: true
    });
    Stage.prototype.update = function () {
        if (this.changed) {
            this._canvas.width = this._canvas.width;
            this._eventCanvas.width = this._eventCanvas.width;
            _super.prototype.update.call(this);
            this.changed = false;
        }
    };
    Stage.prototype.registerEventMap = function (display) {
        var childEventMap = display.eventMap;
        for (var type in childEventMap) {
            if (!this._eventTargetMap[type]) {
                this._eventTargetMap[type] = [];
            }
            this._eventTargetMap[type].push(display);
        }
    };
    Stage.prototype.unregisterEventMap = function (display) {
        var childEventMap = display.eventMap;
        for (var type in childEventMap) {
            var index = this._eventTargetMap[type].indexOf(display);
            this._eventTargetMap[type].splice(index, 1);
        }
    };
    Stage.prototype._initFPS = function (fps) {
        var _this = this;
        if (fps) {
            this._ticker = new ticker_1.default(fps);
            this._ticker.on(ticker_1.default.TICK, function (delta) {
                _this.trigger(Stage.ENTER_FRAME, delta);
                _this.update();
            });
            this._ticker.run();
        }
    };
    Stage.prototype._initEventCanvas = function () {
        this._eventCanvas = document.createElement('canvas');
        this._eventCanvas.width = this._canvas.width;
        this._eventCanvas.height = this._canvas.height;
        this._eventContext = this._eventCanvas.getContext('2d');
        // document.body.appendChild( this._eventCanvas );
    };
    Stage.prototype._initEvent = function () {
        var rect = this._canvas.getBoundingClientRect();
        // this._canvas.addEventListener('click', (event) => {
        //   event.preventDefault();
        //   if (!this._eventTargetMap[MouseEvent.CLICK] || !this._eventTargetMap[MouseEvent.CLICK].length) { return; }
        //   const x = event.clientX - rect.left;
        //   const y = event.clientY - rect.top;
        //   const color = this._eventContext.getImageData(x, y, 1, 1);
        //   const r = color.data[0].toString(16);
        //   const g = color.data[1].toString(16);
        //   const b = color.data[2].toString(16);
        //   const colorKey = '0'.repeat(2 - r.length) + r + '0'.repeat(2 - g.length) + g + '0'.repeat(2 - b.length) + b;
        //   for (let i = this._eventTargetMap[MouseEvent.CLICK].length - 1, count = 0; i >= count; i -= 1) {
        //     const item = this._eventTargetMap[MouseEvent.CLICK][i];
        //     if (colorKey === item.colorKey) {
        //       // TODO:target / currentTarget 구분
        //       item.trigger(MouseEvent.CLICK, new MouseEvent(MouseEvent.CLICK, {}, item, item));
        //       break;
        //     }
        //   }
        // });
    };
    Stage.ADD_TO_STAGE = StageEventType.ADD_TO_STAGE;
    Stage.REMOVE_TO_STAGE = StageEventType.REMOVE_TO_STAGE;
    Stage.ENTER_FRAME = StageEventType.ENTER_FRAME;
    return Stage;
}(display_container_1.default));
exports.default = Stage;
var StageRegion = /** @class */ (function () {
    function StageRegion(width, height, col, row) {
        this._width = 0;
        this._height = 0;
        this._row = 0;
        this._col = 0;
        this._map = {};
        this._displayList = [];
        this._width = width;
        this._height = height;
        this._col = col;
        this._row = row;
    }
    StageRegion.prototype.add = function (display) {
        // ..
    };
    return StageRegion;
}());
exports.StageRegion = StageRegion;


/***/ }),

/***/ "./src/event/event-dispatcher.ts":
/*!***************************************!*\
  !*** ./src/event/event-dispatcher.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        this._eventMap = {};
    }
    Object.defineProperty(EventDispatcher.prototype, "eventMap", {
        get: function () {
            return this._eventMap;
        },
        enumerable: true,
        configurable: true
    });
    EventDispatcher.prototype.on = function (type, handler) {
        if (!this._eventMap[type]) {
            this._eventMap[type] = [];
        }
        this._eventMap[type].push(handler);
    };
    EventDispatcher.prototype.off = function (type, handler) {
        if (handler) {
            if (this._eventMap[type]) {
                var index = this._eventMap[type].indexOf(handler);
                this._eventMap[type].splice(index, 1);
            }
        }
        else {
            if (this._eventMap[type]) {
                this._eventMap[type] = null;
            }
        }
    };
    EventDispatcher.prototype.trigger = function (type, data) {
        var e_1, _a;
        if (this._eventMap[type]) {
            try {
                for (var _b = __values(this._eventMap[type]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    item.call(this, data);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    return EventDispatcher;
}());
exports.default = EventDispatcher;


/***/ }),

/***/ "./src/event/event.ts":
/*!****************************!*\
  !*** ./src/event/event.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Event = /** @class */ (function () {
    function Event(type, data) {
        this._type = null;
        this._data = null;
        this._type = type;
        this._data = data;
    }
    Object.defineProperty(Event.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: true,
        configurable: true
    });
    return Event;
}());
exports.default = Event;


/***/ }),

/***/ "./src/event/mouse-event.ts":
/*!**********************************!*\
  !*** ./src/event/mouse-event.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = __importDefault(__webpack_require__(/*! ./event */ "./src/event/event.ts"));
var MouseEventType;
(function (MouseEventType) {
    MouseEventType["CLICK"] = "click";
    MouseEventType["MOUSE_OVER"] = "mouseOver";
    MouseEventType["MOUSE_OUT"] = "mouseOut";
})(MouseEventType || (MouseEventType = {}));
var MouseEvent = /** @class */ (function (_super) {
    __extends(MouseEvent, _super);
    function MouseEvent(type, data, target, currentTarget) {
        var _this = _super.call(this, type, data) || this;
        _this._target = null;
        _this._currentTarget = null;
        _this._target = target;
        _this._currentTarget = currentTarget;
        return _this;
    }
    MouseEvent.CLICK = MouseEventType.CLICK;
    MouseEvent.MOUSE_OVER = MouseEventType.MOUSE_OVER;
    MouseEvent.MOUSE_OUT = MouseEventType.MOUSE_OUT;
    return MouseEvent;
}(event_1.default));
exports.default = MouseEvent;


/***/ }),

/***/ "./src/geom/matrix.ts":
/*!****************************!*\
  !*** ./src/geom/matrix.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Matrix = /** @class */ (function () {
    function Matrix(a, b, c, d, tx, ty) {
        if (a === void 0) { a = 1; }
        if (b === void 0) { b = 0; }
        if (c === void 0) { c = 0; }
        if (d === void 0) { d = 1; }
        if (tx === void 0) { tx = 0; }
        if (ty === void 0) { ty = 0; }
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
        this.setTo(a, b, c, d, tx, ty);
    }
    Matrix.prototype.setTo = function (a, b, c, d, tx, ty) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    };
    Matrix.prototype.setToMatrix = function (matrix) {
        this.a = matrix.a;
        this.b = matrix.b;
        this.c = matrix.c;
        this.d = matrix.d;
        this.tx = matrix.tx;
        this.ty = matrix.ty;
    };
    Matrix.prototype.add = function (matrix) {
        return this.setTo(this.a + matrix.a, this.b + matrix.b, this.c + matrix.c, this.d + matrix.d, this.tx + matrix.tx, this.ty + matrix.ty);
    };
    Matrix.prototype.sub = function (matrix) {
        return this.setTo(this.a - matrix.a, this.b - matrix.b, this.c - matrix.c, this.d - matrix.d, this.tx - matrix.tx, this.ty - matrix.ty);
    };
    Matrix.prototype.multi = function (matrix) {
        var a;
        var b;
        var c;
        var d;
        var tx;
        var ty;
        if (typeof matrix === 'number') {
            a = this.a * matrix;
            b = this.b * matrix;
            c = this.c * matrix;
            d = this.d * matrix;
            tx = this.tx * matrix;
            ty = this.ty * matrix;
        }
        else {
            a = (this.a * matrix.a) + (this.c * matrix.b);
            b = (this.b * matrix.a) + (this.d * matrix.b);
            c = (this.a * matrix.c) + (this.c * matrix.d);
            d = (this.b * matrix.c) + (this.d * matrix.d);
            tx = (this.a * matrix.tx) + (this.c * matrix.ty) + this.tx;
            ty = (this.b * matrix.tx) + (this.d * matrix.ty) + this.ty;
        }
        this.setTo(a, b, c, d, tx, ty);
    };
    Matrix.prototype.inverse = function () {
        var _a = this, a = _a.a, b = _a.b, c = _a.c, d = _a.d, tx = _a.tx, ty = _a.ty;
        var n = a * d - b * c;
        return new Matrix(d / n, -b / n, -c / n, a / n, (c * this.ty - d * tx) / n, (b * tx - a * this.ty) / n);
    };
    Matrix.prototype.clone = function () {
        return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
    };
    Matrix.prototype.scale = function (x, y) {
        if (x === void 0) { x = 1; }
        if (y === void 0) { y = 1; }
        this.multi(new Matrix(x, 0, 0, y, 0, 0));
    };
    Matrix.prototype.translate = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.multi(new Matrix(1, 0, 0, 1, x, y));
    };
    Matrix.prototype.rotate = function (angle) {
        this.multi(new Matrix(Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle)));
    };
    Matrix.prototype.skew = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.multi(new Matrix(1, Math.tan(y), Math.tan(x), 1, 0, 0));
    };
    Matrix.prototype.reset = function () {
        this.setTo(1, 0, 0, 1, 0, 0);
    };
    Matrix.prototype.equals = function (matrix) {
        return this.a === matrix.a && this.b === matrix.b && this.c === matrix.c && this.d === matrix.d && this.tx === matrix.tx && this.ty === matrix.ty;
    };
    return Matrix;
}());
exports.default = Matrix;


/***/ }),

/***/ "./src/geom/point.ts":
/*!***************************!*\
  !*** ./src/geom/point.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_1 = __importDefault(__webpack_require__(/*! ./matrix */ "./src/geom/matrix.ts"));
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    Point.prototype.distance = function (point) {
        return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
    };
    Point.prototype.rotate = function (radian) {
        var matrix = new matrix_1.default(Math.cos(radian), Math.sin(radian), -Math.sin(radian), Math.cos(radian));
        var px = (matrix.a * this.x) + (matrix.c * this.y);
        var py = (matrix.b * this.x) + (matrix.d * this.y);
        return new Point(px, py);
    };
    Point.prototype.scale = function (scaleX, scaleY) {
        var matrix = new matrix_1.default(scaleX, 0, 0, scaleY);
        var px = (matrix.a * this.x) + (matrix.c * this.y);
        var py = (matrix.b * this.x) + (matrix.d * this.y);
        return new Point(px, py);
    };
    Point.prototype.translate = function (x, y) {
        var matrix = new matrix_1.default(1, 0, 0, 1, x, y);
        var px = (matrix.a * this.x) + (matrix.c * this.y) + matrix.tx;
        var py = (matrix.b * this.x) + (matrix.d * this.y) + matrix.ty;
        return new Point(px, py);
    };
    Point.prototype.skew = function (skewX, skewY) {
        var matrix = new matrix_1.default(1, Math.tan(skewX), Math.tan(skewY), 1);
        var px = (matrix.a * this.x) + (matrix.c * this.y);
        var py = (matrix.b * this.x) + (matrix.d * this.y);
        return new Point(px, py);
    };
    return Point;
}());
exports.default = Point;


/***/ }),

/***/ "./src/geom/rectangle.ts":
/*!*******************************!*\
  !*** ./src/geom/rectangle.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = __importDefault(__webpack_require__(/*! ./point */ "./src/geom/point.ts"));
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this._width = 0;
        this._height = 0;
        this._leftTop = null;
        this._rightTop = null;
        this._leftBottom = null;
        this._rightBottom = null;
        this._leftTop = new point_1.default();
        this._rightTop = new point_1.default();
        this._leftBottom = new point_1.default();
        this._rightBottom = new point_1.default();
        this.setTo(x, y, width, height);
    }
    Object.defineProperty(Rectangle.prototype, "x", {
        get: function () { return this._leftTop.x; },
        set: function (value) {
            this._leftTop.x = value;
            this._leftBottom.x = value;
            this._updateRight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "y", {
        get: function () { return this._leftTop.y; },
        set: function (value) {
            this._leftTop.y = value;
            this._leftBottom.y = value;
            this._updateBottom();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () { return this._width; },
        set: function (value) {
            this._width = value;
            this._updateRight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function () { return this._height; },
        set: function (value) {
            this._height = value;
            this._updateBottom();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "left", {
        get: function () { return this._leftTop.x; },
        set: function (value) {
            this.leftTop.x = value;
            this.leftBottom.x = value;
            this._updateWidth();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "right", {
        get: function () { return this._rightTop.x; },
        set: function (value) {
            this.rightTop.x = value;
            this.rightBottom.x = value;
            this._updateWidth();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "top", {
        get: function () { return this._leftTop.y; },
        set: function (value) {
            this.leftTop.y = value;
            this.rightTop.y = value;
            this._updateHeight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "bottom", {
        get: function () { return this._leftBottom.y; },
        set: function (value) {
            this.leftBottom.y = value;
            this.rightBottom.y = value;
            this._updateHeight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "leftTop", {
        get: function () { return this._leftTop; },
        set: function (point) {
            this._leftTop = point;
            this._updateWidth();
            this._updateHeight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "rightTop", {
        get: function () { return this._rightTop; },
        set: function (point) {
            this._rightTop = point;
            this._updateWidth();
            this._updateHeight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "leftBottom", {
        get: function () { return this._leftBottom; },
        set: function (point) {
            this._leftBottom = point;
            this._updateWidth();
            this._updateHeight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "rightBottom", {
        get: function () { return this._rightBottom; },
        set: function (point) {
            this._rightBottom = point;
            this._updateWidth();
            this._updateHeight();
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.contains = function (x, y) {
        return x >= this.left && x <= this.right && y <= this.bottom && y >= this.top;
    };
    Rectangle.prototype.containsRect = function (rectangle) {
        return rectangle.left >= this.left && rectangle.right <= this.right && rectangle.top >= this.top && rectangle.bottom <= this.bottom;
    };
    Rectangle.prototype.intersects = function (rectangle) {
        return this.contains(rectangle.left + 1, rectangle.top + 1) || this.contains(rectangle.left + 1, rectangle.bottom - 1) || this.contains(rectangle.right - 1, rectangle.top + 1) || this.contains(rectangle.right - 1, rectangle.bottom - 1);
    };
    Rectangle.prototype.intersection = function (rectangle) {
        var result = null;
        if (this.intersects(rectangle)) {
            result = new Rectangle();
            result.left = Math.max(rectangle.left, this.left);
            result.right = Math.min(rectangle.right, this.right);
            result.top = Math.max(rectangle.top, this.top);
            result.bottom = Math.min(rectangle.bottom, this.bottom);
        }
        return result;
    };
    Rectangle.prototype.extends = function (rectangle) {
        var left = Math.min(this.left, rectangle.left);
        var right = Math.max(this.right, rectangle.right);
        var top = Math.min(this.top, rectangle.top);
        var bottom = Math.max(this.bottom, rectangle.bottom);
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    };
    Rectangle.prototype.extendsValue = function (x, y, width, height) {
        var left = Math.min(this.left, x);
        var right = Math.max(this.right, x + width);
        var top = Math.min(this.top, y);
        var bottom = Math.max(this.bottom, y + height);
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    };
    Rectangle.prototype.extendsPoint = function (point) {
        this.extendsPosition(point.x, point.y);
    };
    Rectangle.prototype.extendsPosition = function (x, y) {
        if (this.left >= x) {
            this.left = x;
        }
        else if (this.right <= x) {
            this.right = x;
        }
        if (this.top >= y) {
            this.top = y;
        }
        else if (this.bottom <= y) {
            this.bottom = y;
        }
    };
    Rectangle.prototype.setTo = function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
    Rectangle.prototype.clone = function () {
        return new Rectangle(this.left, this.top, this.width, this.height);
    };
    Rectangle.prototype.reset = function () {
        this.setTo(0, 0, 0, 0);
    };
    Rectangle.prototype.equals = function (rectangle) {
        return this.left === rectangle.left && this.top === rectangle.top && this.right === rectangle.right && this.bottom === rectangle.bottom && this.width === rectangle.width && this.height === rectangle.height;
    };
    Rectangle.prototype._updateWidth = function () {
        this._width = this._rightTop.x - this._leftTop.x;
    };
    Rectangle.prototype._updateHeight = function () {
        this._height = this._leftBottom.y - this._leftTop.y;
    };
    Rectangle.prototype._updateRight = function () {
        this._rightBottom.x = this._rightTop.x = this._leftTop.x + this._width;
    };
    Rectangle.prototype._updateBottom = function () {
        this._leftBottom.y = this._rightBottom.y = this._leftTop.y + this._height;
    };
    return Rectangle;
}());
exports.default = Rectangle;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var stage_1 = __importDefault(__webpack_require__(/*! ./display/stage */ "./src/display/stage.ts"));
var display_1 = __importDefault(__webpack_require__(/*! ./display/display */ "./src/display/display.ts"));
var display_container_1 = __importDefault(__webpack_require__(/*! ./display/display-container */ "./src/display/display-container.ts"));
var graphics_1 = __importDefault(__webpack_require__(/*! ./display/graphics */ "./src/display/graphics.ts"));
var shape_1 = __importDefault(__webpack_require__(/*! ./display/shape */ "./src/display/shape.ts"));
var sprite_1 = __importDefault(__webpack_require__(/*! ./display/sprite */ "./src/display/sprite.ts"));
var sprite_sheet_1 = __importDefault(__webpack_require__(/*! ./display/sprite-sheet */ "./src/display/sprite-sheet.ts"));
var event_dispatcher_1 = __importDefault(__webpack_require__(/*! ./event/event-dispatcher */ "./src/event/event-dispatcher.ts"));
var event_1 = __importDefault(__webpack_require__(/*! ./event/event */ "./src/event/event.ts"));
var mouse_event_1 = __importDefault(__webpack_require__(/*! ./event/mouse-event */ "./src/event/mouse-event.ts"));
var matrix_1 = __importDefault(__webpack_require__(/*! ./geom/matrix */ "./src/geom/matrix.ts"));
var point_1 = __importDefault(__webpack_require__(/*! ./geom/point */ "./src/geom/point.ts"));
var rectangle_1 = __importDefault(__webpack_require__(/*! ./geom/rectangle */ "./src/geom/rectangle.ts"));
var ticker_1 = __importDefault(__webpack_require__(/*! ./util/ticker */ "./src/util/ticker.ts"));
var stg = {
    Stage: stage_1.default,
    Display: display_1.default,
    DisplayContainer: display_container_1.default,
    Graphics: graphics_1.default,
    Shape: shape_1.default,
    Sprite: sprite_1.default,
    SpriteSheet: sprite_sheet_1.default,
    EventDispatcher: event_dispatcher_1.default,
    Event: event_1.default,
    MouseEvent: mouse_event_1.default,
    Matrix: matrix_1.default,
    Point: point_1.default,
    Rectangle: rectangle_1.default,
    Ticker: ticker_1.default,
};
window.stg = stg;
exports.default = stg;


/***/ }),

/***/ "./src/util/ticker.ts":
/*!****************************!*\
  !*** ./src/util/ticker.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var event_dispatcher_1 = __importDefault(__webpack_require__(/*! ../event/event-dispatcher */ "./src/event/event-dispatcher.ts"));
var TickerState;
(function (TickerState) {
    TickerState["READY"] = "ready";
    TickerState["RUNNING"] = "running";
})(TickerState || (TickerState = {}));
var TickerEvent;
(function (TickerEvent) {
    TickerEvent["TICK"] = "tick";
})(TickerEvent || (TickerEvent = {}));
var _oneSec = 1000;
var Ticker = /** @class */ (function (_super) {
    __extends(Ticker, _super);
    function Ticker(fps) {
        if (fps === void 0) { fps = 40; }
        var _this = _super.call(this) || this;
        _this._fps = 0;
        _this._state = TickerState.READY;
        _this._prevTime = 0;
        _this._internalTime = 0;
        _this.fps = fps;
        _this._state = TickerState.READY;
        return _this;
    }
    Object.defineProperty(Ticker.prototype, "fps", {
        get: function () { return this._fps; },
        set: function (value) {
            this._fps = Math.max(value, 1);
            // TODO: 로직 확인
            if (value > 0 && value < 1) {
                this._internalTime = (_oneSec * value);
            }
            else {
                this._internalTime = (_oneSec / value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Ticker.prototype.run = function () {
        var _this = this;
        this._state = TickerState.RUNNING;
        this._prevTime = +new Date();
        window.requestAnimationFrame(function () { return _this._run(); });
    };
    Ticker.prototype.stop = function () {
        this._state = TickerState.READY;
    };
    Ticker.prototype._run = function () {
        var _this = this;
        if (this._state === TickerState.READY) {
            return;
        }
        var now = +new Date();
        var delta = now - this._prevTime;
        if (delta >= this._internalTime) {
            this.trigger(Ticker.TICK, { delta: delta });
            this._prevTime = +new Date();
        }
        if (this._state === TickerState.RUNNING) {
            window.requestAnimationFrame(function () { return _this._run(); });
        }
    };
    Ticker.TICK = TickerEvent.TICK;
    return Ticker;
}(event_dispatcher_1.default));
exports.default = Ticker;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS1jb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9ncmFwaGljcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zaGFwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zcHJpdGUtc2hlZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvc3ByaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9kaXNwbGF5L3N0YWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC1kaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQvbW91c2UtZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlb20vbWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3BvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3JlY3RhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvdGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNB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UUFDZCxJQUFJLENBQVMsQ0FBQztRQUNkLElBQUksQ0FBUyxDQUFDO1FBQ2QsSUFBSSxFQUFVLENBQUM7UUFDZixJQUFJLEVBQVUsQ0FBQztRQUVmLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzlCLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUNwQixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDcEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQ3BCLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUNwQixFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDdEIsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUMzRCxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7U0FDNUQ7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLHdCQUFPLEdBQWQ7UUFDUSxhQUE2QixFQUEzQixRQUFDLEVBQUUsUUFBQyxFQUFFLFFBQUMsRUFBRSxRQUFDLEVBQUUsVUFBRSxFQUFFLFVBQUUsQ0FBVTtRQUNwQyxJQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQUVNLHNCQUFLLEdBQVo7UUFDRSxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFD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R0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBTSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUM5QjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxjQUFNLFlBQUksQ0FBQyxJQUFJLEVBQUUsRUFBWCxDQUFXLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUM7SUEvQ3NCLFdBQUksR0FBZ0IsV0FBVyxDQUFDLElBQUksQ0FBQztJQWdEOUQsYUFBQztDQUFBLENBbERtQywwQkFBZSxHQWtEbEQ7a0JBbERvQixNQUFNIiwiZmlsZSI6InN0YWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgRGlzcGxheSBmcm9tICcuL2Rpc3BsYXknO1xuaW1wb3J0IFN0YWdlIGZyb20gJy4vc3RhZ2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNwbGF5Q29udGFpbmVyIGV4dGVuZHMgRGlzcGxheSB7XG5cbiAgcHJpdmF0ZSBfY2hpbGRyZW46IERpc3BsYXlbXSA9IFtdO1xuXG4gIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogRGlzcGxheVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIGFkZENoaWxkKGNoaWxkOiBEaXNwbGF5KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgdGhpcy5fY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgY2hpbGQuc3RhZ2UgPSB0aGlzLnN0YWdlO1xuICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgdGhpcy5zdGFnZS5jaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGlsZC50cmlnZ2VyKFN0YWdlLkFERF9UT19TVEFHRSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQ2hpbGRBbGwoKTogdm9pZCB7XG4gICAgd2hpbGUgKHRoaXMuX2NoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLl9jaGlsZHJlblt0aGlzLl9jaGlsZHJlbi5sZW5ndGggLSAxXSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZUNoaWxkKGNoaWxkOiBEaXNwbGF5KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7IHJldHVybjsgfVxuICAgIGNoaWxkLnRyaWdnZXIoU3RhZ2UuUkVNT1ZFX1RPX1NUQUdFKTtcbiAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2UoIGluZGV4LCAxICk7XG4gICAgY2hpbGQuc3RhZ2UgPSBudWxsO1xuICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgRGlzcGxheUNvbnRhaW5lcikge1xuICAgICAgKGNoaWxkIGFzIERpc3BsYXlDb250YWluZXIpLnJlbW92ZUNoaWxkQWxsKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZUNoaWxkQXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5nZXRDaGlsZEF0KGluZGV4KSk7XG4gICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnN0YWdlLmNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGdldENoaWxkQXQoaW5kZXg6IG51bWJlcik6IERpc3BsYXkge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbltpbmRleF07XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRGlzcGxheSgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRoaXMuX2NoaWxkcmVuKSB7XG4gICAgICBpZiAoY2hpbGQudmlzaWJsZSkge1xuICAgICAgICBjaGlsZC51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGlzcGF0Y2hlcic7XG5pbXBvcnQgTWF0cml4IGZyb20gJy4uL2dlb20vbWF0cml4JztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vZ2VvbS9yZWN0YW5nbGUnO1xuaW1wb3J0IERpc3BsYXlDb250YWluZXIgZnJvbSAnLi9kaXNwbGF5LWNvbnRhaW5lcic7XG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9zdGFnZSc7XG5cbi8vIFRPRE86IO2MjOq0tOyekCDqtaztmIRcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIERpc3BsYXkgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xuXG4gIHByb3RlY3RlZCBfc3RhZ2U6IFN0YWdlID0gbnVsbDtcbiAgcHJvdGVjdGVkIF9wYXJlbnQ6IERpc3BsYXlDb250YWluZXIgPSBudWxsO1xuICBwcm90ZWN0ZWQgX2JvdW5kczogUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xuICBwcm90ZWN0ZWQgX2NvbXB1dGVkQm91bmRzOiBSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XG4gIHByb3RlY3RlZCBfbWF0cml4OiBNYXRyaXggPSBuZXcgTWF0cml4KCk7XG4gIHByb3RlY3RlZCBfY2VudGVyWDogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9jZW50ZXJZOiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX3JvdGF0ZTogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF93aWR0aDogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9oZWlnaHQ6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfc2NhbGVYOiBudW1iZXIgPSAxO1xuICBwcm90ZWN0ZWQgX3NjYWxlWTogbnVtYmVyID0gMTtcbiAgcHJvdGVjdGVkIF9za2V3WDogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9za2V3WTogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF92aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICBwdWJsaWMgZ2V0IHN0YWdlKCk6IFN0YWdlIHsgcmV0dXJuIHRoaXMuX3N0YWdlOyB9XG4gIHB1YmxpYyBnZXQgcGFyZW50KCk6IERpc3BsYXlDb250YWluZXIgeyByZXR1cm4gdGhpcy5fcGFyZW50OyB9XG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYm91bmRzLmxlZnQ7IH1cbiAgcHVibGljIGdldCB5KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9ib3VuZHMudG9wOyB9XG4gIHB1YmxpYyBnZXQgY2VudGVyWCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY2VudGVyWDsgfVxuICBwdWJsaWMgZ2V0IGNlbnRlclkoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2NlbnRlclk7IH1cbiAgcHVibGljIGdldCB3aWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYm91bmRzLndpZHRoOyB9XG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9ib3VuZHMuaGVpZ2h0OyB9XG4gIHB1YmxpYyBnZXQgcm90YXRlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9yb3RhdGU7IH1cbiAgcHVibGljIGdldCBzY2FsZVgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NjYWxlWDsgfVxuICBwdWJsaWMgZ2V0IHNjYWxlWSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2NhbGVZOyB9XG4gIHB1YmxpYyBnZXQgc2tld1goKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NrZXdYOyB9XG4gIHB1YmxpYyBnZXQgc2tld1koKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NrZXdZOyB9XG4gIHB1YmxpYyBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Zpc2libGU7IH1cbiAgcHVibGljIGdldCBib3VuZHMoKTogUmVjdGFuZ2xlIHsgcmV0dXJuIHRoaXMuX2JvdW5kczsgfVxuICBwdWJsaWMgZ2V0IG1hdHJpeCgpOiBNYXRyaXggeyByZXR1cm4gdGhpcy5fbWF0cml4OyB9XG5cbiAgcHVibGljIGdldCBjb21wdXRlZEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmJvdW5kcztcbiAgICBjb25zdCBwb2ludHMgPSBbYm91bmRzLmxlZnRUb3AsIGJvdW5kcy5yaWdodFRvcCwgYm91bmRzLmxlZnRCb3R0b20sIGJvdW5kcy5yaWdodEJvdHRvbV07XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcG9pbnRzKSB7XG4gICAgICBpdGVtLnJvdGF0ZSh0aGlzLl9yb3RhdGUpO1xuICAgICAgaXRlbS5za2V3KHRoaXMuX3NrZXdYLCB0aGlzLl9za2V3WSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY29tcHV0ZWRCb3VuZHMubGVmdCA9IE1hdGgubWluKGJvdW5kcy5sZWZ0VG9wLngsIGJvdW5kcy5yaWdodFRvcC54LCBib3VuZHMubGVmdEJvdHRvbS54LCBib3VuZHMucmlnaHRCb3R0b20ueCk7XG4gICAgdGhpcy5fY29tcHV0ZWRCb3VuZHMucmlnaHQgPSBNYXRoLm1heChib3VuZHMubGVmdFRvcC54LCBib3VuZHMucmlnaHRUb3AueCwgYm91bmRzLmxlZnRCb3R0b20ueCwgYm91bmRzLnJpZ2h0Qm90dG9tLngpO1xuICAgIHRoaXMuX2NvbXB1dGVkQm91bmRzLnRvcCA9IE1hdGgubWluKGJvdW5kcy5sZWZ0VG9wLnksIGJvdW5kcy5yaWdodFRvcC55LCBib3VuZHMubGVmdEJvdHRvbS55LCBib3VuZHMucmlnaHRCb3R0b20ueSk7XG4gICAgdGhpcy5fY29tcHV0ZWRCb3VuZHMuYm90dG9tID0gTWF0aC5tYXgoYm91bmRzLmxlZnRUb3AueSwgYm91bmRzLnJpZ2h0VG9wLnksIGJvdW5kcy5sZWZ0Qm90dG9tLnksIGJvdW5kcy5yaWdodEJvdHRvbS55KTtcbiAgICByZXR1cm4gdGhpcy5fY29tcHV0ZWRCb3VuZHM7XG4gIH1cblxuICBwdWJsaWMgc2V0IHN0YWdlKHN0YWdlOiBTdGFnZSkge1xuICAgIHRoaXMuX3N0YWdlID0gc3RhZ2U7XG4gICAgaWYgKHRoaXMuX3N0YWdlKSB7XG4gICAgICB0aGlzLl9zdGFnZS5jaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IHBhcmVudChwYXJlbnQ6IERpc3BsYXlDb250YWluZXIpIHsgdGhpcy5fcGFyZW50ID0gcGFyZW50OyB9XG5cbiAgcHVibGljIHNldCB4KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fYm91bmRzLmxlZnQgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2JvdW5kcy5sZWZ0ID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgeSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2JvdW5kcy50b3AgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2JvdW5kcy50b3AgPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBjZW50ZXJYKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jZW50ZXJYID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IGNlbnRlclkodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2NlbnRlclkgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl93aWR0aCA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcbiAgICB0aGlzLl9ib3VuZHMud2lkdGggPSB2YWx1ZSAqIHRoaXMuX3NjYWxlWDtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBoZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmhlaWdodCA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IHZhbHVlICogdGhpcy5fc2NhbGVZO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHJvdGF0ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3JvdGF0ZSA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fcm90YXRlID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2NhbGVYKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2NhbGVYID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9zY2FsZVggPSB2YWx1ZTtcbiAgICB0aGlzLl9ib3VuZHMud2lkdGggPSB0aGlzLl93aWR0aCAqIHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNjYWxlWSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3NjYWxlWSA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2NhbGVZID0gdmFsdWU7XG4gICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IHRoaXMuX2hlaWdodCAqIHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNrZXdYKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2tld1ggPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NrZXdYID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2tld1kodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9za2V3WSA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2tld1kgPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCB2aXNpYmxlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX3Zpc2libGUgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm9uKFN0YWdlLkFERF9UT19TVEFHRSwgKCkgPT4gdGhpcy5zdGFnZS5yZWdpc3RlckV2ZW50TWFwKHRoaXMpKTtcbiAgICB0aGlzLm9uKFN0YWdlLlJFTU9WRV9UT19TVEFHRSwgKCkgPT4gdGhpcy5zdGFnZS51bnJlZ2lzdGVyRXZlbnRNYXAodGhpcykpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZURpc3BsYXkoY29udGV4dD86IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQ7XG5cbiAgcHVibGljIHVwZGF0ZVRyYW5zZm9ybWF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX21hdHJpeC5yZXNldCgpO1xuICAgIGNvbnN0IG9mZnNldFggPSB0aGlzLnggKyAodGhpcy5fY2VudGVyWCAqIHRoaXMuX3NjYWxlWCk7XG4gICAgY29uc3Qgb2Zmc2V0WSA9IHRoaXMueSArICh0aGlzLl9jZW50ZXJZICogdGhpcy5fc2NhbGVZKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1UcmFuc2xhdGUob2Zmc2V0WCwgb2Zmc2V0WSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtUm90YXRlKHRoaXMuX3JvdGF0ZSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtVHJhbnNsYXRlKC1vZmZzZXRYLCAtb2Zmc2V0WSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtVHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcbiAgICB0aGlzLl90cmFuc2Zvcm1TY2FsZSh0aGlzLl9zY2FsZVgsIHRoaXMuX3NjYWxlWSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtU2tldyh0aGlzLl9za2V3WCwgdGhpcy5fc2tld1kpO1xuICAgIHRoaXMuc3RhZ2UuY29udGV4dC50cmFuc2Zvcm0odGhpcy5fbWF0cml4LmEsIHRoaXMuX21hdHJpeC5iLCB0aGlzLl9tYXRyaXguYywgdGhpcy5fbWF0cml4LmQsIHRoaXMuX21hdHJpeC50eCwgdGhpcy5fbWF0cml4LnR5KTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFnZS5jb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLnVwZGF0ZVRyYW5zZm9ybWF0aW9uKCk7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KHRoaXMuc3RhZ2UuY29udGV4dCk7XG4gICAgdGhpcy5zdGFnZS5jb250ZXh0LnJlc3RvcmUoKTtcbiAgICAvLyBUT0RPOiBldmVudGNvbnRleHQg7IiY7KCVXG4gICAgLy8gdGhpcy5zdGFnZS5ldmVudENvbnRleHQuZHJhd0ltYWdlKHRoaXMuc3RhZ2UudGVtcENhbnZhcywgMCwgMCk7XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1UcmFuc2xhdGUoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIHRoaXMuX21hdHJpeC50cmFuc2xhdGUoeCwgeSk7XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1Sb3RhdGUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX21hdHJpeC5yb3RhdGUodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtU2NhbGUoeDogbnVtYmVyID0gMSwgeTogbnVtYmVyID0gMSk6IHZvaWQge1xuICAgIHRoaXMuX21hdHJpeC5zY2FsZSh4LCB5KTtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybVNrZXcoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIHRoaXMuX21hdHJpeC5za2V3KHgsIHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hhbmdlZERpc3BsYXkoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnN0YWdlKSB7IHJldHVybjsgfVxuICAgIGlmICghdGhpcy5zdGFnZS5jaGFuZ2VkKSB7XG4gICAgICB0aGlzLnN0YWdlLmNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuLi9nZW9tL3JlY3RhbmdsZSc7XG5cbmV4cG9ydCBlbnVtIExpbmVDYXAge1xuICBCVVRUID0gJ2J1dHQnLFxuICBST1VORCA9ICdyb3VuZCcsXG4gIFNRVUFSRSA9ICdzcXVhcmUnLFxufVxuXG5leHBvcnQgZW51bSBMaW5lSm9pbiB7XG4gIFJPVU5UID0gJ3JvdW5kJyxcbiAgQkVWRUwgPSAnYmV2ZWwnLFxuICBNSVRFUiA9ICdtaXRlcicsXG59XG5cbmVudW0gRHJhd0NvbW1hbmROYW1lIHtcbiAgUkVDVCA9ICdyZWN0JyxcbiAgRklMTF9SRUNUID0gJ2ZpbGxSZWN0JyxcbiAgU1RST0tFX1JFQ1QgPSAnc3Ryb2tlUmVjdCcsXG4gIENMRUFSX1JFQ1QgPSAnY2xlYXJSZWN0JyxcbiAgQkVHSU5fUEFUSCA9ICdiZWdpblBhdGgnLFxuICBDTE9TRV9QQVRIID0gJ2Nsb3NlUGF0aCcsXG4gIE1PVkVfVE8gPSAnbW92ZVRvJyxcbiAgTElORV9UTyA9ICdsaW5lVG8nLFxuICBBUkMgPSAnYXJjJyxcbiAgQVJDX1RPID0gJ2FyY1RvJyxcbiAgUVVBRFJBVElDX0NVUlZFX1RPID0gJ3F1YWRyYXRpY0N1cnZlVG8nLFxuICBCRVpJRVJfQ1VSVkVfVE8gPSAnYmV6aWVyQ3VydmVUbycsXG4gIEZJTEwgPSAnZmlsbCcsXG4gIFNUUk9LRSA9ICdzdHJva2UnLFxufVxuXG5pbnRlcmZhY2UgRHJhd0NvbW1hbmQge1xuICBuYW1lOiBEcmF3Q29tbWFuZE5hbWU7XG4gIGFyZ3VtZW50czogYW55O1xuICBmaWxsU3R5bGU6IHN0cmluZztcbiAgc3Ryb2tlU3R5bGU6IHN0cmluZztcbiAgbGluZVdpZHRoOiBudW1iZXI7XG4gIGxpbmVDYXA6IExpbmVDYXA7XG4gIGxpbmVKb2luOiBMaW5lSm9pbjtcbiAgbWl0ZXJMaW1pdDogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaGljcyB7XG4gIHB1YmxpYyBmaWxsU3R5bGU6IHN0cmluZyA9IG51bGw7XG4gIHB1YmxpYyBzdHJva2VTdHlsZTogc3RyaW5nID0gbnVsbDtcbiAgcHVibGljIGxpbmVXaWR0aDogbnVtYmVyID0gMDtcbiAgcHVibGljIGxpbmVDYXA6IExpbmVDYXAgPSBMaW5lQ2FwLkJVVFQ7XG4gIHB1YmxpYyBsaW5lSm9pbjogTGluZUpvaW4gPSBMaW5lSm9pbi5NSVRFUjtcbiAgcHVibGljIG1pdGVyTGltaXQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NvbW1hbmRzOiBTZXQ8RHJhd0NvbW1hbmQ+ID0gbmV3IFNldCgpO1xuICBwcml2YXRlIF94OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF95OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9ib3VuZHM6IFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcblxuICBwdWJsaWMgZ2V0IGNvbW1hbmRzKCk6IFNldDxEcmF3Q29tbWFuZD4geyByZXR1cm4gdGhpcy5fY29tbWFuZHM7IH1cbiAgcHVibGljIGdldCBjb21tYW5kTGlzdCgpOiBJdGVyYWJsZUl0ZXJhdG9yPERyYXdDb21tYW5kPiB7IHJldHVybiB0aGlzLl9jb21tYW5kcy52YWx1ZXMoKTsgfVxuICBwdWJsaWMgZ2V0IGJvdW5kcygpOiBSZWN0YW5nbGUgeyByZXR1cm4gdGhpcy5fYm91bmRzOyB9XG5cbiAgcHVibGljIHJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYm91bmRzLmV4dGVuZHMobmV3IFJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSk7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuUkVDVCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWxsUmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9ib3VuZHMuZXh0ZW5kcyhuZXcgUmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQpKTtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5GSUxMX1JFQ1QsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgc3Ryb2tlUmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBsaW5lV2lkdGg6IG51bWJlciA9IHRoaXMubGluZVdpZHRoICogMjtcbiAgICB0aGlzLl9ib3VuZHMuZXh0ZW5kcyhuZXcgUmVjdGFuZ2xlKHgsIHksIHdpZHRoICsgbGluZVdpZHRoLCBoZWlnaHQgKyBsaW5lV2lkdGgpKTtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5TVFJPS0VfUkVDVCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQ0xFQVJfUkVDVCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBiZWdpblBhdGgoKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQkVHSU5fUEFUSCk7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VQYXRoKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkNMT1NFX1BBVEgpO1xuICB9XG5cbiAgcHVibGljIG1vdmVUbyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3ggPSB4O1xuICAgIHRoaXMuX3kgPSB5O1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLk1PVkVfVE8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgbGluZVRvKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYm91bmRzLmV4dGVuZHNQb3NpdGlvbih0aGlzLl94LCB0aGlzLl95KTtcbiAgICB0aGlzLl9ib3VuZHMuZXh0ZW5kc1Bvc2l0aW9uKHgsIHkpO1xuICAgIHRoaXMuX3ggPSB4O1xuICAgIHRoaXMuX3kgPSB5O1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkxJTkVfVE8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgYXJjKHg6IG51bWJlciwgeTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgc3RhcnRBbmdsZTogbnVtYmVyLCBlbmRBbmdsZTogbnVtYmVyLCBhbnRpY2xvY2t3aXNlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5BUkMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgYXJjVG8oeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlciwgcmFkaXVzOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5BUkNfVE8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgcXVhZHJhdGljQ3VydmVUbyhjcDF4OiBudW1iZXIsIGNwMXk6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5RVUFEUkFUSUNfQ1VSVkVfVE8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgYmV6aWVyQ3VydmVUbyhjcDF4OiBudW1iZXIsIGNwMXk6IG51bWJlciwgY3AyeDogbnVtYmVyLCBjcDJ5OiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQkVaSUVSX0NVUlZFX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGZpbGwoKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuRklMTCk7XG4gIH1cblxuICBwdWJsaWMgc3Ryb2tlKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLlNUUk9LRSk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZHMuY2xlYXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZENvbW1hbmQobmFtZTogRHJhd0NvbW1hbmROYW1lLCBhcmdzPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZHMuYWRkKHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBhcmd1bWVudHM6IGFyZ3MsXG4gICAgICBmaWxsU3R5bGU6IHRoaXMuZmlsbFN0eWxlLFxuICAgICAgc3Ryb2tlU3R5bGU6IHRoaXMuc3Ryb2tlU3R5bGUsXG4gICAgICBsaW5lV2lkdGg6IHRoaXMubGluZVdpZHRoLFxuICAgICAgbGluZUNhcDogdGhpcy5saW5lQ2FwLFxuICAgICAgbGluZUpvaW46IHRoaXMubGluZUpvaW4sXG4gICAgICBtaXRlckxpbWl0OiB0aGlzLm1pdGVyTGltaXQsXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBEaXNwbGF5IGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgR3JhcGhpY3MgZnJvbSAnLi9ncmFwaGljcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXBlIGV4dGVuZHMgRGlzcGxheSB7XG4gIHB1YmxpYyBncmFwaGljczogR3JhcGhpY3MgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGdyYXBoaWNzOiBHcmFwaGljcykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5ncmFwaGljcyA9IGdyYXBoaWNzIHx8IG5ldyBHcmFwaGljcygpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZURpc3BsYXkoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjb21tYW5kIG9mIHRoaXMuZ3JhcGhpY3MuY29tbWFuZExpc3QpIHtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29tbWFuZC5maWxsU3R5bGU7XG4gICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29tbWFuZC5zdHJva2VTdHlsZTtcbiAgICAgIGNvbnRleHQubGluZVdpZHRoID0gY29tbWFuZC5saW5lV2lkdGg7XG4gICAgICBjb250ZXh0LmxpbmVDYXAgPSBjb21tYW5kLmxpbmVDYXA7XG4gICAgICBjb250ZXh0LmxpbmVKb2luID0gY29tbWFuZC5saW5lSm9pbjtcbiAgICAgIGNvbnRleHQubWl0ZXJMaW1pdCA9IGNvbW1hbmQubWl0ZXJMaW1pdDtcbiAgICAgIGlmIChjb21tYW5kLmFyZ3VtZW50cykge1xuICAgICAgICAoY29udGV4dCBhcyBhbnkpW2NvbW1hbmQubmFtZV0oLi4uY29tbWFuZC5hcmd1bWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKGNvbnRleHQgYXMgYW55KVtjb21tYW5kLm5hbWVdKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gJy4uL2V2ZW50L2V2ZW50LWRpc3BhdGNoZXInO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuLi9nZW9tL3JlY3RhbmdsZSc7XG5cbmV4cG9ydCBlbnVtIFNwcml0ZVNoZWV0RXZlbnQge1xuICBMT0FEID0gJ2xvYWQnLFxuICBFTkQgPSAnZW5kJyxcbn1cblxuaW50ZXJmYWNlIEZyYW1lIHtcbiAgW2luZGV4OiBzdHJpbmddOiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZVNoZWV0IGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExPQUQ6IFNwcml0ZVNoZWV0RXZlbnQgPSBTcHJpdGVTaGVldEV2ZW50LkxPQUQ7XG5cbiAgcHJpdmF0ZSBfaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBudWxsO1xuICBwcml2YXRlIF9jZWxsV2lkdGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NlbGxIZWlnaHQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2ZyYW1lczogRnJhbWVbXSA9IG51bGw7XG4gIHByaXZhdGUgX2ZyYW1lSW5kZXg6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIF9jdXJyZW50Qm91bmRzOiBSZWN0YW5nbGUgPSBudWxsO1xuICBwcml2YXRlIF9sb29wOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHVibGljIGdldCBpbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHsgcmV0dXJuIHRoaXMuX2ltYWdlOyB9XG4gIHB1YmxpYyBnZXQgY2VsbFdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jZWxsV2lkdGg7IH1cbiAgcHVibGljIGdldCBjZWxsSGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jZWxsSGVpZ2h0OyB9XG4gIHB1YmxpYyBnZXQgY3VycmVudEJvdW5kcygpIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRCb3VuZHM7IH1cblxuICBjb25zdHJ1Y3RvcihpbWc6IEhUTUxJbWFnZUVsZW1lbnQgfCBzdHJpbmcsIGNlbGxXaWR0aDogbnVtYmVyLCBjZWxsSGVpZ2h0OiBudW1iZXIsIGZyYW1lczogRnJhbWVbXSwgbG9vcDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChpbWcgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICB0aGlzLl9pbWFnZSA9IGltZztcbiAgICAgIHRoaXMudHJpZ2dlcihTcHJpdGVTaGVldC5MT0FEKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gaW1nO1xuICAgICAgdGhpcy5faW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHRoaXMudHJpZ2dlcihTcHJpdGVTaGVldC5MT0FEKSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2VsbFdpZHRoID0gY2VsbFdpZHRoO1xuICAgIHRoaXMuX2NlbGxIZWlnaHQgPSBjZWxsSGVpZ2h0O1xuICAgIHRoaXMuX2ZyYW1lcyA9IGZyYW1lcztcbiAgICB0aGlzLl9mcmFtZUluZGV4ID0gLTE7XG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0KTtcbiAgICB0aGlzLl9sb29wID0gbG9vcDtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mcmFtZUluZGV4ICsgMSA8PSB0aGlzLl9mcmFtZXMubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5fZnJhbWVJbmRleCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fbG9vcCkge1xuICAgICAgICB0aGlzLl9mcmFtZUluZGV4ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcihTcHJpdGVTaGVldEV2ZW50LkVORCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZUJvdW5kcygpO1xuICB9XG5cbiAgcHVibGljIHByZXYoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ZyYW1lSW5kZXggLSAxID4gMCkge1xuICAgICAgdGhpcy5fZnJhbWVJbmRleC0tO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fbG9vcCkge1xuICAgICAgICB0aGlzLl9mcmFtZUluZGV4ID0gdGhpcy5fZnJhbWVzLmxlbmd0aCAtIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyaWdnZXIoU3ByaXRlU2hlZXRFdmVudC5FTkQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl91cGRhdGVCb3VuZHMoKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9mcmFtZUluZGV4ID0gLTE7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCb3VuZHMoKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudEZyYW1lID0gdGhpcy5fZnJhbWVzW3RoaXMuX2ZyYW1lSW5kZXhdO1xuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMueCA9IGN1cnJlbnRGcmFtZVswXSAqIHRoaXMuX2NlbGxXaWR0aDtcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzLnkgPSBjdXJyZW50RnJhbWVbMV0gKiB0aGlzLl9jZWxsSGVpZ2h0O1xuICB9XG59XG4iLCJpbXBvcnQgRGlzcGxheSBmcm9tICcuL2Rpc3BsYXknO1xuaW1wb3J0IFNwcml0ZVNoZWV0LCB7IFNwcml0ZVNoZWV0RXZlbnQgfSBmcm9tICcuL3Nwcml0ZS1zaGVldCc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4uL3V0aWwvdGlja2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIGV4dGVuZHMgRGlzcGxheSB7XG4gIHByaXZhdGUgX3Nwcml0ZVNoZWV0OiBTcHJpdGVTaGVldCA9IG51bGw7XG4gIHByaXZhdGUgX2ZwczogbnVtYmVyID0gMTA7XG4gIHByaXZhdGUgX3RpY2tlcjogVGlja2VyID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihzcHJpdGVTaGVldDogU3ByaXRlU2hlZXQsIGZwczogbnVtYmVyID0gMTApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0ID0gc3ByaXRlU2hlZXQ7XG4gICAgdGhpcy5fZnBzID0gZnBzO1xuICAgIHRoaXMuX3RpY2tlciA9IG5ldyBUaWNrZXIoZnBzKTtcbiAgICB0aGlzLl90aWNrZXIub24oVGlja2VyLlRJQ0ssICgpID0+IHRoaXMuX3RpY2tlckhhbmRsZXIoKSk7XG4gICAgdGhpcy5fc3ByaXRlU2hlZXQub24oU3ByaXRlU2hlZXRFdmVudC5FTkQsICgpID0+IHRoaXMuc3RvcCgpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3ByaXRlU2hlZXQoKTogU3ByaXRlU2hlZXQgeyByZXR1cm4gdGhpcy5fc3ByaXRlU2hlZXQ7IH1cbiAgcHVibGljIGdldCBmcHMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2ZwczsgfVxuXG4gIHB1YmxpYyBzZXQgc3ByaXRlU2hlZXQoc3ByaXRlU2hlZXQ6IFNwcml0ZVNoZWV0KSB7XG4gICAgdGhpcy5fc3ByaXRlU2hlZXQgPSBzcHJpdGVTaGVldDtcbiAgICB0aGlzLl9ib3VuZHMud2lkdGggPSBzcHJpdGVTaGVldC5jZWxsV2lkdGg7XG4gICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IHNwcml0ZVNoZWV0LmNlbGxIZWlnaHQ7XG4gIH1cblxuICBwdWJsaWMgc2V0IGZwcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fZnBzID0gdmFsdWU7XG4gICAgdGhpcy5fdGlja2VyLmZwcyA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHBsYXkoKTogdm9pZCB7XG4gICAgdGhpcy5fdGlja2VySGFuZGxlcigpO1xuICAgIHRoaXMuX3RpY2tlci5ydW4oKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zcHJpdGVTaGVldC5yZXNldCgpO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKTogdm9pZCB7XG4gICAgdGhpcy5fdGlja2VyLnN0b3AoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVEaXNwbGF5KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuX3Nwcml0ZVNoZWV0LmN1cnJlbnRCb3VuZHM7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICB0aGlzLl9zcHJpdGVTaGVldC5pbWFnZSxcbiAgICAgIGJvdW5kcy5sZWZ0LFxuICAgICAgYm91bmRzLnRvcCxcbiAgICAgIGJvdW5kcy53aWR0aCxcbiAgICAgIGJvdW5kcy5oZWlnaHQsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIGJvdW5kcy53aWR0aCxcbiAgICAgIGJvdW5kcy5oZWlnaHQsXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RpY2tlckhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc3ByaXRlU2hlZXQubmV4dCgpO1xuICAgIHRoaXMuc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS51cGRhdGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IERpc3BsYXlDb250YWluZXIgZnJvbSAnLi9kaXNwbGF5LWNvbnRhaW5lcic7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4uL2dlb20vcmVjdGFuZ2xlJztcbmltcG9ydCBUaWNrZXIgZnJvbSAnLi4vdXRpbC90aWNrZXInO1xuaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBNb3VzZUV2ZW50IGZyb20gJy4uL2V2ZW50L21vdXNlLWV2ZW50JztcblxuZW51bSBTdGFnZUV2ZW50VHlwZSB7XG4gIEFERF9UT19TVEFHRSA9ICdhZGRUb1N0YWdlJyxcbiAgUkVNT1ZFX1RPX1NUQUdFID0gJ3JlbW92ZVRvU3RhZ2UnLFxuICBFTlRFUl9GUkFNRSA9ICdlbnRlckZyYW1lJyxcbn1cblxuaW50ZXJmYWNlIEV2ZW50VGFyZ2V0TWFwIHtcbiAgW3Byb3A6IHN0cmluZ106IERpc3BsYXlbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2UgZXh0ZW5kcyBEaXNwbGF5Q29udGFpbmVyIHtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEFERF9UT19TVEFHRTogU3RhZ2VFdmVudFR5cGUgPSBTdGFnZUV2ZW50VHlwZS5BRERfVE9fU1RBR0U7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUkVNT1ZFX1RPX1NUQUdFOiBTdGFnZUV2ZW50VHlwZSA9IFN0YWdlRXZlbnRUeXBlLlJFTU9WRV9UT19TVEFHRTtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFTlRFUl9GUkFNRTogU3RhZ2VFdmVudFR5cGUgPSBTdGFnZUV2ZW50VHlwZS5FTlRFUl9GUkFNRTtcblxuICBwdWJsaWMgY2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfZXZlbnRDYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gbnVsbDtcbiAgcHJpdmF0ZSBfZXZlbnRDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBudWxsO1xuICBwcml2YXRlIF90aWNrZXI6IFRpY2tlciA9IG51bGw7XG4gIHByaXZhdGUgX2V2ZW50VGFyZ2V0TWFwOiBFdmVudFRhcmdldE1hcCA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGNhbnZhc0lkOiBzdHJpbmcsIGZwczogbnVtYmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCkgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgdGhpcy5fY29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuX3N0YWdlID0gdGhpcztcbiAgICB0aGlzLl9ib3VuZHMgPSBuZXcgUmVjdGFuZ2xlKDAsIDAsIHRoaXMuX2NhbnZhcy53aWR0aCwgdGhpcy5fY2FudmFzLmhlaWdodCk7XG4gICAgdGhpcy5faW5pdEZQUyhmcHMpO1xuICAgIHRoaXMuX2luaXRFdmVudENhbnZhcygpO1xuICAgIHRoaXMuX2luaXRFdmVudCgpO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQgeyByZXR1cm4gdGhpcy5fY2FudmFzOyB9XG4gIHB1YmxpYyBnZXQgZXZlbnRDYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQgeyByZXR1cm4gdGhpcy5fZXZlbnRDYW52YXM7IH1cbiAgcHVibGljIGdldCBjb250ZXh0KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7IHJldHVybiB0aGlzLl9jb250ZXh0OyB9XG4gIHB1YmxpYyBnZXQgZXZlbnRDb250ZXh0KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7IHJldHVybiB0aGlzLl9ldmVudENvbnRleHQ7IH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoYW5nZWQpIHtcbiAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHRoaXMuX2NhbnZhcy53aWR0aDtcbiAgICAgIHRoaXMuX2V2ZW50Q2FudmFzLndpZHRoID0gdGhpcy5fZXZlbnRDYW52YXMud2lkdGg7XG4gICAgICBzdXBlci51cGRhdGUoKTtcbiAgICAgIHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckV2ZW50TWFwKGRpc3BsYXk6IERpc3BsYXkpOiB2b2lkIHtcbiAgICBjb25zdCBjaGlsZEV2ZW50TWFwID0gZGlzcGxheS5ldmVudE1hcDtcbiAgICBmb3IgKGNvbnN0IHR5cGUgaW4gY2hpbGRFdmVudE1hcCkge1xuICAgICAgaWYgKCF0aGlzLl9ldmVudFRhcmdldE1hcFt0eXBlXSkge1xuICAgICAgICB0aGlzLl9ldmVudFRhcmdldE1hcFt0eXBlXSA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0ucHVzaChkaXNwbGF5KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdW5yZWdpc3RlckV2ZW50TWFwKGRpc3BsYXk6IERpc3BsYXkpIHtcbiAgICBjb25zdCBjaGlsZEV2ZW50TWFwID0gZGlzcGxheS5ldmVudE1hcDtcbiAgICBmb3IgKGNvbnN0IHR5cGUgaW4gY2hpbGRFdmVudE1hcCkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9ldmVudFRhcmdldE1hcFt0eXBlXS5pbmRleE9mKGRpc3BsYXkpO1xuICAgICAgdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0RlBTKGZwczogbnVtYmVyKSB7XG4gICAgaWYgKGZwcykge1xuICAgICAgdGhpcy5fdGlja2VyID0gbmV3IFRpY2tlcihmcHMpO1xuICAgICAgdGhpcy5fdGlja2VyLm9uKFRpY2tlci5USUNLLCAoZGVsdGEpID0+IHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKFN0YWdlLkVOVEVSX0ZSQU1FLCBkZWx0YSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3RpY2tlci5ydW4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0RXZlbnRDYW52YXMoKSB7XG4gICAgdGhpcy5fZXZlbnRDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLl9ldmVudENhbnZhcy53aWR0aCA9IHRoaXMuX2NhbnZhcy53aWR0aDtcbiAgICB0aGlzLl9ldmVudENhbnZhcy5oZWlnaHQgPSB0aGlzLl9jYW52YXMuaGVpZ2h0O1xuICAgIHRoaXMuX2V2ZW50Q29udGV4dCA9IHRoaXMuX2V2ZW50Q2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggdGhpcy5fZXZlbnRDYW52YXMgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRFdmVudCgpIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5fY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIC8vICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyAgIGlmICghdGhpcy5fZXZlbnRUYXJnZXRNYXBbTW91c2VFdmVudC5DTElDS10gfHwgIXRoaXMuX2V2ZW50VGFyZ2V0TWFwW01vdXNlRXZlbnQuQ0xJQ0tdLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICAvLyAgIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgIC8vICAgY29uc3QgeSA9IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAvLyAgIGNvbnN0IGNvbG9yID0gdGhpcy5fZXZlbnRDb250ZXh0LmdldEltYWdlRGF0YSh4LCB5LCAxLCAxKTtcbiAgICAvLyAgIGNvbnN0IHIgPSBjb2xvci5kYXRhWzBdLnRvU3RyaW5nKDE2KTtcbiAgICAvLyAgIGNvbnN0IGcgPSBjb2xvci5kYXRhWzFdLnRvU3RyaW5nKDE2KTtcbiAgICAvLyAgIGNvbnN0IGIgPSBjb2xvci5kYXRhWzJdLnRvU3RyaW5nKDE2KTtcbiAgICAvLyAgIGNvbnN0IGNvbG9yS2V5ID0gJzAnLnJlcGVhdCgyIC0gci5sZW5ndGgpICsgciArICcwJy5yZXBlYXQoMiAtIGcubGVuZ3RoKSArIGcgKyAnMCcucmVwZWF0KDIgLSBiLmxlbmd0aCkgKyBiO1xuICAgIC8vICAgZm9yIChsZXQgaSA9IHRoaXMuX2V2ZW50VGFyZ2V0TWFwW01vdXNlRXZlbnQuQ0xJQ0tdLmxlbmd0aCAtIDEsIGNvdW50ID0gMDsgaSA+PSBjb3VudDsgaSAtPSAxKSB7XG4gICAgLy8gICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9ldmVudFRhcmdldE1hcFtNb3VzZUV2ZW50LkNMSUNLXVtpXTtcbiAgICAvLyAgICAgaWYgKGNvbG9yS2V5ID09PSBpdGVtLmNvbG9yS2V5KSB7XG4gICAgLy8gICAgICAgLy8gVE9ETzp0YXJnZXQgLyBjdXJyZW50VGFyZ2V0IOq1rOu2hFxuICAgIC8vICAgICAgIGl0ZW0udHJpZ2dlcihNb3VzZUV2ZW50LkNMSUNLLCBuZXcgTW91c2VFdmVudChNb3VzZUV2ZW50LkNMSUNLLCB7fSwgaXRlbSwgaXRlbSkpO1xuICAgIC8vICAgICAgIGJyZWFrO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0YWdlUmVnaW9uIHtcblxuICBwcml2YXRlIF93aWR0aDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9yb3c6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NvbDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfbWFwOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBfZGlzcGxheUxpc3Q6IERpc3BsYXlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjb2w6IG51bWJlciwgcm93OiBudW1iZXIpIHtcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLl9jb2wgPSBjb2w7XG4gICAgdGhpcy5fcm93ID0gcm93O1xuICB9XG5cbiAgcHVibGljIGFkZChkaXNwbGF5OiBEaXNwbGF5KTogdm9pZCB7XG4gIC8vIC4uXG4gIH1cbn1cbiIsIlxuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuXG50eXBlIEV2ZW50SGFuZGxlciA9IChldmVudDogRXZlbnQsIGRhdGE6IGFueSkgPT4gdm9pZDtcblxuaW50ZXJmYWNlIEV2ZW50TWFwIHtcbiAgW3Byb3A6IHN0cmluZ106IEV2ZW50SGFuZGxlcltdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBwcml2YXRlIF9ldmVudE1hcDogRXZlbnRNYXAgPSB7fTtcblxuICBwdWJsaWMgZ2V0IGV2ZW50TWFwKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50TWFwO1xuICB9XG5cbiAgcHVibGljIG9uKHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRIYW5kbGVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgdGhpcy5fZXZlbnRNYXBbdHlwZV0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRNYXBbdHlwZV0ucHVzaChoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBvZmYodHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudEhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlcikge1xuICAgICAgaWYgKHRoaXMuX2V2ZW50TWFwW3R5cGVdKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZXZlbnRNYXBbdHlwZV0uaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgdGhpcy5fZXZlbnRNYXBbdHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2V2ZW50TWFwW3R5cGVdKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50TWFwW3R5cGVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdHJpZ2dlcih0eXBlOiBzdHJpbmcsIGRhdGE/OiBhbnkpIHtcbiAgICBpZiAodGhpcy5fZXZlbnRNYXBbdHlwZV0pIHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgICBpdGVtLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50IHtcbiAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nID0gbnVsbDtcbiAgcHJpdmF0ZSBfZGF0YTogYW55ID0gbnVsbDtcblxuICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgcHVibGljIHNldCB0eXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90eXBlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgZGF0YT86IGFueSkge1xuICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICB9XG59XG4iLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5pbXBvcnQgRGlzcGxheSBmcm9tICcuLi9kaXNwbGF5L2Rpc3BsYXknO1xuXG5lbnVtIE1vdXNlRXZlbnRUeXBlIHtcbiAgQ0xJQ0sgPSAnY2xpY2snLFxuICBNT1VTRV9PVkVSID0gJ21vdXNlT3ZlcicsXG4gIE1PVVNFX09VVCA9ICdtb3VzZU91dCcsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdXNlRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBDTElDSzogTW91c2VFdmVudFR5cGUgPSBNb3VzZUV2ZW50VHlwZS5DTElDSztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBNT1VTRV9PVkVSOiBNb3VzZUV2ZW50VHlwZSA9IE1vdXNlRXZlbnRUeXBlLk1PVVNFX09WRVI7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTU9VU0VfT1VUOiBNb3VzZUV2ZW50VHlwZSA9IE1vdXNlRXZlbnRUeXBlLk1PVVNFX09VVDtcblxuICBwcml2YXRlIF90YXJnZXQ6IERpc3BsYXkgPSBudWxsO1xuICBwcml2YXRlIF9jdXJyZW50VGFyZ2V0OiBEaXNwbGF5ID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih0eXBlOiBNb3VzZUV2ZW50VHlwZSwgZGF0YTogYW55LCB0YXJnZXQ6IERpc3BsYXksIGN1cnJlbnRUYXJnZXQ6IERpc3BsYXkpIHtcbiAgICBzdXBlcih0eXBlLCBkYXRhKTtcbiAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IGN1cnJlbnRUYXJnZXQ7XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4IHtcbiAgcHVibGljIGE6IG51bWJlciA9IDE7XG4gIHB1YmxpYyBiOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgYzogbnVtYmVyID0gMDtcbiAgcHVibGljIGQ6IG51bWJlciA9IDE7XG4gIHB1YmxpYyB0eDogbnVtYmVyID0gMDtcbiAgcHVibGljIHR5OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGE6IG51bWJlciA9IDEsIGI6IG51bWJlciA9IDAsIGM6IG51bWJlciA9IDAsIGQ6IG51bWJlciA9IDEsIHR4OiBudW1iZXIgPSAwLCB0eTogbnVtYmVyID0gMCkge1xuICAgIHRoaXMuc2V0VG8oYSwgYiwgYywgZCwgdHgsIHR5KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRUbyhhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIsIHR4OiBudW1iZXIsIHR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmEgPSBhO1xuICAgIHRoaXMuYiA9IGI7XG4gICAgdGhpcy5jID0gYztcbiAgICB0aGlzLmQgPSBkO1xuICAgIHRoaXMudHggPSB0eDtcbiAgICB0aGlzLnR5ID0gdHk7XG4gIH1cblxuICBwdWJsaWMgc2V0VG9NYXRyaXgobWF0cml4OiBNYXRyaXgpOiB2b2lkIHtcbiAgICB0aGlzLmEgPSBtYXRyaXguYTtcbiAgICB0aGlzLmIgPSBtYXRyaXguYjtcbiAgICB0aGlzLmMgPSBtYXRyaXguYztcbiAgICB0aGlzLmQgPSBtYXRyaXguZDtcbiAgICB0aGlzLnR4ID0gbWF0cml4LnR4O1xuICAgIHRoaXMudHkgPSBtYXRyaXgudHk7XG4gIH1cblxuICBwdWJsaWMgYWRkKG1hdHJpeDogTWF0cml4KTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuc2V0VG8odGhpcy5hICsgbWF0cml4LmEsIHRoaXMuYiArIG1hdHJpeC5iLCB0aGlzLmMgKyBtYXRyaXguYywgdGhpcy5kICsgbWF0cml4LmQsIHRoaXMudHggKyBtYXRyaXgudHgsIHRoaXMudHkgKyBtYXRyaXgudHkpO1xuICB9XG5cbiAgcHVibGljIHN1YihtYXRyaXg6IE1hdHJpeCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLnNldFRvKHRoaXMuYSAtIG1hdHJpeC5hLCB0aGlzLmIgLSBtYXRyaXguYiwgdGhpcy5jIC0gbWF0cml4LmMsIHRoaXMuZCAtIG1hdHJpeC5kLCB0aGlzLnR4IC0gbWF0cml4LnR4LCB0aGlzLnR5IC0gbWF0cml4LnR5KTtcbiAgfVxuXG4gIHB1YmxpYyBtdWx0aShtYXRyaXg6IE1hdHJpeCk6IHZvaWQge1xuICAgIGxldCBhOiBudW1iZXI7XG4gICAgbGV0IGI6IG51bWJlcjtcbiAgICBsZXQgYzogbnVtYmVyO1xuICAgIGxldCBkOiBudW1iZXI7XG4gICAgbGV0IHR4OiBudW1iZXI7XG4gICAgbGV0IHR5OiBudW1iZXI7XG5cbiAgICBpZiAodHlwZW9mIG1hdHJpeCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGEgPSB0aGlzLmEgKiBtYXRyaXg7XG4gICAgICBiID0gdGhpcy5iICogbWF0cml4O1xuICAgICAgYyA9IHRoaXMuYyAqIG1hdHJpeDtcbiAgICAgIGQgPSB0aGlzLmQgKiBtYXRyaXg7XG4gICAgICB0eCA9IHRoaXMudHggKiBtYXRyaXg7XG4gICAgICB0eSA9IHRoaXMudHkgKiBtYXRyaXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSAodGhpcy5hICogbWF0cml4LmEpICsgKHRoaXMuYyAqIG1hdHJpeC5iKTtcbiAgICAgIGIgPSAodGhpcy5iICogbWF0cml4LmEpICsgKHRoaXMuZCAqIG1hdHJpeC5iKTtcbiAgICAgIGMgPSAodGhpcy5hICogbWF0cml4LmMpICsgKHRoaXMuYyAqIG1hdHJpeC5kKTtcbiAgICAgIGQgPSAodGhpcy5iICogbWF0cml4LmMpICsgKHRoaXMuZCAqIG1hdHJpeC5kKTtcbiAgICAgIHR4ID0gKHRoaXMuYSAqIG1hdHJpeC50eCkgKyAodGhpcy5jICogbWF0cml4LnR5KSArIHRoaXMudHg7XG4gICAgICB0eSA9ICh0aGlzLmIgKiBtYXRyaXgudHgpICsgKHRoaXMuZCAqIG1hdHJpeC50eSkgKyB0aGlzLnR5O1xuICAgIH1cbiAgICB0aGlzLnNldFRvKGEsIGIsIGMsIGQsIHR4LCB0eSk7XG4gIH1cblxuICBwdWJsaWMgaW52ZXJzZSgpOiBNYXRyaXgge1xuICAgIGNvbnN0IHsgYSwgYiwgYywgZCwgdHgsIHR5IH0gPSB0aGlzO1xuICAgIGNvbnN0IG4gPSBhICogZCAtIGIgKiBjO1xuICAgIHJldHVybiBuZXcgTWF0cml4KGQgLyBuLCAtYiAvIG4sIC1jIC8gbiwgYSAvIG4sIChjICogdGhpcy50eSAtIGQgKiB0eCkgLyBuLCAoYiAqIHR4IC0gYSAqIHRoaXMudHkpIC8gbik7XG4gIH1cblxuICBwdWJsaWMgY2xvbmUoKTogTWF0cml4IHtcbiAgICByZXR1cm4gbmV3IE1hdHJpeCh0aGlzLmEsIHRoaXMuYiwgdGhpcy5jLCB0aGlzLmQsIHRoaXMudHgsIHRoaXMudHkpO1xuICB9XG5cbiAgcHVibGljIHNjYWxlKHg6IG51bWJlciA9IDEsIHk6IG51bWJlciA9IDEpOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpKG5ldyBNYXRyaXgoeCwgMCwgMCwgeSwgMCwgMCkpO1xuICB9XG5cbiAgcHVibGljIHRyYW5zbGF0ZSh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5tdWx0aShuZXcgTWF0cml4KDEsIDAsIDAsIDEsIHgsIHkpKTtcbiAgfVxuXG4gIHB1YmxpYyByb3RhdGUoYW5nbGU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubXVsdGkobmV3IE1hdHJpeChNYXRoLmNvcyhhbmdsZSksIE1hdGguc2luKGFuZ2xlKSwgLU1hdGguc2luKGFuZ2xlKSwgTWF0aC5jb3MoYW5nbGUpKSk7XG4gIH1cblxuICBwdWJsaWMgc2tldyh4ID0gMCwgeSA9IDApOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpKG5ldyBNYXRyaXgoMSwgTWF0aC50YW4oeSksIE1hdGgudGFuKHgpLCAxLCAwLCAwKSk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRUbygxLCAwLCAwLCAxLCAwLCAwKTtcbiAgfVxuXG4gIHB1YmxpYyBlcXVhbHMobWF0cml4OiBNYXRyaXgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hID09PSBtYXRyaXguYSAmJiB0aGlzLmIgPT09IG1hdHJpeC5iICYmIHRoaXMuYyA9PT0gbWF0cml4LmMgJiYgdGhpcy5kID09PSBtYXRyaXguZCAmJiB0aGlzLnR4ID09PSBtYXRyaXgudHggJiYgdGhpcy50eSA9PT0gbWF0cml4LnR5O1xuICB9XG59XG4iLCJpbXBvcnQgTWF0cml4IGZyb20gJy4vbWF0cml4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnQge1xuICBwdWJsaWMgeDogbnVtYmVyID0gMDtcbiAgcHVibGljIHk6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIHB1YmxpYyBkaXN0YW5jZShwb2ludDogUG9pbnQpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQueCAtIHRoaXMueCwgMikgKyBNYXRoLnBvdyhwb2ludC55IC0gdGhpcy55LCAyKSk7XG4gIH1cblxuICBwdWJsaWMgcm90YXRlKHJhZGlhbjogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IG1hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeChNYXRoLmNvcyhyYWRpYW4pLCBNYXRoLnNpbihyYWRpYW4pLCAtTWF0aC5zaW4ocmFkaWFuKSwgTWF0aC5jb3MocmFkaWFuKSk7XG4gICAgY29uc3QgcHg6IG51bWJlciA9IChtYXRyaXguYSAqIHRoaXMueCkgKyAobWF0cml4LmMgKiB0aGlzLnkpO1xuICAgIGNvbnN0IHB5OiBudW1iZXIgPSAobWF0cml4LmIgKiB0aGlzLngpICsgKG1hdHJpeC5kICogdGhpcy55KTtcbiAgICByZXR1cm4gbmV3IFBvaW50KHB4LCBweSk7XG4gIH1cblxuICBwdWJsaWMgc2NhbGUoc2NhbGVYOiBudW1iZXIsIHNjYWxlWTogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IG1hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeChzY2FsZVgsIDAsIDAsIHNjYWxlWSk7XG4gICAgY29uc3QgcHg6IG51bWJlciA9IChtYXRyaXguYSAqIHRoaXMueCkgKyAobWF0cml4LmMgKiB0aGlzLnkpO1xuICAgIGNvbnN0IHB5OiBudW1iZXIgPSAobWF0cml4LmIgKiB0aGlzLngpICsgKG1hdHJpeC5kICogdGhpcy55KTtcbiAgICByZXR1cm4gbmV3IFBvaW50KHB4LCBweSk7XG4gIH1cblxuICBwdWJsaWMgdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IG1hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeCgxLCAwLCAwLCAxLCB4LCB5KTtcbiAgICBjb25zdCBweDogbnVtYmVyID0gKG1hdHJpeC5hICogdGhpcy54KSArIChtYXRyaXguYyAqIHRoaXMueSkgKyBtYXRyaXgudHg7XG4gICAgY29uc3QgcHk6IG51bWJlciA9IChtYXRyaXguYiAqIHRoaXMueCkgKyAobWF0cml4LmQgKiB0aGlzLnkpICsgbWF0cml4LnR5O1xuICAgIHJldHVybiBuZXcgUG9pbnQocHgsIHB5KTtcbiAgfVxuXG4gIHB1YmxpYyBza2V3KHNrZXdYOiBudW1iZXIsIHNrZXdZOiBudW1iZXIpOiBQb2ludCB7XG4gICAgY29uc3QgbWF0cml4OiBNYXRyaXggPSBuZXcgTWF0cml4KDEsIE1hdGgudGFuKHNrZXdYKSwgTWF0aC50YW4oc2tld1kpLCAxKTtcbiAgICBjb25zdCBweDogbnVtYmVyID0gKG1hdHJpeC5hICogdGhpcy54KSArIChtYXRyaXguYyAqIHRoaXMueSk7XG4gICAgY29uc3QgcHk6IG51bWJlciA9IChtYXRyaXguYiAqIHRoaXMueCkgKyAobWF0cml4LmQgKiB0aGlzLnkpO1xuICAgIHJldHVybiBuZXcgUG9pbnQocHgsIHB5KTtcbiAgfVxufVxuIiwiaW1wb3J0IFBvaW50IGZyb20gJy4vcG9pbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGUge1xuXG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2xlZnRUb3A6IFBvaW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfcmlnaHRUb3A6IFBvaW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfbGVmdEJvdHRvbTogUG9pbnQgPSBudWxsO1xuICBwcml2YXRlIF9yaWdodEJvdHRvbTogUG9pbnQgPSBudWxsO1xuXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdFRvcC54OyB9XG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdFRvcC55OyB9XG4gIHB1YmxpYyBnZXQgd2lkdGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9XG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9oZWlnaHQ7IH1cbiAgcHVibGljIGdldCBsZWZ0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZWZ0VG9wLng7IH1cbiAgcHVibGljIGdldCByaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcmlnaHRUb3AueDsgfVxuICBwdWJsaWMgZ2V0IHRvcCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdFRvcC55OyB9XG4gIHB1YmxpYyBnZXQgYm90dG9tKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZWZ0Qm90dG9tLnk7IH1cbiAgcHVibGljIGdldCBsZWZ0VG9wKCk6IFBvaW50IHsgcmV0dXJuIHRoaXMuX2xlZnRUb3A7IH1cbiAgcHVibGljIGdldCByaWdodFRvcCgpOiBQb2ludCB7IHJldHVybiB0aGlzLl9yaWdodFRvcDsgfVxuICBwdWJsaWMgZ2V0IGxlZnRCb3R0b20oKTogUG9pbnQgeyByZXR1cm4gdGhpcy5fbGVmdEJvdHRvbTsgfVxuICBwdWJsaWMgZ2V0IHJpZ2h0Qm90dG9tKCk6IFBvaW50IHsgcmV0dXJuIHRoaXMuX3JpZ2h0Qm90dG9tOyB9XG5cbiAgcHVibGljIHNldCB4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9sZWZ0VG9wLnggPSB2YWx1ZTtcbiAgICB0aGlzLl9sZWZ0Qm90dG9tLnggPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVSaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCB5KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9sZWZ0VG9wLnkgPSB2YWx1ZTtcbiAgICB0aGlzLl9sZWZ0Qm90dG9tLnkgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVCb3R0b20oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlUmlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVCb3R0b20oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGVmdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sZWZ0VG9wLnggPSB2YWx1ZTtcbiAgICB0aGlzLmxlZnRCb3R0b20ueCA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHJpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnJpZ2h0VG9wLnggPSB2YWx1ZTtcbiAgICB0aGlzLnJpZ2h0Qm90dG9tLnggPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICB9XG5cbiAgcHVibGljIHNldCB0b3AodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMubGVmdFRvcC55ID0gdmFsdWU7XG4gICAgdGhpcy5yaWdodFRvcC55ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGJvdHRvbSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sZWZ0Qm90dG9tLnkgPSB2YWx1ZTtcbiAgICB0aGlzLnJpZ2h0Qm90dG9tLnkgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGVmdFRvcChwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLl9sZWZ0VG9wID0gcG9pbnQ7XG4gICAgdGhpcy5fdXBkYXRlV2lkdGgoKTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcmlnaHRUb3AocG9pbnQ6IFBvaW50KSB7XG4gICAgdGhpcy5fcmlnaHRUb3AgPSBwb2ludDtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCBsZWZ0Qm90dG9tKHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMuX2xlZnRCb3R0b20gPSBwb2ludDtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCByaWdodEJvdHRvbShwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLl9yaWdodEJvdHRvbSA9IHBvaW50O1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCB3aWR0aDogbnVtYmVyID0gMCwgaGVpZ2h0OiBudW1iZXIgPSAwKSB7XG4gICAgdGhpcy5fbGVmdFRvcCA9IG5ldyBQb2ludCgpO1xuICAgIHRoaXMuX3JpZ2h0VG9wID0gbmV3IFBvaW50KCk7XG4gICAgdGhpcy5fbGVmdEJvdHRvbSA9IG5ldyBQb2ludCgpO1xuICAgIHRoaXMuX3JpZ2h0Qm90dG9tID0gbmV3IFBvaW50KCk7XG4gICAgdGhpcy5zZXRUbyh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIHB1YmxpYyBjb250YWlucyh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB4ID49IHRoaXMubGVmdCAmJiB4IDw9IHRoaXMucmlnaHQgJiYgeSA8PSB0aGlzLmJvdHRvbSAmJiB5ID49IHRoaXMudG9wO1xuICB9XG5cbiAgcHVibGljIGNvbnRhaW5zUmVjdChyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiByZWN0YW5nbGUubGVmdCA+PSB0aGlzLmxlZnQgJiYgcmVjdGFuZ2xlLnJpZ2h0IDw9IHRoaXMucmlnaHQgJiYgcmVjdGFuZ2xlLnRvcCA+PSB0aGlzLnRvcCAmJiByZWN0YW5nbGUuYm90dG9tIDw9IHRoaXMuYm90dG9tO1xuICB9XG5cbiAgcHVibGljIGludGVyc2VjdHMocmVjdGFuZ2xlOiBSZWN0YW5nbGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWlucyhyZWN0YW5nbGUubGVmdCArIDEsIHJlY3RhbmdsZS50b3AgKyAxKSB8fCB0aGlzLmNvbnRhaW5zKHJlY3RhbmdsZS5sZWZ0ICsgMSwgcmVjdGFuZ2xlLmJvdHRvbSAtIDEpIHx8IHRoaXMuY29udGFpbnMocmVjdGFuZ2xlLnJpZ2h0IC0gMSwgcmVjdGFuZ2xlLnRvcCArIDEpIHx8IHRoaXMuY29udGFpbnMocmVjdGFuZ2xlLnJpZ2h0IC0gMSwgcmVjdGFuZ2xlLmJvdHRvbSAtIDEpO1xuICB9XG5cbiAgcHVibGljIGludGVyc2VjdGlvbihyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZSB7XG4gICAgbGV0IHJlc3VsdDogUmVjdGFuZ2xlID0gbnVsbDtcbiAgICBpZiAodGhpcy5pbnRlcnNlY3RzKHJlY3RhbmdsZSkpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBSZWN0YW5nbGUoKTtcbiAgICAgIHJlc3VsdC5sZWZ0ID0gTWF0aC5tYXgocmVjdGFuZ2xlLmxlZnQsIHRoaXMubGVmdCk7XG4gICAgICByZXN1bHQucmlnaHQgPSBNYXRoLm1pbihyZWN0YW5nbGUucmlnaHQsIHRoaXMucmlnaHQpO1xuICAgICAgcmVzdWx0LnRvcCA9IE1hdGgubWF4KHJlY3RhbmdsZS50b3AsIHRoaXMudG9wKTtcbiAgICAgIHJlc3VsdC5ib3R0b20gPSBNYXRoLm1pbihyZWN0YW5nbGUuYm90dG9tLCB0aGlzLmJvdHRvbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kcyhyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IHZvaWQge1xuICAgIGNvbnN0IGxlZnQ6IG51bWJlciA9IE1hdGgubWluKHRoaXMubGVmdCwgcmVjdGFuZ2xlLmxlZnQpO1xuICAgIGNvbnN0IHJpZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLnJpZ2h0LCByZWN0YW5nbGUucmlnaHQpO1xuICAgIGNvbnN0IHRvcDogbnVtYmVyID0gTWF0aC5taW4odGhpcy50b3AsIHJlY3RhbmdsZS50b3ApO1xuICAgIGNvbnN0IGJvdHRvbTogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5ib3R0b20sIHJlY3RhbmdsZS5ib3R0b20pO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICB9XG5cbiAgcHVibGljIGV4dGVuZHNWYWx1ZSh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBsZWZ0OiBudW1iZXIgPSBNYXRoLm1pbih0aGlzLmxlZnQsIHgpO1xuICAgIGNvbnN0IHJpZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLnJpZ2h0LCB4ICsgd2lkdGgpO1xuICAgIGNvbnN0IHRvcDogbnVtYmVyID0gTWF0aC5taW4odGhpcy50b3AsIHkpO1xuICAgIGNvbnN0IGJvdHRvbTogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5ib3R0b20sIHkgKyBoZWlnaHQpO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICB9XG5cbiAgcHVibGljIGV4dGVuZHNQb2ludChwb2ludDogUG9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLmV4dGVuZHNQb3NpdGlvbihwb2ludC54LCBwb2ludC55KTtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRzUG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sZWZ0ID49IHgpIHtcbiAgICAgIHRoaXMubGVmdCA9IHg7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJpZ2h0IDw9IHgpIHtcbiAgICAgIHRoaXMucmlnaHQgPSB4O1xuICAgIH1cbiAgICBpZiAodGhpcy50b3AgPj0geSkge1xuICAgICAgdGhpcy50b3AgPSB5O1xuICAgIH0gZWxzZSBpZiAodGhpcy5ib3R0b20gPD0geSkge1xuICAgICAgdGhpcy5ib3R0b20gPSB5O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRUbyh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgcHVibGljIGNsb25lKCk6IFJlY3RhbmdsZSB7XG4gICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUodGhpcy5sZWZ0LCB0aGlzLnRvcCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VG8oMCwgMCwgMCwgMCk7XG4gIH1cblxuICBwdWJsaWMgZXF1YWxzKHJlY3RhbmdsZTogUmVjdGFuZ2xlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubGVmdCA9PT0gcmVjdGFuZ2xlLmxlZnQgJiYgdGhpcy50b3AgPT09IHJlY3RhbmdsZS50b3AgJiYgdGhpcy5yaWdodCA9PT0gcmVjdGFuZ2xlLnJpZ2h0ICYmIHRoaXMuYm90dG9tID09PSByZWN0YW5nbGUuYm90dG9tICYmIHRoaXMud2lkdGggPT09IHJlY3RhbmdsZS53aWR0aCAmJiB0aGlzLmhlaWdodCA9PT0gcmVjdGFuZ2xlLmhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVdpZHRoKCk6IHZvaWQge1xuICAgIHRoaXMuX3dpZHRoID0gdGhpcy5fcmlnaHRUb3AueCAtIHRoaXMuX2xlZnRUb3AueDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUhlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLl9sZWZ0Qm90dG9tLnkgLSB0aGlzLl9sZWZ0VG9wLnk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVSaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yaWdodEJvdHRvbS54ID0gdGhpcy5fcmlnaHRUb3AueCA9IHRoaXMuX2xlZnRUb3AueCArIHRoaXMuX3dpZHRoO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQm90dG9tKCk6IHZvaWQge1xuICAgIHRoaXMuX2xlZnRCb3R0b20ueSA9IHRoaXMuX3JpZ2h0Qm90dG9tLnkgPSB0aGlzLl9sZWZ0VG9wLnkgKyB0aGlzLl9oZWlnaHQ7XG4gIH1cbn1cbiIsIlxuaW1wb3J0IFN0YWdlIGZyb20gJy4vZGlzcGxheS9zdGFnZSc7XG5pbXBvcnQgRGlzcGxheSBmcm9tICcuL2Rpc3BsYXkvZGlzcGxheSc7XG5pbXBvcnQgRGlzcGxheUNvbnRhaW5lciBmcm9tICcuL2Rpc3BsYXkvZGlzcGxheS1jb250YWluZXInO1xuaW1wb3J0IEdyYXBoaWNzIGZyb20gJy4vZGlzcGxheS9ncmFwaGljcyc7XG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9kaXNwbGF5L3NoYXBlJztcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9kaXNwbGF5L3Nwcml0ZSc7XG5pbXBvcnQgU3ByaXRlU2hlZXQgZnJvbSAnLi9kaXNwbGF5L3Nwcml0ZS1zaGVldCc7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gJy4vZXZlbnQvZXZlbnQtZGlzcGF0Y2hlcic7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudC9ldmVudCc7XG5pbXBvcnQgTW91c2VFdmVudCBmcm9tICcuL2V2ZW50L21vdXNlLWV2ZW50JztcbmltcG9ydCBNYXRyaXggZnJvbSAnLi9nZW9tL21hdHJpeCc7XG5pbXBvcnQgUG9pbnQgZnJvbSAnLi9nZW9tL3BvaW50JztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi9nZW9tL3JlY3RhbmdsZSc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vdXRpbC90aWNrZXInO1xuXG5jb25zdCBzdGcgPSB7XG4gIFN0YWdlLFxuICBEaXNwbGF5LFxuICBEaXNwbGF5Q29udGFpbmVyLFxuICBHcmFwaGljcyxcbiAgU2hhcGUsXG4gIFNwcml0ZSxcbiAgU3ByaXRlU2hlZXQsXG4gIEV2ZW50RGlzcGF0Y2hlcixcbiAgRXZlbnQsXG4gIE1vdXNlRXZlbnQsXG4gIE1hdHJpeCxcbiAgUG9pbnQsXG4gIFJlY3RhbmdsZSxcbiAgVGlja2VyLFxufTtcblxuKHdpbmRvdyBhcyBhbnkpLnN0ZyA9IHN0ZztcblxuZXhwb3J0IGRlZmF1bHQgc3RnO1xuIiwiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tICcuLi9ldmVudC9ldmVudC1kaXNwYXRjaGVyJztcblxuZW51bSBUaWNrZXJTdGF0ZSB7XG4gIFJFQURZID0gJ3JlYWR5JyxcbiAgUlVOTklORyA9ICdydW5uaW5nJyxcbn1cblxuZW51bSBUaWNrZXJFdmVudCB7XG4gIFRJQ0sgPSAndGljaycsXG59XG5cbmNvbnN0IF9vbmVTZWM6IG51bWJlciA9IDEwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tlciBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUSUNLOiBUaWNrZXJFdmVudCA9IFRpY2tlckV2ZW50LlRJQ0s7XG5cbiAgcHJpdmF0ZSBfZnBzOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9zdGF0ZTogVGlja2VyU3RhdGUgPSBUaWNrZXJTdGF0ZS5SRUFEWTtcbiAgcHJpdmF0ZSBfcHJldlRpbWU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2ludGVybmFsVGltZTogbnVtYmVyID0gMDtcblxuICBwdWJsaWMgZ2V0IGZwcygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZnBzOyB9XG5cbiAgcHVibGljIHNldCBmcHModmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2ZwcyA9IE1hdGgubWF4KHZhbHVlLCAxKTtcbiAgICAvLyBUT0RPOiDroZzsp4Eg7ZmV7J24XG4gICAgaWYgKHZhbHVlID4gMCAmJiB2YWx1ZSA8IDEpIHtcbiAgICAgIHRoaXMuX2ludGVybmFsVGltZSA9IChfb25lU2VjICogdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbFRpbWUgPSAoX29uZVNlYyAvIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihmcHMgPSA0MCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5mcHMgPSBmcHM7XG4gICAgdGhpcy5fc3RhdGUgPSBUaWNrZXJTdGF0ZS5SRUFEWTtcbiAgfVxuXG4gIHB1YmxpYyBydW4oKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGUgPSBUaWNrZXJTdGF0ZS5SVU5OSU5HO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gK25ldyBEYXRlKCk7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9ydW4oKSk7XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdGF0ZSA9IFRpY2tlclN0YXRlLlJFQURZO1xuICB9XG5cbiAgcHJpdmF0ZSBfcnVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gVGlja2VyU3RhdGUuUkVBRFkpIHsgcmV0dXJuOyB9XG4gICAgY29uc3Qgbm93ID0gK25ldyBEYXRlKCk7XG4gICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl9wcmV2VGltZTtcbiAgICBpZiAoZGVsdGEgPj0gdGhpcy5faW50ZXJuYWxUaW1lKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoVGlja2VyLlRJQ0ssIHsgZGVsdGE6IGRlbHRhIH0pO1xuICAgICAgdGhpcy5fcHJldlRpbWUgPSArbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IFRpY2tlclN0YXRlLlJVTk5JTkcpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fcnVuKCkpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==