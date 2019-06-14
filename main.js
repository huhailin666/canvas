import './style.less'
// import { blue } from '_ansi-colors@3.2.4@ansi-colors';
var yyy = document.getElementById('xxx');
var ctx = yyy.getContext('2d');
var canvasX = yyy.offsetLeft;
var canvasY = yyy.offsetTop;
var paintFlag = false;
var eraserFlag = false;
var useEraser = false;
var startPoint = {};
var endPoint = {};

var lineWidth = 4
var lineColor = "black"

// var blue=document.querySelector('#blue')


container.onclick = function (e) {
  lineColor = e.target.id;

}



pencil.onclick = function () {
  useEraser = false;

  lineWidth = 5
  pencil.classList.add('active')
  pen.classList.remove('active')
  shuazi.classList.remove('active')
  eraser.classList.remove('active')

}
pen.onclick = function () {
  useEraser = false;
  lineWidth = 9
  pencil.classList.remove('active')
  shuazi.classList.remove('active')
  pen.classList.add('active')
  eraser.classList.remove('active')

}
shuazi.onclick = function () {
  useEraser = false;
  lineWidth = 13
  pencil.classList.remove('active')
  pen.classList.remove('active')
  shuazi.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function () {
  useEraser = true;
  pencil.classList.remove('active')
  pen.classList.remove('active')
  shuazi.classList.remove('active')
  eraser.classList.add('active')
}



resize()
window.onresize = function () {
  resize();
}



if (document.body.ontouchmove === undefined) {
  mouseEvent()
} else {
  touchEvent()
}


download.onclick = function () {
  console.log('xxx')
  let url = yyy.toDataURL("image/png")
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = "我的作品"
  a.target = '_blank'
  a.click()
}

function touchEvent() {
  yyy.ontouchstart = function (e) {
    let x = e.touches[0].clientX - canvasX;
    let y = e.touches[0].clientY - canvasY;
    if (useEraser) {
      eraserFlag = true;
      ctx.clearRect(x, y, lineWidth + 10, lineWidth + 10)
      return;
    }
    paintFlag = true;
    // drawCircle(x, y, "blue")
    startPoint = { x: x, y: y }
    console.log(startPoint.x, startPoint.y)
  }
  yyy.ontouchmove = function (e) {
    let x = e.touches[0].clientX - canvasX;
    let y = e.touches[0].clientY - canvasY;
    if (useEraser && eraserFlag) {
      ctx.clearRect(x, y, lineWidth + 10, lineWidth + 10)
      return;
    }
    if (!paintFlag) return;
    drawCircle(x, y);
    endPoint = { x: x, y: y }
    drawLine(startPoint.x, startPoint.y, x, y);
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
      ctx.clearRect(x, y, lineWidth + 10, lineWidth + 10)
      return;
    }
    paintFlag = true;
    drawCircle(x, y, lineWidth / 2)
    startPoint = { x: x, y: y }
  }
  yyy.onmousemove = function (e) {
    let x = e.clientX - canvasX;
    let y = e.clientY - canvasY;
    if (useEraser && eraserFlag) {
      ctx.clearRect(x, y, lineWidth + 10, lineWidth + 10)

      return;
    }
    if (!paintFlag) return;
    drawCircle(x, y);
    endPoint = { x: x, y: y }
    drawLine(startPoint.x, startPoint.y, x, y);
    startPoint = endPoint;
  }

  yyy.onmouseup = function (e) {
    paintFlag = false;
    eraserFlag = false;
  }

}



function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2)
  ctx.fillStyle = lineColor;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}


function resize() {
  yyy.width = document.documentElement.clientWidth;
  yyy.height = document.documentElement.clientHeight;
}

function colorControl(e) {
  blue.classList.remove('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
  black.classList.remove('active')
  pink.classList.remove('active')
  green.classList.remove('active')

  gray.classList.remove('active')
  purple.classList.remove('active')
  maroon.classList.remove('active')
  lawngreen.classList.remove('active')
  orange.classList.remove('active')
  aqua.classList.remove('active')

  e.classList.add('active')
}