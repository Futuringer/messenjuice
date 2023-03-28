export const validateInput = (validationParams: { name: string; regex: RegExp }) => {
  const { name, regex } = validationParams;
  const input = document.getElementsByName(name)[0] as HTMLInputElement;
  const { value } = input;

  const result = regex.test(value);

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
