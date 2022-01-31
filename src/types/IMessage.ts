import { IChat } from "./IChat";
import { IUser } from "./IUser";

export type Message = (message: IMessage) => void

/**
 * This object represents a message.
 */
export interface IMessage {
    /**
     * Unique message identifier inside this chat
     */
    message_id: number;
    /**
     * Optional. Sender of the message; empty for messages sent to channels. 
     */
    from?: IUser;
    /**
     * Optional. Sender of the message, sent on behalf of a chat. For example, the channel itself for channel posts, the supergroup itself for messages from anonymous group administrators, the linked channel for messages automatically forwarded to the discussion group
     */
    sender_chat?: IChat;
    /**
     * Date the message was sent in Unix time
     */
    date: number;
    /**
     * Conversation the message belongs to
     */
    chat: IChat;
    /**
     * Optional. For forwarded messages, sender of the original message
     */
    forward_from?: IUser;
    /**
     * Optional. For messages forwarded from channels or from anonymous administrators, information about the original sender chat
     */
    forward_from_chat?: IChat;

}