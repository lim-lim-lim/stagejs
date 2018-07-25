import EventDispatcher from "../event/event-dispatcher";
import DisplayContainer from "./display-container";
import Rectangle from "../geom/rectangle";
import Matrix from "../geom/matrix";
import Stage from "./stage";

//TODO: 파괴자 구현
export default abstract class Display extends EventDispatcher {

  protected _stage: Stage = null;
  protected _parent: DisplayContainer = null;
  protected _bounds: Rectangle = new Rectangle();
  protected _computedBounds: Rectangle = new Rectangle();
  protected _matrix: Matrix = new Matrix();
  protected _colorKey: string = null;
  protected _centerX: number = 0;
  protected _centerY: number = 0;
  protected _rotate: number = 0;
  protected _width: number = 0;
  protected _height: number = 0;
  protected _scaleX: number = 1;
  protected _scaleY: number = 1;
  protected _skewX: number = 0;
  protected _skewY: number = 0;
  protected _visible: boolean = true;

  public get stage(): Stage { return this._stage; }
  public get parent(): DisplayContainer { return this._parent; }
  public get colorKey(): string { return this._colorKey; }
  public get x(): number { return this._bounds.left; }
  public get y(): number { return this._bounds.top; }
  public get centerX(): number { return this._centerX; }
  public get centerY(): number { return this._centerY; }
  public get width(): number { return this._bounds.width; }
  public get height(): number { return this._bounds.height; }
  public get rotate(): number { return this._rotate; }
  public get scaleX(): number { return this._scaleX; }
  public get scaleY(): number { return this._scaleY; }
  public get skewX(): number { return this._skewX; }
  public get skewY(): number { return this._skewY; }
  public get visible(): boolean { return this._visible; }
  public get bounds(): Rectangle { return this._bounds; }
  public get matrix(): Matrix { return this._matrix; }

  public get computedBounds() {
    const bounds = this.bounds;
    const points = [bounds.leftTop, bounds.rightTop, bounds.leftBottom, bounds.rightBottom];

    for (let item of points) {
      item.rotate(this._rotate);
      item.skew(this._skewX, this._skewY);
    }

    this._computedBounds.left = Math.min(bounds.leftTop.x, bounds.rightTop.x, bounds.leftBottom.x, bounds.rightBottom.x);
    this._computedBounds.right = Math.max(bounds.leftTop.x, bounds.rightTop.x, bounds.leftBottom.x, bounds.rightBottom.x);
    this._computedBounds.top = Math.min(bounds.leftTop.y, bounds.rightTop.y, bounds.leftBottom.y, bounds.rightBottom.y);
    this._computedBounds.bottom = Math.max(bounds.leftTop.y, bounds.rightTop.y, bounds.leftBottom.y, bounds.rightBottom.y);
    return this._computedBounds;
  }

  public set colorKey(value: string) { this._colorKey = value; }

  public set stage(stage: Stage) {
    this._stage = stage;
    if (this._stage) {
      this._stage.changed = true;
    }
  }

  public set parent(parent: DisplayContainer) { this._parent = parent; }

  public set x(value: number) {
    if (this._bounds.left === value) { return; }
    this._bounds.left = value;
    this._changedDisplay();
  }

  public set y(value: number) {
    if (this._bounds.top === value) { return; }
    this._bounds.top = value;
    this._changedDisplay();
  }

  public set centerX(value: number) {
    this._centerX = value;
  }

  public set centerY(value: number) {
    this._centerY = value;
  }

  public set width(value: number) {
    if (this._width === value) { return; }
    this._width = value;
    this._bounds.width = value * this._scaleX;
    this._changedDisplay();
  }

  public set height(value: number) {
    if (this.height === value) { return; }
    this._height = value;
    this._bounds.height = value * this._scaleY;
    this._changedDisplay();
  }

  public set rotate(value: number) {
    if (this._rotate == value) { return; }
    this._rotate = value;
    this._changedDisplay();
  }

  public set scaleX(value: number) {
    if (this._scaleX === value) { return; }
    this._scaleX = value;
    this._bounds.width = this._width * value;
    this._changedDisplay();
  }

  public set scaleY(value: number) {
    if (this._scaleY === value) { return; }
    this._scaleY = value;
    this._bounds.height = this._height * value;
    this._changedDisplay();
  }

  public set skewX(value: number) {
    if (this._skewX === value) { return; }
    this._skewX = value;
    this._changedDisplay();
  }

  public set skewY(value: number) {
    if (this._skewY === value) { return; }
    this._skewY = value;
    this._changedDisplay();
  }

  public set visible(value) {
    if (this._visible === value) { return; }
    this._visible = value;
    this._changedDisplay();
  }

  constructor() {
    super();
    this.on(Stage.ADD_TO_STAGE, () => this.stage.registerEventMap(this));
    this.on(Stage.REMOVE_TO_STAGE, () => this.stage.unregisterEventMap(this));
  }

  public abstract updateDisplay(context?: CanvasRenderingContext2D): void

  public updateTransformation(): void {
    this._matrix.reset();
    const offsetX = this.x + (this._centerX * this._scaleX);
    const offsetY = this.y + (this._centerY * this._scaleY);
    this._transformTranslate(offsetX, offsetY);
    this._transformRotate(this._rotate);
    this._transformTranslate(-offsetX, -offsetY);
    this._transformTranslate(this.x, this.y);
    this._transformScale(this._scaleX, this._scaleY);
    this._transformSkew(this._skewX, this._skewY);
    this.stage.context.transform(this._matrix.a, this._matrix.b, this._matrix.c, this._matrix.d, this._matrix.tx, this._matrix.ty);
    this.stage.tempContext.transform(this._matrix.a, this._matrix.b, this._matrix.c, this._matrix.d, this._matrix.tx, this._matrix.ty);
  }

  update() {
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
  }

  private _transformTranslate(x: number = 0, y: number = 0): void {
    this._matrix.translate(x, y);
  }

  private _transformRotate(value: number): void {
    this._matrix.rotate(value);
  }

  private _transformScale(x: number = 1, y: number = 1): void {
    this._matrix.scale(x, y);
  }

  private _transformSkew(x: number = 0, y: number = 0): void {
    this._matrix.skew(x, y);
  }

  private _changedDisplay(): void {
    if (!this.stage) { return; }
    if (!this.stage.changed) {
      this.stage.changed = true;
    }
  }
}