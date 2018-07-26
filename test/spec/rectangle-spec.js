
describe('[ Rectangle Test ]', () => {
  "use strict";

  beforeEach(() => {
    const matrixPropList = ['left', 'top', 'width', 'height'];
    jasmine.addMatchers({
      toEqualRectangle: () => {
        return {
          compare: (actual, ...rectangleProp) => {
            const result = {};
            result.message = '';
            result.pass = true;
            matrixPropList.forEach((item, index) => {
              if (actual[item] !== rectangleProp[index]) {
                result.message += item + ' 값이 일치하지 않습니다. ( 입력 값 : ' + actual[item] + ', 기대 값 : ' + rectangleProp[index] + ' ) \n';
                result.pass = false;
              }
            });
            return result;
          }
        }
      }
    });
  });

  it('new Rectangle()는 x:0, y:0, width:0, height:0 의 사각형을 생상한다.', () => {
    const rect = new stg.Rectangle();
    expect(rect).toEqualRectangle(0, 0, 0, 0);
  });

  it('x 속성은 x 위치를 이동시키며 사이즈를 갱신하지 않는다.', () => {
    const rect = new stg.Rectangle(100, 100, 100, 100);
    rect.x = 80;
    expect(rect).toEqualRectangle(80, 100, 100, 100);
  });

  it('y 속성은 y 위치를 이동시키며 사이즈를 갱신하지 않는다.', () => {
    const rect = new stg.Rectangle(100, 100, 100, 100);
    rect.y = 80;
    expect(rect).toEqualRectangle(100, 80, 100, 100);
  });

  it('left 속성은 x값과 width 값을 갱신한다.', () => {
    const rect = new stg.Rectangle(100, 100, 100, 100);
    rect.left = 80;
    expect(rect).toEqualRectangle(80, 100, 120, 100);
  });

  it('right 속성은 width 값을 갱신한다.', () => {
    const rect = new stg.Rectangle(100, 100, 100, 100);
    rect.right = 220;
    expect(rect).toEqualRectangle(100, 100, 120, 100);
  });

  it('top 속성은 y값과 height 값을 갱신한다.', () => {
    const rect = new stg.Rectangle(100, 100, 100, 100);
    rect.top = 80;
    expect(rect).toEqualRectangle(100, 80, 100, 120);
  });

  it('bottom 속성은 height 값을 갱신한다.', () => {
    const rect = new stg.Rectangle(100, 100, 100, 100);
    rect.bottom = 220;
    expect(rect).toEqualRectangle(100, 100, 100, 120);
  });

  it('contains 메서드는 주어진 ( x, y ) 좌표의 포함 관계를 판단한다.', () => {
    const rect = new stg.Rectangle(100, 100, 100, 100);
    expect(rect.contains(100, 100)).toEqual(true);
    expect(rect.contains(200, 200)).toEqual(true);
    expect(rect.contains(150, 150)).toEqual(true);
    expect(rect.contains(99, 99)).toEqual(false);
    expect(rect.contains(201, 201)).toEqual(false);
  });

  it('containsRect 메서드는 주어진 Rectangle 객체의 포함 관계를 판단한다.', () => {
    const rect = new stg.Rectangle(100, 100, 100, 100);
    expect(rect.containsRect(new stg.Rectangle(20, 20, 100, 100))).toEqual(false);
    expect(rect.containsRect(new stg.Rectangle(180, 20, 100, 100))).toEqual(false);
    expect(rect.containsRect(new stg.Rectangle(20, 180, 100, 100))).toEqual(false);
    expect(rect.containsRect(new stg.Rectangle(180, 180, 100, 100))).toEqual(false);
    expect(rect.containsRect(new stg.Rectangle(120, 120, 80, 80))).toEqual(true);
  });

  it('intersects 메서드는 주어진 Rectangle 객체와의 교차를 판단한다.', () => {
    const rect = new stg.Rectangle(100, 100, 100, 100);
    expect(rect.intersects(new stg.Rectangle(20, 20, 100, 100))).toEqual(true);
    expect(rect.intersects(new stg.Rectangle(180, 20, 100, 100))).toEqual(true);
    expect(rect.intersects(new stg.Rectangle(20, 180, 100, 100))).toEqual(true);
    expect(rect.intersects(new stg.Rectangle(180, 180, 100, 100))).toEqual(true);

    expect(rect.intersects(new stg.Rectangle(0, 0, 100, 100))).toEqual(false);
    expect(rect.intersects(new stg.Rectangle(200, 0, 100, 100))).toEqual(false);
    expect(rect.intersects(new stg.Rectangle(0, 200, 100, 100))).toEqual(false);
    expect(rect.intersects(new stg.Rectangle(200, 200, 100, 100))).toEqual(false);

  });

  it('intersection 메서드는 주어진 Rectangle 객체와의 교차된 영역을 반환한다.', () => {
    const rect = new stg.Rectangle(100, 100, 100, 100);
    const intersection1 = rect.intersection(new stg.Rectangle(20, 20, 100, 100));
    expect(intersection1).toEqualRectangle(100, 100, 20, 20);

    const intersection2 = rect.intersection(new stg.Rectangle(180, 20, 100, 100));
    expect(intersection2).toEqualRectangle(180, 100, 20, 20);

    const intersection3 = rect.intersection(new stg.Rectangle(20, 180, 100, 100));
    expect(intersection3).toEqualRectangle(100, 180, 20, 20);

    const intersection4 = rect.intersection(new stg.Rectangle(180, 180, 100, 100));
    expect(intersection4).toEqualRectangle(180, 180, 20, 20);

    const intersection5 = rect.intersection(new stg.Rectangle(200, 200, 100, 100));
    expect(intersection5).toEqual(null);
  });

  it('extends 메서드는 입려된 rectangle을 포함하는 값으로 갱신한다.', () => {
    const rect1 = new stg.Rectangle(100, 100, 100, 100);
    const rect2 = new stg.Rectangle(200, 200, 50, 50);
    rect1.extends(rect2);
    expect(rect1).toEqualRectangle(100, 100, 150, 150);

    const rect3 = new stg.Rectangle(100, 100, 100, 100);
    const rect4 = new stg.Rectangle(0, 0, 50, 50);
    rect3.extends(rect4);
    expect(rect3).toEqualRectangle(0, 0, 200, 200);

    const rect5 = new stg.Rectangle(100, 100, 100, 100);
    const rect6 = new stg.Rectangle(150, 0, 100, 100);
    rect5.extends(rect6);
    expect(rect5).toEqualRectangle(100, 0, 150, 200);

    const rect7 = new stg.Rectangle(100, 100, 100, 100);
    const rect8 = new stg.Rectangle(0, 150, 100, 100);
    rect7.extends(rect8);
    expect(rect7).toEqualRectangle(0, 100, 200, 150);
  });

  it('extendsValue 메서드는 입려된 x,y,width,height를 포함하는 값으로 갱신한다.', () => { 
    const rect1 = new stg.Rectangle(100, 100, 100, 100);
    rect1.extendsValue( 200, 200, 50, 50 );
    expect(rect1).toEqualRectangle(100, 100, 150, 150);

    const rect2 = new stg.Rectangle(100, 100, 100, 100);
    rect2.extendsValue( 0, 0, 50, 50 ); 
    expect(rect2).toEqualRectangle(0, 0, 200, 200);
  });

  it('extendsPoint 메서드는 입려된 point를 포함하는 값으로 갱신한다.', () => {
    const rect1 = new stg.Rectangle(100, 100, 100, 100);
    rect1.extendsPoint( new stg.Point( 250, 250) );
    expect(rect1).toEqualRectangle(100, 100, 150, 150);

    const rect2 = new stg.Rectangle(100, 100, 100, 100);
    rect2.extendsPoint( new stg.Point( 0, 0) );
    expect(rect2).toEqualRectangle(0, 0, 200, 200);

    const rect3 = new stg.Rectangle(100, 100, 100, 100);
    rect3.extendsPoint( new stg.Point( 250, 0) );
    expect(rect3).toEqualRectangle(100, 0, 150, 200);

    const rect4 = new stg.Rectangle(100, 100, 100, 100);
    rect4.extendsPoint( new stg.Point( 0, 250) );
    expect(rect4).toEqualRectangle(0, 100, 200, 150);
  });

  it('extendsPosition 메서드는 입려된 x,y좌표를 포함하는 값으로 갱신한다.', () => {
    const rect1 = new stg.Rectangle(100, 100, 100, 100);
    rect1.extendsPosition( 250, 250 );
    expect(rect1).toEqualRectangle(100, 100, 150, 150);

    const rect2 = new stg.Rectangle(100, 100, 100, 100);
    rect2.extendsPosition( 0, 0 );
    expect(rect2).toEqualRectangle(0, 0, 200, 200);
  });
});