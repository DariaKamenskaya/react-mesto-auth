// Пути к изображениям внутри сборки
import { Link } from 'react-router-dom';
import logoPath from '../images/logo.svg'; 

function Header(props) {

  return (
    <header className="header">
      <div className="header__nav">
        <a href="#" className="header__link"><img src={logoPath} alt="Логотип" className="header__logo"/></a>
        <Link to={props.nav} className={'header__link header__status'}>{props.navStatus}  </Link>
      </div>
    </header>
  );
}

export default Header;