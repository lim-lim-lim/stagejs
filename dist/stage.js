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
        this._updateBounds();
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
        this.width = 0;
        this.height = 0;
        var tempX = this.x;
        var tempY = this.y;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS1jb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9ncmFwaGljcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zaGFwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zcHJpdGUtc2hlZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvc3ByaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9kaXNwbGF5L3N0YWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC1kaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQvbW91c2UtZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlb20vbWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3BvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3JlY3RhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvdGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNB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RUFBRSxHQUFHLE1BQU0sQ0FBQztZQUN0QixFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7U0FDdkI7YUFBTTtZQUNMLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzNELEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUM1RDtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENB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LHFCQUFxQixDQUFDLGNBQU0sWUFBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQztJQS9Dc0IsV0FBSSxHQUFnQixXQUFXLENBQUMsSUFBSSxDQUFDO0lBZ0Q5RCxhQUFDO0NBQUEsQ0FsRG1DLDBCQUFlLEdBa0RsRDtrQkFsRG9CLE1BQU0iLCJmaWxlIjoic3RhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCBEaXNwbGF5IGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9zdGFnZSc7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJ2dlb20vcmVjdGFuZ2xlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzcGxheUNvbnRhaW5lciBleHRlbmRzIERpc3BsYXkge1xuXG4gIHByaXZhdGUgX2NoaWxkcmVuOiBEaXNwbGF5W10gPSBbXTtcblxuICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IERpc3BsYXlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xuICB9XG5cbiAgcHVibGljIGdldCBib3VuZHMoKTogUmVjdGFuZ2xlIHtcbiAgICB0aGlzLl91cGRhdGVCb3VuZHMoKTtcbiAgICByZXR1cm4gdGhpcy5fYm91bmRzO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRDaGlsZChjaGlsZDogRGlzcGxheSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuX2NoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIGNoaWxkLnN0YWdlID0gdGhpcy5zdGFnZTtcbiAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgIHRoaXMuc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy5fdXBkYXRlQm91bmRzKCk7XG4gICAgY2hpbGQudHJpZ2dlcihTdGFnZS5BRERfVE9fU1RBR0UpO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUNoaWxkQWxsKCk6IHZvaWQge1xuICAgIHdoaWxlICh0aGlzLl9jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5fY2hpbGRyZW5bdGhpcy5fY2hpbGRyZW4ubGVuZ3RoIC0gMV0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVDaGlsZChjaGlsZDogRGlzcGxheSk6IHZvaWQge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkgeyByZXR1cm47IH1cbiAgICBjaGlsZC50cmlnZ2VyKFN0YWdlLlJFTU9WRV9UT19TVEFHRSk7XG4gICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICBjaGlsZC5zdGFnZSA9IG51bGw7XG4gICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICB0aGlzLnN0YWdlLmNoYW5nZWQgPSB0cnVlO1xuICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIERpc3BsYXlDb250YWluZXIpIHtcbiAgICAgIChjaGlsZCBhcyBEaXNwbGF5Q29udGFpbmVyKS5yZW1vdmVDaGlsZEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVDaGlsZEF0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuZ2V0Q2hpbGRBdChpbmRleCkpO1xuICAgIHRoaXMuX2NoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy5zdGFnZS5jaGFuZ2VkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDaGlsZEF0KGluZGV4OiBudW1iZXIpOiBEaXNwbGF5IHtcbiAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW5baW5kZXhdO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZURpc3BsYXkoKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiB0aGlzLl9jaGlsZHJlbikge1xuICAgICAgaWYgKGNoaWxkLnZpc2libGUpIHtcbiAgICAgICAgY2hpbGQudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQm91bmRzKCk6IHZvaWQge1xuICAgIHRoaXMud2lkdGggPSAwO1xuICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICBjb25zdCB0ZW1wWDogbnVtYmVyID0gdGhpcy54O1xuICAgIGNvbnN0IHRlbXBZOiBudW1iZXIgPSB0aGlzLnk7XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiB0aGlzLl9jaGlsZHJlbikge1xuICAgICAgdGhpcy5fYm91bmRzLmV4dGVuZHMoY2hpbGQuYm91bmRzKTtcbiAgICB9XG4gICAgdGhpcy54ID0gdGVtcFg7XG4gICAgdGhpcy55ID0gdGVtcFk7XG4gIH1cbn1cbiIsImltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGlzcGF0Y2hlcic7XG5pbXBvcnQgTWF0cml4IGZyb20gJy4uL2dlb20vbWF0cml4JztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vZ2VvbS9yZWN0YW5nbGUnO1xuaW1wb3J0IERpc3BsYXlDb250YWluZXIgZnJvbSAnLi9kaXNwbGF5LWNvbnRhaW5lcic7XG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9zdGFnZSc7XG5cbi8vIFRPRE86IO2MjOq0tOyekCDqtaztmIRcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIERpc3BsYXkgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xuXG4gIHByb3RlY3RlZCBfc3RhZ2U6IFN0YWdlID0gbnVsbDtcbiAgcHJvdGVjdGVkIF9wYXJlbnQ6IERpc3BsYXlDb250YWluZXIgPSBudWxsO1xuICBwcm90ZWN0ZWQgX2JvdW5kczogUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xuICBwcm90ZWN0ZWQgX2NvbXB1dGVkQm91bmRzOiBSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XG4gIHByb3RlY3RlZCBfbWF0cml4OiBNYXRyaXggPSBuZXcgTWF0cml4KCk7XG4gIHByb3RlY3RlZCBfY2VudGVyWDogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9jZW50ZXJZOiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX3JvdGF0ZTogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF93aWR0aDogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9oZWlnaHQ6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfc2NhbGVYOiBudW1iZXIgPSAxO1xuICBwcm90ZWN0ZWQgX3NjYWxlWTogbnVtYmVyID0gMTtcbiAgcHJvdGVjdGVkIF9za2V3WDogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9za2V3WTogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF92aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICBwdWJsaWMgZ2V0IHN0YWdlKCk6IFN0YWdlIHsgcmV0dXJuIHRoaXMuX3N0YWdlOyB9XG4gIHB1YmxpYyBnZXQgcGFyZW50KCk6IERpc3BsYXlDb250YWluZXIgeyByZXR1cm4gdGhpcy5fcGFyZW50OyB9XG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYm91bmRzLng7IH1cbiAgcHVibGljIGdldCB5KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9ib3VuZHMueTsgfVxuICBwdWJsaWMgZ2V0IGNlbnRlclgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2NlbnRlclg7IH1cbiAgcHVibGljIGdldCBjZW50ZXJZKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jZW50ZXJZOyB9XG4gIHB1YmxpYyBnZXQgd2lkdGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2JvdW5kcy53aWR0aDsgfVxuICBwdWJsaWMgZ2V0IGhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYm91bmRzLmhlaWdodDsgfVxuICBwdWJsaWMgZ2V0IHJvdGF0ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcm90YXRlOyB9XG4gIHB1YmxpYyBnZXQgc2NhbGVYKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zY2FsZVg7IH1cbiAgcHVibGljIGdldCBzY2FsZVkoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NjYWxlWTsgfVxuICBwdWJsaWMgZ2V0IHNrZXdYKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9za2V3WDsgfVxuICBwdWJsaWMgZ2V0IHNrZXdZKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9za2V3WTsgfVxuICBwdWJsaWMgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl92aXNpYmxlOyB9XG4gIHB1YmxpYyBnZXQgYm91bmRzKCk6IFJlY3RhbmdsZSB7IHJldHVybiB0aGlzLl9ib3VuZHM7IH1cbiAgcHVibGljIGdldCBtYXRyaXgoKTogTWF0cml4IHsgcmV0dXJuIHRoaXMuX21hdHJpeDsgfVxuXG4gIHB1YmxpYyBnZXQgY29tcHV0ZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5ib3VuZHM7XG4gICAgY29uc3QgcG9pbnRzID0gW2JvdW5kcy5sZWZ0VG9wLCBib3VuZHMucmlnaHRUb3AsIGJvdW5kcy5sZWZ0Qm90dG9tLCBib3VuZHMucmlnaHRCb3R0b21dO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHBvaW50cykge1xuICAgICAgaXRlbS5yb3RhdGUodGhpcy5fcm90YXRlKTtcbiAgICAgIGl0ZW0uc2tldyh0aGlzLl9za2V3WCwgdGhpcy5fc2tld1kpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbXB1dGVkQm91bmRzLmxlZnQgPSBNYXRoLm1pbihib3VuZHMubGVmdFRvcC54LCBib3VuZHMucmlnaHRUb3AueCwgYm91bmRzLmxlZnRCb3R0b20ueCwgYm91bmRzLnJpZ2h0Qm90dG9tLngpO1xuICAgIHRoaXMuX2NvbXB1dGVkQm91bmRzLnJpZ2h0ID0gTWF0aC5tYXgoYm91bmRzLmxlZnRUb3AueCwgYm91bmRzLnJpZ2h0VG9wLngsIGJvdW5kcy5sZWZ0Qm90dG9tLngsIGJvdW5kcy5yaWdodEJvdHRvbS54KTtcbiAgICB0aGlzLl9jb21wdXRlZEJvdW5kcy50b3AgPSBNYXRoLm1pbihib3VuZHMubGVmdFRvcC55LCBib3VuZHMucmlnaHRUb3AueSwgYm91bmRzLmxlZnRCb3R0b20ueSwgYm91bmRzLnJpZ2h0Qm90dG9tLnkpO1xuICAgIHRoaXMuX2NvbXB1dGVkQm91bmRzLmJvdHRvbSA9IE1hdGgubWF4KGJvdW5kcy5sZWZ0VG9wLnksIGJvdW5kcy5yaWdodFRvcC55LCBib3VuZHMubGVmdEJvdHRvbS55LCBib3VuZHMucmlnaHRCb3R0b20ueSk7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXB1dGVkQm91bmRzO1xuICB9XG5cbiAgcHVibGljIHNldCBzdGFnZShzdGFnZTogU3RhZ2UpIHtcbiAgICB0aGlzLl9zdGFnZSA9IHN0YWdlO1xuICAgIGlmICh0aGlzLl9zdGFnZSkge1xuICAgICAgdGhpcy5fc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBwYXJlbnQocGFyZW50OiBEaXNwbGF5Q29udGFpbmVyKSB7IHRoaXMuX3BhcmVudCA9IHBhcmVudDsgfVxuXG4gIHB1YmxpYyBzZXQgeCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2JvdW5kcy5sZWZ0ID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9ib3VuZHMueCA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHkodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9ib3VuZHMudG9wID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9ib3VuZHMueSA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGNlbnRlclgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2NlbnRlclggPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgY2VudGVyWSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY2VudGVyWSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHNldCB3aWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3dpZHRoID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xuICAgIHRoaXMuX2JvdW5kcy53aWR0aCA9IHZhbHVlICogdGhpcy5fc2NhbGVYO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGhlaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuaGVpZ2h0ID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcbiAgICB0aGlzLl9ib3VuZHMuaGVpZ2h0ID0gdmFsdWUgKiB0aGlzLl9zY2FsZVk7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcm90YXRlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fcm90YXRlID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9yb3RhdGUgPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBzY2FsZVgodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9zY2FsZVggPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NjYWxlWCA9IHZhbHVlO1xuICAgIHRoaXMuX2JvdW5kcy53aWR0aCA9IHRoaXMuX3dpZHRoICogdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2NhbGVZKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2NhbGVZID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9zY2FsZVkgPSB2YWx1ZTtcbiAgICB0aGlzLl9ib3VuZHMuaGVpZ2h0ID0gdGhpcy5faGVpZ2h0ICogdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2tld1godmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9za2V3WCA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2tld1ggPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBza2V3WSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3NrZXdZID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9za2V3WSA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHZpc2libGUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5fdmlzaWJsZSA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fdmlzaWJsZSA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMub24oU3RhZ2UuQUREX1RPX1NUQUdFLCAoKSA9PiB0aGlzLnN0YWdlLnJlZ2lzdGVyRXZlbnRNYXAodGhpcykpO1xuICAgIHRoaXMub24oU3RhZ2UuUkVNT1ZFX1RPX1NUQUdFLCAoKSA9PiB0aGlzLnN0YWdlLnVucmVnaXN0ZXJFdmVudE1hcCh0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlRGlzcGxheShjb250ZXh0PzogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZDtcblxuICBwdWJsaWMgdXBkYXRlVHJhbnNmb3JtYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnJlc2V0KCk7XG4gICAgY29uc3Qgb2Zmc2V0WCA9IHRoaXMueCArICh0aGlzLl9jZW50ZXJYICogdGhpcy5fc2NhbGVYKTtcbiAgICBjb25zdCBvZmZzZXRZID0gdGhpcy55ICsgKHRoaXMuX2NlbnRlclkgKiB0aGlzLl9zY2FsZVkpO1xuICAgIHRoaXMuX3RyYW5zZm9ybVRyYW5zbGF0ZShvZmZzZXRYLCBvZmZzZXRZKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1Sb3RhdGUodGhpcy5fcm90YXRlKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1UcmFuc2xhdGUoLW9mZnNldFgsIC1vZmZzZXRZKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1UcmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuICAgIHRoaXMuX3RyYW5zZm9ybVNjYWxlKHRoaXMuX3NjYWxlWCwgdGhpcy5fc2NhbGVZKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1Ta2V3KHRoaXMuX3NrZXdYLCB0aGlzLl9za2V3WSk7XG4gICAgdGhpcy5zdGFnZS5jb250ZXh0LnRyYW5zZm9ybSh0aGlzLl9tYXRyaXguYSwgdGhpcy5fbWF0cml4LmIsIHRoaXMuX21hdHJpeC5jLCB0aGlzLl9tYXRyaXguZCwgdGhpcy5fbWF0cml4LnR4LCB0aGlzLl9tYXRyaXgudHkpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YWdlLmNvbnRleHQuc2F2ZSgpO1xuICAgIHRoaXMudXBkYXRlVHJhbnNmb3JtYXRpb24oKTtcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXkodGhpcy5zdGFnZS5jb250ZXh0KTtcbiAgICB0aGlzLnN0YWdlLmNvbnRleHQucmVzdG9yZSgpO1xuICAgIC8vIFRPRE86IGV2ZW50Y29udGV4dCDsiJjsoJVcbiAgICAvLyB0aGlzLnN0YWdlLmV2ZW50Q29udGV4dC5kcmF3SW1hZ2UodGhpcy5zdGFnZS50ZW1wQ2FudmFzLCAwLCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybVRyYW5zbGF0ZSh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnRyYW5zbGF0ZSh4LCB5KTtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybVJvdGF0ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnJvdGF0ZSh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1TY2FsZSh4OiBudW1iZXIgPSAxLCB5OiBudW1iZXIgPSAxKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnNjYWxlKHgsIHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtU2tldyh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnNrZXcoeCwgeSk7XG4gIH1cblxuICBwcml2YXRlIF9jaGFuZ2VkRGlzcGxheSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3RhZ2UpIHsgcmV0dXJuOyB9XG4gICAgaWYgKCF0aGlzLnN0YWdlLmNoYW5nZWQpIHtcbiAgICAgIHRoaXMuc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4uL2dlb20vcmVjdGFuZ2xlJztcblxuZXhwb3J0IGVudW0gTGluZUNhcCB7XG4gIEJVVFQgPSAnYnV0dCcsXG4gIFJPVU5EID0gJ3JvdW5kJyxcbiAgU1FVQVJFID0gJ3NxdWFyZScsXG59XG5cbmV4cG9ydCBlbnVtIExpbmVKb2luIHtcbiAgUk9VTlQgPSAncm91bmQnLFxuICBCRVZFTCA9ICdiZXZlbCcsXG4gIE1JVEVSID0gJ21pdGVyJyxcbn1cblxuZW51bSBEcmF3Q29tbWFuZE5hbWUge1xuICBSRUNUID0gJ3JlY3QnLFxuICBGSUxMX1JFQ1QgPSAnZmlsbFJlY3QnLFxuICBTVFJPS0VfUkVDVCA9ICdzdHJva2VSZWN0JyxcbiAgQ0xFQVJfUkVDVCA9ICdjbGVhclJlY3QnLFxuICBCRUdJTl9QQVRIID0gJ2JlZ2luUGF0aCcsXG4gIENMT1NFX1BBVEggPSAnY2xvc2VQYXRoJyxcbiAgTU9WRV9UTyA9ICdtb3ZlVG8nLFxuICBMSU5FX1RPID0gJ2xpbmVUbycsXG4gIEFSQyA9ICdhcmMnLFxuICBBUkNfVE8gPSAnYXJjVG8nLFxuICBRVUFEUkFUSUNfQ1VSVkVfVE8gPSAncXVhZHJhdGljQ3VydmVUbycsXG4gIEJFWklFUl9DVVJWRV9UTyA9ICdiZXppZXJDdXJ2ZVRvJyxcbiAgRklMTCA9ICdmaWxsJyxcbiAgU1RST0tFID0gJ3N0cm9rZScsXG59XG5cbmludGVyZmFjZSBEcmF3Q29tbWFuZCB7XG4gIG5hbWU6IERyYXdDb21tYW5kTmFtZTtcbiAgYXJndW1lbnRzOiBhbnk7XG4gIGZpbGxTdHlsZTogc3RyaW5nO1xuICBzdHJva2VTdHlsZTogc3RyaW5nO1xuICBsaW5lV2lkdGg6IG51bWJlcjtcbiAgbGluZUNhcDogTGluZUNhcDtcbiAgbGluZUpvaW46IExpbmVKb2luO1xuICBtaXRlckxpbWl0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoaWNzIHtcbiAgcHVibGljIGZpbGxTdHlsZTogc3RyaW5nID0gbnVsbDtcbiAgcHVibGljIHN0cm9rZVN0eWxlOiBzdHJpbmcgPSBudWxsO1xuICBwdWJsaWMgbGluZVdpZHRoOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgbGluZUNhcDogTGluZUNhcCA9IExpbmVDYXAuQlVUVDtcbiAgcHVibGljIGxpbmVKb2luOiBMaW5lSm9pbiA9IExpbmVKb2luLk1JVEVSO1xuICBwdWJsaWMgbWl0ZXJMaW1pdDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfY29tbWFuZHM6IFNldDxEcmF3Q29tbWFuZD4gPSBuZXcgU2V0KCk7XG4gIHByaXZhdGUgX3g6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3k6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2JvdW5kczogUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xuXG4gIHB1YmxpYyBnZXQgY29tbWFuZHMoKTogU2V0PERyYXdDb21tYW5kPiB7IHJldHVybiB0aGlzLl9jb21tYW5kczsgfVxuICBwdWJsaWMgZ2V0IGNvbW1hbmRMaXN0KCk6IEl0ZXJhYmxlSXRlcmF0b3I8RHJhd0NvbW1hbmQ+IHsgcmV0dXJuIHRoaXMuX2NvbW1hbmRzLnZhbHVlcygpOyB9XG4gIHB1YmxpYyBnZXQgYm91bmRzKCk6IFJlY3RhbmdsZSB7IHJldHVybiB0aGlzLl9ib3VuZHM7IH1cblxuICBwdWJsaWMgcmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5SRUNULCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGZpbGxSZWN0KHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkZJTExfUkVDVCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBzdHJva2VSZWN0KHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLlNUUk9LRV9SRUNULCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyUmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5DTEVBUl9SRUNULCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGJlZ2luUGF0aCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5CRUdJTl9QQVRIKTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZVBhdGgoKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQ0xPU0VfUEFUSCk7XG4gIH1cblxuICBwdWJsaWMgbW92ZVRvKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuTU9WRV9UTywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBsaW5lVG8oeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5MSU5FX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGFyYyh4OiBudW1iZXIsIHk6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIHN0YXJ0QW5nbGU6IG51bWJlciwgZW5kQW5nbGU6IG51bWJlciwgYW50aWNsb2Nrd2lzZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQVJDLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGFyY1RvKHgxOiBudW1iZXIsIHkxOiBudW1iZXIsIHgyOiBudW1iZXIsIHkyOiBudW1iZXIsIHJhZGl1czogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQVJDX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIHF1YWRyYXRpY0N1cnZlVG8oY3AxeDogbnVtYmVyLCBjcDF5OiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuUVVBRFJBVElDX0NVUlZFX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGJlemllckN1cnZlVG8oY3AxeDogbnVtYmVyLCBjcDF5OiBudW1iZXIsIGNwMng6IG51bWJlciwgY3AyeTogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkJFWklFUl9DVVJWRV9UTywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWxsKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkZJTEwpO1xuICB9XG5cbiAgcHVibGljIHN0cm9rZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5TVFJPS0UpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmRzLmNsZWFyKCk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRDb21tYW5kKG5hbWU6IERyYXdDb21tYW5kTmFtZSwgYXJncz86IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2NvbW1hbmRzLmFkZCh7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgYXJndW1lbnRzOiBhcmdzLFxuICAgICAgZmlsbFN0eWxlOiB0aGlzLmZpbGxTdHlsZSxcbiAgICAgIHN0cm9rZVN0eWxlOiB0aGlzLnN0cm9rZVN0eWxlLFxuICAgICAgbGluZVdpZHRoOiB0aGlzLmxpbmVXaWR0aCxcbiAgICAgIGxpbmVDYXA6IHRoaXMubGluZUNhcCxcbiAgICAgIGxpbmVKb2luOiB0aGlzLmxpbmVKb2luLFxuICAgICAgbWl0ZXJMaW1pdDogdGhpcy5taXRlckxpbWl0LFxuICAgIH0pO1xuICAgIGlmIChhcmdzKSB7XG4gICAgICB0aGlzLl91cGRhdGVCb3VuZHMobmFtZSwgLi4uYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUJvdW5kcyhuYW1lKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCb3VuZHModHlwZTogRHJhd0NvbW1hbmROYW1lLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBEcmF3Q29tbWFuZE5hbWUuUkVDVDpcbiAgICAgIGNhc2UgRHJhd0NvbW1hbmROYW1lLkZJTExfUkVDVDpcbiAgICAgICAgdGhpcy5fYm91bmRzLmV4dGVuZHMobmV3IFJlY3RhbmdsZSguLi5hcmdzKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEcmF3Q29tbWFuZE5hbWUuU1RST0tFX1JFQ1Q6XG4gICAgICAgIGNvbnN0IGxpbmVXaWR0aDogbnVtYmVyID0gdGhpcy5saW5lV2lkdGggKiAyO1xuICAgICAgICB0aGlzLl9ib3VuZHMuZXh0ZW5kcyhuZXcgUmVjdGFuZ2xlKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0gKyBsaW5lV2lkdGgsIGFyZ3NbM10gKyBsaW5lV2lkdGgpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERyYXdDb21tYW5kTmFtZS5NT1ZFX1RPOlxuICAgICAgICB0aGlzLl94ID0gYXJnc1swXTtcbiAgICAgICAgdGhpcy5feSA9IGFyZ3NbMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEcmF3Q29tbWFuZE5hbWUuTElORV9UTzpcbiAgICAgICAgdGhpcy5fYm91bmRzLmV4dGVuZHNQb3NpdGlvbih0aGlzLl94LCB0aGlzLl95KTtcbiAgICAgICAgdGhpcy5fYm91bmRzLmV4dGVuZHNQb3NpdGlvbihhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgdGhpcy5feCA9IGFyZ3NbMF07XG4gICAgICAgIHRoaXMuX3kgPSBhcmdzWzFdO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfVxufVxuIiwiaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBHcmFwaGljcyBmcm9tICcuL2dyYXBoaWNzJztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnZ2VvbS9yZWN0YW5nbGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFwZSBleHRlbmRzIERpc3BsYXkge1xuICBwdWJsaWMgZ3JhcGhpY3M6IEdyYXBoaWNzID0gbnVsbDtcblxuICBwdWJsaWMgZ2V0IGJvdW5kcygpOiBSZWN0YW5nbGUge1xuICAgIGNvbnN0IGJvdW5kczogUmVjdGFuZ2xlID0gdGhpcy5ncmFwaGljcy5ib3VuZHMuY2xvbmUoKTtcbiAgICBib3VuZHMuc2V0VG8odGhpcy54LCB0aGlzLnksIGJvdW5kcy53aWR0aCAqIHRoaXMuc2NhbGVYLCBib3VuZHMuaGVpZ2h0ICogdGhpcy5zY2FsZVkpO1xuICAgIHJldHVybiBib3VuZHM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihncmFwaGljczogR3JhcGhpY3MpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZ3JhcGhpY3MgPSBncmFwaGljcyB8fCBuZXcgR3JhcGhpY3MoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVEaXNwbGF5KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgY29tbWFuZCBvZiB0aGlzLmdyYXBoaWNzLmNvbW1hbmRMaXN0KSB7XG4gICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbW1hbmQuZmlsbFN0eWxlO1xuICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbW1hbmQuc3Ryb2tlU3R5bGU7XG4gICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGNvbW1hbmQubGluZVdpZHRoO1xuICAgICAgY29udGV4dC5saW5lQ2FwID0gY29tbWFuZC5saW5lQ2FwO1xuICAgICAgY29udGV4dC5saW5lSm9pbiA9IGNvbW1hbmQubGluZUpvaW47XG4gICAgICBjb250ZXh0Lm1pdGVyTGltaXQgPSBjb21tYW5kLm1pdGVyTGltaXQ7XG4gICAgICBpZiAoY29tbWFuZC5hcmd1bWVudHMpIHtcbiAgICAgICAgKGNvbnRleHQgYXMgYW55KVtjb21tYW5kLm5hbWVdKC4uLmNvbW1hbmQuYXJndW1lbnRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIChjb250ZXh0IGFzIGFueSlbY29tbWFuZC5uYW1lXSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tICcuLi9ldmVudC9ldmVudC1kaXNwYXRjaGVyJztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vZ2VvbS9yZWN0YW5nbGUnO1xuXG5leHBvcnQgZW51bSBTcHJpdGVTaGVldEV2ZW50IHtcbiAgTE9BRCA9ICdsb2FkJyxcbiAgRU5EID0gJ2VuZCcsXG59XG5cbmludGVyZmFjZSBGcmFtZSB7XG4gIFtpbmRleDogc3RyaW5nXTogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVTaGVldCBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBMT0FEOiBTcHJpdGVTaGVldEV2ZW50ID0gU3ByaXRlU2hlZXRFdmVudC5MT0FEO1xuXG4gIHByaXZhdGUgX2ltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfY2VsbFdpZHRoOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9jZWxsSGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9mcmFtZXM6IEZyYW1lW10gPSBudWxsO1xuICBwcml2YXRlIF9mcmFtZUluZGV4OiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSBfY3VycmVudEJvdW5kczogUmVjdGFuZ2xlID0gbnVsbDtcbiAgcHJpdmF0ZSBfbG9vcDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyBnZXQgaW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7IHJldHVybiB0aGlzLl9pbWFnZTsgfVxuICBwdWJsaWMgZ2V0IGNlbGxXaWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY2VsbFdpZHRoOyB9XG4gIHB1YmxpYyBnZXQgY2VsbEhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY2VsbEhlaWdodDsgfVxuICBwdWJsaWMgZ2V0IGN1cnJlbnRCb3VuZHMoKSB7IHJldHVybiB0aGlzLl9jdXJyZW50Qm91bmRzOyB9XG5cbiAgY29uc3RydWN0b3IoaW1nOiBIVE1MSW1hZ2VFbGVtZW50IHwgc3RyaW5nLCBjZWxsV2lkdGg6IG51bWJlciwgY2VsbEhlaWdodDogbnVtYmVyLCBmcmFtZXM6IEZyYW1lW10sIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBpZiAoaW1nIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgdGhpcy5faW1hZ2UgPSBpbWc7XG4gICAgICB0aGlzLnRyaWdnZXIoU3ByaXRlU2hlZXQuTE9BRCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaW1nID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IGltZztcbiAgICAgIHRoaXMuX2ltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB0aGlzLnRyaWdnZXIoU3ByaXRlU2hlZXQuTE9BRCkpO1xuICAgIH1cblxuICAgIHRoaXMuX2NlbGxXaWR0aCA9IGNlbGxXaWR0aDtcbiAgICB0aGlzLl9jZWxsSGVpZ2h0ID0gY2VsbEhlaWdodDtcbiAgICB0aGlzLl9mcmFtZXMgPSBmcmFtZXM7XG4gICAgdGhpcy5fZnJhbWVJbmRleCA9IC0xO1xuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMgPSBuZXcgUmVjdGFuZ2xlKDAsIDAsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCk7XG4gICAgdGhpcy5fbG9vcCA9IGxvb3A7XG4gIH1cblxuICBwdWJsaWMgbmV4dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZnJhbWVJbmRleCArIDEgPD0gdGhpcy5fZnJhbWVzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuX2ZyYW1lSW5kZXgrKztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2xvb3ApIHtcbiAgICAgICAgdGhpcy5fZnJhbWVJbmRleCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyaWdnZXIoU3ByaXRlU2hlZXRFdmVudC5FTkQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl91cGRhdGVCb3VuZHMoKTtcbiAgfVxuXG4gIHB1YmxpYyBwcmV2KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mcmFtZUluZGV4IC0gMSA+IDApIHtcbiAgICAgIHRoaXMuX2ZyYW1lSW5kZXgtLTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2xvb3ApIHtcbiAgICAgICAgdGhpcy5fZnJhbWVJbmRleCA9IHRoaXMuX2ZyYW1lcy5sZW5ndGggLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKFNwcml0ZVNoZWV0RXZlbnQuRU5EKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlQm91bmRzKCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZnJhbWVJbmRleCA9IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQm91bmRzKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRGcmFtZSA9IHRoaXMuX2ZyYW1lc1t0aGlzLl9mcmFtZUluZGV4XTtcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzLnggPSBjdXJyZW50RnJhbWVbMF0gKiB0aGlzLl9jZWxsV2lkdGg7XG4gICAgdGhpcy5fY3VycmVudEJvdW5kcy55ID0gY3VycmVudEZyYW1lWzFdICogdGhpcy5fY2VsbEhlaWdodDtcbiAgfVxufVxuIiwiaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBTcHJpdGVTaGVldCwgeyBTcHJpdGVTaGVldEV2ZW50IH0gZnJvbSAnLi9zcHJpdGUtc2hlZXQnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuLi91dGlsL3RpY2tlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSBleHRlbmRzIERpc3BsYXkge1xuICBwcml2YXRlIF9zcHJpdGVTaGVldDogU3ByaXRlU2hlZXQgPSBudWxsO1xuICBwcml2YXRlIF9mcHM6IG51bWJlciA9IDEwO1xuICBwcml2YXRlIF90aWNrZXI6IFRpY2tlciA9IG51bGw7XG5cbiAgY29uc3RydWN0b3Ioc3ByaXRlU2hlZXQ6IFNwcml0ZVNoZWV0LCBmcHM6IG51bWJlciA9IDEwKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zcHJpdGVTaGVldCA9IHNwcml0ZVNoZWV0O1xuICAgIHRoaXMuX2ZwcyA9IGZwcztcbiAgICB0aGlzLl90aWNrZXIgPSBuZXcgVGlja2VyKGZwcyk7XG4gICAgdGhpcy5fdGlja2VyLm9uKFRpY2tlci5USUNLLCAoKSA9PiB0aGlzLl90aWNrZXJIYW5kbGVyKCkpO1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0Lm9uKFNwcml0ZVNoZWV0RXZlbnQuRU5ELCAoKSA9PiB0aGlzLnN0b3AoKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNwcml0ZVNoZWV0KCk6IFNwcml0ZVNoZWV0IHsgcmV0dXJuIHRoaXMuX3Nwcml0ZVNoZWV0OyB9XG4gIHB1YmxpYyBnZXQgZnBzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9mcHM7IH1cblxuICBwdWJsaWMgc2V0IHNwcml0ZVNoZWV0KHNwcml0ZVNoZWV0OiBTcHJpdGVTaGVldCkge1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0ID0gc3ByaXRlU2hlZXQ7XG4gICAgdGhpcy5fYm91bmRzLndpZHRoID0gc3ByaXRlU2hlZXQuY2VsbFdpZHRoO1xuICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSBzcHJpdGVTaGVldC5jZWxsSGVpZ2h0O1xuICB9XG5cbiAgcHVibGljIHNldCBmcHModmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2ZwcyA9IHZhbHVlO1xuICAgIHRoaXMuX3RpY2tlci5mcHMgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBwbGF5KCk6IHZvaWQge1xuICAgIHRoaXMuX3RpY2tlckhhbmRsZXIoKTtcbiAgICB0aGlzLl90aWNrZXIucnVuKCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc3ByaXRlU2hlZXQucmVzZXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuX3RpY2tlci5zdG9wKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRGlzcGxheShjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLl9zcHJpdGVTaGVldC5jdXJyZW50Qm91bmRzO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgdGhpcy5fc3ByaXRlU2hlZXQuaW1hZ2UsXG4gICAgICBib3VuZHMubGVmdCxcbiAgICAgIGJvdW5kcy50b3AsXG4gICAgICBib3VuZHMud2lkdGgsXG4gICAgICBib3VuZHMuaGVpZ2h0LFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICBib3VuZHMud2lkdGgsXG4gICAgICBib3VuZHMuaGVpZ2h0LFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF90aWNrZXJIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0Lm5leHQoKTtcbiAgICB0aGlzLnN0YWdlLmNoYW5nZWQgPSB0cnVlO1xuICAgIHRoaXMuc3RhZ2UudXBkYXRlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBEaXNwbGF5Q29udGFpbmVyIGZyb20gJy4vZGlzcGxheS1jb250YWluZXInO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuLi9nZW9tL3JlY3RhbmdsZSc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4uL3V0aWwvdGlja2VyJztcbmltcG9ydCBEaXNwbGF5IGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgTW91c2VFdmVudCBmcm9tICcuLi9ldmVudC9tb3VzZS1ldmVudCc7XG5cbmVudW0gU3RhZ2VFdmVudFR5cGUge1xuICBBRERfVE9fU1RBR0UgPSAnYWRkVG9TdGFnZScsXG4gIFJFTU9WRV9UT19TVEFHRSA9ICdyZW1vdmVUb1N0YWdlJyxcbiAgRU5URVJfRlJBTUUgPSAnZW50ZXJGcmFtZScsXG59XG5cbmludGVyZmFjZSBFdmVudFRhcmdldE1hcCB7XG4gIFtwcm9wOiBzdHJpbmddOiBEaXNwbGF5W107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlIGV4dGVuZHMgRGlzcGxheUNvbnRhaW5lciB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBBRERfVE9fU1RBR0U6IFN0YWdlRXZlbnRUeXBlID0gU3RhZ2VFdmVudFR5cGUuQUREX1RPX1NUQUdFO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJFTU9WRV9UT19TVEFHRTogU3RhZ2VFdmVudFR5cGUgPSBTdGFnZUV2ZW50VHlwZS5SRU1PVkVfVE9fU1RBR0U7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgRU5URVJfRlJBTUU6IFN0YWdlRXZlbnRUeXBlID0gU3RhZ2VFdmVudFR5cGUuRU5URVJfRlJBTUU7XG5cbiAgcHVibGljIGNoYW5nZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IG51bGw7XG4gIHByaXZhdGUgX2V2ZW50Q2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IG51bGw7XG4gIHByaXZhdGUgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IG51bGw7XG4gIHByaXZhdGUgX2V2ZW50Q29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gbnVsbDtcbiAgcHJpdmF0ZSBfdGlja2VyOiBUaWNrZXIgPSBudWxsO1xuICBwcml2YXRlIF9ldmVudFRhcmdldE1hcDogRXZlbnRUYXJnZXRNYXAgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50IHwgc3RyaW5nLCBmcHM6IG51bWJlciwgcmVuZGVyT25seTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgdGhpcy5fY2FudmFzID0gY2FudmFzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXMpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIH1cblxuICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLl9zdGFnZSA9IHRoaXM7XG4gICAgdGhpcy5fYm91bmRzID0gbmV3IFJlY3RhbmdsZSgwLCAwLCB0aGlzLl9jYW52YXMud2lkdGgsIHRoaXMuX2NhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuX2luaXRGUFMoZnBzKTtcblxuICAgIGlmICghcmVuZGVyT25seSkge1xuICAgICAgdGhpcy5faW5pdEV2ZW50Q2FudmFzKCk7XG4gICAgICB0aGlzLl9pbml0RXZlbnQoKTtcbiAgICAgIHRoaXMuX2luaXRTdGFnZVJlZ2lvbigpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHsgcmV0dXJuIHRoaXMuX2NhbnZhczsgfVxuICBwdWJsaWMgZ2V0IGV2ZW50Q2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHsgcmV0dXJuIHRoaXMuX2V2ZW50Q2FudmFzOyB9XG4gIHB1YmxpYyBnZXQgY29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgeyByZXR1cm4gdGhpcy5fY29udGV4dDsgfVxuICBwdWJsaWMgZ2V0IGV2ZW50Q29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgeyByZXR1cm4gdGhpcy5fZXZlbnRDb250ZXh0OyB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGFuZ2VkKSB7XG4gICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgICAvLyB0aGlzLl9ldmVudENhbnZhcy53aWR0aCA9IHRoaXMuX2V2ZW50Q2FudmFzLndpZHRoO1xuICAgICAgc3VwZXIudXBkYXRlKCk7XG4gICAgICB0aGlzLmNoYW5nZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJFdmVudE1hcChkaXNwbGF5OiBEaXNwbGF5KTogdm9pZCB7XG4gICAgY29uc3QgY2hpbGRFdmVudE1hcCA9IGRpc3BsYXkuZXZlbnRNYXA7XG4gICAgZm9yIChjb25zdCB0eXBlIGluIGNoaWxkRXZlbnRNYXApIHtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0pIHtcbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdLnB1c2goZGlzcGxheSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVucmVnaXN0ZXJFdmVudE1hcChkaXNwbGF5OiBEaXNwbGF5KSB7XG4gICAgY29uc3QgY2hpbGRFdmVudE1hcCA9IGRpc3BsYXkuZXZlbnRNYXA7XG4gICAgZm9yIChjb25zdCB0eXBlIGluIGNoaWxkRXZlbnRNYXApIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0uaW5kZXhPZihkaXNwbGF5KTtcbiAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZQUyhmcHM6IG51bWJlcikge1xuICAgIGlmIChmcHMpIHtcbiAgICAgIHRoaXMuX3RpY2tlciA9IG5ldyBUaWNrZXIoZnBzKTtcbiAgICAgIHRoaXMuX3RpY2tlci5vbihUaWNrZXIuVElDSywgKGRlbHRhKSA9PiB7XG4gICAgICAgIHRoaXMudHJpZ2dlcihTdGFnZS5FTlRFUl9GUkFNRSwgZGVsdGEpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl90aWNrZXIucnVuKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEV2ZW50Q2FudmFzKCkge1xuICAgIHRoaXMuX2V2ZW50Q2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5fZXZlbnRDYW52YXMud2lkdGggPSB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgdGhpcy5fZXZlbnRDYW52YXMuaGVpZ2h0ID0gdGhpcy5fY2FudmFzLmhlaWdodDtcbiAgICB0aGlzLl9ldmVudENvbnRleHQgPSB0aGlzLl9ldmVudENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIC8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIHRoaXMuX2V2ZW50Q2FudmFzICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RXZlbnQoKSB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuX2NhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyB0aGlzLl9jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAvLyAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gICBpZiAoIXRoaXMuX2V2ZW50VGFyZ2V0TWFwW01vdXNlRXZlbnQuQ0xJQ0tdIHx8ICF0aGlzLl9ldmVudFRhcmdldE1hcFtNb3VzZUV2ZW50LkNMSUNLXS5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgLy8gICBjb25zdCB4ID0gZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAvLyAgIGNvbnN0IHkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgLy8gICBjb25zdCBjb2xvciA9IHRoaXMuX2V2ZW50Q29udGV4dC5nZXRJbWFnZURhdGEoeCwgeSwgMSwgMSk7XG4gICAgLy8gICBjb25zdCByID0gY29sb3IuZGF0YVswXS50b1N0cmluZygxNik7XG4gICAgLy8gICBjb25zdCBnID0gY29sb3IuZGF0YVsxXS50b1N0cmluZygxNik7XG4gICAgLy8gICBjb25zdCBiID0gY29sb3IuZGF0YVsyXS50b1N0cmluZygxNik7XG4gICAgLy8gICBjb25zdCBjb2xvcktleSA9ICcwJy5yZXBlYXQoMiAtIHIubGVuZ3RoKSArIHIgKyAnMCcucmVwZWF0KDIgLSBnLmxlbmd0aCkgKyBnICsgJzAnLnJlcGVhdCgyIC0gYi5sZW5ndGgpICsgYjtcbiAgICAvLyAgIGZvciAobGV0IGkgPSB0aGlzLl9ldmVudFRhcmdldE1hcFtNb3VzZUV2ZW50LkNMSUNLXS5sZW5ndGggLSAxLCBjb3VudCA9IDA7IGkgPj0gY291bnQ7IGkgLT0gMSkge1xuICAgIC8vICAgICBjb25zdCBpdGVtID0gdGhpcy5fZXZlbnRUYXJnZXRNYXBbTW91c2VFdmVudC5DTElDS11baV07XG4gICAgLy8gICAgIGlmIChjb2xvcktleSA9PT0gaXRlbS5jb2xvcktleSkge1xuICAgIC8vICAgICAgIC8vIFRPRE86dGFyZ2V0IC8gY3VycmVudFRhcmdldCDqtazrtoRcbiAgICAvLyAgICAgICBpdGVtLnRyaWdnZXIoTW91c2VFdmVudC5DTElDSywgbmV3IE1vdXNlRXZlbnQoTW91c2VFdmVudC5DTElDSywge30sIGl0ZW0sIGl0ZW0pKTtcbiAgICAvLyAgICAgICBicmVhaztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFN0YWdlUmVnaW9uKCk6IHZvaWQge1xuICAgIC8vXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0YWdlUmVnaW9uIHtcblxuICBwcml2YXRlIF93aWR0aDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9yb3c6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NvbDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfbWFwOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBfZGlzcGxheUxpc3Q6IERpc3BsYXlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjb2w6IG51bWJlciwgcm93OiBudW1iZXIpIHtcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLl9jb2wgPSBjb2w7XG4gICAgdGhpcy5fcm93ID0gcm93O1xuICB9XG5cbiAgcHVibGljIGFkZChkaXNwbGF5OiBEaXNwbGF5KTogdm9pZCB7XG4gICAgLy8gLi5cbiAgfVxufVxuIiwiXG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5cbnR5cGUgRXZlbnRIYW5kbGVyID0gKGV2ZW50OiBFdmVudCwgZGF0YTogYW55KSA9PiB2b2lkO1xuXG5pbnRlcmZhY2UgRXZlbnRNYXAge1xuICBbcHJvcDogc3RyaW5nXTogRXZlbnRIYW5kbGVyW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XG4gIHByaXZhdGUgX2V2ZW50TWFwOiBFdmVudE1hcCA9IHt9O1xuXG4gIHB1YmxpYyBnZXQgZXZlbnRNYXAoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRNYXA7XG4gIH1cblxuICBwdWJsaWMgb24odHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudEhhbmRsZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50TWFwW3R5cGVdKSB7XG4gICAgICB0aGlzLl9ldmVudE1hcFt0eXBlXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLl9ldmVudE1hcFt0eXBlXS5wdXNoKGhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIG9mZih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50SGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICBpZiAodGhpcy5fZXZlbnRNYXBbdHlwZV0pIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9ldmVudE1hcFt0eXBlXS5pbmRleE9mKGhhbmRsZXIpO1xuICAgICAgICB0aGlzLl9ldmVudE1hcFt0eXBlXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fZXZlbnRNYXBbdHlwZV0pIHtcbiAgICAgICAgdGhpcy5fZXZlbnRNYXBbdHlwZV0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB0cmlnZ2VyKHR5cGU6IHN0cmluZywgZGF0YT86IGFueSkge1xuICAgIGlmICh0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuX2V2ZW50TWFwW3R5cGVdKSB7XG4gICAgICAgIGl0ZW0uY2FsbCh0aGlzLCBkYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnQge1xuICBwcml2YXRlIF90eXBlOiBzdHJpbmcgPSBudWxsO1xuICBwcml2YXRlIF9kYXRhOiBhbnkgPSBudWxsO1xuXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90eXBlO1xuICB9XG5cbiAgcHVibGljIGdldCBkYXRhKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICBwdWJsaWMgc2V0IHR5cGUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3R5cGUgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICB9XG5cbiAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XG4gICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gIH1cbn1cbiIsImltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50JztcbmltcG9ydCBEaXNwbGF5IGZyb20gJy4uL2Rpc3BsYXkvZGlzcGxheSc7XG5cbmVudW0gTW91c2VFdmVudFR5cGUge1xuICBDTElDSyA9ICdjbGljaycsXG4gIE1PVVNFX09WRVIgPSAnbW91c2VPdmVyJyxcbiAgTU9VU0VfT1VUID0gJ21vdXNlT3V0Jyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW91c2VFdmVudCBleHRlbmRzIEV2ZW50IHtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENMSUNLOiBNb3VzZUV2ZW50VHlwZSA9IE1vdXNlRXZlbnRUeXBlLkNMSUNLO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE1PVVNFX09WRVI6IE1vdXNlRXZlbnRUeXBlID0gTW91c2VFdmVudFR5cGUuTU9VU0VfT1ZFUjtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBNT1VTRV9PVVQ6IE1vdXNlRXZlbnRUeXBlID0gTW91c2VFdmVudFR5cGUuTU9VU0VfT1VUO1xuXG4gIHByaXZhdGUgX3RhcmdldDogRGlzcGxheSA9IG51bGw7XG4gIHByaXZhdGUgX2N1cnJlbnRUYXJnZXQ6IERpc3BsYXkgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHR5cGU6IE1vdXNlRXZlbnRUeXBlLCBkYXRhOiBhbnksIHRhcmdldDogRGlzcGxheSwgY3VycmVudFRhcmdldDogRGlzcGxheSkge1xuICAgIHN1cGVyKHR5cGUsIGRhdGEpO1xuICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLl9jdXJyZW50VGFyZ2V0ID0gY3VycmVudFRhcmdldDtcbiAgfVxufVxuIiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRyaXgge1xuICBwdWJsaWMgYTogbnVtYmVyID0gMTtcbiAgcHVibGljIGI6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBjOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgZDogbnVtYmVyID0gMTtcbiAgcHVibGljIHR4OiBudW1iZXIgPSAwO1xuICBwdWJsaWMgdHk6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoYTogbnVtYmVyID0gMSwgYjogbnVtYmVyID0gMCwgYzogbnVtYmVyID0gMCwgZDogbnVtYmVyID0gMSwgdHg6IG51bWJlciA9IDAsIHR5OiBudW1iZXIgPSAwKSB7XG4gICAgdGhpcy5zZXRUbyhhLCBiLCBjLCBkLCB0eCwgdHkpO1xuICB9XG5cbiAgcHVibGljIHNldFRvKGE6IG51bWJlciwgYjogbnVtYmVyLCBjOiBudW1iZXIsIGQ6IG51bWJlciwgdHg6IG51bWJlciwgdHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuYSA9IGE7XG4gICAgdGhpcy5iID0gYjtcbiAgICB0aGlzLmMgPSBjO1xuICAgIHRoaXMuZCA9IGQ7XG4gICAgdGhpcy50eCA9IHR4O1xuICAgIHRoaXMudHkgPSB0eTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRUb01hdHJpeChtYXRyaXg6IE1hdHJpeCk6IHZvaWQge1xuICAgIHRoaXMuYSA9IG1hdHJpeC5hO1xuICAgIHRoaXMuYiA9IG1hdHJpeC5iO1xuICAgIHRoaXMuYyA9IG1hdHJpeC5jO1xuICAgIHRoaXMuZCA9IG1hdHJpeC5kO1xuICAgIHRoaXMudHggPSBtYXRyaXgudHg7XG4gICAgdGhpcy50eSA9IG1hdHJpeC50eTtcbiAgfVxuXG4gIHB1YmxpYyBhZGQobWF0cml4OiBNYXRyaXgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5zZXRUbyh0aGlzLmEgKyBtYXRyaXguYSwgdGhpcy5iICsgbWF0cml4LmIsIHRoaXMuYyArIG1hdHJpeC5jLCB0aGlzLmQgKyBtYXRyaXguZCwgdGhpcy50eCArIG1hdHJpeC50eCwgdGhpcy50eSArIG1hdHJpeC50eSk7XG4gIH1cblxuICBwdWJsaWMgc3ViKG1hdHJpeDogTWF0cml4KTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuc2V0VG8odGhpcy5hIC0gbWF0cml4LmEsIHRoaXMuYiAtIG1hdHJpeC5iLCB0aGlzLmMgLSBtYXRyaXguYywgdGhpcy5kIC0gbWF0cml4LmQsIHRoaXMudHggLSBtYXRyaXgudHgsIHRoaXMudHkgLSBtYXRyaXgudHkpO1xuICB9XG5cbiAgcHVibGljIG11bHRpKG1hdHJpeDogTWF0cml4KTogdm9pZCB7XG4gICAgbGV0IGE6IG51bWJlcjtcbiAgICBsZXQgYjogbnVtYmVyO1xuICAgIGxldCBjOiBudW1iZXI7XG4gICAgbGV0IGQ6IG51bWJlcjtcbiAgICBsZXQgdHg6IG51bWJlcjtcbiAgICBsZXQgdHk6IG51bWJlcjtcblxuICAgIGlmICh0eXBlb2YgbWF0cml4ID09PSAnbnVtYmVyJykge1xuICAgICAgYSA9IHRoaXMuYSAqIG1hdHJpeDtcbiAgICAgIGIgPSB0aGlzLmIgKiBtYXRyaXg7XG4gICAgICBjID0gdGhpcy5jICogbWF0cml4O1xuICAgICAgZCA9IHRoaXMuZCAqIG1hdHJpeDtcbiAgICAgIHR4ID0gdGhpcy50eCAqIG1hdHJpeDtcbiAgICAgIHR5ID0gdGhpcy50eSAqIG1hdHJpeDtcbiAgICB9IGVsc2Uge1xuICAgICAgYSA9ICh0aGlzLmEgKiBtYXRyaXguYSkgKyAodGhpcy5jICogbWF0cml4LmIpO1xuICAgICAgYiA9ICh0aGlzLmIgKiBtYXRyaXguYSkgKyAodGhpcy5kICogbWF0cml4LmIpO1xuICAgICAgYyA9ICh0aGlzLmEgKiBtYXRyaXguYykgKyAodGhpcy5jICogbWF0cml4LmQpO1xuICAgICAgZCA9ICh0aGlzLmIgKiBtYXRyaXguYykgKyAodGhpcy5kICogbWF0cml4LmQpO1xuICAgICAgdHggPSAodGhpcy5hICogbWF0cml4LnR4KSArICh0aGlzLmMgKiBtYXRyaXgudHkpICsgdGhpcy50eDtcbiAgICAgIHR5ID0gKHRoaXMuYiAqIG1hdHJpeC50eCkgKyAodGhpcy5kICogbWF0cml4LnR5KSArIHRoaXMudHk7XG4gICAgfVxuICAgIHRoaXMuc2V0VG8oYSwgYiwgYywgZCwgdHgsIHR5KTtcbiAgfVxuXG4gIHB1YmxpYyBpbnZlcnNlKCk6IE1hdHJpeCB7XG4gICAgY29uc3QgeyBhLCBiLCBjLCBkLCB0eCwgdHkgfSA9IHRoaXM7XG4gICAgY29uc3QgbiA9IGEgKiBkIC0gYiAqIGM7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXgoZCAvIG4sIC1iIC8gbiwgLWMgLyBuLCBhIC8gbiwgKGMgKiB0aGlzLnR5IC0gZCAqIHR4KSAvIG4sIChiICogdHggLSBhICogdGhpcy50eSkgLyBuKTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9uZSgpOiBNYXRyaXgge1xuICAgIHJldHVybiBuZXcgTWF0cml4KHRoaXMuYSwgdGhpcy5iLCB0aGlzLmMsIHRoaXMuZCwgdGhpcy50eCwgdGhpcy50eSk7XG4gIH1cblxuICBwdWJsaWMgc2NhbGUoeDogbnVtYmVyID0gMSwgeTogbnVtYmVyID0gMSk6IHZvaWQge1xuICAgIHRoaXMubXVsdGkobmV3IE1hdHJpeCh4LCAwLCAwLCB5LCAwLCAwKSk7XG4gIH1cblxuICBwdWJsaWMgdHJhbnNsYXRlKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpKG5ldyBNYXRyaXgoMSwgMCwgMCwgMSwgeCwgeSkpO1xuICB9XG5cbiAgcHVibGljIHJvdGF0ZShhbmdsZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5tdWx0aShuZXcgTWF0cml4KE1hdGguY29zKGFuZ2xlKSwgTWF0aC5zaW4oYW5nbGUpLCAtTWF0aC5zaW4oYW5nbGUpLCBNYXRoLmNvcyhhbmdsZSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBza2V3KHggPSAwLCB5ID0gMCk6IHZvaWQge1xuICAgIHRoaXMubXVsdGkobmV3IE1hdHJpeCgxLCBNYXRoLnRhbih5KSwgTWF0aC50YW4oeCksIDEsIDAsIDApKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFRvKDEsIDAsIDAsIDEsIDAsIDApO1xuICB9XG5cbiAgcHVibGljIGVxdWFscyhtYXRyaXg6IE1hdHJpeCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmEgPT09IG1hdHJpeC5hICYmIHRoaXMuYiA9PT0gbWF0cml4LmIgJiYgdGhpcy5jID09PSBtYXRyaXguYyAmJiB0aGlzLmQgPT09IG1hdHJpeC5kICYmIHRoaXMudHggPT09IG1hdHJpeC50eCAmJiB0aGlzLnR5ID09PSBtYXRyaXgudHk7XG4gIH1cbn1cbiIsImltcG9ydCBNYXRyaXggZnJvbSAnLi9tYXRyaXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb2ludCB7XG4gIHB1YmxpYyB4OiBudW1iZXIgPSAwO1xuICBwdWJsaWMgeTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG5cbiAgcHVibGljIGRpc3RhbmNlKHBvaW50OiBQb2ludCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhwb2ludC54IC0gdGhpcy54LCAyKSArIE1hdGgucG93KHBvaW50LnkgLSB0aGlzLnksIDIpKTtcbiAgfVxuXG4gIHB1YmxpYyByb3RhdGUocmFkaWFuOiBudW1iZXIpOiBQb2ludCB7XG4gICAgY29uc3QgbWF0cml4OiBNYXRyaXggPSBuZXcgTWF0cml4KE1hdGguY29zKHJhZGlhbiksIE1hdGguc2luKHJhZGlhbiksIC1NYXRoLnNpbihyYWRpYW4pLCBNYXRoLmNvcyhyYWRpYW4pKTtcbiAgICBjb25zdCBweDogbnVtYmVyID0gKG1hdHJpeC5hICogdGhpcy54KSArIChtYXRyaXguYyAqIHRoaXMueSk7XG4gICAgY29uc3QgcHk6IG51bWJlciA9IChtYXRyaXguYiAqIHRoaXMueCkgKyAobWF0cml4LmQgKiB0aGlzLnkpO1xuICAgIHJldHVybiBuZXcgUG9pbnQocHgsIHB5KTtcbiAgfVxuXG4gIHB1YmxpYyBzY2FsZShzY2FsZVg6IG51bWJlciwgc2NhbGVZOiBudW1iZXIpOiBQb2ludCB7XG4gICAgY29uc3QgbWF0cml4OiBNYXRyaXggPSBuZXcgTWF0cml4KHNjYWxlWCwgMCwgMCwgc2NhbGVZKTtcbiAgICBjb25zdCBweDogbnVtYmVyID0gKG1hdHJpeC5hICogdGhpcy54KSArIChtYXRyaXguYyAqIHRoaXMueSk7XG4gICAgY29uc3QgcHk6IG51bWJlciA9IChtYXRyaXguYiAqIHRoaXMueCkgKyAobWF0cml4LmQgKiB0aGlzLnkpO1xuICAgIHJldHVybiBuZXcgUG9pbnQocHgsIHB5KTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFuc2xhdGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBQb2ludCB7XG4gICAgY29uc3QgbWF0cml4OiBNYXRyaXggPSBuZXcgTWF0cml4KDEsIDAsIDAsIDEsIHgsIHkpO1xuICAgIGNvbnN0IHB4OiBudW1iZXIgPSAobWF0cml4LmEgKiB0aGlzLngpICsgKG1hdHJpeC5jICogdGhpcy55KSArIG1hdHJpeC50eDtcbiAgICBjb25zdCBweTogbnVtYmVyID0gKG1hdHJpeC5iICogdGhpcy54KSArIChtYXRyaXguZCAqIHRoaXMueSkgKyBtYXRyaXgudHk7XG4gICAgcmV0dXJuIG5ldyBQb2ludChweCwgcHkpO1xuICB9XG5cbiAgcHVibGljIHNrZXcoc2tld1g6IG51bWJlciwgc2tld1k6IG51bWJlcik6IFBvaW50IHtcbiAgICBjb25zdCBtYXRyaXg6IE1hdHJpeCA9IG5ldyBNYXRyaXgoMSwgTWF0aC50YW4oc2tld1gpLCBNYXRoLnRhbihza2V3WSksIDEpO1xuICAgIGNvbnN0IHB4OiBudW1iZXIgPSAobWF0cml4LmEgKiB0aGlzLngpICsgKG1hdHJpeC5jICogdGhpcy55KTtcbiAgICBjb25zdCBweTogbnVtYmVyID0gKG1hdHJpeC5iICogdGhpcy54KSArIChtYXRyaXguZCAqIHRoaXMueSk7XG4gICAgcmV0dXJuIG5ldyBQb2ludChweCwgcHkpO1xuICB9XG59XG4iLCJpbXBvcnQgUG9pbnQgZnJvbSAnLi9wb2ludCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3RhbmdsZSB7XG5cbiAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2hlaWdodDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfbGVmdFRvcDogUG9pbnQgPSBudWxsO1xuICBwcml2YXRlIF9yaWdodFRvcDogUG9pbnQgPSBudWxsO1xuICBwcml2YXRlIF9sZWZ0Qm90dG9tOiBQb2ludCA9IG51bGw7XG4gIHByaXZhdGUgX3JpZ2h0Qm90dG9tOiBQb2ludCA9IG51bGw7XG5cbiAgcHVibGljIGdldCB4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZWZ0VG9wLng7IH1cbiAgcHVibGljIGdldCB5KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZWZ0VG9wLnk7IH1cbiAgcHVibGljIGdldCB3aWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH1cbiAgcHVibGljIGdldCBoZWlnaHQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2hlaWdodDsgfVxuICBwdWJsaWMgZ2V0IGxlZnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xlZnRUb3AueDsgfVxuICBwdWJsaWMgZ2V0IHJpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9yaWdodFRvcC54OyB9XG4gIHB1YmxpYyBnZXQgdG9wKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZWZ0VG9wLnk7IH1cbiAgcHVibGljIGdldCBib3R0b20oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xlZnRCb3R0b20ueTsgfVxuICBwdWJsaWMgZ2V0IGxlZnRUb3AoKTogUG9pbnQgeyByZXR1cm4gdGhpcy5fbGVmdFRvcDsgfVxuICBwdWJsaWMgZ2V0IHJpZ2h0VG9wKCk6IFBvaW50IHsgcmV0dXJuIHRoaXMuX3JpZ2h0VG9wOyB9XG4gIHB1YmxpYyBnZXQgbGVmdEJvdHRvbSgpOiBQb2ludCB7IHJldHVybiB0aGlzLl9sZWZ0Qm90dG9tOyB9XG4gIHB1YmxpYyBnZXQgcmlnaHRCb3R0b20oKTogUG9pbnQgeyByZXR1cm4gdGhpcy5fcmlnaHRCb3R0b207IH1cblxuICBwdWJsaWMgc2V0IHgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2xlZnRUb3AueCA9IHZhbHVlO1xuICAgIHRoaXMuX2xlZnRCb3R0b20ueCA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZVJpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHkodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2xlZnRUb3AueSA9IHZhbHVlO1xuICAgIHRoaXMuX2xlZnRCb3R0b20ueSA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZUJvdHRvbSgpO1xuICB9XG5cbiAgcHVibGljIHNldCB3aWR0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVSaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCBoZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZUJvdHRvbSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBsZWZ0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmxlZnRUb3AueCA9IHZhbHVlO1xuICAgIHRoaXMubGVmdEJvdHRvbS54ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlV2lkdGgoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcmlnaHQodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMucmlnaHRUb3AueCA9IHZhbHVlO1xuICAgIHRoaXMucmlnaHRCb3R0b20ueCA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHRvcCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sZWZ0VG9wLnkgPSB2YWx1ZTtcbiAgICB0aGlzLnJpZ2h0VG9wLnkgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgYm90dG9tKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmxlZnRCb3R0b20ueSA9IHZhbHVlO1xuICAgIHRoaXMucmlnaHRCb3R0b20ueSA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCBsZWZ0VG9wKHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMuX2xlZnRUb3AgPSBwb2ludDtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCByaWdodFRvcChwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLl9yaWdodFRvcCA9IHBvaW50O1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGxlZnRCb3R0b20ocG9pbnQ6IFBvaW50KSB7XG4gICAgdGhpcy5fbGVmdEJvdHRvbSA9IHBvaW50O1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHJpZ2h0Qm90dG9tKHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMuX3JpZ2h0Qm90dG9tID0gcG9pbnQ7XG4gICAgdGhpcy5fdXBkYXRlV2lkdGgoKTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDAsIHdpZHRoOiBudW1iZXIgPSAwLCBoZWlnaHQ6IG51bWJlciA9IDApIHtcbiAgICB0aGlzLl9sZWZ0VG9wID0gbmV3IFBvaW50KCk7XG4gICAgdGhpcy5fcmlnaHRUb3AgPSBuZXcgUG9pbnQoKTtcbiAgICB0aGlzLl9sZWZ0Qm90dG9tID0gbmV3IFBvaW50KCk7XG4gICAgdGhpcy5fcmlnaHRCb3R0b20gPSBuZXcgUG9pbnQoKTtcbiAgICB0aGlzLnNldFRvKHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgcHVibGljIGNvbnRhaW5zKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHggPj0gdGhpcy5sZWZ0ICYmIHggPD0gdGhpcy5yaWdodCAmJiB5IDw9IHRoaXMuYm90dG9tICYmIHkgPj0gdGhpcy50b3A7XG4gIH1cblxuICBwdWJsaWMgY29udGFpbnNSZWN0KHJlY3RhbmdsZTogUmVjdGFuZ2xlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJlY3RhbmdsZS5sZWZ0ID49IHRoaXMubGVmdCAmJiByZWN0YW5nbGUucmlnaHQgPD0gdGhpcy5yaWdodCAmJiByZWN0YW5nbGUudG9wID49IHRoaXMudG9wICYmIHJlY3RhbmdsZS5ib3R0b20gPD0gdGhpcy5ib3R0b207XG4gIH1cblxuICBwdWJsaWMgaW50ZXJzZWN0cyhyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5zKHJlY3RhbmdsZS5sZWZ0ICsgMSwgcmVjdGFuZ2xlLnRvcCArIDEpIHx8IHRoaXMuY29udGFpbnMocmVjdGFuZ2xlLmxlZnQgKyAxLCByZWN0YW5nbGUuYm90dG9tIC0gMSkgfHwgdGhpcy5jb250YWlucyhyZWN0YW5nbGUucmlnaHQgLSAxLCByZWN0YW5nbGUudG9wICsgMSkgfHwgdGhpcy5jb250YWlucyhyZWN0YW5nbGUucmlnaHQgLSAxLCByZWN0YW5nbGUuYm90dG9tIC0gMSk7XG4gIH1cblxuICBwdWJsaWMgaW50ZXJzZWN0aW9uKHJlY3RhbmdsZTogUmVjdGFuZ2xlKTogUmVjdGFuZ2xlIHtcbiAgICBsZXQgcmVzdWx0OiBSZWN0YW5nbGUgPSBudWxsO1xuICAgIGlmICh0aGlzLmludGVyc2VjdHMocmVjdGFuZ2xlKSkge1xuICAgICAgcmVzdWx0ID0gbmV3IFJlY3RhbmdsZSgpO1xuICAgICAgcmVzdWx0LmxlZnQgPSBNYXRoLm1heChyZWN0YW5nbGUubGVmdCwgdGhpcy5sZWZ0KTtcbiAgICAgIHJlc3VsdC5yaWdodCA9IE1hdGgubWluKHJlY3RhbmdsZS5yaWdodCwgdGhpcy5yaWdodCk7XG4gICAgICByZXN1bHQudG9wID0gTWF0aC5tYXgocmVjdGFuZ2xlLnRvcCwgdGhpcy50b3ApO1xuICAgICAgcmVzdWx0LmJvdHRvbSA9IE1hdGgubWluKHJlY3RhbmdsZS5ib3R0b20sIHRoaXMuYm90dG9tKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBleHRlbmRzKHJlY3RhbmdsZTogUmVjdGFuZ2xlKTogdm9pZCB7XG4gICAgY29uc3QgbGVmdDogbnVtYmVyID0gTWF0aC5taW4odGhpcy5sZWZ0LCByZWN0YW5nbGUubGVmdCk7XG4gICAgY29uc3QgcmlnaHQ6IG51bWJlciA9IE1hdGgubWF4KHRoaXMucmlnaHQsIHJlY3RhbmdsZS5yaWdodCk7XG4gICAgY29uc3QgdG9wOiBudW1iZXIgPSBNYXRoLm1pbih0aGlzLnRvcCwgcmVjdGFuZ2xlLnRvcCk7XG4gICAgY29uc3QgYm90dG9tOiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLmJvdHRvbSwgcmVjdGFuZ2xlLmJvdHRvbSk7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gICAgdGhpcy5ib3R0b20gPSBib3R0b207XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kc1ZhbHVlKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGxlZnQ6IG51bWJlciA9IE1hdGgubWluKHRoaXMubGVmdCwgeCk7XG4gICAgY29uc3QgcmlnaHQ6IG51bWJlciA9IE1hdGgubWF4KHRoaXMucmlnaHQsIHggKyB3aWR0aCk7XG4gICAgY29uc3QgdG9wOiBudW1iZXIgPSBNYXRoLm1pbih0aGlzLnRvcCwgeSk7XG4gICAgY29uc3QgYm90dG9tOiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLmJvdHRvbSwgeSArIGhlaWdodCk7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gICAgdGhpcy5ib3R0b20gPSBib3R0b207XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kc1BvaW50KHBvaW50OiBQb2ludCk6IHZvaWQge1xuICAgIHRoaXMuZXh0ZW5kc1Bvc2l0aW9uKHBvaW50LngsIHBvaW50LnkpO1xuICB9XG5cbiAgcHVibGljIGV4dGVuZHNQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmxlZnQgPj0geCkge1xuICAgICAgdGhpcy5sZWZ0ID0geDtcbiAgICB9IGVsc2UgaWYgKHRoaXMucmlnaHQgPD0geCkge1xuICAgICAgdGhpcy5yaWdodCA9IHg7XG4gICAgfVxuICAgIGlmICh0aGlzLnRvcCA+PSB5KSB7XG4gICAgICB0aGlzLnRvcCA9IHk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmJvdHRvbSA8PSB5KSB7XG4gICAgICB0aGlzLmJvdHRvbSA9IHk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFRvKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBwdWJsaWMgY2xvbmUoKTogUmVjdGFuZ2xlIHtcbiAgICByZXR1cm4gbmV3IFJlY3RhbmdsZSh0aGlzLmxlZnQsIHRoaXMudG9wLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRUbygwLCAwLCAwLCAwKTtcbiAgfVxuXG4gIHB1YmxpYyBlcXVhbHMocmVjdGFuZ2xlOiBSZWN0YW5nbGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0ID09PSByZWN0YW5nbGUubGVmdCAmJiB0aGlzLnRvcCA9PT0gcmVjdGFuZ2xlLnRvcCAmJiB0aGlzLnJpZ2h0ID09PSByZWN0YW5nbGUucmlnaHQgJiYgdGhpcy5ib3R0b20gPT09IHJlY3RhbmdsZS5ib3R0b20gJiYgdGhpcy53aWR0aCA9PT0gcmVjdGFuZ2xlLndpZHRoICYmIHRoaXMuaGVpZ2h0ID09PSByZWN0YW5nbGUuaGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlV2lkdGgoKTogdm9pZCB7XG4gICAgdGhpcy5fd2lkdGggPSB0aGlzLl9yaWdodFRvcC54IC0gdGhpcy5fbGVmdFRvcC54O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlSGVpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuX2xlZnRCb3R0b20ueSAtIHRoaXMuX2xlZnRUb3AueTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVJpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JpZ2h0Qm90dG9tLnggPSB0aGlzLl9yaWdodFRvcC54ID0gdGhpcy5fbGVmdFRvcC54ICsgdGhpcy5fd2lkdGg7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCb3R0b20oKTogdm9pZCB7XG4gICAgdGhpcy5fbGVmdEJvdHRvbS55ID0gdGhpcy5fcmlnaHRCb3R0b20ueSA9IHRoaXMuX2xlZnRUb3AueSArIHRoaXMuX2hlaWdodDtcbiAgfVxufVxuIiwiXG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9kaXNwbGF5L3N0YWdlJztcbmltcG9ydCBEaXNwbGF5IGZyb20gJy4vZGlzcGxheS9kaXNwbGF5JztcbmltcG9ydCBEaXNwbGF5Q29udGFpbmVyIGZyb20gJy4vZGlzcGxheS9kaXNwbGF5LWNvbnRhaW5lcic7XG5pbXBvcnQgR3JhcGhpY3MgZnJvbSAnLi9kaXNwbGF5L2dyYXBoaWNzJztcbmltcG9ydCBTaGFwZSBmcm9tICcuL2Rpc3BsYXkvc2hhcGUnO1xuaW1wb3J0IFNwcml0ZSBmcm9tICcuL2Rpc3BsYXkvc3ByaXRlJztcbmltcG9ydCBTcHJpdGVTaGVldCBmcm9tICcuL2Rpc3BsYXkvc3ByaXRlLXNoZWV0JztcbmltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSAnLi9ldmVudC9ldmVudC1kaXNwYXRjaGVyJztcbmltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50L2V2ZW50JztcbmltcG9ydCBNb3VzZUV2ZW50IGZyb20gJy4vZXZlbnQvbW91c2UtZXZlbnQnO1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuL2dlb20vbWF0cml4JztcbmltcG9ydCBQb2ludCBmcm9tICcuL2dlb20vcG9pbnQnO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuL2dlb20vcmVjdGFuZ2xlJztcbmltcG9ydCBUaWNrZXIgZnJvbSAnLi91dGlsL3RpY2tlcic7XG5cbmNvbnN0IHN0ZyA9IHtcbiAgU3RhZ2UsXG4gIERpc3BsYXksXG4gIERpc3BsYXlDb250YWluZXIsXG4gIEdyYXBoaWNzLFxuICBTaGFwZSxcbiAgU3ByaXRlLFxuICBTcHJpdGVTaGVldCxcbiAgRXZlbnREaXNwYXRjaGVyLFxuICBFdmVudCxcbiAgTW91c2VFdmVudCxcbiAgTWF0cml4LFxuICBQb2ludCxcbiAgUmVjdGFuZ2xlLFxuICBUaWNrZXIsXG59O1xuXG4od2luZG93IGFzIGFueSkuc3RnID0gc3RnO1xuXG5leHBvcnQgZGVmYXVsdCBzdGc7XG4iLCJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gJy4uL2V2ZW50L2V2ZW50LWRpc3BhdGNoZXInO1xuXG5lbnVtIFRpY2tlclN0YXRlIHtcbiAgUkVBRFkgPSAncmVhZHknLFxuICBSVU5OSU5HID0gJ3J1bm5pbmcnLFxufVxuXG5lbnVtIFRpY2tlckV2ZW50IHtcbiAgVElDSyA9ICd0aWNrJyxcbn1cblxuY29uc3QgX29uZVNlYzogbnVtYmVyID0gMTAwMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlja2VyIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRJQ0s6IFRpY2tlckV2ZW50ID0gVGlja2VyRXZlbnQuVElDSztcblxuICBwcml2YXRlIF9mcHM6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3N0YXRlOiBUaWNrZXJTdGF0ZSA9IFRpY2tlclN0YXRlLlJFQURZO1xuICBwcml2YXRlIF9wcmV2VGltZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfaW50ZXJuYWxUaW1lOiBudW1iZXIgPSAwO1xuXG4gIHB1YmxpYyBnZXQgZnBzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9mcHM7IH1cblxuICBwdWJsaWMgc2V0IGZwcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fZnBzID0gTWF0aC5tYXgodmFsdWUsIDEpO1xuICAgIC8vIFRPRE86IOuhnOyngSDtmZXsnbhcbiAgICBpZiAodmFsdWUgPiAwICYmIHZhbHVlIDwgMSkge1xuICAgICAgdGhpcy5faW50ZXJuYWxUaW1lID0gKF9vbmVTZWMgKiB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ludGVybmFsVGltZSA9IChfb25lU2VjIC8gdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGZwcyA9IDQwKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmZwcyA9IGZwcztcbiAgICB0aGlzLl9zdGF0ZSA9IFRpY2tlclN0YXRlLlJFQURZO1xuICB9XG5cbiAgcHVibGljIHJ1bigpOiB2b2lkIHtcbiAgICB0aGlzLl9zdGF0ZSA9IFRpY2tlclN0YXRlLlJVTk5JTkc7XG4gICAgdGhpcy5fcHJldlRpbWUgPSArbmV3IERhdGUoKTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX3J1bigpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXRlID0gVGlja2VyU3RhdGUuUkVBRFk7XG4gIH1cblxuICBwcml2YXRlIF9ydW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSBUaWNrZXJTdGF0ZS5SRUFEWSkgeyByZXR1cm47IH1cbiAgICBjb25zdCBub3cgPSArbmV3IERhdGUoKTtcbiAgICBjb25zdCBkZWx0YSA9IG5vdyAtIHRoaXMuX3ByZXZUaW1lO1xuICAgIGlmIChkZWx0YSA+PSB0aGlzLl9pbnRlcm5hbFRpbWUpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihUaWNrZXIuVElDSywgeyBkZWx0YTogZGVsdGEgfSk7XG4gICAgICB0aGlzLl9wcmV2VGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gVGlja2VyU3RhdGUuUlVOTklORykge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9ydW4oKSk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9