import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}){
  const currentUser = React.useContext(CurrentUserContext); 
 
  return(
    <main className="container">
      <div className="content">
        <section className="profile">
          <div className="profile__avatar">
            <img onClick={onEditAvatar}
              className="profile__image" 
              src={currentUser.avatar} 
              alt="Профиль фото"/>
          </div>
          <div className="profile__info">
            <h1 id="profileName" className="profile__name">{currentUser.name}</h1>
            <button onClick={onEditProfile} type="button" aria-label="Редактировать" className="button profile__edit-button"/>
            <p id="profileAbout" className="profile__about">{currentUser.about}</p>
          </div>
          <button onClick={onAddPlace} type="button" aria-label="Добавить картинку" className="button profile__button-add"/>
        </section>

        <section className="elements">
          <ul className="elements__catalogue">
            {cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                link={card.link}
                name={card.name}
                likes={card.likes.length}
                onCardClick={onCardClick}
                onCardLike={onCardLike} 
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default Main;