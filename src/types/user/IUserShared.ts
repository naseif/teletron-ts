import { ISharedUser } from "./ISharedUser";

/**
 * This object contains information about the users whose identifiers were shared with the bot using a KeyboardButtonRequestUsers button.
 */
export interface IUserShared {
  /**
   * Identifier of the request
   */
  request_id: number;
  /**
   * Information about users shared with the bot.
   */
  users: ISharedUser[];
}
