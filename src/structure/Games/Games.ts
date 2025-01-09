import {
  getGameHighScoresOptions,
  IGameHighScore,
  IGames,
  IMessage,
  sendGameOptions,
  setGameScoreOptions,
} from "../../types";

export class Games implements IGames {
  _endpoint: string;

  constructor(endpoint: string) {
    this._endpoint = endpoint;
  }

  setGameScore(
    user_id: number,
    score: number,
    options?: setGameScoreOptions | undefined
  ): boolean | IMessage {
    throw new Error("Method not implemented.");
  }

  getGameHighScores(
    user_id: number,
    options?: getGameHighScoresOptions | undefined
  ): IGameHighScore[] {
    throw new Error("Method not implemented.");
  }

  sendGame(
    chat_id: string | number,
    game_short_name: string,
    options?: sendGameOptions | undefined
  ): IMessage {
    throw new Error("Method not implemented.");
  }
}
