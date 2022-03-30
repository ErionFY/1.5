var colorsClustor=['aqua','blue','blueviolet','brown','BurlyWood',
'CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue',
'Crimson','Cyan','DarkBlue','DarkGoldenRod','DarkGray',
'DarkGreen','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid',
'DarkRed','DarkSalmon','DarkSeaGreen','DeepPink','DeepSkyBlue',
'DimGrey','FireBrick','Gold','Green','GreenYellow',
'HotPink','IndianRed','Lavender','LightBlue','LightCoral',
'LightCyan','LightGreen','LightPink','Maroon','MediumSpringGreen',
'Olive','OrangeRed','Orchid','Peru','Red',
'SaddleBrown','Yellow','SlateGray','Thistle','YellowGreen'];

var dK=document.getElementById("Kvalue");
var cClastor=document.getElementById("canvasClastorization");
var ctxC=cClastor.getContext("2d");
var sizeC=canvasClastorization.height=canvasClastorization.width=901;
cClastor.addEventListener('click',pushPoint);
var Points=[];
var Radius=5;

function pushPoint(event){
    var XCord=event.offsetX;
    var YCord=event.offsetY;
    var coords={x:XCord,y:YCord,Claster:""};
    PaintDot(coords,'black');
    Points.push(coords);
}

function PaintDot(coords,color){
    ctxC.beginPath();
    ctxC.arc(coords.x, coords.y, Radius, 0 , 2 * Math.PI);
    ctxC.fillStyle=color;
    ctxC.fill();
}

function distBtwPoints(point1,point2)
{
    var dist=Math.sqrt((point1.x-point2.x)*(point1.x-point2.x)+(point1.y-point2.y)*(point1.y-point2.y));
    return dist;
}

function KmeansC()
{//k=50-максимум
    var K=parseInt(dK.value);
    var NumberOfPoints=Points.length;
    var flag=1;
    if(K>NumberOfPoints){return;}//количество точек меньше, чем k
    var centroid= [];
    let nextPosCentroid=new Array(K);

    for(var i =0; i<K;i++){
        
        centroid.push({x:Points[i].x,y:Points[i].y});
    }

while(flag){ flag=0;
    nextPosCentroid.fill({sumX:0,sumY:0,num:0});
   for(var i=0;i<NumberOfPoints;i++){
     var minDist=10000;
     var NumOfClaster;
     var curDist;
       for(var j=0;j<K;j++){
         curDist=distBtwPoints(centroid[j],Points[i]);
         if(minDist>curDist){
             minDist=curDist;
             NumOfClaster=j;
            }
       }
       if(Points[i].Claster!=NumOfClaster&&!flag)flag=1;
     Points[i].Claster=NumOfClaster;
     nextPosCentroid[NumOfClaster].sumX=nextPosCentroid[NumOfClaster].sumX+Points[i].x;
     nextPosCentroid[NumOfClaster].sumY=nextPosCentroid[NumOfClaster].sumY+Points[i].y;
     nextPosCentroid[NumOfClaster].num+=1;
   }

   for(var i=0;i<K;i++){
       centroid[i].x=Math.floor(nextPosCentroid[i].sumX/nextPosCentroid[i].num);
       centroid[i].y=Math.floor(nextPosCentroid[i].sumY/nextPosCentroid[i].num);
   }
}

for(var i=0;i<NumberOfPoints;i++)
{
PaintDot(colorsClustor[Points[i].Claster],Points[i]);
}


}

