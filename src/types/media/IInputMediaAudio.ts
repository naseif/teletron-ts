import { IMessageEntity } from "..";
import { LocalFile } from "../../structure";

export interface IInputMediaAudio {
  /**
   * Type of the result, must be audio
   */
  type: string;
  /**
   * File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name
   */
  media: string | LocalFile;
  /**
   * Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>
   */
  thumbnail?: string | LocalFile;
  /**
   * Optional. Caption of the audio to be sent, 0-1024 characters after entities parsing
   */
  caption?: string;
  /**
   * Optional. Mode for parsing entities in the audio caption.
   */
  parse_mode?: "MarkdownV2" | "HTML" | "Markdown";
  /**
   * Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode
   */
  caption_entities?: IMessageEntity[];
  /**
   * Optional. Duration of the audio in seconds
   */
  duration?: number;
  /**
   * Optional. Performer of the audio
   */
  performer?: string;
  /**
   * Optional. Title of the audio
   */
  title?: string;
}
