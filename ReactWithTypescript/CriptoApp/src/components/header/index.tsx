import logo from '../../images/logo.svg';
import styles from './header.module.css';
import {Link} from 'react-router-dom';

export function Header() {
  return (
    <header className={styles.container} >
      <Link to="/">
        <img src={logo} alt="logo" width={100}/>
      </Link>
    </header>
  )
}