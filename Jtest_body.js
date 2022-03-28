var matrixA=new Array();//[y][x]
// матрица, отображающая лабиринт 1-есть проход . 0-нет.
var sizeA =canvasA.height=901;
canvasA.width=901;



var cA=document.getElementById("canvasA");
var ctxA=cA.getContext("2d");

var NA=10;
var startPointA={x:-1,y:-1};
var finishPointA={x:-1,y:-1};
var typeA;
var pxvalueA


paintingA();
getTimeDelayA();


function clickedA(types)
{
    
    typeA=types;
    cA.addEventListener('click', positionA);
//{"once":true}
     //считываем тип кнопки и переходим на соответствующий if  в функции position
}

function positionA(event)
{
    clearBeforeClick();
 var x=event.offsetX;
 var y=event.offsetY;//получаем координаты клика на canvas'e
 var Nx=Math.floor(x/pxvalueA);
 var Ny=Math.floor(y/pxvalueA);//получаем, клетку(координаты клетки)
 
if(typeA==='startA'){

    if(Nx===finishPointA.x&&Ny===finishPointA.y){
        finishPointA.x=-1;
        finishPointA.y=-1;
    }//если закрашиваем клетку , которая окрашена в финиш , то её координаты сбрасываются

    matrixA[Ny][Nx]=1;
    colorSquare='green';
    ctxA.clearRect(startPointA.x*pxvalueA+1,startPointA.y*pxvalueA+1,pxvalueA-2,pxvalueA-2);
    startPointA.x=Nx;
    startPointA.y=Ny;
    ctxA.fillStyle=colorSquare;
    ctxA.fillRect(Nx*pxvalueA+1,Ny*pxvalueA+1,pxvalueA-2,pxvalueA-2)
}
else if(typeA==='finishA'){

    if(startPointA.x===Nx&&startPointA.y===Ny){
        startPointA.x=-1;
        startPointA.y=-1;
    }//если закрашиваем клетку , которая окрашена в старт , то её координаты сбрасываются

    matrixA[Ny][Nx]=1;
    colorSquare='red';
    ctxA.clearRect(finishPointA.x*pxvalueA+1,finishPointA.y*pxvalueA+1,pxvalueA-2,pxvalueA-2);
    finishPointA.x=Nx;
    finishPointA.y=Ny;
    ctxA.fillStyle=colorSquare;
    ctxA.fillRect(Nx*pxvalueA+1,Ny*pxvalueA+1,pxvalueA-2,pxvalueA-2)
}
else if(typeA==='impassable'&& matrixA[Ny][Nx]===1){//если клетка проходима
    if(Nx===finishPointA.x&&Ny===finishPointA.y){
        finishPointA.x=-1;
        finishPointA.y=-1;
    }
    else if(Nx===startPointA.x&&Ny===startPointA.y){
        startPointA.x=-1;
        startPointA.y=-1;
    }//проверка на перекрашивание старта или финиша,  и сброс соответствующей координаты

    colorSquare='darkblue';
    matrixA[Ny][Nx]=0; //клетка становится непроходимой - 0
    ctxA.fillStyle=colorSquare;
    ctxA.fillRect(Nx*pxvalueA+1,Ny*pxvalueA+1,pxvalueA-2,pxvalueA-2) //закращиваем
}
else if(typeA==='impassable'&&matrixA[Ny][Nx]===0){//если клетка непроходима
    matrixA[Ny][Nx]=1;//клетка становится проходимой
    ctxA.clearRect(Nx*pxvalueA+1,Ny*pxvalueA+1,pxvalueA-2,pxvalueA-2);//стираем цвет проходимой клетки
    
}
console.log(startPointA.x+" "+startPointA.y);
console.log(finishPointA.x+" "+finishPointA.y);
}

function paintingA()
{
    canvasA.width=901;
    sizeA =canvasA.height=901;
    NAd=document.getElementById("nA");
    if(NAd.value<2){alert('Кто-то ввёл число, меньшее 2 ☉ ‿ ⚆');return;}
    if(NAd.value>100){alert('Кто-то ввёл число, большее 100 ☉ ‿ ⚆');return;}
    NA=NAd.value;
    //получили N
for (var i=0;i<NA;i++)
{
    matrixA[i]=new Array;
    for(var j=0;j<NA;j++)
    {
        matrixA[i][j]=1;
    }
}
//создаём матрицу , после получения N
startPointA.x=-1;
startPointA.y=-1;
finishPointA.x=-1;
finishPointA.y=-1;
    pxvalueA=Math.floor(sizeA/NA);
    var Fullpxval=NA*pxvalueA;

    canvasA.width=Fullpxval;
    sizeA =canvasA.height=Fullpxval;
    //изменяем размеры canvas'a, чтобы не было белых линий
    ctxA.clearRect(0,0,sizeA,sizeA);//очищаем полностью canvas
    ctxA.beginPath();
    
    for(var i=0;i<=Fullpxval;i=i+pxvalueA)
    {   

        ctxA.moveTo(i,0);
        ctxA.lineTo(i,Fullpxval);
        ctxA.stroke();

        ctxA.moveTo(0,i);
        ctxA.lineTo(Fullpxval,i);
        ctxA.stroke();
    }
//рисование линий по вертикали и горизонтали
}

//------------------------------------------------------------------------------------------
function sleep(time){
    return new Promise((resolve)=>setTimeout(resolve,time))
}

function searchA()
{   if(startPointA.x==-1&&startPointA.y==-1){alert('Кто-то не разместил стартовую позицию ☉ ‿ ⚆'); return;}
    if(finishPointA.x==-1&&finishPointA.y==-1){alert('Кто-то не разместил финишную позицию ☉ ‿ ⚆'); return;}
    clearBeforeClick();
    searchPath(NA,matrixA,startPointA,finishPointA);
}

async function searchPath(n, matrix, startPoint, finishPoint){
    // В матрице: 0 - стена, 1 - проход
    getTimeDelayA();

    let queue=[];
    let prevPoint=new Array(n*n);
    prevPoint.fill({x:-1,y:-1});
    queue.push(startPoint);
    let current=startPoint;

    while(queue.length!=0){
        if(!equalA(current,startPoint)&&!equalA(current,finishPoint)){
            changeColor('darkorange',current);
        }
        current=queue.shift();
        if(!equalA(current,startPoint)&&!equalA(current,finishPoint)){
            changeColor('pink',current);
        }
        await sleep(timeDelA);
        if(equalA(current,finishPoint)){
            let stack=[];
            while(current!=startPoint){
                stack.push(current);//          chartreuse
                if(!equalA(current,finishPoint)){
                    changeColor('chartreuse',current);
                    await sleep(timeDelA)
                }
                current=prevPoint[current.y*NA+current.x];
            }
            stack.push(current);
            clearAfterSearch(stack);
            return;
        }
        adjacentCellsA(current,n).forEach(function(nextPoint){
            if(!equalA(prevPoint[current.y*NA+current.x],nextPoint) && matrix[nextPoint.y][nextPoint.x]==1){
                if(prevPoint[nextPoint.y*NA+nextPoint.x].x===-1&&prevPoint[nextPoint.y*NA+nextPoint.x].y===-1){
                queue.push(nextPoint);//;жёлтый
                if(!equalA(nextPoint,finishPoint)){
                    changeColor('yellow',nextPoint);
                }
                prevPoint[nextPoint.y*NA+nextPoint.x]=current;
                }
                
            }
        });
        await sleep(timeDelA)
    }
     alert('Кто-то создал лабиринт, в котором не существует маршрута от старта до финиша ☉ ‿ ⚆');
     return;
}

function adjacentCellsA(point,n){
    let array = [];
    if (point.x>0){
        array.push({x:point.x-1,y:point.y});
    }
    if(point.x+1<n){
        array.push({x:point.x+1,y:point.y});
    }
    if(point.y>0){
        array.push({x:point.x,y:point.y-1});
    }
    if(point.y+1<n){
        array.push({x:point.x,y:point.y+1});
    }
    return array;
}

function equalA(point1,point2){
    if(point1.x==point2.x && point1.y==point2.y){
        return true;
    }
    return false;
}

function clearAfterSearch(pathA)
{   var pathSizeA=pathA.length;
    var flag;
    for(var i=0;i<NA;i++)
    {
        for(var j=0;j<NA;j++)
        {
            if(matrixA[i][j]===1)
            {
                flag=1;
                for(var l=0;l<pathSizeA;l++)
                {
                    if(pathA[l].y===i&&pathA[l].x===j)
                    {
                        flag=0;
                        break;
                    }
                }
                
                if(flag)
                {
                    ctxA.clearRect(j*pxvalueA+1,i*pxvalueA+1,pxvalueA-2,pxvalueA-2);
                }
            }
        }
    }
    return;
}

function clearBeforeClick()
{
    for(var i=0;i<NA;i++)
    {
        for(var j=0;j<NA;j++)
        {
            if(matrixA[i][j]===1&&!(startPointA.x===j&&startPointA.y===i)&&!(finishPointA.x===j&&finishPointA.y===i))
            {
                ctxA.clearRect(j*pxvalueA+1,i*pxvalueA+1,pxvalueA-2,pxvalueA-2);
            }
        }
    }
}
function changeColor(colorA,point){
    ctxA.fillStyle=colorA;
    ctxA.fillRect(point.x*pxvalueA+1,point.y*pxvalueA+1,pxvalueA-2,pxvalueA-2);
}

function getTimeDelayA()
{
    var timeDelAd=document.getElementById("timeDelay");
    if(timeDelAd.value<1){alert('Кто-то ввёл число, меньшее 1 ☉ ‿ ⚆');return;}
    timeDelA=timeDelAd.value;
}