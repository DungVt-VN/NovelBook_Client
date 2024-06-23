export default interface User {
    id: string;
    userName: string;
    email: string;
    emailConfirmed: number; 
    phoneNumber: string;
    lockoutEnd: number;
    roles: string[];
  }
  