## StageJS

Canvas 2D Javascript Library

### Hello Rect
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Rect</title>
</head>
<body>
<h1>Hello Rect</h1>
<canvas id="world" width="500" height="300"></canvas>
<script src="../dist/stage.js"></script>
<script>
    const stage = new stg.Stage( 'world' );
    const graphics = new stg.Graphics();
    graphics.fillStyle = '#F08';
    graphics.strokeStyle = '#903';
    graphics.lineWidth = 5;
    graphics.fillRect( 0, 0, 100, 100 );
    graphics.strokeRect( 0, 0, 100, 100 );
    const rect = new stg.Shape( graphics );
    rect.rotate = 0.5;
    rect.width = 100;
    rect.height = 100;
    rect.x = 100;
    rect.y = 50;
    stage.addChild( rect );
    stage.update();
</script>
</body>
</html>
```
![](../assets/screenshot/01.rect.png)



### Graphics
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Graphics</title>
</head>
<body>
<h1>Graphics</h1>
<canvas id="world" width="500" height="300"></canvas>
<script src="../dist/stage.js"></script>
<script>
    const stage = new stg.Stage( 'world' );
    const graphics = new stg.Graphics();
    const PI2 = Math.PI*2;
    graphics.lineWidth = 5;
    graphics.strokeStyle = '#903';
    graphics.fillStyle = '#F08';
    graphics.beginPath();
    graphics.arc( 0, 0, 50, 0, PI2, false );
    graphics.stroke();
    graphics.fill();
    graphics.strokeStyle = '#903';
    graphics.beginPath();
    graphics.arc( -20, -25, 8, Math.PI, 0, false );
    graphics.stroke();
    graphics.beginPath();
    graphics.arc( 20, -25, 8, Math.PI, 0, false );
    graphics.stroke();
    graphics.beginPath();
    graphics.arc( 0, 15, 20, Math.PI, 0, true );
    graphics.stroke();
    graphics.fillStyle = '#903';
    graphics.beginPath();
    graphics.arc( -20, -10, 8, 0, PI2, false );
    graphics.arc( 20, -10, 8, 0, PI2, false );
    graphics.fill();
    graphics.fillStyle = '#FFF';
    graphics.beginPath();
    graphics.arc( -22, -12, 3, 0, PI2, false );
    graphics.arc( 18, -12, 3, 0, PI2, false );
    graphics.fill();
    const shape1 = new stg.Shape( graphics );
    shape1.x = 60;
    shape1.y = 60;
    const shape2 = new stg.Shape( graphics );
    shape2.x = 200;
    shape2.y = 100;
    shape2.scaleX = 1.5;
    shape2.rotate = 0.3;
    const shape3 = new stg.Shape( graphics );
    shape3.x = 350;
    shape3.y = 150;
    shape3.scaleY = 1.5;
    shape3.rotate = -0.5;
    const shape4 = new stg.Shape( graphics );
    shape4.x = 60;
    shape4.y = 150;
    shape4.scaleX = 0.3;
    shape4.scaleY = 0.3;
    shape4.rotate = Math.PI;
    stage.addChild( shape1 );
    stage.addChild( shape2 );
    stage.addChild( shape3 );
    stage.addChild( shape4 );
    stage.update();
</script>
</body>
</html>
```

#### Transform
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Transform</title>
    <style>
        #container{
            width:650px;
        }
        #world{
            float: left;
            display: inline-block;
            border:  1px solid gray;
        }
        .options{
            float: left;
            display: inline-block;
            border:  1px solid gray;
            width: 300px;
            height:300px;
            font-size: 12px;
        }
        .options .options_container{
            padding: 10px;
        }
        .options_container div{
            margin-bottom: 5px;
            height: 25px;
        }
        .options label{
            width: 100px;
            display: inline-block;
        }
    </style>
</head>
<body>
<h1>Transform</h1>

<div id="container">
    <canvas id="world" width="300" height="300"></canvas>
    <div class="options">
        <div class="options_container">
            <div>
                <label for="translate_x">Translate X</label>
                <input type="range" id="translate_x" name="translate_x" min="0" max="300" value="150">
            </div>
            <div>
                <label for="translate_y">Translate Y</label>
                <input type="range" id="translate_y" name="translate_y" min="0" max="300" value="150">
            </div>
            <div>
                <label for="scale_x">Scale X</label>
                <input type="range" id="scale_x" name="scale_x" min="0.1" max="2" value="1" step="0.1">
            </div>
            <div>
                <label for="scale_y">Scale Y</label>
                <input type="range" id="scale_y" name="scale_y" min="0.1" max="2" value="1" step="0.1">
            </div>
            <div>
                <label for="skew_x">Skew X</label>
                <input type="range" id="skew_x" name="skew_x" min="0" max="3.14" value="0" step="0.1">
            </div>
            <div>
                <label for="skew_y">Skew Y</label>
                <input type="range" id="skew_y" name="skew_y" min="0" max="3.14" value="0" step="0.1">
            </div>
            <div>
                <label for="rotate">Rotate</label>
                <input type="range" id="rotate" name="rotate" min="0" max="6.28" value="0" step="0.1">
            </div>
        </div>
    </div>
</div>

<script src="../dist/stage.js"></script>
<script>
    const stage = new stg.Stage( 'world' );
    const graphics = new stg.Graphics();
    const PI2 = Math.PI*2;
    graphics.lineWidth = 5;
    graphics.strokeStyle = '#903';
    graphics.fillStyle = '#F08';
    graphics.beginPath();
    graphics.arc( 0, 0, 50, 0, PI2, false );
    graphics.stroke();
    graphics.fill();
    graphics.strokeStyle = '#903';
    graphics.beginPath();
    graphics.arc( -20, -25, 8, Math.PI, 0, false );
    graphics.stroke();
    graphics.beginPath();
    graphics.arc( 20, -25, 8, Math.PI, 0, false );
    graphics.stroke();
    graphics.beginPath();
    graphics.arc( 0, 15, 20, Math.PI, 0, true );
    graphics.stroke();
    graphics.fillStyle = '#903';
    graphics.beginPath();
    graphics.arc( -20, -10, 8, 0, PI2, false );
    graphics.arc( 20, -10, 8, 0, PI2, false );
    graphics.fill();
    graphics.fillStyle = '#FFF';
    graphics.beginPath();
    graphics.arc( -22, -12, 3, 0, PI2, false );
    graphics.arc( 18, -12, 3, 0, PI2, false );
    graphics.fill();
    const shape = new stg.Shape( graphics );
    shape.x = 150;
    shape.y = 150;
    stage.addChild( shape );
    stage.update();
    document.getElementById( 'translate_x' ).addEventListener( 'input', ( event )=>{
        shape.x = parseFloat( event.target.value );
        stage.update();
    });
    document.getElementById( 'translate_y' ).addEventListener( 'input', ( event )=>{
        shape.y = parseFloat( event.target.value );
        stage.update();
    });
    document.getElementById( 'scale_x' ).addEventListener( 'input', ( event )=>{
        shape.scaleX = parseFloat( event.target.value );
        stage.update();
    });
    document.getElementById( 'scale_y' ).addEventListener( 'input', ( event )=>{
        shape.scaleY = parseFloat( event.target.value );
        stage.update();
    });
    document.getElementById( 'skew_x' ).addEventListener( 'input', ( event )=>{
        shape.skewX = parseFloat( event.target.value );
        stage.update();
    });
    document.getElementById( 'skew_y' ).addEventListener( 'input', ( event )=>{
        shape.skewY = parseFloat( event.target.value );
        stage.update();
    });
    document.getElementById( 'rotate' ).addEventListener( 'input', ( event )=>{
        shape.rotate = parseFloat( event.target.value );
        stage.update();
    });
</script>
</body>
</html>
```

#### Rotate
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Rotate</title>
    <style>
        #container{
            width:650px;
        }
        #world{
            float: left;
            display: inline-block;
            border:  1px solid gray;
        }
        .options{
            float: left;
            display: inline-block;
            border:  1px solid gray;
            width: 300px;
            height:300px;
            font-size: 12px;
        }
        .options .options_container{
            padding: 10px;
        }
        .options_container div{
            margin-bottom: 5px;
            height: 25px;
        }
        .options label{
            width: 100px;
            display: inline-block;
        }
    </style>
</head>
<body>

<h1>Rotate</h1>

<div id="container">
    <canvas id="world" width="300" height="300"></canvas>
    <div class="options">
        <div class="options_container">
            <div>
                <label for="center_x">Center X</label>
                <input type="range" id="center_x" name="center_x" min="0" max="80" value="0">
            </div>
            <div>
                <label for="center_y">Center Y</label>
                <input type="range" id="center_y" name="center_y" min="0" max="80" value="0">
            </div>
            <div>
                <label for="translate_x">Translate X</label>
                <input type="range" id="translate_x" name="translate_x" min="0" max="300" value="50">
            </div>
            <div>
                <label for="translate_y">Translate Y</label>
                <input type="range" id="translate_y" name="translate_y" min="0" max="300" value="50">
            </div>
            <div>
                <label for="rotate">Rotate</label>
                <input type="range" id="rotate" name="rotate" min="0" max="6.3" value="0" step="0.1">
            </div>
        </div>
    </div>
</div>

<script src="../dist/stage.js"></script>
<script>
    const stage = new stg.Stage( 'world' );
    const rectGraphics = new stg.Graphics();
    const pointGraphics = new stg.Graphics();
    rectGraphics.lineWidth = 5;
    rectGraphics.strokeStyle = '#903';
    rectGraphics.fillStyle = '#F08';
    rectGraphics.fillRect( 0, 0, 80, 80 );
    rectGraphics.strokeRect( 0, 0, 80, 80);
    rectGraphics.fillStyle = '#903';
    rectGraphics.fillRect( 15, 25, 15, 5 );
    rectGraphics.fillRect( 50, 25, 15, 5 );
    rectGraphics.fillRect( 25, 55, 30, 5 );
    pointGraphics.lineWidth = 5;
    pointGraphics.fillStyle = '#3F0';
    pointGraphics.strokeStyle = '#293';
    pointGraphics.arc( 0, 0, 5, 0, Math.PI*2, false );
    pointGraphics.fill();
    pointGraphics.stroke();
    const rect = new stg.Shape( rectGraphics );
    const point = new stg.Shape( pointGraphics );
    rect.x = 50;
    rect.y = 50;
    point.x = rect.x + rect.centerX;
    point.y = rect.y + rect.centerY;
    stage.addChild( rect );
    stage.addChild( point );
    stage.update();
    document.getElementById( 'center_x' ).addEventListener( 'input', ( event )=>{
        rect.centerX = parseFloat( event.target.value );
        point.x = rect.x + rect.centerX;
        stage.update();
    });
    document.getElementById( 'center_y' ).addEventListener( 'input', ( event )=>{
        rect.centerY = parseFloat( event.target.value );
        point.y = rect.y + rect.centerY;
        stage.update();
    });
    document.getElementById( 'translate_x' ).addEventListener( 'input', ( event )=>{
        rect.x = parseFloat( event.target.value );
        point.x = rect.x + rect.centerX;
        stage.update();
    });
    document.getElementById( 'translate_y' ).addEventListener( 'input', ( event )=>{
        rect.y = parseFloat( event.target.value );
        point.y = rect.y + rect.centerY;
        stage.update();
    });
    document.getElementById( 'rotate' ).addEventListener( 'input', ( event )=>{
        rect.rotate = parseFloat( event.target.value );
        stage.update();
    });
</script>
</body>
</html>
```

#### Display Object Container
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Display Container</title>
    <style>
        #container{
            width:650px;
        }
        #world{
            float: left;
            display: inline-block;
            border:  1px solid gray;
        }
        .options{
            float: left;
            display: inline-block;
            border:  1px solid gray;
            width: 300px;
            height:300px;
            font-size: 12px;
        }
        .options .options_container{
            padding: 10px;
        }
        .options_container div{
            margin-bottom: 5px;
            height: 25px;
        }
        .options label{
            width: 100px;
            display: inline-block;
        }
    </style>
</head>
<body>

<h1>Display Container</h1>

<div id="container">
    <canvas id="world" width="300" height="300"></canvas>
    <div class="options">
        <div class="options_container">
            <div>
                <button id="btn_add" >ADD CHILD</button>
                <button id="btn_remove" >REMOVE CHILD</button>
            </div>
            <div>
                <label for="translate_x">Translate X</label>
                <input type="range" id="translate_x" name="translate_x" min="-150" max="150" value="0">
            </div>
            <div>
                <label for="translate_y">Translate Y</label>
                <input type="range" id="translate_y" name="translate_y" min="-150" max="150" value="0">
            </div>
            <div>
                <label for="scale_x">Scale X</label>
                <input type="range" id="scale_x" name="scale_x" min="0.1" max="2" value="1" step="0.1">
            </div>
            <div>
                <label for="scale_y">Scale Y</label>
                <input type="range" id="scale_y" name="scale_y" min="0.1" max="2" value="1" step="0.1">
            </div>
            <div>
                <label for="skew_x">Skew X</label>
                <input type="range" id="skew_x" name="skew_x" min="0" max="3.14" value="0" step="0.1">
            </div>
            <div>
                <label for="skew_y">Skew Y</label>
                <input type="range" id="skew_y" name="skew_y" min="0" max="3.14" value="0" step="0.1">
            </div>
            <div>
                <label for="rotate">Rotate</label>
                <input type="range" id="rotate" name="rotate" min="0" max="6.28" value="0" step="0.1">
            </div>
        </div>
    </div>
</div>

<script src="../dist/stage.js"></script>
<script>
    const stage = new stg.Stage( 'world' );
    const parent = new stg.DisplayContainer();
    parent.centerX = 150;
    parent.centerY = 150;
    stage.addChild( parent );
    document.getElementById( 'btn_add' ).addEventListener( 'click', ( event )=>{
        const g = new stg.Graphics();
        g.fillStyle = 'rgb('+rand( 0, 255 )+','+rand( 0, 255 )+','+rand( 0, 255 )+')';
        g.fillRect( 0, 0, rand( 30, 50 ), rand( 30, 50 ) );
        const child = new stg.Shape( g );
        child.width = 1;
        child.height = 1;
        child.x = rand( 0, 290 );
        child.y = rand( 0, 290 );
        parent.addChild( child );
        stage.update();
    });
    document.getElementById( 'btn_remove' ).addEventListener( 'click', ()=>{
        parent.removeChildAt( parent.childList.length-1 );
        stage.update();
    });
    document.getElementById( 'translate_x' ).addEventListener( 'input', ( event )=>{
        parent.x = parseFloat( event.target.value );
        stage.update();
    });
    document.getElementById( 'translate_y' ).addEventListener( 'input', ( event )=>{
        parent.y = parseFloat( event.target.value );
        stage.update();
    });
    document.getElementById( 'scale_x' ).addEventListener( 'input', ( event )=>{
        parent.scaleX = parseFloat( event.target.value );
        stage.update();
    });
    document.getElementById( 'scale_y' ).addEventListener( 'input', ( event )=>{
        parent.scaleY = parseFloat( event.target.value );
        stage.update();
    });
    document.getElementById( 'skew_x' ).addEventListener( 'input', ( event )=>{
        parent.skewX = parseFloat( event.target.value );
        stage.update();
    });
    document.getElementById( 'skew_y' ).addEventListener( 'input', ( event )=>{
        parent.skewY = parseFloat( event.target.value );
        stage.update();
    });
    document.getElementById( 'rotate' ).addEventListener( 'input', ( event )=>{
        parent.rotate = parseFloat( event.target.value );
        stage.update();
    });
    const rand = ( min, max )=>{
        return Math.floor( Math.random() * ( max-min+1 ) ) + min;
    }
</script>
</body>
</html>
```

#### Ticker
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Ticker</title>
    <style>
        #container{
            width:650px;
        }
        #world{
            float: left;
            display: inline-block;
            border:  1px solid gray;
        }
        .options{
            float: left;
            display: inline-block;
            border:  1px solid gray;
            width: 300px;
            height:300px;
            font-size: 12px;
        }
        .options .options_container{
            padding: 10px;
        }
        .options_container div{
            margin-bottom: 5px;
            height: 25px;
        }
    </style>
</head>
<body>

<h1>Ticker</h1>

<div id="container">
    <canvas id="world" width="300" height="300"></canvas>
    <div class="options">
        <div class="options_container">
            <div>
                <button id="btn_start" >START</button>
                <button id="btn_stop" >STOP</button>
            </div>
        </div>
    </div>
</div>

<script src="../dist/stage.js"></script>
<script>
    const stage = new stg.Stage( 'world' );
    const graphics = new stg.Graphics();
    const PI2 = Math.PI*2;
    graphics.lineWidth = 5;
    graphics.strokeStyle = '#903';
    graphics.fillStyle = '#F08';
    graphics.beginPath();
    graphics.arc( 0, 0, 50, 0, PI2, false );
    graphics.stroke();
    graphics.fill();
    graphics.strokeStyle = '#903';
    graphics.beginPath();
    graphics.arc( -20, -25, 8, Math.PI, 0, false );
    graphics.stroke();
    graphics.beginPath();
    graphics.arc( 20, -25, 8, Math.PI, 0, false );
    graphics.stroke();
    graphics.beginPath();
    graphics.arc( 0, 15, 20, Math.PI, 0, true );
    graphics.stroke();
    graphics.fillStyle = '#903';
    graphics.beginPath();
    graphics.arc( -20, -10, 8, 0, PI2, false );
    graphics.arc( 20, -10, 8, 0, PI2, false );
    graphics.fill();
    graphics.fillStyle = '#FFF';
    graphics.beginPath();
    graphics.arc( -22, -12, 3, 0, PI2, false );
    graphics.arc( 18, -12, 3, 0, PI2, false );
    graphics.fill();
    const shape = new stg.Shape( graphics );
    shape.x = 150;
    shape.y = 150;
    stage.addChild( shape );
    stage.update();
    const ticker = new stg.Ticker( 40 );
    let scaleValue = 0.1;
    ticker.on( stg.Ticker.TICK, ()=>{
        shape.rotate += 0.01;
        shape.scaleX = shape.scaleY += scaleValue;
        if( shape.scaleX > 5 ){
            shape.scaleX = shape.scaleY = 5;
            scaleValue *= -1;
        }
        else if( shape.scaleX < 0.2  ){
            shape.scaleX = shape.scaleY = 0.2;
            scaleValue *= -1;
        }
        stage.update();
    });
    document.getElementById( 'btn_start' ).addEventListener( 'click', ()=>{
       ticker.run();
    });
    document.getElementById( 'btn_stop' ).addEventListener( 'click', ()=>{
       ticker.stop();
    });
</script>
</body>
</html>
```

#### Sprite
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sprite</title>
    <style>
        #container{
            width:650px;
        }
        #stage{
            float: left;
            display: inline-block;
            border:  1px solid gray;
        }
        .options{
            float: left;
            display: inline-block;
            border:  1px solid gray;
            width: 300px;
            height:300px;
            font-size: 12px;
        }
        .options .options_container{
            padding: 10px;
        }
        .options_container div{
            margin-bottom: 5px;
            height: 25px;
        }
        .options label{
            width: 100px;
            display: inline-block;
        }
    </style>
</head>
<body>

<h1>Sprite</h1>

<div id="container">
    <canvas id="stage" width="300" height="300"></canvas>
    <div class="options">
        <div class="options_container">
            <div>
                <button id="btn_start" >START</button>
                <button id="btn_stop" >STOP</button>
            </div>
            <div>
                <label for="fps">FPS</label>
                <input type="range" id="fps" name="fps" min="1" max="50" value="10">
            </div>
            <div>
                <label for="fps">Type</label>
                <select id="select_type">
                    <option value="0">기본</option>
                    <option value="1">점프</option>
                    <option value="2" selected>달리기</option>
                    <option value="3">공격</option>
                </select>
            </div>
        </div>
    </div>
</div>

<script src="../dist/stage.js"></script>
<script>
    const stage = new stg.Stage( 'stage' );
    const img = new Image();
    img.src = './assets/sprite.png';
    const spriteSheetList = [
        new stg.SpriteSheet( img, 144, 144,  [[ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ]] ),
        new stg.SpriteSheet( img, 144, 144,  [[ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ]] ),
        new stg.SpriteSheet( img, 144, 144,  [[ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 5, 2 ]] ),
        new stg.SpriteSheet( img, 144, 144,  [[ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ]] )
    ];
    const sprite = new stg.Sprite( spriteSheetList[ 2 ], 10  );
    sprite.x = 70;
    sprite.y = 50;
    stage.addChild( sprite );
    sprite.play();
    document.getElementById( 'btn_start' ).addEventListener( 'click', ()=>{
        sprite.play();
    });
    document.getElementById( 'btn_stop' ).addEventListener( 'click', ()=>{
        sprite.stop();
    });
    document.getElementById( 'fps' ).addEventListener( 'input', event=>{
        sprite.fps = parseFloat( event.target.value );
    });
    document.getElementById( 'select_type' ).addEventListener( 'change', event=>{
        sprite.spriteSheet = spriteSheetList[ parseInt( event.target.value ) ];
    });
</script>
</body>
</html>
```

#### Enter Frame
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>EnterFrame</title>
    <style>
        #container{
            width:650px;
        }
        #world{
            float: left;
            display: inline-block;
        }
        canvas{
            border:  1px solid gray;
        }
    </style>
</head>
<body>

<h1>EnterFrame</h1>

<div id="container">
    <canvas id="world" width="300" height="300"></canvas>
</div>

<script src="../dist/stage.js"></script>
<script>
    const stage = new stg.Stage( 'world', 40 );
    const itemNum = 20;
    const itemList = [];
    const graphics = new stg.Graphics();
    const startX = 150;
    const startY = 150;
    let radius = 0;
    let radiusValue = 0.05;
    let radian = 0;
    graphics.fillStyle = '#F08';
    graphics.strokeStyle = '#903';
    graphics.lineWidth = 3;
    graphics.beginPath();
    graphics.arc( 0, 0, 15, 0, Math.PI*2, false );
    graphics.fill();
    graphics.stroke();
    for( let i=0 ; i<itemNum ; i+=1 ){
        const item = new stg.Shape( graphics );
        item.x = startX;
        item.y = startY;
        stage.addChild( item );
        itemList.push( item );
    }
    stage.on( stg.Stage.ENTER_FRAME, ()=>{
        itemList.map( ( item, index )=>{
            let theta = Math.PI*2*( index/itemNum )+radian;
            item.x = startX + radius * Math.cos( theta );
            item.y = startY + radius * Math.sin( theta );
            if( radius >= 80 || radius < 0){
                radiusValue *= -1;
            }
            radian += 0.01;
            radius += radiusValue;
        });
    });
</script>
</body>
</html>
```

#### Mouse Event
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Mouse Event</title>
    <style>
        #container{
            width:650px;
        }
        #stage{
            float: left;
            display: inline-block;
            border:  1px solid gray;
        }
    </style>
</head>
<body>

<h1>Mouse Event</h1>

<div id="container">
    <canvas id="stage" width="500" height="500"></canvas>
</div>

<script src="../dist/stage.js"></script>
<script>
    const stage = new stg.Stage( 'stage' );
    const itemNum = 30;
    const graphics = new stg.Graphics();
    const startX = 250;
    const startY = 250;
    const radius = 200;
    graphics.fillStyle = '#F08';
    graphics.strokeStyle = '#903';
    graphics.lineWidth = 2;
    graphics.beginPath();
    graphics.arc( 0, 0, 10, 0, Math.PI*2, false );
    graphics.fill();
    graphics.stroke();
    for( let i=0 ; i<itemNum ; i+=1 ){
        const item = new stg.Shape( graphics );
        const theta = Math.PI*2*( i/itemNum );
        item.x = startX + radius * Math.cos( theta );
        item.y = startY + radius * Math.sin( theta );
        item.on( stg.MouseEvent.CLICK, event=>{
            item.scaleX = item.scaleY += 0.5;
            stage.update();
        });
        stage.addChild( item );
    }
    stage.update();
</script>
</body>
</html>
```
