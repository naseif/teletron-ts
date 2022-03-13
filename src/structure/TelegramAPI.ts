import EventEmitter from "eventemitter3";
import needle, { NeedleHttpVerbs, NeedleOptions } from "needle";
import mime from "mime-types";
import { URLSearchParams } from "node:url";
import { IChatPermissions, IMessage, IUpdate, IUpdateOptions, IUser } from "../types";
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
    if (!token) throw new Error("Invalid token");
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
    try {
      const req = await needle(apiMethod, url, data, options);
      const res = await req.body;
      return res;
    } catch (error) {
      this.emitter.emit("error", error);
    }

    // if (!res?.ok) {
    //   throw new Error(`API CALL FAILED: ${res.description}`);
    // }
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
    //@ts-expect-error
    this.emitter.once(event, listener);
  }

  onMessage(callback: TMessageCallback) {
    this.onMessageCallback = callback;
  }

  onEditedMessage(callback: TMessageCallback) {
    this.onEditedMessageCallback = callback;
  }

  onChannelPost(callback: TMessageCallback) {
    this.onChannelPostCallback = callback;
  }

  onEditedChannelPost(callback: TMessageCallback) {
    this.onEditedChannelPostCallback = callback;
  }

  onCallbackQuery(callback: TCallbackQueryCallback) {
    this.onCallbackQueryCallback = callback;
  }

  onInlineQuery(callback: TInlineQueryCallback) {
    this.onInlineQueryCallback = callback;
  }

  onChosenInlineResult(callback: TChosenInlineResultCallback) {
    this.onChosenInlineResultCallback = callback;
  }

  onShippingQuery(callback: TShippingQueryCallback) {
    this.onShippingQueryCallback = callback;
  }

  onPreCheckoutQuery(callback: TPreCheckoutQueryCallback) {
    this.onPreCheckoutQueryCallback = callback;
  }

  onPoll(callback: TPollCallback) {
    this.onPollCallback = callback;
  }

  onPollAnswer(callback: TPollAnswerCallback) {
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

  async setChatPermissions(chat_id: number | string, permissions: IChatPermissions) {
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
}
