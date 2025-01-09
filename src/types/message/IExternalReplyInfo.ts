import {
  IAnimation,
  IAudio,
  IChat,
  IContact,
  IDice,
  IDocument,
  IGame,
  IGiveaway,
  IGiveawayWinners,
  IInvoice,
  ILinkPreviewOptions,
  ILocation,
  IMessageOrigin,
  IPaidMediaInfo,
  IPhotoSize,
  IPoll,
  ISticker,
  IStory,
  IVenue,
  IVideo,
  IVideoNote,
  IVoice,
} from "..";

/**
 * This object contains information about a message that is being replied to, which may come from another chat or forum topic.
 */
export interface IExternalReplyInfo {
  /**
   * Origin of the message replied to by the given message
   */
  origin: IMessageOrigin;
  /**
   * Optional. Chat the original message belongs to. Available only if the chat is a supergroup or a channel.
   */
  chat?: IChat;
  /**
   * Optional. Unique message identifier inside the original chat. Available only if the original chat is a supergroup or a channel.
   */
  message_id?: number;
  /**
   * Optional. Options used for link preview generation for the original message, if it is a text message
   */
  link_preview_options?: ILinkPreviewOptions;
  /**
   * Optional. Message is an animation, information about the animation
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
   * Optional. Message contains paid media; information about the paid media
   */
  paid_media?: IPaidMediaInfo;
  /**
   * Optional. Message is a photo, available sizes of the photo
   */
  photo?: IPhotoSize[];
  /**
   * Optional. Message is a sticker, information about the sticker
   */
  sticker?: ISticker;
  /**
   * Optional. Message is a forwarded story
   */
  story?: IStory;
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
   * Optional. True, if the message media is covered by a spoiler animation
   */
  has_media_spoiler?: boolean;
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
   * Optional. Message is a scheduled giveaway, information about the giveaway
   */
  giveaway?: IGiveaway;
  /**
   * Optional. A giveaway with public winners was completed
   */
  giveaway_winners?: IGiveawayWinners;
  /**
   * Optional. Message is an invoice for a payment, information about the invoice. More about payments »
   */
  invoice?: IInvoice;
  /**
   * Optional. Message is a shared location, information about the location
   */
  location?: ILocation;
  /**
   * Optional. Message is a native poll, information about the poll
   */
  poll?: IPoll;
  /**
   * Optional. Message is a venue, information about the venue
   */
  venue?: IVenue;
}
