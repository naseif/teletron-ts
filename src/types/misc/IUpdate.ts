import { IBusinessConnection } from "../user/IBusinessConnection";
import {
  IBusinessMessagesDeleted,
  ICallbackQuery,
  IChatBoostRemoved,
  IChatBoostUpdated,
  IChatJoinRequest,
  IChatMemberUpdated,
  IChosenInlineResult,
  IInlineQuery,
  IMessage,
  IMessageReactionCountUpdated,
  IMessageReactionUpdated,
  IPaidMediaPurchased,
  IPoll,
  IPollAnswer,
  IPreCheckoutQuery,
  IShippingQuery,
} from "../index";

/**
 * This object represents an incoming update.
 */

export interface IUpdate {
  /**
   * The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This ID becomes especially handy if you're using Webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence
   */
  update_id: number;
  /**
   * Optional. New incoming message of any kind — text, photo, sticker, etc.
   */
  message?: IMessage;
  /**
   * Optional. New version of a message that is known to the bot and was edited
   */
  edited_message?: IMessage;
  /**
   * Optional. New incoming channel post of any kind — text, photo, sticker, etc.
   */
  channel_post?: IMessage;
  /**
   * Optional. New version of a channel post that is known to the bot and was edited
   */
  edited_channel_post?: IMessage;
  /**
   * Optional. New incoming inline query
   */
  inline_query?: IInlineQuery;
  /**
   * Optional. The result of an inline query that was chosen by a user and sent to their chat partner.
   */
  chosen_inline_result?: IChosenInlineResult;
  /**
   * Optional. New incoming callback query
   */
  callback_query?: ICallbackQuery;
  /**
   * Optional. New incoming shipping query. Only for invoices with flexible price
   */
  shipping_query?: IShippingQuery;
  /**
   * Optional. New incoming pre-checkout query. Contains full information about checkout
   */
  pre_checkout_query?: IPreCheckoutQuery;
  /**
   * Optional. New poll state. Bots receive only updates about stopped polls and polls, which are sent by the bot
   */
  poll?: IPoll;
  /**
   * Optional. A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself.
   */
  poll_answer?: IPollAnswer;
  /**
   * Optional. A request to join the chat has been sent. The bot must have the can_invite_users administrator right in the chat to receive these updates.
   */
  chat_join_request?: IChatJoinRequest;
  /**
   * Optional. The bot was connected to or disconnected from a business account, or a user edited an existing connection with the bot
   */
  business_connection?: IBusinessConnection;
  /**
   * Optional. New message from a connected business account
   */
  business_message?: IMessage;
  /**
   * Optional. New incoming purchased paid media
   */
  purchased_paid_media?: IPaidMediaPurchased;
  /**
   * Optional. New incoming chat member update
   */
  my_chat_member?: IChatMemberUpdated;
  /**
   * Optional. New incoming chat member update
   */
  chat_member?: IChatMemberUpdated;
  /**
   * Optional. New incoming chat boost update
   */
  chat_boost?: IChatBoostUpdated;
  /**
   * Optional. New incoming removed chat boost
   */
  removed_chat_boost?: IChatBoostRemoved;
  /**
   * Optional. New incoming edited business message
   */
  edited_business_message?: IMessage;
  /**
   * Optional. New incoming deleted business messages
   */
  deleted_business_messages?: IBusinessMessagesDeleted;
  /**
   * Optional. New incoming message reaction update
   */
  message_reaction?: IMessageReactionUpdated;
  /**
   * Optional. New incoming message reaction count update
   */
  message_reaction_count?: IMessageReactionCountUpdated;
}
