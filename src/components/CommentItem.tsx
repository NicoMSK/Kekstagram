import type { Comment } from "./type";

type CommentItemProps = {
  commentProps: Comment;
};

export function CommentItem({ commentProps }: CommentItemProps) {
  return (
    <li className="social__comment">
      <img
        className="social__picture"
        src={commentProps.author.avatar}
        alt={commentProps.author.name}
        width="35"
        height="35"
      />
      <p className="social__text">{commentProps.text}</p>
    </li>
  );
}
