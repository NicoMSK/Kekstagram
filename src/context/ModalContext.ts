import { createContext } from "react";
import type { ModalType } from "../types/types";

type ModalContextType = {
  isOpen: ModalType | null;
  openModal: (value: ModalType) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: null,
  openModal: () => {},
  closeModal: () => {},
});
