import type { Post } from "./type";
import { useEscClose } from "./useEscClose";
import { CommentList } from "./CommentList";

type ScreenImageProp = {
  selectedPost: Post;
  heroImgUrl: string;
  heroImgAlt: string;
  commentsAmount: number;
  authorAvatarSvg: string;
  authorName: string;
  likesAmount: number;
  likeChecked: boolean;
  onCloseModalWindow: () => void;
  addLikePost: (id: string) => void;
};

export function FullScreenImageDisplay(props: ScreenImageProp) {
  const {
    selectedPost,
    heroImgUrl,
    heroImgAlt,
    authorAvatarSvg,
    authorName,
    commentsAmount,
    likesAmount,
    likeChecked,
    onCloseModalWindow,
    addLikePost,
  } = props;

  useEscClose(onCloseModalWindow);

  return (
    <>
      <div className="big-picture__preview">
        <div className="big-picture__img">
          <img
            src={heroImgUrl}
            alt={heroImgAlt}
            width="600"
            height="600"
          />
        </div>
        <div className="big-picture__social  social">
          <div className="social__header">
            <img
              className="social__picture"
              src={authorAvatarSvg}
              alt={heroImgAlt}
              width="35"
              height="35"
            />
            <p className="social__caption">{heroImgAlt}</p>
            <p className="social__likes">
              Нравится{" "}
              <span
                className={`likes-count ${
                  likeChecked && "likes-count--active"
                }`}
                onClick={() => {
                  addLikePost(selectedPost.id);
                }}
              >
                {likesAmount}
              </span>
            </p>
          </div>
          <CommentList
            commentsAmount={commentsAmount}
            selectedPost={selectedPost}
          />
          <div className="social__footer">
            <img
              className="social__picture"
              src={authorAvatarSvg}
              alt={authorName}
              width="35"
              height="35"
            />
            <input
              className="social__footer-text"
              type="text"
              placeholder="Ваш комментарий..."
            />
            <button
              className="social__footer-btn"
              type="button"
              name="button"
            >
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
