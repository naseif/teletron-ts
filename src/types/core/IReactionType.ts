export type IReactionType =
  | IReactionTypeEmoji
  | IReactionTypeCustomEmoji
  | IReactionTypePaid;

/**
 * The reaction is based on an emoji.
 */
export interface IReactionTypeEmoji {
  /**
   * Type of the reaction, always “emoji”
   */
  type: string;

  /**
   * Reaction emoji. Currently, it can be one of "👍", "👎", "❤", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡"
   */
  emoji: string;
}

/**
 * The reaction is based on a custom emoji.
 */

export interface IReactionTypeCustomEmoji {
  /**
   * Type of the reaction, always “custom_emoji”
   */
  type: string;

  /**
   * Unique identifier of the custom emoji
   */
  custom_emoji_id: string;
}

/**
 * The reaction is paid.
 */
export interface IReactionTypePaid {
  /**
   * Type of the reaction, always “paid_subscription”
   */
  type: string;
}
