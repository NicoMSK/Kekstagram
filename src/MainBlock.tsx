import { FullScreenImageDisplay } from "./FullScreenImageDisplay";
import { ImageFilter } from "./ImageFilter";
import { UploadingNewImage } from "./UploadingNewImage";

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
      </section>
      <FullScreenImageDisplay />
    </main>
  );
}
