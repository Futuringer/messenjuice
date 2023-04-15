import { SignupData, SigninData, User } from '../utils/store';
import BaseAPI from './baseApi';

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signup(data: SignupData) {
    return this.http.post('/signup', { data });
  }

  signin(data: SigninData) {
    return this.http.post('/signin', { data });
  }

  logout() {
    return this.http.post('/logout');
  }

  getUser() {
    return this.http.get<User>('/user');
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  read = undefined;
}
