var bestGuess = {"text":"text", "value": 0};
var optimistic = {"text":"text", "value": 0};
var pessimistic = {"text":"text", "value": 0};
var travelValue = 0.0;
var origin = "Asheville NC";
var destination = "Charlotte NC";
function setup() {
    console.log(bestGuess);
    console.log(optimistic);
    console.log(pessimistic);
    travelValue = map(bestGuess["value"], optimistic["value"], pessimistic["value"] , 0.0, 1.0);
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    fill(0);
    ellipse(width/2, (.5/3)*height, (.8/3)*height);
    ellipse(width/2, (1.5/3)*height, (.8/3)*height);
    ellipse(width/2, (2.5/3)*height, (.8/3)*height);

    if (travelValue >= 0.66) {
        fill(255,0,0);
        ellipse(width/2, (.5/3)*height, (.7/3)*height);
        fill(64,64,0);
        ellipse(width/2, (1.5/3)*height, (.7/3)*height);
        fill(0,0,64);
        ellipse(width/2, (2.5/3)*height, (.7/3)*height);
    }
    else if (travelValue < 0.77 && (travelValue >= 0.54)) {
        fill(64,0,0);
        ellipse(width/2, (.5/3)*height, (.7/3)*height);
        fill(255,255,0);
        ellipse(width/2, (1.5/3)*height, (.7/3)*height);
        fill(0,0,64);
        ellipse(width/2, (2.5/3)*height, (.7/3)*height);
    }
    else if (travelValue < 0.77 && (travelValue < 0.54)){
        fill(64,0,0);
        ellipse(width/2, (.5/3)*height, (.7/3)*height);
        fill(64,64,0);
        ellipse(width/2, (1.5/3)*height, (.7/3)*height);
        fill(0,255,0);
        ellipse(width/2, (2.5/3)*height, (.7/3)*height);
    }
    textSize(64);
    textAlign(CENTER);
    fill(0);
    //text(bestGuess["text"], width/2, height/2);
}

function traffic() {
    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({origins:[origin], destinations:[destination], travelMode: 'DRIVING', drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: "bestguess"
    }}, function(data) {
        bestGuess["text"] = data.rows[0].elements[0].duration_in_traffic["text"];
        bestGuess["value"] = data.rows[0].elements[0].duration_in_traffic["value"];
    });
    service.getDistanceMatrix({origins:[origin], destinations:[destination], travelMode: 'DRIVING', drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: "optimistic"
    }}, function(data) {
        optimistic["text"] = data.rows[0].elements[0].duration_in_traffic["text"];
        optimistic["value"] = data.rows[0].elements[0].duration_in_traffic["value"];
    });
    service.getDistanceMatrix({origins:[origin], destinations:[destination], travelMode: 'DRIVING', drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: "pessimistic"
    }}, function(data) {
        pessimistic["text"] = data.rows[0].elements[0].duration_in_traffic["text"];
        pessimistic["value"] = data.rows[0].elements[0].duration_in_traffic["value"];
        });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
