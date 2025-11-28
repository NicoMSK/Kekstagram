type UsersImageProps = {
  imgUrl: string;
  alt: string;
  commentsAmount: number;
  likesAmount: number;
  onClick: () => void;
};

export function UsersImage(props: UsersImageProps) {
  const { imgUrl, alt, commentsAmount, likesAmount, onClick } = props;

  return (
    <a className="picture" href="#" onClick={onClick}>
      <img
        className="picture__img"
        src={imgUrl}
        width="182"
        height="182"
        alt={alt}
      />
      <p className="picture__info">
        <span className="picture__comments">{commentsAmount}</span>
        <span className="picture__likes">{likesAmount}</span>
      </p>
    </a>
  );
}
