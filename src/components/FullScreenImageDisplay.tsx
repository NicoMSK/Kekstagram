import { useEffect, useState } from "react";
import { CommentItem } from "./CommentItem";
import type { Post } from "./type";
import { useEscClose } from "./useEscClose";

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
  addNewCommentInPost: (id: string, text: string) => void;
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
    addNewCommentInPost,
  } = props;

  const [inputValue, setInputValue] = useState("");
  const LIMIT_SHOWING_NUMBER_COMMENTS = 5;

  const [curShownCommentsAmount, setCurShownCommentsAmount] = useState(
    Math.min(commentsAmount, LIMIT_SHOWING_NUMBER_COMMENTS)
  );
  const canUploadMore =
    commentsAmount <= LIMIT_SHOWING_NUMBER_COMMENTS ||
    commentsAmount <= curShownCommentsAmount;

  const commentsToShow = selectedPost.comments.slice(0, curShownCommentsAmount);

  const onShowNextCommentClick = () => {
    const addAmount = Math.min(commentsAmount - curShownCommentsAmount, 5);
    setCurShownCommentsAmount((prev) => prev + addAmount);
  };

  useEffect(() => {
    setCurShownCommentsAmount(
      Math.min(commentsAmount, LIMIT_SHOWING_NUMBER_COMMENTS)
    );
    setInputValue("");
  }, [selectedPost.id]);

  function openAllCommentsOnce() {
    if (inputValue.trim().length > 0) {
      setCurShownCommentsAmount(commentsAmount + 1);
    }
  }

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
          <div className="social__comment-count">
            <span className="social__comment-shown-count">
              {curShownCommentsAmount}
            </span>{" "}
            из{" "}
            <span className="social__comment-total-count">
              {commentsAmount}
            </span>{" "}
            комментариев
          </div>
          <ul className="social__comments">
            {commentsToShow.map((comment) => {
              return (
                <CommentItem
                  key={comment.id}
                  commentProps={comment}
                />
              );
            })}
          </ul>
          {!canUploadMore && (
            <button
              className={`social__comments-loader  comments-loader `}
              type="button"
              onClick={onShowNextCommentClick}
            >
              Загрузить еще...
            </button>
          )}

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
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button
              className="social__footer-btn"
              type="button"
              name="button"
              onClick={() => {
                addNewCommentInPost(selectedPost.id, inputValue);
                openAllCommentsOnce();
                setInputValue("");
              }}
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
