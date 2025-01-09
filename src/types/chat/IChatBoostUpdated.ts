import { IChat } from "../core/IChat";
import { IChatBoost } from "./IChatBoost";

/**
 * This object represents a boost added to a chat or changed.
 */
export interface IChatBoostUpdated {
  /**
   * Chat which was boosted
   */
  chat: IChat;

  /**
   * Information about the chat boost
   */
  boost: IChatBoost;
}
