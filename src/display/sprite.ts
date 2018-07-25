import Display from "./display";
import SpriteSheet from "./sprite-sheet";
import Ticker from "../util/ticker";

export default class Sprite extends Display {
  private _spriteSheet: SpriteSheet = null;
  private _fps: number = 10;
  private _ticker: Ticker = null;

  constructor(spriteSheet: SpriteSheet, fps: number = 10) {
    super();
    this._spriteSheet = spriteSheet;
    this._fps = fps;
    this._ticker = new Ticker(fps);
    this._ticker.on(Ticker.TICK, () => this._tickerHandler());
  }

  public get spriteSheet(): SpriteSheet { return this._spriteSheet; }
  public get fps(): number { return this._fps; }

  public set spriteSheet(spriteSheet: SpriteSheet) {
    this._spriteSheet = spriteSheet;
    this._bounds.width = spriteSheet.cellWidth;
    this._bounds.height = spriteSheet.cellHeight;
  }

  public set fps(value: number) {
    this._fps = value;
    this._ticker.fps = value;
  }

  public play(): void {
    this._tickerHandler();
    this._ticker.run();
  }

  public stop(): void {
    this._ticker.stop();
  }

  public updateDisplay(context: CanvasRenderingContext2D): void {
    const bounds = this._spriteSheet.currentBounds;
    context.drawImage(
      this._spriteSheet.image,
      bounds.left,
      bounds.top,
      bounds.width,
      bounds.height,
      0,
      0,
      bounds.width,
      bounds.height,
    );
  }

  private _tickerHandler(): void {
    this._spriteSheet.next();
    this.stage.changed = true;
    this.stage.update();
  }
}
