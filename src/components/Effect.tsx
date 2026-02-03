import type { FilterValues } from "./UploadingNewImage";

type EffectsItemProps = {
  value: string;
  description: string;
  name: string;
  selected: FilterValues;
  defaultEffect: FilterValues;
  changeFilterEffect: (defaultEffect: FilterValues) => void;
};

export function EffectsItem(props: EffectsItemProps) {
  const {
    value,
    description,
    name,
    selected,
    defaultEffect,
    changeFilterEffect,
  } = props;

  return (
    <li className="effects__item">
      <input
        className="effects__radio  visually-hidden"
        type="radio"
        name="effect"
        id={`effect-${value}`}
        value={`${value}`}
        checked={selected === defaultEffect}
        onChange={() => changeFilterEffect(defaultEffect)}
      />
      <label
        className="effects__label"
        htmlFor={`effect-${value}`}
      >
        <span className={`effects__preview  effects__preview--${value}`}>
          {description}
        </span>
        {name}
      </label>
    </li>
  );
}
