import { IUser } from "./IUser";

export interface IMessageEntity {
  /**
   * Type of the entity. Currently, can be “mention” (@username), “hashtag” (#hashtag), “cashtag” ($USD), “bot_command” (/start@jobs_bot), “url” (https://telegram.org), “email” (do-not-reply@telegram.org), “phone_number” (+1-212-555-0123), “bold” (bold text), “italic” (italic text), “underline” (underlined text), “strikethrough” (strikethrough text), “spoiler” (spoiler message), “code” (monowidth string), “pre” (monowidth block), “text_link” (for clickable text URLs), “text_mention”
   */
  type: string;

  /**
   * Offset in UTF-16 code units to the start of the entity
   */
  offset: number;

  /**
   * Length of the entity in UTF-16 code units
   */
  length: number;

  /**
   * Optional. For “text_link” only, url that will be opened after user taps on the text
   */
  url?: string;

  /**
   * Optional. For “text_mention” only, the mentioned user
   */
  user?: IUser;

  /**
   * Optional. For “pre” only, the programming language of the entity text
   */
  language?: string;
  /**
   * Optional. For “custom_emoji” only, unique identifier of the custom emoji. Use getCustomEmojiStickers to get full information about the sticker.
   * @see https://core.telegram.org/bots/api#getcustomemojistickers
   */
  custom_emoji_id?: string;
}
