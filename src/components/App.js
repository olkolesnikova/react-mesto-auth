import '../../src/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useMemo } from 'react';
import { api } from '../utils/Api';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = useState([]);

    const [selectedCard, setSelectedCard] = useState(null);


    useEffect(() => {

        api.getUserInfo()
            .then((currentUser) => {

                setCurrentUser({
                    name: currentUser.name,
                    description: currentUser.about,
                    avatar: currentUser.avatar,
                    id: currentUser._id
                })
            })

            .catch(console.error)

    }, [])

    useEffect(() => {

        api.getCards()
            .then((cards) => {

                setCards(cards);

            })
            .catch(console.error)
    }, [])



    const isAnyPopupOpen = useMemo(() => {
        return isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen
    }, [
        isEditProfilePopupOpen,
        isAddPlacePopupOpen,
        isEditProfilePopupOpen,
        isImagePopupOpen

    ])

    useEffect(() => {

        if (!isAnyPopupOpen) return;

        function closePopupByEsc(event) {
            if (event.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', closePopupByEsc);

        return () => {
            document.removeEventListener('keydown', closePopupByEsc);
        };
    }, [isAnyPopupOpen])

    const [isLoading, setIsLoading] = useState(false);

    function handleEditProfileClick() {

        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {

        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {

        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {

        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard(null);
    }

    /* function closePopupByOverlay(event) {
        if (event.target === event.currentTarget) {
            closeAllPopups();
        }
    } */

    function handleCardLike(card) {

        const isLiked = card.likes.some((i) => i._id === currentUser.id);

        if (!isLiked) {
            api.addLike(card._id)
                .then((newCard) => {

                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
                })

                .catch(console.error)


        } else {
            api.deleteLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
                })
                .catch(console.error)
        }

    }

    function handleUpdateUser(data) {

        api.editProfileData(data)
            .then((data) => {

                setCurrentUser({
                    name: data.name,
                    description: data.about,
                    avatar: data.avatar,
                    id: data._id
                })

                closeAllPopups();
            })
            .catch(console.error);
    }

    function handleUpdateAvatar(avatar) {

        api.updateUserAvatar(avatar)
            .then((data) => {
                setCurrentUser({
                    name: data.name,
                    description: data.about,
                    avatar: data.avatar,
                    id: data._id
                })

                closeAllPopups();
            })
            .catch(console.error);
    }

    function handleAddPlaceSubmit(data) {

        const newCard = api.addNewCard(data)

            .then((newCard) => {

                setCards((cards) => [newCard, ...cards]);
                closeAllPopups();
            })
            .catch(console.error);
    }

    function handleCardDelete(card) {

        api.deleteCard(card._id)
            .then(() => {

                setCards((cards) => cards.filter((c) => c._id !== card._id))
            })
            .catch(console.error);
    }

    return (

        <div className="page">


            <CurrentUserContext.Provider value={currentUser}>
                <Header />

                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                />

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />

                <PopupWithForm name="popup-with-confirmation" title="Вы уверены?" formName="popup-with-confirmation">

                    <button type="submit" className="popup__submit">Да</button>

                </PopupWithForm>

                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

            </CurrentUserContext.Provider>

        </div>
    );
}

export default App;
