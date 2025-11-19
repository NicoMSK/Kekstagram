import { useState } from "react";

{
  /* <!-- Поле для загрузки нового изображения на сайт --> */
}

export function UploadingNewImage() {
  const [editImage, setEditImage] = useState(false);

  function openImageEditing() {
    document.body.classList.add("modal-open");
    setEditImage(true);
  }

  function closeEditingWindow() {
    document.body.classList.remove("modal-open");
    setEditImage(false);
  }

  function closeEditingWindowEsc(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      closeEditingWindow();
    }
  }
  ///???
  function closeOnBackDropClick(event) {
    const currentTarget = event.currentTarget;
    const target = event.target;
    const isClickedOnBackDrop = target === currentTarget;
    if (isClickedOnBackDrop) {
      console.log("click???");
      closeEditingWindow();
    }
  }

  return (
    <section className="img-upload">
      <div className="img-upload__wrapper">
        <h2 className="img-upload__title  visually-hidden">
          Загрузка фотографии
        </h2>
        <form
          className="img-upload__form"
          id="upload-select-image"
          autoComplete="off"
        >
          {/* <!-- Изначальное состояние поля для загрузки изображения --> */}
          <fieldset className="img-upload__start">
            <input
              className="img-upload__input  visually-hidden"
              type="file"
              id="upload-file"
              name="filename"
              required
              onChange={(e) => {
                closeOnBackDropClick(e);
                openImageEditing();
              }}
              onKeyDown={closeEditingWindowEsc}
            />
            <label
              className="img-upload__label  img-upload__control"
              htmlFor="upload-file"
            >
              Загрузить
            </label>
          </fieldset>

          {/* <!-- Форма редактирования изображения --> */}
          <div className={`img-upload__overlay  ${editImage ? "" : "hidden"}`}>
            <div className="img-upload__wrapper">
              <div className="img-upload__preview-container">
                {/* <!-- Изменение размера изображения --> */}
                <fieldset className="img-upload__scale  scale">
                  <button
                    className="scale__control  scale__control--smaller"
                    type="button"
                  >
                    Уменьшить
                  </button>
                  <input
                    className="scale__control  scale__control--value"
                    type="text"
                    value="100%"
                    title="Image Scale"
                    name="scale"
                    readOnly
                  />
                  <button
                    className="scale__control  scale__control--bigger"
                    type="button"
                  >
                    Увеличить
                  </button>
                </fieldset>

                {/* <!-- Предварительный просмотр изображения --> */}
                <div className="img-upload__preview">
                  <img src="" alt="Предварительный просмотр фотографии" />
                </div>

                {/* <!-- Изменение глубины эффекта, накладываемого на изображение --> */}
                <fieldset className="img-upload__effect-level  effect-level">
                  <input
                    className="effect-level__value"
                    type="number"
                    step="any"
                    name="effect-level"
                    value=""
                  />
                  <div className="effect-level__slider"></div>
                </fieldset>

                {/* <!-- Кнопка для закрытия формы редактирования изображения --> */}
                <button
                  className="img-upload__cancel  cancel"
                  type="reset"
                  id="upload-cancel"
                  onClick={closeEditingWindow}
                >
                  Закрыть
                </button>
              </div>

              {/* <!-- Наложение эффекта на изображение --> */}
              <fieldset className="img-upload__effects  effects">
                <ul className="effects__list">
                  <li className="effects__item">
                    <input
                      className="effects__radio  visually-hidden"
                      type="radio"
                      name="effect"
                      id="effect-none"
                      value="none"
                      checked
                    />
                    <label className="effects__label" htmlFor="effect-none">
                      <span className="effects__preview  effects__preview--none">
                        Превью фото без эффекта
                      </span>
                      Оригинал
                    </label>
                  </li>
                  <li className="effects__item">
                    <input
                      className="effects__radio  visually-hidden"
                      type="radio"
                      name="effect"
                      id="effect-chrome"
                      value="chrome"
                    />
                    <label className="effects__label" htmlFor="effect-chrome">
                      <span className="effects__preview  effects__preview--chrome">
                        Превью эффекта Хром
                      </span>
                      Хром
                    </label>
                  </li>
                  <li className="effects__item">
                    <input
                      className="effects__radio  visually-hidden"
                      type="radio"
                      name="effect"
                      id="effect-sepia"
                      value="sepia"
                    />
                    <label className="effects__label" htmlFor="effect-sepia">
                      <span className="effects__preview  effects__preview--sepia">
                        Превью эффекта Сепия
                      </span>
                      Сепия
                    </label>
                  </li>
                  <li className="effects__item">
                    <input
                      className="effects__radio  visually-hidden"
                      type="radio"
                      name="effect"
                      id="effect-marvin"
                      value="marvin"
                    />
                    <label className="effects__label" htmlFor="effect-marvin">
                      <span className="effects__preview  effects__preview--marvin">
                        Превью эффекта Марвин
                      </span>
                      Марвин
                    </label>
                  </li>
                  <li className="effects__item">
                    <input
                      className="effects__radio  visually-hidden"
                      type="radio"
                      name="effect"
                      id="effect-phobos"
                      value="phobos"
                    />
                    <label className="effects__label" htmlFor="effect-phobos">
                      <span className="effects__preview  effects__preview--phobos">
                        Превью эффекта Фобос
                      </span>
                      Фобос
                    </label>
                  </li>
                  <li className="effects__item">
                    <input
                      className="effects__radio  visually-hidden"
                      type="radio"
                      name="effect"
                      id="effect-heat"
                      value="heat"
                    />
                    <label className="effects__label" htmlFor="effect-heat">
                      <span className="effects__preview  effects__preview--heat">
                        Превью эффекта Зной
                      </span>
                      Зной
                    </label>
                  </li>
                </ul>
              </fieldset>

              {/* <!-- Добавление хэштегов и комментария к изображению --> */}
              <fieldset className="img-upload__text text">
                <div className="img-upload__field-wrapper">
                  <input
                    className="text__hashtags"
                    name="hashtags"
                    placeholder="#ХэшТег"
                  />
                </div>
                <div className="img-upload__field-wrapper">
                  <textarea
                    className="text__description"
                    name="description"
                    placeholder="Ваш комментарий..."
                  ></textarea>
                </div>
              </fieldset>

              {/* <!-- Кнопка для отправки данных на сервер --> */}
              <button
                className="img-upload__submit"
                type="submit"
                id="upload-submit"
              >
                Опубликовать
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
