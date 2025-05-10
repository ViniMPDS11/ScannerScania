import styles from './header.module.css';
import Logo from './Logo';
import Nav from './Nav';

export default function Header({ onLoginClick }) {
    return (
        <header className={styles.header}>
            <Logo />
            <Nav onLoginClick={onLoginClick} />
        </header>
    )
}