export interface User {
  name: string;
  id: string;
  email: string;
  emailVerified?: Date | null;
  password: string;
  role: string;
  image?: string | null;
}
