
$.firefly({
	minPixel: 1,
	maxPixel: 5,
	total: 75
});

var copying = false;
$(document).ready(function(){
	var counter = new PlayerCounter({
	  element: ".player-counter",
	  ip: 'playuncharted.com:25577',
	  format: '{online}',
	  refreshRate: 10000
	});
});

$(".playercount").click(function(e) {
	e.preventDefault();
	if (copying){
		return;
	}
	var ele = $(this);
	var html = ele.html();
	copying = true;
	copyTextToClipboard("playuncharted.com");
	ele.html("<p>COPIED TO CLIPBOARD!</p>");
	setTimeout(function() {
		ele.html(html);
		copying = false;
	}, 2000);
});

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
