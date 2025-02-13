export interface User {
    userName: string;
    password: string;
    email: string;
    locked: boolean;
    disabled: boolean;
    role: Role;
  }
  
  export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
  }
  