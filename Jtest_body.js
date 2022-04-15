var matrixA = new Array(); //[y][x]
// матрица, отображающая лабиринт 1-есть проход . 0-нет.
const WALL = 0;
const PASS = 1;
var sizeA = canvasA.height = canvasA.width = 901;

var cA = document.getElementById("canvasA");
var ctxA = cA.getContext("2d");

var NA = 10;
var startPointA = { x: -1, y: -1 };
var finishPointA = { x: -1, y: -1 };
var typeA;
var pxvalueA


paintingA();
getTimeDelayA();


function clickedA(types) {

    typeA = types;
    cA.addEventListener('click', positionA);
    //{"once":true}
    //считываем тип кнопки и переходим на соответствующий if  в функции position
}

function positionA(event) {
    clearBeforeClickA();
    var x = event.offsetX;
    var y = event.offsetY; //получаем координаты клика на canvas'e
    var Nx = Math.floor(x / pxvalueA);
    var Ny = Math.floor(y / pxvalueA); //получаем, клетку(координаты клетки)

    if (typeA === 'startA') {

        if (Nx === finishPointA.x && Ny === finishPointA.y) {
            finishPointA.x = -1;
            finishPointA.y = -1;
        } //если закрашиваем клетку , которая окрашена в финиш , то её координаты сбрасываются

        matrixA[Ny][Nx] = 1;
        colorSquare = 'green';
        ctxA.clearRect(startPointA.x * pxvalueA + 1, startPointA.y * pxvalueA + 1, pxvalueA - 2, pxvalueA - 2);
        startPointA.x = Nx;
        startPointA.y = Ny;
        ctxA.fillStyle = colorSquare;
        ctxA.fillRect(Nx * pxvalueA + 1, Ny * pxvalueA + 1, pxvalueA - 2, pxvalueA - 2)
    } else if (typeA === 'finishA') {

        if (startPointA.x === Nx && startPointA.y === Ny) {
            startPointA.x = -1;
            startPointA.y = -1;
        } //если закрашиваем клетку , которая окрашена в старт , то её координаты сбрасываются

        matrixA[Ny][Nx] = 1;
        colorSquare = 'red';
        ctxA.clearRect(finishPointA.x * pxvalueA + 1, finishPointA.y * pxvalueA + 1, pxvalueA - 2, pxvalueA - 2);
        finishPointA.x = Nx;
        finishPointA.y = Ny;
        ctxA.fillStyle = colorSquare;
        ctxA.fillRect(Nx * pxvalueA + 1, Ny * pxvalueA + 1, pxvalueA - 2, pxvalueA - 2)
    } else if (typeA === 'impassable' && matrixA[Ny][Nx] === 1) { //если клетка проходима
        if (Nx === finishPointA.x && Ny === finishPointA.y) {
            finishPointA.x = -1;
            finishPointA.y = -1;
        } else if (Nx === startPointA.x && Ny === startPointA.y) {
            startPointA.x = -1;
            startPointA.y = -1;
        } //проверка на перекрашивание старта или финиша,  и сброс соответствующей координаты

        colorSquare = 'darkblue';
        matrixA[Ny][Nx] = 0; //клетка становится непроходимой - 0
        ctxA.fillStyle = colorSquare;
        ctxA.fillRect(Nx * pxvalueA + 1, Ny * pxvalueA + 1, pxvalueA - 2, pxvalueA - 2) //закращиваем
    } else if (typeA === 'impassable' && matrixA[Ny][Nx] === 0) { //если клетка непроходима
        matrixA[Ny][Nx] = 1; //клетка становится проходимой
        ctxA.clearRect(Nx * pxvalueA + 1, Ny * pxvalueA + 1, pxvalueA - 2, pxvalueA - 2); //стираем цвет проходимой клетки
    }
}

function paintingA() {
    canvasA.width = 901;
    sizeA = canvasA.height = 901;
    NAd = document.getElementById("nA");
    if (NAd.value < 2) { alert('Кто-то ввёл число, меньшее 2 ☉ ‿ ⚆'); return; }
    if (NAd.value > 100) { alert('Кто-то ввёл число, большее 100 ☉ ‿ ⚆'); return; }
    NA = NAd.value;
    //получили N
    for (var i = 0; i < NA; i++) {
        matrixA[i] = new Array;
        for (var j = 0; j < NA; j++) {
            matrixA[i][j] = 1;
        }
    }
    //создаём матрицу , после получения N
    startPointA.x = -1;
    startPointA.y = -1;
    finishPointA.x = -1;
    finishPointA.y = -1;
    pxvalueA = Math.floor(sizeA / NA);
    var Fullpxval = NA * pxvalueA;

    canvasA.width = Fullpxval;
    sizeA = canvasA.height = Fullpxval;
    //изменяем размеры canvas'a, чтобы не было белых линий
    ctxA.clearRect(0, 0, sizeA, sizeA); //очищаем полностью canvas
    ctxA.beginPath();

    for (var i = 0; i <= Fullpxval; i = i + pxvalueA) {

        ctxA.moveTo(i, 0);
        ctxA.lineTo(i, Fullpxval);
        ctxA.stroke();

        ctxA.moveTo(0, i);
        ctxA.lineTo(Fullpxval, i);
        ctxA.stroke();
    }
    //рисование линий по вертикали и горизонтали
}

//------------------------------------------------------------------------------------------
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

function searchA() {
    if (startPointA.x == -1 && startPointA.y == -1) { alert('Кто-то не разместил стартовую позицию ☉ ‿ ⚆'); return; }
    if (finishPointA.x == -1 && finishPointA.y == -1) { alert('Кто-то не разместил финишную позицию ☉ ‿ ⚆'); return; }
    clearBeforeClickA();
    searchPathA(NA, matrixA, startPointA, finishPointA);
}

async function searchPathA(n, matrix, startPoint, finishPoint) {
    // В матрице: 0 - стена, 1 - проход
    getTimeDelayA();

    let queue = [];
    let prevPoint = new Array(n * n);
    prevPoint.fill({ x: -1, y: -1 });
    queue.push(startPoint);
    let current = startPoint;

    while (queue.length != 0) {
        if (!equalA(current, startPoint) && !equalA(current, finishPoint)) {
            changeColorA('darkorange', current);
        }
        current = queue.shift();
        if (!equalA(current, startPoint) && !equalA(current, finishPoint)) {
            changeColorA('pink', current);
        }
        await sleep(timeDelA);
        if (equalA(current, finishPoint)) {
            let stack = [];
            while (current != startPoint) {
                stack.push(current); //          chartreuse
                if (!equalA(current, finishPoint)) {
                    changeColorA('chartreuse', current);
                    await sleep(timeDelA)
                }
                current = prevPoint[current.y * NA + current.x];
            }
            stack.push(current);
            clearAfterSearchA(stack);
            return;
        }
        adjacentCellsA(current, n).forEach(function(nextPoint) {
            if (!equalA(prevPoint[current.y * NA + current.x], nextPoint) && matrix[nextPoint.y][nextPoint.x] == 1) {
                if (prevPoint[nextPoint.y * NA + nextPoint.x].x === -1 && prevPoint[nextPoint.y * NA + nextPoint.x].y === -1) {
                    queue.push(nextPoint); //;жёлтый
                    if (!equalA(nextPoint, finishPoint)) {
                        changeColorA('yellow', nextPoint);
                    }
                    prevPoint[nextPoint.y * NA + nextPoint.x] = current;
                }

            }
        });
        await sleep(timeDelA)
    }
    alert('Кто-то создал лабиринт, в котором не существует маршрута от старта до финиша ☉ ‿ ⚆');
    return;
}

function adjacentCellsA(point, n, dist = 1) {
    let array = [];
    if (point.x - dist >= 0) {
        array.push({ x: point.x - dist, y: point.y });
    }
    if (point.x + dist < n) {
        array.push({ x: point.x + dist, y: point.y });
    }
    if (point.y - dist >= 0) {
        array.push({ x: point.x, y: point.y - dist });
    }
    if (point.y + dist < n) {
        array.push({ x: point.x, y: point.y + dist });
    }
    return array;
}

function equalA(point1, point2) {
    if (point1.x == point2.x && point1.y == point2.y) {
        return true;
    }
    return false;
}

function clearAfterSearchA(pathA) {
    var pathSizeA = pathA.length;
    var flag;
    for (var i = 0; i < NA; i++) {
        for (var j = 0; j < NA; j++) {
            if (matrixA[i][j] === 1) {
                flag = 1;
                for (var l = 0; l < pathSizeA; l++) {
                    if (pathA[l].y === i && pathA[l].x === j) {
                        flag = 0;
                        break;
                    }
                }

                if (flag) {
                    ctxA.clearRect(j * pxvalueA + 1, i * pxvalueA + 1, pxvalueA - 2, pxvalueA - 2);
                }
            }
        }
    }
    return;
}

function clearBeforeClickA() {
    for (var i = 0; i < NA; i++) {
        for (var j = 0; j < NA; j++) {
            if (matrixA[i][j] === 1 && !(startPointA.x === j && startPointA.y === i) && !(finishPointA.x === j && finishPointA.y === i)) {
                ctxA.clearRect(j * pxvalueA + 1, i * pxvalueA + 1, pxvalueA - 2, pxvalueA - 2);
            }
        }
    }
}

function changeColorA(colorA, point) {
    ctxA.fillStyle = colorA;
    ctxA.fillRect(point.x * pxvalueA + 1, point.y * pxvalueA + 1, pxvalueA - 2, pxvalueA - 2);
}

function getTimeDelayA() {
    var timeDelAd = document.getElementById("timeDelay");
    if (timeDelAd.value < 1) { alert('Кто-то ввёл число, меньшее 1 ☉ ‿ ⚆'); return; }
    timeDelA = timeDelAd.value;
}

function randomIntGA(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMaze(matrix, n) {
    var visited = new Array();
    for (var i = 0; i < n; i++) {
        visited[i] = new Array;
        for (var j = 0; j < n; j++) {
            visited[i][j] = false;
        }
    }

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            matrix[i][j] = WALL;
        }
    }
    let x = randomIntGA(0, n - 1);
    let y = randomIntGA(0, n - 1);
    matrix[x][y] = PASS;
    var current;
    var adjacentCells;
    let walls = adjacentCellsA({ x: x, y: y }, n, 2);


    while (walls.length != 0) {
        let index = randomIntGA(0, walls.length - 1);
        current = walls[index];
        visited[current.x][current.y] = true;
        matrix[current.x][current.y] = PASS;
        adjacentCells = adjacentCellsA(current, n, 2)
        while (true) {
            cell = adjacentCells[randomIntGA(0, adjacentCells.length - 1)];
            if (matrix[cell.x][cell.y] == PASS) {
                matrix[parseInt((cell.x + current.x) / 2)][parseInt((cell.y + current.y) / 2)] = PASS;
                break;
            }
        }

        adjacentCellsA(current, n, 2).forEach(function(cell) {
            if (!visited[cell.x][cell.y]) {
                walls.push(cell);
                visited[cell.x][cell.y] = true;
            }
        });


        walls.splice(index, 1);
    }

    for(var i=0;i<n;i++){
        matrix[0][i]=WALL;
        matrix[n-1][i]=WALL;
        matrix[i][0]=WALL;
        matrix[i][n-1]=WALL;
    }
}

function generation() {
    paintingA();
    generateMaze(matrixA, NA);
    for (var i = 0; i < NA; i++) {
        for (var j = 0; j < NA; j++) {
            if (matrixA[i][j] === 0) {
                ctxA.fillStyle = 'darkblue';
                ctxA.fillRect(j * pxvalueA + 1, i * pxvalueA + 1, pxvalueA - 2, pxvalueA - 2);
            }
        }
    }
}