export { TelegramAPI } from "./TelegramAPI";
export {
  TMessageCallback,
  TInlineQueryCallback,
  TChosenInlineResultCallback,
  TCallbackQueryCallback,
  TShippingQueryCallback,
  TPreCheckoutQueryCallback,
  TPollCallback,
  TPollAnswerCallback,
  TOnError,
  IMessageId,
} from "./types";

export {
  sendPollOptions,
  sendMessageOptions,
  forwardMessageOptions,
  copyMessageOptions,
  sendPhotoOptions,
  sendAudioOptions,
  sendVideoOptions,
  sendDocumentOptions,
} from "./methodsOptions";
