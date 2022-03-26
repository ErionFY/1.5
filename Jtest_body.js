
var matrixA=new Array();
// матрица, отображающая лабиринт 1-есть проход . 0-нет.
var size =canvasA.height=901;
canvasA.width=901;

var cA=document.getElementById("canvasA");
var ctxA=cA.getContext("2d");


var N=10;
var startPoint={x:-1,y:-1};
var finishPoint={x:-1,y:-1};
var typeA;
var pxvalue
paintingA();


function clickedA(types)
{
    typeA=types;
    
    cA.addEventListener('click', position);//{"once":true}
     //считываем тип кнопки и переходим на соответствующий if  в функции position
}



function position(event)
{
 var x=event.offsetX;
 var y=event.offsetY;//получаем координаты клика на canvas'e
 var Nx=Math.floor(x/pxvalue);
 var Ny=Math.floor(y/pxvalue);//получаем, клетку(координаты клетки)
 var colorSquare;
if(typeA==='startA'){

    if(Nx===finishPoint.x&&Ny===finishPoint.y){
        finishPoint.x=-1;
        finishPoint.y=-1;
    }//если закрашиваем клетку , которая окрашена в финиш , то её координаты сбрасываются

    matrixA[Ny][Nx]=1;
    colorSquare='green';
    ctxA.clearRect(startPoint.x*pxvalue+1,startPoint.y*pxvalue+1,pxvalue-2,pxvalue-2);
    startPoint.x=Nx;
    startPoint.y=Ny;
    ctxA.fillStyle=colorSquare;
    ctxA.fillRect(Nx*pxvalue+1,Ny*pxvalue+1,pxvalue-2,pxvalue-2)
}
else if(typeA==='finishA'){

    if(startPoint.x===Nx&&startPoint.y===Ny){
        startPoint.x=-1;
        startPoint.y=-1;
    }//если закрашиваем клетку , которая окрашена в старт , то её координаты сбрасываются

    matrixA[Ny][Nx]=1;
    colorSquare='red';
    ctxA.clearRect(finishPoint.x*pxvalue+1,finishPoint.y*pxvalue+1,pxvalue-2,pxvalue-2);
    finishPoint.x=Nx;
    finishPoint.y=Ny;
    ctxA.fillStyle=colorSquare;
    ctxA.fillRect(Nx*pxvalue+1,Ny*pxvalue+1,pxvalue-2,pxvalue-2)
}
else if(typeA==='impassable'&& matrixA[Ny][Nx]===1){//если клетка проходима
    if(Nx===finishPoint.x&&Ny===finishPoint.y){
        finishPoint.x=-1;
        finishPoint.y=-1;
    }
    else if(Nx===startPoint.x&&Ny===startPoint.y){
        startPoint.x=-1;
        startPoint.y=-1;
    }//проверка на перекрашивание старта или финиша,  и сброс соответствующей координаты

    colorSquare='darkblue';
    matrixA[Ny][Nx]=0; //клетка становится непроходимой - 0
    ctxA.fillStyle=colorSquare;
    ctxA.fillRect(Nx*pxvalue+1,Ny*pxvalue+1,pxvalue-2,pxvalue-2) //закращиваем
}
else if(typeA==='impassable'&&matrixA[Ny][Nx]===0){//если клетка непроходима
    matrixA[Ny][Nx]=1;//клетка становится проходимой
    ctxA.clearRect(Nx*pxvalue+1,Ny*pxvalue+1,pxvalue-2,pxvalue-2);//стираем цвет проходимой клетки
    
}
console.log(startPoint.x+" "+startPoint.y);
console.log(finishPoint.x+" "+finishPoint.y);
}



function paintingA()
{
    canvasA.width=901;
    size =canvasA.height=901;
   
    var N=document.getElementById("nA");
    N=N.value;
    //получилиN
for (var i=0;i<N;i++)
{
    matrixA[i]=new Array;
    for(var j=0;j<N;j++)
    {
        matrixA[i][j]=1;
    }
}
//создаём матрицу , после получения N
startPoint.x=-1;
startPoint.y=-1;
finishPoint.x=-1;
finishPoint.y=-1;
    pxvalue=Math.floor(size/N);
    var Fullpxval=N*pxvalue;

    canvasA.width=Fullpxval;
    size =canvasA.height=Fullpxval;
    //изменяем размеры canvas'a, чтобы не было белых линий
    ctxA.clearRect(0,0,size,size);//очищаем полностью canvas
    ctxA.beginPath();
    
    for(var i=0;i<=Fullpxval;i=i+pxvalue)
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

