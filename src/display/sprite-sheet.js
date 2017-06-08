

stg.SpriteSheet = (()=>{

	const _image = Symbol( 'image' );
	const _cellWidth = Symbol( 'cellWidth' );
	const _cellHeight = Symbol( 'cellHeight' );
	const _frame = Symbol( 'frame' );
	const _frameIndex = Symbol( 'frameIndex' );
	const _currentBounds = Symbol( 'currentBounds' );
	const _updateBounds = Symbol( 'updateBounds' );
	const _loop = Symbol( 'loop' );

	class SpriteSheet extends stg.EventDispatcher{

		constructor( img, cellWidth, cellHeight, frame, loop = true ){
			super();

			if( img instanceof HTMLImageElement ){
				this[ _image ] = img;
				this.trigger( SpriteSheet.LOAD );
			}else if( typeof img === 'string' ){
				this[ _image ] = new Image();
				this[ _image ].src = img;
				this[ _image ].addEventListener( 'load', ()=>this.trigger( SpriteSheet.LOAD ) );
			}

			this[ _cellWidth ] = cellWidth;
			this[ _cellHeight ] = cellHeight;
			this[ _frame ] = frame;
			this[ _frameIndex ] = -1;
			this[ _currentBounds ] = { x:0, y:0, width:cellWidth, height:cellHeight };
			this[ _loop ] = loop;
		}

		get image(){
		    return this[ _image ];
        }

		get cellWidth(){
			return this[ _cellWidth ];
		}

		get cellHeight(){
			return this[ _cellHeight ];
		}

		get currentBounds(){
		    return this[ _currentBounds ];
        }

		next(){
		    if( this[ _frameIndex ]+1 <= this[ _frame ].length-1 ){
		        this[ _frameIndex ]++;
            }else{
		        if( this[ _loop ] ){
		            this[ _frameIndex ] = 0;
                }
            }

            this[ _updateBounds ]();
        }

        prev(){
            if( this[ _frameIndex ]-1 > 0 ){
		        this[ _frameIndex ]--;
            }else{
		        if( this[ _loop ] ){
		            this[ _frameIndex ] = this[ _frame ].length-1;
                }
            }

            this[ _updateBounds ]();
        }

        [ _updateBounds ](){
            const currentFrame = this[ _frame ][ this[ _frameIndex ] ];
            this[ _currentBounds ].x = currentFrame[ 0 ] * this[ _cellWidth ];
		    this[ _currentBounds ].y = currentFrame[ 1 ] * this[ _cellHeight ];
        }
	}

	SpriteSheet.LOAD = 'load';
	return SpriteSheet;
})();