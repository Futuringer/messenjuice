import { User } from './authApi';
import BaseAPI from './baseApi';

export type UpdateProfileData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type UpdatePasswordData = {
  oldPassword: 'string';
  newPassword: 'string';
};

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  profile(data: UpdateProfileData) {
    return this.http.put<User>('/profile', { data });
  }

  avatar(data: FormData) {
    return this.http.put<User>('/profile/avatar', {
      data,
    });
  }

  password(data: UpdatePasswordData) {
    return this.http.put('/password', {
      data,
    });
  }

  create = undefined;

  update = undefined;

  delete = undefined;

  read = undefined;
}
