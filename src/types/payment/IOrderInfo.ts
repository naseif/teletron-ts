import { IShippingAddress } from "./IShippingAddress";

/**
 * This object represents information about an order.
 */
export interface IOrderInfo {
  /**
   * Optional. User name
   */
  name?: string;
  /**
   * Optional. User's phone number
   */
  phone_number?: string;
  /**
   * Optional. User email
   */
  email?: string;
  /**
   * Optional. User shipping address
   */
  shipping_address?: IShippingAddress;
}
