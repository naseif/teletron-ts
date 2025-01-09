import { IChat, IMessage } from "../";

/**
 * This object describes a message that can be inaccessible to the bot. It can be one of
 */
export type IMaybeInaccessibleMessage = IMessage | InaccessibleMessage;

/**
 * This object describes a message that was deleted or is otherwise inaccessible to the bot.
 */
export interface InaccessibleMessage {
  /**
   * Chat the message belonged to
   */
  chat: IChat;
  /**
   * Unique message identifier inside the chat
   */
  message_id: number;
  /**
   * Always 0. The field can be used to differentiate regular and inaccessible messages.
   */
  date: number;
}
