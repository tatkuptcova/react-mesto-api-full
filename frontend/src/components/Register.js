import React from "react";
import { Link } from "react-router-dom";

function Register ({onSubmit}){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    function handleEmailChange(e){
        setEmail(e.target.value);

    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        onSubmit(email, password)
    }

    return(
        <div className="authorization">
            <h2 className="authorization__title">Регистрация</h2>
            <form className="authorization__form" name="register-form" onSubmit={handleSubmit}>
                <input 
                    required
                    onChange={handleEmailChange}
                    value={email}
                    minLength="5"
                    maxLength="40"
                    type="email"
                    name="register-email"
                    placeholder="Email"
                    id="register-email"
                    className="authorization__input"
                />
                <input 
                    required
                    minLength="5"
                    onChange={handlePasswordChange}
                    value={password}
                    maxLength="40"
                    type="password"
                    name="register-password"
                    placeholder="Пароль"
                    id="register-email"
                    className="authorization__input authorization__input_password"
                />
                <button type="submit" className="authorization__button">Зарегистрироваться</button>
                <Link className="authorization__login-link" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}

export default Register;