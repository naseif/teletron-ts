import { IChat } from "../";

/**
 * This object represents a story.
 */
export interface IStory {
  /**
   * Chat that posted the story
   */
  chat: IChat;
  /**
   * Unique identifier for the story in the chat
   */
  id: number;
}
