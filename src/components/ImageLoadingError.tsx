export function ImageLoadingError() {
  return (
    <section className="error">
      <div className="error__inner">
        <h2 className="error__title">Ошибка загрузки файла</h2>
        <button className="error__button" type="button">
          Попробовать ещё раз
        </button>
      </div>
    </section>
  );
}
