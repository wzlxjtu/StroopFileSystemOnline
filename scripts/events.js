
var pool = ["BLUE", "GREEN", "ORANGE", "PURPLE", "RED", "YELLOW"];
var correct = 0, wrong = 0;

$(document).ready(function(){

    // droppable actions
    $(".ui-widget-header").droppable({
        drop: function(event, ui) {
            $(this).css('background-color', 'white');
            ($(ui.draggable).data("content").answer == this.id) ? correct++ : wrong++;
            document.getElementById('correct').innerHTML = correct;
            document.getElementById('wrong').innerHTML = wrong;
            document.getElementById('total').innerHTML = correct+wrong;
            $(ui.draggable).remove();
        },
        over: function(event, ui) {
           $(this).css('background-color', '#C6E2FF');
        },
        out: function(event, ui) {
           $(this).css('background-color', 'white');
        }
    });
    
    // create draggable elements
    for(i=0; i<20; i++) {
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
            scroll: false,
            helper: 'clone',
            create: function(event, ui) {
                var select = Math.floor(Math.random() * 2); // 0 means select color, 1 means select word
                var color = pool[Math.floor(Math.random() * 6)];
                var word = pool[Math.floor(Math.random() * 6)];
                $(this).data("content", {
                    color: color,
                    word: word,
                    select: select,
                    answer: select == 0 ? color : word
                });
            }
        })
        .dblclick(function(){
            alert($(this).data("content").color+'\n'+$(this).data("content").word+'\n'+$(this).data("content").select+'\n'+$(this).data("content").answer);
        });
    }
  });
  