import { IUser } from ".";

/**
 * Represents a chat member that owns the chat and has all administrator privileges.
 */

export interface IChatMemberOwner {
    /**
     * The member's status in the chat, always "creator"
     */
    status: string;
    /**
     * Information about the user
     */
    user: IUser;
    /**
     * True, if the user's presence in the chat is hidden
     */
    is_anonymous: boolean;
    /**
     * Optional. Custom title for this user
     */
    custom_title: string
}