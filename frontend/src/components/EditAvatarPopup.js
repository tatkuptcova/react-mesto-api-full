import React from 'react';

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({onUpdateAvatar, isOpen, onClose}){

    const ref = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(ref.current.value);
    }

    React.useEffect(() => {
        if (!isOpen) {
          ref.current.value = '';
          }
      }, [isOpen]);

    return (
        <PopupWithForm name="form-newAvatar" title="Обновить аватар" buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input 
                ref= {ref}
                id="avatarLink"
                autoComplete="off"
                type="url"
                name="avatarLink"
                pattern="https?://.+"
                className="popup__input popup__input_avatar-link"
                placeholder="Ссылка на картинку"
                required
            />
            <span id="avatarLink-error" className="popup__input-error"/> 
        </PopupWithForm>
    )
}

export default EditAvatarPopup;