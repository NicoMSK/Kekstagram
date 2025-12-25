type ButtonProps = {
  checkPressedButton: boolean;
  idButton: string;
  children: string;
};

export function Button(props: ButtonProps) {
  const { checkPressedButton, idButton, children } = props;

  return (
    <button
      className={`img-filters__button ${
        checkPressedButton && "img-filters__button--active"
      }`}
      type="button"
      id={idButton}
    >
      {children}
    </button>
  );
}
