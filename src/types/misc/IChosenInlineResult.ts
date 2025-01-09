import { ILocation, IUser } from "../";

/**
 * Represents a result of an inline query that was chosen by the user and sent to their chat partner.
 */

export interface IChosenInlineResult {
  /**
   * The unique identifier for the result that was chosen
   */
  result_id: string;
  /**
   * The user that chose the result
   */
  from: IUser;
  /**
   * Optional. Sender location, only for bots that require user location
   */
  location?: ILocation;
  /**
   * Optional. Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message
   */
  inline_message_id?: string;
  /**
   * The query that was used to obtain the result
   */
  query?: string;
}
