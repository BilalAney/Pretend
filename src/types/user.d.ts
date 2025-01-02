/** @format */

export interface user {
  id: string | number;
  created_at: Date | string;
  username: string;
  email: string;
  photo?: string | null;
  dob: Date | string;
  UID: string;
}
