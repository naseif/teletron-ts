import { IInlineKeyboardButton } from "./IInlineKeyboardButton";

/**
 * This object represents an inline keyboard that appears right next to the message it belongs to.
 */

export interface IInlineKeyboardMarkup {
  /**
   * Array of button rows, each represented by an Array of InlineKeyboardButton objects
   */
  inline_keyboard: [IInlineKeyboardButton[]];
}
