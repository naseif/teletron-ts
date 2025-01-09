import { IUser } from "../core/IUser";

/**
 * This object describes the source of a chat boost.
 */
export type IChatBoostSource =
  | IChatBoostSourcePremium
  | IChatBoostSourceGiftCode
  | IChatBoostSourceGiveaway;

/**
 * The boost was obtained by subscribing to Telegram Premium or by gifting a Telegram Premium subscription to another user.
 */
export interface IChatBoostSourcePremium {
  /**
   * Source of the boost, always “premium”
   */
  source: "premium";

  /**
   * User that boosted the chat
   */
  user: IUser;
}

/**
 * The boost was obtained by the creation of Telegram Premium gift codes to boost a chat.
 */
export interface IChatBoostSourceGiftCode {
  /**
   * Source of the boost, always “gift_code”
   */
  source: "gift_code";

  /**
   * User for which the gift code was created
   */
  user: IUser;
}

/**
 * The boost was obtained by the creation of a Telegram Premium or a Telegram Star giveaway.
 */
export interface IChatBoostSourceGiveaway {
  /**
   * Source of the boost, always “giveaway”
   */
  source: "giveaway";

  /**
   * Identifier of a message in the chat with the giveaway; the message could have been deleted already. May be 0 if the message isn't sent yet.
   */
  giveaway_message_id: number;

  /**
   * Optional. User that won the prize in the giveaway if any; for Telegram Premium giveaways only
   */
  user?: IUser;

  /**
   * Optional. The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only
   */
  prize_star_count?: number;

  /**
   * Optional. True, if the giveaway was completed, but there was no user to win the prize
   */
  is_unclaimed?: true;
}
