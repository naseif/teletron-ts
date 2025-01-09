import { IGame } from "./IGame";
import { IInlineKeyboardMarkup, IMessage } from "..";
import { IGameHighScore } from "./IGameHighScore";

export interface IGames {
  sendGame(
    chat_id: string | number,
    game_short_name: string,
    options?: sendGameOptions
  ): IMessage;
  setGameScore(
    user_id: number,
    score: number,
    options?: setGameScoreOptions
  ): IMessage | boolean;
  getGameHighScores(
    user_id: number,
    options?: getGameHighScoresOptions
  ): IGameHighScore[];
}

export interface sendGameOptions {
  /**
   * Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.
   */
  message_thread_id?: number;
  /**
   * Sends the message silently. Users will receive a notification with no sound..
   */
  disable_notification?: boolean;
  /**
   * Protects the contents of the sent message from forwarding and saving.
   */
  protect_content?: boolean;
  /**
   * If the message is a reply, ID of the original message.
   */
  reply_to_message_id?: number;
  /**
   * Pass True if the message should be sent even if the specified replied-to message is not found.
   */
  allow_sending_without_reply?: boolean;
  /**
   * A JSON-serialized object for an inline keyboard. If empty, one 'Play game_title' button will be shown. If not empty, the first button must launch the game..
   */
  reply_markup?: IInlineKeyboardMarkup;
}

export interface setGameScoreOptions {
  /**
   * Pass True if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters.
   */
  force?: boolean;
  /**
   * Pass True if the game message should not be automatically edited to include the current scoreboard.
   */
  disable_edit_message?: boolean;
  /**
   * Required if inline_message_id is not specified. Unique identifier for the target chat.
   */
  chat_id?: number;
  /**
   * Required if inline_message_id is not specified. Identifier of the sent message.
   */
  message_id?: number;
  /**
   * Required if chat_id and message_id are not specified. Identifier of the inline message.
   */
  inline_message_id?: string;
}

export interface getGameHighScoresOptions {
  /**
   * Required if inline_message_id is not specified. Unique identifier for the target chat.
   */
  chat_id?: number;
  /**
   * Required if inline_message_id is not specified. Identifier of the sent message.
   */
  message_id?: number;
  /**
   * Required if chat_id and message_id are not specified. Identifier of the inline message.
   */
  inline_message_id?: string;
}
