import store, { ChatMessageType } from '../../utils/store';
import { ChatMessagePaload } from '../../api/webSocketApi';
import { transformTime } from '../../utils/helpers';

export const transformGetChatsResponse = (
  data: ChatMessagePaload[] | ChatMessagePaload,
): ChatMessageType[] | ChatMessageType => {
  if (Array.isArray(data)) {
    return data.map(item => {
      return {
        content: item.content,
        time: transformTime(item.time),
        isOwn: store.getState().user.data?.id === item.user_id,
      };
    });
  }

  return {
    content: data.content,
    time: transformTime(data.time),
    isOwn: store.getState().user.data?.id === data.user_id,
  };
};
