import Point from "./point";

export default class Rectangle{
    
  private _width:number = 0;
  private _height:number = 0;
  private _leftTop:Point = null;
  private _rightTop:Point = null;
  private _leftBottom:Point = null;
  private _rightBottom:Point = null;

  public get width():number{ return this._width; }
  public get height():number{ return this._height; }
  public get left():number{ return this._leftTop.x; }
  public get right():number{ return this._rightTop.x; }
  public get top():number{ return this._leftTop.y; }
  public get bottom():number{ return this._leftBottom.y; }
  public get leftTop():Point{ return this._leftTop; }
  public get rightTop():Point{ return this._rightTop; }
  public get leftBottom():Point{ return this._leftBottom; }
  public get rightBottom():Point{ return this._rightBottom; }

  public set width( value:number ){ 
    this._width = value;
    this._updateRight();
  }

  public set height( value:number ){
      this._height = value;
      this._updateBottom();
  }

  public set left( value:number ){
      this.leftTop.x = value;
      this.leftBottom.x = value;
      this._updateWidth();
  }

  public set right( value:number ){
      this.rightTop.x = value;
      this.rightBottom.x = value;
      this._updateWidth();
  }

  public set top( value:number ){
      this.leftTop.y = value;
      this.rightTop.y = value;
      this._updateHeight();
  }

  public set bottom( value:number ){
      this.leftBottom.y = value;
      this.rightBottom.y = value;
      this._updateHeight();
  }

  public set leftTop( point:Point ){
      this._leftTop = point;
      this._updateWidth();
      this._updateHeight();
  }

  public set rightTop( point:Point ){
      this._rightTop = point;
      this._updateWidth();
      this._updateHeight();
  }

  public set leftBottom( point:Point ){
      this._leftBottom = point;
      this._updateWidth();
      this._updateHeight();
  }

  public set rightBottom( point:Point ){
      this._rightBottom = point;
      this._updateWidth();
      this._updateHeight();
  }

  constructor( x:number=0, y:number=0, width:number=0, height:number=0  ){
    this._leftTop = new Point();
    this._rightTop = new Point();
    this._leftBottom = new Point();
    this._rightBottom = new Point();
    this.setTo( x, y, width, height );
  }

  public contains( x:number, y:number ):boolean{
    return x >= this.left && x <= this.right && y <= this.bottom && y >= this.top;
  }

  public containsRect( rectangle:Rectangle ):boolean{
      return rectangle.left >= this.left && rectangle.right <= this.right && rectangle.top >= this.top && rectangle.bottom <= this.bottom;
  }

  public intersects( rectangle:Rectangle ):boolean{
      return this.contains( rectangle.left+1, rectangle.top+1 ) || this.contains( rectangle.left+1, rectangle.bottom-1 ) || this.contains( rectangle.right-1, rectangle.top+1 ) || this.contains( rectangle.right-1, rectangle.bottom-1 );
  }

  public intersection( rectangle:Rectangle ):Rectangle{
      let result:Rectangle = null;
      if( this.intersects( rectangle ) ){
          result = new Rectangle();
          result.left = Math.max( rectangle.left, this.left );
          result.right = Math.min( rectangle.right, this.right );
          result.top = Math.max( rectangle.top, this.top );
          result.bottom = Math.min( rectangle.bottom, this.bottom );
      }
      return result;
  }

  public extends( rectangle:Rectangle ):void{
      let left = Math.min( this.left, rectangle.left );
      let right = Math.max( this.right, rectangle.right );
      let top = Math.min( this.top, rectangle.top );
      let bottom = Math.max( this.bottom, rectangle.bottom );
      this.left = left;
      this.right = right;
      this.top = top;
      this.bottom = bottom;
  }

  public setTo( x:number, y:number, width:number, height:number ):void{
      this.left = x;
      this.top = y;
      this.width = width;
      this.height = height;
  }

  public clone():Rectangle{
      return new Rectangle( this.left, this.top, this.width, this.height );
  }

  public reset():void{
      this.setTo( 0, 0, 0, 0 );
  }

  public equals( rectangle:Rectangle ):boolean{
      return this.left === rectangle.left && this.top === rectangle.top && this.right === rectangle.right && this.bottom === rectangle.bottom && this.width === rectangle.width && this.height === rectangle.height;
  }

  private _updateWidth():void{ 
    this._width = this._rightTop.x - this._leftTop.x;
  }

  private _updateHeight():void{
      this._height = this._leftBottom.y - this._leftTop.y;
  }

  private _updateRight():void{ 
    this._rightBottom.x = this._rightTop.x = this._leftTop.x + this._width;
  }

  private _updateBottom():void{
      this._leftBottom.y = this._rightBottom.y = this._leftTop.y + this._height;
  }
}