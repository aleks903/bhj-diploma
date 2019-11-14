/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
  	console.log(options);

  	User.login(options, (err, data) => {
//  	console.log(err);
  	//let response = JSON.parse(data);
  		if (data.success) {
  			this.element.reset();
  			App.setState('user-logged');

  			let modal = new Modal(this.element.closest('.modal'));
  			modal.close();
  			
  		} else {
  			alert(data.error);
  			return;
  		}
  	});

  }
}
