import Display from "./display";

export default class Sprite extends Display{
	
}

stg.Sprite = (()=>{

	const _spriteSheet = Symbol( 'spriteSheet' );
	const _fps = Symbol( 'fps' );
	const _ticker = Symbol( 'ticker' );
	const _tickerHandler = Symbol( 'tickerHandler' );

	class Sprite extends stg.Display{

		constructor( spriteSheet, fps=10 ){
			super();
			this.spriteSheet = spriteSheet;
			this[ _fps ] = fps;
			this[ _ticker ] = new stg.Ticker( fps );
			this[ _ticker ].on( stg.Ticker.TICK, ()=>this[ _tickerHandler ]() );
		}

        get spriteSheet(){
            return this[ _spriteSheet ];
        }

		get fps(){
			return this[ _fps ];
		}

		set spriteSheet( value ){
            this[ _spriteSheet ] = value;
            this.bounds.width = value.cellWidth;
            this.bounds.height = value.cellHeight;
        }

		set fps( value ){
			this[ _fps ] = value;
			this[ _ticker ].setFPS( value );
			return this;
		}

		play(){
		    this[ _tickerHandler ]();
			this[ _ticker ].run();
			return this;
		}

		stop(){
			this[ _ticker ].stop();
			return this;
		}

		updateDisplay( context ){
		    const bounds = this[ _spriteSheet ].currentBounds;
            context.drawImage(
                this[ _spriteSheet ].image,
                bounds.x,
                bounds.y,
                bounds.width,
                bounds.height,
                0,
                0,
                bounds.width,
                bounds.height,
            );
        }

		[ _tickerHandler ](){
		    this[ _spriteSheet ].next();
            this.stage.changed = true;
		    this.stage.update();
		}
	}

	return Sprite;
})();