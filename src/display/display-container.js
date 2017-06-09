


stg.DisplayContainer = ( ()=>{
    'use strict';

    const _childList = Symbol( 'childList' );

    class DisplayContainer extends stg.Display{

        constructor(){
            super();
            this[ _childList ] = [];
        }

        get childList(){
            return this[ _childList ];
        }

        addChild( display ){
            const index = this[ _childList].indexOf( display );
            if( index !== -1 ){
                this[ _childList].splice( index,1  );
            }
            this[ _childList].push( display );
            display.stage = this.stage;
            display.colorKey = this.stage.createColorKey();
            display.parent = this;
            this.stage.changed = true;
            display.trigger( stg.Stage.ADD_TO_STAGE );
            return this;
        }

        removeChildAll(){
            while( this[ _childList ].length ){
                this.removeChild( this[ _childList ][ this[ _childList ].length-1 ] );
            }
        }

        removeChild( display ){
            const index = this[ _childList].indexOf( display );
            if( index === -1 ){ return; }
            display.trigger( stg.Stage.REMOVE_TO_STAGE );
            this.removeChildAt( index );
            this.stage.returnColorKey( display.colorKey );
            display.colorKey = null;
            display.stage = null;
            display.parent = null;
            if( display.childList  ){
                display.removeChildAll();
            }
            return this;
        }

        removeChildAt( index ){
            this[ _childList].splice( index, 1 );
            this.stage.changed = true;
            return this;
        }

        getChildAt( index ){
            return this[ _childList][ index ];
        }

        updateDisplay( context ){
            for( let child of this[ _childList ] ) {
                if (child.visible) {
                    child.update();
                }
            }
        }
    }

    return DisplayContainer;
})();