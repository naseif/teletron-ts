/**
 * Represents the rights of an administrator in a chat.
 */

export interface IChatAdministratorRights {
  /**
   * True, if the user's presence in the chat is hidden
   */
  is_anonymous: boolean;
  /**
   * True, if the administrator can access the chat event log, chat statistics, message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other administrator privilege
   */
  can_manage_chat: boolean;
  /**
   * True, if the administrator can delete messages of other users
   */
  can_delete_messages: boolean;
  /**
   * True, if the administrator can manage video chats
   */
  can_manage_video_chats: boolean;
  /**
   * True, if the administrator can restrict, ban or unban chat members
   */
  can_restrict_members: boolean;
  /**
   * True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user)
   */
  can_promote_members: boolean;
  /**
   * True, if the user is allowed to change the chat title, photo and other settings
   */
  can_change_info: boolean;
  /**
   * True, if the user is allowed to invite new users to the chat
   */
  can_invite_users: boolean;
  /**
   * Optional. True, if the administrator can post in the channel; channels only
   */
  can_post_messages?: boolean;
  /**
   * Optional. True, if the administrator can edit messages of other users and can pin messages; channels only
   */
  can_edit_messages?: boolean;
  /**
   * Optional. True, if the user is allowed to pin messages; groups and supergroups only
   */
  can_pin_messages?: boolean;
  /**
   * Optional. True, if the user is allowed to create, rename, close, and reopen forum topics; supergroups only
   */
  can_manage_topics?: boolean;
}
