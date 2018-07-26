import Matrix from './matrix';

export default class Point {
  public x: number = 0;
  public y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public distance(point: Point): number {
    return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
  }

  public rotate(radian: number): Point {
    const matrix: Matrix = new Matrix(Math.cos(radian), Math.sin(radian), -Math.sin(radian), Math.cos(radian));
    const px: number = (matrix.a * this.x) + (matrix.c * this.y);
    const py: number = (matrix.b * this.x) + (matrix.d * this.y);
    return new Point(px, py);
  }

  public scale(scaleX: number, scaleY: number): Point {
    const matrix: Matrix = new Matrix(scaleX, 0, 0, scaleY);
    const px: number = (matrix.a * this.x) + (matrix.c * this.y);
    const py: number = (matrix.b * this.x) + (matrix.d * this.y);
    return new Point(px, py);
  }

  public translate(x: number, y: number): Point {
    const matrix: Matrix = new Matrix(1, 0, 0, 1, x, y);
    const px: number = (matrix.a * this.x) + (matrix.c * this.y) + matrix.tx;
    const py: number = (matrix.b * this.x) + (matrix.d * this.y) + matrix.ty;
    return new Point(px, py);
  }

  public skew(skewX: number, skewY: number): Point {
    const matrix: Matrix = new Matrix(1, Math.tan(skewX), Math.tan(skewY), 1);
    const px: number = (matrix.a * this.x) + (matrix.c * this.y);
    const py: number = (matrix.b * this.x) + (matrix.d * this.y);
    return new Point(px, py);
  }
}
