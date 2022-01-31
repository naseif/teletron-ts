import EventEmitter from "eventemitter3"
import fetch, { Response } from "node-fetch"
import { Message } from "../types/IMessage";
import { IUpdateOptions } from "../types/IUpdateOptions";
import { IUser } from "../types/IUser";

export class TelegramAPI extends EventEmitter {
    private _token: string;
    private endpoint: string
    constructor(token: string) {
        super();
        this._token = token;
        this.endpoint = "https://api.telegram.org"
    }


    private async sendGETRequest(apiMethod: string) {
        const get = await fetch(`${this.endpoint}/bot${this._token}/${apiMethod}`)
        const { result } = await get.json();

        return result
    }


    async getMe(): Promise<IUser> {
        let result: IUser
        const fetch = await this.sendGETRequest("getMe");
        result = fetch
        return result
    }

    async getUpdates(options?: IUpdateOptions, callback?: (updates: any) => void) {
        if (!options) options = {};

        return await this.sendGETRequest("getUpdates")
    }

}