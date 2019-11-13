/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  HOST = 'https://bhj-diplom.letsdocode.ru';
  URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
//const user = {
//  id: 12,
//  name: 'Vlad'
//};
    localStorage.setItem('user',JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
//const user = {
//  id: 12,
//  name: 'Vlad'
//};
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    //this.unsetCurrent();
    let url =this.URL + '/current';
    const xhr = createRequest({
      url: this.HOST + url,
      data: data,
      method: 'GET',
    }, (err, data) => {
      if(!err) {
        if(data.success) {
         this.setCurrent({id: data.user.id, name: data.user.name});
        } else {
          this.unsetCurrent();
        }
      }
      callback(err, data);
    });
    //this.setCurrent(xhr);
    return xhr;
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
// const data = {
//   email: 'test@test.ru',
//   password: 'abracadabra'
// }
  let url =this.URL + '/login';
  const xhr = createRequest({
    url: this.HOST + url,
    data: data,
    method: 'POST',
  }, (err, data) => {
    if(!err) {
      if(data.success) {
        this.setCurrent({id: data.user.id, name: data.user.name});
      }
    }

    callback(err, data);
  });
    //this.setCurrent(xhr);
  return xhr;
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
// const data = {
//   name: 'Vlad',
//   email: 'test@test.ru',
//   password: 'abracadabra'
// }
    let url = this.URL + '/register';
    const xhr = createRequest({
      url: this.HOST + url,
      data: data,
      method: 'POST',
    }, (err, data) => {
      if(!err) {
        if(data.success) {
          this.setCurrent({id: data.user.id, name: data.user.name});
        }
      }

      callback(err, data);
    });
    //this.setCurrent(xhr);
    return xhr;
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {

    let url =this.URL + '/logout';
    const xhr = createRequest({
      url: this.HOST + url,
      data: data,
      method: 'POST',
    }, (err, data) => {
      if(!err) {
        if(data.success) {
          this.unsetCurrent();
        }
      }

      callback(err, data);
    });
    //this.setCurrent(xhr);
    return xhr;
  }
}
