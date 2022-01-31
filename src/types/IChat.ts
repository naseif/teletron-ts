import { IChatLocation } from "./IChatLocation";
import { IChatPermissions } from "./IChatPermission";
import { IChatPhoto } from "./IChatPhoto";
import { IMessage } from "./IMessage";

/**
 * This object represents a chat.
 */
export interface IChat {
    /**
     * Unique identifier for this chat.
     */
    id: number,
    /**
     * Type of chat, can be either “private”, “group”, “supergroup” or “channel”
     */
    type: string;
    /**
     * Optional. Title, for supergroups, channels and group chats
     */
    title?: string;
    /**
     * Optional. Username, for private chats, supergroups and channels if available
     */
    username?: string;
    /**
     * Optional. First name of the other party in a private chat
     */
    first_name?: string;
    /**
     * Optional. Last name of the other party in a private chat
     */
    last_name?: string;
    /**
     * Optional. Chat photo. Returned only in getChat.
     */
    photo?: IChatPhoto;
    /**
     * Optional. Bio of the other party in a private chat. Returned only in getChat.
     */
    bio?: string;
    /**
     * Optional. True, if privacy settings of the other party in the private chat allows to use tg://user?id=<user_id> links only in chats with the user. Returned only in getChat.
     */
    has_private_forwards?: boolean
    /**
     * Optional. Description, for groups, supergroups and channel chats. Returned only in getChat.
     */
    description?: string;
    /**
     * Optional. Primary invite link, for groups, supergroups and channel chats. Returned only in getChat.
     */
    invite_link?: string;
    /**
     * Optional. The most recent pinned message (by sending date). Returned only in getChat.
     */
    pinned_message?: IMessage;
    /**
     * Optional. Default chat member permissions, for groups and supergroups. Returned only in getChat.
     */
    permissions?: IChatPermissions;
    /**
     * Optional. For supergroups, the minimum allowed delay between consecutive messages sent by each unpriviledged user; in seconds. Returned only in getChat.
     */
    slow_mode_delay?: number;
    /**
     * Optional. The time after which all messages sent to the chat will be automatically deleted; in seconds. Returned only in getChat.
     */
    message_auto_delete_time?: number;
    /**
     * Optional. True, if messages from the chat can't be forwarded to other chats. Returned only in getChat.
     */
    has_protected_content?: boolean;
    /**
     * Optional. For supergroups, name of group sticker set. Returned only in getChat.
     */
    sticker_set_name?: string
    /**
     * Optional. True, if the bot can change the group sticker set. Returned only in getChat.
     */
    can_set_sticker_set?: boolean;
    /**
     * Optional. Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats
     */
    linked_chat_id?: number;
    /**
     * Optional. For supergroups, the location to which the supergroup is connected. Returned only in getChat.
     */
    location?: IChatLocation;

}