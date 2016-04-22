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
                target: '-=1',
                method: function() {
                	this.carousel()
            		.jcarousel('scroll', this.options('target'), true, function() {
                		var targeted = $('.jcarousel').jcarousel('target')[0].id
                		var info = past_projects[targeted]
                		$('#movie_title').html(info["Title"])
                		$('#movie_role').html(info["Role"])
                		$('#movie_description').html(info["Description"])
            		});
    			},
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1',
                method: function() {
                	this.carousel()
            		.jcarousel('scroll', this.options('target'), true, function() {
            			if($(".jcarousel").jcarousel('target')[0]){
	                		var targeted = $('.jcarousel').jcarousel('target')[0].id
	                		var info = past_projects[targeted]
	                		$('#movie_title').html(info["Title"])
	                		$('#movie_role').html(info["Role"])
	                		$('#movie_description').html(info["Description"])
                		}
            		});
    			},
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

});