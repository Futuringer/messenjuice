import { ChatType, GetChatsParams, UserWithRole } from 'src/api/chatsApi';
import store, { ChatUserType } from '../../utils/store';
import { transformTime } from '../../utils/helpers';
import logo from '../../../static/imgs/avatarPlaceholder.png';

export const transformGetChatsResponse = (data: ChatType[]) => {
  const newData = data.map(item => {
    if (item.last_message) {
      return { ...item, last_message: { ...item.last_message, time: transformTime(item.last_message?.time) } };
    }

    return item;
  });

  return newData;
};

export const transformGetChatsParams = (data: GetChatsParams) => {
  const newData = { ...data };
  if (!newData?.limit) {
    newData.limit = 100;
  }

  return newData;
};

export const transformGetChatUsers = (data: UserWithRole[]): ChatUserType[] => {
  const curentUser = store.getState().user.data?.id;
  const userRole = data.find(item => {
    return item.id === curentUser;
  })?.role;

  return data.map(item => {
    return {
      id: item.id,
      display_name: item.display_name || 'default_user',
      avatar: item.avatar ? `https://ya-praktikum.tech/api/v2/resources/${item.avatar}` : logo,
      role: item.role,
      canBeDeleted: userRole === 'admin' && item.role !== 'admin',
    };
  });
};
