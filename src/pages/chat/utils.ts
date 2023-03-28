import { ContactCardProps } from 'src/elements/contactCard';
import logo from '../../../static/imgs/avatarPlaceholder.png';

const mockCards: ContactCardProps[] = [
  {
    avatar: logo,
    message: 'привет, как дела? привет, как дела? привет, как дела? привет, как дела? привет, как дела?',
    messagesCount: 5,
    name: 'Vlad',
    time: '12:03',
  },
  { avatar: logo, message: 'привет, как дела?', messagesCount: 15, name: 'Vlad', time: '12:03' },
  { avatar: logo, message: 'привет, как дела?', messagesCount: 522, name: 'Vlad', time: '12:03' },
  { avatar: logo, message: 'привет, как дела?', messagesCount: 5, name: 'Vlad', time: '12:03' },
  { avatar: logo, message: 'привет, как дела?', messagesCount: 5, name: 'Vlad', time: '12:03' },
  { avatar: logo, message: 'привет, как дела?', messagesCount: 5, name: 'Vlad', time: '12:03' },
  { avatar: logo, message: 'привет, как дела?', messagesCount: 15, name: 'Vlad', time: '12:03' },
  { avatar: logo, message: 'привет, как дела?', messagesCount: 522, name: 'Vlad', time: '12:03' },
  { avatar: logo, message: 'привет, как дела?', messagesCount: 5, name: 'Vlad', time: '12:03' },
];

export default mockCards;
