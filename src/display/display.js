

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