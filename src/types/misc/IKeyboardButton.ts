import { IKeyboardButtonPollType } from "./IKeyboardButtonPollType";
import { IWebAppInfo } from "../";

/**
 * This object represents one button of the reply keyboard. For simple text buttons String can be used instead of this object to specify text of the button. Optional fields request_contact, request_location, and request_poll are mutually exclusive.
 */

export interface IKeyboardButton {
  text: string;
  request_contact?: boolean;
  request_location?: boolean;
  request_poll?: IKeyboardButtonPollType;
  /**
   * Optional. If specified, the described Web App will be launched when the button is pressed. The Web App will be able to send a “web_app_data” service message. Available in private chats only.
   */
  web_app?: IWebAppInfo;
}
