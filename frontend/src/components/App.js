import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from '../utils/api';
import * as auth from '../utils/auth';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import InfoToolTip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [isInfoPopupOpen,setIsInfoPopupOpen] = React.useState(false);
    const [isRegSucces, setIsRegSucces] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);  
    const [email, setEmail] = React.useState("");
    const history = useHistory();
    
    React.useEffect(() => {
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            closeAllPopups();
          }
        })
    },[]);
    
    
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    };
    
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    };

    const handleCardClick = (card) => {
        setIsImagePopupOpen(true);
        setSelectedCard(card)
    }

    const closeAllPopups = () => {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard({});
        setIsInfoPopupOpen(false);
    };

    function handelAddPlace(){
        setIsAddPlacePopupOpen(true)
    }

    function handleUpdateUser(name, about) {
        api.changeUserInfo(name, about)
        .then((user) => {
          setCurrentUser(user)
          closeAllPopups();
        })
        .catch(err => {
          console.log (`????????????: ${err}`)
        });
    }

    function handleUpdateAvatar(link) {
        api.updateAvatar(link)
        .then(user => {
          setCurrentUser(user);
          closeAllPopups();
        })
        .catch(err => {
          console.log (`????????????: ${err}`)
        });
    }

    function handleAddPlace(name, link) {
        api.postNewCard(name, link)
         .then((res) => {
          setCards([res, ...cards]);
          closeAllPopups();
        })
        .catch(err => {
          console.log (`????????????: ${err}`)
        });
    }
      
    function handleCardLike(card) {
        const isLiked = card.likes.some(userId => userId === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
              const newCards = cards.map((c) => c._id === card._id ? newCard : c);
              setCards(newCards);
        })
        .catch(err => {
            console.log(`????????????: ${err}`)
        })
    }
    
    function handleCardDelete(cardId) {
        api.deleteCard(cardId)
          .then(() => {
            setCards(cards.filter((c) => c._id !== cardId));
        })
        .catch(err => {
            console.log(`????????????: ${err}`)
        })
    }

    function handleRegSubmit(email, password){
        auth.register(email, password)
            .then(()=>{
                setIsInfoPopupOpen(true);
                setIsRegSucces(true);
                api.getUserInfo()
                    .then(user => {
                    console.log(`?????????????? ????????????????????????: %o`, user)
                    setCurrentUser(user);
                    })
                    .catch(err => {
                    console.log(`???????????? ?????????????????? ????????????????????????: ${err}`)
                    });

                api.getInitialCards()
                    .then(res =>{
                        setCards(res)
                    })
                    .catch(err => {
                        console.log(`???????????? ?????????????????? ????????????????: ${err}`)
                    });
                history.push('/signin');
        })
        .catch(err=>{
            if(err.status === 400){
                console.log('?????????????????????? ?????????????????? ???????? ???? ?????????? ')
            }
                setIsInfoPopupOpen(true);
                setIsRegSucces(false);
        })
    }

    function handleLoginSubmit(email,password){
        auth.login(email, password)
            .then(res=>{
                localStorage.setItem("jwt", res.token);
                setIsLoggedIn(true);
                setEmail(email);
                api.getUserInfo()
                    .then(user => {
                    console.log(`?????????????? ????????????????????????: %o`, user)
                    setCurrentUser(user);
                    })
                    .catch(err => {
                    console.log(`???????????? ?????????????????? ????????????????????????: ${err}`)
                    });

                api.getInitialCards()
                    .then(res =>{
                        setCards(res)
                    })
                    .catch(err => {
                        console.log(`???????????? ?????????????????? ????????????????: ${err}`)
                    });
                history.push("/")
        })
        .catch((err)=>{
            if(err.status === 400){
                console.log("400 - ???? ???????????????? ???????? ???? ??????????")
            }
            else if(err.status === 401){
                console.log("401 - ???????????????????????? ?? email ???? ???????????? ")
            }
            return console.log("Error: 500")
        })
    }

    function handleSignout(){
        localStorage.removeItem('jwt');
        setIsLoggedIn(false)
        history.push('/signin');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <Header email={email} onSignOut={handleSignout}/>
                    <Switch>
                        <ProtectedRoute 
                            exact path="/"
                            component={Main}
                            isLoggedIn={isLoggedIn}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handelAddPlace}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                        />
                        <Route  path="/signin">
                            <Login onSubmit={handleLoginSubmit}/>
                        </Route>
                        <Route  path="/signup">
                            <Register onSubmit={handleRegSubmit}/>
                        </Route>
                    </Switch>
                    <Footer/>

                    <InfoToolTip 
                            isRegSucces={isRegSucces} 
                            isOpen={isInfoPopupOpen} 
                            onClose={closeAllPopups}/>
                    <PopupWithForm name='delete' title='???? ???????????????' buttonText='??????????????' onClose={closeAllPopups}/>
                    <ImagePopup 
                        isOpen={isImagePopupOpen} 
                        onClose={closeAllPopups} 
                        card={selectedCard} 
                        link={selectedCard.link} 
                        name={selectedCard.name}
                    />
                    <AddPlacePopup  isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
