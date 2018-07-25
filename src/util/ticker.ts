import EventDispatcher from "../event/event-dispatcher";

enum TickerState{
  READY = 'ready',
  RUNNING = 'running'
}

enum TickerEvent{
  TICK = 'tick'
}

const _oneSec:number = 1000;

export default class Ticker extends EventDispatcher{

  public static readonly TICK:TickerEvent = TickerEvent.TICK

  private _fps:number = 0;
  private _state:TickerState = TickerState.READY;
  private _prevTime:number = 0;
  private _internalTime:number = 0;

  public get fps():number{ return this._fps; }

  public set fps( value:number ){
    this._fps = Math.max( value,1 );
    //TODO: 로직 확인
    if( value > 0 && value < 1 ){
      this._internalTime = ( _oneSec * value );
    }else{
      this._internalTime = ( _oneSec / value );
    }
  }

  constructor( fps=40 ){
    super();
    this.fps = fps;
    this._state = TickerState.READY;
  }
  
  public run():void{
    this._state = TickerState.RUNNING;
    this._prevTime = +new Date();
    window.requestAnimationFrame( () => this._run() );
  }

  public stop():void{
    this._state = TickerState.READY;
  }

  private _run():void{
    if( this._state === TickerState.READY ){ return; }
    const now = +new Date();
    const delta = now - this._prevTime;
    if( delta >= this._internalTime ){
      this.trigger( Ticker.TICK, { delta:delta } );
      this._prevTime = +new Date();
    }

    if( this._state === TickerState.RUNNING ){
      window.requestAnimationFrame( () => this._run() );
    }
  }
}
