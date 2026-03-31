export default function ImagePopup(props) {
  const { card } = props;
  return (
    <>
      <img
        className="popup__image"
        src={card.link}
        alt={card.name}
        id="photo-link"
      />
      <p className="popup-card__title">{card.name}</p>
    </>
  );
}
