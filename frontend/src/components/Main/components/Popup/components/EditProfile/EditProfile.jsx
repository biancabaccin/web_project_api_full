import { useState, useContext } from "react";
import CurrentUserContext from "@home/contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser, isLoadingUserInfo } =
    useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
      handleUpdateUser({ name, about: description });
    } else {
      form.reportValidity();
    }
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <fieldset className="popup__fieldset">
        <input
          className="popup__input"
          type="text"
          placeholder="Nome"
          id="name"
          name="name"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error name-error"></span>
      </fieldset>

      <fieldset className="popup__fieldset">
        <input
          className="popup__input"
          type="text"
          placeholder="Sobre mim"
          id="about"
          name="about"
          minLength="2"
          maxLength="200"
          required
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error about-error"></span>
      </fieldset>

      <button
        className="popup__submit-button"
        type="submit"
        disabled={isLoadingUserInfo}
      >
        {isLoadingUserInfo ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
