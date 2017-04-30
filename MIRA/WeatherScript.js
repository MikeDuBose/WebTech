(function() {
	"use strict";
	
	var main = function() {
        
        if (annyang) {
            var items = [];
            var itemNum = 0;
            var id;
        
        /*
        the following is handled when the word "weather" is recieved
        */
        var weatherHandler = function(){

            var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=imperial&APPID=81899cb18139bf576e0186c07ef81fff' ;
            
            $.get(url, function(TempCall) {
                console.log(TempCall);
            
                var TempResult = (TempCall.main.temp).toFixed(0);
                
                document.getElementById("temp").innerHTML= TempResult;
                document.getElementById("F").style.opacity = "1.0";
                
                responsiveVoice.speak("hello world");

            });

            /*
            the following gets weather desc.
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

        var addItem = function(tag) {
            var task = tag;
            if(task != '' && itemNum != 6){
                items.push(task);
                itemNum ++;
                console.log(itemNum + "Added")
                listTodos();
                return false;
            }

            return false;
        };

        var searchItems = function(tag){
            console.log("Searching for" + tag);
            console.log("Numers is list (length)" + items.length);
            console.log("Numers is list (num)" + itemNum);
            for (var i=0; i<itemNum; i++){
                console.log("Looking at" + items[i]);
                if (items[i] == tag) {
                    removeItem(i);
                    i--;
                }
            }
            console.log("Stopped searching for" + tag);
        }

        var removeItem = function(i) {
            console.log("Removing"+items[i]);
            items.splice(i, 1);
            listTodos();
            itemNum --;
            console.log(itemNum + "Removed")
            return false;
        }

    var commands = {
        '(show me the) weather':            weatherHandler,
        'add *item (to the list)':          addItem,
        'remove *item (from the list)':     searchItems,
    };

    // Add voice commands to respond to
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  } else {
      window.alert("Speech application has failed")
  };
        
        

        //////////////////////////////////////////////////////
        //////The following implements the webcam
        //////////////////////////////////////////////////////
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

        //////////////////////////////////////////////////////
        //////The following gets the Location
        //////////////////////////////////////////////////////
        var lat;
        var long;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        } else {
            alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
        }
        function successFunction(position) {
            lat = parseInt(position.coords.latitude);
            long = parseInt(position.coords.longitude);
            console.log('Your latitude is :'+lat+' and longitude is '+long);
        }
        function errorFunction(position) {
            window.alert("Geolocation has failed, unable to get location.");
        }

        //////////////////////////////////////////////////////
        //////The following implements the to-do list
        //////////////////////////////////////////////////////
        var items = [];
        var itemNum = 0;
        var id;
        console.log(itemNum);
        function listTodos() {
            var html = '<ul>';
            for (var i = 0; i < items.length; i++){
                html += '<li><span class="todoItem">' + items[i] + '</span><a href="#" class="deleteItem"> Finished! </a>' + '</li>';
            };
            //html += '</ul>';

            document.getElementById('items').innerHTML = html;
            var todoItem = document.getElementsByClassName('todoItem');

            // loop through all items in the array and add the event listener
            for (var i = 0; i < todoItem.length; i++) {
                // Set id to uniquely identify each todo item
                todoItem[i].id = 'todoItem-' + i;
                id = todoItem[i].id;
            }

            // Function to remove todo items if "Finished" is clicked
            var deleteItems = document.getElementsByClassName('deleteItem');
            for (i = 0; i < deleteItems.length; i++) {
                deleteItems[i].id = i;
                deleteItems[i].addEventListener('click', remove);

            };
        }

        function remove(event) {
            items.splice(event.target.id, 1);
            listTodos();
            itemNum --;
            console.log(itemNum + "Removed")
            return false;
        }



    };
	
	$(document).ready(main);
}());