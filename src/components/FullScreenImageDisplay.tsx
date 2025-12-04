import { CommentItem } from "./CommentItem";
import type { Post } from "./type";
import { useEscClose } from "./useEscClose";

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
  likeChecked: boolean;
  nameAuthor: string;
  onCloseModalWindow: () => void;
  addLikePost: (id: number) => void;
};

export function FullScreenImageDisplay(props: ScreenImageProp) {
  const {
    selectedPost,
    imgUrl,
    alt,
    svgUrl,
    likesAmount,
    likeChecked,
    commentsAmount,
    nameAuthor,
    onCloseModalWindow,
    addLikePost,
  } = props;

  useEscClose(onCloseModalWindow);

  const commentsAmountNormalized = commentsAmount <= 5 ? commentsAmount : 5;
  const isShowLoader = commentsAmount <= 5 ? "hidden" : "";

  return (
    <>
      <div className="big-picture__preview">
        <div className="big-picture__img">
          <img src={imgUrl} alt={alt} width="600" height="600" />
        </div>
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
                className={`likes-count ${
                  likeChecked && "likes-count--active"
                }`}
                onClick={() => addLikePost(selectedPost.id)}
              >
                {likesAmount}
              </span>
            </p>
          </div>
          <div className="social__comment-count">
            <span className="social__comment-shown-count">
              {commentsAmountNormalized}
            </span>{" "}
            из{" "}
            <span className="social__comment-total-count">
              {commentsAmount}
            </span>{" "}
            комментариев
          </div>
          <ul className="social__comments">
            {selectedPost.comments
              .slice(0, commentsAmountNormalized)
              .map((comment, index) => {
                return (
                  <CommentItem
                    key={index}
                    author={comment.author}
                    text={comment.text}
                  />
                );
              })}
          </ul>
          <button
            className={`social__comments-loader  comments-loader 
              ${isShowLoader}`}
            type="button"
          >
            Загрузить еще
          </button>
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
        <button
          className="big-picture__cancel  cancel"
          type="reset"
          id="picture-cancel"
          onClick={onCloseModalWindow}
        >
          Закрыть
        </button>
      </div>
    </>
  );
}
