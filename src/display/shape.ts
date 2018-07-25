import Display from './display';
import Graphics from './graphics';

export default class Shape extends Display {
  public graphics: Graphics = null;

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
