import { CommentItem } from "./CommentItem";
import type { Post } from "./type";
import { useEffect, useState } from "react";

const LIMIT_SHOWING_NUMBER_COMMENTS = 5;

type CommentListProps = {
  commentsAmount: number;
  selectedPost: Post;
};

export function CommentList({
  commentsAmount,
  selectedPost,
}: CommentListProps) {
  const [curShownCommentsAmount, setCurShownCommentsAmount] = useState(
    Math.min(commentsAmount, LIMIT_SHOWING_NUMBER_COMMENTS)
  );
  const canUploadMore = commentsAmount !== curShownCommentsAmount;

  const commentsToShow = selectedPost.comments.slice(0, curShownCommentsAmount);

  const onShowNextCommentClick = () => {
    const addAmount = Math.min(
      commentsAmount - curShownCommentsAmount,
      LIMIT_SHOWING_NUMBER_COMMENTS
    );
    setCurShownCommentsAmount((prev) => prev + addAmount);
  };

  useEffect(() => {
    setCurShownCommentsAmount(
      Math.min(commentsAmount, LIMIT_SHOWING_NUMBER_COMMENTS)
    );
  }, [selectedPost.id]);

  return (
    <>
      <div className="social__comment-count">
        <span className="social__comment-shown-count">
          {curShownCommentsAmount}
        </span>{" "}
        из <span className="social__comment-total-count">{commentsAmount}</span>{" "}
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
      {canUploadMore && (
        <button
          className="social__comments-loader  comments-loader"
          type="button"
          onClick={onShowNextCommentClick}
        >
          Загрузить еще...
        </button>
      )}
    </>
  );
}
