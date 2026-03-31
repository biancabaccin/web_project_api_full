export default function Popup(props) {
  const { title, children, onClose } = props;
  return (
    <div className="popup">
      <div
        className={`popup__container ${!title ? "popup__container_image" : ""}`}
      >
        <button
          className="popup__close-button"
          aria-label="Close modal"
          type="button"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M31.9977 28.8551L19.4269 16.2843L31.9977 3.71348L28.855 0.570788L16.2842 13.1416L3.71339 0.570788L0.570695 3.71348L13.1415 16.2843L0.570697 28.8551L3.71339 31.9978L16.2842 19.427L28.855 31.9978L31.9977 28.8551Z"
              fill="white"
            />
          </svg>
        </button>

        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}
