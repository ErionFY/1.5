var cAS = document.getElementById("canvasAntSimulation")
var ctx = cAS.getContext("2d");
var sizeAS = canvasAntSimulation.height = canvasAntSimulation.width = 901;
var RadiusOfPoint = 18;
var Vertices = [];
cAS.addEventListener('click', CreatePoint);

function CreatePoint(event) {
    var xCord = event.offsetX;
    var yCord = event.offsetY;

    Vertices.push({ x: xCord, y: yCord });

    ctx.beginPath();
    ctx.arc(xCord, yCord, RadiusOfPoint, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = "20px Arial";

    if (Vertices.length < 10)
        ctx.fillText((Vertices.length).toString(), xCord - 6, yCord + 7);
    if (Vertices.length >= 10 && Vertices.length < 100)
        ctx.fillText((Vertices.length).toString(), xCord - 10, yCord + 7);
    if (Vertices.length > 100)
        ctx.fillText((Vertices.length).toString(), xCord - 16, yCord + 7);
}


function clearAntS() {
    Vertices = [];
    ctx.clearRect(0, 0, canvasAntSimulation.width, canvasAntSimulation.height);
}

function CalculateAS() {}