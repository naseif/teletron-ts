import { ISticker } from "..";

/**
 * Contains information about the start page settings of a Telegram Business account.
 */

export interface IBusinessIntro {
  title: string;
  message: string;
  sticker: ISticker;
}
