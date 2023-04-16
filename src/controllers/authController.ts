import store, { SigninData, SignupData } from '../utils/store';
import AuthAPI from '../api/authApi';
import { router } from '../utils/router';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  signup(data: SignupData) {
    this.api
      .signup(data)
      .then(() => {
        console.log('data', data);
        store.set('user.data', data);
        router.go('/settings');
      })
      .catch(e => store.set('registrationFormData.errorText', e.reason));
  }

  async signin(data: SigninData) {
    try {
      console.log('signin');
      await this.api.signin(data).then(res => console.log(res));

      await this.fetchUser();
    } catch (err) {
      // store.set('user.hasError', true);
      // если ошибка логина в том, что мы уже в сети - редирект
      // TODO проверить уникальность статус кода для этого случая и если да то перепривязаться на него
      if (err.reason === 'User already in system') {
        router.go('/settings');
      } else {
        store.set('loginFormData.errorText', err.reason);
      }
    }
  }

  logout() {
    this.api
      .logout()
      .then(() => {
        store.set('user', null);
        router.go('/');
      })
      .catch(console.log);
  }

  // async
  async fetchUser() {
    store.set('user.isLoading', true);
    // await
    await this.api
      .getUser()
      .then(user => {
        store.set('user.data', user);
      })
      // .catch(() => {
      //   store.set('user.hasError', true);
      //   throw new Error('11');
      // })
      .finally(() => {
        setTimeout(() => store.set('user.isLoading', false), 1000);
      });
  }
}

const authController = new AuthController();
export default authController;
