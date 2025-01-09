import { IUser } from "../core";

/**
 * This object contains information about a paid media purchase.
 */
export interface IPaidMediaPurchased {
  /**
   * User who purchased the media
   */
  from: IUser;

  /**
   * Bot-specified paid media payload
   */
  paid_media_payload: string;
}
