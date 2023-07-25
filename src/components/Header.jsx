import headerLogo from '../images/header_logo.png';

const Header = () => {

  return (

    <header className="header">
      <img src={headerLogo} alt="Логотип проекта Место" className="header__logo" />
    </header>
  )

}

export default Header;