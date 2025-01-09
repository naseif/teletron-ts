import { IUser } from "../index";

export interface IGameHighScore {
  /**
   * Position in high score table for the game
   */
  position?: number;
  /**
   *  User
   */
  user?: IUser;
  /**
   *  Score
   */
  score?: number;
}
