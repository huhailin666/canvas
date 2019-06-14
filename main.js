import './style.less'
var yyy = document.getElementById('xxx');
var ctx = yyy.getContext('2d');
window.ctx = ctx
var canvasX = yyy.offsetLeft;
var canvasY = yyy.offsetTop;
var paintFlag = false;
var eraserFlag = false;
var useEraser = false;
var useRect = false;
var rectFlag = false;



var canvasImageData = [];
var lineWidth = 4
var lineColor = "black"

// var blue=document.querySelector('#blue')
rect.onclick = function () {
  console.log('xx')
  useRect = true;

}
chexiao.onclick = function (e) {
  let length = canvasImageData.length;
  if (length > 1) {
    console.log('可撤销')
    ctx.putImageData(canvasImageData[length - 2], 0, 0);
    console.log(canvasImageData)
    canvasImageData.pop()
  } else {
    ctx.clearRect(0, 0, yyy.width, yyy.height);
    canvasImageData = []
    e.target.classList.add('ban')
  }
}
laji.onclick = function () {
  ctx.clearRect(0, 0, yyy.width, yyy.height)
  canvasImageData = [];
  chexiao.classList.add('ban')
}

container.onclick = function (e) {
  lineColor = e.target.id;
  ctx.strokeStyle=lineColor;

}



pencil.onclick = function () {
  useEraser = false;
  useRect=false;
  lineWidth = 5
  pencil.classList.add('active')
  pen.classList.remove('active')
  shuazi.classList.remove('active')
  eraser.classList.remove('active')

}
pen.onclick = function () {
  useEraser = false;
  useRect=false;

  lineWidth = 9
  pencil.classList.remove('active')
  shuazi.classList.remove('active')
  pen.classList.add('active')
  eraser.classList.remove('active')

}
shuazi.onclick = function () {
  useEraser = false;
  useRect=false;

  lineWidth = 13
  pencil.classList.remove('active')
  pen.classList.remove('active')
  shuazi.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function () {
  useEraser = true;
  useRect=false;
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

function mouseEvent() {
  let startPoint = {};
  let endPoint = {};
  yyy.onmousedown = function (e) {
    let x = e.clientX - canvasX;
    let y = e.clientY - canvasY;
    startPoint = { x: x, y: y }
    if (useRect) {
      rectFlag = true;
      console.log('useRect')
      return;
    }
    if (useEraser) {
      eraserFlag = true;
      ctx.clearRect(x - lineWidth / 2 - 5, y - lineWidth / 2 - 5, lineWidth + 10, lineWidth + 10)
      return;
    }
    paintFlag = true;

    // drawCircle(x, y, lineWidth / 2)
  }
  yyy.onmousemove = function (e) {
    let x = e.clientX - canvasX;
    let y = e.clientY - canvasY;
    if (useRect && rectFlag) {
      // rectCanvasDate.push(ctx.getImageData(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y))
      ctx.clearRect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y)
      ctx.strokeRect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y)
      return;
    }
    if (useEraser && eraserFlag) {
      ctx.clearRect(x - lineWidth / 2 - 5, y - lineWidth / 2 - 5, lineWidth + 10, lineWidth + 10)

      return;
    }
    if (!paintFlag) return;
    drawCircle(x, y);
    endPoint = { x: x, y: y }
    drawLine(startPoint.x, startPoint.y, x, y);
    startPoint = endPoint;
  }

  yyy.onmouseup = function (e) {

    if(useRect && rectFlag){
      let x = e.clientX - canvasX;
      let y = e.clientY - canvasY;
      console.log('完成画矩形')
      ctx.putImageData(canvasImageData[canvasImageData.length -1], 0, 0);
      ctx.strokeRect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y);
    }
    canvasImageData.push(ctx.getImageData(0, 0, yyy.width, yyy.height))
    chexiao.classList.remove('ban')

    rectFlag = false;
    paintFlag = false;
    eraserFlag = false;
  }

}


function touchEvent() {
  yyy.ontouchstart = function (e) {
    let x = e.touches[0].clientX - canvasX;
    let y = e.touches[0].clientY - canvasY;
    if (useEraser) {
      eraserFlag = true;
      ctx.clearRect(x - lineWidth / 2 - 5, y - lineWidth / 2 - 5, lineWidth + 10, lineWidth + 10)
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
      ctx.clearRect(x - lineWidth / 2 - 5, y - lineWidth / 2 - 5, lineWidth + 10, lineWidth + 10)
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