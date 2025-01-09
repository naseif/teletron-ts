import { IMessage } from "..";

/**
 * This object represents a service message about the completion of a giveaway without public winners.
 */
export interface IGiveawayCompleted {
  /**
   * Number of winners in the giveaway
   */
  winner_count: number;
  /**
   * Optional. Number of undistributed prizes
   */
  unclaimed_prize_count?: number;
  /**
   * Optional. Message with the giveaway that was completed, if it wasn't deleted
   */
  giveaway_message?: IMessage;
  /**
   * Optional. True, if the giveaway is a Telegram Star giveaway. Otherwise, currently, the giveaway is a Telegram Premium giveaway.
   */
  is_star_giveaway?: true;
}
