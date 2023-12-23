//global objects
let engineObjects = []
let engineCanvas = document.getElementById("engine")
let ctx = engineCanvas.getContext("2d")
let gravityBool = false
const { bottom } = engineCanvas.getBoundingClientRect();


engineCanvas.addEventListener("click", canvasClick)
gravityButton.addEventListener("click", toggleGravity)

requestAnimationFrame(tick);

// add pixel aligned versions of strokeRect & fillRect to this context instance
ctx.fRect = function (x, y, w, h) {
    x = parseInt(x);
    y = parseInt(y);
    ctx.fillStyle = "#39FF14"
    ctx.fillRect(x, y, w, h);

}

function canvasClick() {
    const rect = engineCanvas.getBoundingClientRect()
    const elementRelativeX = event.offsetX;
    const elementRelativeY = event.offsetY;
    const canvasRelativeX = elementRelativeX * engineCanvas.width / engineCanvas.clientWidth;
    const canvasRelativeY = elementRelativeY * engineCanvas.height / engineCanvas.clientHeight;
    //x,y,height,width,ticks
    var cube = [canvasRelativeX, canvasRelativeY, 8, 8, 0]
    engineObjects.push(cube)
}

function tick() {
    ctx.clearRect(0, 0, engineCanvas.width, engineCanvas.height);

    for (obj in engineObjects) {
        if (gravityBool) {
            performGravity(obj)
        }
        drawObject(obj)
    }
    requestAnimationFrame(tick);

}

function drawObject(obj) {
    var x = engineObjects[obj][0]
    var y = engineObjects[obj][1]
    var height = engineObjects[obj][2]
    var width = engineObjects[obj][3]
    ctx.fRect(x, y, width, height);
}

function performGravity(obj) {
    let x = engineObjects[obj][1]
    let ticks = engineObjects[obj][4]
    let newY = x + (1 * 0.2 * ticks)
    if (newY >= bottom - 17) {
        newY = bottom - 17
    }
    engineObjects[obj][1] = newY
    engineObjects[obj][4] += 1
}

function toggleGravity() {
    if (!gravityBool) {
        gravityBool = true
        document.getElementById("gravityLabel").innerHTML = "Gravity: On"
    } else {
        gravityBool = false
        document.getElementById("gravityLabel").innerHTML = "Gravity: Off"
    }
}


