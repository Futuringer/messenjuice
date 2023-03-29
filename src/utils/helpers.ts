import { validationParams, InputsCollectionType } from './consts';

export const validateInput = (name: InputsCollectionType) => {
  const input = document.getElementsByName(name)[0] as HTMLInputElement;
  const { value } = input;

  // тут находм первую встретившуюся ошику, если хоть один регекс не пройден возвращаем ошибку
  const error = validationParams[name as keyof typeof validationParams].find(item => !item.regex.test(value));
  const errorMessage = error?.message;
  const result = !error;

  return { errorMessage, result };
};

export const validateFormInput = (name: InputsCollectionType) => {
  const { errorMessage, result } = validateInput(name);
  const input = document.getElementsByName(name)[0] as HTMLInputElement;
  const label = document.querySelector(`label[for=${input.name}]`) as HTMLLabelElement;

  if (!result && errorMessage) {
    label.textContent = errorMessage;
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
  if (form) {
    const inputs = gatherAllInputs(form);
    const results = inputs.map(input => {
      return validateFormInput(input as InputsCollectionType);
    });

    const noErrors = results.every(item => item);

    if (noErrors) {
      const data = new FormData(form);
      for (const [name, value] of data) {
        console.log(name, ':', value);
      }
    }
  }
};
