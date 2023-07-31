import Header from "./Header"
import { Link } from "react-router-dom"
import { useForm } from "./hooks/useForm"

export default function Login({ onLogin }) {

    const { values, handleChange, setValues } = useForm({});

    function handleSubmit(event) {

        event.preventDefault();
        onLogin({
            email: values.email,
            password: values.password
        });


    }

    return (

        <>
            <Header>
                <Link to='/signup' className="header__link">Регистрация</Link>

            </Header>

            <div className="login__container page__login">
                <h1 className="login__title">Вход</h1>
                <form className="popup__form" onSubmit={handleSubmit}>
                    <input id="email" type="email" name="email" className="popup__input popup__input_type_login"
                        placeholder="Email"
                        minLength={2}
                        maxLength={30}
                        value={values.email}
                        onChange={handleChange}
                        required
                    />
                    <input id="password" type="password" name="password" className="popup__input popup__input_type_login"
                        placeholder="Пароль"
                        minLength={2}
                        maxLength={30}
                        value={values.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="popup__submit popup__submit-login">Войти</button>
                </form>
            </div>



        </>


    )



}