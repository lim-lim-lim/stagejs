

describe('[ Bounds Test ]', () => {
  "use strict";
  const canvas = document.createElement('canvas');
  const stage = new stg.Stage(canvas);
  beforeEach(() => {
    const rectanglePropList = ['left', 'top', 'width', 'height'];
    jasmine.addMatchers({
      toEqualRectangle: () => {
        return {
          compare: (actual, ...rectangleProp) => {
            const result = {};
            result.message = '';
            result.pass = true;
            rectanglePropList.forEach((item, index) => {
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

  describe( 'Shape Bounds : ', ()=>{
    describe( 'Shape의 bounds는 Graphics객체의 bounds를 포함한다.', ()=>{
      it('FillRect Bounds 1', () => {
        const g = new stg.Graphics();
        const s = new stg.Shape(g);
        g.fillRect( 0, 0, 100, 100 );
        s.x = 100; 
        s.y = 100;
        expect(s.bounds).toEqualRectangle(100, 100, 100, 100);
      });
  
      it('FillRect Bounds 2', () => {
        const g = new stg.Graphics();
        const s = new stg.Shape(g);
        g.fillRect( 0, 0, 100, 100 );
        g.fillRect( 100, 100, 100, 100 );
        s.x = 100; 
        s.y = 100;
        expect(s.bounds).toEqualRectangle(100, 100, 200, 200);
      });
  
      it('StrokeRect Bounds lineWidth:0', () => {
        const g = new stg.Graphics();
        const s = new stg.Shape(g);
        g.strokeRect( 0, 0, 100, 100 );
        s.x = 100; 
        s.y = 100;
        expect(s.bounds).toEqualRectangle(100, 100, 100, 100);
      });
  
      it('StrokeRect Bounds lineWidth:10', () => {
        const g = new stg.Graphics();
        const s = new stg.Shape(g);
        g.lineWidth = 10;
        g.strokeRect( 0, 0, 100, 100 );
        s.x = 100; 
        s.y = 100;
        expect(s.bounds).toEqualRectangle(100, 100, 120, 120);
      });
  
      it('StrokeRect Bounds lineTo moveTo', () => {
        const g = new stg.Graphics();
        const s = new stg.Shape(g); 
        g.lineWidth = 10;
        g.strokeRect( 0, 0, 100, 100 );
        s.x = 100; 
        s.y = 100;
        expect(s.bounds).toEqualRectangle(100, 100, 120, 120);
      });
    });
  });
  /*
  describe( 'Display Container Bounds : ', ()=>{
    describe( 'DisplayContainer의 bounds는 복수의 자식 영역을 포함한다. : ', ()=>{

      it( '자식이 Shape일 때 ', ()=>{

      });
    });
  });
  */
});