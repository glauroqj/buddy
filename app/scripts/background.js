(function () {
	/* verify vote */
	setInterval(() => {

		let lastVote = JSON.parse( localStorage.getItem('Buddy-Last-Vote') );

		if ( lastVote == null || lastVote == undefined ) {
			lastVote = 0;
		}

		let date = moment().format('DD/MM/YYYY');
		let day = moment().format('dddd');
		let month = moment().format('MMMM');
		let hourActual = moment().format('HH:MM');

		/* verify day and set icon */
		if ( day == 'Saturday' || day == 'Sunday' || day == 'sábado' || day == 'domingo' ) { 
			chrome.browserAction.setIcon({path: '../images/buddy-20x20.png'});
			return
		}

		if ( date != lastVote.day ) {
			/* verify is valid day of week */
			localStorage.removeItem('Buddy-Vote');
			/* localStorage.removeItem('Buddy-Last-Vote'); */
			let login = '';
			let vote = '';
			login = JSON.parse( localStorage.getItem('Buddy-Login') );
			vote = JSON.parse( localStorage.getItem('Buddy-Vote') );
			/* validate hour to show notification */
			if ( hourActual > '09:00' && hourActual < '18:00' ) {	
				resetVote(login, vote);
			}
			return
		}

		if ( hourActual > '09:00' && hourActual < '18:00' ) {	
			resetVote(login, vote);
		}

	}, 1200000);

/*
1200000 20min
3600000 1hour 
86400000 24hours
*/

function resetVote(login, vote) {
	let options = {
		icon: '../images/buddy-20x20.png'
	}

	if ( login === '' || login === null || login === undefined ) {
		/* set angry icon */
		chrome.browserAction.setIcon({path: '../images/vote-me-20x20.png'});
		
		if (!('Notification' in window)) {
			alert('This browser does not support desktop notification');
		}
		else if (Notification.permission === 'granted') {
			let notification = new Notification('Olá, faça login por favor!', options);
			// voteAgain();
			setTimeout(() => {
				notification.close();
			}, 15000);
			notification.onclick = () => {
				chrome.tabs.create({
					url: chrome.extension.getURL('pages/popup.html'),
					active: true
				}, function(tab) {
					chrome.windows.create({
						tabId: tab.id,
						type: 'popup',
						height: 500, 
						width: 550,
						focused: true
					});
				});
			}
		}
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				if (permission === 'granted') {
					let notification = new Notification('Olá, faça login por favor!', options);
					// voteAgain();
					setTimeout(() => {
						notification.close();
					}, 15000);
					notification.onclick = () => {
						chrome.tabs.create({
							url: chrome.extension.getURL('pages/popup.html'),
							active: true
						}, function(tab) {
							chrome.windows.create({
								tabId: tab.id,
								type: 'popup',
								height: 500, 
								width: 550,
								focused: true
							});
						});
					}
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
			let notification = new Notification('Olá, como está seu dia?', options);
			// voteAgain();
			setTimeout(() => {
				notification.close();
			}, 15000);
			notification.onclick = () => {
				chrome.tabs.create({
					url: chrome.extension.getURL('pages/popup.html'),
					active: true
				}, function(tab) {
					chrome.windows.create({
						tabId: tab.id,
						type: 'popup',
						height: 120, 
						width: 500,
						focused: true
					});
				});
			}
		}
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
				if (permission === 'granted') {
					let notification = new Notification('Olá, como está seu dia?', options);
					// voteAgain();
					setTimeout(() => {
						notification.close();
					}, 15000);
					notification.onclick = () => {
						chrome.tabs.create({
							url: chrome.extension.getURL('pages/popup.html'),
							active: true
						}, function(tab) {
							chrome.windows.create({
								tabId: tab.id,
								type: 'popup',
								height: 120, 
								width: 500,
								focused: true
							});
						});
					}
				}
			});
		}

	} else {
		/* set good icon */
		chrome.browserAction.setIcon({path: '../images/buddy-20x20.png'});
	}
}

setInterval(() => {
	/* reset localstorage value */
	localStorage.removeItem('Buddy-Notify');
}, 72000000);
/* 
3600000 1hour 
72000000 20hours
*/


/*end js*/
})();