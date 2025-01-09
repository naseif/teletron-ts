import { IUser } from "../";

/**
 * This object represents the content of a service message, sent whenever a user in the chat triggers a proximity alert set by another user.
 */

export interface IProximityAlertTriggered {
  /**
   * User that triggered the alert
   */
  traveler: IUser;
  /**
   * User that set the alert
   */
  watcher: IUser;
  /**
   * The distance between the users
   */
  distance: number;
}
