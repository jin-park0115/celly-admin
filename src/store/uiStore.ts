export type UiState = {
  isSidebarOpen: boolean;
  activeModal: string | null;
};

export const uiStoreInitialState: UiState = {
  isSidebarOpen: true,
  activeModal: null,
};
