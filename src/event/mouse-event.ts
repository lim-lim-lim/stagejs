import Event from './event';
import Display from '../display/display';

enum MouseEventType {
  CLICK = 'click',
  MOUSE_OVER = 'mouseOver',
  MOUSE_OUT = 'mouseOut',
}

export default class MouseEvent extends Event {

  public static readonly CLICK: MouseEventType = MouseEventType.CLICK;
  public static readonly MOUSE_OVER: MouseEventType = MouseEventType.MOUSE_OVER;
  public static readonly MOUSE_OUT: MouseEventType = MouseEventType.MOUSE_OUT;

  private _target: Display = null;
  private _currentTarget: Display = null;

  constructor(type: MouseEventType, data: any, target: Display, currentTarget: Display) {
    super(type, data);
    this._target = target;
    this._currentTarget = currentTarget;
  }
}
