$( document ).ready(function(){
    localStorage.clear();
    $("#btn_agree").click(function(e){
        var result = confirm("Are you sure you want to participate in this study?");
        return result;
    });
});
