
describe( '[ Rectangle Test ]' , ()=>{
    "use strict";

    beforeEach( ()=>{
        const matrixPropList = [ 'left', 'top', 'width', 'height' ];
        jasmine.addMatchers({
            toEqualRectangle:()=>{
                return{
                    compare:( actual, ...rectangleProp )=>{
                        const result = {};
                        result.message = '';
                        result.pass = true;
                        matrixPropList.forEach( ( item, index )=>{
                            if( actual[ item ] !== rectangleProp[ index ] ){
                                result.message += item + ' 값이 일치하지 않습니다. ( 소스 값 : ' + actual[ item ] + ', 테스트 값 : ' + rectangleProp[ index ] + ' ) \n';
                                result.pass = false;
                            }
                        });
                        return result;
                    }
                }
            }
        });
    });

    it( 'new Rectangle()는 x:0, y:0, width:0, height:0 의 사각형을 생상한다.', ()=>{
        const rect = new stg.Rectangle();
        expect( rect ).toEqualRectangle( 0, 0, 0, 0 );
    });

    it( 'left 속성은 x과 width 값을 갱신한다.', ()=>{
        const rect = new stg.Rectangle( 100, 100, 100, 100 );
        rect.left = 80;
        expect( rect ).toEqualRectangle( 80, 100, 120, 100 );
    });

    it( 'right 속성은 width 값을 갱신한다.', ()=>{
        const rect = new stg.Rectangle( 100, 100, 100, 100 );
        rect.right = 220;
        expect( rect ).toEqualRectangle( 100, 100, 120, 100 );
    });

    it( 'top 속성은 y과 height 값을 갱신한다.', ()=>{
        const rect = new stg.Rectangle( 100, 100, 100, 100 );
        rect.top = 80;
        expect( rect ).toEqualRectangle( 100, 80, 100, 120 );
    });

    it( 'bottom 속성은 height 값을 갱신한다.', ()=>{
        const rect = new stg.Rectangle( 100, 100, 100, 100 );
        rect.bottom = 220;
        expect( rect ).toEqualRectangle( 100, 100, 100, 120 );
    });

    it( 'contains 메서드는 주어진 ( x, y ) 좌표의 포함 관계를 판단한다.', ()=>{
        const rect = new stg.Rectangle( 100, 100, 100, 100 );
        expect( rect.contains( 100, 100 ) ).toEqual( true );
        expect( rect.contains( 200, 200 ) ).toEqual( true );
        expect( rect.contains( 150, 150 ) ).toEqual( true );
        expect( rect.contains( 99, 99 ) ).toEqual( false );
        expect( rect.contains( 201, 201 ) ).toEqual( false );
    });

    it( 'containsRect 메서드는 주어진 Rectangle 객체의 포함 관계를 판단한다.', ()=>{
        const rect = new stg.Rectangle( 100, 100, 100, 100 );
        expect( rect.containsRect( new stg.Rectangle( 20, 20, 100, 100 ) ) ).toEqual( false );
        expect( rect.containsRect( new stg.Rectangle( 180, 20, 100, 100 ) ) ).toEqual( false );
        expect( rect.containsRect( new stg.Rectangle( 20, 180, 100, 100 ) ) ).toEqual( false );
        expect( rect.containsRect( new stg.Rectangle( 180, 180, 100, 100 ) ) ).toEqual( false );
        expect( rect.containsRect( new stg.Rectangle( 120, 120, 80, 80 ) ) ).toEqual( true );
    });

    it( 'intersects 메서드는 주어진 Rectangle 객체와의 교차를 판단한다.', ()=>{
        const rect = new stg.Rectangle( 100, 100, 100, 100 );
        expect( rect.intersects( new stg.Rectangle( 20, 20, 100, 100 ) ) ).toEqual( true );
        expect( rect.intersects( new stg.Rectangle( 180, 20, 100, 100 ) ) ).toEqual( true );
        expect( rect.intersects( new stg.Rectangle( 20, 180, 100, 100 ) ) ).toEqual( true );
        expect( rect.intersects( new stg.Rectangle( 180, 180, 100, 100 ) ) ).toEqual( true );

        expect( rect.intersects( new stg.Rectangle( 0, 0, 100, 100 ) ) ).toEqual( false );
        expect( rect.intersects( new stg.Rectangle( 200, 0, 100, 100 ) ) ).toEqual( false );
        expect( rect.intersects( new stg.Rectangle( 0, 200, 100, 100 ) ) ).toEqual( false );
        expect( rect.intersects( new stg.Rectangle( 200, 200, 100, 100 ) ) ).toEqual( false );

    });

    it( 'intersection 메서드는 주어진 Rectangle 객체와의 교차된 영역을 반환한다.', ()=>{
        const rect = new stg.Rectangle( 100, 100, 100, 100 );
        const intersection1 = rect.intersection( new stg.Rectangle( 20, 20, 100, 100 ) );
        expect( intersection1 ).toEqualRectangle( 100, 100, 20, 20 );

        const intersection2 = rect.intersection( new stg.Rectangle( 180, 20, 100, 100 ) );
        expect( intersection2 ).toEqualRectangle( 180, 100, 20, 20 );

        const intersection3 = rect.intersection( new stg.Rectangle( 20, 180, 100, 100 ) );
        expect( intersection3 ).toEqualRectangle( 100, 180, 20, 20 );

        const intersection4 = rect.intersection( new stg.Rectangle( 180, 180, 100, 100 ) );
        expect( intersection4 ).toEqualRectangle( 180, 180, 20, 20 );

        const intersection5 = rect.intersection( new stg.Rectangle( 200, 200, 100, 100 ) );
        expect( intersection5 ).toEqual( null );
    });

    it( 'extends 메서드는 입려된 rectangle을 포함하는 값으로 갱신한다.', ()=>{
        const rect1 = new stg.Rectangle( 100, 100, 100, 100 );
        const rect2 = new stg.Rectangle( 200, 200, 50, 50 );
        expect( rect1.extends( rect2 ) ).toEqualRectangle( 100, 100, 150, 150 );
    });
});