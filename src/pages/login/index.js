import Handlebars from "handlebars";
import { loginTmp } from "./loginTmp";
import logo from './../../../static/imgs/logo.svg'

const data = {
  formName: 'loginForm',
  formText: 'Sign in',
  descriptionText: 'No account?',
  descriptionLinkText: 'Create one',
  descriptionLink: './sign-up',
  singleColumn: true,
  img:logo,
  inputs: [
    {label: "Login", name: 'Login',type: 'text', placeholder: "Enter your login", isRequired: true},
    {label: "Password", name: 'Password',type: 'password', placeholder: "Enter your password", isRequired: true},
  ],
  buttons: [{type: "submit", text: 'Sign up', isActive: true}]
}

export const renderLogin = () => {
  return Handlebars.compile(loginTmp)(data);
};

