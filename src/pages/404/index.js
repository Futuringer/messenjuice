import Handlebars from "handlebars";
import { clientErrorTmp } from "./404Tmp";

export const renderClientError = () => {
  return Handlebars.compile(clientErrorTmp)({errorTitle:'404', errorText:'Page not found', button: {type: "button", text: 'Back to chat', isActive: true}});
};
