var slideWidth = $("#galeria-imagenes #slider li").width();
var slideQty = $("#galeria-imagenes #slider li").length;
sliderWidth =  slideWidth * slideQty ;

$("#galeria-imagenes #slider").css('width',sliderWidth);

var a = 0;
var flagRoll = 1;
function roll(){      
	$("#galeria-imagenes #slider").clearQueue();
    $('.unslider-arrow').clearQueue();
	if(flagRoll == 1){
   	 $("#galeria-imagenes #slider").animate({"margin-left":"-="+(slideWidth).toString()},1500,function(){ 
			a++;
			//$("#galeria-imagenes #puntitos li").removeClass("active");
			//alert(a);
		    //alert($("#galeria-imagenes #puntitos li:eq("+a+")").attr("id"));
			//$("#galeria-imagenes #puntitos li:eq("+a+")").addClass('active');
			if(a == slideQty-1){
				a = -1;
			}
			$auxSlide = $("#galeria-imagenes #slider li")[0];
			//alert($auxSlide);
			$("#galeria-imagenes #slider").append($auxSlide);
			$("#galeria-imagenes #slider").css({'margin-left':'0'});
		});               		
	}
	setTimeout( roll, 6000);
}
$(document).ready(function(){   
	setTimeout( roll, 5000);

});

var elementsTitle = [];
$(".titulo").each(function(index, element){
	elementsTitle.push($(element).offset().top+-150);
});

$('.unslider-arrow').click(function( e ) {
	e.preventDefault();              
	$("#galeria-imagenes #slider").clearQueue();
    $(this).clearQueue();
	var fn = this.className.split(' ')[1];

    if(fn == "next"){
		if(flagRoll == 1){
			flagRoll = 0;         
	   		$("#galeria-imagenes #slider").animate({"margin-left":"-="+(slideWidth).toString()},1500,function(){ 
					a++;
					//$("#galeria-imagenes #puntitos li").removeClass("active");          
					/*$("#galeria-imagenes #puntitos li:eq("+a+")").addClass('active');*/
					if(a == slideQty-1){
						a = -1;
					}
					$auxSlide = $("#galeria-imagenes #slider li")[0];                     
					$("#galeria-imagenes #slider").append($auxSlide);
					$("#galeria-imagenes #slider").css({'margin-left':'0'});
					flagRoll = 1;
			});                    
		}          
	}else if(fn == "prev"){
		if(flagRoll == 1){
			flagRoll = 0;
			var aux2 = slideQty-1;
			$auxSlide = $("#galeria-imagenes #slider li")[aux2];       
			$("#galeria-imagenes #slider").css({'margin-left':"-="+(slideWidth).toString()});
			$("#galeria-imagenes #slider").prepend($auxSlide);

	   		$("#galeria-imagenes #slider").animate({"margin-left":"+="+(slideWidth).toString()},1500,function(){ 
					a= a -1;
					/*$("#galeria-imagenes #puntitos li").removeClass("active");          
					$("#galeria-imagenes #puntitos li:eq("+a+")").addClass('active');*/
					if(a == 0){
						a = slideQty;
					}
					flagRoll = 1;
			});     
	}
}
    
});      
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(40.4099, -3.707075),
          zoom: 18
        };
        var map = new google.maps.Map(document.getElementById("mapa-ubicacion"),
            mapOptions);
		var marker = new google.maps.Marker({
			  position: new google.maps.LatLng(40.4099, -3.707075),
			  map: map,
			  title: 'Martina Cocina!'
		  });
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      //google.maps.event.trigger(map, 'resize');
/*
function initialize() {   
	var tiles = new MM.TemplatedLayer("http://tile.stamen.com/toner/{Z}/{X}/{Y}.png");
	var map = new MM.Map("mapa-ubicacion", tiles);
	
	// center on Amsterdam, Netherlands                    
	//40.41136/-3.70834
	map.setCenterZoom(new MM.Location(40.41136,-3.70834), 18);
}
*/                  
$(".nav_link").click(function(e){
	e.preventDefault();
	$auxID = $(this).attr("target");  
	if($(window).width() <= 768){
		var offset = 0;
	}else{
		var offset = 140
	}
	if($auxID){
		$auxScroll = $("#"+$auxID+" .titulo").offset().top - offset;
		$('html, body').animate({scrollTop : $auxScroll},800);
	}                                
});    
$(document).scroll(function( ){  
	var actualSection = 0;
	var auxPosition = $(this).scrollTop();
	for (index = 0; index < elementsTitle.length; ++index) {
		if(auxPosition < elementsTitle[0]){
			actualSection = 999;
		}else{
			if(auxPosition >= elementsTitle[index]){
				actualSection = index;
			}
		}
	}                                                            
	$(".nav_link:eq("+actualSection+")").addClass("arrowed");
	$(".nav_link:not(:eq("+actualSection+"))").removeClass("arrowed");

});
$("#enviar").click(function(e){
	e.preventDefault();
	$dataToSend = {
			nombre : $("#nombre").val(),
			correo : $("#correo").val(),
			consulta : $("#mensaje").val()
	};
	$.ajax({
		url: "scripts/enviar-mail.php",
		method: 'POST',
		data: $dataToSend,
		success: function(data){
			alert(data);
		}
	});
	
});
$("#logo").click(function( e ){
	e.preventDefault();
	$('html, body').animate({scrollTop : 0},800);
});
