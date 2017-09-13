chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    console.log('request ', request.text);

});