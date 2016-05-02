

$(document).ready(function() {
	
	var projectTitle; 
	
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires + ';path=/';
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
				console.log(project);
				url = "./project.html?projectTitle=" + project
			
				url = url.replace(" ", "%20")
			
				$('#ongoingProjects').after('<a href=' + url + ' class=item>' + project + '</a>')
			}
		}
	}
	
	checkCookie();
			
	
	var QueryString = function () {
	  // This function is anonymous, is executed immediately and 
	  // the return value is assigned to QueryString!
	  var query_string = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
			// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
		  query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
		  var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
		  query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
		  query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	  } 
		return query_string;
	}();
	
	if (typeof QueryString.projectTitle != 'undefined') {
		projectTitle = QueryString.projectTitle;
		$('#projectTitle').text(QueryString.projectTitle);
		setCookie('currentProject', QueryString.projectTitle);
	}
	else {
		projectTitle = "Baylife 2";
		setCookie('currentProject', "Baylife 2");
		$('#projectTitle').text("Baylife 2");
		eventString = '<div class="card">' +
							'<div class="image">' +
							'</div>' +
							'<div class="content">' +
								'<a class="header">First Shoot</a>' +
								'<div class="meta">' + 
									'<span class="date"> 4/15/2016 3:00 pm</span>' +
								'</div>' +
								'<div class="description">' +
								'First shoot @ Kresge <p></p> Be there or be square!' + 
								'</div>' +
							'</div>' + 
							'<div class="extra content">' +
								'<a class="show list"><i class="user icon"></i>4</a>' +
								'<div style="display:none" class="attending"><p></p>Hugh Mann <p></p>Kenny Gea<p></p>Garron Charles<p></p>John Stephens<p></p></div>' +
							'</div>' +
						'</div>'
		$('#events').prepend(eventString);
		eventString = '<div class="card">' +
							'<div class="image">' +
							'</div>' +
							'<div class="content">' +
								'<a class="header">First Edit</a>' +
								'<div class="meta">' + 
									'<span class="date"> 5/20/2016 3:00 pm</span>' +
								'</div>' +
								'<div class="description">' +
								'First shoot @ Somewhere <p></p> First edit due!' + 
								'</div>' +
							'</div>' + 
							'<div class="extra content">' +
								'<a class="show list"><i class="user icon"></i>1</a>' +
								'<div style="display:none" class="attending"><p></p>Garron Charles<p></p></div>' +
							'</div>' +
						'</div>'
		$('#events').prepend(eventString);		
		
	}
	
	if (getCookie('events') !== "") {
		events = JSON.parse(getCookie('events'));
		for (project in events) {
			if (project === projectTitle) {
				for (event in events[project]) {
					console.log(event);
					console.log(events[project][event]);
					Attending = '</div class="attending"><p></p>'
					for (i=0; i<events[project][event].members.length; i++) {
						attendee = events[project][event].members[i]
						Attending += attendee + '<p></p>'
					}
					Attendning += "</div>"
					
					
					eventString = '<div class="card">' +
							'<div class="image">' +
							'</div>' +
							'<div class="content">' +
								'<a class="header">' + event + '</a>' +
								'<div class="meta">' + 
									'<span class="date">' + events[project][event].date + " " + events[project][event].time + '</span>' +
								'</div>' +
								'<div class="description">' +
								event + ' @ ' + events[project][event].location + "<p></p>" + events[project][event].description + 
								'</div>' +
							'</div>' + 
							'<div class="extra content">' +
								'<a class="show list"><i class="user icon"></i>' +  events[project][event].members.length+ '</a>' +
								 + Attending + 
						'</div>'
					$('#events').prepend(eventString);
				}
			}
		}
	}
	
	
	$('.show.list').on('click', function() {
		if ($(this).next().css('display') === "none") {	
		$(this).next().css('display', 'inline'); 
			}
		else {
			$(this).next().css('display', 'none'); 
		}
	})
	$('.createEvent').attr('href', './CreateEvent.html?projectTitle=' + $('#projectTitle').text());
	$('#schedule').attr('href', './CreateEvent.html?projectTitle=' + $('#projectTitle').text());
	
	$('.ui.dropdown')
	  .dropdown({
		// you can use any ui transition
		transition: 'drop'
	  });
	  
	var content = [
	{title: 'Bo Jackman'},
	{title: 'Johnny Depp'},
	{title: 'Diana Dee'},
	{title: 'John Smith'}
	]
	
	var search = function(res, resp) {
		memberlist = $('.content.project').children('.header')
		append = true;
		for (var i=0; i < memberlist.length; i++ ) {
			if (memberlist[i].innerText === res.title) {
				append = false;
			}
		}
		if (append) {
			$('#searchbar').before('<p class="header">' + res.title +'<a><i class="remove icon"></i></a></p>')
			$('.remove.icon').on('click', function() {
				$(this).closest('.header').remove()
			})
		}
	}
	
	$('.ui.search')
	  .search({
		source: content,
		onSelect: search,
	  })
	;
	
})