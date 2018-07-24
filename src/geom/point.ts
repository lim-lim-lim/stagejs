
export default class Point{
    
}

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