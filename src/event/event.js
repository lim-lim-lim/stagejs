


stg.Event = ( ()=>{
    'use strict';

    const _type = Symbol( 'type' );
    const _data = Symbol( 'data' );

    class Event{

        constructor( type, data ){
            this[ _type ] = type;
            this[ _data ] = data;
        }

        get type(){
            return this[ _type ];
        }

        get data(){
            return this[ _data ];
        }

        set type( value ){
            this[ _type ] = val;
        }

        set data( value ){
            this[ _data ] = value;
        }
    }

    return Event;
})();