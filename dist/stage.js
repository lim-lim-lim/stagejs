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
    Object.defineProperty(DisplayContainer.prototype, "bounds", {
        get: function () {
            this._updateBounds();
            return this._bounds;
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
        this.stage.changed = true;
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
    DisplayContainer.prototype._updateBounds = function () {
        var e_2, _a;
        var tempX = this.x;
        var tempY = this.y;
        this._bounds.reset();
        try {
            for (var _b = __values(this._children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                this._bounds.extends(child.bounds);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.x = tempX;
        this.y = tempY;
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
        get: function () { return this._bounds.x; },
        set: function (value) {
            if (this._bounds.left === value) {
                return;
            }
            this._bounds.x = value;
            this._changedDisplay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Display.prototype, "y", {
        get: function () { return this._bounds.y; },
        set: function (value) {
            if (this._bounds.top === value) {
                return;
            }
            this._bounds.y = value;
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
        this._addCommand(DrawCommandName.RECT, arguments);
    };
    Graphics.prototype.fillRect = function (x, y, width, height) {
        this._addCommand(DrawCommandName.FILL_RECT, arguments);
    };
    Graphics.prototype.strokeRect = function (x, y, width, height) {
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
        this._addCommand(DrawCommandName.MOVE_TO, arguments);
    };
    Graphics.prototype.lineTo = function (x, y) {
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
        if (args) {
            this._updateBounds.apply(this, __spread([name], args));
        }
        else {
            this._updateBounds(name);
        }
    };
    Graphics.prototype._updateBounds = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        switch (type) {
            case DrawCommandName.RECT:
            case DrawCommandName.FILL_RECT:
                this._bounds.extends(new (rectangle_1.default.bind.apply(rectangle_1.default, __spread([void 0], args)))());
                break;
            case DrawCommandName.STROKE_RECT:
                var lineWidth = this.lineWidth * 2;
                this._bounds.extends(new rectangle_1.default(args[0], args[1], args[2] + lineWidth, args[3] + lineWidth));
                break;
            case DrawCommandName.MOVE_TO:
                this._x = args[0];
                this._y = args[1];
                break;
            case DrawCommandName.LINE_TO:
                this._bounds.extendsPosition(this._x, this._y);
                this._bounds.extendsPosition(args[0], args[1]);
                this._x = args[0];
                this._y = args[1];
                break;
        }
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
    Object.defineProperty(Shape.prototype, "bounds", {
        get: function () {
            var bounds = this.graphics.bounds.clone();
            bounds.setTo(this.x, this.y, bounds.width * this.scaleX, bounds.height * this.scaleY);
            return bounds;
        },
        enumerable: true,
        configurable: true
    });
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
    function Stage(canvas, fps, renderOnly) {
        if (renderOnly === void 0) { renderOnly = true; }
        var _this = _super.call(this) || this;
        _this.changed = false;
        _this._canvas = null;
        _this._eventCanvas = null;
        _this._context = null;
        _this._eventContext = null;
        _this._ticker = null;
        _this._eventTargetMap = {};
        if (canvas instanceof HTMLCanvasElement) {
            _this._canvas = canvas;
        }
        else {
            _this._canvas = document.getElementById(canvas);
        }
        _this._context = _this._canvas.getContext('2d');
        _this._stage = _this;
        _this._bounds = new rectangle_1.default(0, 0, _this._canvas.width, _this._canvas.height);
        _this._initFPS(fps);
        if (!renderOnly) {
            _this._initEventCanvas();
            _this._initEvent();
            _this._initStageRegion();
        }
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
            // this._eventCanvas.width = this._eventCanvas.width;
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
    Stage.prototype._initStageRegion = function () {
        //
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS1jb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9ncmFwaGljcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zaGFwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zcHJpdGUtc2hlZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvc3ByaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9kaXNwbGF5L3N0YWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC1kaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQvbW91c2UtZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlb20vbWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3BvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3JlY3RhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvdGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNB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Q0FBQztTQUN2QjthQUFNO1lBQ0wsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDM0QsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQzVEO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTSx3QkFBTyxHQUFkO1FBQ1EsYUFBNkIsRUFBM0IsUUFBQyxFQUFF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akQ7SUFDSCxDQUFDO0lBL0NzQixXQUFJLEdBQWdCLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFnRDlELGFBQUM7Q0FBQSxDQWxEbUMsMEJBQWUsR0FrRGxEO2tCQWxEb0IsTUFBTSIsImZpbGUiOiJzdGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3N0YWdlJztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnZ2VvbS9yZWN0YW5nbGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXNwbGF5Q29udGFpbmVyIGV4dGVuZHMgRGlzcGxheSB7XG5cbiAgcHJpdmF0ZSBfY2hpbGRyZW46IERpc3BsYXlbXSA9IFtdO1xuXG4gIHB1YmxpYyBnZXQgY2hpbGRyZW4oKTogRGlzcGxheVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gIH1cblxuICBwdWJsaWMgZ2V0IGJvdW5kcygpOiBSZWN0YW5nbGUge1xuICAgIHRoaXMuX3VwZGF0ZUJvdW5kcygpO1xuICAgIHJldHVybiB0aGlzLl9ib3VuZHM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIGFkZENoaWxkKGNoaWxkOiBEaXNwbGF5KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgdGhpcy5fY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgY2hpbGQuc3RhZ2UgPSB0aGlzLnN0YWdlO1xuICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgdGhpcy5zdGFnZS5jaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGlsZC50cmlnZ2VyKFN0YWdlLkFERF9UT19TVEFHRSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQ2hpbGRBbGwoKTogdm9pZCB7XG4gICAgd2hpbGUgKHRoaXMuX2NoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLl9jaGlsZHJlblt0aGlzLl9jaGlsZHJlbi5sZW5ndGggLSAxXSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZUNoaWxkKGNoaWxkOiBEaXNwbGF5KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7IHJldHVybjsgfVxuICAgIGNoaWxkLnRyaWdnZXIoU3RhZ2UuUkVNT1ZFX1RPX1NUQUdFKTtcbiAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGNoaWxkLnN0YWdlID0gbnVsbDtcbiAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgIHRoaXMuc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgRGlzcGxheUNvbnRhaW5lcikge1xuICAgICAgKGNoaWxkIGFzIERpc3BsYXlDb250YWluZXIpLnJlbW92ZUNoaWxkQWxsKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZUNoaWxkQXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5nZXRDaGlsZEF0KGluZGV4KSk7XG4gICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnN0YWdlLmNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGdldENoaWxkQXQoaW5kZXg6IG51bWJlcik6IERpc3BsYXkge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbltpbmRleF07XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRGlzcGxheSgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRoaXMuX2NoaWxkcmVuKSB7XG4gICAgICBpZiAoY2hpbGQudmlzaWJsZSkge1xuICAgICAgICBjaGlsZC51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCb3VuZHMoKTogdm9pZCB7XG4gICAgY29uc3QgdGVtcFg6IG51bWJlciA9IHRoaXMueDtcbiAgICBjb25zdCB0ZW1wWTogbnVtYmVyID0gdGhpcy55O1xuICAgIHRoaXMuX2JvdW5kcy5yZXNldCgpO1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgdGhpcy5fY2hpbGRyZW4pIHtcbiAgICAgIHRoaXMuX2JvdW5kcy5leHRlbmRzKGNoaWxkLmJvdW5kcyk7XG4gICAgfVxuICAgIHRoaXMueCA9IHRlbXBYO1xuICAgIHRoaXMueSA9IHRlbXBZO1xuICB9XG59XG4iLCJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gJy4uL2V2ZW50L2V2ZW50LWRpc3BhdGNoZXInO1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuLi9nZW9tL21hdHJpeCc7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4uL2dlb20vcmVjdGFuZ2xlJztcbmltcG9ydCBEaXNwbGF5Q29udGFpbmVyIGZyb20gJy4vZGlzcGxheS1jb250YWluZXInO1xuaW1wb3J0IFN0YWdlIGZyb20gJy4vc3RhZ2UnO1xuXG4vLyBUT0RPOiDtjIzqtLTsnpAg6rWs7ZiEXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBEaXNwbGF5IGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcblxuICBwcm90ZWN0ZWQgX3N0YWdlOiBTdGFnZSA9IG51bGw7XG4gIHByb3RlY3RlZCBfcGFyZW50OiBEaXNwbGF5Q29udGFpbmVyID0gbnVsbDtcbiAgcHJvdGVjdGVkIF9ib3VuZHM6IFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcbiAgcHJvdGVjdGVkIF9jb21wdXRlZEJvdW5kczogUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xuICBwcm90ZWN0ZWQgX21hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeCgpO1xuICBwcm90ZWN0ZWQgX2NlbnRlclg6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfY2VudGVyWTogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9yb3RhdGU6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfd2lkdGg6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfaGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX3NjYWxlWDogbnVtYmVyID0gMTtcbiAgcHJvdGVjdGVkIF9zY2FsZVk6IG51bWJlciA9IDE7XG4gIHByb3RlY3RlZCBfc2tld1g6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfc2tld1k6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgcHVibGljIGdldCBzdGFnZSgpOiBTdGFnZSB7IHJldHVybiB0aGlzLl9zdGFnZTsgfVxuICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBEaXNwbGF5Q29udGFpbmVyIHsgcmV0dXJuIHRoaXMuX3BhcmVudDsgfVxuICBwdWJsaWMgZ2V0IHgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2JvdW5kcy54OyB9XG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYm91bmRzLnk7IH1cbiAgcHVibGljIGdldCBjZW50ZXJYKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jZW50ZXJYOyB9XG4gIHB1YmxpYyBnZXQgY2VudGVyWSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY2VudGVyWTsgfVxuICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9ib3VuZHMud2lkdGg7IH1cbiAgcHVibGljIGdldCBoZWlnaHQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2JvdW5kcy5oZWlnaHQ7IH1cbiAgcHVibGljIGdldCByb3RhdGUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3JvdGF0ZTsgfVxuICBwdWJsaWMgZ2V0IHNjYWxlWCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2NhbGVYOyB9XG4gIHB1YmxpYyBnZXQgc2NhbGVZKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zY2FsZVk7IH1cbiAgcHVibGljIGdldCBza2V3WCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2tld1g7IH1cbiAgcHVibGljIGdldCBza2V3WSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2tld1k7IH1cbiAgcHVibGljIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fdmlzaWJsZTsgfVxuICBwdWJsaWMgZ2V0IGJvdW5kcygpOiBSZWN0YW5nbGUgeyByZXR1cm4gdGhpcy5fYm91bmRzOyB9XG4gIHB1YmxpYyBnZXQgbWF0cml4KCk6IE1hdHJpeCB7IHJldHVybiB0aGlzLl9tYXRyaXg7IH1cblxuICBwdWJsaWMgZ2V0IGNvbXB1dGVkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuYm91bmRzO1xuICAgIGNvbnN0IHBvaW50cyA9IFtib3VuZHMubGVmdFRvcCwgYm91bmRzLnJpZ2h0VG9wLCBib3VuZHMubGVmdEJvdHRvbSwgYm91bmRzLnJpZ2h0Qm90dG9tXTtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBwb2ludHMpIHtcbiAgICAgIGl0ZW0ucm90YXRlKHRoaXMuX3JvdGF0ZSk7XG4gICAgICBpdGVtLnNrZXcodGhpcy5fc2tld1gsIHRoaXMuX3NrZXdZKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb21wdXRlZEJvdW5kcy5sZWZ0ID0gTWF0aC5taW4oYm91bmRzLmxlZnRUb3AueCwgYm91bmRzLnJpZ2h0VG9wLngsIGJvdW5kcy5sZWZ0Qm90dG9tLngsIGJvdW5kcy5yaWdodEJvdHRvbS54KTtcbiAgICB0aGlzLl9jb21wdXRlZEJvdW5kcy5yaWdodCA9IE1hdGgubWF4KGJvdW5kcy5sZWZ0VG9wLngsIGJvdW5kcy5yaWdodFRvcC54LCBib3VuZHMubGVmdEJvdHRvbS54LCBib3VuZHMucmlnaHRCb3R0b20ueCk7XG4gICAgdGhpcy5fY29tcHV0ZWRCb3VuZHMudG9wID0gTWF0aC5taW4oYm91bmRzLmxlZnRUb3AueSwgYm91bmRzLnJpZ2h0VG9wLnksIGJvdW5kcy5sZWZ0Qm90dG9tLnksIGJvdW5kcy5yaWdodEJvdHRvbS55KTtcbiAgICB0aGlzLl9jb21wdXRlZEJvdW5kcy5ib3R0b20gPSBNYXRoLm1heChib3VuZHMubGVmdFRvcC55LCBib3VuZHMucmlnaHRUb3AueSwgYm91bmRzLmxlZnRCb3R0b20ueSwgYm91bmRzLnJpZ2h0Qm90dG9tLnkpO1xuICAgIHJldHVybiB0aGlzLl9jb21wdXRlZEJvdW5kcztcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc3RhZ2Uoc3RhZ2U6IFN0YWdlKSB7XG4gICAgdGhpcy5fc3RhZ2UgPSBzdGFnZTtcbiAgICBpZiAodGhpcy5fc3RhZ2UpIHtcbiAgICAgIHRoaXMuX3N0YWdlLmNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgcGFyZW50KHBhcmVudDogRGlzcGxheUNvbnRhaW5lcikgeyB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7IH1cblxuICBwdWJsaWMgc2V0IHgodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9ib3VuZHMubGVmdCA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fYm91bmRzLnggPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCB5KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fYm91bmRzLnRvcCA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fYm91bmRzLnkgPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBjZW50ZXJYKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jZW50ZXJYID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IGNlbnRlclkodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2NlbnRlclkgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl93aWR0aCA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcbiAgICB0aGlzLl9ib3VuZHMud2lkdGggPSB2YWx1ZSAqIHRoaXMuX3NjYWxlWDtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBoZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmhlaWdodCA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IHZhbHVlICogdGhpcy5fc2NhbGVZO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHJvdGF0ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3JvdGF0ZSA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fcm90YXRlID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2NhbGVYKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2NhbGVYID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9zY2FsZVggPSB2YWx1ZTtcbiAgICB0aGlzLl9ib3VuZHMud2lkdGggPSB0aGlzLl93aWR0aCAqIHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNjYWxlWSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3NjYWxlWSA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2NhbGVZID0gdmFsdWU7XG4gICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IHRoaXMuX2hlaWdodCAqIHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNrZXdYKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2tld1ggPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NrZXdYID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2tld1kodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9za2V3WSA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2tld1kgPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCB2aXNpYmxlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX3Zpc2libGUgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm9uKFN0YWdlLkFERF9UT19TVEFHRSwgKCkgPT4gdGhpcy5zdGFnZS5yZWdpc3RlckV2ZW50TWFwKHRoaXMpKTtcbiAgICB0aGlzLm9uKFN0YWdlLlJFTU9WRV9UT19TVEFHRSwgKCkgPT4gdGhpcy5zdGFnZS51bnJlZ2lzdGVyRXZlbnRNYXAodGhpcykpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZURpc3BsYXkoY29udGV4dD86IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQ7XG5cbiAgcHVibGljIHVwZGF0ZVRyYW5zZm9ybWF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuX21hdHJpeC5yZXNldCgpO1xuICAgIGNvbnN0IG9mZnNldFggPSB0aGlzLnggKyAodGhpcy5fY2VudGVyWCAqIHRoaXMuX3NjYWxlWCk7XG4gICAgY29uc3Qgb2Zmc2V0WSA9IHRoaXMueSArICh0aGlzLl9jZW50ZXJZICogdGhpcy5fc2NhbGVZKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1UcmFuc2xhdGUob2Zmc2V0WCwgb2Zmc2V0WSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtUm90YXRlKHRoaXMuX3JvdGF0ZSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtVHJhbnNsYXRlKC1vZmZzZXRYLCAtb2Zmc2V0WSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtVHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcbiAgICB0aGlzLl90cmFuc2Zvcm1TY2FsZSh0aGlzLl9zY2FsZVgsIHRoaXMuX3NjYWxlWSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtU2tldyh0aGlzLl9za2V3WCwgdGhpcy5fc2tld1kpO1xuICAgIHRoaXMuc3RhZ2UuY29udGV4dC50cmFuc2Zvcm0odGhpcy5fbWF0cml4LmEsIHRoaXMuX21hdHJpeC5iLCB0aGlzLl9tYXRyaXguYywgdGhpcy5fbWF0cml4LmQsIHRoaXMuX21hdHJpeC50eCwgdGhpcy5fbWF0cml4LnR5KTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFnZS5jb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLnVwZGF0ZVRyYW5zZm9ybWF0aW9uKCk7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KHRoaXMuc3RhZ2UuY29udGV4dCk7XG4gICAgdGhpcy5zdGFnZS5jb250ZXh0LnJlc3RvcmUoKTtcbiAgICAvLyBUT0RPOiBldmVudGNvbnRleHQg7IiY7KCVXG4gICAgLy8gdGhpcy5zdGFnZS5ldmVudENvbnRleHQuZHJhd0ltYWdlKHRoaXMuc3RhZ2UudGVtcENhbnZhcywgMCwgMCk7XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1UcmFuc2xhdGUoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIHRoaXMuX21hdHJpeC50cmFuc2xhdGUoeCwgeSk7XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1Sb3RhdGUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX21hdHJpeC5yb3RhdGUodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtU2NhbGUoeDogbnVtYmVyID0gMSwgeTogbnVtYmVyID0gMSk6IHZvaWQge1xuICAgIHRoaXMuX21hdHJpeC5zY2FsZSh4LCB5KTtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybVNrZXcoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIHRoaXMuX21hdHJpeC5za2V3KHgsIHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hhbmdlZERpc3BsYXkoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnN0YWdlKSB7IHJldHVybjsgfVxuICAgIGlmICghdGhpcy5zdGFnZS5jaGFuZ2VkKSB7XG4gICAgICB0aGlzLnN0YWdlLmNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuLi9nZW9tL3JlY3RhbmdsZSc7XG5cbmV4cG9ydCBlbnVtIExpbmVDYXAge1xuICBCVVRUID0gJ2J1dHQnLFxuICBST1VORCA9ICdyb3VuZCcsXG4gIFNRVUFSRSA9ICdzcXVhcmUnLFxufVxuXG5leHBvcnQgZW51bSBMaW5lSm9pbiB7XG4gIFJPVU5UID0gJ3JvdW5kJyxcbiAgQkVWRUwgPSAnYmV2ZWwnLFxuICBNSVRFUiA9ICdtaXRlcicsXG59XG5cbmVudW0gRHJhd0NvbW1hbmROYW1lIHtcbiAgUkVDVCA9ICdyZWN0JyxcbiAgRklMTF9SRUNUID0gJ2ZpbGxSZWN0JyxcbiAgU1RST0tFX1JFQ1QgPSAnc3Ryb2tlUmVjdCcsXG4gIENMRUFSX1JFQ1QgPSAnY2xlYXJSZWN0JyxcbiAgQkVHSU5fUEFUSCA9ICdiZWdpblBhdGgnLFxuICBDTE9TRV9QQVRIID0gJ2Nsb3NlUGF0aCcsXG4gIE1PVkVfVE8gPSAnbW92ZVRvJyxcbiAgTElORV9UTyA9ICdsaW5lVG8nLFxuICBBUkMgPSAnYXJjJyxcbiAgQVJDX1RPID0gJ2FyY1RvJyxcbiAgUVVBRFJBVElDX0NVUlZFX1RPID0gJ3F1YWRyYXRpY0N1cnZlVG8nLFxuICBCRVpJRVJfQ1VSVkVfVE8gPSAnYmV6aWVyQ3VydmVUbycsXG4gIEZJTEwgPSAnZmlsbCcsXG4gIFNUUk9LRSA9ICdzdHJva2UnLFxufVxuXG5pbnRlcmZhY2UgRHJhd0NvbW1hbmQge1xuICBuYW1lOiBEcmF3Q29tbWFuZE5hbWU7XG4gIGFyZ3VtZW50czogYW55O1xuICBmaWxsU3R5bGU6IHN0cmluZztcbiAgc3Ryb2tlU3R5bGU6IHN0cmluZztcbiAgbGluZVdpZHRoOiBudW1iZXI7XG4gIGxpbmVDYXA6IExpbmVDYXA7XG4gIGxpbmVKb2luOiBMaW5lSm9pbjtcbiAgbWl0ZXJMaW1pdDogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaGljcyB7XG4gIHB1YmxpYyBmaWxsU3R5bGU6IHN0cmluZyA9IG51bGw7XG4gIHB1YmxpYyBzdHJva2VTdHlsZTogc3RyaW5nID0gbnVsbDtcbiAgcHVibGljIGxpbmVXaWR0aDogbnVtYmVyID0gMDtcbiAgcHVibGljIGxpbmVDYXA6IExpbmVDYXAgPSBMaW5lQ2FwLkJVVFQ7XG4gIHB1YmxpYyBsaW5lSm9pbjogTGluZUpvaW4gPSBMaW5lSm9pbi5NSVRFUjtcbiAgcHVibGljIG1pdGVyTGltaXQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NvbW1hbmRzOiBTZXQ8RHJhd0NvbW1hbmQ+ID0gbmV3IFNldCgpO1xuICBwcml2YXRlIF94OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF95OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9ib3VuZHM6IFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcblxuICBwdWJsaWMgZ2V0IGNvbW1hbmRzKCk6IFNldDxEcmF3Q29tbWFuZD4geyByZXR1cm4gdGhpcy5fY29tbWFuZHM7IH1cbiAgcHVibGljIGdldCBjb21tYW5kTGlzdCgpOiBJdGVyYWJsZUl0ZXJhdG9yPERyYXdDb21tYW5kPiB7IHJldHVybiB0aGlzLl9jb21tYW5kcy52YWx1ZXMoKTsgfVxuICBwdWJsaWMgZ2V0IGJvdW5kcygpOiBSZWN0YW5nbGUgeyByZXR1cm4gdGhpcy5fYm91bmRzOyB9XG5cbiAgcHVibGljIHJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuUkVDVCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWxsUmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5GSUxMX1JFQ1QsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgc3Ryb2tlUmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5TVFJPS0VfUkVDVCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQ0xFQVJfUkVDVCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBiZWdpblBhdGgoKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQkVHSU5fUEFUSCk7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VQYXRoKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkNMT1NFX1BBVEgpO1xuICB9XG5cbiAgcHVibGljIG1vdmVUbyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLk1PVkVfVE8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgbGluZVRvKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuTElORV9UTywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmMoeDogbnVtYmVyLCB5OiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBzdGFydEFuZ2xlOiBudW1iZXIsIGVuZEFuZ2xlOiBudW1iZXIsIGFudGljbG9ja3dpc2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkFSQywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNUbyh4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB4MjogbnVtYmVyLCB5MjogbnVtYmVyLCByYWRpdXM6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkFSQ19UTywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBxdWFkcmF0aWNDdXJ2ZVRvKGNwMXg6IG51bWJlciwgY3AxeTogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLlFVQURSQVRJQ19DVVJWRV9UTywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBiZXppZXJDdXJ2ZVRvKGNwMXg6IG51bWJlciwgY3AxeTogbnVtYmVyLCBjcDJ4OiBudW1iZXIsIGNwMnk6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5CRVpJRVJfQ1VSVkVfVE8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgZmlsbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5GSUxMKTtcbiAgfVxuXG4gIHB1YmxpYyBzdHJva2UoKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuU1RST0tFKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kcy5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkQ29tbWFuZChuYW1lOiBEcmF3Q29tbWFuZE5hbWUsIGFyZ3M/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kcy5hZGQoe1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGFyZ3VtZW50czogYXJncyxcbiAgICAgIGZpbGxTdHlsZTogdGhpcy5maWxsU3R5bGUsXG4gICAgICBzdHJva2VTdHlsZTogdGhpcy5zdHJva2VTdHlsZSxcbiAgICAgIGxpbmVXaWR0aDogdGhpcy5saW5lV2lkdGgsXG4gICAgICBsaW5lQ2FwOiB0aGlzLmxpbmVDYXAsXG4gICAgICBsaW5lSm9pbjogdGhpcy5saW5lSm9pbixcbiAgICAgIG1pdGVyTGltaXQ6IHRoaXMubWl0ZXJMaW1pdCxcbiAgICB9KTtcbiAgICBpZiAoYXJncykge1xuICAgICAgdGhpcy5fdXBkYXRlQm91bmRzKG5hbWUsIC4uLmFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl91cGRhdGVCb3VuZHMobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQm91bmRzKHR5cGU6IERyYXdDb21tYW5kTmFtZSwgLi4uYXJnczogYW55W10pOiB2b2lkIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRHJhd0NvbW1hbmROYW1lLlJFQ1Q6XG4gICAgICBjYXNlIERyYXdDb21tYW5kTmFtZS5GSUxMX1JFQ1Q6XG4gICAgICAgIHRoaXMuX2JvdW5kcy5leHRlbmRzKG5ldyBSZWN0YW5nbGUoLi4uYXJncykpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRHJhd0NvbW1hbmROYW1lLlNUUk9LRV9SRUNUOlxuICAgICAgICBjb25zdCBsaW5lV2lkdGg6IG51bWJlciA9IHRoaXMubGluZVdpZHRoICogMjtcbiAgICAgICAgdGhpcy5fYm91bmRzLmV4dGVuZHMobmV3IFJlY3RhbmdsZShhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdICsgbGluZVdpZHRoLCBhcmdzWzNdICsgbGluZVdpZHRoKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEcmF3Q29tbWFuZE5hbWUuTU9WRV9UTzpcbiAgICAgICAgdGhpcy5feCA9IGFyZ3NbMF07XG4gICAgICAgIHRoaXMuX3kgPSBhcmdzWzFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRHJhd0NvbW1hbmROYW1lLkxJTkVfVE86XG4gICAgICAgIHRoaXMuX2JvdW5kcy5leHRlbmRzUG9zaXRpb24odGhpcy5feCwgdGhpcy5feSk7XG4gICAgICAgIHRoaXMuX2JvdW5kcy5leHRlbmRzUG9zaXRpb24oYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgIHRoaXMuX3ggPSBhcmdzWzBdO1xuICAgICAgICB0aGlzLl95ID0gYXJnc1sxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gIH1cbn1cbiIsImltcG9ydCBEaXNwbGF5IGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgR3JhcGhpY3MgZnJvbSAnLi9ncmFwaGljcyc7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJ2dlb20vcmVjdGFuZ2xlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcGUgZXh0ZW5kcyBEaXNwbGF5IHtcbiAgcHVibGljIGdyYXBoaWNzOiBHcmFwaGljcyA9IG51bGw7XG5cbiAgcHVibGljIGdldCBib3VuZHMoKTogUmVjdGFuZ2xlIHtcbiAgICBjb25zdCBib3VuZHM6IFJlY3RhbmdsZSA9IHRoaXMuZ3JhcGhpY3MuYm91bmRzLmNsb25lKCk7XG4gICAgYm91bmRzLnNldFRvKHRoaXMueCwgdGhpcy55LCBib3VuZHMud2lkdGggKiB0aGlzLnNjYWxlWCwgYm91bmRzLmhlaWdodCAqIHRoaXMuc2NhbGVZKTtcbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZ3JhcGhpY3M6IEdyYXBoaWNzKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmdyYXBoaWNzID0gZ3JhcGhpY3MgfHwgbmV3IEdyYXBoaWNzKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRGlzcGxheShjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGNvbW1hbmQgb2YgdGhpcy5ncmFwaGljcy5jb21tYW5kTGlzdCkge1xuICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBjb21tYW5kLmZpbGxTdHlsZTtcbiAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb21tYW5kLnN0cm9rZVN0eWxlO1xuICAgICAgY29udGV4dC5saW5lV2lkdGggPSBjb21tYW5kLmxpbmVXaWR0aDtcbiAgICAgIGNvbnRleHQubGluZUNhcCA9IGNvbW1hbmQubGluZUNhcDtcbiAgICAgIGNvbnRleHQubGluZUpvaW4gPSBjb21tYW5kLmxpbmVKb2luO1xuICAgICAgY29udGV4dC5taXRlckxpbWl0ID0gY29tbWFuZC5taXRlckxpbWl0O1xuICAgICAgaWYgKGNvbW1hbmQuYXJndW1lbnRzKSB7XG4gICAgICAgIChjb250ZXh0IGFzIGFueSlbY29tbWFuZC5uYW1lXSguLi5jb21tYW5kLmFyZ3VtZW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAoY29udGV4dCBhcyBhbnkpW2NvbW1hbmQubmFtZV0oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGlzcGF0Y2hlcic7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4uL2dlb20vcmVjdGFuZ2xlJztcblxuZXhwb3J0IGVudW0gU3ByaXRlU2hlZXRFdmVudCB7XG4gIExPQUQgPSAnbG9hZCcsXG4gIEVORCA9ICdlbmQnLFxufVxuXG5pbnRlcmZhY2UgRnJhbWUge1xuICBbaW5kZXg6IHN0cmluZ106IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlU2hlZXQgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTE9BRDogU3ByaXRlU2hlZXRFdmVudCA9IFNwcml0ZVNoZWV0RXZlbnQuTE9BRDtcblxuICBwcml2YXRlIF9pbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG51bGw7XG4gIHByaXZhdGUgX2NlbGxXaWR0aDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfY2VsbEhlaWdodDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfZnJhbWVzOiBGcmFtZVtdID0gbnVsbDtcbiAgcHJpdmF0ZSBfZnJhbWVJbmRleDogbnVtYmVyID0gLTE7XG4gIHByaXZhdGUgX2N1cnJlbnRCb3VuZHM6IFJlY3RhbmdsZSA9IG51bGw7XG4gIHByaXZhdGUgX2xvb3A6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgZ2V0IGltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQgeyByZXR1cm4gdGhpcy5faW1hZ2U7IH1cbiAgcHVibGljIGdldCBjZWxsV2lkdGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2NlbGxXaWR0aDsgfVxuICBwdWJsaWMgZ2V0IGNlbGxIZWlnaHQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2NlbGxIZWlnaHQ7IH1cbiAgcHVibGljIGdldCBjdXJyZW50Qm91bmRzKCkgeyByZXR1cm4gdGhpcy5fY3VycmVudEJvdW5kczsgfVxuXG4gIGNvbnN0cnVjdG9yKGltZzogSFRNTEltYWdlRWxlbWVudCB8IHN0cmluZywgY2VsbFdpZHRoOiBudW1iZXIsIGNlbGxIZWlnaHQ6IG51bWJlciwgZnJhbWVzOiBGcmFtZVtdLCBsb29wOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKGltZyBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2ltYWdlID0gaW1nO1xuICAgICAgdGhpcy50cmlnZ2VyKFNwcml0ZVNoZWV0LkxPQUQpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGltZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICB0aGlzLl9pbWFnZS5zcmMgPSBpbWc7XG4gICAgICB0aGlzLl9pbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4gdGhpcy50cmlnZ2VyKFNwcml0ZVNoZWV0LkxPQUQpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jZWxsV2lkdGggPSBjZWxsV2lkdGg7XG4gICAgdGhpcy5fY2VsbEhlaWdodCA9IGNlbGxIZWlnaHQ7XG4gICAgdGhpcy5fZnJhbWVzID0gZnJhbWVzO1xuICAgIHRoaXMuX2ZyYW1lSW5kZXggPSAtMTtcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzID0gbmV3IFJlY3RhbmdsZSgwLCAwLCBjZWxsV2lkdGgsIGNlbGxIZWlnaHQpO1xuICAgIHRoaXMuX2xvb3AgPSBsb29wO1xuICB9XG5cbiAgcHVibGljIG5leHQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ZyYW1lSW5kZXggKyAxIDw9IHRoaXMuX2ZyYW1lcy5sZW5ndGggLSAxKSB7XG4gICAgICB0aGlzLl9mcmFtZUluZGV4Kys7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9sb29wKSB7XG4gICAgICAgIHRoaXMuX2ZyYW1lSW5kZXggPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKFNwcml0ZVNoZWV0RXZlbnQuRU5EKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlQm91bmRzKCk7XG4gIH1cblxuICBwdWJsaWMgcHJldigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZnJhbWVJbmRleCAtIDEgPiAwKSB7XG4gICAgICB0aGlzLl9mcmFtZUluZGV4LS07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9sb29wKSB7XG4gICAgICAgIHRoaXMuX2ZyYW1lSW5kZXggPSB0aGlzLl9mcmFtZXMubGVuZ3RoIC0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcihTcHJpdGVTaGVldEV2ZW50LkVORCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZUJvdW5kcygpO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX2ZyYW1lSW5kZXggPSAtMTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUJvdW5kcygpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50RnJhbWUgPSB0aGlzLl9mcmFtZXNbdGhpcy5fZnJhbWVJbmRleF07XG4gICAgdGhpcy5fY3VycmVudEJvdW5kcy54ID0gY3VycmVudEZyYW1lWzBdICogdGhpcy5fY2VsbFdpZHRoO1xuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMueSA9IGN1cnJlbnRGcmFtZVsxXSAqIHRoaXMuX2NlbGxIZWlnaHQ7XG4gIH1cbn1cbiIsImltcG9ydCBEaXNwbGF5IGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgU3ByaXRlU2hlZXQsIHsgU3ByaXRlU2hlZXRFdmVudCB9IGZyb20gJy4vc3ByaXRlLXNoZWV0JztcbmltcG9ydCBUaWNrZXIgZnJvbSAnLi4vdXRpbC90aWNrZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGUgZXh0ZW5kcyBEaXNwbGF5IHtcbiAgcHJpdmF0ZSBfc3ByaXRlU2hlZXQ6IFNwcml0ZVNoZWV0ID0gbnVsbDtcbiAgcHJpdmF0ZSBfZnBzOiBudW1iZXIgPSAxMDtcbiAgcHJpdmF0ZSBfdGlja2VyOiBUaWNrZXIgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHNwcml0ZVNoZWV0OiBTcHJpdGVTaGVldCwgZnBzOiBudW1iZXIgPSAxMCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fc3ByaXRlU2hlZXQgPSBzcHJpdGVTaGVldDtcbiAgICB0aGlzLl9mcHMgPSBmcHM7XG4gICAgdGhpcy5fdGlja2VyID0gbmV3IFRpY2tlcihmcHMpO1xuICAgIHRoaXMuX3RpY2tlci5vbihUaWNrZXIuVElDSywgKCkgPT4gdGhpcy5fdGlja2VySGFuZGxlcigpKTtcbiAgICB0aGlzLl9zcHJpdGVTaGVldC5vbihTcHJpdGVTaGVldEV2ZW50LkVORCwgKCkgPT4gdGhpcy5zdG9wKCkpO1xuICB9XG5cbiAgcHVibGljIGdldCBzcHJpdGVTaGVldCgpOiBTcHJpdGVTaGVldCB7IHJldHVybiB0aGlzLl9zcHJpdGVTaGVldDsgfVxuICBwdWJsaWMgZ2V0IGZwcygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZnBzOyB9XG5cbiAgcHVibGljIHNldCBzcHJpdGVTaGVldChzcHJpdGVTaGVldDogU3ByaXRlU2hlZXQpIHtcbiAgICB0aGlzLl9zcHJpdGVTaGVldCA9IHNwcml0ZVNoZWV0O1xuICAgIHRoaXMuX2JvdW5kcy53aWR0aCA9IHNwcml0ZVNoZWV0LmNlbGxXaWR0aDtcbiAgICB0aGlzLl9ib3VuZHMuaGVpZ2h0ID0gc3ByaXRlU2hlZXQuY2VsbEhlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgZnBzKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9mcHMgPSB2YWx1ZTtcbiAgICB0aGlzLl90aWNrZXIuZnBzID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgcGxheSgpOiB2b2lkIHtcbiAgICB0aGlzLl90aWNrZXJIYW5kbGVyKCk7XG4gICAgdGhpcy5fdGlja2VyLnJ1bigpO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0LnJlc2V0KCk7XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLl90aWNrZXIuc3RvcCgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZURpc3BsYXkoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5fc3ByaXRlU2hlZXQuY3VycmVudEJvdW5kcztcbiAgICBjb250ZXh0LmRyYXdJbWFnZShcbiAgICAgIHRoaXMuX3Nwcml0ZVNoZWV0LmltYWdlLFxuICAgICAgYm91bmRzLmxlZnQsXG4gICAgICBib3VuZHMudG9wLFxuICAgICAgYm91bmRzLndpZHRoLFxuICAgICAgYm91bmRzLmhlaWdodCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgYm91bmRzLndpZHRoLFxuICAgICAgYm91bmRzLmhlaWdodCxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGlja2VySGFuZGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9zcHJpdGVTaGVldC5uZXh0KCk7XG4gICAgdGhpcy5zdGFnZS5jaGFuZ2VkID0gdHJ1ZTtcbiAgICB0aGlzLnN0YWdlLnVwZGF0ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgRGlzcGxheUNvbnRhaW5lciBmcm9tICcuL2Rpc3BsYXktY29udGFpbmVyJztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vZ2VvbS9yZWN0YW5nbGUnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuLi91dGlsL3RpY2tlcic7XG5pbXBvcnQgRGlzcGxheSBmcm9tICcuL2Rpc3BsYXknO1xuaW1wb3J0IE1vdXNlRXZlbnQgZnJvbSAnLi4vZXZlbnQvbW91c2UtZXZlbnQnO1xuXG5lbnVtIFN0YWdlRXZlbnRUeXBlIHtcbiAgQUREX1RPX1NUQUdFID0gJ2FkZFRvU3RhZ2UnLFxuICBSRU1PVkVfVE9fU1RBR0UgPSAncmVtb3ZlVG9TdGFnZScsXG4gIEVOVEVSX0ZSQU1FID0gJ2VudGVyRnJhbWUnLFxufVxuXG5pbnRlcmZhY2UgRXZlbnRUYXJnZXRNYXAge1xuICBbcHJvcDogc3RyaW5nXTogRGlzcGxheVtdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZSBleHRlbmRzIERpc3BsYXlDb250YWluZXIge1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQUREX1RPX1NUQUdFOiBTdGFnZUV2ZW50VHlwZSA9IFN0YWdlRXZlbnRUeXBlLkFERF9UT19TVEFHRTtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBSRU1PVkVfVE9fU1RBR0U6IFN0YWdlRXZlbnRUeXBlID0gU3RhZ2VFdmVudFR5cGUuUkVNT1ZFX1RPX1NUQUdFO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVOVEVSX0ZSQU1FOiBTdGFnZUV2ZW50VHlwZSA9IFN0YWdlRXZlbnRUeXBlLkVOVEVSX0ZSQU1FO1xuXG4gIHB1YmxpYyBjaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBudWxsO1xuICBwcml2YXRlIF9ldmVudENhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBudWxsO1xuICBwcml2YXRlIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBudWxsO1xuICBwcml2YXRlIF9ldmVudENvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IG51bGw7XG4gIHByaXZhdGUgX3RpY2tlcjogVGlja2VyID0gbnVsbDtcbiAgcHJpdmF0ZSBfZXZlbnRUYXJnZXRNYXA6IEV2ZW50VGFyZ2V0TWFwID0ge307XG5cbiAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCB8IHN0cmluZywgZnBzOiBudW1iZXIsIHJlbmRlck9ubHk6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoY2FudmFzIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB9XG5cbiAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5fc3RhZ2UgPSB0aGlzO1xuICAgIHRoaXMuX2JvdW5kcyA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLl9pbml0RlBTKGZwcyk7XG5cbiAgICBpZiAoIXJlbmRlck9ubHkpIHtcbiAgICAgIHRoaXMuX2luaXRFdmVudENhbnZhcygpO1xuICAgICAgdGhpcy5faW5pdEV2ZW50KCk7XG4gICAgICB0aGlzLl9pbml0U3RhZ2VSZWdpb24oKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7IHJldHVybiB0aGlzLl9jYW52YXM7IH1cbiAgcHVibGljIGdldCBldmVudENhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7IHJldHVybiB0aGlzLl9ldmVudENhbnZhczsgfVxuICBwdWJsaWMgZ2V0IGNvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHsgcmV0dXJuIHRoaXMuX2NvbnRleHQ7IH1cbiAgcHVibGljIGdldCBldmVudENvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHsgcmV0dXJuIHRoaXMuX2V2ZW50Q29udGV4dDsgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hhbmdlZCkge1xuICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fY2FudmFzLndpZHRoO1xuICAgICAgLy8gdGhpcy5fZXZlbnRDYW52YXMud2lkdGggPSB0aGlzLl9ldmVudENhbnZhcy53aWR0aDtcbiAgICAgIHN1cGVyLnVwZGF0ZSgpO1xuICAgICAgdGhpcy5jaGFuZ2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyRXZlbnRNYXAoZGlzcGxheTogRGlzcGxheSk6IHZvaWQge1xuICAgIGNvbnN0IGNoaWxkRXZlbnRNYXAgPSBkaXNwbGF5LmV2ZW50TWFwO1xuICAgIGZvciAoY29uc3QgdHlwZSBpbiBjaGlsZEV2ZW50TWFwKSB7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdID0gW107XG4gICAgICB9XG4gICAgICB0aGlzLl9ldmVudFRhcmdldE1hcFt0eXBlXS5wdXNoKGRpc3BsYXkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1bnJlZ2lzdGVyRXZlbnRNYXAoZGlzcGxheTogRGlzcGxheSkge1xuICAgIGNvbnN0IGNoaWxkRXZlbnRNYXAgPSBkaXNwbGF5LmV2ZW50TWFwO1xuICAgIGZvciAoY29uc3QgdHlwZSBpbiBjaGlsZEV2ZW50TWFwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdLmluZGV4T2YoZGlzcGxheSk7XG4gICAgICB0aGlzLl9ldmVudFRhcmdldE1hcFt0eXBlXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGUFMoZnBzOiBudW1iZXIpIHtcbiAgICBpZiAoZnBzKSB7XG4gICAgICB0aGlzLl90aWNrZXIgPSBuZXcgVGlja2VyKGZwcyk7XG4gICAgICB0aGlzLl90aWNrZXIub24oVGlja2VyLlRJQ0ssIChkZWx0YSkgPT4ge1xuICAgICAgICB0aGlzLnRyaWdnZXIoU3RhZ2UuRU5URVJfRlJBTUUsIGRlbHRhKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fdGlja2VyLnJ1bigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRFdmVudENhbnZhcygpIHtcbiAgICB0aGlzLl9ldmVudENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuX2V2ZW50Q2FudmFzLndpZHRoID0gdGhpcy5fY2FudmFzLndpZHRoO1xuICAgIHRoaXMuX2V2ZW50Q2FudmFzLmhlaWdodCA9IHRoaXMuX2NhbnZhcy5oZWlnaHQ7XG4gICAgdGhpcy5fZXZlbnRDb250ZXh0ID0gdGhpcy5fZXZlbnRDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAvLyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCB0aGlzLl9ldmVudENhbnZhcyApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEV2ZW50KCkge1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLl9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgLy8gdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgLy8gICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgaWYgKCF0aGlzLl9ldmVudFRhcmdldE1hcFtNb3VzZUV2ZW50LkNMSUNLXSB8fCAhdGhpcy5fZXZlbnRUYXJnZXRNYXBbTW91c2VFdmVudC5DTElDS10ubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgIC8vICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgLy8gICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgIC8vICAgY29uc3QgY29sb3IgPSB0aGlzLl9ldmVudENvbnRleHQuZ2V0SW1hZ2VEYXRhKHgsIHksIDEsIDEpO1xuICAgIC8vICAgY29uc3QgciA9IGNvbG9yLmRhdGFbMF0udG9TdHJpbmcoMTYpO1xuICAgIC8vICAgY29uc3QgZyA9IGNvbG9yLmRhdGFbMV0udG9TdHJpbmcoMTYpO1xuICAgIC8vICAgY29uc3QgYiA9IGNvbG9yLmRhdGFbMl0udG9TdHJpbmcoMTYpO1xuICAgIC8vICAgY29uc3QgY29sb3JLZXkgPSAnMCcucmVwZWF0KDIgLSByLmxlbmd0aCkgKyByICsgJzAnLnJlcGVhdCgyIC0gZy5sZW5ndGgpICsgZyArICcwJy5yZXBlYXQoMiAtIGIubGVuZ3RoKSArIGI7XG4gICAgLy8gICBmb3IgKGxldCBpID0gdGhpcy5fZXZlbnRUYXJnZXRNYXBbTW91c2VFdmVudC5DTElDS10ubGVuZ3RoIC0gMSwgY291bnQgPSAwOyBpID49IGNvdW50OyBpIC09IDEpIHtcbiAgICAvLyAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2V2ZW50VGFyZ2V0TWFwW01vdXNlRXZlbnQuQ0xJQ0tdW2ldO1xuICAgIC8vICAgICBpZiAoY29sb3JLZXkgPT09IGl0ZW0uY29sb3JLZXkpIHtcbiAgICAvLyAgICAgICAvLyBUT0RPOnRhcmdldCAvIGN1cnJlbnRUYXJnZXQg6rWs67aEXG4gICAgLy8gICAgICAgaXRlbS50cmlnZ2VyKE1vdXNlRXZlbnQuQ0xJQ0ssIG5ldyBNb3VzZUV2ZW50KE1vdXNlRXZlbnQuQ0xJQ0ssIHt9LCBpdGVtLCBpdGVtKSk7XG4gICAgLy8gICAgICAgYnJlYWs7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTdGFnZVJlZ2lvbigpOiB2b2lkIHtcbiAgICAvL1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdGFnZVJlZ2lvbiB7XG5cbiAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2hlaWdodDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfcm93OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9jb2w6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX21hcDogYW55ID0ge307XG4gIHByaXZhdGUgX2Rpc3BsYXlMaXN0OiBEaXNwbGF5W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY29sOiBudW1iZXIsIHJvdzogbnVtYmVyKSB7XG4gICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5fY29sID0gY29sO1xuICAgIHRoaXMuX3JvdyA9IHJvdztcbiAgfVxuXG4gIHB1YmxpYyBhZGQoZGlzcGxheTogRGlzcGxheSk6IHZvaWQge1xuICAgIC8vIC4uXG4gIH1cbn1cbiIsIlxuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuXG50eXBlIEV2ZW50SGFuZGxlciA9IChldmVudDogRXZlbnQsIGRhdGE6IGFueSkgPT4gdm9pZDtcblxuaW50ZXJmYWNlIEV2ZW50TWFwIHtcbiAgW3Byb3A6IHN0cmluZ106IEV2ZW50SGFuZGxlcltdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBwcml2YXRlIF9ldmVudE1hcDogRXZlbnRNYXAgPSB7fTtcblxuICBwdWJsaWMgZ2V0IGV2ZW50TWFwKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50TWFwO1xuICB9XG5cbiAgcHVibGljIG9uKHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRIYW5kbGVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgdGhpcy5fZXZlbnRNYXBbdHlwZV0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRNYXBbdHlwZV0ucHVzaChoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBvZmYodHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudEhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlcikge1xuICAgICAgaWYgKHRoaXMuX2V2ZW50TWFwW3R5cGVdKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZXZlbnRNYXBbdHlwZV0uaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgdGhpcy5fZXZlbnRNYXBbdHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2V2ZW50TWFwW3R5cGVdKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50TWFwW3R5cGVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdHJpZ2dlcih0eXBlOiBzdHJpbmcsIGRhdGE/OiBhbnkpIHtcbiAgICBpZiAodGhpcy5fZXZlbnRNYXBbdHlwZV0pIHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgICBpdGVtLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50IHtcbiAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nID0gbnVsbDtcbiAgcHJpdmF0ZSBfZGF0YTogYW55ID0gbnVsbDtcblxuICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgcHVibGljIHNldCB0eXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90eXBlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgZGF0YT86IGFueSkge1xuICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICB9XG59XG4iLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5pbXBvcnQgRGlzcGxheSBmcm9tICcuLi9kaXNwbGF5L2Rpc3BsYXknO1xuXG5lbnVtIE1vdXNlRXZlbnRUeXBlIHtcbiAgQ0xJQ0sgPSAnY2xpY2snLFxuICBNT1VTRV9PVkVSID0gJ21vdXNlT3ZlcicsXG4gIE1PVVNFX09VVCA9ICdtb3VzZU91dCcsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdXNlRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBDTElDSzogTW91c2VFdmVudFR5cGUgPSBNb3VzZUV2ZW50VHlwZS5DTElDSztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBNT1VTRV9PVkVSOiBNb3VzZUV2ZW50VHlwZSA9IE1vdXNlRXZlbnRUeXBlLk1PVVNFX09WRVI7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTU9VU0VfT1VUOiBNb3VzZUV2ZW50VHlwZSA9IE1vdXNlRXZlbnRUeXBlLk1PVVNFX09VVDtcblxuICBwcml2YXRlIF90YXJnZXQ6IERpc3BsYXkgPSBudWxsO1xuICBwcml2YXRlIF9jdXJyZW50VGFyZ2V0OiBEaXNwbGF5ID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih0eXBlOiBNb3VzZUV2ZW50VHlwZSwgZGF0YTogYW55LCB0YXJnZXQ6IERpc3BsYXksIGN1cnJlbnRUYXJnZXQ6IERpc3BsYXkpIHtcbiAgICBzdXBlcih0eXBlLCBkYXRhKTtcbiAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IGN1cnJlbnRUYXJnZXQ7XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4IHtcbiAgcHVibGljIGE6IG51bWJlciA9IDE7XG4gIHB1YmxpYyBiOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgYzogbnVtYmVyID0gMDtcbiAgcHVibGljIGQ6IG51bWJlciA9IDE7XG4gIHB1YmxpYyB0eDogbnVtYmVyID0gMDtcbiAgcHVibGljIHR5OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGE6IG51bWJlciA9IDEsIGI6IG51bWJlciA9IDAsIGM6IG51bWJlciA9IDAsIGQ6IG51bWJlciA9IDEsIHR4OiBudW1iZXIgPSAwLCB0eTogbnVtYmVyID0gMCkge1xuICAgIHRoaXMuc2V0VG8oYSwgYiwgYywgZCwgdHgsIHR5KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRUbyhhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIsIHR4OiBudW1iZXIsIHR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmEgPSBhO1xuICAgIHRoaXMuYiA9IGI7XG4gICAgdGhpcy5jID0gYztcbiAgICB0aGlzLmQgPSBkO1xuICAgIHRoaXMudHggPSB0eDtcbiAgICB0aGlzLnR5ID0gdHk7XG4gIH1cblxuICBwdWJsaWMgc2V0VG9NYXRyaXgobWF0cml4OiBNYXRyaXgpOiB2b2lkIHtcbiAgICB0aGlzLmEgPSBtYXRyaXguYTtcbiAgICB0aGlzLmIgPSBtYXRyaXguYjtcbiAgICB0aGlzLmMgPSBtYXRyaXguYztcbiAgICB0aGlzLmQgPSBtYXRyaXguZDtcbiAgICB0aGlzLnR4ID0gbWF0cml4LnR4O1xuICAgIHRoaXMudHkgPSBtYXRyaXgudHk7XG4gIH1cblxuICBwdWJsaWMgYWRkKG1hdHJpeDogTWF0cml4KTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuc2V0VG8odGhpcy5hICsgbWF0cml4LmEsIHRoaXMuYiArIG1hdHJpeC5iLCB0aGlzLmMgKyBtYXRyaXguYywgdGhpcy5kICsgbWF0cml4LmQsIHRoaXMudHggKyBtYXRyaXgudHgsIHRoaXMudHkgKyBtYXRyaXgudHkpO1xuICB9XG5cbiAgcHVibGljIHN1YihtYXRyaXg6IE1hdHJpeCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLnNldFRvKHRoaXMuYSAtIG1hdHJpeC5hLCB0aGlzLmIgLSBtYXRyaXguYiwgdGhpcy5jIC0gbWF0cml4LmMsIHRoaXMuZCAtIG1hdHJpeC5kLCB0aGlzLnR4IC0gbWF0cml4LnR4LCB0aGlzLnR5IC0gbWF0cml4LnR5KTtcbiAgfVxuXG4gIHB1YmxpYyBtdWx0aShtYXRyaXg6IE1hdHJpeCk6IHZvaWQge1xuICAgIGxldCBhOiBudW1iZXI7XG4gICAgbGV0IGI6IG51bWJlcjtcbiAgICBsZXQgYzogbnVtYmVyO1xuICAgIGxldCBkOiBudW1iZXI7XG4gICAgbGV0IHR4OiBudW1iZXI7XG4gICAgbGV0IHR5OiBudW1iZXI7XG5cbiAgICBpZiAodHlwZW9mIG1hdHJpeCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGEgPSB0aGlzLmEgKiBtYXRyaXg7XG4gICAgICBiID0gdGhpcy5iICogbWF0cml4O1xuICAgICAgYyA9IHRoaXMuYyAqIG1hdHJpeDtcbiAgICAgIGQgPSB0aGlzLmQgKiBtYXRyaXg7XG4gICAgICB0eCA9IHRoaXMudHggKiBtYXRyaXg7XG4gICAgICB0eSA9IHRoaXMudHkgKiBtYXRyaXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSAodGhpcy5hICogbWF0cml4LmEpICsgKHRoaXMuYyAqIG1hdHJpeC5iKTtcbiAgICAgIGIgPSAodGhpcy5iICogbWF0cml4LmEpICsgKHRoaXMuZCAqIG1hdHJpeC5iKTtcbiAgICAgIGMgPSAodGhpcy5hICogbWF0cml4LmMpICsgKHRoaXMuYyAqIG1hdHJpeC5kKTtcbiAgICAgIGQgPSAodGhpcy5iICogbWF0cml4LmMpICsgKHRoaXMuZCAqIG1hdHJpeC5kKTtcbiAgICAgIHR4ID0gKHRoaXMuYSAqIG1hdHJpeC50eCkgKyAodGhpcy5jICogbWF0cml4LnR5KSArIHRoaXMudHg7XG4gICAgICB0eSA9ICh0aGlzLmIgKiBtYXRyaXgudHgpICsgKHRoaXMuZCAqIG1hdHJpeC50eSkgKyB0aGlzLnR5O1xuICAgIH1cbiAgICB0aGlzLnNldFRvKGEsIGIsIGMsIGQsIHR4LCB0eSk7XG4gIH1cblxuICBwdWJsaWMgaW52ZXJzZSgpOiBNYXRyaXgge1xuICAgIGNvbnN0IHsgYSwgYiwgYywgZCwgdHgsIHR5IH0gPSB0aGlzO1xuICAgIGNvbnN0IG4gPSBhICogZCAtIGIgKiBjO1xuICAgIHJldHVybiBuZXcgTWF0cml4KGQgLyBuLCAtYiAvIG4sIC1jIC8gbiwgYSAvIG4sIChjICogdGhpcy50eSAtIGQgKiB0eCkgLyBuLCAoYiAqIHR4IC0gYSAqIHRoaXMudHkpIC8gbik7XG4gIH1cblxuICBwdWJsaWMgY2xvbmUoKTogTWF0cml4IHtcbiAgICByZXR1cm4gbmV3IE1hdHJpeCh0aGlzLmEsIHRoaXMuYiwgdGhpcy5jLCB0aGlzLmQsIHRoaXMudHgsIHRoaXMudHkpO1xuICB9XG5cbiAgcHVibGljIHNjYWxlKHg6IG51bWJlciA9IDEsIHk6IG51bWJlciA9IDEpOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpKG5ldyBNYXRyaXgoeCwgMCwgMCwgeSwgMCwgMCkpO1xuICB9XG5cbiAgcHVibGljIHRyYW5zbGF0ZSh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5tdWx0aShuZXcgTWF0cml4KDEsIDAsIDAsIDEsIHgsIHkpKTtcbiAgfVxuXG4gIHB1YmxpYyByb3RhdGUoYW5nbGU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubXVsdGkobmV3IE1hdHJpeChNYXRoLmNvcyhhbmdsZSksIE1hdGguc2luKGFuZ2xlKSwgLU1hdGguc2luKGFuZ2xlKSwgTWF0aC5jb3MoYW5nbGUpKSk7XG4gIH1cblxuICBwdWJsaWMgc2tldyh4ID0gMCwgeSA9IDApOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpKG5ldyBNYXRyaXgoMSwgTWF0aC50YW4oeSksIE1hdGgudGFuKHgpLCAxLCAwLCAwKSk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRUbygxLCAwLCAwLCAxLCAwLCAwKTtcbiAgfVxuXG4gIHB1YmxpYyBlcXVhbHMobWF0cml4OiBNYXRyaXgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hID09PSBtYXRyaXguYSAmJiB0aGlzLmIgPT09IG1hdHJpeC5iICYmIHRoaXMuYyA9PT0gbWF0cml4LmMgJiYgdGhpcy5kID09PSBtYXRyaXguZCAmJiB0aGlzLnR4ID09PSBtYXRyaXgudHggJiYgdGhpcy50eSA9PT0gbWF0cml4LnR5O1xuICB9XG59XG4iLCJpbXBvcnQgTWF0cml4IGZyb20gJy4vbWF0cml4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnQge1xuICBwdWJsaWMgeDogbnVtYmVyID0gMDtcbiAgcHVibGljIHk6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIHB1YmxpYyBkaXN0YW5jZShwb2ludDogUG9pbnQpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQueCAtIHRoaXMueCwgMikgKyBNYXRoLnBvdyhwb2ludC55IC0gdGhpcy55LCAyKSk7XG4gIH1cblxuICBwdWJsaWMgcm90YXRlKHJhZGlhbjogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IG1hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeChNYXRoLmNvcyhyYWRpYW4pLCBNYXRoLnNpbihyYWRpYW4pLCAtTWF0aC5zaW4ocmFkaWFuKSwgTWF0aC5jb3MocmFkaWFuKSk7XG4gICAgY29uc3QgcHg6IG51bWJlciA9IChtYXRyaXguYSAqIHRoaXMueCkgKyAobWF0cml4LmMgKiB0aGlzLnkpO1xuICAgIGNvbnN0IHB5OiBudW1iZXIgPSAobWF0cml4LmIgKiB0aGlzLngpICsgKG1hdHJpeC5kICogdGhpcy55KTtcbiAgICByZXR1cm4gbmV3IFBvaW50KHB4LCBweSk7XG4gIH1cblxuICBwdWJsaWMgc2NhbGUoc2NhbGVYOiBudW1iZXIsIHNjYWxlWTogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IG1hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeChzY2FsZVgsIDAsIDAsIHNjYWxlWSk7XG4gICAgY29uc3QgcHg6IG51bWJlciA9IChtYXRyaXguYSAqIHRoaXMueCkgKyAobWF0cml4LmMgKiB0aGlzLnkpO1xuICAgIGNvbnN0IHB5OiBudW1iZXIgPSAobWF0cml4LmIgKiB0aGlzLngpICsgKG1hdHJpeC5kICogdGhpcy55KTtcbiAgICByZXR1cm4gbmV3IFBvaW50KHB4LCBweSk7XG4gIH1cblxuICBwdWJsaWMgdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IG1hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeCgxLCAwLCAwLCAxLCB4LCB5KTtcbiAgICBjb25zdCBweDogbnVtYmVyID0gKG1hdHJpeC5hICogdGhpcy54KSArIChtYXRyaXguYyAqIHRoaXMueSkgKyBtYXRyaXgudHg7XG4gICAgY29uc3QgcHk6IG51bWJlciA9IChtYXRyaXguYiAqIHRoaXMueCkgKyAobWF0cml4LmQgKiB0aGlzLnkpICsgbWF0cml4LnR5O1xuICAgIHJldHVybiBuZXcgUG9pbnQocHgsIHB5KTtcbiAgfVxuXG4gIHB1YmxpYyBza2V3KHNrZXdYOiBudW1iZXIsIHNrZXdZOiBudW1iZXIpOiBQb2ludCB7XG4gICAgY29uc3QgbWF0cml4OiBNYXRyaXggPSBuZXcgTWF0cml4KDEsIE1hdGgudGFuKHNrZXdYKSwgTWF0aC50YW4oc2tld1kpLCAxKTtcbiAgICBjb25zdCBweDogbnVtYmVyID0gKG1hdHJpeC5hICogdGhpcy54KSArIChtYXRyaXguYyAqIHRoaXMueSk7XG4gICAgY29uc3QgcHk6IG51bWJlciA9IChtYXRyaXguYiAqIHRoaXMueCkgKyAobWF0cml4LmQgKiB0aGlzLnkpO1xuICAgIHJldHVybiBuZXcgUG9pbnQocHgsIHB5KTtcbiAgfVxufVxuIiwiaW1wb3J0IFBvaW50IGZyb20gJy4vcG9pbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGUge1xuXG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2xlZnRUb3A6IFBvaW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfcmlnaHRUb3A6IFBvaW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfbGVmdEJvdHRvbTogUG9pbnQgPSBudWxsO1xuICBwcml2YXRlIF9yaWdodEJvdHRvbTogUG9pbnQgPSBudWxsO1xuXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdFRvcC54OyB9XG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdFRvcC55OyB9XG4gIHB1YmxpYyBnZXQgd2lkdGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9XG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9oZWlnaHQ7IH1cbiAgcHVibGljIGdldCBsZWZ0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZWZ0VG9wLng7IH1cbiAgcHVibGljIGdldCByaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcmlnaHRUb3AueDsgfVxuICBwdWJsaWMgZ2V0IHRvcCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdFRvcC55OyB9XG4gIHB1YmxpYyBnZXQgYm90dG9tKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZWZ0Qm90dG9tLnk7IH1cbiAgcHVibGljIGdldCBsZWZ0VG9wKCk6IFBvaW50IHsgcmV0dXJuIHRoaXMuX2xlZnRUb3A7IH1cbiAgcHVibGljIGdldCByaWdodFRvcCgpOiBQb2ludCB7IHJldHVybiB0aGlzLl9yaWdodFRvcDsgfVxuICBwdWJsaWMgZ2V0IGxlZnRCb3R0b20oKTogUG9pbnQgeyByZXR1cm4gdGhpcy5fbGVmdEJvdHRvbTsgfVxuICBwdWJsaWMgZ2V0IHJpZ2h0Qm90dG9tKCk6IFBvaW50IHsgcmV0dXJuIHRoaXMuX3JpZ2h0Qm90dG9tOyB9XG5cbiAgcHVibGljIHNldCB4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9sZWZ0VG9wLnggPSB2YWx1ZTtcbiAgICB0aGlzLl9sZWZ0Qm90dG9tLnggPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVSaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCB5KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9sZWZ0VG9wLnkgPSB2YWx1ZTtcbiAgICB0aGlzLl9sZWZ0Qm90dG9tLnkgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVCb3R0b20oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlUmlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVCb3R0b20oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGVmdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sZWZ0VG9wLnggPSB2YWx1ZTtcbiAgICB0aGlzLmxlZnRCb3R0b20ueCA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHJpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnJpZ2h0VG9wLnggPSB2YWx1ZTtcbiAgICB0aGlzLnJpZ2h0Qm90dG9tLnggPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICB9XG5cbiAgcHVibGljIHNldCB0b3AodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMubGVmdFRvcC55ID0gdmFsdWU7XG4gICAgdGhpcy5yaWdodFRvcC55ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGJvdHRvbSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sZWZ0Qm90dG9tLnkgPSB2YWx1ZTtcbiAgICB0aGlzLnJpZ2h0Qm90dG9tLnkgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGVmdFRvcChwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLl9sZWZ0VG9wID0gcG9pbnQ7XG4gICAgdGhpcy5fdXBkYXRlV2lkdGgoKTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcmlnaHRUb3AocG9pbnQ6IFBvaW50KSB7XG4gICAgdGhpcy5fcmlnaHRUb3AgPSBwb2ludDtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCBsZWZ0Qm90dG9tKHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMuX2xlZnRCb3R0b20gPSBwb2ludDtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCByaWdodEJvdHRvbShwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLl9yaWdodEJvdHRvbSA9IHBvaW50O1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCB3aWR0aDogbnVtYmVyID0gMCwgaGVpZ2h0OiBudW1iZXIgPSAwKSB7XG4gICAgdGhpcy5fbGVmdFRvcCA9IG5ldyBQb2ludCgpO1xuICAgIHRoaXMuX3JpZ2h0VG9wID0gbmV3IFBvaW50KCk7XG4gICAgdGhpcy5fbGVmdEJvdHRvbSA9IG5ldyBQb2ludCgpO1xuICAgIHRoaXMuX3JpZ2h0Qm90dG9tID0gbmV3IFBvaW50KCk7XG4gICAgdGhpcy5zZXRUbyh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIHB1YmxpYyBjb250YWlucyh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB4ID49IHRoaXMubGVmdCAmJiB4IDw9IHRoaXMucmlnaHQgJiYgeSA8PSB0aGlzLmJvdHRvbSAmJiB5ID49IHRoaXMudG9wO1xuICB9XG5cbiAgcHVibGljIGNvbnRhaW5zUmVjdChyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiByZWN0YW5nbGUubGVmdCA+PSB0aGlzLmxlZnQgJiYgcmVjdGFuZ2xlLnJpZ2h0IDw9IHRoaXMucmlnaHQgJiYgcmVjdGFuZ2xlLnRvcCA+PSB0aGlzLnRvcCAmJiByZWN0YW5nbGUuYm90dG9tIDw9IHRoaXMuYm90dG9tO1xuICB9XG5cbiAgcHVibGljIGludGVyc2VjdHMocmVjdGFuZ2xlOiBSZWN0YW5nbGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWlucyhyZWN0YW5nbGUubGVmdCArIDEsIHJlY3RhbmdsZS50b3AgKyAxKSB8fCB0aGlzLmNvbnRhaW5zKHJlY3RhbmdsZS5sZWZ0ICsgMSwgcmVjdGFuZ2xlLmJvdHRvbSAtIDEpIHx8IHRoaXMuY29udGFpbnMocmVjdGFuZ2xlLnJpZ2h0IC0gMSwgcmVjdGFuZ2xlLnRvcCArIDEpIHx8IHRoaXMuY29udGFpbnMocmVjdGFuZ2xlLnJpZ2h0IC0gMSwgcmVjdGFuZ2xlLmJvdHRvbSAtIDEpO1xuICB9XG5cbiAgcHVibGljIGludGVyc2VjdGlvbihyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZSB7XG4gICAgbGV0IHJlc3VsdDogUmVjdGFuZ2xlID0gbnVsbDtcbiAgICBpZiAodGhpcy5pbnRlcnNlY3RzKHJlY3RhbmdsZSkpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBSZWN0YW5nbGUoKTtcbiAgICAgIHJlc3VsdC5sZWZ0ID0gTWF0aC5tYXgocmVjdGFuZ2xlLmxlZnQsIHRoaXMubGVmdCk7XG4gICAgICByZXN1bHQucmlnaHQgPSBNYXRoLm1pbihyZWN0YW5nbGUucmlnaHQsIHRoaXMucmlnaHQpO1xuICAgICAgcmVzdWx0LnRvcCA9IE1hdGgubWF4KHJlY3RhbmdsZS50b3AsIHRoaXMudG9wKTtcbiAgICAgIHJlc3VsdC5ib3R0b20gPSBNYXRoLm1pbihyZWN0YW5nbGUuYm90dG9tLCB0aGlzLmJvdHRvbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kcyhyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IHZvaWQge1xuICAgIGNvbnN0IGxlZnQ6IG51bWJlciA9IE1hdGgubWluKHRoaXMubGVmdCwgcmVjdGFuZ2xlLmxlZnQpO1xuICAgIGNvbnN0IHJpZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLnJpZ2h0LCByZWN0YW5nbGUucmlnaHQpO1xuICAgIGNvbnN0IHRvcDogbnVtYmVyID0gTWF0aC5taW4odGhpcy50b3AsIHJlY3RhbmdsZS50b3ApO1xuICAgIGNvbnN0IGJvdHRvbTogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5ib3R0b20sIHJlY3RhbmdsZS5ib3R0b20pO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICB9XG5cbiAgcHVibGljIGV4dGVuZHNWYWx1ZSh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBsZWZ0OiBudW1iZXIgPSBNYXRoLm1pbih0aGlzLmxlZnQsIHgpO1xuICAgIGNvbnN0IHJpZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLnJpZ2h0LCB4ICsgd2lkdGgpO1xuICAgIGNvbnN0IHRvcDogbnVtYmVyID0gTWF0aC5taW4odGhpcy50b3AsIHkpO1xuICAgIGNvbnN0IGJvdHRvbTogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5ib3R0b20sIHkgKyBoZWlnaHQpO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICB9XG5cbiAgcHVibGljIGV4dGVuZHNQb2ludChwb2ludDogUG9pbnQpOiB2b2lkIHtcbiAgICB0aGlzLmV4dGVuZHNQb3NpdGlvbihwb2ludC54LCBwb2ludC55KTtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRzUG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sZWZ0ID49IHgpIHtcbiAgICAgIHRoaXMubGVmdCA9IHg7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJpZ2h0IDw9IHgpIHtcbiAgICAgIHRoaXMucmlnaHQgPSB4O1xuICAgIH1cbiAgICBpZiAodGhpcy50b3AgPj0geSkge1xuICAgICAgdGhpcy50b3AgPSB5O1xuICAgIH0gZWxzZSBpZiAodGhpcy5ib3R0b20gPD0geSkge1xuICAgICAgdGhpcy5ib3R0b20gPSB5O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRUbyh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgcHVibGljIGNsb25lKCk6IFJlY3RhbmdsZSB7XG4gICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUodGhpcy5sZWZ0LCB0aGlzLnRvcCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VG8oMCwgMCwgMCwgMCk7XG4gIH1cblxuICBwdWJsaWMgZXF1YWxzKHJlY3RhbmdsZTogUmVjdGFuZ2xlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubGVmdCA9PT0gcmVjdGFuZ2xlLmxlZnQgJiYgdGhpcy50b3AgPT09IHJlY3RhbmdsZS50b3AgJiYgdGhpcy5yaWdodCA9PT0gcmVjdGFuZ2xlLnJpZ2h0ICYmIHRoaXMuYm90dG9tID09PSByZWN0YW5nbGUuYm90dG9tICYmIHRoaXMud2lkdGggPT09IHJlY3RhbmdsZS53aWR0aCAmJiB0aGlzLmhlaWdodCA9PT0gcmVjdGFuZ2xlLmhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVdpZHRoKCk6IHZvaWQge1xuICAgIHRoaXMuX3dpZHRoID0gdGhpcy5fcmlnaHRUb3AueCAtIHRoaXMuX2xlZnRUb3AueDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUhlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLl9sZWZ0Qm90dG9tLnkgLSB0aGlzLl9sZWZ0VG9wLnk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVSaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yaWdodEJvdHRvbS54ID0gdGhpcy5fcmlnaHRUb3AueCA9IHRoaXMuX2xlZnRUb3AueCArIHRoaXMuX3dpZHRoO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQm90dG9tKCk6IHZvaWQge1xuICAgIHRoaXMuX2xlZnRCb3R0b20ueSA9IHRoaXMuX3JpZ2h0Qm90dG9tLnkgPSB0aGlzLl9sZWZ0VG9wLnkgKyB0aGlzLl9oZWlnaHQ7XG4gIH1cbn1cbiIsIlxuaW1wb3J0IFN0YWdlIGZyb20gJy4vZGlzcGxheS9zdGFnZSc7XG5pbXBvcnQgRGlzcGxheSBmcm9tICcuL2Rpc3BsYXkvZGlzcGxheSc7XG5pbXBvcnQgRGlzcGxheUNvbnRhaW5lciBmcm9tICcuL2Rpc3BsYXkvZGlzcGxheS1jb250YWluZXInO1xuaW1wb3J0IEdyYXBoaWNzIGZyb20gJy4vZGlzcGxheS9ncmFwaGljcyc7XG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9kaXNwbGF5L3NoYXBlJztcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9kaXNwbGF5L3Nwcml0ZSc7XG5pbXBvcnQgU3ByaXRlU2hlZXQgZnJvbSAnLi9kaXNwbGF5L3Nwcml0ZS1zaGVldCc7XG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gJy4vZXZlbnQvZXZlbnQtZGlzcGF0Y2hlcic7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudC9ldmVudCc7XG5pbXBvcnQgTW91c2VFdmVudCBmcm9tICcuL2V2ZW50L21vdXNlLWV2ZW50JztcbmltcG9ydCBNYXRyaXggZnJvbSAnLi9nZW9tL21hdHJpeCc7XG5pbXBvcnQgUG9pbnQgZnJvbSAnLi9nZW9tL3BvaW50JztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi9nZW9tL3JlY3RhbmdsZSc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vdXRpbC90aWNrZXInO1xuXG5jb25zdCBzdGcgPSB7XG4gIFN0YWdlLFxuICBEaXNwbGF5LFxuICBEaXNwbGF5Q29udGFpbmVyLFxuICBHcmFwaGljcyxcbiAgU2hhcGUsXG4gIFNwcml0ZSxcbiAgU3ByaXRlU2hlZXQsXG4gIEV2ZW50RGlzcGF0Y2hlcixcbiAgRXZlbnQsXG4gIE1vdXNlRXZlbnQsXG4gIE1hdHJpeCxcbiAgUG9pbnQsXG4gIFJlY3RhbmdsZSxcbiAgVGlja2VyLFxufTtcblxuKHdpbmRvdyBhcyBhbnkpLnN0ZyA9IHN0ZztcblxuZXhwb3J0IGRlZmF1bHQgc3RnO1xuIiwiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tICcuLi9ldmVudC9ldmVudC1kaXNwYXRjaGVyJztcblxuZW51bSBUaWNrZXJTdGF0ZSB7XG4gIFJFQURZID0gJ3JlYWR5JyxcbiAgUlVOTklORyA9ICdydW5uaW5nJyxcbn1cblxuZW51bSBUaWNrZXJFdmVudCB7XG4gIFRJQ0sgPSAndGljaycsXG59XG5cbmNvbnN0IF9vbmVTZWM6IG51bWJlciA9IDEwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tlciBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUSUNLOiBUaWNrZXJFdmVudCA9IFRpY2tlckV2ZW50LlRJQ0s7XG5cbiAgcHJpdmF0ZSBfZnBzOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9zdGF0ZTogVGlja2VyU3RhdGUgPSBUaWNrZXJTdGF0ZS5SRUFEWTtcbiAgcHJpdmF0ZSBfcHJldlRpbWU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2ludGVybmFsVGltZTogbnVtYmVyID0gMDtcblxuICBwdWJsaWMgZ2V0IGZwcygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZnBzOyB9XG5cbiAgcHVibGljIHNldCBmcHModmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2ZwcyA9IE1hdGgubWF4KHZhbHVlLCAxKTtcbiAgICAvLyBUT0RPOiDroZzsp4Eg7ZmV7J24XG4gICAgaWYgKHZhbHVlID4gMCAmJiB2YWx1ZSA8IDEpIHtcbiAgICAgIHRoaXMuX2ludGVybmFsVGltZSA9IChfb25lU2VjICogdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbFRpbWUgPSAoX29uZVNlYyAvIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihmcHMgPSA0MCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5mcHMgPSBmcHM7XG4gICAgdGhpcy5fc3RhdGUgPSBUaWNrZXJTdGF0ZS5SRUFEWTtcbiAgfVxuXG4gIHB1YmxpYyBydW4oKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGUgPSBUaWNrZXJTdGF0ZS5SVU5OSU5HO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gK25ldyBEYXRlKCk7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9ydW4oKSk7XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdGF0ZSA9IFRpY2tlclN0YXRlLlJFQURZO1xuICB9XG5cbiAgcHJpdmF0ZSBfcnVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gVGlja2VyU3RhdGUuUkVBRFkpIHsgcmV0dXJuOyB9XG4gICAgY29uc3Qgbm93ID0gK25ldyBEYXRlKCk7XG4gICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl9wcmV2VGltZTtcbiAgICBpZiAoZGVsdGEgPj0gdGhpcy5faW50ZXJuYWxUaW1lKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoVGlja2VyLlRJQ0ssIHsgZGVsdGE6IGRlbHRhIH0pO1xuICAgICAgdGhpcy5fcHJldlRpbWUgPSArbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IFRpY2tlclN0YXRlLlJVTk5JTkcpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fcnVuKCkpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==