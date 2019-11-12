/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}, callback) => {
	const xhr = new XMLHttpRequest;
	let method = options.method;
	let url, data;

	if (method === 'GET') {
		url = `${options.url}?mail=${options.data.mail}&password=${options.data.password}`;
	} else {
		const formData = new FormData;
		url = options.url;
		formData.append('mail', options.data.mail);
		formData.append('password', options.data.password);

		data = formData;
	}

	try {
		xhr.withCredentials = true;
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.open(method, url);
		xhr.send(data);

		xhr.addEventListener('readystatechange', function () {
			
			if(this.readyState == xhr.DONE) {

				if (this.status == 200) {
					console.log('ok');
					callback(null, this.responseType);
				} else {
					console.log('no');
					callback(this.responseType, null);
				}
			}
		});
	}
	catch (e) {
		callback(e);
	}
};
