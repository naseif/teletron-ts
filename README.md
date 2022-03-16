# teletron-ts

Fast and Flexible Telegram Bot API Framework for Node.js written in TypeScript.

<!-- TOC -->

- [Features](#features)
- [Installation](#installation)
- [Loading and configuring the module](#importing)
- [Getting started](#getting-started)
- [Events](#telegram-events)
- [Examples](#examples)
  - [Sending Files](#sending-files)
  - [Inline Keyboards](#inline-keyboards)

<!-- /TOC -->

## Features

- Full Telegram Bot API 5.7 support
- Object-oriented
- Full types support
- Asynchronous
- Speedy and efficient
- Beginner friendly

## Installation

```
npm i teletron-ts
```

## Importing

### TypeScript

```ts
import * as telegram from "teletron-ts";

import { TelegramAPI } from "teletron-ts"; // Individual classes
```

### JavaScript

```js
const telegram = require("teletron-ts");

const { TelegramAPI } = require("teletron-ts"); // Individual classes
```

## Getting started

```ts
import { TelegramAPI } from "teletron-ts";

const telegram = new TelegramAPI("token"); // bot token api

// listen for the message event

telegram.onMessage(async (message) => {
  if (message.text === "Hi bot!")
    await telegram.sendMessage(message.chat.id, "Hi there, human!"); // sendMessage will return an instance of IMessage
});

// OR

telegram.on("message", async (message) => {
  if (message.text === "Hi bot!")
    await telegram.sendMessage(message.chat.id, "Hi there, human!"); // sendMessage will return an instance of IMessage
});

// fetch new updates from the api
telegram.startPolling();
```

## Telegram Events

Events you can listen to usign `teletron-ts`:

- message
- edited_message
- edited_channel_post
- channel_post
- inline_query
- chosen_inline_result
- callback_query
- shipping_query
- poll
- poll_answer
- chat_join_request

Please note that both `inline_query` and `chosen_inline_result` only work if you enabled this option by sending `/setinline` to `@BotFather`

For more information regarding inline queries visit the telegram docs [here](https://core.telegram.org/bots/inline)

## Examples

### Sending Files

There are 3 ways to send files. You can use the file id of a file that already exist on telegram servers, provide an HTTP URL to the file which then will be downloaded by telegram servers or upload a local file. Lets assume we want to send a photo via the bot:

```ts
import { TelegramAPI } from "teletron-ts";

const telegram = new TelegramAPI("token"); // bot token

telegram.on("message", async (message) => {
  // First Method: Using an already existing file_id of a file that has been previously uploaded on telegram
  await telegram.sendPhoto(
    message.chat.id,
    "AgADBQADqacxG2gbbxCWBkgvcmeAgxVPyjIABBlug37DKyhDEU0AAgI"
  );

  // Second Method: Using an HTTP photo url
  await telegram.sendPhoto(
    message.chat.id,
    "https://reshape.sport1.de/c/t/85599615-c80d-47f0-9179-4375d6e4fa93/976x549"
  );

  // Thrid Method: Using a local file
  await telegram.sendPhoto(message.chat.id, { file: "./anime.jpg" });
});

// fetch updates from the api
telegram.startPolling();
```

### Inline Keyboards

Inline keyboards are buttons that will be sent along with the message. These become especially useful if you want to wait for user input to perform certain action!

```ts
import { TelegramAPI } from "teletron-ts";
import { IInlineKeyboardMarkup } from "teletron-ts";

const telegram = new TelegramAPI("token");

telegram.on("message", async (m) => {
  const inlineKeyboards: IInlineKeyboardMarkup = {
    inline_keyboard: [
      [
        { text: "Very Good!", callback_data: "vgood" },
        { text: "Fine", callback_data: "fine" },
      ],
      [{ text: "Amazing", callback_data: "amazing" }],
    ],
  };

  await telegram.sendMessage(
    m.chat.id,
    "Hey there, how are you feeling today?",
    {
      reply_markup: JSON.stringify(inlineKeyboards),
    }
  );
});

telegram.on("callback_query", async (query) => {
  if (query.data && query.data === "vgood")
    return await telegram.sendMessage(
      query.message.chat.id,
      "I am feeling very good today too!"
    );
});
```

## Contributions

Software contributions are welcome. If you are not a dev, testing and reproting bugs can also be very helpful!

## Questions?

Please open an issue if you have questions, wish to request a feature, etc.
