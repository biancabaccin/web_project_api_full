import { useState } from "react";

export default function NewCard({ onAddPlaceSubmit, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (form.checkValidity()) {
      onAddPlaceSubmit({
        name,
        link,
      });
    } else {
      form.reportValidity();
    }
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <fieldset className="popup__fieldset">
        <input
          className="popup__input"
          type="text"
          placeholder="Título"
          id="cards-title"
          name="name"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__input-error cards-title-error"></span>
      </fieldset>

      <fieldset className="popup__fieldset">
        <input
          className="popup__input"
          type="url"
          placeholder="URL da imagem"
          id="cards-link"
          name="link"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <span className="popup__input-error cards-link-error"></span>
      </fieldset>

      <button
        className="popup__submit-button"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Salvando..." : "Criar"}
      </button>
    </form>
  );
}
