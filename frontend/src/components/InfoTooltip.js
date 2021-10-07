import failRegister from "../images/FailRegister.svg";
import succesfulRegister from "../images/SuccesfulRegister.svg"

function InfoToolTip({onClose, isOpen, isRegSucces}){
    
    return(
        <div className={`popup popup_type_view ${isOpen ? 'popup_opened' : ' '}`}>
            <div className="popup__content">
            <button type="button" aria-label="Закрыть" className="button popup__close popup__close_image" onClick={onClose}></button>
                <img src={isRegSucces ? succesfulRegister:failRegister} className="popup__info-icon" alt="успех регистрации"/>
                <h2 className="popup__title-info">
                    {isRegSucces 
                        ? `Вы успешно зарегистрировались!`
                        : `Что-то пошло не так! Попробуйте еще раз.`
                    }
                </h2>
            </div>
        </div>
    )
}

export default InfoToolTip;