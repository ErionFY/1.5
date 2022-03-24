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

function Point(x,y){
    this.x=x;
    this.y=y;
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
        if(equal(current,finishPoint)){
            let stack=[];
            while(current==startPoint){
                stack.push(current);
                current=prevPoint[current];
            }
            stack.push(current);
            return stack;
        }
        adjacentCells(current,n).forEach(function(nextPoint){
            if(equal(prevPoint[current],nextPoint) && matrix[nextPoint.x][nextPoint.y]==1){
                queue.push(nextPoint);
                prevPoint[nextPoint]=current;
            }
        });
    }


}

function adjacentCells(point,n){
    let array = [];
    if (point.x>0){
        array.push(new Point(x-1,y));
    }
    if(point.x+1<n){
        array.push(new Point(x+1,y));
    }
    if(point.y>0){
        array.push(new Point(x,y-1));
    }
    if(point.y+1<n){
        array.push(new Point(x,y+1));
    }
    return array;
}

function equal(point1,point2){
    if(point1.x==point2.x && point1.y==point2.y){
        return true;
    }
    return false;
}