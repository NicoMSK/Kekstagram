{
  /* <!-- Фильтрация изображений от других пользователей --> */
}

export function ImageFilter() {
  return (
    <section className="img-filters  img-filters--inactive  container">
      <h2 className="img-filters__title  visually-hidden">Фильтр фотографий</h2>
      <form
        className="img-filters__form"
        action="index.html"
        method="get"
        autoComplete="off"
      >
        <button
          className="img-filters__button  img-filters__button--active"
          type="button"
          id="filter-default"
        >
          По умолчанию
        </button>
        <button
          className="img-filters__button"
          type="button"
          id="filter-random"
        >
          Случайные
        </button>
        <button
          className="img-filters__button"
          type="button"
          id="filter-discussed"
        >
          Обсуждаемые
        </button>
      </form>
    </section>
  );
}
