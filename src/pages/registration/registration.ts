import store, { SignupData } from '../../utils/store';
import { handleSubmitForm } from '../../utils/helpers';
import authController from '../../controllers/authController';

export const a = 1;

export const handleSignUpSubmit = (e: HTMLFormElement, formName: string) => {
  const signup = (data: SignupData) => {
    authController.signup(data);
    store.set('registrationFormData.errorText', '');
  };

  handleSubmitForm(e, formName, signup);
};
