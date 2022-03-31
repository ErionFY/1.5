var cGA = document.getElementById("canvasGeneticAlg")
var ctxGA = cGA.getContext("2d");
var sizeGA = canvasGeneticAlg.height = canvasGeneticAlg.width = 901;
cGA.addEventListener('click', CreatePoint);
RadiusOfPoint = 18; // радиус кружка
var Vertices = []; //массив вершин с координатами

function CreatePoint(event) {
    var xCord = event.offsetX;
    var yCord = event.offsetY;
    Vertices.push({ x: xCord, y: yCord });
    ctxGA.beginPath();
    ctxGA.arc(xCord, yCord, RadiusOfPoint, 0, 2 * Math.PI);
    ctxGA.fillStyle = 'green';
    ctxGA.fill();
    ctxGA.fillStyle = 'white';
    ctxGA.font = "20px Arial";
    if (Vertices.length < 10)
        ctxGA.fillText((Vertices.length).toString(), xCord - 6, yCord + 7);
    else
        ctxGA.fillText((Vertices.length).toString(), xCord - 10, yCord + 7);
}

function clearGenetic() {
    Vertices = [];
    ctxGA.clearRect(0, 0, canvasClastorization.width, canvasClastorization.height);
}