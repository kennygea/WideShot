$(document).ready(function() {
	
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
				tags = ""
				for (var i=0; i<projects[project].lookingFor.length; i++) {
					tags += '<div class="ui label tags">' + projects[project].lookingFor[i] + '</div>'
				}
				
				url = "./views/project.html?projectTitle=" + projects[project].projectTitle
				
				url = url.replace(" ", "%20")
				
				$('#ongoingProjects').after('<a href=' + url + ' class=item>' + projects[project].projectTitle + '</a>')
				
				htmlString = '<div class="ui blue segment project card projectInfo">' +
								'<div class="ui divided items">' +
									'<div class="item">' +
										'<div class="image">' +
											'<img src="./images/placeholder.png">' +
										'</div>' +
										'<div class="content">' +
											'<a class="header" href=' + url + '>' + projects[project].projectTitle + '</a>' +
											'<div class="description">' + projects[project].projectDescription +
												
												'<p></p>' +
											'</div>' +
											'<div class="extra">' +
												tags +
											'</div>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>'
				
				
				$('#projectListings').append(htmlString)
				
			}
		} else {
			console.log('No cookies');
			return;
		}
	}	
	
	checkCookie();
	
	function checkEvents() {
		var exists = getCookie('events');
		console.log(exists);
		if (exists !== "") {
			events = JSON.parse(exists)
			eventListing = []
			for (project in events) {
				for (event in events[project]) {
					helper = {}
					helper.project = project;
					helper.event = event;
					helper.date = events[project][event].date
					helper.time = events[project][event].time
					eventListing.push(helper);
				}
			}
			eventListing.sort(function(a,b) {
				return new Date(a.date) - new Date(b.date);
			});
			console.log(eventListing);
			for (var i=0; i<eventListing.length; i++) {			
				upcoming = eventListing[i];
				url = "./views/project.html?projectTitle=" + upcoming.project
				
				url = url.replace(" ", "%20")
				
				htmlString = '<div class="event">' + 
								'<div class="label">' +
									'<i class="alarm icon"></i>' + 
								'</div>' +
								'<div class="content">' + 
									'<div class="date">' + upcoming.date +
									'</div>' +
									'<div class="summary">' +
										'You have a <a>' + upcoming.event + '</a> for <a href=' + url + '>' + upcoming.project + '</a>.' +
									'</div>' +
								'</div>' +
							'</div>'
				console.log(htmlString);
				$('#reminders').append(htmlString);
			}
		}
	}
	
	checkEvents();
	
	$('.user.icon').on('click', function() {

		window.location =  "./views/profile.html"
	})
	
	$('#home').on('click', function() {
		window.location.href = "./index.html"
	})
	
	var content = [
		{ title: 'Producers' },
		{ title: 'Directors' },
		{ title: 'Editors' },
		{ title: 'Actors' }];
		
	//Start here. Modify so you store into one JSON object serialized and deserialized
	$('.ui.submit.button').on('click', function(){
		$form = $('.ui.form'),
		allFields = $form.form('get values')
		console.log(allFields);
		
		var exists = getCookie("projects");
		if (exists != "") {
			var project = JSON.parse(exists);
			project[allFields.projectTitle] = allFields
			setCookie('projects', JSON.stringify(project), 1)
		}
		else {
			var project = {}
			project[allFields.projectTitle] = {}
			project[allFields.projectTitle] = allFields;
			setCookie('projects', JSON.stringify(project), 1)
		}
	})
	
	$('.ui.form')
	  .form({
		on: 'blur',
		fields: {
		  projectTitle: {
			 identifier  : 'projectTitle',
			rules: [
			  {
				type   : 'empty',
				prompt : 'Please give the project a title!'
			  }
			]
		  },
		  lookingFor: {
			identifier  : 'lookingFor',
			rules: [
			  {
				type   : 'minCount[1]',
				prompt : 'Please select at least 1 value'
			  }
			]
		  },
		  yourRoles: {
			identifier  : 'yourRoles',
			rules: [
			  {
				type   : 'minCount[1]',
				prompt : 'Please at least 1 value'
			  }
			]
		  },
		  projectDescription: {
			identifier  : 'projectDescription',
			rules: [
			  {
				type   : 'empty',
				prompt : 'Please give a brief description!'
			  }
			]
		  }
		}
	  })
			
		
	$('.ui.search')
	  .search({
		source: content
	  });
	$('.ui.dropdown').dropdown();  
	  
	$('.ui.dropdown.filter')
	  .dropdown({
		// you can use any ui transition
		transition: 'drop',
		onChange: function(values, text, $selectedItem) {
			  console.log(values);
			  var allProjects = $('.projectInfo');
			  allProjects.each(function(){
				  tags = []
				  $(this).find('.ui.label.tags').each(function(index, obj) {
						tags.push($(this).text())
					})
				  var isSet = values.every(function(val){
					  if (values.len === 0) {
						  return true
					  }
					  return tags.indexOf(val) >= 0;
				  });
				  
				  if (!isSet) {
					  $(this).css({'display': 'none'})
				  }
				  else {
					  $(this).css({'display': ''})
				  }
			  })
		  }

	  });
	  
	$('#createProject').click(function() {
		$(".ui.modal").modal("show");
	
	});
	$('.ui.checkbox').checkbox();
	
	
});
	  