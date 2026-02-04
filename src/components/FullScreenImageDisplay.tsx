import type { Post } from "../types/types";
import { useEscClose } from "../hooks/useEscClose";
import { CommentList } from "./CommentList";
import { useEffect, useState } from "react";

type ScreenImageProps = {
  selectedPost: Post;
  onCloseModalWindow: () => void;
  addLikePost: (id: string) => void;
  addNewCommentInPost: (id: string, text: string) => void;
};

const LIMIT_SHOWING_NUMBER_COMMENTS = 5;

export function FullScreenImageDisplay(props: ScreenImageProps) {
  const { selectedPost, onCloseModalWindow, addLikePost, addNewCommentInPost } =
    props;

  const commentsAmount = selectedPost.comments.length;
  const [curShownCommentsAmount, setCurShownCommentsAmount] = useState(
    Math.min(commentsAmount, LIMIT_SHOWING_NUMBER_COMMENTS),
  );

  const [inputValue, setInputValue] = useState("");

  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addNewCommentInPost(selectedPost.id, inputValue);

    if (inputValue.trim().length !== 0) {
      setCurShownCommentsAmount((prev) => prev + 1);
    }
    setInputValue("");
  };

  useEffect(() => {
    setCurShownCommentsAmount(
      Math.min(commentsAmount, LIMIT_SHOWING_NUMBER_COMMENTS),
    );
    setInputValue("");
  }, [selectedPost.id]);

  useEscClose(onCloseModalWindow);

  return (
    <>
      <div className="big-picture__preview">
        <div className="big-picture__img">
          <img
            src={selectedPost.heroImgUrl}
            alt={selectedPost.description}
            style={{
              transform: `scale(${selectedPost.scale / 100})`,
              filter: `${selectedPost.filter}`,
            }}
            width="600"
            height="600"
          />
        </div>
        <div className="big-picture__social  social">
          <div className="social__header">
            <img
              className="social__picture"
              src={selectedPost.authorAvatarPost}
              alt={selectedPost.authorNamePost}
              width="35"
              height="35"
            />
            <p className="social__caption">{selectedPost.description}</p>
            <p className="social__likes">
              Нравится{" "}
              <span
                className={`likes-count ${
                  selectedPost.likeChecked && "likes-count--active"
                }`}
                onClick={() => {
                  addLikePost(selectedPost.id);
                }}
              >
                {selectedPost.likeAmount}
              </span>
            </p>
          </div>
          <CommentList
            commentsAmount={commentsAmount}
            selectedPost={selectedPost}
            limitShowComment={LIMIT_SHOWING_NUMBER_COMMENTS}
            curShownCommentsAmount={curShownCommentsAmount}
            setCurShownCommentsAmount={setCurShownCommentsAmount}
          />
          <form
            className="social__footer"
            onSubmit={(e) => handleAddComment(e)}
          >
            <img
              className="social__picture"
              src={selectedPost.authorAvatarPost}
              alt={selectedPost.authorNamePost}
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
              type="submit"
              name="button"
            >
              Отправить
            </button>
          </form>
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
