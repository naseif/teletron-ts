import { IUser } from "../core";

/**
 * This object represents a service message about new members invited to a voice chat.
 */

export interface IVoiceChatParticipantsInvited {
  /**
   * Optional. New members that were invited to the voice chat
   */
  users?: IUser[];
}
