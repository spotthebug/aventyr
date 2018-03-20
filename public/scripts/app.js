$(document).on('ready', function(){

// sticky nav on scroll
$(window).on('scroll', function(){
  var distanceScrolled = 	$(window).scrollTop();
  console.log(distanceScrolled);
    if (distanceScrolled>660){
		$('.sticky-nav-wrapper').addClass('scrolled');
	} else{
		$('.sticky-nav-wrapper').removeClass('scrolled');
	}
});
 $('.carousel').carousel({padding: 300});

$('.signup-btn').on('click', function(e){
  e.preventDefault();
  $("#sign-up").slideToggle("slow");
})

});
