/**
 * This object represents a bot command.
 */

export interface IBotCommand {
  /**
   * Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores.
   */
  command: string;
  /**
   * Description of the command; 1-256 characters.
   */
  description: string;
}
