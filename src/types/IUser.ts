/**
 * This object represents a Telegram user or bot.
 */

export interface IUser {
  /**
   * Unique identifier for this user or bot.
   */
  id: number;
  /**
   * True, if this user is a bot
   */
  is_bot: boolean;
  /**
   * User's or bot's first name
   */
  first_name: string;
  /**
   * Optional. User's or bot's last name
   */
  last_name?: string;
  /**
   * Optional. User's or bot's username
   */
  username?: string;
  /**
   * Optional. IETF language tag of the user's language
   */
  language_code?: string;
  /**
   * Optional. True, if the bot can be invited to groups. Returned only in getMe.
   */
  can_join_groups?: boolean;
  /**
   * Optional. True, if privacy mode is disabled for the bot. Returned only in getMe.
   */
  can_read_all_group_messages?: boolean;
  /**
   * Optional. True, if the bot supports inline queries. Returned only in getMe.
   */
  supports_inline_queries?: boolean;
}
