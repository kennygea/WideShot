$(document).ready(function() {
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
	$('.ui.checkbox').checkbox();
	
});
	  