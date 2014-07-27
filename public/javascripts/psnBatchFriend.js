
/*
Hey! You're looking at the PSN batch friend javascript!
The fun stuff is not here, it's in the Node stuff. This just checks
to make sure users don't enter bad data.
- DrasticActions (@drasticactionSA)
*/
var checkUsernames = function ()
{
	// Empty all of the user names from the parsed user name box.
	$('#parsedUsernames').empty();

	// Get all the user names from the text area.
	var lines = $('textarea[id=usernameTextarea]').val().split('\n');

	// Set up a regex to filter out unsupported usernames.
	// The PSN Online ID allows for alphanumeric characters, underscores and dashes.
	var re = new RegExp('^[-a-zA-Z0-9_]*$');

	// Reset the progress meter.
	$('#progressBar').attr('value', 0);
	$('#progressBar').attr('max',lines.length);
	$.each(lines, function(){
		// Get the current usernames in the listbox
		if(this.length >= 3 && this.length <= 16 && this.match(re))
		{
			$('#parsedUsernames').append(new Option(this, this));
		}
	});
}

var sendUsernames = function()
{
	var usernameArray = getUsernames();
	var re = new RegExp('^[-a-zA-Z0-9_]*$');
	var requestMessage = $('#requestMessage').val();
	for(var i = 0; i < usernameArray.length; i++)
	{
		if(usernameArray[i].length >= 3 && usernameArray[i].length <= 16 && usernameArray[i].match(re))
		{
			sendUsername(usernameArray[i], requestMessage, i);
		}
		else
		{
			var message = "Did not add - " + usernameArray[i];
			$('#loadingConsole').append(new Option(message, ""));
			$('#progressBar').attr('value',i + 1);
		}
	}
}

var sendUsername = function(username, requestMessage, index)
{
	var json = {id: username, requestMessage: requestMessage};
		$.post( '/psn', json, function(data) {
			var message = data.message;
			if(data.error)
			{
				message += ": " + data.response.error.message;
			}
			$('#loadingConsole').append(new Option(message, ""));
			$('#progressBar').attr('value',index + 1);
		});
}

var getUsernames = function()
{
	var lb = document.getElementById('parsedUsernames');
	var arr = [], opts = lb.options, len = opts.length;
	for (var i = 0; i < len; i++) {
    arr[i] = opts[i].value;
    }
    return arr;
}

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();
