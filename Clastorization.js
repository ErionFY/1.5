var cClastor=document.getElementById("canvasClastorization");
var ctxC=cClastor.getContext("2d");
var sizeC=canvasClastorization.height=canvasClastorization.width=901;

cClastor.addEventListener('click',pushPoint);
var listPoints=[];
var Radius=5;

function pushPoint(event)
{
    var XCord=event.offsetX;
    var YCord=event.offsetY;
    var coords={x:XCord,y:YCord};
    PaintDot(coords);
    listPoints.push(coords);
}

function PaintDot(coords)
{
    ctxC.beginPath();
    ctxC.arc(coords.x, coords.y, Radius, 0 , 2 * Math.PI);
    ctxC.fillStyle="black";
    ctxC.fill();
}