import { IMessageEntity } from "..";

export interface IReplyParameters {
  message_id: number;
  chat_id?: number | string;
  allow_sending_without_reply?: boolean;
  quote?: string;
  quote_parse_mode?: string;
  quote_entities?: IMessageEntity[];
  quote_position?: number;
}
