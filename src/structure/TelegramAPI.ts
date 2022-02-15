import EventEmitter from "eventemitter3";
import fetch, { Response, RequestInit } from "node-fetch";
import { URLSearchParams } from "node:url";
import { Message } from "../types/IMessage";
import { IUpdate } from "../types/IUpdate";
import { IUpdateOptions } from "../types/IUpdateOptions";
import { IUser } from "../types/IUser";

export class TelegramAPI extends EventEmitter {
  private _token: string;
  private endpoint: string;

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

  private processUpdates(updates: IUpdate) {}

  async getUpdates(
    options?: IUpdateOptions,
    callback?: (updates: IUpdate[]) => void
  ): Promise<IUpdate[]> {
    if (!options) {
      options = {};
      return await this.sendRequest(this.endpoint + "getUpdates");
    }

    const qs = new URLSearchParams();

    for (const [key, value] of Object.entries(options)) {
      qs.append(key, value);
    }

    return await this.sendRequest(this.endpoint + "getUpdates", {
      body: qs,
      method: "POST",
    });
  }
}
