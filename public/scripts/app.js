$(document).on('ready', function(){

// sticky nav on scroll
$(window).on('scroll', function(){
  var distanceScrolled = 	$(window).scrollTop();
    if (distanceScrolled>630){
		$('.sticky-nav-wrapper').addClass('scrolled');
	} else{
		$('.sticky-nav-wrapper').removeClass('scrolled');
	}
});
 $('.carousel').carousel({padding: 200});

//AJAX calls

});
