import { useEffect, useRef, useState } from "react";
import { CommentItem } from "./CommentItem";
import type { Post } from "./type";
import { useEscClose } from "./useEscClose";

type ScreenImageProp = {
  selectedPost: Post;
  imgUrl: string;
  alt: string;
  commentsAmount: number;
  svgUrl: string;
  likesAmount: number;
  avatarUrl?: string;
  avatarAlt?: string;
  commentDescription?: string;
  likeChecked: boolean;
  nameAuthor: string;
  onCloseModalWindow: () => void;
  addLikePost: (id: string) => void;
};

export function FullScreenImageDisplay(props: ScreenImageProp) {
  const {
    selectedPost,
    imgUrl,
    alt,
    svgUrl,
    likesAmount,
    likeChecked,
    commentsAmount,
    nameAuthor,
    onCloseModalWindow,
    addLikePost,
  } = props;

  const commentsAmountNormalized = commentsAmount <= 5 ? commentsAmount : 5;
  const [commentToShow, setCommentToShow] = useState<React.ReactElement[]>([]);
  const [nextComment, setNextComment] = useState<number>(
    commentsAmountNormalized
  );
  const canUploadMore = commentsAmount <= 5 || commentsAmount <= nextComment;
  const arrayUploadedCommentsRef = useRef<React.ReactElement[]>([]);

  function renderСomments(startComment: number, endComment: number) {
    const slicedComments = selectedPost.comments
      .slice(startComment, endComment)
      .map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            id={comment.id}
            author={comment.author}
            text={comment.text}
            // comment={comment}
          />
        );
      });

    arrayUploadedCommentsRef.current = [
      ...arrayUploadedCommentsRef.current,
      ...slicedComments,
    ];

    setCommentToShow(arrayUploadedCommentsRef.current);
  }
  //   const [curShownCommentsAmount, setCurShownCommentsAmount] = useState(Math.min(commentsAmount, 5)

  // const onShowNextCommentClick = () => {
  //   const addAmount = Math.min(commentsAmount - curShownCommentsAmount, 5)
  //   setCurShownCommentsAmount(prev => prev + addAmount)
  // }
  // const commentsToShow = selectedPost.comments.slice(0, curShownCommentsAmount)
  // ...
  // return
  // ...
  // <ul className="social__comments">
  //   {commentToShow.map(comment =>
  //       <CommentItem .../>
  //    }
  //   </ul>

  useEffect(() => {
    arrayUploadedCommentsRef.current = [];

    setNextComment(commentsAmountNormalized);
    renderСomments(0, commentsAmountNormalized);
  }, [selectedPost.id]);

  const handleShowMorePosts = () => {
    const remaining = commentsAmount - nextComment;
    const nextLoadComments = remaining >= 5 ? 5 : remaining;

    renderСomments(nextComment, nextComment + nextLoadComments);
    setNextComment(nextComment + nextLoadComments);
  };

  useEscClose(onCloseModalWindow);

  return (
    <>
      <div className="big-picture__preview">
        <div className="big-picture__img">
          <img src={imgUrl} alt={alt} width="600" height="600" />
        </div>
        <div className="big-picture__social  social">
          <div className="social__header">
            <img
              className="social__picture"
              src={svgUrl}
              alt={alt}
              width="35"
              height="35"
            />
            <p className="social__caption">{alt}</p>
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
            <span className="social__comment-shown-count">{nextComment}</span>{" "}
            из{" "}
            <span className="social__comment-total-count">
              {commentsAmount}
            </span>{" "}
            комментариев
          </div>
          <ul className="social__comments">{commentToShow}</ul>
          {!canUploadMore && (
            <button
              className={`social__comments-loader  comments-loader `}
              type="button"
              onClick={handleShowMorePosts}
            >
              Загрузить еще...
            </button>
          )}

          <div className="social__footer">
            <img
              className="social__picture"
              src={svgUrl}
              alt={nameAuthor}
              width="35"
              height="35"
            />
            <input
              className="social__footer-text"
              type="text"
              placeholder="Ваш комментарий..."
            />
            <button className="social__footer-btn" type="button" name="button">
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
