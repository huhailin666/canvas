### 1.连续绘画的方法
1. 检测鼠标按下 `onmousedown`
启动画笔，让 `paintFlag = true`
```
canvas.onmousedown = function (e) {
  let x = e.clientX - canvasX;
  let y = e.clientY - canvasY;
  startPoint = { x: x, y: y }
}
```
2. 检测鼠标移动 `onmousemove`
连续绘画，从上次移动点划到此次移动点
```
if (paintFlag) {
  drawCircle(x, y);
  endPoint = { x: x, y: y }
  drawLine(startPoint.x, startPoint.y, x, y);
  startPoint = endPoint;
}
```
2. 检测鼠标移动 `onmouseup`
启动画笔，让 `paintFlag = false`

### 2.撤销的方法
用一个数组存储每次画完后的图形数据，在每次松开鼠标的时候进行保存，如果点击撤销，就得到上次的图形。
```
canvasImageData=[]
canvasImageData.push(ctx.getImageData(0, 0, canvas.width, canvas.height))//存储图形数据
//将存储的数据放到页面上
ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
```
### 3.橡皮擦的方法
用`canvas`提供的`clearRect`
```
ctx.clearRect(x , y , lineWidth, lineWidth)
```

### 4.移动端适配的方法
获取手指触摸，
将`onmousedown`换为`ontouchstart`
将`onmousemove`换为`ontouchmove`
将`onmouseup`换为`ontouchend`
移动端获取触摸点的方法
注意要加上e.touches[0]，指的是触摸的第几个点
```
canvas.ontouchstart = function (e) {
  let x = e.touches[0].clientX - canvasX;
  let y = e.touches[0].clientY - canvasY;
}
```
### 5.画直线、矩形、圆的方法
鼠标拖动时，先恢复到上次鼠标松开时的图形，然后获取起点和当前点的位置，再开始画对应的图形
1. 直线
```
ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
ctx.beginPath()
ctx.moveTo(startPoint.x, startPoint.y);
ctx.lineTo(x, y)
ctx.stroke()
```
2. 矩形
```
ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
ctx.beginPath()
ctx.strokeRect(startPoint.x, startPoint.y, x - startPoint.x, y - startPoint.y)
```
3. 圆
```
let radius = Math.sqrt(Math.pow(x - startPoint.x, 2) + Math.pow(y - startPoint.y, 2))
ctx.putImageData(canvasImageData[canvasImageData.length - 1], 0, 0);
ctx.beginPath()
ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI * 2)
ctx.stroke()
```

