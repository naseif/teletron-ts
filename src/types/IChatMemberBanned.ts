import { IUser } from ".";

/**
 * Represents a chat member that was banned in the chat and can't return to the chat or view chat messages.
 */

export interface IChatMemberBanned {
    /**
     * The member's status in the chat, always "kicked"
     */
    status: string;
    /**
     * Information about the user
     */
    user: IUser;
    /**
     * Date when restrictions will be lifted for this user; unix time. If 0, then the user is banned forever
     */
    until_date: number
}