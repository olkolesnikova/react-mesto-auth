import headerLogo from '../images/header_logo.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {

const location = useLocation();

const isSignUp = location.pathname === '/sign-up';
const isLogin = location.pathname === '/login';


  return (

    <header className="header">
      <img src={headerLogo} alt="Логотип проекта Место" className="header__logo" />
      {(isSignUp || isLogin) && <Link to={isSignUp ? '/login' : '/signup'} className='header__login'>{isSignUp ? 'Войти' : 'Регистрация'}</Link>}
      
    </header>
  )

}

export default Header;