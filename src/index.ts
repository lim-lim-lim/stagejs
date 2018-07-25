
import Stage from './display/stage';
import Display from './display/display';
import DisplayContainer from './display/display-container';
import Graphics from './display/graphics';
import Shape from './display/shape';
import Sprite from './display/sprite';
import SpriteSheet from './display/sprite-sheet';
import EventDispatcher from './event/event-dispatcher';
import Event from './event/event';
import MouseEvent from './event/mouse-event';
import Matrix from './geom/matrix';
import Point from './geom/point';
import Rectangle from './geom/rectangle';
import Ticker from './util/ticker';

const stg = {
  Stage,
  Display,
  DisplayContainer,
  Graphics,
  Shape,
  Sprite,
  SpriteSheet,
  EventDispatcher,
  Event,
  MouseEvent,
  Matrix,
  Point,
  Rectangle,
  Ticker,
};

(window as any).stg = stg;

export default stg;
