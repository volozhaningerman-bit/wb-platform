export type UserRole = "USER" | "ADMIN";

export type Plan = "FREE" | "FULL";

export interface User {
 id:string;
 email:string;
 name?:string;
 role:UserRole;
}

export interface Workspace {
 id:string;
 name:string;
 ownerId:string;
}

export interface WbAccount {
 id:string;
 name:string;
 connected:boolean;
 lastSync?:string;
}

export interface Plugin {
 id:string;
 name:string;
 enabled:boolean;
}

export interface Subscription {
 plan:Plan;
 active:boolean;
}
