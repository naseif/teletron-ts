import { IPaidMedia } from "..";

/**
 * Describes the paid media added to a message.
 */
export interface IPaidMediaInfo {
  /**
   * The number of Telegram Stars that must be paid to buy access to the media
   */
  star_count: number;
  /**
   * Information about the paid media
   */
  paid_media: IPaidMedia[];
}
