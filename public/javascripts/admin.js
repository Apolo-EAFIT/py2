jQuery(function($){
  $("#admin-title").css("cursor", "pointer").live('click', function(){
    $("#admin-tools").slideToggle(200, function(){
      if($("#admin-tools").is(":visible")){
        $("#admin-title-desc").html("ocultar");
      }else{
        $("#admin-title-desc").html("mostrar");
      }
      
    });
  });
})