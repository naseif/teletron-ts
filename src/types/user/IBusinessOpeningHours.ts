import { IBusinessOpeningHoursInterval } from "./IBusinessOpeningHoursInterval";

export interface IBusinessOpeningHours {
  /**
   * Unique name of the time zone for which the opening hours are defined
   */
  time_zone_name: string;
  opening_hours: IBusinessOpeningHoursInterval[];
}
