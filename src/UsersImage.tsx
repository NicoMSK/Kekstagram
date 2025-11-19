{
  /* <!-- Шаблон изображения случайного пользователя --> */
}

type UsersImageProps = {
  imgUrl: string;
  alt: string;
};

export function UsersImage(props: UsersImageProps) {
  const { imgUrl, alt } = props;

  return (
    <a className="picture" href="#">
      <img
        className="picture__img"
        src={imgUrl}
        width="182"
        height="182"
        alt={alt}
      />
      <p className="picture__info">
        <span className="picture__comments"></span>
        <span className="picture__likes"></span>
      </p>
    </a>
  );
}
