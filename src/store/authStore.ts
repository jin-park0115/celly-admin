export type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
};

export const authStoreInitialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
};
