import {
  IShippingQuery,
  IPreCheckoutQuery,
  IPollAnswer,
  IPoll,
  IMessage,
  IInlineQuery,
  IChosenInlineResult,
  ICallbackQuery,
  IChatJoinRequest,
} from "../types";

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

export interface TelegramEvents {
  message: [message: IMessage];
  edited_message: [message: IMessage];
  edited_channel_post: [message: IMessage];
  channel_post: [message: IMessage];
  inline_query: [message: IInlineQuery];
  chosen_inline_result: [message: IChosenInlineResult];
  callback_query: [query: ICallbackQuery];
  shipping_query: [query: IShippingQuery];
  poll: [poll: IPoll];
  poll_answer: [pollAnswer: IPollAnswer];
  chat_join_request: [request: IChatJoinRequest];
  error: [error: any];
}
