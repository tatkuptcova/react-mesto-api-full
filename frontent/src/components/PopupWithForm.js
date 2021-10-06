import React from 'react';

function PopupWithForm({name, isOpen, onClose, close, title, onSubmit, children, buttonText}) {

    return (
        <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__content popup__content_${name}`}>
                <button onClick={onClose} type="button" aria-label="Закрыть" className={`button popup__close popup__close_${close}`}/>
                <h2 className="popup__title">{title}</h2>
                <form name={`form-${name}`} className={`popup__form popup__form_${name}`} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className={`popup__button-submit popup__button-submit_${name}`}>{buttonText}</button>
                </form>    
            </div>
        </section>
    )
}

export default PopupWithForm;