$(document).ready(function () {

	
	// pageload request data
	$.ajax({
		method: 'POST',
		url: 'http://192.168.1.12:8080/4DAction/TypeOfRequest=Schema',
		headers: {
			'User-Name':'Master',
			'User-Password':'WDT',
			'eConnect-Version':'2.0',
			'TypeOfRequest':'Schema'
		},
		dataType: 'html',
		crossDomain:true, 
		timeout: 5000,
		// Succeffully connected
		success: function(data){
			// return success
			console.log('succes: loaded data');
			// console.log(data);
			// console.log('succes: '+data);
			// select menu data and append to side bar
			var menu = $('<div />').append(data).find('#accordion1').html();
			$('#accordion1').html(menu);
		},
		// unsuccefful connection
		error: function(x, t, m) {
			if(t==="timeout") {
				swal({
					title: "Error!",
					text: "The API timed out",
					type: "error",
					confirmButtonText: "Close"
				});
			} else {
				swal({
					title: "Error!",
					text: "The API is broken or some such",
					type: "error",
					confirmButtonText: "Close"
				});
			}
		}
	  });


	// Search list
	$('#accordion1').btsListFilter('#searchinput', {itemChild: 'a'});

	// Start menu click function
	requestPage();

	// konami code
	konami();



});


// Show pacman when loading
$(document).ajaxSend(function(event, request, settings) {
  $('#loading-indicator').show();
});
// Hide pacman when finished
$(document).ajaxComplete(function(event, request, settings) {
  $('#loading-indicator').fadeOut('fast');
});

// menu click function
function requestPage(){

	$(document).on('click','#accordion1 li a',function(e){
		// prevent href from triggering
		e.preventDefault();
		// set variables
		var link = $(this);
		var linkHref = 'http://192.168.1.12:8080/' + link.attr('href');
		var Headers = {
			'User-Name':'Master',
			'User-Password':'WDT',
			'eConnect-Version':'2.0',
			'TypeOfRequest':'Schema'
		}
		// check header data
		// console.log(Headers);
		// perform rest POST request
		$.ajax({
			method: 'POST',
			url: linkHref,
			headers: Headers,
			dataType: 'html',
			crossDomain:true, 
			// wait five seconds before timeout
			timeout: 5000,

			success : function(data){
				// select main_col data and append
				
				console.log('data updated from ' + linkHref);
				console.log(data);

				var main_col = $('<div />').append(data).find('.main').html();
				$('.main').html(main_col);
			},

			error: function(x, t, m) {
				if(t==="timeout") {
					swal({
						title: "Error!",
						text: "The request for " + linkHref + " timed out",
						type: "error",
						confirmButtonText: "Close"
					});
				} else {
					alert(t);
					swal({
						title: "Error!",
						text: "Something went wrong",
						type: "error",
						confirmButtonText: "Close"
					});
				}
			}
		});
	});

}

function konami(){
	var egg = new Egg();
	egg
	  .addCode("up,up,down,down,left,right,left,right,b,a", function() {
	    jQuery('#egggif').fadeIn(500, function() {
	      window.setTimeout(function() { jQuery('#egggif').fadeOut(); }, 5000);
	    });
	  })
	  .addHook(function(){
	    console.log("Hook called for: " + this.activeEgg.keys);
	    console.log(this.activeEgg.metadata);
	  }).listen();
    
}
