$(document).ready(function(){
    var buffer = "";
    var circleIsRead = false;
    var timeDistraction = 1500;
    var numDistractions = 0;
    var numRight = 0;
    var numWrongConsecutive = 0;
    
    var pauses = [14,11,10,14,15,13,15,17,23,16,19,16,14,19,14,17,10,14,13,12];
    var currentPauseIndex = 0;
    
    // Loading data from memory
    var round = localStorage.getItem("Round");
    var easyFirst = localStorage.getItem("EasyFirst") == 'true';
    
    // Determining if this session is within the relaxed or stressed block
    var relaxedOrStressed = ( (easyFirst && round == 2) || (!easyFirst && round == 4) ) ? "relaxed" : "stressed";
	
	localStorage.setItem("numRight_" + relaxedOrStressed, 0);
	
	// Function to laod timer.js. This is needed because this scripts is only loaded after the user presses X
	$.loadScript = function (url, callback) {
	    $.ajax({
	        url: url,
	        dataType: 'script',
	        success: callback,
	        async: true
	    });
	}
	
	// Depending on whether is the relaxed or stressed block, different settings will be laoded
	if (relaxedOrStressed == "stressed"){
	    $(".typing-img-container img").attr("src", "resources/image3.jpg");
	    $(".circle").css("display", "table");
	    $("#myModal").css("display", "block");
	    
	    // Pop up instructions
 	    $(".close").click(function(){
 	        $("#myModal").css("display", "none");
 	        // set pseudointerval for showing the circles
 	        $.loadScript('scripts/timer.js', function(){
 	        	var timeInterval = pauses[currentPauseIndex] * 1000;
 	        	currentPauseIndex += 1;
	        	setTimeout(setTimer, timeInterval);	
 	        });
 	    });
	}
	else {
	    $(".typing-img-container img").attr("src", "resources/image4.jpg");
	    $.loadScript('scripts/timer.js', function(){});
	}
	
	function setTimer(){
	    var timeInterval = pauses[currentPauseIndex] * 1000;
 	    currentPauseIndex += 1;
	    paintCircle();
	    setTimeout(setTimer, timeInterval);
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
	
	// Check if shortcut is pressed. If it is, increment numRight and paint the circle green
	function checkShortcutPressed(evt){
	    if (!evt) evt = event;
	    if (evt.which == 27){
	        if (circleIsRead) {
	        	$(".circle").addClass("green").delay(200).queue(function(next){
	        		$(this).removeClass("green");
		            $(this).removeClass("red");
		            circleIsRead = false;
		            next();
		        });
	            numRight += 1;
	            circleIsRead = false;
	            
	            var numRightLocalStorage = parseInt(localStorage.getItem("numRight_" + relaxedOrStressed));
	            numRightLocalStorage += 1;
	            localStorage.setItem("numRight_" + relaxedOrStressed, numRightLocalStorage);
	        }else {
	        	numWrongConsecutive += 1;
	        	if (numWrongConsecutive == 2){
	        		numWrongConsecutive = 0;
	        		alert("Please, pay attention to the circle. Whenever is red you should press ESC")
	        	}
	        }
	    }
	}
	
	document.addEventListener('keydown', (event) => {
	  handleTypingEvent(event, '0');
	});
	
	document.addEventListener('keyup', (event) => {
	  handleTypingEvent(event, '0');
	});
	
	function handleTypingEvent(e, keyUpDown){
	    checkShortcutPressed(e);
	    var now = new Date();
		var timestamp = now.toISOString();
		var stroke = timestamp +  ',' + keyUpDown + ','  + e.code;
		buffer += stroke + ';';
		localStorage.setItem('keylog_' + relaxedOrStressed, JSON.stringify(buffer));
	}
});