console.log('Loaded!');
//move
var madi=document.getElementById('madi');
var marginleft=0;
function moveRight(){
    marginleft=marginleft+10;
    madi.style.marginleft=marginleft+'px';  
}

madi.onclick=function(){
    var interval=setInterval(moveRight,50);
}