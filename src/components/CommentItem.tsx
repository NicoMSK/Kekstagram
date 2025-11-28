import type { Comment } from "./type";

export function CommentItem({ author, text }: Comment) {
  return (
    <li className="social__comment">
      <img
        className="social__picture"
        src={author.avatarImg}
        alt={author.name}
        width="35"
        height="35"
      />
      <p className="social__text">{text}</p>
    </li>
  );
}
