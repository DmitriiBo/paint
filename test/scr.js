const canv = document.querySelector("#canvas");
const ctx = canv.getContext("2d");
const brushColor = document.querySelector('#color')
const sizeBrush = document.querySelector('#brushsize');
let mousedown = false;
let coords = [];
let colBrush_array = [];
let radius = 10;



canv.width = window.innerWidth;
canv.height = 600;
ctx.lineWidth = 10 * 2;


function draw(e) {
    ctx.lineTo(e.clientX, e.clientY)
    ctx.stroke();
    
    ctx.beginPath()
    ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2);
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(e.clientX, e.clientY)
}

canv.addEventListener('mousedown', function () {
    mousedown = true;
})

canv.addEventListener('mouseup', function () {
    mousedown = false;
    ctx.beginPath();
    coords.push(' ')
})

canv.addEventListener('mousemove', function (e) {

    if (mousedown) {
        coords.push([e.clientX, e.clientY]);
        draw(e)
    }

});


function clear() { //-----------CLEAR FUNCTION---------
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.beginPath();
    ctx.fillStyle = brushColor.value;
}

function save() {  // ------SAVE FUNCTION-------
    localStorage.setItem('coords', JSON.stringify(coords))
    localStorage.setItem('colBrush_array', JSON.stringify(colBrush_array))
}

function replay() {  //-----------REPLAY FUNCTION---------

    let timer = setInterval(function () {
        let crd = coords.shift(),
            e = {
                clientX: crd[0],
                clientY: crd[1]
            }, colrs = colBrush_array.shift();
        if (!coords.length) {
            clearInterval(timer);
            ctx.beginPath();
            return;
        } else {
            // ctx.fillStyle = colrs[0];
            // ctx.strokeStyle = colrs[0];
            draw(e)
        }
    }, 1)
}
document.addEventListener('keydown', function (e) {
    
    switch (e.keyCode) {
        case 67:
            clear();
            console.log('Cleared');

            break;
        case 82:
            coords = JSON.parse(localStorage.getItem('coords'))
            clear();
            replay();
            console.log('Replaying...');
            break;
        case 83:
            save();
            console.log('saved');
            break;
        default:
            break;
    }

})



brushColor.addEventListener('change', function() {

    ctx.fillStyle = brushColor.value;
    ctx.strokeStyle = brushColor.value;
    colBrush_array.push(brushColor.value)
    console.log(colBrush_array);
    
})

sizeBrush.addEventListener('change', function(){
    let bs = sizeBrush.value;
    
    radius = bs;
    ctx.lineWidth = bs * 2;
})
