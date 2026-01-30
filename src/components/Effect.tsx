import type { FilterValues } from "./UploadingNewImage";

type EffectType = {
  valueEffect: string;
  descriptionEffect: string;
  nameEffect: string;
  checkedEffect: FilterValues;
  defaultEffect: FilterValues;
  chengeFilterEffect: () => void;
};

export function EffectsItem(props: EffectType) {
  const {
    valueEffect,
    descriptionEffect,
    nameEffect,
    checkedEffect,
    defaultEffect,
    chengeFilterEffect,
  } = props;

  return (
    <li className="effects__item">
      <input
        className="effects__radio  visually-hidden"
        type="radio"
        name="effect"
        id={`effect-${valueEffect}`}
        value={`${valueEffect}`}
        checked={checkedEffect === defaultEffect}
        onChange={chengeFilterEffect}
      />
      <label
        className="effects__label"
        htmlFor={`effect-${valueEffect}`}
      >
        <span className={`effects__preview  effects__preview--${valueEffect}`}>
          {descriptionEffect}
        </span>
        {nameEffect}
      </label>
    </li>
  );
}
