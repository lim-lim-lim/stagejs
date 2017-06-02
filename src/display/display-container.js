


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
            return this;
        }

        removeChild( display ){
            const index = this[ _childList].indexOf( display );
            if( index === -1 ){ return; }
            this.removeChildAt( index );
            this.stage.returnColorKey( display.colorKey );
            display.colorKey = null;
            display.stage = null;
            display.parent = null;
            return this;
        }

        removeChildAt( index ){
            this[ _childList].splice( index, 1 );
            return this;
        }

        getChildAt( index ){
            return this[ _childList][ index ];
        }

        updateDisplay(){
            for( let child of this[ _childList ] ) {
                if (child.visible) {
                    if (!child instanceof stg.Shape && child.width === 0 && child.height === 0) {
                        return;
                    }
                    child.update();
                }
            }
        }
    }

    return DisplayContainer;
})();