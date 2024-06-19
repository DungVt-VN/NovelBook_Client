export default interface User {
    id: string;
    userName: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber: string;
    lockoutEnd: string | null;
    roles: string[];
  }
  