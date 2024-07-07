export default interface User {
    id: string;
    userName: string;
    email: string;
    emailConfirmed: boolean; 
    phoneNumber: string;
    lockoutEnd: number;
    roles: string[];
    isChanged: number;
  }
  