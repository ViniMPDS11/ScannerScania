import { Ellipsis, User } from 'lucide-react';
import style from './nav.module.css';
import ScaniaLogo from "./ScaniaLogo";

export default function Nav({ onLoginClick }) {

    return (
        <nav style={{height: "100%"}}>
            <ul className={style.menuList}>
                <li>
                    <button onClick={onLoginClick}>
                        <User style={{color: "#FFF"}} />
                    </button>
                </li>
                <li>
                    <button>
                        <Ellipsis style={{color: "#FFF"}} />
                    </button>
                </li>
                <li>
                    <a href="/">
                        <ScaniaLogo />
                    </a>
                </li>
            </ul>
        </nav>
    );
}