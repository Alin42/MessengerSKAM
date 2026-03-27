import Button from "../Buttons/Button.tsx"
import Label from "../Label/Label.tsx"
import NickInput from "../LineEdit/NickInput.tsx"
import ArrowButton from "../Buttons/ArrowButton.tsx"
import "./authFrame.css"
import axios from "axios"
import { useState } from "react"

type RegistrationFrameProps = {
    onAction: (step: 'Welcome' | 'Create') => void;
}

function RegistrationFrame({ onAction } : RegistrationFrameProps){
    const [login, setLogin] = useState("");

     const handleRegister = async () => {
        if (!login.trim()) {
            alert("Логин не может быть пустым");
            return;
        }
        try {
            const res = await axios.post("http://localhost:8080/api/register", { login });
            console.log(res.data);
            onAction("Create");
        } catch (e: any) {
            if (e.response?.status === 409) {
                alert("Пользователь с таким логином уже существует");
            } else if (e.response?.status === 400) {
                alert("Некорректные данные для регистрации");
            } else {
                console.error("Registration error", e);
                alert("Произошла ошибка на сервере");
            }
        }
    };

    return(
        <div className="authFrame">
            <div className="icons">
                <ArrowButton direction="left" onClick={() => onAction("Welcome")}/>
            </div>
            <div className="authFrameCenter">
                <Label variant="title" >SKAM</Label>
                
                <div className="buttons">
                    <NickInput onChange={setLogin} value={login} />
                    <Button onClick={handleRegister}>Create account</Button>
                </div>
            </div>
        </div>
    )
}
export default RegistrationFrame