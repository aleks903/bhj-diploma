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
	console.log('createRequest');
	console	.log(options);

	const xhr = new XMLHttpRequest;
	let method = options.method;
	let url, data, mail, password;

	if (method === 'GET') {
    if(options.data) {
    	console.log('createRequest method GET');
    let urlOption = Object.entries(options.data)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

		url = `${options.url}?${urlOption}`;
		console.log(url);
	}
	} else {
		const formData = new FormData;
		url = options.url;
		
		for (let item in options.data) {
			formData.append(item, options.data[item]);
		}
		// formData.append('name', options.data.name);
		// formData.append('email', options.data.email);
		// formData.append('password', options.data.password);

		data = formData;
	}

	xhr.addEventListener('readystatechange', function () {
		if(this.readyState == xhr.DONE) {
			if (this.status == 200) {
				console.log('createRequest');
				console.log(this.responseText);

				callback(null, JSON.parse(this.responseText));
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

//xhr.open('POST','https://bhj-diplom.letsdocode.ru/user');

		xhr.open(method, url);
if (data != undefined) {
		console.log('send.data');
		console.log(data);
	xhr.send(data);
} else {
			console.log('send.data');
			console.log(data);
	xhr.send();
}
		

		
	}
	catch (e) {
		callback(e);
	}
};
