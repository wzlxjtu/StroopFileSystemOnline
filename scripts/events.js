
$(document).ready(function(){
    
    // Loading data from memory
    var round = localStorage.getItem("Round");
    var easyFirst = localStorage.getItem("EasyFirst") == 'true';
    // Determining if this session is within the relaxed or stressed block
    var relaxedOrStressed = ( (easyFirst && round == 1) || (!easyFirst && round == 3) ) ? "relaxed" : "stressed";
    var congruent = ( (easyFirst && round == 1) || (!easyFirst && round == 3) ) ? true : false;
    
    var mousedata = "";
    var pool = ["BLUE", "GREEN", "ORANGE", "PURPLE", "RED", "YELLOW"];
    var correct = 0, wrong = 0;
    var mousePos = { x: -1, y: -1 };

    var startTime = (new Date).getTime();
    
    $(".close").click(function(){
        $(".modal").hide(); // When the user clicks on <span> (x), close the modal
    });
    
    // droppable actions
    $(".ui-widget-header").droppable({
        drop: function(event, ui) {
            $(this).css('background-color', 'white');
            if ($(ui.draggable).data("content").answer == this.id) {
                correct++;
            }
            else {
                wrong++;
                if (!congruent) {
                    //$("#alarm").get(0).play();
                    $("#performanceContainer").animate({color: 'red'},100).animate({color: 'black'},3000);
                }
            }
            $("#correct").html(correct);
            $("#wrong").html(wrong);
            $("#total").html(correct+wrong);
            $(ui.draggable).remove();
        },
        over: function(event, ui) {
           $(this).css('background-color', '#C6E2FF');
        },
        out: function(event, ui) {
           $(this).css('background-color', 'white');
        }
    })
    .mouseenter(function() {
        $(this).css('background-color', '#C6E2FF');
    })
    .mouseleave(function() {
        $(this).css('background-color', 'white');
    });
    
    // create draggable elements
    for(i=0; i<100; i++) {
        $('<div>')
        .attr('id', i)
        .addClass("ui-widget-content")
        .appendTo('#sourceContainer')
        .prepend('<span><img class="imageIcon" src="resources/imageIcon.jpg">'+' '+('00'+i).slice(-2)+'.jpg</span>')
        .draggable({
            opacity: 0.35,
            revert: "invalid",
            revertDuration: 200,
            zIndex: 100,
            stack: ".products",
            helper: "clone",
            create: function(event, ui) {
                var select = Math.floor(Math.random() * 2); // 0 means select color, 1 means select word
                var color = pool[Math.floor(Math.random() * 6)];
                var word = congruent ? color : pool[Math.floor(Math.random() * 6)];
                $(this).data("content", {
                    color: color,
                    word: word,
                    select: select,
                    answer: select == 0 ? color : word
                });
            }
        })
        .dblclick(function(){
            $(".modal").show();
            $(".target").html($(this).data("content").word).css({'color': $(this).data("content").color});
            $("#option").html($(this).data("content").select == 0 ? "COLOR" : "WORD");
            if (congruent) $(".option").hide();
        })
        .mouseenter(function() {
            $(this).css('background-color', '#C6E2FF');
        })
        .mouseleave(function() {
            $(this).css('background-color', 'white');
        });
    }
    
    // log mouse events
    $(this).mousemove(function(event) {
        mousePos.x = event.pageX;
        mousePos.y = event.pageY;
        var milliseconds = (new Date).getTime() - startTime;
        $('#mouseInfo').html(milliseconds+","+mousePos.x+","+mousePos.y+',move');
        mousedata += milliseconds+","+mousePos.x+","+mousePos.y+',0\n';
        localStorage.setItem('mouselog_' + relaxedOrStressed, mousedata);
    })
    .mousedown(function() {
        var milliseconds = (new Date).getTime() - startTime;
        // event.which == 1 indicates the left click
        if (event.which == 1) {
            $('#mouseInfo').html(milliseconds+","+mousePos.x+","+mousePos.y+',down');
            mousedata += milliseconds+","+mousePos.x+","+mousePos.y+',2\n';
            localStorage.setItem('mouselog_' + relaxedOrStressed, mousedata);
        }
        
    })
    .mouseup(function() {
        var milliseconds = (new Date).getTime() - startTime;
        if (event.which == 1) {
            $('#mouseInfo').html(milliseconds+","+mousePos.x+","+mousePos.y+',up');
            mousedata += milliseconds+","+mousePos.x+","+mousePos.y+',1\n';
            localStorage.setItem('mouselog_' + relaxedOrStressed, mousedata);
        }
    });
})