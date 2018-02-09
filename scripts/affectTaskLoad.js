$( document ).ready(function(){
    $("#SAM").submit(function(e){
        var arousalChecked = $("input[name=arousalradio]:checked").val();
        var valenceChecked = $("input[name=valenceradio]:checked").val();
        var mentalDemand = $("#tlx-mental-demand .slider").val();
        var physicalDemand = $("#tlx-physical-demand .slider").val();
        var temporalDemand = $("#tlx-temporal-demand .slider").val();
        var performance = $("#tlx-performance .slider").val();
        var effort = $("#tlx-effort .slider").val();
        var frustration = $("#tlx-frustration .slider").val();
        
        var response = {
            "arousal" : arousalChecked,
            "valence" : valenceChecked,
            "mentalDemand" : mentalDemand,
            "physicalDemand" : physicalDemand,
            "temporalDemand" : temporalDemand,
            "performance" : performance,
            "effort" : effort,
            "frustration" : frustration
        };
        
        var round = parseInt(localStorage["Round"]);
        
        switch (round) {
            case 2:
                alert("test");
                document.SAM.action = "typingTask.html"
                break;
            case 3:
                document.SAM.action = "video.html"
                break;
            case 4:
                document.SAM.action = "typingTask.html"
                break;
            case 5:
                document.SAM.action = "end.html"
                break;
            default:
                document.SAM.action = "#"
                break;
        }
        
        localStorage.setItem("SAM" + round, JSON.stringify(response));
        localStorage.setItem("Round", round + 1);
    });
});