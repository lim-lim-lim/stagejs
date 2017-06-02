
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