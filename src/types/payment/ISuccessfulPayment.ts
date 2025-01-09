import { IOrderInfo } from "./IOrderInfo";
/**
 * This object contains basic information about a successful payment.
 */

export interface ISuccessfulPayment {
  /**
   * Three-letter ISO 4217 currency code
   */
  currency: string;
  /**
   * Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
   */
  total_amount: number;
  /**
   * Bot specified invoice payload
   */
  invoice_payload: string;
  /**
   * Optional. Identifier of the shipping option chosen by the user
   */
  shipping_option_id?: string;
  /**
   * Optional. Order info provided by the user
   */
  order_info?: IOrderInfo;
  /**
   * Telegram payment identifier
   */
  telegram_payment_charge_id: string;
  /**
   * Provider payment identifier
   */
  provider_payment_charge_id: string;

  /**
   * Optional. Expiration date of the subscription, in Unix time; for recurring payments only
   */
  subscription_expiration_date?: number;
  /**
   * Optional. True, if the payment is a recurring payment for a subscription
   */
  is_recurring?: boolean;
  /**
   * Optional. True, if the payment is the first payment for a subscription
   */
  is_first_recurring?: boolean;
}
