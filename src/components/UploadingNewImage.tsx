import { useState } from "react";
import { useModal } from "../context/useModal.ts";
import { useEscClose } from "../hooks/useEscClose";

const MAX_TEXT_LENGTH = 142;
const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;

type UploadImageProp = {
  addNewPost: (
    textAreaValue: string,
    authorName: string,
    urlImage: string,
  ) => void;
};

type FilterOptions =
  | "none"
  | "grayscale"
  | "sepia"
  | "invert"
  | "blur"
  | "brightness";

export function UploadingNewImage(props: UploadImageProp) {
  const { curOpenModel, openModal, closeModal } = useModal();
  const [textareaValue, setTextareaValue] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [urlImage, setUrlImage] = useState<string | null>(null);
  const [scaleControlValue, setScaleControlValue] = useState(DEFAULT_SCALE);
  const [effectImage, setEffectImage] = useState("none");
  const [isEmptyValue, setIsEmptyValue] = useState(false);
  const { addNewPost } = props;

  const isTextareaError = textareaValue.length > MAX_TEXT_LENGTH;

  function closeModalNewPost() {
    setTextareaValue("");
    setAuthorName("");
    setScaleControlValue(DEFAULT_SCALE);
    setIsEmptyValue(false);
    setEffectImage("none");
    closeModal();
  }

  useEscClose(closeModalNewPost);

  function loadingNewImage(event: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    const files = event.target.files;

    reader.onload = function () {
      if (typeof reader.result === "string") {
        setUrlImage(reader.result);
      }
    };

    if (!files || files.length === 0) return;

    reader.readAsDataURL(files[0]);
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    openModal("upLoadImage");
    loadingNewImage(event);
  }

  const handleAddNewPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (authorName.trim().length === 0 || textareaValue.trim().length === 0) {
      setIsEmptyValue(true);
      return;
    }

    if (!urlImage) {
      console.error("Картинка не найдена");
      return;
    }

    addNewPost(textareaValue, authorName, urlImage);
    closeModalNewPost();
  };

  function scaleControlImage(buttonType: string) {
    if (buttonType === "smaller") {
      if (
        scaleControlValue > SCALE_STEP &&
        scaleControlValue <= DEFAULT_SCALE
      ) {
        setScaleControlValue((prev) => prev - SCALE_STEP);
      }
    } else {
      if (
        scaleControlValue <= DEFAULT_SCALE &&
        scaleControlValue !== DEFAULT_SCALE
      ) {
        setScaleControlValue((prev) => prev + SCALE_STEP);
      }
    }
  }

  function changeImageEffect(effectType: FilterOptions) {
    const effects = {
      none: "none",
      grayscale: "grayscale(1)",
      sepia: "sepia(1)",
      invert: "invert(100%)",
      blur: "blur(10px)",
      brightness: "brightness(3)",
    };

    setEffectImage(effects[effectType]);
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
          onSubmit={(e) => handleAddNewPost(e)}
        >
          <fieldset className="img-upload__start">
            <input
              className="img-upload__input  visually-hidden"
              type="file"
              id="upload-file"
              name="filename"
              required
              onChange={(e) => handleImageUpload(e)}
            />
            <label
              className="img-upload__label  img-upload__control"
              htmlFor="upload-file"
            >
              Загрузить
            </label>
          </fieldset>
          <div
            className={`img-upload__overlay  ${
              curOpenModel !== "upLoadImage" && "hidden"
            }`}
            onClick={(e) => e.currentTarget === e.target && closeModalNewPost()}
          >
            <div className="img-upload__wrapper">
              <div className="img-upload__preview-container">
                <fieldset className="img-upload__scale  scale">
                  <button
                    className="scale__control  scale__control--smaller"
                    type="button"
                    onClick={() => scaleControlImage("smaller")}
                  >
                    Уменьшить
                  </button>
                  <input
                    className="scale__control  scale__control--value"
                    type="text"
                    value={`${scaleControlValue} %`}
                    title="Image Scale"
                    name="scale"
                    readOnly
                  />
                  <button
                    className="scale__control  scale__control--bigger"
                    type="button"
                    onClick={() => scaleControlImage("bigger")}
                  >
                    Увеличить
                  </button>
                </fieldset>
                <div className="img-upload__preview">
                  {urlImage && (
                    <img
                      src={urlImage}
                      style={{
                        transform: `scale(${scaleControlValue / 100})`,
                        filter: `${effectImage}`,
                      }}
                    />
                  )}
                </div>
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
                <button
                  className="img-upload__cancel  cancel"
                  type="reset"
                  id="upload-cancel"
                  onClick={closeModalNewPost}
                >
                  Закрыть
                </button>
              </div>
              <fieldset className="img-upload__effects  effects">
                <ul className="effects__list">
                  <li className="effects__item">
                    <input
                      className="effects__radio  visually-hidden"
                      type="radio"
                      name="effect"
                      id="effect-none"
                      value="none"
                      checked={effectImage === "none"}
                      onChange={() => changeImageEffect("none")}
                    />
                    <label
                      className="effects__label"
                      htmlFor="effect-none"
                    >
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
                      checked={effectImage === "grayscale"}
                      onChange={() => changeImageEffect("grayscale")}
                    />
                    <label
                      className="effects__label"
                      htmlFor="effect-chrome"
                    >
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
                      checked={effectImage === "sepia"}
                      onChange={() => changeImageEffect("sepia")}
                    />
                    <label
                      className="effects__label"
                      htmlFor="effect-sepia"
                    >
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
                      checked={effectImage === "invert"}
                      onChange={() => changeImageEffect("invert")}
                    />
                    <label
                      className="effects__label"
                      htmlFor="effect-marvin"
                    >
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
                      checked={effectImage === "blur"}
                      onChange={() => changeImageEffect("blur")}
                    />
                    <label
                      className="effects__label"
                      htmlFor="effect-phobos"
                    >
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
                      checked={effectImage === "brightness"}
                      onChange={() => changeImageEffect("brightness")}
                    />
                    <label
                      className="effects__label"
                      htmlFor="effect-heat"
                    >
                      <span className="effects__preview  effects__preview--heat">
                        Превью эффекта Зной
                      </span>
                      Зной
                    </label>
                  </li>
                </ul>
              </fieldset>
              <fieldset className="img-upload__text text">
                <div className="img-upload__field-wrapper">
                  <input
                    className="text__hashtags"
                    name="hashtags"
                    placeholder="Ваше имя..."
                    value={authorName}
                    onChange={(e) => {
                      setAuthorName(e.target.value);
                    }}
                  />
                  {isEmptyValue && (
                    <span className="text__hashtags-error">
                      Поле Имя или описание не может быть пустым
                    </span>
                  )}
                </div>
                <div className="img-upload__field-wrapper">
                  <textarea
                    className="text__description"
                    name="description"
                    placeholder="Ваше описание..."
                    value={textareaValue}
                    onChange={(e) => {
                      setTextareaValue(e.target.value);
                    }}
                  ></textarea>
                  <span
                    className={`text__count ${
                      isTextareaError && "text__count--error"
                    }`}
                  >
                    {textareaValue.length}/{MAX_TEXT_LENGTH} символов
                  </span>
                </div>
              </fieldset>
              <button
                className="img-upload__submit"
                type="submit"
                id="upload-submit"
                disabled={isTextareaError}
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
