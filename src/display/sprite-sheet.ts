import EventDispatcher from "../event/event-dispatcher";
import Rectangle from "../geom/rectangle";


enum SpriteSheetEvent{
  LOAD='load'
}

interface Frame{
  [index:string]:number;
}

export default class SpriteSheet extends EventDispatcher{

  public static readonly LOAD:SpriteSheetEvent = SpriteSheetEvent.LOAD;

  private _image:HTMLImageElement = null;
  private _cellWidth:number = 0;
  private _cellHeight:number = 0;
  private _frames:Frame[] = null;
  private _frameIndex:number = -1;
  private _currentBounds:Rectangle = null;
  private _loop:boolean = false;

  public get image():HTMLImageElement{ return this._image; }
  public get cellWidth():number{ return this._cellWidth; }
  public get cellHeight():number{ return this._cellHeight; }
  public get currentBounds(){ return this._currentBounds; }

  constructor( img:HTMLImageElement|string, cellWidth:number, cellHeight:number, frames:Frame[], loop:boolean=false){
    super();
    
    if( img instanceof HTMLImageElement ){
      this._image = img;
      this.trigger( SpriteSheet.LOAD );
    }else if( typeof img === 'string' ){
      this._image = new Image();
      this._image.src = img;
      this._image.addEventListener( 'load', ()=>this.trigger( SpriteSheet.LOAD ) );
    }

    this._cellWidth = cellWidth;
    this._cellHeight = cellHeight;
    this._frames = frames;
    this._frameIndex = -1;
    this._currentBounds = new Rectangle( 0, 0, cellWidth, cellHeight );
    this._loop = loop;
  }

  public next():void{
    if( this._frameIndex+1 <= this._frames.length-1 ){
        this._frameIndex++;
    }else{
      if( this._loop ){
          this._frameIndex = 0;
      }
    }
    this._updateBounds();
  }

  public prev():void{
    if( this._frameIndex-1 > 0 ){
      this._frameIndex--;
    }else{
      if( this._loop ){
        this._frameIndex = this._frames.length-1;
      }
    }
    this._updateBounds();
  }

  private _updateBounds():void{
      const currentFrame = this._frames[ this._frameIndex ];
      this._currentBounds.left = currentFrame[ 0 ] * this._cellWidth;
      this._currentBounds.top = currentFrame[ 1 ] * this._cellHeight;
  }
}