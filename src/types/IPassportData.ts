import { IEncryptedCredentials } from "./IEncryptedCredentials";
import { IEncryptedPassportElement } from "./IEncryptedPassportElement";

/**
 * Contains information about Telegram Passport data shared with the bot by the user.
 */

export interface IPassportData {
  /**
   * Array with information about documents and other Telegram Passport elements that was shared with the bot
   */
  data: IEncryptedPassportElement[];
  /**
   * Encrypted credentials required to decrypt the data
   */
  credentials: IEncryptedCredentials;
}
