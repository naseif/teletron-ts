import { ICallbackGame } from "./ICallbackGame";
import { ILoginUrl } from "./ILoginUrl";

/**
 * This object represents one button of an inline keyboard. You must use exactly one of the optional fields.
 */

export interface IInlineKeyboardButton {
  /**
   * Label text on the button
   */
  text: string;
  /**
   * Optional. HTTP or tg:// url to be opened when the button is pressed. Links tg://user?id=<user_id> can be used to mention a user by their ID without using a username, if this is allowed by their privacy settings.
   */
  url?: string;
  /**
   * Optional. An HTTP URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget.
   */
  login_url?: ILoginUrl;
  /**
   * Optional. Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes
   */
  callback_data?: string;
  /**
   * Optional. If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. Can be empty, in which case just the bot's username will be inserted.
   */
  switch_inline_query?: string;
  /**
   * Optional. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. Can be empty, in which case only the bot's username will be inserted.
  This offers a quick way for the user to open your bot in inline mode in the same chat – good for selecting something from multiple options.
   */
  switch_inline_query_current_chat?: string;
  /**
   * Optional. Description of the game that will be launched when the user presses the button. NOTE: This type of button must always be the first button in the first row.
   */
  callback_game?: ICallbackGame;
  /**
   * Optional. Specify True, to send a Pay button. NOTE: This type of button must always be the first button in the first row and can only be used in invoice messages.
   */
  pay?: boolean;
}
