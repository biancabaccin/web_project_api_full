import { useContext } from "react";
import Popup from "./components/Popup/Popup";
import Card from "./components/Card/Card";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({
  onOpenPopup,
  onClosePopup,
  popup,
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  isLoadingAddCard,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const editAvatarPopup = { title: "Edit Avatar", children: <EditAvatar /> };
  const editProfilePopup = { title: "Edit Profile", children: <EditProfile /> };

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__image-button"
          aria-label="Edit Avatar"
          onClick={() => onOpenPopup(editAvatarPopup)}
        >
          <img
            src={currentUser.avatar}
            alt="Foto de perfil do usuário"
            className="profile__image"
          />
        </button>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            aria-label="Edit Profile"
            onClick={() => onOpenPopup(editProfilePopup)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <path
                d="M10 1.32827L2.60377 8.7666L1.28302 7.41936L8.66038 0L10 1.32827ZM0 10L1.96226 9.41177L0.584906 8.08349L0 10Z"
                fill="white"
              />
            </svg>
          </button>

          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          className="profile__add-button"
          type="submit"
          aria-label="Add card"
          onClick={() =>
            onOpenPopup({
              title: "New card",
              children: (
                <NewCard
                  onAddPlaceSubmit={onAddPlaceSubmit}
                  isLoading={isLoadingAddCard}
                />
              ),
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M22 9.77778H12.2222V0H9.77778V9.77778H0V12.2222H9.77778V22H12.2222V12.2222H22V9.77778Z"
              fill="white"
            />
          </svg>
        </button>
      </section>

      <ul className="cards__list">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onImageClick={onOpenPopup}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
