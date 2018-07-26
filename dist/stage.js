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
            console.log(!_this._eventTargetMap[mouse_event_1.default.CLICK]);
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
                console.log(colorKey, item.colorKey);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS1jb250YWluZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvZGlzcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9ncmFwaGljcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zaGFwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGlzcGxheS9zcHJpdGUtc2hlZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkvc3ByaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy9kaXNwbGF5L3N0YWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC1kaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9ldmVudC9ldmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQvbW91c2UtZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlb20vbWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3BvaW50LnRzIiwid2VicGFjazovLy8uL3NyYy9nZW9tL3JlY3RhbmdsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvdGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIs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QUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFTSxzQkFBSyxHQUFaO1FBQ0UsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSxzQkFBSyxHQUFaLFVBQWEsQ0FBYSxFQUFFLENBQWE7UUFBNUIseUJBQWE7UUFBRSx5QkFBYTtRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sMEJBQVMsR0FBaEIsVUFBaUIsQ0FBYSxFQUFFLENBQWE7UUFBNUIseUJBQWE7UUFBRSx5QkFBYTtRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sdUJBQU0sR0FBYixVQUFjLEtBQWE7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFTSxxQkFBSSxHQUFYLFVBQVksQ0FBSyxFQUFFLENBQUs7UUFBWix5QkFBSztRQUFFLHlCQUFLO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENB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QUssV0FBVyxDQUFDLEtBQUssRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNsRCxJQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBTSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUM5QjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxjQUFNLFlBQUksQ0FBQyxJQUFJLEVBQUUsRUFBWCxDQUFXLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUM7SUEvQ3NCLFdBQUksR0FBZ0IsV0FBVyxDQUFDLElBQUk7SUFnRDdELGFBQUM7Q0FBQSxDQWxEbUMsMEJBQWUsR0FrRGxEO2tCQWxEb0IsTUFBTSIsImZpbGUiOiJzdGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCBEaXNwbGF5IGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9zdGFnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc3BsYXlDb250YWluZXIgZXh0ZW5kcyBEaXNwbGF5IHtcblxuICBwcml2YXRlIF9jaGlsZHJlbjogRGlzcGxheVtdID0gW107XG5cbiAgcHVibGljIGdldCBjaGlsZHJlbigpOiBEaXNwbGF5W10ge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkQ2hpbGQoY2hpbGQ6IERpc3BsYXkpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleDogbnVtYmVyID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICBjaGlsZC5zdGFnZSA9IHRoaXMuc3RhZ2U7XG4gICAgY2hpbGQuY29sb3JLZXkgPSB0aGlzLnN0YWdlLmNyZWF0ZUNvbG9yS2V5KCk7XG4gICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICB0aGlzLnN0YWdlLmNoYW5nZWQgPSB0cnVlO1xuICAgIGNoaWxkLnRyaWdnZXIoU3RhZ2UuQUREX1RPX1NUQUdFKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVDaGlsZEFsbCgpOiB2b2lkIHtcbiAgICB3aGlsZSAodGhpcy5fY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuX2NoaWxkcmVuW3RoaXMuX2NoaWxkcmVuLmxlbmd0aCAtIDFdKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQ2hpbGQoY2hpbGQ6IERpc3BsYXkpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2NoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHsgcmV0dXJuOyB9XG4gICAgY2hpbGQudHJpZ2dlcihTdGFnZS5SRU1PVkVfVE9fU1RBR0UpO1xuICAgIHRoaXMuX2NoaWxkcmVuLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgICB0aGlzLnN0YWdlLnJldHVybkNvbG9yS2V5KGNoaWxkLmNvbG9yS2V5KTtcbiAgICBjaGlsZC5jb2xvcktleSA9IG51bGw7XG4gICAgY2hpbGQuc3RhZ2UgPSBudWxsO1xuICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgRGlzcGxheUNvbnRhaW5lcikge1xuICAgICAgKGNoaWxkIGFzIERpc3BsYXlDb250YWluZXIpLnJlbW92ZUNoaWxkQWxsKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZUNoaWxkQXQoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5nZXRDaGlsZEF0KGluZGV4KSk7XG4gICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnN0YWdlLmNoYW5nZWQgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGdldENoaWxkQXQoaW5kZXg6IG51bWJlcik6IERpc3BsYXkge1xuICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbltpbmRleF07XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRGlzcGxheSgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIHRoaXMuX2NoaWxkcmVuKSB7XG4gICAgICBpZiAoY2hpbGQudmlzaWJsZSkge1xuICAgICAgICBjaGlsZC51cGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSAnLi4vZXZlbnQvZXZlbnQtZGlzcGF0Y2hlcic7XG5pbXBvcnQgTWF0cml4IGZyb20gJy4uL2dlb20vbWF0cml4JztcbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi4vZ2VvbS9yZWN0YW5nbGUnO1xuaW1wb3J0IERpc3BsYXlDb250YWluZXIgZnJvbSAnLi9kaXNwbGF5LWNvbnRhaW5lcic7XG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9zdGFnZSc7XG5cbi8vIFRPRE86IO2MjOq0tOyekCDqtaztmIRcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIERpc3BsYXkgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xuXG4gIHByb3RlY3RlZCBfc3RhZ2U6IFN0YWdlID0gbnVsbDtcbiAgcHJvdGVjdGVkIF9wYXJlbnQ6IERpc3BsYXlDb250YWluZXIgPSBudWxsO1xuICBwcm90ZWN0ZWQgX2JvdW5kczogUmVjdGFuZ2xlID0gbmV3IFJlY3RhbmdsZSgpO1xuICBwcm90ZWN0ZWQgX2NvbXB1dGVkQm91bmRzOiBSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKCk7XG4gIHByb3RlY3RlZCBfbWF0cml4OiBNYXRyaXggPSBuZXcgTWF0cml4KCk7XG4gIHByb3RlY3RlZCBfY29sb3JLZXk6IHN0cmluZyA9IG51bGw7XG4gIHByb3RlY3RlZCBfY2VudGVyWDogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9jZW50ZXJZOiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX3JvdGF0ZTogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF93aWR0aDogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9oZWlnaHQ6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfc2NhbGVYOiBudW1iZXIgPSAxO1xuICBwcm90ZWN0ZWQgX3NjYWxlWTogbnVtYmVyID0gMTtcbiAgcHJvdGVjdGVkIF9za2V3WDogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF9za2V3WTogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF92aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICBwdWJsaWMgZ2V0IHN0YWdlKCk6IFN0YWdlIHsgcmV0dXJuIHRoaXMuX3N0YWdlOyB9XG4gIHB1YmxpYyBnZXQgcGFyZW50KCk6IERpc3BsYXlDb250YWluZXIgeyByZXR1cm4gdGhpcy5fcGFyZW50OyB9XG4gIHB1YmxpYyBnZXQgY29sb3JLZXkoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2NvbG9yS2V5OyB9XG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYm91bmRzLmxlZnQ7IH1cbiAgcHVibGljIGdldCB5KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9ib3VuZHMudG9wOyB9XG4gIHB1YmxpYyBnZXQgY2VudGVyWCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY2VudGVyWDsgfVxuICBwdWJsaWMgZ2V0IGNlbnRlclkoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2NlbnRlclk7IH1cbiAgcHVibGljIGdldCB3aWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYm91bmRzLndpZHRoOyB9XG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9ib3VuZHMuaGVpZ2h0OyB9XG4gIHB1YmxpYyBnZXQgcm90YXRlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9yb3RhdGU7IH1cbiAgcHVibGljIGdldCBzY2FsZVgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NjYWxlWDsgfVxuICBwdWJsaWMgZ2V0IHNjYWxlWSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fc2NhbGVZOyB9XG4gIHB1YmxpYyBnZXQgc2tld1goKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NrZXdYOyB9XG4gIHB1YmxpYyBnZXQgc2tld1koKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3NrZXdZOyB9XG4gIHB1YmxpYyBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Zpc2libGU7IH1cbiAgcHVibGljIGdldCBib3VuZHMoKTogUmVjdGFuZ2xlIHsgcmV0dXJuIHRoaXMuX2JvdW5kczsgfVxuICBwdWJsaWMgZ2V0IG1hdHJpeCgpOiBNYXRyaXggeyByZXR1cm4gdGhpcy5fbWF0cml4OyB9XG5cbiAgcHVibGljIGdldCBjb21wdXRlZEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmJvdW5kcztcbiAgICBjb25zdCBwb2ludHMgPSBbYm91bmRzLmxlZnRUb3AsIGJvdW5kcy5yaWdodFRvcCwgYm91bmRzLmxlZnRCb3R0b20sIGJvdW5kcy5yaWdodEJvdHRvbV07XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcG9pbnRzKSB7XG4gICAgICBpdGVtLnJvdGF0ZSh0aGlzLl9yb3RhdGUpO1xuICAgICAgaXRlbS5za2V3KHRoaXMuX3NrZXdYLCB0aGlzLl9za2V3WSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY29tcHV0ZWRCb3VuZHMubGVmdCA9IE1hdGgubWluKGJvdW5kcy5sZWZ0VG9wLngsIGJvdW5kcy5yaWdodFRvcC54LCBib3VuZHMubGVmdEJvdHRvbS54LCBib3VuZHMucmlnaHRCb3R0b20ueCk7XG4gICAgdGhpcy5fY29tcHV0ZWRCb3VuZHMucmlnaHQgPSBNYXRoLm1heChib3VuZHMubGVmdFRvcC54LCBib3VuZHMucmlnaHRUb3AueCwgYm91bmRzLmxlZnRCb3R0b20ueCwgYm91bmRzLnJpZ2h0Qm90dG9tLngpO1xuICAgIHRoaXMuX2NvbXB1dGVkQm91bmRzLnRvcCA9IE1hdGgubWluKGJvdW5kcy5sZWZ0VG9wLnksIGJvdW5kcy5yaWdodFRvcC55LCBib3VuZHMubGVmdEJvdHRvbS55LCBib3VuZHMucmlnaHRCb3R0b20ueSk7XG4gICAgdGhpcy5fY29tcHV0ZWRCb3VuZHMuYm90dG9tID0gTWF0aC5tYXgoYm91bmRzLmxlZnRUb3AueSwgYm91bmRzLnJpZ2h0VG9wLnksIGJvdW5kcy5sZWZ0Qm90dG9tLnksIGJvdW5kcy5yaWdodEJvdHRvbS55KTtcbiAgICByZXR1cm4gdGhpcy5fY29tcHV0ZWRCb3VuZHM7XG4gIH1cblxuICBwdWJsaWMgc2V0IHN0YWdlKHN0YWdlOiBTdGFnZSkge1xuICAgIHRoaXMuX3N0YWdlID0gc3RhZ2U7XG4gICAgaWYgKHRoaXMuX3N0YWdlKSB7XG4gICAgICB0aGlzLl9zdGFnZS5jaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IHBhcmVudChwYXJlbnQ6IERpc3BsYXlDb250YWluZXIpIHsgdGhpcy5fcGFyZW50ID0gcGFyZW50OyB9XG5cbiAgcHVibGljIHNldCBjb2xvcktleSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY29sb3JLZXkgPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgeCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2JvdW5kcy5sZWZ0ID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9ib3VuZHMubGVmdCA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHkodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9ib3VuZHMudG9wID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9ib3VuZHMudG9wID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgY2VudGVyWCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fY2VudGVyWCA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHNldCBjZW50ZXJZKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9jZW50ZXJZID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IHdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fd2lkdGggPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XG4gICAgdGhpcy5fYm91bmRzLndpZHRoID0gdmFsdWUgKiB0aGlzLl9zY2FsZVg7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5oZWlnaHQgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSB2YWx1ZSAqIHRoaXMuX3NjYWxlWTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCByb3RhdGUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9yb3RhdGUgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3JvdGF0ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNjYWxlWCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3NjYWxlWCA9PT0gdmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fc2NhbGVYID0gdmFsdWU7XG4gICAgdGhpcy5fYm91bmRzLndpZHRoID0gdGhpcy5fd2lkdGggKiB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBzY2FsZVkodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9zY2FsZVkgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NjYWxlWSA9IHZhbHVlO1xuICAgIHRoaXMuX2JvdW5kcy5oZWlnaHQgPSB0aGlzLl9oZWlnaHQgKiB2YWx1ZTtcbiAgICB0aGlzLl9jaGFuZ2VkRGlzcGxheSgpO1xuICB9XG5cbiAgcHVibGljIHNldCBza2V3WCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3NrZXdYID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9za2V3WCA9IHZhbHVlO1xuICAgIHRoaXMuX2NoYW5nZWREaXNwbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHNrZXdZKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2tld1kgPT09IHZhbHVlKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX3NrZXdZID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdmlzaWJsZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLl92aXNpYmxlID09PSB2YWx1ZSkgeyByZXR1cm47IH1cbiAgICB0aGlzLl92aXNpYmxlID0gdmFsdWU7XG4gICAgdGhpcy5fY2hhbmdlZERpc3BsYXkoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5vbihTdGFnZS5BRERfVE9fU1RBR0UsICgpID0+IHRoaXMuc3RhZ2UucmVnaXN0ZXJFdmVudE1hcCh0aGlzKSk7XG4gICAgdGhpcy5vbihTdGFnZS5SRU1PVkVfVE9fU1RBR0UsICgpID0+IHRoaXMuc3RhZ2UudW5yZWdpc3RlckV2ZW50TWFwKHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCB1cGRhdGVEaXNwbGF5KGNvbnRleHQ/OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkO1xuXG4gIHB1YmxpYyB1cGRhdGVUcmFuc2Zvcm1hdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLl9tYXRyaXgucmVzZXQoKTtcbiAgICBjb25zdCBvZmZzZXRYID0gdGhpcy54ICsgKHRoaXMuX2NlbnRlclggKiB0aGlzLl9zY2FsZVgpO1xuICAgIGNvbnN0IG9mZnNldFkgPSB0aGlzLnkgKyAodGhpcy5fY2VudGVyWSAqIHRoaXMuX3NjYWxlWSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtVHJhbnNsYXRlKG9mZnNldFgsIG9mZnNldFkpO1xuICAgIHRoaXMuX3RyYW5zZm9ybVJvdGF0ZSh0aGlzLl9yb3RhdGUpO1xuICAgIHRoaXMuX3RyYW5zZm9ybVRyYW5zbGF0ZSgtb2Zmc2V0WCwgLW9mZnNldFkpO1xuICAgIHRoaXMuX3RyYW5zZm9ybVRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtU2NhbGUodGhpcy5fc2NhbGVYLCB0aGlzLl9zY2FsZVkpO1xuICAgIHRoaXMuX3RyYW5zZm9ybVNrZXcodGhpcy5fc2tld1gsIHRoaXMuX3NrZXdZKTtcbiAgICB0aGlzLnN0YWdlLmNvbnRleHQudHJhbnNmb3JtKHRoaXMuX21hdHJpeC5hLCB0aGlzLl9tYXRyaXguYiwgdGhpcy5fbWF0cml4LmMsIHRoaXMuX21hdHJpeC5kLCB0aGlzLl9tYXRyaXgudHgsIHRoaXMuX21hdHJpeC50eSk7XG4gICAgdGhpcy5zdGFnZS50ZW1wQ29udGV4dC50cmFuc2Zvcm0odGhpcy5fbWF0cml4LmEsIHRoaXMuX21hdHJpeC5iLCB0aGlzLl9tYXRyaXguYywgdGhpcy5fbWF0cml4LmQsIHRoaXMuX21hdHJpeC50eCwgdGhpcy5fbWF0cml4LnR5KTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFnZS5jb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLnN0YWdlLnRlbXBDb250ZXh0LnNhdmUoKTtcbiAgICB0aGlzLnVwZGF0ZVRyYW5zZm9ybWF0aW9uKCk7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KHRoaXMuc3RhZ2UuY29udGV4dCk7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5KHRoaXMuc3RhZ2UudGVtcENvbnRleHQpO1xuICAgIHRoaXMuc3RhZ2UuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgdGhpcy5zdGFnZS50ZW1wQ29udGV4dC5yZXN0b3JlKCk7XG4gICAgdGhpcy5zdGFnZS50ZW1wQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLWluJztcbiAgICB0aGlzLnN0YWdlLnRlbXBDb250ZXh0LmZpbGxTdHlsZSA9ICcjJyArIHRoaXMuY29sb3JLZXk7XG4gICAgdGhpcy5zdGFnZS50ZW1wQ29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLnN0YWdlLnRlbXBDYW52YXMud2lkdGgsIHRoaXMuc3RhZ2UudGVtcENhbnZhcy5oZWlnaHQpO1xuICAgIHRoaXMuc3RhZ2UuZXZlbnRDb250ZXh0LmRyYXdJbWFnZSh0aGlzLnN0YWdlLnRlbXBDYW52YXMsIDAsIDApO1xuICAgIHRoaXMuc3RhZ2UudGVtcENhbnZhcy53aWR0aCA9IHRoaXMuc3RhZ2UudGVtcENhbnZhcy53aWR0aDtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybVRyYW5zbGF0ZSh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnRyYW5zbGF0ZSh4LCB5KTtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zZm9ybVJvdGF0ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnJvdGF0ZSh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF90cmFuc2Zvcm1TY2FsZSh4OiBudW1iZXIgPSAxLCB5OiBudW1iZXIgPSAxKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnNjYWxlKHgsIHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNmb3JtU2tldyh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5fbWF0cml4LnNrZXcoeCwgeSk7XG4gIH1cblxuICBwcml2YXRlIF9jaGFuZ2VkRGlzcGxheSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3RhZ2UpIHsgcmV0dXJuOyB9XG4gICAgaWYgKCF0aGlzLnN0YWdlLmNoYW5nZWQpIHtcbiAgICAgIHRoaXMuc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iLCJcbmV4cG9ydCBlbnVtIExpbmVDYXAge1xuICBCVVRUID0gJ2J1dHQnLFxuICBST1VORCA9ICdyb3VuZCcsXG4gIFNRVUFSRSA9ICdzcXVhcmUnLFxufVxuXG5leHBvcnQgZW51bSBMaW5lSm9pbiB7XG4gIFJPVU5UID0gJ3JvdW5kJyxcbiAgQkVWRUwgPSAnYmV2ZWwnLFxuICBNSVRFUiA9ICdtaXRlcicsXG59XG5cbmVudW0gRHJhd0NvbW1hbmROYW1lIHtcbiAgUkVDVCA9ICdyZWN0JyxcbiAgRklMTF9SRUNUID0gJ2ZpbGxSZWN0JyxcbiAgU1RST0tFX1JFQ1QgPSAnc3Ryb2tlUmVjdCcsXG4gIENMRUFSX1JFQ1QgPSAnY2xlYXJSZWN0JyxcbiAgQkVHSU5fUEFUSCA9ICdiZWdpblBhdGgnLFxuICBDTE9TRV9QQVRIID0gJ2Nsb3NlUGF0aCcsXG4gIE1PVkVfVE8gPSAnbW92ZVRvJyxcbiAgTElORV9UTyA9ICdsaW5lVG8nLFxuICBBUkMgPSAnYXJjJyxcbiAgQVJDX1RPID0gJ2FyY1RvJyxcbiAgUVVBRFJBVElDX0NVUlZFX1RPID0gJ3F1YWRyYXRpY0N1cnZlVG8nLFxuICBCRVpJRVJfQ1VSVkVfVE8gPSAnYmV6aWVyQ3VydmVUbycsXG4gIEZJTEwgPSAnZmlsbCcsXG4gIFNUUk9LRSA9ICdzdHJva2UnLFxufVxuXG5pbnRlcmZhY2UgRHJhd0NvbW1hbmQge1xuICBuYW1lOiBEcmF3Q29tbWFuZE5hbWU7XG4gIGFyZ3VtZW50czogYW55O1xuICBmaWxsU3R5bGU6IHN0cmluZztcbiAgc3Ryb2tlU3R5bGU6IHN0cmluZztcbiAgbGluZVdpZHRoOiBudW1iZXI7XG4gIGxpbmVDYXA6IExpbmVDYXA7XG4gIGxpbmVKb2luOiBMaW5lSm9pbjtcbiAgbWl0ZXJMaW1pdDogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaGljcyB7XG4gIHB1YmxpYyBmaWxsU3R5bGU6IHN0cmluZyA9IG51bGw7XG4gIHB1YmxpYyBzdHJva2VTdHlsZTogc3RyaW5nID0gbnVsbDtcbiAgcHVibGljIGxpbmVXaWR0aDogbnVtYmVyID0gMDtcbiAgcHVibGljIGxpbmVDYXA6IExpbmVDYXAgPSBMaW5lQ2FwLkJVVFQ7XG4gIHB1YmxpYyBsaW5lSm9pbjogTGluZUpvaW4gPSBMaW5lSm9pbi5NSVRFUjtcbiAgcHVibGljIG1pdGVyTGltaXQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NvbW1hbmRzOiBTZXQ8RHJhd0NvbW1hbmQ+ID0gbmV3IFNldCgpO1xuXG4gIHB1YmxpYyBnZXQgY29tbWFuZHMoKTogU2V0PERyYXdDb21tYW5kPiB7IHJldHVybiB0aGlzLl9jb21tYW5kczsgfVxuICBwdWJsaWMgZ2V0IGNvbW1hbmRMaXN0KCk6IEl0ZXJhYmxlSXRlcmF0b3I8RHJhd0NvbW1hbmQ+IHsgcmV0dXJuIHRoaXMuX2NvbW1hbmRzLnZhbHVlcygpOyB9XG5cbiAgcHVibGljIHJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuUkVDVCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBmaWxsUmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5GSUxMX1JFQ1QsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgc3Ryb2tlUmVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5TVFJPS0VfUkVDVCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclJlY3QoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQ0xFQVJfUkVDVCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBiZWdpblBhdGgoKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQkVHSU5fUEFUSCk7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VQYXRoKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLkNMT1NFX1BBVEgpO1xuICB9XG5cbiAgcHVibGljIG1vdmVUbyh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLk1PVkVfVE8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgbGluZVRvKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuTElORV9UTywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHB1YmxpYyBhcmMoeDogbnVtYmVyLCB5OiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBzdGFydEFuZ2xlOiBudW1iZXIsIGVuZEFuZ2xlOiBudW1iZXIsIGFudGljbG9ja3dpc2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5BUkMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgYXJjVG8oeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlciwgcmFkaXVzOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5BUkNfVE8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgcXVhZHJhdGljQ3VydmVUbyhjcDF4OiBudW1iZXIsIGNwMXk6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRDb21tYW5kKERyYXdDb21tYW5kTmFtZS5RVUFEUkFUSUNfQ1VSVkVfVE8sIGFyZ3VtZW50cyk7XG4gIH1cblxuICBwdWJsaWMgYmV6aWVyQ3VydmVUbyhjcDF4OiBudW1iZXIsIGNwMXk6IG51bWJlciwgY3AyeDogbnVtYmVyLCBjcDJ5OiBudW1iZXIsIHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuQkVaSUVSX0NVUlZFX1RPLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcHVibGljIGZpbGwoKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29tbWFuZChEcmF3Q29tbWFuZE5hbWUuRklMTCk7XG4gIH1cblxuICBwdWJsaWMgc3Ryb2tlKCk6IHZvaWQge1xuICAgIHRoaXMuX2FkZENvbW1hbmQoRHJhd0NvbW1hbmROYW1lLlNUUk9LRSk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZHMuY2xlYXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZENvbW1hbmQobmFtZTogRHJhd0NvbW1hbmROYW1lLCBhcmdzPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fY29tbWFuZHMuYWRkKHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBhcmd1bWVudHM6IGFyZ3MsXG4gICAgICBmaWxsU3R5bGU6IHRoaXMuZmlsbFN0eWxlLFxuICAgICAgc3Ryb2tlU3R5bGU6IHRoaXMuc3Ryb2tlU3R5bGUsXG4gICAgICBsaW5lV2lkdGg6IHRoaXMubGluZVdpZHRoLFxuICAgICAgbGluZUNhcDogdGhpcy5saW5lQ2FwLFxuICAgICAgbGluZUpvaW46IHRoaXMubGluZUpvaW4sXG4gICAgICBtaXRlckxpbWl0OiB0aGlzLm1pdGVyTGltaXQsXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBEaXNwbGF5IGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgR3JhcGhpY3MgZnJvbSAnLi9ncmFwaGljcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXBlIGV4dGVuZHMgRGlzcGxheSB7XG4gIHB1YmxpYyBncmFwaGljczogR3JhcGhpY3MgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGdyYXBoaWNzOiBHcmFwaGljcykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5ncmFwaGljcyA9IGdyYXBoaWNzIHx8IG5ldyBHcmFwaGljcygpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZURpc3BsYXkoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjb21tYW5kIG9mIHRoaXMuZ3JhcGhpY3MuY29tbWFuZExpc3QpIHtcbiAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gY29tbWFuZC5maWxsU3R5bGU7XG4gICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29tbWFuZC5zdHJva2VTdHlsZTtcbiAgICAgIGNvbnRleHQubGluZVdpZHRoID0gY29tbWFuZC5saW5lV2lkdGg7XG4gICAgICBjb250ZXh0LmxpbmVDYXAgPSBjb21tYW5kLmxpbmVDYXA7XG4gICAgICBjb250ZXh0LmxpbmVKb2luID0gY29tbWFuZC5saW5lSm9pbjtcbiAgICAgIGNvbnRleHQubWl0ZXJMaW1pdCA9IGNvbW1hbmQubWl0ZXJMaW1pdDtcbiAgICAgIGlmIChjb21tYW5kLmFyZ3VtZW50cykge1xuICAgICAgICAoY29udGV4dCBhcyBhbnkpW2NvbW1hbmQubmFtZV0oLi4uY29tbWFuZC5hcmd1bWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKGNvbnRleHQgYXMgYW55KVtjb21tYW5kLm5hbWVdKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gJy4uL2V2ZW50L2V2ZW50LWRpc3BhdGNoZXInO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuLi9nZW9tL3JlY3RhbmdsZSc7XG5cbmV4cG9ydCBlbnVtIFNwcml0ZVNoZWV0RXZlbnQge1xuICBMT0FEID0gJ2xvYWQnLFxuICBFTkQgPSAnZW5kJyxcbn1cblxuaW50ZXJmYWNlIEZyYW1lIHtcbiAgW2luZGV4OiBzdHJpbmddOiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZVNoZWV0IGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExPQUQ6IFNwcml0ZVNoZWV0RXZlbnQgPSBTcHJpdGVTaGVldEV2ZW50LkxPQUQ7XG5cbiAgcHJpdmF0ZSBfaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBudWxsO1xuICBwcml2YXRlIF9jZWxsV2lkdGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2NlbGxIZWlnaHQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2ZyYW1lczogRnJhbWVbXSA9IG51bGw7XG4gIHByaXZhdGUgX2ZyYW1lSW5kZXg6IG51bWJlciA9IC0xO1xuICBwcml2YXRlIF9jdXJyZW50Qm91bmRzOiBSZWN0YW5nbGUgPSBudWxsO1xuICBwcml2YXRlIF9sb29wOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHVibGljIGdldCBpbWFnZSgpOiBIVE1MSW1hZ2VFbGVtZW50IHsgcmV0dXJuIHRoaXMuX2ltYWdlOyB9XG4gIHB1YmxpYyBnZXQgY2VsbFdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jZWxsV2lkdGg7IH1cbiAgcHVibGljIGdldCBjZWxsSGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jZWxsSGVpZ2h0OyB9XG4gIHB1YmxpYyBnZXQgY3VycmVudEJvdW5kcygpIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRCb3VuZHM7IH1cblxuICBjb25zdHJ1Y3RvcihpbWc6IEhUTUxJbWFnZUVsZW1lbnQgfCBzdHJpbmcsIGNlbGxXaWR0aDogbnVtYmVyLCBjZWxsSGVpZ2h0OiBudW1iZXIsIGZyYW1lczogRnJhbWVbXSwgbG9vcDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChpbWcgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICB0aGlzLl9pbWFnZSA9IGltZztcbiAgICAgIHRoaXMudHJpZ2dlcihTcHJpdGVTaGVldC5MT0FEKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gaW1nO1xuICAgICAgdGhpcy5faW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHRoaXMudHJpZ2dlcihTcHJpdGVTaGVldC5MT0FEKSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2VsbFdpZHRoID0gY2VsbFdpZHRoO1xuICAgIHRoaXMuX2NlbGxIZWlnaHQgPSBjZWxsSGVpZ2h0O1xuICAgIHRoaXMuX2ZyYW1lcyA9IGZyYW1lcztcbiAgICB0aGlzLl9mcmFtZUluZGV4ID0gLTE7XG4gICAgdGhpcy5fY3VycmVudEJvdW5kcyA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0KTtcbiAgICB0aGlzLl9sb29wID0gbG9vcDtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mcmFtZUluZGV4ICsgMSA8PSB0aGlzLl9mcmFtZXMubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5fZnJhbWVJbmRleCsrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fbG9vcCkge1xuICAgICAgICB0aGlzLl9mcmFtZUluZGV4ID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcihTcHJpdGVTaGVldEV2ZW50LkVORCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZUJvdW5kcygpO1xuICB9XG5cbiAgcHVibGljIHByZXYoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ZyYW1lSW5kZXggLSAxID4gMCkge1xuICAgICAgdGhpcy5fZnJhbWVJbmRleC0tO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fbG9vcCkge1xuICAgICAgICB0aGlzLl9mcmFtZUluZGV4ID0gdGhpcy5fZnJhbWVzLmxlbmd0aCAtIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRyaWdnZXIoU3ByaXRlU2hlZXRFdmVudC5FTkQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl91cGRhdGVCb3VuZHMoKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9mcmFtZUluZGV4ID0gLTE7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCb3VuZHMoKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudEZyYW1lID0gdGhpcy5fZnJhbWVzW3RoaXMuX2ZyYW1lSW5kZXhdO1xuICAgIHRoaXMuX2N1cnJlbnRCb3VuZHMueCA9IGN1cnJlbnRGcmFtZVswXSAqIHRoaXMuX2NlbGxXaWR0aDtcbiAgICB0aGlzLl9jdXJyZW50Qm91bmRzLnkgPSBjdXJyZW50RnJhbWVbMV0gKiB0aGlzLl9jZWxsSGVpZ2h0O1xuICB9XG59XG4iLCJpbXBvcnQgRGlzcGxheSBmcm9tICcuL2Rpc3BsYXknO1xuaW1wb3J0IFNwcml0ZVNoZWV0LCB7IFNwcml0ZVNoZWV0RXZlbnQgfSBmcm9tICcuL3Nwcml0ZS1zaGVldCc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4uL3V0aWwvdGlja2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIGV4dGVuZHMgRGlzcGxheSB7XG4gIHByaXZhdGUgX3Nwcml0ZVNoZWV0OiBTcHJpdGVTaGVldCA9IG51bGw7XG4gIHByaXZhdGUgX2ZwczogbnVtYmVyID0gMTA7XG4gIHByaXZhdGUgX3RpY2tlcjogVGlja2VyID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihzcHJpdGVTaGVldDogU3ByaXRlU2hlZXQsIGZwczogbnVtYmVyID0gMTApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3Nwcml0ZVNoZWV0ID0gc3ByaXRlU2hlZXQ7XG4gICAgdGhpcy5fZnBzID0gZnBzO1xuICAgIHRoaXMuX3RpY2tlciA9IG5ldyBUaWNrZXIoZnBzKTtcbiAgICB0aGlzLl90aWNrZXIub24oVGlja2VyLlRJQ0ssICgpID0+IHRoaXMuX3RpY2tlckhhbmRsZXIoKSk7XG4gICAgdGhpcy5fc3ByaXRlU2hlZXQub24oU3ByaXRlU2hlZXRFdmVudC5FTkQsICgpID0+IHRoaXMuc3RvcCgpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3ByaXRlU2hlZXQoKTogU3ByaXRlU2hlZXQgeyByZXR1cm4gdGhpcy5fc3ByaXRlU2hlZXQ7IH1cbiAgcHVibGljIGdldCBmcHMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2ZwczsgfVxuXG4gIHB1YmxpYyBzZXQgc3ByaXRlU2hlZXQoc3ByaXRlU2hlZXQ6IFNwcml0ZVNoZWV0KSB7XG4gICAgdGhpcy5fc3ByaXRlU2hlZXQgPSBzcHJpdGVTaGVldDtcbiAgICB0aGlzLl9ib3VuZHMud2lkdGggPSBzcHJpdGVTaGVldC5jZWxsV2lkdGg7XG4gICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IHNwcml0ZVNoZWV0LmNlbGxIZWlnaHQ7XG4gIH1cblxuICBwdWJsaWMgc2V0IGZwcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fZnBzID0gdmFsdWU7XG4gICAgdGhpcy5fdGlja2VyLmZwcyA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIHBsYXkoKTogdm9pZCB7XG4gICAgdGhpcy5fdGlja2VySGFuZGxlcigpO1xuICAgIHRoaXMuX3RpY2tlci5ydW4oKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zcHJpdGVTaGVldC5yZXNldCgpO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKTogdm9pZCB7XG4gICAgdGhpcy5fdGlja2VyLnN0b3AoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVEaXNwbGF5KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuX3Nwcml0ZVNoZWV0LmN1cnJlbnRCb3VuZHM7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICB0aGlzLl9zcHJpdGVTaGVldC5pbWFnZSxcbiAgICAgIGJvdW5kcy5sZWZ0LFxuICAgICAgYm91bmRzLnRvcCxcbiAgICAgIGJvdW5kcy53aWR0aCxcbiAgICAgIGJvdW5kcy5oZWlnaHQsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIGJvdW5kcy53aWR0aCxcbiAgICAgIGJvdW5kcy5oZWlnaHQsXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RpY2tlckhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc3ByaXRlU2hlZXQubmV4dCgpO1xuICAgIHRoaXMuc3RhZ2UuY2hhbmdlZCA9IHRydWU7XG4gICAgdGhpcy5zdGFnZS51cGRhdGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IERpc3BsYXlDb250YWluZXIgZnJvbSAnLi9kaXNwbGF5LWNvbnRhaW5lcic7XG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4uL2dlb20vcmVjdGFuZ2xlJztcbmltcG9ydCBUaWNrZXIgZnJvbSAnLi4vdXRpbC90aWNrZXInO1xuaW1wb3J0IERpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBNb3VzZUV2ZW50IGZyb20gJy4uL2V2ZW50L21vdXNlLWV2ZW50JztcblxuZW51bSBTdGFnZUV2ZW50VHlwZSB7XG4gIEFERF9UT19TVEFHRSA9ICdhZGRUb1N0YWdlJyxcbiAgUkVNT1ZFX1RPX1NUQUdFID0gJ3JlbW92ZVRvU3RhZ2UnLFxuICBFTlRFUl9GUkFNRSA9ICdlbnRlckZyYW1lJyxcbn1cblxuaW50ZXJmYWNlIEV2ZW50VGFyZ2V0TWFwIHtcbiAgW3Byb3A6IHN0cmluZ106IERpc3BsYXlbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2UgZXh0ZW5kcyBEaXNwbGF5Q29udGFpbmVyIHtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEFERF9UT19TVEFHRTogU3RhZ2VFdmVudFR5cGUgPSBTdGFnZUV2ZW50VHlwZS5BRERfVE9fU1RBR0U7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUkVNT1ZFX1RPX1NUQUdFOiBTdGFnZUV2ZW50VHlwZSA9IFN0YWdlRXZlbnRUeXBlLlJFTU9WRV9UT19TVEFHRTtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBFTlRFUl9GUkFNRTogU3RhZ2VFdmVudFR5cGUgPSBTdGFnZUV2ZW50VHlwZS5FTlRFUl9GUkFNRTtcblxuICBwdWJsaWMgY2hhbmdlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfZXZlbnRDYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfdGVtcENhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBudWxsO1xuICBwcml2YXRlIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBudWxsO1xuICBwcml2YXRlIF9ldmVudENvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IG51bGw7XG4gIHByaXZhdGUgX3RlbXBDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBudWxsO1xuICBwcml2YXRlIF9yZXR1cm5lZENvbG9yS2V5OiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIF90aWNrZXI6IFRpY2tlciA9IG51bGw7XG4gIHByaXZhdGUgX2V2ZW50VGFyZ2V0TWFwOiBFdmVudFRhcmdldE1hcCA9IHt9O1xuICBwcml2YXRlIF9zdGFydENvbG9yID0gMDtcblxuICBjb25zdHJ1Y3RvcihjYW52YXNJZDogc3RyaW5nLCBmcHM6IG51bWJlcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLl9zdGFnZSA9IHRoaXM7XG4gICAgdGhpcy5fYm91bmRzID0gbmV3IFJlY3RhbmdsZSgwLCAwLCB0aGlzLl9jYW52YXMud2lkdGgsIHRoaXMuX2NhbnZhcy5oZWlnaHQpO1xuICAgIFxuICAgIHRoaXMuX2luaXRGUFMoZnBzKTtcbiAgICB0aGlzLl9pbml0RXZlbnRDYW52YXMoKTtcbiAgICB0aGlzLl9pbml0RXZlbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHsgcmV0dXJuIHRoaXMuX2NhbnZhczsgfVxuICBwdWJsaWMgZ2V0IGV2ZW50Q2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHsgcmV0dXJuIHRoaXMuX2V2ZW50Q2FudmFzOyB9XG4gIHB1YmxpYyBnZXQgdGVtcENhbnZhcygpOiBIVE1MQ2FudmFzRWxlbWVudCB7IHJldHVybiB0aGlzLl90ZW1wQ2FudmFzOyB9XG4gIHB1YmxpYyBnZXQgY29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgeyByZXR1cm4gdGhpcy5fY29udGV4dDsgfVxuICBwdWJsaWMgZ2V0IGV2ZW50Q29udGV4dCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgeyByZXR1cm4gdGhpcy5fZXZlbnRDb250ZXh0OyB9XG4gIHB1YmxpYyBnZXQgdGVtcENvbnRleHQoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHsgcmV0dXJuIHRoaXMuX3RlbXBDb250ZXh0OyB9XG5cbiAgcHVibGljIGNyZWF0ZUNvbG9yS2V5KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuX3JldHVybmVkQ29sb3JLZXkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmV0dXJuZWRDb2xvcktleS5zaGlmdCgpO1xuICAgIH1cbiAgICBsZXQgdmFsdWUgPSBOdW1iZXIodGhpcy5fc3RhcnRDb2xvciArPSAxMCkudG9TdHJpbmcoMTYpO1xuICAgIHZhbHVlID0gJzAnLnJlcGVhdCg2IC0gdmFsdWUubGVuZ3RoKSArIHZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyByZXR1cm5Db2xvcktleSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmV0dXJuZWRDb2xvcktleS5wdXNoKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hhbmdlZCkge1xuICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fY2FudmFzLndpZHRoO1xuICAgICAgdGhpcy5fZXZlbnRDYW52YXMud2lkdGggPSB0aGlzLl9ldmVudENhbnZhcy53aWR0aDtcbiAgICAgIHRoaXMuX3RlbXBDYW52YXMud2lkdGggPSB0aGlzLl90ZW1wQ2FudmFzLndpZHRoO1xuICAgICAgc3VwZXIudXBkYXRlKCk7XG4gICAgICB0aGlzLmNoYW5nZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJFdmVudE1hcChkaXNwbGF5OiBEaXNwbGF5KTogdm9pZCB7XG4gICAgY29uc3QgY2hpbGRFdmVudE1hcCA9IGRpc3BsYXkuZXZlbnRNYXA7XG4gICAgZm9yIChjb25zdCB0eXBlIGluIGNoaWxkRXZlbnRNYXApIHtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0pIHtcbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdLnB1c2goZGlzcGxheSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVucmVnaXN0ZXJFdmVudE1hcChkaXNwbGF5OiBEaXNwbGF5KSB7XG4gICAgY29uc3QgY2hpbGRFdmVudE1hcCA9IGRpc3BsYXkuZXZlbnRNYXA7XG4gICAgZm9yIChjb25zdCB0eXBlIGluIGNoaWxkRXZlbnRNYXApIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZXZlbnRUYXJnZXRNYXBbdHlwZV0uaW5kZXhPZihkaXNwbGF5KTtcbiAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0TWFwW3R5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZQUyhmcHM6IG51bWJlcikge1xuICAgIGlmIChmcHMpIHtcbiAgICAgIHRoaXMuX3RpY2tlciA9IG5ldyBUaWNrZXIoZnBzKTtcbiAgICAgIHRoaXMuX3RpY2tlci5vbihUaWNrZXIuVElDSywgKGRlbHRhKSA9PiB7XG4gICAgICAgIHRoaXMudHJpZ2dlcihTdGFnZS5FTlRFUl9GUkFNRSwgZGVsdGEpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl90aWNrZXIucnVuKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEV2ZW50Q2FudmFzKCkge1xuICAgIHRoaXMuX2V2ZW50Q2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5fZXZlbnRDYW52YXMud2lkdGggPSB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgdGhpcy5fZXZlbnRDYW52YXMuaGVpZ2h0ID0gdGhpcy5fY2FudmFzLmhlaWdodDtcbiAgICB0aGlzLl9ldmVudENvbnRleHQgPSB0aGlzLl9ldmVudENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIC8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIHRoaXMuX2V2ZW50Q2FudmFzICk7XG4gICAgdGhpcy5fdGVtcENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuX3RlbXBDYW52YXMud2lkdGggPSB0aGlzLl9jYW52YXMud2lkdGg7XG4gICAgdGhpcy5fdGVtcENhbnZhcy5oZWlnaHQgPSB0aGlzLl9jYW52YXMuaGVpZ2h0OyB0aGlzLl90ZW1wQ29udGV4dCA9IHRoaXMuX3RlbXBDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRFdmVudCgpIHtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5fY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMuX2NhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnNvbGUubG9nKCAhdGhpcy5fZXZlbnRUYXJnZXRNYXBbTW91c2VFdmVudC5DTElDS10gKVxuICAgICAgaWYgKCF0aGlzLl9ldmVudFRhcmdldE1hcFtNb3VzZUV2ZW50LkNMSUNLXSB8fCAhdGhpcy5fZXZlbnRUYXJnZXRNYXBbTW91c2VFdmVudC5DTElDS10ubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgICAgY29uc3QgeCA9IGV2ZW50LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICBjb25zdCB5ID0gZXZlbnQuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgY29uc3QgY29sb3IgPSB0aGlzLl9ldmVudENvbnRleHQuZ2V0SW1hZ2VEYXRhKHgsIHksIDEsIDEpO1xuICAgICAgY29uc3QgciA9IGNvbG9yLmRhdGFbMF0udG9TdHJpbmcoMTYpO1xuICAgICAgY29uc3QgZyA9IGNvbG9yLmRhdGFbMV0udG9TdHJpbmcoMTYpO1xuICAgICAgY29uc3QgYiA9IGNvbG9yLmRhdGFbMl0udG9TdHJpbmcoMTYpO1xuICAgICAgY29uc3QgY29sb3JLZXkgPSAnMCcucmVwZWF0KDIgLSByLmxlbmd0aCkgKyByICsgJzAnLnJlcGVhdCgyIC0gZy5sZW5ndGgpICsgZyArICcwJy5yZXBlYXQoMiAtIGIubGVuZ3RoKSArIGI7XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5fZXZlbnRUYXJnZXRNYXBbTW91c2VFdmVudC5DTElDS10ubGVuZ3RoIC0gMSwgY291bnQgPSAwOyBpID49IGNvdW50OyBpIC09IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2V2ZW50VGFyZ2V0TWFwW01vdXNlRXZlbnQuQ0xJQ0tdW2ldO1xuICAgICAgICBjb25zb2xlLmxvZyggY29sb3JLZXksIGl0ZW0uY29sb3JLZXkgKTtcbiAgICAgICAgaWYgKGNvbG9yS2V5ID09PSBpdGVtLmNvbG9yS2V5KSB7XG4gICAgICAgICAgLy8gVE9ETzp0YXJnZXQgLyBjdXJyZW50VGFyZ2V0IOq1rOu2hFxuICAgICAgICAgIGl0ZW0udHJpZ2dlcihNb3VzZUV2ZW50LkNMSUNLLCBuZXcgTW91c2VFdmVudChNb3VzZUV2ZW50LkNMSUNLLCB7fSwgaXRlbSwgaXRlbSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsIlxuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuXG50eXBlIEV2ZW50SGFuZGxlciA9IChldmVudDogRXZlbnQsIGRhdGE6IGFueSkgPT4gdm9pZDtcblxuaW50ZXJmYWNlIEV2ZW50TWFwIHtcbiAgW3Byb3A6IHN0cmluZ106IEV2ZW50SGFuZGxlcltdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICBwcml2YXRlIF9ldmVudE1hcDogRXZlbnRNYXAgPSB7fTtcblxuICBwdWJsaWMgZ2V0IGV2ZW50TWFwKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50TWFwO1xuICB9XG5cbiAgcHVibGljIG9uKHR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRIYW5kbGVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgdGhpcy5fZXZlbnRNYXBbdHlwZV0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5fZXZlbnRNYXBbdHlwZV0ucHVzaChoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBvZmYodHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudEhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlcikge1xuICAgICAgaWYgKHRoaXMuX2V2ZW50TWFwW3R5cGVdKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZXZlbnRNYXBbdHlwZV0uaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgdGhpcy5fZXZlbnRNYXBbdHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2V2ZW50TWFwW3R5cGVdKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50TWFwW3R5cGVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdHJpZ2dlcih0eXBlOiBzdHJpbmcsIGRhdGE/OiBhbnkpIHtcbiAgICBpZiAodGhpcy5fZXZlbnRNYXBbdHlwZV0pIHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9ldmVudE1hcFt0eXBlXSkge1xuICAgICAgICBpdGVtLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50IHtcbiAgcHJpdmF0ZSBfdHlwZTogc3RyaW5nID0gbnVsbDtcbiAgcHJpdmF0ZSBfZGF0YTogYW55ID0gbnVsbDtcblxuICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgcHVibGljIHNldCB0eXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90eXBlID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgZGF0YT86IGFueSkge1xuICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICB9XG59XG4iLCJpbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5pbXBvcnQgRGlzcGxheSBmcm9tICcuLi9kaXNwbGF5L2Rpc3BsYXknO1xuXG5lbnVtIE1vdXNlRXZlbnRUeXBlIHtcbiAgQ0xJQ0sgPSAnY2xpY2snLFxuICBNT1VTRV9PVkVSID0gJ21vdXNlT3ZlcicsXG4gIE1PVVNFX09VVCA9ICdtb3VzZU91dCcsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdXNlRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBDTElDSzogTW91c2VFdmVudFR5cGUgPSBNb3VzZUV2ZW50VHlwZS5DTElDSztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBNT1VTRV9PVkVSOiBNb3VzZUV2ZW50VHlwZSA9IE1vdXNlRXZlbnRUeXBlLk1PVVNFX09WRVI7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTU9VU0VfT1VUOiBNb3VzZUV2ZW50VHlwZSA9IE1vdXNlRXZlbnRUeXBlLk1PVVNFX09VVDtcblxuICBwcml2YXRlIF90YXJnZXQ6IERpc3BsYXkgPSBudWxsO1xuICBwcml2YXRlIF9jdXJyZW50VGFyZ2V0OiBEaXNwbGF5ID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcih0eXBlOiBNb3VzZUV2ZW50VHlwZSwgZGF0YTogYW55LCB0YXJnZXQ6IERpc3BsYXksIGN1cnJlbnRUYXJnZXQ6IERpc3BsYXkpIHtcbiAgICBzdXBlcih0eXBlLCBkYXRhKTtcbiAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IGN1cnJlbnRUYXJnZXQ7XG4gIH1cbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF0cml4IHtcbiAgcHVibGljIGE6IG51bWJlciA9IDE7XG4gIHB1YmxpYyBiOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgYzogbnVtYmVyID0gMDtcbiAgcHVibGljIGQ6IG51bWJlciA9IDE7XG4gIHB1YmxpYyB0eDogbnVtYmVyID0gMDtcbiAgcHVibGljIHR5OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKGE6IG51bWJlciA9IDEsIGI6IG51bWJlciA9IDAsIGM6IG51bWJlciA9IDAsIGQ6IG51bWJlciA9IDEsIHR4OiBudW1iZXIgPSAwLCB0eTogbnVtYmVyID0gMCkge1xuICAgIHRoaXMuc2V0VG8oYSwgYiwgYywgZCwgdHgsIHR5KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRUbyhhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIsIHR4OiBudW1iZXIsIHR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmEgPSBhO1xuICAgIHRoaXMuYiA9IGI7XG4gICAgdGhpcy5jID0gYztcbiAgICB0aGlzLmQgPSBkO1xuICAgIHRoaXMudHggPSB0eDtcbiAgICB0aGlzLnR5ID0gdHk7XG4gIH1cblxuICBwdWJsaWMgc2V0VG9NYXRyaXgobWF0cml4OiBNYXRyaXgpOiB2b2lkIHtcbiAgICB0aGlzLmEgPSBtYXRyaXguYTtcbiAgICB0aGlzLmIgPSBtYXRyaXguYjtcbiAgICB0aGlzLmMgPSBtYXRyaXguYztcbiAgICB0aGlzLmQgPSBtYXRyaXguZDtcbiAgICB0aGlzLnR4ID0gbWF0cml4LnR4O1xuICAgIHRoaXMudHkgPSBtYXRyaXgudHk7XG4gIH1cblxuICBwdWJsaWMgYWRkKG1hdHJpeDogTWF0cml4KTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuc2V0VG8odGhpcy5hICsgbWF0cml4LmEsIHRoaXMuYiArIG1hdHJpeC5iLCB0aGlzLmMgKyBtYXRyaXguYywgdGhpcy5kICsgbWF0cml4LmQsIHRoaXMudHggKyBtYXRyaXgudHgsIHRoaXMudHkgKyBtYXRyaXgudHkpO1xuICB9XG5cbiAgcHVibGljIHN1YihtYXRyaXg6IE1hdHJpeCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLnNldFRvKHRoaXMuYSAtIG1hdHJpeC5hLCB0aGlzLmIgLSBtYXRyaXguYiwgdGhpcy5jIC0gbWF0cml4LmMsIHRoaXMuZCAtIG1hdHJpeC5kLCB0aGlzLnR4IC0gbWF0cml4LnR4LCB0aGlzLnR5IC0gbWF0cml4LnR5KTtcbiAgfVxuXG4gIHB1YmxpYyBtdWx0aShtYXRyaXg6IE1hdHJpeCk6IHZvaWQge1xuICAgIGxldCBhOiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIsIHR4OiBudW1iZXIsIHR5OiBudW1iZXI7XG5cbiAgICBpZiAodHlwZW9mIG1hdHJpeCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGEgPSB0aGlzLmEgKiBtYXRyaXg7XG4gICAgICBiID0gdGhpcy5iICogbWF0cml4O1xuICAgICAgYyA9IHRoaXMuYyAqIG1hdHJpeDtcbiAgICAgIGQgPSB0aGlzLmQgKiBtYXRyaXg7XG4gICAgICB0eCA9IHRoaXMudHggKiBtYXRyaXg7XG4gICAgICB0eSA9IHRoaXMudHkgKiBtYXRyaXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSAodGhpcy5hICogbWF0cml4LmEpICsgKHRoaXMuYyAqIG1hdHJpeC5iKTtcbiAgICAgIGIgPSAodGhpcy5iICogbWF0cml4LmEpICsgKHRoaXMuZCAqIG1hdHJpeC5iKTtcbiAgICAgIGMgPSAodGhpcy5hICogbWF0cml4LmMpICsgKHRoaXMuYyAqIG1hdHJpeC5kKTtcbiAgICAgIGQgPSAodGhpcy5iICogbWF0cml4LmMpICsgKHRoaXMuZCAqIG1hdHJpeC5kKTtcbiAgICAgIHR4ID0gKHRoaXMuYSAqIG1hdHJpeC50eCkgKyAodGhpcy5jICogbWF0cml4LnR5KSArIHRoaXMudHg7XG4gICAgICB0eSA9ICh0aGlzLmIgKiBtYXRyaXgudHgpICsgKHRoaXMuZCAqIG1hdHJpeC50eSkgKyB0aGlzLnR5O1xuICAgIH1cbiAgICB0aGlzLnNldFRvKGEsIGIsIGMsIGQsIHR4LCB0eSk7XG4gIH1cblxuICBwdWJsaWMgaW52ZXJzZSgpOiBNYXRyaXgge1xuICAgIGNvbnN0IHsgYSwgYiwgYywgZCwgdHgsIHR5IH0gPSB0aGlzO1xuICAgIGNvbnN0IG4gPSBhICogZCAtIGIgKiBjO1xuICAgIHJldHVybiBuZXcgTWF0cml4KGQgLyBuLCAtYiAvIG4sIC1jIC8gbiwgYSAvIG4sIChjICogdGhpcy50eSAtIGQgKiB0eCkgLyBuLCAoYiAqIHR4IC0gYSAqIHRoaXMudHkpIC8gbik7XG4gIH1cblxuICBwdWJsaWMgY2xvbmUoKTogTWF0cml4IHtcbiAgICByZXR1cm4gbmV3IE1hdHJpeCh0aGlzLmEsIHRoaXMuYiwgdGhpcy5jLCB0aGlzLmQsIHRoaXMudHgsIHRoaXMudHkpO1xuICB9XG5cbiAgcHVibGljIHNjYWxlKHg6IG51bWJlciA9IDEsIHk6IG51bWJlciA9IDEpOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpKG5ldyBNYXRyaXgoeCwgMCwgMCwgeSwgMCwgMCkpO1xuICB9XG5cbiAgcHVibGljIHRyYW5zbGF0ZSh4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5tdWx0aShuZXcgTWF0cml4KDEsIDAsIDAsIDEsIHgsIHkpKTtcbiAgfVxuXG4gIHB1YmxpYyByb3RhdGUoYW5nbGU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubXVsdGkobmV3IE1hdHJpeChNYXRoLmNvcyhhbmdsZSksIE1hdGguc2luKGFuZ2xlKSwgLU1hdGguc2luKGFuZ2xlKSwgTWF0aC5jb3MoYW5nbGUpKSk7XG4gIH1cblxuICBwdWJsaWMgc2tldyh4ID0gMCwgeSA9IDApOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpKG5ldyBNYXRyaXgoMSwgTWF0aC50YW4oeSksIE1hdGgudGFuKHgpLCAxLCAwLCAwKSk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRUbygxLCAwLCAwLCAxLCAwLCAwKTtcbiAgfVxuXG4gIHB1YmxpYyBlcXVhbHMobWF0cml4OiBNYXRyaXgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hID09PSBtYXRyaXguYSAmJiB0aGlzLmIgPT09IG1hdHJpeC5iICYmIHRoaXMuYyA9PT0gbWF0cml4LmMgJiYgdGhpcy5kID09PSBtYXRyaXguZCAmJiB0aGlzLnR4ID09PSBtYXRyaXgudHggJiYgdGhpcy50eSA9PT0gbWF0cml4LnR5O1xuICB9XG59XG4iLCJpbXBvcnQgTWF0cml4IGZyb20gJy4vbWF0cml4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9pbnQge1xuICBwdWJsaWMgeDogbnVtYmVyID0gMDtcbiAgcHVibGljIHk6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIHB1YmxpYyBkaXN0YW5jZShwb2ludDogUG9pbnQpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3cocG9pbnQueCAtIHRoaXMueCwgMikgKyBNYXRoLnBvdyhwb2ludC55IC0gdGhpcy55LCAyKSk7XG4gIH1cblxuICBwdWJsaWMgcm90YXRlKHJhZGlhbjogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IG1hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeChNYXRoLmNvcyhyYWRpYW4pLCBNYXRoLnNpbihyYWRpYW4pLCAtTWF0aC5zaW4ocmFkaWFuKSwgTWF0aC5jb3MocmFkaWFuKSk7XG4gICAgY29uc3QgcHg6IG51bWJlciA9IChtYXRyaXguYSAqIHRoaXMueCkgKyAobWF0cml4LmMgKiB0aGlzLnkpO1xuICAgIGNvbnN0IHB5OiBudW1iZXIgPSAobWF0cml4LmIgKiB0aGlzLngpICsgKG1hdHJpeC5kICogdGhpcy55KTtcbiAgICByZXR1cm4gbmV3IFBvaW50KHB4LCBweSk7XG4gIH1cblxuICBwdWJsaWMgc2NhbGUoc2NhbGVYOiBudW1iZXIsIHNjYWxlWTogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IG1hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeChzY2FsZVgsIDAsIDAsIHNjYWxlWSk7XG4gICAgY29uc3QgcHg6IG51bWJlciA9IChtYXRyaXguYSAqIHRoaXMueCkgKyAobWF0cml4LmMgKiB0aGlzLnkpO1xuICAgIGNvbnN0IHB5OiBudW1iZXIgPSAobWF0cml4LmIgKiB0aGlzLngpICsgKG1hdHJpeC5kICogdGhpcy55KTtcbiAgICByZXR1cm4gbmV3IFBvaW50KHB4LCBweSk7XG4gIH1cblxuICBwdWJsaWMgdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUG9pbnQge1xuICAgIGNvbnN0IG1hdHJpeDogTWF0cml4ID0gbmV3IE1hdHJpeCgxLCAwLCAwLCAxLCB4LCB5KTtcbiAgICBjb25zdCBweDogbnVtYmVyID0gKG1hdHJpeC5hICogdGhpcy54KSArIChtYXRyaXguYyAqIHRoaXMueSkgKyBtYXRyaXgudHg7XG4gICAgY29uc3QgcHk6IG51bWJlciA9IChtYXRyaXguYiAqIHRoaXMueCkgKyAobWF0cml4LmQgKiB0aGlzLnkpICsgbWF0cml4LnR5O1xuICAgIHJldHVybiBuZXcgUG9pbnQocHgsIHB5KTtcbiAgfVxuXG4gIHB1YmxpYyBza2V3KHNrZXdYOiBudW1iZXIsIHNrZXdZOiBudW1iZXIpOiBQb2ludCB7XG4gICAgY29uc3QgbWF0cml4OiBNYXRyaXggPSBuZXcgTWF0cml4KDEsIE1hdGgudGFuKHNrZXdYKSwgTWF0aC50YW4oc2tld1kpLCAxKTtcbiAgICBjb25zdCBweDogbnVtYmVyID0gKG1hdHJpeC5hICogdGhpcy54KSArIChtYXRyaXguYyAqIHRoaXMueSk7XG4gICAgY29uc3QgcHk6IG51bWJlciA9IChtYXRyaXguYiAqIHRoaXMueCkgKyAobWF0cml4LmQgKiB0aGlzLnkpO1xuICAgIHJldHVybiBuZXcgUG9pbnQocHgsIHB5KTtcbiAgfVxufVxuIiwiaW1wb3J0IFBvaW50IGZyb20gJy4vcG9pbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGUge1xuXG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2xlZnRUb3A6IFBvaW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfcmlnaHRUb3A6IFBvaW50ID0gbnVsbDtcbiAgcHJpdmF0ZSBfbGVmdEJvdHRvbTogUG9pbnQgPSBudWxsO1xuICBwcml2YXRlIF9yaWdodEJvdHRvbTogUG9pbnQgPSBudWxsO1xuXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdFRvcC54OyB9XG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdFRvcC55OyB9XG4gIHB1YmxpYyBnZXQgd2lkdGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9XG4gIHB1YmxpYyBnZXQgaGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9oZWlnaHQ7IH1cbiAgcHVibGljIGdldCBsZWZ0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZWZ0VG9wLng7IH1cbiAgcHVibGljIGdldCByaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcmlnaHRUb3AueDsgfVxuICBwdWJsaWMgZ2V0IHRvcCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGVmdFRvcC55OyB9XG4gIHB1YmxpYyBnZXQgYm90dG9tKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sZWZ0Qm90dG9tLnk7IH1cbiAgcHVibGljIGdldCBsZWZ0VG9wKCk6IFBvaW50IHsgcmV0dXJuIHRoaXMuX2xlZnRUb3A7IH1cbiAgcHVibGljIGdldCByaWdodFRvcCgpOiBQb2ludCB7IHJldHVybiB0aGlzLl9yaWdodFRvcDsgfVxuICBwdWJsaWMgZ2V0IGxlZnRCb3R0b20oKTogUG9pbnQgeyByZXR1cm4gdGhpcy5fbGVmdEJvdHRvbTsgfVxuICBwdWJsaWMgZ2V0IHJpZ2h0Qm90dG9tKCk6IFBvaW50IHsgcmV0dXJuIHRoaXMuX3JpZ2h0Qm90dG9tOyB9XG5cbiAgcHVibGljIHNldCB4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9sZWZ0VG9wLnggPSB2YWx1ZTtcbiAgICB0aGlzLl9sZWZ0Qm90dG9tLnggPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVSaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCB5KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9sZWZ0VG9wLnkgPSB2YWx1ZTtcbiAgICB0aGlzLl9sZWZ0Qm90dG9tLnkgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVCb3R0b20oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlUmlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVCb3R0b20oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGVmdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sZWZ0VG9wLnggPSB2YWx1ZTtcbiAgICB0aGlzLmxlZnRCb3R0b20ueCA9IHZhbHVlO1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHJpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnJpZ2h0VG9wLnggPSB2YWx1ZTtcbiAgICB0aGlzLnJpZ2h0Qm90dG9tLnggPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICB9XG5cbiAgcHVibGljIHNldCB0b3AodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMubGVmdFRvcC55ID0gdmFsdWU7XG4gICAgdGhpcy5yaWdodFRvcC55ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0IGJvdHRvbSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sZWZ0Qm90dG9tLnkgPSB2YWx1ZTtcbiAgICB0aGlzLnJpZ2h0Qm90dG9tLnkgPSB2YWx1ZTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGVmdFRvcChwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLl9sZWZ0VG9wID0gcG9pbnQ7XG4gICAgdGhpcy5fdXBkYXRlV2lkdGgoKTtcbiAgICB0aGlzLl91cGRhdGVIZWlnaHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcmlnaHRUb3AocG9pbnQ6IFBvaW50KSB7XG4gICAgdGhpcy5fcmlnaHRUb3AgPSBwb2ludDtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCBsZWZ0Qm90dG9tKHBvaW50OiBQb2ludCkge1xuICAgIHRoaXMuX2xlZnRCb3R0b20gPSBwb2ludDtcbiAgICB0aGlzLl91cGRhdGVXaWR0aCgpO1xuICAgIHRoaXMuX3VwZGF0ZUhlaWdodCgpO1xuICB9XG5cbiAgcHVibGljIHNldCByaWdodEJvdHRvbShwb2ludDogUG9pbnQpIHtcbiAgICB0aGlzLl9yaWdodEJvdHRvbSA9IHBvaW50O1xuICAgIHRoaXMuX3VwZGF0ZVdpZHRoKCk7XG4gICAgdGhpcy5fdXBkYXRlSGVpZ2h0KCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCB3aWR0aDogbnVtYmVyID0gMCwgaGVpZ2h0OiBudW1iZXIgPSAwKSB7XG4gICAgdGhpcy5fbGVmdFRvcCA9IG5ldyBQb2ludCgpO1xuICAgIHRoaXMuX3JpZ2h0VG9wID0gbmV3IFBvaW50KCk7XG4gICAgdGhpcy5fbGVmdEJvdHRvbSA9IG5ldyBQb2ludCgpO1xuICAgIHRoaXMuX3JpZ2h0Qm90dG9tID0gbmV3IFBvaW50KCk7XG4gICAgdGhpcy5zZXRUbyh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIHB1YmxpYyBjb250YWlucyh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB4ID49IHRoaXMubGVmdCAmJiB4IDw9IHRoaXMucmlnaHQgJiYgeSA8PSB0aGlzLmJvdHRvbSAmJiB5ID49IHRoaXMudG9wO1xuICB9XG5cbiAgcHVibGljIGNvbnRhaW5zUmVjdChyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiByZWN0YW5nbGUubGVmdCA+PSB0aGlzLmxlZnQgJiYgcmVjdGFuZ2xlLnJpZ2h0IDw9IHRoaXMucmlnaHQgJiYgcmVjdGFuZ2xlLnRvcCA+PSB0aGlzLnRvcCAmJiByZWN0YW5nbGUuYm90dG9tIDw9IHRoaXMuYm90dG9tO1xuICB9XG5cbiAgcHVibGljIGludGVyc2VjdHMocmVjdGFuZ2xlOiBSZWN0YW5nbGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWlucyhyZWN0YW5nbGUubGVmdCArIDEsIHJlY3RhbmdsZS50b3AgKyAxKSB8fCB0aGlzLmNvbnRhaW5zKHJlY3RhbmdsZS5sZWZ0ICsgMSwgcmVjdGFuZ2xlLmJvdHRvbSAtIDEpIHx8IHRoaXMuY29udGFpbnMocmVjdGFuZ2xlLnJpZ2h0IC0gMSwgcmVjdGFuZ2xlLnRvcCArIDEpIHx8IHRoaXMuY29udGFpbnMocmVjdGFuZ2xlLnJpZ2h0IC0gMSwgcmVjdGFuZ2xlLmJvdHRvbSAtIDEpO1xuICB9XG5cbiAgcHVibGljIGludGVyc2VjdGlvbihyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZSB7XG4gICAgbGV0IHJlc3VsdDogUmVjdGFuZ2xlID0gbnVsbDtcbiAgICBpZiAodGhpcy5pbnRlcnNlY3RzKHJlY3RhbmdsZSkpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBSZWN0YW5nbGUoKTtcbiAgICAgIHJlc3VsdC5sZWZ0ID0gTWF0aC5tYXgocmVjdGFuZ2xlLmxlZnQsIHRoaXMubGVmdCk7XG4gICAgICByZXN1bHQucmlnaHQgPSBNYXRoLm1pbihyZWN0YW5nbGUucmlnaHQsIHRoaXMucmlnaHQpO1xuICAgICAgcmVzdWx0LnRvcCA9IE1hdGgubWF4KHJlY3RhbmdsZS50b3AsIHRoaXMudG9wKTtcbiAgICAgIHJlc3VsdC5ib3R0b20gPSBNYXRoLm1pbihyZWN0YW5nbGUuYm90dG9tLCB0aGlzLmJvdHRvbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZXh0ZW5kcyhyZWN0YW5nbGU6IFJlY3RhbmdsZSk6IHZvaWQge1xuICAgIGNvbnN0IGxlZnQ6IG51bWJlciA9IE1hdGgubWluKHRoaXMubGVmdCwgcmVjdGFuZ2xlLmxlZnQpO1xuICAgIGNvbnN0IHJpZ2h0OiBudW1iZXIgPSBNYXRoLm1heCh0aGlzLnJpZ2h0LCByZWN0YW5nbGUucmlnaHQpO1xuICAgIGNvbnN0IHRvcDogbnVtYmVyID0gTWF0aC5taW4odGhpcy50b3AsIHJlY3RhbmdsZS50b3ApO1xuICAgIGNvbnN0IGJvdHRvbTogbnVtYmVyID0gTWF0aC5tYXgodGhpcy5ib3R0b20sIHJlY3RhbmdsZS5ib3R0b20pO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICB9XG5cbiAgcHVibGljIHNldFRvKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIH1cblxuICBwdWJsaWMgY2xvbmUoKTogUmVjdGFuZ2xlIHtcbiAgICByZXR1cm4gbmV3IFJlY3RhbmdsZSh0aGlzLmxlZnQsIHRoaXMudG9wLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRUbygwLCAwLCAwLCAwKTtcbiAgfVxuXG4gIHB1YmxpYyBlcXVhbHMocmVjdGFuZ2xlOiBSZWN0YW5nbGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0ID09PSByZWN0YW5nbGUubGVmdCAmJiB0aGlzLnRvcCA9PT0gcmVjdGFuZ2xlLnRvcCAmJiB0aGlzLnJpZ2h0ID09PSByZWN0YW5nbGUucmlnaHQgJiYgdGhpcy5ib3R0b20gPT09IHJlY3RhbmdsZS5ib3R0b20gJiYgdGhpcy53aWR0aCA9PT0gcmVjdGFuZ2xlLndpZHRoICYmIHRoaXMuaGVpZ2h0ID09PSByZWN0YW5nbGUuaGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlV2lkdGgoKTogdm9pZCB7XG4gICAgdGhpcy5fd2lkdGggPSB0aGlzLl9yaWdodFRvcC54IC0gdGhpcy5fbGVmdFRvcC54O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlSGVpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuX2xlZnRCb3R0b20ueSAtIHRoaXMuX2xlZnRUb3AueTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVJpZ2h0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JpZ2h0Qm90dG9tLnggPSB0aGlzLl9yaWdodFRvcC54ID0gdGhpcy5fbGVmdFRvcC54ICsgdGhpcy5fd2lkdGg7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVCb3R0b20oKTogdm9pZCB7XG4gICAgdGhpcy5fbGVmdEJvdHRvbS55ID0gdGhpcy5fcmlnaHRCb3R0b20ueSA9IHRoaXMuX2xlZnRUb3AueSArIHRoaXMuX2hlaWdodDtcbiAgfVxufVxuIiwiXG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9kaXNwbGF5L3N0YWdlJztcbmltcG9ydCBEaXNwbGF5IGZyb20gJy4vZGlzcGxheS9kaXNwbGF5JztcbmltcG9ydCBEaXNwbGF5Q29udGFpbmVyIGZyb20gJy4vZGlzcGxheS9kaXNwbGF5LWNvbnRhaW5lcic7XG5pbXBvcnQgR3JhcGhpY3MgZnJvbSAnLi9kaXNwbGF5L2dyYXBoaWNzJztcbmltcG9ydCBTaGFwZSBmcm9tICcuL2Rpc3BsYXkvc2hhcGUnO1xuaW1wb3J0IFNwcml0ZSBmcm9tICcuL2Rpc3BsYXkvc3ByaXRlJztcbmltcG9ydCBTcHJpdGVTaGVldCBmcm9tICcuL2Rpc3BsYXkvc3ByaXRlLXNoZWV0JztcbmltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSAnLi9ldmVudC9ldmVudC1kaXNwYXRjaGVyJztcbmltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50L2V2ZW50JztcbmltcG9ydCBNb3VzZUV2ZW50IGZyb20gJy4vZXZlbnQvbW91c2UtZXZlbnQnO1xuaW1wb3J0IE1hdHJpeCBmcm9tICcuL2dlb20vbWF0cml4JztcbmltcG9ydCBQb2ludCBmcm9tICcuL2dlb20vcG9pbnQnO1xuaW1wb3J0IFJlY3RhbmdsZSBmcm9tICcuL2dlb20vcmVjdGFuZ2xlJztcbmltcG9ydCBUaWNrZXIgZnJvbSAnLi91dGlsL3RpY2tlcic7XG5cbmNvbnN0IHN0ZyA9IHtcbiAgU3RhZ2UsXG4gIERpc3BsYXksXG4gIERpc3BsYXlDb250YWluZXIsXG4gIEdyYXBoaWNzLFxuICBTaGFwZSxcbiAgU3ByaXRlLFxuICBTcHJpdGVTaGVldCxcbiAgRXZlbnREaXNwYXRjaGVyLFxuICBFdmVudCxcbiAgTW91c2VFdmVudCxcbiAgTWF0cml4LFxuICBQb2ludCxcbiAgUmVjdGFuZ2xlLFxuICBUaWNrZXIsXG59O1xuXG4od2luZG93IGFzIGFueSkuc3RnID0gc3RnO1xuXG5leHBvcnQgZGVmYXVsdCBzdGc7XG4iLCJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9ldmVudC9ldmVudC1kaXNwYXRjaGVyXCI7XG5cbmVudW0gVGlja2VyU3RhdGUge1xuICBSRUFEWSA9ICdyZWFkeScsXG4gIFJVTk5JTkcgPSAncnVubmluZydcbn1cblxuZW51bSBUaWNrZXJFdmVudCB7XG4gIFRJQ0sgPSAndGljaydcbn1cblxuY29uc3QgX29uZVNlYzogbnVtYmVyID0gMTAwMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlja2VyIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcblxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRJQ0s6IFRpY2tlckV2ZW50ID0gVGlja2VyRXZlbnQuVElDS1xuXG4gIHByaXZhdGUgX2ZwczogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfc3RhdGU6IFRpY2tlclN0YXRlID0gVGlja2VyU3RhdGUuUkVBRFk7XG4gIHByaXZhdGUgX3ByZXZUaW1lOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9pbnRlcm5hbFRpbWU6IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGdldCBmcHMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2ZwczsgfVxuXG4gIHB1YmxpYyBzZXQgZnBzKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9mcHMgPSBNYXRoLm1heCh2YWx1ZSwgMSk7XG4gICAgLy9UT0RPOiDroZzsp4Eg7ZmV7J24XG4gICAgaWYgKHZhbHVlID4gMCAmJiB2YWx1ZSA8IDEpIHtcbiAgICAgIHRoaXMuX2ludGVybmFsVGltZSA9IChfb25lU2VjICogdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pbnRlcm5hbFRpbWUgPSAoX29uZVNlYyAvIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihmcHMgPSA0MCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5mcHMgPSBmcHM7XG4gICAgdGhpcy5fc3RhdGUgPSBUaWNrZXJTdGF0ZS5SRUFEWTtcbiAgfVxuXG4gIHB1YmxpYyBydW4oKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGUgPSBUaWNrZXJTdGF0ZS5SVU5OSU5HO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gK25ldyBEYXRlKCk7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9ydW4oKSk7XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdGF0ZSA9IFRpY2tlclN0YXRlLlJFQURZO1xuICB9XG5cbiAgcHJpdmF0ZSBfcnVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gVGlja2VyU3RhdGUuUkVBRFkpIHsgcmV0dXJuOyB9XG4gICAgY29uc3Qgbm93ID0gK25ldyBEYXRlKCk7XG4gICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl9wcmV2VGltZTtcbiAgICBpZiAoZGVsdGEgPj0gdGhpcy5faW50ZXJuYWxUaW1lKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoVGlja2VyLlRJQ0ssIHsgZGVsdGE6IGRlbHRhIH0pO1xuICAgICAgdGhpcy5fcHJldlRpbWUgPSArbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IFRpY2tlclN0YXRlLlJVTk5JTkcpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fcnVuKCkpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==