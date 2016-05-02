//createEvent.js

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
		$('#projectFor').text("Create an Event for " + QueryString.projectTitle);
	}
	else {
		projectTitle = "Baylife 2"
		$('#projectFor').text("Create an Event for Baylife 2");
	}
	
	$("#datepicker" ).datepicker();
	
	$('#timepicker').timepicker();
	
	
	$('.ui.dropdown')
	  .dropdown({
		// you can use any ui transition
		transition: 'drop'
	  });
	  
	var validation = function(event) {
				event.preventDefault();
				$form = $('.ui.form'),
				allFields = $form.form('get values')
				string = JSON.stringify(allFields);
				allEvents = getCookie('events');
				if (allEvents !== "") {
					eventList = JSON.parse(allEvents);
					if (typeof eventList[projectTitle] == "undefined") {
						eventList[projectTitle] = {}
					} 	
					eventList[projectTitle][allFields.title] = allFields
					setCookie('events', JSON.stringify(eventList), 1)
				}
				else {
					obj = {}
					obj[projectTitle] = {}
					obj[projectTitle][allFields.title] = allFields
					setCookie('events', JSON.stringify(obj), 1)
				}
				url = "./project.html?projectTitle=" + projectTitle
				
				url = url.replace(" ", "%20")
				
				console.log(url);
				
				window.location = url;
			}
	  
	$('.ui.form')
	  .form({
		on: 'blur',
		onSuccess: validation,
	  
		fields: {
		  title: {
			 identifier  : 'title',
			rules: [
			  {
				type   : 'empty',
				prompt : 'Please give the event a title!'
			  }
			]
		  },
		  time: {
			identifier  : 'time',
			rules: [
			  {
				type   : 'empty',
				prompt : 'Please pick a time!'
			  }
			]
		  },
		  date: {
			identifier  : 'date',
			rules: [
			  {
				type   : 'empty',
				prompt : 'Please pick a date!'
			  }
			]
		  },
		  location: {
			identifier  : 'location',
			rules: [
			  {
				type   : 'empty',
				prompt : 'Please pick a location!'
			  }
			]
		  },
		  description: {
			identifier  : 'description',
			rules: [
			  {
				type   : 'empty',
				prompt : 'Please give a brief description!'
			  }
			]
		  },
		  members: {
			identifier  : 'members',
			rules: [
			  {
				type   : 'minCount[1]',
				prompt : 'Please invite at least 1 memeber!'
			  }
			]
		  }
		}
	  })
	  
	
	$('#calendar').fullCalendar({
		 aspectRatio: 2,
    });
	
	if (getCookie('events') !== "") {
		events = JSON.parse(getCookie('events'));
		eventArray = []
		for (project in events) {
			if (project === projectTitle) {
				for (event in events[project]) {
					eventObject = {}
					eventObject.title = events[project][event].title;
					time = moment(events[project][event].time, 'h:mmA').format('HH:mm:ss');
					date = moment(events[project][event].date, 'MM:DD:YYYY').format('YYYY-MM-DD');
					a = date + "T" + time + "Z"
					eventObject.start = a
					eventArray.push(eventObject)
				}
			}
		}
		$('#calendar').fullCalendar('addEventSource', eventArray);
	}
	
})