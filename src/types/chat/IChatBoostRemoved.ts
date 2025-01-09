import { IChat } from "../core/IChat";
import { IChatBoostSource } from "./IChatBoostSource";

/**
 * This object represents a boost removed from a chat.
 */
export interface IChatBoostRemoved {
  /**
   * Chat which was boosted
   */
  chat: IChat;

  /**
   * Unique identifier of the boost
   */
  boost_id: string;

  /**
   * Point in time (Unix timestamp) when the boost was removed
   */
  remove_date: number;

  /**
   * Source of the removed boost
   */
  source: IChatBoostSource;
}
