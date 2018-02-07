
$(document).ready(function(){

    // droppable actions
    $(".ui-widget-header").droppable({
        drop: function(event, ui) {
            $(this).css('background-color', 'white');
            //$(".ui-widget-header").html(ui.draggable.attr('id')+'->'+this.id);
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
    for(i=0; i<100; i++) {
        $('<div>')
        .addClass("ui-widget-content")
        .appendTo('#sourceContainer')
        .attr('id', i)
        .draggable({
            opacity: 0.35,
            revert: "invalid",
            revertDuration: 200,
            zIndex: 100,
            stack: ".products",
            scroll: false,
            helper: 'clone'
        })
        .prepend('<span><img class="imageIcon">'+' '+i+'.jpg</span>')
        .dblclick(function(){
            alert(this.id);
        });
    }
  });
  