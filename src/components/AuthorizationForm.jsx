import { useForm } from "./hooks/useForm";

export default function AuthorizationForm() {

    const { values, handleChange, setValues } = useForm({});

    
    return (

        <form className="popup__form">
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
        </form>
    )


}