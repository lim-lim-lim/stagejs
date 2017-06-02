


stg.Event = ( ()=>{
    'use strict';

    const _type = Symbol( 'type' );

    class Event{

        constructor( type ){
            this[ _type ] = type;
        }

        get type(){
            return this[ _type ];
        }

        set type( value ){
            this[ _type ] = val;
        }

    }

    return Event;
})();