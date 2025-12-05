import type { Comment } from "./type";

type CommentItemProps = {
  commentProps: Comment;
};

export function CommentItem({ commentProps }: CommentItemProps) {
  return (
    <li className="social__comment">
      <img
        className="social__picture"
        src={commentProps.author.avatarComment}
        alt={commentProps.author.nameComment}
        width="35"
        height="35"
      />
      <p className="social__text">{commentProps.textComment}</p>
    </li>
  );
}
