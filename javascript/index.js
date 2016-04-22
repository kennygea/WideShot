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
		
	$('#createButton').on('click', function() {
		console.log($('.ui.form'));
	});
			
		
	$('.ui.search')
	  .search({
		source: content
	  })
	;
	
	$('.ui.dropdown')
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
	  