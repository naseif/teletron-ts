import EventEmitter from "eventemitter3";
import fetch, { RequestInit } from "node-fetch";
import { URLSearchParams } from "node:url";
import { IMessage } from "../types/IMessage";
import { IUpdate } from "../types/IUpdate";
import { IUpdateOptions } from "../types/IUpdateOptions";
import { IUser } from "../types/IUser";
import { sendMediaGroupOptions, sendVoiceOptions } from "./methodsOptions";
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
  sendVideoNoteOptions,
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
} from "./types";
import {
  IInputMediaAudio,
  IInputMediaDocument,
  IInputMediaPhoto,
  IInputMediaVideo,
} from "../types";

import FormData from "form-data";
import { createReadStream } from "node:fs";

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
   * Callback for the "error" event
   */
  private onErrorCallback: TOnError | undefined;

  constructor(token: string) {
    this._token = token;
    if (!token) throw new Error("Invalid token");
    this.endpoint = `https://api.telegram.org/bot${this._token}/`;
    this.emitter = new EventEmitter();
  }

  private async sendRequest(apiMethod: string, params?: RequestInit) {
    const get = await fetch(`${apiMethod}`, params);
    const { result } = await get.json();

    return result;
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

  onError(callback: TOnError) {
    this.onErrorCallback = callback;
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
      }
    });
  }

  private qs(options: {}) {
    const qs = new URLSearchParams();

    for (const [key, value] of Object.entries(options)) {
      //@ts-expect-error
      qs.append(key, value);
    }

    return qs;
  }

  async getUpdates(options?: IUpdateOptions) {
    if (!options) {
      options = {};
      return this.sendRequest(this.endpoint + "getUpdates");
    }

    const qs = new URLSearchParams();

    for (const [key, value] of Object.entries(options)) {
      qs.append(key, value);
    }

    return this.sendRequest(this.endpoint + "getUpdates", {
      body: qs,
      method: "POST",
    });
  }

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

  stopPolling() {
    clearTimeout(this.timeout);
  }

  /**
   * A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object.
   * @returns IUser
   */
  async getMe(): Promise<IUser> {
    const fetch: IUser = await this.sendRequest(this.endpoint + "getMe");
    return fetch;
  }

  /**
   * Use this method to send text messages. On success, the sent Message is returned.
   * @param chatId Unique identifier for the target chat or username of the target channel.
   * @param text Text of the message to be sent, 1-4096 characters after entities parsing
   * @param options sendMessageOptions
   * @returns IMessage
   */

  async sendMessage(
    chatId: string | number,
    text: string,
    options?: sendMessageOptions
  ): Promise<IMessage> {
    let params = {};

    if (options) {
      params = {
        chat_id: chatId,
        text: text,
        ...options,
      };
    } else {
      params = {
        chat_id: chatId,
        text: text,
      };
    }

    const qs = this.qs(params);
    const send: IMessage = await this.sendRequest(
      this.endpoint + "sendMessage",
      {
        body: qs,
        method: "POST",
      }
    );

    return send;
  }

  /**
   * Use this method to send a native poll. On success, the sent Message is returned.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param question Poll question, 1-300 characters
   * @param answer_options A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
   * @param options sendPollOptions
   * @returns IMessage
   */

  async sendPoll(
    chat_id: string | number,
    question: string,
    answer_options: string[],
    options?: sendPollOptions
  ): Promise<IMessage> {
    let params = {};
    if (options) {
      params = {
        chat_id: chat_id,
        question: question,
        options: JSON.stringify(answer_options),
        ...options,
      };
    } else {
      params = {
        chat_id: chat_id,
        question: question,
        options: JSON.stringify(answer_options),
      };
    }

    const qs = this.qs(params);
    const send: IMessage = await this.sendRequest(this.endpoint + "sendPoll", {
      body: qs,
      method: "POST",
    });

    return send;
  }

  /**
   * Use this method to forward messages of any kind. Service messages can't be forwarded. On success, the sent Message is returned.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param from_chat_id Unique identifier for the chat where the original message was sent or channel username.
   * @param message_id Message identifier in the chat specified in from_chat_id
   * @param options forwardMessageOptions
   * @returns IMessage
   */

  async forwardMessage(
    chat_id: string | number,
    from_chat_id: string | number,
    message_id: number,
    options?: forwardMessageOptions
  ): Promise<IMessage> {
    let params = {};

    if (options) {
      params = {
        chat_id: chat_id,
        from_chat_id: from_chat_id,
        message_id: message_id,
        ...options,
      };
    } else {
      params = {
        chat_id: chat_id,
        from_chat_id: from_chat_id,
        message_id: message_id,
      };
    }

    const qs = this.qs(params);
    const send: IMessage = await this.sendRequest(
      this.endpoint + "forwardMessage",
      {
        body: qs,
        method: "POST",
      }
    );

    return send;
  }

  /**
   * Use this method to copy messages of any kind. Service messages and invoice messages can't be copied. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param from_chat_id Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername)
   * @param message_id Message identifier in the chat specified in from_chat_id
   * @param options copyMessageOptions
   * @returns MessageId
   */
  async copyMessage(
    chat_id: string | number,
    from_chat_id: string | number,
    message_id: number,
    options?: copyMessageOptions
  ): Promise<IMessageId> {
    let params = {};

    if (options) {
      params = {
        chat_id: chat_id,
        from_chat_id: from_chat_id,
        message_id: message_id,
        ...options,
      };
    } else {
      params = {
        chat_id: chat_id,
        from_chat_id: from_chat_id,
        message_id: message_id,
      };
    }

    const qs = this.qs(params);
    const send: IMessageId = await this.sendRequest(
      this.endpoint + "copyMessage",
      {
        body: qs,
        method: "POST",
      }
    );

    return send;
  }

  /**
   * Use this method to send photos. On success, the sent Message is returned.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param photo Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. More info on Sending Files »
   * @param options sendPhotoOptions
   * @returns IMessage
   */
  async sendPhoto(
    chat_id: string | number,
    photo: any,
    options?: sendPhotoOptions
  ): Promise<IMessage> {
    let params = {};
    let postOptions = {};
    const form = new FormData();

    if (this.isReadableStream(photo)) {
      form.append("chat_id", chat_id);
      form.append("photo", photo);
      if (options) {
        for (const [key, value] of Object.entries(options)) {
          form.append(key, value);
        }
      }
      postOptions = {
        body: form,
        method: "POST",
        headers: form.getHeaders(),
      };
    } else {
      if (options) {
        params = {
          chat_id: chat_id,
          photo: photo,
          ...options,
        };
      }
      params = {
        chat_id: chat_id,
        photo: photo,
      };
      postOptions = {
        body: this.qs(params),
        method: "POST",
      };
    }

    const send: IMessage = await this.sendRequest(
      this.endpoint + "sendPhoto",
      postOptions
    );

    return send;
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param audio Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data.
   * @param options sendAudioOptions
   * @returns IMessage
   */
  async sendAudio(
    chat_id: string | number,
    audio: Buffer | string,
    options?: sendAudioOptions
  ): Promise<IMessage> {
    let params = {};
    let postOptions = {};
    const form = new FormData();

    if (this.isReadableStream(audio)) {
      form.append("chat_id", chat_id);
      form.append("audio", audio);
      if (options) {
        for (const [key, value] of Object.entries(options)) {
          form.append(key, value);
        }
      }
      postOptions = {
        body: form,
        method: "POST",
        headers: form.getHeaders(),
      };
    } else {
      if (options) {
        params = {
          chat_id: chat_id,
          audio: audio,
          ...options,
        };
      }
      params = {
        chat_id: chat_id,
        audio: audio,
      };
      postOptions = {
        body: this.qs(params),
        method: "POST",
      };
    }

    const send: IMessage = await this.sendRequest(
      this.endpoint + "sendAudio",
      postOptions
    );

    return send;
  }

  /**
   * Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param video Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data.
   * @param options sendVideoOptions
   * @returns
   */

  async sendVideo(
    chat_id: string,
    video: Buffer | string,
    options?: sendVideoOptions
  ): Promise<IMessage> {
    let params = {};
    let postOptions = {};
    const form = new FormData();

    if (this.isReadableStream(video)) {
      form.append("chat_id", chat_id);
      form.append("video", video);
      if (options) {
        for (const [key, value] of Object.entries(options)) {
          form.append(key, value);
        }
      }
      postOptions = {
        body: form,
        method: "POST",
        headers: form.getHeaders(),
      };
    } else {
      if (options) {
        params = {
          chat_id: chat_id,
          video: video,
          ...options,
        };
      } else {
        params = {
          chat_id: chat_id,
          video: video,
        };
      }
      postOptions = {
        body: this.qs(params),
        method: "POST",
      };
    }

    const send: IMessage = await this.sendRequest(
      this.endpoint + "sendVideo",
      postOptions
    );

    return send;
  }

  /**
   * Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param document File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data.
   * @param options sendDocumentOptions
   * @returns IMessage
   */

  async sendDocument(
    chat_id: number | string,
    document: Buffer | string,
    options?: sendDocumentOptions
  ): Promise<IMessage> {
    let params = {};
    let postOptions = {};
    const form = new FormData();

    if (this.isReadableStream(document)) {
      form.append("chat_id", chat_id);
      form.append("document", document);
      if (options) {
        for (const [key, value] of Object.entries(options)) {
          form.append(key, value);
        }
      }
      postOptions = {
        body: form,
        method: "POST",
        headers: form.getHeaders(),
      };
    } else {
      if (options) {
        params = {
          chat_id: chat_id,
          document: document,
          ...options,
        };
      }
      params = {
        chat_id: chat_id,
        document: document,
      };
      postOptions = {
        body: this.qs(params),
        method: "POST",
      };
    }

    const send: IMessage = await this.sendRequest(
      this.endpoint + "sendDocument",
      postOptions
    );

    return send;
  }

  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param animation Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data.
   * @param options sendAnimationOptions
   */

  async sendAnimation(
    chat_id: string | number,
    animation: Buffer | string,
    options?: sendAnimationOptions
  ) {
    let params = {};
    let postOptions = {};
    const form = new FormData();

    if (this.isReadableStream(animation)) {
      form.append("chat_id", chat_id);
      form.append("animation", animation);
      if (options) {
        for (const [key, value] of Object.entries(options)) {
          form.append(key, value);
        }
      }
      postOptions = {
        body: form,
        method: "POST",
        headers: form.getHeaders(),
      };
    } else {
      if (options) {
        params = {
          chat_id: chat_id,
          animation: animation,
          ...options,
        };
      }
      params = {
        chat_id: chat_id,
        animation: animation,
      };
      postOptions = {
        body: this.qs(params),
        method: "POST",
      };
    }

    const send: IMessage = await this.sendRequest(
      this.endpoint + "sendAnimation",
      postOptions
    );

    return send;
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param voice Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data.
   * @param options
   * @returns
   */
  async sendVoice(
    chat_id: string | number,
    voice: Buffer | string,
    options?: sendVoiceOptions
  ) {
    let params = {};
    let postOptions = {};
    const form = new FormData();

    if (this.isReadableStream(voice)) {
      form.append("chat_id", chat_id);
      form.append("voice", voice);
      if (options) {
        for (const [key, value] of Object.entries(options)) {
          form.append(key, value);
        }
      }
      postOptions = {
        body: form,
        method: "POST",
        headers: form.getHeaders(),
      };
    } else {
      if (options) {
        params = {
          chat_id: chat_id,
          voice: voice,
          ...options,
        };
      }
      params = {
        chat_id: chat_id,
        voice: voice,
      };
      postOptions = {
        body: this.qs(params),
        method: "POST",
      };
    }

    const send: IMessage = await this.sendRequest(
      this.endpoint + "sendVoice",
      postOptions
    );

    return send;
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param videoNote Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data.
   * @param options
   * @returns sendVideoNoteOptions
   */
  async sendVideoNote(
    chat_id: string | number,
    videoNote: Buffer | string,
    options?: sendVideoNoteOptions
  ): Promise<IMessage> {
    let params = {};
    let postOptions = {};
    const form = new FormData();

    if (this.isReadableStream(videoNote)) {
      form.append("chat_id", chat_id);
      form.append("video_note", videoNote);
      if (options) {
        for (const [key, value] of Object.entries(options)) {
          form.append(key, value);
        }
      }
      postOptions = {
        body: form,
        method: "POST",
        headers: form.getHeaders(),
      };
    } else {
      if (options) {
        params = {
          chat_id: chat_id,
          video_note: videoNote,
          ...options,
        };
      }
      params = {
        chat_id: chat_id,
        video_note: videoNote,
      };
      postOptions = {
        body: this.qs(params),
        method: "POST",
      };
    }

    const send: IMessage = await this.sendRequest(
      this.endpoint + "sendVideoNote",
      postOptions
    );

    return send;
  }

  /**
   * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an array of Messages that were sent is returned.
   * @param chat_id Unique identifier for the target chat or username of the target channel.
   * @param media A JSON-serialized array describing messages to be sent, must include 2-10 items
   * @param options
   * @returns
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
    let postOptions = {};
    let qs;

    if (options) {
      params = {
        chat_id: chat_id,
        media: JSON.stringify(media),
        ...options,
      };
    } else {
      params = {
        chat_id: chat_id,
        media: JSON.stringify(media),
      };
    }

    qs = this.qs(params);
    postOptions = {
      body: qs,
      method: "POST",
    };

    const send: IMessage = await this.sendRequest(
      this.endpoint + "sendMediaGroup",
      postOptions
    );

    if (!send) throw new Error(`API CALL FAILED`);

    return send;
  }

  private isReadableStream = (val: any) =>
    val !== null &&
    typeof val === "object" &&
    typeof val.pipe === "function" &&
    typeof val._read === "function" &&
    typeof val._readableState === "object";
}
