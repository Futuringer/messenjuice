import { ROUTES } from '../utils/consts';
import store, { initialState } from '../utils/store';
import AuthAPI, { SigninData, SignupData } from '../api/authApi';
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
        store.set('user.data', data);
        router.go(ROUTES.MESSENGER);
      })
      .catch(e => store.set('currentFormData.errorText', e.reason));
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      await this.fetchUser();
      router.go(ROUTES.MESSENGER);
    } catch (err) {
      // store.set('user.hasError', true);
      // если ошибка логина в том, что мы уже в сети - редирект
      if (err.reason === 'User already in system') {
        await this.fetchUser();
        router.go(ROUTES.MESSENGER);
      } else {
        store.set('currentFormData.errorText', err.reason);
      }
    }
  }

  logout() {
    this.api
      .logout()
      .then(() => {
        store.set('user', initialState.user);
        router.go(ROUTES.LOGIN);
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
      .finally(() => {
        setTimeout(() => store.set('user.isLoading', false), 1000);
      });
  }
}

const authController = new AuthController();
export default authController;
