import {
  IBirthdate,
  IBusinessIntro,
  IBusinessLocation,
  IBusinessOpeningHours,
  IChat,
  IChatLocation,
  IChatPermissions,
  IChatPhoto,
  IMessage,
  IReactionType,
} from "../";

/**
 * This object contains full information about a chat.
 */

export interface IChatFullInfo extends IChat {
  /**
   * Identifier of the accent color for the chat name and backgrounds of the chat photo, reply header, and link preview. See accent colors for more details.
   * @see https://core.telegram.org/bots/api#accent-colors
   */
  accent_color_id: number;
  /**
   * The maximum number of reactions that can be set on a message in the chat
   */
  max_reaction_count: number;
  /**
   * Optional. Chat photo
   */
  photo?: IChatPhoto;
  /**
   * Optional. If non-empty, the list of all active chat usernames; for private chats, supergroups and channels
   */
  active_usernames?: string[];
  /**
   * Optional. For private chats, the date of birth of the user
   */
  birthdate?: IBirthdate;
  /**
   * Optional. For private chats with business accounts, the intro of the business
   */
  business_intro?: IBusinessIntro;
  /**
   * Optional. For private chats with business accounts, the location of the business
   */
  business_location?: IBusinessLocation;
  /**
   * Optional. For private chats with business accounts, the opening hours of the business
   */
  business_opening_hours?: IBusinessOpeningHours;
  /**
   * Optional. For private chats, the personal channel of the user
   */
  personal_chat?: IChat;
  /**
   * Optional. List of available reactions allowed in the chat. If omitted, then all emoji reactions are allowed.
   */
  available_reactions?: IReactionType[];
  /**
   * Optional. Custom emoji identifier of the emoji chosen by the chat for the reply header and link preview background
   */
  background_custom_emoji_id?: string;
  /**
   * Optional. Identifier of the accent color for the chat's profile background. See profile accent colors for more details.
   */
  profile_accent_color_id?: number;
  /**
   * Optional. Custom emoji identifier of the emoji chosen by the chat for its profile background
   */
  profile_background_custom_emoji_id?: string;
  /**
   * Optional. Custom emoji identifier of the emoji status of the chat or the other party in a private chat
   */
  emoji_status_custom_emoji_id?: string;
  /**
   * Optional. Expiration date of the emoji status of the chat or the other party in a private chat, in Unix time, if any
   */
  emoji_status_expiration_date?: number;
  /**
   * Optional. Bio of the other party in a private chat
   */
  bio?: string;
  /**
   * Optional. True, if privacy settings of the other party in the private chat allows to use tg://user?id=<user_id> links only in chats with the user
   */
  has_private_forwards?: boolean;
  /**
   * Optional. True, if the privacy settings of the other party restrict sending voice and video note messages in the private chat
   */
  has_restricted_voice_and_video_messages?: boolean;
  /**
   * Optional. True, if users need to join the supergroup before they can send messages
   */
  join_to_send_messages?: boolean;
  /**
   * Optional. True, if all users directly joining the supergroup without using an invite link need to be approved by supergroup administrators
   */
  join_by_request?: boolean;
  /**
   * Optional. Description, for groups, supergroups and channel chats
   */
  description?: string;
  /**
   * Optional. Primary invite link, for groups, supergroups and channel chats
   */
  invite_link?: string;
  /**
   * Optional. The most recent pinned message (by sending date)
   */
  pinned_message?: IMessage;
  /**
   * Optional. Default chat member permissions, for groups and supergroups
   */
  permissions?: IChatPermissions;
  /**
   * Optional. True, if the chat can send paid media
   */
  can_send_paid_media?: true;
  /**
   * Optional. Delay in seconds for sending messages in slow mode
   */
  slow_mode_delay?: number;
  /**
   * Optional. Number of boosts required to unrestrict the chat
   */
  unrestrict_boost_count?: number;
  /**
   * Optional. Time in seconds for auto-deleting messages
   */
  message_auto_delete_time?: number;
  /**
   * Optional. True, if aggressive anti-spam is enabled
   */
  has_aggressive_anti_spam_enabled?: true;
  /**
   * Optional. True, if the chat has hidden members
   */
  has_hidden_members?: true;
  /**
   * Optional. True, if the chat has protected content
   */
  has_protected_content?: true;
  /**
   * Optional. True, if the chat has visible history
   */
  has_visible_history?: true;
  /**
   * Optional. Name of the sticker set used in the chat
   */
  sticker_set_name?: string;
  /**
   * Optional. True, if the chat can set a sticker set
   */
  can_set_sticker_set?: true;
  /**
   * Optional. Name of the custom emoji sticker set used in the chat.
   */
  custom_emoji_sticker_set_name?: string;
  /**
   * Optional. Identifier of the linked chat
   */
  linked_chat_id?: number;
  /**
   * Optional. Location of the chat
   */
  location?: IChatLocation;
}
