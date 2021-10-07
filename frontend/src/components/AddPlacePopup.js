import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onAddPlace, isOpen, onClose}) {

  const[place, setPlace] = React.useState('');
  const[link, setLink] = React.useState('');

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(place, link);
  }

  React.useEffect(() => {
    if (!isOpen) {
      setPlace('');
      setLink('');
    }
  }, [isOpen]);

  return (
    <PopupWithForm  name="form-add"  title="Новое место" buttonText='Создать' isOpen={isOpen}
      onClose={onClose} onSubmit={handleSubmit}>
        <input
          type="text"
          id="nameplace-input"
          className="popup__input popup__input_add-title"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          pattern=".{2,30}"
          value={place} 
          onChange={handleChangePlace}
          required
        />
        <span id="nameplace-input-error" className="popup__input-error"/>
        <input
          type="url"
          id="link-input"
          className="popup__input popup__input_add-link"
          name="link"
          placeholder="Ссылка на картинку"
          value={link} 
          onChange={handleChangeLink}
          required
        />
        <span id="link-input-error" className="popup__input-error"/>
    </PopupWithForm>        
  )
}
export default AddPlacePopup;