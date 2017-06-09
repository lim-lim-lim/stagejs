

const stg = window.stg || {};




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



stg.MouseEvent = ( ()=>{
    'use strict';

    const _target = Symbol( 'target' );
    const _currentTarget = Symbol( 'currentTarget' );

    class MouseEvent extends stg.Event{

        constructor( type, data, target, currentTarget ){
            super( type, data );
            this[ _target ] = target;
            this[ _currentTarget ] = currentTarget;
        }
    }

    MouseEvent.CLICK = 'click';
    MouseEvent.MOUSE_OVER = 'mouseOver';
    MouseEvent.MOUSE_OUT = 'mouseOut';
    return MouseEvent;
})();

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

stg.Matrix = (()=>{
    'use strict';

    const _a = Symbol( 'a' );
    const _b = Symbol( 'b' );
    const _c = Symbol( 'c' );
    const _d = Symbol( 'd' );
    const _tx = Symbol( 'tx' );
    const _ty = Symbol( 'ty' );

    class Matrix{

        constructor( a=1, b=0, c=0, d=1, tx=0, ty=0 ){
            this.setTo( a, b, c, d, tx, ty );
        }

        ////////// getter //////////
        get a(){
            return this[ _a ];
        }

        get b(){
            return this[ _b ];
        }

        get c(){
            return this[ _c ];
        }

        get d(){
            return this[ _d ];
        }

        get tx(){
            return this[ _tx ];
        }

        get ty(){
            return this[ _ty ];
        }

        ////////// setter //////////
        set a( value ){
            this[ _a ] = value;
        }

        set b( value ){
            this[ _b ] = value;
        }

        set c( value ){
            this[ _c ] = value;
        }

        set d( value ){
            this[ _d ] = value;
        }

        set tx( value ){
            this[ _tx ] = value;
        }

        set ty( value ){
            this[ _ty ] = value;
        }

        ////////// public method //////////
        setTo( a, b, c, d, tx, ty ){
            if( arguments.length === 1 ){
                if( arguments[ 0 ] instanceof  Matrix ){
                    const matrix = arguments[ 0 ];
                    this.a = matrix.a;
                    this.b = matrix.b;
                    this.c = matrix.c;
                    this.d = matrix.d;
                    this.tx = matrix.tx;
                    this.ty = matrix.ty;
                }
            }else{
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.tx = tx;
                this.ty = ty;
            }
            return this;
        }

        add( matrix ){
            return this.setTo( this.a+matrix.a, this.b+matrix.b, this.c+matrix.c, this.d+matrix.d, this.tx+matrix.tx, this.ty+matrix.ty );
        }

        sub( matrix ){
            return this.setTo( this.a-matrix.a, this.b-matrix.b, this.c-matrix.c, this.d-matrix.d, this.tx-matrix.tx, this.ty-matrix.ty );
        }

        multi( matrix ){
            let a, b, c, d, tx, ty;

            if( typeof matrix === 'number' ){
                a = this.a * matrix;
                b = this.b * matrix;
                c = this.c * matrix;
                d = this.d * matrix;
                tx = this.tx * matrix;
                ty = this.ty * matrix;
            }else{
                a = ( this.a * matrix.a ) + ( this.c * matrix.b );
                b = ( this.b * matrix.a ) + ( this.d * matrix.b );
                c = ( this.a * matrix.c ) + ( this.c * matrix.d );
                d = ( this.b * matrix.c ) + ( this.d * matrix.d );
                tx = ( this.a * matrix.tx ) + ( this.c * matrix.ty ) + this.tx;
                ty = ( this.b * matrix.tx ) + ( this.d * matrix.ty ) + this.ty;
            }
            return this.setTo( a, b, c, d, tx, ty );
        }

        inverse(){
            const { a, b, c, d, tx, ty } = this;
            const n = a*d-b*c;
            return new Matrix( d/n, -b/n, -c/n, a/n, (c*this.ty-d*tx)/n, (b*tx - a*this.ty)/n );
        }

        clone(){
            return new Matrix( this.a, this.b, this.c, this.d, this.tx, this.ty );
        }

        scale( x=1, y=1 ){
            return this.multi( new Matrix( x, 0, 0, y, 0, 0 ) );
        }

        translate( x=0, y=0 ){
            return this.multi( new Matrix( 1, 0, 0, 1, x, y ) );
        }

        rotate( angle ){
            return this.multi( new Matrix( Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle) ) );
        }

        skew( x=0, y=0 ){
            return this.multi( new Matrix( 1, Math.tan(y), Math.tan(x), 1, 0, 0 ) );
        }

        reset(){
            return this.setTo( 1, 0, 0, 1, 0, 0 );
        }

        equals( matrix ){
            return this.a === matrix.a && this.b === matrix.b && this.c === matrix.c && this.d === matrix.d && this.tx === matrix.tx && this.ty === matrix.ty;
        }
    }

    return Matrix;
})();


stg.Point = (()=>{
    'use strict';

    const _x = Symbol( 'x' );
    const _y = Symbol( 'y' );

    class Point {

        constructor( x=0, y=0 ){
            this[ _x ] = x;
            this[ _y ] = y;
        }

        get x(){
            return this[ _x ];
        }

        get y(){
            return this[ _y ];
        }

        set x( value ){
            this[ _x ] = value;
        }

        set y( value ){
            this[ _y ] = value;
        }

        distance( point ){
            return Math.sqrt(Math.pow( point.x - this[ _x ], 2 ) + Math.pow( point.y - this[ _y ] ) );
        }

        rotate( radian ){
            const matrix = new stg.Matrix( Math.cos( radian ), Math.sin( radian ), -Math.sin( radian ), Math.cos( radian ));
            let px = ( matrix.a * this[ _x ] ) + ( matrix.c * this[ _y ] );
            let py = ( matrix.b * this[ _x ] ) + ( matrix.d * this[ _y ] );
            return new Point( px, py );
        }

        scale( scaleX, scaleY ){
            const matrix = new stg.Matrix( scaleX, 0, 0, scaleY );
            let px = ( matrix.a * this[ _x ] ) + ( matrix.c * this[ _y ] );
            let py = ( matrix.b * this[ _x ] ) + ( matrix.d * this[ _y ] );
            return new Point( px, py );
        }

        translate( x, y ){
            const matrix = new stg.Matrix( 1, 0, 0, 1, x, y );
            let px = ( matrix.a * this[ _x ] ) + ( matrix.c * this[ _y ] ) + matrix.tx;
            let py = ( matrix.b * this[ _x ] ) + ( matrix.d * this[ _y ] ) + matrix.ty;
            return new Point( px, py );
        }

        skew( skewX, skewY ){
            const matrix = new stg.Matrix( 1, Math.tan( skewX ), Math.tan( skewY ), 1 );
            let px = ( matrix.a * this[ _x ] ) + ( matrix.c * this[ _y ] );
            let py = ( matrix.b * this[ _x ] ) + ( matrix.d * this[ _y ] );
            return new Point( px, py );
        }
    }

    return Point;
})();


stg.Rectangle = ( ()=>{
    'use strict';

    const _width = Symbol( 'width' );
    const _height = Symbol( 'height' );
    const _updateWidth = Symbol( 'updateWidth' );
    const _updateHeight = Symbol( 'updateHeight' );
    const _updateRight = Symbol( 'updateRight' );
    const _updateBottom = Symbol( 'updateBottom' );
    const _leftTop = Symbol( 'leftTop' );
    const _rightTop = Symbol( 'rightTop' );
    const _leftBottom = Symbol( 'leftBottom' );
    const _rightBottom = Symbol( 'rightBottom' );

    class Rectangle{

        constructor( x=0, y=0, width=0, height=0 ){
            this[ _leftTop ] = new stg.Point();
            this[ _rightTop ] = new stg.Point();
            this[ _leftBottom ] = new stg.Point();
            this[ _rightBottom ] = new stg.Point();
            this.setTo( x, y, width, height );
        }

        get width(){
            return this[ _width ];
        }

        get height(){
            return this[ _height ];
        }

        get left(){
            return this[ _leftTop ].x;
        }

        get right(){
            return this[ _rightTop ].x;
        }

        get top(){
            return this[ _leftTop ].y;
        }

        get bottom(){
            return this[ _leftBottom ].y;
        }

        get leftTop(){
            return this[ _leftTop ];
        }

        get rightTop(){
            return this[ _rightTop ];
        }

        get leftBottom(){
            return this[ _leftBottom ];
        }

        get rightBottom(){
            return this[ _rightBottom ];
        }

        set width( value ){
            this[ _width ] = value;
            this[ _updateRight ]();
        }

        set height( value ){
            this[ _height ] = value;
            this[ _updateBottom ]();
        }

        //TODO left right top bottom 삭제 하고 x, y로 수정 할 것.
        set left( value ){
            this.leftTop.x = value;
            this.leftBottom.x = value;
            this[ _updateWidth ]();
        }

        set right( value ){
            this.rightTop.x = value;
            this.rightBottom.x = value;
            this[ _updateWidth ]();
        }

        set top( value ){
            this.leftTop.y = value;
            this.rightTop.y = value;
            this[ _updateHeight ]();
        }

        set bottom( value ){
            this.leftBottom.y = value;
            this.rightBottom.y = value;
            this[ _updateHeight ]();
        }

        set leftTop( point ){
            this[ _leftTop ] = point;
            this[ _updateWidth ]();
            this[ _updateHeight ]();
        }

        set rightTop( point ){
            this[ _rightTop ] = point;
            this[ _updateWidth ]();
            this[ _updateHeight ]();
        }

        set leftBottom( point ){
            this[ _leftBottom ] = point;
            this[ _updateWidth ]();
            this[ _updateHeight ]();
        }

        set rightBottom( point ){
            this[ _rightBottom ] = point;
            this[ _updateWidth ]();
            this[ _updateHeight ]();
        }

        contains( x, y ){
            return x >= this.left && x <= this.right && y <= this.bottom && y >= this.top;
        }

        containsRect( rectangle ){
            return rectangle.left >= this.left && rectangle.right <= this.right && rectangle.top >= this.top && rectangle.bottom <= this.bottom;
        }

        intersects( rectangle ){
            return this.contains( rectangle.left+1, rectangle.top+1 ) || this.contains( rectangle.left+1, rectangle.bottom-1 ) || this.contains( rectangle.right-1, rectangle.top+1 ) || this.contains( rectangle.right-1, rectangle.bottom-1 );
        }

        intersection( rectangle ){
            let result = null;
            if( this.intersects( rectangle ) ){
                result = new Rectangle();
                result.left = Math.max( rectangle.left, this.left );
                result.right = Math.min( rectangle.right, this.right );
                result.top = Math.max( rectangle.top, this.top );
                result.bottom = Math.min( rectangle.bottom, this.bottom );
            }
            return result;
        }

        extends( rectangle ){
            let left = Math.min( this.left, rectangle.left );
            let right = Math.max( this.right, rectangle.right );
            let top = Math.min( this.top, rectangle.top );
            let bottom = Math.max( this.bottom, rectangle.bottom );
            this.left = left;
            this.right = right;
            this.top = top;
            this.bottom = bottom;
            return this;
        }

        setTo( x, y, width, height ){
            this.left = x;
            this.top = y;
            this.width = width;
            this.height = height;
            return this;
        }

        clone(){
            return new Rectangle( this.left, this.top, this.width, this.height );
        }

        reset(){
            this.setTo( 0, 0, 0, 0 );
            return this;
        }

        equals( rectangle ){
            return this.left === rectangle.x && this.top === rectangle.y && this.width === rectangle.width && this.height === rectangle.height && this.left === rectangle.left && this.top === rectangle.top && this.right === rectangle.right && this.bottom === rectangle.bottom;
        }

        [ _updateWidth ](){
            this[ _width ] = this[ _rightTop ].x - this[ _leftTop ].x;
        }

        [ _updateHeight ](){
            this[ _height ] = this[ _leftBottom ].y - this[ _leftTop ].y;
        }

        [ _updateRight ](){
            this[ _rightBottom ].x = this[ _rightTop ].x = this[ _leftTop ].x + this[ _width ];
        }

        [ _updateBottom ](){
            this[ _leftBottom ].y = this[ _rightBottom ].y = this[ _leftTop ].y + this[ _height ];
        }
    }

    return Rectangle;
})();


stg.Display = ( ()=>{
    'use strict';

    const _stage = Symbol( 'stage' );
    const _parent = Symbol( 'parent' );
    const _bounds = Symbol( 'bounds' );
    const _computedBounds = Symbol( 'computedBounds' );
    const _matrix = Symbol( 'matrix' );
    const _colorKey = Symbol( 'colorKey' );
    const _centerX = Symbol( 'centerX' );
    const _centerY = Symbol( 'centerY' );
    const _rotate = Symbol( 'rotate' );
    const _width = Symbol( 'width' );
    const _height = Symbol( 'height' );
    const _scaleX = Symbol( 'scaleX' );
    const _scaleY = Symbol( 'scaleY' );
    const _skewX = Symbol( 'skewY' );
    const _skewY = Symbol( 'skewY' );
    const _transformTranslate = Symbol( 'executeTranslate' );
    const _transformRotate = Symbol( 'executeRotate' );
    const _transformScale = Symbol( 'executeScale' );
    const _transformSkew = Symbol( 'transformSkew' );
    const _visible = Symbol( 'visible' );
    const _changedDisplay = Symbol( 'changedDisplay' );

    class Display extends stg.EventDispatcher{

        constructor(){
            super();
            this[ _bounds ] = new stg.Rectangle();
            this[ _computedBounds ] = new stg.Rectangle();
            this[ _matrix ] = new stg.Matrix();
            this[ _scaleX ] = this[ _scaleY ] = 1;
            this[ _width ] = this[ _height ] = this[ _centerX ] = this[ _centerY ] = this[ _rotate ] = this[ _skewX ] =  this[ _skewY ] = 0;
            this[ _visible ] = true;

            this.on( stg.Stage.ADD_TO_STAGE, () => this.stage.registerEventMap( this ) );
            this.on( stg.Stage.REMOVE_TO_STAGE, () => this.stage.deregisterEventMap( this ) );
        }

        get stage(){
            return this[ _stage ];
        }

        get parent(){
            return this[ _parent ];
        }

        get colorKey(){
            return this[ _colorKey ];
        }

        get x(){
            return this[ _bounds ].left;
        }

        get y(){
            return this[ _bounds ].top;
        }

        get centerX(){
            return this[ _centerX ];
        }

        get centerY(){
            return this[ _centerY ];
        }

        get width(){
            return this[ _bounds ].width;
        }

        get height(){
            return this[ _bounds ].height;
        }

        get rotate(){
            return this[ _rotate ];
        }

        get scaleX(){
            return this[ _scaleX ];
        }

        get scaleY(){
            return this[ _scaleY ];
        }

        get skewX(){
            return this[ _skewX ];
        }

        get skewY(){
            return this[ _skewY ];
        }

        get visible(){
            return this[ _visible ];
        }

        get bounds(){
            return this[ _bounds ];
        }

        get computedBounds(){
            const bounds = this.bounds;
            const points = [ bounds.leftTop, bounds.rightTop, bounds.leftBottom, bounds.rightBottom ];

            for( let item of points ){
                item.rotate( this[ _rotate ] );
                item.skew( this[ _skewX ], this[ _skewY ] );
            }

            this[ _computedBounds ].left = Math.min( bounds.leftTop.x, bounds.rightTop.x, bounds.leftBottom.x, bounds.rightBottom.x );
            this[ _computedBounds ].right = Math.max( bounds.leftTop.x, bounds.rightTop.x, bounds.leftBottom.x, bounds.rightBottom.x );
            this[ _computedBounds ].top = Math.min( bounds.leftTop.y, bounds.rightTop.y, bounds.leftBottom.y, bounds.rightBottom.y );
            this[ _computedBounds ].bottom = Math.max( bounds.leftTop.y, bounds.rightTop.y, bounds.leftBottom.y, bounds.rightBottom.y );
            return this[ _computedBounds ];
        }

        get matrix(){
            return this[ _matrix ];
        }

        set colorKey( value ){
            this[ _colorKey ] = value;
        }

        set stage( container ){
            this[ _stage ] = container;
            if( this[ _stage ] ){
                this[ _stage ].changed = true;
            }
        }

        set parent( container ){
            this[ _parent ] = container;
        }

        set x( value ){
            if( typeof value !== 'number' ){ throw  new Error( 'Display 객체의 x 속성은 반드시 number 타입이어야 합니다.'); }
            if( this[ _bounds ].left === value ){ return; }
            this[ _bounds ].left = value;
            this[ _changedDisplay ]();
        }

        set y( value ){
            if( typeof value !== 'number' ){ throw  new Error( 'Display 객체의 y 속성은 반드시 number 타입이어야 합니다.'); }
            if( this[ _bounds ].top === value ){ return; }
            this[ _bounds ].top = value;
            this[ _changedDisplay ]();
        }

        set centerX( value ){
            if( typeof value !== 'number' ){ throw  new Error( 'Display 객체의 centerX 속성은 반드시 number 타입이어야 합니다.'); }
            this[ _centerX ] = value;
        }

        set centerY( value ){
            if( typeof value !== 'number' ){ throw  new Error( 'Display 객체의 centerY 속성은 반드시 number 타입이어야 합니다.'); }
            this[ _centerY ] = value;
        }

        set width( value ){
            if( typeof value !== 'number' ){ throw  new Error( 'Display 객체의 width 속성은 반드시 number 타입이어야 합니다.'); }
            if( this[ _width ] === value ){ return; }
            this[ _width ] = value;
            this[ _bounds ].width = value * this[ _scaleX ];
            this[ _changedDisplay ]();
        }

        set height( value ){
            if( typeof value !== 'number' ){ throw  new Error( 'Display 객체의 height 속성은 반드시 number 타입이어야 합니다.'); }
            if( this.height === value ){ return; }
            this[ _height ] = value;
            this[ _bounds ].height = value * this[ _scaleY ];
            this[ _changedDisplay ]();
        }

        set rotate( value ){
            if( typeof value !== 'number' ){ throw  new Error( 'Display 객체의 rotate 속성은 반드시 number 타입이어야 합니다.'); }
            if( this[ _rotate ] === value ){ return; }
            this[ _rotate ] = value;
            this[ _changedDisplay ]();
        }

        set scaleX( value ){
            if( typeof value !== 'number' ){ throw  new Error( 'Display 객체의 scaleX 속성은 반드시 number 타입이어야 합니다.'); }
            if( this[ _scaleX ] === value ){ return; }
            this[ _scaleX ] = value;
            this[ _bounds ].width = this[ _width ] * value;
            this[ _changedDisplay ]();
        }

        set scaleY( value ){
            if( typeof value !== 'number' ){ throw  new Error( 'Display 객체의 scaleY 속성은 반드시 number 타입이어야 합니다.'); }
            if( this[ _scaleY ] === value ){ return; }
            this[ _scaleY ] = value;
            this[ _bounds ].height = this[ _height ] * value;
            this[ _changedDisplay ]();
        }

        set skewX( value ){
            if( typeof value !== 'number' ){ throw  new Error( 'Display 객체의 skweX 속성은 반드시 number 타입이어야 합니다.'); }
            if( this[ _skewX ] === value ){ return; }
            this[ _skewX ] = value;
            this[ _changedDisplay ]();
        }

        set skewY( value ){
            if( typeof value !== 'number' ){ throw  new Error( 'Display 객체의 skweY 속성은 반드시 number 타입이어야 합니다.'); }
            if( this[ _skewY ] === value ){ return; }
            this[ _skewY ] = value;
            this[ _changedDisplay ]();
        }

        set visible( value ){
            if( this[ _visible ] === value ){ return; }
            this[ _visible ] = value;
            this[ _changedDisplay ]();
        }

        on( type, handler ){
            super.on( type, handler );
        }

        off( type, handler ){
            super.off( type, handler );
        }

        updateDisplay( context, tempContext ){
            throw new Error( 'Display 클래스를 상속하는 모든 자식 클래스는 updateDisplay를 구현해야 합니다.' );
        }

        updateTransformation(){
            this[ _matrix ].reset();
            const offsetX = this.x + ( this[ _centerX ] * this[ _scaleX ] );
            const offsetY = this.y + ( this[ _centerY ] * this[ _scaleY ] );
            this[ _transformTranslate ]( offsetX, offsetY );
            this[ _transformRotate ]( this[ _rotate ] );
            this[ _transformTranslate ]( -offsetX, -offsetY );
            this[ _transformTranslate ]( this.x, this.y );
            this[ _transformScale ]( this[ _scaleX ], this[ _scaleY ] );
            this[ _transformSkew ]( this[ _skewX ], this[ _skewY ] );
            this.stage.tempContext.transform( this[ _matrix ].a, this[ _matrix ].b, this[ _matrix ].c, this[ _matrix ].d, this[ _matrix ].tx, this[ _matrix ].ty );
            return this;
        }

        update(){
            this.stage.tempContext.save();
            this.updateTransformation();
            this.updateDisplay( this.stage.tempContext );
            this.stage.context.drawImage( this.stage.tempCanvas, 0, 0 );
            this.stage.tempContext.restore();
            this.stage.tempContext.globalCompositeOperation = 'source-in';
            this.stage.tempContext.fillStyle = '#'+this.colorKey;
            this.stage.tempContext.fillRect( 0, 0, this.stage.tempCanvas.width, this.stage.tempCanvas.height );
            this.stage.eventContext.drawImage(  this.stage.tempCanvas, 0, 0  );
            this.stage.tempCanvas.width = this.stage.tempCanvas.width;
        }

        [ _transformTranslate ]( x=0, y=0 ){
            this[ _matrix ].translate( x, y );
        }

        [ _transformRotate ]( value ){
            this[ _matrix ].rotate( value );
        }

        [ _transformScale ]( x=1, y=1){
            this[ _matrix ].scale( x, y );
        }

        [ _transformSkew ]( x=0, y=0 ){
            this[ _matrix ].skew( x, y );
        }

        [ _changedDisplay ](){
            if( !this.stage ){ return; }
            // this.parent.bounds.extends( this.computedBounds );
            if( !this.stage.changed ){
                this.stage.changed = true;
            }
        }
    }

    return Display;
})();



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



stg.Stage = ( ()=>{
    'use strict';

    const _canvas = Symbol( 'canvas' );
    const _eventCanvas = Symbol( 'eventCanvas' );
    const _tempCanvas = Symbol( 'tempCanvas' );
    const _context = Symbol( 'context' );
    const _eventContext = Symbol( 'eventContext' );
    const _tempContext = Symbol( 'tempContext' );
    const _changed = Symbol( 'changed' );
    const _colorKey = Symbol( 'colorKey' );
    const _returnedColorKey = Symbol( 'returnedColorkey' );
    const _bounds = Symbol( 'bounds' );
    const _ticker = Symbol( 'ticker' );
    const _eventTargetMap = Symbol( 'eventTargetMap' );
    const _initFPS = Symbol( 'initFPS' );
    const _initEventCanvas = Symbol( 'initEventCanvas' );
    const _initEvent = Symbol( 'initEvent' );

    class Stage extends stg.DisplayContainer{

        constructor( canvasId, fps ){
            super();
            this[ _canvas ] = document.getElementById( canvasId );
            this[ _eventCanvas ] = null;
            this[ _tempCanvas ] = null;
            this[ _context ] = this[ _canvas ].getContext( '2d' );
            this[ _eventContext ] = null;
            this[ _tempContext ] = null;
            this[ _changed ] = false;
            this[ _colorKey ] = 0;
            this[ _returnedColorKey ] = [];
            this[ _bounds ] = new stg.Rectangle( 0, 0, this[ _canvas ].width, this[ _canvas ].height );
            this[ _eventTargetMap ] = {};
            this[ _initFPS ]( fps );
            this[ _initEventCanvas ]();
            this[ _initEvent ]();
        }

        get canvas(){
            return this[ _canvas ];
        }

        get eventCanvas(){
            return this[ _eventCanvas ];
        }

        get tempCanvas(){
            return this[ _tempCanvas ];
        }

        get context(){
            return this[ _context ];
        }

        get eventContext(){
            return this[ _eventContext ];
        }

        get tempContext(){
            return this[ _tempContext ];
        }

        get stage(){
            return this;
        }

        get width(){
            return this[ _canvas ].width;
        }

        get height(){
            return this[ _canvas ].height;
        }

        get bounds(){
            return this[ _bounds ];
        }

        get changed(){
            return this[ _changed ];
        }

        set changed( value ){
            this[ _changed ] = value;
        }

        createColorKey(){
            if( this[ _returnedColorKey].length ){
                return this[ _returnedColorKey].shift();
            }
            let value = Number( ++this[ _colorKey ]).toString( 16 );
            value = '0'.repeat( 6-value.length )+value;
            return value;
        }

        returnColorKey( value ){
            this[ _returnedColorKey].push( value );
        }

        update(){
            if( this.changed ){
                this[ _canvas ].width = this[ _canvas ].width;
                this[ _eventCanvas ].width = this[ _eventCanvas ].width;
                this[ _tempCanvas ].width = this[ _tempCanvas ].width;
                super.update();
                this.changed = false;
            }
        }

        registerEventMap( display ){
            const childEventMap = display.eventMap;
            for( let type in childEventMap ){
                if( !this[ _eventTargetMap ][ type ] ){
                    this[ _eventTargetMap ][ type ] = [];
                }
                this[ _eventTargetMap ][ type ].push( display );
            }
        }

        deregisterEventMap( display ){
            const childEventMap = display.eventMap;
            for( let type in childEventMap ){
                const index = this[ _eventTargetMap ][ type ].indexOf( display );
                this[ _eventTargetMap ][ type ].splice( index, 1 );
            }
        }

        [ _initFPS ]( fps ){
            if( fps ){
                this[ _ticker ] = new stg.Ticker( fps );
                this[ _ticker ].on( stg.Ticker.TICK, delta=>{
                    this.trigger( Stage.ENTER_FRAME, delta );
                    this.update();
                } );
                this[ _ticker ].run();
            }
        }

        [ _initEventCanvas ](){
            this[ _eventCanvas ] = document.createElement( 'canvas' );
            this[ _eventCanvas ].width = this[ _canvas ].width;
            this[ _eventCanvas ].height = this[ _canvas ].height;
            this[ _eventContext ] = this[ _eventCanvas ].getContext( '2d' );

            this[ _tempCanvas ] = document.createElement( 'canvas' );
            this[ _tempCanvas ].width = this[ _canvas ].width;
            this[ _tempCanvas ].height = this[ _canvas ].height;
            this[ _tempContext ] = this[ _tempCanvas ].getContext( '2d' );
        }

        [ _initEvent ](){
            const rect = this[ _canvas ].getBoundingClientRect();
            this[ _canvas ].addEventListener( 'click', event=>{
                event.preventDefault();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const color = this[ _eventContext ].getImageData( x, y, 1, 1 );
                const r = color.data[ 0 ].toString( 16 );
                const g = color.data[ 1 ].toString( 16 );
                const b = color.data[ 2 ].toString( 16 );
                const colorKey = '0'.repeat( 2-r.length)+ r + '0'.repeat( 2-g.length) + g + '0'.repeat( 2-b.length) + b;
                for( let i=this[ _eventTargetMap ][ stg.MouseEvent.CLICK ].length-1, count=0 ; i>=count ; i-=1 ){
                    let item = this[ _eventTargetMap ][ stg.MouseEvent.CLICK ][ i ];
                    if( colorKey === item.colorKey ){
                        item.trigger( stg.MouseEvent.CLICK, new stg.MouseEvent() );
                        break;
                    }
                }
            });
        }
    }

    Stage.ADD_TO_STAGE = 'addToStage';
    Stage.REMOVE_TO_STAGE = 'removeToStage';
    Stage.ENTER_FRAME = 'enterFrame';

    return Stage;
})();


stg.Graphics = ( ()=>{
    'use strict';

    const _bounds = Symbol( 'bounds' );
    const _fillStyle = Symbol( 'fillStyle' );
    const _strokeStyle = Symbol( 'strokeStyle' );
    const _lineWidth = Symbol( 'lineWidth' );
    const _lineCap = Symbol( 'lineCap' );
    const _lineJoin = Symbol( 'lineJoin' );
    const _miterLimit = Symbol( 'miterLimit' );
    const _commands = Symbol( 'commands' );
    const _addCommand = Symbol( 'addCommand' );

    class Graphics {

        constructor(){
            this[ _commands ] = new Set();
            this[ _fillStyle ] = null;
            this[ _strokeStyle ] = null;
            this[ _lineCap ] = null;
            this[ _lineJoin ] = null;
            this[ _miterLimit ] = null;
            this[ _lineWidth ] = null;
            this[ _bounds ] = null;
        }

        get bounds(){
            return this[ _bounds ];
        }

        get commands(){
            return this[ _commands ];
        }

        get commandList(){
            return this[ _commands ].values();
        }

        get fillStyle(){
            return this[ _fillStyle ];
        }

        get strokeStyle(){
            return this[ _strokeStyle ];
        }

        get lineCap(){
            return this[ _lineCap ];
        }

        get lineJoin(){
            return this[ _lineJoin ];
        }

        get miterLimit(){
            return this[ _miterLimit ];
        }

        get lineWidth(){
            return this[ _lineWidth ];
        }

        set bounds( value ){
            this[ _bounds ] = value;
        }

        set fillStyle( value ){
            this[ _fillStyle ] = value;
        }

        set strokeStyle( value ){
            this[ _strokeStyle ] = value;
        }

        set lineCap( value ){
            this[ _lineCap ] = value;
        }

        set lineJoin( value ){
            this[ _lineJoin ] = value;
        }

        set miterLimit( value ){
            this[ _miterLimit ] = value;
        }

        set lineWidth( value ){
            this[ _lineWidth ] = value;
        }


        rect( x, y, width, height ){
            this[ _addCommand ]( 'rect', arguments );
            return this;
        }

        fillRect( x, y, width, height ){
            this[ _addCommand ]( 'fillRect', arguments );
            return this;
        }

        strokeRect( x, y, width, height ){
            this[ _addCommand ]( 'strokeRect', arguments );
            return this;
        }

        clearRect( x, y, width, height ){
            this[ _addCommand ]( 'clearRect', arguments );
            return this;
        }

        beginPath(){
            this[ _addCommand ]( 'beginPath' );
            return this;
        }

        closePath(){
            this[ _addCommand ]( 'closePath' );
            return this;
        }

        moveTo( x, y ){
            this[ _addCommand ]( 'moveTo', arguments );
            return this;
        }

        lineTo( x, y ){
            this[ _addCommand ]( 'lineTo', arguments );
            return this;
        }

        arc( x, y, radius, startAngle, endAngle, anticlockwise ){
            this[ _addCommand ]( 'arc', arguments );
            return this;
        }

        arcTo( x1, y1, x2, y2, radius ){
            this[ _addCommand ]( 'arcTo', arguments );
            return this;
        }

        quadraticCurveTo( cp1x, cp1y, x, y ){
            this[ _addCommand ]( 'quadraticCurveTo', arguments );
            return this;
        }

        bezierCurveTo( cp1x, cp1y, cp2x, cp2y, x, y ){
            this[ _addCommand ]( 'bezierCurveTo', arguments );
            return this;
        }

        fill(){
            this[ _addCommand ]( 'fill' );
            return this;
        }

        stroke(){
            this[ _addCommand ]( 'stroke' );
            return this;
        }

        clear(){
            this[ _commands ].clear();
            return this;
        }

        [ _addCommand ]( name, args ){
            this[ _commands ].add( {
                name:name, arguments:args,
                fillStyle: this[ _fillStyle ], strokeStyle: this[ _strokeStyle ],
                lineWidth: this[ _lineWidth ], lineCap: this[ _lineCap ],
                lineJoin: this[ _lineJoin ], miterLimit: this[ _miterLimit ]
            });
        }
    }

    return Graphics;
})();


stg.Shape = ( ()=>{
    'use strict';

    const _graphics = Symbol( 'graphics' );
    const _currentX = Symbol( 'currentX' );
    const _currentY = Symbol( 'currentY' );

    class Shape extends stg.Display{

        constructor( graphics ){
            super();
            this[ _currentX ] = 0;
            this[ _currentY ] = 0;
            this.graphics = graphics || new stg.Graphics();
            this.graphics.bounds = this.bounds;
        }

        get graphics(){
            return this[ _graphics ];
        }

        set graphics( value ){
            this[ _graphics ] = value;
        }

        updateDisplay( context ){
            for( let command of this[ _graphics ].commandList ){
                context.fillStyle = command.fillStyle;
                context.strokeStyle = command.strokeStyle;
                context.lineWidth = command.lineWidth;
                context.lineCap = command.lineCap;
                context.lineJoin = command.lineJoin;
                context.miterLimit = command.miterLimit;
                if( command.arguments ){
                    context[ command.name ]( ...command.arguments );
                }else{
                    context[ command.name ]();
                }
            }
        }
    }

    return Shape;
})();


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