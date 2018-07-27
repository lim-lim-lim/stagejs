import Display from './display';
import Graphics from './graphics';
import Rectangle from 'geom/rectangle';

export default class Shape extends Display {
  public graphics: Graphics = null;

  public get bounds(): Rectangle {
    const bounds: Rectangle = this.graphics.bounds.clone();
    bounds.setTo(this.x, this.y, bounds.width * this.scaleX, bounds.height * this.scaleY);
    return bounds;
  }

  constructor(graphics: Graphics) {
    super();
    this.graphics = graphics || new Graphics();
  }

  public updateDisplay(context: CanvasRenderingContext2D): void {
    for (const command of this.graphics.commandList) {
      context.fillStyle = command.fillStyle;
      context.strokeStyle = command.strokeStyle;
      context.lineWidth = command.lineWidth;
      context.lineCap = command.lineCap;
      context.lineJoin = command.lineJoin;
      context.miterLimit = command.miterLimit;
      if (command.arguments) {
        (context as any)[command.name](...command.arguments);
      } else {
        (context as any)[command.name]();
      }
    }
  }
}
