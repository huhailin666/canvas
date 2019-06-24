import './style.less'
var yyy = document.getElementById('xxx');
var ctx = yyy.getContext('2d');
var canvasX = yyy.offsetLeft;
var canvasY = yyy.offsetTop;
var paintFlag = false;
var eraserFlag = false;
var useEraser = false;
var useRect = false;
var rectFlag = false;
var useCircle = false;
var circleFlag = false;
var useLine = false;
var lineFlag = false;

var canvasImageData = [];
var lineWidth = 4
var lineColor = "black"
resize()
canvasImageData[0] = ctx.getImageData(0, 0, yyy.width, yyy.height)

window.canvasImageData = canvasImageData

box.onclick = function () {
  if (box.children[0].children[0].getAttribute('xlink:href') === '#icon-left') {
    container.style.display = "none";
    box.children[0].children[0].setAttribute('xlink:href', '#icon-right')
  } else {
    container.style.display = "grid";
    box.children[0].children[0].setAttribute('xlink:href', '#icon-left')
  }

}

line.onclick = function (e) {
  useLine = true;
  useCircle = false;
  useRect = false;
  useEraser = false;
  eraser.classList.remove('active')
  line.classList.add('active')
  circle.classList.remove('active')
  rect.classList.remove('active')
}
circle.onclick = function () {
  useCircle = true;
  useRect = false;
  useEraser = false;
  useLine = false;
  eraser.classList.remove('active')
  circle.classList.add('active')
  line.classList.remove('active')
  rect.classList.remove('active')
}

rect.onclick = function () {
  useRect = true;
  useCircle = false;
  useEraser = false;
  useLine = false;
  eraser.classList.remove('active')
  circle.classList.remove('active')
  line.classList.remove('active')
  rect.classList.add('active')
}

chexiao.onclick = function (e) {
  let length = canvasImageData.length;
  if (length > 1) {
    ctx.putImageData(canvasImageData[length - 2], 0, 0);
    canvasImageData.pop()
  } else {
    ctx.clearRect(0, 0, yyy.width, yyy.height);
    canvasImageData = []
    e.target.classList.add('ban');
    canvasImageData[0] = ctx.getImageData(0, 0, yyy.width, yyy.height)
  }


}
laji.onclick = function () {
  ctx.clearRect(0, 0, yyy.width, yyy.height)
  canvasImageData = [];
  chexiao.classList.add('ban')
}

container.onclick = function (e) {
  lineColor = e.target.id;
  ctx.strokeStyle = lineColor;

}



pencil.onclick = function () {
  useEraser = false;
  useRect = false;
  useCircle = false;
  useLine = false;
  lineWidth = 5
  pencil.classList.add('active')
  pen.classList.remove('active')
  shuazi.classList.remove('active')
  eraser.classList.remove('active')

  rect.classList.remove('active')
  circle.classList.remove('active')
  line.classList.remove('active')
}
pen.onclick = function () {
  useEraser = false;
  useRect = false;
  useCircle = false;
  useLine = false;

  lineWidth = 9
  pencil.classList.remove('active')
  shuazi.classList.remove('active')
  pen.classList.add('active')
  eraser.classList.remove('active')
  rect.classList.remove('active')
  circle.classList.remove('active')
  line.classList.remove('active')

}
shuazi.onclick = function () {
  useEraser = false;
  useRect = false;
  useCircle = false;
  useLine = false;

  lineWidth = 13
  pencil.classList.remove('active')
  pen.classList.remove('active')
  shuazi.classList.add('active')
  eraser.classList.remove('active')
  rect.classList.remove('active')
  circle.classList.remove('active')
  line.classList.remove('active')
}
eraser.onclick = function () {
  useEraser = true;
  useRect = false;
  useCircle = false;
  useLine = false;

  rect.classList.remove('active')
  circle.classList.remove('active')
  line.classList.remove('active')

  pencil.classList.remove('active')
  pen.classList.remove('active')
  shuazi.classList.remove('active')
  eraser.classList.add('active')
}




window.onresize = function () {
  resize();
}



if (document.body.ontouchmove === undefined) {
  mouseEvent()
} else {
  touchEvent()
}


download.onclick = function () {
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
    if (useLine) {
      lineFlag = true;
      return;
    }
    if (useCircle) {
      circleFlag = true;
      return;
    }
    if (useRect) {
      rectFlag = true;
      return;
    }
    if (useEraser) {
      eraserFlag = true;
      ctx.clearRect(x - 14, y - 14, lineWidth + 28, lineWidth + 28)
      return;
    }
    paintFlag = true;

  }
  yyy.onmousemove = function (e) {
    let x = e.clientX - canvasX;
    let y = e.clientY - canvasY;
    if (useLine && lineFlag) {
      ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
      ctx.beginPath()
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(x, y)
      ctx.stroke()
      return;

    }
    if (useCircle && circleFlag) {
      let radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2))
      ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
      ctx.beginPath()
      ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI * 2)
      ctx.stroke()
      return;
    }
    if (useRect && rectFlag) {
      ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
      ctx.beginPath()
      ctx.strokeRect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y)
      return;
    }
    if (useEraser && eraserFlag) {
      ctx.clearRect(x - 14, y - 14, lineWidth + 28, lineWidth + 28)
      return;
    }
    if (paintFlag) {
      drawCircle(x, y);
      endPoint = { x: x, y: y }
      drawLine(startPoint.x, startPoint.y, x, y);
      startPoint = endPoint;
    }

  }

  yyy.onmouseup = function (e) {
    if (useLine && lineFlag) {
      let x = e.clientX - canvasX;
      let y = e.clientY - canvasY;
      let length = canvasImageData.length
      ctx.putImageData(canvasImageData[length - 1], 0, 0);
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke()
    }
    if (useCircle && circleFlag) {
      let x = e.clientX - canvasX;
      let y = e.clientY - canvasY;
      let radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2))
      ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
      ctx.beginPath()
      ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI * 2)
      ctx.stroke()
    }
    if (useRect && rectFlag) {
      let x = e.clientX - canvasX;
      let y = e.clientY - canvasY;
      ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
      ctx.strokeRect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y);
    }

    canvasImageData.push(ctx.getImageData(0, 0, yyy.width, yyy.height))
    chexiao.classList.remove('ban')

    lineFlag = false;
    circleFlag = false;
    rectFlag = false;
    paintFlag = false;
    eraserFlag = false;
  }
}


function touchEvent() {
  let startPoint = {};
  let endPoint = {};
  yyy.ontouchstart = function (e) {
    let x = e.touches[0].clientX - canvasX;
    let y = e.touches[0].clientY - canvasY;
    startPoint = { x: x, y: y }
    if (useLine) {
      lineFlag = true;
      return;
    }
    if (useCircle) {
      circleFlag = true;
      return;
    }
    if (useRect) {
      rectFlag = true;
      return;
    }
    if (useEraser) {
      eraserFlag = true;
      ctx.clearRect(x - lineWidth / 2 - 5, y - lineWidth / 2 - 5, lineWidth + 10, lineWidth + 10)
      return;
    }
    paintFlag = true;
  }
  yyy.ontouchmove = function (e) {
    let x = e.touches[0].clientX - canvasX;
    let y = e.touches[0].clientY - canvasY;
    if (useLine && lineFlag) {
      ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
      ctx.beginPath()
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(x, y)
      ctx.stroke()
      return;

    }
    if (useCircle && circleFlag) {
      let radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2))
      ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
      ctx.beginPath()
      ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI * 2)
      ctx.stroke()
      return;
    }
    if (useRect && rectFlag) {
      ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
      ctx.beginPath()
      ctx.strokeRect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y)
      return;
    }
    if (useEraser && eraserFlag) {
      ctx.clearRect(x - 14, y - 14, lineWidth + 28, lineWidth + 28)
      return;
    }
    if (paintFlag) {
      drawCircle(x, y);
      endPoint = { x: x, y: y }
      drawLine(startPoint.x, startPoint.y, x, y);
      startPoint = endPoint;
    }
  }
  yyy.ontouchend = function (e) {
    let x = e.touches[0].clientX - canvasX;
    let y = e.touches[0].clientY - canvasY;
    if (useLine && lineFlag) {
      let length = canvasImageData.length
      ctx.putImageData(canvasImageData[length - 1], 0, 0);
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(x, y);
      ctx.stroke()
    }
    if (useCircle && circleFlag) {
      let radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2))
      ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
      ctx.beginPath()
      ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI * 2)
      ctx.stroke()
    }
    if (useRect && rectFlag) {
      ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
      ctx.strokeRect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y);
    }
    canvasImageData.push(ctx.getImageData(0, 0, yyy.width, yyy.height))
    chexiao.classList.remove('ban')

    lineFlag = false;
    circleFlag = false;
    rectFlag = false;
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