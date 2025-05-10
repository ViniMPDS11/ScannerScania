import { X } from "lucide-react";
import Input from './../Input/Input';

export default function Login() {
    return (
        <div className="">
            <X size={32} />
            <h2>Iniciar a sessão</h2>
            <form method="post">
                <Input type="email" name="email" placeholder="E-mail" />
                <Input type="password" name="senha" placeholder="Senha" />
            </form>
        </div>
    );
}