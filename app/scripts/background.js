(function () {
	/* verify vote */
	setInterval(function() {
		
		let lastVote = JSON.parse( localStorage.getItem('Buddy-Last-Vote') );

		if ( lastVote == null ) {
			lastVote = 0;
		}

		let date = moment().format('DD/MM/YYYY');
		let day = moment().format('dddd');
		let month = moment().format('MMM');

		/* verify is valid day of week */
		if( day != 'Saturday' && day != 'Sunday' && date != lastVote.day ) {
			localStorage.removeItem('Buddy-Vote');
			// localStorage.removeItem('Buddy-Last-Vote');
			let login = '';
			let vote = '';
			login = JSON.parse( localStorage.getItem('Buddy-Login') );
			vote = JSON.parse( localStorage.getItem('Buddy-Vote') );

			resetVote(login, vote, date, lastVote);
		} else {
			resetVote(login, vote, date, lastVote);
		}

	}, 3600000); 

/* 
3600000 1hour 
86400000 24hours
*/

function resetVote(login, vote, date, lastVote) {
	if ( login === '' || login === null || login === undefined ) {
		/* set angry icon */
		chrome.browserAction.setIcon({path: '../images/vote-me-20x20.png'});
		
		if (!('Notification' in window)) {
			alert('This browser does not support desktop notification');
		}
		else if (Notification.permission === 'granted') {
			var notification = new Notification('Olá, faça login por favor!');
			voteAgain(date, lastVote);
		}
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				if (permission === 'granted') {
					var notification = new Notification('Olá, faça login por favor!');
					voteAgain(date, lastVote);
				}
			});
		}

	} else if ( vote === '' || vote === null || vote === undefined ) {
		/* set angry icon */
		chrome.browserAction.setIcon({path: '../images/vote-me-20x20.png'});

		if (!('Notification' in window)) {
			alert('This browser does not support desktop notification');
		}
		else if (Notification.permission === 'granted') {
			var notification = new Notification('Olá, como está seu dia hoje?');
			voteAgain(date, lastVote);
		}
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				if (permission === 'granted') {
					var notification = new Notification('Olá, como está seu dia hoje?');
					voteAgain(date, lastVote);
				}
			});
		}

	} else {
		/* set good icon */
		chrome.browserAction.setIcon({path: '../images/buddy-20x20.png'});
	}
}

function voteAgain(date, lastVote) {
	
	let lastNotify = JSON.parse( localStorage.getItem('Buddy-Notify') );

	if (  lastNotify === '' || lastNotify === null || lastNotify === undefined ) {
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
		generateNotify(date, lastVote);
	}

}

function generateNotify(date, lastVote) {
	if ( lastVote != undefined && lastVote != null && lastVote != 0 ) {
		if ( date != lastVote.day  ) {
			alert(lastVote.day)
			localStorage.removeItem('Buddy-Notify');
		}
	} else {
		let info = {
			'notify': true
		};
		localStorage.setItem('Buddy-Notify', JSON.stringify(info) );
	}
}

/*end js*/
})();