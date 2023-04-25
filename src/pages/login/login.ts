import { SigninData } from '../../api/authApi';
import { handleSubmitForm } from '../../utils/helpers';
import authController from '../../controllers/authController';

export const a = 1;

export const handleSignInSubmit = (e: HTMLFormElement, formName: string) => {
  const signin = (data: SigninData) => {
    authController.signin(data);
  };

  handleSubmitForm(e, formName, signin);
};
