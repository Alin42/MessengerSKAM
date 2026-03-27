import { useState } from "react";
import axios, { AxiosError } from "axios";

import Button from "../Buttons/Button";
import ArrowButton from "../Buttons/ArrowButton";
import Label from "../Label/Label";
import NickInput from "../LineEdit/NickInput";

import "./authFrame.css";
import { API_URL } from "../../../api/config";

type RegistrationFrameProps = {
    onAction: (step: 'Welcome' | 'Create') => void;
}

function RegistrationFrame({ onAction }: RegistrationFrameProps) {
    const [login, setLogin] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setError(null);

        if (!login.trim()) {
            setError("Login can`t be empty");
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${API_URL}/api/register`, {
                login: login.trim(),
            });

            onAction("Create");
        } catch (e: unknown) {
            const err = e as AxiosError;

            if (!err.response) {
                setError("Not connection to server");
                return;
            }

            switch (err.response.status) {
                case 409:
                    setError("User not exist yet");
                    break;
                case 400:
                    setError("Incorrect data");
                    break;
                default:
                    setError("Server Error");
            }
        } finally {
            setLoading(false);
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
                    <Button disabled={loading} onClick={handleRegister}>Create account</Button>
                    {error && (
                        <div className="errorText">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default RegistrationFrame