import { IUser } from "../core";

/**
 * Represents a chat member that isn't currently a member of the chat, but may join it themselves.
 */

export interface IChatMemberLeft {
  /**
   * The member's status in the chat, always "left"
   */
  status: string;
  /**
   * Information about the user
   */
  user: IUser;
}
