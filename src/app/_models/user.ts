import { Role } from "./role";

export class User {
    id: number;
   name: string;
    isValidator:boolean;
    /////for fake backend
    username: string;
    password: string;
    role: Role;
    token?: string;
}