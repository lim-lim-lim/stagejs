
describe('[ Matrix Test ]', () => {
  "use strict";

  beforeEach(() => {
    const matrixPropList = ['a', 'b', 'c', 'd', 'tx', 'ty'];
    jasmine.addMatchers({
      toEqualMatrix: () => {
        return {
          compare: (actual, ...matrixProp) => {
            const result = {};
            result.message = '';
            result.pass = true;
            matrixPropList.forEach((item, index) => {
              if (actual[item] !== matrixProp[index]) {
                result.message += item + ' 값이 일치하지 않습니다. ( 입력 값 : ' + actual[item] + ', 기대 값 : ' + matrixProp[index] + ' ) \n';
                result.pass = false;
              }
            });
            return result;
          }
        }
      }
    });
  });

  it('new Matrix()는 단위 행렬을 생성한다.', () => {
    const matrix = new stg.Matrix();
    expect(matrix).toEqualMatrix(1, 0, 0, 1, 0, 0);
  });

  it('multi 메서드는 행렬 곱을 수행한다.', () => {
    const matrix1 = new stg.Matrix(1, 2, 3, 4, 5, 6);
    const matrix2 = new stg.Matrix(1, 2, 3, 4, 5, 6);
    matrix1.multi(matrix2);
    expect(matrix1).toEqualMatrix(7, 10, 15, 22, 28, 40);
  });

  it('multi 메서드의 인자가 1개의 숫자형일 경우 실수배 한다.', () => {
    const matrix = new stg.Matrix(1, 2, 3, 4, 5, 6);
    matrix.multi(2);
    expect(matrix).toEqualMatrix(2, 4, 6, 8, 10, 12);
  });

  it('inverse 메서드의 역행렬을 반환한다.', () => {
    let matrix1 = new stg.Matrix(1, 2, 3, 4, 5, 6);
    let matrix2 = matrix1.clone();
    matrix1.multi(matrix2.inverse());
    expect( matrix1 ).toEqualMatrix(1, 0, 0, 1, 0, 0);

    matrix1 = new stg.Matrix(1, 0, 2, 1, 3, 5);
    matrix2 = matrix1.clone();
    matrix1.multi(matrix2.inverse());
    expect(matrix1).toEqualMatrix(1, 0, 0, 1, 0, 0);
  });

  it('translate 메서드는 이동 변환 행렬을 적용 한다.', () => {
    const matrix = new stg.Matrix();
    matrix.translate(100, 200);
    expect(matrix).toEqualMatrix(1, 0, 0, 1, 100, 200);
    matrix.translate(100, 200);
    expect(matrix).toEqualMatrix(1, 0, 0, 1, 200, 400);
    matrix.reset();
    matrix.translate(100, 200);
    expect(matrix).toEqualMatrix(1, 0, 0, 1, 100, 200);
  });

  it('rotate 메서드는 회전(z축) 변환 행렬을 적용 한다.', () => {
    const matrix = new stg.Matrix();
    matrix.rotate(Math.PI);
    expect(matrix).toEqualMatrix(Math.cos(Math.PI), Math.sin(Math.PI), -Math.sin(Math.PI), Math.cos(Math.PI), 0, 0);
    matrix.rotate(Math.PI);
    const PI2 = Math.PI * 2;
    expect(matrix).toEqualMatrix(Math.cos(PI2), Math.sin(PI2), -Math.sin(PI2), Math.cos(PI2), 0, 0);
    matrix.reset();
    matrix.rotate(Math.PI);
    expect(matrix).toEqualMatrix(Math.cos(Math.PI), Math.sin(Math.PI), -Math.sin(Math.PI), Math.cos(Math.PI), 0, 0);
  });

  it('scale 메서드는 닮음 꼴 변환 행렬을 적용 한다.', () => {
    const matrix = new stg.Matrix();
    matrix.scale(2, 2);
    expect(matrix).toEqualMatrix(2, 0, 0, 2, 0, 0);
    matrix.scale(2, 2);
    expect(matrix).toEqualMatrix(4, 0, 0, 4, 0, 0);
    matrix.reset();
    matrix.scale(2, 2);
    expect(matrix).toEqualMatrix(2, 0, 0, 2, 0, 0);
  });

  it('skew 메서드는 비틀기 변환 행렬을 적용 한다.', () => {
    const matrix = new stg.Matrix();
    matrix.skew(Math.PI, Math.PI);
    expect(matrix).toEqualMatrix(1, Math.tan(Math.PI), Math.tan(Math.PI), 1, 0, 0);
    matrix.skew(Math.PI, Math.PI);
    const PI2 = Math.PI * 2;
    expect(matrix).toEqualMatrix(1, Math.tan(PI2), Math.tan(PI2), 1, 0, 0);
    matrix.reset();
    matrix.skew(Math.PI, Math.PI);
    expect(matrix).toEqualMatrix(1, Math.tan(Math.PI), Math.tan(Math.PI), 1, 0, 0);
  });

  it('clone 메서드는 자신의 원소값과 같은 새로은 객체를 반환한다.', () => {
    const matrix1 = new stg.Matrix(1, 2, 3, 4, 5, 6);
    const matrix2 = matrix1.clone();
    expect(matrix2).toEqualMatrix(1, 2, 3, 4, 5, 6);
  });

  it('reset 메서드는 단위 행렬로 초기화 한다.', () => {
    let matrix = new stg.Matrix(1, 2, 3, 4, 5, 6);
    matrix.reset();
    expect(matrix).toEqualMatrix(1, 0, 0, 1, 0, 0);
  });
});