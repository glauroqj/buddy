/* verify localstorage */
var login = '';
var vote = '';

verifyVote();

window.addEventListener('storage', function () {
	verifyVote();
}, false);

function verifyVote() {
	setInterval(function() {
		login = localStorage.getItem('vuejs__Buddy-Login');
		vote = localStorage.getItem('vuejs__Buddy-Vote');


		if ( vote == '' || vote == null ) {

			voteAgain();

		}

	// if ( login == '' || login == null ) {

	// 	if (!('Notification' in window)) {
	// 		alert('This browser does not support desktop notification');
	// 	}
	// 	else if (Notification.permission === 'granted') {
	// 		var notification = new Notification('Olá, faça login por favor!');
	// 		voteAgain();
	// 	}
	// 	else if (Notification.permission !== 'denied') {
	// 		Notification.requestPermission(function (permission) {
	// 			if (permission === 'granted') {
	// 				var notification = new Notification('Olá, faça login por favor!');
	// 				voteAgain();
	// 			}
	// 		});
	// 	}

	// } else if ( vote == '' || vote == null ) {

	// 	if (!('Notification' in window)) {
	// 		alert('This browser does not support desktop notification');
	// 	}
	// 	else if (Notification.permission === 'granted') {
	// 		var notification = new Notification('Olá, como está seu dia hoje?');
	// 		voteAgain();
	// 	}
	// 	else if (Notification.permission !== 'denied') {
	// 		Notification.requestPermission(function (permission) {
	// 			if (permission === 'granted') {
	// 				var notification = new Notification('Olá, como está seu dia hoje?');
	// 				voteAgain();
	// 			}
	// 		});
	// 	}

	// } else {

	// }

}, 10000); /* 3600000 1hour */
}

function voteAgain() {

	chrome.tabs.create({
		url: chrome.extension.getURL('pages/popup.html'),
		active: true
	}, function(tab) {
            // chrome.windows.create({
            //     tabId: tab.id,
            //     type: 'popup',
            //     focused: true
            //     // incognito, top, left, ...
            // });
        });

}