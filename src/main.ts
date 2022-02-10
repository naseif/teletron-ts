import { TelegramAPI } from "./structure/TelegramAPI";

const test = new TelegramAPI("");

(async () => {
  await test.getMe((data) => console.log(data));
  console.log(
    await test.getUpdates({
      offset: 100,
      timeout: 10,
    })
  );
})();
