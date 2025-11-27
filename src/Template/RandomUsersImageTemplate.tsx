{
  /* <!-- Шаблон изображения случайного пользователя --> */
}

export function RandomUsersImageTemplate() {
  return (
    <template id="picture">
      <a className="picture" href="#">
        <img
          className="picture__img"
          src=""
          width="182"
          height="182"
          alt="Случайная фотография"
        />
        <p className="picture__info">
          <span className="picture__comments"></span>
          <span className="picture__likes"></span>
        </p>
      </a>
    </template>
  );
}
