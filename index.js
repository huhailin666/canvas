var yyy = document.getElementById('xxx');
var ctx = yyy.getContext('2d');
var canvasX = yyy.offsetLeft;
var canvasY = yyy.offsetTop;
var paintFlag = false;
var eraserFlag = false;
var useEraser = false;

resize()
window.onresize = function () {
  resize();
}



if(document.body.ontouchmove===undefined){
  mouseEvent()
}else{
  touchEvent()
}


function touchEvent() {
  yyy.ontouchstart = function (e) {
    let x = e.touches[0].clientX - canvasX;
    let y = e.touches[0].clientY - canvasY;
    console.log(e)
    if (useEraser) {
      eraserFlag = true;
      ctx.clearRect(x, y, 10, 10)
      return;
    }
    paintFlag = true;

    drawCircle(x, y, 5, "blue")
    startPoint = { x: x, y: y }
  }
  yyy.ontouchmove = function (e) {
    let x = e.touches[0].clientX - canvasX;
    let y = e.touches[0].clientY - canvasY;
    if (useEraser && eraserFlag) {
      ctx.clearRect(x, y, 10, 10)

      return;
    }
    if (!paintFlag) return;
    drawCircle(x, y, 5, "blue");
    endPoint = { x: x, y: y }
    drawLine(startPoint.x, startPoint.y, x, y, "blue", "10");
    startPoint = endPoint;
  }
  yyy.ontouchend = function (e) {
    paintFlag = false;
    eraserFlag = false;
  }
}

function mouseEvent() {
  yyy.onmousedown = function (e) {
    let x = e.clientX - canvasX;
    let y = e.clientY - canvasY;
    if (useEraser) {
      eraserFlag = true;
      ctx.clearRect(x, y, 10, 10)
      return;
    }
    paintFlag = true;

    drawCircle(x, y, 5, "blue")
    startPoint = { x: x, y: y }
  }
  yyy.onmousemove = function (e) {
    let x = e.clientX - canvasX;
    let y = e.clientY - canvasY;
    if (useEraser && eraserFlag) {
      ctx.clearRect(x, y, 10, 10)

      return;
    }
    if (!paintFlag) return;
    drawCircle(x, y, 5, "blue");
    endPoint = { x: x, y: y }
    drawLine(startPoint.x, startPoint.y, x, y, "blue", "10");
    startPoint = endPoint;
  }

  yyy.onmouseup = function (e) {
    paintFlag = false;
    eraserFlag = false;
  }

}

eraser.onclick = function () {
  useEraser = !useEraser;
}

function drawCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2, color, width) {
  ctx.beginPath()
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}


function resize() {
  yyy.width = document.documentElement.clientWidth;
  yyy.height = document.documentElement.clientHeight;
}
