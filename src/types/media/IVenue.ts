import { ILocation } from "..";

/**
 * This object represents a venue.
 */

export interface IVenue {
  /**
   * Venue location. Can't be a live location
   */
  location: ILocation;
  /**
   * Name of the venue
   */
  title: string;
  /**
   * Address of the venue
   */
  address: string;
  /**
   * Optional. Foursquare identifier of the venue
   */
  foursquare_id?: string;
  /**
   * Optional. Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)
   */
  foursquare_type?: string;
  /**
   * Optional. Google Places identifier of the venue
   */
  google_place_id?: string;
  /**
   * Optional. Google Places type of the venue. (See supported types.)
   */
  google_place_type?: string;
}
