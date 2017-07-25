## StageJS

Canvas 2D Javascript Library

### Show Case

#### Hello Rect
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

#### Graphics

#### Transform

#### Rotate

#### Display Object Container

#### Ticker

#### Sprite


#### Enter Frame

#### Mouse Event
