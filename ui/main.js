var bmonitor=document.getElementById('fbut');
var counter = 0;
bmonitor.onclick= function()
{
    counter =counter+1;
    var spann= document.getElementById('noc');
    spann.innerHTML = counter.toString();
}