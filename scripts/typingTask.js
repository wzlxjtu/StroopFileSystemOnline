$(document).ready(function(){
    var buffer = [];
    var circleIsRead = false;
    var timeDistraction = 1500;
    var numDistractions = 0;
    var numRight = 0;
    
    // Loading data from memory
    var round = localStorage.getItem("Round");
    var easyFirst = localStorage.getItem("EasyFirst") == 'true';
    
    // Determining if this session is within the relaxed or stressed block
    var relaxedOrStressed = ( (easyFirst && round == 2) || (!easyFirst && round == 4) ) ? "relaxed" : "stressed";
	
	localStorage.setItem("numRight_" + relaxedOrStressed, 0);
	
	if (relaxedOrStressed == "stressed"){
	    $(".typing-img-container img").attr("src", "resources/image3.jpg");
	    $(".circle").css("display", "table");
	    $("#myModal").css("display", "block");
	    
	    // Pop up instructions
 	    $(".close").click(function(){
 	        $("#myModal").css("display", "none");
 	        // set pseudointerval for showing the circles
	        var timeInterval = (1000) + Math.round(Math.random()*9) * 1000;
	        setTimeout(setTimer, timeInterval);
 	    });
	}
	else {
	    $(".typing-img-container img").attr("src", "resources/image4.jpg");
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
	
	function checkShortcutPressed(evt){
	    if (!evt) evt = event;
	    if (evt.ctrlKey && evt.which == 32){
	        if (circleIsRead) {
	            numRight += 1;
	            circleIsRead = false;
	            
	            var numRightLocalStorage = parseInt(localStorage.getItem("numRight_" + relaxedOrStressed));
	            numRightLocalStorage += 1;
	            localStorage.setItem("numRight_" + relaxedOrStressed, numRightLocalStorage);
	        }
	    }
	}
	
	$(document).keydown(function(e){
	    handleTypingEvent(e, "0");
	});
	
	$(document).keyup(function(e){
		handleTypingEvent(e, "1");
	});
	
	function handleTypingEvent(e, keyUpDown){
	    checkShortcutPressed(e);
	    var now = new Date();
		var timestamp = now.toISOString();
		var stroke = timestamp + ","+ keyUpDown + ","  + e.key;
		buffer.push(stroke);
		localStorage.setItem('keylog_' + relaxedOrStressed, JSON.stringify(buffer));
	}
});