import { ContactCardProps } from 'src/elements/contactCard';
import { MessageProps } from 'src/elements/message';
import logo from '../../../static/imgs/avatarPlaceholder.png';
import mockImage from '../../../static/imgs/mockMessageImage.png';

export const mockCards: ContactCardProps[] = [
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

export const mockMessages: MessageProps[] = [
  {
    text: "Let's go for a walk today!",
    isMyMessage: false,
    time: '10:02',
  },
  {
    text: 'Hi! tell me about snowboarding',
    isMyMessage: true,
    time: '10:03',
  },
  {
    image: mockImage,
    isMyMessage: true,
    time: '10:01',
  },
  {
    text: 'Hi!',
    isMyMessage: true,
    time: '10:04',
  },
  {
    text: 'There are several different styles of snowboarding, including freestyle, freeride, alpine, and backcountry.',
    isMyMessage: false,
    time: '10:05',
  },
  {
    text: 'There are several different styles of snowboarding, including freestyle, freeride, alpine, and backcountry. Freestyle snowboarding involves performing tricks and stunts on jumps and other features found in terrain parks. Freeride snowboarding involves riding through natural terrain and often includes elements of both alpine and freestyle riding. ',
    isMyMessage: true,
    time: '10:01',
  },
  {
    text: "Let's go for a walk today!",
    isMyMessage: false,
    time: '10:02',
  },
  {
    text: 'Hi! tell me about snowboarding',
    isMyMessage: true,
    time: '10:03',
  },
  {
    text: 'Hi!',
    isMyMessage: true,
    time: '10:04',
  },
  {
    text: 'There are several different styles of snowboarding, including freestyle, freeride, alpine, and backcountry.',
    isMyMessage: false,
    time: '10:05',
  },
  {
    text: 'Hi!',
    isMyMessage: true,
    time: '10:02',
  },
  {
    text: "Let's go for a walk today!",
    isMyMessage: false,
    time: '10:02',
  },
  {
    text: 'Hi! tell me about snowboarding',
    isMyMessage: true,
    time: '10:03',
  },
  {
    text: 'Hi!',
    isMyMessage: true,
    time: '10:04',
  },
  {
    text: 'There are several different styles of snowboarding, including freestyle, freeride, alpine, and backcountry.',
    isMyMessage: false,
    time: '10:05',
  },
  {
    text: 'Hi!',
    isMyMessage: true,
    time: '10:02',
  },

  {
    text: 'last',
    isMyMessage: false,
    time: '10:01',
  },
];
