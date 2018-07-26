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
        child.colorKey = this.stage.createColorKey();
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
        this.stage.returnColorKey(child.colorKey);
        child.colorKey = null;
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
        _this._colorKey = null;
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
    Object.defineProperty(Display.prototype, "colorKey", {
        get: function () { return this._colorKey; },
        set: function (value) {
            this._colorKey = value;
        },
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
        this.stage.tempContext.transform(this._matrix.a, this._matrix.b, this._matrix.c, this._matrix.d, this._matrix.tx, this._matrix.ty);
    };
    Display.prototype.update = function () {
        this.stage.context.save();
        this.stage.tempContext.save();
        this.updateTransformation();
        this.updateDisplay(this.stage.context);
        this.updateDisplay(this.stage.tempContext);
        this.stage.context.restore();
        this.stage.tempContext.restore();
        this.stage.tempContext.globalCompositeOperation = 'source-in';
        this.stage.tempContext.fillStyle = '#' + this.colorKey;
        this.stage.tempContext.fillRect(0, 0, this.stage.tempCanvas.width, this.stage.tempCanvas.height);
        this.stage.eventContext.drawImage(this.stage.tempCanvas, 0, 0);
        this.stage.tempCanvas.width = this.stage.tempCanvas.width;
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
var mouse_event_1 = __importDefault(__webpack_require__(/*! ../event/mouse-event */ "./src/event/mouse-event.ts"));
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
        _this._tempCanvas = null;
        _this._context = null;
        _this._eventContext = null;
        _this._tempContext = null;
        _this._returnedColorKey = [];
        _this._ticker = null;
        _this._eventTargetMap = {};
        _this._startColor = 0;
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
    Object.defineProperty(Stage.prototype, "tempCanvas", {
        get: function () { return this._tempCanvas; },
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
    Object.defineProperty(Stage.prototype, "tempContext", {
        get: function () { return this._tempContext; },
        enumerable: true,
        configurable: true
    });
    Stage.prototype.createColorKey = function () {
        if (this._returnedColorKey.length) {
            return this._returnedColorKey.shift();
        }
        var value = Number(this._startColor += 10).toString(16);
        value = '0'.repeat(6 - value.length) + value;
        return value;
    };
    Stage.prototype.returnColorKey = function (value) {
        this._returnedColorKey.push(value);
    };
    Stage.prototype.update = function () {
        if (this.changed) {
            this._canvas.width = this._canvas.width;
            this._eventCanvas.width = this._eventCanvas.width;
            this._tempCanvas.width = this._tempCanvas.width;
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
        this._tempCanvas = document.createElement('canvas');
        this._tempCanvas.width = this._canvas.width;
        this._tempCanvas.height = this._canvas.height;
        this._tempContext = this._tempCanvas.getContext('2d');
    };
    Stage.prototype._initEvent = function () {
        var _this = this;
        var rect = this._canvas.getBoundingClientRect();
        this._canvas.addEventListener('click', function (event) {
            event.preventDefault();
            if (!_this._eventTargetMap[mouse_event_1.default.CLICK] || !_this._eventTargetMap[mouse_event_1.default.CLICK].length) {
                return;
            }
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            var color = _this._eventContext.getImageData(x, y, 1, 1);
            var r = color.data[0].toString(16);
            var g = color.data[1].toString(16);
            var b = color.data[2].toString(16);
            var colorKey = '0'.repeat(2 - r.length) + r + '0'.repeat(2 - g.length) + g + '0'.repeat(2 - b.length) + b;
            for (var i = _this._eventTargetMap[mouse_event_1.default.CLICK].length - 1, count = 0; i >= count; i -= 1) {
                var item = _this._eventTargetMap[mouse_event_1.default.CLICK][i];
                if (colorKey === item.colorKey) {
                    // TODO:target / currentTarget 구분
                    item.trigger(mouse_event_1.default.CLICK, new mouse_event_1.default(mouse_event_1.default.CLICK, {}, item, item));
                    break;
                }
            }
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS1jb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9ncmFwaGljcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zaGFwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zcHJpdGUtc2hlZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvc3ByaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9kaXNwbGF5L3N0YWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC1kaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQvbW91c2UtZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlb20vbWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3BvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3JlY3RhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvdGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNB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QyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFTSxzQkFBSyxHQUFaO1FBQ0UsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSxzQkFBSyxHQUFaLFVBQWEsQ0FBYSxFQUFFLENBQWE7UUFBNUIseUJBQWE7UUFBRSx5QkFBYTtRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sMEJBQVMsR0FBaEIsVUFBaUIsQ0FBYSxFQUFFLENBQWE7UUFBNUIseUJBQWE7UUFBRSx5QkFBYTtRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sdUJBQU0sR0FBYixVQUFjLEtBQWE7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFTSxxQkFBSSxHQUFYLFVBQVksQ0FBSyxFQUFFLENBQUs7UUFBWix5QkFBSztRQUFFLHlCQUFLO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFN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QUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRU8scUJBQUksR0FBWjtRQUFBLGlCQVlDO1FBWEMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDbEQsSUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQU0sS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ25DLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7U0FDOUI7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUN2QyxNQUFNLENBQUMscUJBQXFCLENBQUMsY0FBTSxZQUFJLENBQUMsSUFBSSxFQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUM7U0FDakQ7SUFDSCxDQUFDO0lBL0NzQixXQUFJLEdBQWdCLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFnRDlELGFBQUM7Q0FBQSxDQWxEbUMsMEJBQWUsR0FrRGxEO2tCQWxEb0IsTUFBTSIsImZpbGUiOiJzdGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3N0YWdlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzcGxheUNvbnRhaW5lciBleHRlbmRzIERpc3BsYXkge1xuXG4gIHByaXZhdGUgX2NoaWxkcmVuOiBEaXNwbGF5W10gPSBbXTtcblxuICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IERpc3BsYXlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDaGlsZChjaGlsZDogRGlzcGxheSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2NoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIGNoaWxkLnN0YWdlID0gdGhpcy5zdGFnZTtcbiAgICBjaGlsZC5jb2xvcktleSA9IHRoaXMuc3RhZ2UuY3JlYXRlQ29sb3JLZXkoKTtcbiAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgIHRoaXMuc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgY2hpbGQudHJpZ2dlcihTdGFnZS5BRERfVE9fU1RBR0UpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUNoaWxkQWxsKCk6IHZvaWQge1xuICAgIHdoaWxlICh0aGlzLl9jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5fY2hpbGRyZW5bdGhpcy5fY2hpbGRyZW4ubGVuZ3RoIC0gMV0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVDaGlsZChjaGlsZDogRGlzcGxheSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkgeyByZXR1cm47IH1cbiAgICBjaGlsZC50cmlnZ2VyKFN0YWdlLlJFTU9WRV9UT19TVEFHRSk7XG4gICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKCBpbmRleCwgMSApO1xuICAgIHRoaXMuc3RhZ2UucmV0dXJuQ29sb3JLZXkoY2hpbGQuY29sb3JLZXkpO1xuICAgIGNoaWxkLmNvbG9yS2V5ID0gbnVsbDtcbiAgICBjaGlsZC5zdGFnZSA9IG51bGw7XG4gICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBEaXNwbGF5Q29udGFpbmVyKSB7XG4gICAgICAoY2hpbGQgYXMgRGlzcGxheUNvbnRhaW5lcikucmVtb3ZlQ2hpbGRBbGwoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQ2hpbGRBdChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmdldENoaWxkQXQoaW5kZXgpKTtcbiAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2hpbGRBdChpbmRleDogbnVtYmVyKTogRGlzcGxheSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuW2luZGV4XTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVEaXNwbGF5KCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdGhpcy5fY2hpbGRyZW4pIHtcbiAgICAgIGlmIChjaGlsZC52aXNpYmxlKSB7XG4gICAgICAgIGNoaWxkLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tICcuLi9ldmVudC9ldmVudC1kaXNwYXRjaGVyJztcbmltcG9ydCBNYXRyaXggZnJvbSAnLi4vZ2VvbS9tYXRyaXgnO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuLi9nZW9tL3JlY3RhbmdsZSc7XG5pbXBvcnQgRGlzcGxheUNvbnRhaW5lciBmcm9tICcuL2Rpc3BsYXktY29udGFpbmVyJztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3N0YWdlJztcblxuLy8gVE9ETzog7YyM6rS07J6QIOq1rO2YhFxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgRGlzcGxheSBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgcHJvdGVjdGVkIF9zdGFnZTogU3RhZ2UgPSBudWxsO1xuICBwcm90ZWN0ZWQgX3BhcmVudDogRGlzcGxheUNvbnRhaW5lciA9IG51bGw7XG4gIHByb3RlY3RlZCBfYm91bmRzOiBSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XG4gIHByb3RlY3RlZCBfY29tcHV0ZWRCb3VuZHM6IFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcbiAgcHJvdGVjdGVkIF9tYXRyaXg6IE1hdHJpeCA9IG5ldyBNYXRyaXgoKTtcbiAgcHJvdGVjdGVkIF9jb2xvcktleTogc3RyaW5nID0gbnVsbDtcbiAgcHJvdGVjdGVkIF9jZW50ZXJYOiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX2NlbnRlclk6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfcm90YXRlOiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX3dpZHRoOiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX2hlaWdodDogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9zY2FsZVg6IG51bWJlciA9IDE7XG4gIHByb3RlY3RlZCBfc2NhbGVZOiBudW1iZXIgPSAxO1xuICBwcm90ZWN0ZWQgX3NrZXdYOiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX3NrZXdZOiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX3Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIHB1YmxpYyBnZXQgc3RhZ2UoKTogU3RhZ2UgeyByZXR1cm4gdGhpcy5fc3RhZ2U7IH1cbiAgcHVibGljIGdldCBwYXJlbnQoKTogRGlzcGxheUNvbnRhaW5lciB7IHJldHVybiB0aGlzLl9wYXJlbnQ7IH1cbiAgcHVibGljIGdldCBjb2xvcktleSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fY29sb3JLZXk7IH1cbiAgcHVibGljIGdldCB4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9ib3VuZHMubGVmdDsgfVxuICBwdWJsaWMgZ2V0IHkoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2JvdW5kcy50b3A7IH1cbiAgcHVibGljIGdldCBjZW50ZXJYKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jZW50ZXJYOyB9XG4gIHB1YmxpYyBnZXQgY2VudGVyWSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY2VudGVyWTsgfVxuICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9ib3VuZHMud2lkdGg7IH1cbiAgcHVibGljIGdldCBoZWlnaHQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2JvdW5kcy5oZWlnaHQ7IH1cbiAgcHVibGljIGdldCByb3RhdGUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3JvdGF0ZTsgfVxuICBwdWJsaWMgZ2V0IHNjYWxlWCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2NhbGVYOyB9XG4gIHB1YmxpYyBnZXQgc2NhbGVZKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zY2FsZVk7IH1cbiAgcHVibGljIGdldCBza2V3WCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2tld1g7IH1cbiAgcHVibGljIGdldCBza2V3WSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2tld1k7IH1cbiAgcHVibGljIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdmlzaWJsZTsgfVxuICBwdWJsaWMgZ2V0IGJvdW5kcygpOiBSZWN0YW5nbGUgeyByZXR1cm4gdGhpcy5fYm91bmRzOyB9XG4gIHB1YmxpYyBnZXQgbWF0cml4KCk6IE1hdHJpeCB7IHJldHVybiB0aGlzLl9tYXRyaXg7IH1cblxuICBwdWJsaWMgZ2V0IGNvbXB1dGVkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuYm91bmRzO1xuICAgIGNvbnN0IHBvaW50cyA9IFtib3VuZHMubGVmdFRvcCwgYm91bmRzLnJpZ2h0VG9wLCBib3VuZHMubGVmdEJvdHRvbSwgYm91bmRzLnJpZ2h0Qm90dG9tXTtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBwb2ludHMpIHtcbiAgICAgIGl0ZW0ucm90YXRlKHRoaXMuX3JvdGF0ZSk7XG4gICAgICBpdGVtLnNrZXcodGhpcy5fc2tld1gsIHRoaXMuX3NrZXdZKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb21wdXRlZEJvdW5kcy5sZWZ0ID0gTWF0aC5taW4oYm91bmRzLmxlZnRUb3AueCwgYm91bmRzLnJpZ2h0VG9wLngsIGJvdW5kcy5sZWZ0Qm90dG9tLngsIGJvdW5kcy5yaWdodEJvdHRvbS54KTtcbiAgICB0aGlzLl9jb21wdXRlZEJvdW5kcy5yaWdodCA9IE1hdGgubWF4KGJvdW5kcy5sZWZ0VG9wLngsIGJvdW5kcy5yaWdodFRvcC54LCBib3VuZHMubGVmdEJvdHRvbS54LCBib3VuZHMucmlnaHRCb3R0b20ueCk7XG4gICAgdGhpcy5fY29tcHV0ZWRCb3VuZHMudG9wID0gTWF0aC5taW4oYm91bmRzLmxlZnRUb3AueSwgYm91bmRzLnJpZ2h0VG9wLnksIGJvdW5kcy5sZWZ0Qm90dG9tLnksIGJvdW5kcy5yaWdodEJvdHRvbS55KTtcbiAgICB0aGlzLl9jb21wdXRlZEJvdW5kcy5ib3R0b20gPSBNYXRoLm1heChib3VuZHMubGVmdFRvcC55LCBib3VuZHMucmlnaHRUb3AueSwgYm91bmRzLmxlZnRCb3R0b20ueSwgYm91bmRzLnJpZ2h0Qm90dG9tLnkpO1xuICAgIHJldHVybiB0aGlzLl9jb21wdXRlZEJvdW5kcztcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc3RhZ2Uoc3RhZ2U6IFN0YWdlKSB7XG4gICAgdGhpcy5fc3RhZ2UgPSBzdGFnZTtcbiAgICBpZiAodGhpcy5fc3RhZ2UpIHtcbiAgICAgIHRoaXMuX3N0YWdlLmNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgcGFyZW50KHBhcmVudDogRGlzcGxheUNvbnRhaW5lcikgeyB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7IH1cblxuICBwdWJsaWMgc2V0IGNvbG9yS2V5KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jb2xvcktleSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHNldCB4KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fYm91bmRzLmxlZnQgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2JvdW5kcy5sZWZ0ID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgeSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2JvdW5kcy50b3AgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2JvdW5kcy50b3AgPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBjZW50ZXJYKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jZW50ZXJYID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IGNlbnRlclkodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2NlbnRlclkgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl93aWR0aCA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcbiAgICB0aGlzLl9ib3VuZHMud2lkdGggPSB2YWx1ZSAqIHRoaXMuX3NjYWxlWDtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBoZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmhlaWdodCA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IHZhbHVlICogdGhpcy5fc2NhbGVZO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHJvdGF0ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3JvdGF0ZSA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fcm90YXRlID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2NhbGVYKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2NhbGVYID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9zY2FsZVggPSB2YWx1ZTtcbiAgICB0aGlzLl9ib3VuZHMud2lkdGggPSB0aGlzLl93aWR0aCAqIHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNjYWxlWSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3NjYWxlWSA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2NhbGVZID0gdmFsdWU7XG4gICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IHRoaXMuX2hlaWdodCAqIHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNrZXdYKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2tld1ggPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NrZXdYID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2tld1kodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9za2V3WSA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2tld1kgPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCB2aXNpYmxlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX3Zpc2libGUgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm9uKFN0YWdlLkFERF9UT19TVEFHRSwgKCkgPT4gdGhpcy5zdGFnZS5yZWdpc3RlckV2ZW50TWFwKHRoaXMpKTtcbiAgICB0aGlzLm9uKFN0YWdlLlJFTU9WRV9UT19TVEFHRSwgKCkgPT4gdGhpcy5zdGFnZS51bnJlZ2lzdGVyRXZlbnRNYXAodGhpcykpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZURpc3BsYXkoY29udGV4dD86IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQ7XG5cbiAgcHVibGljIHVwZGF0ZVRyYW5zZm9ybWF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX21hdHJpeC5yZXNldCgpO1xuICAgIGNvbnN0IG9mZnNldFggPSB0aGlzLnggKyAodGhpcy5fY2VudGVyWCAqIHRoaXMuX3NjYWxlWCk7XG4gICAgY29uc3Qgb2Zmc2V0WSA9IHRoaXMueSArICh0aGlzLl9jZW50ZXJZICogdGhpcy5fc2NhbGVZKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1UcmFuc2xhdGUob2Zmc2V0WCwgb2Zmc2V0WSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtUm90YXRlKHRoaXMuX3JvdGF0ZSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtVHJhbnNsYXRlKC1vZmZzZXRYLCAtb2Zmc2V0WSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtVHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcbiAgICB0aGlzLl90cmFuc2Zvcm1TY2FsZSh0aGlzLl9zY2FsZVgsIHRoaXMuX3NjYWxlWSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtU2tldyh0aGlzLl9za2V3WCwgdGhpcy5fc2tld1kpO1xuICAgIHRoaXMuc3RhZ2UuY29udGV4dC50cmFuc2Zvcm0odGhpcy5fbWF0cml4LmEsIHRoaXMuX21hdHJpeC5iLCB0aGlzLl9tYXRyaXguYywgdGhpcy5fbWF0cml4LmQsIHRoaXMuX21hdHJpeC50eCwgdGhpcy5fbWF0cml4LnR5KTtcbiAgICB0aGlzLnN0YWdlLnRlbXBDb250ZXh0LnRyYW5zZm9ybSh0aGlzLl9tYXRyaXguYSwgdGhpcy5fbWF0cml4LmIsIHRoaXMuX21hdHJpeC5jLCB0aGlzLl9tYXRyaXguZCwgdGhpcy5fbWF0cml4LnR4LCB0aGlzLl9tYXRyaXgudHkpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YWdlLmNvbnRleHQuc2F2ZSgpO1xuICAgIHRoaXMuc3RhZ2UudGVtcENvbnRleHQuc2F2ZSgpO1xuICAgIHRoaXMudXBkYXRlVHJhbnNmb3JtYXRpb24oKTtcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkodGhpcy5zdGFnZS5jb250ZXh0KTtcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkodGhpcy5zdGFnZS50ZW1wQ29udGV4dCk7XG4gICAgdGhpcy5zdGFnZS5jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB0aGlzLnN0YWdlLnRlbXBDb250ZXh0LnJlc3RvcmUoKTtcbiAgICB0aGlzLnN0YWdlLnRlbXBDb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2UtaW4nO1xuICAgIHRoaXMuc3RhZ2UudGVtcENvbnRleHQuZmlsbFN0eWxlID0gJyMnICsgdGhpcy5jb2xvcktleTtcbiAgICB0aGlzLnN0YWdlLnRlbXBDb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuc3RhZ2UudGVtcENhbnZhcy53aWR0aCwgdGhpcy5zdGFnZS50ZW1wQ2FudmFzLmhlaWdodCk7XG4gICAgdGhpcy5zdGFnZS5ldmVudENvbnRleHQuZHJhd0ltYWdlKHRoaXMuc3RhZ2UudGVtcENhbnZhcywgMCwgMCk7XG4gICAgdGhpcy5zdGFnZS50ZW1wQ2FudmFzLndpZHRoID0gdGhpcy5zdGFnZS50ZW1wQ2FudmFzLndpZHRoO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtVHJhbnNsYXRlKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApOiB2b2lkIHtcbiAgICB0aGlzLl9tYXRyaXgudHJhbnNsYXRlKHgsIHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtUm90YXRlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9tYXRyaXgucm90YXRlKHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybVNjYWxlKHg6IG51bWJlciA9IDEsIHk6IG51bWJlciA9IDEpOiB2b2lkIHtcbiAgICB0aGlzLl9tYXRyaXguc2NhbGUoeCwgeSk7XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1Ta2V3KHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApOiB2b2lkIHtcbiAgICB0aGlzLl9tYXRyaXguc2tldyh4LCB5KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoYW5nZWREaXNwbGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zdGFnZSkgeyByZXR1cm47IH1cbiAgICBpZiAoIXRoaXMuc3RhZ2UuY2hhbmdlZCkge1xuICAgICAgdGhpcy5zdGFnZS5jaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vZ2VvbS9yZWN0YW5nbGUnO1xuXG5leHBvcnQgZW51bSBMaW5lQ2FwIHtcbiAgQlVUVCA9ICdidXR0JyxcbiAgUk9VTkQgPSAncm91bmQnLFxuICBTUVVBUkUgPSAnc3F1YXJlJyxcbn1cblxuZXhwb3J0IGVudW0gTGluZUpvaW4ge1xuICBST1VOVCA9ICdyb3VuZCcsXG4gIEJFVkVMID0gJ2JldmVsJyxcbiAgTUlURVIgPSAnbWl0ZXInLFxufVxuXG5lbnVtIERyYXdDb21tYW5kTmFtZSB7XG4gIFJFQ1QgPSAncmVjdCcsXG4gIEZJTExfUkVDVCA9ICdmaWxsUmVjdCcsXG4gIFNUUk9LRV9SRUNUID0gJ3N0cm9rZVJlY3QnLFxuICBDTEVBUl9SRUNUID0gJ2NsZWFyUmVjdCcsXG4gIEJFR0lOX1BBVEggPSAnYmVnaW5QYXRoJyxcbiAgQ0xPU0VfUEFUSCA9ICdjbG9zZVBhdGgnLFxuICBNT1ZFX1RPID0gJ21vdmVUbycsXG4gIExJTkVfVE8gPSAnbGluZVRvJyxcbiAgQVJDID0gJ2FyYycsXG4gIEFSQ19UTyA9ICdhcmNUbycsXG4gIFFVQURSQVRJQ19DVVJWRV9UTyA9ICdxdWFkcmF0aWNDdXJ2ZVRvJyxcbiAgQkVaSUVSX0NVUlZFX1RPID0gJ2JlemllckN1cnZlVG8nLFxuICBGSUxMID0gJ2ZpbGwnLFxuICBTVFJPS0UgPSAnc3Ryb2tlJyxcbn1cblxuaW50ZXJmYWNlIERyYXdDb21tYW5kIHtcbiAgbmFtZTogRHJhd0NvbW1hbmROYW1lO1xuICBhcmd1bWVudHM6IGFueTtcbiAgZmlsbFN0eWxlOiBzdHJpbmc7XG4gIHN0cm9rZVN0eWxlOiBzdHJpbmc7XG4gIGxpbmVXaWR0aDogbnVtYmVyO1xuICBsaW5lQ2FwOiBMaW5lQ2FwO1xuICBsaW5lSm9pbjogTGluZUpvaW47XG4gIG1pdGVyTGltaXQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhpY3Mge1xuICBwdWJsaWMgZmlsbFN0eWxlOiBzdHJpbmcgPSBudWxsO1xuICBwdWJsaWMgc3Ryb2tlU3R5bGU6IHN0cmluZyA9IG51bGw7XG4gIHB1YmxpYyBsaW5lV2lkdGg6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBsaW5lQ2FwOiBMaW5lQ2FwID0gTGluZUNhcC5CVVRUO1xuICBwdWJsaWMgbGluZUpvaW46IExpbmVKb2luID0gTGluZUpvaW4uTUlURVI7XG4gIHB1YmxpYyBtaXRlckxpbWl0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9jb21tYW5kczogU2V0PERyYXdDb21tYW5kPiA9IG5ldyBTZXQoKTtcbiAgcHJpdmF0ZSBfeDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfeTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfYm91bmRzOiBSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XG5cbiAgcHVibGljIGdldCBjb21tYW5kcygpOiBTZXQ8RHJhd0NvbW1hbmQ+IHsgcmV0dXJuIHRoaXMuX2NvbW1hbmRzOyB9XG4gIHB1YmxpYyBnZXQgY29tbWFuZExpc3QoKTogSXRlcmFibGVJdGVyYXRvcjxEcmF3Q29tbWFuZD4geyByZXR1cm4gdGhpcy5fY29tbWFuZHMudmFsdWVzKCk7IH1cbiAgcHVibGljIGdldCBib3VuZHMoKTogUmVjdGFuZ2xlIHsgcmV0dXJuIHRoaXMuX2JvdW5kczsgfVxuXG4gIHB1YmxpYyByZWN0KHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2JvdW5kcy5leHRlbmRzKG5ldyBSZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCkpO1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLlJFQ1QsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgZmlsbFJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYm91bmRzLmV4dGVuZHMobmV3IFJlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0KSk7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuRklMTF9SRUNULCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIHN0cm9rZVJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGluZVdpZHRoOiBudW1iZXIgPSB0aGlzLmxpbmVXaWR0aCAqIDI7XG4gICAgdGhpcy5fYm91bmRzLmV4dGVuZHMobmV3IFJlY3RhbmdsZSh4LCB5LCB3aWR0aCArIGxpbmVXaWR0aCwgaGVpZ2h0ICsgbGluZVdpZHRoKSk7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuU1RST0tFX1JFQ1QsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJSZWN0KHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkNMRUFSX1JFQ1QsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgYmVnaW5QYXRoKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkJFR0lOX1BBVEgpO1xuICB9XG5cbiAgcHVibGljIGNsb3NlUGF0aCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5DTE9TRV9QQVRIKTtcbiAgfVxuXG4gIHB1YmxpYyBtb3ZlVG8oeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl94ID0geDtcbiAgICB0aGlzLl95ID0geTtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5NT1ZFX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGxpbmVUbyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2JvdW5kcy5leHRlbmRzUG9zaXRpb24odGhpcy5feCwgdGhpcy5feSk7XG4gICAgdGhpcy5fYm91bmRzLmV4dGVuZHNQb3NpdGlvbih4LCB5KTtcbiAgICB0aGlzLl94ID0geDtcbiAgICB0aGlzLl95ID0geTtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5MSU5FX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGFyYyh4OiBudW1iZXIsIHk6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIHN0YXJ0QW5nbGU6IG51bWJlciwgZW5kQW5nbGU6IG51bWJlciwgYW50aWNsb2Nrd2lzZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQVJDLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGFyY1RvKHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkyOiBudW1iZXIsIHJhZGl1czogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQVJDX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIHF1YWRyYXRpY0N1cnZlVG8oY3AxeDogbnVtYmVyLCBjcDF5OiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuUVVBRFJBVElDX0NVUlZFX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGJlemllckN1cnZlVG8oY3AxeDogbnVtYmVyLCBjcDF5OiBudW1iZXIsIGNwMng6IG51bWJlciwgY3AyeTogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkJFWklFUl9DVVJWRV9UTywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWxsKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkZJTEwpO1xuICB9XG5cbiAgcHVibGljIHN0cm9rZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5TVFJPS0UpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmRzLmNsZWFyKCk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRDb21tYW5kKG5hbWU6IERyYXdDb21tYW5kTmFtZSwgYXJncz86IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmRzLmFkZCh7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgYXJndW1lbnRzOiBhcmdzLFxuICAgICAgZmlsbFN0eWxlOiB0aGlzLmZpbGxTdHlsZSxcbiAgICAgIHN0cm9rZVN0eWxlOiB0aGlzLnN0cm9rZVN0eWxlLFxuICAgICAgbGluZVdpZHRoOiB0aGlzLmxpbmVXaWR0aCxcbiAgICAgIGxpbmVDYXA6IHRoaXMubGluZUNhcCxcbiAgICAgIGxpbmVKb2luOiB0aGlzLmxpbmVKb2luLFxuICAgICAgbWl0ZXJMaW1pdDogdGhpcy5taXRlckxpbWl0LFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRGlzcGxheSBmcm9tICcuL2Rpc3BsYXknO1xuaW1wb3J0IEdyYXBoaWNzIGZyb20gJy4vZ3JhcGhpY3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFwZSBleHRlbmRzIERpc3BsYXkge1xuICBwdWJsaWMgZ3JhcGhpY3M6IEdyYXBoaWNzID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihncmFwaGljczogR3JhcGhpY3MpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZ3JhcGhpY3MgPSBncmFwaGljcyB8fCBuZXcgR3JhcGhpY3MoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVEaXNwbGF5KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgY29tbWFuZCBvZiB0aGlzLmdyYXBoaWNzLmNvbW1hbmRMaXN0KSB7XG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbW1hbmQuZmlsbFN0eWxlO1xuICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbW1hbmQuc3Ryb2tlU3R5bGU7XG4gICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGNvbW1hbmQubGluZVdpZHRoO1xuICAgICAgY29udGV4dC5saW5lQ2FwID0gY29tbWFuZC5saW5lQ2FwO1xuICAgICAgY29udGV4dC5saW5lSm9pbiA9IGNvbW1hbmQubGluZUpvaW47XG4gICAgICBjb250ZXh0Lm1pdGVyTGltaXQgPSBjb21tYW5kLm1pdGVyTGltaXQ7XG4gICAgICBpZiAoY29tbWFuZC5hcmd1bWVudHMpIHtcbiAgICAgICAgKGNvbnRleHQgYXMgYW55KVtjb21tYW5kLm5hbWVdKC4uLmNvbW1hbmQuYXJndW1lbnRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChjb250ZXh0IGFzIGFueSlbY29tbWFuZC5uYW1lXSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tICcuLi9ldmVudC9ldmVudC1kaXNwYXRjaGVyJztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vZ2VvbS9yZWN0YW5nbGUnO1xuXG5leHBvcnQgZW51bSBTcHJpdGVTaGVldEV2ZW50IHtcbiAgTE9BRCA9ICdsb2FkJyxcbiAgRU5EID0gJ2VuZCcsXG59XG5cbmludGVyZmFjZSBGcmFtZSB7XG4gIFtpbmRleDogc3RyaW5nXTogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVTaGVldCBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBMT0FEOiBTcHJpdGVTaGVldEV2ZW50ID0gU3ByaXRlU2hlZXRFdmVudC5MT0FEO1xuXG4gIHByaXZhdGUgX2ltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfY2VsbFdpZHRoOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9jZWxsSGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9mcmFtZXM6IEZyYW1lW10gPSBudWxsO1xuICBwcml2YXRlIF9mcmFtZUluZGV4OiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSBfY3VycmVudEJvdW5kczogUmVjdGFuZ2xlID0gbnVsbDtcbiAgcHJpdmF0ZSBfbG9vcDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyBnZXQgaW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7IHJldHVybiB0aGlzLl9pbWFnZTsgfVxuICBwdWJsaWMgZ2V0IGNlbGxXaWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY2VsbFdpZHRoOyB9XG4gIHB1YmxpYyBnZXQgY2VsbEhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY2VsbEhlaWdodDsgfVxuICBwdWJsaWMgZ2V0IGN1cnJlbnRCb3VuZHMoKSB7IHJldHVybiB0aGlzLl9jdXJyZW50Qm91bmRzOyB9XG5cbiAgY29uc3RydWN0b3IoaW1nOiBIVE1MSW1hZ2VFbGVtZW50IHwgc3RyaW5nLCBjZWxsV2lkdGg6IG51bWJlciwgY2VsbEhlaWdodDogbnVtYmVyLCBmcmFtZXM6IEZyYW1lW10sIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoaW1nIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgdGhpcy5faW1hZ2UgPSBpbWc7XG4gICAgICB0aGlzLnRyaWdnZXIoU3ByaXRlU2hlZXQuTE9BRCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaW1nID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IGltZztcbiAgICAgIHRoaXMuX2ltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB0aGlzLnRyaWdnZXIoU3ByaXRlU2hlZXQuTE9BRCkpO1xuICAgIH1cblxuICAgIHRoaXMuX2NlbGxXaWR0aCA9IGNlbGxXaWR0aDtcbiAgICB0aGlzLl9jZWxsSGVpZ2h0ID0gY2VsbEhlaWdodDtcbiAgICB0aGlzLl9mcmFtZXMgPSBmcmFtZXM7XG4gICAgdGhpcy5fZnJhbWVJbmRleCA9IC0xO1xuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBuZXcgUmVjdGFuZ2xlKDAsIDAsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCk7XG4gICAgdGhpcy5fbG9vcCA9IGxvb3A7XG4gIH1cblxuICBwdWJsaWMgbmV4dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZnJhbWVJbmRleCArIDEgPD0gdGhpcy5fZnJhbWVzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuX2ZyYW1lSW5kZXgrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2xvb3ApIHtcbiAgICAgICAgdGhpcy5fZnJhbWVJbmRleCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyaWdnZXIoU3ByaXRlU2hlZXRFdmVudC5FTkQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl91cGRhdGVCb3VuZHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mcmFtZUluZGV4IC0gMSA+IDApIHtcbiAgICAgIHRoaXMuX2ZyYW1lSW5kZXgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2xvb3ApIHtcbiAgICAgICAgdGhpcy5fZnJhbWVJbmRleCA9IHRoaXMuX2ZyYW1lcy5sZW5ndGggLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKFNwcml0ZVNoZWV0RXZlbnQuRU5EKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlQm91bmRzKCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZnJhbWVJbmRleCA9IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQm91bmRzKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRGcmFtZSA9IHRoaXMuX2ZyYW1lc1t0aGlzLl9mcmFtZUluZGV4XTtcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzLnggPSBjdXJyZW50RnJhbWVbMF0gKiB0aGlzLl9jZWxsV2lkdGg7XG4gICAgdGhpcy5fY3VycmVudEJvdW5kcy55ID0gY3VycmVudEZyYW1lWzFdICogdGhpcy5fY2VsbEhlaWdodDtcbiAgfVxufVxuIiwiaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBTcHJpdGVTaGVldCwgeyBTcHJpdGVTaGVldEV2ZW50IH0gZnJvbSAnLi9zcHJpdGUtc2hlZXQnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuLi91dGlsL3RpY2tlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSBleHRlbmRzIERpc3BsYXkge1xuICBwcml2YXRlIF9zcHJpdGVTaGVldDogU3ByaXRlU2hlZXQgPSBudWxsO1xuICBwcml2YXRlIF9mcHM6IG51bWJlciA9IDEwO1xuICBwcml2YXRlIF90aWNrZXI6IFRpY2tlciA9IG51bGw7XG5cbiAgY29uc3RydWN0b3Ioc3ByaXRlU2hlZXQ6IFNwcml0ZVNoZWV0LCBmcHM6IG51bWJlciA9IDEwKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zcHJpdGVTaGVldCA9IHNwcml0ZVNoZWV0O1xuICAgIHRoaXMuX2ZwcyA9IGZwcztcbiAgICB0aGlzLl90aWNrZXIgPSBuZXcgVGlja2VyKGZwcyk7XG4gICAgdGhpcy5fdGlja2VyLm9uKFRpY2tlci5USUNLLCAoKSA9PiB0aGlzLl90aWNrZXJIYW5kbGVyKCkpO1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0Lm9uKFNwcml0ZVNoZWV0RXZlbnQuRU5ELCAoKSA9PiB0aGlzLnN0b3AoKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNwcml0ZVNoZWV0KCk6IFNwcml0ZVNoZWV0IHsgcmV0dXJuIHRoaXMuX3Nwcml0ZVNoZWV0OyB9XG4gIHB1YmxpYyBnZXQgZnBzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9mcHM7IH1cblxuICBwdWJsaWMgc2V0IHNwcml0ZVNoZWV0KHNwcml0ZVNoZWV0OiBTcHJpdGVTaGVldCkge1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0ID0gc3ByaXRlU2hlZXQ7XG4gICAgdGhpcy5fYm91bmRzLndpZHRoID0gc3ByaXRlU2hlZXQuY2VsbFdpZHRoO1xuICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSBzcHJpdGVTaGVldC5jZWxsSGVpZ2h0O1xuICB9XG5cbiAgcHVibGljIHNldCBmcHModmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2ZwcyA9IHZhbHVlO1xuICAgIHRoaXMuX3RpY2tlci5mcHMgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBwbGF5KCk6IHZvaWQge1xuICAgIHRoaXMuX3RpY2tlckhhbmRsZXIoKTtcbiAgICB0aGlzLl90aWNrZXIucnVuKCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc3ByaXRlU2hlZXQucmVzZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuX3RpY2tlci5zdG9wKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRGlzcGxheShjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLl9zcHJpdGVTaGVldC5jdXJyZW50Qm91bmRzO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgdGhpcy5fc3ByaXRlU2hlZXQuaW1hZ2UsXG4gICAgICBib3VuZHMubGVmdCxcbiAgICAgIGJvdW5kcy50b3AsXG4gICAgICBib3VuZHMud2lkdGgsXG4gICAgICBib3VuZHMuaGVpZ2h0LFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICBib3VuZHMud2lkdGgsXG4gICAgICBib3VuZHMuaGVpZ2h0LFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF90aWNrZXJIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0Lm5leHQoKTtcbiAgICB0aGlzLnN0YWdlLmNoYW5nZWQgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2UudXBkYXRlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBEaXNwbGF5Q29udGFpbmVyIGZyb20gJy4vZGlzcGxheS1jb250YWluZXInO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuLi9nZW9tL3JlY3RhbmdsZSc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4uL3V0aWwvdGlja2VyJztcbmltcG9ydCBEaXNwbGF5IGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgTW91c2VFdmVudCBmcm9tICcuLi9ldmVudC9tb3VzZS1ldmVudCc7XG5cbmVudW0gU3RhZ2VFdmVudFR5cGUge1xuICBBRERfVE9fU1RBR0UgPSAnYWRkVG9TdGFnZScsXG4gIFJFTU9WRV9UT19TVEFHRSA9ICdyZW1vdmVUb1N0YWdlJyxcbiAgRU5URVJfRlJBTUUgPSAnZW50ZXJGcmFtZScsXG59XG5cbmludGVyZmFjZSBFdmVudFRhcmdldE1hcCB7XG4gIFtwcm9wOiBzdHJpbmddOiBEaXNwbGF5W107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlIGV4dGVuZHMgRGlzcGxheUNvbnRhaW5lciB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBBRERfVE9fU1RBR0U6IFN0YWdlRXZlbnRUeXBlID0gU3RhZ2VFdmVudFR5cGUuQUREX1RPX1NUQUdFO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJFTU9WRV9UT19TVEFHRTogU3RhZ2VFdmVudFR5cGUgPSBTdGFnZUV2ZW50VHlwZS5SRU1PVkVfVE9fU1RBR0U7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRU5URVJfRlJBTUU6IFN0YWdlRXZlbnRUeXBlID0gU3RhZ2VFdmVudFR5cGUuRU5URVJfRlJBTUU7XG5cbiAgcHVibGljIGNoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IG51bGw7XG4gIHByaXZhdGUgX2V2ZW50Q2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IG51bGw7XG4gIHByaXZhdGUgX3RlbXBDYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gbnVsbDtcbiAgcHJpdmF0ZSBfZXZlbnRDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBudWxsO1xuICBwcml2YXRlIF90ZW1wQ29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gbnVsbDtcbiAgcHJpdmF0ZSBfcmV0dXJuZWRDb2xvcktleTogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBfdGlja2VyOiBUaWNrZXIgPSBudWxsO1xuICBwcml2YXRlIF9ldmVudFRhcmdldE1hcDogRXZlbnRUYXJnZXRNYXAgPSB7fTtcbiAgcHJpdmF0ZSBfc3RhcnRDb2xvciA9IDA7XG5cbiAgY29uc3RydWN0b3IoY2FudmFzSWQ6IHN0cmluZywgZnBzOiBudW1iZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5fc3RhZ2UgPSB0aGlzO1xuICAgIHRoaXMuX2JvdW5kcyA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLl9pbml0RlBTKGZwcyk7XG4gICAgdGhpcy5faW5pdEV2ZW50Q2FudmFzKCk7XG4gICAgdGhpcy5faW5pdEV2ZW50KCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7IHJldHVybiB0aGlzLl9jYW52YXM7IH1cbiAgcHVibGljIGdldCBldmVudENhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7IHJldHVybiB0aGlzLl9ldmVudENhbnZhczsgfVxuICBwdWJsaWMgZ2V0IHRlbXBDYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQgeyByZXR1cm4gdGhpcy5fdGVtcENhbnZhczsgfVxuICBwdWJsaWMgZ2V0IGNvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHsgcmV0dXJuIHRoaXMuX2NvbnRleHQ7IH1cbiAgcHVibGljIGdldCBldmVudENvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHsgcmV0dXJuIHRoaXMuX2V2ZW50Q29udGV4dDsgfVxuICBwdWJsaWMgZ2V0IHRlbXBDb250ZXh0KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7IHJldHVybiB0aGlzLl90ZW1wQ29udGV4dDsgfVxuXG4gIHB1YmxpYyBjcmVhdGVDb2xvcktleSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLl9yZXR1cm5lZENvbG9yS2V5Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JldHVybmVkQ29sb3JLZXkuc2hpZnQoKTtcbiAgICB9XG4gICAgbGV0IHZhbHVlID0gTnVtYmVyKHRoaXMuX3N0YXJ0Q29sb3IgKz0gMTApLnRvU3RyaW5nKDE2KTtcbiAgICB2YWx1ZSA9ICcwJy5yZXBlYXQoNiAtIHZhbHVlLmxlbmd0aCkgKyB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgcmV0dXJuQ29sb3JLZXkodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JldHVybmVkQ29sb3JLZXkucHVzaCh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNoYW5nZWQpIHtcbiAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHRoaXMuX2NhbnZhcy53aWR0aDtcbiAgICAgIHRoaXMuX2V2ZW50Q2FudmFzLndpZHRoID0gdGhpcy5fZXZlbnRDYW52YXMud2lkdGg7XG4gICAgICB0aGlzLl90ZW1wQ2FudmFzLndpZHRoID0gdGhpcy5fdGVtcENhbnZhcy53aWR0aDtcbiAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuICAgICAgdGhpcy5jaGFuZ2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyRXZlbnRNYXAoZGlzcGxheTogRGlzcGxheSk6IHZvaWQge1xuICAgIGNvbnN0IGNoaWxkRXZlbnRNYXAgPSBkaXNwbGF5LmV2ZW50TWFwO1xuICAgIGZvciAoY29uc3QgdHlwZSBpbiBjaGlsZEV2ZW50TWFwKSB7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdID0gW107XG4gICAgICB9XG4gICAgICB0aGlzLl9ldmVudFRhcmdldE1hcFt0eXBlXS5wdXNoKGRpc3BsYXkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1bnJlZ2lzdGVyRXZlbnRNYXAoZGlzcGxheTogRGlzcGxheSkge1xuICAgIGNvbnN0IGNoaWxkRXZlbnRNYXAgPSBkaXNwbGF5LmV2ZW50TWFwO1xuICAgIGZvciAoY29uc3QgdHlwZSBpbiBjaGlsZEV2ZW50TWFwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdLmluZGV4T2YoZGlzcGxheSk7XG4gICAgICB0aGlzLl9ldmVudFRhcmdldE1hcFt0eXBlXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGUFMoZnBzOiBudW1iZXIpIHtcbiAgICBpZiAoZnBzKSB7XG4gICAgICB0aGlzLl90aWNrZXIgPSBuZXcgVGlja2VyKGZwcyk7XG4gICAgICB0aGlzLl90aWNrZXIub24oVGlja2VyLlRJQ0ssIChkZWx0YSkgPT4ge1xuICAgICAgICB0aGlzLnRyaWdnZXIoU3RhZ2UuRU5URVJfRlJBTUUsIGRlbHRhKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fdGlja2VyLnJ1bigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRFdmVudENhbnZhcygpIHtcbiAgICB0aGlzLl9ldmVudENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuX2V2ZW50Q2FudmFzLndpZHRoID0gdGhpcy5fY2FudmFzLndpZHRoO1xuICAgIHRoaXMuX2V2ZW50Q2FudmFzLmhlaWdodCA9IHRoaXMuX2NhbnZhcy5oZWlnaHQ7XG4gICAgdGhpcy5fZXZlbnRDb250ZXh0ID0gdGhpcy5fZXZlbnRDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCB0aGlzLl9ldmVudENhbnZhcyApO1xuICAgIHRoaXMuX3RlbXBDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLl90ZW1wQ2FudmFzLndpZHRoID0gdGhpcy5fY2FudmFzLndpZHRoO1xuICAgIHRoaXMuX3RlbXBDYW52YXMuaGVpZ2h0ID0gdGhpcy5fY2FudmFzLmhlaWdodDsgdGhpcy5fdGVtcENvbnRleHQgPSB0aGlzLl90ZW1wQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RXZlbnQoKSB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuX2NhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50VGFyZ2V0TWFwW01vdXNlRXZlbnQuQ0xJQ0tdIHx8ICF0aGlzLl9ldmVudFRhcmdldE1hcFtNb3VzZUV2ZW50LkNMSUNLXS5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgIGNvbnN0IHkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICBjb25zdCBjb2xvciA9IHRoaXMuX2V2ZW50Q29udGV4dC5nZXRJbWFnZURhdGEoeCwgeSwgMSwgMSk7XG4gICAgICBjb25zdCByID0gY29sb3IuZGF0YVswXS50b1N0cmluZygxNik7XG4gICAgICBjb25zdCBnID0gY29sb3IuZGF0YVsxXS50b1N0cmluZygxNik7XG4gICAgICBjb25zdCBiID0gY29sb3IuZGF0YVsyXS50b1N0cmluZygxNik7XG4gICAgICBjb25zdCBjb2xvcktleSA9ICcwJy5yZXBlYXQoMiAtIHIubGVuZ3RoKSArIHIgKyAnMCcucmVwZWF0KDIgLSBnLmxlbmd0aCkgKyBnICsgJzAnLnJlcGVhdCgyIC0gYi5sZW5ndGgpICsgYjtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9ldmVudFRhcmdldE1hcFtNb3VzZUV2ZW50LkNMSUNLXS5sZW5ndGggLSAxLCBjb3VudCA9IDA7IGkgPj0gY291bnQ7IGkgLT0gMSkge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5fZXZlbnRUYXJnZXRNYXBbTW91c2VFdmVudC5DTElDS11baV07XG4gICAgICAgIGlmIChjb2xvcktleSA9PT0gaXRlbS5jb2xvcktleSkge1xuICAgICAgICAgIC8vIFRPRE86dGFyZ2V0IC8gY3VycmVudFRhcmdldCDqtazrtoRcbiAgICAgICAgICBpdGVtLnRyaWdnZXIoTW91c2VFdmVudC5DTElDSywgbmV3IE1vdXNlRXZlbnQoTW91c2VFdmVudC5DTElDSywge30sIGl0ZW0sIGl0ZW0pKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJcbmltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50JztcblxudHlwZSBFdmVudEhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50LCBkYXRhOiBhbnkpID0+IHZvaWQ7XG5cbmludGVyZmFjZSBFdmVudE1hcCB7XG4gIFtwcm9wOiBzdHJpbmddOiBFdmVudEhhbmRsZXJbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcbiAgcHJpdmF0ZSBfZXZlbnRNYXA6IEV2ZW50TWFwID0ge307XG5cbiAgcHVibGljIGdldCBldmVudE1hcCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE1hcDtcbiAgfVxuXG4gIHB1YmxpYyBvbih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50SGFuZGxlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZXZlbnRNYXBbdHlwZV0pIHtcbiAgICAgIHRoaXMuX2V2ZW50TWFwW3R5cGVdID0gW107XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50TWFwW3R5cGVdLnB1c2goaGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgb2ZmKHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRIYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgIGlmICh0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2V2ZW50TWFwW3R5cGVdLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIHRoaXMuX2V2ZW50TWFwW3R5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgICB0aGlzLl9ldmVudE1hcFt0eXBlXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRyaWdnZXIodHlwZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XG4gICAgaWYgKHRoaXMuX2V2ZW50TWFwW3R5cGVdKSB7XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fZXZlbnRNYXBbdHlwZV0pIHtcbiAgICAgICAgaXRlbS5jYWxsKHRoaXMsIGRhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudCB7XG4gIHByaXZhdGUgX3R5cGU6IHN0cmluZyA9IG51bGw7XG4gIHByaXZhdGUgX2RhdGE6IGFueSA9IG51bGw7XG5cbiAgcHVibGljIGdldCB0eXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRhdGEoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdHlwZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdHlwZSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIGRhdGE/OiBhbnkpIHtcbiAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0IERpc3BsYXkgZnJvbSAnLi4vZGlzcGxheS9kaXNwbGF5JztcblxuZW51bSBNb3VzZUV2ZW50VHlwZSB7XG4gIENMSUNLID0gJ2NsaWNrJyxcbiAgTU9VU0VfT1ZFUiA9ICdtb3VzZU92ZXInLFxuICBNT1VTRV9PVVQgPSAnbW91c2VPdXQnLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VzZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQ0xJQ0s6IE1vdXNlRXZlbnRUeXBlID0gTW91c2VFdmVudFR5cGUuQ0xJQ0s7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTU9VU0VfT1ZFUjogTW91c2VFdmVudFR5cGUgPSBNb3VzZUV2ZW50VHlwZS5NT1VTRV9PVkVSO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE1PVVNFX09VVDogTW91c2VFdmVudFR5cGUgPSBNb3VzZUV2ZW50VHlwZS5NT1VTRV9PVVQ7XG5cbiAgcHJpdmF0ZSBfdGFyZ2V0OiBEaXNwbGF5ID0gbnVsbDtcbiAgcHJpdmF0ZSBfY3VycmVudFRhcmdldDogRGlzcGxheSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IodHlwZTogTW91c2VFdmVudFR5cGUsIGRhdGE6IGFueSwgdGFyZ2V0OiBEaXNwbGF5LCBjdXJyZW50VGFyZ2V0OiBEaXNwbGF5KSB7XG4gICAgc3VwZXIodHlwZSwgZGF0YSk7XG4gICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0O1xuICB9XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeCB7XG4gIHB1YmxpYyBhOiBudW1iZXIgPSAxO1xuICBwdWJsaWMgYjogbnVtYmVyID0gMDtcbiAgcHVibGljIGM6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBkOiBudW1iZXIgPSAxO1xuICBwdWJsaWMgdHg6IG51bWJlciA9IDA7XG4gIHB1YmxpYyB0eTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihhOiBudW1iZXIgPSAxLCBiOiBudW1iZXIgPSAwLCBjOiBudW1iZXIgPSAwLCBkOiBudW1iZXIgPSAxLCB0eDogbnVtYmVyID0gMCwgdHk6IG51bWJlciA9IDApIHtcbiAgICB0aGlzLnNldFRvKGEsIGIsIGMsIGQsIHR4LCB0eSk7XG4gIH1cblxuICBwdWJsaWMgc2V0VG8oYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlciwgZDogbnVtYmVyLCB0eDogbnVtYmVyLCB0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hID0gYTtcbiAgICB0aGlzLmIgPSBiO1xuICAgIHRoaXMuYyA9IGM7XG4gICAgdGhpcy5kID0gZDtcbiAgICB0aGlzLnR4ID0gdHg7XG4gICAgdGhpcy50eSA9IHR5O1xuICB9XG5cbiAgcHVibGljIHNldFRvTWF0cml4KG1hdHJpeDogTWF0cml4KTogdm9pZCB7XG4gICAgdGhpcy5hID0gbWF0cml4LmE7XG4gICAgdGhpcy5iID0gbWF0cml4LmI7XG4gICAgdGhpcy5jID0gbWF0cml4LmM7XG4gICAgdGhpcy5kID0gbWF0cml4LmQ7XG4gICAgdGhpcy50eCA9IG1hdHJpeC50eDtcbiAgICB0aGlzLnR5ID0gbWF0cml4LnR5O1xuICB9XG5cbiAgcHVibGljIGFkZChtYXRyaXg6IE1hdHJpeCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLnNldFRvKHRoaXMuYSArIG1hdHJpeC5hLCB0aGlzLmIgKyBtYXRyaXguYiwgdGhpcy5jICsgbWF0cml4LmMsIHRoaXMuZCArIG1hdHJpeC5kLCB0aGlzLnR4ICsgbWF0cml4LnR4LCB0aGlzLnR5ICsgbWF0cml4LnR5KTtcbiAgfVxuXG4gIHB1YmxpYyBzdWIobWF0cml4OiBNYXRyaXgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5zZXRUbyh0aGlzLmEgLSBtYXRyaXguYSwgdGhpcy5iIC0gbWF0cml4LmIsIHRoaXMuYyAtIG1hdHJpeC5jLCB0aGlzLmQgLSBtYXRyaXguZCwgdGhpcy50eCAtIG1hdHJpeC50eCwgdGhpcy50eSAtIG1hdHJpeC50eSk7XG4gIH1cblxuICBwdWJsaWMgbXVsdGkobWF0cml4OiBNYXRyaXgpOiB2b2lkIHtcbiAgICBsZXQgYTogbnVtYmVyO1xuICAgIGxldCBiOiBudW1iZXI7XG4gICAgbGV0IGM6IG51bWJlcjtcbiAgICBsZXQgZDogbnVtYmVyO1xuICAgIGxldCB0eDogbnVtYmVyO1xuICAgIGxldCB0eTogbnVtYmVyO1xuXG4gICAgaWYgKHR5cGVvZiBtYXRyaXggPT09ICdudW1iZXInKSB7XG4gICAgICBhID0gdGhpcy5hICogbWF0cml4O1xuICAgICAgYiA9IHRoaXMuYiAqIG1hdHJpeDtcbiAgICAgIGMgPSB0aGlzLmMgKiBtYXRyaXg7XG4gICAgICBkID0gdGhpcy5kICogbWF0cml4O1xuICAgICAgdHggPSB0aGlzLnR4ICogbWF0cml4O1xuICAgICAgdHkgPSB0aGlzLnR5ICogbWF0cml4O1xuICAgIH0gZWxzZSB7XG4gICAgICBhID0gKHRoaXMuYSAqIG1hdHJpeC5hKSArICh0aGlzLmMgKiBtYXRyaXguYik7XG4gICAgICBiID0gKHRoaXMuYiAqIG1hdHJpeC5hKSArICh0aGlzLmQgKiBtYXRyaXguYik7XG4gICAgICBjID0gKHRoaXMuYSAqIG1hdHJpeC5jKSArICh0aGlzLmMgKiBtYXRyaXguZCk7XG4gICAgICBkID0gKHRoaXMuYiAqIG1hdHJpeC5jKSArICh0aGlzLmQgKiBtYXRyaXguZCk7XG4gICAgICB0eCA9ICh0aGlzLmEgKiBtYXRyaXgudHgpICsgKHRoaXMuYyAqIG1hdHJpeC50eSkgKyB0aGlzLnR4O1xuICAgICAgdHkgPSAodGhpcy5iICogbWF0cml4LnR4KSArICh0aGlzLmQgKiBtYXRyaXgudHkpICsgdGhpcy50eTtcbiAgICB9XG4gICAgdGhpcy5zZXRUbyhhLCBiLCBjLCBkLCB0eCwgdHkpO1xuICB9XG5cbiAgcHVibGljIGludmVyc2UoKTogTWF0cml4IHtcbiAgICBjb25zdCB7IGEsIGIsIGMsIGQsIHR4LCB0eSB9ID0gdGhpcztcbiAgICBjb25zdCBuID0gYSAqIGQgLSBiICogYztcbiAgICByZXR1cm4gbmV3IE1hdHJpeChkIC8gbiwgLWIgLyBuLCAtYyAvIG4sIGEgLyBuLCAoYyAqIHRoaXMudHkgLSBkICogdHgpIC8gbiwgKGIgKiB0eCAtIGEgKiB0aGlzLnR5KSAvIG4pO1xuICB9XG5cbiAgcHVibGljIGNsb25lKCk6IE1hdHJpeCB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXgodGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgdGhpcy5kLCB0aGlzLnR4LCB0aGlzLnR5KTtcbiAgfVxuXG4gIHB1YmxpYyBzY2FsZSh4OiBudW1iZXIgPSAxLCB5OiBudW1iZXIgPSAxKTogdm9pZCB7XG4gICAgdGhpcy5tdWx0aShuZXcgTWF0cml4KHgsIDAsIDAsIHksIDAsIDApKTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFuc2xhdGUoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIHRoaXMubXVsdGkobmV3IE1hdHJpeCgxLCAwLCAwLCAxLCB4LCB5KSk7XG4gIH1cblxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpKG5ldyBNYXRyaXgoTWF0aC5jb3MoYW5nbGUpLCBNYXRoLnNpbihhbmdsZSksIC1NYXRoLnNpbihhbmdsZSksIE1hdGguY29zKGFuZ2xlKSkpO1xuICB9XG5cbiAgcHVibGljIHNrZXcoeCA9IDAsIHkgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5tdWx0aShuZXcgTWF0cml4KDEsIE1hdGgudGFuKHkpLCBNYXRoLnRhbih4KSwgMSwgMCwgMCkpO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VG8oMSwgMCwgMCwgMSwgMCwgMCk7XG4gIH1cblxuICBwdWJsaWMgZXF1YWxzKG1hdHJpeDogTWF0cml4KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYSA9PT0gbWF0cml4LmEgJiYgdGhpcy5iID09PSBtYXRyaXguYiAmJiB0aGlzLmMgPT09IG1hdHJpeC5jICYmIHRoaXMuZCA9PT0gbWF0cml4LmQgJiYgdGhpcy50eCA9PT0gbWF0cml4LnR4ICYmIHRoaXMudHkgPT09IG1hdHJpeC50eTtcbiAgfVxufVxuIiwiaW1wb3J0IE1hdHJpeCBmcm9tICcuL21hdHJpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50IHtcbiAgcHVibGljIHg6IG51bWJlciA9IDA7XG4gIHB1YmxpYyB5OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cblxuICBwdWJsaWMgZGlzdGFuY2UocG9pbnQ6IFBvaW50KTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHBvaW50LnggLSB0aGlzLngsIDIpICsgTWF0aC5wb3cocG9pbnQueSAtIHRoaXMueSwgMikpO1xuICB9XG5cbiAgcHVibGljIHJvdGF0ZShyYWRpYW46IG51bWJlcik6IFBvaW50IHtcbiAgICBjb25zdCBtYXRyaXg6IE1hdHJpeCA9IG5ldyBNYXRyaXgoTWF0aC5jb3MocmFkaWFuKSwgTWF0aC5zaW4ocmFkaWFuKSwgLU1hdGguc2luKHJhZGlhbiksIE1hdGguY29zKHJhZGlhbikpO1xuICAgIGNvbnN0IHB4OiBudW1iZXIgPSAobWF0cml4LmEgKiB0aGlzLngpICsgKG1hdHJpeC5jICogdGhpcy55KTtcbiAgICBjb25zdCBweTogbnVtYmVyID0gKG1hdHJpeC5iICogdGhpcy54KSArIChtYXRyaXguZCAqIHRoaXMueSk7XG4gICAgcmV0dXJuIG5ldyBQb2ludChweCwgcHkpO1xuICB9XG5cbiAgcHVibGljIHNjYWxlKHNjYWxlWDogbnVtYmVyLCBzY2FsZVk6IG51bWJlcik6IFBvaW50IHtcbiAgICBjb25zdCBtYXRyaXg6IE1hdHJpeCA9IG5ldyBNYXRyaXgoc2NhbGVYLCAwLCAwLCBzY2FsZVkpO1xuICAgIGNvbnN0IHB4OiBudW1iZXIgPSAobWF0cml4LmEgKiB0aGlzLngpICsgKG1hdHJpeC5jICogdGhpcy55KTtcbiAgICBjb25zdCBweTogbnVtYmVyID0gKG1hdHJpeC5iICogdGhpcy54KSArIChtYXRyaXguZCAqIHRoaXMueSk7XG4gICAgcmV0dXJuIG5ldyBQb2ludChweCwgcHkpO1xuICB9XG5cbiAgcHVibGljIHRyYW5zbGF0ZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IFBvaW50IHtcbiAgICBjb25zdCBtYXRyaXg6IE1hdHJpeCA9IG5ldyBNYXRyaXgoMSwgMCwgMCwgMSwgeCwgeSk7XG4gICAgY29uc3QgcHg6IG51bWJlciA9IChtYXRyaXguYSAqIHRoaXMueCkgKyAobWF0cml4LmMgKiB0aGlzLnkpICsgbWF0cml4LnR4O1xuICAgIGNvbnN0IHB5OiBudW1iZXIgPSAobWF0cml4LmIgKiB0aGlzLngpICsgKG1hdHJpeC5kICogdGhpcy55KSArIG1hdHJpeC50eTtcbiAgICByZXR1cm4gbmV3IFBvaW50KHB4LCBweSk7XG4gIH1cblxuICBwdWJsaWMgc2tldyhza2V3WDogbnVtYmVyLCBza2V3WTogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IG1hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeCgxLCBNYXRoLnRhbihza2V3WCksIE1hdGgudGFuKHNrZXdZKSwgMSk7XG4gICAgY29uc3QgcHg6IG51bWJlciA9IChtYXRyaXguYSAqIHRoaXMueCkgKyAobWF0cml4LmMgKiB0aGlzLnkpO1xuICAgIGNvbnN0IHB5OiBudW1iZXIgPSAobWF0cml4LmIgKiB0aGlzLngpICsgKG1hdHJpeC5kICogdGhpcy55KTtcbiAgICByZXR1cm4gbmV3IFBvaW50KHB4LCBweSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb2ludCBmcm9tICcuL3BvaW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlIHtcblxuICBwcml2YXRlIF93aWR0aDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9sZWZ0VG9wOiBQb2ludCA9IG51bGw7XG4gIHByaXZhdGUgX3JpZ2h0VG9wOiBQb2ludCA9IG51bGw7XG4gIHByaXZhdGUgX2xlZnRCb3R0b206IFBvaW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfcmlnaHRCb3R0b206IFBvaW50ID0gbnVsbDtcblxuICBwdWJsaWMgZ2V0IHgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xlZnRUb3AueDsgfVxuICBwdWJsaWMgZ2V0IHkoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xlZnRUb3AueTsgfVxuICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl93aWR0aDsgfVxuICBwdWJsaWMgZ2V0IGhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faGVpZ2h0OyB9XG4gIHB1YmxpYyBnZXQgbGVmdCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdFRvcC54OyB9XG4gIHB1YmxpYyBnZXQgcmlnaHQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3JpZ2h0VG9wLng7IH1cbiAgcHVibGljIGdldCB0b3AoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xlZnRUb3AueTsgfVxuICBwdWJsaWMgZ2V0IGJvdHRvbSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdEJvdHRvbS55OyB9XG4gIHB1YmxpYyBnZXQgbGVmdFRvcCgpOiBQb2ludCB7IHJldHVybiB0aGlzLl9sZWZ0VG9wOyB9XG4gIHB1YmxpYyBnZXQgcmlnaHRUb3AoKTogUG9pbnQgeyByZXR1cm4gdGhpcy5fcmlnaHRUb3A7IH1cbiAgcHVibGljIGdldCBsZWZ0Qm90dG9tKCk6IFBvaW50IHsgcmV0dXJuIHRoaXMuX2xlZnRCb3R0b207IH1cbiAgcHVibGljIGdldCByaWdodEJvdHRvbSgpOiBQb2ludCB7IHJldHVybiB0aGlzLl9yaWdodEJvdHRvbTsgfVxuXG4gIHB1YmxpYyBzZXQgeCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbGVmdFRvcC54ID0gdmFsdWU7XG4gICAgdGhpcy5fbGVmdEJvdHRvbS54ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlUmlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgeSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fbGVmdFRvcC55ID0gdmFsdWU7XG4gICAgdGhpcy5fbGVmdEJvdHRvbS55ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlQm90dG9tKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZVJpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGhlaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlQm90dG9tKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGxlZnQodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMubGVmdFRvcC54ID0gdmFsdWU7XG4gICAgdGhpcy5sZWZ0Qm90dG9tLnggPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICB9XG5cbiAgcHVibGljIHNldCByaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5yaWdodFRvcC54ID0gdmFsdWU7XG4gICAgdGhpcy5yaWdodEJvdHRvbS54ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlV2lkdGgoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdG9wKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmxlZnRUb3AueSA9IHZhbHVlO1xuICAgIHRoaXMucmlnaHRUb3AueSA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCBib3R0b20odmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMubGVmdEJvdHRvbS55ID0gdmFsdWU7XG4gICAgdGhpcy5yaWdodEJvdHRvbS55ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGxlZnRUb3AocG9pbnQ6IFBvaW50KSB7XG4gICAgdGhpcy5fbGVmdFRvcCA9IHBvaW50O1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHJpZ2h0VG9wKHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMuX3JpZ2h0VG9wID0gcG9pbnQ7XG4gICAgdGhpcy5fdXBkYXRlV2lkdGgoKTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGVmdEJvdHRvbShwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLl9sZWZ0Qm90dG9tID0gcG9pbnQ7XG4gICAgdGhpcy5fdXBkYXRlV2lkdGgoKTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcmlnaHRCb3R0b20ocG9pbnQ6IFBvaW50KSB7XG4gICAgdGhpcy5fcmlnaHRCb3R0b20gPSBwb2ludDtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCwgd2lkdGg6IG51bWJlciA9IDAsIGhlaWdodDogbnVtYmVyID0gMCkge1xuICAgIHRoaXMuX2xlZnRUb3AgPSBuZXcgUG9pbnQoKTtcbiAgICB0aGlzLl9yaWdodFRvcCA9IG5ldyBQb2ludCgpO1xuICAgIHRoaXMuX2xlZnRCb3R0b20gPSBuZXcgUG9pbnQoKTtcbiAgICB0aGlzLl9yaWdodEJvdHRvbSA9IG5ldyBQb2ludCgpO1xuICAgIHRoaXMuc2V0VG8oeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBwdWJsaWMgY29udGFpbnMoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4geCA+PSB0aGlzLmxlZnQgJiYgeCA8PSB0aGlzLnJpZ2h0ICYmIHkgPD0gdGhpcy5ib3R0b20gJiYgeSA+PSB0aGlzLnRvcDtcbiAgfVxuXG4gIHB1YmxpYyBjb250YWluc1JlY3QocmVjdGFuZ2xlOiBSZWN0YW5nbGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gcmVjdGFuZ2xlLmxlZnQgPj0gdGhpcy5sZWZ0ICYmIHJlY3RhbmdsZS5yaWdodCA8PSB0aGlzLnJpZ2h0ICYmIHJlY3RhbmdsZS50b3AgPj0gdGhpcy50b3AgJiYgcmVjdGFuZ2xlLmJvdHRvbSA8PSB0aGlzLmJvdHRvbTtcbiAgfVxuXG4gIHB1YmxpYyBpbnRlcnNlY3RzKHJlY3RhbmdsZTogUmVjdGFuZ2xlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbnMocmVjdGFuZ2xlLmxlZnQgKyAxLCByZWN0YW5nbGUudG9wICsgMSkgfHwgdGhpcy5jb250YWlucyhyZWN0YW5nbGUubGVmdCArIDEsIHJlY3RhbmdsZS5ib3R0b20gLSAxKSB8fCB0aGlzLmNvbnRhaW5zKHJlY3RhbmdsZS5yaWdodCAtIDEsIHJlY3RhbmdsZS50b3AgKyAxKSB8fCB0aGlzLmNvbnRhaW5zKHJlY3RhbmdsZS5yaWdodCAtIDEsIHJlY3RhbmdsZS5ib3R0b20gLSAxKTtcbiAgfVxuXG4gIHB1YmxpYyBpbnRlcnNlY3Rpb24ocmVjdGFuZ2xlOiBSZWN0YW5nbGUpOiBSZWN0YW5nbGUge1xuICAgIGxldCByZXN1bHQ6IFJlY3RhbmdsZSA9IG51bGw7XG4gICAgaWYgKHRoaXMuaW50ZXJzZWN0cyhyZWN0YW5nbGUpKSB7XG4gICAgICByZXN1bHQgPSBuZXcgUmVjdGFuZ2xlKCk7XG4gICAgICByZXN1bHQubGVmdCA9IE1hdGgubWF4KHJlY3RhbmdsZS5sZWZ0LCB0aGlzLmxlZnQpO1xuICAgICAgcmVzdWx0LnJpZ2h0ID0gTWF0aC5taW4ocmVjdGFuZ2xlLnJpZ2h0LCB0aGlzLnJpZ2h0KTtcbiAgICAgIHJlc3VsdC50b3AgPSBNYXRoLm1heChyZWN0YW5nbGUudG9wLCB0aGlzLnRvcCk7XG4gICAgICByZXN1bHQuYm90dG9tID0gTWF0aC5taW4ocmVjdGFuZ2xlLmJvdHRvbSwgdGhpcy5ib3R0b20pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIGV4dGVuZHMocmVjdGFuZ2xlOiBSZWN0YW5nbGUpOiB2b2lkIHtcbiAgICBjb25zdCBsZWZ0OiBudW1iZXIgPSBNYXRoLm1pbih0aGlzLmxlZnQsIHJlY3RhbmdsZS5sZWZ0KTtcbiAgICBjb25zdCByaWdodDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5yaWdodCwgcmVjdGFuZ2xlLnJpZ2h0KTtcbiAgICBjb25zdCB0b3A6IG51bWJlciA9IE1hdGgubWluKHRoaXMudG9wLCByZWN0YW5nbGUudG9wKTtcbiAgICBjb25zdCBib3R0b206IG51bWJlciA9IE1hdGgubWF4KHRoaXMuYm90dG9tLCByZWN0YW5nbGUuYm90dG9tKTtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRzVmFsdWUoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGVmdDogbnVtYmVyID0gTWF0aC5taW4odGhpcy5sZWZ0LCB4KTtcbiAgICBjb25zdCByaWdodDogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5yaWdodCwgeCArIHdpZHRoKTtcbiAgICBjb25zdCB0b3A6IG51bWJlciA9IE1hdGgubWluKHRoaXMudG9wLCB5KTtcbiAgICBjb25zdCBib3R0b206IG51bWJlciA9IE1hdGgubWF4KHRoaXMuYm90dG9tLCB5ICsgaGVpZ2h0KTtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRzUG9pbnQocG9pbnQ6IFBvaW50KTogdm9pZCB7XG4gICAgdGhpcy5leHRlbmRzUG9zaXRpb24ocG9pbnQueCwgcG9pbnQueSk7XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kc1Bvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGVmdCA+PSB4KSB7XG4gICAgICB0aGlzLmxlZnQgPSB4O1xuICAgIH0gZWxzZSBpZiAodGhpcy5yaWdodCA8PSB4KSB7XG4gICAgICB0aGlzLnJpZ2h0ID0geDtcbiAgICB9XG4gICAgaWYgKHRoaXMudG9wID49IHkpIHtcbiAgICAgIHRoaXMudG9wID0geTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm90dG9tIDw9IHkpIHtcbiAgICAgIHRoaXMuYm90dG9tID0geTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0VG8oeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBjbG9uZSgpOiBSZWN0YW5nbGUge1xuICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHRoaXMubGVmdCwgdGhpcy50b3AsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFRvKDAsIDAsIDAsIDApO1xuICB9XG5cbiAgcHVibGljIGVxdWFscyhyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxlZnQgPT09IHJlY3RhbmdsZS5sZWZ0ICYmIHRoaXMudG9wID09PSByZWN0YW5nbGUudG9wICYmIHRoaXMucmlnaHQgPT09IHJlY3RhbmdsZS5yaWdodCAmJiB0aGlzLmJvdHRvbSA9PT0gcmVjdGFuZ2xlLmJvdHRvbSAmJiB0aGlzLndpZHRoID09PSByZWN0YW5nbGUud2lkdGggJiYgdGhpcy5oZWlnaHQgPT09IHJlY3RhbmdsZS5oZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVXaWR0aCgpOiB2b2lkIHtcbiAgICB0aGlzLl93aWR0aCA9IHRoaXMuX3JpZ2h0VG9wLnggLSB0aGlzLl9sZWZ0VG9wLng7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVIZWlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5faGVpZ2h0ID0gdGhpcy5fbGVmdEJvdHRvbS55IC0gdGhpcy5fbGVmdFRvcC55O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlUmlnaHQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmlnaHRCb3R0b20ueCA9IHRoaXMuX3JpZ2h0VG9wLnggPSB0aGlzLl9sZWZ0VG9wLnggKyB0aGlzLl93aWR0aDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUJvdHRvbSgpOiB2b2lkIHtcbiAgICB0aGlzLl9sZWZ0Qm90dG9tLnkgPSB0aGlzLl9yaWdodEJvdHRvbS55ID0gdGhpcy5fbGVmdFRvcC55ICsgdGhpcy5faGVpZ2h0O1xuICB9XG59XG4iLCJcbmltcG9ydCBTdGFnZSBmcm9tICcuL2Rpc3BsYXkvc3RhZ2UnO1xuaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9kaXNwbGF5L2Rpc3BsYXknO1xuaW1wb3J0IERpc3BsYXlDb250YWluZXIgZnJvbSAnLi9kaXNwbGF5L2Rpc3BsYXktY29udGFpbmVyJztcbmltcG9ydCBHcmFwaGljcyBmcm9tICcuL2Rpc3BsYXkvZ3JhcGhpY3MnO1xuaW1wb3J0IFNoYXBlIGZyb20gJy4vZGlzcGxheS9zaGFwZSc7XG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vZGlzcGxheS9zcHJpdGUnO1xuaW1wb3J0IFNwcml0ZVNoZWV0IGZyb20gJy4vZGlzcGxheS9zcHJpdGUtc2hlZXQnO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tICcuL2V2ZW50L2V2ZW50LWRpc3BhdGNoZXInO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQvZXZlbnQnO1xuaW1wb3J0IE1vdXNlRXZlbnQgZnJvbSAnLi9ldmVudC9tb3VzZS1ldmVudCc7XG5pbXBvcnQgTWF0cml4IGZyb20gJy4vZ2VvbS9tYXRyaXgnO1xuaW1wb3J0IFBvaW50IGZyb20gJy4vZ2VvbS9wb2ludCc7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4vZ2VvbS9yZWN0YW5nbGUnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuL3V0aWwvdGlja2VyJztcblxuY29uc3Qgc3RnID0ge1xuICBTdGFnZSxcbiAgRGlzcGxheSxcbiAgRGlzcGxheUNvbnRhaW5lcixcbiAgR3JhcGhpY3MsXG4gIFNoYXBlLFxuICBTcHJpdGUsXG4gIFNwcml0ZVNoZWV0LFxuICBFdmVudERpc3BhdGNoZXIsXG4gIEV2ZW50LFxuICBNb3VzZUV2ZW50LFxuICBNYXRyaXgsXG4gIFBvaW50LFxuICBSZWN0YW5nbGUsXG4gIFRpY2tlcixcbn07XG5cbih3aW5kb3cgYXMgYW55KS5zdGcgPSBzdGc7XG5cbmV4cG9ydCBkZWZhdWx0IHN0ZztcbiIsImltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGlzcGF0Y2hlcic7XG5cbmVudW0gVGlja2VyU3RhdGUge1xuICBSRUFEWSA9ICdyZWFkeScsXG4gIFJVTk5JTkcgPSAncnVubmluZycsXG59XG5cbmVudW0gVGlja2VyRXZlbnQge1xuICBUSUNLID0gJ3RpY2snLFxufVxuXG5jb25zdCBfb25lU2VjOiBudW1iZXIgPSAxMDAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWNrZXIgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVElDSzogVGlja2VyRXZlbnQgPSBUaWNrZXJFdmVudC5USUNLO1xuXG4gIHByaXZhdGUgX2ZwczogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfc3RhdGU6IFRpY2tlclN0YXRlID0gVGlja2VyU3RhdGUuUkVBRFk7XG4gIHByaXZhdGUgX3ByZXZUaW1lOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9pbnRlcm5hbFRpbWU6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGdldCBmcHMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2ZwczsgfVxuXG4gIHB1YmxpYyBzZXQgZnBzKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9mcHMgPSBNYXRoLm1heCh2YWx1ZSwgMSk7XG4gICAgLy8gVE9ETzog66Gc7KeBIO2ZleyduFxuICAgIGlmICh2YWx1ZSA+IDAgJiYgdmFsdWUgPCAxKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbFRpbWUgPSAoX29uZVNlYyAqIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW50ZXJuYWxUaW1lID0gKF9vbmVTZWMgLyB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZnBzID0gNDApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZnBzID0gZnBzO1xuICAgIHRoaXMuX3N0YXRlID0gVGlja2VyU3RhdGUuUkVBRFk7XG4gIH1cblxuICBwdWJsaWMgcnVuKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXRlID0gVGlja2VyU3RhdGUuUlVOTklORztcbiAgICB0aGlzLl9wcmV2VGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fcnVuKCkpO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGUgPSBUaWNrZXJTdGF0ZS5SRUFEWTtcbiAgfVxuXG4gIHByaXZhdGUgX3J1bigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IFRpY2tlclN0YXRlLlJFQURZKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IG5vdyA9ICtuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRlbHRhID0gbm93IC0gdGhpcy5fcHJldlRpbWU7XG4gICAgaWYgKGRlbHRhID49IHRoaXMuX2ludGVybmFsVGltZSkge1xuICAgICAgdGhpcy50cmlnZ2VyKFRpY2tlci5USUNLLCB7IGRlbHRhOiBkZWx0YSB9KTtcbiAgICAgIHRoaXMuX3ByZXZUaW1lID0gK25ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSBUaWNrZXJTdGF0ZS5SVU5OSU5HKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX3J1bigpKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=