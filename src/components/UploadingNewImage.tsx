import { useState } from "react";
import { useModal } from "../context/useModal.ts";
import { useEscClose } from "../hooks/useEscClose";
import { EffectsItem } from "./Effect.tsx";

const MAX_TEXT_LENGTH = 142;
const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;

export const EFFECTS = {
  none: "none",
  grayscale: "grayscale(1)",
  sepia: "sepia(1)",
  invert: "invert(100%)",
  blur: "blur(10px)",
  brightness: "brightness(3)",
} as const;

export type FilterOptions = keyof typeof EFFECTS;
export type FilterValues = (typeof EFFECTS)[keyof typeof EFFECTS];

type ButtonType = "smaller" | "bigger";
export type ScaleType = 25 | 50 | 75 | 100;

export type AddNewPostType = {
  descriptionImage: string;
  authorName: string;
  urlImage: string;
  scaleControlValue: ScaleType;
  effectImage: FilterValues;
};

type UploadImageProp = {
  addNewPost: (data: AddNewPostType) => void;
};

export function UploadingNewImage(props: UploadImageProp) {
  const { curOpenModel, openModal, closeModal } = useModal();
  const [descriptionImage, setDescriptionImage] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [urlImage, setUrlImage] = useState<string | null>(null);
  const [scaleControlValue, setScaleControlValue] =
    useState<ScaleType>(DEFAULT_SCALE);
  const [effectImage, setEffectImage] = useState<FilterValues>(EFFECTS.none);
  const [isEmptyValue, setIsEmptyValue] = useState(false);
  const { addNewPost } = props;

  const isDescriptionImageError = descriptionImage.length > MAX_TEXT_LENGTH;

  function closeModalNewPost() {
    setDescriptionImage("");
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

    if (
      authorName.trim().length === 0 ||
      descriptionImage.trim().length === 0
    ) {
      setIsEmptyValue(true);
      return;
    }

    if (!urlImage) {
      console.error("Картинка не найдена");
      return;
    }

    addNewPost({
      descriptionImage,
      authorName,
      urlImage,
      scaleControlValue,
      effectImage,
    });
    closeModalNewPost();
  };

  function scaleControlImage(buttonType: ButtonType) {
    if (buttonType === "smaller") {
      if (
        scaleControlValue > SCALE_STEP &&
        scaleControlValue <= DEFAULT_SCALE
      ) {
        setScaleControlValue((prev) => (prev - SCALE_STEP) as ScaleType);
      }
    } else {
      if (
        scaleControlValue <= DEFAULT_SCALE &&
        scaleControlValue !== DEFAULT_SCALE
      ) {
        setScaleControlValue((prev) => (prev + SCALE_STEP) as ScaleType);
      }
    }
  }

  const EFFECT_PARAMETRES = [
    {
      value: "none",
      description: "Превью фото без эффекта",
      name: "Оригинал",
      selected: effectImage,
      defaultEffect: EFFECTS.none,
    },
    {
      value: "chrome",
      description: "Превью эффекта Хром",
      name: "Хром",
      selected: effectImage,
      defaultEffect: EFFECTS.grayscale,
    },
    {
      value: "sepia",
      description: "Превью эффекта Сепия",
      name: "Сепия",
      selected: effectImage,
      defaultEffect: EFFECTS.sepia,
    },
    {
      value: "invert",
      description: "Превью эффекта Марвин",
      name: "Марвин",
      selected: effectImage,
      defaultEffect: EFFECTS.invert,
    },
    {
      value: "phobos",
      description: "Превью эффекта Фобос",
      name: "Фобос",
      selected: effectImage,
      defaultEffect: EFFECTS.blur,
    },
    {
      value: "heat",
      description: "Превью эффекта Зной",
      name: "Зной",
      selected: effectImage,
      defaultEffect: EFFECTS.brightness,
    },
  ];

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
                      width="600"
                      height="600"
                      style={{
                        transform: `scale(${scaleControlValue / 100})`,
                        filter: `${effectImage}`,
                      }}
                    />
                  )}
                </div>
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
                  {EFFECT_PARAMETRES.map((effect) => {
                    return (
                      <EffectsItem
                        key={effect.value}
                        value={effect.value}
                        description={effect.description}
                        name={effect.name}
                        selected={effect.selected}
                        defaultEffect={effect.defaultEffect}
                        changeFilterEffect={() =>
                          setEffectImage(effect.defaultEffect)
                        }
                      />
                    );
                  })}
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
                    value={descriptionImage}
                    onChange={(e) => {
                      setDescriptionImage(e.target.value);
                    }}
                  ></textarea>
                  <span
                    className={`text__count ${
                      isDescriptionImageError && "text__count--error"
                    }`}
                  >
                    {descriptionImage.length}/{MAX_TEXT_LENGTH} символов
                  </span>
                </div>
              </fieldset>
              <button
                className="img-upload__submit"
                type="submit"
                id="upload-submit"
                disabled={isDescriptionImageError}
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
