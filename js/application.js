$(document).ready(function () {
	
	// pageload request data
  	$.ajax({
  		method: 'POST',
	    url: 'http://192.168.1.12:8080/4DAction',
	    headers: {
	        'User-Name':'Master',
	        'User-Password':'WDT',
	        'eConnect-Version':'2.0',
	        'TypeOfRequest':'Schema'
	    },
	    dataType: 'html',
	    crossDomain:true, 
	    success: function(data){
	    	// return success
	    	console.log('succes: loaded data');
	      	// console.log('succes: '+data);
	      	// select menu data and append to side bar
	      	var menu = $('<div />').append(data).find('#accordion1').html();
	      	$('#accordion1').html(menu);
	    }
	  });


  	// Search list
	$('#accordion1').btsListFilter('#searchinput', {itemChild: 'a'});

	// Start menu click function
	requestPage()



});


// Show pacman when loading
$(document).ajaxSend(function(event, request, settings) {
  $('#loading-indicator').fadeIn('fast');
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
	    var linkHref = link.attr('href').replace('TableName-','');
	    var Headers = {
		    'User-Name':'Master',
		    'User-Password':'WDT',
		    'eConnect-Version':'2.0',
		    'TypeOfRequest':'Schema',
		    'TableName':linkHref
		}
		// check header data
		console.log(Headers);
		// perform rest POST request
	    $.ajax({

	        method: 'POST',
		    url: 'http://192.168.1.12:8080/4DAction',
		    headers: Headers,
		    dataType: 'html',
		    crossDomain:true, 
		    // wait five seconds before timeout
		    timeout: 5000,
	        success : function(data){
	            if(data==1){
	                alert('click is saved OK' + linkHref);
	                console.log(data);

	            } else if(data==0){
	                alert("click can't be saved." + linkHref);
	                console.log(data);
	                
	            } else{
	                alert('error with your code ' + linkHref);
	                console.log(data);

	            }
	        },
	        error: function(x, t, m) {
		        if(t==="timeout") {
		            swal({
					  title: "Error!",
					  text: "The request for " + linkHref + " timed out",
					  type: "error",
					  confirmButtonText: "Shit shit fuckity shit fuck"
					});
		        } else {
		            alert(t);
		        }
		    }
	    });

	});

}
