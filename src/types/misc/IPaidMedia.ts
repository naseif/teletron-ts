import { IPhotoSize, IVideo } from "../";

/**
 * This object describes paid media. Currently, it can be one of the follwoing types: 
    - PaidMediaPreview
    - PaidMediaPhoto
    - PaidMediaVideo

 */
export type IPaidMedia = IPaidMediaPreview | IPaidMediaPhoto | IPaidMediaVideo;

/**
 * The paid media isn't available before the payment.
 */
export interface IPaidMediaPreview {
  /**
   * Type of the paid media, always “preview”
   */
  type: string;
  /**
   * Optional. Media width as defined by the sender
   */
  width?: number;
  /**
   * Optional. Media height as defined by the sender
   */
  height?: number;
  /**
   * Optional. Duration of the media in seconds as defined by the sender
   */
  duration?: number;
}

/**
 * The paid media is a photo.
 */
export interface IPaidMediaPhoto {
  /**
   * Type of the paid media, always “photo”
   */
  type: string;
  photo: IPhotoSize[];
}

/**
 * The paid media is a video.
 */
export interface IPaidMediaVideo {
  /**
   * Type of the paid media, always “video”
   */
  type: string;
  video: IVideo;
}
