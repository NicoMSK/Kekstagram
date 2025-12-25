import { CommentItem } from "./CommentItem";
import type { Post } from "../types/types";

type CommentListProps = {
  commentsAmount: number;
  selectedPost: Post;
  curShownCommentsAmount: number;
  limitShowComment: number;
  setCurShownCommentsAmount: React.Dispatch<React.SetStateAction<number>>;
};

export function CommentList({
  commentsAmount,
  selectedPost,
  curShownCommentsAmount,
  limitShowComment,
  setCurShownCommentsAmount,
}: CommentListProps) {
  const canUploadMore = commentsAmount !== curShownCommentsAmount;
  const commentsToShow = selectedPost.comments.slice(0, curShownCommentsAmount);

  const onShowNextCommentClick = () => {
    const addAmount = Math.min(
      commentsAmount - curShownCommentsAmount,
      limitShowComment
    );
    setCurShownCommentsAmount((prev) => prev + addAmount);
  };

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
