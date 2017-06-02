

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
            console.log( this[ _leftTop ].x, this[ _width ], this[ _rightBottom ].x );
        }

        [ _updateBottom ](){
            this[ _leftBottom ].y = this[ _rightBottom ].y = this[ _leftTop ].y + this[ _height ];
        }
    }

    return Rectangle;
})();