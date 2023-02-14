import { IWebAppInfo } from "./IWebAppInfo";
export type IMenuButton =
  | IMenuButtonCommands
  | IMenuButtonWebApp
  | IMenuButtonDefault;

/**
 * Represents a menu button, which opens the bot's list of commands.
 */

export interface IMenuButtonCommands {
  /**
   * Type of the button, must be commands
   */
  type: string;
}

/**
 * Represents a menu button, which launches a Web App.
 */
export interface IMenuButtonWebApp {
  /**
   * Type of the button, must be web_app
   */
  type: string;
  /**
   * Text on the button
   */
  text: string;
  /**
   * Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery.
   */
  web_app: IWebAppInfo;
}

/**
 * Describes that no specific value for the menu button was set.
 */
export interface IMenuButtonDefault {
  /**
   * Type of the button, must be default
   */
  type: string;
}
