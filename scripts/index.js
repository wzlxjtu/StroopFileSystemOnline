$( document ).ready(function(){
    $("#btn_agree").click(function(e){
        var result = confirm("Are you sure you want to participate in this study?");
        if (result != true)
        {
            return false;
        }
    });
});
