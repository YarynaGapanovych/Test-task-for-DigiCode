let app
let shapes = []
let shapesSpeed = 1
let time
let amount
let interval

// random number
const randomNumberFromRange = (start, end) => {
  const range = end - start
  const random = Math.random() * range
  return start + random
}


window.onload = function () {
  app = new PIXI.Application(
    {
      width: 900,
      height: 600,
      backgroundColor: 0xf8f8f8,
    }
  )

  document.querySelector('#gameDiv').appendChild(app.view)

  amount = 1
  time = 1000 / amount

  // Will execute generateShape every 1 seconds 
  window.setInterval(generateShape, time);

  app.ticker.add(gameLoop)
};

window.addEventListener('mousedown', function (mouse) {
  generateShape(mouse.x, mouse.y)
})

function updateShapes(delta) {
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].position.y += shapes[i].speed

    if (shapes[i].position.y > 600) {
      shapes[i].dead = true
    }
  }
  for (let i = 0; i < shapes.length; i++) {
    if (shapes[i].dead) {
      app.stage.removeChild(shapes[i])
      shapes.splice(i, 1)
    }
  }
}

// amount btns
function plusAmount() {
  amount += 1

  document.getElementById("num-sec-minus").disabled = false;
  document.getElementById('num-sec-value').innerText = ('Number of shapes per sec: ' + amount)
}

function minusAmount() {
  if (amount === 2) {
    document.getElementById("num-sec-minus").disabled = true;
  } else {
    document.getElementById("num-sec-minus").disabled = false;
  }
  amount -= 1
  document.getElementById('num-sec-value').innerText = ('Number of shapes per sec: ' + amount)
}

// gravity btns
function plusGravity() {
  shapesSpeed += 1
  document.getElementById("gravity-minus").disabled = false;
  document.getElementById('gravity-value').innerText = ('Gravity Value: ' + shapesSpeed)
}

function minusGravity() {
  if (shapesSpeed === 2) {
    document.getElementById("gravity-minus").disabled = true;
  } else {
    document.getElementById("gravity-minus").disabled = false;
  }
  shapesSpeed -= 1
  document.getElementById('gravity-value').innerText = ('Gravity Value: ' + shapesSpeed)
}

function generateShape(x, y) {
  time = 1000 / amount

  // triangle
  let triangle = new PIXI.Graphics();
  triangle.beginFill("0x" + Math.floor(Math.random() * 16777215).toString(16)); // black color
  triangle.drawPolygon([
    100, 0,
    140, 140,
    20, 100
  ]);
  triangle.endFill();

  // Rectangle
  let rectangle = new PIXI.Graphics();
  rectangle.beginFill("0x" + Math.floor(Math.random() * 16777215).toString(16));
  rectangle.drawRect(0, 0, 100, 100);
  rectangle.endFill();

  // pentagon 
  let pentagon = new PIXI.Graphics();
  pentagon.beginFill("0x" + Math.floor(Math.random() * 16777215).toString(16));
  pentagon.drawPolygon([
    40, 100,
    120, 100,
    160, 50,
    80, 0,
    0, 50
  ]);
  pentagon.endFill();

  // hexagon
  let hexagon = new PIXI.Graphics();
  hexagon.beginFill("0x" + Math.floor(Math.random() * 16777215).toString(16));
  hexagon.drawPolygon([
    0, 0,
    60, 0,
    100, 45,
    100, 100,
    40, 100,
    0, 60

  ]);
  hexagon.endFill();

  // Circle
  let circle = new PIXI.Graphics();
  circle.beginFill("0x" + Math.floor(Math.random() * 16777215).toString(16), 1);
  circle.drawCircle(50, 50, 50);
  circle.endFill();

  // Ellipse
  let еllipse = new PIXI.Graphics();
  еllipse.beginFill("0x" + Math.floor(Math.random() * 16777215).toString(16), 1);
  еllipse.drawEllipse(80, 50, 80, 50);
  еllipse.endFill();

  // cloud
  let cloud = new PIXI.Graphics();
  cloud.beginFill("0x" + Math.floor(Math.random() * 16777215).toString(16));
  cloud.moveTo(100, 100);
  cloud.bezierCurveTo(50, 120, 50, 180, 100, 200);
  cloud.bezierCurveTo(110, 260, 180, 260, 200, 250);
  cloud.bezierCurveTo(240, 260, 280, 260, 300, 200);
  cloud.bezierCurveTo(290, 200, 260, 200, 250, 150);
  cloud.bezierCurveTo(280, 100, 250, 80, 200, 100);
  cloud.bezierCurveTo(180, 50, 120, 50, 100, 100);
  cloud.endFill();

  const typeOfShapes = [triangle, rectangle, pentagon, hexagon, circle, еllipse, cloud]
  let randomItem = typeOfShapes[Math.floor(Math.random() * typeOfShapes.length)];

  if (x === undefined) {
    randomItem.x = randomNumberFromRange(0, 700)
  } else {
    randomItem.x = x - 300
  }

  if (y === undefined) {
    if (randomItem == cloud) {
      randomItem.y = -300
    } else {
      randomItem.y = -200
    }
  } else {
    randomItem.y = y - 100
  }

  randomItem.speed = shapesSpeed

  app.stage.addChild(randomItem)
  shapes.push(randomItem)

  randomItem.interactive = true
  randomItem.on('pointerdown', function (e) {
    this.dead = true
  })

  // num of shapes
  document.getElementById('number-of-shapes').innerText = ('Number of current shapes: ' + shapes.length)

}

function gameLoop(delta) {
  updateShapes()

}

