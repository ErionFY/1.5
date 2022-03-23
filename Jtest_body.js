class Graph{

constructor(n)
{
this.n=n*n;
this.matrix=new Array();
for(var i=0;i<this.n;i++)
{
    this.matrix[i]=new Array();
      for(var j=0;j<this.n;j++)
    {   
        this.matrix[i][j]=1;
    }
}

}

};


var size =canvasA.height=901;
canvasA.width=901;

var cA=document.getElementById("canvasA");
var ctxA=cA.getContext("2d");

var N;
var startPoint={x:"",y:""};
var finishPoint={x:"",y:""};
var typeA;
var pxvalue

var G=new Graph(N);

function clickedA(types)
{
    typeA=types;
    if(typeA==='startA'){
       cA.addEventListener('click', position,{"once":true});
    }

    if(typeA==='finishA'){
       cA.addEventListener('click', position,{"once":true});
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
    colorSquare='green';
    ctxA.clearRect(startPoint.x*pxvalue+1,startPoint.y*pxvalue+1,pxvalue-2,pxvalue-2);
    startPoint.x=Nx;
    startPoint.y=Ny;
}
if(typeA==='finishA'){
    colorSquare='red';
    ctxA.clearRect(finishPoint.x*pxvalue+1,finishPoint.y*pxvalue+1,pxvalue-2,pxvalue-2);
    finishPoint.x=Nx;
    finishPoint.y=Ny;
}
ctxA.fillStyle=colorSquare;
ctxA.fillRect(Nx*pxvalue+1,Ny*pxvalue+1,pxvalue-2,pxvalue-2)
 console.log(y);//по вертикали
 console.log(x);//по горизонтали
 console.log("-");
 console.log(Ny);
 console.log(Nx);
}


function clearA(){ctxA.clearRect(0,0,size,size);}

function paintingA()
{
    canvasA.width=901;
    size =canvasA.height=901;
   
    var N=document.getElementById("nA");
    N=N.value;

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

//граф N*N вершин