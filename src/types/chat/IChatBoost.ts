import { IChatBoostSource } from "./IChatBoostSource";

/**
 * This object contains information about a chat boost.
 */
export interface IChatBoost {
  /**
   * Unique identifier of the boost
   */
  boost_id: string;

  /**
   * Point in time (Unix timestamp) when the chat was boosted
   */
  add_date: number;

  /**
   * Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged
   */
  expiration_date: number;

  /**
   * Source of the added boost
   */
  source: IChatBoostSource;
}
