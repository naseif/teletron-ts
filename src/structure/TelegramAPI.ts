import EventEmitter from "eventemitter3";
import fetch, { Response, RequestInit } from "node-fetch";
import { URLSearchParams } from "node:url";
import { IMessage, Message } from "../types/IMessage";
import { IUpdate } from "../types/IUpdate";
import { IUpdateOptions } from "../types/IUpdateOptions";
import { IUser } from "../types/IUser";

export type TelegramEvents =
  | "message"
  | "edited_message"
  | "channel_post"
  | "edited_channel_post"
  | "callback_query"
  | "inline_query"
  | "chosen_inline_result"
  | "shipping_query"
  | "pre_checkout_query"
  | "poll"
  | "poll_answer";

export class TelegramAPI extends EventEmitter {
  private _token: string;
  private endpoint: string;
  private timeout: any;
  private offset: number | undefined;

  constructor(token: string) {
    super();
    this._token = token;
    if (!token) throw new Error("Invalid token");
    this.endpoint = `https://api.telegram.org/bot${this._token}/`;
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

  private processUpdates(updates: IUpdate[]) {
    updates.forEach((update) => {
      this.offset = update.update_id + 1;
      let message = update.message;
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
        this.emit("message", message);
      } else if (editedMessage) {
        this.emit("edited_message", editedMessage);
      } else if (channelPost) {
        this.emit("channel_post", channelPost);
      } else if (editedChannelPost) {
        this.emit("edited_channel_post", editedChannelPost);
      } else if (callbackQuery) {
        this.emit("callback_query", callbackQuery);
      } else if (inlineQuery) {
        this.emit("inline_query", inlineQuery);
      } else if (chosenInlineResult) {
        this.emit("chosen_inline_result", chosenInlineResult);
      } else if (shippingQuery) {
        this.emit("shipping_query", shippingQuery);
      } else if (preCheckoutQuery) {
        this.emit("pre_checkout_query", preCheckoutQuery);
      } else if (pollQuery) {
        this.emit("poll", pollQuery);
      } else if (pollAnswerQuery) {
        this.emit("poll_answer", pollAnswerQuery);
      }
    });
  }

  async getUpdates(
    options?: IUpdateOptions,
    callback?: (updates: IUpdate[]) => void
  ) {
    if (!options) {
      options = {};
      return this.sendRequest(this.endpoint + "getUpdates").then(callback);
    }

    const qs = new URLSearchParams();

    for (const [key, value] of Object.entries(options)) {
      qs.append(key, value);
    }

    return this.sendRequest(this.endpoint + "getUpdates", {
      body: qs,
      method: "POST",
    }).then(callback);
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
      .finally(() => (this.timeout = setTimeout(() => this.startPolling, 100)));
  }

  stopPolling() {
    clearTimeout(this.timeout);
  }

  async sendMessage() {}
}
