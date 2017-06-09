


stg.MouseEvent = ( ()=>{
    'use strict';

    const _target = Symbol( 'target' );
    const _currentTarget = Symbol( 'currentTarget' );

    class MouseEvent extends stg.Event{

        constructor( type, data, target, currentTarget ){
            super( type, data );
            this[ _target ] = target;
            this[ _currentTarget ] = currentTarget;
        }
    }

    MouseEvent.CLICK = 'click';
    MouseEvent.MOUSE_OVER = 'mouseOver';
    MouseEvent.MOUSE_OUT = 'mouseOut';
    return MouseEvent;
})();