import DisplayContainer from "./display-container";


export default class Stage extends DisplayContainer{
    
}

stg.Stage = ( ()=>{
    'use strict';

    const _canvas = Symbol( 'canvas' );
    const _eventCanvas = Symbol( 'eventCanvas' );
    const _tempCanvas = Symbol( 'tempCanvas' );
    const _context = Symbol( 'context' );
    const _eventContext = Symbol( 'eventContext' );
    const _tempContext = Symbol( 'tempContext' );
    const _changed = Symbol( 'changed' );
    const _colorKey = Symbol( 'colorKey' );
    const _returnedColorKey = Symbol( 'returnedColorkey' );
    const _bounds = Symbol( 'bounds' );
    const _ticker = Symbol( 'ticker' );
    const _eventTargetMap = Symbol( 'eventTargetMap' );
    const _initFPS = Symbol( 'initFPS' );
    const _initEventCanvas = Symbol( 'initEventCanvas' );
    const _initEvent = Symbol( 'initEvent' );

    class Stage extends stg.DisplayContainer{

        constructor( canvasId, fps ){
            super();
            this[ _canvas ] = document.getElementById( canvasId );
            this[ _eventCanvas ] = null;
            this[ _tempCanvas ] = null;
            this[ _context ] = this[ _canvas ].getContext( '2d' );
            this[ _eventContext ] = null;
            this[ _tempContext ] = null;
            this[ _changed ] = false;
            this[ _colorKey ] = 0;
            this[ _returnedColorKey ] = [];
            this[ _bounds ] = new stg.Rectangle( 0, 0, this[ _canvas ].width, this[ _canvas ].height );
            this[ _eventTargetMap ] = {};
            this[ _initFPS ]( fps );
            this[ _initEventCanvas ]();
            this[ _initEvent ]();
            this.colorKey = this.createColorKey();
        }

        get canvas(){
            return this[ _canvas ];
        }

        get eventCanvas(){
            return this[ _eventCanvas ];
        }

        get tempCanvas(){
            return this[ _tempCanvas ];
        }

        get context(){
            return this[ _context ];
        }

        get eventContext(){
            return this[ _eventContext ];
        }

        get tempContext(){
            return this[ _tempContext ];
        }

        get stage(){
            return this;
        }

        get width(){
            return this[ _canvas ].width;
        }

        get height(){
            return this[ _canvas ].height;
        }

        get bounds(){
            return this[ _bounds ];
        }

        get changed(){
            return this[ _changed ];
        }

        set changed( value ){
            this[ _changed ] = value;
        }

        createColorKey(){
            if( this[ _returnedColorKey].length ){
                return this[ _returnedColorKey].shift();
            }
            let value = Number( this[ _colorKey ]+=10 ).toString( 16 );
            value = '0'.repeat( 6-value.length )+value;
            return value;
        }

        returnColorKey( value ){
            this[ _returnedColorKey].push( value );
        }

        update(){
            if( this.changed ){
                this[ _canvas ].width = this[ _canvas ].width;
                this[ _eventCanvas ].width = this[ _eventCanvas ].width;
                this[ _tempCanvas ].width = this[ _tempCanvas ].width;
                super.update();
                this.changed = false;
            }
        }

        registerEventMap( display ){
            const childEventMap = display.eventMap;
            for( let type in childEventMap ){
                if( !this[ _eventTargetMap ][ type ] ){
                    this[ _eventTargetMap ][ type ] = [];
                }
                this[ _eventTargetMap ][ type ].push( display );
            }
        }

        deregisterEventMap( display ){
            const childEventMap = display.eventMap;
            for( let type in childEventMap ){
                const index = this[ _eventTargetMap ][ type ].indexOf( display );
                this[ _eventTargetMap ][ type ].splice( index, 1 );
            }
        }

        [ _initFPS ]( fps ){
            if( fps ){
                this[ _ticker ] = new stg.Ticker( fps );
                this[ _ticker ].on( stg.Ticker.TICK, delta=>{
                    this.trigger( Stage.ENTER_FRAME, delta );
                    this.update();
                } );
                this[ _ticker ].run();
            }
        }

        [ _initEventCanvas ](){ 
            this[ _eventCanvas ] = document.createElement( 'canvas' );
            this[ _eventCanvas ].width = this[ _canvas ].width;
            this[ _eventCanvas ].height = this[ _canvas ].height;
            this[ _eventContext ] = this[ _eventCanvas ].getContext( '2d' );
            // document.body.appendChild( this[ _eventCanvas ] );
            this[ _tempCanvas ] = document.createElement( 'canvas' );
            this[ _tempCanvas ].width = this[ _canvas ].width;
            this[ _tempCanvas ].height = this[ _canvas ].height;
            this[ _tempContext ] = this[ _tempCanvas ].getContext( '2d' );
        }

        [ _initEvent ](){
            const rect = this[ _canvas ].getBoundingClientRect();
            this[ _canvas ].addEventListener( 'click', event=>{
                event.preventDefault();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const color = this[ _eventContext ].getImageData( x, y, 1, 1 );
                const r = color.data[ 0 ].toString( 16 );
                const g = color.data[ 1 ].toString( 16 );
                const b = color.data[ 2 ].toString( 16 );
                const colorKey = '0'.repeat( 2-r.length)+ r + '0'.repeat( 2-g.length) + g + '0'.repeat( 2-b.length) + b;
                for( let i=this[ _eventTargetMap ][ stg.MouseEvent.CLICK ].length-1, count=0 ; i>=count ; i-=1 ){
                    let item = this[ _eventTargetMap ][ stg.MouseEvent.CLICK ][ i ];
                    if( colorKey === item.colorKey ){
                        item.trigger( stg.MouseEvent.CLICK, new stg.MouseEvent() );
                        break;
                    }
                }
            });
        }
    }

    Stage.ADD_TO_STAGE = 'addToStage';
    Stage.REMOVE_TO_STAGE = 'removeToStage';
    Stage.ENTER_FRAME = 'enterFrame';

    return Stage;
})();