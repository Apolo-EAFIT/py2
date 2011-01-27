var $j = jQuery.noConflict();

function upload_image_callback(url, alt_text, photo_id){
  $j('image_uploaded_data').clear();
  new $j.get("/manage_photos?photo_id="+photo_id, {asynchronous:true, evalScripts:true, method:'get'});
}

$(function() {
  var zIndexNumber = 1000;
      $j('div').each(function() {
      $j(this).css('zIndex', zIndexNumber);
      zIndexNumber -= 10;
  });
});

$j(document).ready(function($){
  $j("a[rel^='prettyPhoto']").prettyPhoto({
    show_title: false,
    overlay_gallery: false
  });

//new slider
	//$j("#featured > ul").tabs({fx:{opacity: "toggle"}}).tabs("rotate", 5000, true);
  	$j("#featured").tabs({fx:{opacity: "toggle"}}).tabs("rotate", 5000, true);  
  /*Overlay para el inicio de sesión*/
  $j("#login-form").overlay({
    // custom top position
    top: '10%',
    left: '25%',
    // some mask tweaks suitable for facebox-looking dialogs
    mask: {
      // you might also consider a "transparent" color for the mask
      color: '#000',

      // load mask a little faster
      loadSpeed: 200,

      // very transparent
      opacity: 0.9
    },
    // disable this for modal dialog-type of overlays
    closeOnClick: false,
    closeOnEsc: false,

    // load it immediately after the construction
    load: true
    
    //expose: 'darkred',
    //effect: 'apple'

  });
    
  /* overlay para mensaje Modal que contiene las descripciones de autores en las catedras*/
  $j(".modalDialog").overlay({
      top:'10%',
      mask:{
          color:'#000',
          loadSpeed: 200,
          opacity: 0.9
         
      },
      onBeforeLoad: function() {
        // grab wrapper element inside content
        var wrap = this.getOverlay().find(".contentWrap");
        // load the page specified in the trigger
        wrap.load(this.getTrigger().attr("href"));
        this.getOverlay().appendTo('body');
       },
      onLoad:function(){
          /*embed es la variable que contiene el objecto que flowplayer crea, como los selectores
            devuelven listas señalamos el primero.
            Para que el video no se reinicie cuando salimos del overlay lo que hacemos es seleccionarlo
            y poner sus atributos de altura y ancho en 0 y pausamos el video.
          */
          var embed = $j("#playerCatedra :first");
          embed.css({
            width: 0,
			height:0
          });
          //pause video.
         $f().pause();
         $j(".close").css({display:'block'});
         $j('#overlay').css({left:'240px'});
      },
      onClose: function(){
          //on close return the video size
          $j("#playerCatedra :first").css({
              width: '640px',
              height: '360px'
          });

      }

   });
    
    //document.getElementsById("").visibility=hide
  // Fix sidebar height since CSS is retarded. The extra 70 comes from
  // the padding in the sidebar (border plus upper overflow).
  if($j("div#sidebar").height() <= $j("div#center").height()){
    $j("div#sidebar").height($j("div#center").height() + 50);	
  }

  $j('.close_alert').click(function(){
    $j(this).parent().fadeOut('slow');
    return false;
  });

  $j('#add_photo').click(function(){
    var k = "<div id='fotos'><p><label for='experiencia_foto_attributes__Foto'>Foto</label><br /><input id='experiencia_foto_attributes__data' name='experiencia[foto_attributes][][data]' size='30' type='file' /></p></div>";
    $j("#photos").append(k);
  });
  
  $j('#add_resource_photo').click(function(){
    var k = "<div id='fotos'><p><label for='resource_foto_attributes__Foto'>Foto</label><br /><input id='resource_foto_attributes__data' name='resource[foto_attributes][][data]' size='30' type='file' /></p></div>";
    $j("#photos").append(k);
  });

  $j('#add_video').click(function(){
    var k = "<div class='video'><p><label for='experiencia_video_attributes__Video'>Video</label><br /><input id ='experiencia_video_attributes__data' name='experiencia[video_attributes][][data]' size='30' type='file' /></p></div>";
    $j("#videos").append(k);

  });

  $j('#add_photo_event').click(function(){
    var k = "<div id='fotos'><label for='event_foto_attributes__Foto'>Foto</label><input id='event_foto_attributes__data' name='event[foto_attributes][][data]' size='30' type='file' /></div>";
    $j("#photos").append(k);
  });

  $j('#add_video_event').click(function(){
    var k = "<div class='video'><label for='event_video_attributes__Video'>Video</label><input id ='event_video_attributes__data' name='event[video_attributes][][data]' size='30' type='file' /></div>";
    $j("#videos").append(k);

  });

  $j('#add_document_event').click(function(){
    var k = "<div class='document'><label for='event_document_attributes__Documents'>Document</label><input id ='event_document_attributes__data' name='event[document_attributes][][data]' size='30' type='file' /></div>";
    $j("#documents").append(k);

  });

  // slides_js
  var currentPosition = 0;
  var slideWidth = 690;
  var slides = $j('.slide');
  var numberOfSlides = slides.length;

  // Remove scrollbar in JS
  $j('#slidesContainer').css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div
  slides
  .wrapAll('<div id="slideInner"></div>')
  // Float left to display horizontally, readjust .slides width
  .css({
    'float' : 'left',
    'width' : slideWidth
  });

  // Set #slideInner width equal to total width of all slides
  $j('#slideInner').css('width', slideWidth * numberOfSlides);

  // Insert left and right arrow controls in the DOM
  $j('#slideshow')
  .append('<span class="control" id="leftControl">Move left</span>')
  .append('<span class="control" id="rightControl">Move right</span>');

  // Hide left arrow control on first load
  //manageControls(currentPosition);

  // Create event listeners for .controls clicks
  $j('.control')
  .bind('click', function(){
    // Determine new position
    deltaPosition = ($j(this).attr('id')=='rightControl') ? +1 : -1;
    n = $j(".slide").length;
    currentPosition = (currentPosition + n + deltaPosition) % n;
    $j(".apDiv").removeClass("apDiv");
    $j("#apDiv"+currentPosition).addClass("apDiv");
    // Hide / show controls
    // manageControls(currentPosition);
    // Move slideInner using margin-left
    $j('#slideInner').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    });
  });

  // manageControls: Hides and shows controls depending on currentPosition
   function manageControls(position){
     // Hide left arrow if position is first slide
     if(position==0){ $j('#leftControl').hide() }
     else{ $j('#leftControl').show() }
     // Hide right arrow if position is last slide
     if(position==numberOfSlides-1){ $j('#rightControl').hide() }
     else{ $j('#rightControl').show() }
   }

   
});