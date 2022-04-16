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
var Points = [];
var RadiusPaint = 6;
var DKoef = document.getElementById("HierarhKoef");

function pushPoint(event) {
    var XCord = event.offsetX;
    var YCord = event.offsetY;
    var coords = { x: XCord, y: YCord, Claster: "" };
    PaintDot(coords, 'black');
    Points.push(coords);
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
    var NumberOfPoints = Points.length;
    var flag = 1;
    if (K > NumberOfPoints) { return; } //количество точек меньше, чем k
    var centroid = [];
    let nextPosCentroid = [];
    var randElemnts = getRandomIntForKMeans(K, NumberOfPoints);

    for (var i = 0; i < K; i++) {
        centroid.push({ x: Points[randElemnts[i]].x, y: Points[randElemnts[i]].y });
    }

    for (var i = 0; i < K; i++) {
        nextPosCentroid.push({ sumX: 0, sumY: 0, num: 0 });
    }

    while (flag) {
        flag = 0;

        for (var i = 0; i < K; i++) {
            nextPosCentroid[i].sumX = 0;
            nextPosCentroid[i].sumY = 0;
            nextPosCentroid[i].num = 0;
        }

        for (var i = 0; i < NumberOfPoints; i++) {
            var minDist = 10000;
            var NumOfClaster;
            var curDist;
            for (var j = 0; j < K; j++) {
                curDist = distBtwPoints(centroid[j], Points[i]);
                if (minDist > curDist) {
                    minDist = curDist;
                    NumOfClaster = j;
                }
            }
            if (Points[i].Claster !== NumOfClaster && !flag) flag = 1;
            Points[i].Claster = NumOfClaster;

            nextPosCentroid[NumOfClaster].sumX += Points[i].x;
            nextPosCentroid[NumOfClaster].sumY += Points[i].y;
            nextPosCentroid[NumOfClaster].num += 1;
        }

        for (var i = 0; i < K; i++) {
            centroid[i].x = Math.floor(nextPosCentroid[i].sumX / nextPosCentroid[i].num);
            centroid[i].y = Math.floor(nextPosCentroid[i].sumY / nextPosCentroid[i].num);
        }
    }

    //рисование
    for (var i = 0; i < NumberOfPoints; i++) {
        PaintDot(Points[i], colorsClustor[Points[i].Claster]);
    }
}

function clearClust() {
    Points = [];
    ctxC.clearRect(0, 0, canvasClastorization.width, canvasClastorization.height);
}

function PaintingClust() {
    for (var i = 0; i < NumberOfPoints; i++) {
        PaintDot(Points[i], colorsClustor[Points[i].Claster]);
    }
}

function Hierarhic() {
    var koef = Number(DKoef.value) / 100;
    var NumOfPoints = Points.length;
    for (var i = 0; i < NumOfPoints; i++) {
        Points[i].Claster = i;
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
                if (Points[i].Claster !== Points[j].Claster) {
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

        var ClustValue = Points[minDist.i].Claster;
        for (var l = 0; l < NumOfPoints; l++) {
            if (Points[l].Claster === ClustValue) {
                Points[l].Claster = Points[minDist.j].Claster
            }
        }

        PrevMinDist = CurMinDist;
        count++;
        if (count === NumOfPoints - 2) { break; }
    }

    var NumOfClusters = [];
    for (var i = 0; i < NumOfPoints; i++) {
        if (!NumOfClusters.includes(Points[i].Claster)) NumOfClusters.push(Points[i].Claster);
    }

    var sizeOfNumOfClusters = NumOfClusters.length;

    for (var i = 0; i < sizeOfNumOfClusters; i++) {
        for (var j = 0; j < NumOfPoints; j++) {
            if (Points[j].Claster === NumOfClusters[i]) {
                Points[j].Claster = i;
            }
        }
    }

    //рисование
    for (var i = 0; i < NumOfPoints; i++) {
        PaintDot(Points[i], colorsClustor[Points[i].Claster]);
    }
}

function MatrixOfDist(NumberOfPoints) {
    var matrixDist = new Array();
    for (var i = 0; i < NumberOfPoints; i++) {
        matrixDist[i] = new Array();
        for (var j = 0; j < NumberOfPoints; j++) {
            matrixDist[i][j] = distBtwPoints(Points[i], Points[j]);
        }
    }
    return matrixDist

}

function KmeansCriteriy() {

}