import EventEmitter from "eventemitter3";
import needle, { NeedleHttpVerbs, NeedleOptions } from "needle";
import mime from "mime-types";
import { URLSearchParams } from "node:url";
import {
  IBotCommandScopeBase,
  IBotCommandScopeChat,
  IBotCommandScopeChatAdministrators,
  IBotCommandScopeChatMember,
  IChat,
  IChatInviteLink,
  IChatMember,
  IChatPermissions,
  IMessage,
  IUpdate,
  IUpdateOptions,
  IUser,
} from "../types";
import {
  sendMessageOptions,
  sendPollOptions,
  forwardMessageOptions,
  copyMessageOptions,
  sendPhotoOptions,
  sendAudioOptions,
  sendVideoOptions,
  sendDocumentOptions,
  sendAnimationOptions,
  editMessageLiveLocationOptions,
  getUserProfilePhotosOptions,
  sendContactOptions,
  sendDiceOptions,
  sendLocationOptions,
  sendMediaGroupOptions,
  sendVenueOptions,
  sendVoiceOptions,
  stopMessageLiveLocationOptions,
  sendVideoNoteOptions,
  setMyCommandsOptions,
  banChatMemberOptions,
  restrictChatMemberOptions,
  promoteChatMemberOptions,
  createChatInviteLinkOptions,
  editChatInviteLinkOptions,
  answerCallbackQueryOptions,
  editMessageTextOptions,
  editMessageCaptionOptions,
} from "./index";
import {
  TCallbackQueryCallback,
  TChosenInlineResultCallback,
  TInlineQueryCallback,
  TMessageCallback,
  TPollAnswerCallback,
  TPollCallback,
  TPreCheckoutQueryCallback,
  TShippingQueryCallback,
  TOnError,
  IMessageId,
  LocalFile,
  ActionType,
  TelegramEvents,
} from "./types";

import {
  IBotCommand,
  IFile,
  IInputMediaAudio,
  IInputMediaDocument,
  IInputMediaPhoto,
  IInputMediaVideo,
  IUserProfilePhotos,
} from "../types";
import { Errors, ErrosController } from "../helpers/ErrorsController";

export class TelegramAPI {
  /**
   * Telegram API token
   */
  private _token: string;
  /**
   * Method endpoint
   */
  private endpoint: string;
  /**
   * Timeout for the polling
   */
  private timeout: any;
  /**
   * Updates offset
   */
  private offset: number | undefined;
  /**
   * The event emitter for the telegram events
   */
  private emitter: EventEmitter;
  /**
   *  Callback for the "message" event
   */
  private onMessageCallback: TMessageCallback | undefined;
  /**
   * Callback for the "edited_message" event
   */
  private onEditedMessageCallback: TMessageCallback | undefined;
  /**
   * Callback for the "channel_post" event
   */
  private onChannelPostCallback: TMessageCallback | undefined;
  /**
   * Callback for the "edited_channel_post" event
   */
  private onEditedChannelPostCallback: TMessageCallback | undefined;
  /**
   * Callback for the "callback_query" event
   */
  private onCallbackQueryCallback: TCallbackQueryCallback | undefined;
  /**
   * Callback for the "inline_query" event
   */
  private onInlineQueryCallback: TInlineQueryCallback | undefined;
  /**
   * Callback for the "chosen_inline_result" event
   */
  private onChosenInlineResultCallback: TChosenInlineResultCallback | undefined;
  /**
   * Callback for the "shipping_query" event
   */
  private onShippingQueryCallback: TShippingQueryCallback | undefined;
  /**
   * Callback for the "pre_checkout_query" event
   */
  private onPreCheckoutQueryCallback: TPreCheckoutQueryCallback | undefined;
  /**
   * Callback for the "poll" event
   */
  private onPollCallback: TPollCallback | undefined;
  /**
   * Callback for the "poll_answer" event
   */
  private onPollAnswerCallback: TPollAnswerCallback | undefined;

  /**
   * TelegramAPI constructor
   * @param token Telegram API Token
   */

  constructor(token: string) {
    this._token = token;
    if (!token)
      throw new ErrosController(
        "You must provide an API token",
        Errors.CLASS_INITIALIZATION_ERROR
      );
    this.endpoint = `https://api.telegram.org/bot${this._token}/`;
    this.emitter = new EventEmitter();
  }

  /**
   * Private Method for sending post requests to the Telegram Bot API
   * @param apiMethod Request Method
   * @param url API Endpoint
   * @param data the data object if the request method is "POST"
   * @param options NeedleOptions
   * @returns
   */

  private async sendRequest(
    apiMethod: NeedleHttpVerbs,
    url: string,
    data: {},
    options?: NeedleOptions
  ) {
    const req = await needle(apiMethod, url, data, options);
    const res = await req.body;

    if (!res.ok) {
      this.emitter.emit("error", res);
    }

    return res;
  }

  /**
   * Event listener for the telegram events
   * @param event TelegramEvents
   * @param listener TelegramEvents
   * @returns void
   */

  on<E extends keyof TelegramEvents>(
    event: E,
    listener: (...callbacks: TelegramEvents[E]) => void
  ) {
    if (!event)
      throw new ErrosController(
        "You should provide a valid event",
        Errors.INVALID_EVENT
      );
    //@ts-expect-error
    this.emitter.on(event, listener);
  }

  /**
   * Event listener for the telegram events
   * @param event TelegramEvents
   * @param listener TelegramEvents
   * @returns void
   */

  once<E extends keyof TelegramEvents>(
    event: E,
    listener: (...callbacks: TelegramEvents[E]) => void
  ) {
    if (!event)
      throw new ErrosController(
        "You should provide a valid event",
        Errors.INVALID_EVENT
      );
    //@ts-expect-error
    this.emitter.once(event, listener);
  }

  onMessage(callback: TMessageCallback) {
    if (typeof callback !== "function")
      throw new ErrosController(
        `The paramater callback must be from type 'function', recieved: ${typeof callback}`,
        Errors.INVALID_TYPE
      );
    this.onMessageCallback = callback;
  }

  onEditedMessage(callback: TMessageCallback) {
    if (typeof callback !== "function")
      throw new ErrosController(
        `The paramater callback must be from type 'function', recieved: ${typeof callback}`,
        Errors.INVALID_TYPE
      );
    this.onEditedMessageCallback = callback;
  }

  onChannelPost(callback: TMessageCallback) {
    if (typeof callback !== "function")
      throw new ErrosController(
        `The paramater callback must be from type 'function', recieved: ${typeof callback}`,
        Errors.INVALID_TYPE
      );
    this.onChannelPostCallback = callback;
  }

  onEditedChannelPost(callback: TMessageCallback) {
    if (typeof callback !== "function")
      throw new ErrosController(
        `The paramater callback must be from type 'function', recieved: ${typeof callback}`,
        Errors.INVALID_TYPE
      );
    this.onEditedChannelPostCallback = callback;
  }

  onCallbackQuery(callback: TCallbackQueryCallback) {
    if (typeof callback !== "function")
      throw new ErrosController(
        `The paramater callback must be from type 'function', recieved: ${typeof callback}`,
        Errors.INVALID_TYPE
      );
    this.onCallbackQueryCallback = callback;
  }

  onInlineQuery(callback: TInlineQueryCallback) {
    if (typeof callback !== "function")
      throw new ErrosController(
        `The paramater callback must be from type 'function', recieved: ${typeof callback}`,
        Errors.INVALID_TYPE
      );
    this.onInlineQueryCallback = callback;
  }

  onChosenInlineResult(callback: TChosenInlineResultCallback) {
    if (typeof callback !== "function")
      throw new ErrosController(
        `The paramater callback must be from type 'function', recieved: ${typeof callback}`,
        Errors.INVALID_TYPE
      );
    this.onChosenInlineResultCallback = callback;
  }

  onShippingQuery(callback: TShippingQueryCallback) {
    if (typeof callback !== "function")
      throw new ErrosController(
        `The paramater callback must be from type 'function', recieved: ${typeof callback}`,
        Errors.INVALID_TYPE
      );
    this.onShippingQueryCallback = callback;
  }

  onPreCheckoutQuery(callback: TPreCheckoutQueryCallback) {
    if (typeof callback !== "function")
      throw new ErrosController(
        `The paramater callback must be from type 'function', recieved: ${typeof callback}`,
        Errors.INVALID_TYPE
      );
    this.onPreCheckoutQueryCallback = callback;
  }

  onPoll(callback: TPollCallback) {
    if (typeof callback !== "function")
      throw new ErrosController(
        `The paramater callback must be from type 'function', recieved: ${typeof callback}`,
        Errors.INVALID_TYPE
      );
    this.onPollCallback = callback;
  }

  onPollAnswer(callback: TPollAnswerCallback) {
    if (typeof callback !== "function")
      throw new ErrosController(
        `The paramater callback must be from type 'function', recieved: ${typeof callback}`,
        Errors.INVALID_TYPE
      );
    this.onPollAnswerCallback = callback;
  }

  private processUpdates(updates: IUpdate[]) {
    updates.forEach((update) => {
      this.offset = update.update_id + 1;
      let message: IMessage = update.message;
      let editedMessage = update.edited_message;
      let channelPost = update.channel_post;
      let editedChannelPost = update.edited_channel_post;
      let inlineQuery = update.inline_query;
      let chosenInlineResult = update.chosen_inline_result;
      let callbackQuery = update.callback_query;
      let shippingQuery = update.shipping_query;
      let preCheckoutQuery = update.pre_checkout_query;
      let pollQuery = update.poll;
      let pollAnswerQuery = update.poll_answer;
      let chatJoinReq = update.chat_join_request;

      if (message) {
        this.emitter.emit("message", message);
        if (this.onMessageCallback !== undefined) {
          this.onMessageCallback(message);
        }
      } else if (editedMessage) {
        this.emitter.emit("edited_message", editedMessage);
        if (this.onEditedMessageCallback !== undefined) {
          this.onEditedMessageCallback(editedMessage);
        }
      } else if (channelPost) {
        this.emitter.emit("channel_post", channelPost);
        if (this.onChannelPostCallback !== undefined) {
          this.onChannelPostCallback(channelPost);
        }
      } else if (editedChannelPost) {
        this.emitter.emit("edited_channel_post", editedChannelPost);
        if (this.onEditedChannelPostCallback !== undefined) {
          this.onEditedChannelPostCallback(editedChannelPost);
        }
      } else if (callbackQuery) {
        this.emitter.emit("callback_query", callbackQuery);
        if (this.onCallbackQueryCallback !== undefined) {
          this.onCallbackQueryCallback(callbackQuery);
        }
      } else if (inlineQuery) {
        this.emitter.emit("inline_query", inlineQuery);
        if (this.onInlineQueryCallback !== undefined) {
          this.onInlineQueryCallback(inlineQuery);
        }
      } else if (chosenInlineResult) {
        this.emitter.emit("chosen_inline_result", chosenInlineResult);
        if (this.onChosenInlineResultCallback !== undefined) {
          this.onChosenInlineResultCallback(chosenInlineResult);
        }
      } else if (shippingQuery) {
        this.emitter.emit("shipping_query", shippingQuery);
        if (this.onShippingQueryCallback !== undefined) {
          this.onShippingQueryCallback(shippingQuery);
        }
      } else if (preCheckoutQuery) {
        this.emitter.emit("pre_checkout_query", preCheckoutQuery);
        if (this.onPreCheckoutQueryCallback !== undefined) {
          this.onPreCheckoutQueryCallback(preCheckoutQuery);
        }
      } else if (pollQuery) {
        this.emitter.emit("poll", pollQuery);
        if (this.onPollCallback !== undefined) {
          this.onPollCallback(pollQuery);
        }
      } else if (pollAnswerQuery) {
        this.emitter.emit("poll_answer", pollAnswerQuery);
        if (this.onPollAnswerCallback !== undefined) {
          this.onPollAnswerCallback(pollAnswerQuery);
        }
      } else if (chatJoinReq) {
        this.emitter.emit("chat_join_request", chatJoinReq);
      }
    });
  }

  async getUpdates(options?: IUpdateOptions) {
    if (!options) {
      options = {};
      return await this.sendRequest(
        "get",
        this.endpoint + "getUpdates",
        options
      );
    }

    const qs = new URLSearchParams();

    for (const [key, value] of Object.entries(options)) {
      qs.append(key, value);
    }

    return (await this.sendRequest("post", this.endpoint + "getUpdates", qs))
      .result;
  }

  /**
   * Starts polling updates from the Telegram API
   */

  startPolling() {
    this.getUpdates({ timeout: 10, offset: this.offset })
      .then((updates) => {
        if (updates !== undefined) this.processUpdates(updates);
        return null;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        if (this.timeout && typeof this.timeout.refresh === "function") {
          this.timeout.refresh();
        } else {
          this.timeout = setTimeout(() => this.startPolling(), 100);
        }
      });
  }

  /**
   * Stops polling updates from the Telegram API
   */
  stopPolling() {
    clearTimeout(this.timeout);
  }

  /**
   * A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object.
   * @returns IUser
   */
  async getMe(): Promise<IUser> {
    const fetch: IUser = await (
      await this.sendRequest("get", this.endpoint + "getMe", {})
    ).result;
    return fetch;
  }

  /**
   * Use this method to send text messages. On success, the sent Message is returned.
   * @param chatId Unique identifier for the target chat or username of the target channel.
   * @param text Text of the message to be sent, 1-4096 characters after entities parsing
   * @param options sendMessageOptions
   * @returns IMessage
   *
   * ```ts
   * await TelegramAPI.sendMessage(message.chat.id, "Hey there!") // => returns IMessage Object
   * // With options
   * await TelegramAPI.sendMessage(message.chat.id, "Hey from the bot!", { disable_notification: true})
   * // => will send the message with no notification
   * ```
   */

  async sendMessage(
    chatId: string | number,
    text: string,
    options?: sendMessageOptions
  ): Promise<IMessage> {
    if (typeof chatId !== "string" && typeof chatId !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chatId}`,
        Errors.INVALID_TYPE
      );

    if (!chatId || !text)
      throw new ErrosController(
        "The parameters 'chatId' and 'text' are required",
        Errors.MISSING_PARAMS
      );

    let params = {
      chat_id: chatId,
      text: text,
      ...options,
    };

    const send: IMessage = await (
      await this.sendRequest("post", this.endpoint + "sendMessage", params)
    ).result;

    return send;
  }

  /**
   * Use this method to send a native poll. On success, the sent Message is returned.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param question Poll question, 1-300 characters
   * @param answer_options A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
   * @param options sendPollOptions
   * @returns IMessage
   *
   * ```ts
   * await TelegramAPI.sendPoll(message.chat.id, "How are you doing today sir?", [ "Good", "not so bad", "fine"]);
   * // => returns the IMessage object
   *
   * // With options
   * await TelegramAPI.sendPoll(message.chat.id, "How are you doing today sir?", [ "Good", "not so bad", "fine"], {allows_multiple_answers: true, is_anonymous: true});
   * // => this will send an anonymous poll to the chat with the ability to select multiple answers. returns IMessage
   * ```
   */

  async sendPoll(
    chat_id: string | number,
    question: string,
    answer_options: string[],
    options?: sendPollOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (!chat_id || !question || !answer_options)
      throw new ErrosController(
        "The parameters 'chat_id', 'question' and 'answer_options' are required",
        Errors.MISSING_PARAMS
      );

    if (typeof answer_options !== "object")
      throw new ErrosController(
        "The parameter 'answer_options' must be an array of strings!",
        Errors.INVALID_TYPE
      );

    let params = {
      chat_id: chat_id,
      question: question,
      options: JSON.stringify(answer_options),
      ...options,
    };

    const send: IMessage = await (
      await this.sendRequest("post", this.endpoint + "sendPoll", params)
    ).result;

    return send;
  }

  /**
   * Use this method to forward messages of any kind. Service messages can't be forwarded. On success, the sent Message is returned.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param from_chat_id Unique identifier for the chat where the original message was sent or channel username.
   * @param message_id Message identifier in the chat specified in from_chat_id
   * @param options forwardMessageOptions
   * @returns IMessage
   *
   * ```ts
   * await TelegramAPI.forwardMessage(message.chat.id, message.chat.id, message.message_id);
   * // => will forward the message you sent in the chat back to you. chat_id is the target chat or username and from_chat_id is the id of the channel the message was sent in.
   * ```
   */

  async forwardMessage(
    chat_id: string | number,
    from_chat_id: string | number,
    message_id: number,
    options?: forwardMessageOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (!chat_id || !from_chat_id || !message_id)
      throw new ErrosController(
        "The parameters 'chat_id', 'from_chat_id' and 'message_id' are required",
        Errors.MISSING_PARAMS
      );

    let params = {
      chat_id: chat_id,
      from_chat_id: from_chat_id,
      message_id: message_id,
      ...options,
    };

    const send: IMessage = await (
      await this.sendRequest("post", this.endpoint + "forwardMessage", params)
    ).result;

    return send;
  }

  /**
   * Use this method to copy messages of any kind. Service messages and invoice messages can't be copied. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param from_chat_id Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername)
   * @param message_id Message identifier in the chat specified in from_chat_id
   * @param options copyMessageOptions
   * @returns MessageId
   * ```ts
   * // this method works just like forwardMessage with the exception not to link the new message to the original message.
   * await TelegramAPI.copyMessage(message.chat.id, message.chat.id, message.message_id);
   * // => will forward the message you sent in the chat back to you. chat_id is the target chat or username and from_chat_id is the id of the channel the message was sent in.
   * ```
   *
   */

  async copyMessage(
    chat_id: string | number,
    from_chat_id: string | number,
    message_id: number,
    options?: copyMessageOptions
  ): Promise<IMessageId> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (!chat_id || !from_chat_id || !message_id)
      throw new ErrosController(
        "The parameters 'chat_id', 'from_chat_id' and 'message_id' are required",
        Errors.MISSING_PARAMS
      );

    let params = {
      chat_id: chat_id,
      from_chat_id: from_chat_id,
      message_id: message_id,
      ...options,
    };

    const send: IMessageId = await (
      await this.sendRequest("post", this.endpoint + "copyMessage", params)
    ).result;

    return send;
  }

  /**
   * Use this method to send photos. On success, the sent Message is returned.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param photo Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. More info on Sending Files »
   * @param options sendPhotoOptions
   * @returns IMessage
   * ```ts
   * // => using file_id
   * await TelegramAPI.sendPhoto(message.chat.id, "AgACAgIAAxkDAAIGaGImV3d8t0uoWQvwIX7WxtDhqxikAAL0ujEb75EwSVj2k_EZ0-26AQADAgADbQADIwQ")
   *
   * // => using http URL
   * await Telegram.sendPhoto(message.chat.id, "https://cdn.discordapp.com/attachments/658790463595347968/950469680445919272/bc517a2af06ebeed02591cbff6349d3e.png")
   *
   * // => using local file
   * await TelegramAPI.sendPhoto(message.chat.id, {file: "./nice.png", content_type: "image/png"})
   * // content_type is optional
   * ```
   */

  async sendPhoto(
    chat_id: string | number,
    photo: string | LocalFile,
    options?: sendPhotoOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (typeof photo !== "string" && typeof photo !== "object")
      throw new ErrosController(
        "A photo can either be an HTTP URL or an object e.g: {file:'local path to photo'}",
        Errors.INVALID_TYPE
      );

    if (!chat_id || !photo)
      throw new ErrosController(
        "The parameters 'chat_id' and 'photo' are required",
        Errors.MISSING_PARAMS
      );

    let params = {};

    if (typeof photo !== "string" && photo.file) {
      params = {
        chat_id: chat_id,
        photo: {
          file: photo.file,
          content_type: photo.content_type
            ? photo.content_type
            : mime.lookup(photo.file),
        },
        ...options,
      };
    } else {
      params = {
        chat_id: chat_id,
        photo: photo,
        ...options,
      };
    }

    let result: IMessage;

    result = await (
      await this.sendRequest("post", this.endpoint + "sendPhoto", params, {
        multipart: true,
      })
    ).result;

    return result;
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param audio Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data.
   * @param options sendAudioOptions
   * @returns IMessage
   * ```ts
   * // => using file_id
   * await TelegramAPI.sendAudio(message.chat.id, "AgACAgIAAxkDAAIGaGImV3d8t0uoWQvwIX7WxtDhqxikAAL0ujEb75EwSVj2k_EZ0-26AQADAgADbQADIwQ")
   *
   * // => using http URL
   * await Telegram.sendAudio(message.chat.id, "audio link from the internet")
   *
   * // => using local file
   * await TelegramAPI.sendAudio(message.chat.id, {file: "./nice_song.mp3", content_type: "audio/mpeg"})
   * // content_type is optional
   * ```
   */
  async sendAudio(
    chat_id: string | number,
    audio: string | LocalFile,
    options?: sendAudioOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (typeof audio !== "string" && typeof audio !== "object")
      throw new ErrosController(
        "An audio can either be an HTTP URL or an object e.g: {file:'local path to audio'}",
        Errors.INVALID_TYPE
      );

    if (!chat_id || !audio)
      throw new ErrosController(
        "The parameters 'chat_id' and 'audio' are required",
        Errors.MISSING_PARAMS
      );

    let params = {};

    if (typeof audio !== "string" && audio.file) {
      params = {
        chat_id: chat_id,
        audio: {
          file: audio.file,
          content_type: audio.content_type
            ? audio.content_type
            : mime.lookup(audio.file),
        },
        ...options,
      };
    } else {
      params = {
        chat_id: chat_id,
        audio: audio,
        ...options,
      };
    }

    let result: IMessage;
    result = await (
      await this.sendRequest("post", this.endpoint + "sendAudio", params, {
        multipart: true,
      })
    ).result;

    return result;
  }

  /**
   * Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param video Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data.
   * @param options sendVideoOptions
   * @returns IMessage
   * ```ts
   * // => using file_id
   * await TelegramAPI.sendVideo(message.chat.id, "AgACAgIAAxkDAAIGaGImV3d8t0uoWQvwIX7WxtDhqxikAAL0ujEb75EwSVj2k_EZ0-26AQADAgADbQADIwQ")
   *
   * // => using http URL
   * await Telegram.sendVideo(message.chat.id, "video link from the internet")
   *
   * // => using local file
   * await TelegramAPI.sendVideo(message.chat.id, {file: "./nice_video.mp4", content_type: "video/mp4"})
   * // content_type is optional
   * ```
   */

  async sendVideo(
    chat_id: string | number,
    video: string | LocalFile,
    options?: sendVideoOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (typeof video !== "string" && typeof video !== "object")
      throw new ErrosController(
        "A video can either be an HTTP URL or an object e.g: {file:'local path to video'}",
        Errors.INVALID_TYPE
      );

    if (!chat_id || !video)
      throw new ErrosController(
        "The parameters 'chat_id' and 'video' are required",
        Errors.MISSING_PARAMS
      );

    let params = {};

    if (typeof video !== "string" && video.file) {
      params = {
        chat_id: chat_id,
        video: {
          file: video.file,
          content_type: video.content_type
            ? video.content_type
            : mime.lookup(video.file),
        },
        ...options,
      };
    } else {
      params = {
        chat_id: chat_id,
        video: video,
        ...options,
      };
    }

    let result: IMessage;

    result = await (
      await this.sendRequest("post", this.endpoint + "sendVideo", params, {
        multipart: true,
      })
    ).result;

    return result;
  }

  /**
   * Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param document File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data.
   * @param options sendDocumentOptions
   * @returns IMessage
   * ```ts
   * // => using file_id
   * await TelegramAPI.sendDocument(message.chat.id, "AgACAgIAAxkDAAIGaGImV3d8t0uoWQvwIX7WxtDhqxikAAL0ujEb75EwSVj2k_EZ0-26AQADAgADbQADIwQ")
   *
   * // => using http URL
   * await Telegram.sendDocument(message.chat.id, "pdf file link from the internet")
   *
   * // => using local file
   * await TelegramAPI.sendDocument(message.chat.id, {file: "./invoide.pdf", content_type: "application/pdf"})
   * // content_type is optional
   * ```
   */

  async sendDocument(
    chat_id: number | string,
    document: string | LocalFile,
    options?: sendDocumentOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (typeof document !== "string" && typeof document !== "object")
      throw new ErrosController(
        "A document can either be an HTTP URL or an object e.g: {file:'local path to document'}",
        Errors.INVALID_TYPE
      );

    if (!chat_id || !document)
      throw new ErrosController(
        "The parameters 'chat_id' and 'document' are required",
        Errors.MISSING_PARAMS
      );
    let params = {};

    if (typeof document !== "string" && document.file) {
      params = {
        chat_id: chat_id,
        document: {
          file: document.file,
          content_type: document.content_type
            ? document.content_type
            : mime.lookup(document.file),
        },
        ...options,
      };
    } else {
      params = {
        chat_id: chat_id,
        document: document,
        ...options,
      };
    }

    let result: IMessage;

    result = await (
      await this.sendRequest("post", this.endpoint + "sendDocument", params, {
        multipart: true,
      })
    ).result;

    return result;
  }

  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param animation Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data.
   * @param options sendAnimationOptions
   * @returns IMessage
   * ```ts
   * // => using file_id
   * await TelegramAPI.sendAnimation(message.chat.id, "AgACAgIAAxkDAAIGaGImV3d8t0uoWQvwIX7WxtDhqxikAAL0ujEb75EwSVj2k_EZ0-26AQADAgADbQADIwQ")
   *
   * // => using http URL
   * await Telegram.sendAnimation(message.chat.id, "gif link from the internet")
   *
   * // => using local file
   * await TelegramAPI.sendAnimation(message.chat.id, {file: "./cute_kitty.gif", content_type: "image/gif"})
   * // content_type is optional
   * ```
   */

  async sendAnimation(
    chat_id: string | number,
    animation: string | LocalFile,
    options?: sendAnimationOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (typeof animation !== "string" && typeof animation !== "object")
      throw new ErrosController(
        "An animation can either be an HTTP URL or an object e.g: {file:'local path to animation'}",
        Errors.INVALID_TYPE
      );

    if (!chat_id || !animation)
      throw new ErrosController(
        "The parameters 'chat_id' and 'animation' are required",
        Errors.MISSING_PARAMS
      );
    let params = {};

    if (typeof animation !== "string" && animation.file) {
      params = {
        chat_id: chat_id,
        animation: {
          file: animation.file,
          content_type: animation.content_type
            ? animation.content_type
            : mime.lookup(animation.file),
        },
        ...options,
      };
    } else {
      params = {
        chat_id: chat_id,
        animation: animation,
        ...options,
      };
    }

    let result: IMessage;

    result = await (
      await this.sendRequest("post", this.endpoint + "sendAnimation", params, {
        multipart: true,
      })
    ).result;

    return result;
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param voice Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data.
   * @param options
   * @returns IMessage
   * ```ts
   * // => using file_id
   * await TelegramAPI.sendVoice(message.chat.id, "AgACAgIAAxkDAAIGaGImV3d8t0uoWQvwIX7WxtDhqxikAAL0ujEb75EwSVj2k_EZ0-26AQADAgADbQADIwQ")
   *
   * // => using http URL
   * await Telegram.sendVoice(message.chat.id, "ogg audio link from the internet")
   *
   * // => using local file
   * await TelegramAPI.sendVoice(message.chat.id, {file: "./voice.ogg", content_type: "audio/ogg"})
   * // content_type is optional
   * ```
   */

  async sendVoice(
    chat_id: string | number,
    voice: string | LocalFile,
    options?: sendVoiceOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (typeof voice !== "string" && typeof voice !== "object")
      throw new ErrosController(
        "A voice can either be an HTTP URL or an object e.g: {file:'local path to voice'}",
        Errors.INVALID_TYPE
      );

    if (!chat_id || !voice)
      throw new ErrosController(
        "The parameters 'chat_id' and 'voice' are required",
        Errors.MISSING_PARAMS
      );

    let params = {};

    if (typeof voice !== "string" && voice.file) {
      params = {
        chat_id: chat_id,
        voice: {
          file: voice.file,
          content_type: voice.content_type
            ? voice.content_type
            : mime.lookup(voice.file),
        },
        ...options,
      };
    } else {
      params = {
        chat_id: chat_id,
        voice: voice,
        ...options,
      };
    }

    let result: IMessage;

    result = await (
      await this.sendRequest("post", this.endpoint + "sendVoice", params, {
        multipart: true,
      })
    ).result;

    return result;
  }

  /**
   * As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1 minute long. Use this method to send video messages. On success, the sent Message is returned.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param videoNote Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. Sending video notes by a URL is currently unsupported
   * @param options
   * @returns sendVideoNoteOptions
   * ```ts
   * // => using file_id
   * await TelegramAPI.sendVideoNote(message.chat.id, "AgACAgIAAxkDAAIGaGImV3d8t0uoWQvwIX7WxtDhqxikAAL0ujEb75EwSVj2k_EZ0-26AQADAgADbQADIwQ")
   *
   * // => using local file
   * await TelegramAPI.sendVideoNote(message.chat.id, {file: "./someVideo.mp4", content_type: "video/mp4"})
   * // content_type is optional
   * ```
   */

  async sendVideoNote(
    chat_id: string | number,
    videoNote: string | LocalFile,
    options?: sendVideoNoteOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (typeof videoNote !== "string" && typeof videoNote !== "object")
      throw new ErrosController(
        "A video note can either be an HTTP URL or an object e.g: {file:'local path to the video note'}",
        Errors.INVALID_TYPE
      );

    if (!chat_id || !videoNote)
      throw new ErrosController(
        "The parameters 'chat_id' and 'videoNote' are required",
        Errors.MISSING_PARAMS
      );
    let params = {};

    if (typeof videoNote !== "string" && videoNote.file) {
      params = {
        chat_id: chat_id,
        video_note: {
          file: videoNote.file,
          content_type: videoNote.content_type
            ? videoNote.content_type
            : mime.lookup(videoNote.file),
        },
        ...options,
      };
    } else {
      params = {
        chat_id: chat_id,
        video_note: videoNote,
        ...options,
      };
    }

    let result: IMessage;

    result = await (
      await this.sendRequest("post", this.endpoint + "sendVideoNote", params, {
        multipart: true,
      })
    ).result;

    return result;
  }

  /**
   * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Messages that were sent is returned.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param media A JSON-serialized array describing messages to be sent, must include 2-10 items
   * @param options sendMediaGroupOptions
   * @returns IMessage
   */

  async sendMediaGroup(
    chat_id: number | string,
    media:
      | IInputMediaVideo[]
      | IInputMediaPhoto[]
      | IInputMediaDocument[]
      | IInputMediaAudio[],
    options?: sendMediaGroupOptions
  ): Promise<IMessage> {
    let params = {};
    let streams: any = [];

    media.forEach((mediaFile) => {
      if (typeof mediaFile.media !== "string" && mediaFile.media.file) {
        streams.push({
          type: mediaFile.type,
          media: {
            file: mediaFile.media.file,
            content_type: mediaFile.media.content_type
              ? mediaFile.media.content_type
              : mime.lookup(mediaFile.media.file),
          },
        });
      } else {
        streams.push({ type: mediaFile.type, media: mediaFile.media });
      }
    });

    params = {
      chat_id: chat_id,
      media: JSON.stringify(streams),
      ...options,
    };

    const send: IMessage = await (
      await this.sendRequest("post", this.endpoint + "sendMediaGroup", params, {
        multipart: true,
      })
    ).result;

    return send;
  }

  /**
   * Use this method to send point on the map. On success, the sent Message is returned.
   * @param chat_id  	Unique identifier for the target chat or username of the target channel
   * @param latitude Latitude of the location
   * @param longitude Longitude of the location
   * @param options sendLocationOptions
   * @returns IMessage[]
   * ```ts
   * await TelegramAPI.sendLocation(message, chat_id, 40.712776, -74.005974, options);
   * // will send a location card in the chat.
   *```
   */

  async sendLocation(
    chat_id: string | number,
    latitude: number,
    longitude: number,
    options?: sendLocationOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (!chat_id || !latitude || !longitude)
      throw new ErrosController(
        "The parameters 'chat_id', 'longitude' and 'latitude' are required",
        Errors.MISSING_PARAMS
      );

    let params = {
      chat_id: chat_id,
      latitude: latitude,
      longitude: longitude,
      ...options,
    };

    const send: IMessage = await (
      await this.sendRequest("post", this.endpoint + "sendLocation", params)
    ).result;

    return send;
  }

  /**
   * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   * @param latitude Latitude of new location
   * @param longitude Longitude of new location
   * @param options editMessageLiveLocationOptions
   * @returns IMessage | boolean
   */

  async editMessageLiveLocation(
    latitude: number,
    longitude: number,
    options?: editMessageLiveLocationOptions
  ): Promise<boolean | IMessage> {
    if (!latitude || !longitude)
      throw new ErrosController(
        "The parameters 'longitude' and 'latitude' are required",
        Errors.MISSING_PARAMS
      );

    let params = {
      latitude: latitude,
      longitude: longitude,
      ...options,
    };

    const send: IMessage = await (
      await this.sendRequest(
        "post",
        this.endpoint + "editMessageLiveLocation",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned.
   * @param options stopMessageLiveLocationOptions
   * @returns IMessage | boolean
   */

  async stopMessageLiveLocation(
    options?: stopMessageLiveLocationOptions
  ): Promise<boolean | IMessage> {
    let params = {
      ...options,
    };

    const send: IMessage = await (
      await this.sendRequest(
        "post",
        this.endpoint + "stopMessageLiveLocation",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to send information about a venue. On success, the sent Message is returned.
   * @param chat_id Unique identifier for the target chat or username of the target channel
   * @param latitude Latitude of the venue
   * @param longitude Longitude of the venue
   * @param title Name of the venue
   * @param address Address of the venue
   * @param options sendVenueOptions
   * @returns IMessage
   * ```ts
   * await TelegramAPI.sendVenue(message.chat.id, 40.712776, -74.005974, "New York","651 Fountain Ave, Brooklyn, NY 11208, USA");
   * // Will send A location venue. Returns IMessage
   */

  async sendVenue(
    chat_id: string | number,
    latitude: number,
    longitude: number,
    title: string,
    address: string,
    options?: sendVenueOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (!chat_id || !latitude || !longitude || title || address)
      throw new ErrosController(
        "The parameters 'chat_id', 'longitude', 'latitude', 'title' amd 'address' are required",
        Errors.MISSING_PARAMS
      );

    let params = {
      chat_id: chat_id,
      latitude: latitude,
      longitude: longitude,
      title: title,
      address: address,
      ...options,
    };

    const send: IMessage = await (
      await this.sendRequest("post", this.endpoint + "sendVenue", params)
    ).result;

    return send;
  }

  /**
   * Use this method to send phone contacts. On success, the sent Message is returned.
   * @param chat_id Unique identifier for the target chat or username of the target channel
   * @param phone_number Contact's phone number
   * @param first_name Contact's first name
   * @param options sendContactOptions
   * @returns IMessage
   * ```ts
   *  // this will send a phone contact in the specified chat.
   *  await TelegramAPI.sendContact(message.chat.id, "3216513215", "Bob")
   * ```
   */

  async sendContact(
    chat_id: string | number,
    phone_number: string,
    first_name: string,
    options?: sendContactOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (!chat_id || !phone_number || !first_name)
      throw new ErrosController(
        "The parameters 'chat_id', 'phone_number' and 'first_name' are required",
        Errors.MISSING_PARAMS
      );
    let params = {
      chat_id: chat_id,
      phone_number: phone_number,
      first_name: first_name,
      ...options,
    };

    const send: IMessage = await (
      await this.sendRequest("post", this.endpoint + "sendContact", params)
    ).result;

    return send;
  }

  /**
   * Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned.
   * @param chat_id Unique identifier for the target chat or username of the target channel
   * @param options sendDiceOptions
   * @returns IMessage
   */

  async sendDice(
    chat_id: string | number,
    options?: sendDiceOptions
  ): Promise<IMessage> {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    let params = {
      chat_id: chat_id,
      ...options,
    };

    const send: IMessage = await (
      await this.sendRequest("post", this.endpoint + "sendDice", params)
    ).result;

    return send;
  }

  /**
   * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel
   * @param action ActionType
   * @returns boolean
   */

  async sendChatAction(chat_id: number | string, action: ActionType) {
    if (typeof chat_id !== "string" && typeof chat_id !== "number")
      throw new ErrosController(
        `chat id must be a string or a number, received: ${typeof chat_id}`,
        Errors.INVALID_TYPE
      );

    if (!chat_id || !action)
      throw new ErrosController(
        "The parameters 'chat_id' and 'action' are required",
        Errors.MISSING_PARAMS
      );

    let params = {
      chat_id: chat_id,
      action: action,
    };

    const send: boolean = await (
      await this.sendRequest("post", this.endpoint + "sendChatAction", params)
    ).result;

    return send;
  }

  /**
   * Use this method to get a list of profile pictures for a user. Returns a IUserProfilePhotos object.
   * @param user_id Unique identifier of the target user
   * @param options getUserProfilePhotosOptions
   * @returns IUserProfilePhotos
   */

  async getUserProfilePhotos(
    user_id: number,
    options?: getUserProfilePhotosOptions
  ): Promise<IUserProfilePhotos> {
    if (typeof user_id !== "number")
      throw new ErrosController(
        `user_id must be a number!, recieved: ${typeof user_id}`,
        Errors.INVALID_TYPE
      );

    let params = {
      user_id: user_id,
      ...options,
    };

    const send: IUserProfilePhotos = await (
      await this.sendRequest(
        "post",
        this.endpoint + "getUserProfilePhotos",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to get basic info about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile
   * @param file_id File identifier to get info about
   * @returns IFile
   */

  async getFile(file_id: string): Promise<IFile> {
    const send: IFile = await (
      await this.sendRequest("post", this.endpoint + "getFile", {
        file_id: file_id,
      })
    ).result;

    return send;
  }

  /**
   * Use this method to change the list of the bot's commands. Returns True on success.
   * @see https://core.telegram.org/bots#commands
   * @param commands A JSON-serialized list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified.
   * @param options setMyCommandsOptions
   * @returns boolean
   */

  async setMyCommands(
    commands: IBotCommand[],
    options?: setMyCommandsOptions
  ): Promise<boolean> {
    if (!commands || typeof commands !== "object")
      throw new ErrosController(
        `The commands parameter must be an Array of IBotCommand!, recieved ${typeof commands}`,
        Errors.INVALID_TYPE
      );

    let params = {};

    if (options && options.scope) {
      params = {
        commands: JSON.stringify(commands),
        scope: JSON.stringify(options.scope),
        language_code: options.language_code ? options.language_code : "en",
      };
    } else {
      params = {
        commands: JSON.stringify(commands),
      };
    }

    const send: boolean = await (
      await this.sendRequest("post", this.endpoint + "setMyCommands", params)
    ).result;

    return send;
  }

  /**
   * Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success.
   * @param options setMyCommandsOptions
   * @returns boolean
   */

  async deleteMyCommands(options?: setMyCommandsOptions) {
    let params = {};

    switch (options) {
      case options?.scope:
        params = {
          scope: JSON.stringify(options?.scope),
        };
        break;

      case options?.language_code:
        params = {
          language_code: options?.language_code,
        };
        break;

      case options?.language_code && options.scope:
        params = {
          scope: JSON.stringify(options?.scope),
          language_code: options?.language_code,
        };
        break;
      default:
        params = {};
    }

    const send: boolean = await (
      await this.sendRequest("post", this.endpoint + "deleteMyCommands", params)
    ).result;

    return send;
  }

  /**
   * Use this method to get the current list of the bot's commands for the given scope and user language. Returns Array of BotCommand on success. If commands aren't set, an empty list is returned.
   * @param scope Object describing scope of users. Defaults to BotCommandScopeDefault.
   * @param language_code Optional. A two-letter ISO 639-1 language code or an empty string.
   * @returns IBotCommand[]
   */

  async getMyCommands(
    scope:
      | IBotCommandScopeBase
      | IBotCommandScopeChat
      | IBotCommandScopeChatAdministrators
      | IBotCommandScopeChatMember,
    language_code?: string
  ) {
    if (!scope || typeof scope !== "object")
      throw new ErrosController(
        "The scope parameter is required and is from type object!, recieved " +
          typeof scope,
        Errors.INVALID_TYPE
      );
    let params = {
      scope: JSON.stringify(scope),
      language_code: language_code,
    };

    const send: IBotCommand[] = await (
      await this.sendRequest("post", this.endpoint + "getMyCommands", params)
    ).result;

    return send;
  }

  /**
   * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
   * @param chat_id Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername)
   * @param user_id Unique identifier of the target user
   * @param options banChatMemberOptions
   * @returns boolean
   */

  async banChatMember(
    chat_id: string | number,
    user_id: number,
    options?: banChatMemberOptions
  ): Promise<boolean> {
    let params = {
      chat_id: chat_id,
      user_id: user_id,
      ...options,
    };

    const send: boolean = await (
      await this.sendRequest("post", this.endpoint + "banChatMember", params)
    ).result;

    return send;
  }

  /**
   * Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success.
   * @param chat_id Unique identifier for the target group or username of the target supergroup or channel (in the format @channelusername)
   * @param user_id Unique identifier of the target user
   * @param only_if_banned Do nothing if the user is not banned
   * @returns boolean
   */

  async unbanChatMember(
    chat_id: string | number,
    user_id: number,
    only_if_banned?: boolean
  ): Promise<boolean> {
    let params = {
      chat_id: chat_id,
      user_id: user_id,
      only_if_banned: only_if_banned,
    };

    const send: boolean = await (
      await this.sendRequest("post", this.endpoint + "unbanChatMember", params)
    ).result;

    return send;
  }

  /**
   * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param user_id Unique identifier of the target user
   * @param options restrictChatMemberOptions
   * @returns boolean
   */

  async restrictChatMember(
    chat_id: string | number,
    user_id: number,
    options?: restrictChatMemberOptions
  ): Promise<boolean> {
    let params = {
      chat_id: chat_id,
      user_id: user_id,
      ...options,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "restrictChatMember",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param user_id Unique identifier of the target user
   * @param options promoteChatMemberOptions
   * @returns boolean
   */

  async promoteChatMember(
    chat_id: string | number,
    user_id: number,
    options?: promoteChatMemberOptions
  ): Promise<boolean> {
    let params = {
      chat_id: chat_id,
      user_id: user_id,
      ...options,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "promoteChatMember",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param user_id Unique identifier of the target user
   * @param custom_title New custom title for the administrator; 0-16 characters, emoji are not allowed
   * @returns boolean
   */

  async setChatAdministratorCustomTitle(
    chat_id: string | number,
    user_id: number,
    custom_title: string
  ): Promise<boolean> {
    let params = {
      chat_id: chat_id,
      user_id: user_id,
      custom_title: custom_title,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "setChatAdministratorCustomTitle",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param sender_chat_id Unique identifier of the target sender chat
   * @returns boolean
   */

  async banChatSenderChat(
    chat_id: string | number,
    sender_chat_id: number
  ): Promise<boolean> {
    let params = {
      chat_id: chat_id,
      sender_chat_id: sender_chat_id,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "banChatSenderChat",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param sender_chat_id Unique identifier of the target sender chat
   * @returns boolean
   */

  async unbanChatSenderChat(
    chat_id: string | number,
    sender_chat_id: number
  ): Promise<boolean> {
    let params = {
      chat_id: chat_id,
      sender_chat_id: sender_chat_id,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "unbanChatSenderChat",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   * @param permissions Object for new default chat permissions
   * @returns boolean
   */

  async setChatPermissions(
    chat_id: number | string,
    permissions: IChatPermissions
  ) {
    let params = {
      chat_id: chat_id,
      permissions: JSON.stringify(permissions),
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "setChatPermissions",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success.
   * @param chat_id
   * @returns boolean
   */

  async exportChatInviteLink(chat_id: string | number) {
    let params = {
      chat_id: chat_id,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "exportChatInviteLink",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param options createChatInviteLinkOptions
   * @returns IChatInviteLink
   */

  async createChatInviteLink(
    chat_id: string | number,
    options?: createChatInviteLinkOptions
  ) {
    let params = {
      chat_id: chat_id,
      ...options,
    };

    const send: IChatInviteLink = await (
      await this.sendRequest(
        "post",
        this.endpoint + "createChatInviteLink",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param invite_link The invite link to edit
   * @param options editChatInviteLinkOptions
   * @returns IChatInviteLink
   */

  async editChatInviteLink(
    chat_id: number | string,
    invite_link: string,
    options?: editChatInviteLinkOptions
  ) {
    let params = {
      chat_id: chat_id,
      invite_link: invite_link,
      ...options,
    };

    const send: IChatInviteLink = await (
      await this.sendRequest(
        "post",
        this.endpoint + "editChatInviteLink",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param invite_link The invite link to edit
   * @returns IChatInviteLink
   */

  async revokeChatInviteLink(chat_id: number | string, invite_link: string) {
    let params = {
      chat_id: chat_id,
      invite_link: invite_link,
    };

    const send: IChatInviteLink = await (
      await this.sendRequest(
        "post",
        this.endpoint + "revokeChatInviteLink",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param user_id Unique identifier of the target user
   * @returns boolean
   */

  async approveChatJoinRequest(chat_id: string | number, user_id: number) {
    let params = {
      chat_id: chat_id,
      user_id: user_id,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "approveChatJoinRequest",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param user_id Unique identifier of the target user
   * @returns boolean
   */

  async declineChatJoinRequest(chat_id: string | number, user_id: number) {
    let params = {
      chat_id: chat_id,
      user_id: user_id,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "declineChatJoinRequest",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param photo New chat photo. Must be local
   * @returns boolean
   */

  async setChatPhoto(chat_id: string | number, photo: LocalFile) {
    let params = {
      chat_id: chat_id,
      photo: photo,
    };

    const send: boolean = await (
      await this.sendRequest("post", this.endpoint + "setChatPhoto", params)
    ).result;

    return send;
  }

  /**
   * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @returns boolean
   */

  async deleteChatPhoto(chat_id: string | number) {
    let params = {
      chat_id: chat_id,
    };

    const send: boolean = await (
      await this.sendRequest("post", this.endpoint + "deleteChatPhoto", params)
    ).result;

    return send;
  }

  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param title New chat title, 1-255 characters
   * @returns boolean
   */

  async setChatTitle(chat_id: string | number, title: string) {
    let params = {
      chat_id: chat_id,
      title: title,
    };

    const send: boolean = await (
      await this.sendRequest("post", this.endpoint + "setChatTitle", params)
    ).result;

    return send;
  }

  /**
   * Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param description Optional. New chat description, 0-255 characters
   * @returns boolean
   */

  async setChatDescription(chat_id: string | number, description?: string) {
    let params = {
      chat_id: chat_id,
      description: description,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "setChatDescription",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param message_id Identifier of a message to pin
   * @param disable_notification Pass True, if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats.
   * @returns boolean
   */

  async pinChatMessage(
    chat_id: string | number,
    message_id: number,
    disable_notification?: boolean
  ) {
    let params = {
      chat_id: chat_id,
      message_id: message_id,
      disable_notification: disable_notification,
    };

    const send: boolean = await (
      await this.sendRequest("post", this.endpoint + "pinChatMessage", params)
    ).result;

    return send;
  }

  /**
   * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param message_id Optional. Identifier of a message to unpin. If not specified, the most recent pinned message (by sending date) will be unpinned.
   * @returns boolean
   */

  async unpinChatMessage(chat_id: string | number, message_id?: number) {
    let params = {
      chat_id: chat_id,
      message_id: message_id,
    };

    const send: boolean = await (
      await this.sendRequest("post", this.endpoint + "unpinChatMessage", params)
    ).result;

    return send;
  }

  /**
   * Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator right in a supergroup or 'can_edit_messages' administrator right in a channel. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @returns boolean
   */

  async unpinAllChatMessages(chat_id: string | number) {
    let params = {
      chat_id: chat_id,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "unpinAllChatMessages",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method for your bot to leave a group, supergroup or channel. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @returns boolean
   */

  async leaveChat(chat_id: string | number) {
    let params = {
      chat_id: chat_id,
    };

    const send: boolean = await (
      await this.sendRequest("post", this.endpoint + "leaveChat", params)
    ).result;

    return send;
  }

  /**
   * Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @returns IChat
   */

  async getChat(chat_id: string | number) {
    let params = {
      chat_id: chat_id,
    };

    const send: IChat = await (
      await this.sendRequest("post", this.endpoint + "getChat", params)
    ).result;

    return send;
  }

  /**
   * Use this method to get a list of administrators in a chat. On success, returns an Array of ChatMember objects that contains information about all chat administrators except other bots. If the chat is a group or a supergroup and no administrators were appointed, only the creator will be returned.
   * @param chat_id Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @returns IChatMember[]
   */

  async getChatAdministrators(chat_id: string | number) {
    let params = {
      chat_id: chat_id,
    };

    const send: IChatMember[] = await (
      await this.sendRequest(
        "post",
        this.endpoint + "getChatAdministrators",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to get the number of members in a chat. Returns Int on success.
   * @param chat_id Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @returns number
   */

  async getChatMemberCount(chat_id: string | number) {
    let params = {
      chat_id: chat_id,
    };

    const send: number = await (
      await this.sendRequest(
        "post",
        this.endpoint + "getChatMemberCount",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to get information about a member of a chat. Returns a ChatMember object on success.
   * @param chat_id Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @param user_id Unique identifier of the target user
   * @returns IChatMember
   */

  async getChatMember(chat_id: string | number, user_id: number) {
    let params = {
      chat_id: chat_id,
      user_id: user_id,
    };

    const send: IChatMember = await (
      await this.sendRequest("post", this.endpoint + "getChatMember", params)
    ).result;

    return send;
  }

  /**
   * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @param sticker_set_name Name of the sticker set to be set as the group sticker set
   * @returns boolean
   */

  async setChatStickerSet(chat_id: string | number, sticker_set_name: string) {
    let params = {
      chat_id: chat_id,
      sticker_set_name: sticker_set_name,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "setChatStickerSet",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
   * @param chat_id Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
   * @returns boolean
   */

  async deleteChatStickerSet(chat_id: string | number) {
    let params = {
      chat_id: chat_id,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "deleteChatStickerSet",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
   * @param callback_query_id Unique identifier for the query to be answered
   * @param options answerCallbackQueryOptions
   */

  async answerCallbackQuery(
    callback_query_id: string,
    options?: answerCallbackQueryOptions
  ) {
    let params = {
      callback_query_id: callback_query_id,
      ...options,
    };

    const send: boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "answerCallbackQuery",
        params
      )
    ).result;

    return send;
  }

  /**
   * Use this method to edit text and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   * @param text New text of the message, 1-4096 characters after entities parsing
   * @param options editMessageTextOptions
   * @returns boolean | IMessage
   */

  async editMessageText(
    text: string,
    options?: editMessageTextOptions
  ): Promise<boolean | IMessage> {
    let params = {
      text: text,
      ...options,
    };

    const send: IMessage | boolean = await (
      await this.sendRequest("post", this.endpoint + "editMessageText", params)
    ).result;

    return send;
  }

  /**
   * Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned.
   * @param caption New caption of the message, 0-1024 characters after entities parsing
   * @param options editMessageCaptionOptions
   * @returns IMessage | boolean
   */

  async editMessageCaption(
    caption: string,
    options?: editMessageCaptionOptions
  ) {
    let params = {
      caption: caption,
      ...options,
    };

    const send: IMessage | boolean = await (
      await this.sendRequest(
        "post",
        this.endpoint + "editMessageCaption",
        params
      )
    ).result;

    return send;
  }
}
