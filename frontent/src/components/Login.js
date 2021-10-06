import React from "react";

function Login ({onSubmit}){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    function handleEmailChange(e){
        setEmail(e.target.value);

    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        onSubmit(email,password)
    }

    return(
        <div className="authorization">
           <h2 className="authorization__title">Вход</h2>
            <form className="authorization__form" name="login-form" onSubmit={handleSubmit}>
                <input 
                    required
                    minLength="5"
                    onChange={handleEmailChange}
                    value={email}
                    maxLength="40"
                    type="email"
                    name="login-email"
                    placeholder="Email"
                    id="login-email"
                    className="authorization__input"
                />

                <input 
                    required
                    minLength="5"
                    onChange={handlePasswordChange}
                    value={password}
                    maxLength="40"
                    type="password"
                    name="login-password"
                    placeholder="Пароль"
                    id="login-email"
                    className="authorization__input authorization__input_password"
                />
                <button type="submit" className="authorization__button">Войти</button>
            </form>
        </div>
    )
}

export default Login;