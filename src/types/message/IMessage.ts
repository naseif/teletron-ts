import {
  IChat,
  IMessageEntity,
  IUser,
  IAnimation,
  IPhotoSize,
  IAudio,
  IDocument,
  ISticker,
  IVideo,
  IVideoNote,
  IVoice,
  IContact,
  IDice,
  IGame,
  IPoll,
  IVenue,
  ILocation,
  IMessageAutoDeleteTimerChanged,
  IInvoice,
  ISuccessfulPayment,
  IPassportData,
  IProximityAlertTriggered,
  IVoiceChatScheduled,
  IVoiceChatStarted,
  IVoiceChatEnded,
  IVoiceChatParticipantsInvited,
  IInlineKeyboardMarkup,
  IStory,
  ILinkPreviewOptions,
  IPaidMediaInfo,
  IGiveaway,
  IGiveawayWinners,
  IChatBackground,
  IChatBoostAdded,
  IChatShared,
  IExternalReplyInfo,
  IForumTopicClosed,
  IForumTopicCreated,
  IForumTopicEdited,
  IForumTopicReopened,
  IGeneralForumTopicHidden,
  IGeneralForumTopicUnhidden,
  IGiveawayCompleted,
  IGiveawayCreated,
  IMaybeInaccessibleMessage,
  IMessageOrigin,
  IRefundedPayment,
  ITextQuote,
  IUserShared,
  IWebAppData,
  IWriteAccessAllowed,
} from "..";

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
  forward_from: IUser;
  /**
   * Optional. For messages forwarded from channels or from anonymous administrators, information about the original sender chat
   */
  forward_from_chat: IChat;
  /**
   * Optional. For messages forwarded from channels, identifier of the original message in the channel
   */
  forward_from_message_id: number;
  /**
   * Optional. For forwarded messages that were originally sent in channels or by an anonymous chat administrator, signature of the message sender if present
   */
  forward_signature: string;
  /**
   *  Optional. Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages
   */
  forward_sender_name: string;
  /**
   * Optional. For forwarded messages, date the original message was sent in Unix time
   */
  forward_date: number;
  /**
   * Optional. True, if the message is a channel post that was automatically forwarded to the connected discussion group
   */
  is_automatic_forward?: boolean;
  /**
   * Optional. For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply.
   */
  reply_to_message: IMessage;
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
  pinned_message?: IMaybeInaccessibleMessage;
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
  passport_data: IPassportData;
  /**
   * Optional. Service message. A user in the chat triggered another user's proximity alert while sharing Live Location.
   */
  proximity_alert_triggered: IProximityAlertTriggered;
  /**
   * Optional. Service message: voice chat scheduled
   */
  video_chat_scheduled?: IVoiceChatScheduled;
  /**
   * Optional. Service message: voice chat started
   */
  video_chat_started: IVoiceChatStarted;
  /**
   * Optional. Service message: voice chat ended
   */
  video_chat_ended: IVoiceChatEnded;
  /**
   * Optional. Service message: new participants invited to a voice chat
   */
  video_chat_participants_invited: IVoiceChatParticipantsInvited;
  /**
   * Optional. Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons.
   */
  reply_markup: IInlineKeyboardMarkup;

  /**
   * Optional. Service message: data sent by a Web App
   */
  web_app_data?: IWebAppData;
  /**
   * Optional. Unique identifier of a message thread to which the message belongs; for supergroups only
   */
  message_thread_id?: number;
  /**
   * Optional. If the sender of the message boosted the chat, the number of boosts added by the user
   */
  sender_boost_count?: number;
  /**
   * Optional. The bot that actually sent the message on behalf of the business account. Available only for outgoing messages sent on behalf of the connected business account.
   */
  sender_business_bot?: IUser;
  /**
   * Optional. Unique identifier of the business connection from which the message was received. If non-empty, the message belongs to a chat of the corresponding business account that is independent from any potential bot chat which might share the same identifier.
   */
  business_connection_id?: string;
  /**
   * Optional. Information about the original message for forwarded messages
   */
  forward_origin?: IMessageOrigin;
  /**
   * Optional. True, if the message is sent to a forum topic
   */
  is_topic_message?: boolean;

  /**
   * Optional. Information about the message that is being replied to, which may come from another chat or forum topic
   */
  external_reply?: IExternalReplyInfo;
  /**
   * Optional. For replies that quote part of the original message, the quoted part of the message
   */
  quote?: ITextQuote;
  /**
   * Optional. For replies to a story, the original story
   */
  reply_to_story?: IStory;
  /**
   * Optional. True, if the message was sent by an implicit action, for example, as an away or a greeting business message, or as a scheduled message
   */
  is_from_offline: boolean;
  /**
   * Optional. Options used for link preview generation for the message, if it is a text message and link preview options were changed
   */
  link_preview_options?: ILinkPreviewOptions;
  /**
   * Optional. Unique identifier of the message effect added to the message
   */
  effect_id?: string;
  /**
   * Optional. Message contains paid media; information about the paid media
   */
  paid_media?: IPaidMediaInfo;
  /**
   * Optional. Message is a forwarded story
   */
  story?: IStory;
  /**
   * Optional. True, if the caption must be shown above the message media
   */
  show_caption_above_media?: boolean;
  /**
   * Optional. True, if the message media is covered by a spoiler animation
   */
  has_media_spoiler?: boolean;
  /**
   * Optional. Message is a service message about a refunded payment, information about the payment. More about payments »
   */
  refunded_payment?: IRefundedPayment;
  /**
   * Optional. Service message: users were shared with the bot
   */
  users_shared?: IUserShared;
  /**
   * Optional. Service message: a chat was shared with the bot
   */
  chat_shared?: IChatShared;
  /**
   * Optional. Service message: the user allowed the bot to write messages after adding it to the attachment or side menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess
   */
  write_access_allowed?: IWriteAccessAllowed;
  /**
   * Optional. Service message: user boosted the chat
   */
  boost_added?: IChatBoostAdded;
  /**
   * Optional. Service message: chat background set
   */
  chat_background_set?: IChatBackground;
  /**
   * Optional. Service message: forum topic created
   */
  forum_topic_created?: IForumTopicCreated;
  /**
   * Optional. Service message: forum topic edited
   */
  forum_topic_edited?: IForumTopicEdited;
  /**
   * Optional. Service message: forum topic closed
   */
  forum_topic_closed?: IForumTopicClosed;
  /**
   * Optional. Service message: forum topic reopened
   */
  forum_topic_reopened?: IForumTopicReopened;
  /**
   * Optional. Service message: the 'General' forum topic hidden
   */
  general_forum_topic_hidden?: IGeneralForumTopicHidden;
  /**
   * Optional. Service message: the 'General' forum topic unhidden
   */
  general_forum_topic_unhidden?: IGeneralForumTopicUnhidden;
  /**
   * Optional. Service message: a scheduled giveaway was created
   */
  giveaway_created?: IGiveawayCreated;
  /**
   * Optional. The message is a scheduled giveaway message
   */
  giveaway?: IGiveaway;
  /**
   * Optional. A giveaway with public winners was completed
   */
  giveaway_winners?: IGiveawayWinners;
  /**
   * Optional. Service message: a giveaway without public winners was completed
   */
  giveaway_completed?: IGiveawayCompleted;
}
