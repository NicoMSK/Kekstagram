import { FullScreenImageDisplay } from "./FullScreenImageDisplay";
import { ImageFilter } from "./ImageFilter";
import { UsersImage } from "./UsersImage";
import { UploadingNewImage } from "./UploadingNewImage";
import { imageDescription } from "./constants";
import { useState } from "react";
import { closeModal, openModal } from "./utils";
import type { Post } from "./type";

export function MainBlock() {
  const [posts, setPosts] = useState(imageDescription);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  function addLikePost(id: number) {
    setPosts((prev) =>
      prev.filter((post) => {
        if (post.likeChecked) return post;

        if (post.id === id) {
          post.likeAmount += 1;
          post.likeChecked = true;
        }
        return post;
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
              imgUrl={item.url}
              alt={item.description}
              commentsAmount={item.comments.length}
              likesAmount={item.likeAmount}
              onClick={() => {
                setSelectedPost(item);
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
            imgUrl={selectedPost.url}
            alt={selectedPost.description}
            commentsAmount={selectedPost.comments.length}
            svgUrl={selectedPost.avatarImg}
            likesAmount={selectedPost.likeAmount}
            likeChecked={selectedPost.likeChecked}
            addLikePost={addLikePost}
            nameAuthor={selectedPost.name}
          />
        )}
      </section>
    </main>
  );
}
