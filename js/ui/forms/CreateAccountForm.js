/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm{
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
console.log('CreateAccountForm');
console.log(options.data);
  	Account.create(options, (err, data) => {
//  	console.log(err);
  	let response = JSON.parse(data);
  		if (response.success) {
  			this.element.reset();
  			App.update();

  			let modal = new Modal(this.element.closest('.modal'));
  			modal.close();
  		} else {
  			alert(response.error);
  			return;
  		}
  	});
  }
}
