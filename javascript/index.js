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
		var inputs = $('.ui.modal').find(":input");
		console.log(inputs);
		inputs.each(function(index, value){
			console.log($(this).val())
		})
		
	});
	
	$('.ui.submit.button').on('click', function(){
		$form = $('.ui.form'),
		allFields = $form.form('get values')
		console.log(allFields);
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
	  