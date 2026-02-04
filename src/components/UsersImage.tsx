import type { FilterValues } from "./UploadingNewImage";

type UsersImageProps = {
  imgUrl: string;
  alt: string;
  commentsAmount: number;
  likesAmount: number;
  effectsImg: FilterValues;
  onClick: () => void;
};

export function UsersImage(props: UsersImageProps) {
  const { imgUrl, alt, commentsAmount, likesAmount, effectsImg, onClick } =
    props;

  return (
    <a
      className="picture"
      href="#"
      onClick={onClick}
    >
      <img
        className="picture__img"
        src={imgUrl}
        width="182"
        height="182"
        style={{ filter: `${effectsImg}` }}
        alt={alt}
      />
      <p className="picture__info">
        <span className="picture__comments">{commentsAmount}</span>
        <span className="picture__likes">{likesAmount}</span>
      </p>
    </a>
  );
}
