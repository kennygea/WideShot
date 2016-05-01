$(document).on('ready', function() {
	
	console.log(past_projects);
	
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	
	function checkCookie() {
		var exists = getCookie("projects");
		if (exists != "") {
			projects = JSON.parse(exists);
			for (project in projects) {

				url = "./project.html?projectTitle=" + project
			
				url = url.replace(" ", "%20")
			
				$('#ongoingProjects').after('<a href=' + url + ' class=item>' + project + '</a>')
			}
		}
	}
	
	checkCookie();
		
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