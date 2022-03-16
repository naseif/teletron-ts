import {
  IBotCommandScopeBase,
  IBotCommandScopeChat,
  IBotCommandScopeChatAdministrators,
  IBotCommandScopeChatMember,
  IChatPermissions,
} from "../types";
import {
  IInlineKeyboardMarkup,
  IMessageEntity,
  IReplayKeyboardRemove,
  IForceReply,
  IReplyKeyboardMarkup,
} from "../types/index";

export interface OptionsBase {
  /**
   * Sends the message silently. Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * Protects the contents of the sent message from forwarding and saving
   */
  protect_content?: boolean;
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Pass True, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean;
  /**
   * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | IInlineKeyboardMarkup
    | IReplyKeyboardMarkup
    | IReplayKeyboardRemove
    | IForceReply
    | string;
}

export interface sendPollOptions extends OptionsBase {
  /**
   * True, if the poll needs to be anonymous, defaults to True
   */
  is_anonymous?: boolean;
  /**
   * Poll type, “quiz” or “regular”, defaults to “regular”
   */
  type?: string;
  /**
   * True, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to False
   */
  allows_multiple_answers?: boolean;
  /**
   * 0-based identifier of the correct answer option, required for polls in quiz mode
   */
  correct_option_id?: number;
  /**
   * Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing
   */
  explanation?: string;
  /**
   * Mode for parsing entities in the explanation. See formatting options for more details.
   */
  explanation_parse_mode?: string;
  /**
   * A JSON-serialized list of special entities that appear in the poll explanation, which can be specified instead of parse_mode
   */
  explanation_entities?: IMessageEntity[];
  /**
   * Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with close_date.
   */
  open_period?: number;
  /**
   * Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 600 seconds in the future. Can't be used together with open_period.
   */
  close_date?: number;
  /**
   * Pass True, if the poll needs to be immediately closed. This can be useful for poll preview.
   */
  is_closed?: boolean;
}

export interface sendMessageOptions extends OptionsBase {
  /**
   * Mode for parsing entities in the message text. See formatting options for more details.
   */
  parse_mode?: "MarkdownV2" | "HTML" | "Markdown";
  /**
   * A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode
   */
  entities?: IMessageEntity[];
}

export interface forwardMessageOptions {
  /**
   * Sends the message silently. Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * Protects the contents of the forwarded message from forwarding and saving
   */
  protect_content?: boolean;
}

export interface copyMessageOptions extends OptionsBase {
  /**
   * New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is kept
   */
  caption?: string;
  /**
   * Mode for parsing entities in the new caption. See formatting options for more details.
   */
  parse_mode?: "MarkdownV2" | "HTML" | "Markdown";
  /**
   * A JSON-serialized list of special entities that appear in the new caption, which can be specified instead of parse_mode
   */
  caption_entities?: IMessageEntity[];
}

export interface sendPhotoOptions extends OptionsBase {
  /**
   * Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing
   */
  caption?: string;
  /**
   * Mode for parsing entities in the photo caption. See formatting options for more details.
   */
  parse_mode?: "MarkdownV2" | "HTML" | "Markdown";
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode
   */
  caption_entities?: IMessageEntity[];
}

export interface sendAudioOptions extends OptionsBase {
  /**
   * Audio caption, 0-1024 characters after entities parsing
   */
  caption?: string;
  /**
   * Mode for parsing entities in the audio caption. See formatting options for more details.
   */
  parse_mode?: "MarkdownV2" | "HTML" | "Markdown";
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode
   */
  caption_entities?: IMessageEntity[];
  /**
   * Duration of the audio in seconds
   */
  duration?: number;
  /**
   * Performer
   */
  performer?: string;
  /**
   * Track name
   */
  title?: string;
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>
   */
  thumb?: Buffer | string;
}

export interface sendVideoOptions extends OptionsBase {
  /**
   * Duration of sent video in seconds
   */
  duration?: number;
  /**
   * Video width
   */
  width?: number;
  /**
   * Video height
   */
  height?: number;
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
   */
  thumb?: Buffer | string;
  /**
   * Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing
   */
  caption?: string;
  /**
   * Mode for parsing entities in the video caption.
   */
  parse_mode?: "MarkdownV2" | "HTML" | "Markdown";
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode
   */
  caption_entities?: IMessageEntity[];
  /**
   * Pass True, if the uploaded video is suitable for streaming
   */
  supports_streaming?: boolean;
}

export interface sendDocumentOptions extends OptionsBase {
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
   */
  thumb?: Buffer | string;
  /**
   * Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities parsing
   */
  caption?: string;
  /**
   * Mode for parsing entities in the document caption.
   */
  parse_mode?: "MarkdownV2" | "HTML" | "Markdown";
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode
   */
  caption_entities?: IMessageEntity[];
  /**
   * Disables automatic server-side content type detection for files uploaded using multipart/form-data
   */
  disable_content_type_detection?: boolean;
}

export interface sendAnimationOptions extends OptionsBase {
  /**
   * Duration of sent animation in seconds
   */
  duration?: number;
  /**
   * Animation width
   */
  width?: number;
  /**
   * Animation height
   */
  height?: number;
  /**
   * 	Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>
   */
  thumb?: Buffer | string;
  /**
   * Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities parsing
   */
  caption?: string;
  /**
   * Mode for parsing entities in the animation caption.
   */
  parse_mode?: "MarkdownV2" | "HTML" | "Markdown";
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode
   */
  caption_entities: IMessageEntity[];
}

export interface sendVoiceOptions extends OptionsBase {
  /**
   * Duration of the voice message in seconds
   */
  duration?: number;
  /**
   * Voice message caption, 0-1024 characters after entities parsing
   */
  caption?: string;
  /**
   * Mode for parsing entities in the animation caption.
   */
  parse_mode?: "MarkdownV2" | "HTML" | "Markdown";
  /**
   * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode
   */
  caption_entities: IMessageEntity[];
}

export interface sendVideoNoteOptions extends OptionsBase {
  /**
   * Duration of sent video in seconds
   */
  duration?: number;
  /**
   * Video width and height, i.e. diameter of the video message
   */
  length?: number;
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
   */
  thumb?: Buffer | string;
}

export interface sendMediaGroupOptions {
  /**
   * Sends messages silently. Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * Protects the contents of the sent messages from forwarding and saving
   */
  protect_content?: boolean;
  /**
   * If the messages are a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Pass True, if the message should be sent even if the specified replied-to message is not found
   */
  allow_sending_without_reply?: boolean;
}

export interface sendLocationOptions extends OptionsBase {
  /**
   * The radius of uncertainty for the location, measured in meters; 0-1500
   */
  horizontal_accuracy?: number;
  /**
   * Period in seconds for which the location will be updated (see Live Locations, should be between 60 and 86400.
   */
  live_period?: number;
  /**
   * For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
   */
  heading?: number;
  /**
   * For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
   */
  proximity_alert_radius?: number;
}

export interface editMessageLiveLocationOptions {
  /**
   * Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format
   */
  chat_id?: number | string;
  /**
   * Required if inline_message_id is not specified. Identifier of the message to edit
   */
  message_id?: number;
  /**
   * Required if chat_id and message_id are not specified. Identifier of the inline message
   */
  inline_message_id?: string;
  /**
   * The radius of uncertainty for the location, measured in meters; 0-1500
   */
  horizontal_accuracy?: number;
  /**
   * Direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
   */
  heading?: number;
  /**
   * Maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
   */
  proximity_alert_radius?: number;
  /**
   * A JSON-serialized object for a new inline keyboard.
   */
  reply_markup?: IInlineKeyboardMarkup;
}

export interface stopMessageLiveLocationOptions {
  /**
   * Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel
   */
  chat_id?: number | string;
  /**
   * Required if inline_message_id is not specified. Identifier of the message with live location to stop
   */
  message_id?: number;
  /**
   * Required if chat_id and message_id are not specified. Identifier of the inline message
   */
  inline_message_id?: string;
  /**
   * A JSON-serialized object for a new inline keyboard.
   */
  reply_markup?: IInlineKeyboardMarkup;
}

export interface sendVenueOptions extends OptionsBase {
  /**
   * Foursquare identifier of the venue.
   */
  foursquare_id?: string;
  /**
   * Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)
   */
  foursquare_type?: string;
  /**
   * Google Places identifier of the venue
   */
  google_place_id?: string;
  /**
   * Google Places type of the venue.
   * @see Supported Types  https://developers.google.com/maps/documentation/places/web-service/supported_types
   */
  google_place_type?: string;
}
export interface sendContactOptions extends OptionsBase {
  /**
   * Contact's last name
   */
  last_name?: string;
  /**
   * Additional data about the contact in the form of a vCard, 0-2048 bytes
   * @see https://en.wikipedia.org/wiki/VCard
   */
  vcard?: string;
}

export interface sendDiceOptions extends OptionsBase {
  /**
   * Emoji on which the dice throw animation is based. Currently, must be one of “🎲”, “🎯”, “🏀”, “⚽”, “🎳”, or “🎰”. Dice can have values 1-6 for “🎲”, “🎯” and “🎳”, values 1-5 for “🏀” and “⚽”, and values 1-64 for “🎰”. Defaults to “🎲”
   */
  emoji?: string;
}

export interface getUserProfilePhotosOptions {
  /**
   * Sequential number of the first photo to be returned. By default, all photos are returned.
   */
  offset?: number;
  /**
   * Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100.
   */
  limit?: number;
}

export interface setMyCommandsOptions {
  /**
   * A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault.
   */
  scope?:
    | IBotCommandScopeBase
    | IBotCommandScopeChat
    | IBotCommandScopeChatAdministrators
    | IBotCommandScopeChatMember;

  /**
     * A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands

     */
  language_code?: string;
}

export interface banChatMemberOptions {
  /**
   * Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever. Applied for supergroups and channels only.
   */
  until_date?: number;
  /**
   * Pass True to delete all messages from the chat for the user that is being removed. If False, the user will be able to see messages in the group that were sent before the user was removed. Always True for supergroups and channels.
   */
  revoke_messages?: boolean;
}

export interface restrictChatMemberOptions {
  /**
   * A JSON-serialized object for new user permissions
   */
  permissions?: IChatPermissions | string;
  /**
   * Date when restrictions will be lifted for the user, unix time. If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever
   */
  until_date?: number;
}

export interface promoteChatMemberOptions {
  /**
   * Pass True, if the administrator's presence in the chat is hidden
   */
  is_anonymous?: boolean;
  /**
   * Pass True, if the administrator can access the chat event log, chat statistics, message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by any other administrator privilege
   */
  can_manage_chat?: boolean;
  /**
   * Pass True, if the administrator can create channel posts, channels only
   */
  can_post_messages?: boolean;
  /**
   * Pass True, if the administrator can edit messages of other users and can pin messages, channels only
   */
  can_edit_messages?: boolean;
  /**
   * Pass True, if the administrator can delete messages of other users
   */
  can_delete_messages?: boolean;
  /**
   * Pass True, if the administrator can manage voice chats
   */
  can_manage_voice_chats?: boolean;
  /**
   * Pass True, if the administrator can restrict, ban or unban chat members
   */
  can_restrict_members?: boolean;
  /**
   * Pass True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that he has promoted, directly or indirectly (promoted by administrators that were appointed by him)
   */
  can_promote_members?: boolean;
  /**
   * Pass True, if the administrator can change chat title, photo and other settings
   */
  can_change_info?: boolean;
  /**
   * Pass True, if the administrator can invite new users to the chat
   */
  can_invite_users?: boolean;
  /**
   * Pass True, if the administrator can pin messages, supergroups only
   */
  can_pin_messages?: boolean;
}

export interface createChatInviteLinkOptions {
  /**
   * Invite link name; 0-32 characters
   */
  name?: string;
  /**
   * Point in time (Unix timestamp) when the link will expire
   */
  expire_date?: number;
  /**
   * Maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999
   */
  member_limit?: number;
  /**
   * True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified
   */
  creates_join_request?: boolean;
}

export interface editChatInviteLinkOptions
  extends createChatInviteLinkOptions {}
export interface answerCallbackQueryOptions {
  /**
   * Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
   */
  text?: string;
  /**
   * If True, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false.
   */
  show_alert?: boolean;
  /**
   * URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @Botfather, specify the URL that opens your game — note that this will only work if the query comes from a callback_game button. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
   */
  url?: string;
  /**
   * The maximum amount of time in seconds that the result of the callback query may be cached client-side. Telegram apps will support caching starting in version 3.14. Defaults to 0.
   */
  cache_time?: number;
}

export interface editMessageTextOptions {
  /**
   * Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   */
  chat_id?: string | number;
  /**
   * Required if inline_message_id is not specified. Identifier of the message to edit
   */
  message_id?: number;
  /**
   * Required if chat_id and message_id are not specified. Identifier of the inline message
   */
  inline_message_id?: string;
  /**
   * Mode for parsing entities in the message text.
   */
  parse_mode?: "MarkdownV2" | "HTML" | "Markdown";
  /**
   * A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode
   */
  entities?: IMessageEntity[] | string;
  /**
   * Disables link previews for links in this message
   */
  disable_web_page_preview?: boolean;
  /**
   * A JSON-serialized object for an inline keyboard.
   */
  reply_markup?: IInlineKeyboardMarkup | string;
}

export interface editMessageCaptionOptions {
  /**
   * Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   */
  chat_id?: string | number;
  /**
   * Required if inline_message_id is not specified. Identifier of the message to edit
   */
  message_id?: number;
  /**
   * Required if chat_id and message_id are not specified. Identifier of the inline message
   */
  inline_message_id?: string;
  /**
   * Mode for parsing entities in the message text.
   */
  parse_mode?: "MarkdownV2" | "HTML" | "Markdown";
  /**
   * A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode
   */
  caption_entities?: IMessageEntity[] | string;
  /**
   * A JSON-serialized object for an inline keyboard.
   */
  reply_markup?: IInlineKeyboardMarkup | string;
}
