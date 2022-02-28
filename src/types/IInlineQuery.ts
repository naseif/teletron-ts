import { ILocation, IUser } from "./index";

/**
 * This object represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results.
 */

export interface IInlineQuery {
  /**
   * Unique identifier for this query
   */
  id: number;
  /**
   * Sender
   */
  from: IUser;
  /**
   * Text of the query (up to 256 characters)
   */
  query: string;
  /**
   * Offset of the results to be returned, can be controlled by the bot
   */
  offset: string;
  /**
   * Optional. Type of the chat, from which the inline query was sent. Can be either “sender” for a private chat with the inline query sender, “private”, “group”, “supergroup”, or “channel”.
   */
  chat_type?: string;
  /**
   * Optional. Sender location, only for bots that request user location
   */
  location?: ILocation;
}
