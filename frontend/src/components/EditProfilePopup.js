import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
        // Определяем переменные внутреннего состояния
        const [name, setName] = React.useState('');
        const [description, setDescription] = React.useState('');
        // Подписываемся на контекст CurrentUserContext
        const currentUser = React.useContext(CurrentUserContext);
      
        React.useEffect(() => {
          if (currentUser.about && currentUser.name) {
            setName(currentUser.name);
            setDescription(currentUser.about);
          }
        }, [currentUser, isOpen]);
      
        // Функция-обработчик изменения инпута имени обновляет стейт name
        function handleChangeName(e) {
          setName(e.currentTarget.value);
        }
      
        // Функция-обработчик изменения инпута занятия обновляет стейт description
        function handleChangeDescription(e) {
          setDescription(e.currentTarget.value);
        }
      
        function handleSubmit(e) {
            e.preventDefault();
            onUpdateUser(name, description);
        }
    

    return(
        <PopupWithForm name="form-edit" onSubmit={handleSubmit} title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose}>
            <input
                type="text"
                id="name-input"
                className="popup__input popup__input_edit-name"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                pattern="[A-Za-zА-ЯЁа-яё\s-]{2,40}"
                value={name || ''} 
                onChange={handleChangeName}
                required
            />
            <span id="name-input-error" className="popup__input-error"/>
            <input
                type="text"
                id="about-input"
                className="popup__input popup__input_edit-about"
                name="about"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                pattern=".{2,200}"
                value={description || ''} 
                onChange={handleChangeDescription}
                required
            />
            <span id="about-input-error" className="popup__input-error"/>
        </PopupWithForm>
    )
}

export default EditProfilePopup;