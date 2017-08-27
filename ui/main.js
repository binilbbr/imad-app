var buttonmonitor=getElementById('fbut');
var counter = 0;
buttonmonitor.onclick= function()
{
    counter =counter+1;
    var span= getElementById('noc');
    span.innerHTML = counter.toString();
}