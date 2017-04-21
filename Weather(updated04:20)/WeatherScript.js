(function() {
	"use strict";
	
	var main = function() {
        
		var url = 'http://api.openweathermap.org/data/2.5/weather?zip=28804,us&units=imperial&APPID=81899cb18139bf576e0186c07ef81fff' ;
        
        /*
        the following is handled after enter is pressed (eventually after a certain spoken command is given)
        */
        var enterHandler = function(){
            
            /*
            the following gets weather temp and inserts it into index.html
            */
            $.get(url, function(TempCall) {
                console.log(TempCall);
            
                var TempResult = (TempCall.main.temp).toFixed(0);
                
                document.getElementById("temp").innerHTML= TempResult;
                document.getElementById("F").style.opacity = "1.0";
                
            });
            
            /*
            the following gets weather description and inserts pic into index.html
            */
            $.get(url, function(DescCall) {
                console.log(DescCall);
            
                var DescResult = DescCall.weather[0].main;
                
                var x = DescResult.search(/rain/i);
                var y = DescResult.search(/storm/i);
                if ((x != -1) || (y != -1)) {
                    document.getElementById("weatherPic").innerHTML='<img src="Img/raining2.png" style="width:180px;height:180px;">';
                }
                
                x = DescResult.search(/lightning/i);
                y = DescResult.search(/thunder/i);
                if (x != -1 || (y != -1)) {
                    document.getElementById("weatherPic").innerHTML='<img src="Img/lightning2.png" style="width:180px;height:180px;">';
                }
                
                x = DescResult.search(/sun/i);
                y = DescResult.search(/clear/i);
                if (x != -1 || (y != -1)) {
                    document.getElementById("weatherPic").innerHTML='<img src="Img/Sun.png" style="width:180px;height:180px;">';
                }
                
                x = DescResult.search(/cloud/i);
                y = DescResult.search(/overcast/i);
                if ((x != -1) || (y !=-1)) {
                    document.getElementById("weatherPic").innerHTML='<img src="Img/Clouds.png" style="width:180px;height:180px;">';
                }
                
                x = DescResult.search(/snow/i);
                if (x != -1) {
                    document.getElementById("weatherPic").innerHTML='<img src="Img/snowing2.png" style="width:180px;height:180px;">';
                }
            });
            
        };
        
        /*
        the following code sets up the face camera 
        */
        var video = document.querySelector("#videoElement");
 
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
        if (navigator.getUserMedia) {       
            navigator.getUserMedia({video: true}, handleVideo, videoError);
        };
 
        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        };
 
        function videoError(e) {
            window.alert("The camera has failed. Try checking browser capability")
        };
        
        //event handlers
        $('.enter').on("click",  enterHandler);
    };
	
	$(document).ready(main);
}());