import React, { useEffect, useState } from 'react';
// Импорт модулей
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from '../components/ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import  {apiData}  from '../utils/Api';
import {CurrentCardsContext}  from '../contexts/CurrentCardsContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login'
import RequireAuth from '../components/ProtectedRoute';
import * as auth from '../components/auth';

function App() {

  const [isEditProfilePopupOpen, handleEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, handleAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, handleEditAvatarPopupOpen] = useState(false);
  const [isLoginPopupOpen, handleLoginPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [currentCards, setCurrentCards] = useState([]);
   // Стейт, в котором содержится значение инпута
   const [loggedIn, setLoggedIn] = useState(false);

   const navigate = useNavigate();
   const location = useLocation();

  function handleEditAvatarClick() {
    handleEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    handleEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    handleAddPlacePopupOpen(true);
  };

  function handleLoginPopupClick() {
    handleLoginPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    handleEditAvatarPopupOpen(false);
    handleEditProfilePopupOpen(false);
    handleAddPlacePopupOpen(false);
    handleLoginPopupOpen(false);
    setSelectedCard(null);
  };

  function handleUpdateUser(user) {
    apiData.setUserData(user)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
      return [];
    })
  };

  function handleUpdateAvatar(avatar) {
    apiData.patchAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
      return [];
    })
  };

  function handleCardLike(card, currentUser, setCurrentCards) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiData.changeLikeCardStatus(card._id, isLiked, setCurrentCards)
    .then((newCard) => {
      setCurrentCards((cardsData) => cardsData.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
    
  } 

  function handleCardDelete(deletedCard, setCurrentCards) {
    // Отправляем запрос в API
    apiData.deleteCard(deletedCard._id)
    .then(() => {
      setCurrentCards((cardsData) => cardsData.filter((c) => {return c._id !== deletedCard._id }));
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
      return [];
    });
  } 

  function handleAddPlaceSubmit(newCard, currentCards) {
    apiData.postCard(newCard)
    .then((res) => {
      // Создадим экземпляр карточки
      setCurrentCards([res, ...currentCards]); 
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
      return [];
    });
  } 

  // function handleLogin(e) {
  //   e.preventDefault();
  //   setloggedIn(true);
  // }

  useEffect(() => {
    // запрос в API за пользовательскими данными
    Promise.all([ 
    apiData.getUserData(),
    apiData.getInitialCards()
    ])
    .then((res) => {
      setCurrentUser(res[0]);
      setCurrentCards(res[1])
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
      return [];
    })
  }, []);


  useEffect(() => {
    handleTokenCheck(location.pathname);
  },[]);


  const handleTokenCheck = (path) => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      console.log(jwt);
      // проверяем токен пользователя
      auth.checkToken(jwt).then((res) => {
        if (res) {
          // если есть цель, добавляем её в стейт
          setLoggedIn(true);
          navigate(path);
        }
      });
    }
  };

  return (
    <Routes>
      <Route
            path="/"
            element={
              <RequireAuth loggedIn={loggedIn}>
                <Register />
              </RequireAuth>
            }
      />
      <Route path="/sign-up" element={<Register/>} />
      <Route path="/sign-in" element={<Login onLogin={handleTokenCheck}/>} />
      <Route path="/logged" element={<Main/>} />
    </Routes>

  );
}

export default App;

