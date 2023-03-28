import { validationFormsConfig } from './consts';

export const validateInput = (validationParams: { name: string; regex: RegExp }) => {
  const { name, regex } = validationParams;
  const input = document.getElementsByName(name)[0] as HTMLInputElement;
  const { value } = input;

  const result = regex.test(value);

  return result;
};

export const validationParams2 = {
  login: [
    { regex: /^[A-Za-z\d_-]{3,20}$/, message: 'err1' },
    { regex: /^(?!\s*$).+/, message: 'err2' },
  ],
  password: [
    { regex: /^[A-Za-z\d_-]{3,20}$/, message: 'err3' },
    { regex: /^(?!\s*$).+/, message: 'err4' },
  ],
};

export const validateInput2 = (name: string) => {
  const input = document.getElementsByName(name)[0] as HTMLInputElement;
  const { value } = input;

  // тут находм первую встретившуюся ошику, если хоть один регекс не пройден возвращаем ошибку
  const error = validationParams2[name as keyof typeof validationParams2].find(item => !item.regex.test(value));
  const errorMessage = error?.message;
  const result = !error;

  return { errorMessage, result };
};

export const validateFormInput2 = (name: string) => {
  const { errorMessage, result } = validateInput2(name);
  console.log(name, errorMessage, result);
  const input = document.getElementsByName(name)[0] as HTMLInputElement;
  const label = document.querySelector(`label[for=${input.name}]`) as HTMLLabelElement;

  if (!result && errorMessage) {
    label.textContent = errorMessage;
    label.classList.add('errorLabel');
  }

  return result;
};

export const validateFormInput = (validationParams: { name: string; regex: RegExp; errorText: string }) => {
  const { name, regex, errorText } = validationParams;
  const result = validateInput({ name, regex });

  const input = document.getElementsByName(name)[0] as HTMLInputElement;
  const label = document.querySelector(`label[for=${input.name}]`) as HTMLLabelElement;

  if (!result) {
    label.textContent = errorText;
    label.classList.add('errorLabel');
  }

  return result;
};

export const setDefaultLabelState = (name: string) => {
  const input = document.getElementsByName(name)[0] as HTMLInputElement;
  const label = document.querySelector(`label[for=${input.name}]`) as HTMLLabelElement;
  if (label.dataset.default) {
    label.textContent = label.dataset.default;
    label.classList.remove('errorLabel');
  }
};

export const handleInvalid = (name: string) => {
  const input = document.getElementsByName(name)[0] as HTMLInputElement;
  input.setCustomValidity(' ');
};

export const gatherAllInputs = (element: HTMLElement) => {
  const inputs = element.getElementsByTagName('input');

  return Array.from(inputs).map(item => item.name);
};

export const handleSubmitForm = (e: HTMLFormElement, formName: string) => {
  e.preventDefault();
  const form = document.forms.namedItem(formName);
  const inputs = gatherAllInputs(form!);
  const results = inputs.map(input =>
    validateFormInput(validationFormsConfig[input as keyof typeof validationFormsConfig]!),
  );

  const noErrors = results.every(item => item);

  if (noErrors) {
    const data = new FormData(form!);
    // eslint-disable-next-line no-restricted-syntax
    for (const [name, value] of data) {
      console.log(name, ':', value);
    }
  }
};
