import Header from "./Header"
import { Link } from "react-router-dom"
import { useForm } from "./hooks/useForm"
import { useEffect } from "react";

export default function Register({onRegister}) {

    const {values, handleChange, setValues} = useForm({ });

    function handleSubmit(event) {

        event.preventDefault();

        onRegister({
            email: values.email,
            password: values.password
        });
    }

    useEffect(() => {

        setValues({
            email: values.email,
            password: values.password
        })
    }, [])

    return (

        <>
            <Header linkText={'Войти'} />
            <div className="login">
                <div className="login__container page__login">
                    <h1 className="login__title">Регистрация</h1>
                    <form className="popup__form" onSubmit={handleSubmit}>
                        <input id="email" type="email" name="email" className="popup__input popup__input_type_login"
                            placeholder="Email" minLength={2}
                            maxLength={30}
                            value={values.email || ''}
                            onChange={handleChange}
                        />
                        <input id="password" type="password" name="password" className="popup__input popup__input_type_login"
                            placeholder="Пароль" minLength={2}
                            maxLength={30}
                            value={values.password}
                            onChange={handleChange}
                        />
                        <button type="submit" className="popup__submit popup__submit-login">Зарегистрироваться</button>
                    </form>
                    <p className="login__link-bottom">Уже зарегистрированы? <Link to="/login" className="login__link-bottom">Войти</Link></p>
                </div>
            </div>



        </>


    )

}