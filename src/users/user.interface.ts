import { Role } from "./user.constant";

export type TUser = {
    name:string;
    email:string;
    password:string;
    phone:string;
    role: keyof typeof Role;
    address:string
}