import { Role } from "./role";

export class User {
    id: number;
    name: string;
    isValidator:boolean;
    role: Role;
    token?: string;
}