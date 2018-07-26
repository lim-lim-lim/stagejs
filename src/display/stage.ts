import DisplayContainer from './display-container';
import Rectangle from '../geom/rectangle';
import Ticker from '../util/ticker';
import Display from './display';
import MouseEvent from '../event/mouse-event';

enum StageEventType {
  ADD_TO_STAGE = 'addToStage',
  REMOVE_TO_STAGE = 'removeToStage',
  ENTER_FRAME = 'enterFrame',
}

interface EventTargetMap {
  [prop: string]: Display[];
}

export default class Stage extends DisplayContainer {

  public static readonly ADD_TO_STAGE: StageEventType = StageEventType.ADD_TO_STAGE;
  public static readonly REMOVE_TO_STAGE: StageEventType = StageEventType.REMOVE_TO_STAGE;
  public static readonly ENTER_FRAME: StageEventType = StageEventType.ENTER_FRAME;

  public changed: boolean = false;
  private _canvas: HTMLCanvasElement = null;
  private _eventCanvas: HTMLCanvasElement = null;
  private _tempCanvas: HTMLCanvasElement = null;
  private _context: CanvasRenderingContext2D = null;
  private _eventContext: CanvasRenderingContext2D = null;
  private _tempContext: CanvasRenderingContext2D = null;
  private _returnedColorKey: string[] = [];
  private _ticker: Ticker = null;
  private _eventTargetMap: EventTargetMap = {};
  private _startColor = 0;

  constructor(canvasId: string, fps: number) {
    super();
    this._canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this._context = this._canvas.getContext('2d');
    this._stage = this;
    this._bounds = new Rectangle(0, 0, this._canvas.width, this._canvas.height);
    this._initFPS(fps);
    this._initEventCanvas();
    this._initEvent();
  }

  public get canvas(): HTMLCanvasElement { return this._canvas; }
  public get eventCanvas(): HTMLCanvasElement { return this._eventCanvas; }
  public get tempCanvas(): HTMLCanvasElement { return this._tempCanvas; }
  public get context(): CanvasRenderingContext2D { return this._context; }
  public get eventContext(): CanvasRenderingContext2D { return this._eventContext; }
  public get tempContext(): CanvasRenderingContext2D { return this._tempContext; }

  public createColorKey(): string {
    if (this._returnedColorKey.length) {
      return this._returnedColorKey.shift();
    }
    let value = Number(this._startColor += 10).toString(16);
    value = '0'.repeat(6 - value.length) + value;
    return value;
  }

  public returnColorKey(value: string): void {
    this._returnedColorKey.push(value);
  }

  public update(): void {
    if (this.changed) {
      this._canvas.width = this._canvas.width;
      this._eventCanvas.width = this._eventCanvas.width;
      this._tempCanvas.width = this._tempCanvas.width;
      super.update();
      this.changed = false;
    }
  }

  public registerEventMap(display: Display): void {
    const childEventMap = display.eventMap;
    for (const type in childEventMap) {
      if (!this._eventTargetMap[type]) {
        this._eventTargetMap[type] = [];
      }
      this._eventTargetMap[type].push(display);
    }
  }

  public unregisterEventMap(display: Display) {
    const childEventMap = display.eventMap;
    for (const type in childEventMap) {
      const index = this._eventTargetMap[type].indexOf(display);
      this._eventTargetMap[type].splice(index, 1);
    }
  }

  private _initFPS(fps: number) {
    if (fps) {
      this._ticker = new Ticker(fps);
      this._ticker.on(Ticker.TICK, (delta) => {
        this.trigger(Stage.ENTER_FRAME, delta);
        this.update();
      });
      this._ticker.run();
    }
  }

  private _initEventCanvas() {
    this._eventCanvas = document.createElement('canvas');
    this._eventCanvas.width = this._canvas.width;
    this._eventCanvas.height = this._canvas.height;
    this._eventContext = this._eventCanvas.getContext('2d');
    // document.body.appendChild( this._eventCanvas );
    this._tempCanvas = document.createElement('canvas');
    this._tempCanvas.width = this._canvas.width;
    this._tempCanvas.height = this._canvas.height; this._tempContext = this._tempCanvas.getContext('2d');
  }

  private _initEvent() {
    const rect = this._canvas.getBoundingClientRect();
    this._canvas.addEventListener('click', (event) => {
      event.preventDefault();
      if (!this._eventTargetMap[MouseEvent.CLICK] || !this._eventTargetMap[MouseEvent.CLICK].length) { return; }
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const color = this._eventContext.getImageData(x, y, 1, 1);
      const r = color.data[0].toString(16);
      const g = color.data[1].toString(16);
      const b = color.data[2].toString(16);
      const colorKey = '0'.repeat(2 - r.length) + r + '0'.repeat(2 - g.length) + g + '0'.repeat(2 - b.length) + b;
      for (let i = this._eventTargetMap[MouseEvent.CLICK].length - 1, count = 0; i >= count; i -= 1) {
        const item = this._eventTargetMap[MouseEvent.CLICK][i];
        if (colorKey === item.colorKey) {
          // TODO:target / currentTarget 구분
          item.trigger(MouseEvent.CLICK, new MouseEvent(MouseEvent.CLICK, {}, item, item));
          break;
        }
      }
    });
  }
}
