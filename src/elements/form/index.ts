import Block from '../../utils/block';
import formTmp from './formTmp';
import Button from '../button';
import InputWithLabel from '../inputWithLabel';
// import Link from '../link';

type FormProps = {
  formName: string;
  formText: string;
  buttons: Button[];
  descriptionText?: string;
  descriptionLink?: any;
  errorText?: string;
  singleColumn?: boolean;
  inputs?: InputWithLabel[];
  events?: {
    submit?: (value: HTMLFormElement) => void;
    click?: (value: HTMLFormElement) => void;
  };
};
class Form extends Block {
  constructor(props: FormProps) {
    super(props);
  }

  render() {
    const str = this.compile(formTmp, this.props);
    return str;
  }
}

export default Form;
