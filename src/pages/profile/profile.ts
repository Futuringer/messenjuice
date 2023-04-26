import { handleSubmitForm } from '../../utils/helpers';
import userController from '../../controllers/userController';
import authController from '../../controllers/authController';
import { ROUTES } from '../../utils/consts';
import { router } from '../../utils/router';
import { UpdateProfileData, UpdatePasswordData } from '../../api/userApi';

export const handleCancelClick = () => {
  router.go(ROUTES.MESSENGER);
};

export const handleAvatarChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const formData = new FormData();
  if (target.files) {
    formData.append('avatar', target.files[0]);
    userController.changeAvatar(formData);
  }
};

export const handleProfileChangeSubmit = (e: HTMLFormElement, formName: string) => {
  const callback = (data: UpdateProfileData) => {
    userController.changeUserProfile(data);
  };

  handleSubmitForm(e, formName, callback);
};

export const handlePasswordChangeSubmit = (e: HTMLFormElement, formName: string) => {
  const callback = (data: UpdatePasswordData) => {
    userController.changeUserPassword(data);
  };

  handleSubmitForm(e, formName, callback);
};

export const handleSignOutClick = () => {
  authController.logout();
};
