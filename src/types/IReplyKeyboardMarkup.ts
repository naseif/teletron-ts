/**
 * This object represents a custom keyboard with reply options (see Introduction to bots for details and examples).
 */

import { IKeyboardButton } from "./IKeyboardButton";

export interface IReplyKeyboardMarkup {
  keyboard: [IKeyboardButton[]];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  input_field_placeholder?: string;
  selective?: boolean;
}
