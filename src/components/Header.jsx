import headerLogo from '../images/header_logo.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {

const location = useLocation();

const isSignUp = location.pathname === '/signup';
const isLogin = location.pathname === '/signin';


  return (

    <header className="header">
      <img src={headerLogo} alt="Логотип проекта Место" className="header__logo" />
      {(isSignUp || isLogin) && <Link to={isSignUp ? '/signin' : '/signup'} className='header__login'>{isSignUp ? 'Войти' : 'Регистрация'}</Link>}
      
    </header>
  )

}

export default Header;