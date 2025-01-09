import { IChat } from "../core/IChat";
import { IUser } from "../core/IUser";
import { IChatMember } from "./IChatMember";
import { IChatInviteLink } from "./IChatInviteLink";

/**
 * This object represents changes in the status of a chat member.
 */
export interface IChatMemberUpdated {
  /**
   * Chat the user belongs to
   */
  chat: IChat;

  /**
   * Performer of the action, which resulted in the change
   */
  from: IUser;

  /**
   * Date the change was done in Unix time
   */
  date: number;

  /**
   * Previous information about the chat member
   */
  old_chat_member: IChatMember;

  /**
   * New information about the chat member
   */
  new_chat_member: IChatMember;

  /**
   * Optional. Chat invite link, which was used by the user to join the chat; for joining by invite link events only.
   */
  invite_link?: IChatInviteLink;

  /**
   * Optional. True, if the user joined the chat after sending a direct join request without using an invite link and being approved by an administrator
   */
  via_join_request?: boolean;

  /**
   * Optional. True, if the user joined the chat via a chat folder invite link
   */
  via_chat_folder_invite_link?: boolean;
}
