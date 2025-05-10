import style from "./login.module.css";
import { X } from "lucide-react";
import Input from './../Input/Input';
import Button from "./../Button/Button";

export default function Login() {
    return (
        <div className={style.container}>
            <X size={32} />
            <form method="post">
                <h2 className={style.titlePage}>Iniciar a sessão</h2>
                <Input type="email" name="email" placeholder="E-mail" />
                <Input type="password" name="senha" placeholder="Senha" />
                <div className={style.buttons}>
                    <Button class={style.startSession} name="Iniciar a sessão" />
                    <Button class={style.newAccount} name="Cadastrar nova conta" />
                </div>
            </form>
        </div>
    );
}       