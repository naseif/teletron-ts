export interface IPollOption {
  /**
   * Option text, 1-100 characters
   */

  text: string;

  /**
   * Number of users that voted for this option
   */

  voter_count: number;
}
