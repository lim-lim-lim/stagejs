import Rectangle from '../geom/rectangle';

export enum LineCap {
  BUTT = 'butt',
  ROUND = 'round',
  SQUARE = 'square',
}

export enum LineJoin {
  ROUNT = 'round',
  BEVEL = 'bevel',
  MITER = 'miter',
}

enum DrawCommandName {
  RECT = 'rect',
  FILL_RECT = 'fillRect',
  STROKE_RECT = 'strokeRect',
  CLEAR_RECT = 'clearRect',
  BEGIN_PATH = 'beginPath',
  CLOSE_PATH = 'closePath',
  MOVE_TO = 'moveTo',
  LINE_TO = 'lineTo',
  ARC = 'arc',
  ARC_TO = 'arcTo',
  QUADRATIC_CURVE_TO = 'quadraticCurveTo',
  BEZIER_CURVE_TO = 'bezierCurveTo',
  FILL = 'fill',
  STROKE = 'stroke',
}

interface DrawCommand {
  name: DrawCommandName;
  arguments: any;
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  lineCap: LineCap;
  lineJoin: LineJoin;
  miterLimit: number;
}

export default class Graphics {
  public fillStyle: string = null;
  public strokeStyle: string = null;
  public lineWidth: number = 0;
  public lineCap: LineCap = LineCap.BUTT;
  public lineJoin: LineJoin = LineJoin.MITER;
  public miterLimit: number = 0;
  private _commands: Set<DrawCommand> = new Set();
  private _x: number = 0;
  private _y: number = 0;
  private _bounds: Rectangle = new Rectangle();

  public get commands(): Set<DrawCommand> { return this._commands; }
  public get commandList(): IterableIterator<DrawCommand> { return this._commands.values(); }
  public get bounds(): Rectangle { return this._bounds; }

  public rect(x: number, y: number, width: number, height: number): void {
    this._bounds.extends(new Rectangle(x, y, width, height));
    this._addCommand(DrawCommandName.RECT, arguments);
  }

  public fillRect(x: number, y: number, width: number, height: number): void {
    this._bounds.extends(new Rectangle(x, y, width, height));
    this._addCommand(DrawCommandName.FILL_RECT, arguments);
  }

  public strokeRect(x: number, y: number, width: number, height: number): void {
    const lineWidth: number = this.lineWidth * 2;
    this._bounds.extends(new Rectangle(x, y, width + lineWidth, height + lineWidth));
    this._addCommand(DrawCommandName.STROKE_RECT, arguments);
  }

  public clearRect(x: number, y: number, width: number, height: number): void {
    this._addCommand(DrawCommandName.CLEAR_RECT, arguments);
  }

  public beginPath(): void {
    this._addCommand(DrawCommandName.BEGIN_PATH);
  }

  public closePath(): void {
    this._addCommand(DrawCommandName.CLOSE_PATH);
  }

  public moveTo(x: number, y: number): void {
    this._x = x;
    this._y = y;
    this._addCommand(DrawCommandName.MOVE_TO, arguments);
  }

  public lineTo(x: number, y: number): void {
    this._bounds.extendsPosition(this._x, this._y);
    this._bounds.extendsPosition(x, y);
    this._x = x;
    this._y = y;
    this._addCommand(DrawCommandName.LINE_TO, arguments);
  }

  public arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean = false): void {
    this._addCommand(DrawCommandName.ARC, arguments);
  }

  public arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void {
    this._addCommand(DrawCommandName.ARC_TO, arguments);
  }

  public quadraticCurveTo(cp1x: number, cp1y: number, x: number, y: number): void {
    this._addCommand(DrawCommandName.QUADRATIC_CURVE_TO, arguments);
  }

  public bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
    this._addCommand(DrawCommandName.BEZIER_CURVE_TO, arguments);
  }

  public fill(): void {
    this._addCommand(DrawCommandName.FILL);
  }

  public stroke(): void {
    this._addCommand(DrawCommandName.STROKE);
  }

  public clear(): void {
    this._commands.clear();
  }

  private _addCommand(name: DrawCommandName, args?: any): void {
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
  }
}
