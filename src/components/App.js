import React from 'react';
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
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {

  const [isEditProfilePopupOpen, handleEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, handleAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, handleEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCards, setCurrentCards] = React.useState([]);

  function handleEditAvatarClick() {
    handleEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    handleEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    handleAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    handleEditAvatarPopupOpen(false);
    handleEditProfilePopupOpen(false);
    handleAddPlacePopupOpen(false);
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
      setCurrentCards((cardsData) => cardsData.filter((c) => {return c._id != deletedCard._id }));
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

  React.useEffect(() => {
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <CurrentCardsContext.Provider value={currentCards}>
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} 
                onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} 
                setCards={setCurrentCards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
          <AddPlacePopup   isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/> 
        </CurrentCardsContext.Provider>
        <Footer />
        <ImagePopup  card={selectedCard}  onClosePopup={closeAllPopups}/>
        <PopupWithForm name="delete" title="Вы уверены?"  onClosePopup={closeAllPopups}>
          <button className="popup__submit-btn popup__submit-btn_delete"  type="submit">
            Да
          </button> 
        </PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

