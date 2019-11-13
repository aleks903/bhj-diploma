/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

 // {
 //    url: 'https://example.com', // адрес
 //    headers: { // произвольные заголовки, могут отсутствовать
 //      'Content-type': 'application/json' 
 //    },
 //    data: { // произвольные данные, могут отсутствовать
 //      username: 'ivan@poselok.ru',
 //      password: 'odinodin'
 //    },
 //    responseType: 'json', // формат, в котором необходимо выдать результат
 //    method: 'GET', // метод запроса
 //    /*
 //      Функция, которая сработает после запроса.
 //      Если в процессе запроса произойдёт ошибка, её объект
 //      должен быть в параметре err.
 //      Если в запросе есть данные, они должны быть переданы в response.
 //    */
 //    callback: (err, response) => {
 //      console.log( 'Ошибка, если есть', err );
 //      console.log( 'Данные, если нет ошибки', response );
 //    }
const createRequest = (options = {}, callback) => {
	console	.log(options);

	const xhr = new XMLHttpRequest;
	let method = options.method;
	let url, data, mail, password;

	if (method === 'GET') {
		url = `${options.url}?mail=${options.data.mail}&password=${options.data.password}`;
	} else {
		const formData = new FormData;
		url = options.url;
		formData.append('email', options.data.email);
		formData.append('password', options.data.password);

console.log('fff');
console.log(formData);

		data = formData;
	}

	xhr.addEventListener('readystatechange', function () {
		if(this.readyState == xhr.DONE) {
			if (this.status == 200) {
				console.log('createRequest');
				console.log(this.responseText);

				callback(null, this.responseText);
			} else {
				console.log('no');
				callback(this.responseType, null);
			}
		}
	});

	try {
		xhr.withCredentials = true;
		//if(options.headers)	{
		//xhr.setRequestHeader('Content-Type', 'application/json');
			//xhr.setRequestHeader('Content-Type', options.headers['Content-type']);
		//}
		//xhr.responseType = 'json';

		xhr.open(method, url);
console.log('send.data');
console.log(data);

		xhr.send(data);

		
	}
	catch (e) {
		callback(e);
	}
};
