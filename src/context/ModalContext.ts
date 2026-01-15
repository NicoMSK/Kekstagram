import { createContext } from "react";
import type { ModalState, ModalType } from "../types/types";

type ModalContextType = {
  curOpenModel: ModalState;
  openModal: (value: ModalType) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  curOpenModel: null,
  openModal: () => {},
  closeModal: () => {},
});
