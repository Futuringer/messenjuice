import store from '../utils/store';
import UserAPI, { UpdateProfileData, UpdatePasswordData } from '../api/userApi';

class UserController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async changeAvatar(data: FormData) {
    await this.api
      .avatar(data)
      .then(user => {
        store.set('user.data', user);
      })
      .catch(e => store.set('currentFormData.errorText', e.reason));
  }

  async changeUserProfile(data: UpdateProfileData) {
    await this.api
      .profile(data)
      .then(user => {
        store.set('user.data', user);
        store.set('currentFormData.successText', 'Данные успешно обновлены');
      })
      .catch(e => store.set('currentFormData.errorText', e.reason));
  }

  async changeUserPassword(data: UpdatePasswordData) {
    await this.api
      .password(data)
      .then(() => {
        store.set('currentFormData.successText', 'Пароль успешно обновлен');
      })
      .catch(e => store.set('currentFormData.errorText', e.reason));
  }
}

const userController = new UserController();
export default userController;
