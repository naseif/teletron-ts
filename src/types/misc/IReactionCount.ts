import { IReactionType } from "../core/IReactionType";

/**
 * Represents a reaction added to a message along with the number of times it was added.
 */
export interface IReactionCount {
  /**
   * Type of the reaction
   */
  type: IReactionType;

  /**
   * Number of times the reaction was added
   */
  total_count: number;
}
