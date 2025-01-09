import { IChatLocation, IChatPermissions, IChatPhoto, IMessage } from "..";

/**
 * This object represents a chat.
 */
export interface IChat {
  /**
   * Unique identifier for this chat.
   */
  id: number;
  /**
   * Type of chat, can be either “private”, “group”, “supergroup” or “channel”
   */
  type: string;
  /**
   * Optional. Title, for supergroups, channels and group chats
   */
  title?: string;
  /**
   * Optional. Username, for private chats, supergroups and channels if available
   */
  username?: string;
  /**
   * Optional. First name of the other party in a private chat
   */
  first_name?: string;
  /**
   * Optional. Last name of the other party in a private chat
   */
  last_name?: string;
  /**
   * Optional. True, if the supergroup chat is a forum (has topics enabled)
   */
  is_forum?: boolean;
}
