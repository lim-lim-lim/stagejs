import Event from './event';
import Display from '../display/display';

export enum MouseEventType{
    CLICK = 'click',
    MOUSE_OVER = 'mouseOver',
    MOUSE_OUT = 'mouseOut'
}

export default class MouseEvent extends Event{

    private _target:Display = null;
    private _currentTarget:Display = null;

    constructor( type:MouseEventType, data:any, target:Display, currentTarget:Display ){
        super( type, data );
        this._target = target;
        this._currentTarget = currentTarget;
    }
}