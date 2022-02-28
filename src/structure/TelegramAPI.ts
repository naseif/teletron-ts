import EventEmitter from "eventemitter3";
import fetch, { RequestInit } from "node-fetch";
import { URLSearchParams } from "node:url";
import { IMessage } from "../types/IMessage";
import { IUpdate } from "../types/IUpdate";
import { IUpdateOptions } from "../types/IUpdateOptions";
import { IUser } from "../types/IUser";
import {
  ICallbackQueryCallback,
  IChosenInlineResultCallback,
  IInlineQueryCallback,
  IMessageCallback,
  IPollAnswerCallback,
  IPollCallback,
  IPreCheckoutQueryCallback,
  IShippingQueryCallback,
  sendPollOptions,
  OnError,
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
  private onMessageCallback: IMessageCallback | undefined;
  /**
   * Callback for the "edited_message" event
   */
  private onEditedMessageCallback: IMessageCallback | undefined;
  /**
   * Callback for the "channel_post" event
   */
  private onChannelPostCallback: IMessageCallback | undefined;
  /**
   * Callback for the "edited_channel_post" event
   */
  private onEditedChannelPostCallback: IMessageCallback | undefined;
  /**
   * Callback for the "callback_query" event
   */
  private onCallbackQueryCallback: ICallbackQueryCallback | undefined;
  /**
   * Callback for the "inline_query" event
   */
  private onInlineQueryCallback: IInlineQueryCallback | undefined;
  /**
   * Callback for the "chosen_inline_result" event
   */
  private onChosenInlineResultCallback: IChosenInlineResultCallback | undefined;
  /**
   * Callback for the "shipping_query" event
   */
  private onShippingQueryCallback: IShippingQueryCallback | undefined;
  /**
   * Callback for the "pre_checkout_query" event
   */
  private onPreCheckoutQueryCallback: IPreCheckoutQueryCallback | undefined;
  /**
   * Callback for the "poll" event
   */
  private onPollCallback: IPollCallback | undefined;
  /**
   * Callback for the "poll_answer" event
   */
  private onPollAnswerCallback: IPollAnswerCallback | undefined;

  private onErrorCallback: OnError | undefined;

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

  onMessage(callback: IMessageCallback) {
    this.onMessageCallback = callback;
  }

  onEditedMessage(callback: IMessageCallback) {
    this.onEditedMessageCallback = callback;
  }

  onChannelPost(callback: IMessageCallback) {
    this.onChannelPostCallback = callback;
  }

  onEditedChannelPost(callback: IMessageCallback) {
    this.onEditedChannelPostCallback = callback;
  }

  onCallbackQuery(callback: ICallbackQueryCallback) {
    this.onCallbackQueryCallback = callback;
  }

  onInlineQuery(callback: IInlineQueryCallback) {
    this.onInlineQueryCallback = callback;
  }

  onChosenInlineResult(callback: IChosenInlineResultCallback) {
    this.onChosenInlineResultCallback = callback;
  }

  onShippingQuery(callback: IShippingQueryCallback) {
    this.onShippingQueryCallback = callback;
  }

  onPreCheckoutQuery(callback: IPreCheckoutQueryCallback) {
    this.onPreCheckoutQueryCallback = callback;
  }

  onPoll(callback: IPollCallback) {
    this.onPollCallback = callback;
  }

  onPollAnswer(callback: IPollAnswerCallback) {
    this.onPollAnswerCallback = callback;
  }

  onError(callback: OnError) {
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

  async sendMessage(chatId: string | number, text: string): Promise<IMessage> {
    const params = {
      chat_id: chatId,
      text: text,
    };

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
   * @param chat_id the chat id
   * @param question the poll's question
   * @param answer_options the answer options
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
}
