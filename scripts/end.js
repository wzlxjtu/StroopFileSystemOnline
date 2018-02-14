$(document).ready(function(){

    var outputFile = "Participant Summary + \n"
    outputFile = outputFile + "EasyFirst: " + localStorage["EasyFirst"] + "\n";
    outputFile = outputFile + "Pre-Questionnaire: " + localStorage["pre-questionnaire"] + "\n";
    outputFile = outputFile + "Self-Report (CWT-relaxed): " + localStorage["SAM_CWT_relaxed"] + "\n";
    outputFile = outputFile + "Self-Report (CWT-stressed): " + localStorage["SAM_CWT_stressed"] + "\n";
    outputFile = outputFile + "Self-Report (Typing-relaxed): " + localStorage["SAM_typing_relaxed"] + "\n";
    outputFile = outputFile + "Self-Report (Typing-stressed): " + localStorage["SAM_typing_stressed"] + "\n";
    outputFile = outputFile + "Number of correctly pressed shortcuts: " + localStorage["numRight_stressed"] + "\n";
    outputFile = outputFile + "-------------------TYPING-RELAXED-------------------\n";
    outputFile = outputFile + localStorage["keylog_relaxed"] + "\n";
    outputFile = outputFile + "-------------------TYPING-STRESSED-------------------\n";
    outputFile = outputFile + localStorage["keylog_stressed"] + "\n";

    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    }
    
    function randomize(n) {
		var ranNum = Math.round(Math.random()*n);
		return ranNum;
	}
	
	function mod(dividend,divisor) {
		return Math.round(dividend - (Math.floor(dividend/divisor)*divisor));
	}
	
	function generateCode() {
	  
		var n = 9;
		var n1 = randomize(n);
		var n2 = randomize(n);
		var n3 = randomize(n);
		var n4 = randomize(n);
		var n5 = randomize(n);
		var n6 = randomize(n);
		var n7 = randomize(n);
		var n8 = randomize(n);
		var n9 = randomize(n);
		var d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
		d1 = 11 - ( mod(d1,11) );
		if (d1>=10) d1 = 0;
		var d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11;
		d2 = 11 - ( mod(d2,11) );
		if (d2>=10) d2 = 0;
		
		var code = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+d1+d2;
		
		return code;
	}
	
	var xhr = new XMLHttpRequest();
     
    xhr.upload.onprogress = function(evt) {
      var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
      $("#myBar").width(percentComplete + "%");
    };
     
    xhr.onload = function() {
      if (xhr.status === 200) {
        var fileInfo = JSON.parse(xhr.response);
        // Upload succeeded
        $("#upload-message").html("Data uploaded succesfully! Please, copy the code below to redeem your prize!")
        $("#upload-message").css("display", "table");
                
        var code = generateCode();
        $("#code").css("display", "table");
	    $("#code").html(code);
      }
      else {
        var errorMessage = xhr.response || 'Unable to upload file. Please, refresh this page and try again. If the problem persists contact the protocol director at silva.dennis@tamu.edu';
        // Upload failed.
        $("#upload-message").html("errorMessage")
        $("#upload-message").css("display", "table");
      }
    };
     
    var dropboxToken = "vEP56hodmUYAAAAAAAAHFgCdE6zYUBhT_CuQaI94KKvwdSxgPsUAAmMRxalx2gAV";
    xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
    xhr.setRequestHeader('Authorization', 'Bearer ' + dropboxToken);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
      path: '/' +  makeid() + ".txt",
      mode: 'add',
      autorename: true,
      mute: false
    }));
     
    xhr.send(outputFile);
});