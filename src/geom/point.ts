import Matrix from "./matrix";

export default class Point{
    public x:number = 0;
    public y:number = 0;

    constructor( x:number=0, y:number=0 ){
      this.x = x;
      this.y = y;
    }

    public distance( point:Point ):number{
        return Math.sqrt(Math.pow( point.x - this.x, 2 ) + Math.pow( point.y - this.y, 2 ) );
    }

    public rotate( radian:number ):Point{
        const matrix = new Matrix( Math.cos( radian ), Math.sin( radian ), -Math.sin( radian ), Math.cos( radian ));
        let px = ( matrix.a * this.x ) + ( matrix.c * this.y );
        let py = ( matrix.b * this.x ) + ( matrix.d * this.y );
        return new Point( px, py );
    }

    public scale( scaleX:number, scaleY:number ):Point{
        const matrix = new Matrix( scaleX, 0, 0, scaleY );
        let px = ( matrix.a * this.x ) + ( matrix.c * this.y );
        let py = ( matrix.b * this.x ) + ( matrix.d * this.y );
        return new Point( px, py );
    }

    public translate( x:number, y:number ):Point{
        const matrix = new Matrix( 1, 0, 0, 1, x, y );
        let px = ( matrix.a * this.x ) + ( matrix.c * this.y ) + matrix.tx;
        let py = ( matrix.b * this.x ) + ( matrix.d * this.y ) + matrix.ty;
        return new Point( px, py );
    }

    public skew( skewX:number, skewY:number ):Point{
        const matrix = new Matrix( 1, Math.tan( skewX ), Math.tan( skewY ), 1 );
        let px = ( matrix.a * this.x ) + ( matrix.c * this.y );
        let py = ( matrix.b * this.x ) + ( matrix.d * this.y );
        return new Point( px, py );
    }
}
