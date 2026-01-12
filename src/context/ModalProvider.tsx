import { useState, type ReactNode } from "react";
import { ModalContext } from "./ModalContext";
import type { ModalState, ModalType } from "../types/types";

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<ModalState>(null);

  function openModal(value: ModalType) {
    document.body.classList.add("modal-open");
    setIsOpen(value);
  }

  function closeModal() {
    document.body.classList.remove("modal-open");
    setIsOpen(null);
  }

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
