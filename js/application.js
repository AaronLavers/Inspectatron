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
	      	console.log('succes: '+data);
	      	// select menu data and append to side bar
	      	var menu = $('<div />').append(data).find('#accordion1').html();
	      	$('#accordion1').html(menu);
	    }
	  });

  	// Search list
	$('#accordion1').btsListFilter('#searchinput', {itemChild: 'a'});
});
