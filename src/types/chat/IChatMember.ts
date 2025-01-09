import { IChatMemberAdministrator } from "./IChatMemberAdministrator";
import { IChatMemberBanned } from "./IChatMemberBanned";
import { IChatMemberLeft } from "./IChatMemberLeft";
import { IChatMemberMember } from "./IChatMemberMember";
import { IChatMemberOwner } from "./IChatMemberOwner";
import { IChatMemberRestricted } from "./IChatMemberRestricted";

export interface IChatMember {
    member: IChatMemberAdministrator | IChatMemberBanned | IChatMemberLeft | IChatMemberMember | IChatMemberOwner | IChatMemberRestricted
}