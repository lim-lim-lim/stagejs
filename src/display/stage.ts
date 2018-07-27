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
  private _context: CanvasRenderingContext2D = null;
  private _eventContext: CanvasRenderingContext2D = null;
  private _ticker: Ticker = null;
  private _eventTargetMap: EventTargetMap = {};

  constructor(canvas: HTMLCanvasElement | string, fps: number, renderOnly: boolean = true) {
    super();
    if (canvas instanceof HTMLCanvasElement) {
      this._canvas = canvas;
    } else {
      this._canvas = document.getElementById(canvas) as HTMLCanvasElement;
    }

    this._context = this._canvas.getContext('2d');
    this._stage = this;
    this._bounds = new Rectangle(0, 0, this._canvas.width, this._canvas.height);
    this._initFPS(fps);

    if (!renderOnly) {
      this._initEventCanvas();
      this._initEvent();
      this._initStageRegion();
    }
  }

  public get canvas(): HTMLCanvasElement { return this._canvas; }
  public get eventCanvas(): HTMLCanvasElement { return this._eventCanvas; }
  public get context(): CanvasRenderingContext2D { return this._context; }
  public get eventContext(): CanvasRenderingContext2D { return this._eventContext; }

  public update(): void {
    if (this.changed) {
      this._canvas.width = this._canvas.width;
      // this._eventCanvas.width = this._eventCanvas.width;
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
  }

  private _initEvent() {
    const rect = this._canvas.getBoundingClientRect();
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
  }

  private _initStageRegion(): void {
    //
  }
}

export class StageRegion {

  private _width: number = 0;
  private _height: number = 0;
  private _row: number = 0;
  private _col: number = 0;
  private _map: any = {};
  private _displayList: Display[] = [];

  constructor(width: number, height: number, col: number, row: number) {
    this._width = width;
    this._height = height;
    this._col = col;
    this._row = row;
  }

  public add(display: Display): void {
    // ..
  }
}
