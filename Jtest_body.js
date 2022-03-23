var size =canvasA.height=901;
canvasA.width=901;

var cA=document.getElementById("canvasA");
var ctxA=cA.getContext("2d");

function clearA()
{
    ctxA.clearRect(0,0,size,size);
}

startA()

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