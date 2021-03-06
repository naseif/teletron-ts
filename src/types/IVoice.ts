/**
 * This object represents a voice note.
 */

export interface IVoice {
  /**
   * Identifier for this file, which can be used to download or reuse the file
   */
  file_id: string;
  /**
   * Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
   */
  file_unique_id: string;
  /**
   * Duration of the audio in seconds as defined by sender
   */
  duration: number;
  /**
   * Optional. MIME type of the file as defined by sender
   */
  mime_type?: string;
  /**
   * Optional. File size in bytes
   */
  file_size?: number;
}
