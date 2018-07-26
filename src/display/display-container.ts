import Display from './display';
import Stage from './stage';

export default class DisplayContainer extends Display {

  private _children: Display[] = [];

  public get children(): Display[] {
    return this._children;
  }

  constructor() {
    super();
  }

  public addChild(child: Display): void {
    const index: number = this.children.indexOf(child);
    if (index !== -1) {
      this._children.splice(index, 1);
    }
    this._children.push(child);
    child.stage = this.stage;
    child.colorKey = this.stage.createColorKey();
    child.parent = this;
    this.stage.changed = true;
    child.trigger(Stage.ADD_TO_STAGE);
  }

  public removeChildAll(): void {
    while (this._children.length) {
      this.removeChild(this._children[this._children.length - 1]);
    }
  }

  public removeChild(child: Display): void {
    const index = this._children.indexOf(child);
    if (index === -1) { return; }
    child.trigger(Stage.REMOVE_TO_STAGE);
    this._children.splice( index, 1 );
    this.stage.returnColorKey(child.colorKey);
    child.colorKey = null;
    child.stage = null;
    child.parent = null;
    if (child instanceof DisplayContainer) {
      (child as DisplayContainer).removeChildAll();
    }
  }

  public removeChildAt(index: number): void {
    this.removeChild(this.getChildAt(index));
    this._children.splice(index, 1);
    this.stage.changed = true;
  }

  public getChildAt(index: number): Display {
    return this._children[index];
  }

  public updateDisplay(): void {
    for (const child of this._children) {
      if (child.visible) {
        child.update();
      }
    }
  }
}
