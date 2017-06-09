


stg.EventDispatcher = ( ()=>{
    'use strict';

    const _eventMap = Symbol( 'eventMap' );

    class EventDispatcher{

        constructor(){
            this[ _eventMap ] = {};
        }

        get eventMap(){
            return this[ _eventMap ];
        }

        on( type, handler ){
            if( !this[ _eventMap ][ type ] ){
                this[ _eventMap ][ type ] = [];
            }
            this[ _eventMap ][ type ].push( handler );
        }

        off( type, handler ){
            if( handler ){
                if( this[ _eventMap ][ type ] ){
                    const index = this[ _eventMap ][ type ].indexOf( handler );
                    this[ _eventMap ][ type ].splice( index, 1 );
                }
            }else{
                if( this[ _eventMap ][ type ] ){
                    this[ _eventMap ][ type ] = null;
                }
            }
        }

        trigger( type, event ){
            if( !(event instanceof stg.Event) ){
                const tempEvent = new stg.Event( type );
                if( event instanceof Object ){
                    tempEvent.data = event;
                }
                event = tempEvent;
            }

            if( this[ _eventMap ][ type ] ){
                for( let item of this[ _eventMap ][ type ] ){
                    item.call( this, event );
                }
            }
        }
    }

    return EventDispatcher;
})();