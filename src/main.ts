import { TelegramAPI } from "./structure/TelegramAPI";

const test = new TelegramAPI("");


(async () => {
    console.log(await test.getMe())
})()