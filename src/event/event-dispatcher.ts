
interface Event{

}

interface EventHandler{
    (event:Event, data:any):void;
}

interface EventMap{
    [prop: string]: EventHandler[];
}

export default class EventDispatcher {
    private _eventMap: EventMap = {};

    public get eventMap(): any {
        return this._eventMap;
    }

    public on( type:string, handler:EventHandler ):void{
        if( !this._eventMap[type] ){
            this._eventMap[type] = [];
        }
        this._eventMap[ type ].push( handler );
    }

    public off( type:string, handler:EventHandler ){
        if( handler ){
            if( this._eventMap[ type ] ){
                const index = this._eventMap[ type ].indexOf( handler );
                this._eventMap[ type ].splice( index, 1 );
            }
        }else{
            if( this._eventMap[ type ] ){
                this._eventMap[ type ] = null;
            }
        }
    }

    public trigger( type:string, data:any ){
        if( this._eventMap[ type ] ){
            for( let item of this._eventMap[ type ] ){
                item.call( this, data );
            }
        }
    }
}