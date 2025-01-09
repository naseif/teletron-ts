import { IUser } from "../core";

/**
 * Represents a chat member that has no additional privileges or restrictions.
 */

export interface IChatMemberMember {
  /**
   * The member's status in the chat, always "member"
   */
  status: string;
  /**
   * Information about the user
   */
  user: IUser;
}
