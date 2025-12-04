import type { Comment } from "./type";

export function CommentItem(comment: Comment) {
  return (
    <li className="social__comment">
      <img
        className="social__picture"
        // src={comment.author.avatarImg}
        src={comment.author.avatarImg}
        alt={comment.author.name}
        width="35"
        height="35"
      />
      <p className="social__text">{comment.text}</p>
    </li>
  );
}
