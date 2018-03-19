$(document).on('ready', function(){

// sticky nav on scroll
$(window).on('scroll', function(){
  var distanceScrolled = 	$(window).scrollTop();
  	console.log('The distance scrolled is: ' + distanceScrolled);
    if (distanceScrolled>630){
		$('.sticky-nav-wrapper').addClass('scrolled');
	} else{
		$('.sticky-nav-wrapper').removeClass('scrolled');
	}
});

//AJAX calls


});
