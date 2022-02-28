import { IInlineKeyboardMarkup, IMessageEntity } from "../types";
import { ICallbackQuery } from "../types/ICallbackQuery";
import { IChosenInlineResult } from "../types/IChosenInlineResult";
import { IForceReply } from "../types/IForceReply";
import { IInlineQuery } from "../types/IInlineQuery";
import { IMessage } from "../types/IMessage";
import { IPoll } from "../types/IPoll";
import { IPollAnswer } from "../types/IPollAnswer";
import { IPreCheckoutQuery } from "../types/IPreCheckoutQuery";
import { IReplayKeyboardRemove } from "../types/IReplayKeyboardRemove";
import { IReplyKeyboardMarkup } from "../types/IReplyKeyboardMarkup";
import { IShippingQuery } from "../types/IShippingQuery";

export type IMessageCallback = (message: IMessage) => void;
export type IInlineQueryCallback = (in_line_query: IInlineQuery) => void;
export type IChosenInlineResultCallback = (
  inLineResult: IChosenInlineResult
) => void;
export type ICallbackQueryCallback = (callback_query: ICallbackQuery) => void;
export type IShippingQueryCallback = (shipping_query: IShippingQuery) => void;
export type IPreCheckoutQueryCallback = (
  pre_checkout_query: IPreCheckoutQuery
) => void;
export type IPollCallback = (poll: IPoll) => void;
export type IPollAnswerCallback = (poll_answer: IPollAnswer) => void;
export type OnError = (error: any) => void;

export interface sendPollOptions {
  is_anonymous?: boolean;
  type?: string;
  allows_multiple_answers?: boolean;
  correct_option_id?: number;
  explanation?: string;
  explanation_parse_mode?: string;
  explanation_entities?: IMessageEntity[];
  open_period?: number;
  close_date?: number;
  is_closed?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?:
    | IInlineKeyboardMarkup
    | IReplyKeyboardMarkup
    | IReplayKeyboardRemove
    | IForceReply;
}
