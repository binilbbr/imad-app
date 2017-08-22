console.log('Loaded!');
//move
var mad=document.getElementById('madi');
var marginleft=0;
// function moveRight(){
//     marginleft = marginleft + 1;
//     mad.style.marginleft = marginleft + 'px';  
// }
mad.onclick = function() {
    var interval=setInterval(function(){
    marginleft = marginleft + 1;
    mad.style.marginleft = marginleft + 'px';  
},100);
};