import { IChat, IUser } from "..";

export type IMessageOrigin =
  | IMessageOriginUser
  | IMessageOriginHiddenUser
  | IMessageOriginChat
  | IMessageOriginChannel;

export interface IMessageOriginUser {
  /**
   * Type of the message origin
   */
  type: string;
  /**
   * Date the message was sent originally in Unix time
   */
  date: number;
  /**
   * User that sent the message originally
   */
  sender_user: IUser;
}

export interface IMessageOriginHiddenUser extends IMessageOriginUser {
  /**
   * Name of the user that sent the message originally
   */
  sender_user_name: string;
}

export interface IMessageOriginChat {
  /**
   * Type of the message origin, always “chat”
   */
  type: string;
  /**
   * Date the message was sent originally in Unix time
   */
  date: number;
  /**
   * Chat that sent the message originally
   */
  sender_chat: IChat;
  /**
   * Optional. For messages originally sent by an anonymous chat administrator, original message author signature
   */
  author_signature?: string;
}

export interface IMessageOriginChannel {
  /**
   * Type of the message origin, always “channel”
   */
  type: string;
  /**
   * Date the message was sent originally in Unix time
   */
  date: number;
  /**
   * Channel chat to which the message was originally sent
   */
  chat: IChat;
  /**
   * Unique message identifier inside the chat
   */
  message_id: number;
  /**
   * Optional. Signature of the original post author
   */
  author_signature?: string;
}
