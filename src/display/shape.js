

stg.Shape = ( ()=>{
    'use strict';

    const _graphics = Symbol( 'graphics' );
    const _currentX = Symbol( 'currentX' );
    const _currentY = Symbol( 'currentY' );

    class Shape extends stg.Display{

        constructor( graphics ){
            super();
            this[ _currentX ] = 0;
            this[ _currentY ] = 0;
            this.graphics = graphics || new stg.Graphics();
            this.graphics.bounds = this.bounds;
        }

        get graphics(){
            return this[ _graphics ];
        }

        set graphics( value ){
            this[ _graphics ] = value;
        }

        updateDisplay( context ){
            for( let command of this[ _graphics ].commandList ){
                context.fillStyle = command.fillStyle;
                context.strokeStyle = command.strokeStyle;
                context.lineWidth = command.lineWidth;
                context.lineCap = command.lineCap;
                context.lineJoin = command.lineJoin;
                context.miterLimit = command.miterLimit;
                if( command.arguments ){
                    context[ command.name ]( ...command.arguments );
                }else{
                    context[ command.name ]();
                }
            }
        }
    }

    return Shape;
})();