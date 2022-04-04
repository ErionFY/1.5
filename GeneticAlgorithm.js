const NUMBER_OF_GENES=5;


var cGA = document.getElementById("canvasGeneticAlg")
var ctxGA = cGA.getContext("2d");
var sizeGA = canvasGeneticAlg.height = canvasGeneticAlg.width = 901;
cGA.addEventListener('click', CreatePoint);
RadiusOfPoint = 18; // радиус кружка
var Vertices = []; //массив вершин с координатами
var mutationChance;
var generationCount;
var n;
var matrix;

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
    if (Vertices.length >= 10 && Vertices.length < 100)
        ctxGA.fillText((Vertices.length).toString(), xCord - 10, yCord + 7);
    if (Vertices.length > 100)
        ctxGA.fillText((Vertices.length).toString(), xCord - 16, yCord + 7);
}

function clearGenetic() {
    Vertices = [];
    ctxGA.clearRect(0, 0, canvasClastorization.width, canvasClastorization.height);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArray(n){
    var array=[];
    for(i=0;i<n;i++){
        array.push(i);
    }

    var randomArr=[];
    for(i=n-1;i>=0;i--){
        index=randomInt(0,i);
        randomArr.push(array[index]);
        array.splice(index,1);
    }
}

function createFirstGeneration(n){

    var genomes=[];
    for(i=0;i<NUMBER_OF_GENES;i++){
        genomes.push(randomArray(n));
    }
    return genomes;
}

function selection(genomes){
    var offsprignsGenomes=[]; // Потомки

    for(i=0;i<NUMBER_OF_GENES;i++){
        var genome1=genomes[randomInt(0,NUMBER_OF_GENES-1)];
        var genome2=genomes[randomInt(0,NUMBER_OF_GENES-1)];


        var fitness1=fitnessFunction(genome1);
        var fitness2=fitnessFunction(genome2);

        if(fitness1>fitness2){
            offsprignsGenomes.push(genome1);
        }else{
            offsprignsGenomes.push(genome2);
        }
    }
    return offsprignsGenomes;

}

function createOffspring(genom1,genom2,point){
    var result=[];
    for(i=0;i<=point;i++){
        result.push(genom1[i]);
    }
    for(i=point+1;i<genom1.length;i++){
        if(result.indexOf(genom2[i])==-1){
            result.push(genom2[i]);
        }else{
            j=0;
            while(j!=-1){
                if(result.indexOf(genom2[j])==-1){
                    result.push(genom2[j]);
                    j=-1;
                }else{
                    j++;
                }
            }
        }
    }
}

function cross(genomes,genom1,genom2){
    var point=randomInt(0,genom1.length-2);

    var result1= createOffspring(genom1,genom2,point);
    mutation(result1);

    var result2 = createOffspring(genom2,genom1,point);
    mutation(result2);

    genomes.push(result1);
    genomes.push(result2);
}

function mutation(genom){
    if(randomInt(0,100)<mutationChance){
        var rndInd1=randomInt(0,genom.length-1);
        var rndInd2=randomInt(0,genom.length-1);
        var tmp=genom[rndInd1];
        genom[rndInd1]=genom[rndInd2];
        genom[rndInd2]=tmp;
    }
}

function fitnessFunction(genom){
    var distance=0;
    for(i=0;i<genom.length-1;i++){
        distance+=matrix[genom[i]][genom[i+1]];
    }
    distance+=calcDistance(genom[0],genom[genom.length-1]);
}

function run(n){
    matrix=createMatrix(n);

    var genomes=createFirstGeneration();
    for(i=0;i<generationCount;i++){
        genomes=selection(genomes);

        parents=randomArray(n);
        for(j=0;j<n-1;j+=2){
            cross(genomes,genomes[parent[j]],genomes[parent[j+1]]);
        }
    }

    var bestWay=genomes[0];
    var bestFF=fitnessFunction(genomes[0]);
    for(i=1;i<n;i++){
        if(fitnessFunction(genomes[i])<bestFF){
            bestFF=fitnessFunction(genomes[i]);
            bestWay=genomes[i];
        }
    }
    
    return bestWay;
}

function createMatrix(n){
    matrix=new Array();
    for (var i = 0; i < n; i++) {
        matrixA[i] = new Array;
    }

    for(i=0;i<n;i++){
        for(j=0;j<n;j++){
            matrix[i][j]=calcDistance(i,j);
        }
    }
    return matrix;
}

function calcDistance(point1, point2){
    return Math.sqrt(Math.pow(Vertices[point1].x-Vertices[point2].x,2)+Math.pow(Vertices[point1].y-Vertices[point2].y,2));
}