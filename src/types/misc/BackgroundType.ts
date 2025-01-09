import { IDocument } from "../media";
import { BackgroundFillType } from "./BackgroundFillType";

export type BackgroundType =
  | BackgroundTypeFill
  | BackgroundTypeWallpaper
  | BackgroundTypePattern
  | BackgroundTypeChatTheme;

export interface BackgroundTypeFill {
  type: "fill";
  /**
   * The background fill
   */
  fill: BackgroundFillType;
  /**
   * Dimming of the background in dark themes, as a percentage; 0-100
   */
  dark_theme_dimming: number;
}

export interface BackgroundTypeWallpaper {
  type: "wallpaper";
  /**
   * Document with the wallpaper
   */
  document: IDocument;
  /**
   * Dimming of the background in dark themes, as a percentage; 0-100
   */
  dark_theme_dimming: number;
  /**
   * Optional. True, if the wallpaper is downscaled to fit in a 450x450 square and then box-blurred with radius 12
   */
  is_blurred?: true;
  /**
   * Optional. True, if the background moves slightly when the device is tilted
   */
  is_moving?: true;
}

export interface BackgroundTypePattern {
  /**
   * Type of the background, always “pattern”
   */
  type: "pattern";
  /**
   * Document with the pattern
   */
  document: IDocument;
  /**
   * The background fill that is combined with the pattern
   */
  fill: BackgroundFillType;
  /**
   * Intensity of the pattern when it is shown above the filled background; 0-100
   */
  intensity: number;
  /**
   * Optional. True, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only
   */
  is_inverted?: true;
  /**
   * Optional. True, if the background moves slightly when the device is tilted
   */
  is_moving?: true;
}

export interface BackgroundTypeChatTheme {
  type: "chat_theme";
  /**
   * Name of the chat theme, which is usually an emoji
   */
  theme_name: string;
}
