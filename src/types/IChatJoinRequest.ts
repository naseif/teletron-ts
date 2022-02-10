import { IChat } from "./IChat";
import { IChatInviteLink } from "./IChatInviteLink";
import { IUser } from "./IUser";

/**
 * Represents a join request sent to a chat.
 */

export interface IChatJoinRequest {
  /**
   * Chat to which the request was sent
   */
  chat: IChat;
  /**
   * User that sent the join request
   */
  from: IUser;
  /**
   * Date the request was sent in Unix time
   */
  date: number;
  /**
   * Optional. Bio of the user.
   */
  bio?: string;
  /**
   * Optional. Chat invite link that was used by the user to send the join request
   */
  invite_link?: IChatInviteLink;
}
