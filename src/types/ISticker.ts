import { IPhotoSize } from "./IIPhotoSize";
import { IMaskPosition } from "./IMaskPosition";
/**
 * This object represents a sticker.
 */

export interface ISticker {
  /**
   * Identifier for this file, which can be used to download or reuse the file
   */
  file_id: string;
  /**
   * Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
   */
  file_unique_id: string;
  /**
   * Sticker width
   */
  width: number;
  /**
   * Sticker height
   */
  height: number;
  /**
   * True, if the sticker is animated
   */
  is_animated: boolean;
  /**
   * True, if the sticker is a video sticker
   */
  is_video: boolean;
  /**
   * Optional. Sticker thumbnail in the .WEBP or .JPG format
   */
  thumb?: IPhotoSize;
  /**
   * Optional. Emoji associated with the sticker
   */
  emoji?: string;
  /**
   * Optional. Name of the sticker set to which the sticker belongs
   */
  set_name?: string;
  /**
   * Optional. For mask stickers, the position where the mask should be placed
   */
  mask_position?: IMaskPosition;
  /**
   * Optional. File size in bytes
   */
  file_size?: number;
}
