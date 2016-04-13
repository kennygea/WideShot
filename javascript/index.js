$(document).ready(function() {
	$('.user.icon').on('click', function() {
		console.log(window.location.href);

		window.location = window.location + "views/profile.html"
	})
	$('#home').on('click', function() {
		window.location.href = "/pages/kennygea/WideShot/"
	})
	
	var content = [
		{ title: 'Producers' },
		{ title: 'Directors' },
		{ title: 'Editors' },
		{ title: 'Actors' }];
			
		
	$('.ui.search')
	  .search({
		source: content
	  })
	;
	
	$('.ui.dropdown')
	  .dropdown({
		// you can use any ui transition
		transition: 'drop'
	  });
	  
	$('#createProject').click(function() {
		$(".ui.modal").modal("show");
	
	});
});
	  