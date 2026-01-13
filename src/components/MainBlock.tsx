import { FullScreenImageDisplay } from "./FullScreenImageDisplay";
import { ImageFilter } from "./ImageFilter";
import { UsersImage } from "./UsersImage";
import { UploadingNewImage } from "./UploadingNewImage";
import { useState } from "react";
import { useModal } from "../context/useModal.ts";
import { getNewComment } from "../data/getNewComment.ts";
import { imageDescriptions } from "../data/imageDescriptionsArray.ts";
import { getRandomInteger } from "../utils/randomInteger.ts";
import type { FilterStatus } from "../types/types.ts";
import { MAX_AVATAR, MIN_AVATAR } from "../constants/constants";

export function MainBlock() {
  const [posts, setPosts] = useState(imageDescriptions);
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectedPost = posts.find((post) => post.id === selectedPostId);

  function addNewPost(textAreaValue: string, authorName: string) {
    setPosts((post) => {
      const avatarIndex = getRandomInteger(MIN_AVATAR, MAX_AVATAR);

      return [
        {
          id: crypto.randomUUID(),
          authorNamePost: authorName,
          authorAvatarPost: `src/img/avatar-${avatarIndex}.svg`,
          heroImgUrl: "src/img/logo-background-2.jpg",
          description: textAreaValue,
          likeAmount: 0,
          likeChecked: false,
          comments: [],
        },
        ...post,
      ];
    });
  }

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
            comments: [getNewComment(text), ...post.comments],
          };
        }
        return { ...post };
      })
    );
  }

  function filterPosts(currentFilter: FilterStatus) {
    setPosts((prev) => {
      if (currentFilter === "default") {
        return imageDescriptions.slice();
      }
      if (currentFilter === "discussed") {
        return prev.toSorted(
          (post1, postN) => postN.comments.length - post1.comments.length
        );
      }
      if (currentFilter === "random") {
        return prev.toSorted(() => getRandomInteger(-1, 1));
      }
      throw new Error("unexpected beharior");
    });
  }

  return (
    <main>
      <ImageFilter filterPosts={filterPosts} />
      <section className="pictures  container">
        <h2 className="pictures__title  visually-hidden">
          Фотографии других пользователей
        </h2>
        <UploadingNewImage addNewPost={addNewPost} />
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
                openModal("openImage");
              }}
            />
          );
        })}
      </section>
      <section
        className={`big-picture  overlay  ${
          isOpen !== "openImage" && "hidden"
        }`}
        onClick={(e) => e.currentTarget === e.target && closeModal()}
      >
        <h2 className="big-picture__title  visually-hidden">
          Просмотр фотографии
        </h2>
        {selectedPost && (
          <FullScreenImageDisplay
            selectedPost={selectedPost}
            onCloseModalWindow={closeModal}
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
