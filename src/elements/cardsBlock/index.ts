import Block from '../../utils/block';
import cardsBlockTmp from './cardsBlockTmp';
import ContactCard from '../contactCard';
import Button from '../button';
import { handleAddChatClick } from './cardsBlock';

type CardsBlockProps = {
  cards?: ContactCard[];
  newChatButton?: Button;
};
class CardsBlock extends Block {
  constructor(props: CardsBlockProps) {
    super({
      ...props,
      newChatButton: new Button({
        text: 'Add new chat',
        variant: 'form',
        type: 'button',
        events: {
          click: handleAddChatClick,
        },
      }),
    });
  }

  render() {
    const str = this.compile(cardsBlockTmp, this.props);
    return str;
  }
}

export default CardsBlock;
