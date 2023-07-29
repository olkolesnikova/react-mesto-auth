import Header from "./Header"
import { Link } from "react-router-dom"
import { useForm } from "./hooks/useForm"

export default function Login() {

    const {values, handleChange, setValues} = useForm({ });

    return (

        <>
            <Header />

            <div className="login__container page__login">
                <h1 className="login__title">Вход</h1>
                <form className="popup__form">
                    <input id="email" type="email" name="email" className="popup__input popup__input_type_login"
                        placeholder="Email" minLength={2}
                        maxLength={30}
                    />
                    <input id="password" type="password" name="password" className="popup__input popup__input_type_login"
                        placeholder="Пароль" minLength={2}
                        maxLength={30}
                    />
                    <button type="submit" className="popup__submit popup__submit-login">Войти</button>
                </form>
            </div>



        </>


    )



}