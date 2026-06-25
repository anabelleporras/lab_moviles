export type AuthProvider = "google" | "password";

export type UserInfo = {
  uid?: string;
  name?: string;
  email?: string;
  picture?: string;
  provider?: AuthProvider;
};
