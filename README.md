# teletron-ts

Fast and Flexible Telegram Bot API Framework for Node.js written in TypeScript.

## Features

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
  if (message.text === "Hi")
    await telegram.sendMessage(message.chat.id, "Hi there!"); // sendMessage will return an instance on IMessage
});

// fetch new updates from the api
telegram.startPolling();
```

## Contributions

Software contributions are welcome. If you are not a dev, testing and reproting bugs can also be very helpful!

## Questions?

Please open an issue if you have questions, wish to request a feature, etc.
