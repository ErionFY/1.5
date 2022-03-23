var size =canvasA.height=901;
canvasA.width=901;

var cA=document.getElementById("canvasA");
var ctxA=cA.getContext("2d");

function clearA()
{
    ctxA.clearRect(0,0,size,size);
}

startA()
{

}

finishA()
{

}

function paintingA()
{
    var N=document.getElementById("nA");
    N=N.value;

    canvasA.width=901;
    size =canvasA.height=901;

    var pxvalue=Math.floor(size/N);
    var Fullpxval=N*pxvalue;

    canvasA.width=Fullpxval;
    size =canvasA.height=Fullpxval;

    clearA()
    ctxA.beginPath();
    
    for(var i=0;i<=Fullpxval;i=i+pxvalue)
    {   

        ctxA.moveTo(i,1);
        ctxA.lineTo(i,Fullpxval);
        ctxA.stroke();

        ctxA.moveTo(1,i);
        ctxA.lineTo(Fullpxval,i);
        ctxA.stroke();
    }

}

function searchPath(n, matrix, startPoint, finishPoint){
    // В матрице: 0 - стена, 1 - проход
    let queue=[];
    let prevPoint=new Array(n*n);
    prevPoint.fill(-1);
    queue.push(startPoint);
    let current;

    while(queue.length==0){
        current=queue.shift();
        if(current=finishPoint){
            break;
        }
        adjacentCells(current).forEach(function(nextPoint){
            if(prevPoint[current]!=nextPoint && matrix[Math.floor(nextPoint/n)][nextPoint%n]==1){
                queue.push(nextPoint);
                prevPoint[nextPoint]=current;
            }
        });
    }
}

function adjacentCells(point,n){
    let array = [];
    if (point%n!=0){
        array.push(point-1);
    }
    if(point+1%n!=0){
        array.push(point+1);
    }
    if(point>=n){
        array.push(point-n);
    }
    if(point+n<n*n){
        array.push(point+n);
    }
    return array;
}