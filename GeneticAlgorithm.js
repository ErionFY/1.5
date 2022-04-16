var generationCountD = document.getElementById("NumberofMutations")
var mutationChanceD = document.getElementById("Mutationchance")
var cGA = document.getElementById("canvasGeneticAlg")
var ctxGA = cGA.getContext("2d");
var sizeGA = canvasGeneticAlg.height = canvasGeneticAlg.width = 901;
cGA.addEventListener('click', CreatePointGA);
var RadiusOfPointGA = 18; // радиус кружка
var verticesGA = []; //массив вершин с координатами
var mutationChanceGA;
var generationCountGA;
var nGA;
var matrixGA;
const NUMBER_OF_GENESGA = 5;

function CreatePointGA(event) {
    var xCord = event.offsetX;
    var yCord = event.offsetY;

    verticesGA.push({ x: xCord, y: yCord });

    ctxGA.beginPath();
    ctxGA.arc(xCord, yCord, RadiusOfPointGA, 0, 2 * Math.PI);
    ctxGA.fillStyle = 'green';
    ctxGA.fill();
    ctxGA.fillStyle = 'white';
    ctxGA.font = "20px Arial";

    if (verticesGA.length < 10)
        ctxGA.fillText((verticesGA.length).toString(), xCord - 6, yCord + 7);
    if (verticesGA.length >= 10 && verticesGA.length < 100)
        ctxGA.fillText((verticesGA.length).toString(), xCord - 10, yCord + 7);
    if (verticesGA.length > 100)
        ctxGA.fillText((verticesGA.length).toString(), xCord - 16, yCord + 7);
}

function clearGeneticGA() {
    verticesGA = [];
    ctxGA.clearRect(0, 0, canvasClastorization.width, canvasClastorization.height);
}

function randomIntGA(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArrayGA(n) {
    var array = [];
    for (var i = 0; i < n; i++) {
        array.push(i);
    }

    var randomArr = [];
    for (var i = n - 1; i >= 0; i--) {
        index = randomIntGA(0, i);
        randomArr.push(array[index]);
        array.splice(index, 1);
    }

    return randomArr;
}

function createFirstGenerationGA(n) {

    var genomes = [];
    for (var i = 0; i < NUMBER_OF_GENESGA; i++) {
        genomes.push(randomArrayGA(n));
    }
    return genomes;
}


function selectionGA(genomes) {
    var offsprignsGenomes = []; // Потомки

    for (var i = 0; i < genomes.length; i++) {
        var genome1 = genomes[randomIntGA(0, genomes.length - 1)];
        var genome2 = genomes[randomIntGA(0, genomes.length - 1)];


        var fitness1 = fitnessFunctionGA(genome1);
        var fitness2 = fitnessFunctionGA(genome2);

        if (fitness1 < fitness2) {
            offsprignsGenomes.push(genome1);
        } else {
            offsprignsGenomes.push(genome2);
        }
    }
    return offsprignsGenomes;

}

function createOffspringGA(genom1, genom2, point) {
    var result = [];
    for (var i = 0; i <= point; i++) {
        result.push(genom1[i]);
    }
    for (var i = point + 1; i < genom1.length; i++) {
        if (result.indexOf(genom2[i]) === -1) {
            result.push(genom2[i]);
        } else {
            j = 0;
            while (j !== -1) {
                if (result.indexOf(genom2[j]) === -1) {
                    result.push(genom2[j]);
                    j = -1;
                } else {
                    j++;
                }
            }
        }
    }
    return result;
}

function crossGA(genomes, genom1, genom2) {
    var point = randomIntGA(0, genom1.length - 2);

    var result1 = createOffspringGA(genom1, genom2, point);
    mutationGA(result1);

    var result2 = createOffspringGA(genom2, genom1, point);
    mutationGA(result2);

    genomes.push(result1);
    genomes.push(result2);
}

function mutationGA(genom) {
    if (randomIntGA(0, 100) < mutationChanceGA) {
        var rndInd1 = randomIntGA(0, genom.length - 1);
        var rndInd2 = randomIntGA(0, genom.length - 1);
        var tmp = genom[rndInd1];
        genom[rndInd1] = genom[rndInd2];
        genom[rndInd2] = tmp;
    }
}

function fitnessFunctionGA(genom) {
    var distance = 0;
    for (var i = 0; i < genom.length - 1; i++) {
        distance += matrixGA[genom[i]][genom[i + 1]];
    }
    distance += matrixGA[genom[0]][genom[genom.length - 1]];
    return distance;
}

async function runGA(n) {
    matrixGA = createMatrixGA(n);
    var genomes = createFirstGenerationGA(n);
    var bestWayL = 1000000;

    for (var i = 0; i < generationCountGA; i++) {
        genomes = selectionGA(genomes, n);
        await sleep(1);
        PaintPathGA(chooseBestWayGA(genomes), "black");

        if (fitnessFunctionGA(chooseBestWayGA(genomes)) < bestWayL) {
            bestWayL = fitnessFunctionGA(chooseBestWayGA(genomes));
        }

        parent = randomArrayGA(NUMBER_OF_GENESGA);
        for (var j = 0; j < parent.length - 1; j++) {
            crossGA(genomes, genomes[parent[j]], genomes[parent[j + 1]]);
        }
    }
    await sleep(1);
    PaintPathGA(chooseBestWayGA(genomes), "red");

    if (bestWayL < fitnessFunctionGA(chooseBestWayGA(genomes))) {
        console.log(bestWayL);
        console.log(fitnessFunctionGA(chooseBestWayGA(genomes)));
    }
}

function chooseBestWayGA(genomes) {
    var bestWay = genomes[0];
    var bestFF = fitnessFunctionGA(genomes[0]);

    for(let genome of genomes){
        if (fitnessFunctionGA(genome) < bestFF) {
            bestFF = fitnessFunctionGA(genome);
            bestWay = genome;
        }
    }

    return bestWay;
}

function createMatrixGA(n) {
    matrixGA = new Array();

    for (var i = 0; i < n; i++) {
        matrixGA[i] = new Array();
        for (var j = 0; j < n; j++) {
            matrixGA[i][j] = calcDistanceGA(i, j);
        }
    }
    return matrixGA;
}

function calcDistanceGA(point1, point2) {
    var distance = Math.sqrt(Math.pow(verticesGA[point1].x - verticesGA[point2].x, 2) + Math.pow(verticesGA[point1].y - verticesGA[point2].y, 2));
    return distance;
}

function CalculateGA() {
    cGA.removeEventListener('click', CreatePointGA);
    GetMutationChanceGA();
    GetGenerationCountGA()
    runGA(verticesGA.length);
    cGA.addEventListener('click', CreatePointGA);
}

function GetMutationChanceGA() {
    mutationChanceGA = parseInt(mutationChanceD.value);
}

function PaintPathGA(path, color) //var path = [0, 2, 1, 5, 4, 3];var color = "red";
{
    ctxGA.clearRect(0, 0, canvasClastorization.width, canvasClastorization.height);
    var sizePath = path.length;

    for (let vertex of verticesGA){
        repaintPointGA(vertex.x,vertex.y);
    }
    ctxGA.beginPath();
    ctxGA.strokeStyle = color;
    ctxGA.lineWidth = "5";
    for (var i = 0; i < sizePath; i++) {
        ctxGA.moveTo(verticesGA[path[i]].x, verticesGA[path[i]].y);
        ctxGA.lineTo(verticesGA[path[(i + 1) % sizePath]].x, verticesGA[path[(i + 1) % sizePath]].y);
    }
    ctxGA.stroke();
}

function GetGenerationCountGA() {
    generationCountGA = parseInt(generationCountD.value);
}

function repaintPointGA(xCord, yCord) {
    ctxGA.beginPath();
    ctxGA.arc(xCord, yCord, RadiusOfPointGA, 0, 2 * Math.PI);
    ctxGA.fillStyle = 'green';
    ctxGA.fill();
}