import { FullScreenImageDisplay } from "./FullScreenImageDisplay";
import { ImageFilter } from "./ImageFilter";
import { UsersImage } from "./UsersImage";
import { UploadingNewImage } from "./UploadingNewImage";
import photo1 from "./photos/1.jpg";

export function MainBlock() {
  return (
    <main>
      <ImageFilter />
      {/* <!-- Контейнер для изображений от других пользователей --> */}
      <section className="pictures  container">
        <h2 className="pictures__title  visually-hidden">
          Фотографии других пользователей
        </h2>
        <UploadingNewImage />

        <UsersImage imgUrl={photo1} alt="" />
      </section>
      <FullScreenImageDisplay />
    </main>
  );
}
