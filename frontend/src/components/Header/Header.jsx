import logo from "../../images/logo_vector.png";
import menuIcon from "../../images/list_button.svg";
import closeIcon from "../../images/close_button.svg";

import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header({ location, isLoggedIn, userEmail, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleSignOutClick() {
    onSignOut();
    setIsMenuOpen(false);
  }

  return (
    <>
      {isMenuOpen && (
        <div className="header__mobile-menu">
          <span className="header__mobile-email">{userEmail}</span>
          <button
            className="header__mobile-signout"
            onClick={handleSignOutClick}
          >
            Sair
          </button>
        </div>
      )}

      <header className="header">
        <div className="header__container">
          <img
            src={logo}
            alt="Logotipo Around the U.S."
            className="logo header__logo"
          />

          <div className="header__right-box">
            {location.pathname === "/signin" && (
              <Link to="/signup" className="header__link">
                Entrar
              </Link>
            )}
            {location.pathname === "/signup" && (
              <Link to="/signin" className="header__link">
                Faça o login
              </Link>
            )}
            {isLoggedIn &&
              location.pathname !== "/signin" &&
              location.pathname !== "/signup" && (
                <div className="header__logged-in-info">
                  <span className="header__user-email">{userEmail}</span>
                  <button
                    className="header__signout-button"
                    onClick={onSignOut}
                  >
                    Sair
                  </button>

                  <button className="header__list-button" onClick={toggleMenu}>
                    <img
                      src={isMenuOpen ? closeIcon : menuIcon}
                      alt={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                      width={30}
                      height={30}
                    />
                  </button>
                </div>
              )}
          </div>
        </div>

        <hr className="header__line" />
      </header>
    </>
  );
}
