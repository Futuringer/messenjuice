import Block from '../../utils/block';
import formTmp from './avatarFormTmp';

type AvatarInputProps = {
  events?: {
    change?: (value: Event) => void;
  };
};

class AvatarInput extends Block {
  constructor(props: AvatarInputProps) {
    super(props);
  }

  render() {
    const str = this.compile(formTmp, this.props);
    return str;
  }
}

export default AvatarInput;
