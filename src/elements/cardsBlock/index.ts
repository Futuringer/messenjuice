import Block from '../../utils/block';
import cardsBlockTmp from './cardsBlockTmp';
import ContactCard from '../contactCard';

type CardsBlockProps = {
  cards: ContactCard[];
};

class CardsBlock extends Block<CardsBlockProps> {
  constructor(props: CardsBlockProps) {
    super(props);
  }

  render() {
    const str = this.compile(cardsBlockTmp, this.props);
    return str;
  }
}

export default CardsBlock;
