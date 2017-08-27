var bmonitor=getElementById('fbut');
var counter = 0;
bmonitor.onclick= function()
{
    counter =counter+1;
    var spann= getElementById('noc');
    spann.innerHTML = counter.toString();
}