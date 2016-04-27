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
		var exists = getCookie("projectTitle");
		if (exists != "") {
			projectTitle = exists; 
			myRoles = getCookie('yourRoles').split(",");
			lookingFor = getCookie('lookingFor').split(",");
			projectDescription = getCookie('projectDescription');
			
			tags = ""
			
			for (var i=0; i<lookingFor.length; i++) {
				tags += '<div class="ui label tags">' + lookingFor[i] + '</div>'
			}
			
			url = "./views/project.html?projectTitle=" + projectTitle
			
			url = url.replace(" ", "%20")
			
			htmlString = '<div class="ui blue segment project card projectInfo">' +
							'<div class="ui divided items">' +
								'<div class="item">' +
									'<div class="image">' +
										'<img src="./images/baylife.png">' +
									'</div>' +
									'<div class="content">' +
										'<a class="header" href=' + url + '>' + projectTitle + '</a>' +
										'<div class="description">' + projectDescription +
											
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
			return;
		} else {
			console.log('No cookies');
			return;
		}
	}	
	
	checkCookie();
	
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
		
	
	$('.ui.submit.button').on('click', function(){
		$form = $('.ui.form'),
		allFields = $form.form('get values')
		console.log(allFields);
		for (key in allFields) {
			setCookie(key, allFields[key], 1);
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
	  