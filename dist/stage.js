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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS1jb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9ncmFwaGljcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zaGFwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zcHJpdGUtc2hlZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvc3ByaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9kaXNwbGF5L3N0YWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC1kaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQvbW91c2UtZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlb20vbWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3BvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3JlY3RhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvdGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNB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LENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDM0QsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSx3QkFBTyxHQUFkO1FBQ1EsYUFBNkIsRUFBM0IsUUFBQyxFQUFFLFFBQUMsRUFBRSxRQUFDLEVBQUUsUUFBQyxFQUFFLFVBQUUsRUFBRSxVQUFFLENBQVU7UUFDcEMsSUFB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QUM7Q0FBQSxDQWxEbUMsMEJBQWUsR0FrRGxEO2tCQWxEb0IsTUFBTSIsImZpbGUiOiJzdGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3N0YWdlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzcGxheUNvbnRhaW5lciBleHRlbmRzIERpc3BsYXkge1xuXG4gIHByaXZhdGUgX2NoaWxkcmVuOiBEaXNwbGF5W10gPSBbXTtcblxuICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IERpc3BsYXlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDaGlsZChjaGlsZDogRGlzcGxheSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2NoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIGNoaWxkLnN0YWdlID0gdGhpcy5zdGFnZTtcbiAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgIHRoaXMuc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgY2hpbGQudHJpZ2dlcihTdGFnZS5BRERfVE9fU1RBR0UpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUNoaWxkQWxsKCk6IHZvaWQge1xuICAgIHdoaWxlICh0aGlzLl9jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5fY2hpbGRyZW5bdGhpcy5fY2hpbGRyZW4ubGVuZ3RoIC0gMV0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVDaGlsZChjaGlsZDogRGlzcGxheSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkgeyByZXR1cm47IH1cbiAgICBjaGlsZC50cmlnZ2VyKFN0YWdlLlJFTU9WRV9UT19TVEFHRSk7XG4gICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKCBpbmRleCwgMSApO1xuICAgIGNoaWxkLnN0YWdlID0gbnVsbDtcbiAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIERpc3BsYXlDb250YWluZXIpIHtcbiAgICAgIChjaGlsZCBhcyBEaXNwbGF5Q29udGFpbmVyKS5yZW1vdmVDaGlsZEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVDaGlsZEF0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuZ2V0Q2hpbGRBdChpbmRleCkpO1xuICAgIHRoaXMuX2NoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5zdGFnZS5jaGFuZ2VkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDaGlsZEF0KGluZGV4OiBudW1iZXIpOiBEaXNwbGF5IHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW5baW5kZXhdO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZURpc3BsYXkoKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiB0aGlzLl9jaGlsZHJlbikge1xuICAgICAgaWYgKGNoaWxkLnZpc2libGUpIHtcbiAgICAgICAgY2hpbGQudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gJy4uL2V2ZW50L2V2ZW50LWRpc3BhdGNoZXInO1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuLi9nZW9tL21hdHJpeCc7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4uL2dlb20vcmVjdGFuZ2xlJztcbmltcG9ydCBEaXNwbGF5Q29udGFpbmVyIGZyb20gJy4vZGlzcGxheS1jb250YWluZXInO1xuaW1wb3J0IFN0YWdlIGZyb20gJy4vc3RhZ2UnO1xuXG4vLyBUT0RPOiDtjIzqtLTsnpAg6rWs7ZiEXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBEaXNwbGF5IGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcblxuICBwcm90ZWN0ZWQgX3N0YWdlOiBTdGFnZSA9IG51bGw7XG4gIHByb3RlY3RlZCBfcGFyZW50OiBEaXNwbGF5Q29udGFpbmVyID0gbnVsbDtcbiAgcHJvdGVjdGVkIF9ib3VuZHM6IFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcbiAgcHJvdGVjdGVkIF9jb21wdXRlZEJvdW5kczogUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xuICBwcm90ZWN0ZWQgX21hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeCgpO1xuICBwcm90ZWN0ZWQgX2NlbnRlclg6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfY2VudGVyWTogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9yb3RhdGU6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfd2lkdGg6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfaGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX3NjYWxlWDogbnVtYmVyID0gMTtcbiAgcHJvdGVjdGVkIF9zY2FsZVk6IG51bWJlciA9IDE7XG4gIHByb3RlY3RlZCBfc2tld1g6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfc2tld1k6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgcHVibGljIGdldCBzdGFnZSgpOiBTdGFnZSB7IHJldHVybiB0aGlzLl9zdGFnZTsgfVxuICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBEaXNwbGF5Q29udGFpbmVyIHsgcmV0dXJuIHRoaXMuX3BhcmVudDsgfVxuICBwdWJsaWMgZ2V0IHgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2JvdW5kcy5sZWZ0OyB9XG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYm91bmRzLnRvcDsgfVxuICBwdWJsaWMgZ2V0IGNlbnRlclgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2NlbnRlclg7IH1cbiAgcHVibGljIGdldCBjZW50ZXJZKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jZW50ZXJZOyB9XG4gIHB1YmxpYyBnZXQgd2lkdGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2JvdW5kcy53aWR0aDsgfVxuICBwdWJsaWMgZ2V0IGhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYm91bmRzLmhlaWdodDsgfVxuICBwdWJsaWMgZ2V0IHJvdGF0ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcm90YXRlOyB9XG4gIHB1YmxpYyBnZXQgc2NhbGVYKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zY2FsZVg7IH1cbiAgcHVibGljIGdldCBzY2FsZVkoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NjYWxlWTsgfVxuICBwdWJsaWMgZ2V0IHNrZXdYKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9za2V3WDsgfVxuICBwdWJsaWMgZ2V0IHNrZXdZKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9za2V3WTsgfVxuICBwdWJsaWMgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl92aXNpYmxlOyB9XG4gIHB1YmxpYyBnZXQgYm91bmRzKCk6IFJlY3RhbmdsZSB7IHJldHVybiB0aGlzLl9ib3VuZHM7IH1cbiAgcHVibGljIGdldCBtYXRyaXgoKTogTWF0cml4IHsgcmV0dXJuIHRoaXMuX21hdHJpeDsgfVxuXG4gIHB1YmxpYyBnZXQgY29tcHV0ZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5ib3VuZHM7XG4gICAgY29uc3QgcG9pbnRzID0gW2JvdW5kcy5sZWZ0VG9wLCBib3VuZHMucmlnaHRUb3AsIGJvdW5kcy5sZWZ0Qm90dG9tLCBib3VuZHMucmlnaHRCb3R0b21dO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHBvaW50cykge1xuICAgICAgaXRlbS5yb3RhdGUodGhpcy5fcm90YXRlKTtcbiAgICAgIGl0ZW0uc2tldyh0aGlzLl9za2V3WCwgdGhpcy5fc2tld1kpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbXB1dGVkQm91bmRzLmxlZnQgPSBNYXRoLm1pbihib3VuZHMubGVmdFRvcC54LCBib3VuZHMucmlnaHRUb3AueCwgYm91bmRzLmxlZnRCb3R0b20ueCwgYm91bmRzLnJpZ2h0Qm90dG9tLngpO1xuICAgIHRoaXMuX2NvbXB1dGVkQm91bmRzLnJpZ2h0ID0gTWF0aC5tYXgoYm91bmRzLmxlZnRUb3AueCwgYm91bmRzLnJpZ2h0VG9wLngsIGJvdW5kcy5sZWZ0Qm90dG9tLngsIGJvdW5kcy5yaWdodEJvdHRvbS54KTtcbiAgICB0aGlzLl9jb21wdXRlZEJvdW5kcy50b3AgPSBNYXRoLm1pbihib3VuZHMubGVmdFRvcC55LCBib3VuZHMucmlnaHRUb3AueSwgYm91bmRzLmxlZnRCb3R0b20ueSwgYm91bmRzLnJpZ2h0Qm90dG9tLnkpO1xuICAgIHRoaXMuX2NvbXB1dGVkQm91bmRzLmJvdHRvbSA9IE1hdGgubWF4KGJvdW5kcy5sZWZ0VG9wLnksIGJvdW5kcy5yaWdodFRvcC55LCBib3VuZHMubGVmdEJvdHRvbS55LCBib3VuZHMucmlnaHRCb3R0b20ueSk7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXB1dGVkQm91bmRzO1xuICB9XG5cbiAgcHVibGljIHNldCBzdGFnZShzdGFnZTogU3RhZ2UpIHtcbiAgICB0aGlzLl9zdGFnZSA9IHN0YWdlO1xuICAgIGlmICh0aGlzLl9zdGFnZSkge1xuICAgICAgdGhpcy5fc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBwYXJlbnQocGFyZW50OiBEaXNwbGF5Q29udGFpbmVyKSB7IHRoaXMuX3BhcmVudCA9IHBhcmVudDsgfVxuXG4gIHB1YmxpYyBzZXQgeCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2JvdW5kcy5sZWZ0ID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9ib3VuZHMubGVmdCA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHkodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9ib3VuZHMudG9wID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9ib3VuZHMudG9wID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgY2VudGVyWCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY2VudGVyWCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHNldCBjZW50ZXJZKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jZW50ZXJZID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IHdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fd2lkdGggPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XG4gICAgdGhpcy5fYm91bmRzLndpZHRoID0gdmFsdWUgKiB0aGlzLl9zY2FsZVg7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5oZWlnaHQgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSB2YWx1ZSAqIHRoaXMuX3NjYWxlWTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCByb3RhdGUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9yb3RhdGUgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3JvdGF0ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNjYWxlWCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3NjYWxlWCA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2NhbGVYID0gdmFsdWU7XG4gICAgdGhpcy5fYm91bmRzLndpZHRoID0gdGhpcy5fd2lkdGggKiB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBzY2FsZVkodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9zY2FsZVkgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NjYWxlWSA9IHZhbHVlO1xuICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSB0aGlzLl9oZWlnaHQgKiB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBza2V3WCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3NrZXdYID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9za2V3WCA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNrZXdZKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2tld1kgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NrZXdZID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdmlzaWJsZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl92aXNpYmxlID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl92aXNpYmxlID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5vbihTdGFnZS5BRERfVE9fU1RBR0UsICgpID0+IHRoaXMuc3RhZ2UucmVnaXN0ZXJFdmVudE1hcCh0aGlzKSk7XG4gICAgdGhpcy5vbihTdGFnZS5SRU1PVkVfVE9fU1RBR0UsICgpID0+IHRoaXMuc3RhZ2UudW5yZWdpc3RlckV2ZW50TWFwKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCB1cGRhdGVEaXNwbGF5KGNvbnRleHQ/OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkO1xuXG4gIHB1YmxpYyB1cGRhdGVUcmFuc2Zvcm1hdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9tYXRyaXgucmVzZXQoKTtcbiAgICBjb25zdCBvZmZzZXRYID0gdGhpcy54ICsgKHRoaXMuX2NlbnRlclggKiB0aGlzLl9zY2FsZVgpO1xuICAgIGNvbnN0IG9mZnNldFkgPSB0aGlzLnkgKyAodGhpcy5fY2VudGVyWSAqIHRoaXMuX3NjYWxlWSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtVHJhbnNsYXRlKG9mZnNldFgsIG9mZnNldFkpO1xuICAgIHRoaXMuX3RyYW5zZm9ybVJvdGF0ZSh0aGlzLl9yb3RhdGUpO1xuICAgIHRoaXMuX3RyYW5zZm9ybVRyYW5zbGF0ZSgtb2Zmc2V0WCwgLW9mZnNldFkpO1xuICAgIHRoaXMuX3RyYW5zZm9ybVRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtU2NhbGUodGhpcy5fc2NhbGVYLCB0aGlzLl9zY2FsZVkpO1xuICAgIHRoaXMuX3RyYW5zZm9ybVNrZXcodGhpcy5fc2tld1gsIHRoaXMuX3NrZXdZKTtcbiAgICB0aGlzLnN0YWdlLmNvbnRleHQudHJhbnNmb3JtKHRoaXMuX21hdHJpeC5hLCB0aGlzLl9tYXRyaXguYiwgdGhpcy5fbWF0cml4LmMsIHRoaXMuX21hdHJpeC5kLCB0aGlzLl9tYXRyaXgudHgsIHRoaXMuX21hdHJpeC50eSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhZ2UuY29udGV4dC5zYXZlKCk7XG4gICAgdGhpcy51cGRhdGVUcmFuc2Zvcm1hdGlvbigpO1xuICAgIHRoaXMudXBkYXRlRGlzcGxheSh0aGlzLnN0YWdlLmNvbnRleHQpO1xuICAgIHRoaXMuc3RhZ2UuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgLy8gVE9ETzogZXZlbnRjb250ZXh0IOyImOyglVxuICAgIC8vIHRoaXMuc3RhZ2UuZXZlbnRDb250ZXh0LmRyYXdJbWFnZSh0aGlzLnN0YWdlLnRlbXBDYW52YXMsIDAsIDApO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtVHJhbnNsYXRlKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApOiB2b2lkIHtcbiAgICB0aGlzLl9tYXRyaXgudHJhbnNsYXRlKHgsIHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtUm90YXRlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9tYXRyaXgucm90YXRlKHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybVNjYWxlKHg6IG51bWJlciA9IDEsIHk6IG51bWJlciA9IDEpOiB2b2lkIHtcbiAgICB0aGlzLl9tYXRyaXguc2NhbGUoeCwgeSk7XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1Ta2V3KHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApOiB2b2lkIHtcbiAgICB0aGlzLl9tYXRyaXguc2tldyh4LCB5KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoYW5nZWREaXNwbGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdGFnZSkgeyByZXR1cm47IH1cbiAgICBpZiAoIXRoaXMuc3RhZ2UuY2hhbmdlZCkge1xuICAgICAgdGhpcy5zdGFnZS5jaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vZ2VvbS9yZWN0YW5nbGUnO1xuXG5leHBvcnQgZW51bSBMaW5lQ2FwIHtcbiAgQlVUVCA9ICdidXR0JyxcbiAgUk9VTkQgPSAncm91bmQnLFxuICBTUVVBUkUgPSAnc3F1YXJlJyxcbn1cblxuZXhwb3J0IGVudW0gTGluZUpvaW4ge1xuICBST1VOVCA9ICdyb3VuZCcsXG4gIEJFVkVMID0gJ2JldmVsJyxcbiAgTUlURVIgPSAnbWl0ZXInLFxufVxuXG5lbnVtIERyYXdDb21tYW5kTmFtZSB7XG4gIFJFQ1QgPSAncmVjdCcsXG4gIEZJTExfUkVDVCA9ICdmaWxsUmVjdCcsXG4gIFNUUk9LRV9SRUNUID0gJ3N0cm9rZVJlY3QnLFxuICBDTEVBUl9SRUNUID0gJ2NsZWFyUmVjdCcsXG4gIEJFR0lOX1BBVEggPSAnYmVnaW5QYXRoJyxcbiAgQ0xPU0VfUEFUSCA9ICdjbG9zZVBhdGgnLFxuICBNT1ZFX1RPID0gJ21vdmVUbycsXG4gIExJTkVfVE8gPSAnbGluZVRvJyxcbiAgQVJDID0gJ2FyYycsXG4gIEFSQ19UTyA9ICdhcmNUbycsXG4gIFFVQURSQVRJQ19DVVJWRV9UTyA9ICdxdWFkcmF0aWNDdXJ2ZVRvJyxcbiAgQkVaSUVSX0NVUlZFX1RPID0gJ2JlemllckN1cnZlVG8nLFxuICBGSUxMID0gJ2ZpbGwnLFxuICBTVFJPS0UgPSAnc3Ryb2tlJyxcbn1cblxuaW50ZXJmYWNlIERyYXdDb21tYW5kIHtcbiAgbmFtZTogRHJhd0NvbW1hbmROYW1lO1xuICBhcmd1bWVudHM6IGFueTtcbiAgZmlsbFN0eWxlOiBzdHJpbmc7XG4gIHN0cm9rZVN0eWxlOiBzdHJpbmc7XG4gIGxpbmVXaWR0aDogbnVtYmVyO1xuICBsaW5lQ2FwOiBMaW5lQ2FwO1xuICBsaW5lSm9pbjogTGluZUpvaW47XG4gIG1pdGVyTGltaXQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhpY3Mge1xuICBwdWJsaWMgZmlsbFN0eWxlOiBzdHJpbmcgPSBudWxsO1xuICBwdWJsaWMgc3Ryb2tlU3R5bGU6IHN0cmluZyA9IG51bGw7XG4gIHB1YmxpYyBsaW5lV2lkdGg6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBsaW5lQ2FwOiBMaW5lQ2FwID0gTGluZUNhcC5CVVRUO1xuICBwdWJsaWMgbGluZUpvaW46IExpbmVKb2luID0gTGluZUpvaW4uTUlURVI7XG4gIHB1YmxpYyBtaXRlckxpbWl0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9jb21tYW5kczogU2V0PERyYXdDb21tYW5kPiA9IG5ldyBTZXQoKTtcbiAgcHJpdmF0ZSBfeDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfeTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfYm91bmRzOiBSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XG5cbiAgcHVibGljIGdldCBjb21tYW5kcygpOiBTZXQ8RHJhd0NvbW1hbmQ+IHsgcmV0dXJuIHRoaXMuX2NvbW1hbmRzOyB9XG4gIHB1YmxpYyBnZXQgY29tbWFuZExpc3QoKTogSXRlcmFibGVJdGVyYXRvcjxEcmF3Q29tbWFuZD4geyByZXR1cm4gdGhpcy5fY29tbWFuZHMudmFsdWVzKCk7IH1cbiAgcHVibGljIGdldCBib3VuZHMoKTogUmVjdGFuZ2xlIHsgcmV0dXJuIHRoaXMuX2JvdW5kczsgfVxuXG4gIHB1YmxpYyByZWN0KHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2JvdW5kcy5leHRlbmRzKG5ldyBSZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCkpO1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLlJFQ1QsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgZmlsbFJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYm91bmRzLmV4dGVuZHMobmV3IFJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSk7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuRklMTF9SRUNULCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIHN0cm9rZVJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGluZVdpZHRoOiBudW1iZXIgPSB0aGlzLmxpbmVXaWR0aCAqIDI7XG4gICAgdGhpcy5fYm91bmRzLmV4dGVuZHMobmV3IFJlY3RhbmdsZSh4LCB5LCB3aWR0aCArIGxpbmVXaWR0aCwgaGVpZ2h0ICsgbGluZVdpZHRoKSk7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuU1RST0tFX1JFQ1QsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJSZWN0KHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkNMRUFSX1JFQ1QsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgYmVnaW5QYXRoKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkJFR0lOX1BBVEgpO1xuICB9XG5cbiAgcHVibGljIGNsb3NlUGF0aCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5DTE9TRV9QQVRIKTtcbiAgfVxuXG4gIHB1YmxpYyBtb3ZlVG8oeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl94ID0geDtcbiAgICB0aGlzLl95ID0geTtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5NT1ZFX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGxpbmVUbyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2JvdW5kcy5leHRlbmRzUG9zaXRpb24odGhpcy5feCwgdGhpcy5feSk7XG4gICAgdGhpcy5fYm91bmRzLmV4dGVuZHNQb3NpdGlvbih4LCB5KTtcbiAgICB0aGlzLl94ID0geDtcbiAgICB0aGlzLl95ID0geTtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5MSU5FX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGFyYyh4OiBudW1iZXIsIHk6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIHN0YXJ0QW5nbGU6IG51bWJlciwgZW5kQW5nbGU6IG51bWJlciwgYW50aWNsb2Nrd2lzZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQVJDLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGFyY1RvKHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkyOiBudW1iZXIsIHJhZGl1czogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQVJDX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIHF1YWRyYXRpY0N1cnZlVG8oY3AxeDogbnVtYmVyLCBjcDF5OiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuUVVBRFJBVElDX0NVUlZFX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGJlemllckN1cnZlVG8oY3AxeDogbnVtYmVyLCBjcDF5OiBudW1iZXIsIGNwMng6IG51bWJlciwgY3AyeTogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkJFWklFUl9DVVJWRV9UTywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWxsKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkZJTEwpO1xuICB9XG5cbiAgcHVibGljIHN0cm9rZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5TVFJPS0UpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmRzLmNsZWFyKCk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRDb21tYW5kKG5hbWU6IERyYXdDb21tYW5kTmFtZSwgYXJncz86IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmRzLmFkZCh7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgYXJndW1lbnRzOiBhcmdzLFxuICAgICAgZmlsbFN0eWxlOiB0aGlzLmZpbGxTdHlsZSxcbiAgICAgIHN0cm9rZVN0eWxlOiB0aGlzLnN0cm9rZVN0eWxlLFxuICAgICAgbGluZVdpZHRoOiB0aGlzLmxpbmVXaWR0aCxcbiAgICAgIGxpbmVDYXA6IHRoaXMubGluZUNhcCxcbiAgICAgIGxpbmVKb2luOiB0aGlzLmxpbmVKb2luLFxuICAgICAgbWl0ZXJMaW1pdDogdGhpcy5taXRlckxpbWl0LFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRGlzcGxheSBmcm9tICcuL2Rpc3BsYXknO1xuaW1wb3J0IEdyYXBoaWNzIGZyb20gJy4vZ3JhcGhpY3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFwZSBleHRlbmRzIERpc3BsYXkge1xuICBwdWJsaWMgZ3JhcGhpY3M6IEdyYXBoaWNzID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihncmFwaGljczogR3JhcGhpY3MpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZ3JhcGhpY3MgPSBncmFwaGljcyB8fCBuZXcgR3JhcGhpY3MoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVEaXNwbGF5KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgY29tbWFuZCBvZiB0aGlzLmdyYXBoaWNzLmNvbW1hbmRMaXN0KSB7XG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbW1hbmQuZmlsbFN0eWxlO1xuICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbW1hbmQuc3Ryb2tlU3R5bGU7XG4gICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGNvbW1hbmQubGluZVdpZHRoO1xuICAgICAgY29udGV4dC5saW5lQ2FwID0gY29tbWFuZC5saW5lQ2FwO1xuICAgICAgY29udGV4dC5saW5lSm9pbiA9IGNvbW1hbmQubGluZUpvaW47XG4gICAgICBjb250ZXh0Lm1pdGVyTGltaXQgPSBjb21tYW5kLm1pdGVyTGltaXQ7XG4gICAgICBpZiAoY29tbWFuZC5hcmd1bWVudHMpIHtcbiAgICAgICAgKGNvbnRleHQgYXMgYW55KVtjb21tYW5kLm5hbWVdKC4uLmNvbW1hbmQuYXJndW1lbnRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChjb250ZXh0IGFzIGFueSlbY29tbWFuZC5uYW1lXSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tICcuLi9ldmVudC9ldmVudC1kaXNwYXRjaGVyJztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vZ2VvbS9yZWN0YW5nbGUnO1xuXG5leHBvcnQgZW51bSBTcHJpdGVTaGVldEV2ZW50IHtcbiAgTE9BRCA9ICdsb2FkJyxcbiAgRU5EID0gJ2VuZCcsXG59XG5cbmludGVyZmFjZSBGcmFtZSB7XG4gIFtpbmRleDogc3RyaW5nXTogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVTaGVldCBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBMT0FEOiBTcHJpdGVTaGVldEV2ZW50ID0gU3ByaXRlU2hlZXRFdmVudC5MT0FEO1xuXG4gIHByaXZhdGUgX2ltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfY2VsbFdpZHRoOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9jZWxsSGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9mcmFtZXM6IEZyYW1lW10gPSBudWxsO1xuICBwcml2YXRlIF9mcmFtZUluZGV4OiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSBfY3VycmVudEJvdW5kczogUmVjdGFuZ2xlID0gbnVsbDtcbiAgcHJpdmF0ZSBfbG9vcDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyBnZXQgaW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7IHJldHVybiB0aGlzLl9pbWFnZTsgfVxuICBwdWJsaWMgZ2V0IGNlbGxXaWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY2VsbFdpZHRoOyB9XG4gIHB1YmxpYyBnZXQgY2VsbEhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY2VsbEhlaWdodDsgfVxuICBwdWJsaWMgZ2V0IGN1cnJlbnRCb3VuZHMoKSB7IHJldHVybiB0aGlzLl9jdXJyZW50Qm91bmRzOyB9XG5cbiAgY29uc3RydWN0b3IoaW1nOiBIVE1MSW1hZ2VFbGVtZW50IHwgc3RyaW5nLCBjZWxsV2lkdGg6IG51bWJlciwgY2VsbEhlaWdodDogbnVtYmVyLCBmcmFtZXM6IEZyYW1lW10sIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoaW1nIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgdGhpcy5faW1hZ2UgPSBpbWc7XG4gICAgICB0aGlzLnRyaWdnZXIoU3ByaXRlU2hlZXQuTE9BRCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaW1nID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IGltZztcbiAgICAgIHRoaXMuX2ltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB0aGlzLnRyaWdnZXIoU3ByaXRlU2hlZXQuTE9BRCkpO1xuICAgIH1cblxuICAgIHRoaXMuX2NlbGxXaWR0aCA9IGNlbGxXaWR0aDtcbiAgICB0aGlzLl9jZWxsSGVpZ2h0ID0gY2VsbEhlaWdodDtcbiAgICB0aGlzLl9mcmFtZXMgPSBmcmFtZXM7XG4gICAgdGhpcy5fZnJhbWVJbmRleCA9IC0xO1xuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBuZXcgUmVjdGFuZ2xlKDAsIDAsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCk7XG4gICAgdGhpcy5fbG9vcCA9IGxvb3A7XG4gIH1cblxuICBwdWJsaWMgbmV4dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZnJhbWVJbmRleCArIDEgPD0gdGhpcy5fZnJhbWVzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuX2ZyYW1lSW5kZXgrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2xvb3ApIHtcbiAgICAgICAgdGhpcy5fZnJhbWVJbmRleCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyaWdnZXIoU3ByaXRlU2hlZXRFdmVudC5FTkQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl91cGRhdGVCb3VuZHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mcmFtZUluZGV4IC0gMSA+IDApIHtcbiAgICAgIHRoaXMuX2ZyYW1lSW5kZXgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2xvb3ApIHtcbiAgICAgICAgdGhpcy5fZnJhbWVJbmRleCA9IHRoaXMuX2ZyYW1lcy5sZW5ndGggLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKFNwcml0ZVNoZWV0RXZlbnQuRU5EKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlQm91bmRzKCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZnJhbWVJbmRleCA9IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQm91bmRzKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRGcmFtZSA9IHRoaXMuX2ZyYW1lc1t0aGlzLl9mcmFtZUluZGV4XTtcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzLnggPSBjdXJyZW50RnJhbWVbMF0gKiB0aGlzLl9jZWxsV2lkdGg7XG4gICAgdGhpcy5fY3VycmVudEJvdW5kcy55ID0gY3VycmVudEZyYW1lWzFdICogdGhpcy5fY2VsbEhlaWdodDtcbiAgfVxufVxuIiwiaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBTcHJpdGVTaGVldCwgeyBTcHJpdGVTaGVldEV2ZW50IH0gZnJvbSAnLi9zcHJpdGUtc2hlZXQnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuLi91dGlsL3RpY2tlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSBleHRlbmRzIERpc3BsYXkge1xuICBwcml2YXRlIF9zcHJpdGVTaGVldDogU3ByaXRlU2hlZXQgPSBudWxsO1xuICBwcml2YXRlIF9mcHM6IG51bWJlciA9IDEwO1xuICBwcml2YXRlIF90aWNrZXI6IFRpY2tlciA9IG51bGw7XG5cbiAgY29uc3RydWN0b3Ioc3ByaXRlU2hlZXQ6IFNwcml0ZVNoZWV0LCBmcHM6IG51bWJlciA9IDEwKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zcHJpdGVTaGVldCA9IHNwcml0ZVNoZWV0O1xuICAgIHRoaXMuX2ZwcyA9IGZwcztcbiAgICB0aGlzLl90aWNrZXIgPSBuZXcgVGlja2VyKGZwcyk7XG4gICAgdGhpcy5fdGlja2VyLm9uKFRpY2tlci5USUNLLCAoKSA9PiB0aGlzLl90aWNrZXJIYW5kbGVyKCkpO1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0Lm9uKFNwcml0ZVNoZWV0RXZlbnQuRU5ELCAoKSA9PiB0aGlzLnN0b3AoKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNwcml0ZVNoZWV0KCk6IFNwcml0ZVNoZWV0IHsgcmV0dXJuIHRoaXMuX3Nwcml0ZVNoZWV0OyB9XG4gIHB1YmxpYyBnZXQgZnBzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9mcHM7IH1cblxuICBwdWJsaWMgc2V0IHNwcml0ZVNoZWV0KHNwcml0ZVNoZWV0OiBTcHJpdGVTaGVldCkge1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0ID0gc3ByaXRlU2hlZXQ7XG4gICAgdGhpcy5fYm91bmRzLndpZHRoID0gc3ByaXRlU2hlZXQuY2VsbFdpZHRoO1xuICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSBzcHJpdGVTaGVldC5jZWxsSGVpZ2h0O1xuICB9XG5cbiAgcHVibGljIHNldCBmcHModmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2ZwcyA9IHZhbHVlO1xuICAgIHRoaXMuX3RpY2tlci5mcHMgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBwbGF5KCk6IHZvaWQge1xuICAgIHRoaXMuX3RpY2tlckhhbmRsZXIoKTtcbiAgICB0aGlzLl90aWNrZXIucnVuKCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc3ByaXRlU2hlZXQucmVzZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuX3RpY2tlci5zdG9wKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRGlzcGxheShjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLl9zcHJpdGVTaGVldC5jdXJyZW50Qm91bmRzO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgdGhpcy5fc3ByaXRlU2hlZXQuaW1hZ2UsXG4gICAgICBib3VuZHMubGVmdCxcbiAgICAgIGJvdW5kcy50b3AsXG4gICAgICBib3VuZHMud2lkdGgsXG4gICAgICBib3VuZHMuaGVpZ2h0LFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICBib3VuZHMud2lkdGgsXG4gICAgICBib3VuZHMuaGVpZ2h0LFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF90aWNrZXJIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0Lm5leHQoKTtcbiAgICB0aGlzLnN0YWdlLmNoYW5nZWQgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2UudXBkYXRlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBEaXNwbGF5Q29udGFpbmVyIGZyb20gJy4vZGlzcGxheS1jb250YWluZXInO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuLi9nZW9tL3JlY3RhbmdsZSc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4uL3V0aWwvdGlja2VyJztcbmltcG9ydCBEaXNwbGF5IGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgTW91c2VFdmVudCBmcm9tICcuLi9ldmVudC9tb3VzZS1ldmVudCc7XG5cbmVudW0gU3RhZ2VFdmVudFR5cGUge1xuICBBRERfVE9fU1RBR0UgPSAnYWRkVG9TdGFnZScsXG4gIFJFTU9WRV9UT19TVEFHRSA9ICdyZW1vdmVUb1N0YWdlJyxcbiAgRU5URVJfRlJBTUUgPSAnZW50ZXJGcmFtZScsXG59XG5cbmludGVyZmFjZSBFdmVudFRhcmdldE1hcCB7XG4gIFtwcm9wOiBzdHJpbmddOiBEaXNwbGF5W107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlIGV4dGVuZHMgRGlzcGxheUNvbnRhaW5lciB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBBRERfVE9fU1RBR0U6IFN0YWdlRXZlbnRUeXBlID0gU3RhZ2VFdmVudFR5cGUuQUREX1RPX1NUQUdFO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJFTU9WRV9UT19TVEFHRTogU3RhZ2VFdmVudFR5cGUgPSBTdGFnZUV2ZW50VHlwZS5SRU1PVkVfVE9fU1RBR0U7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRU5URVJfRlJBTUU6IFN0YWdlRXZlbnRUeXBlID0gU3RhZ2VFdmVudFR5cGUuRU5URVJfRlJBTUU7XG5cbiAgcHVibGljIGNoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IG51bGw7XG4gIHByaXZhdGUgX2V2ZW50Q2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IG51bGw7XG4gIHByaXZhdGUgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IG51bGw7XG4gIHByaXZhdGUgX2V2ZW50Q29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gbnVsbDtcbiAgcHJpdmF0ZSBfdGlja2VyOiBUaWNrZXIgPSBudWxsO1xuICBwcml2YXRlIF9ldmVudFRhcmdldE1hcDogRXZlbnRUYXJnZXRNYXAgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihjYW52YXNJZDogc3RyaW5nLCBmcHM6IG51bWJlcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLl9zdGFnZSA9IHRoaXM7XG4gICAgdGhpcy5fYm91bmRzID0gbmV3IFJlY3RhbmdsZSgwLCAwLCB0aGlzLl9jYW52YXMud2lkdGgsIHRoaXMuX2NhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuX2luaXRGUFMoZnBzKTtcbiAgICB0aGlzLl9pbml0RXZlbnRDYW52YXMoKTtcbiAgICB0aGlzLl9pbml0RXZlbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHsgcmV0dXJuIHRoaXMuX2NhbnZhczsgfVxuICBwdWJsaWMgZ2V0IGV2ZW50Q2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHsgcmV0dXJuIHRoaXMuX2V2ZW50Q2FudmFzOyB9XG4gIHB1YmxpYyBnZXQgY29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgeyByZXR1cm4gdGhpcy5fY29udGV4dDsgfVxuICBwdWJsaWMgZ2V0IGV2ZW50Q29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgeyByZXR1cm4gdGhpcy5fZXZlbnRDb250ZXh0OyB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGFuZ2VkKSB7XG4gICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgICB0aGlzLl9ldmVudENhbnZhcy53aWR0aCA9IHRoaXMuX2V2ZW50Q2FudmFzLndpZHRoO1xuICAgICAgc3VwZXIudXBkYXRlKCk7XG4gICAgICB0aGlzLmNoYW5nZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJFdmVudE1hcChkaXNwbGF5OiBEaXNwbGF5KTogdm9pZCB7XG4gICAgY29uc3QgY2hpbGRFdmVudE1hcCA9IGRpc3BsYXkuZXZlbnRNYXA7XG4gICAgZm9yIChjb25zdCB0eXBlIGluIGNoaWxkRXZlbnRNYXApIHtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0pIHtcbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdLnB1c2goZGlzcGxheSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVucmVnaXN0ZXJFdmVudE1hcChkaXNwbGF5OiBEaXNwbGF5KSB7XG4gICAgY29uc3QgY2hpbGRFdmVudE1hcCA9IGRpc3BsYXkuZXZlbnRNYXA7XG4gICAgZm9yIChjb25zdCB0eXBlIGluIGNoaWxkRXZlbnRNYXApIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0uaW5kZXhPZihkaXNwbGF5KTtcbiAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZQUyhmcHM6IG51bWJlcikge1xuICAgIGlmIChmcHMpIHtcbiAgICAgIHRoaXMuX3RpY2tlciA9IG5ldyBUaWNrZXIoZnBzKTtcbiAgICAgIHRoaXMuX3RpY2tlci5vbihUaWNrZXIuVElDSywgKGRlbHRhKSA9PiB7XG4gICAgICAgIHRoaXMudHJpZ2dlcihTdGFnZS5FTlRFUl9GUkFNRSwgZGVsdGEpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl90aWNrZXIucnVuKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEV2ZW50Q2FudmFzKCkge1xuICAgIHRoaXMuX2V2ZW50Q2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5fZXZlbnRDYW52YXMud2lkdGggPSB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgdGhpcy5fZXZlbnRDYW52YXMuaGVpZ2h0ID0gdGhpcy5fY2FudmFzLmhlaWdodDtcbiAgICB0aGlzLl9ldmVudENvbnRleHQgPSB0aGlzLl9ldmVudENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIC8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIHRoaXMuX2V2ZW50Q2FudmFzICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RXZlbnQoKSB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuX2NhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAvLyAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gICBpZiAoIXRoaXMuX2V2ZW50VGFyZ2V0TWFwW01vdXNlRXZlbnQuQ0xJQ0tdIHx8ICF0aGlzLl9ldmVudFRhcmdldE1hcFtNb3VzZUV2ZW50LkNMSUNLXS5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgLy8gICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAvLyAgIGNvbnN0IHkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgLy8gICBjb25zdCBjb2xvciA9IHRoaXMuX2V2ZW50Q29udGV4dC5nZXRJbWFnZURhdGEoeCwgeSwgMSwgMSk7XG4gICAgLy8gICBjb25zdCByID0gY29sb3IuZGF0YVswXS50b1N0cmluZygxNik7XG4gICAgLy8gICBjb25zdCBnID0gY29sb3IuZGF0YVsxXS50b1N0cmluZygxNik7XG4gICAgLy8gICBjb25zdCBiID0gY29sb3IuZGF0YVsyXS50b1N0cmluZygxNik7XG4gICAgLy8gICBjb25zdCBjb2xvcktleSA9ICcwJy5yZXBlYXQoMiAtIHIubGVuZ3RoKSArIHIgKyAnMCcucmVwZWF0KDIgLSBnLmxlbmd0aCkgKyBnICsgJzAnLnJlcGVhdCgyIC0gYi5sZW5ndGgpICsgYjtcbiAgICAvLyAgIGZvciAobGV0IGkgPSB0aGlzLl9ldmVudFRhcmdldE1hcFtNb3VzZUV2ZW50LkNMSUNLXS5sZW5ndGggLSAxLCBjb3VudCA9IDA7IGkgPj0gY291bnQ7IGkgLT0gMSkge1xuICAgIC8vICAgICBjb25zdCBpdGVtID0gdGhpcy5fZXZlbnRUYXJnZXRNYXBbTW91c2VFdmVudC5DTElDS11baV07XG4gICAgLy8gICAgIGlmIChjb2xvcktleSA9PT0gaXRlbS5jb2xvcktleSkge1xuICAgIC8vICAgICAgIC8vIFRPRE86dGFyZ2V0IC8gY3VycmVudFRhcmdldCDqtazrtoRcbiAgICAvLyAgICAgICBpdGVtLnRyaWdnZXIoTW91c2VFdmVudC5DTElDSywgbmV3IE1vdXNlRXZlbnQoTW91c2VFdmVudC5DTElDSywge30sIGl0ZW0sIGl0ZW0pKTtcbiAgICAvLyAgICAgICBicmVhaztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICB9XG59XG4iLCJcbmltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50JztcblxudHlwZSBFdmVudEhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50LCBkYXRhOiBhbnkpID0+IHZvaWQ7XG5cbmludGVyZmFjZSBFdmVudE1hcCB7XG4gIFtwcm9wOiBzdHJpbmddOiBFdmVudEhhbmRsZXJbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcbiAgcHJpdmF0ZSBfZXZlbnRNYXA6IEV2ZW50TWFwID0ge307XG5cbiAgcHVibGljIGdldCBldmVudE1hcCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE1hcDtcbiAgfVxuXG4gIHB1YmxpYyBvbih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50SGFuZGxlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZXZlbnRNYXBbdHlwZV0pIHtcbiAgICAgIHRoaXMuX2V2ZW50TWFwW3R5cGVdID0gW107XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50TWFwW3R5cGVdLnB1c2goaGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgb2ZmKHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRIYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgIGlmICh0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2V2ZW50TWFwW3R5cGVdLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIHRoaXMuX2V2ZW50TWFwW3R5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgICB0aGlzLl9ldmVudE1hcFt0eXBlXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRyaWdnZXIodHlwZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XG4gICAgaWYgKHRoaXMuX2V2ZW50TWFwW3R5cGVdKSB7XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fZXZlbnRNYXBbdHlwZV0pIHtcbiAgICAgICAgaXRlbS5jYWxsKHRoaXMsIGRhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudCB7XG4gIHByaXZhdGUgX3R5cGU6IHN0cmluZyA9IG51bGw7XG4gIHByaXZhdGUgX2RhdGE6IGFueSA9IG51bGw7XG5cbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRhdGEoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdHlwZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIGRhdGE/OiBhbnkpIHtcbiAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0IERpc3BsYXkgZnJvbSAnLi4vZGlzcGxheS9kaXNwbGF5JztcblxuZW51bSBNb3VzZUV2ZW50VHlwZSB7XG4gIENMSUNLID0gJ2NsaWNrJyxcbiAgTU9VU0VfT1ZFUiA9ICdtb3VzZU92ZXInLFxuICBNT1VTRV9PVVQgPSAnbW91c2VPdXQnLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VzZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQ0xJQ0s6IE1vdXNlRXZlbnRUeXBlID0gTW91c2VFdmVudFR5cGUuQ0xJQ0s7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTU9VU0VfT1ZFUjogTW91c2VFdmVudFR5cGUgPSBNb3VzZUV2ZW50VHlwZS5NT1VTRV9PVkVSO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE1PVVNFX09VVDogTW91c2VFdmVudFR5cGUgPSBNb3VzZUV2ZW50VHlwZS5NT1VTRV9PVVQ7XG5cbiAgcHJpdmF0ZSBfdGFyZ2V0OiBEaXNwbGF5ID0gbnVsbDtcbiAgcHJpdmF0ZSBfY3VycmVudFRhcmdldDogRGlzcGxheSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IodHlwZTogTW91c2VFdmVudFR5cGUsIGRhdGE6IGFueSwgdGFyZ2V0OiBEaXNwbGF5LCBjdXJyZW50VGFyZ2V0OiBEaXNwbGF5KSB7XG4gICAgc3VwZXIodHlwZSwgZGF0YSk7XG4gICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0O1xuICB9XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeCB7XG4gIHB1YmxpYyBhOiBudW1iZXIgPSAxO1xuICBwdWJsaWMgYjogbnVtYmVyID0gMDtcbiAgcHVibGljIGM6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBkOiBudW1iZXIgPSAxO1xuICBwdWJsaWMgdHg6IG51bWJlciA9IDA7XG4gIHB1YmxpYyB0eTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihhOiBudW1iZXIgPSAxLCBiOiBudW1iZXIgPSAwLCBjOiBudW1iZXIgPSAwLCBkOiBudW1iZXIgPSAxLCB0eDogbnVtYmVyID0gMCwgdHk6IG51bWJlciA9IDApIHtcbiAgICB0aGlzLnNldFRvKGEsIGIsIGMsIGQsIHR4LCB0eSk7XG4gIH1cblxuICBwdWJsaWMgc2V0VG8oYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlciwgZDogbnVtYmVyLCB0eDogbnVtYmVyLCB0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hID0gYTtcbiAgICB0aGlzLmIgPSBiO1xuICAgIHRoaXMuYyA9IGM7XG4gICAgdGhpcy5kID0gZDtcbiAgICB0aGlzLnR4ID0gdHg7XG4gICAgdGhpcy50eSA9IHR5O1xuICB9XG5cbiAgcHVibGljIHNldFRvTWF0cml4KG1hdHJpeDogTWF0cml4KTogdm9pZCB7XG4gICAgdGhpcy5hID0gbWF0cml4LmE7XG4gICAgdGhpcy5iID0gbWF0cml4LmI7XG4gICAgdGhpcy5jID0gbWF0cml4LmM7XG4gICAgdGhpcy5kID0gbWF0cml4LmQ7XG4gICAgdGhpcy50eCA9IG1hdHJpeC50eDtcbiAgICB0aGlzLnR5ID0gbWF0cml4LnR5O1xuICB9XG5cbiAgcHVibGljIGFkZChtYXRyaXg6IE1hdHJpeCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLnNldFRvKHRoaXMuYSArIG1hdHJpeC5hLCB0aGlzLmIgKyBtYXRyaXguYiwgdGhpcy5jICsgbWF0cml4LmMsIHRoaXMuZCArIG1hdHJpeC5kLCB0aGlzLnR4ICsgbWF0cml4LnR4LCB0aGlzLnR5ICsgbWF0cml4LnR5KTtcbiAgfVxuXG4gIHB1YmxpYyBzdWIobWF0cml4OiBNYXRyaXgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5zZXRUbyh0aGlzLmEgLSBtYXRyaXguYSwgdGhpcy5iIC0gbWF0cml4LmIsIHRoaXMuYyAtIG1hdHJpeC5jLCB0aGlzLmQgLSBtYXRyaXguZCwgdGhpcy50eCAtIG1hdHJpeC50eCwgdGhpcy50eSAtIG1hdHJpeC50eSk7XG4gIH1cblxuICBwdWJsaWMgbXVsdGkobWF0cml4OiBNYXRyaXgpOiB2b2lkIHtcbiAgICBsZXQgYTogbnVtYmVyO1xuICAgIGxldCBiOiBudW1iZXI7XG4gICAgbGV0IGM6IG51bWJlcjtcbiAgICBsZXQgZDogbnVtYmVyO1xuICAgIGxldCB0eDogbnVtYmVyO1xuICAgIGxldCB0eTogbnVtYmVyO1xuXG4gICAgaWYgKHR5cGVvZiBtYXRyaXggPT09ICdudW1iZXInKSB7XG4gICAgICBhID0gdGhpcy5hICogbWF0cml4O1xuICAgICAgYiA9IHRoaXMuYiAqIG1hdHJpeDtcbiAgICAgIGMgPSB0aGlzLmMgKiBtYXRyaXg7XG4gICAgICBkID0gdGhpcy5kICogbWF0cml4O1xuICAgICAgdHggPSB0aGlzLnR4ICogbWF0cml4O1xuICAgICAgdHkgPSB0aGlzLnR5ICogbWF0cml4O1xuICAgIH0gZWxzZSB7XG4gICAgICBhID0gKHRoaXMuYSAqIG1hdHJpeC5hKSArICh0aGlzLmMgKiBtYXRyaXguYik7XG4gICAgICBiID0gKHRoaXMuYiAqIG1hdHJpeC5hKSArICh0aGlzLmQgKiBtYXRyaXguYik7XG4gICAgICBjID0gKHRoaXMuYSAqIG1hdHJpeC5jKSArICh0aGlzLmMgKiBtYXRyaXguZCk7XG4gICAgICBkID0gKHRoaXMuYiAqIG1hdHJpeC5jKSArICh0aGlzLmQgKiBtYXRyaXguZCk7XG4gICAgICB0eCA9ICh0aGlzLmEgKiBtYXRyaXgudHgpICsgKHRoaXMuYyAqIG1hdHJpeC50eSkgKyB0aGlzLnR4O1xuICAgICAgdHkgPSAodGhpcy5iICogbWF0cml4LnR4KSArICh0aGlzLmQgKiBtYXRyaXgudHkpICsgdGhpcy50eTtcbiAgICB9XG4gICAgdGhpcy5zZXRUbyhhLCBiLCBjLCBkLCB0eCwgdHkpO1xuICB9XG5cbiAgcHVibGljIGludmVyc2UoKTogTWF0cml4IHtcbiAgICBjb25zdCB7IGEsIGIsIGMsIGQsIHR4LCB0eSB9ID0gdGhpcztcbiAgICBjb25zdCBuID0gYSAqIGQgLSBiICogYztcbiAgICByZXR1cm4gbmV3IE1hdHJpeChkIC8gbiwgLWIgLyBuLCAtYyAvIG4sIGEgLyBuLCAoYyAqIHRoaXMudHkgLSBkICogdHgpIC8gbiwgKGIgKiB0eCAtIGEgKiB0aGlzLnR5KSAvIG4pO1xuICB9XG5cbiAgcHVibGljIGNsb25lKCk6IE1hdHJpeCB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXgodGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgdGhpcy5kLCB0aGlzLnR4LCB0aGlzLnR5KTtcbiAgfVxuXG4gIHB1YmxpYyBzY2FsZSh4OiBudW1iZXIgPSAxLCB5OiBudW1iZXIgPSAxKTogdm9pZCB7XG4gICAgdGhpcy5tdWx0aShuZXcgTWF0cml4KHgsIDAsIDAsIHksIDAsIDApKTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFuc2xhdGUoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIHRoaXMubXVsdGkobmV3IE1hdHJpeCgxLCAwLCAwLCAxLCB4LCB5KSk7XG4gIH1cblxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpKG5ldyBNYXRyaXgoTWF0aC5jb3MoYW5nbGUpLCBNYXRoLnNpbihhbmdsZSksIC1NYXRoLnNpbihhbmdsZSksIE1hdGguY29zKGFuZ2xlKSkpO1xuICB9XG5cbiAgcHVibGljIHNrZXcoeCA9IDAsIHkgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5tdWx0aShuZXcgTWF0cml4KDEsIE1hdGgudGFuKHkpLCBNYXRoLnRhbih4KSwgMSwgMCwgMCkpO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VG8oMSwgMCwgMCwgMSwgMCwgMCk7XG4gIH1cblxuICBwdWJsaWMgZXF1YWxzKG1hdHJpeDogTWF0cml4KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYSA9PT0gbWF0cml4LmEgJiYgdGhpcy5iID09PSBtYXRyaXguYiAmJiB0aGlzLmMgPT09IG1hdHJpeC5jICYmIHRoaXMuZCA9PT0gbWF0cml4LmQgJiYgdGhpcy50eCA9PT0gbWF0cml4LnR4ICYmIHRoaXMudHkgPT09IG1hdHJpeC50eTtcbiAgfVxufVxuIiwiaW1wb3J0IE1hdHJpeCBmcm9tICcuL21hdHJpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50IHtcbiAgcHVibGljIHg6IG51bWJlciA9IDA7XG4gIHB1YmxpYyB5OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICBwdWJsaWMgZGlzdGFuY2UocG9pbnQ6IFBvaW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50LnggLSB0aGlzLngsIDIpICsgTWF0aC5wb3cocG9pbnQueSAtIHRoaXMueSwgMikpO1xuICB9XG5cbiAgcHVibGljIHJvdGF0ZShyYWRpYW46IG51bWJlcik6IFBvaW50IHtcbiAgICBjb25zdCBtYXRyaXg6IE1hdHJpeCA9IG5ldyBNYXRyaXgoTWF0aC5jb3MocmFkaWFuKSwgTWF0aC5zaW4ocmFkaWFuKSwgLU1hdGguc2luKHJhZGlhbiksIE1hdGguY29zKHJhZGlhbikpO1xuICAgIGNvbnN0IHB4OiBudW1iZXIgPSAobWF0cml4LmEgKiB0aGlzLngpICsgKG1hdHJpeC5jICogdGhpcy55KTtcbiAgICBjb25zdCBweTogbnVtYmVyID0gKG1hdHJpeC5iICogdGhpcy54KSArIChtYXRyaXguZCAqIHRoaXMueSk7XG4gICAgcmV0dXJuIG5ldyBQb2ludChweCwgcHkpO1xuICB9XG5cbiAgcHVibGljIHNjYWxlKHNjYWxlWDogbnVtYmVyLCBzY2FsZVk6IG51bWJlcik6IFBvaW50IHtcbiAgICBjb25zdCBtYXRyaXg6IE1hdHJpeCA9IG5ldyBNYXRyaXgoc2NhbGVYLCAwLCAwLCBzY2FsZVkpO1xuICAgIGNvbnN0IHB4OiBudW1iZXIgPSAobWF0cml4LmEgKiB0aGlzLngpICsgKG1hdHJpeC5jICogdGhpcy55KTtcbiAgICBjb25zdCBweTogbnVtYmVyID0gKG1hdHJpeC5iICogdGhpcy54KSArIChtYXRyaXguZCAqIHRoaXMueSk7XG4gICAgcmV0dXJuIG5ldyBQb2ludChweCwgcHkpO1xuICB9XG5cbiAgcHVibGljIHRyYW5zbGF0ZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IFBvaW50IHtcbiAgICBjb25zdCBtYXRyaXg6IE1hdHJpeCA9IG5ldyBNYXRyaXgoMSwgMCwgMCwgMSwgeCwgeSk7XG4gICAgY29uc3QgcHg6IG51bWJlciA9IChtYXRyaXguYSAqIHRoaXMueCkgKyAobWF0cml4LmMgKiB0aGlzLnkpICsgbWF0cml4LnR4O1xuICAgIGNvbnN0IHB5OiBudW1iZXIgPSAobWF0cml4LmIgKiB0aGlzLngpICsgKG1hdHJpeC5kICogdGhpcy55KSArIG1hdHJpeC50eTtcbiAgICByZXR1cm4gbmV3IFBvaW50KHB4LCBweSk7XG4gIH1cblxuICBwdWJsaWMgc2tldyhza2V3WDogbnVtYmVyLCBza2V3WTogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IG1hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeCgxLCBNYXRoLnRhbihza2V3WCksIE1hdGgudGFuKHNrZXdZKSwgMSk7XG4gICAgY29uc3QgcHg6IG51bWJlciA9IChtYXRyaXguYSAqIHRoaXMueCkgKyAobWF0cml4LmMgKiB0aGlzLnkpO1xuICAgIGNvbnN0IHB5OiBudW1iZXIgPSAobWF0cml4LmIgKiB0aGlzLngpICsgKG1hdHJpeC5kICogdGhpcy55KTtcbiAgICByZXR1cm4gbmV3IFBvaW50KHB4LCBweSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb2ludCBmcm9tICcuL3BvaW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlIHtcblxuICBwcml2YXRlIF93aWR0aDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9sZWZ0VG9wOiBQb2ludCA9IG51bGw7XG4gIHByaXZhdGUgX3JpZ2h0VG9wOiBQb2ludCA9IG51bGw7XG4gIHByaXZhdGUgX2xlZnRCb3R0b206IFBvaW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfcmlnaHRCb3R0b206IFBvaW50ID0gbnVsbDtcblxuICBwdWJsaWMgZ2V0IHgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xlZnRUb3AueDsgfVxuICBwdWJsaWMgZ2V0IHkoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xlZnRUb3AueTsgfVxuICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl93aWR0aDsgfVxuICBwdWJsaWMgZ2V0IGhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faGVpZ2h0OyB9XG4gIHB1YmxpYyBnZXQgbGVmdCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdFRvcC54OyB9XG4gIHB1YmxpYyBnZXQgcmlnaHQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3JpZ2h0VG9wLng7IH1cbiAgcHVibGljIGdldCB0b3AoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xlZnRUb3AueTsgfVxuICBwdWJsaWMgZ2V0IGJvdHRvbSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdEJvdHRvbS55OyB9XG4gIHB1YmxpYyBnZXQgbGVmdFRvcCgpOiBQb2ludCB7IHJldHVybiB0aGlzLl9sZWZ0VG9wOyB9XG4gIHB1YmxpYyBnZXQgcmlnaHRUb3AoKTogUG9pbnQgeyByZXR1cm4gdGhpcy5fcmlnaHRUb3A7IH1cbiAgcHVibGljIGdldCBsZWZ0Qm90dG9tKCk6IFBvaW50IHsgcmV0dXJuIHRoaXMuX2xlZnRCb3R0b207IH1cbiAgcHVibGljIGdldCByaWdodEJvdHRvbSgpOiBQb2ludCB7IHJldHVybiB0aGlzLl9yaWdodEJvdHRvbTsgfVxuXG4gIHB1YmxpYyBzZXQgeCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbGVmdFRvcC54ID0gdmFsdWU7XG4gICAgdGhpcy5fbGVmdEJvdHRvbS54ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlUmlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgeSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbGVmdFRvcC55ID0gdmFsdWU7XG4gICAgdGhpcy5fbGVmdEJvdHRvbS55ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlQm90dG9tKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZVJpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGhlaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlQm90dG9tKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGxlZnQodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMubGVmdFRvcC54ID0gdmFsdWU7XG4gICAgdGhpcy5sZWZ0Qm90dG9tLnggPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICB9XG5cbiAgcHVibGljIHNldCByaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5yaWdodFRvcC54ID0gdmFsdWU7XG4gICAgdGhpcy5yaWdodEJvdHRvbS54ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlV2lkdGgoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdG9wKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmxlZnRUb3AueSA9IHZhbHVlO1xuICAgIHRoaXMucmlnaHRUb3AueSA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCBib3R0b20odmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMubGVmdEJvdHRvbS55ID0gdmFsdWU7XG4gICAgdGhpcy5yaWdodEJvdHRvbS55ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGxlZnRUb3AocG9pbnQ6IFBvaW50KSB7XG4gICAgdGhpcy5fbGVmdFRvcCA9IHBvaW50O1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHJpZ2h0VG9wKHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMuX3JpZ2h0VG9wID0gcG9pbnQ7XG4gICAgdGhpcy5fdXBkYXRlV2lkdGgoKTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGVmdEJvdHRvbShwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLl9sZWZ0Qm90dG9tID0gcG9pbnQ7XG4gICAgdGhpcy5fdXBkYXRlV2lkdGgoKTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcmlnaHRCb3R0b20ocG9pbnQ6IFBvaW50KSB7XG4gICAgdGhpcy5fcmlnaHRCb3R0b20gPSBwb2ludDtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCwgd2lkdGg6IG51bWJlciA9IDAsIGhlaWdodDogbnVtYmVyID0gMCkge1xuICAgIHRoaXMuX2xlZnRUb3AgPSBuZXcgUG9pbnQoKTtcbiAgICB0aGlzLl9yaWdodFRvcCA9IG5ldyBQb2ludCgpO1xuICAgIHRoaXMuX2xlZnRCb3R0b20gPSBuZXcgUG9pbnQoKTtcbiAgICB0aGlzLl9yaWdodEJvdHRvbSA9IG5ldyBQb2ludCgpO1xuICAgIHRoaXMuc2V0VG8oeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBwdWJsaWMgY29udGFpbnMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4geCA+PSB0aGlzLmxlZnQgJiYgeCA8PSB0aGlzLnJpZ2h0ICYmIHkgPD0gdGhpcy5ib3R0b20gJiYgeSA+PSB0aGlzLnRvcDtcbiAgfVxuXG4gIHB1YmxpYyBjb250YWluc1JlY3QocmVjdGFuZ2xlOiBSZWN0YW5nbGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmVjdGFuZ2xlLmxlZnQgPj0gdGhpcy5sZWZ0ICYmIHJlY3RhbmdsZS5yaWdodCA8PSB0aGlzLnJpZ2h0ICYmIHJlY3RhbmdsZS50b3AgPj0gdGhpcy50b3AgJiYgcmVjdGFuZ2xlLmJvdHRvbSA8PSB0aGlzLmJvdHRvbTtcbiAgfVxuXG4gIHB1YmxpYyBpbnRlcnNlY3RzKHJlY3RhbmdsZTogUmVjdGFuZ2xlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbnMocmVjdGFuZ2xlLmxlZnQgKyAxLCByZWN0YW5nbGUudG9wICsgMSkgfHwgdGhpcy5jb250YWlucyhyZWN0YW5nbGUubGVmdCArIDEsIHJlY3RhbmdsZS5ib3R0b20gLSAxKSB8fCB0aGlzLmNvbnRhaW5zKHJlY3RhbmdsZS5yaWdodCAtIDEsIHJlY3RhbmdsZS50b3AgKyAxKSB8fCB0aGlzLmNvbnRhaW5zKHJlY3RhbmdsZS5yaWdodCAtIDEsIHJlY3RhbmdsZS5ib3R0b20gLSAxKTtcbiAgfVxuXG4gIHB1YmxpYyBpbnRlcnNlY3Rpb24ocmVjdGFuZ2xlOiBSZWN0YW5nbGUpOiBSZWN0YW5nbGUge1xuICAgIGxldCByZXN1bHQ6IFJlY3RhbmdsZSA9IG51bGw7XG4gICAgaWYgKHRoaXMuaW50ZXJzZWN0cyhyZWN0YW5nbGUpKSB7XG4gICAgICByZXN1bHQgPSBuZXcgUmVjdGFuZ2xlKCk7XG4gICAgICByZXN1bHQubGVmdCA9IE1hdGgubWF4KHJlY3RhbmdsZS5sZWZ0LCB0aGlzLmxlZnQpO1xuICAgICAgcmVzdWx0LnJpZ2h0ID0gTWF0aC5taW4ocmVjdGFuZ2xlLnJpZ2h0LCB0aGlzLnJpZ2h0KTtcbiAgICAgIHJlc3VsdC50b3AgPSBNYXRoLm1heChyZWN0YW5nbGUudG9wLCB0aGlzLnRvcCk7XG4gICAgICByZXN1bHQuYm90dG9tID0gTWF0aC5taW4ocmVjdGFuZ2xlLmJvdHRvbSwgdGhpcy5ib3R0b20pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGV4dGVuZHMocmVjdGFuZ2xlOiBSZWN0YW5nbGUpOiB2b2lkIHtcbiAgICBjb25zdCBsZWZ0OiBudW1iZXIgPSBNYXRoLm1pbih0aGlzLmxlZnQsIHJlY3RhbmdsZS5sZWZ0KTtcbiAgICBjb25zdCByaWdodDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5yaWdodCwgcmVjdGFuZ2xlLnJpZ2h0KTtcbiAgICBjb25zdCB0b3A6IG51bWJlciA9IE1hdGgubWluKHRoaXMudG9wLCByZWN0YW5nbGUudG9wKTtcbiAgICBjb25zdCBib3R0b206IG51bWJlciA9IE1hdGgubWF4KHRoaXMuYm90dG9tLCByZWN0YW5nbGUuYm90dG9tKTtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRzVmFsdWUoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGVmdDogbnVtYmVyID0gTWF0aC5taW4odGhpcy5sZWZ0LCB4KTtcbiAgICBjb25zdCByaWdodDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5yaWdodCwgeCArIHdpZHRoKTtcbiAgICBjb25zdCB0b3A6IG51bWJlciA9IE1hdGgubWluKHRoaXMudG9wLCB5KTtcbiAgICBjb25zdCBib3R0b206IG51bWJlciA9IE1hdGgubWF4KHRoaXMuYm90dG9tLCB5ICsgaGVpZ2h0KTtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRzUG9pbnQocG9pbnQ6IFBvaW50KTogdm9pZCB7XG4gICAgdGhpcy5leHRlbmRzUG9zaXRpb24ocG9pbnQueCwgcG9pbnQueSk7XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kc1Bvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGVmdCA+PSB4KSB7XG4gICAgICB0aGlzLmxlZnQgPSB4O1xuICAgIH0gZWxzZSBpZiAodGhpcy5yaWdodCA8PSB4KSB7XG4gICAgICB0aGlzLnJpZ2h0ID0geDtcbiAgICB9XG4gICAgaWYgKHRoaXMudG9wID49IHkpIHtcbiAgICAgIHRoaXMudG9wID0geTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm90dG9tIDw9IHkpIHtcbiAgICAgIHRoaXMuYm90dG9tID0geTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0VG8oeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBjbG9uZSgpOiBSZWN0YW5nbGUge1xuICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHRoaXMubGVmdCwgdGhpcy50b3AsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFRvKDAsIDAsIDAsIDApO1xuICB9XG5cbiAgcHVibGljIGVxdWFscyhyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxlZnQgPT09IHJlY3RhbmdsZS5sZWZ0ICYmIHRoaXMudG9wID09PSByZWN0YW5nbGUudG9wICYmIHRoaXMucmlnaHQgPT09IHJlY3RhbmdsZS5yaWdodCAmJiB0aGlzLmJvdHRvbSA9PT0gcmVjdGFuZ2xlLmJvdHRvbSAmJiB0aGlzLndpZHRoID09PSByZWN0YW5nbGUud2lkdGggJiYgdGhpcy5oZWlnaHQgPT09IHJlY3RhbmdsZS5oZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVXaWR0aCgpOiB2b2lkIHtcbiAgICB0aGlzLl93aWR0aCA9IHRoaXMuX3JpZ2h0VG9wLnggLSB0aGlzLl9sZWZ0VG9wLng7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVIZWlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5faGVpZ2h0ID0gdGhpcy5fbGVmdEJvdHRvbS55IC0gdGhpcy5fbGVmdFRvcC55O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlUmlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmlnaHRCb3R0b20ueCA9IHRoaXMuX3JpZ2h0VG9wLnggPSB0aGlzLl9sZWZ0VG9wLnggKyB0aGlzLl93aWR0aDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUJvdHRvbSgpOiB2b2lkIHtcbiAgICB0aGlzLl9sZWZ0Qm90dG9tLnkgPSB0aGlzLl9yaWdodEJvdHRvbS55ID0gdGhpcy5fbGVmdFRvcC55ICsgdGhpcy5faGVpZ2h0O1xuICB9XG59XG4iLCJcbmltcG9ydCBTdGFnZSBmcm9tICcuL2Rpc3BsYXkvc3RhZ2UnO1xuaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9kaXNwbGF5L2Rpc3BsYXknO1xuaW1wb3J0IERpc3BsYXlDb250YWluZXIgZnJvbSAnLi9kaXNwbGF5L2Rpc3BsYXktY29udGFpbmVyJztcbmltcG9ydCBHcmFwaGljcyBmcm9tICcuL2Rpc3BsYXkvZ3JhcGhpY3MnO1xuaW1wb3J0IFNoYXBlIGZyb20gJy4vZGlzcGxheS9zaGFwZSc7XG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vZGlzcGxheS9zcHJpdGUnO1xuaW1wb3J0IFNwcml0ZVNoZWV0IGZyb20gJy4vZGlzcGxheS9zcHJpdGUtc2hlZXQnO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tICcuL2V2ZW50L2V2ZW50LWRpc3BhdGNoZXInO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQvZXZlbnQnO1xuaW1wb3J0IE1vdXNlRXZlbnQgZnJvbSAnLi9ldmVudC9tb3VzZS1ldmVudCc7XG5pbXBvcnQgTWF0cml4IGZyb20gJy4vZ2VvbS9tYXRyaXgnO1xuaW1wb3J0IFBvaW50IGZyb20gJy4vZ2VvbS9wb2ludCc7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4vZ2VvbS9yZWN0YW5nbGUnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuL3V0aWwvdGlja2VyJztcblxuY29uc3Qgc3RnID0ge1xuICBTdGFnZSxcbiAgRGlzcGxheSxcbiAgRGlzcGxheUNvbnRhaW5lcixcbiAgR3JhcGhpY3MsXG4gIFNoYXBlLFxuICBTcHJpdGUsXG4gIFNwcml0ZVNoZWV0LFxuICBFdmVudERpc3BhdGNoZXIsXG4gIEV2ZW50LFxuICBNb3VzZUV2ZW50LFxuICBNYXRyaXgsXG4gIFBvaW50LFxuICBSZWN0YW5nbGUsXG4gIFRpY2tlcixcbn07XG5cbih3aW5kb3cgYXMgYW55KS5zdGcgPSBzdGc7XG5cbmV4cG9ydCBkZWZhdWx0IHN0ZztcbiIsImltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGlzcGF0Y2hlcic7XG5cbmVudW0gVGlja2VyU3RhdGUge1xuICBSRUFEWSA9ICdyZWFkeScsXG4gIFJVTk5JTkcgPSAncnVubmluZycsXG59XG5cbmVudW0gVGlja2VyRXZlbnQge1xuICBUSUNLID0gJ3RpY2snLFxufVxuXG5jb25zdCBfb25lU2VjOiBudW1iZXIgPSAxMDAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWNrZXIgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVElDSzogVGlja2VyRXZlbnQgPSBUaWNrZXJFdmVudC5USUNLO1xuXG4gIHByaXZhdGUgX2ZwczogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfc3RhdGU6IFRpY2tlclN0YXRlID0gVGlja2VyU3RhdGUuUkVBRFk7XG4gIHByaXZhdGUgX3ByZXZUaW1lOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9pbnRlcm5hbFRpbWU6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGdldCBmcHMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2ZwczsgfVxuXG4gIHB1YmxpYyBzZXQgZnBzKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9mcHMgPSBNYXRoLm1heCh2YWx1ZSwgMSk7XG4gICAgLy8gVE9ETzog66Gc7KeBIO2ZleyduFxuICAgIGlmICh2YWx1ZSA+IDAgJiYgdmFsdWUgPCAxKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbFRpbWUgPSAoX29uZVNlYyAqIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW50ZXJuYWxUaW1lID0gKF9vbmVTZWMgLyB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZnBzID0gNDApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZnBzID0gZnBzO1xuICAgIHRoaXMuX3N0YXRlID0gVGlja2VyU3RhdGUuUkVBRFk7XG4gIH1cblxuICBwdWJsaWMgcnVuKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXRlID0gVGlja2VyU3RhdGUuUlVOTklORztcbiAgICB0aGlzLl9wcmV2VGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fcnVuKCkpO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGUgPSBUaWNrZXJTdGF0ZS5SRUFEWTtcbiAgfVxuXG4gIHByaXZhdGUgX3J1bigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IFRpY2tlclN0YXRlLlJFQURZKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IG5vdyA9ICtuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRlbHRhID0gbm93IC0gdGhpcy5fcHJldlRpbWU7XG4gICAgaWYgKGRlbHRhID49IHRoaXMuX2ludGVybmFsVGltZSkge1xuICAgICAgdGhpcy50cmlnZ2VyKFRpY2tlci5USUNLLCB7IGRlbHRhOiBkZWx0YSB9KTtcbiAgICAgIHRoaXMuX3ByZXZUaW1lID0gK25ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSBUaWNrZXJTdGF0ZS5SVU5OSU5HKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX3J1bigpKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=