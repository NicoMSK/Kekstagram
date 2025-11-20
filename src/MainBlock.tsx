import { FullScreenImageDisplay } from "./FullScreenImageDisplay";
import { ImageFilter } from "./ImageFilter";
import { UsersImage } from "./UsersImage";
import { UploadingNewImage } from "./UploadingNewImage";
import { imageDescription } from "./constants";
import { useState } from "react";

export function MainBlock() {
  console.log(imageDescription);
  // const[currentImage, setCurrentImage] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                //   setCurrentImage(item)
                setIsModalOpen(true);
              }}
            />
          );
        })}
      </section>
      {/* <FullScreenImageDisplay currentImage={currentImage} isOpen={isModalOpen}/> */}
      {imageDescription.map((item) => {
        return (
          <FullScreenImageDisplay
            key={item.id}
            isOpen={isModalOpen}
            onClick={() => setIsModalOpen(false)}
            imgUrl={item.url}
            alt={item.description}
            commentsAmount={item.comments.length}
            svgUrl={""}
            likesAmount={item.likeAmount}
            avatarUrl={""}
            avatarAlt={""}
            commentDescription={""}
          />
        );
      })}
    </main>
  );
}
