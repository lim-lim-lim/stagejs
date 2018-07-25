import Graphics from "./graphics";
import Display from "./display";

export default class Shape extends Display {
  public graphics: Graphics = null;

  constructor(graphics: Graphics) {
    super();
    this.graphics = graphics || new Graphics();
  }

  updateDisplay(context: CanvasRenderingContext2D): void {
    for (let command of this.graphics.commandList) {
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