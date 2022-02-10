import { IUser } from "./IUser";

/**
 * Represents an invite link for a chat.
 */
export interface IChatInviteLink {
  /**
   * The invite link. If the link was created by another chat administrator, then the second part of the link will be replaced with “…”.
   */
  invite_link: string;
  /**
   * Creator of the link
   */
  creator: IUser;
  /**
   * True, if users joining the chat via the link need to be approved by chat administrators
   */
  creates_join_request: boolean;
  /**
   * True, if the link is primary
   */
  is_primary: boolean;
  /**
   * True, if the link is revoked
   */
  is_revoked: boolean;
  /**
   * Optional. Invite link name
   */
  name?: string;
  /**
   * Optional. Point in time (Unix timestamp) when the link will expire or has been expired
   */
  expire_date?: number;
  /**
   * Optional. Maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999
   */
  member_limit?: number;
  /**
   * Optional. Number of pending join requests created using this link
   */
  pending_join_request_count?: number;
}
