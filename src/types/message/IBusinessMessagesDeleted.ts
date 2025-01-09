import { IChat } from "../core/IChat";

/**
 * This object is received when messages are deleted from a connected business account.
 */
export interface IBusinessMessagesDeleted {
  /**
   * Unique identifier of the business connection
   */
  business_connection_id: string;

  /**
   * Information about a chat in the business account. The bot may not have access to the chat or the corresponding user.
   */
  chat: IChat;

  /**
   * The list of identifiers of deleted messages in the chat of the business account
   */
  message_ids: number[];
}
