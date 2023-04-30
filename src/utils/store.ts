import { ChatType } from 'src/api/chatsApi';
import Block from './block';
import EventBus from './eventBus';
import { set } from './helpers';
import { User } from '../api/authApi';

export enum StoreEvents {
  Updated = 'Updated',
}

export type ChatMessageType = {
  content: string;
  time: string;
  isOwn: boolean;
};

export type ChatUserType = {
  id: number;
  display_name: string;
  avatar: string;
  role: string;
  canBeDeleted?: boolean;
};

interface State {
  user: {
    data?: User | null;
    hasError?: boolean;
    isLoading?: boolean;
  };
  currentFormData: {
    errorText: string;
    successText: string;
  };
  chats: {
    cards: Array<ChatType>;
  } | null;
  activeProfileForm?: { value: 'profile' | 'changeInfo' | 'changePassword' };
  currentChat: { value: number; users: ChatUserType[] } | null;
}

export const initialState: State = {
  user: {
    data: null,
    isLoading: true,
    hasError: false,
  },
  currentFormData: { errorText: '', successText: '' },
  activeProfileForm: { value: 'profile' },
  chats: null,
  currentChat: null,
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
