{
  /* <!-- Полноэкранный показ изображения --> */
}

export function FullScreenImageDisplay() {
  return (
    <section className="big-picture  overlay  hidden">
      <h2 className="big-picture__title  visually-hidden">
        Просмотр фотографии
      </h2>
      <div className="big-picture__preview">
        {/* <!-- Просмотр изображения --> */}
        <div className="big-picture__img">
          <img
            src="./img/logo-background-3.jpg"
            alt="Девушка в купальнике"
            width="600"
            height="600"
          />
        </div>

        {/* <!-- Информация об изображении. Подпись, комментарии, количество лайков --> */}
        <div className="big-picture__social  social">
          <div className="social__header">
            <img
              className="social__picture"
              src="./img/avatar-1.svg"
              alt="Аватар автора фотографии"
              width="35"
              height="35"
            />
            <p className="social__caption">Тестим новую камеру! =)</p>
            <p className="social__likes">
              Нравится <span className="likes-count">356</span>
            </p>
          </div>

          {/* <!-- Комментарии к изображению --> */}
          <div className="social__comment-count">
            <span className="social__comment-shown-count">5</span> из{" "}
            <span className="social__comment-total-count">125</span>{" "}
            комментариев
          </div>
          <ul className="social__comments">
            <li className="social__comment">
              <img
                className="social__picture"
                src="./img/avatar-4.svg"
                alt="Аватар комментатора фотографии"
                width="35"
                height="35"
              />
              <p className="social__text">
                Мега фото! Просто обалдеть. Как вам так удалось?
              </p>
            </li>
            <li className="social__comment">
              <img
                className="social__picture"
                src="./img/avatar-3.svg"
                alt="Аватар комментатора фотографии"
                width="35"
                height="35"
              />
              <p className="social__text">Да это фотAшоп!!!!!!!!</p>
            </li>
          </ul>

          {/* <!-- Кнопка для загрузки новой порции комментариев --> */}
          <button
            className="social__comments-loader  comments-loader"
            type="button"
          >
            Загрузить еще
          </button>

          {/* <!-- Форма для отправки комментария --> */}
          <div className="social__footer">
            <img
              className="social__picture"
              src="./img/avatar-6.svg"
              alt="Аватар комментатора фотографии"
              width="35"
              height="35"
            />
            <input
              className="social__footer-text"
              type="text"
              placeholder="Ваш комментарий..."
            />
            <button className="social__footer-btn" type="button" name="button">
              Отправить
            </button>
          </div>
        </div>

        {/* <!-- Кнопка для выхода из полноэкранного просмотра изображения --> */}
        <button
          className="big-picture__cancel  cancel"
          type="reset"
          id="picture-cancel"
        >
          Закрыть
        </button>
      </div>
    </section>
  );
}
