import { FullScreenImageDisplay, type Post } from "./FullScreenImageDisplay";
import { ImageFilter } from "./ImageFilter";
import { UsersImage } from "./UsersImage";
import { UploadingNewImage } from "./UploadingNewImage";
import { imageDescription } from "./constants";
import { useState } from "react";
import { closeModal, openModal } from "./utils";

export function MainBlock() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <main>
      <ImageFilter />
      {/* <!-- Контейнер для изображений от других пользователей --> */}
      <section className="pictures  container">
        <h2 className="pictures__title  visually-hidden">
          Фотографии других пользователей
        </h2>
        <UploadingNewImage />
        {imageDescription.map((item) => {
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
        className={`big-picture  overlay  ${isModalOpen ? "" : "hidden"}`}
        onClick={(e) =>
          e.currentTarget === e.target && closeModal(setIsModalOpen)
        }
      >
        <h2 className="big-picture__title  visually-hidden">
          Просмотр фотографии
        </h2>
        {isModalOpen && selectedPost && (
          <FullScreenImageDisplay
            selectedPost={selectedPost}
            closeModalWindow={() => {
              closeModal(setIsModalOpen);
            }}
            imgUrl={selectedPost.url}
            alt={selectedPost.description}
            commentsAmount={selectedPost.comments.length}
            svgUrl={selectedPost.avatarImg}
            likesAmount={selectedPost.likeAmount}
            nameAuthor={selectedPost.name}
          />
        )}
      </section>
    </main>
  );
}
