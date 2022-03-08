import { ICallbackQuery } from "../types/ICallbackQuery";
import { IChosenInlineResult } from "../types/IChosenInlineResult";
import { IInlineQuery } from "../types/IInlineQuery";
import { IMessage } from "../types/IMessage";
import { IPoll } from "../types/IPoll";
import { IPollAnswer } from "../types/IPollAnswer";
import { IPreCheckoutQuery } from "../types/IPreCheckoutQuery";
import { IShippingQuery } from "../types/IShippingQuery";

export type TMessageCallback = (message: IMessage) => void;
export type TInlineQueryCallback = (in_line_query: IInlineQuery) => void;
export type TChosenInlineResultCallback = (
  inLineResult: IChosenInlineResult
) => void;
export type TCallbackQueryCallback = (callback_query: ICallbackQuery) => void;
export type TShippingQueryCallback = (shipping_query: IShippingQuery) => void;
export type TPreCheckoutQueryCallback = (
  pre_checkout_query: IPreCheckoutQuery
) => void;
export type TPollCallback = (poll: IPoll) => void;
export type TPollAnswerCallback = (poll_answer: IPollAnswer) => void;
export type TOnError = (error: any) => void;

export type ActionType =
  | "typing"
  | "upload_photo"
  | "record_video"
  | "upload_video"
  | "record_voice"
  | "upload_voice"
  | "upload_document"
  | "choose_sticker"
  | "find_location"
  | "record_video_note"
  | "upload_video_note";

export interface LocalFile {
  /**
   * Path string to the local file
   */
  file: string;
  /**
   * Optional, The type content of the file.
   */
  content_type?: string;
}

/**
 * This object represents a unique message identifier.
 */
export interface IMessageId {
  /**
   * Unique message identifier
   */
  message_id: number;
}

export interface TelegramEvents {
  message: [message: IMessage];
  editedMessage: [message: IMessage];
}
