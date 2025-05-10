import styles from './layout.module.css'
import Header from "../components/Header/Header";
import { useState } from 'react';
import Login from '../components/Login/Login';

export default function Layout({children}) {
    const [showComponent, setShowComonent] = useState(false);
    
    return (
        <div className={styles.layout}>
            <Header onLoginClick={() => setShowComonent(!showComponent)} />
            <main className={styles.container}>
                {children}
                {showComponent && <Login />}
            </main>
        </div>
    );
}