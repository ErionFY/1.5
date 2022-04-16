var colorsClustor = ['Red', 'blue', 'DarkOrange', 'brown', 'Yellow',
    'Cyan', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue',
    'Crimson', 'CadetBlue', 'DarkBlue', 'DarkGoldenRod', 'DarkGray',
    'DarkGreen', 'DarkMagenta', 'DarkOliveGreen', 'blueviolet', 'DarkOrchid',
    'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DeepPink', 'DeepSkyBlue',
    'DimGrey', 'FireBrick', 'Gold', 'Green', 'GreenYellow',
    'HotPink', 'IndianRed', 'Lavender', 'LightBlue', 'LightCoral',
    'LightCyan', 'LightGreen', 'LightPink', 'Maroon', 'MediumSpringGreen',
    'Olive', 'OrangeRed', 'Orchid', 'Peru', 'aqua',
    'SaddleBrown', 'BurlyWood', 'SlateGray', 'Thistle', 'YellowGreen'
];
var dK = document.getElementById("Kvalue");
var cClastor = document.getElementById("canvasClastorization");
var ctxC = cClastor.getContext("2d");
var sizeC = canvasClastorization.height = canvasClastorization.width = 901;
cClastor.addEventListener('click', pushPoint);
var pointsArr = [];
var RadiusPaint = 6;
var DKoef = document.getElementById("HierarhKoef");

function pushPoint(event) {
    var XCord = event.offsetX;
    var YCord = event.offsetY;
    var coords = { x: XCord, y: YCord, Claster: "" };
    PaintDot(coords, 'black');
    pointsArr.push(coords);
}

function PaintDot(coords, color) {
    ctxC.beginPath();
    ctxC.arc(coords.x, coords.y, RadiusPaint, 0, 2 * Math.PI);
    ctxC.fillStyle = color;
    ctxC.fill();
}

function distBtwPoints(point1, point2) {
    var dist = Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
    return dist;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomIntForKMeans(K, Numberpoints) {
    var arr = [];
    while (arr.length < K) {
        var R = getRandomInt(Numberpoints);
        if (!arr.includes(R)) arr.push(R);
    }
    return arr;
}

function KmeansC() { //k=50-максимум
    var K = parseInt(dK.value);
    var NumberOfPoints = pointsArr.length;
    var flag = 1;
    if (K > NumberOfPoints) { return; } //количество точек меньше, чем k
    var centroid = [];
    let nextPosCentroid = [];
    var randElemnts = getRandomIntForKMeans(K, NumberOfPoints);

    for (let elem of randElemnts){
        centroid.push({x:pointsArr[elem].x,y:pointsArr[elem].y});
    }

    for (var i = 0; i < K; i++) {
        nextPosCentroid.push({ sumX: 0, sumY: 0, num: 0 });
    }

    while (flag) {
        flag = 0;

        for(let position of nextPosCentroid){
            position.sumX = 0;
            position.sumY = 0;
            position.num = 0;
        }

        for(let point of pointsArr){
            var minDist = 10000;
            var NumOfClaster;
            var curDist;
            for (let cent of centroid){
                curDist = distBtwPoints(cent, point);
                if (minDist > curDist) {
                    minDist = curDist;
                    NumOfClaster = centroid.indexOf(cent);
                }
            }
            if (point.Claster !== NumOfClaster && !flag) flag = 1;
            point.Claster = NumOfClaster;

            nextPosCentroid[NumOfClaster].sumX += point.x;
            nextPosCentroid[NumOfClaster].sumY += point.y;
            nextPosCentroid[NumOfClaster].num += 1;
        }

        for (var i = 0; i < K; i++) {
            centroid[i].x = Math.floor(nextPosCentroid[i].sumX / nextPosCentroid[i].num);
            centroid[i].y = Math.floor(nextPosCentroid[i].sumY / nextPosCentroid[i].num);
        }
    }

    //рисование
    PaintingClust();
}

function clearClust() {
    pointsArr = [];
    ctxC.clearRect(0, 0, canvasClastorization.width, canvasClastorization.height);
}

function PaintingClust() {
    for (let point of pointsArr){
        PaintDot(point, colorsClustor[point.Claster])
    }
}

function Hierarhic() {
    var koef = Number(DKoef.value) / 100;
    var NumOfPoints = pointsArr.length;
    for (var i = 0; i < NumOfPoints; i++) {
        pointsArr[i].Claster = i;
    }

    var Dist = MatrixOfDist(NumOfPoints);
    var minDist = { i: "", j: "", Distance: 100000 };
    var CurMinDist = 0;
    var PrevMinDist = 0
    var count = 0;
    while (true) {
        minDist.Distance = 100000;

        for (var i = 1; i < NumOfPoints; i++) {
            for (var j = 0; j < i; j++) {
                if (pointsArr[i].Claster !== pointsArr[j].Claster) {
                    if (Dist[i][j] < minDist.Distance && PrevMinDist < Dist[i][j]) {
                        minDist.Distance = Dist[i][j];
                        minDist.i = i;
                        minDist.j = j;
                    }
                }
            }
        }

        CurMinDist = minDist.Distance;

        if (PrevMinDist * koef < CurMinDist && PrevMinDist !== 0) { break; }

        var ClustValue = pointsArr[minDist.i].Claster;
        for (var l = 0; l < NumOfPoints; l++) {
            if (pointsArr[l].Claster === ClustValue) {
                pointsArr[l].Claster = pointsArr[minDist.j].Claster
            }
        }

        PrevMinDist = CurMinDist;
        count++;
        if (count === NumOfPoints - 2) { break; }
    }

    var NumOfClusters = [];
    for(let point of pointsArr){
        if (!NumOfClusters.includes(point.Claster)){
            NumOfClusters.push(point.Claster);
        }
    }

    var sizeOfNumOfClusters = NumOfClusters.length;

    for (var i = 0; i < sizeOfNumOfClusters; i++) {
        for(let point of pointsArr){
            if (point.Claster === NumOfClusters[i]) {
                point.Claster = i;
            }
        }
    }

    //рисование
    PaintingClust();
}

function MatrixOfDist(NumberOfPoints) {
    var matrixDist = new Array();
    for (var i = 0; i < NumberOfPoints; i++) {
        matrixDist[i] = new Array();
        for (var j = 0; j < NumberOfPoints; j++) {
            matrixDist[i][j] = distBtwPoints(pointsArr[i], pointsArr[j]);
        }
    }
    return matrixDist

}

function KmeansCriteriy() {

}