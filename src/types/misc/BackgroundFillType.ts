export type BackgroundFillType =
  | BackgroundFillSolid
  | BackgroundFillGradient
  | BackgroundFillFreeformGradient;

export interface BackgroundFill {
  type: string;
}

export interface BackgroundFillSolid extends BackgroundFill {
  type: "solid";
  /**
   * The color of the background fill in the RGB24 format
   */
  color: number;
}

export interface BackgroundFillGradient extends BackgroundFill {
  type: "gradient";
  /**
   * Top color of the gradient in the RGB24 format
   */
  top_color: number;
  /**
   * Bottom color of the gradient in the RGB24 format
   */
  bottom_color: number;
  /**
   * Clockwise rotation angle of the background fill in degrees; 0-359
   */
  rotation_angle: number;
}

export interface BackgroundFillFreeformGradient extends BackgroundFill {
  type: "freeform_gradient";
  /**
   * A list of the 3 or 4 base colors that are used to generate the freeform gradient in the RGB24 format
   */
  colors: number[];
}
