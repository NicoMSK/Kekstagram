{
  /* <!-- Сообщение об успешной загрузке изображения --> */
}
export function TemplateSuccessfulImageUpload() {
  return (
    <template id="success">
      <section className="success">
        <div className="success__inner">
          <h2 className="success__title">Изображение успешно загружено</h2>
          <button className="success__button" type="button">
            Круто!
          </button>
        </div>
      </section>
    </template>
  );
}
