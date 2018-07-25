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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
        this.removeChildAt(index);
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
var rectangle_1 = __importDefault(__webpack_require__(/*! ../geom/rectangle */ "./src/geom/rectangle.ts"));
var matrix_1 = __importDefault(__webpack_require__(/*! ../geom/matrix */ "./src/geom/matrix.ts"));
var stage_1 = __importDefault(__webpack_require__(/*! ./stage */ "./src/display/stage.ts"));
//TODO: 파괴자 구현
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
        set: function (value) { this._colorKey = value; },
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
            if (this._rotate == value) {
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

Object.defineProperty(exports, "__esModule", { value: true });
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
            miterLimit: this.miterLimit
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
var graphics_1 = __importDefault(__webpack_require__(/*! ./graphics */ "./src/display/graphics.ts"));
var display_1 = __importDefault(__webpack_require__(/*! ./display */ "./src/display/display.ts"));
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
        this._currentBounds.left = currentFrame[0] * this._cellWidth;
        this._currentBounds.top = currentFrame[1] * this._cellHeight;
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
        console.log(bounds);
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
        _this._canvas = null;
        _this._eventCanvas = null;
        _this._tempCanvas = null;
        _this._context = null;
        _this._eventContext = null;
        _this._tempContext = null;
        _this._returnedColorKey = [];
        _this._ticker = null;
        _this._eventTargetMap = {};
        _this.changed = false;
        _this._canvas = document.getElementById(canvasId);
        _this._context = _this._canvas.getContext('2d');
        _this._stage = _this;
        _this._bounds = new rectangle_1.default(0, 0, _this._canvas.width, _this._canvas.height);
        _this._colorKey = _this.createColorKey();
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
        var value = Number(this._colorKey += 10).toString(16);
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
            if (!_this._eventTargetMap[mouse_event_1.default.CLICK] || _this._eventTargetMap[mouse_event_1.default.CLICK].length) {
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
                    //TODO:target / currentTarget 구분
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
        var a, b, c, d, tx, ty;
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
    Rectangle.prototype.setTo = function (x, y, width, height) {
        this.left = x;
        this.top = y;
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
    Ticker: ticker_1.default
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
            //TODO: 로직 확인
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS1jb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9ncmFwaGljcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zaGFwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zcHJpdGUtc2hlZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvc3ByaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9kaXNwbGF5L3N0YWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC1kaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQvbW91c2UtZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlb20vbWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3BvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3JlY3RhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvdGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIs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ZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IERpc3BsYXkgZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IFN0YWdlIGZyb20gXCIuL3N0YWdlXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzcGxheUNvbnRhaW5lciBleHRlbmRzIERpc3BsYXkge1xuXG4gIHByaXZhdGUgX2NoaWxkcmVuOiBEaXNwbGF5W10gPSBbXTtcblxuICBwdWJsaWMgZ2V0IGNoaWxkcmVuKCk6IERpc3BsYXlbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuXG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIGFkZENoaWxkKGNoaWxkOiBEaXNwbGF5KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgdGhpcy5fY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgY2hpbGQuc3RhZ2UgPSB0aGlzLnN0YWdlO1xuICAgIGNoaWxkLmNvbG9yS2V5ID0gdGhpcy5zdGFnZS5jcmVhdGVDb2xvcktleSgpO1xuICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgdGhpcy5zdGFnZS5jaGFuZ2VkID0gdHJ1ZTtcbiAgICBjaGlsZC50cmlnZ2VyKFN0YWdlLkFERF9UT19TVEFHRSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQ2hpbGRBbGwoKTogdm9pZCB7XG4gICAgd2hpbGUgKHRoaXMuX2NoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLl9jaGlsZHJlblt0aGlzLl9jaGlsZHJlbi5sZW5ndGggLSAxXSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZUNoaWxkKGNoaWxkOiBEaXNwbGF5KTogdm9pZCB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLl9jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7IHJldHVybjsgfVxuICAgIGNoaWxkLnRyaWdnZXIoU3RhZ2UuUkVNT1ZFX1RPX1NUQUdFKTtcbiAgICB0aGlzLnJlbW92ZUNoaWxkQXQoaW5kZXgpO1xuICAgIHRoaXMuc3RhZ2UucmV0dXJuQ29sb3JLZXkoY2hpbGQuY29sb3JLZXkpO1xuICAgIGNoaWxkLmNvbG9yS2V5ID0gbnVsbDtcbiAgICBjaGlsZC5zdGFnZSA9IG51bGw7XG4gICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBEaXNwbGF5Q29udGFpbmVyKSB7XG4gICAgICAoY2hpbGQgYXMgRGlzcGxheUNvbnRhaW5lcikucmVtb3ZlQ2hpbGRBbGwoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQ2hpbGRBdChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmdldENoaWxkQXQoaW5kZXgpKTtcbiAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0Q2hpbGRBdChpbmRleDogbnVtYmVyKTogRGlzcGxheSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuW2luZGV4XTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVEaXNwbGF5KCk6IHZvaWQge1xuICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuX2NoaWxkcmVuKSB7XG4gICAgICBpZiAoY2hpbGQudmlzaWJsZSkge1xuICAgICAgICBjaGlsZC51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9ldmVudC9ldmVudC1kaXNwYXRjaGVyXCI7XG5pbXBvcnQgRGlzcGxheUNvbnRhaW5lciBmcm9tIFwiLi9kaXNwbGF5LWNvbnRhaW5lclwiO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tIFwiLi4vZ2VvbS9yZWN0YW5nbGVcIjtcbmltcG9ydCBNYXRyaXggZnJvbSBcIi4uL2dlb20vbWF0cml4XCI7XG5pbXBvcnQgU3RhZ2UgZnJvbSBcIi4vc3RhZ2VcIjtcblxuLy9UT0RPOiDtjIzqtLTsnpAg6rWs7ZiEXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBEaXNwbGF5IGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcblxuICBwcm90ZWN0ZWQgX3N0YWdlOiBTdGFnZSA9IG51bGw7XG4gIHByb3RlY3RlZCBfcGFyZW50OiBEaXNwbGF5Q29udGFpbmVyID0gbnVsbDtcbiAgcHJvdGVjdGVkIF9ib3VuZHM6IFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcbiAgcHJvdGVjdGVkIF9jb21wdXRlZEJvdW5kczogUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xuICBwcm90ZWN0ZWQgX21hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeCgpO1xuICBwcm90ZWN0ZWQgX2NvbG9yS2V5OiBzdHJpbmcgPSBudWxsO1xuICBwcm90ZWN0ZWQgX2NlbnRlclg6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfY2VudGVyWTogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9yb3RhdGU6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfd2lkdGg6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfaGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX3NjYWxlWDogbnVtYmVyID0gMTtcbiAgcHJvdGVjdGVkIF9zY2FsZVk6IG51bWJlciA9IDE7XG4gIHByb3RlY3RlZCBfc2tld1g6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfc2tld1k6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgcHVibGljIGdldCBzdGFnZSgpOiBTdGFnZSB7IHJldHVybiB0aGlzLl9zdGFnZTsgfVxuICBwdWJsaWMgZ2V0IHBhcmVudCgpOiBEaXNwbGF5Q29udGFpbmVyIHsgcmV0dXJuIHRoaXMuX3BhcmVudDsgfVxuICBwdWJsaWMgZ2V0IGNvbG9yS2V5KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9jb2xvcktleTsgfVxuICBwdWJsaWMgZ2V0IHgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2JvdW5kcy5sZWZ0OyB9XG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYm91bmRzLnRvcDsgfVxuICBwdWJsaWMgZ2V0IGNlbnRlclgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2NlbnRlclg7IH1cbiAgcHVibGljIGdldCBjZW50ZXJZKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jZW50ZXJZOyB9XG4gIHB1YmxpYyBnZXQgd2lkdGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2JvdW5kcy53aWR0aDsgfVxuICBwdWJsaWMgZ2V0IGhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYm91bmRzLmhlaWdodDsgfVxuICBwdWJsaWMgZ2V0IHJvdGF0ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcm90YXRlOyB9XG4gIHB1YmxpYyBnZXQgc2NhbGVYKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zY2FsZVg7IH1cbiAgcHVibGljIGdldCBzY2FsZVkoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NjYWxlWTsgfVxuICBwdWJsaWMgZ2V0IHNrZXdYKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9za2V3WDsgfVxuICBwdWJsaWMgZ2V0IHNrZXdZKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9za2V3WTsgfVxuICBwdWJsaWMgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl92aXNpYmxlOyB9XG4gIHB1YmxpYyBnZXQgYm91bmRzKCk6IFJlY3RhbmdsZSB7IHJldHVybiB0aGlzLl9ib3VuZHM7IH1cbiAgcHVibGljIGdldCBtYXRyaXgoKTogTWF0cml4IHsgcmV0dXJuIHRoaXMuX21hdHJpeDsgfVxuXG4gIHB1YmxpYyBnZXQgY29tcHV0ZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5ib3VuZHM7XG4gICAgY29uc3QgcG9pbnRzID0gW2JvdW5kcy5sZWZ0VG9wLCBib3VuZHMucmlnaHRUb3AsIGJvdW5kcy5sZWZ0Qm90dG9tLCBib3VuZHMucmlnaHRCb3R0b21dO1xuXG4gICAgZm9yIChsZXQgaXRlbSBvZiBwb2ludHMpIHtcbiAgICAgIGl0ZW0ucm90YXRlKHRoaXMuX3JvdGF0ZSk7XG4gICAgICBpdGVtLnNrZXcodGhpcy5fc2tld1gsIHRoaXMuX3NrZXdZKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb21wdXRlZEJvdW5kcy5sZWZ0ID0gTWF0aC5taW4oYm91bmRzLmxlZnRUb3AueCwgYm91bmRzLnJpZ2h0VG9wLngsIGJvdW5kcy5sZWZ0Qm90dG9tLngsIGJvdW5kcy5yaWdodEJvdHRvbS54KTtcbiAgICB0aGlzLl9jb21wdXRlZEJvdW5kcy5yaWdodCA9IE1hdGgubWF4KGJvdW5kcy5sZWZ0VG9wLngsIGJvdW5kcy5yaWdodFRvcC54LCBib3VuZHMubGVmdEJvdHRvbS54LCBib3VuZHMucmlnaHRCb3R0b20ueCk7XG4gICAgdGhpcy5fY29tcHV0ZWRCb3VuZHMudG9wID0gTWF0aC5taW4oYm91bmRzLmxlZnRUb3AueSwgYm91bmRzLnJpZ2h0VG9wLnksIGJvdW5kcy5sZWZ0Qm90dG9tLnksIGJvdW5kcy5yaWdodEJvdHRvbS55KTtcbiAgICB0aGlzLl9jb21wdXRlZEJvdW5kcy5ib3R0b20gPSBNYXRoLm1heChib3VuZHMubGVmdFRvcC55LCBib3VuZHMucmlnaHRUb3AueSwgYm91bmRzLmxlZnRCb3R0b20ueSwgYm91bmRzLnJpZ2h0Qm90dG9tLnkpO1xuICAgIHJldHVybiB0aGlzLl9jb21wdXRlZEJvdW5kcztcbiAgfVxuXG4gIHB1YmxpYyBzZXQgY29sb3JLZXkodmFsdWU6IHN0cmluZykgeyB0aGlzLl9jb2xvcktleSA9IHZhbHVlOyB9XG5cbiAgcHVibGljIHNldCBzdGFnZShzdGFnZTogU3RhZ2UpIHtcbiAgICB0aGlzLl9zdGFnZSA9IHN0YWdlO1xuICAgIGlmICh0aGlzLl9zdGFnZSkge1xuICAgICAgdGhpcy5fc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBwYXJlbnQocGFyZW50OiBEaXNwbGF5Q29udGFpbmVyKSB7IHRoaXMuX3BhcmVudCA9IHBhcmVudDsgfVxuXG4gIHB1YmxpYyBzZXQgeCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2JvdW5kcy5sZWZ0ID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9ib3VuZHMubGVmdCA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHkodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9ib3VuZHMudG9wID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9ib3VuZHMudG9wID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgY2VudGVyWCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY2VudGVyWCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHNldCBjZW50ZXJZKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jZW50ZXJZID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IHdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fd2lkdGggPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XG4gICAgdGhpcy5fYm91bmRzLndpZHRoID0gdmFsdWUgKiB0aGlzLl9zY2FsZVg7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5oZWlnaHQgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSB2YWx1ZSAqIHRoaXMuX3NjYWxlWTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCByb3RhdGUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9yb3RhdGUgPT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fcm90YXRlID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2NhbGVYKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2NhbGVYID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9zY2FsZVggPSB2YWx1ZTtcbiAgICB0aGlzLl9ib3VuZHMud2lkdGggPSB0aGlzLl93aWR0aCAqIHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNjYWxlWSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3NjYWxlWSA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2NhbGVZID0gdmFsdWU7XG4gICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IHRoaXMuX2hlaWdodCAqIHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNrZXdYKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2tld1ggPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NrZXdYID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgc2tld1kodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9za2V3WSA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2tld1kgPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCB2aXNpYmxlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuX3Zpc2libGUgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm9uKFN0YWdlLkFERF9UT19TVEFHRSwgKCkgPT4gdGhpcy5zdGFnZS5yZWdpc3RlckV2ZW50TWFwKHRoaXMpKTtcbiAgICB0aGlzLm9uKFN0YWdlLlJFTU9WRV9UT19TVEFHRSwgKCkgPT4gdGhpcy5zdGFnZS51bnJlZ2lzdGVyRXZlbnRNYXAodGhpcykpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHVwZGF0ZURpc3BsYXkoY29udGV4dD86IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWRcblxuICBwdWJsaWMgdXBkYXRlVHJhbnNmb3JtYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnJlc2V0KCk7XG4gICAgY29uc3Qgb2Zmc2V0WCA9IHRoaXMueCArICh0aGlzLl9jZW50ZXJYICogdGhpcy5fc2NhbGVYKTtcbiAgICBjb25zdCBvZmZzZXRZID0gdGhpcy55ICsgKHRoaXMuX2NlbnRlclkgKiB0aGlzLl9zY2FsZVkpO1xuICAgIHRoaXMuX3RyYW5zZm9ybVRyYW5zbGF0ZShvZmZzZXRYLCBvZmZzZXRZKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1Sb3RhdGUodGhpcy5fcm90YXRlKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1UcmFuc2xhdGUoLW9mZnNldFgsIC1vZmZzZXRZKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1UcmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuICAgIHRoaXMuX3RyYW5zZm9ybVNjYWxlKHRoaXMuX3NjYWxlWCwgdGhpcy5fc2NhbGVZKTtcbiAgICB0aGlzLl90cmFuc2Zvcm1Ta2V3KHRoaXMuX3NrZXdYLCB0aGlzLl9za2V3WSk7XG4gICAgdGhpcy5zdGFnZS5jb250ZXh0LnRyYW5zZm9ybSh0aGlzLl9tYXRyaXguYSwgdGhpcy5fbWF0cml4LmIsIHRoaXMuX21hdHJpeC5jLCB0aGlzLl9tYXRyaXguZCwgdGhpcy5fbWF0cml4LnR4LCB0aGlzLl9tYXRyaXgudHkpO1xuICAgIHRoaXMuc3RhZ2UudGVtcENvbnRleHQudHJhbnNmb3JtKHRoaXMuX21hdHJpeC5hLCB0aGlzLl9tYXRyaXguYiwgdGhpcy5fbWF0cml4LmMsIHRoaXMuX21hdHJpeC5kLCB0aGlzLl9tYXRyaXgudHgsIHRoaXMuX21hdHJpeC50eSk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5zdGFnZS5jb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLnN0YWdlLnRlbXBDb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLnVwZGF0ZVRyYW5zZm9ybWF0aW9uKCk7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KHRoaXMuc3RhZ2UuY29udGV4dCk7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KHRoaXMuc3RhZ2UudGVtcENvbnRleHQpO1xuICAgIHRoaXMuc3RhZ2UuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgdGhpcy5zdGFnZS50ZW1wQ29udGV4dC5yZXN0b3JlKCk7XG4gICAgdGhpcy5zdGFnZS50ZW1wQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLWluJztcbiAgICB0aGlzLnN0YWdlLnRlbXBDb250ZXh0LmZpbGxTdHlsZSA9ICcjJyArIHRoaXMuY29sb3JLZXk7XG4gICAgdGhpcy5zdGFnZS50ZW1wQ29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLnN0YWdlLnRlbXBDYW52YXMud2lkdGgsIHRoaXMuc3RhZ2UudGVtcENhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuc3RhZ2UuZXZlbnRDb250ZXh0LmRyYXdJbWFnZSh0aGlzLnN0YWdlLnRlbXBDYW52YXMsIDAsIDApO1xuICAgIHRoaXMuc3RhZ2UudGVtcENhbnZhcy53aWR0aCA9IHRoaXMuc3RhZ2UudGVtcENhbnZhcy53aWR0aDtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybVRyYW5zbGF0ZSh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnRyYW5zbGF0ZSh4LCB5KTtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybVJvdGF0ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnJvdGF0ZSh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1TY2FsZSh4OiBudW1iZXIgPSAxLCB5OiBudW1iZXIgPSAxKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnNjYWxlKHgsIHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtU2tldyh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnNrZXcoeCwgeSk7XG4gIH1cblxuICBwcml2YXRlIF9jaGFuZ2VkRGlzcGxheSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3RhZ2UpIHsgcmV0dXJuOyB9XG4gICAgaWYgKCF0aGlzLnN0YWdlLmNoYW5nZWQpIHtcbiAgICAgIHRoaXMuc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9XG59IiwiXG5leHBvcnQgZW51bSBMaW5lQ2FwIHtcbiAgQlVUVCA9ICdidXR0JyxcbiAgUk9VTkQgPSAncm91bmQnLFxuICBTUVVBUkUgPSAnc3F1YXJlJ1xufVxuXG5leHBvcnQgZW51bSBMaW5lSm9pbiB7XG4gIFJPVU5UID0gJ3JvdW5kJyxcbiAgQkVWRUwgPSAnYmV2ZWwnLFxuICBNSVRFUiA9ICdtaXRlcidcbn1cblxuZW51bSBEcmF3Q29tbWFuZE5hbWUge1xuICBSRUNUID0gJ3JlY3QnLFxuICBGSUxMX1JFQ1QgPSAnZmlsbFJlY3QnLFxuICBTVFJPS0VfUkVDVCA9ICdzdHJva2VSZWN0JyxcbiAgQ0xFQVJfUkVDVCA9ICdjbGVhclJlY3QnLFxuICBCRUdJTl9QQVRIID0gJ2JlZ2luUGF0aCcsXG4gIENMT1NFX1BBVEggPSAnY2xvc2VQYXRoJyxcbiAgTU9WRV9UTyA9ICdtb3ZlVG8nLFxuICBMSU5FX1RPID0gJ2xpbmVUbycsXG4gIEFSQyA9ICdhcmMnLFxuICBBUkNfVE8gPSAnYXJjVG8nLFxuICBRVUFEUkFUSUNfQ1VSVkVfVE8gPSAncXVhZHJhdGljQ3VydmVUbycsXG4gIEJFWklFUl9DVVJWRV9UTyA9ICdiZXppZXJDdXJ2ZVRvJyxcbiAgRklMTCA9ICdmaWxsJyxcbiAgU1RST0tFID0gJ3N0cm9rZSdcbn1cblxuaW50ZXJmYWNlIERyYXdDb21tYW5kIHtcbiAgbmFtZTogRHJhd0NvbW1hbmROYW1lO1xuICBhcmd1bWVudHM6IGFueTtcbiAgZmlsbFN0eWxlOiBzdHJpbmc7XG4gIHN0cm9rZVN0eWxlOiBzdHJpbmc7XG4gIGxpbmVXaWR0aDogbnVtYmVyO1xuICBsaW5lQ2FwOiBMaW5lQ2FwO1xuICBsaW5lSm9pbjogTGluZUpvaW47XG4gIG1pdGVyTGltaXQ6IG51bWJlclxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaGljcyB7XG4gIHB1YmxpYyBmaWxsU3R5bGU6IHN0cmluZyA9IG51bGw7XG4gIHB1YmxpYyBzdHJva2VTdHlsZTogc3RyaW5nID0gbnVsbDtcbiAgcHVibGljIGxpbmVXaWR0aDogbnVtYmVyID0gMDtcbiAgcHVibGljIGxpbmVDYXA6IExpbmVDYXAgPSBMaW5lQ2FwLkJVVFQ7XG4gIHB1YmxpYyBsaW5lSm9pbjogTGluZUpvaW4gPSBMaW5lSm9pbi5NSVRFUjtcbiAgcHVibGljIG1pdGVyTGltaXQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NvbW1hbmRzOiBTZXQ8RHJhd0NvbW1hbmQ+ID0gbmV3IFNldCgpXG5cbiAgcHVibGljIGdldCBjb21tYW5kcygpOiBTZXQ8RHJhd0NvbW1hbmQ+IHsgcmV0dXJuIHRoaXMuX2NvbW1hbmRzOyB9XG4gIHB1YmxpYyBnZXQgY29tbWFuZExpc3QoKTogSXRlcmFibGVJdGVyYXRvcjxEcmF3Q29tbWFuZD4geyByZXR1cm4gdGhpcy5fY29tbWFuZHMudmFsdWVzKCk7IH1cblxuICBwdWJsaWMgcmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5SRUNULCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGZpbGxSZWN0KHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkZJTExfUkVDVCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBzdHJva2VSZWN0KHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLlNUUk9LRV9SRUNULCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyUmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5DTEVBUl9SRUNULCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGJlZ2luUGF0aCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5CRUdJTl9QQVRIKTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZVBhdGgoKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQ0xPU0VfUEFUSCk7XG4gIH1cblxuICBwdWJsaWMgbW92ZVRvKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuTU9WRV9UTywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBsaW5lVG8oeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5MSU5FX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGFyYyh4OiBudW1iZXIsIHk6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIHN0YXJ0QW5nbGU6IG51bWJlciwgZW5kQW5nbGU6IG51bWJlciwgYW50aWNsb2Nrd2lzZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkFSQywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmNUbyh4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB4MjogbnVtYmVyLCB5MjogbnVtYmVyLCByYWRpdXM6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkFSQ19UTywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBxdWFkcmF0aWNDdXJ2ZVRvKGNwMXg6IG51bWJlciwgY3AxeTogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLlFVQURSQVRJQ19DVVJWRV9UTywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBiZXppZXJDdXJ2ZVRvKGNwMXg6IG51bWJlciwgY3AxeTogbnVtYmVyLCBjcDJ4OiBudW1iZXIsIGNwMnk6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5CRVpJRVJfQ1VSVkVfVE8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgZmlsbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5GSUxMKTtcbiAgfVxuXG4gIHB1YmxpYyBzdHJva2UoKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuU1RST0tFKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kcy5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkQ29tbWFuZChuYW1lOiBEcmF3Q29tbWFuZE5hbWUsIGFyZ3M/OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9jb21tYW5kcy5hZGQoe1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGFyZ3VtZW50czogYXJncyxcbiAgICAgIGZpbGxTdHlsZTogdGhpcy5maWxsU3R5bGUsXG4gICAgICBzdHJva2VTdHlsZTogdGhpcy5zdHJva2VTdHlsZSxcbiAgICAgIGxpbmVXaWR0aDogdGhpcy5saW5lV2lkdGgsXG4gICAgICBsaW5lQ2FwOiB0aGlzLmxpbmVDYXAsXG4gICAgICBsaW5lSm9pbjogdGhpcy5saW5lSm9pbixcbiAgICAgIG1pdGVyTGltaXQ6IHRoaXMubWl0ZXJMaW1pdFxuICAgIH0pO1xuICB9XG59IiwiaW1wb3J0IEdyYXBoaWNzIGZyb20gXCIuL2dyYXBoaWNzXCI7XG5pbXBvcnQgRGlzcGxheSBmcm9tIFwiLi9kaXNwbGF5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXBlIGV4dGVuZHMgRGlzcGxheSB7XG4gIHB1YmxpYyBncmFwaGljczogR3JhcGhpY3MgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGdyYXBoaWNzOiBHcmFwaGljcykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5ncmFwaGljcyA9IGdyYXBoaWNzIHx8IG5ldyBHcmFwaGljcygpO1xuICB9XG5cbiAgdXBkYXRlRGlzcGxheShjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBjb21tYW5kIG9mIHRoaXMuZ3JhcGhpY3MuY29tbWFuZExpc3QpIHtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29tbWFuZC5maWxsU3R5bGU7XG4gICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29tbWFuZC5zdHJva2VTdHlsZTtcbiAgICAgIGNvbnRleHQubGluZVdpZHRoID0gY29tbWFuZC5saW5lV2lkdGg7XG4gICAgICBjb250ZXh0LmxpbmVDYXAgPSBjb21tYW5kLmxpbmVDYXA7XG4gICAgICBjb250ZXh0LmxpbmVKb2luID0gY29tbWFuZC5saW5lSm9pbjtcbiAgICAgIGNvbnRleHQubWl0ZXJMaW1pdCA9IGNvbW1hbmQubWl0ZXJMaW1pdDtcbiAgICAgIGlmIChjb21tYW5kLmFyZ3VtZW50cykge1xuICAgICAgICAoY29udGV4dCBhcyBhbnkpW2NvbW1hbmQubmFtZV0oLi4uY29tbWFuZC5hcmd1bWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKGNvbnRleHQgYXMgYW55KVtjb21tYW5kLm5hbWVdKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnQvZXZlbnQtZGlzcGF0Y2hlclwiO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tIFwiLi4vZ2VvbS9yZWN0YW5nbGVcIjtcblxuXG5leHBvcnQgZW51bSBTcHJpdGVTaGVldEV2ZW50IHtcbiAgTE9BRCA9ICdsb2FkJyxcbiAgRU5EID0gJ2VuZCdcbn1cblxuaW50ZXJmYWNlIEZyYW1lIHtcbiAgW2luZGV4OiBzdHJpbmddOiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZVNoZWV0IGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExPQUQ6IFNwcml0ZVNoZWV0RXZlbnQgPSBTcHJpdGVTaGVldEV2ZW50LkxPQUQ7XG5cbiAgcHJpdmF0ZSBfaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBudWxsO1xuICBwcml2YXRlIF9jZWxsV2lkdGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NlbGxIZWlnaHQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2ZyYW1lczogRnJhbWVbXSA9IG51bGw7XG4gIHByaXZhdGUgX2ZyYW1lSW5kZXg6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIF9jdXJyZW50Qm91bmRzOiBSZWN0YW5nbGUgPSBudWxsO1xuICBwcml2YXRlIF9sb29wOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHVibGljIGdldCBpbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHsgcmV0dXJuIHRoaXMuX2ltYWdlOyB9XG4gIHB1YmxpYyBnZXQgY2VsbFdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jZWxsV2lkdGg7IH1cbiAgcHVibGljIGdldCBjZWxsSGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jZWxsSGVpZ2h0OyB9XG4gIHB1YmxpYyBnZXQgY3VycmVudEJvdW5kcygpIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRCb3VuZHM7IH1cblxuICBjb25zdHJ1Y3RvcihpbWc6IEhUTUxJbWFnZUVsZW1lbnQgfCBzdHJpbmcsIGNlbGxXaWR0aDogbnVtYmVyLCBjZWxsSGVpZ2h0OiBudW1iZXIsIGZyYW1lczogRnJhbWVbXSwgbG9vcDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChpbWcgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICB0aGlzLl9pbWFnZSA9IGltZztcbiAgICAgIHRoaXMudHJpZ2dlcihTcHJpdGVTaGVldC5MT0FEKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gaW1nO1xuICAgICAgdGhpcy5faW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHRoaXMudHJpZ2dlcihTcHJpdGVTaGVldC5MT0FEKSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2VsbFdpZHRoID0gY2VsbFdpZHRoO1xuICAgIHRoaXMuX2NlbGxIZWlnaHQgPSBjZWxsSGVpZ2h0O1xuICAgIHRoaXMuX2ZyYW1lcyA9IGZyYW1lcztcbiAgICB0aGlzLl9mcmFtZUluZGV4ID0gLTE7XG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0KTtcbiAgICB0aGlzLl9sb29wID0gbG9vcDtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mcmFtZUluZGV4ICsgMSA8PSB0aGlzLl9mcmFtZXMubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5fZnJhbWVJbmRleCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fbG9vcCkge1xuICAgICAgICB0aGlzLl9mcmFtZUluZGV4ID0gMDtcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLnRyaWdnZXIoIFNwcml0ZVNoZWV0RXZlbnQuRU5EICk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZUJvdW5kcygpO1xuICB9XG5cbiAgcHVibGljIHByZXYoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ZyYW1lSW5kZXggLSAxID4gMCkge1xuICAgICAgdGhpcy5fZnJhbWVJbmRleC0tO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fbG9vcCkge1xuICAgICAgICB0aGlzLl9mcmFtZUluZGV4ID0gdGhpcy5fZnJhbWVzLmxlbmd0aCAtIDE7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCBTcHJpdGVTaGVldEV2ZW50LkVORCApO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl91cGRhdGVCb3VuZHMoKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOnZvaWR7XG4gICAgdGhpcy5fZnJhbWVJbmRleCA9IC0xO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQm91bmRzKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRGcmFtZSA9IHRoaXMuX2ZyYW1lc1t0aGlzLl9mcmFtZUluZGV4XTtcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzLmxlZnQgPSBjdXJyZW50RnJhbWVbMF0gKiB0aGlzLl9jZWxsV2lkdGg7XG4gICAgdGhpcy5fY3VycmVudEJvdW5kcy50b3AgPSBjdXJyZW50RnJhbWVbMV0gKiB0aGlzLl9jZWxsSGVpZ2h0O1xuICB9XG59IiwiaW1wb3J0IERpc3BsYXkgZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IFNwcml0ZVNoZWV0LCB7IFNwcml0ZVNoZWV0RXZlbnQgfSBmcm9tIFwiLi9zcHJpdGUtc2hlZXRcIjtcbmltcG9ydCBUaWNrZXIgZnJvbSBcIi4uL3V0aWwvdGlja2VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSBleHRlbmRzIERpc3BsYXkge1xuICBwcml2YXRlIF9zcHJpdGVTaGVldDogU3ByaXRlU2hlZXQgPSBudWxsO1xuICBwcml2YXRlIF9mcHM6IG51bWJlciA9IDEwO1xuICBwcml2YXRlIF90aWNrZXI6IFRpY2tlciA9IG51bGw7XG5cbiAgY29uc3RydWN0b3Ioc3ByaXRlU2hlZXQ6IFNwcml0ZVNoZWV0LCBmcHM6IG51bWJlciA9IDEwKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zcHJpdGVTaGVldCA9IHNwcml0ZVNoZWV0O1xuICAgIHRoaXMuX2ZwcyA9IGZwcztcbiAgICB0aGlzLl90aWNrZXIgPSBuZXcgVGlja2VyKGZwcyk7XG4gICAgdGhpcy5fdGlja2VyLm9uKFRpY2tlci5USUNLLCAoKSA9PiB0aGlzLl90aWNrZXJIYW5kbGVyKCkpO1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0Lm9uKCBTcHJpdGVTaGVldEV2ZW50LkVORCwgKCk9PnRoaXMuc3RvcCgpICk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNwcml0ZVNoZWV0KCk6IFNwcml0ZVNoZWV0IHsgcmV0dXJuIHRoaXMuX3Nwcml0ZVNoZWV0OyB9XG4gIHB1YmxpYyBnZXQgZnBzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9mcHM7IH1cblxuICBwdWJsaWMgc2V0IHNwcml0ZVNoZWV0KHNwcml0ZVNoZWV0OiBTcHJpdGVTaGVldCkge1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0ID0gc3ByaXRlU2hlZXQ7XG4gICAgdGhpcy5fYm91bmRzLndpZHRoID0gc3ByaXRlU2hlZXQuY2VsbFdpZHRoO1xuICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSBzcHJpdGVTaGVldC5jZWxsSGVpZ2h0O1xuICB9XG5cbiAgcHVibGljIHNldCBmcHModmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2ZwcyA9IHZhbHVlO1xuICAgIHRoaXMuX3RpY2tlci5mcHMgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBwbGF5KCk6IHZvaWQge1xuICAgIHRoaXMuX3RpY2tlckhhbmRsZXIoKTtcbiAgICB0aGlzLl90aWNrZXIucnVuKCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTp2b2lke1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0LnJlc2V0KCk7XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLl90aWNrZXIuc3RvcCgpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZURpc3BsYXkoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5fc3ByaXRlU2hlZXQuY3VycmVudEJvdW5kcztcbiAgICBjb25zb2xlLmxvZyggYm91bmRzICk7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICB0aGlzLl9zcHJpdGVTaGVldC5pbWFnZSxcbiAgICAgIGJvdW5kcy5sZWZ0LFxuICAgICAgYm91bmRzLnRvcCxcbiAgICAgIGJvdW5kcy53aWR0aCxcbiAgICAgIGJvdW5kcy5oZWlnaHQsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIGJvdW5kcy53aWR0aCxcbiAgICAgIGJvdW5kcy5oZWlnaHQsXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RpY2tlckhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc3ByaXRlU2hlZXQubmV4dCgpO1xuICAgIHRoaXMuc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS51cGRhdGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IERpc3BsYXlDb250YWluZXIgZnJvbSBcIi4vZGlzcGxheS1jb250YWluZXJcIjtcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSBcIi4uL2dlb20vcmVjdGFuZ2xlXCI7XG5pbXBvcnQgVGlja2VyIGZyb20gXCIuLi91dGlsL3RpY2tlclwiO1xuaW1wb3J0IERpc3BsYXkgZnJvbSBcIi4vZGlzcGxheVwiO1xuaW1wb3J0IE1vdXNlRXZlbnQgZnJvbSBcIi4uL2V2ZW50L21vdXNlLWV2ZW50XCI7XG5cbmVudW0gU3RhZ2VFdmVudFR5cGUge1xuICBBRERfVE9fU1RBR0UgPSAnYWRkVG9TdGFnZScsXG4gIFJFTU9WRV9UT19TVEFHRSA9ICdyZW1vdmVUb1N0YWdlJyxcbiAgRU5URVJfRlJBTUUgPSAnZW50ZXJGcmFtZSdcbn1cblxuaW50ZXJmYWNlIEV2ZW50VGFyZ2V0TWFwIHtcbiAgW3Byb3A6IHN0cmluZ106IERpc3BsYXlbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2UgZXh0ZW5kcyBEaXNwbGF5Q29udGFpbmVyIHtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEFERF9UT19TVEFHRTogU3RhZ2VFdmVudFR5cGUgPSBTdGFnZUV2ZW50VHlwZS5BRERfVE9fU1RBR0U7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUkVNT1ZFX1RPX1NUQUdFOiBTdGFnZUV2ZW50VHlwZSA9IFN0YWdlRXZlbnRUeXBlLlJFTU9WRV9UT19TVEFHRTtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFTlRFUl9GUkFNRTogU3RhZ2VFdmVudFR5cGUgPSBTdGFnZUV2ZW50VHlwZS5FTlRFUl9GUkFNRTtcblxuICBwcml2YXRlIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfZXZlbnRDYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfdGVtcENhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBudWxsO1xuICBwcml2YXRlIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBudWxsO1xuICBwcml2YXRlIF9ldmVudENvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IG51bGw7XG4gIHByaXZhdGUgX3RlbXBDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBudWxsO1xuICBwcml2YXRlIF9yZXR1cm5lZENvbG9yS2V5OiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIF90aWNrZXI6IFRpY2tlciA9IG51bGw7XG4gIHByaXZhdGUgX2V2ZW50VGFyZ2V0TWFwOiBFdmVudFRhcmdldE1hcCA9IHt9O1xuXG4gIHB1YmxpYyBjaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoY2FudmFzSWQ6IHN0cmluZywgZnBzOiBudW1iZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICB0aGlzLl9jb250ZXh0ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5fc3RhZ2UgPSB0aGlzO1xuICAgIHRoaXMuX2JvdW5kcyA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgdGhpcy5fY2FudmFzLndpZHRoLCB0aGlzLl9jYW52YXMuaGVpZ2h0KTtcbiAgICB0aGlzLl9jb2xvcktleSA9IHRoaXMuY3JlYXRlQ29sb3JLZXkoKTtcbiAgICB0aGlzLl9pbml0RlBTKGZwcyk7XG4gICAgdGhpcy5faW5pdEV2ZW50Q2FudmFzKCk7XG4gICAgdGhpcy5faW5pdEV2ZW50KCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7IHJldHVybiB0aGlzLl9jYW52YXM7IH1cbiAgcHVibGljIGdldCBldmVudENhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7IHJldHVybiB0aGlzLl9ldmVudENhbnZhczsgfVxuICBwdWJsaWMgZ2V0IHRlbXBDYW52YXMoKTogSFRNTENhbnZhc0VsZW1lbnQgeyByZXR1cm4gdGhpcy5fdGVtcENhbnZhczsgfVxuICBwdWJsaWMgZ2V0IGNvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHsgcmV0dXJuIHRoaXMuX2NvbnRleHQ7IH1cbiAgcHVibGljIGdldCBldmVudENvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHsgcmV0dXJuIHRoaXMuX2V2ZW50Q29udGV4dDsgfVxuICBwdWJsaWMgZ2V0IHRlbXBDb250ZXh0KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7IHJldHVybiB0aGlzLl90ZW1wQ29udGV4dDsgfVxuXG4gIHB1YmxpYyBjcmVhdGVDb2xvcktleSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLl9yZXR1cm5lZENvbG9yS2V5Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JldHVybmVkQ29sb3JLZXkuc2hpZnQoKTtcbiAgICB9XG4gICAgbGV0IHZhbHVlID0gTnVtYmVyKHRoaXMuX2NvbG9yS2V5ICs9IDEwKS50b1N0cmluZygxNik7XG4gICAgdmFsdWUgPSAnMCcucmVwZWF0KDYgLSB2YWx1ZS5sZW5ndGgpICsgdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHJldHVybkNvbG9yS2V5KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXR1cm5lZENvbG9yS2V5LnB1c2godmFsdWUpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jaGFuZ2VkKSB7XG4gICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgICB0aGlzLl9ldmVudENhbnZhcy53aWR0aCA9IHRoaXMuX2V2ZW50Q2FudmFzLndpZHRoO1xuICAgICAgdGhpcy5fdGVtcENhbnZhcy53aWR0aCA9IHRoaXMuX3RlbXBDYW52YXMud2lkdGg7XG4gICAgICBzdXBlci51cGRhdGUoKTtcbiAgICAgIHRoaXMuY2hhbmdlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZWdpc3RlckV2ZW50TWFwKGRpc3BsYXk6IERpc3BsYXkpOiB2b2lkIHtcbiAgICBjb25zdCBjaGlsZEV2ZW50TWFwID0gZGlzcGxheS5ldmVudE1hcDtcbiAgICBmb3IgKGxldCB0eXBlIGluIGNoaWxkRXZlbnRNYXApIHtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0pIHtcbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdLnB1c2goZGlzcGxheSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVucmVnaXN0ZXJFdmVudE1hcChkaXNwbGF5OiBEaXNwbGF5KSB7XG4gICAgY29uc3QgY2hpbGRFdmVudE1hcCA9IGRpc3BsYXkuZXZlbnRNYXA7XG4gICAgZm9yIChsZXQgdHlwZSBpbiBjaGlsZEV2ZW50TWFwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdLmluZGV4T2YoZGlzcGxheSk7XG4gICAgICB0aGlzLl9ldmVudFRhcmdldE1hcFt0eXBlXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGUFMoZnBzOiBudW1iZXIpIHtcbiAgICBpZiAoZnBzKSB7XG4gICAgICB0aGlzLl90aWNrZXIgPSBuZXcgVGlja2VyKGZwcyk7XG4gICAgICB0aGlzLl90aWNrZXIub24oVGlja2VyLlRJQ0ssIGRlbHRhID0+IHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKFN0YWdlLkVOVEVSX0ZSQU1FLCBkZWx0YSk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3RpY2tlci5ydW4oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0RXZlbnRDYW52YXMoKSB7XG4gICAgdGhpcy5fZXZlbnRDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLl9ldmVudENhbnZhcy53aWR0aCA9IHRoaXMuX2NhbnZhcy53aWR0aDtcbiAgICB0aGlzLl9ldmVudENhbnZhcy5oZWlnaHQgPSB0aGlzLl9jYW52YXMuaGVpZ2h0O1xuICAgIHRoaXMuX2V2ZW50Q29udGV4dCA9IHRoaXMuX2V2ZW50Q2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgLy8gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggdGhpcy5fZXZlbnRDYW52YXMgKTtcbiAgICB0aGlzLl90ZW1wQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5fdGVtcENhbnZhcy53aWR0aCA9IHRoaXMuX2NhbnZhcy53aWR0aDtcbiAgICB0aGlzLl90ZW1wQ2FudmFzLmhlaWdodCA9IHRoaXMuX2NhbnZhcy5oZWlnaHQ7IHRoaXMuX3RlbXBDb250ZXh0ID0gdGhpcy5fdGVtcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEV2ZW50KCkge1xuICAgIGNvbnN0IHJlY3QgPSB0aGlzLl9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5fY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmKCAhdGhpcy5fZXZlbnRUYXJnZXRNYXBbTW91c2VFdmVudC5DTElDS10gfHwgdGhpcy5fZXZlbnRUYXJnZXRNYXBbTW91c2VFdmVudC5DTElDS10ubGVuZ3RoICl7IHJldHVybjsgfVxuICAgICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgY29uc3QgY29sb3IgPSB0aGlzLl9ldmVudENvbnRleHQuZ2V0SW1hZ2VEYXRhKHgsIHksIDEsIDEpO1xuICAgICAgY29uc3QgciA9IGNvbG9yLmRhdGFbMF0udG9TdHJpbmcoMTYpO1xuICAgICAgY29uc3QgZyA9IGNvbG9yLmRhdGFbMV0udG9TdHJpbmcoMTYpO1xuICAgICAgY29uc3QgYiA9IGNvbG9yLmRhdGFbMl0udG9TdHJpbmcoMTYpO1xuICAgICAgY29uc3QgY29sb3JLZXkgPSAnMCcucmVwZWF0KDIgLSByLmxlbmd0aCkgKyByICsgJzAnLnJlcGVhdCgyIC0gZy5sZW5ndGgpICsgZyArICcwJy5yZXBlYXQoMiAtIGIubGVuZ3RoKSArIGI7XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5fZXZlbnRUYXJnZXRNYXBbTW91c2VFdmVudC5DTElDS10ubGVuZ3RoIC0gMSwgY291bnQgPSAwOyBpID49IGNvdW50OyBpIC09IDEpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLl9ldmVudFRhcmdldE1hcFtNb3VzZUV2ZW50LkNMSUNLXVtpXTtcbiAgICAgICAgaWYgKGNvbG9yS2V5ID09PSBpdGVtLmNvbG9yS2V5KSB7XG4gICAgICAgICAgLy9UT0RPOnRhcmdldCAvIGN1cnJlbnRUYXJnZXQg6rWs67aEXG4gICAgICAgICAgaXRlbS50cmlnZ2VyKE1vdXNlRXZlbnQuQ0xJQ0ssIG5ldyBNb3VzZUV2ZW50KE1vdXNlRXZlbnQuQ0xJQ0ssIHt9LCBpdGVtLCBpdGVtKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiXG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCdcblxuaW50ZXJmYWNlIEV2ZW50SGFuZGxlciB7XG4gIChldmVudDogRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQ7XG59XG5cbmludGVyZmFjZSBFdmVudE1hcCB7XG4gIFtwcm9wOiBzdHJpbmddOiBFdmVudEhhbmRsZXJbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcbiAgcHJpdmF0ZSBfZXZlbnRNYXA6IEV2ZW50TWFwID0ge307XG5cbiAgcHVibGljIGdldCBldmVudE1hcCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE1hcDtcbiAgfVxuXG4gIHB1YmxpYyBvbih0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50SGFuZGxlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZXZlbnRNYXBbdHlwZV0pIHtcbiAgICAgIHRoaXMuX2V2ZW50TWFwW3R5cGVdID0gW107XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50TWFwW3R5cGVdLnB1c2goaGFuZGxlcik7XG4gIH1cblxuICBwdWJsaWMgb2ZmKHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRIYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgIGlmICh0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2V2ZW50TWFwW3R5cGVdLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIHRoaXMuX2V2ZW50TWFwW3R5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgICB0aGlzLl9ldmVudE1hcFt0eXBlXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRyaWdnZXIodHlwZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XG4gICAgaWYgKHRoaXMuX2V2ZW50TWFwW3R5cGVdKSB7XG4gICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuX2V2ZW50TWFwW3R5cGVdKSB7XG4gICAgICAgIGl0ZW0uY2FsbCh0aGlzLCBkYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50IHtcbiAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nID0gbnVsbDtcbiAgcHJpdmF0ZSBfZGF0YTogYW55ID0gbnVsbDtcblxuICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgcHVibGljIHNldCB0eXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90eXBlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgZGF0YT86IGFueSkge1xuICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICB9XG59IiwiaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0IERpc3BsYXkgZnJvbSAnLi4vZGlzcGxheS9kaXNwbGF5JztcblxuZW51bSBNb3VzZUV2ZW50VHlwZSB7XG4gIENMSUNLID0gJ2NsaWNrJyxcbiAgTU9VU0VfT1ZFUiA9ICdtb3VzZU92ZXInLFxuICBNT1VTRV9PVVQgPSAnbW91c2VPdXQnXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdXNlRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBDTElDSzogTW91c2VFdmVudFR5cGUgPSBNb3VzZUV2ZW50VHlwZS5DTElDSztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBNT1VTRV9PVkVSOiBNb3VzZUV2ZW50VHlwZSA9IE1vdXNlRXZlbnRUeXBlLk1PVVNFX09WRVI7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTU9VU0VfT1VUOiBNb3VzZUV2ZW50VHlwZSA9IE1vdXNlRXZlbnRUeXBlLk1PVVNFX09VVDtcblxuICBwcml2YXRlIF90YXJnZXQ6IERpc3BsYXkgPSBudWxsO1xuICBwcml2YXRlIF9jdXJyZW50VGFyZ2V0OiBEaXNwbGF5ID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih0eXBlOiBNb3VzZUV2ZW50VHlwZSwgZGF0YTogYW55LCB0YXJnZXQ6IERpc3BsYXksIGN1cnJlbnRUYXJnZXQ6IERpc3BsYXkpIHtcbiAgICBzdXBlcih0eXBlLCBkYXRhKTtcbiAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IGN1cnJlbnRUYXJnZXQ7XG4gIH1cbn0iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdHJpeCB7XG4gIHB1YmxpYyBhOiBudW1iZXIgPSAxO1xuICBwdWJsaWMgYjogbnVtYmVyID0gMDtcbiAgcHVibGljIGM6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBkOiBudW1iZXIgPSAxO1xuICBwdWJsaWMgdHg6IG51bWJlciA9IDA7XG4gIHB1YmxpYyB0eTogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihhOiBudW1iZXIgPSAxLCBiOiBudW1iZXIgPSAwLCBjOiBudW1iZXIgPSAwLCBkOiBudW1iZXIgPSAxLCB0eDogbnVtYmVyID0gMCwgdHk6IG51bWJlciA9IDApIHtcbiAgICB0aGlzLnNldFRvKGEsIGIsIGMsIGQsIHR4LCB0eSk7XG4gIH1cblxuICBwdWJsaWMgc2V0VG8oYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlciwgZDogbnVtYmVyLCB0eDogbnVtYmVyLCB0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hID0gYTtcbiAgICB0aGlzLmIgPSBiO1xuICAgIHRoaXMuYyA9IGM7XG4gICAgdGhpcy5kID0gZDtcbiAgICB0aGlzLnR4ID0gdHg7XG4gICAgdGhpcy50eSA9IHR5O1xuICB9XG5cbiAgcHVibGljIHNldFRvTWF0cml4KG1hdHJpeDogTWF0cml4KTogdm9pZCB7XG4gICAgdGhpcy5hID0gbWF0cml4LmE7XG4gICAgdGhpcy5iID0gbWF0cml4LmI7XG4gICAgdGhpcy5jID0gbWF0cml4LmM7XG4gICAgdGhpcy5kID0gbWF0cml4LmQ7XG4gICAgdGhpcy50eCA9IG1hdHJpeC50eDtcbiAgICB0aGlzLnR5ID0gbWF0cml4LnR5O1xuICB9XG5cbiAgcHVibGljIGFkZChtYXRyaXg6IE1hdHJpeCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLnNldFRvKHRoaXMuYSArIG1hdHJpeC5hLCB0aGlzLmIgKyBtYXRyaXguYiwgdGhpcy5jICsgbWF0cml4LmMsIHRoaXMuZCArIG1hdHJpeC5kLCB0aGlzLnR4ICsgbWF0cml4LnR4LCB0aGlzLnR5ICsgbWF0cml4LnR5KTtcbiAgfVxuXG4gIHB1YmxpYyBzdWIobWF0cml4OiBNYXRyaXgpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5zZXRUbyh0aGlzLmEgLSBtYXRyaXguYSwgdGhpcy5iIC0gbWF0cml4LmIsIHRoaXMuYyAtIG1hdHJpeC5jLCB0aGlzLmQgLSBtYXRyaXguZCwgdGhpcy50eCAtIG1hdHJpeC50eCwgdGhpcy50eSAtIG1hdHJpeC50eSk7XG4gIH1cblxuICBwdWJsaWMgbXVsdGkobWF0cml4OiBNYXRyaXgpOiB2b2lkIHtcbiAgICBsZXQgYTogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlciwgZDogbnVtYmVyLCB0eDogbnVtYmVyLCB0eTogbnVtYmVyO1xuXG4gICAgaWYgKHR5cGVvZiBtYXRyaXggPT09ICdudW1iZXInKSB7XG4gICAgICBhID0gdGhpcy5hICogbWF0cml4O1xuICAgICAgYiA9IHRoaXMuYiAqIG1hdHJpeDtcbiAgICAgIGMgPSB0aGlzLmMgKiBtYXRyaXg7XG4gICAgICBkID0gdGhpcy5kICogbWF0cml4O1xuICAgICAgdHggPSB0aGlzLnR4ICogbWF0cml4O1xuICAgICAgdHkgPSB0aGlzLnR5ICogbWF0cml4O1xuICAgIH0gZWxzZSB7XG4gICAgICBhID0gKHRoaXMuYSAqIG1hdHJpeC5hKSArICh0aGlzLmMgKiBtYXRyaXguYik7XG4gICAgICBiID0gKHRoaXMuYiAqIG1hdHJpeC5hKSArICh0aGlzLmQgKiBtYXRyaXguYik7XG4gICAgICBjID0gKHRoaXMuYSAqIG1hdHJpeC5jKSArICh0aGlzLmMgKiBtYXRyaXguZCk7XG4gICAgICBkID0gKHRoaXMuYiAqIG1hdHJpeC5jKSArICh0aGlzLmQgKiBtYXRyaXguZCk7XG4gICAgICB0eCA9ICh0aGlzLmEgKiBtYXRyaXgudHgpICsgKHRoaXMuYyAqIG1hdHJpeC50eSkgKyB0aGlzLnR4O1xuICAgICAgdHkgPSAodGhpcy5iICogbWF0cml4LnR4KSArICh0aGlzLmQgKiBtYXRyaXgudHkpICsgdGhpcy50eTtcbiAgICB9XG4gICAgdGhpcy5zZXRUbyhhLCBiLCBjLCBkLCB0eCwgdHkpO1xuICB9XG5cbiAgcHVibGljIGludmVyc2UoKTogTWF0cml4IHtcbiAgICBjb25zdCB7IGEsIGIsIGMsIGQsIHR4LCB0eSB9ID0gdGhpcztcbiAgICBjb25zdCBuID0gYSAqIGQgLSBiICogYztcbiAgICByZXR1cm4gbmV3IE1hdHJpeChkIC8gbiwgLWIgLyBuLCAtYyAvIG4sIGEgLyBuLCAoYyAqIHRoaXMudHkgLSBkICogdHgpIC8gbiwgKGIgKiB0eCAtIGEgKiB0aGlzLnR5KSAvIG4pO1xuICB9XG5cbiAgcHVibGljIGNsb25lKCk6IE1hdHJpeCB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXgodGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgdGhpcy5kLCB0aGlzLnR4LCB0aGlzLnR5KTtcbiAgfVxuXG4gIHB1YmxpYyBzY2FsZSh4OiBudW1iZXIgPSAxLCB5OiBudW1iZXIgPSAxKTogdm9pZCB7XG4gICAgdGhpcy5tdWx0aShuZXcgTWF0cml4KHgsIDAsIDAsIHksIDAsIDApKTtcbiAgfVxuXG4gIHB1YmxpYyB0cmFuc2xhdGUoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIHRoaXMubXVsdGkobmV3IE1hdHJpeCgxLCAwLCAwLCAxLCB4LCB5KSk7XG4gIH1cblxuICBwdWJsaWMgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpKG5ldyBNYXRyaXgoTWF0aC5jb3MoYW5nbGUpLCBNYXRoLnNpbihhbmdsZSksIC1NYXRoLnNpbihhbmdsZSksIE1hdGguY29zKGFuZ2xlKSkpO1xuICB9XG5cbiAgcHVibGljIHNrZXcoeCA9IDAsIHkgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5tdWx0aShuZXcgTWF0cml4KDEsIE1hdGgudGFuKHkpLCBNYXRoLnRhbih4KSwgMSwgMCwgMCkpO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VG8oMSwgMCwgMCwgMSwgMCwgMCk7XG4gIH1cblxuICBwdWJsaWMgZXF1YWxzKG1hdHJpeDogTWF0cml4KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYSA9PT0gbWF0cml4LmEgJiYgdGhpcy5iID09PSBtYXRyaXguYiAmJiB0aGlzLmMgPT09IG1hdHJpeC5jICYmIHRoaXMuZCA9PT0gbWF0cml4LmQgJiYgdGhpcy50eCA9PT0gbWF0cml4LnR4ICYmIHRoaXMudHkgPT09IG1hdHJpeC50eTtcbiAgfVxufVxuIiwiaW1wb3J0IE1hdHJpeCBmcm9tIFwiLi9tYXRyaXhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnQge1xuICBwdWJsaWMgeDogbnVtYmVyID0gMDtcbiAgcHVibGljIHk6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIHB1YmxpYyBkaXN0YW5jZShwb2ludDogUG9pbnQpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQueCAtIHRoaXMueCwgMikgKyBNYXRoLnBvdyhwb2ludC55IC0gdGhpcy55LCAyKSk7XG4gIH1cblxuICBwdWJsaWMgcm90YXRlKHJhZGlhbjogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IG1hdHJpeCA9IG5ldyBNYXRyaXgoTWF0aC5jb3MocmFkaWFuKSwgTWF0aC5zaW4ocmFkaWFuKSwgLU1hdGguc2luKHJhZGlhbiksIE1hdGguY29zKHJhZGlhbikpO1xuICAgIGxldCBweCA9IChtYXRyaXguYSAqIHRoaXMueCkgKyAobWF0cml4LmMgKiB0aGlzLnkpO1xuICAgIGxldCBweSA9IChtYXRyaXguYiAqIHRoaXMueCkgKyAobWF0cml4LmQgKiB0aGlzLnkpO1xuICAgIHJldHVybiBuZXcgUG9pbnQocHgsIHB5KTtcbiAgfVxuXG4gIHB1YmxpYyBzY2FsZShzY2FsZVg6IG51bWJlciwgc2NhbGVZOiBudW1iZXIpOiBQb2ludCB7XG4gICAgY29uc3QgbWF0cml4ID0gbmV3IE1hdHJpeChzY2FsZVgsIDAsIDAsIHNjYWxlWSk7XG4gICAgbGV0IHB4ID0gKG1hdHJpeC5hICogdGhpcy54KSArIChtYXRyaXguYyAqIHRoaXMueSk7XG4gICAgbGV0IHB5ID0gKG1hdHJpeC5iICogdGhpcy54KSArIChtYXRyaXguZCAqIHRoaXMueSk7XG4gICAgcmV0dXJuIG5ldyBQb2ludChweCwgcHkpO1xuICB9XG5cbiAgcHVibGljIHRyYW5zbGF0ZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IFBvaW50IHtcbiAgICBjb25zdCBtYXRyaXggPSBuZXcgTWF0cml4KDEsIDAsIDAsIDEsIHgsIHkpO1xuICAgIGxldCBweCA9IChtYXRyaXguYSAqIHRoaXMueCkgKyAobWF0cml4LmMgKiB0aGlzLnkpICsgbWF0cml4LnR4O1xuICAgIGxldCBweSA9IChtYXRyaXguYiAqIHRoaXMueCkgKyAobWF0cml4LmQgKiB0aGlzLnkpICsgbWF0cml4LnR5O1xuICAgIHJldHVybiBuZXcgUG9pbnQocHgsIHB5KTtcbiAgfVxuXG4gIHB1YmxpYyBza2V3KHNrZXdYOiBudW1iZXIsIHNrZXdZOiBudW1iZXIpOiBQb2ludCB7XG4gICAgY29uc3QgbWF0cml4ID0gbmV3IE1hdHJpeCgxLCBNYXRoLnRhbihza2V3WCksIE1hdGgudGFuKHNrZXdZKSwgMSk7XG4gICAgbGV0IHB4ID0gKG1hdHJpeC5hICogdGhpcy54KSArIChtYXRyaXguYyAqIHRoaXMueSk7XG4gICAgbGV0IHB5ID0gKG1hdHJpeC5iICogdGhpcy54KSArIChtYXRyaXguZCAqIHRoaXMueSk7XG4gICAgcmV0dXJuIG5ldyBQb2ludChweCwgcHkpO1xuICB9XG59XG4iLCJpbXBvcnQgUG9pbnQgZnJvbSBcIi4vcG9pbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlIHtcblxuICBwcml2YXRlIF93aWR0aDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9sZWZ0VG9wOiBQb2ludCA9IG51bGw7XG4gIHByaXZhdGUgX3JpZ2h0VG9wOiBQb2ludCA9IG51bGw7XG4gIHByaXZhdGUgX2xlZnRCb3R0b206IFBvaW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfcmlnaHRCb3R0b206IFBvaW50ID0gbnVsbDtcblxuICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl93aWR0aDsgfVxuICBwdWJsaWMgZ2V0IGhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faGVpZ2h0OyB9XG4gIHB1YmxpYyBnZXQgbGVmdCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdFRvcC54OyB9XG4gIHB1YmxpYyBnZXQgcmlnaHQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3JpZ2h0VG9wLng7IH1cbiAgcHVibGljIGdldCB0b3AoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xlZnRUb3AueTsgfVxuICBwdWJsaWMgZ2V0IGJvdHRvbSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdEJvdHRvbS55OyB9XG4gIHB1YmxpYyBnZXQgbGVmdFRvcCgpOiBQb2ludCB7IHJldHVybiB0aGlzLl9sZWZ0VG9wOyB9XG4gIHB1YmxpYyBnZXQgcmlnaHRUb3AoKTogUG9pbnQgeyByZXR1cm4gdGhpcy5fcmlnaHRUb3A7IH1cbiAgcHVibGljIGdldCBsZWZ0Qm90dG9tKCk6IFBvaW50IHsgcmV0dXJuIHRoaXMuX2xlZnRCb3R0b207IH1cbiAgcHVibGljIGdldCByaWdodEJvdHRvbSgpOiBQb2ludCB7IHJldHVybiB0aGlzLl9yaWdodEJvdHRvbTsgfVxuXG4gIHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlUmlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVCb3R0b20oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGVmdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sZWZ0VG9wLnggPSB2YWx1ZTtcbiAgICB0aGlzLmxlZnRCb3R0b20ueCA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHJpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnJpZ2h0VG9wLnggPSB2YWx1ZTtcbiAgICB0aGlzLnJpZ2h0Qm90dG9tLnggPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICB9XG5cbiAgcHVibGljIHNldCB0b3AodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMubGVmdFRvcC55ID0gdmFsdWU7XG4gICAgdGhpcy5yaWdodFRvcC55ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGJvdHRvbSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sZWZ0Qm90dG9tLnkgPSB2YWx1ZTtcbiAgICB0aGlzLnJpZ2h0Qm90dG9tLnkgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGVmdFRvcChwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLl9sZWZ0VG9wID0gcG9pbnQ7XG4gICAgdGhpcy5fdXBkYXRlV2lkdGgoKTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcmlnaHRUb3AocG9pbnQ6IFBvaW50KSB7XG4gICAgdGhpcy5fcmlnaHRUb3AgPSBwb2ludDtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCBsZWZ0Qm90dG9tKHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMuX2xlZnRCb3R0b20gPSBwb2ludDtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCByaWdodEJvdHRvbShwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLl9yaWdodEJvdHRvbSA9IHBvaW50O1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCB3aWR0aDogbnVtYmVyID0gMCwgaGVpZ2h0OiBudW1iZXIgPSAwKSB7XG4gICAgdGhpcy5fbGVmdFRvcCA9IG5ldyBQb2ludCgpO1xuICAgIHRoaXMuX3JpZ2h0VG9wID0gbmV3IFBvaW50KCk7XG4gICAgdGhpcy5fbGVmdEJvdHRvbSA9IG5ldyBQb2ludCgpO1xuICAgIHRoaXMuX3JpZ2h0Qm90dG9tID0gbmV3IFBvaW50KCk7XG4gICAgdGhpcy5zZXRUbyh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIHB1YmxpYyBjb250YWlucyh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB4ID49IHRoaXMubGVmdCAmJiB4IDw9IHRoaXMucmlnaHQgJiYgeSA8PSB0aGlzLmJvdHRvbSAmJiB5ID49IHRoaXMudG9wO1xuICB9XG5cbiAgcHVibGljIGNvbnRhaW5zUmVjdChyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiByZWN0YW5nbGUubGVmdCA+PSB0aGlzLmxlZnQgJiYgcmVjdGFuZ2xlLnJpZ2h0IDw9IHRoaXMucmlnaHQgJiYgcmVjdGFuZ2xlLnRvcCA+PSB0aGlzLnRvcCAmJiByZWN0YW5nbGUuYm90dG9tIDw9IHRoaXMuYm90dG9tO1xuICB9XG5cbiAgcHVibGljIGludGVyc2VjdHMocmVjdGFuZ2xlOiBSZWN0YW5nbGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWlucyhyZWN0YW5nbGUubGVmdCArIDEsIHJlY3RhbmdsZS50b3AgKyAxKSB8fCB0aGlzLmNvbnRhaW5zKHJlY3RhbmdsZS5sZWZ0ICsgMSwgcmVjdGFuZ2xlLmJvdHRvbSAtIDEpIHx8IHRoaXMuY29udGFpbnMocmVjdGFuZ2xlLnJpZ2h0IC0gMSwgcmVjdGFuZ2xlLnRvcCArIDEpIHx8IHRoaXMuY29udGFpbnMocmVjdGFuZ2xlLnJpZ2h0IC0gMSwgcmVjdGFuZ2xlLmJvdHRvbSAtIDEpO1xuICB9XG5cbiAgcHVibGljIGludGVyc2VjdGlvbihyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZSB7XG4gICAgbGV0IHJlc3VsdDogUmVjdGFuZ2xlID0gbnVsbDtcbiAgICBpZiAodGhpcy5pbnRlcnNlY3RzKHJlY3RhbmdsZSkpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBSZWN0YW5nbGUoKTtcbiAgICAgIHJlc3VsdC5sZWZ0ID0gTWF0aC5tYXgocmVjdGFuZ2xlLmxlZnQsIHRoaXMubGVmdCk7XG4gICAgICByZXN1bHQucmlnaHQgPSBNYXRoLm1pbihyZWN0YW5nbGUucmlnaHQsIHRoaXMucmlnaHQpO1xuICAgICAgcmVzdWx0LnRvcCA9IE1hdGgubWF4KHJlY3RhbmdsZS50b3AsIHRoaXMudG9wKTtcbiAgICAgIHJlc3VsdC5ib3R0b20gPSBNYXRoLm1pbihyZWN0YW5nbGUuYm90dG9tLCB0aGlzLmJvdHRvbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kcyhyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IHZvaWQge1xuICAgIGxldCBsZWZ0ID0gTWF0aC5taW4odGhpcy5sZWZ0LCByZWN0YW5nbGUubGVmdCk7XG4gICAgbGV0IHJpZ2h0ID0gTWF0aC5tYXgodGhpcy5yaWdodCwgcmVjdGFuZ2xlLnJpZ2h0KTtcbiAgICBsZXQgdG9wID0gTWF0aC5taW4odGhpcy50b3AsIHJlY3RhbmdsZS50b3ApO1xuICAgIGxldCBib3R0b20gPSBNYXRoLm1heCh0aGlzLmJvdHRvbSwgcmVjdGFuZ2xlLmJvdHRvbSk7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gICAgdGhpcy5ib3R0b20gPSBib3R0b207XG4gIH1cblxuICBwdWJsaWMgc2V0VG8oeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5sZWZ0ID0geDtcbiAgICB0aGlzLnRvcCA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG5cbiAgcHVibGljIGNsb25lKCk6IFJlY3RhbmdsZSB7XG4gICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUodGhpcy5sZWZ0LCB0aGlzLnRvcCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0VG8oMCwgMCwgMCwgMCk7XG4gIH1cblxuICBwdWJsaWMgZXF1YWxzKHJlY3RhbmdsZTogUmVjdGFuZ2xlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubGVmdCA9PT0gcmVjdGFuZ2xlLmxlZnQgJiYgdGhpcy50b3AgPT09IHJlY3RhbmdsZS50b3AgJiYgdGhpcy5yaWdodCA9PT0gcmVjdGFuZ2xlLnJpZ2h0ICYmIHRoaXMuYm90dG9tID09PSByZWN0YW5nbGUuYm90dG9tICYmIHRoaXMud2lkdGggPT09IHJlY3RhbmdsZS53aWR0aCAmJiB0aGlzLmhlaWdodCA9PT0gcmVjdGFuZ2xlLmhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVdpZHRoKCk6IHZvaWQge1xuICAgIHRoaXMuX3dpZHRoID0gdGhpcy5fcmlnaHRUb3AueCAtIHRoaXMuX2xlZnRUb3AueDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUhlaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9oZWlnaHQgPSB0aGlzLl9sZWZ0Qm90dG9tLnkgLSB0aGlzLl9sZWZ0VG9wLnk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVSaWdodCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yaWdodEJvdHRvbS54ID0gdGhpcy5fcmlnaHRUb3AueCA9IHRoaXMuX2xlZnRUb3AueCArIHRoaXMuX3dpZHRoO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQm90dG9tKCk6IHZvaWQge1xuICAgIHRoaXMuX2xlZnRCb3R0b20ueSA9IHRoaXMuX3JpZ2h0Qm90dG9tLnkgPSB0aGlzLl9sZWZ0VG9wLnkgKyB0aGlzLl9oZWlnaHQ7XG4gIH1cbn0iLCJcbmltcG9ydCBTdGFnZSBmcm9tICcuL2Rpc3BsYXkvc3RhZ2UnO1xuaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9kaXNwbGF5L2Rpc3BsYXknO1xuaW1wb3J0IERpc3BsYXlDb250YWluZXIgZnJvbSAnLi9kaXNwbGF5L2Rpc3BsYXktY29udGFpbmVyJztcbmltcG9ydCBHcmFwaGljcyBmcm9tICcuL2Rpc3BsYXkvZ3JhcGhpY3MnO1xuaW1wb3J0IFNoYXBlIGZyb20gJy4vZGlzcGxheS9zaGFwZSc7XG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vZGlzcGxheS9zcHJpdGUnO1xuaW1wb3J0IFNwcml0ZVNoZWV0IGZyb20gJy4vZGlzcGxheS9zcHJpdGUtc2hlZXQnO1xuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tICcuL2V2ZW50L2V2ZW50LWRpc3BhdGNoZXInO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQvZXZlbnQnO1xuaW1wb3J0IE1vdXNlRXZlbnQgZnJvbSAnLi9ldmVudC9tb3VzZS1ldmVudCc7XG5pbXBvcnQgTWF0cml4IGZyb20gJy4vZ2VvbS9tYXRyaXgnO1xuaW1wb3J0IFBvaW50IGZyb20gJy4vZ2VvbS9wb2ludCc7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4vZ2VvbS9yZWN0YW5nbGUnO1xuaW1wb3J0IFRpY2tlciBmcm9tICcuL3V0aWwvdGlja2VyJztcblxuY29uc3Qgc3RnID0ge1xuICBTdGFnZSxcbiAgRGlzcGxheSxcbiAgRGlzcGxheUNvbnRhaW5lcixcbiAgR3JhcGhpY3MsXG4gIFNoYXBlLFxuICBTcHJpdGUsXG4gIFNwcml0ZVNoZWV0LFxuICBFdmVudERpc3BhdGNoZXIsXG4gIEV2ZW50LFxuICBNb3VzZUV2ZW50LFxuICBNYXRyaXgsXG4gIFBvaW50LFxuICBSZWN0YW5nbGUsXG4gIFRpY2tlclxufTtcblxuKHdpbmRvdyBhcyBhbnkpLnN0ZyA9IHN0ZztcblxuZXhwb3J0IGRlZmF1bHQgc3RnO1xuIiwiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vZXZlbnQvZXZlbnQtZGlzcGF0Y2hlclwiO1xuXG5lbnVtIFRpY2tlclN0YXRlIHtcbiAgUkVBRFkgPSAncmVhZHknLFxuICBSVU5OSU5HID0gJ3J1bm5pbmcnXG59XG5cbmVudW0gVGlja2VyRXZlbnQge1xuICBUSUNLID0gJ3RpY2snXG59XG5cbmNvbnN0IF9vbmVTZWM6IG51bWJlciA9IDEwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tlciBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUSUNLOiBUaWNrZXJFdmVudCA9IFRpY2tlckV2ZW50LlRJQ0tcblxuICBwcml2YXRlIF9mcHM6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3N0YXRlOiBUaWNrZXJTdGF0ZSA9IFRpY2tlclN0YXRlLlJFQURZO1xuICBwcml2YXRlIF9wcmV2VGltZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfaW50ZXJuYWxUaW1lOiBudW1iZXIgPSAwO1xuXG4gIHB1YmxpYyBnZXQgZnBzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9mcHM7IH1cblxuICBwdWJsaWMgc2V0IGZwcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fZnBzID0gTWF0aC5tYXgodmFsdWUsIDEpO1xuICAgIC8vVE9ETzog66Gc7KeBIO2ZleyduFxuICAgIGlmICh2YWx1ZSA+IDAgJiYgdmFsdWUgPCAxKSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbFRpbWUgPSAoX29uZVNlYyAqIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faW50ZXJuYWxUaW1lID0gKF9vbmVTZWMgLyB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoZnBzID0gNDApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZnBzID0gZnBzO1xuICAgIHRoaXMuX3N0YXRlID0gVGlja2VyU3RhdGUuUkVBRFk7XG4gIH1cblxuICBwdWJsaWMgcnVuKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXRlID0gVGlja2VyU3RhdGUuUlVOTklORztcbiAgICB0aGlzLl9wcmV2VGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fcnVuKCkpO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGUgPSBUaWNrZXJTdGF0ZS5SRUFEWTtcbiAgfVxuXG4gIHByaXZhdGUgX3J1bigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IFRpY2tlclN0YXRlLlJFQURZKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IG5vdyA9ICtuZXcgRGF0ZSgpO1xuICAgIGNvbnN0IGRlbHRhID0gbm93IC0gdGhpcy5fcHJldlRpbWU7XG4gICAgaWYgKGRlbHRhID49IHRoaXMuX2ludGVybmFsVGltZSkge1xuICAgICAgdGhpcy50cmlnZ2VyKFRpY2tlci5USUNLLCB7IGRlbHRhOiBkZWx0YSB9KTtcbiAgICAgIHRoaXMuX3ByZXZUaW1lID0gK25ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSBUaWNrZXJTdGF0ZS5SVU5OSU5HKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX3J1bigpKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=