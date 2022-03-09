export interface IBotCommandScopeBase {
  /**
   * Scope type
   */
  type:
    | "default"
    | "all_private_chats"
    | "all_group_chats"
    | "all_chat_administrators"
    | "chat"
    | "chat_administrators";
}

export interface IBotCommandScopeChat extends IBotCommandScopeBase {
  /**
   * Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   */
  chat_id: string | number;
}

export interface IBotCommandScopeChatAdministrators
  extends IBotCommandScopeBase {
  /**
   * Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   */
  chat_id: string | number;
}

export interface IBotCommandScopeChatMember extends IBotCommandScopeBase {
  /**
   * Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
   */
  chat_id: string | number;
  /**
   * Unique identifier of the target user
   */
  user_id: number;
}
