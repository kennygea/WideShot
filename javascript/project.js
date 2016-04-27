

$(document).ready(function() {
	
	var projectTitle; 
	
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
		var exists = getCookie("projectTitle");
		console.log(exists);
		if (exists != "") {
			projectTitle = exists; 
			
			url = "./project.html?projectTitle=" + projectTitle
			
			url = url.replace(" ", "%20")
			
			$('#ongoingProjects').after('<a href=' + url + ' class=item>' + projectTitle + '</a>')
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
	}
	
	if (getCookie('events') !== "") {
		events = JSON.parse(getCookie('events'));
		for (project in events) {
			if (project === projectTitle) {
				for (event in events[project]) {
					console.log(event);
					eventString = '<div class="card">' +
							'<div class="image">' +
							'</div>' +
							'<div class="content">' +
								'<a class="header">' + event + '</a>' +
								'<div class="meta">' + 
									'<span class="date">' + events[project][event].date + " " + events[project][event].time + '</span>' +
								'</div>' +
								'<div class="description">' +
								'First shoot @' + events[project][event].location + "<p></p>" + events[project][event].description + 
								'</div>' +
							'</div>' + 
							'<div class="extra content">' +
								'<a><i class="user icon"></i>' +  events[project][event].members.length+ '</a>' +
							'</div>' +
						'</div>'
					$('#events').prepend(eventString);
				}
			}
		}
	}
	
	$('.createEvent').attr('href', './CreateEvent.html?projectTitle=' + $('#projectTitle').text());
	
	$('.ui.dropdown')
	  .dropdown({
		// you can use any ui transition
		transition: 'drop'
	  });
	
})