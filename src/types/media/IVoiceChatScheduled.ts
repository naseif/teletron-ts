/**
 * This object represents a service message about a voice chat scheduled in the chat.
 */

export interface IVoiceChatScheduled {
  /**
   * Point in time (Unix timestamp) when the voice chat is supposed to be started by a chat administrator
   */
  start_date: number;
}
