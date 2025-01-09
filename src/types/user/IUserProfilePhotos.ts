import { IPhotoSize } from "..";

export interface IUserProfilePhotos {
  /**
   * Total number of profile pictures the target user has
   */
  total_count: number;
  /**
   * Requested profile pictures (in up to 4 sizes each)
   */
  photos: [IPhotoSize[]];
}
