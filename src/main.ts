import { TelegramAPI } from "./structure/TelegramAPI";

const test = new TelegramAPI("");

test.on("message", (message) => console.log(message));

(async () => {
  // await test.getMe((data) => console.log(data));
  // await test.getUpdates({
  //   offset: 100,
  //   timeout: 10,
  // });
})();
