$(document).ready(function(){
    var buffer = [];
    var circleIsRead = false;
    var timeDistraction = 1000;
    var numDistractions = 0;
    var numRight = 0;
    
    
    // Loading data from memory
    var round = localStorage.getItem("Round");
    var easyFirst = localStorage.getItem("EasyFirst");
    
    // Determining if this session is within the relaxed or stressed block
    var relaxedOrStressed = ( (easyFirst && round == 2) || (!easyFirst && round == 4) ) ? "relaxed" : "stressed";
	
	//if (relaxedOrStressed == "stressed")
	if (true){
	    var timeInterval = (1000) + Math.round(Math.random()*9) * 1000;
	    setTimeout(setTimer, timeInterval);
	}
	
	function setTimer(){
	    var timeInterval = (1000) + Math.round(Math.random()*9) * 1000;
	    paintCircle();
	    setTimeout(setTimer, timeInterval + timeDistraction);
	}
	
	function paintCircle(){
	    circleIsRead = true;
	    numDistractions += 1;
	    $(".circle").addClass("red").delay(timeDistraction).queue(function(next){
            $(this).removeClass("red");
            circleIsRead = false;
            next();
        });
	}
	
//	// If it is stressed, play background chatter and deliver social evaluative threat
// 	if (relaxedOrStressed == "stressed")
// 	{
// 	    $("#myModal").css("display", "block");
	    
// 	    // Tell that experts will examine their compositions
// 	    $(".close").click(function(){
// 	        $("#myModal").css("display", "none");
// 	        // Play chatter
//     	    $(".chatter")[0].play();
// 	    });
// 	}
	
	function checkShortcutPressed(evt){
	    if (!evt) evt = event;
	    if (evt.ctrlKey && evt.which == 32){
	        if (circleIsRead) {
	            numRight += 1;
	            circleIsRead = false;
	        }
	        alert("total: " + numDistractions + " right: " + numRight);
	    }
	}
	
	$(document).keydown(function(e){
	    checkShortcutPressed(e);
		var timestamp = Date.now() | 0;
		var stroke = {
			key: e.key,
			isKeyDown: true,
			time: timestamp
		};
		buffer.push(stroke);
		sessionStorage.setItem('keylog_' + relaxedOrStressed, JSON.stringify(buffer));
	});
	
	$(document).keyup(function(e){
		var timestamp = Date.now() | 0;
		var stroke = {
			key: e.key,
			isKeyDown: false,
			time: timestamp
		};
		buffer.push(stroke);
		sessionStorage.setItem('keylog_' + relaxedOrStressed, JSON.stringify(buffer));
	});
});