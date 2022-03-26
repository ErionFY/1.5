
var matrixA=new Array();

var size =canvasA.height=901;
canvasA.width=901;

var cA=document.getElementById("canvasA");
var ctxA=cA.getContext("2d");


var N;
var startPoint={x:"",y:""};
var finishPoint={x:"",y:""};
var typeA;
var pxvalue



function clickedA(types)
{
    typeA=types;
    if(typeA==='startA'){
       cA.addEventListener('click', position);//{"once":true}
    }

    if(typeA==='finishA'){
       cA.addEventListener('click', position);//,{"once":true}
    }

    if(typeA==='impassable'){
        cA.addEventListener('click', position,);
     }
}



function position(event)
{
 var x=event.offsetX;
 var y=event.offsetY;
 var Nx=Math.floor(x/pxvalue);
 var Ny=Math.floor(y/pxvalue);
 var colorSquare;
if(typeA==='startA'){

    if(Nx===finishPoint.x&&Ny===finishPoint.y)
    {
        finishPoint.x=-1;
        finishPoint.y=-1;
    }

    matrixA[Ny][Nx]=1;
    colorSquare='green';
    ctxA.clearRect(startPoint.x*pxvalue+1,startPoint.y*pxvalue+1,pxvalue-2,pxvalue-2);
    startPoint.x=Nx;
    startPoint.y=Ny;
    ctxA.fillStyle=colorSquare;
    ctxA.fillRect(Nx*pxvalue+1,Ny*pxvalue+1,pxvalue-2,pxvalue-2)
}
else if(typeA==='finishA'){

    if(startPoint.x===Nx&&startPoint.y===Ny)
    {
        startPoint.x=-1;
        startPoint.y=-1;
    }

    matrixA[Ny][Nx]=1;
    colorSquare='red';
    ctxA.clearRect(finishPoint.x*pxvalue+1,finishPoint.y*pxvalue+1,pxvalue-2,pxvalue-2);
    finishPoint.x=Nx;
    finishPoint.y=Ny;
    ctxA.fillStyle=colorSquare;
    ctxA.fillRect(Nx*pxvalue+1,Ny*pxvalue+1,pxvalue-2,pxvalue-2)
}
else if(typeA==='impassable'&& matrixA[Ny][Nx]===1){
    
    if(Nx===finishPoint.x&&Ny===finishPoint.y)
    {
        finishPoint.x=-1;
        finishPoint.y=-1;
    }
    else if(Nx===startPoint.x&&Ny===startPoint.y)
    {
        startPoint.x=-1;
        startPoint.y=-1;
    }

    colorSquare='darkblue';
    matrixA[Ny][Nx]=0;
    ctxA.fillStyle=colorSquare;
    ctxA.fillRect(Nx*pxvalue+1,Ny*pxvalue+1,pxvalue-2,pxvalue-2)
}
else if(typeA==='impassable'&&matrixA[Ny][Nx]===0){
    
    
    matrixA[Ny][Nx]=1;
    ctxA.clearRect(Nx*pxvalue+1,Ny*pxvalue+1,pxvalue-2,pxvalue-2);
    
}
console.log(startPoint.x+" "+startPoint.y);
console.log(finishPoint.x+" "+finishPoint.y);
}


function clearA(){ctxA.clearRect(0,0,size,size);}

function paintingA()
{
    canvasA.width=901;
    size =canvasA.height=901;
   
    var N=document.getElementById("nA");
    N=N.value;
    
for (var i=0;i<N;i++)
{
    matrixA[i]=new Array;
    for(var j=0;j<N;j++)
    {
        matrixA[i][j]=1;
    }
}

startPoint.x=-1;
startPoint.y=-1;
finishPoint.x=-1;
finishPoint.y=-1;
    pxvalue=Math.floor(size/N);
    var Fullpxval=N*pxvalue;

    canvasA.width=Fullpxval;
    size =canvasA.height=Fullpxval;

    clearA()
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

}

