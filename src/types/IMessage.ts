import { IChat } from "./IChat";
import { IMessageEntity } from "./IMessageEntity";
import { IUser } from "./IUser";
import { IAnimation } from "./IIAnimation";
import { IPhotoSize } from "./IIPhotoSize";
import { IAudio } from "./IAudio";
import { IDocument } from "./IDocument";
import { ISticker } from "./ISticker";
import { IVideo } from "./IVideo";
import { IVideoNote } from "./IVideoNote";
import { IVoice } from "./IVoice";
import { IContact } from "./IContact";
import { IDice } from "./IDice";
import { IGame } from "./IGame";
import { IPoll } from "./IPoll";
import { IVenue } from "./IVenue";
import { ILocation } from "./ILocation";
import { IMessageAutoDeleteTimerChanged } from "./IMessageAutoDeleteTimerChanged";
import { IInvoice } from "./IInvoice";
import { ISuccessfulPayment } from "./ISuccessfulPayment";
import { IPassportData } from "./IPassportData";
import { IProximityAlertTriggered } from "./IProximityAlertTriggered";
import { IVoiceChatScheduled } from "./IVoiceChatScheduled";
import { IVoiceChatStarted } from "./IVoiceChatStarted";
import { IVoiceChatEnded } from "./IVoiceChatEnded";
import { IVoiceChatParticipantsInvited } from "./IVoiceChatParticipantsInvited";
import { IInlineKeyboardMarkup } from "./IInlineKeyboardMarkup";

export type Message = (message: IMessage) => void;

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
  /**
   * Optional. For messages forwarded from channels, identifier of the original message in the channel
   */
  forward_from_message_id?: number;
  /**
   * Optional. For forwarded messages that were originally sent in channels or by an anonymous chat administrator, signature of the message sender if present
   */
  forward_signature?: string;
  /**
   *  Optional. Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages
   */
  forward_sender_name?: string;
  /**
   * Optional. For forwarded messages, date the original message was sent in Unix time
   */
  forward_date?: number;
  /**
   * Optional. True, if the message is a channel post that was automatically forwarded to the connected discussion group
   */
  is_automatic_forward?: boolean;
  /**
   * Optional. For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply.
   */
  reply_to_message?: IMessage;
  /**
   * Optional. Bot through which the message was sent
   */
  via_bot?: IUser;
  /**
   * Optional. Date the message was last edited in Unix time
   */
  edit_date?: number;
  /**
   * Optional. True, if the message can't be forwarded
   */
  has_protected_content?: boolean;
  /**
   * Optional. The unique identifier of a media message group this message belongs to
   */
  media_group_id?: string;
  /**
   * Optional. Signature of the post author for messages in channels, or the custom title of an anonymous group administrator
   */
  author_signature?: string;
  /**
   * Optional. For text messages, the actual UTF-8 text of the message, 0-4096 characters
   */
  text?: string;
  /**
   * Optional. For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text
   */
  entities?: IMessageEntity[];
  /**
   * Optional. Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set
   */
  animation?: IAnimation;
  /**
   * Optional. Message is an audio file, information about the file
   */
  audio?: IAudio;
  /**
   * Optional. Message is a general file, information about the file
   */
  document?: IDocument;
  /**
   * Optional. Message is a photo, available sizes of the photo
   */
  photo?: IPhotoSize[];
  /**
   * Optional. Message is a sticker, information about the sticker
   */
  sticker?: ISticker;
  /**
   * Optional. Message is a video, information about the video
   */
  video?: IVideo;
  /**
   * Optional. Message is a video note, information about the video message
   */
  video_note?: IVideoNote;
  /**
   * Optional. Message is a voice message, information about the file
   */
  voice?: IVoice;
  /**
   * Optional. Caption for the animation, audio, document, photo, video or voice, 0-1024 characters
   */
  caption?: string;
  /**
   * Optional. For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption
   */
  caption_entities?: IMessageEntity[];
  /**
   * Optional. Message is a shared contact, information about the contact
   */
  contact?: IContact;
  /**
   * Optional. Message is a dice with random value
   */
  dice?: IDice;
  /**
   * Optional. Message is a game, information about the game. More about games »
   */
  game?: IGame;
  /**
   * Optional. Message is a native poll, information about the poll
   */
  poll?: IPoll;
  /**
   * Optional. Message is a venue, information about the venue. For backward compatibility, when this field is set, the location field will also be set
   */
  venue?: IVenue;
  /**
   * Optional. Message is a shared location, information about the location
   */
  location?: ILocation;
  /**
   * Optional. New members that were added to the group or supergroup and information about them (the bot itself may be one of these members)
   */
  new_chat_members?: IUser[];
  /**
   * Optional. A member was removed from the group, information about them (this member may be the bot itself)
   */
  left_chat_member?: IUser;
  /**
   * Optional. A chat title was changed to this value
   */
  new_chat_title?: string;
  /**
   * Optional. A chat photo was change to this value
   */
  new_chat_photo?: IPhotoSize[];
  /**
   * Optional. Service message: the chat photo was deleted
   */
  delete_chat_photo?: boolean;
  /**
   * Optional. Service message: the group has been created
   */
  group_chat_created?: boolean;
  /**
   * Optional. Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup.
   */
  supergroup_chat_created?: boolean;
  /**
   * Optional. Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel.
   */
  channel_chat_created?: boolean;
  /**
   * Optional. Service message: auto-delete timer settings changed in the chat
   */
  message_auto_delete_timer_changed?: IMessageAutoDeleteTimerChanged;
  /**
   * Optional. The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
   */
  migrate_to_chat_id?: number;
  /**
   * Optional. The supergroup has been migrated from a group with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
   */
  migrate_from_chat_id?: number;
  /**
   * Optional. Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply
   */
  pinned_message?: IMessage;
  /**
   * Optional. Message is an invoice for a payment, information about the invoice.
   */
  invoice?: IInvoice;
  /**
   * Optional. Message is a service message about a successful payment, information about the payment.
   */
  successful_payment?: ISuccessfulPayment;
  /**
   * Optional. The domain name of the website on which the user has logged in
   */
  connected_website?: string;
  /**
   * Optional. Telegram Passport data
   */
  passport_data?: IPassportData;
  /**
   * Optional. Service message. A user in the chat triggered another user's proximity alert while sharing Live Location.
   */
  proximity_alert_triggered?: IProximityAlertTriggered;
  /**
   * Optional. Service message: voice chat scheduled
   */
  voice_chat_scheduled?: IVoiceChatScheduled;
  /**
   * Optional. Service message: voice chat started
   */
  voice_chat_started?: IVoiceChatStarted;
  /**
   * Optional. Service message: voice chat ended
   */
  voice_chat_ended?: IVoiceChatEnded;
  /**
   * Optional. Service message: new participants invited to a voice chat
   */
  voice_chat_participants_invited?: IVoiceChatParticipantsInvited;
  /**
   * Optional. Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons.
   */
  reply_markup?: IInlineKeyboardMarkup;
}
