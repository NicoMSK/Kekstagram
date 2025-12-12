import { useState, type ReactNode } from "react";
import { ModalContext } from "./ModalContext";

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    document.body.classList.add("modal-open");
    setIsOpen(true);
  }

  function closeModal() {
    document.body.classList.remove("modal-open");
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
