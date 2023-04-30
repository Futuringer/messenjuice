import { SignupData } from 'src/api/authApi';
import { handleSubmitForm } from '../../utils/helpers';
import authController from '../../controllers/authController';

export const a = 1;

export const handleSignUpSubmit = (e: HTMLFormElement, formName: string) => {
  const signup = (data: SignupData) => {
    authController.signup(data);
  };

  handleSubmitForm(e, formName, signup);
};
