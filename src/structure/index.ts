export { TelegramAPI } from "./TelegramAPI";
export { TelegramAPITest } from "./TelegramAPITest";
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
  LocalFile,
  ActionType,
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
  sendAnimationOptions,
  sendVoiceOptions,
  sendVideoNoteOptions,
  sendMediaGroupOptions,
  sendLocationOptions,
  editMessageLiveLocationOptions,
  stopMessageLiveLocationOptions,
  sendVenueOptions,
  sendContactOptions,
  sendDiceOptions,
  getUserProfilePhotosOptions,
} from "./methodsOptions";
