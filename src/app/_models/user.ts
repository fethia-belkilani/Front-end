import { Role } from "./role";

export class User {
    id: number;
   username: string;
    isValidator:boolean;
    /////for fake backend
    password: string;
    role: Role;
    token?: string;
}