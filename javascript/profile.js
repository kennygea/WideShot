$(document).on('ready', function() {
	$('#home').on('click', function() {

		window.location.href = "../index.html"
	});
	
	$('.ui.dropdown')
	  .dropdown({
		// you can use any ui transition
		transition: 'drop'
	  });

	$(function() {
        $('.jcarousel').jcarousel({
        	wrap: "both",
        });

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination();
    });

>>>>>>> f6c5703f8081bc00490e5991aa0b16a4331ae883
});