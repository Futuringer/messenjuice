import { ChatType } from 'src/api/chatsApi';
import { validationParams, InputsCollectionType } from './consts';
import store, { ChatMessageType } from './store';

export const validateInput = (name: InputsCollectionType) => {
  const input = document.getElementsByName(name)[0] as HTMLInputElement;
  const { value } = input;

  // тут находм первую встретившуюся ошику, если хоть один регекс не пройден возвращаем ошибку
  const error = validationParams[name as keyof typeof validationParams].find(item => !item?.regex.test(value));
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

export const handleSubmitForm = (e: HTMLFormElement, formName: string, cb: (value: unknown) => void) => {
  e.preventDefault();
  store.set('currentFormData.errorText', '');
  store.set('currentFormData.successText', '');

  const form = document.forms.namedItem(formName);
  if (form) {
    const inputs = gatherAllInputs(form);
    const results = inputs.map(input => {
      return validateFormInput(input as InputsCollectionType);
    });

    const noErrors = results.every(item => item);

    if (noErrors) {
      const data = new FormData(form);
      const dataObject: Record<string, any> = {};
      for (const [name, value] of data) {
        dataObject[name] = value;
      }
      console.log('dataObject', dataObject);
      cb(dataObject);
    }
  }
};

export type Indexed<T = any> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (Object.prototype.hasOwnProperty.call(rhs, p)) {
      try {
        if (rhs[p].constructor === Object) {
          rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
        } else {
          lhs[p] = rhs[p];
        }
      } catch (e) {
        lhs[p] = rhs[p];
      }
    }
  }
  return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any,
  );

  return merge(object as Indexed, result);
}

export const isEqual = (x: any, y: any) => {
  if (x === y) {
    return true;
  }
  if (typeof x === 'object' && x != null && typeof y === 'object' && y != null) {
    if (Object.keys(x).length !== Object.keys(y).length) return false;

    for (const prop in x) {
      if (Object.prototype.hasOwnProperty.call(y, prop)) {
        if (!isEqual((x as any)[prop] as object, (y as any)[prop] as object)) return false;
      } else return false;
    }

    return true;
  }
  return false;
};

// получает значения из обьекта по строке вида a.b.c
export const getFromObj = (initialObject: Record<string, any>, initialPath: string) => {
  const array = initialPath.split('.');
  const setter = (object: Record<string, any>, path: string[]): any => {
    if (path.length === 1) {
      return object?.[path[0]];
    }
    return setter(object?.[path.splice(0, 1)![0]], path);
  };
  return setter(initialObject, array);
};

// трансформирует дату
export const transformTime = (stringDate: string) => {
  const today = new Date();
  const date = new Date(stringDate);
  if (today.getDate() === date.getDate()) {
    return `${date.getHours()}:${date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()}`;
  }
  return date.toISOString().substring(5, 10).replace('-', '/');
};
export const sortMessagesInChat = (cards: ChatType[]) => {
  const cardsWithSortedMessages = cards?.forEach(card => {
    return card.messages.sort((m1, m2) => {
      if (new Date((m1 as ChatMessageType).time) > new Date((m2 as ChatMessageType).time)) {
        return -1;
      }
      if (new Date((m2 as ChatMessageType).time) > new Date((m1 as ChatMessageType).time)) {
        return 1;
      }

      return 0;
    });
  });
  return cardsWithSortedMessages;
};
