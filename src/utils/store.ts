import Block from './block';
import EventBus from './eventBus';
import { set } from './helpers';

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface SigninData {
  login: string;
  password: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export enum StoreEvents {
  Updated = 'Updated',
  // RESET_FORM = 'ResetForms',
}

interface State {
  user: {
    data?: User | null;
    hasError?: boolean;
    isLoading?: boolean;
  };
  loginFormData: {
    errorText: string;
  };
  registrationFormData: {
    errorText: string;
  };
}

const initialState: State = {
  user: {
    data: null,
    isLoading: true,
    hasError: false,
  },
  loginFormData: { errorText: '' },
  registrationFormData: { errorText: '' },
};

class Store extends EventBus {
  private state: State = initialState;

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated, this.state);
  }
}

const store = new Store();

export const withStore = (mapStateToProps: (state: State) => any) => {
  return (Component: typeof Block) => {
    return class WithStore extends Component {
      constructor(props: any) {
        const mappedState = mapStateToProps(store.getState());
        super({ ...props, ...mappedState });
        store.on(StoreEvents.Updated, newState => {
          const newMappedState = mapStateToProps(newState);
          this.setProps(newMappedState);
        });
      }
    };
  };
};

export default store;
