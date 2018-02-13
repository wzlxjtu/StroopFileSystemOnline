$( document ).ready(function(){
    
    $(".tlx-option-wrapper .tlx-option").click(function(){
        var parent = $(this).parent();
        var child = parent.children(".selected");
        
        if (child != null && child != undefined){
            child.removeClass("selected");
        }
        
        $(this).addClass("selected");
    });
    
    function getSelectedIndex(child){
        var parent = child.parent();
        var res = parent.children().index(child);
        if (res == -1){
            return res;
        }
        else{
            return res + 1;
        }
    }
    
    $("#SAM").submit(function(e){
        var arousalChecked = $("input[name=arousalradio]:checked").val();
        var valenceChecked = $("input[name=valenceradio]:checked").val();
        
        var mentalDemand = getSelectedIndex($("#tlx-mental-demand .tlx-option.selected"));
        var physicalDemand = getSelectedIndex($("#tlx-physical-demand .tlx-option.selected"));
        var temporalDemand = getSelectedIndex($("#tlx-temporal-demand .tlx-option.selected"));
        var performance = getSelectedIndex($("#tlx-performance .tlx-option.selected"));
        var effort = getSelectedIndex($("#tlx-effort .tlx-option.selected"));
        var frustration = getSelectedIndex($("#tlx-frustration .tlx-option.selected"));
        
        if (mentalDemand == -1 || physicalDemand == -1 || temporalDemand == -1 || performance == -1 || effort == -1 || frustration == -1){
            alert("Please, choose one option for each question above");
            e.preventDefault();
            e.stopPropagation();
        }
        else{
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
            
            switch (round)
            {
                case 2:
                    document.SAM.action = "typingTask.html";
                    break;
                case 3:
                    document.SAM.action = "video.html";
                    break;
                case 4:
                    document.SAM.action = "typingTask.html";
                    break;
                case 5:
                    document.SAM.action = "end.html";
                    break;
                default:
                    document.SAM.action = "#";
                    break;
            }
            
            localStorage.setItem("SAM" + round, JSON.stringify(response));
        }    
    });
});