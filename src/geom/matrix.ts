
export default class Matrix{
    public a:number = 1;
    public b:number = 0;
    public c:number = 0;
    public d:number = 1;
    public tx:number = 0;
    public ty:number = 0;

    constructor( a:number=1, b:number=0, c:number=0, d:number=1, tx:number=0, ty:number=0 ){
      this.setTo( a, b, c, d, tx, ty );
    }

    public setTo( a:number, b:number, c:number, d:number, tx:number, ty:number ):void{
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.tx = tx;
      this.ty = ty;
    }

    public setToMatrix( matrix:Matrix ):void{
      this.a = matrix.a;
      this.b = matrix.b;
      this.c = matrix.c;
      this.d = matrix.d;
      this.tx = matrix.tx;
      this.ty = matrix.ty;
    }

    public add( matrix:Matrix ):void{
        return this.setTo( this.a+matrix.a, this.b+matrix.b, this.c+matrix.c, this.d+matrix.d, this.tx+matrix.tx, this.ty+matrix.ty );
    }

    public sub( matrix:Matrix ):void{
        return this.setTo( this.a-matrix.a, this.b-matrix.b, this.c-matrix.c, this.d-matrix.d, this.tx-matrix.tx, this.ty-matrix.ty );
    }

    public multi( matrix:Matrix ):void{
        let a:number, b:number, c:number, d:number, tx:number, ty:number;

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
        this.setTo( a, b, c, d, tx, ty );
    }

    public inverse():Matrix{
        const { a, b, c, d, tx, ty } = this;
        const n = a*d-b*c;
        return new Matrix( d/n, -b/n, -c/n, a/n, (c*this.ty-d*tx)/n, (b*tx - a*this.ty)/n );
    }

    public clone():Matrix{
        return new Matrix( this.a, this.b, this.c, this.d, this.tx, this.ty );
    }

    public scale( x:number=1, y:number=1 ):void{
        this.multi( new Matrix( x, 0, 0, y, 0, 0 ) );
    }

    public translate( x:number=0, y:number=0 ):void{
        this.multi( new Matrix( 1, 0, 0, 1, x, y ) );
    }

    public rotate( angle:number ):void{
        this.multi( new Matrix( Math.cos(angle), Math.sin(angle), -Math.sin(angle), Math.cos(angle) ) );
    }

    public skew( x=0, y=0 ):void{
        this.multi( new Matrix( 1, Math.tan(y), Math.tan(x), 1, 0, 0 ) );
    }

    public reset():void{
        this.setTo( 1, 0, 0, 1, 0, 0 );
    }

    public equals( matrix:Matrix ):boolean{
        return this.a === matrix.a && this.b === matrix.b && this.c === matrix.c && this.d === matrix.d && this.tx === matrix.tx && this.ty === matrix.ty;
    }
}
