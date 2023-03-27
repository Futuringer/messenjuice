import Block from '../../utils/block';
import formTmp from './formTmp';
import Button from '../button';
import InputWithLabel from '../inputWithLabel';

type FormProps = {
  formName: string;
  formText: string;
  buttons: Button[];
  descriptionText?: string;
  descriptionLinkText?: string;
  descriptionLink?: string;
  singleColumn?: boolean;
  inputs?: InputWithLabel[];
  events?: {
    submit?: (value: HTMLFormElement) => void;
  };
};
class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super(props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const str = this.compile(formTmp, this.props);
    return str;
  }
}

export default Form;
