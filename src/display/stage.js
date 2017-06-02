


stg.Stage = ( ()=>{
    'use strict';

    const _canvas = Symbol( 'canvas' );
    const _context = Symbol( 'context' );
    const _changed = Symbol( 'changed' );
    const _colorKey = Symbol( 'colorKey' );
    const _returnedColorKey = Symbol( 'returnedColorkey' );
    const _bounds = Symbol( 'bounds' );

    class Stage extends stg.DisplayContainer{

        constructor( canvasId ){
            super();
            this[ _canvas ] = document.getElementById( canvasId );
            this[ _context ] = this[ _canvas ].getContext( '2d' );
            this[ _changed ] = false;
            this[ _colorKey ] = 0;
            this[ _returnedColorKey ] = [];
            this[ _bounds ] = new stg.Rectangle( 0, 0, this[ _canvas ].width, this[ _canvas ].height );
        }

        get canvas(){
            return this[ _canvas ];
        }

        get context(){
            return this[ _context ];
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
            return Number( ++this[ _colorKey ]).toString( 16 );
        }

        returnColorKey( value ){
            this[ _returnedColorKey].push( value );
        }

        update(){
            if( this.changed ){
                this[ _canvas ].width = this[ _canvas ].width;
                super.update();
                this.changed = false;
            }
        }
    }

    Stage.ADD_TO_STAGE = 'addToStage';
    Stage.REMOVE_TO_STAGE = 'removeToStage';

    return Stage;
})();