import { useRef, useContext } from "react";
import CurrentUserContext from "@home/contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatarRef = useRef();
  const { handleUpdateAvatar, isLoadingAvatar } =
    useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
      handleUpdateAvatar({
        avatar: avatarRef.current.value,
      });
    } else {
      form.reportValidity();
    }
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <fieldset className="popup__fieldset">
        <input
          ref={avatarRef}
          className="popup__input"
          type="url"
          placeholder="URL da imagem"
          id="photo-url"
          name="link"
          required
        />
        <span className="popup__input-error photo-url-error"></span>
      </fieldset>

      <button
        className="popup__submit-button"
        type="submit"
        disabled={isLoadingAvatar}
      >
        {isLoadingAvatar ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
