
stg.Ticker = ( ()=>{

	const _fps = Symbol( 'fps' );
	const _run= Symbol( 'run' );
	const _state = Symbol( 'state' );
	const _stateReady = Symbol( 'ready' );
	const _stateRunning = Symbol( 'running' );
	const _prevTime = Symbol( 'prevTime' );
	const _internalTime = Symbol( 'intervalTime' );
	const _oneSec  = 1000;

	class Ticker extends stg.EventDispatcher{

		constructor( fps=40 ){
			super();
			this.setFPS( fps );
			this[ _state ] = _stateReady;
		}

		getFPS(){
			return this[ _fps ];
		}

		setFPS( value ){
			value = Number( value );
			if( isNaN( value ) ){ throw new Error( 'FPS 값이 숫자형이 아닙니다.' )}
			if( value <= 0 ){ throw new Error( 'FPS 값은 0보다 커야 합니다.' )}
			this[ _fps ] = value;
			
			if( value > 0 && value < 1 ){
				this[ _internalTime ]= ( _oneSec * value );
			}else{
				this[ _internalTime ]= ( _oneSec / value );
			}
		}

		run(){
			this[ _state ] = _stateRunning;
			this[ _prevTime ] = +new Date();
			window.requestAnimationFrame( () => this[ _run ]() );
		}

		stop(){
			this[ _state ] = _stateReady;
		}

		[ _run ](){
			if( this[ _state ] === _stateReady ){ return; }
			const now = +new Date();
			const delta = now - this[ _prevTime ];
			if( delta >= this[ _internalTime ] ){
				this.trigger( stg.Ticker.TICK, { delta:delta } );
				this[ _prevTime ] = +new Date();
			}

			if( this[ _state ] === _stateRunning ){
				window.requestAnimationFrame( () => this[ _run ]() );
			}
		}
	}

	Ticker.TICK = 'tick';

	return Ticker;
} )();