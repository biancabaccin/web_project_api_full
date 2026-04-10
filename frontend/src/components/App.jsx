import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api";
import apiAuth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../components/InfoTooltip/InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isLoadingAddCard, setIsLoadingAddCard] = useState(false);

  const [token, setToken] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    _id: "",
  });

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipSuccess, setTooltipSuccess] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const handleUpdateUser = async (data) => {
    setIsLoadingUserInfo(true);

    try {
      const newData = await api.setUserInfo(data);
      setCurrentUser(newData);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingUserInfo(false);
    }
  };

  const handleUpdateAvatar = async (data) => {
    setIsLoadingAvatar(true);

    try {
      const newData = await api.updateUserAvatar(data);
      setCurrentUser(newData);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingAvatar(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => {
        console.error("Error finding cards:", error);
      });
  }, [isLoggedIn]);

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => console.error(error));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoadingAddCard(true);

    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoadingAddCard(false);
      });
  }

  useEffect(() => {
    const savedToken = localStorage.getItem("jwt");

    if (savedToken) {
      setToken(savedToken);

      api.setToken(savedToken);

      apiAuth
        .checkToken(savedToken)
        .then((user) => {
          setIsLoggedIn(true);
          setUserEmail(user.email);
          setUserData({ email: user.email, _id: user._id });
          setCurrentUser(user);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
          setToken("");
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && window.location.pathname !== "/") {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (email, password) => {
    try {
      const data = await apiAuth.login(email, password);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setToken(data.token);

        api.setToken(data.token);

        setIsLoggedIn(true);
        setUserEmail(email);

        const userInfo = await apiAuth.checkToken(data.token);
        setUserData({ email: userInfo.email, _id: userInfo._id });

        navigate("/");
      }
    } catch (err) {
      setTooltipSuccess(false);
      if (err.status === 400) {
        setTooltipMessage("Um ou mais campos não foram fornecidos.");
      } else if (err.status === 401) {
        setTooltipMessage(
          "O usuário com o e-mail especificado não foi encontrado.",
        );
      } else {
        setTooltipMessage("Erro ao entrar! Verifique seus dados.");
      }
      setShowTooltip(true);
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("jwt");
    setToken("");

    navigate("/signin");
  };

  const handleRegister = async ({ email, password }) => {
    try {
      await apiAuth.register(email, password);
      setTooltipSuccess(true);
      setTooltipMessage("Vitória! Agora você está registrado.");
      setShowTooltip(true);
    } catch (error) {
      setTooltipSuccess(false);
      if (error.status === 400) {
        setTooltipMessage("Um dos campos foi preenchido incorretamente.");
      } else {
        setTooltipMessage("Ops, algo deu errado! Tente novamente, por favor.");
      }
      setShowTooltip(true);
    }
  };

  const closeTooltip = () => {
    setShowTooltip(false);
  };

  const location = useLocation();

  const hideFooter =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        isLoadingUserInfo,
        isLoadingAvatar,
      }}
    >
      <div className="page">
        <Header
          userEmail={userEmail}
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignOut}
          location={location}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                  isLoadingAddCard={isLoadingAddCard}
                />
              </ProtectedRoute>
            }
          />

          <Route path="/signin" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />

          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>

        <InfoTooltip
          isOpen={showTooltip}
          onClose={closeTooltip}
          isSuccess={tooltipSuccess}
          message={tooltipMessage}
        />

        {!hideFooter && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
