
var congruent = false;

var pool = ["BLUE", "GREEN", "ORANGE", "PURPLE", "RED", "YELLOW"];
var correct = 0, wrong = 0;

$(document).ready(function(){
    
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
                if (!congruent) $("#alarm").get(0).play();
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
    for(i=0; i<50; i++) {
        $('<div>')
        .attr('id', i)
        .addClass("ui-widget-content")
        .appendTo('#sourceContainer')
        .prepend('<span><img class="imageIcon">'+' '+i+'.jpg</span>')
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
  });
  