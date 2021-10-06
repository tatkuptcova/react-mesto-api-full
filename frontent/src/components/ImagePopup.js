function ImagePopup({isOpen, link, onClose, name}) {
    
    return(
        <div className={`popup popup_type_view ${isOpen ? 'popup_opened' : ' '}`}>
            <div className="popup__container">
                <img className="popup__image" src={link} alt={name}/>
                <button type="button" aria-label="Закрыть" className="button popup__close popup__close_image" onClick={onClose}></button>
                <p className="popup__caption">{name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;