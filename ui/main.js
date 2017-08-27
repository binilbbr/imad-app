var bmonitor=document.getElementById('fbut');
bmonitor.onclick= function()
{
    //creating request
    var request= new XMLHttpRequest()
    //waiting for request and store response in a variable
    request.onreadystatechange= function(){
        if(request.readyState == XMLHttpRequest.DONE){
            if(request.status == 200){
                var counter =request.responseText;
                var spann= document.getElementById('noc');
                spann.innerHTML = counter.toString();
            }
        }
        
    };
    //making the request
    request.open('GET','http://binil666682.imad.hasura-app.io/counter',true);
    request.send(null);
};