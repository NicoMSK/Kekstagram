import { useState } from "react";
import { FILTER_STATUS } from "../constants/constants";
import type { FilterStatus } from "../types/types";
import { Button } from "./Button";

type ImageFilterProps = {
  filterPosts: (curFilter: FilterStatus) => void;
};

export function ImageFilter(props: ImageFilterProps) {
  const { filterPosts } = props;

  const [currentFilter, setCurrentFilter] = useState<FilterStatus>("default");

  function changeFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!(e.target instanceof HTMLButtonElement)) return;

    const filter = e.target.id as FilterStatus;

    if (filter !== currentFilter) {
      setCurrentFilter(filter);
      filterPosts(filter);
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
        <Button
          checkPressedButton={currentFilter === FILTER_STATUS.default}
          idButton={FILTER_STATUS.default}
        >
          По умолчанию
        </Button>
        <Button
          checkPressedButton={currentFilter === FILTER_STATUS.random}
          idButton={FILTER_STATUS.random}
        >
          Случайные
        </Button>
        <Button
          checkPressedButton={currentFilter === FILTER_STATUS.discussed}
          idButton={FILTER_STATUS.discussed}
        >
          Обсуждаемые
        </Button>
      </form>
    </section>
  );
}
