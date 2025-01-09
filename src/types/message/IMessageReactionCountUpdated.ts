import { IChat } from "../core";
import { IReactionCount } from "../misc";

/**
 * This object represents reaction changes on a message with anonymous reactions.
 */
export interface IMessageReactionCountUpdated {
  /**
   * The chat containing the message
   */
  chat: IChat;

  /**
   * Unique message identifier inside the chat
   */
  message_id: number;

  /**
   * Date of the change in Unix time
   */
  date: number;

  /**
   * List of reactions that are present on the message
   */
  reactions: IReactionCount[];
}
