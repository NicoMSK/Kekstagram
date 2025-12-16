import { useState } from "react";

export function ImageFilter() {
  const idFilter = {
    default: "default",
    random: "random",
    discussed: "discussed",
  };
  const [currentFilter, setCurrentFilter] = useState("default");

  function changeFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!(e.target instanceof HTMLButtonElement)) return;

    if (e.target.id !== currentFilter) {
      setCurrentFilter(e.target.id);
    }
  }

  return (
    <section className="img-filters  img-filters--inactive  container">
      <h2 className="img-filters__title  visually-hidden">Фильтр фотографий</h2>
      <form
        className="img-filters__form"
        action="index.html"
        method="get"
        autoComplete="off"
        onClick={(e) => changeFilter(e)}
      >
        <button
          className={`img-filters__button  ${
            currentFilter === idFilter.default && "img-filters__button--active"
          }`}
          type="button"
          id={idFilter.default}
        >
          По умолчанию
        </button>
        <button
          className={`img-filters__button  ${
            currentFilter === idFilter.random && "img-filters__button--active"
          }`}
          type="button"
          id={idFilter.random}
        >
          Случайные
        </button>
        <button
          className={`img-filters__button  ${
            currentFilter === idFilter.discussed &&
            "img-filters__button--active"
          }`}
          type="button"
          id={idFilter.discussed}
        >
          Обсуждаемые
        </button>
      </form>
    </section>
  );
}
