type CommentItemProps = {
  avatarUrl: string;
  avatarAlt: string;
  commentDescription: string;
};

export function CommentItem(props: CommentItemProps) {
  const { avatarUrl, avatarAlt, commentDescription } = props;

  return (
    <li className="social__comment">
      <img
        className="social__picture"
        src={avatarUrl}
        alt={avatarAlt}
        width="35"
        height="35"
      />
      <p className="social__text">{commentDescription}</p>
    </li>
  );
}
