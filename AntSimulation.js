var cAS = document.getElementById("canvasAntSimulation")
var ctx = cAS.getContext("2d");
var sizeAS = canvasAntSimulation.height = canvasAntSimulation.width = 901;
var RadiusOfPoint = 18;
var Vertices = [];
cAS.addEventListener('click', CreatePoint);
var n; //  Number of vertices
var antNumber; //  Number of ants
var iterNumber; //  Number of iterations
var pheroCoeff; //  pheromones importance
var basePhero; //  Inital pheromones on edges
var weightCoeff; //  weight importance
var weightMatrix;
var pheroMatrix; // Matrix of pheromones
var pheromonesPower;
var evaporationCoeff; // How many will remain

var DantNumber = document.getElementById("NumberOfAnts");
var DiterNumber = document.getElementById("IterNum");
var DbasePhero = document.getElementById("BasePheromon");
var DweightCoeff = document.getElementById("WheightCoef");
var DpheroCoeff = document.getElementById("PheromonCoef");
var DpheromonesPower = document.getElementById("PheromonePower");
var DevaporationCoeff = document.getElementById("EvaporationCoef");

function GetValues() {
    antNumber = Number(DantNumber.value)
    iterNumber = Number(DiterNumber.value)
    basePhero = Number(DbasePhero.value)
    weightCoeff = Number(DweightCoeff.value)
    pheroCoeff = Number(DpheroCoeff.value)
    pheromonesPower = Number(DpheromonesPower.value)
    evaporationCoeff = Number(DevaporationCoeff.value)
}

function CreatePoint(event) {
    var xCord = event.offsetX;
    var yCord = event.offsetY;

    Vertices.push({ x: xCord, y: yCord });
    n = Vertices.length;

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

function CalculateAS() {
    GetValues();
    weightMatrix = createWeightMatrix();
    pheroMatrix = createPheroMatrix(); // Matrix of pheromones=
    var tabuList;
    var delta;

    for (var ind = 0; ind < iterNumber; ind++) {
        for (var i = 0; i < antNumber; i++) {
            tabuList = [];
            tabuList.push(path[i][randomIntGA(0, n - 1)]);
            for (var j = 1; j < n; j++) {
                tabuList.push(nextVertex(tabuList, tabuList.pop()));
            }

            delta = pheromonesPower / pathLength(tabuList);
            for (var j = 0; j < n - 1; j++) {
                pheroMatrix[tabuList[j]][tabuList[j + 1]] += delta;
                pheroMatrix[tabuList[j + 1]][tabuList[j]] += delta;
            }
            pheroMatrix[tabuList[0]][tabuList[n - 1]] += delta;
            pheroMatrix[tabuList[n - 1]][tabuList[0]] += delta;
        }


    }
}

function createPheroMatrix() {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (i != j) {
                pheroMatrix[i][j] = basePhero;
            }
        }
    }
}

function evaporation() {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            pheroMatrix[i][j] *= evaporationCoeff;
        }
    }
}

function pathLength(path) {
    var length = 0;
    for (var i = 0; i < n - 1; i++) {
        length += weightMatrix[path[i]][path[i + 1]];
    }
    length += weightMatrix[path[n - 1]][path[0]];

    return length;
}

function nextVertex(tabuList, current) {

    var probSum = 0;
    for (var i = 0; i < n; i++) {
        if (tabuList.indexOf(i) == -1 && current != i) {
            probSum += edgeProbability(i, current);
        }
    }

    var randomProb = Math.random();
    var maxProb = 0;
    var ind = -1;
    for (var i = 0; i < n; i++) {
        if (tabuList.indexOf(i) == -1 && current != i) {
            if (randomProb <= edgeProbability(i, current, probSum)) {
                return i;
            } else {
                if (maxProb < edgeProbability(i, current, probSum)) {
                    maxProb = edgeProbability(i, current, probSum);
                    ind = i;
                }
            }
        }
    }

    return ind;
}

function edgeProbability(i, j, probSum = 1) {
    return (pheroMatrix[i][j] ** pheroCoeff) * (1 / (weightMatrix[i][j] ** weightCoeff)) / probSum;
}

function createWeightMatrix() {
    var matrix = new Array();
    for (var i = 0; i < n; i++) {
        matrix[i] = new Array();
    }

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            matrix[i][j] = calcDistance(i, j);
        }
    }
    return matrix;
}

function calcDistance(point1, point2) {
    var distance = Math.sqrt(Math.pow(Vertices[point1].x - Vertices[point2].x, 2) + Math.pow(Vertices[point1].y - Vertices[point2].y, 2));
    return distance;
}


function PaintPath(path, color) //var path = [0, 2, 1, 5, 4, 3];var color = "red";
{
    ctx.clearRect(0, 0, canvasAntSimulation.width, canvasAntSimulation.height);
    var sizePath = path.length;
    var NumOfVertices = Vertices.length;
    for (var i = 0; i < NumOfVertices; i++) { repaintPoint(Vertices[i].x, Vertices[i].y); }
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = "5";
    for (var i = 0; i < sizePath; i++) {
        ctx.moveTo(Vertices[path[i]].x, Vertices[path[i]].y);
        ctx.lineTo(Vertices[path[(i + 1) % sizePath]].x, Vertices[path[(i + 1) % sizePath]].y);
    }
    ctx.stroke();
}

function repaintPoint(xCord, yCord) {
    ctx.beginPath();
    ctx.arc(xCord, yCord, RadiusOfPoint, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
}