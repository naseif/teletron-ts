export interface IUpdateOptions {
    /**
     * Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers of previously received updates
     */
    offset?: number;

    /**
     * Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100.
     */

    limit?: number;

    /**
     * Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only.
     */

    timeout?: number;

    /**
     * A JSON-serialized list of the update types you want your bot to receive. For example, specify [“message”, “edited_channel_post”, “callback_query”] to only receive updates of these types.
     */
    allowed_updates?: string[];
}