type SetBool = React.Dispatch<React.SetStateAction<boolean>>;

export function openModal(setFunction: SetBool) {
  document.body.classList.add("modal-open");
  setFunction(true);
}

export function closeModal(setFunction: SetBool) {
  document.body.classList.remove("modal-open");
  setFunction(false);
}
