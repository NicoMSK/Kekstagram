import { FullScreenImageDisplay } from "./FullScreenImageDisplay";
import { ImageFilter } from "./ImageFilter";
import { UsersImage } from "./UsersImage";
import { UploadingNewImage } from "./UploadingNewImage";
import { getNewComment, imageDescriptions } from "./constants";
import { useState } from "react";
import { closeModal, openModal } from "./utils";

export function MainBlock() {
  const [posts, setPosts] = useState(imageDescriptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectedPost = posts.find((post) => post.id === selectedPostId);

  function addLikePost(id: string) {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id && !post.likeChecked) {
          return {
            ...post,
            likeAmount: post.likeAmount + 1,
            likeChecked: true,
          };
        }
        return { ...post };
      })
    );
  }

  function addNewCommentInPost(id: string, text: string) {
    if (text.trim().length === 0) return;

    setPosts((prevPost) =>
      prevPost.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            comments: [...post.comments, getNewComment(text)],
          };
        }
        return { ...post };
      })
    );
  }

  return (
    <main>
      <ImageFilter />
      <section className="pictures  container">
        <h2 className="pictures__title  visually-hidden">
          Фотографии других пользователей
        </h2>
        <UploadingNewImage />
        {posts.map((item) => {
          return (
            <UsersImage
              key={item.id}
              imgUrl={item.heroImgUrl}
              alt={item.description}
              commentsAmount={item.comments.length}
              likesAmount={item.likeAmount}
              onClick={() => {
                setSelectedPostId(item.id);
                openModal(setIsModalOpen);
              }}
            />
          );
        })}
      </section>
      <section
        className={`big-picture  overlay  ${!isModalOpen && "hidden"}`}
        onClick={(e) =>
          e.currentTarget === e.target && closeModal(setIsModalOpen)
        }
      >
        <h2 className="big-picture__title  visually-hidden">
          Просмотр фотографии
        </h2>
        {selectedPost && (
          <FullScreenImageDisplay
            selectedPost={selectedPost}
            onCloseModalWindow={() => {
              closeModal(setIsModalOpen);
            }}
            heroImgUrl={selectedPost.heroImgUrl}
            heroImgAlt={selectedPost.description}
            commentsAmount={selectedPost.comments.length}
            authorAvatarSvg={selectedPost.authorAvatarPost}
            likesAmount={selectedPost.likeAmount}
            likeChecked={selectedPost.likeChecked}
            addLikePost={addLikePost}
            authorName={selectedPost.authorNamePost}
            addNewCommentInPost={addNewCommentInPost}
          />
        )}
      </section>
    </main>
  );
}
