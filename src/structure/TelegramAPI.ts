import EventEmitter from "eventemitter3";
import fetch, { RequestInit } from "node-fetch";
import { URLSearchParams } from "node:url";
import { IMessage } from "../types/IMessage";
import { IUpdate } from "../types/IUpdate";
import { IUpdateOptions } from "../types/IUpdateOptions";
import { IUser } from "../types/IUser";
import {
  sendMessageOptions,
  sendPollOptions,
  forwardMessageOptions,
  copyMessageOptions,
  sendPhotoOptions,
  sendAudioOptions,
  sendVideoOptions,
  sendDocumentOptions,
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

  async getMe(callback?: (user: IUser) => void): Promise<IUser> {
    let result: IUser;
    const fetch = await this.sendRequest(this.endpoint + "getMe");
    result = fetch;
    if (callback) callback(result);
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
   * Use this method to send text messages. On success, the sent Message is returned.
   * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
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
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
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
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param from_chat_id Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername)
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
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
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
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
   * @param photo Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. More info on Sending Files »
   * @param options sendPhotoOptions
   * @returns IMessage
   */
  async sendPhoto(
    chat_id: string | number,
    photo: Buffer | string,
    options?: sendPhotoOptions
  ): Promise<IMessage> {
    let params = {};
    let postOptions = {};
    let qs;

    if (this.isReadableStream(photo)) {
      params = {
        chat_id: chat_id,
        photo: photo,
        ...options,
      };
      qs = this.qs(params);
      postOptions = {
        body: qs,
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
      };
    } else {
      if (options) {
        params = {
          chat_id: chat_id,
          photo: photo,
          ...options,
        };
      } else {
        params = {
          chat_id: chat_id,
          photo: photo,
        };
      }
      qs = this.qs(params);
      postOptions = {
        body: qs,
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
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
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
    let qs;

    if (this.isReadableStream(audio)) {
      params = {
        chat_id: chat_id,
        audio: audio,
        ...options,
      };
      qs = this.qs(params);
      postOptions = {
        body: qs,
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
      };
    } else {
      if (options) {
        params = {
          chat_id: chat_id,
          audio: audio,
          ...options,
        };
      } else {
        params = {
          chat_id: chat_id,
          audio: audio,
        };
      }
      qs = this.qs(params);
      postOptions = {
        body: qs,
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
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
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
    let qs;

    if (this.isReadableStream(video)) {
      params = {
        chat_id: chat_id,
        video: video,
        ...options,
      };
      qs = this.qs(params);
      postOptions = {
        body: qs,
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
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
      qs = this.qs(params);
      postOptions = {
        body: qs,
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
   * @param chat_id Unique identifier for the target chat or username of the target channel (in the format @channelusername)
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
    let qs;

    if (this.isReadableStream(document)) {
      params = {
        chat_id: chat_id,
        document: document,
        ...options,
      };
      qs = this.qs(params);
      postOptions = {
        body: qs,
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
      };
    } else {
      if (options) {
        params = {
          chat_id: chat_id,
          document: document,
          ...options,
        };
      } else {
        params = {
          chat_id: chat_id,
          document: document,
        };
      }
      qs = this.qs(params);
      postOptions = {
        body: qs,
        method: "POST",
      };
    }

    const send: IMessage = await this.sendRequest(
      this.endpoint + "sendDocument",
      postOptions
    );

    return send;
  }

  private isReadableStream = (val: any) =>
    val !== null &&
    typeof val === "object" &&
    typeof val.pipe === "function" &&
    typeof val._read === "function" &&
    typeof val._readableState === "object";
}
