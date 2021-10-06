import {Link,Route} from "react-router-dom";
import logo from '../images/logo.svg';

function Header ({email,onSignOut}){
    
    return(
        <header className="header">
            <img src={logo} alt="Лого" className="header__logo"/>
            <div className="header__container">
                <Route exact path="/">
                    <p className="header__email">{email}</p>
                    <Link to="/sign-in" className="header__link" onClick={onSignOut}>Выйти</Link>
                </Route>
                <Route exact path="/sign-in">
                    <Link to="/sign-up" className="header__link">Регистрация</Link>
                </Route>
                <Route exact path="/sign-up">
                    <Link to="/sign-in" className="header__link">Войти</Link>
                </Route>

            </div>
        </header>
    )
}

export default Header;