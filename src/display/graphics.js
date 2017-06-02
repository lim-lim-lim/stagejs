

stg.Graphics = ( ()=>{
    'use strict';

    const _bounds = Symbol( 'bounds' );
    const _fillStyle = Symbol( 'fillStyle' );
    const _strokeStyle = Symbol( 'strokeStyle' );
    const _lineWidth = Symbol( 'lineWidth' );
    const _lineCap = Symbol( 'lineCap' );
    const _lineJoin = Symbol( 'lineJoin' );
    const _miterLimit = Symbol( 'miterLimit' );
    const _commands = Symbol( 'commands' );
    const _addCommand = Symbol( 'addCommand' );

    class Graphics {

        constructor(){
            this[ _commands ] = new Set();
            this[ _fillStyle ] = null;
            this[ _strokeStyle ] = null;
            this[ _lineCap ] = null;
            this[ _lineJoin ] = null;
            this[ _miterLimit ] = null;
            this[ _lineWidth ] = null;
            this[ _bounds ] = null;
        }

        get bounds(){
            return this[ _bounds ];
        }

        get commands(){
            return this[ _commands ];
        }

        get commandList(){
            return this[ _commands ].values();
        }

        get fillStyle(){
            return this[ _fillStyle ];
        }

        get strokeStyle(){
            return this[ _strokeStyle ];
        }

        get lineCap(){
            return this[ _lineCap ];
        }

        get lineJoin(){
            return this[ _lineJoin ];
        }

        get miterLimit(){
            return this[ _miterLimit ];
        }

        get lineWidth(){
            return this[ _lineWidth ];
        }

        set bounds( value ){
            this[ _bounds ] = value;
        }

        set fillStyle( value ){
            this[ _fillStyle ] = value;
        }

        set strokeStyle( value ){
            this[ _strokeStyle ] = value;
        }

        set lineCap( value ){
            this[ _lineCap ] = value;
        }

        set lineJoin( value ){
            this[ _lineJoin ] = value;
        }

        set miterLimit( value ){
            this[ _miterLimit ] = value;
        }

        set lineWidth( value ){
            this[ _lineWidth ] = value;
        }


        rect( x, y, width, height ){
            this[ _addCommand ]( 'rect', arguments );
            return this;
        }

        fillRect( x, y, width, height ){
            this[ _addCommand ]( 'fillRect', arguments );
            return this;
        }

        strokeRect( x, y, width, height ){
            this[ _addCommand ]( 'strokeRect', arguments );
            return this;
        }

        clearRect( x, y, width, height ){
            this[ _addCommand ]( 'clearRect', arguments );
            return this;
        }

        beginPath(){
            this[ _addCommand ]( 'beginPath' );
            return this;
        }

        closePath(){
            this[ _addCommand ]( 'closePath' );
            return this;
        }

        moveTo( x, y ){
            this[ _addCommand ]( 'moveTo', arguments );
            return this;
        }

        lineTo( x, y ){
            this[ _addCommand ]( 'lineTo', arguments );
            return this;
        }

        arc( x, y, radius, startAngle, endAngle, anticlockwise ){
            this[ _addCommand ]( 'arc', arguments );
            return this;
        }

        arcTo( x1, y1, x2, y2, radius ){
            this[ _addCommand ]( 'arcTo', arguments );
            return this;
        }

        quadraticCurveTo( cp1x, cp1y, x, y ){
            this[ _addCommand ]( 'quadraticCurveTo', arguments );
            return this;
        }

        bezierCurveTo( cp1x, cp1y, cp2x, cp2y, x, y ){
            this[ _addCommand ]( 'bezierCurveTo', arguments );
            return this;
        }

        fill(){
            this[ _addCommand ]( 'fill' );
            return this;
        }

        stroke(){
            this[ _addCommand ]( 'stroke' );
            return this;
        }

        clear(){
            this[ _commands ].clear();
            return this;
        }

        [ _addCommand ]( name, args ){
            this[ _commands ].add( {
                name:name, arguments:args,
                fillStyle: this[ _fillStyle ], strokeStyle: this[ _strokeStyle ],
                lineWidth: this[ _lineWidth ], lineCap: this[ _lineCap ],
                lineJoin: this[ _lineJoin ], miterLimit: this[ _miterLimit ]
            });
        }
    }

    return Graphics;
})();