import { IUser } from ".";

/**
 * Represents a chat member that is under certain restrictions in the chat. Supergroups only.
 */
export interface IChatMemberRestricted {
    /**
     * The member's status in the chat, always "restricted"
     */
    status: string;
    /**
     * Information about the user
     */
    user: IUser;
    /**
     * True, if the user is a member of the chat at the moment of the request
     */
    is_member: boolean;
    /**
     * True, if the user is allowed to change the chat title, photo and other settings
     */
    can_change_info: boolean;
    /**
     * True, if the user is allowed to invite new users to the chat
     */
    can_invite_users: boolean;
    /**
     * True, if the user is allowed to pin messages
     */
    can_pin_messages: boolean;
    /**
     * True, if the user is allowed to send text messages, contacts, locations and venues
     */
    can_send_messages: boolean;
    /**
     * True, if the user is allowed to send audios, documents, photos, videos, video notes and voice notes
     */
    can_send_media_messages: boolean;
    /**
     * True, if the user is allowed to send polls
     */
    can_send_polls: boolean;
    /**
     * True, if the user is allowed to send animations, games, stickers and use inline bots
     */
    can_send_other_messages: boolean;
    /**
     * True, if the user is allowed to add web page previews to their messages
     */
    can_add_web_page_previews: boolean;
    /**
     * Date when restrictions will be lifted for this user; unix time. If 0, then the user is restricted forever
     */
    until_date: number;

}