import { useState } from "react";
import { CommentItem } from "./CommentItem";
import { useEscClose } from "./UseEscClose";

{
  /* <!-- Полноэкранный показ изображения --> */
}
type Comment = {
  author: {
    avatarImg: string;
    name: string;
  };
  text: string;
};

export type Post = {
  id: number;
  url: string;
  avatarImg: string;
  name: string;
  description: string;
  likeAmount: number;
  comments: Comment[];
};

type ScreenImageProp = {
  selectedPost: Post;
  imgUrl: string;
  alt: string;
  commentsAmount: number;
  svgUrl: string;
  likesAmount: number;
  avatarUrl?: string;
  avatarAlt?: string;
  commentDescription?: string;
  nameAuthor: string;
  closeModalWindow: () => void;
};

export function FullScreenImageDisplay(props: ScreenImageProp) {
  const {
    selectedPost,
    imgUrl,
    alt,
    svgUrl,
    likesAmount,
    commentsAmount,
    nameAuthor,
    closeModalWindow,
  } = props;

  const [likeCount, setLikeCount] = useState(likesAmount);
  const [likeActive, setLikeActive] = useState(false);

  useEscClose(closeModalWindow);

  function showsNumberComments() {
    if (commentsAmount <= 5) {
      return commentsAmount;
    } else {
      return 5;
    }
  }

  function likesCounter() {
    const newLike = likesAmount + 1;
    setLikeActive(true);
    return setLikeCount(newLike);
  }

  return (
    <>
      <div className="big-picture__preview">
        {/* <!-- Просмотр изображения --> */}
        <div className="big-picture__img">
          <img src={imgUrl} alt={alt} width="600" height="600" />
        </div>

        {/* <!-- Информация об изображении. Подпись, комментарии, количество лайков --> */}
        <div className="big-picture__social  social">
          <div className="social__header">
            <img
              className="social__picture"
              src={svgUrl}
              alt={alt}
              width="35"
              height="35"
            />
            <p className="social__caption">{alt}</p>
            <p className="social__likes">
              Нравится{" "}
              <span
                className={`likes-count ${likeActive && "likes-count--active"}`}
                onClick={likesCounter}
              >
                {likeCount}
              </span>
            </p>
          </div>

          {/* <!-- Комментарии к изображению --> */}
          <div className="social__comment-count">
            <span className="social__comment-shown-count">
              {showsNumberComments()}
            </span>{" "}
            из{" "}
            <span className="social__comment-total-count">
              {commentsAmount}
            </span>{" "}
            комментариев
          </div>
          <ul className="social__comments">
            {selectedPost.comments
              .slice(0, showsNumberComments())
              .map((item, index) => {
                return (
                  <CommentItem
                    key={index}
                    avatarUrl={item.author.avatarImg}
                    avatarAlt={item.text}
                    commentDescription={item.text}
                  />
                );
              })}
          </ul>

          {/* <!-- Кнопка для загрузки новой порции комментариев --> */}
          <button
            className={`social__comments-loader  comments-loader ${
              commentsAmount <= 5 ? "hidden" : ""
            }`}
            type="button"
          >
            Загрузить еще
          </button>

          {/* <!-- Форма для отправки комментария --> */}
          <div className="social__footer">
            <img
              className="social__picture"
              src={svgUrl}
              alt={nameAuthor}
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
          onClick={closeModalWindow}
        >
          Закрыть
        </button>
      </div>
    </>
  );
}
